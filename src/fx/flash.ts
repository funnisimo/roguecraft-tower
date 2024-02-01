import * as GWU from "gw-utils";
import { Obj, ObjMakeOpts, CallbackFn } from "../game/obj";
import { Game } from "../game/game";
import { Level } from "../level";

export interface FXConfig extends ObjMakeOpts {
  ch?: string | null;
  fg?: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;
}

export class FX extends Obj {
  ch: string | null;
  fg: GWU.color.ColorBase;
  bg: GWU.color.ColorBase;

  constructor(cfg: FXConfig) {
    super();
    this.ch = cfg.ch || null;
    this.fg = cfg.fg || null;
    this.bg = cfg.bg || null;
  }

  draw(buf: GWU.buffer.Buffer) {
    buf.drawSprite(this.x, this.y, this);
  }
}

export function make(cfg: FXConfig): FX {
  const fx = new FX(cfg);
  fx._make(cfg);
  fx.emit("make", fx, cfg);
  return fx;
}

export function flash(
  level: Level,
  x: number,
  y: number,
  color: GWU.color.ColorBase = "white",
  ms = 300
) {
  const scene = level.scene;
  scene.pause({ update: true });

  const fx = make({ x, y, bg: color, z: 4 });
  level.addFx(fx);

  let _success: CallbackFn = GWU.NOOP;
  scene.needsDraw = true;

  scene.wait(ms, () => {
    level.removeFx(fx);
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
  level: Level,
  x: number,
  y: number,
  color: GWU.color.ColorBase = "white",
  ms = 300
) {
  const scene = level.scene;

  const startTime = scene.app.time;

  const fx = make({ x, y, bg: color, z: 4 });
  level.addFx(fx);

  let _success: CallbackFn = GWU.NOOP;
  // let _fail: CallbackFn = GWU.NOOP;

  level.wait(ms, () => {
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
