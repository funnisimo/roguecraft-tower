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
      // if (x === this._focus[0] && y === this._focus[1]) {
      //   buf.get(x, y).mix("green", 0, 50).separate();
      // } else if (level.isInPath(x, y)) {
      //   buf.get(x, y).mix("yellow", 0, 50).separate();
      // }
    });

    const player = game.player;
    if (player.goalMap) {
      GWU.path.forPath(
        player.goalMap,
        player.x,
        player.y,
        (x, y) => {
          if (level.hasActor(x, y)) return true;
          return false;
        },
        (x, y) => {
          buf.get(x, y).mix("green", 0, 25).separate();
        },
        true
      );
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
