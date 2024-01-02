import * as GWU from "gw-utils";

import * as FX from "../fx/index";
import { Obj, ObjConfig } from "../game/obj";
import { Game } from "../game/game";
import { Level } from "../game/level";
import { TileInfo } from "../game/tiles";
import * as AI from "./ai";
import * as ACTIONS from "../game/actions";

import { ActorKind, getKind } from "./kind";
import { Item, placeRandom } from "../item";

export interface ActorConfig extends ObjConfig {
  kind: ActorKind;
  power?: number;
}

export class Actor extends Obj {
  _turnTime = 0;
  _level: Level | null = null;
  kind: ActorKind;
  data: Record<string, any>;
  health: number;
  health_max: number;
  ammo: number;
  power: number;
  item_flags: number;

  leader: Actor | null = null;

  constructor(cfg: ActorConfig) {
    super(cfg);
    this.kind = cfg.kind;
    if (!this.kind) throw new Error("Must have kind.");

    this.kind.moveSpeed = this.kind.moveSpeed || 100;
    this.item_flags = 0;
    this.data = {};
    this.power = cfg.power || 1;
    this.health_max = this.kind.health || 1; // TODO - scale with power?
    this.health = this.health_max;
    this.ammo = this.kind.ammo || 0; // TODO - scale with power?

    this.on("add", (level: Level) => {
      level.game!.scheduler.push(this, this.kind.moveSpeed);
      this._level = level;
    });
    this.on("remove", (level: Level) => {
      // console.group("ACTOR REMOVE", this);
      // console.group("before");
      // GWU.list.forEach(game.scheduler.next, (i) => console.log(i.item));
      // console.groupEnd();
      level.game!.scheduler.remove(this);
      this._level = null;
      // console.group("after");
      // GWU.list.forEach(game.scheduler.next, (i) => console.log(i.item));
      // console.groupEnd();
      // console.groupEnd();
    });
    this.on("death", () => {
      if (
        this.kind.dropChance &&
        this._level!.rng.chance(this.kind.dropChance)
      ) {
        placeRandom(this._level!, this.x, this.y, this.kind.dropMatch);
      }
    });

    Object.entries(this.kind.on).forEach(([key, value]) => {
      if (!value) return;
      this.on(key, value);
    });
  }

  // attributes
  get name(): string {
    return this.kind.name;
  }

  get damage(): number[] {
    // TODO - scale with power
    return this.kind.damage;
  }

  get attackSpeed(): number[] {
    return this.kind.attackSpeed;
  }

  get range(): number {
    return this.kind.range;
  }

  get rangedDamage(): number[] {
    return this.kind.rangedDamage;
  }

  get rangedAttackSpeed(): number[] {
    return this.kind.rangedAttackSpeed;
  }

  get moveSpeed(): number {
    return this.kind.moveSpeed;
  }
  //

  has_item_flag(flag: number): boolean {
    return (this.item_flags & flag) > 0;
  }

  // TODO - Should this be a method instead of a property?
  get can_melee_attack(): boolean {
    return this.damage.length > 0 && this.damage[0] > 0;
  }

  startTurn(game: Game) {
    this._turnTime = 0;
    this.trigger("start", game);
  }

  endTurn(game: Game, time: number) {
    this._turnTime = time;
    this.trigger("end", game, time);
  }

  hasActed() {
    return this._turnTime > 0;
  }

  draw(buf: GWU.buffer.Buffer) {
    if (this.health <= 0) return;
    buf.drawSprite(this.x, this.y, this.kind);
  }

  avoidsTile(tile: TileInfo): boolean {
    return tile.blocksMove || false;
  }

  moveCost(x: number, y: number) {
    const level = this._level;
    if (!level) return GWU.path.OBSTRUCTION;
    if (!level.hasXY(x, y)) return GWU.path.OBSTRUCTION;
    if (level.blocksDiagonal(x, y)) return GWU.path.OBSTRUCTION;
    if (level.blocksMove(x, y)) return GWU.path.BLOCKED;
    // if (level.hasActor(x, y)) return GWU.path.AVOIDED;
    return GWU.path.OK;
  }

  pathTo(loc: GWU.xy.Pos) {
    const path = GWU.path.fromTo(this, loc, (x, y) => this.moveCost(x, y));
    return path;
  }

  act(game: Game) {
    this.startTurn(game);
    AI.ai(game, this);
    if (!this.hasActed()) {
      console.log("No actor AI action.");
    }
  }

  bump(game: Game, actor: Actor): boolean {
    const actions = this.kind.bump;

    for (let action of actions) {
      const fn = ACTIONS.getBump(action);
      if (fn && fn(game, actor, this)) {
        return true;
      }
    }

    return false; // did nothing
  }
}

export function make(id: string | ActorKind, opts?: Record<string, any>) {
  let kind: ActorKind | null;
  if (typeof id === "string") {
    kind = getKind(id);
    if (!kind) throw new Error("Failed to find actor kind - " + id);
  } else {
    kind = id;
  }

  const config = Object.assign(
    {
      x: 1,
      y: 1,
      z: 1, // items, actors, player, fx
      kind,
      health: kind.health || 10,
      damage: kind.damage || 2,
    },
    opts
  );

  return new Actor(config);
}

export type ActorCallback = (actor: Actor) => void;

export interface ThenActor {
  then(cb: ActorCallback): void;
}

export function spawn(
  level: Level,
  id: string | Actor,
  x?: number,
  y?: number,
  ms = 500
): ThenActor {
  const newbie = typeof id === "string" ? make(id) : id;

  const bg = newbie.kind.fg;
  const game = level.game!;
  const scene = game.scene!;
  // const level = level.level;

  if (x === undefined) {
    do {
      x = level.rng.number(level.width);
      y = level.rng.number(level.height);
    } while (!level.hasTile(x, y, "FLOOR") || level.actorAt(x, y));
  }

  let _success: ActorCallback = GWU.NOOP;

  FX.flashGameTime(game, x, y!, bg).then(() => {
    newbie.x = x!;
    newbie.y = y!;
    level.addActor(newbie);
    _success(newbie);
  });

  return {
    then(cb: ActorCallback) {
      _success = cb || GWU.NOOP;
    },
  };
}
