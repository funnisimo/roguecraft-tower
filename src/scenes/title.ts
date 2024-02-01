import * as GWU from "gw-utils";
import * as GAME from "../game";

export const title = {
  create(this: GWU.app.Scene) {
    this.bg = GWU.color.from("dark_gray");
    const build = new GWU.widget.Builder(this);
    build.pos(10, 15).text(this.app.name, { fg: "green" });

    build.pos(10, 30).text("Press any key to start.");
    build.pos(10, 32).text("Press s to enter seed.");
    build.pos(10, 34).text("Press h for help.");

    // Press 's' to choose a seed and start a game
    this.on("s", (e) => {
      const prompt = this.app.prompt("What is your starting seed?", {
        numbersOnly: true,
        bg: GWU.color.BLACK.alpha(50),
      });
      // TODO - This should be something better than "stop"
      prompt.on("stop", (seed) => {
        e.stopPropagation();
        if (seed) {
          // TODO - Should be GAME.start(...) -> b/c separating game make and start isn't a thing
          const full_opts = GWU.utils.mergeDeep(this.app.data.start_opts, {
            seed,
          });
          const game = GAME.create(this.app, full_opts);
          const level = game.getLevel(game.start_level);
          level.show();
        }
      });
      e.stopPropagation();
    });

    // press 'h' for help
    this.on("h", (e) => {
      this.app.scenes.start("help");
      e.stopPropagation();
    });

    // Any 'other' key results in starting a new game with a random seed
    this.on("keypress", (e) => {
      // TODO - Should be GAME.start(...) -> b/c separating game make and start isn't a thing
      const full_opts = GWU.utils.mergeDeep(this.app.data.start_opts, {});
      const game = GAME.create(this.app, full_opts);
      const level = game.getLevel(game.start_level);
      level.show();
      e.stopPropagation();
    });
  },
};
