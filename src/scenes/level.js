import "../../lib/gw-utils.js";
import CONFIG from "../config.js";
import * as WIDGETS from "../widgets/index.js";
// import * as ACTOR from "../actor/index.js";
// import * as FX from "../fx/index.js";
// import * as GAME from "../game/index.js";

export const level = {
  create() {
    this.bg = "dark_gray";
    // const level = this;

    const sidebar = WIDGETS.sidebar(this, 60, 35);
    const flavor = WIDGETS.flavor(this, 0, 35);
    const messages = WIDGETS.messages(this, 36);
    const map = WIDGETS.map(this, 60, 35);

    sidebar.on("focus", (loc) => {
      loc = loc || [-1, -1];
      map.focus = loc;

      const game = this.data;
      const player = game.player;
      if (loc[0] < 0) {
        player.clearPath();
      } else {
        // highlight path
        const player = game.player;
        const path = GWU.path.fromTo(player, loc, (x, y) =>
          player.moveCost(game, x, y)
        );
        player.setPath(path);
      }
    });
    sidebar.on("choose", (loc) => {
      console.log("tell player to go to", loc[0], loc[1]);
    });

    messages.on("click", (e) => {
      const game = this.data;
      if (game.messages.length > 10) {
        this.app.scenes.run("archive", {
          messages: game.messages,
          startHeight: 10,
        });
      }
      e.stopPropagation();
    });

    map.on("mousemove", (e) => {
      const game = this.data;
      const text = game.getFlavor(e.x, e.y);
      flavor.prop("text", text);
      sidebar.setFocus(game, e.x, e.y);

      // highlight path
      const player = game.player;
      const path = GWU.path.fromTo(player, e, (x, y) =>
        player.moveCost(game, x, y)
      );
      game.player.setPath(path);
    });
    map.on("mouseleave", (e) => {
      const game = this.data;
      sidebar.clearFocus(game);
      game.player.clearPath();
    });
    map.on("click", (e) => {
      console.log("tell player to move to", e.x, e.y);
    });
  },

  start(game) {
    this.data = game;
    game.scene = this;

    // const w = this.get("LEVEL");
    // w.text("Level: " + game.level);

    // const seed = game.seed || 12345;
    // const s = this.get("SEED");
    // s.text("Seed: " + seed);

    game.startLevel(this, 60, 35);
  },

  on: {
    // dir(e) {
    //   GAME.moveDir(this.data, this.data.player, e.dir);
    // },
    // a() {
    //   GAME.attack(this.data, this.data.player);
    // },
    // z() {
    //   ACTOR.spawn(this.data, "zombie", this.data.player.x, this.data.player.y);
    // },

    win() {
      if (this.data.level === CONFIG.LAST_LEVEL) {
        this.app.scenes.start("win", this.data);
      } else {
        this.app.scenes.start("stuff", this.data);
      }
    },
    lose() {
      this.app.scenes.start("lose", this.data);
    },

    keypress(e) {
      this.get("SIDEBAR").clearFocus();
      this.data.player.clearPath();

      if (e.key == "Enter") {
        this.trigger("win");
      }
      if (e.key == "Escape") {
        this.trigger("lose");
      }
      e.stopPropagation();
    },
  },
};
