import "../../lib/gw-utils.js";
import CONFIG from "../config.js";
import * as MAP from "../map/index.js";
import * as ACTOR from "../actor/index.js";
import * as FX from "../fx/index.js";

export const level = {
  create() {
    this.bg = "dark_gray";
    const build = new GWU.widget.Builder(this);
    const x = 62;
    build.pos(x, 15).text("{Roguecraft}", { fg: "yellow" });
    build.pos(x, 17).text("LEVEL", { fg: "green" });

    build.pos(x, 30).text("Press Enter to win.");
    build.pos(x, 32).text("Press Escape to lose.");

    build.pos(x, 22).text("Level: {}", { fg: "pink", id: "LEVEL" });
    build.pos(x, 24).text("Seed: {}", { fg: "pink", id: "SEED" });
  },

  start(game) {
    this.data = game;
    game.scene = this;

    const w = this.get("LEVEL");
    w.text("Level: " + game.level);

    const seed = game.seed || 12345;
    const s = this.get("SEED");
    s.text("Seed: " + seed);

    const map = (game.map = new MAP.Map(60, 35));
    GWU.xy.forBorder(map.width, map.height, (x, y) =>
      map.setTile(x, y, MAP.WALL)
    );

    // game.player = ACTOR.Player;
    game.player.x = 1;
    game.player.y = 1;

    this.wait(1000, () => {
      const zombie = ACTOR.make("zombie");
      game.actors.push(zombie);

      zombie.x = 20;
      zombie.y = 20;
      FX.flash(game, 20, 20, zombie.kind.fg, 500);
    });
  },

  on: {
    dir(e) {
      const player = this.data.player;
      const map = this.data.map;

      const oldX = player.x;
      const oldY = player.y;

      ACTOR.moveDir(player, map, e.dir);

      this.buffer.drawSprite(oldX, oldY, map.tileAt(oldX, oldY));
      this.buffer.drawSprite(player.x, player.y, player.kind);

      e.stopPropagation();
    },

    keypress(e) {
      if (e.key == "Enter") {
        if (this.data.level === CONFIG.LAST_LEVEL) {
          this.app.scenes.start("win", this.data);
        } else {
          this.app.scenes.start("stuff", this.data);
        }
      }
      if (e.key == "Escape") {
        this.app.scenes.start("lose", this.data);
      }
      e.stopPropagation();
    },
  },

  draw(buf) {
    const map = this.data.map;
    map.cells.forEach((id, x, y) => {
      const tile = MAP.tiles[id];
      buf.blackOut(x, y);
      buf.drawSprite(x, y, tile);
    });

    this.data.actors.forEach((a) => {
      buf.drawSprite(a.x, a.y, a.kind);
    });
  },
};
