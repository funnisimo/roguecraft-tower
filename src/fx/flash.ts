import * as GWU from "gw-utils";
import { Obj, ObjCreateOpts, CallbackFn, ObjKind } from "../object";
import { Game } from "../game/game";
import { Level } from "../level";

export interface FXConfig extends ObjCreateOpts {
  ch?: string | null;
  fg?: GWU.color.ColorBase;
  bg?: GWU.color.ColorBase;
}

const FX_KIND: ObjKind = {
  performs: [],
  resolves: [],
  bump: [],
  on: {},
};

export class FX extends Obj {
  ch: string | null;
  fg: GWU.color.ColorBase;
  bg: GWU.color.ColorBase;

  constructor(cfg: FXConfig) {
    super(FX_KIND);
    this.ch = cfg.ch || null;
    this.fg = cfg.fg || null;
    this.bg = cfg.bg || null;
  }

  draw(buf: GWU.buffer.Buffer) {
    buf.drawSprite(this.x, this.y, this);
  }
}

export function create(cfg: FXConfig): FX {
  const fx = new FX(cfg);
  fx._create(cfg);
  fx.emit("create", fx, cfg);
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

  const fx = create({ x, y, bg: color, z: 4 });
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

  const fx = create({ x, y, bg: color, z: 4 });
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
