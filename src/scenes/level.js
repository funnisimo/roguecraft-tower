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
        // game.level.clearPath();
        game.player.clearGoal();
      } else {
        // highlight path
        player.setGoal(loc[0], loc[1]);
        // const player = game.player;
        // const path = player.pathTo(loc);
        // game.level.setPath(path);
      }
    });
    sidebar.on("choose", (loc) => {
      console.log("sidebar choose - player go to :", loc[0], loc[1]);
      const game = this.data;
      game.player.setGoal(loc[0], loc[1]);
      game.player.goToGoal = true;
      game.player.act(game);
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
      const text = game.level.getFlavor(e.x, e.y);
      flavor.prop("text", text);
      sidebar.setFocus(game, e.x, e.y);

      // highlight path
      const player = game.player;
      player.setGoal(e.x, e.y);
      // const path = player.pathTo(e);
      // game.level.setPath(path);
    });
    map.on("mouseleave", (e) => {
      const game = this.data;
      sidebar.clearFocus(game);
      // game.level.clearPath();
      game.player.clearGoal();
    });
    map.on("click", (e) => {
      console.log("map click - player go to:", e.x, e.y);
      const game = this.data;
      game.player.setGoal(e.x, e.y);
      game.player.goToGoal = true;
      game.player.act(game);
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
      // this.data.level.clearPath();
      this.data.player.clearGoal();

      if (e.key == "Enter") {
        this.trigger("win"); // todo - remove
      }
      if (e.key == "Escape") {
        this.trigger("lose"); // todo -- remove
      }
      e.stopPropagation();
    },
  },
};
