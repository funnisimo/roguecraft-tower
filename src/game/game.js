import * as ACTOR from "../actor/index.js";
import * as MAP from "../map/index.js";
import * as ACTIONS from "./actions.js";

export function make(seed = 0) {
  return new Game(seed);
}

export class Game {
  constructor(seed = 0) {
    this.player = ACTOR.make("player");
    this.map = null;
    this.scene = null;
    this.level = 0;
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
    this.events.on("z", (e) => {
      ACTOR.spawn(this, "zombie", this.player.x, this.player.y);
    });
  }

  startLevel(scene, width, height) {
    this.scene = scene;
    this.level += 1;
    this.scheduler.clear();

    const map = (this.map = new MAP.Map(width, height));
    GWU.xy.forBorder(map.width, map.height, (x, y) =>
      this.setTile(x, y, MAP.ids.WALL)
    );

    // game.player = ACTOR.Player;
    this.player.x = 1;
    this.player.y = 1;

    this.scene.needsDraw = true;
    this.scheduler.push(this.player, 0);
    this.actors = [this.player];
    this.playerTurn = true;

    // we want the events that the widgets ignore...
    const cancelEvents = scene.load({
      update: () => this.update(),
      keypress: (e) => this.keypress(e),
      click: (e) => this.click(e),
    });
    scene.once("stop", cancelEvents);

    this.wait(500, () => {
      ACTOR.spawn(this, "zombie", 20, 20);
    });

    this.tick();
    this.addMessage("Welcome to level " + this.level);
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
          this.actors = this.actors.filter((a) => a.health > 0);
        }
        return;
      } else {
        ACTOR.ai(this, actor);
      }
      if (this.scene.timers.length || this.scene.tweens.length) {
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

  wait(time, fn) {
    this.scheduler.push(fn, time);
  }

  setTile(x, y, id) {
    this.map._setTile(x, y, id);
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
    buf.blackOut(x, y);
    buf.drawSprite(x, y, this.map.getTile(x, y));

    const actor = this.actorAt(x, y);
    actor && buf.drawSprite(x, y, actor.kind);
  }
}
