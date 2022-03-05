import "../lib/gw-utils.js";

export const titleScene = {
  create() {
    this.bg = "dark_gray";
    const build = new GWU.widget.Builder(this);
    build.pos(10, 15).text("{Roguecraft}", { fg: "yellow" });
    build.pos(10, 17).text("TOWER", { fg: "green" });

    build.pos(10, 30).text("Press any key to start.");
    build.pos(10, 32).text("Press s to enter seed.");
    build.pos(10, 34).text("Press h for help.");

    this.on("s", (e) => {
      const prompt = this.app.prompt("What is your starting seed?", {
        numbersOnly: true,
        bg: GWU.color.BLACK.alpha(50),
      });
      prompt.on("stop", (data) => {
        e.stopPropagation();
        if (data) {
          this.app.scenes.start("level", { seed: data, id: 1 });
        }
      });
      e.stopPropagation();
    });
    this.on("h", (e) => {
      this.app.scenes.start("help");
      e.stopPropagation();
    });
    this.on("keypress", () => {
      this.app.scenes.start("level", { id: 1 });
    });
  },
};

//   buffer.drawText(
//     0,
//     26,
//     "Use the #{green arrow keys} to move around.",
//     "white",
//     -1,
//     80,
//     "center"
//   );

//   buffer.drawText(
//     0,
//     28,
//     "Press #{green q} to quit.",
//     "white",
//     -1,
//     80,
//     "center"
//   );

//   buffer.drawText(0, 30, "[Press any key to begin]", "gray", -1, 80, "center");
