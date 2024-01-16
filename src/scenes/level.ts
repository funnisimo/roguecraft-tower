import * as GWU from "gw-utils";

import * as WIDGETS from "../widgets/index";
// import * as ACTOR from "../actor/index";
// import * as FX from "../fx/index";
import { Game } from "../game/game";

export const level = {
  create(this: GWU.app.Scene) {
    this.bg = GWU.color.from("dark_gray");
    // const level = this;

    const sidebar = WIDGETS.sidebar(this, 60, 35);
    const flavor = WIDGETS.flavor(this, 0, 35);
    const messages = WIDGETS.messages(this, 36);
    const map = WIDGETS.map(this, 60, 35);
    const details = WIDGETS.details(this, 60, 35);

    sidebar.on("focus", (loc) => {
      loc = loc || [-1, -1];
      map._focus = loc;

      const game = this.data as Game;
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

      const actor = game.level!.actorAt(loc[0], loc[1]);
      if (actor) {
        details.hidden = false;
        if (actor === player) {
          details.showPlayer(player);
        } else {
          details.showActor(actor);
        }
      } else {
        details.hidden = true;
      }
    });
    sidebar.on("mouseleave", () => {
      details.hidden = true;
    });
    sidebar.on("choose", (loc) => {
      console.log("sidebar choose - player go to :", loc[0], loc[1]);
      const game = this.data as Game;
      game.player.setGoal(loc[0], loc[1]);
      game.player.followPath = true;
      game.player.act(game);
    });

    messages.on("click", (e: GWU.app.Event) => {
      const game = this.data as Game;
      if (game.messages.length > 10) {
        this.app.scenes.run("archive", {
          messages: game.messages,
          startHeight: 10,
        });
      }
      e.stopPropagation();
    });

    map.on("mousemove", (e: GWU.app.Event) => {
      const game = this.data as Game;
      const level = game.level!;

      const text = level.getFlavor(e.x, e.y);
      flavor.prop("text", text);
      sidebar.setFocus(e.x, e.y);

      if (!level.started) return;
      // highlight path
      const player = game.player;
      player.setGoal(e.x, e.y);
      // const path = player.pathTo(e);
      // game.level.setPath(path);
    });
    map.on("mouseleave", (e: GWU.app.Event) => {
      const game = this.data as Game;
      sidebar.clearFocus();
      // game.level.clearPath();
      game.player.clearGoal();
    });
    map.on("click", (e: GWU.app.Event) => {
      console.log("map click - player go to:", e.x, e.y);
      const game = this.data as Game;
      const level = game.level!;
      if (!level.started) return;
      game.player.setGoal(e.x, e.y);
      game.player.followPath = true;
      game.player.act(game);
    });
  },

  start(this: GWU.app.Scene, game: Game) {
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

    inventory(this: GWU.app.Scene) {
      const game = this.data as Game;
      const player = game.player;
      const sidebar = this.get("SIDEBAR")! as WIDGETS.Sidebar;
      sidebar.setFocus(player.x, player.y);
    },

    win(this: GWU.app.Scene) {
      const game = this.data as Game;
      game.messages.confirmAll();

      const LAST_LEVEL = this.app.data.get("LAST_LEVEL");
      if (this.data.level.depth === LAST_LEVEL) {
        this.app.scenes.start("win", this.data);
      } else {
        this.app.scenes.start("reward", this.data);
      }
    },
    lose(this: GWU.app.Scene) {
      this.app.scenes.start("lose", this.data);
    },

    keypress(this: GWU.app.Scene, e: GWU.app.Event) {
      const sidebar = this.get("SIDEBAR")! as WIDGETS.Sidebar;
      sidebar.clearFocus();
      // this.data.level.clearPath();

      const game = this.data as Game;
      if (e.key !== "Enter") {
        game.player.clearGoal();
      }
      // if (e.key == "Escape") {
      //   this.trigger("lose"); // todo -- remove
      // }
      e.stopPropagation();
    },
  },
};
