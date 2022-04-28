import { Actor } from "./actor";
import { Game } from "./game";
import * as ITEM from "./item";

ITEM.install({
  id: "HEALTH_POTION",
  ch: "!",
  fg: "pink",
  on: {
    pickup(this: ITEM.Item, game: Game, actor: Actor): boolean {
      actor.health = actor.kind.health;
      game.addMessage("You drink the potion.");
      game.level!.removeItem(this);
      return true;
    },
  },
});
