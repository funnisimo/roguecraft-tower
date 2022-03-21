import "../../lib/gw-utils.js";
import * as LEVEL from "../levels/index.js";

export function map(scene, width, height) {
  const widget = GWU.widget.make({
    id: "MAP",
    tag: "map",

    x: 0,
    y: 0,
    width: width,
    height: height,

    scene,
    bg: GWU.color.BLACK,

    draw(buf) {
      const game = this.scene.data;

      buf.fillRect(
        this.bounds.x,
        this.bounds.y,
        this.bounds.width,
        this.bounds.height,
        " ",
        "black",
        "black"
      );

      const level = game.level;
      level._tiles.forEach((index, x, y) => {
        buf.blackOut(x, y);
        level.drawAt(buf, x, y);
        // if (x === this.focus[0] && y === this.focus[1]) {
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
    },

    mousemove(e) {
      this.focus[0] = e.x;
      this.focus[1] = e.y;
      this.needsDraw = true;
      e.stopPropagation();
    },

    mouseleave(e) {
      this.focus[0] = -1;
      this.focus[1] = -1;
    },

    keypress() {
      this.focus[0] = -1;
      this.focus[1] = -1;
    },

    with: {
      focus: [-1, -1],
    },
  });

  return widget;
}
