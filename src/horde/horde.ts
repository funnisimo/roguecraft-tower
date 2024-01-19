import * as GWU from "gw-utils";
import { Level } from "../game/level";
import * as ACTOR from "../actor";
import * as FX from "../fx";

const Fl = GWU.flag.fl;

export enum Flags {
  HORDE_DIES_ON_LEADER_DEATH = Fl(0), // if the leader dies, the horde will die instead of electing new leader
  HORDE_IS_SUMMONED = Fl(1), // minions summoned when any creature is the same species as the leader and casts summon
  HORDE_SUMMONED_AT_DISTANCE = Fl(2), // summons will appear across the level, and will naturally path back to the leader
  HORDE_NO_PERIODIC_SPAWN = Fl(3), // can spawn only when the level begins -- not afterwards
  HORDE_ALLIED_WITH_PLAYER = Fl(4),
  HORDE_NEVER_OOD = Fl(5), // Horde cannot be generated out of depth

  // HORDE_LEADER_CAPTIVE = Fl(6), // the leader is in chains and the followers are guards

  // Move all these to tags?

  // HORDE_MACHINE_BOSS = Fl(6), // used in machines for a boss challenge
  // HORDE_MACHINE_WATER_MONSTER = Fl(7), // used in machines where the room floods with shallow water
  // HORDE_MACHINE_CAPTIVE = Fl(8), // powerful captive monsters without any captors
  // HORDE_MACHINE_STATUE = Fl(9), // the kinds of monsters that make sense in a statue
  // HORDE_MACHINE_TURRET = Fl(10), // turrets, for hiding in walls
  // HORDE_MACHINE_MUD = Fl(11), // bog monsters, for hiding in mud
  // HORDE_MACHINE_KENNEL = Fl(12), // monsters that can appear in cages in kennels
  // HORDE_VAMPIRE_FODDER = Fl(13), // monsters that are prone to capture and farming by vampires
  // HORDE_MACHINE_LEGENDARY_ALLY = Fl(14), // legendary allies
  // HORDE_MACHINE_THIEF = Fl(16), // monsters that can be generated in the key thief area machines
  // HORDE_MACHINE_GOBLIN_WARREN = Fl(17), // can spawn in goblin warrens
  // HORDE_SACRIFICE_TARGET = Fl(18), // can be the target of an assassination challenge; leader will get scary light.

  // HORDE_MACHINE_ONLY = HORDE_MACHINE_BOSS |
  //     HORDE_MACHINE_WATER_MONSTER |
  //     HORDE_MACHINE_CAPTIVE |
  //     HORDE_MACHINE_STATUE |
  //     HORDE_MACHINE_TURRET |
  //     HORDE_MACHINE_MUD |
  //     HORDE_MACHINE_KENNEL |
  //     HORDE_VAMPIRE_FODDER |
  //     HORDE_MACHINE_LEGENDARY_ALLY |
  //     HORDE_MACHINE_THIEF |
  //     HORDE_MACHINE_GOBLIN_WARREN |
  //     HORDE_SACRIFICE_TARGET,
}

export interface HordeConfig {
  leader: string;
  members?: Record<string, GWU.range.RangeBase>;
  tags?: string | string[];
  frequency?: GWU.frequency.FrequencyConfig;
  // blueprintId?: string;
  flags?: GWU.flag.FlagBase;
  requiredTile?: string;

  warnMs?: number;
  memberWarnMs?: number;
  warnColor?: GWU.color.ColorBase;
}

export interface HordeFlagsType {
  horde: number;
}

export interface SpawnOptions {
  canSpawn: GWU.xy.XYMatchFunc;
  rng: GWU.rng.Random;
  machine: number;
  power: number;
  depth: number;
  x: number;
  y: number;
}

export class Horde {
  tags: string[] = [];
  leader: string;
  members: Record<string, GWU.range.Range> = {};
  frequency: GWU.frequency.FrequencyFn;
  // blueprintId: string | null = null;
  flags: HordeFlagsType = { horde: 0 };
  // requiredTile: string | null = null;
  warnMs: number;
  memberWarnMs: number;
  warnColor: GWU.color.ColorBase;

  constructor(config: HordeConfig) {
    if (config.tags) {
      if (typeof config.tags === "string") {
        this.tags = config.tags.split(/[,|]/).map((t) => t.trim());
      } else {
        this.tags = config.tags.slice();
      }
    }
    this.leader = config.leader;
    if (config.members) {
      Object.entries(config.members).forEach(([id, range]) => {
        this.members[id] = GWU.range.make(range);
      });
    }
    this.frequency = GWU.frequency.make(config.frequency || 100);
    // this.blueprintId = config.blueprintId || null;
    this.flags.horde = GWU.flag.from(Flags, config.flags);
    // if (config.requiredTile) this.requiredTile = config.requiredTile;
    this.warnMs = config.warnMs ?? 500;
    this.memberWarnMs = config.memberWarnMs ?? this.warnMs;
    this.warnColor = config.warnColor ?? "green";
  }

  spawn(map: Level, opts: Partial<SpawnOptions> = {}): ACTOR.Actor | null {
    opts.canSpawn = opts.canSpawn || GWU.TRUE;
    opts.rng = opts.rng || map.rng;
    opts.machine = opts.machine ?? 0;
    opts.power = opts.power || 1;
    if (opts.x === undefined) {
      opts.x = -1;
    }
    if (opts.y === undefined) {
      opts.y = -1;
    }

    const leader = this._spawnLeader(map, opts.x, opts.y, opts as SpawnOptions);
    if (!leader) return null;

    this._spawnMembers(leader, map, opts as SpawnOptions);
    return leader;
  }

  _spawnLeader(
    map: Level,
    x: number,
    y: number,
    opts: SpawnOptions
  ): ACTOR.Actor | null {
    const leaderKind = ACTOR.getKind(this.leader);
    if (!leaderKind) {
      throw new Error("Failed to find leader kind = " + this.leader);
    }

    const leader = ACTOR.make(leaderKind, {
      machineHome: opts.machine,
      power: opts.power,
    });
    if (!leader)
      throw new Error("Failed to make horde leader - " + this.leader);

    if (x >= 0 && y >= 0) {
      if (leader.avoidsTile(map.getTile(x, y))) return null;
    }

    if (x < 0 || y < 0) {
      [x, y] = this._pickLeaderLoc(leader, map, opts) || [-1, -1];
      if (x < 0 || y < 0) {
        return null;
      }
    }

    // pre-placement stuff?  machine? effect?

    if (!this._addLeader(leader, map, x, y, opts)) {
      return null;
    }

    return leader;
  }

  _addLeader(
    leader: ACTOR.Actor,
    map: Level,
    x: number,
    y: number,
    _opts: SpawnOptions
  ): boolean {
    const game = map.game!;
    leader.x = x;
    leader.y = y;

    FX.flashGameTime(game, x, y, this.warnColor, this.warnMs).then(() => {
      map.addActor(leader);
    });

    return true;
  }

  _addMember(
    member: ACTOR.Actor,
    map: Level,
    x: number,
    y: number,
    leader: ACTOR.Actor,
    _opts: SpawnOptions
  ): boolean {
    const game = map.game!;
    member.leader = leader;
    member.x = x;
    member.y = y;

    FX.flashGameTime(game, x, y, this.warnColor, this.memberWarnMs).then(() => {
      map.addActor(member);
    });

    return true;
  }

  _spawnMembers(leader: ACTOR.Actor, map: Level, opts: SpawnOptions): number {
    const entries = Object.entries(this.members);

    if (entries.length == 0) return 0;

    let count = 0;
    entries.forEach(([kindId, countRange]) => {
      const count = countRange.value(opts.rng);
      for (let i = 0; i < count; ++i) {
        this._spawnMember(kindId, map, leader, opts);
      }
    });

    return count;
  }

  _spawnMember(
    kindId: string,
    map: Level,
    leader: ACTOR.Actor,
    opts: SpawnOptions
  ): ACTOR.Actor | null {
    const kind = ACTOR.getKind(kindId);
    if (!kind) {
      throw new Error("Failed to find member kind = " + kindId);
    }

    const member = ACTOR.make(kind, {
      machineHome: opts.machine,
      power: opts.power,
    });
    if (!member) throw new Error("Failed to make horde member - " + kindId);

    const [x, y] = this._pickMemberLoc(member, map, leader, opts) || [-1, -1];
    if (x < 0 || y < 0) {
      return null;
    }

    // pre-placement stuff?  machine? effect?

    if (!this._addMember(member, map, x, y, leader, opts)) {
      return null;
    }

    return member;
  }

  _pickLeaderLoc(
    leader: ACTOR.Actor,
    map: Level,
    opts: SpawnOptions
  ): GWU.xy.Loc | null {
    let loc = opts.rng.matchingLoc(map.width, map.height, (x, y) => {
      if (map.hasActor(x, y)) return false; // Brogue kills existing actors, but lets do this instead
      if (map.hasFx(x, y)) return false; // Could be someone else spawning here
      if (!opts.canSpawn(x, y)) return false;
      if (leader.avoidsTile(map.getTile(x, y))) return false;

      if (map.isHallway(x, y)) {
        return false;
      }
      return true;
    });
    return loc;
  }

  _pickMemberLoc(
    actor: ACTOR.Actor,
    map: Level,
    leader: ACTOR.Actor,
    opts: SpawnOptions
  ): GWU.xy.Loc | null {
    let loc = opts.rng.matchingLocNear(leader.x, leader.y, (x, y) => {
      if (!map.hasXY(x, y)) return false;
      if (map.hasActor(x, y)) return false; // Brogue kills existing actors, but lets do this instead
      if (map.hasFx(x, y)) return false; // Could be someone else spawning here
      // if (map.fov.isAnyKindOfVisible(x, y)) return false;

      if (actor.avoidsTile(map.getTile(x, y))) return false;

      if (map.isHallway(x, y)) {
        return false;
      }
      return true;
    });
    return loc;
  }
}
