import * as GWU from "gw-utils";
import { Game, Level } from ".";

export interface Plugin {
  name: string;
  start(app: GWU.app.App);
  stop(app: GWU.app.App);

  new_game(game: Game);
  new_level(game: Game, level: Level);
}

export const plugins: Record<string, Plugin> = {};

// @ts-ignore
globalThis.PLUGINS = plugins;

export function install(name: string, cfg: Partial<Plugin>) {
  const plugin = Object.assign(
    {
      name,
      start: () => {},
      stop: () => {},

      new_game: () => {},
      new_level: () => {},
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
