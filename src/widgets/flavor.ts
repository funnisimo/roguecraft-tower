import * as GWU from "gw-utils";

export function flavor(scene: GWU.app.Scene, x: number, y: number) {
  const widget = GWU.widget.make({
    id: "FLAVOR",
    tag: "flavor",

    x: x,
    y: y,
    width: scene.width - x,
    height: 1,

    scene,
    bg: GWU.color.from("darker_gray"),
    fg: GWU.color.from("purple"),

    draw(this: GWU.app.Widget, buf: GWU.buffer.Buffer) {
      const game = this.scene!.data;
      buf.fillRect(
        this.bounds.x,
        this.bounds.y,
        this.bounds.width,
        this.bounds.height,
        " ",
        this._used.bg,
        this._used.bg
      );

      buf.drawText(
        this.bounds.x,
        this.bounds.y,
        this.prop("text") as string,
        this._used.fg,
        this._used.bg,
        this.bounds.width
      );
    },

    mousemove(e) {
      e.stopPropagation();
    },

    click(e) {
      e.stopPropagation();
    },
  });

  return widget;
}
