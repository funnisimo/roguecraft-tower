import "../../lib/gw-utils.js";
import * as ACTIONS from "../game/actions.js";

export function ai(game, actor) {
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
    // milling around [ move randomly? ]
    game.endTurn(actor, actor.kind.moveSpeed);
  } else if (distToPlayer <= 1) {
    ACTIONS.attack(game, actor, player);
  } else {
    ACTIONS.moveToward(game, actor, player);
  }
}
