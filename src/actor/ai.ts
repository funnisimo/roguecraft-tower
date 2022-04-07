import * as GWU from "gw-utils";

import * as ACTIONS from "../game/actions";
import { Game } from "../game/game";
import { Actor } from "./actor";

export function ai(game: Game, actor: Actor) {
  console.log("Actor.AI", actor.kind.id, actor.x, actor.y, game.scheduler.time);

  const player = game.player;
  const noticeDistance = actor.kind.notice || 10;

  const distToPlayer = GWU.xy.distanceBetween(
    player.x,
    player.y,
    actor.x,
    actor.y
  );
  if (distToPlayer > noticeDistance) {
    // wander somewhere?  [wanderChance]
    // step randomly [idleMoveChance]
    if (game.rng.chance(20)) {
      if (ACTIONS.moveRandom(game, actor, true)) return;
    }
    return ACTIONS.idle(game, actor);
  }

  if (distToPlayer < 2) {
    // can attack diagonal
    if (ACTIONS.attack(game, actor, player)) return;
  }

  return ACTIONS.moveTowardPlayer(game, actor);
}
