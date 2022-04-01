import * as GWU from "gw-utils";

export const help = {
  create() {
    this.bg = "dark_gray";
    const build = new GWU.widget.Builder(this);
    build.pos(10, 15).text("{Roguecraft}", { fg: "yellow" });
    build.pos(10, 17).text("HELP!", { fg: "green" });

    build.pos(10, 30).text("Press any key to return to title.");

    this.on("keypress", () => {
      this.app.scenes.start("title");
    });
  },
};
