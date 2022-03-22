import "../../lib/gw-utils.js";
import * as ACTOR from "../actor/index.js";
import * as FX from "../fx/index.js";

import * as TILE from "./tiles.js";

export class Level {
  constructor(width, height, seed) {
    this.depth = 0;
    this.flags = null;

    this.welcome = "";
    this.proceed = "";
    this.waves = [];

    this.done = false;
    this.started = false;
    this.wavesLeft = 0;

    this.actors = [];
    this.items = [];
    this.fxs = [];

    this.game = null;
    this.player = null;

    this.tiles = GWU.grid.make(width, height);
    this.rng = GWU.random;

    this.locations = {};
  }

  get width() {
    return this.tiles.width;
  }
  get height() {
    return this.tiles.height;
  }

  hasXY(x, y) {
    return this.tiles.hasXY(x, y);
  }

  start(game) {
    this.game = game;
    this.player = game.player;
    this.wavesLeft = this.waves.length;
    this.done = false;
    this.started = false;
    this.rng = game.rng;

    this.flags = GWU.grid.alloc(this.width, this.height);

    // put player in starting location
    let startLoc = this.locations.start;

    startLoc = this.rng.matchingLocNear(startLoc[0], startLoc[1], (x, y) =>
      this.hasTile(x, y, "FLOOR")
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

    this.tiles.forEach((index, x, y) => {
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
    this.tiles.forEach((index, x, y) => {
      if (index === inactiveStairs) {
        FX.flash(game, x, y, "yellow").then(() => {
          game.level.setTile(x, y, "UP_STAIRS");
        });
      }
    });
  }

  fill(tile) {
    if (typeof tile === "string") {
      tile = TILE.tilesByName[tile];
    }
    this.tiles.fill(tile);
  }

  setTile(x, y, id, opts = {}) {
    const tile =
      typeof id === "string" ? TILE.tilesByName[id] : TILE.tilesByIndex[id];

    this.tiles[x][y] = tile.index;

    // priority, etc...

    // this.game && this.game.drawAt(x, y);
    if (tile.on && tile.on.place) {
      tile.on.place(this.game, x, y);
    }
  }

  hasTile(x, y, tile) {
    if (typeof tile === "string") {
      tile = TILE.tilesByName[tile].index;
    }
    return this.tiles.get(x, y) === tile;
  }

  getTile(x, y) {
    const id = this.tiles.get(x, y) || 0;
    return TILE.tilesByIndex[id];
  }

  //

  blocksMove(x, y) {
    const tile = this.getTile(x, y);
    return tile.blocksMove || false;
  }

  //

  drawAt(buf, x, y) {
    buf.blackOut(x, y);
    buf.drawSprite(x, y, this.getTile(x, y));

    const item = this.itemAt(x, y);
    item && item.draw(buf);

    const actor = this.actorAt(x, y);
    actor && actor.draw(buf);

    const fx = this.fxAt(x, y);
    fx && fx.draw(buf);
  }

  actorAt(x, y) {
    return this.actors.find((a) => a.x === x && a.y === y);
  }

  addActor(obj) {
    this.actors.push(obj);
    obj.trigger("add", this);
    // this.scene.needsDraw = true; // need to update sidebar too
  }

  removeActor(obj) {
    GWU.arrayDelete(this.actors, obj);
    obj.trigger("remove", this);
    // this.scene.needsDraw = true;
  }

  hasActor(x, y) {
    return this.actors.some((a) => a.x === x && a.y === y);
  }

  itemAt(x, y) {
    return this.items.find((i) => i.x === x && i.y === y);
  }

  addItem(obj) {
    this.items.push(obj);
    obj.trigger("add", this);
    // this.scene.needsDraw = true; // need to update sidebar too
  }

  removeItem(obj) {
    GWU.arrayDelete(this.items, obj);
    obj.trigger("remove", this);
    // this.scene.needsDraw = true;
  }

  hasItem(x, y) {
    return this.items.some((i) => i.x === x && i.y === y);
  }

  fxAt(x, y) {
    return this.fxs.find((i) => i.x === x && i.y === y);
  }

  addFx(obj) {
    this.fxs.push(obj);
    obj.trigger("add", this);
    // this.scene.needsDraw = true; // need to update sidebar too
  }

  removeFx(obj) {
    GWU.arrayDelete(this.fxs, obj);
    obj.trigger("remove", this);
    // this.scene.needsDraw = true;
  }

  hasFx(x, y) {
    return this.fxs.some((f) => f.x === x && f.y === y);
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

  triggerAction(event, actor) {
    const tile = this.getTile(actor.x, actor.y);
    if (tile && tile.on && tile.on[event]) {
      tile.on[event](this.game, actor);
    }
  }
}

export const levels = [];

export function install(cfg) {
  const level = from(cfg);
  levels.push(level);
  level.depth = level.depth || levels.length;
  return level;
}

export function from(cfg) {
  const data = cfg.data || cfg.cells;
  const tiles = cfg.tiles;

  const h = cfg.height || data.length;
  const w = cfg.width || data[0].length;

  const level = new Level(w, h);
  level.depth = cfg.depth || levels.length + 1;
  // loadLevel(level, data, tiles);
  digLevel(level, cfg.seed);

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

  // if (cfg.start) {
  //   level.startLoc = cfg.start;
  // }
  // if (cfg.finish) {
  //   level.finishLoc = cfg.finish;
  // }

  return level;
}

function loadLevel(level, data, tiles) {
  level.fill("NONE");
  for (let y = 0; y < data.length; ++y) {
    const line = data[y];
    for (let x = 0; x < line.length; ++x) {
      const ch = line[x];
      const tile = tiles[ch] || "NONE";
      level.setTile(x, y, tile);
    }
  }
}

GWD.room.install("ENTRANCE", new GWD.room.BrogueEntrance());
GWD.room.install("ROOM", new GWD.room.Rectangular());

GWD.room.install(
  "BIG_ROOM",
  new GWD.room.Rectangular({ width: "10-20", height: "5-10" })
);
GWD.room.install("CROSS", new GWD.room.Cross({ width: "8-12", height: "5-7" }));
GWD.room.install(
  "SYMMETRICAL_CROSS",
  new GWD.room.SymmetricalCross({
    width: "8-10",
    height: "5-8",
  })
);
GWD.room.install(
  "SMALL_ROOM",
  new GWD.room.Rectangular({
    width: "6-10",
    height: "4-8",
  })
);
GWD.room.install(
  "LARGE_ROOM",
  new GWD.room.Rectangular({
    width: "15-20",
    height: "10-20",
  })
);
GWD.room.install(
  "HUGE_ROOM",
  new GWD.room.Rectangular({
    width: "20-30",
    height: "20-30",
  })
);
GWD.room.install(
  "SMALL_CIRCLE",
  new GWD.room.Circular({
    width: "4-6",
    height: "4-6",
  })
);
GWD.room.install(
  "LARGE_CIRCLE",
  new GWD.room.Circular({
    width: 10,
    height: 10,
  })
);
GWD.room.install(
  "BROGUE_DONUT",
  new GWD.room.BrogueDonut({
    width: 10,
    height: 10,
    ringMinWidth: 3,
    holeMinSize: 3,
    holeChance: 50,
  })
);
GWD.room.install(
  "COMPACT_CAVE",
  new GWD.room.Cavern({
    width: 12,
    height: 8,
  })
);
GWD.room.install(
  "LARGE_NS_CAVE",
  new GWD.room.Cavern({
    width: 12,
    height: 27,
  })
);
GWD.room.install(
  "LARGE_EW_CAVE",
  new GWD.room.Cavern({
    width: 27,
    height: 8,
  })
);
GWD.room.install(
  "BROGUE_CAVE",
  new GWD.room.ChoiceRoom({
    choices: ["COMPACT_CAVE", "LARGE_NS_CAVE", "LARGE_EW_CAVE"],
  })
);
GWD.room.install("HUGE_CAVE", new GWD.room.Cavern({ width: 77, height: 27 }));
GWD.room.install(
  "CHUNKY",
  new GWD.room.ChunkyRoom({
    width: 10,
    height: 10,
  })
);

GWD.room.install(
  "PROFILE",
  new GWD.room.ChoiceRoom({
    choices: {
      ROOM: 10,
      CROSS: 20,
      SYMMETRICAL_CROSS: 20,
      LARGE_ROOM: 5,
      SMALL_CIRCLE: 10,
      LARGE_CIRCLE: 5,
      BROGUE_DONUT: 5,
      CHUNKY: 10,
    },
  })
);

GWD.room.install(
  "FIRST_ROOM",
  new GWD.room.ChoiceRoom({
    choices: {
      ROOM: 5,
      CROSS: 5,
      SYMMETRICAL_CROSS: 5,
      LARGE_ROOM: 5,
      HUGE_ROOM: 5,
      LARGE_CIRCLE: 5,
      BROGUE_DONUT: 5,
      BROGUE_CAVE: 30, // These are harder to match
      HUGE_CAVE: 30, // ...
      ENTRANCE: 5,
      CHUNKY: 5,
    },
  })
);

function digLevel(level, seed = 12345) {
  const firstRoom = level.depth < 2 ? "ENTRANCE" : "FIRST_ROOM";
  const digger = new GWD.Digger({
    seed,
    rooms: { count: 20, first: firstRoom, digger: "PROFILE" },
    doors: false, // { chance: 50 },
    halls: { chance: 50 },
    loops: { minDistance: 20, maxLength: 5 },
    lakes: false /* {
      count: 5,
      wreathSize: 1,
      wreathChance: 100,
      width: 10,
      height: 10,
    },
    bridges: {
      minDistance: 10,
      maxLength: 10,
    }, */,
    stairs: { start: "down", up: true, upTile: "INACTIVE_STAIRS", down: true },
    goesUp: true,
  });
  digger.create(60, 35, (x, y, v) => {
    level.setTile(x, y, v);
  });

  level.locations = digger.locations;
}
