import * as GWU from "gw-utils";
import * as SCENES from "../scenes";
import { Game } from "./game";
import { plugins } from "./plugins";

export type GameFn = (Game) => void;

export interface GameAppConfig {
  name: string;
  div: string;
  console: [number, number];
  scenes: { [id: string]: GWU.app.SceneOpts };
  start_scene: string;

  plugins: string[];
}

export function make(config: Partial<GameAppConfig>): GWU.app.App {
  const appOpts = {
    name: "Goblinwerks",
    width: 90,
    height: 45,
    div: "game",
    scenes: {
      title: SCENES.title,
      level: SCENES.level,
      win: SCENES.win,
      lose: SCENES.lose,
      help: SCENES.help,
      reward: SCENES.reward,
    },
    start: "title",
  };

  if (config.name !== undefined) {
    appOpts.name = config.name;
  }
  if (config.div !== undefined) {
    appOpts.div = config.div;
  }
  if (Array.isArray(config.console) && config.console.length == 2) {
    appOpts.width = config.console[0];
    appOpts.height = config.console[1];
  }
  if (config.scenes) {
    Object.assign(appOpts.scenes, config.scenes);
  }
  if (config.start_scene) {
    appOpts.start = config.start_scene;
  }

  const app = GWU.app.make(appOpts);

  // Start Plugins...
  Object.values(plugins).forEach((p) => p.start(app));

  return app;
}
