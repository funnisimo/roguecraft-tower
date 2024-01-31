import { Game, GameEvents, GameOpts } from "./game";
import * as GWU from "gw-utils";

export class GameFactory {
  plugins: GameEvents[] = [];

  use(plugin: GameEvents) {
    this.plugins.push(plugin);
  }

  make(app: GWU.app.App, opts: GameOpts = {}): Game {
    let game: Game;
    const makePlugin = this.plugins.find((p) => typeof p.make === "function");
    if (makePlugin) {
      game = makePlugin.make(app, opts);
    } else {
      game = new Game(app);
    }

    this.apply(game);

    game._create(opts);

    game.emit("create", game, opts);

    globalThis.GAME = game;

    return game;
  }

  apply(game: Game) {
    this.plugins.forEach((p) => {
      Object.entries(p).forEach(([key, val]) => {
        if (typeof val === "function") {
          game.on(key, val);
        } else {
          console.warn("Invalid member of 'game' events on plugin: " + key);
        }
      });
    });
  }
}

export const factory = new GameFactory();

export function use(plugin: GameEvents) {
  factory.use(plugin);
}

export function make(app: GWU.app.App, opts: GameOpts): Game {
  const game = factory.make(app, opts);
  return game;
}
