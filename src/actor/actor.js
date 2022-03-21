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

    this.on("add", (level) => {
      level.game.scheduler.push(this, this.kind.moveSpeed);
      this._level = level;
    });
    this.on("remove", (level) => {
      // console.group("ACTOR REMOVE", this);
      // console.group("before");
      // GWU.list.forEach(game.scheduler.next, (i) => console.log(i.item));
      // console.groupEnd();
      level.game.scheduler.remove(this);
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

  moveCost(x, y) {
    const level = this._level;
    if (!level) return GWU.path.OBSTRUCTION;

    if (!level.hasXY(x, y)) return GWU.path.OBSTRUCTION;
    if (level.blocksMove(x, y)) return GWU.path.OBSTRUCTION;
    // if (game.actorAt(x, y)) return GWU.path.AVOIDED;
    return 1;
  }

  pathTo(loc) {
    const path = GWU.path.fromTo(this, loc, (x, y) => this.moveCost(x, y));
    return path;
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

export function spawn(level, id, x, y) {
  const newbie = typeof id === "string" ? make(id) : id;

  const ms = 500;
  const bg = newbie.kind.fg;
  const scene = level.game.scene;
  // const level = level.level;

  if (x === undefined) {
    do {
      x = level.rng.number(level.width);
      y = level.rng.number(level.height);
    } while (!level.hasTile(x, y, "FLOOR") || level.actorAt(x, y));
  }

  const startTime = scene.app.time;

  const fx = new FX.FX({ x, y, bg, depth: 4 });
  level.addFx(fx);

  let _success = GWU.NOOP;
  let _fail = GWU.NOOP;

  level.game.wait(ms, () => {
    const nowTime = scene.app.time;
    const timeLeft = ms - (nowTime - startTime);
    if (timeLeft > 0) {
      scene.pause({ update: true });

      scene.wait(timeLeft, () => {
        level.removeFx(fx);
        scene.resume({ update: true });
        newbie.x = x;
        newbie.y = y;
        level.addActor(newbie);
        _success(newbie);
      });
    } else {
      level.removeFx(fx);
      newbie.x = x;
      newbie.y = y;
      level.addActor(newbie);
      _success(newbie);
    }
  });

  return {
    then(success) {
      _success = success || GWU.NOOP;
    },
  };
}
