import * as GWU from "gw-utils";
import * as GWD from "gw-dig";

import * as ACTOR from "../actor/index";
import * as ACTIONS from "../action";
import * as LEVEL from "../level";
import * as HERO from "../hero";
import * as TILE from "../tile";
import * as ITEM from "../item";
import * as HORDE from "../horde";
import { Level } from "../level";
import { factory } from "./factory";
import { CallbackFn } from "./obj";
import { CommandFn } from "../command";

export type EventFn = (level: Level, e: GWU.app.Event) => void;

export interface GameEvents {
  ctor?(app: GWU.app.App, opts: GameOpts): Game;
  create?(game: Game, opts: GameOpts);
  // start? - use create for things you want at game start time.
  destroy?(game: Game);
}

export interface GameOpts {
  seed?: number;
  levels?: {
    [id: string]: string | (LEVEL.LevelCreateOpts & { kind: string });
  };
  keymap?: {
    [id: string]: string | CommandFn;
  };
  start_level?: string | number;
  hero_kind?: string | (HERO.HeroMakeOpts & { kind: string });
  // on?: ObjEvents & GameEvents;
}

export class Game {
  hero: HERO.Hero;
  app: GWU.app.App;
  // scene: GWU.app.Scene;
  level: LEVEL.Level;
  levels: { [id: string]: LEVEL.LevelCreateOpts & { kind: string } };
  _levelObjs: { [id: string | number]: Level };
  start_level: string | number;

  // depth: number;
  // scheduler: GWU.scheduler.Scheduler;
  // inputQueue: GWU.app.Queue;
  seed: number;
  rng: GWU.rng.Random;
  seeds: { [key: string | number]: number };
  messages: GWU.message.Cache;
  events: GWU.app.Events;
  // needInput = false;

  actors: ACTOR.ActorFactory;
  items: ITEM.ItemFactory;
  hordes: Record<string, HORDE.Horde>;
  tiles: GWD.site.TileFactory;
  // TODO - tiles: ...

  keymap: Record<string, string | CommandFn> = {};
  data: { [id: string]: any } = {};

  constructor(app: GWU.app.App) {
    this.app = app;
    // this.scene = null;
    // this.level = null;
    // this.depth = 0;
    // this.scheduler = new GWU.scheduler.Scheduler();

    this.rng = GWU.rng.random; // Can access here or via GWU.rng.random
    this.seed = 0;
    this.seeds = {};
    this.levels = { default: { kind: "DEFAULT" } };
    this._levelObjs = {};
    this.start_level = 1;

    // Exposes types to world
    this.actors = ACTOR.factory;
    this.items = ITEM.factory;
    this.hordes = HORDE.hordes;
    this.tiles = GWD.site.tileFactory;
    //

    // TODO - Should be a reference or a copy?
    this.data = app.data; // GWU.utils.mergeDeep(this.data, app.data);

    // this.hero = ACTOR.Hero.make("HERO") as Hero;

    // this.inputQueue = new GWU.app.Queue();

    this.messages = new GWU.message.Cache({ reverseMultiLine: true });
    this.events = new GWU.app.Events(this);
  }

  _create(opts: GameOpts) {
    // SEED
    if (typeof opts.seed === "number" && opts.seed > 0) {
      this.seed = opts.seed;
    } else {
      this.seed = this.rng.int(100000);
    }

    console.log("GAME, seed=", this.seed);
    this.rng.seed(this.seed);

    // LEVELS
    this.levels = GWU.utils.mergeDeep(this.levels, opts.levels || {});
    if (opts.start_level) {
      this.start_level = opts.start_level;
    }

    // KEYMAP
    // TODO - move to default plugin
    this.keymap = Object.assign(
      {
        a: "attack",
        f: "fire",
        g: "pickup",
        // i: "show_inventory",
        // "z": "spawn_zombie",
        " ": "idle",
        ".": "idle",
        ">": "find_up_stairs",
        "<": "find_down_stairs",
        dir: "move_dir",
        Enter: "follow_path",
      },
      opts.keymap || {}
    );

    // CREATE HERO

    // EVENTS - There are no events on GameOpts!!!  Must use plugins
    // Object.entries(opts).forEach(([key, val]) => {
    //   if (typeof val === "function") {
    //     this.on(key, val);
    //   }
    // });
    // Object.entries(opts.on || {}).forEach(([key, val]) => {
    //   if (typeof val === "function") {
    //     this.on(key, val);
    //   }
    // });

    // HERO
    // TODO - move to default plugin
    let hero_cfg = opts.hero_kind || { kind: "HERO" };
    if (typeof hero_cfg === "string") {
      hero_cfg = { kind: hero_cfg };
    }
    this.hero = HERO.create(hero_cfg.kind, hero_cfg);
  }

  makeLevel(
    levelId: string | number,
    opts: LEVEL.LevelCreateOpts & { kind?: string } = {}
  ): Level {
    let info = this.levels[levelId] ||
      this.levels["default"] || { kind: "DEFAULT" };
    if (typeof info === "string") {
      info = { kind: info };
    }

    const config = GWU.utils.mergeDeep(info, opts);
    const level = LEVEL.create(this, levelId, config.kind, config);
    level.on("show", (level) => {
      this.level = level;
    });

    this._levelObjs[levelId] = level;
    return level;
  }

  getLevel(levelId: string | number): Level {
    return this._levelObjs[levelId] || this.makeLevel(levelId);
  }

  // lose() {
  //   this.scene!.emit("lose", this);
  // }

  // win() {
  //   this.scene!.emit("win", this);
  // }

  //   input(e) {
  //     this.inputQueue.enqueue(e.clone());
  //     e.stopPropagation();
  //   }

  // keypress(e: GWU.app.Event) {
  //   this.inputQueue.enqueue(e.clone());
  //   e.stopPropagation();
  // }

  // click(e: GWU.app.Event) {
  //   this.inputQueue.enqueue(e.clone());
  //   e.stopPropagation();
  // }

  // tick(dt: number = 50) {
  //   this.level.tick(this, dt);
  //   this.level.wait(dt, () => this.tick(dt));
  // }

  endTurn(actor: ACTOR.Actor, time: number) {
    if (!actor.hasActed()) {
      actor.endTurn(this.level, time);
      this.level.scheduler.push(actor, time);
      // @ts-ignore
      if (actor === this.hero) {
        this.level.needInput = false;
      }
    } else {
      console.log("double end turn.!");
    }
  }

  // wait(time: number, fn: GWU.app.CallbackFn) {
  //   this.level.scheduler.push(fn, time);
  // }

  addMessage(msg: string) {
    this.messages.add(msg);
    // TODO - Is this necessary?
    if (!!this.level && !!this.level.scene) {
      // this.level.scene.get("MESSAGES")!.draw(this.level.scene.buffer);
      this.level.scene.needsDraw = true;
    }
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
}

// export function startLevel(levelId: string | number): Level {
//     // this.depth += 1;
//     // this.scheduler.clear();

//     let level = this._levelObjs[levelId] || this.makeLevel(levelId);
//     // let level = LEVEL.levels.find((l) => l.depth === this.depth);
//     if (!level) {
//       console.error("Failed to start level: " + levelId);
//       GWU.app.active.stop();
//       return;
//     }
//     // LEVEL.levels.push(level);
//     // } else if (level.width != 60 || level.height != 35) {
//     //   throw new Error(
//     //     `Map for level ${this.level} has wrong dimensions: ${map.width}x${map.height}`
//     //   );
//     // }

//     this.level = level;
//     this.needInput = false;

//     // @ts-ignore
//     globalThis.LEVEL = level;
//     // @ts-ignore
//     globalThis.HERO = this.hero;

//     const startRes = PLUGINS.trigger(
//       "start_level",
//       { game: this, level: level, sceneId: "level", startOpts: {} },
//       (req: {
//         game: Game;
//         level: Level;
//         sceneId: string;
//         startOpts: GWU.app.SceneStartOpts;
//       }): Result<{ scene: GWU.app.Scene }> => {
//         let { sceneId, startOpts } = req;
//         startOpts = startOpts || {};
//         startOpts.game = req.game;
//         startOpts.level = req.level;
//         const scene = GWU.app.active.scenes.start(sceneId, startOpts);

//         req.level.show(req.game, scene);
//         return Result.Ok({ scene });
//       }
//     );
//     if (startRes.isErr()) {
//       console.error("Failed to start level: " + startRes.unwrapErr());
//       GWU.app.active.stop();
//       return;
//     }
//   }

// export function start(config: GameOpts = {}): Game {
//   const game = PLUGINS.make(config);

//   const resMake = PLUGINS.trigger("make_game", { config }, (config) => {
//     const game = new Game();
//     game.create(config);
//     return Result.Ok(game);
//   });
//   resMake.expect("Failed to make Game");

//   const game = resMake.unwrap();
//   if (!game.hero) {
//     console.log("Making default Hero: HERO");
//     game.hero = Hero.make("HERO");
//   }
//   return game;
// }
