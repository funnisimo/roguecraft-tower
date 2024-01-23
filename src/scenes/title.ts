import * as GWU from "gw-utils";
import { Game } from "../game/game";

export const title = {
  create(this: GWU.app.Scene) {
    this.bg = GWU.color.from("dark_gray");
    const build = new GWU.widget.Builder(this);
    build.pos(10, 15).text(this.app.name, { fg: "green" });

    build.pos(10, 30).text("Press any key to start.");
    build.pos(10, 32).text("Press s to enter seed.");
    build.pos(10, 34).text("Press h for help.");

    this.on("s", (e) => {
      const prompt = this.app.prompt("What is your starting seed?", {
        numbersOnly: true,
        bg: GWU.color.BLACK.alpha(50),
      });
      prompt.on("stop", (seed) => {
        e.stopPropagation();
        if (seed) {
          const game = new Game({ seed, app: this.app });
          this.app.scenes.start("level", game);
        }
      });
      e.stopPropagation();
    });
    this.on("h", (e) => {
      this.app.scenes.start("help");
      e.stopPropagation();
    });
    this.on("keypress", (e) => {
      const game = new Game({ app: this.app });
      this.app.scenes.start("level", game);
      e.stopPropagation();
    });
  },
};
