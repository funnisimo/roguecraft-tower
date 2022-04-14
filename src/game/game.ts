import * as GWU from "gw-utils";

import * as ACTOR from "../actor/index";
import * as ACTIONS from "./actions";
import * as LEVEL from "./level";
import { Player } from "../actor/player";
// import { default as CONFIG } from "../config";
import { CallbackFn } from "./obj";
import { FX } from "../fx/flash";
import * as TILE from "./tiles";

export interface GameOpts {
  seed?: number;
  app?: GWU.app.App;
}

export function make(opts: GameOpts | number = 0) {
  if (typeof opts === "number") {
    opts = { seed: opts };
  }

  return new Game(opts);
}

export class Game {
  player: Player;
  app: GWU.app.App | null;
  scene: GWU.app.Scene | null;
  level: LEVEL.Level | null;
  depth: number;
  scheduler: GWU.scheduler.Scheduler;
  inputQueue: GWU.app.Queue;
  seed: number;
  rng: GWU.rng.Random;
  seeds: number[];
  messages: GWU.message.Cache;
  events: GWU.app.Events;
  needInput = false;

  constructor(opts: GameOpts) {
    this.player = ACTOR.makePlayer("player");
    this.app = opts.app || null;
    this.scene = null;
    this.level = null;
    this.depth = 0;
    this.scheduler = new GWU.scheduler.Scheduler();

    this.inputQueue = new GWU.app.Queue();

    this.seed = opts.seed || GWU.random.number(100000);
    console.log("GAME, seed=", this.seed);

    this.rng = GWU.rng.make(this.seed);
    this.seeds = [];

    const LAST_LEVEL = this.app ? this.app.data.get("LAST_LEVEL") : 10;
    for (let i = 0; i < LAST_LEVEL; ++i) {
      const levelSeed = this.rng.number(100000);
      this.seeds.push(levelSeed);
      console.log(`Level: ${this.seeds.length}, seed=${levelSeed}`);
    }

    this.messages = new GWU.message.Cache({ reverseMultiLine: true });
    this.events = new GWU.app.Events(this);

    // TODO - Get these as parameters...
    // keymap: { dir: 'moveDir', a: 'attack', z: 'spawnZombie' }
    this.events.on("Enter", (e) => {
      if (this.player.goalPath && this.player.goalPath.length) {
        this.player.followPath = true;
        this.player.act(this);
      } else {
        // pickup?
      }
    });
    this.events.on("dir", (e) => {
      ACTIONS.moveDir(this, this.player, e.dir);
    });
    this.events.on("a", (e) => {
      ACTIONS.attack(this, this.player);
    });
    this.events.on(" ", (e) => {
      ACTIONS.idle(this, this.player);
    });
    this.events.on(">", (e) => {
      if (!this.level) return;
      // find stairs
      let loc: GWU.xy.Loc = [-1, -1];
      this.level.tiles.forEach((t, x, y) => {
        const tile = TILE.tilesByIndex[t];
        if (tile.id === "UP_STAIRS" || tile.id === "UP_STAIRS_INACTIVE") {
          loc[0] = x;
          loc[1] = y;
        }
      });
      // set player goal
      if (loc[0] >= 0) {
        this.player.setGoal(loc[0], loc[1]);
        this.scene!.needsDraw = true;
      }
    });
    this.events.on("<", (e) => {
      if (!this.level) return;
      // find stairs
      let loc: GWU.xy.Loc = [-1, -1];
      this.level.tiles.forEach((t, x, y) => {
        const tile = TILE.tilesByIndex[t];
        if (tile.id === "DOWN_STAIRS") {
          loc[0] = x;
          loc[1] = y;
        }
      });
      // set player goal
      if (loc[0] >= 0) {
        this.player.setGoal(loc[0], loc[1]);
        this.scene!.needsDraw = true;
      }
    });

    this.events.on("z", (e) => {
      ACTOR.spawn(this.level!, "zombie", this.player.x, this.player.y);
    });
  }

  startLevel(scene: GWU.app.Scene, width: number, height: number) {
    this.scene = scene;
    this.depth += 1;
    this.scheduler.clear();

    // let level = LEVEL.levels.find((l) => l.depth === this.depth);
    // if (!level) {
    const level = LEVEL.from({
      width: 60,
      height: 35,
      depth: this.depth,
      seed: this.seeds[this.depth - 1],
    });
    // LEVEL.levels.push(level);
    // } else if (level.width != 60 || level.height != 35) {
    //   throw new Error(
    //     `Map for level ${this.level} has wrong dimensions: ${map.width}x${map.height}`
    //   );
    // }
    this.level = level;
    this.needInput = false;

    this.scene.needsDraw = true;

    // we want the events that the widgets ignore...
    const cancelEvents = scene.load({
      update: () => this.update(),
      keypress: (e) => this.keypress(e),
      click: (e) => this.click(e),
    });
    scene.once("stop", cancelEvents);

    // @ts-ignore
    window.LEVEL = level;
    // @ts-ignore
    window.PLAYER = this.player;

    level.start(this);
    this.tick();
  }

  lose() {
    this.scene!.trigger("lose", this);
  }

  win() {
    this.scene!.trigger("win", this);
  }

  update() {
    while (this.inputQueue.length && this.needInput) {
      const e = this.inputQueue.dequeue();
      e && e.dispatch(this.events);
    }

    if (this.needInput) return;

    let filter = false;
    let actor = this.scheduler.pop();
    while (actor) {
      if (typeof actor === "function") {
        actor(this);
      } else if (actor.health <= 0) {
        // skip
        filter = true;
      } else if (actor === this.player) {
        actor.act(this);
        if (filter) {
          this.level!.actors = this.level!.actors.filter(
            (a) => a && a.health > 0
          );
        }
        this.scene!.needsDraw = true;
        return;
      } else {
        actor.act(this);
      }
      if (this.scene!.timers.length || this.scene!.tweens.length) {
        return;
      }
      if (this.scene!.paused.update) {
        return;
      }
      actor = this.scheduler.pop();
    }

    // no other actors
    this.needInput = true;
  }

  //   input(e) {
  //     this.inputQueue.enqueue(e.clone());
  //     e.stopPropagation();
  //   }

  keypress(e: GWU.app.Event) {
    this.inputQueue.enqueue(e.clone());
    e.stopPropagation();
  }

  click(e: GWU.app.Event) {
    this.inputQueue.enqueue(e.clone());
    e.stopPropagation();
  }

  tick() {
    this.level!.tick(this);
    this.wait(100, () => this.tick());
  }

  endTurn(actor: ACTOR.Actor, time: number) {
    if (!actor.hasActed()) {
      actor.endTurn(this, time);
      this.scheduler.push(actor, time);
      if (actor === this.player) {
        this.needInput = false;
      }
    } else {
      console.log("double end turn.!");
    }
  }

  wait(time: number, fn: GWU.app.CallbackFn) {
    this.scheduler.push(fn, time);
  }

  addMessage(msg: string) {
    this.messages.add(msg);
    this.scene!.get("MESSAGES")!.draw(this.scene!.buffer);
  }
}
