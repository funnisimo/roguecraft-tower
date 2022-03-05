import "../lib/gw-utils.js";

export const stuffScene = {
  create() {
    this.bg = "dark_gray";
    const build = new GWU.widget.Builder(this);
    build.pos(10, 15).text("{Roguecraft}", { fg: "yellow" });
    build.pos(10, 17).text("STUFF", { fg: "green" });

    build.pos(10, 22).text("For Level: {}", { fg: "pink", id: "LEVEL" });

    build.pos(10, 30).text("Press any key to goto next level.");

    this.on("keypress", () => {
      this.app.scenes.start("level", { id: this.data.id + 1 });
    });
  },
  start(data = {}) {
    const id = data.id || 1;
    this.data.id = id;
    const w = this.get("LEVEL");
    w.text("For Level: " + id);
  },
};
