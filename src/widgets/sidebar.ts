import * as GWU from "gw-utils";

import { Actor } from "../actor/actor";
import { Hero } from "../actor/hero";
import { Game } from "../game/game";

export class Sidebar extends GWU.app.Widget {
  _focus: GWU.xy.Loc = [-1, -1];
  entries: Actor[] = [];

  constructor(opts: GWU.app.WidgetOpts) {
    super(opts);
  }

  setFocus(x: number, y: number) {
    const wasFocus = this._focus.slice() as GWU.xy.Loc;
    this._focus[0] = x;
    this._focus[1] = y;
    if (!GWU.xy.equals(wasFocus, this._focus)) {
      this.trigger("focus", this._focus);
      this.needsDraw = true;
    }
  }

  clearFocus() {
    const wasFocus = this._focus.slice() as GWU.xy.Loc;
    this._focus[0] = -1;
    this._focus[1] = -1;
    if (!GWU.xy.equals(wasFocus, this._focus)) {
      this.trigger("focus", this._focus);
      this.needsDraw = true;
    }
  }

  drawPlayer(buf: GWU.buffer.Buffer, x: number, y: number, player: Hero) {
    buf.drawText(x, y, "Hero");

    this.drawHealth(buf, x, y + 1, 28, player);
    this.drawPotion(buf, x, y + 2, 28, player);

    let lines = 3; // Hero + health + potion
    player.statuses.forEach((status) => {
      if (status) {
        lines += status.draw_sidebar(buf, x, y + lines, 28, player);
      }
    });

    return lines;
  }

  drawActor(buf: GWU.buffer.Buffer, x: number, y: number, actor: Actor) {
    buf.drawText(x, y, actor.name, actor.kind.fg);
    this.drawHealth(buf, x, y + 1, 28, actor);

    let lines = 2; // name + health
    actor.statuses.forEach((status) => {
      if (status) {
        lines += status.draw_sidebar(buf, x, y + lines, 28, actor);
      }
    });

    return lines;
  }

  drawProgress(
    buf: GWU.buffer.Buffer,
    x: number,
    y: number,
    w: number,
    fg: GWU.color.ColorBase,
    bg: GWU.color.ColorBase,
    val: number,
    max: number,
    text = ""
  ) {
    const pct = val / max;
    const full = Math.floor(w * pct);
    const partialPct = Math.floor(100 * (w * pct - full));

    buf.fillRect(x, y, full, 1, null, null, bg);
    buf.draw(x + full, y, null, null, GWU.color.from(bg).alpha(partialPct));

    if (text && text.length) {
      buf.drawText(x, y, text, fg, null, w, "center");
    }
  }

  drawHealth(
    buf: GWU.buffer.Buffer,
    x: number,
    y: number,
    w: number,
    actor: Actor
  ) {
    const pct = actor.health / actor.health_max;
    const bg = GWU.color.colors.green.mix(
      GWU.color.colors.red,
      100 * (1 - pct)
    );
    this.drawProgress(
      buf,
      x,
      y,
      w,
      "white",
      bg,
      actor.health,
      actor.health_max,
      "HEALTH"
    );
  }

  drawPotion(
    buf: GWU.buffer.Buffer,
    x: number,
    y: number,
    w: number,
    player: Hero
  ) {
    this.drawProgress(
      buf,
      x,
      y,
      w,
      "white",
      GWU.color.colors.blue,
      player.potion,
      player.potion_max,
      "Potion"
    );
  }

  _draw(buf: GWU.buffer.Buffer) {
    const game = this.scene!.data as Game;
    const level = game.level!;

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

    // buf.drawText(x);
    y += buf.drawText(x, y, "{Roguecraft}", "yellow");
    y += buf.drawText(x, y, "Seed: " + game.seed, "pink");
    y += buf.drawText(x, y, "Level: " + game.level!.depth, "pink");
    y += 1;

    let px = game.player.x;
    let py = game.player.y;
    // if (this._focus[0] != -1) {
    //   px = this._focus[0];
    //   py = this._focus[1];
    // }
    this.entries = level.actors.filter(
      (a) => a && a !== game.player && a.health > 0
    );
    this.entries.sort(
      (a, b) =>
        GWU.xy.distanceBetween(a.x, a.y, px, py) -
        GWU.xy.distanceBetween(b.x, b.y, px, py)
    );

    let focused = this.entries.find((a) => GWU.xy.equals(a, this._focus));

    let used = this.drawPlayer(buf, x, y, game.player);
    game.player.data.sideY = y;
    game.player.data.sideH = used;
    if (GWU.xy.equals(game.player, this._focus)) {
      buf.mix("white", 20, x - 1, y, this.bounds.width, used);
      focused = game.player;
    } else if (focused) {
      buf.mix(this._used.bg || null, 50, x - 1, y, this.bounds.width, used);
    }
    y += used + 1;

    this.entries.forEach((a) => {
      const used = this.drawActor(buf, x, y, a);

      if (a === focused) {
        buf.mix("white", 20, x - 1, y, this.bounds.width, used);
      } else if (focused) {
        buf.mix(this._used.bg || null, 50, x - 1, y, this.bounds.width, used);
      }
      a.data.sideY = y;
      a.data.sideH = used;
      y += used + 1;
    });

    y += 1;
    // y += buf.drawText(x, y, "Press Escape to lose.");

    buf.clearClip();
  }

  _mousemove(e: GWU.app.Event) {
    super._mousemove(e);

    if (e.defaultPrevented || e.propagationStopped) return;

    const wasFocus = this._focus.slice() as GWU.xy.Loc;
    this.clearFocus();
    const game = this.scene!.data;
    const player = game.player;
    if (
      player.data.sideY <= e.y &&
      player.data.sideY + player.data.sideH >= e.y
    ) {
      this.setFocus(player.x, player.y);
    } else {
      this.entries.forEach((a) => {
        if (a.data.sideY <= e.y && a.data.sideY + a.data.sideH >= e.y) {
          this.setFocus(a.x, a.y);
        }
      });
    }
    // if (!GWU.xy.equals(wasFocus, this._focus)) {
    //   this.trigger("focus", this._focus);
    //   this.needsDraw = true;
    // }
    e.stopPropagation();
  }

  _click(e: GWU.app.Event) {
    super._click(e);

    if (e.defaultPrevented || e.propagationStopped) return;

    if (this._focus[0] > -1) {
      this.trigger("choose", this._focus);
    }
  }
}

export function sidebar(
  scene: GWU.app.Scene,
  x: number,
  height: number
): Sidebar {
  const widget = new Sidebar({
    id: "SIDEBAR",
    tag: "sidebar",

    x: x,
    y: 0,
    width: scene.width - x,
    height: height,

    scene,
    bg: GWU.color.from("dark_gray"),
  });

  return widget;
}
