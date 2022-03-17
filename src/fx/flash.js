import { Obj } from "../game/obj.js";

export class FX extends Obj {
  constructor(cfg) {
    super(cfg);
    this.ch = this.ch || null;
    this.fg = this.fg || null;
    this.bg = this.bg || null;
  }

  draw(buf) {
    buf.drawSprite(this.x, this.y, this);
  }
}

export function flash(game, x, y, color = "white", ms = 300) {
  const scene = game.scene;
  const map = game.map;

  scene.pause({ update: true });

  const fx = new FX({ x, y, bg: color, depth: 4 });
  game.level.add(fx);

  let _success = GWU.NOOP;
  let _fail = GWU.NOOP;

  scene.needsDraw = true;

  scene.wait(ms, () => {
    game.level.remove(fx);
    scene.resume({ update: true });
    _success();
  });

  return {
    then(success) {
      _success = success || GWU.NOOP;
    },
  };
}
