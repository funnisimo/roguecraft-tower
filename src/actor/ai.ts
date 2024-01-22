import * as GWU from "gw-utils";

import * as ACTIONS from "../game/actions";
import { Game } from "../game/game";
import { Actor } from "./actor";

export function ai(game: Game, actor: Actor) {
  const hero = game.hero;
  const noticeDistance = actor.kind.notice || 10;

  const distToHero = GWU.xy.distanceBetween(hero.x, hero.y, actor.x, actor.y);
  const canSeeHero = hero.isInFov(actor);

  console.log(
    `Actor.AI - ${actor.kind.id}@${actor.x},${actor.y} - dist=${distToHero}, canSee=${canSeeHero}`
  );

  // TODO - If attacked by hero, then we need to ignore notice distance and move in to attack

  // TODO - Noticed prior to hero going out of range/view should skip this
  // Do this with a flag/mode/state/time value?
  if (distToHero > noticeDistance || !canSeeHero) {
    // wander to goal?  [wanderChance]
    // step randomly [idleMoveChance]
    // move around anchor? (e.g. guarding an area, hanging out by a campfire, ...)
    // random chance? [randomMoveChance]
    if (game.rng.chance(20)) {
      if (ACTIONS.moveRandom(game, actor, true)) return;
    }
    return ACTIONS.idle(game, actor);
  }

  if (distToHero <= actor.kind.tooClose) {
    // should there be a random chance on this?
    if (ACTIONS.moveAwayFromHero(game, actor)) return;
  }

  // shoot at player?
  if (actor.kind.rangedDamage && distToHero <= actor.kind.range) {
    if (ACTIONS.fireAtHero(game, actor)) return;
  }

  if (distToHero < 2) {
    // can attack diagonal
    if (actor.canMeleeAttack) {
      if (ACTIONS.attack(game, actor, hero)) return;
    }
    if (distToHero == 1) {
      // Hmmm...
      return ACTIONS.idle(game, actor);
    }
  }

  // If we don't have a min distance from hero then move closer (to get to melee range)
  if (!actor.kind.tooClose) {
    if (ACTIONS.moveTowardHero(game, actor)) return;
  }
  return ACTIONS.idle(game, actor);
}
