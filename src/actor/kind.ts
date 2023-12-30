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
  damage?: number;
  attackSpeed?: number;

  // ranged
  range?: number;
  rangedDamage?: number;
  tooClose?: number;
  rangedAttackSpeed?: number;

  dropChance?: number;
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

  damage: number;
  attackSpeed: number;

  range: number;
  rangedDamage: number;
  tooClose: number;
  rangedAttackSpeed: number;
  ammo: number;

  dropChance: number;
  drop: string[];
}

export const kinds: Record<string, ActorKind> = {};

export function install(cfg: KindConfig) {
  const kind = Object.assign(
    {
      health: 10,
      notice: 10,
      damage: 1,
      moveSpeed: 100,
      attackSpeed: 0,
      ch: "!",
      fg: "white",
      bump: ["attack"],
      on: {},
      range: 0,
      rangedDamage: 0,
      ammo: 0,
      tooClose: 0,
      rangedAttackSpeed: 0,
      dropChance: 0,
      drop: [],
    },
    cfg
  ) as ActorKind;

  if (typeof cfg.bump === "string") {
    kind.bump = cfg.bump.split(/[,]/g).map((t) => t.trim());
  }
  kind.attackSpeed = kind.attackSpeed || kind.moveSpeed;
  kind.rangedAttackSpeed = kind.rangedAttackSpeed || kind.attackSpeed;
  if (kind.ammo == 0 && kind.rangedDamage > 0) {
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
  if (kind.dropChance == 0 && kind.drop.length > 0) {
    kind.dropChance = 100;
  }

  kinds[cfg.id.toLowerCase()] = kind;
}

export function getKind(id: string): ActorKind | null {
  return kinds[id.toLowerCase()] || null;
}
