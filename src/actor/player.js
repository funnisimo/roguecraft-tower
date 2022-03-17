import * as ACTOR from "./actor.js";

export class Player extends ACTOR.Actor {
  constructor(cfg) {
    super(cfg);
    this.path = null;
  }

  act(game) {
    this.startTurn(game);

    if (this.path && this.path.length) {
    }
    this.path = null;

    game.needInput = true;
    console.log("Player - await input");
  }

  setPath(path) {
    if (!this._level) return;
    this._level.setPath(path);
    this.path = path;
  }

  clearPath() {
    if (!this._level) return;
    this._level.clearPath();
    this.path = null;
  }
}

export function makePlayer(id) {
  const kind = ACTOR.kinds[id.toLowerCase()];
  if (!kind) throw new Error("Failed to find actor kind - " + id);

  return new Player({
    x: 1,
    y: 1,
    depth: 1, // items, actors, player, fx
    kind,
    health: kind.health || 10,
    damage: kind.damage || 2,
  });
}
