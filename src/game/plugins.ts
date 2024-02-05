import * as GWU from "gw-utils";
import * as GWD from "gw-dig";
import * as ACTOR from "../actor";
import * as HERO from "../hero";
import * as ITEM from "../item";
import * as LEVEL from "../level";
import { Game, GameEvents, GameOpts } from "./game";
import * as GAME from "./factory";
import * as TILE from "../tile";
import { ObjEvents } from "../object";
import * as CMD from "../command";

namespace global {
  var GAME: Game;
}

export interface AppEvents {
  start?(app: GWU.app.App);
  stop?(app: GWU.app.App);
}

export interface Plugin extends GameOpts {
  name: string;
  plugins?: string[];
  app?: AppEvents;
  tile?: TILE.TilePlugin;
  game?: GameEvents & ObjEvents;
  level?: LEVEL.LevelPlugin;
  actor?: ACTOR.ActorPlugin;
  hero?: HERO.HeroPlugin;
  item?: ITEM.ItemPlugin;
  kinds?: {
    level?: LEVEL.LevelConfigSet | LEVEL.LevelConfigSet[];
    actor?: ACTOR.ActorKindConfigSet | ACTOR.ActorKindConfigSet[];
    hero?: HERO.HeroKindConfigSet | HERO.HeroKindConfigSet[];
    item?: ITEM.ItemKindConfigSet | ITEM.ItemKindConfigSet[];
    tile?: TILE.TileConfigSet | TILE.TileConfigSet[];
  };
  commands?: CMD.CommandSet | CMD.CommandSet[];
}

export const plugins: Record<string, Plugin> = {};

const active: Plugin[] = [];

// @ts-ignore
globalThis.PLUGINS = plugins;

// function NOFUNC(
//   req: any,
//   next: () => GWU.Result<any, string>
// ): GWU.Result<any, string> {
//   return next();
// }

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export function install(plugin: Plugin);
export function install(name: string, cfg: WithOptional<Plugin, "name">);
export function install(...args: any[]) {
  let plugin: Plugin;
  let name: string;
  if (args.length == 1) {
    plugin = args[0];
    name = plugin.name;
  } else {
    name = args[0];
    plugin = Object.assign(
      {
        name,
        plugins: [],
      },
      args[1]
    );

    // TODO - Is this necessary?
    if (plugin.name != name) {
      plugin.name = name;
    }
  }

  plugins[name.toLowerCase()] = plugin;
}

export function getPlugin(id: string): Plugin | null {
  return plugins[id.toLowerCase()] || null;
}

export function startPlugins(app: GWU.app.App, ...names: (string | Plugin)[]) {
  names.forEach((name_or_plugin) => {
    let plugin: Plugin;
    let name: string;
    if (typeof name_or_plugin === "string") {
      name = name_or_plugin;
      // if already started, ignore
      if (!active.find((p) => p.name == name)) {
        plugin = getPlugin(name);
      }
    } else {
      plugin = name_or_plugin;
      name = plugin.name;
    }

    if (plugin) {
      console.log("Starting plugin: " + name);
      // start dependencies
      if (Array.isArray(plugin.plugins) && plugin.plugins.length) {
        startPlugins(app, ...plugin.plugins);
      }

      // install factory plugins
      if (plugin.game) {
        GAME.use(plugin.game);
      }
      if (plugin.actor) {
        ACTOR.use(plugin.actor);
      }
      if (plugin.hero) {
        HERO.use(plugin.hero);
      }
      if (plugin.item) {
        ITEM.use(plugin.item);
      }
      if (plugin.level) {
        LEVEL.use(plugin.level);
      }
      if (plugin.tile) {
        GWD.site.tileFactory.use(plugin.tile);
      }
      if (plugin.commands) {
        CMD.installSet(plugin.commands);
      }

      // Start the plugin
      if (plugin.app && plugin.app.start) {
        plugin.app.start(app);
      }

      active.push(plugin);
    } else {
      console.error(`MISSING PLUGIN: ${name}`);
    }
  });

  active.forEach((p) => {
    // TODO - commands
    // TODO - actions

    if (p.actor && p.actor.kinds) {
      ACTOR.installSet(p.actor.kinds);
    }
    if (p.kinds && p.kinds.actor) {
      ACTOR.installSet(p.kinds.actor);
    }

    if (p.hero && p.hero.kinds) {
      HERO.installSet(p.hero.kinds);
    }
    if (p.kinds && p.kinds.hero) {
      HERO.installSet(p.kinds.hero);
    }

    if (p.item && p.item.kinds) {
      ITEM.installSet(p.item.kinds);
    }
    if (p.kinds && p.kinds.item) {
      ITEM.installSet(p.kinds.item);
    }

    if (p.tile && p.tile.tiles) {
      TILE.installSet(p.tile.tiles);
    }
    if (p.kinds && p.kinds.tile) {
      TILE.installSet(p.kinds.tile);
    }

    if (p.level && p.level.kinds) {
      LEVEL.installSet(p.level.kinds);
    }
    if (p.kinds && p.kinds.level) {
      LEVEL.installSet(p.kinds.level);
    }
    // TODO - hordes
    // TODO - tiles
  });
}
