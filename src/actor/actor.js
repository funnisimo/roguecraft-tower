import * as FX from "../fx/index.js";
import { Obj } from "../game/obj.js";

export const kinds = {};

export function install(cfg) {
  kinds[cfg.id.toLowerCase()] = cfg;
}

class Actor extends Obj {
  _turnTime = 0;

  constructor(cfg) {
    super(cfg);
    if (!this.kind) throw new Error("Must have kind.");

    this.kind.moveSpeed = this.kind.moveSpeed || 100;
    this.data = {};

    this.on("add", (game) => {
      game.scheduler.push(this, this.kind.moveSpeed);
    });
    this.on("remove", (game) => {
      // console.group("ACTOR REMOVE", this);
      // console.group("before");
      // GWU.list.forEach(game.scheduler.next, (i) => console.log(i.item));
      // console.groupEnd();
      game.scheduler.remove(this);
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

  if (x === undefined) {
    do {
      x = game.rng.number(game.map.width);
      y = game.rng.number(game.map.height);
    } while (!game.map.hasTile(x, y, "FLOOR") || game.actorAt(x, y));
  }

  const ms = 500;
  const bg = newbie.kind.fg;
  const scene = game.scene;
  const map = game.map;

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
