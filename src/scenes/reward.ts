import * as GWU from "gw-utils";
import { Game } from "../game/game";
import * as Item from "../item";

export const reward = {
  create(this: GWU.app.Scene) {
    this.bg = GWU.color.from("dark_gray");
    const build = new GWU.widget.Builder(this);
    build.pos(10, 15).text("{Roguecraft}", { fg: "yellow" });
    build.pos(10, 17).text("REWARD", { fg: "green", id: "STUFF" });

    build.pos(10, 22).text("For Level: {}", { fg: "pink", id: "LEVEL" });

    build.pos(10, 30).text("Press any key to goto next level.");

    this.on("keypress", () => {
      this.app.scenes.start("level", this.data);
    });
  },
  start(this: GWU.app.Scene, game: Game) {
    this.data = game;
    const depth = game.level!.depth;

    const w = this.get("LEVEL")!;
    w.text("For Level: " + depth);

    const s = this.get("STUFF")!;
    const armor = Item.random(game.level!, "armor");
    const melee = Item.random(game.level!, "melee");
    const ranged = Item.random(game.level!, "ranged");
    let text: string[] = [];
    if (armor) {
      text.push(armor.name);
    }
    if (melee) {
      text.push(melee.name);
    }
    if (ranged) {
      text.push(ranged.name);
    }
    s.text("Stuff for level: " + text.join(", "));
  },
};
