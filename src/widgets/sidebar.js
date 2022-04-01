import * as GWU from "gw-utils";

export function sidebar(scene, x, height) {
  const widget = GWU.widget.make({
    id: "SIDEBAR",
    tag: "sidebar",

    x: x,
    y: 0,
    width: scene.width - x,
    height: height,

    scene,
    bg: GWU.color.from("dark_gray"),

    draw(buf) {
      const game = this.scene.data;
      const level = game.level;

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
      y += buf.drawText(x, y, "Level: " + game.level.depth, "pink");
      y += 1;

      let px = game.player.x;
      let py = game.player.y;
      // if (this.focus[0] != -1) {
      //   px = this.focus[0];
      //   py = this.focus[1];
      // }
      this.entries = level.actors.filter(
        (a) => a && a !== game.player && a.health > 0
      );
      this.entries.sort(
        (a, b) =>
          GWU.xy.distanceBetween(a.x, a.y, px, py) -
          GWU.xy.distanceBetween(b.x, b.y, px, py)
      );

      let focused = this.entries.find((a) => GWU.xy.equals(a, this.focus));

      let used = drawPlayer(buf, x, y, game.player);
      game.player.data.sideY = y;
      game.player.data.sideH = used;
      if (GWU.xy.equals(game.player, this.focus)) {
        buf.mix("white", 20, x - 1, y, this.bounds.width, used);
        focused = game.player;
      } else if (focused) {
        buf.mix(this._used.bg, 50, x - 1, y, this.bounds.width, used);
      }
      y += used + 1;

      this.entries.forEach((a) => {
        const used = drawActor(buf, x, y, a);

        if (a === focused) {
          buf.mix("white", 20, x - 1, y, this.bounds.width, used);
        } else if (focused) {
          buf.mix(this._used.bg, 50, x - 1, y, this.bounds.width, used);
        }
        a.data.sideY = y;
        a.data.sideH = used;
        y += used + 1;
      });

      y += 1;
      y += buf.drawText(x, y, "Press Enter to win.");
      y += buf.drawText(x, y, "Press Escape to lose.");

      buf.clearClip();
    },

    mousemove(e) {
      const wasFocus = this.focus.slice();
      this.focus[0] = -1;
      this.focus[1] = -1;
      const game = this.scene.data;
      const player = game.player;
      if (
        player.data.sideY <= e.y &&
        player.data.sideY + player.data.sideH >= e.y
      ) {
        this.focus[0] = player.x;
        this.focus[1] = player.y;
      } else {
        this.entries.forEach((a) => {
          if (a.data.sideY <= e.y && a.data.sideY + a.data.sideH >= e.y) {
            this.focus[0] = a.x;
            this.focus[1] = a.y;
          }
        });
      }
      if (!GWU.xy.equals(wasFocus, this.focus)) {
        this.trigger("focus", this.focus);
        this.needsDraw = true;
      }
      e.stopPropagation();
    },

    // click(e) {
    //   e.stopPropagation();
    // },

    with: {
      setFocus,
      clearFocus,
      focus: [-1, -1],
      entries: [],
    },
  });

  return widget;
}

function setFocus(game, x, y) {
  this.focus = [x, y];
}

function clearFocus(game) {
  this.focus = [-1, -1];
}

function drawPlayer(buf, x, y, player) {
  buf.drawText(x, y, "Hero");

  drawHealth(buf, x, y + 1, 28, player);
  // buf.drawText(x, y + 1, "" + player.health);
  return 2;
}

function drawActor(buf, x, y, actor) {
  buf.drawText(x, y, actor.kind.id, actor.kind.fg);
  drawHealth(buf, x, y + 1, 28, actor);
  // buf.drawText(x, y + 1, "" + actor.health, "red");
  return 2;
}

function drawProgress(buf, x, y, w, fg, bg, val, max, text = "") {
  const pct = val / max;
  const full = Math.floor(w * pct);
  const partialPct = Math.floor(100 * (w * pct - full));

  buf.fillRect(x, y, full, 1, null, null, bg);
  buf.draw(x + full, y, null, null, GWU.color.from(bg).alpha(partialPct));

  if (text && text.length) {
    buf.drawText(x, y, text, fg, null, w, "center");
  }
}

function drawHealth(buf, x, y, w, actor) {
  const pct = actor.health / actor.kind.health;
  const bg = GWU.color.colors.green.mix(GWU.color.colors.red, 100 * (1 - pct));
  drawProgress(
    buf,
    x,
    y,
    w,
    "white",
    bg,
    actor.health,
    actor.kind.health,
    "HEALTH"
  );
}
