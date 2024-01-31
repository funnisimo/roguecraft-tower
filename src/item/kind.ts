import * as GWU from "gw-utils";
import { Actor } from "../actor";
import { Game } from "../game";
import { Item, ItemCreateOpts } from "./item";
import { CallbackFn, ObjEvents } from "../game/obj";
import { ARMOR_FLAGS, MELEE_FLAGS, RANGED_FLAGS } from "./flags";
import { EffectConfig } from "../effect";
import { Level } from "../level";

export type ItemMakeFn = (kind: ItemKind, opts: ItemCreateOpts) => Item;
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

export interface ItemEvents {
  // bump?: (game: Game, actor: Item, other: Item) => void;
  make?: ItemMakeFn;
  create?: ItemCreateFn;

  spawn?: ItemSpawnFn; // Fired when an item is placed into the map at creation time
  destroy?: ItemDestroyFn; // Item is destroyed

  pickup?: ItemActionFn;
  drop?: ItemActionFn;

  equip?: ItemActionFn;
  unequip?: ItemActionFn;

  use?: ItemActionFn;
}

export interface KindConfig {
  id: string;
  name?: string;

  ch?: string;
  fg?: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  frequency?: GWU.frequency.FrequencyConfig;

  //   bump?: string | string[];
  speed?: number;
  damage?: number;
  combo?: number;
  combo_speed?: number;
  combo_damage?: number;
  range?: number;
  charge?: number; // charge multiplier for speed + damage

  defense?: number;

  slot?: string;

  on?: ItemEvents & ObjEvents;

  tags?: string | string[];
  armor_flags?: string | string[];
  melee_flags?: string | string[];
  ranged_flags?: string | string[];

  effects?: EffectConfig;
}

export interface ItemKind {
  id: string;
  name: string;

  ch: string;
  fg: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;

  //   bump: string[];
  speed: number;
  damage: number;
  combo: number;
  combo_speed: number;
  combo_damage: number;
  range: number;
  charge: number;

  defense: number;

  slot: string | null;
  on: ItemEvents & { [id: string]: CallbackFn };

  frequency: GWU.frequency.FrequencyFn;
  tags: string[];
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

export const kinds: Record<string, ItemKind> = {};

// @ts-ignore
globalThis.ItemKinds = kinds;

export function makeKind(cfg: KindConfig): ItemKind {
  const kind = Object.assign(
    {
      name: "",
      ch: "!",
      fg: "white",
      //   bump: ["attack"],
      on: {},
      frequency: 10,
      speed: 100,
      damage: 0,
      combo: 0,
      combo_speed: 0,
      combo_damage: 0,
      range: 0,
      charge: 0,
      defense: 0,
      slot: null,
      tags: [],
      armor_flags: 0,
      melee_flags: 0,
      ranged_flags: 0,
      effects: {},
    },
    cfg
  ) as ItemKind;

  if (!kind.id || kind.id.length === 0) {
    throw new Error("ItemKind must have 'id'.");
  }

  if (kind.name.length == 0) {
    kind.name = GWU.text.title_case(kind.id.toLowerCase().replace("_", " "));
  }

  if (typeof cfg.tags == "string") {
    kind.tags = cfg.tags.split(/[|,]/).map((v) => v.trim());
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

  //   if (typeof cfg.bump === "string") {
  //     kind.bump = cfg.bump.split(/[,]/g).map((t) => t.trim());
  //   }

  kind.frequency = GWU.frequency.make(kind.frequency);

  if (kind.slot === null) {
    if (kind.range > 0) {
      kind.slot = "ranged";
    } else if (kind.damage > 0) {
      kind.slot = "melee";
    } else if (kind.defense > 0) {
      kind.slot = "armor";
    }
  }
  return kind;
}

export function install(cfg: KindConfig) {
  const kind = makeKind(cfg);

  kinds[kind.id.toLowerCase()] = kind;
}

export function getKind(id: string): ItemKind | null {
  return kinds[id.toLowerCase()] || null;
}
