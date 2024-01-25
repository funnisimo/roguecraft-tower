import * as GWU from "gw-utils";
import * as GWD from "gw-dig";
import { Game, Level, Obj } from ".";
import { TileInfo } from "../tile";
import { Actor } from "../actor";
import { Item } from "../item";
import { FX } from "../fx";
import { SidebarEntry } from "../widgets";
import { DamageConfig } from "../effect";

// TODO - Allow fail type to be set (for enums)
export class Result<T> {
  value: T | undefined;

  constructor(value?: T) {
    this.value = value;
  }

  fail() {
    this.value = undefined;
  }
  ok(val: T) {
    this.value = val;
  }

  isOk(): boolean {
    return this.value !== undefined;
  }

  isFail(): boolean {
    return !this.isOk();
  }
}

export type PluginFn<In, Out = null> = (
  req: In,
  next: () => Result<Out>
) => Result<Out>;

export interface Plugin {
  name: string;
  plugins: string[];
  // App
  start(app: GWU.app.App);
  stop(app: GWU.app.App);

  // Game
  new_game: PluginFn<{ game: Game }>;
  dig_level: PluginFn<{ cfg: GWD.DungeonOptions; id: string }, Level>;
  new_level: PluginFn<{ game: Game; level: Level }>;
  start_level: PluginFn<{ game: Game; level: Level }>;

  // Level
  level_tick: PluginFn<{ level: Level; time: number }>;
  set_tile: PluginFn<{ level: Level; tile: TileInfo; x: number; y: number }>;

  // Object
  spawn: PluginFn<{ level: Level; obj: Obj }>;
  tick: PluginFn<{ obj: Obj; time: number }>;
  sidebar: PluginFn<{ obj: Obj; entry: SidebarEntry }>;
  add: PluginFn<{ obj: Obj; level: Level; x: number; y: number }>;
  remove: PluginFn<{ obj: Obj; level: Level }>;
  move: PluginFn<{ level: Level; obj: Obj; x: number; y: number }>;
  destroy: PluginFn<{ level: Level; obj: Obj }>;

  // Actor
  calc_melee: PluginFn<{
    actor: Actor;
    target: Actor;
    range: number;
    item: Item | null;
    damage: DamageConfig;
  }>;
  calc_ranged: PluginFn<{
    actor: Actor;
    target: Actor;
    range: number;
    item: Item | null;
    damage: DamageConfig;
  }>;
  calc_damage: PluginFn<{ actor: Actor; target: Actor; damage: DamageConfig }>;
  // apply_damage: PluginFn<{ actor: Actor; damage: DamageConfig }>;
  charge_ranged: PluginFn<{ actor: Actor; item: Item }>;
  equip: PluginFn<{ actor: Actor; item: Item; slot: string }>;
  unequip: PluginFn<{ actor: Actor; item: Item; slot: string }>;

  // Item
  pickup: PluginFn<{ actor: Actor; item: Item }>;
}

export const plugins: Record<string, Plugin> = {};

const active: Plugin[] = [];

// @ts-ignore
globalThis.PLUGINS = plugins;

function NOFUNC(req: any, next: () => Result<any>): Result<any> {
  return next();
}

export function install(name: string, cfg: Partial<Plugin>) {
  const plugin = Object.assign(
    {
      name,
      plugins: [],
      start: GWU.NOOP,
      stop: GWU.NOOP,

      new_game: NOFUNC,
      dig_level: NOFUNC,
      new_level: NOFUNC,
      start_level: NOFUNC,

      // Level
      level_tick: NOFUNC,
      set_tile: NOFUNC,

      // Object
      spawn: NOFUNC,
      tick: NOFUNC,
      sidebar: NOFUNC,
      add: NOFUNC,
      remove: NOFUNC,
      move: NOFUNC,
      destroy: NOFUNC,

      // Actor
      calc_melee: NOFUNC,
      calc_ranged: NOFUNC,
      calc_damage: NOFUNC,
      apply_damage: NOFUNC,
      charge_ranged: NOFUNC,
      equip: NOFUNC,
      unequip: NOFUNC,

      // Item
      pickup: NOFUNC,
    },
    cfg
  ) as Plugin;

  if (plugin.name != name) {
    plugin.name = name;
  }

  plugins[name.toLowerCase()] = plugin;
}

export function getPlugin(id: string): Plugin | null {
  return plugins[id.toLowerCase()] || null;
}

export function start(app: GWU.app.App, ...names: string[]) {
  names.forEach((name) => {
    // if already started, ignore
    if (!active.find((p) => p.name == name)) {
      const plugin = getPlugin(name);
      if (plugin) {
        if (plugin.plugins.length) {
          start(app, ...plugin.plugins);
        }
        plugin.start(app);
        active.push(plugin);
      } else {
        console.error(`MISSING PLUGIN: ${name}`);
      }
    }
  });
}

export type NextFn<Out> = () => Result<Out>;

/**
 * Helper function for invoking a chain of middlewares on a context.
 */
function invoke<In, Out>(
  req: In,
  fns: PluginFn<In, Out>[],
  base: (In) => Result<Out>
): Result<Out> {
  if (!fns.length) return base(req);

  const fn = fns[0];

  return fn(req, () => {
    return invoke(req, fns.slice(1), base);
  });
}

export function trigger<In, Out = null>(
  evt: keyof Plugin,
  req: In,
  base: (req: In) => Result<Out>
): Result<Out> {
  const fns = active.map((p) => {
    // @ts-ignore
    return p[evt].bind(p);
  });
  return invoke(req, fns, base);
}
