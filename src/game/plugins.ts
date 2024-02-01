import * as GWU from "gw-utils";
import * as ACTOR from "../actor";
import * as HERO from "../hero";
import * as ITEM from "../item";
import * as LEVEL from "../level";
import { Game, GameEvents, GameOpts } from "./game";
import * as GAME from "./factory";

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
  game?: GameEvents;
  level?: LEVEL.LevelPlugin;
  actor?: ACTOR.ActorPlugin;
  hero?: HERO.HeroPlugin;
  item?: ITEM.ItemEvents;
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

export function install(plugin: Plugin);
export function install(name: string, cfg: Omit<Plugin, "name">);
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

export function startPlugins(app: GWU.app.App, ...names: string[]) {
  names.forEach((name) => {
    // if already started, ignore
    if (!active.find((p) => p.name == name)) {
      const plugin = getPlugin(name);
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

        // Start the plugin
        if (plugin.app && plugin.app.start) {
          plugin.app.start(app);
        }

        active.push(plugin);
      } else {
        console.error(`MISSING PLUGIN: ${name}`);
      }
    }
  });
}
