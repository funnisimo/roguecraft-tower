import * as ACTOR from "../actor/index.js";
import * as MAP from "../map/index.js";
import * as ACTIONS from "./actions.js";
import * as LEVEL from "../levels/index.js";

export function make(seed = 0) {
  return new Game(seed);
}

export class Game {
  constructor(seed = 0) {
    this.player = ACTOR.make("player");
    this.map = null;
    this.scene = null;
    this.level = null;
    this.depth = 0;
    this.seed = seed;
    this.scheduler = new GWU.scheduler.Scheduler();

    this.inputQueue = new GWU.app.Queue();
    this.rng = GWU.random;
    this.actors = [];

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
    this.events.on("z", (e) => {
      ACTOR.spawn(this, "zombie", this.player.x, this.player.y);
    });
  }

  startLevel(scene, width, height) {
    this.scene = scene;
    this.depth += 1;
    this.scheduler.clear();

    let level = LEVEL.levels[this.depth - 1];
    if (!level) {
      level = new LEVEL.Level({ width: 60, height: 35, depth: this.depth });
    } else if (level.map.width != 60 || level.map.height != 35) {
      throw new Error(
        `Map for level ${this.level} has wrong dimensions: ${map.width}x${map.height}`
      );
    }
    this.level = level;
    this.map = level.map;
    this.actors = [];
    this.playerTurn = false;

    this.scene.needsDraw = true;
    // this.scheduler.push(this.player, 0);
    // this.actors = [this.player];
    // this.playerTurn = true;

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
    while (this.inputQueue.length && this.playerTurn) {
      const e = this.inputQueue.dequeue();
      e.dispatch(this.events);
    }

    if (this.playerTurn) return;

    let filter = false;
    let actor = this.scheduler.pop();
    while (actor) {
      if (typeof actor === "function") {
        actor(this);
      } else if (actor.health <= 0) {
        // skip
        filter = true;
      } else if (actor === this.player) {
        this.playerTurn = true;
        console.log("Player - await input");
        this.scene.needsDraw = true;
        if (filter) {
          this.actors = this.actors.filter((a) => a && a.health > 0);
        }
        return;
      } else {
        ACTOR.ai(this, actor);
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
    this.playerTurn = true;
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
    this.map.cells.forEach((id, x, y) => {
      const tile = MAP.tiles[id];
      if (tile.on && tile.on.tick) {
        tile.on.tick.call(tile, this, x, y);
      }
    });
    this.level.tick(this);
    this.wait(100, () => this.tick());
  }

  endTurn(actor, time) {
    this.scheduler.push(actor, time);
    if (actor === this.player) {
      this.playerTurn = false;
    }
  }

  actorAt(x, y) {
    return this.actors.find((a) => a.x === x && a.y === y);
  }

  add(obj) {
    this.actors.push(obj);
    obj.trigger("add", this);
    this.scene.needsDraw = true; // need to update sidebar too
  }

  remove(obj) {
    GWU.arrayDelete(this.actors, obj);
    obj.trigger("remove", this);
    this.scene.needsDraw = true;
  }

  wait(time, fn) {
    this.scheduler.push(fn, time);
  }

  setTile(x, y, id) {
    if (typeof id === "string") {
      id = MAP.ids[id];
    }
    this.map.setTile(x, y, id);
    this.drawAt(x, y);
    const tile = MAP.tiles[id];
    if (tile.on && tile.on.place) {
      tile.on.place(this, x, y);
    }
  }

  addMessage(msg) {
    this.messages.add(msg);
    this.scene.get("MESSAGES").draw(this.scene.buffer);
  }

  drawAt(x, y) {
    const buf = this.scene.buffer;
    this.map.drawAt(buf, x, y);

    const actor = this.actorAt(x, y);
    actor && actor.draw(buf);
  }
}
