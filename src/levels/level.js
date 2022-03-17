import "../../lib/gw-utils.js";
import * as MAP from "../map/index.js";
import * as ACTOR from "../actor/index.js";
import * as FX from "../fx/index.js";

export class Level {
  constructor(cfg) {
    this.depth = cfg.depth || 1;

    if (cfg.map) {
      this.map = cfg.map;
    } else if (cfg.data || cfg.cells) {
      this.map = MAP.from(cfg);
    } else if (cfg.width && cfg.height) {
      this.map = new MAP.Map(cfg.width, cfg.height);
      this.map.fill("FLOOR");
      GWU.xy.forBorder(this.map.width, this.map.height, (x, y) =>
        this.map.setTile(x, y, "WALL")
      );
    } else {
      throw new Error("Invalid level config.");
    }

    if (cfg.seed) {
      this.map.rng.seed(cfg.seed);
    }

    this.flags = null;

    // Need to ensure stairs...

    // - start
    this.startLoc = cfg.start || [1, 1];
    // - finish
    this.finishLoc = cfg.finish || [58, 33];

    if (cfg.welcome) {
      this.welcome = cfg.welcome;
    } else {
      this.welcome = "Welcome.";
    }

    if (cfg.proceed) {
      this.proceed = cfg.proceed;
    } else {
      this.proceed = "Proceed.";
    }

    if (cfg.waves) {
      this.waves = cfg.waves;
    } else {
      this.waves = [{ delay: 500, horde: "zombie", count: 1 }];
    }

    this.done = false;
    this.started = false;
    this.wavesLeft = 0;
  }

  start(game) {
    this.wavesLeft = this.waves.length;
    this.done = false;
    this.started = false;

    this.flags = GWU.grid.alloc(this.map.width, this.map.height);

    // put player in starting location

    const startLoc = game.map.rng.matchingLocNear(
      this.startLoc[0],
      this.startLoc[1],
      (x, y) => game.map.hasTile(x, y, "FLOOR")
    );
    ACTOR.spawn(game, game.player, startLoc[0], startLoc[1]).then(() => {
      this.started = true;

      this.waves.forEach((wave) => {
        game.wait(wave.delay, () => {
          wave.count = wave.count || 1;
          for (let i = 0; i < wave.count; ++i) {
            ACTOR.spawn(game, wave.horde);
          }
          --this.wavesLeft;
        });
      });
    });

    if (this.welcome) {
      game.addMessage(this.welcome);
    }
  }

  stop(game) {
    GWU.grid.free(this.flags);
    this.flags = null;
  }

  tick(game) {
    if (this.done || !this.started) return;

    if (!game.actors.includes(game.player)) {
      // lose
      return game.lose();
    }

    if (this.wavesLeft) return;

    if (game.actors.length > 1) return;
    // win level
    this.done = true;
    if (this.proceed) {
      game.addMessage(this.proceed);
    }
    const inactiveStairs = MAP.tilesByName["INACTIVE_STAIRS"].index;
    game.map._tiles.forEach((index, x, y) => {
      if (index === inactiveStairs) {
        FX.flash(game, x, y, "yellow").then(() => {
          game.setTile(x, y, "UP_STAIRS");
        });
      }
    });
  }

  setPath(path) {
    if (!this.flags) return;
    this.flags.fill(0);

    path.forEach((loc) => {
      this.flags[loc[0]][loc[1]] = 1;
    });
  }

  isInPath(x, y) {
    if (!this.flags) return false;
    return this.flags.get(x, y) === 1;
  }

  clearPath() {
    if (!this.flags) return;
    this.flags.fill(0);
  }
}

export const levels = [];

export function install(cfg) {
  const level = new Level(cfg);
  levels.push(level);
  level.depth = levels.length;
  return level;
}
