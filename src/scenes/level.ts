import * as GWU from "gw-utils";

import * as WIDGETS from "../widgets/index";
// import * as ACTOR from "../actor/index";
// import * as FX from "../fx/index";
import { Game } from "../game";
import { Level } from "../level";

export const level = {
  create(this: GWU.app.Scene, opts: GWU.app.SceneCreateOpts) {
    this.bg = GWU.color.from("dark_gray");
    // const level = this;

    // TODO - Get these sizes and locations dynamically
    const sidebar = WIDGETS.sidebar(this, 60, 35);
    const flavor = WIDGETS.flavor(this, 0, 35);
    const messages = WIDGETS.messages(this, 36);
    const map = WIDGETS.map(this, 60, 35);
    const details = WIDGETS.details(this, 60, 35);

    sidebar.on("focus", (loc) => {
      loc = loc || [-1, -1];
      map._focus = loc;

      const level = this.data.level as Level;
      const game = level.game;

      const hero = game.hero;
      if (loc[0] < 0) {
        // game.level.clearPath();
        hero.clearGoal();
      } else {
        // highlight path
        hero.setGoal(loc[0], loc[1]);
        // const player = game.player;
        // const path = player.pathTo(loc);
        // game.level.setPath(path);
      }

      const actor = level.actorAt(loc[0], loc[1]);
      if (actor) {
        details.hidden = false;
        // @ts-ignore
        if (actor === hero) {
          details.showHero(hero);
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
      console.log("sidebar choose - hero go to :", loc[0], loc[1]);
      const level = this.data.level as Level;
      const game = level.game;
      game.hero.setGoal(loc[0], loc[1]);
      game.hero.followPath = true;
      game.hero.act(level);
    });

    messages.on("click", (e: GWU.app.Event) => {
      const level = this.data.level as Level;
      const game = level.game;
      if (game.messages.length > 10) {
        this.app.scenes.run("archive", {
          messages: game.messages,
          startHeight: 10,
        });
      }
      e.stopPropagation();
    });

    map.on("mousemove", (e: GWU.app.Event) => {
      const level = this.data.level as Level;
      const game = level.game;

      const text = level.getFlavor(e.x, e.y);
      flavor.prop("text", text);
      sidebar.setFocus(e.x, e.y);

      if (!level.started) return;
      // highlight path
      const hero = game.hero;
      hero.setGoal(e.x, e.y);
      // const path = player.pathTo(e);
      // game.level.setPath(path);
    });
    map.on("mouseleave", (e: GWU.app.Event) => {
      const level = this.data.level as Level;
      const game = level.game;
      sidebar.clearFocus();
      // game.level.clearPath();
      game.hero.clearGoal();
    });
    map.on("click", (e: GWU.app.Event) => {
      console.log("map click - player go to:", e.x, e.y);
      const level = this.data.level as Level;
      const game = level.game;
      if (!level.started) return;

      if (game.hero.followPath) {
        game.hero.setGoal(e.x, e.y);
        game.hero.followPath = false;
      } else {
        // TODO - This should follow the enqueue path..
        game.hero.setGoal(e.x, e.y);
        game.hero.followPath = true;
        game.hero.act(level);
      }
    });
  },

  start(this: GWU.app.Scene, opts: { level: Level }) {
    this.data.level = opts.level;
    this.needsDraw = true;
  },

  update(dt: number) {
    this.data.level.update(dt);
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

    // inventory(this: GWU.app.Scene) {
    //   const level = this.data.level as Level;
    //   const game = level.game;
    //   const hero = game.hero;
    //   const sidebar = this.get("SIDEBAR")! as WIDGETS.Sidebar;
    //   sidebar.setFocus(hero.x, hero.y);
    // },

    // win(this: GWU.app.Scene) {
    //   const game = this.data.game as Game;
    //   game.messages.confirmAll();

    //   const LAST_LEVEL = this.app.data.get("LAST_LEVEL");
    //   if (this.data.level.depth === LAST_LEVEL) {
    //     this.app.scenes.start("win", this.data);
    //   } else {
    //     this.app.scenes.start("reward", this.data);
    //   }
    // },
    // lose(this: GWU.app.Scene) {
    //   this.app.scenes.start("lose", this.data);
    // },

    keypress(this: GWU.app.Scene, e: GWU.app.Event) {
      const sidebar = this.get("SIDEBAR")! as WIDGETS.Sidebar;
      sidebar.clearFocus();
      // this.data.level.clearPath();

      const level = this.data.level as Level;
      const game = level.game;

      if (game.hero.followPath) {
        game.hero.followPath = false;
      } else {
        game.inputQueue.enqueue(e.clone());
      }

      e.stopPropagation();
    },

    // click(this: GWU.app.Scene, e: GWU.app.Event) {
    //   const level = this.data.level as Level;
    //   const game = level.game;
    //   game.inputQueue.enqueue(e.clone());
    //   e.stopPropagation();
    // },
  },
};
