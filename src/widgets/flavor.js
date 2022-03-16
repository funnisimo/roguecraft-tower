import "../../lib/gw-utils.js";

export function flavor(scene, x, y) {
  const widget = GWU.widget.make({
    id: "FLAVOR",
    tag: "flavor",

    x: x,
    y: y,
    width: scene.width - x,
    height: 1,

    scene,
    bg: GWU.color.from("black"),
    fg: GWU.color.from("purple"),

    draw(buf) {
      const game = this.scene.data;
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
        this.prop("text"),
        this.fg,
        this.bg,
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
