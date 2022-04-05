import * as GWU from "gw-utils";

import * as ACTOR from "./actor";
import * as KIND from "./kind";
import * as ACTION from "../game/actions";
// import { Level } from "../game/level";
import { Game } from "../game/game";

export class Player extends ACTOR.Actor {
  goalMap: GWU.grid.NumGrid | null;
  mapToMe: GWU.grid.NumGrid | null;
  goToGoal: boolean;

  constructor(cfg: ACTOR.ActorConfig) {
    super(cfg);
    this.goalMap = null;
    this.mapToMe = null;
    this.goToGoal = false;

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

    if (this.goalMap && this.goToGoal) {
      const step = GWU.path.nextStep(
        this.goalMap,
        this.x,
        this.y,
        (x, y) => {
          if (this._level!.actorAt(x, y)) return true;
          return false;
        },
        true
      );
      if (step) {
        if (ACTION.moveDir(game, this, step, false)) {
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
    if (!this._level || this.goToGoal) return;

    if (!this.goalMap) {
      this.goalMap = GWU.grid.alloc(this._level.width, this._level.height);
    }
    GWU.path.calculateDistances(
      this.goalMap,
      x,
      y,
      (x, y) => this.moveCost(x, y),
      true
    );
  }

  clearGoal() {
    if (this.goalMap) {
      GWU.grid.free(this.goalMap);
      this.goalMap = null;
    }
    this.goToGoal = false;
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
