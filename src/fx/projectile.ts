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

  const fromX = GWU.xy.x(from);
  const fromY = GWU.xy.y(from);
  const toX = GWU.xy.x(to);
  const toY = GWU.xy.y(to);

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

  console.log("- fire", from, to);

  scene.pause({ update: true });

  const tween = GWU.tween
    .make({ x: fromX, y: fromY })
    .to({ x: toX, y: toY })
    .duration(ms)
    .onStart((vals) => {
      fx.x = fromX;
      fx.y = fromY;
      level.addFx(fx);
    })
    .onUpdate((vals) => {
      if (level.blocksMove(vals.x, vals.y)) {
        tween.stop(false);
      }
      fx.x = vals.x;
      fx.y = vals.y;
      console.log("- >> ", vals);
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
