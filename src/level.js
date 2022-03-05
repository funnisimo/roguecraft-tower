import "../lib/gw-utils.js";
import CONFIG from "./config.js";

export const levelScene = {
  create() {
    this.bg = "dark_gray";
    const build = new GWU.widget.Builder(this);
    build.pos(10, 15).text("{Roguecraft}", { fg: "yellow" });
    build.pos(10, 17).text("LEVEL", { fg: "green" });

    build.pos(10, 30).text("Press Enter to win.");
    build.pos(10, 32).text("Press Escape to lose.");

    build.pos(10, 22).text("Level: {}", { fg: "pink", id: "LEVEL" });
    build.pos(10, 24).text("Seed: {}", { fg: "pink", id: "SEED" });

    this.on("keypress", (e) => {
      if (e.key == "Enter") {
        if (this.data.id === CONFIG.LAST_LEVEL) {
          this.app.scenes.start("win", this.data);
        } else {
          this.app.scenes.start("stuff", this.data);
        }
      }
      if (e.key == "Escape") {
        this.app.scenes.start("lose", this.data);
      }
    });
  },
  start(data = {}) {
    const id = data.id || 1;
    this.data.id = id;
    const w = this.get("LEVEL");
    w.text("Level: " + id);

    const seed = data.seed || 12345;
    const s = this.get("SEED");
    s.text("Seed: " + seed);
  },
};
