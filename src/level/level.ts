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
import { LevelConfig, LevelKind, LevelMakeOpts, getKind } from "./kind";
import { factory } from "./factory";

export class Level implements GWD.site.AnalysisSite {
  id: string | number = 0;
  depth = 0;
  kind: LevelKind;

  // TODO - Convert to >> messages: { [id: string]: string }
  welcome = "";
  proceed = "";

  tick_time = 50;
  scheduler: GWU.scheduler.Scheduler;

  // TODO - state: { done, started, ... }
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
  scene_opts: GWU.app.SceneStartOpts = {};
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
    this.tiles = GWU.grid.make(width, height, TILE.tilesByName["FLOOR"].index);
    this.flags = GWU.grid.make(width, height);
    this.choke = GWU.grid.make(width, height);

    this.seed = seed || GWU.random.number(100000);
    // this.rng = GWU.rng.make(this.seed);

    this.scheduler = new GWU.scheduler.Scheduler();

    if (kind.scene) {
      this.scene_id = kind.scene;
      this.scene_opts = kind.scene_opts;
    }

    // // TODO - Move to Tower specific plugin
    // this.data.wavesLeft = 0;
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

  _make(kind: LevelKind, opts: LevelMakeOpts) {
    if (opts.seed) {
      this.seed = opts.seed;
    }
    this.depth = opts.depth || kind.depth || 1;

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

    // TODO - move to factory
    this.emit("make", this, opts);
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
      this._hide();
    });
  }

  _hide() {
    this.emit("hide", this);
    this.scene = null;
  }

  update(time: number) {
    // Update should be handled by plugin - e.g. "turn_based"
    this.emit("update", this, time);
  }

  _tick(dt: number) {
    this.emit("tick", this, dt);
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

    if (!tile) {
      console.warn("Failed to find tile: " + id);
      return;
    }

    let data = { x, y, tile }; // allows plugins to change the tile
    // TODO - check priority, etc... in a plugin
    this.emit("set_tile", data); // TODO - Is this a good idea?  Is this the right way to do it?

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
    const id = this.tiles.get(x, y);
    if (id === undefined) return TILE.tilesByName["IMPREGNABLE"];
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
      return `You see a ${actor.name}.`; // TODO - You see a you ?!?
    }

    const item = this.itemAt(x, y);
    if (item && item.kind) {
      return `You see a ${item.name}.`;
    }

    const tile = this.getTile(x, y);
    const text = `You see ${tile.id}.`; // TODO - tile.flavor
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
