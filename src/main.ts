import * as GWU from "gw-utils";

import * as SCENES from "./scenes/index";

function start() {
  // create the user interface

  // @ts-ignore
  window.APP = GWU.app.make({
    width: 90,
    height: 45,
    div: "game",
    scenes: {
      title: SCENES.title,
      level: SCENES.level,
      win: SCENES.win,
      lose: SCENES.lose,
      help: SCENES.help,
      stuff: SCENES.stuff,
    },
    start: "title",
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
