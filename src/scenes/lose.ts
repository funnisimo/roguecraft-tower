import * as GWU from "gw-utils";
import { Game } from "../game/game";

export const lose = {
  create(this: GWU.app.Scene) {
    this.bg = GWU.color.from("dark_gray");
    const build = new GWU.widget.Builder(this);
    build.pos(10, 15).text(this.app.name, { fg: "green" });
    build.pos(10, 17).text("LOSE!", { fg: "green" });

    build.pos(10, 22).text("On Level: {}", { fg: "pink", id: "LEVEL" });
    build.pos(10, 24).text("{reason}", { fg: "pink", id: "REASON" });

    build.pos(10, 30).text("Press any key to restart.");

    this.on("keypress", () => {
      this.app.scenes.start("title");
    });
  },
  start(this: GWU.app.Scene, opts: { game: Game; reason: string }) {
    const id = opts.game.level.id || "???";
    const w = this.get("LEVEL")!;
    w.text("On Level: " + id);

    const r = this.get("REASON")!;
    r.text(opts.reason);
  },
};
