import * as GWU from "gw-utils";

import { Level } from "../level/level";
import { Game } from "../game/game";

export class Map extends GWU.app.Widget {
  _focus: GWU.xy.Loc = [-1, -1];

  constructor(opts: GWU.app.WidgetOpts) {
    super(opts);
    this.on("draw", this._draw);
    this.on("mousemove", this._setFocus);
    this.on("mouseleave", this._clearFocus);
    this.on("keypress", this._clearFocus);
  }

  _draw(buf: GWU.buffer.Buffer) {
    const scene = this.scene! as GWU.app.Scene;
    const level = scene.data.level as Level;
    const game = level.game;
    const player = game.hero;

    buf.fillRect(
      this.bounds.x,
      this.bounds.y,
      this.bounds.width,
      this.bounds.height,
      " ",
      "black",
      "black"
    );

    level.tiles.forEach((index, x, y) => {
      if (this.bounds.contains(x, y)) {
        buf.blackOut(x, y);
        level.drawAt(buf, x, y);

        if (!player.fov || !player.fov.get(x, y)) {
          buf.get(x, y).mix("black", 25, 25);
        }
      }
    });

    if (player.goalPath) {
      player.goalPath.forEach(([x, y]) => {
        buf.get(x, y).mix("green", 0, 25).separate();
      });
    }
  }

  _setFocus(e: GWU.xy.XY) {
    this._focus[0] = e.x;
    this._focus[1] = e.y;
    this.needsDraw = true;
    // e.stopPropagation();
  }

  _clearFocus() {
    this._focus[0] = -1;
    this._focus[1] = -1;
  }
}

export function map(scene: GWU.app.Scene, width: number, height: number): Map {
  const widget = new Map({
    id: "MAP",
    tag: "map",

    x: 0,
    y: 0,
    width: width,
    height: height,

    scene,
    bg: GWU.color.BLACK,
  });

  return widget;
}
