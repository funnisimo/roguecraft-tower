import * as GWU from "gw-utils";
import * as SCENES from "../scenes";
import { GameOpts } from "./game";
import { factory } from "./factory";
import { Plugin, startPlugins } from "./plugins";

// export type GameFn = (Game) => void;

export interface StartAppOpts extends Omit<GWU.app.AppOpts, "name">, Plugin {}

export function startApp(config: StartAppOpts): GWU.app.App {
  const appOpts = GWU.utils.mergeDeep(
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
      scene: "title",
      plugins: [],
    },
    config
  ) as StartAppOpts;

  // make the App
  // - default is to start the app which will start the "title" scene
  // - the title screen will make and start a new game
  // - starting a game will make the default level
  // - ... and then start the level kind's screen with that level
  const app = GWU.app.make(appOpts);
  // This will be used when we start the game
  app.data.start_opts = config;

  // Start Plugins...
  startPlugins(app, ...config.plugins);

  return app;
}
