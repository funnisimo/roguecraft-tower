import * as GWU from "gw-utils";
import { Game } from "../game/game";

export const win = {
  create(this: GWU.app.Scene) {
    this.bg = GWU.color.from("dark_blue");
    const build = new GWU.widget.Builder(this);
    build.pos(10, 15).text("{Roguecraft}", { fg: "yellow" });
    build.pos(10, 17).text("WIN!", { fg: "green" });

    build.pos(10, 22).text("Final Level: {}", { fg: "pink", id: "LEVEL" });

    build.pos(10, 30).text("Press any key to restart.");

    this.on("keypress", () => {
      this.app.scenes.start("title");
    });
  },
  start(this: GWU.app.Scene, game: Game) {
    const level = game.level!;
    const id = level.depth || 1;
    const w = this.get("LEVEL")!;
    w.text("Final Level: " + id);
  },
};
