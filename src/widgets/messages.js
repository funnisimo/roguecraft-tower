import "../../lib/gw-utils.js";

export function messages(scene, y) {
  const widget = GWU.widget.make({
    id: "MESSAGES",
    tag: "msg",

    x: 0,
    y: y,
    width: scene.width,
    height: scene.height - y,

    scene,
    bg: GWU.color.BLACK.alpha(50),

    draw(buf) {
      buf.fillRect(
        this.bounds.x,
        this.bounds.y,
        this.bounds.width,
        this.bounds.height,
        " ",
        "black",
        "black"
      );

      const game = this.scene.data;
      if (game && game.messages) {
        let h = 0;
        game.messages.forEach((msg, confirmed, i) => {
          if (i < this.bounds.height) {
            const fg = confirmed ? "dark_purple" : "purple";
            buf.drawText(this.bounds.x, this.bounds.top + i, msg, fg);
          }
        });
      }
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
