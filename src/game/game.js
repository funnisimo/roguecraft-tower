import * as GWU from "gw-utils";

import * as ACTOR from "../actor/index";
import * as ACTIONS from "./actions";
import * as LEVEL from "../game/level";
import { default as CONFIG } from "../config";

export function make(seed = 0) {
  return new Game(seed);
}

export class Game {
  constructor(seed = 0) {
    this.player = ACTOR.makePlayer("player");
    this.scene = null;
    this.level = null;
    this.depth = 0;
    this.scheduler = new GWU.scheduler.Scheduler();
    this.levels = [];

    this.inputQueue = new GWU.app.Queue();

    this.seed = seed || GWU.random.number(100000);
    console.log("GAME, seed=", this.seed);

    this.rng = GWU.rng.make(this.seed);
    this.seeds = [];
    for (let i = 0; i < CONFIG.LAST_LEVEL; ++i) {
      const levelSeed = this.rng.number(100000);
      this.seeds.push(levelSeed);
      console.log(`Level: ${this.seeds.length}, seed=${levelSeed}`);
    }

    this.messages = new GWU.message.Cache({ reverseMultiLine: true });
    this.events = new GWU.app.Events(this);

    // TODO - Get these as parameters...
    // keymap: { dir: 'moveDir', a: 'attack', z: 'spawnZombie' }
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
      ACTIONS.climb(this, this.player);
    });
    this.events.on("z", (e) => {
      ACTOR.spawn(this.level, "zombie", this.player.x, this.player.y);
    });
  }

  startLevel(scene, width, height) {
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

    level.start(this);
    this.tick();
  }

  lose() {
    this.scene.trigger("lose", this);
  }

  win() {
    this.scene.trigger("win", this);
  }

  update() {
    while (this.inputQueue.length && this.needInput) {
      const e = this.inputQueue.dequeue();
      e.dispatch(this.events);
    }

    if (this.needInput) return;

    let filter = false;
    let actor = this.scheduler.pop();
    while (actor) {
      if (typeof actor === "function") {
        actor(this);
        return; // lets do promises, etc...
      } else if (actor.health <= 0) {
        // skip
        filter = true;
      } else if (actor === this.player) {
        actor.act(this);
        if (filter) {
          actors = actors.filter((a) => a && a.health > 0);
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
    }

    // no other actors
    this.needInput = true;
  }

  //   input(e) {
  //     this.inputQueue.enqueue(e.clone());
  //     e.stopPropagation();
  //   }

  keypress(e) {
    this.inputQueue.enqueue(e.clone());
    e.stopPropagation();
  }

  click(e) {
    this.inputQueue.enqueue(e.clone());
    e.stopPropagation();
  }

  tick() {
    this.level.tick(this);
    this.wait(100, () => this.tick());
  }

  endTurn(actor, time) {
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

  wait(time, fn) {
    this.scheduler.push(fn, time);
  }

  addMessage(msg) {
    this.messages.add(msg);
    this.scene.get("MESSAGES").draw(this.scene.buffer);
  }
}
