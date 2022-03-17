import * as FX from "../fx/index.js";
import { Obj } from "../game/obj.js";
import * as AI from "./ai.js";

export const kinds = {};

export function install(cfg) {
  kinds[cfg.id.toLowerCase()] = cfg;
}

export class Actor extends Obj {
  _turnTime = 0;
  _level = null;

  constructor(cfg) {
    super(cfg);
    if (!this.kind) throw new Error("Must have kind.");

    this.kind.moveSpeed = this.kind.moveSpeed || 100;
    this.data = {};

    this.on("add", (game) => {
      game.scheduler.push(this, this.kind.moveSpeed);
      this._level = game.level;
    });
    this.on("remove", (game) => {
      // console.group("ACTOR REMOVE", this);
      // console.group("before");
      // GWU.list.forEach(game.scheduler.next, (i) => console.log(i.item));
      // console.groupEnd();
      game.scheduler.remove(this);
      this._level = null;
      // console.group("after");
      // GWU.list.forEach(game.scheduler.next, (i) => console.log(i.item));
      // console.groupEnd();
      // console.groupEnd();
    });
  }

  startTurn(game) {
    this._turnTime = 0;
    this.trigger("start", game);
  }

  endTurn(game, time) {
    this._turnTime = time;
    this.trigger("end", game, time);
  }

  hasActed() {
    return this._turnTime > 0;
  }

  draw(buf) {
    if (this.health <= 0) return;
    buf.drawSprite(this.x, this.y, this.kind);
  }

  moveCost(game, x, y) {
    const level = game.level;
    if (!level.hasXY(x, y)) return GWU.path.OBSTRUCTION;
    if (level.blocksMove(x, y)) return GWU.path.OBSTRUCTION;
    if (game.actorAt(x, y)) return GWU.path.AVOIDED;
    return 1;
  }

  act(game) {
    this.startTurn(game);
    AI.ai(game, this);
    if (!this.hasActed()) {
      console.log("No actor AI action.");
    }
  }
}

export function make(id) {
  const kind = kinds[id.toLowerCase()];
  if (!kind) throw new Error("Failed to find actor kind - " + id);

  return new Actor({
    x: 1,
    y: 1,
    depth: 1, // items, actors, player, fx
    kind,
    health: kind.health || 10,
    damage: kind.damage || 2,
  });
}

export function spawn(game, id, x, y) {
  const newbie = typeof id === "string" ? make(id) : id;

  const ms = 500;
  const bg = newbie.kind.fg;
  const scene = game.scene;
  const level = game.level;

  if (x === undefined) {
    do {
      x = game.rng.number(level.width);
      y = game.rng.number(level.height);
    } while (!level.hasTile(x, y, "FLOOR") || game.actorAt(x, y));
  }

  const startTime = scene.app.time;

  const fx = new FX.FX({ x, y, bg, depth: 4 });
  game.add(fx);

  let _success = GWU.NOOP;
  let _fail = GWU.NOOP;

  game.wait(ms, () => {
    const nowTime = scene.app.time;
    const timeLeft = ms - (nowTime - startTime);
    if (timeLeft > 0) {
      scene.pause({ update: true });

      scene.wait(timeLeft, () => {
        game.remove(fx);
        scene.resume({ update: true });
        newbie.x = x;
        newbie.y = y;
        game.add(newbie);
        _success(newbie);
      });
    } else {
      game.remove(fx);
      newbie.x = x;
      newbie.y = y;
      game.add(newbie);
      _success(newbie);
    }
  });

  return {
    then(success) {
      _success = success || GWU.NOOP;
    },
  };
}
