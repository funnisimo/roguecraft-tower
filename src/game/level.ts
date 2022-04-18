import * as GWU from "gw-utils";
import * as GWD from "gw-dig";

import * as ACTOR from "../actor";
import * as HORDE from "../horde";
import * as FX from "../fx";

import * as TILE from "./tiles";
import * as OBJ from "./obj";
import { Game } from "./game";
import { getDefaultCompilerOptions } from "typescript";

export interface WaveInfo {
  delay?: number;
  horde?: string;
}

export class Level implements GWD.site.LoopSite {
  depth = 0;
  welcome = "";
  proceed = "";

  done = false;
  started = false;
  data: Record<string, any> = {};

  waves: WaveInfo[] = [];
  actors: ACTOR.Actor[] = [];
  items: OBJ.Obj[] = [];
  fxs: FX.FX[] = [];

  tiles: GWU.grid.NumGrid;
  flags: GWU.grid.NumGrid;

  game: Game | null = null;
  player: ACTOR.Player | null = null;

  rng = GWU.random;
  locations: Record<string, GWU.xy.Loc> = {};

  constructor(width: number, height: number, seed = 0) {
    this.tiles = GWU.grid.make(width, height);
    this.flags = GWU.grid.make(this.width, this.height);

    this.data.wavesLeft = 0;
  }

  get width() {
    return this.tiles.width;
  }
  get height() {
    return this.tiles.height;
  }

  hasXY(x: number, y: number) {
    return this.tiles.hasXY(x, y);
  }

  start(game: Game) {
    this.game = game;
    this.player = game.player;
    this.done = false;
    this.started = false;
    this.rng = game.rng;

    // put player in starting location
    let startLoc = this.locations.start || [
      Math.floor(this.width / 2),
      Math.floor(this.height / 2),
    ];

    startLoc = this.rng.matchingLocNear(startLoc[0], startLoc[1], (x, y) =>
      this.hasTile(x, y, "FLOOR")
    );

    game.player.clearGoal();

    ACTOR.spawn(this, game.player, startLoc[0], startLoc[1]).then(() => {
      this.started = true;

      this.data.wavesLeft = this.waves.length;
      this.waves.forEach((wave) => {
        game.wait(wave.delay || 0, () => {
          let horde: HORDE.Horde | null = null;
          if (wave.horde) horde = HORDE.from(wave.horde);
          if (!wave.horde) horde = HORDE.random({ depth: this.depth });

          if (!horde) {
            throw new Error(
              "Failed to get horde: " + JSON.stringify(wave.horde)
            );
          }
          const leader = horde.spawn(this);
          if (!leader) throw new Error("Failed to place horde!");
          leader.once("add", () => {
            --this.data.wavesLeft;
          });
        });
      });
    });

    if (this.welcome) {
      game.addMessage(this.welcome);
    }
  }

  stop(game: Game) {
    this.game = null;
  }

  tick(game: Game) {
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

    // Do we have work left to do on the level?
    if (this.data.wavesLeft > 0) return;
    if (this.actors.length > 1) return;

    // win level
    this.done = true;
    if (this.proceed) {
      game.addMessage(this.proceed);
    }
    const inactiveStairs = TILE.tilesByName["UP_STAIRS_INACTIVE"].index;
    this.tiles.forEach((index, x, y) => {
      if (index === inactiveStairs) {
        FX.flash(game, x, y, "yellow").then(() => {
          game.level!.setTile(x, y, "UP_STAIRS");
        });
      }
    });
  }

  fill(tile: number | string) {
    if (typeof tile === "string") {
      tile = TILE.tilesByName[tile].index;
    }
    this.tiles.fill(tile);
  }

  setTile(x: number, y: number, id: number | string, opts = {}) {
    const tile =
      typeof id === "string" ? TILE.tilesByName[id] : TILE.tilesByIndex[id];

    this.tiles[x][y] = tile.index;

    // priority, etc...

    // this.game && this.game.drawAt(x, y);
    if (tile.on && tile.on.place) {
      tile.on.place.call(tile, this.game!, x, y);
    }
  }

  hasTile(x: number, y: number, tile: number | string) {
    if (typeof tile === "string") {
      tile = TILE.tilesByName[tile].index;
    }
    return this.tiles.get(x, y) === tile;
  }

  getTile(x: number, y: number) {
    const id = this.tiles.get(x, y) || 0;
    return TILE.tilesByIndex[id];
  }

  //

  blocksMove(x: number, y: number) {
    const tile = this.getTile(x, y);
    return tile.blocksMove || false;
  }

  blocksPathing(x: number, y: number) {
    return this.blocksMove(x, y);
  }

  blocksDiagonal(x: number, y: number) {
    const tile = this.getTile(x, y);
    return tile.blocksDiagonal || false;
  }

  isHallway(x: number, y: number): boolean {
    return (
      GWU.xy.arcCount(x, y, (i, j) => {
        return !this.blocksMove(i, j);
      }) > 1
    );
  }

  isSecretDoor(x: number, y: number): boolean {
    const tile = this.getTile(x, y);
    return tile.secretDoor || false;
  }

  // Loopiness

  setInLoop(x: number, y: number): void {
    this.flags[x][y] |= GWD.site.Flags.IN_LOOP;
  }
  clearInLoop(x: number, y: number): void {
    this.flags[x][y] &= ~GWD.site.Flags.IN_LOOP;
  }
  isInLoop(x: number, y: number): boolean {
    return ((this.flags[x][y] || 0) & GWD.site.Flags.IN_LOOP) > 0;
  }

  //

  drawAt(buf: GWU.buffer.Buffer, x: number, y: number) {
    buf.blackOut(x, y);
    buf.drawSprite(x, y, this.getTile(x, y));

    const item = this.itemAt(x, y);
    item && item.draw(buf);

    const actor = this.actorAt(x, y);
    actor && actor.draw(buf);

    const fx = this.fxAt(x, y);
    fx && fx.draw(buf);
  }

  actorAt(x: number, y: number) {
    return this.actors.find((a) => a.x === x && a.y === y);
  }

  addActor(obj: ACTOR.Actor) {
    this.actors.push(obj);
    obj.trigger("add", this);
    // this.scene.needsDraw = true; // need to update sidebar too
  }

  removeActor(obj: ACTOR.Actor) {
    GWU.arrayDelete(this.actors, obj);
    obj.trigger("remove", this);
    // this.scene.needsDraw = true;
  }

  hasActor(x: number, y: number) {
    return this.actors.some((a) => a.x === x && a.y === y);
  }

  itemAt(x: number, y: number) {
    return this.items.find((i) => i.x === x && i.y === y);
  }

  addItem(obj: OBJ.Obj) {
    this.items.push(obj);
    obj.trigger("add", this);
    // this.scene.needsDraw = true; // need to update sidebar too
  }

  removeItem(obj: OBJ.Obj) {
    GWU.arrayDelete(this.items, obj);
    obj.trigger("remove", this);
    // this.scene.needsDraw = true;
  }

  hasItem(x: number, y: number) {
    return this.items.some((i) => i.x === x && i.y === y);
  }

  fxAt(x: number, y: number) {
    return this.fxs.find((i) => i.x === x && i.y === y);
  }

  addFx(obj: FX.FX) {
    this.fxs.push(obj);
    obj.trigger("add", this);
    // this.scene.needsDraw = true; // need to update sidebar too
  }

  removeFx(obj: FX.FX) {
    GWU.arrayDelete(this.fxs, obj);
    obj.trigger("remove", this);
    // this.scene.needsDraw = true;
  }

  hasFx(x: number, y: number) {
    return this.fxs.some((f) => f.x === x && f.y === y);
  }

  getFlavor(x: number, y: number) {
    if (!this.hasXY(x, y)) return "";

    const actor = this.actorAt(x, y);
    if (actor && actor.kind) {
      return `You see a ${actor.kind.id}.`;
    }

    // const item = this.itemAt(x, y);
    // if (item && item.kind) {
    //   return `You see a ${item.kind.id}.`;
    // }

    const tile = this.getTile(x, y);
    const text = `You see ${tile.id}.`;
    return text;
  }

  triggerAction(event: string, actor: ACTOR.Actor) {
    const tile = this.getTile(actor.x, actor.y);
    if (tile && tile.on && tile.on[event]) {
      tile.on[event]!.call(tile, this.game, actor);
    }
  }

  diagonalBlocked(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ): boolean {
    if (fromX == toX || fromY == toY) return false;

    // check if diagonal move is blocked by tiles
    const horiz = this.getTile(toX, fromY);
    if (horiz.blocksDiagonal) return true;
    const vert = this.getTile(fromX, toY);
    if (vert.blocksDiagonal) return true;

    return false;
  }
}

// export const levels: Level[] = [];

export interface LevelBase {
  depth?: number;
  seed?: number;
  welcome?: string;
  proceed?: string;
  waves?: WaveInfo[];
}

export interface LevelData extends LevelBase {
  data: string[];
  tiles: Record<string, string>;
}

export interface LevelGen extends LevelBase {
  height: number;
  width: number;
}

export type LevelConfig = LevelData | LevelGen;

// export function install(cfg: LevelConfig) {
//   const level = from(cfg);
//   levels.push(level);
//   level.depth = level.depth || levels.length;
//   return level;
// }

export function from(cfg: LevelConfig): Level {
  let w = 0;
  let h = 0;

  if ("data" in cfg) {
    const data = cfg.data;
    const tiles = cfg.tiles;

    h = data.length;
    w = data[0].length;
  } else {
    h = cfg.height;
    w = cfg.width;
  }

  const level = new Level(w, h);
  level.depth = cfg.depth || 1;
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
    level.waves = [{ delay: 500 }];
  }

  // if (cfg.start) {
  //   level.startLoc = cfg.start;
  // }
  // if (cfg.finish) {
  //   level.finishLoc = cfg.finish;
  // }

  return level;
}

function loadLevel(
  level: Level,
  data: string[],
  tiles: Record<string, string>
) {
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

function digLevel(level: Level, seed = 12345) {
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
    stairs: {
      start: "down",
      up: true,
      upTile: "UP_STAIRS_INACTIVE",
      down: true,
    },
    goesUp: true,
  });
  digger.create(60, 35, (x, y, v) => {
    level.setTile(x, y, v);
  });

  GWD.site.updateLoopiness(level);

  level.locations = digger.locations;
}
