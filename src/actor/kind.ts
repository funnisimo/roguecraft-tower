import * as GWU from "gw-utils";
import { CallbackFn } from "../game/obj";

export interface ActorEvents {
  // bump?: (game: Game, actor: Actor, other: Actor) => void;
  [key: string]: CallbackFn | undefined;
}

export interface KindConfig {
  id: string;
  health?: number;

  notice?: number;
  moveSpeed?: number;

  ch: string;
  fg: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  bump?: string | string[];

  on?: ActorEvents;

  // melee
  damage?: number | number[];
  attackSpeed?: number | number[];

  // ranged
  range?: number;
  rangedDamage?: number | number[];
  tooClose?: number;
  rangedAttackSpeed?: number | number[];
  ammo?: number;

  slots?: { [id: string]: string };

  dropChance?: number;
  dropMatch?: string | string[];
}

export interface ActorKind {
  id: string;
  health: number;

  notice: number;
  moveSpeed: number;

  ch: string;
  fg: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  bump: string[];

  on: ActorEvents;

  damage: number[];
  attackSpeed: number[];

  range: number;
  rangedDamage: number[];
  tooClose: number;
  rangedAttackSpeed: number[];
  ammo: number;

  slots: Map<string, string>;

  dropChance: number;
  dropMatch: string[];
}

export const kinds: Record<string, ActorKind> = {};

export function install(cfg: KindConfig) {
  const kind = Object.assign(
    {
      health: 10,
      notice: 10,
      moveSpeed: 100,
      ch: "!",
      fg: "white",
      bump: ["attack"],
      on: {},

      damage: [],
      attackSpeed: [],

      range: 0,
      rangedDamage: [],
      rangedAttackSpeed: [],
      ammo: 0,

      tooClose: 0,

      dropChance: 0,
      dropMatch: [],

      slots: new Map<string, string>(),
    },
    cfg
  ) as ActorKind;

  if (typeof cfg.bump === "string") {
    kind.bump = cfg.bump.split(/[,]/g).map((t) => t.trim());
  }
  if (typeof cfg.dropMatch === "string") {
    kind.dropMatch = cfg.dropMatch.split(/[,]/g).map((t) => t.trim());
  }
  if (kind.dropChance > 0 && kind.dropMatch.length == 0) {
    kind.dropMatch.push("drop"); // Default drops
  }

  // normalize attackSpeed
  if (typeof cfg.attackSpeed === "undefined") {
    kind.attackSpeed = [];
  } else if (typeof cfg.attackSpeed == "number") {
    if (cfg.attackSpeed == 0) {
      kind.attackSpeed = [];
    } else {
      kind.attackSpeed = [cfg.attackSpeed];
    }
  } else {
    kind.attackSpeed = cfg.attackSpeed;
  }

  // normalize rangedAttackSpeed
  if (typeof cfg.rangedAttackSpeed === "undefined") {
    kind.rangedAttackSpeed = [];
  } else if (typeof cfg.rangedAttackSpeed == "number") {
    if (cfg.rangedAttackSpeed == 0) {
      kind.rangedAttackSpeed = [];
    } else {
      kind.rangedAttackSpeed = [cfg.rangedAttackSpeed];
    }
  } else {
    kind.rangedAttackSpeed = cfg.rangedAttackSpeed;
  }

  if (typeof cfg.damage == "number") {
    kind.damage = [cfg.damage];
  }
  if (typeof cfg.rangedDamage == "number") {
    kind.rangedDamage = [cfg.rangedDamage];
  }

  if (kind.damage.length == 1 && kind.damage[0] == 0) {
    kind.damage = [];
    kind.attackSpeed = [];
  } else {
    // normalize damage and attackSpeed
    while (kind.damage.length > kind.attackSpeed.length) {
      kind.attackSpeed.push(kind.attackSpeed[0] || kind.moveSpeed);
    }
  }

  if (
    kind.range == 0 ||
    (kind.rangedDamage.length == 1 && kind.rangedDamage[0] == 0)
  ) {
    kind.rangedDamage = [];
    kind.rangedAttackSpeed = [];
  } else {
    while (kind.attackSpeed.length > kind.damage.length) {
      kind.damage.push(kind.damage[0]);
    }
  }

  // normalize rangedDamage and rangedAttackSpeed
  while (kind.rangedAttackSpeed.length > kind.rangedDamage.length) {
    kind.rangedDamage.push(kind.rangedDamage[0]);
  }
  while (kind.rangedDamage.length > kind.rangedAttackSpeed.length) {
    kind.rangedAttackSpeed.push(
      kind.rangedAttackSpeed[0] || kind.attackSpeed[0] || kind.moveSpeed
    );
  }

  if (kind.ammo == 0 && kind.range > 0) {
    kind.ammo = 10; // You get 10 shots by default
  }

  // TODO: Create drop language
  //      - 50 (drop default treasure 50% of time)
  //      - ARROWS (always drop arrows)
  //      - ARROWS@35 (35% drop arrows)
  //      - ARROWS@50%/HEALTH@20% (arrows (50%) or health (20%) or nothing (30%)) (% is optional)
  //      - ARROWS@50%+HEALTH@20% (arrows (50%) AND/OR health (20%))
  //      - #TREASURE@50% (50% drop from the TREASURE tag)
  //      - #TREASURE*3@50% (50% drop 3 from TREASURE tag)
  //      - #TREASURE@50%*3 (try to drop from TREASURE with 50% chance 3 times)
  //      - [ARROWS+HEALTH]@50% (50% drop both arrows and health)
  //      - [ARROWS@50+HEALTH]@50 (50% drop health and 50% of those have arrows with them)
  if (kind.dropChance == 0 && kind.dropMatch.length > 0) {
    kind.dropChance = 100;
  }

  kinds[cfg.id.toLowerCase()] = kind;
}

export function getKind(id: string): ActorKind | null {
  return kinds[id.toLowerCase()] || null;
}
