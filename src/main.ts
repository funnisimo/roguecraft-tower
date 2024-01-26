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
import "./enchants";
import "./game/app";

function start() {
  // create the user interface
  const opts: GWU.app.AppOpts = {
    name: "Roguecraft: Tower",
    width: 90,
    height: 45,
    div: "game",
    scenes: {
      title: SCENES.title,
      level: SCENES.level,
      win: SCENES.win,
      lose: SCENES.lose,
      help: SCENES.help,
      reward: SCENES.reward,
    },
    start: "title",
    plugins: [],
  };

  // @ts-ignore
  globalThis.APP = GWU.app.make(opts);
}

globalThis.onload = start;

// @ts-ignore
globalThis.GWU = GWU;
