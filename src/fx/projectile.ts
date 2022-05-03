import * as GWU from "gw-utils";
import { Game } from "../game/game";
import { FX, flash } from "./flash";
import { CallbackFn } from "../game/obj";

export type Pos = GWU.xy.Loc | GWU.xy.XY;

export type ProjectileCb = (xy: GWU.xy.XY, ok: boolean) => void;

export function projectile(
  game: Game,
  from: Pos,
  to: Pos,
  sprite: GWU.sprite.SpriteConfig,
  ms: number
) {
  const level = game.level!;
  const scene = game.scene!;

  from = GWU.xy.asXY(from);
  to = GWU.xy.asXY(to);

  let _success: ProjectileCb = GWU.NOOP;

  if (sprite.ch && sprite.ch.length == 4) {
    const dir = GWU.xy.dirFromTo(from, to);
    let index = 0;
    if (dir[0] && dir[1]) {
      index = 2;
      if (dir[0] != dir[1]) {
        // remember up is -y
        index = 3;
      }
    } else if (dir[0]) {
      index = 1;
    }
    const ch = sprite.ch[index];
    sprite = GWU.sprite.make(ch, sprite.fg, sprite.bg);
  } else if (sprite.ch && sprite.ch.length !== 1) {
    throw new Error(
      'projectile requires 4 chars - vert,horiz,diag-left,diag-right (e.g: "|-\\/")'
    );
  }

  const fx = new FX(sprite);

  // console.log("- fire", from, to);

  scene.pause({ update: true });

  const tween = GWU.tween
    .make(fx)
    .from(from)
    .to(to, ["x", "y"])
    .duration(ms)
    .onStart((_vals) => {
      level.addFx(fx);
    })
    .onUpdate((vals) => {
      if (level.blocksMove(vals.x, vals.y)) {
        tween.stop(false);
      }
      // console.log("- >> ", vals);
      scene.needsDraw = true;
    })
    .onFinish((vals, isSuccess) => {
      level.removeFx(fx);
      scene.resume({ update: true });
      _success(vals, isSuccess);
    })
    .start(game.scene!.tweens);

  return {
    then(success: ProjectileCb) {
      _success = success || GWU.NOOP;
    },
  };
}
