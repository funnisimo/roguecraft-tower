import * as ACTOR from "../actor/actors.js";

export function make(seed = 0) {
  return {
    player: ACTOR.Player,
    map: null,
    scene: null,
    level: 1,
    seed,
  };
}
