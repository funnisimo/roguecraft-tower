import * as GWU from "gw-utils";
import * as GWD from "gw-dig";

import * as ACTOR from "../actor";
import * as HORDE from "../horde";
import * as FX from "../fx";
import * as ACTIONS from "../action";

import * as TILE from "../tile";
import * as ITEM from "../item";
import * as OBJ from "../game/obj";
import { Game } from "../game/game";
import { CallbackFn } from "../game/obj";
import { Hero } from "../hero";
import { LevelConfig, LevelKind, WaveInfo, getKind } from "./kind";
import { factory } from "./factory";

export interface LevelCreateOpts {
  seed?: number;
  depth?: number; // TODO - Huh?

  scene?: string;
  scene_opts?: GWU.app.SceneCreateOpts;

  on?: LevelEvents & OBJ.ObjEvents;
  data?: { [id: string]: any };
}

export interface LevelEvents {
  make?: (
    game: Game,
    id: string | number,
    kind: LevelKind,
    opts: LevelCreateOpts
  ) => Level;
  create?: (level: Level, opts: LevelCreateOpts) => void;

  show?: (level: Level, scene: GWU.app.Scene) => void;
  hide?: (level: Level) => void;

  update?: (level: Level, dt: number) => void;
  tick?: (level: Level, dt: number) => void;

  scene_event?: (
    level: Level,
    scene: GWU.app.Scene,
    event: GWU.app.Event
  ) => void;
}

export class Level implements GWD.site.AnalysisSite {
  id: string | number = 0;
  depth = 0;
  kind: LevelKind;

  // TODO - Convert to >> messages: { [id: string]: string }
  welcome = "";
  proceed = "";

  tick_time = 50;
  scheduler: GWU.scheduler.Scheduler;

  done = false;
  started = false;
  // needsDraw = false;
  data: Record<string, any> = {};

  // TODO - move to Tower specific plugin
  // waves: WaveInfo[] = [];

  actors: ACTOR.Actor[] = [];
  items: ITEM.Item[] = [];
  fxs: FX.FX[] = [];

  tiles: GWU.grid.NumGrid;
  flags: GWU.grid.NumGrid;
  choke: GWU.grid.NumGrid;

  game: Game;
  scene_id: string = "level";
  scene_opts: GWU.app.SceneCreateOpts = {};
  scene: GWU.app.Scene = null;

  // // TODO - Can we do this without a hero?
  // hero: Hero;

  seed: number;
  // rng: GWU.rng.Random;
  locations: Record<string, GWU.xy.Loc> = {};
  events: GWU.app.Events;

  constructor(game: Game, id: string | number, kind: LevelKind) {
    this.id = id;
    this.game = game;
    this.kind = kind;
    const { width, height, seed } = kind;
    this.events = new GWU.app.Events(this);
    this.tiles = GWU.grid.make(width, height);
    this.flags = GWU.grid.make(width, height);
    this.choke = GWU.grid.make(width, height);

    this.seed = seed || GWU.random.number(100000);
    // this.rng = GWU.rng.make(this.seed);

    this.scheduler = new GWU.scheduler.Scheduler();

    if (kind.scene) {
      this.scene_id = kind.scene;
      this.scene_opts = kind.scene_opts;
    }

    // TODO - Move to Tower specific plugin
    this.data.wavesLeft = 0;
  }

  get width() {
    return this.tiles.width;
  }
  get height() {
    return this.tiles.height;
  }

  get rng() {
    return this.game ? this.game.rng : GWU.random;
  }

  hasXY(x: number, y: number) {
    return this.tiles.hasXY(x, y);
  }

  create(kind: LevelKind, opts: LevelCreateOpts) {
    if (opts.seed) {
      this.seed = opts.seed;
    }
    this.depth = opts.depth || kind.depth || 1;

    if (kind.layout) {
      const { data, tiles } = kind.layout;
      loadLevel(this, data, tiles);
    } else if (kind.dig) {
      digLevel(this, kind.dig, this.seed);
    } else {
      throw new Error("Level must have either 'dig' or 'layout'.");
    }

    if (kind.welcome) {
      this.welcome = kind.welcome;
    } else {
      this.welcome = "Welcome.";
    }

    if (kind.proceed) {
      this.proceed = kind.proceed;
    } else {
      this.proceed = "Proceed.";
    }

    // if (kind.waves) {
    //   this.waves = kind.waves;
    // } else {
    //   this.waves = [];
    //   for (let i = 0; i < this.depth; ++i) {
    //     this.waves.push({
    //       delay: 500 + i * 2000,
    //       power: this.depth * 2 - 1 + this.rng.dice(1, 3),
    //       horde: { depth: this.depth },
    //     });
    //   }
    // }

    // if (kind.start) {
    //   level.startLoc = kind.start;
    // }
    // if (kind.finish) {
    //   level.finishLoc = kind.finish;
    // }

    this.tick_time = kind.tick_time || this.tick_time;
    if (this.tick_time > 0) {
      this.repeat(this.tick_time, this._tick);
    }

    if (opts.scene) {
      this.scene_id = opts.scene;
      this.scene_opts = opts.scene_opts || {};
    } else if (opts.scene_opts) {
      this.scene_opts = GWU.utils.mergeDeep(this.scene_opts, opts.scene_opts);
    }

    let onFns = kind.on || {};
    Object.entries(onFns).forEach(([key, val]: [string, CallbackFn]) => {
      if (typeof val === "function") {
        this.on(key, val);
      }
    });

    onFns = opts.on || {};
    Object.entries(onFns).forEach(([key, val]: [string, CallbackFn]) => {
      if (typeof val === "function") {
        this.on(key, val);
      }
    });

    this.emit("create", this, opts);
  }

  show() {
    this.done = false;
    this.started = true;
    this.scene = this.game.app.scenes
      .create(this.scene_id, this.scene_opts)
      .start({ level: this });
    this.scene.once("start", () => {
      this.emit("show", this, this.scene);
    });
    this.scene.once("stop", () => {
      this.hide();
    });
  }

  hide() {
    // TODO - Should we remove the emit('stop') and let plugins handle this?
    this.emit("hide", this);
    this.scene = null;
  }

  update(time: number) {
    // TODO - Need to support replacing this with a different update loop
    //      - For "turn_based", "real_time", "combo"

    const game = this.game;
    // TODO - Move inputQueue to Level
    while (game.inputQueue.length && game.needInput) {
      const e = game.inputQueue.dequeue();
      e &&
        e.dispatch({
          emit: (evt, e) => {
            let action = game.keymap[evt];
            if (!action) return;
            if (typeof action === "function") {
              return action(this, e);
            }
            let fn = ACTIONS.get(action);
            if (!fn) {
              console.warn(`Failed to find action: ${action} for key: ${evt}`);
            } else {
              // @ts-ignore
              fn(this, game.hero);
              this.scene.needsDraw = true;
              e.stopPropagation(); // We handled it
            }
          },
        });
    }

    if (game.needInput) return;

    let filter = false;
    let actor = this.scheduler.pop();

    const startTime = this.scheduler.time;
    let elapsed = 0;

    while (actor) {
      if (typeof actor === "function") {
        actor(this);
        if (elapsed > 16) return;
      } else if (actor.health <= 0) {
        // skip
        filter = true;
      } else if (actor === game.hero) {
        actor.act(this);
        if (filter) {
          this.actors = this.actors.filter((a) => a && a.health > 0);
        }
        this.scene.needsDraw = true;
        return;
      } else {
        actor.act(this);
      }
      if (this.scene.timers.length || this.scene.tweens.length) {
        return;
      }
      if (this.scene.paused.update) {
        return;
      }
      actor = this.scheduler.pop();
      elapsed = this.scheduler.time - startTime;
    }

    // no other actors
    game.needInput = true;

    return;
  }

  _tick(dt: number) {
    // this.wait(this.tick_time, this.tick.bind(this));

    // tick actors
    this.actors.forEach((a) => {
      // TODO - check if alive?
      a.tick(this, dt);
    });

    // tick tiles
    this.tiles.forEach((index, x, y) => {
      const tile = TILE.tilesByIndex[index];
      if (tile.on && tile.on.tick) {
        tile.on.tick.call(tile, this, x, y, dt);
      }
    });

    if (this.done || !this.started) return;

    // TODO - Should we remove this and let plugins handle it?
    this.emit("tick", this, dt);

    // @ts-ignore
    if (!this.actors.includes(this.game.hero)) {
      this.done = true;
      // lose
      // TODO - Do a real time flash before transitioning the scene
      this.emit("lose", this, "You died.");
    }
  }

  // keypress(e: GWU.app.Event) {
  //   this.game.inputQueue.enqueue(e.clone());
  //   e.stopPropagation();
  // }

  // click(e: GWU.app.Event) {
  //   this.game.inputQueue.enqueue(e.clone());
  //   e.stopPropagation();
  // }

  fill(tile: number | string) {
    if (typeof tile === "string") {
      tile = TILE.tilesByName[tile].index;
    }
    this.tiles.fill(tile);
  }

  setTile(x: number, y: number, id: number | string, opts = {}) {
    const tile =
      typeof id === "string" ? TILE.tilesByName[id] : TILE.tilesByIndex[id];

    if (!tile) {
      console.warn("Failed to find tile: " + id);
      return;
    }

    // priority, etc...

    let data = { x, y, tile }; // allows plugins to change the tile
    this.emit("set_tile", data); // TODO - Is this good?

    if (data.tile) {
      this.tiles[x][y] = data.tile.index;

      // this.game && this.game.drawAt(x, y);
      if (tile.on && tile.on.place) {
        tile.on.place.call(tile, this, x, y);
      }
    }
  }

  hasTile(x: number, y: number, tile: number | string) {
    if (typeof tile === "string") {
      tile = TILE.tilesByName[tile].index;
    }
    return this.tiles.get(x, y) === tile;
  }

  getTile(x: number, y: number): TILE.TileInfo {
    const id = this.tiles.get(x, y) || 0;
    return TILE.tilesByIndex[id];
  }

  //

  blocksMove(x: number, y: number): boolean {
    const tile = this.getTile(x, y);
    return tile.blocksMove || false;
  }

  blocksPathing(x: number, y: number): boolean {
    return this.blocksMove(x, y);
  }

  blocksDiagonal(x: number, y: number): boolean {
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

  // AnalysisSite

  setInLoop(x: number, y: number): void {
    this.flags[x][y] |= GWD.site.Flags.IN_LOOP;
  }
  clearInLoop(x: number, y: number): void {
    this.flags[x][y] &= ~GWD.site.Flags.IN_LOOP;
  }
  isInLoop(x: number, y: number): boolean {
    return ((this.flags[x][y] || 0) & GWD.site.Flags.IN_LOOP) > 0;
  }

  clearChokepoint(x: number, y: number): void {
    this.flags[x][y] &= ~GWD.site.Flags.CHOKEPOINT;
  }
  setChokepoint(x: number, y: number): void {
    this.flags[x][y] |= GWD.site.Flags.CHOKEPOINT;
  }
  isChokepoint(x: number, y: number): boolean {
    return !!(this.flags[x][y] & GWD.site.Flags.CHOKEPOINT);
  }

  setChokeCount(x: number, y: number, count: number): void {
    this.choke[x][y] = count;
  }
  getChokeCount(x: number, y: number): number {
    return this.choke[x][y];
  }

  setGateSite(x: number, y: number): void {
    this.flags[x][y] |= GWD.site.Flags.GATE_SITE;
  }
  clearGateSite(x: number, y: number): void {
    this.flags[x][y] &= ~GWD.site.Flags.GATE_SITE;
  }
  isGateSite(x: number, y: number): boolean {
    return !!(this.flags[x][y] & GWD.site.Flags.GATE_SITE);
  }
  isAreaMachine(x: number, y: number): boolean {
    return !!(this.flags[x][y] & GWD.site.Flags.IN_AREA_MACHINE);
  }

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

  actorAt(x: number, y: number): ACTOR.Actor | undefined {
    return this.actors.find((a) => a.x === x && a.y === y);
  }

  addActor(obj: ACTOR.Actor) {
    this.actors.push(obj);
    obj.emit("add", this, obj);
    this.scene.needsDraw = true; // need to update sidebar too
  }

  removeActor(obj: ACTOR.Actor) {
    GWU.utils.arrayDelete(this.actors, obj);
    obj.emit("remove", this, obj);
    this.scene.needsDraw = true;
  }

  hasActor(x: number, y: number): boolean {
    return this.actors.some((a) => a.x === x && a.y === y);
  }

  itemAt(x: number, y: number): ITEM.Item | undefined {
    return this.items.find((i) => i.x === x && i.y === y);
  }

  addItem(obj: ITEM.Item) {
    this.items.push(obj);
    obj.emit("add", this, obj);
    this.scene.needsDraw = true; // need to update sidebar too
  }

  removeItem(obj: ITEM.Item) {
    GWU.utils.arrayDelete(this.items, obj);
    obj.emit("remove", this, obj);
    this.scene.needsDraw = true;
  }

  hasItem(x: number, y: number): boolean {
    return this.items.some((i) => i.x === x && i.y === y);
  }

  fxAt(x: number, y: number): FX.FX | undefined {
    return this.fxs.find((i) => i.x === x && i.y === y);
  }

  addFx(obj: FX.FX) {
    this.fxs.push(obj);
    obj.emit("add", this, obj);
    this.scene.needsDraw = true; // need to update sidebar too
  }

  removeFx(obj: FX.FX) {
    GWU.utils.arrayDelete(this.fxs, obj);
    obj.emit("remove", this, obj);
    this.scene.needsDraw = true;
  }

  hasFx(x: number, y: number): boolean {
    return this.fxs.some((f) => f.x === x && f.y === y);
  }

  getFlavor(x: number, y: number): string {
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

  triggerAction(event: string, actor: ACTOR.Actor) {
    const tile = this.getTile(actor.x, actor.y);
    if (tile && tile.on && tile.on[event]) {
      tile.on[event]!.call(tile, this, actor);
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

  on(cfg: Record<string, CallbackFn>): GWU.app.CancelFn;
  on(event: string, fn: CallbackFn): GWU.app.CancelFn;
  on(...args: any[]): GWU.app.CancelFn {
    if (args.length == 1) {
      return this.events.on(args[0]);
    }
    return this.events.on(args[0], args[1]);
  }
  once(event: string, fn: CallbackFn) {
    return this.events.once(event, fn);
  }
  emit(event: string, ...args: any[]) {
    return this.events.emit(event, ...args);
  }

  // TODO - test me!!!
  wait(time: number, fn: GWU.app.CallbackFn) {
    this.scheduler.push(fn, time);
  }

  // TODO - test me!!!
  repeat(time: number, fn: GWU.app.CallbackFn, ...args: any[]) {
    function repeat_fn() {
      fn.call(this, time, ...args);
      this.scheduler.push(repeat_fn.bind(this), time);
    }

    this.scheduler.push(repeat_fn.bind(this), time);
  }
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

function digLevel(level: Level, dig: GWD.DiggerOptions, seed = 12345) {
  const firstRoom = level.depth < 2 ? "ENTRANCE" : "FIRST_ROOM";
  const digger = new GWD.Digger(dig);
  digger.seed = seed;
  digger.create(level.width, level.height, (x, y, v) => {
    level.setTile(x, y, v);
  });

  GWD.site.analyze(level);

  level.locations = digger.locations;
}
