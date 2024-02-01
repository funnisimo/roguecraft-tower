import * as GWU from "gw-utils";
import { CallbackFn, ObjMakeOpts, ObjEvents } from "../game/obj";
import { Actor, ActorCreateOpts } from "./actor";
import { Level } from "../level";
import { Item } from "../item";
import { SidebarEntry } from "../widgets";

export type ActorMakeFn = (kind: ActorKind, opts: ActorCreateOpts) => Actor;
export type ActorCreateFn = (actor: Actor, opts: ActorCreateOpts) => void;
export type ActorSpawnFn = (level: Level, actor: Actor) => void;
export type ActorDestroyFn = (level: Level, actor: Actor) => void;

export type ActorLocFn = (
  level: Level,
  actor: Actor,
  x: number,
  y: number
) => void;

export type ActorItemFn = (level: Level, actor: Actor, item: Item) => void;

export interface ActorEvents {
  // bump?: (game: Game, actor: Actor, other: Actor) => void;
  make?: ActorMakeFn;
  create?: ActorCreateFn;

  add?: ActorSpawnFn; // Fired when an Actor is placed into the map at creation time
  remove?: ActorSpawnFn;
  destroy?: ActorDestroyFn; // Actor is destroyed (different from death?)

  move?: ActorLocFn;
  death?: (level: Level, actor: Actor) => void; // TODO - use destroy instead?

  sidebar?: (actor: Actor, entry: SidebarEntry) => number;
  turn_start?: (level: Level, actor: Actor) => void;
  turn_end?: (level: Level, actor: Actor, time: number) => void;
  tick?: (level: Level, actor: Actor, time: number) => void;

  // pickup?: ActorItemFn;
  // drop?: ActorItemFn;

  // equip?: ActorItemFn;
  // unequip?: ActorItemFn;

  // use?: ActorItemFn;
}

export interface ActorKindOpts {
  id: string;
  name?: string;
  hero?: boolean;
  health?: number;

  notice?: number;
  moveSpeed?: number;

  ch?: string;
  fg?: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  bump?: string | string[];

  on?: ActorEvents & ObjEvents;

  // melee
  damage?: number;
  attackSpeed?: number;
  combo?: number;
  comboDamage?: number;
  comboSpeed?: number;

  // ranged
  range?: number;
  rangedDamage?: number;
  tooClose?: number;
  rangedAttackSpeed?: number;
  ammo?: number;

  slots?: { [id: string]: string };

  dropChance?: number;
  dropMatch?: string | string[];
}

export interface ActorKind {
  id: string;
  name: string;
  hero: boolean;

  health: number;

  notice: number;
  moveSpeed: number;

  ch: string;
  fg: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  bump: string[];

  on: ActorEvents & ObjEvents;

  damage: number;
  attackSpeed: number;
  combo: number;
  comboDamage: number;
  comboSpeed: number;

  range: number;
  rangedDamage: number;
  tooClose: number;
  rangedAttackSpeed: number;
  ammo: number;

  // slots: Map<string, string>;

  dropChance: number;
  dropMatch: string[];
}

export const kinds: Record<string, ActorKind> = {};

// @ts-ignore
globalThis.ActorKinds = kinds;

export function makeKind(cfg: ActorKindOpts) {
  const kind = Object.assign(
    {
      name: "",
      hero: false,
      health: 10,
      notice: 10,
      moveSpeed: 100,
      ch: "!",
      fg: "white",
      bump: ["attack"],
      on: {},

      damage: 0,
      attackSpeed: 0,
      combo: 0,
      comboDamage: 0,
      comboSpeed: 0,

      range: 0,
      rangedDamage: 0,
      rangedAttackSpeed: 0,
      ammo: 0,

      tooClose: 0,

      dropChance: 0,
      dropMatch: [],

      slots: new Map<string, string>(),
    },
    cfg
  ) as ActorKind;

  if (kind.name == "") {
    kind.name = GWU.text.title_case(kind.id.toLowerCase().replace(/\_/g, " "));
  }

  if (typeof cfg.bump === "string") {
    kind.bump = cfg.bump.split(/[,]/g).map((t) => t.trim());
  }
  if (typeof cfg.dropMatch === "string") {
    kind.dropMatch = cfg.dropMatch.split(/[,]/g).map((t) => t.trim());
  }
  if (kind.dropChance > 0 && kind.dropMatch.length == 0) {
    kind.dropMatch.push("drop"); // Default drops
  }

  if (kind.attackSpeed == 0 && kind.damage > 0) {
    kind.attackSpeed = kind.moveSpeed;
  }

  if (kind.comboDamage == 0) {
    kind.combo = 0;
    kind.comboSpeed = 0;
  } else if (kind.combo < 2) {
    kind.comboDamage = 0;
    kind.comboSpeed = 0;
  } else if (kind.comboSpeed == 0) {
    kind.comboSpeed = kind.attackSpeed;
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
  return kind;
}

export function install(cfg: ActorKindOpts) {
  const kind = makeKind(cfg);

  kinds[kind.id.toLowerCase()] = kind;
}

export function getKind(id: string): ActorKind | null {
  return kinds[id.toLowerCase()] || null;
}
