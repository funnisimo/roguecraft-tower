import * as GWU from "gw-utils";
import * as OBJ from "../object";
import { Hero, HeroMakeOpts as HeroCreateOpts } from "./hero";
import { Level } from "../level";
import { Item } from "../item";
import * as ACTOR from "../actor";
import { SidebarEntry } from "../widgets";
import { HeroKindConfigSet, factory } from "./factory";

export type HeroCtorFn = (
  kind: HeroKind,
  opts: HeroCreateOpts
) => GWU.Option<Hero>;
export type HeroCreateFn = (hero: Hero, opts: HeroCreateOpts) => void;
export type HeroSpawnFn = (level: Level, hero: Hero) => void;
export type HeroDestroyFn = (level: Level, hero: Hero) => void;

export type HeroLocFn = (
  level: Level,
  hero: Hero,
  x: number,
  y: number
) => void;

export type HeroItemFn = (level: Level, hero: Hero, item: Item) => void;

export interface HeroEvents {
  // bump?: (game: Game, hero: Hero, other: Hero) => void;
  ctor?: HeroCtorFn;
  create?: HeroCreateFn;
  destroy?: HeroDestroyFn; // Hero is destroyed (different from death?)

  add?: HeroSpawnFn; // Fired when an Hero is placed into the map at creation time
  remove?: HeroSpawnFn;

  move?: HeroLocFn;
  death?: (level: Level, hero: Hero) => void; // TODO - use destroy instead?

  sidebar?: (hero: Hero, entry: SidebarEntry) => void;
  turn_start?: (level: Level, hero: Hero) => void;
  turn_end?: (level: Level, hero: Hero, time: number) => void;
  tick?: (level: Level, hero: Hero, time: number) => void;

  pickup?: HeroItemFn;
  drop?: HeroItemFn;

  equip?: HeroItemFn;
  unequip?: HeroItemFn;

  use?: HeroItemFn;
}

export interface HeroKindConfig
  extends Omit<ACTOR.ActorKindConfig, "on" | "dropChance" | "dropMatch"> {
  on?: HeroEvents & OBJ.ObjEvents;
  slots?: { [id: string]: string };
}

export interface HeroKind
  extends Omit<ACTOR.ActorKind, "on" | "dropChance" | "dropMatch"> {
  on: HeroEvents & OBJ.ObjEvents;
  slots: { [id: string]: string };
}

export function makeKind(cfg: HeroKindConfig) {
  const kind = OBJ.makeKind(cfg) as HeroKind;

  if (!kind.id || kind.id.length === 0) {
    throw new Error("HeroKind must have 'id'.");
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

  // TODO - validate?
  kind.slots = kind.slots || {};

  return kind;
}

export function install(cfg: HeroKindConfig) {
  factory.installKind(cfg);
}

export function installSet(set: HeroKindConfigSet | HeroKindConfigSet[]) {
  let kinds: HeroKindConfigSet[] = [];
  if (!Array.isArray(set)) {
    kinds = [set];
  } else {
    kinds = set;
  }
  kinds.forEach((kindSet) => {
    Object.entries(kindSet).forEach(([k, v]: [string, HeroKindConfig]) => {
      install(v);
    });
  });
}

export function getKind(id: string): HeroKind | null {
  return factory.getKind(id);
}
