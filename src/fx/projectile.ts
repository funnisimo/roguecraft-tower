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
        level.removeFx(fx);
        scene.resume({ update: true });
        tween.stop();
        _success(vals, false);
      }
      fx.x = vals.x;
      fx.y = vals.y;
      console.log("- >> ", vals);
      scene.needsDraw = true;
    })
    .onFinish((vals) => {
      level.removeFx(fx);
      scene.resume({ update: true });
      _success(vals, true);
    })
    .start(game.scene!.tweens);

  return {
    then(success: ProjectileCb) {
      _success = success || GWU.NOOP;
    },
  };
}
