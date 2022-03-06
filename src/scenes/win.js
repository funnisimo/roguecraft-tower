import "../../lib/gw-utils.js";

export const win = {
  create() {
    this.bg = "dark_gray";
    const build = new GWU.widget.Builder(this);
    build.pos(10, 15).text("{Roguecraft}", { fg: "yellow" });
    build.pos(10, 17).text("WIN!", { fg: "green" });

    build.pos(10, 22).text("Final Level: {}", { fg: "pink", id: "LEVEL" });

    build.pos(10, 30).text("Press any key to restart.");

    this.on("keypress", () => {
      this.app.scenes.start("title");
    });
  },
  start(data = {}) {
    const id = data.id || 1;
    const w = this.get("LEVEL");
    w.text("Final Level: " + id);
  },
};
