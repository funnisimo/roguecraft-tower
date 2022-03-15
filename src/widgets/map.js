import "../../lib/gw-utils.js";
import * as MAP from "../map/index.js";

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

      const map = game.map;
      map._tiles.forEach((index, x, y) => {
        const tile = MAP.tilesByIndex[index];
        buf.blackOut(x, y);
        buf.drawSprite(x, y, tile);
      });

      game.actors.forEach((a) => {
        a.draw(buf);
      });
    },

    mousemove(e) {
      e.stopPropagation();
    },
  });

  return widget;
}
