import * as GWU from "gw-utils";

import * as ACTIONS from "../game/actions";
import { Game } from "../game/game";
import { Actor } from "./actor";

export function ai(game: Game, actor: Actor) {
  const player = game.player;
  const noticeDistance = actor.kind.notice || 10;

  const distToPlayer = GWU.xy.distanceBetween(
    player.x,
    player.y,
    actor.x,
    actor.y
  );

  console.log(
    `Actor.AI - ${actor.kind.id}@${actor.x},${actor.y} - dist=${distToPlayer}`
  );

  if (distToPlayer > noticeDistance) {
    // wander somewhere?  [wanderChance]
    // step randomly [idleMoveChance]
    if (game.rng.chance(20)) {
      if (ACTIONS.moveRandom(game, actor, true)) return;
    }
    return ACTIONS.idle(game, actor);
  } else if (distToPlayer <= actor.kind.tooClose) {
    // should there be a random chance on this?
    if (ACTIONS.moveAwayFromPlayer(game, actor)) return;
  }

  // shoot at player?
  if (actor.kind.rangedDamage && distToPlayer <= actor.kind.range) {
    if (ACTIONS.fireAtPlayer(game, actor)) return;
  }

  if (distToPlayer < 2) {
    // can attack diagonal
    if (actor.damage > 0) {
      if (ACTIONS.attack(game, actor, player)) return;
    }
    if (distToPlayer == 1) {
      return ACTIONS.idle(game, actor);
    }
  }

  if (!actor.kind.tooClose) {
    if (ACTIONS.moveTowardPlayer(game, actor)) return;
  }
  return ACTIONS.idle(game, actor);
}
