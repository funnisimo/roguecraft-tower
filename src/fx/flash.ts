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

  const fx = new FX({ x, y, bg: color, depth: 4 });
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
