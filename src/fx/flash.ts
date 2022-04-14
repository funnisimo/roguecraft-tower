import * as GWU from "gw-utils";
import { Obj, ObjConfig, CallbackFn } from "../game/obj";
import { Game } from "../game/game";

export class FX extends Obj {
  ch: string | null;
  fg: GWU.color.ColorBase;
  bg: GWU.color.ColorBase;

  constructor(cfg: ObjConfig) {
    super(cfg);
    this.ch = cfg.ch || null;
    this.fg = cfg.fg || null;
    this.bg = cfg.bg || null;
  }

  draw(buf: GWU.buffer.Buffer) {
    buf.drawSprite(this.x, this.y, this);
  }
}

export function flash(
  game: Game,
  x: number,
  y: number,
  color: GWU.color.ColorBase = "white",
  ms = 300
) {
  const scene = game.scene!;
  scene.pause({ update: true });

  const fx = new FX({ x, y, bg: color, z: 4 });
  game.level!.addFx(fx);

  let _success: CallbackFn = GWU.NOOP;
  scene.needsDraw = true;

  scene.wait(ms, () => {
    game.level!.removeFx(fx);
    scene.resume({ update: true });
    _success();
  });

  return {
    then(success: CallbackFn) {
      _success = success || GWU.NOOP;
    },
  };
}

export function flashGameTime(
  game: Game,
  x: number,
  y: number,
  color: GWU.color.ColorBase = "white",
  ms = 300
) {
  const scene = game.scene!;
  const level = game.level!;

  const startTime = scene.app.time;

  const fx = new FX({ x, y, bg: color, z: 4 });
  level.addFx(fx);

  let _success: CallbackFn = GWU.NOOP;
  // let _fail: CallbackFn = GWU.NOOP;

  game.wait(ms, () => {
    const nowTime = scene.app.time;
    const timeLeft = ms - (nowTime - startTime);
    if (timeLeft > 0) {
      scene.pause({ update: true });

      scene.wait(timeLeft, () => {
        level.removeFx(fx);
        scene.resume({ update: true });
        _success();
      });
    } else {
      level.removeFx(fx);
      _success();
    }
  });

  return {
    then(fn: CallbackFn) {
      _success = fn || GWU.NOOP;
    },
  };
}
