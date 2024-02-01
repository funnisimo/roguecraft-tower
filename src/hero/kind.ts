import * as GWU from "gw-utils";
import { CallbackFn, ObjMakeOpts, ObjEvents } from "../game/obj";
import { Hero, HeroMakeOpts as HeroCreateOpts } from "./hero";
import { Level } from "../level";
import { Item } from "../item";
import * as ACTOR from "../actor";
import { SidebarEntry } from "../widgets";

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

export interface HeroKindConfig extends Omit<ACTOR.ActorKindOpts, "on"> {
  on?: HeroEvents & ObjEvents;
  slots?: { [id: string]: string };
}

export interface HeroKind extends Omit<ACTOR.ActorKind, "on"> {
  on: HeroEvents & ObjEvents;
  slots: { [id: string]: string };
}

export const kinds: Record<string, HeroKind> = {};

// @ts-ignore
globalThis.HeroKinds = kinds;

export function makeKind(cfg: HeroKindConfig) {
  let kind: HeroKind;

  kind = ACTOR.makeKind(
    cfg as unknown as ACTOR.ActorKindOpts
  ) as unknown as HeroKind;

  kind = Object.assign(kind, {
    slots: {},
  }) as HeroKind;

  if (cfg.slots) {
    kind.slots = cfg.slots;
  }

  return kind;
}

export function install(cfg: HeroKindConfig) {
  const kind = makeKind(cfg);

  kinds[kind.id.toLowerCase()] = kind;
}

export function getKind(id: string): HeroKind | null {
  return kinds[id.toLowerCase()] || null;
}
