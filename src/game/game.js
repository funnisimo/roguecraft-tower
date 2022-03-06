import * as ACTOR from "../actor/actors.js";

export function make(seed = 0) {
  const player = ACTOR.make("player");
  return {
    player,
    map: null,
    scene: null,
    level: 1,
    seed,
    actors: [player],
  };
}
