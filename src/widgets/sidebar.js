import "../../lib/gw-utils.js";

export function sidebar(scene, x, height) {
  const widget = GWU.widget.make({
    id: "MAP",
    tag: "map",

    x: x,
    y: 0,
    width: scene.width - x,
    height: height,

    scene,
    bg: GWU.color.from("dark_gray"),

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

      const x = this.bounds.x + 1;
      let y = this.bounds.y;

      buf.drawText(x);
      y += buf.drawText(x, y, "{Roguecraft}", "yellow");
      y += buf.drawText(x, y, "Seed: " + game.seed, "pink");
      y += buf.drawText(x, y, "Level: " + game.level, "pink");

      y += 3;
      y += buf.drawText(x, y, "Press Enter to win.");
      y += buf.drawText(x, y, "Press Escape to lose.");
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
