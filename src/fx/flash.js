import { Obj } from "../game/obj.js";

class FX extends Obj {
  constructor(cfg) {
    super(cfg);
    this.ch = this.ch || null;
    this.fg = this.fg || null;
    this.bg = this.bg || null;

    this.on("add", (game) => {
      console.log("fx add", this.x, this.y, this.bg);
      //   GWU.list.forEach(game.scheduler.next, (i) => console.log(i.item));
    });
    this.on("remove", (game) => {
      console.log("fx remove", this.x, this.y, this.bg);
      //   GWU.list.forEach(game.scheduler.next, (i) => console.log(i.item));
    });
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
  game.add(fx);
  //   scene.buffer.draw(x, y, null, null, color);

  let _success = GWU.NOOP;
  let _fail = GWU.NOOP;

  scene.wait(ms, () => {
    game.remove(fx);
    scene.resume({ update: true });
    _success();
  });

  return {
    then(success) {
      _success = success || GWU.NOOP;
    },
  };
}
