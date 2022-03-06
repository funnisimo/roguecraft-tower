import * as ACTOR from "../actor/index.js";
import * as MAP from "../map/index.js";

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
    this.actors = [this.player];
    this.scheduler = new GWU.scheduler.Scheduler();

    // start with player
    this.scheduler.push(this.player, 0);

    this.playerTurn = false;
    this.inputQueue = new GWU.app.Queue();
  }

  startLevel(scene) {
    this.scene = scene;
    this.level += 1;
    this.scheduler.clear();

    const map = (this.map = new MAP.Map(60, 35));
    GWU.xy.forBorder(map.width, map.height, (x, y) =>
      map.setTile(x, y, MAP.WALL)
    );

    // game.player = ACTOR.Player;
    this.player.x = 1;
    this.player.y = 1;

    this.scene.needsDraw = true;

    scene.on("update", () => this.update());
    scene.on("input", (e) => this.input(e));
    this.playerTurn = true;
  }

  update() {
    while (this.inputQueue.length && this.playerTurn) {
      const e = this.inputQueue.dequeue();
      e.dispatch(this.scene);
    }

    if (this.playerTurn) return;

    let actor = this.scheduler.pop();
    while (actor) {
      if (actor === this.player) {
        this.playerTurn = true;
        console.log("Player - await input");
        this.scene.needsDraw = true;
        return;
      } else {
        ACTOR.ai(this, actor);
      }
      actor = this.scheduler.pop();
    }

    // no other actors
    this.playerTurn = true;
  }

  input(e) {
    this.inputQueue.enqueue(e.clone());
    e.stopPropagation();
  }

  endTurn(actor, time) {
    this.scheduler.push(actor, time);
    if (actor === this.player) {
      this.playerTurn = false;
    }
  }
}
