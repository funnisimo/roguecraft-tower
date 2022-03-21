import * as ACTOR from "../actor/index.js";
import * as ACTIONS from "./actions.js";
import * as LEVEL from "../levels/index.js";

export function make(seed = 0) {
  return new Game(seed);
}

export class Game {
  constructor(seed = 0) {
    this.player = ACTOR.makePlayer("player");
    this.scene = null;
    this.level = null;
    this.depth = 0;
    this.seed = seed;
    this.scheduler = new GWU.scheduler.Scheduler();

    this.inputQueue = new GWU.app.Queue();
    this.rng = GWU.random;

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

    let level = LEVEL.levels[this.depth - 1];
    if (!level) {
      level = new LEVEL.Level(60, 35);
      level.depth = this.depth;
    } else if (level.width != 60 || level.height != 35) {
      throw new Error(
        `Map for level ${this.level} has wrong dimensions: ${map.width}x${map.height}`
      );
    }
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
