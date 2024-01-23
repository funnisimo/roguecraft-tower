import * as GWU from "gw-utils";
import * as SCENES from "./scenes/index";
import "./tile";
import "./actors";
import "./hordes";
import "./items";
import "./melee";
import "./armor";
import "./ranged";
import "./plugins";
import * as GAME from "./game";

function start() {
  // create the user interface

  // @ts-ignore
  globalThis.APP = GAME.make({
    name: "Roguecraft: Tower",
    console: [90, 45],
    div: "game",
    scenes: {
      title: SCENES.title,
      level: SCENES.level,
      win: SCENES.win,
      lose: SCENES.lose,
      help: SCENES.help,
      reward: SCENES.reward,
    },
    start_scene: "title",
  });
}

globalThis.onload = start;

// @ts-ignore
globalThis.GWU = GWU;

// async function playGame(game) {
//   // create and dig the map

//   return game.start();
// }

// async function showGameOver(game, success) {
//   const layer = new GWU.ui.Layer(game.ui);

//   const buffer = layer.buffer;

//   buffer.fill(0);
//   buffer.drawText(0, 20, "GAME OVER", "yellow", -1, 80, "center");

//   if (success) {
//     buffer.drawText(0, 25, "WINNER!", "green", -1, 80, "center");
//   } else {
//     buffer.drawText(0, 25, "Try Again!", "red", -1, 80, "center");
//   }

//   buffer.drawText(
//     0,
//     30,
//     "[Press any key to start over]",
//     "gray",
//     -1,
//     80,
//     "center"
//   );
//   buffer.render();

//   await layer.io.nextKeyOrClick();

//   layer.finish();
// }
