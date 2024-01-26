import * as GWU from "gw-utils";
import * as SCENES from "../scenes";
// import { Game } from "./game";
import * as PLUGINS from "./plugins";

// export type GameFn = (Game) => void;

declare module "gw-utils" {
  export namespace app {
    export interface AppOpts {
      plugins?: string[];
      seed?: number;
    }
  }
}

export function make(config: GWU.app.AppOpts): GWU.app.App {
  const appOpts = Object.assign(
    {
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
      plugins: [],
    },
    config
  );

  if (config.seed > 0) {
    GWU.rng.random.seed(config.seed);
  }

  const app = GWU.app.make(appOpts);

  // Start Plugins...
  PLUGINS.start(app, ...config.plugins);

  return app;
}
