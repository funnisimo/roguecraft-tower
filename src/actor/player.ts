import * as GWU from "gw-utils";

import * as ACTOR from "./actor";
import * as KIND from "./kind";
import * as ACTION from "../game/actions";
import { Level } from "../game/level";
import { Game } from "../game/game";

export class Player extends ACTOR.Actor {
  mapToMe: GWU.grid.NumGrid | null;
  fov: GWU.grid.NumGrid | null;

  goalPath: GWU.xy.Loc[] | null;
  followPath: boolean;

  constructor(cfg: ACTOR.ActorConfig) {
    super(cfg);
    this.mapToMe = null;
    this.fov = null;
    this.goalPath = null;
    this.followPath = false;

    this.on("add", (level: Level) => {
      this._level = level;
      this.updateMapToMe();
      this.updateFov();
      level.game!.scene!.needsDraw = true;
    });
    this.on("move", () => {
      this.updateMapToMe();
      this.updateFov();
    });
    this.on("remove", () => {
      if (this.mapToMe) {
        GWU.grid.free(this.mapToMe);
        this.mapToMe = null;
      }
      if (this.fov) {
        GWU.grid.free(this.fov);
        this.fov = null;
      }
      this.clearGoal();
    });
  }

  act(game: Game) {
    this.startTurn(game);

    if (this.goalPath && this.followPath && this.goalPath.length) {
      const step = this.goalPath[0];
      if (step) {
        if (game.level!.hasActor(step[0], step[1])) {
          game.addMessage("You are blocked.");
        } else {
          const dir = GWU.xy.dirFromTo(this, step);
          if (ACTION.moveDir(game, this, dir, true)) {
            if (GWU.xy.equals(this, step)) {
              this.goalPath.shift(); // we moved there, so remove that step
            } else {
              this.clearGoal();
            }
            return;
          }
          game.addMessage("You lost track of path.");
        }
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
    const level = this._level;
    if (!level) return;

    if (
      !this.mapToMe ||
      this.mapToMe.width !== level.width ||
      this.mapToMe.height !== level.height
    ) {
      this.mapToMe && GWU.grid.free(this.mapToMe);
      this.mapToMe = GWU.grid.alloc(level.width, level.height);
    }
    GWU.path.calculateDistances(
      this.mapToMe,
      this.x,
      this.y,
      (x, y) => this.moveCost(x, y),
      true
    );
  }

  updateFov() {
    const level = this._level;
    if (!level) return;

    if (
      !this.fov ||
      this.fov.width !== level.width ||
      this.fov.height !== level.height
    ) {
      this.fov && GWU.grid.free(this.fov);
      this.fov = GWU.grid.alloc(level.width, level.height);
    }

    GWU.fov.calculate(
      this.fov,
      (x, y) => {
        return this.moveCost(x, y) < 0;
      },
      this.x,
      this.y,
      100
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
