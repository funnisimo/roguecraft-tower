import "./lib/gw-utils.js";
import { titleScene } from "./src/title.js";
import { levelScene } from "./src/level.js";
import { winScene } from "./src/win.js";
import { loseScene } from "./src/lose.js";
import { stuffScene } from "./src/stuff.js";
import { helpScene } from "./src/help.js";

function start() {
  // create the user interface

  window.APP = GWU.app.make({
    width: 80,
    height: 45,
    div: "game",
    scenes: {
      title: titleScene,
      level: levelScene,
      stuff: stuffScene,
      win: winScene,
      lose: loseScene,
      help: helpScene,
    },
  });
}

window.onload = start;

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
