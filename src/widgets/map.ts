import * as GWU from "gw-utils";

import { Level } from "../game/level";
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
    const game = this.scene!.data as Game;
    const player = game.player;

    buf.fillRect(
      this.bounds.x,
      this.bounds.y,
      this.bounds.width,
      this.bounds.height,
      " ",
      "black",
      "black"
    );

    const level = game.level!;
    level.tiles.forEach((index, x, y) => {
      buf.blackOut(x, y);
      level.drawAt(buf, x, y);

      if (!player.fov || !player.fov.get(x, y)) {
        buf.get(x, y).mix("black", 25, 25);
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
