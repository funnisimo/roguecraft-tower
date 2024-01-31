import * as GWU from "gw-utils";
import { Game } from "../game/game";
import { Level } from "../level";

export function messages(scene: GWU.app.Scene, y: number) {
  const widget = GWU.widget.make({
    id: "MESSAGES",
    tag: "msg",

    x: 0,
    y: y,
    width: scene.width,
    height: scene.height - y,

    scene,
    bg: "darkest_gray",
    fg: "white",

    draw(this: GWU.app.Widget, buf: GWU.buffer.Buffer) {
      buf.fillRect(
        this.bounds.x,
        this.bounds.y,
        this.bounds.width,
        this.bounds.height,
        " ",
        this._used.bg,
        this._used.bg
      );

      const fg = GWU.color.from(this._used.fg);
      const fgc = fg.alpha(50);

      const scene = this.scene! as GWU.app.Scene;
      const level = scene.data.level as Level;
      const game = level.game;

      if (game && game.messages) {
        let h = 0;
        game.messages.forEach((msg, confirmed, i) => {
          if (i < this.bounds.height) {
            const color = confirmed ? fgc : fg;
            buf.drawText(this.bounds.x, this.bounds.top + i, msg, color);
          }
        });
      }
    },

    mousemove(e: GWU.app.Event) {
      e.stopPropagation();
    },
    click(e: GWU.app.Event) {
      e.stopPropagation();
    },
  });

  return widget;
}
