import "../../lib/gw-utils.js";
import * as ACTOR from "../actor/index.js";
import * as FX from "../fx/index.js";

import * as TILE from "./tiles.js";

export class Level extends GWD.site.Site {
  constructor(width, height, seed) {
    super(width, height, seed);
    this.depth = 0;

    this.flags = null;

    this.welcome = "";
    this.proceed = "";
    this.waves = [];

    this.startLoc = [-1, -1];
    this.finishLoc = [-1, -1];

    this.done = false;
    this.started = false;
    this.wavesLeft = 0;

    this.actors = [];
    this.items = [];
    this.game = null;
    this.player = null;
  }

  start(game) {
    this.game = game;
    this.player = game.player;
    this.wavesLeft = this.waves.length;
    this.done = false;
    this.started = false;

    this.flags = GWU.grid.alloc(this.width, this.height);

    // put player in starting location

    const startLoc = this.rng.matchingLocNear(
      this.startLoc[0],
      this.startLoc[1],
      (x, y) => this.hasTile(x, y, "FLOOR")
    );
    ACTOR.spawn(this, game.player, startLoc[0], startLoc[1]).then(() => {
      this.started = true;

      this.waves.forEach((wave) => {
        game.wait(wave.delay, () => {
          wave.count = wave.count || 1;
          for (let i = 0; i < wave.count; ++i) {
            ACTOR.spawn(this, wave.horde);
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
    this.game = null;
  }

  tick(game) {
    if (this.done || !this.started) return;

    this._tiles.forEach((index, x, y) => {
      const tile = TILE.tilesByIndex[index];
      if (tile.on && tile.on.tick) {
        tile.on.tick.call(tile, game, x, y);
      }
    });

    if (!this.actors.includes(game.player)) {
      // lose
      return game.lose();
    }

    if (this.wavesLeft) return;

    if (this.actors.length > 1) return;
    // win level
    this.done = true;
    if (this.proceed) {
      game.addMessage(this.proceed);
    }
    const inactiveStairs = TILE.tilesByName["INACTIVE_STAIRS"].index;
    this._tiles.forEach((index, x, y) => {
      if (index === inactiveStairs) {
        FX.flash(game, x, y, "yellow").then(() => {
          game.level.setTile(x, y, "UP_STAIRS");
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

  fill(tile) {
    if (typeof tile === "string") {
      tile = TILE.ids[tile];
    }
    this._tiles.fill(tile);
  }

  setTile(x, y, id) {
    const tile =
      typeof id === "string" ? TILE.tilesByName[id] : TILE.tilesByIndex[id];
    super.setTile(x, y, tile.index);

    this.game && this.game.drawAt(x, y);
    if (tile.on && tile.on.place) {
      tile.on.place(this.game, x, y);
    }
  }

  drawAt(buf, x, y) {
    buf.blackOut(x, y);
    buf.drawSprite(x, y, this.getTile(x, y));
  }

  actorAt(x, y) {
    return this.actors.find((a) => a.x === x && a.y === y);
  }

  itemAt(x, y) {
    return this.items.find((i) => i.x === x && i.y === y);
  }

  add(obj) {
    this.actors.push(obj);
    obj.trigger("add", this);
    // this.scene.needsDraw = true; // need to update sidebar too
  }

  remove(obj) {
    GWU.arrayDelete(this.actors, obj);
    obj.trigger("remove", this);
    // this.scene.needsDraw = true;
  }

  getFlavor(x, y) {
    if (!this.hasXY(x, y)) return "";

    const actor = this.actorAt(x, y);
    if (actor && actor.kind) {
      return `You see a ${actor.kind.id}.`;
    }

    const item = this.itemAt(x, y);
    if (item && item.kind) {
      return `You see a ${item.kind.id}.`;
    }

    const tile = this.getTile(x, y);
    const text = `You see ${tile.id}.`;
    return text;
  }
}

export const levels = [];

export function install(cfg) {
  const level = from(cfg);
  levels.push(level);
  level.depth = levels.length;
  return level;
}

export function from(cfg) {
  const data = cfg.data || cfg.cells;
  const tiles = cfg.tiles;

  const h = data.length;
  const w = data[0].length;

  const level = new Level(w, h);
  GWD.site.loadSite(level, data, tiles);

  if (cfg.welcome) {
    level.welcome = cfg.welcome;
  } else {
    level.welcome = "Welcome.";
  }

  if (cfg.proceed) {
    level.proceed = cfg.proceed;
  } else {
    level.proceed = "Proceed.";
  }

  if (cfg.waves) {
    level.waves = cfg.waves;
  } else {
    level.waves = [{ delay: 500, horde: "zombie", count: 1 }];
  }

  if (cfg.start) {
    level.startLoc = cfg.start;
  }
  if (cfg.finish) {
    level.finishLoc = cfg.finish;
  }

  return level;
}
