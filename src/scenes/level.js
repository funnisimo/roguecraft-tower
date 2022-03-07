import "../../lib/gw-utils.js";
import CONFIG from "../config.js";
import * as WIDGETS from "../widgets/index.js";
// import * as ACTOR from "../actor/index.js";
// import * as FX from "../fx/index.js";
// import * as GAME from "../game/index.js";

export const level = {
  create() {
    this.bg = "dark_gray";

    WIDGETS.messages(this, 35).on("click", (e) => {
      if (this.data.messages.length > 10) {
        this.app.scenes.run("archive", {
          messages: this.data.messages,
          startHeight: 10,
        });
      }
      e.stopPropagation();
    });

    WIDGETS.map(this, 60, 35);
    WIDGETS.sidebar(this, 60, 35);
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
    },
  },
};
