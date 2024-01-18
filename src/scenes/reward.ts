import * as GWU from "gw-utils";
import { Game } from "../game/game";
import * as Item from "../item";
import { Player } from "../actor";

export const reward = {
  create(this: GWU.app.Scene) {
    this.bg = GWU.color.from("dark_gray");
    const build = new GWU.widget.Builder(this);
    build.pos(5, 3).text("{Roguecraft}", { fg: "yellow" });
    build
      .pos(5, 5)
      .text("Choose your reward \nfor Level: {}", { fg: "pink", id: "LEVEL" });
    const list = build
      .pos(5, 8)
      .datalist({ empty: "-", border: "ascii", id: "STUFF", width: 20 });
    //.text("REWARD", { fg: "green", id: "STUFF" });

    build
      .pos(5, 40)
      .text("Press <Enter> to choose your reward and go to the next level.");

    build.pos(30, 5).text("Armor", { id: "ARMOR", fg: "white" });
    build.pos(30, 16).text("Melee", { id: "MELEE", fg: "white" });
    build.pos(30, 27).text("Ranged", { id: "RANGED", fg: "white" });

    // this.on("Enter", () => {
    //   this.app.scenes.start("level", this.data.game);
    // });
    list.on("change", (e) => {
      const items = this.data.items as (Item.Item | null)[];
      if (!this.data.equipped) return;

      const used = [
        null,
        this.data.equipped.armor,
        this.data.equipped.melee,
        this.data.equipped.ranged,
      ];
      if (items) {
        const item = items[e.row];
        if (item) {
          used[e.row] = item;
        }
      }
      // update display
      const game = this.data.game as Game;
      const a_text = this.get("ARMOR");
      const a_color = e.row == 1 ? "teal" : "white";
      a_text.text(
        `ARMOR:\n#{${a_color}}` + armor_text(used[1], game.player.kind.health)
      );

      const m_text = this.get("MELEE");
      const m_color = e.row == 2 ? "teal" : "white";
      m_text.text(`MELEE:\n#{${m_color}}` + melee_text(used[2]));

      const r_text = this.get("RANGED");
      const r_color = e.row == 3 ? "teal" : "white";
      r_text.text(`RANGED:\n#{${r_color}}` + ranged_text(used[3]));
    });
    list.on("action", () => {
      const items = this.data.items as (Item.Item | null)[];
      const item = items[list.selectedRow];
      if (item) {
        console.log("list selection - " + item.name);
        const game = this.data.game as Game;
        const player = game.player;
        player.equip(item);
        game.addMessage(`You equip a ${item.name}`);
      }
      this.app.scenes.start("level", this.data.game);
    });
  },
  start(this: GWU.app.Scene, game: Game) {
    const depth = game.level!.depth;

    const w = this.get("LEVEL")!;
    w.text("Choose your \nreward for Level: " + depth);

    const s = this.get("STUFF")! as GWU.widget.DataList;

    const armor = Item.random(game.level!, "armor");
    const melee = Item.random(game.level!, "melee");
    const ranged = Item.random(game.level!, "ranged");

    armor.power = depth + game.rng.dice(1, 5);
    melee.power = depth + game.rng.dice(1, 5);
    ranged.power = depth + game.rng.dice(1, 5);

    const player = game.player;
    const equipped = Object.entries(player.slots).reduce((o, current) => {
      o[current[0]] = current[1];
      return o;
    }, {});

    this.data = { game, items: [null, armor, melee, ranged], equipped };

    s.data(["None", armor.name, melee.name, ranged.name]); // triggers - change
  },
};

function armor_text(armor: Item.Item, health: number = 10): string {
  let text = armor.name + " [" + armor.power + "]\n";
  const defense = armor.defense + health;
  text += "  Health: " + defense + "\n";

  if (armor.kind.armor_flags != 0) {
    if (armor.kind.armor_flags & Item.ARMOR_FLAGS.REDUCE_DAMAGE_35) {
      text += "  {-35% Damage Received}\n";
    }
    if (armor.kind.armor_flags & Item.ARMOR_FLAGS.NEGATE_HITS_30) {
      text += "  {30% Negate Hits}\n";
    }
    if (armor.kind.armor_flags & Item.ARMOR_FLAGS.ARTIFACT_COOLDOWN_40) {
      text += "  {-40% Artifact Cooldown}\n";
    }
    if (armor.kind.armor_flags & Item.ARMOR_FLAGS.ARROWS_10) {
      text += "  {+10 Arrows Per Bundle}\n";
    }
    if (armor.kind.armor_flags & Item.ARMOR_FLAGS.LONGER_ROLL_100) {
      text += "  {100% Longer Roll Cooldown}\n";
    }
    if (armor.kind.armor_flags & Item.ARMOR_FLAGS.MELEE_DAMAGE_30) {
      text += "  {+30% Melee Damage}\n";
    }
    if (armor.kind.armor_flags & Item.ARMOR_FLAGS.MOBS_TARGET_YOU_MORE) {
      text += "  {Mobs Target You More}\n";
    }
    if (armor.kind.armor_flags & Item.ARMOR_FLAGS.MOVESPEED_AURA_15) {
      text += "  {+15% Move Speed Aura}\n";
    }
    if (armor.kind.armor_flags & Item.ARMOR_FLAGS.POTION_COOLDOWN_40) {
      text += "  {-40% Potion Cooldown}\n";
    }
    if (armor.kind.armor_flags & Item.ARMOR_FLAGS.POTION_BOOSTS_DEFENSE) {
      text += "  {Potion Boosts Defense}\n";
    }
    if (armor.kind.armor_flags & Item.ARMOR_FLAGS.POTION_HEALS_NEARBY_ALLIES) {
      text += "  {Potion Heals Nearby Allies}\n";
    }
    if (armor.kind.armor_flags & Item.ARMOR_FLAGS.RANGED_DAMAGE_30) {
      text += "  {+30% Ranged Damage}\n";
    }
    if (armor.kind.armor_flags & Item.ARMOR_FLAGS.WEAPON_DAMAGE_AURA_20) {
      text += "  {+20% Weapon Damage Aura}\n";
    }
  }

  return text;
}

function melee_text(melee: Item.Item): string {
  let text = melee.name + " [" + melee.power + "]\n";
  text += "  Attack: " + melee.damage + " / " + melee.speed + "\n";
  text +=
    "  Combo : " +
    melee.comboDamage +
    " / " +
    melee.comboSpeed +
    " % " +
    melee.combo +
    "\n";

  if (melee.kind.melee_flags != 0) {
    // if (melee.kind.armor_flags & Item.ARMOR_FLAGS.REDUCE_DAMAGE_35) {
    //   text += "  {-35% Damage Received}\n";
    // }
  }

  return text;
}

function ranged_text(ranged: Item.Item): string {
  let text = ranged.name + " [" + ranged.power + "]\n";
  text +=
    "  Attack: " +
    ranged.damage +
    " / " +
    ranged.speed +
    " @ " +
    ranged.range +
    "\n";
  if (ranged.charge > 0) {
    text += "  Charge: " + ranged.charge + "\n";
  }

  if (ranged.kind.ranged_flags != 0) {
    // if (melee.kind.armor_flags & Item.ARMOR_FLAGS.REDUCE_DAMAGE_35) {
    //   text += "  {-35% Damage Received}\n";
    // }
  }

  return text;
}
