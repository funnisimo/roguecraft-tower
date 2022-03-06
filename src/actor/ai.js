export function ai(game, actor) {
  console.log("Actor.AI", actor.kind.id);
  game.endTurn(actor, actor.kind.moveSpeed);
}
