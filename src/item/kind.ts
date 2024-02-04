import * as GWU from "gw-utils";
import { Actor } from "../actor";
import { Item } from "./item";
import * as OBJ from "../object";
import { ARMOR_FLAGS, MELEE_FLAGS, RANGED_FLAGS } from "./flags";
import { EffectConfig } from "../effect";
import { Level } from "../level";
import { SidebarEntry } from "../widgets";
import { factory } from "./factory";
import { ObjKind } from "../object/kind";

export interface ItemCreateOpts extends OBJ.ObjCreateOpts, ItemEvents {
  power?: number;
  data?: Record<string, string>;
}

export type ItemCtorFn = (
  kind: ItemKind,
  opts: ItemCreateOpts
) => GWU.Option<Item>;
export type ItemCreateFn = (item: Item, opts: ItemCreateOpts) => void;
export type ItemSpawnFn = (level: Level, item: Item) => void;
export type ItemDestroyFn = (level: Level, item: Item) => void;

export type ItemLocFn = (
  level: Level,
  item: Item,
  x: number,
  y: number
) => void;

export type ItemActionFn = (level: Level, item: Item, actor: Actor) => void;
export type ItemSidebarFn = (item: Item, entry: SidebarEntry) => void;

export interface ItemEvents {
  ctor?: ItemCtorFn;
  create?: ItemCreateFn;
  destroy?: ItemDestroyFn; // Item is destroyed

  add?: ItemSpawnFn; // Fired when an item is placed into a level
  remove?: ItemSpawnFn; // Fired when an item is removed from a level (maybe picked up, maybe used, maybe destroyed, ...)

  pickup?: ItemActionFn;
  drop?: ItemActionFn;

  equip?: ItemActionFn;
  unequip?: ItemActionFn;

  use?: ItemActionFn;
  sidebar?: ItemSidebarFn;
}

export interface ItemKind extends ObjKind {
  // TODO - move these to ObjKind
  id: string;
  name: string;
  tags: string[];

  // TODO - move these to ObjKind
  ch: string;
  fg: GWU.color.Color;
  bg?: GWU.color.Color;

  speed: number;
  damage: number;
  combo: number;
  combo_speed: number;
  combo_damage: number;
  range: number;
  charge: number;
  defense: number;

  slot: string | null;
  on: ItemEvents & OBJ.ObjEvents;

  frequency: GWU.frequency.FrequencyFn;
  armor_flags: ARMOR_FLAGS;
  melee_flags: MELEE_FLAGS;
  ranged_flags: RANGED_FLAGS;
  effects: EffectConfig;

  //   damage: number;
  //   attackSpeed: number;

  //   range: number;
  //   rangedDamage: number;
  //   tooClose: number;
  //   rangedAttackSpeed: number;
}

export interface ItemKindConfig extends OBJ.ObjKindConfig {
  id: string;
  name?: string;
  tags?: string | string[];

  // TODO - move these to ObjKind
  ch?: string;
  fg?: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  speed?: number;
  damage?: number;
  combo?: number;
  combo_speed?: number;
  combo_damage?: number;
  range?: number;
  charge?: number;
  defense?: number;

  slot?: string | null;
  on?: ItemEvents & OBJ.ObjEvents;

  frequency?: GWU.frequency.FrequencyConfig;
  armor_flags?: string | string[];
  melee_flags?: string | string[];
  ranged_flags?: string | string[];
  effects?: EffectConfig;
}

export function makeKind(cfg: ItemKindConfig): ItemKind {
  let kind = OBJ.makeKind(cfg) as ItemKind;

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

  kind.speed = kind.speed || 100;
  kind.damage = kind.damage || 0;
  kind.combo = kind.combo || 0;
  kind.combo_speed = kind.combo_speed || 0;
  kind.range = kind.range || 0;
  kind.charge = kind.charge || 0;
  kind.defense = kind.defense || 0;

  if (!kind.slot) {
    if (kind.range > 0) {
      kind.slot = "ranged";
    } else if (kind.damage > 0) {
      kind.slot = "melee";
    } else if (kind.defense > 0) {
      kind.slot = "armor";
    } else {
      kind.slot = null;
    }
  }

  if (kind.frequency && typeof kind.frequency !== "function") {
    kind.frequency = GWU.frequency.make(cfg.frequency);
  }

  if (typeof cfg.armor_flags !== "number") {
    kind.armor_flags = GWU.flag.from_safe(ARMOR_FLAGS, cfg.armor_flags);
  }
  if (typeof cfg.melee_flags !== "number") {
    kind.melee_flags = GWU.flag.from_safe(MELEE_FLAGS, cfg.melee_flags);
  }
  if (typeof cfg.ranged_flags !== "number") {
    kind.ranged_flags = GWU.flag.from_safe(RANGED_FLAGS, cfg.ranged_flags);
  }

  // TODO - Effects

  return kind;
}

export function install(cfg: ItemKindConfig) {
  factory.installKind(cfg);
}

export function getKind(id: string): ItemKind | null {
  return factory.getKind(id);
}
