import * as GWU from "gw-utils";

import * as ACTOR from "./actor";
import * as KIND from "./kind";
import * as ACTION from "../game/actions";
// import { Level } from "../game/level";
import { Game } from "../game/game";

export class Player extends ACTOR.Actor {
  mapToMe: GWU.grid.NumGrid | null;

  goalPath: GWU.xy.Loc[] | null;
  followPath: boolean;

  constructor(cfg: ACTOR.ActorConfig) {
    super(cfg);
    this.mapToMe = null;
    this.goalPath = null;
    this.followPath = false;

    this.on("add", (game) => {
      const level = game.level;
      this.mapToMe = null;
    });
    this.on("move", () => {
      this.updateMapToMe();
    });
    this.on("remove", () => {
      this.mapToMe && GWU.grid.free(this.mapToMe);
      this.clearGoal();
    });
  }

  act(game: Game) {
    this.startTurn(game);

    if (this.goalPath && this.followPath && this.goalPath.length) {
      const step = this.goalPath[0];
      if (step) {
        const dir = GWU.xy.dirFromTo(this, step);
        if (ACTION.moveDir(game, this, dir, false)) {
          if (GWU.xy.equals(this, step)) {
            this.goalPath.shift(); // we moved there, so remove that step
          }
          return;
        }
        game.addMessage("You are blocked.");
      }
    }
    this.clearGoal();

    game.needInput = true;
    console.log("Player - await input", game.scheduler.time);
  }

  setGoal(x: number, y: number) {
    if (!this._level || this.followPath) return;

    this.goalPath = GWU.path.fromTo(this, [x, y], (i, j) =>
      this.moveCost(i, j)
    );
    if (
      this.goalPath &&
      this.goalPath.length &&
      GWU.xy.equals(this.goalPath[0], this)
    ) {
      this.goalPath.shift(); // remove the spot we are standing on
    }
  }

  clearGoal() {
    this.followPath = false;
    this.goalPath = null;
  }

  updateMapToMe() {
    if (
      !this.mapToMe ||
      this.mapToMe.width !== this._level!.width ||
      this.mapToMe.height !== this._level!.height
    ) {
      this.mapToMe && GWU.grid.free(this.mapToMe);
      this.mapToMe = GWU.grid.alloc(this._level!.width, this._level!.height);
    }
    GWU.path.calculateDistances(
      this.mapToMe,
      this.x,
      this.y,
      (x, y) => this.moveCost(x, y),
      true
    );
  }
}

export function makePlayer(id: string) {
  const kind = KIND.getKind(id);
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
