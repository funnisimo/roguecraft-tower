import { Actor } from "./actor";
import { Game } from "./game";
import * as ITEM from "./item";

ITEM.install({
  id: "HEALTH_POTION",
  ch: "!",
  fg: "pink",
  on: {
    pickup(this: ITEM.Item, game: Game, actor: Actor): boolean {
      // TODO - vary the messages
      // TODO - Different healing amounts?
      actor.health = actor.kind.health;
      game.addMessage("You drink the potion.");
      game.level!.removeItem(this);
      return true;
    },
  },
  tags: "DROP",
});

ITEM.install({
  id: "ARROWS",
  ch: "|",
  fg: "yellow",
  on: {
    pickup(this: ITEM.Item, game: Game, actor: Actor): boolean {
      //   actor.health = actor.kind.health;
      game.addMessage("You pickup some arrows.");
      game.level!.removeItem(this);
      // TODO - adjust for this.power?
      actor.ammo += 10;
      return true;
    },
  },
  tags: "DROP",
});
