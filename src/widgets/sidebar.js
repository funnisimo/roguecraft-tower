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

      buf.setClip(this.bounds);

      buf.drawText(x);
      y += buf.drawText(x, y, "{Roguecraft}", "yellow");
      y += buf.drawText(x, y, "Seed: " + game.seed, "pink");
      y += buf.drawText(x, y, "Level: " + game.level, "pink");

      y += 1;
      y += drawPlayer(buf, x, y, game.player);
      y += 1;

      const px = game.player.x;
      const py = game.player.y;
      const ordered = game.actors.filter(
        (a) => a !== game.player && a.health > 0
      );
      ordered.sort(
        (a, b) =>
          GWU.xy.distanceBetween(a.x, a.y, px, py) -
          GWU.xy.distanceBetween(b.x, b.y, px, py)
      );

      ordered.forEach((a) => {
        y += drawActor(buf, x, y, a);
        y += 1;
      });

      y += 1;
      y += buf.drawText(x, y, "Press Enter to win.");
      y += buf.drawText(x, y, "Press Escape to lose.");

      buf.clearClip();
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

function drawPlayer(buf, x, y, player) {
  buf.drawText(x, y, "Hero");
  buf.drawText(x, y + 1, "" + player.health);
  return 2;
}

function drawActor(buf, x, y, actor) {
  buf.drawText(x, y, actor.kind.id, "red");
  buf.drawText(x, y + 1, "" + actor.health, "red");
  return 2;
}
