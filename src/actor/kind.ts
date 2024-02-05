import * as GWU from "gw-utils";
import * as OBJ from "../object";
import { Actor, ActorMakeOpts as ActorCreateOpts } from "./actor";
import { Level } from "../level";
import { Item } from "../item";
import { SidebarEntry } from "../widgets";
import { factory } from "./factory";

export type ActorCtorFn = (
  kind: ActorKind,
  opts: ActorCreateOpts
) => GWU.Option<Actor>;
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
  ctor?: ActorCtorFn;
  create?: ActorCreateFn;
  destroy?: ActorDestroyFn; // Actor is destroyed (different from death?)

  add?: ActorSpawnFn; // Fired when an Actor is placed into the map at creation time
  remove?: ActorSpawnFn;

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

export interface ActorKind extends OBJ.ObjKind {
  id: string;
  name: string;
  tags: string[];

  hero: boolean;

  health: number;

  notice: number;
  moveSpeed: number;

  ch: string;
  fg: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  on: ActorEvents & OBJ.ObjEvents;

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

  dropChance: number;
  dropMatch: string[];
}

export interface ActorKindConfig extends OBJ.ObjKindConfig {
  id: string;
  name?: string;
  tags?: string | string[];

  hero?: boolean;
  health?: number;

  notice?: number;
  moveSpeed?: number;

  ch?: string;
  fg?: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  on?: ActorEvents & OBJ.ObjEvents;

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

  dropChance?: number;
  dropMatch?: string | string[];
}

export function makeKind(cfg: ActorKindConfig) {
  const kind = OBJ.makeKind(cfg) as ActorKind;

  if (!kind.id || kind.id.length === 0) {
    throw new Error("ItemKind must have 'id'.");
  }
  if (!kind.name || typeof kind.name !== "string" || kind.name.length == 0) {
    kind.name = GWU.text.title_case(kind.id.toLowerCase().replace(/\_/g, " "));
  }
  if (cfg.tags && typeof cfg.tags === "string") {
    kind.tags = cfg.tags.split(/[|,]/).map((v) => v.trim());
  }
  kind.ch = kind.ch || "!";
  if (kind.fg) {
    kind.fg = GWU.color.make(cfg.fg);
  } else {
    kind.fg = GWU.colors.red;
  }
  if (kind.bg) {
    kind.bg = GWU.color.make(cfg.bg);
  } else {
    kind.bg = GWU.color.NONE;
  }

  kind.damage = kind.damage || 0;
  kind.attackSpeed = kind.attackSpeed || 100;
  kind.combo = kind.combo || 0;
  kind.comboDamage = kind.comboDamage || 0;
  kind.comboSpeed = kind.comboSpeed || 0;
  kind.range = kind.range || 0;
  kind.rangedDamage = kind.rangedDamage || 0;
  kind.tooClose = kind.tooClose || 0;
  kind.rangedAttackSpeed = kind.rangedAttackSpeed || 0;
  kind.ammo = kind.ammo || 0;

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
  kind.dropChance = kind.dropChance || 0;
  kind.dropMatch = kind.dropMatch || [];
  if (typeof cfg.dropMatch === "string") {
    kind.dropMatch = cfg.dropMatch.split(/[,]/g).map((t) => t.trim());
  }
  if (kind.dropChance > 0 && kind.dropMatch.length == 0) {
    kind.dropMatch.push("drop"); // Default drops
  }
  if (kind.dropMatch.length > 0 && kind.dropChance == 0) {
    kind.dropChance = 100;
  }

  // Make sure default bump is setup for actor
  if (cfg.bump === undefined) {
    if (cfg.damage > 0 || cfg.rangedDamage > 0) {
      kind.bump.push("attack");
    }
  }

  return kind;
}

export function install(cfg: ActorKindConfig) {
  factory.installKind(cfg);
}

export function getKind(id: string): ActorKind | null {
  return factory.getKind(id);
}
