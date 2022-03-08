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
        this.map.setTile(x, y, MAP.ids.WALL)
      );
    } else {
      throw new Error("Invalid level config.");
    }

    if (cfg.seed) {
      this.map.rng.seed(cfg.seed);
    }

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

    // put player in starting location

    const startLoc = game.map.rng.matchingLocNear(
      this.startLoc[0],
      this.startLoc[1],
      (x, y) => game.map.hasTile(x, y, MAP.ids.FLOOR)
    );
    game.player.x = startLoc[0];
    game.player.y = startLoc[1];
    FX.flash(game, game.player.x, game.player.y, "yellow", 500).then(() => {
      game.add(game.player);
      this.started = true;
    });

    if (this.welcome) {
      game.addMessage(this.welcome);
    }

    this.waves.forEach((wave) => {
      game.wait(wave.delay, () => {
        wave.count = wave.count || 1;
        for (let i = 0; i < wave.count; ++i) {
          ACTOR.spawn(game, wave.horde);
        }
        --this.wavesLeft;
      });
    });
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
    game.map.cells.forEach((id, x, y) => {
      if (id === MAP.ids.INACTIVE_STAIRS) {
        FX.flash(game, x, y, "yellow").then(() => {
          game.setTile(x, y, MAP.ids.UP_STAIRS);
        });
      }
    });
  }
}

export const levels = [];

export function install(cfg) {
  const level = new Level(cfg);
  levels.push(level);
  level.depth = levels.length;
  return level;
}
