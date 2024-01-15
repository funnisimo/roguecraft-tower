import * as GWU from "gw-utils";

import { Actor } from "../actor/actor";
import { Player } from "../actor/player";
import { ARMOR_FLAGS } from "../item";

export class Details extends GWU.widget.Dialog {
  _text: GWU.widget.Text;

  constructor(opts: GWU.widget.DialogOptions) {
    opts.border = opts.border ?? "ascii";
    super(opts);

    this._text = new GWU.widget.Text({
      id: "INFO",
      text: "details...",
      x: this.bounds.x + 1,
      y: this.bounds.y + 1,
    });
    this.addChild(this._text);

    this.hidden = true;
  }

  showActor(actor: Actor) {
    let text = actor.name + "\n";
    text += "Health: " + actor.health + " / " + actor.health_max + "\n";
    text += "Moves : " + actor.moveSpeed + "\n";

    if (actor.damage.length > 0) {
      text += "Melee : " + actor.damage + " / " + actor.attackSpeed + "\n";
    } else {
      text += "Melee : None\n";
    }
    if (actor.range > 0) {
      text +=
        "Ranged: " +
        actor.rangedDamage +
        " / " +
        actor.rangedAttackSpeed +
        " @ " +
        actor.range +
        " [" +
        actor.ammo +
        "]\n";
    } else {
      text += "Ranged: None";
    }

    this._text.text(text);

    this.bounds.height = this._text.bounds.height + 2;
    this.bounds.width = this._text.bounds.width + 2;
  }

  showPlayer(player: Player) {
    let text = player.name + "\n";
    const armor = player.slots.armor;
    if (armor) {
      text += "Health: " + player.health + " / " + player.health_max + "\n";
      text += "#{teal}";
      text += "  " + armor.name + " [" + armor.power + "]\n";

      if (armor.kind.flags != 0) {
        if (armor.kind.flags & ARMOR_FLAGS.REDUCE_DAMAGE_35) {
          text += "  {-35% Damage Received}\n";
        }
        if (armor.kind.flags & ARMOR_FLAGS.NEGATE_HITS_30) {
          text += "  {30% Negate Hits}\n";
        }
        if (armor.kind.flags & ARMOR_FLAGS.ARTIFACT_COOLDOWN_40) {
          text += "  {-40% Artifact Cooldown}\n";
        }
        if (armor.kind.flags & ARMOR_FLAGS.ARROWS_10) {
          text += "  {+10 Arrows Per Bundle}\n";
        }
        if (armor.kind.flags & ARMOR_FLAGS.LONGER_ROLL_100) {
          text += "  {100% Longer Roll Cooldown}\n";
        }
        if (armor.kind.flags & ARMOR_FLAGS.MELEE_DAMAGE_30) {
          text += "  {+30% Melee Damage}\n";
        }
        if (armor.kind.flags & ARMOR_FLAGS.MOBS_TARGET_YOU_MORE) {
          text += "  {Mobs Target You More}\n";
        }
        if (armor.kind.flags & ARMOR_FLAGS.MOVESPEED_AURA_15) {
          text += "  {+15% Move Speed Aura}\n";
        }
        if (armor.kind.flags & ARMOR_FLAGS.POTION_COOLDOWN_40) {
          text += "  {-40% Potion Cooldown}\n";
        }
        if (armor.kind.flags & ARMOR_FLAGS.POTION_BOOSTS_DEFENSE) {
          text += "  {Potion Boosts Defense}\n";
        }
        if (armor.kind.flags & ARMOR_FLAGS.POTION_HEALS_NEARBY_ALLIES) {
          text += "  {Potion Heals Nearby Allies}\n";
        }
        if (armor.kind.flags & ARMOR_FLAGS.RANGED_DAMAGE_30) {
          text += "  {+30% Ranged Damage}\n";
        }
        if (armor.kind.flags & ARMOR_FLAGS.WEAPON_DAMAGE_AURA_20) {
          text += "  {+20% Weapon Damage Aura}\n";
        }
      }
      text += "#{}";
    } else {
      text += "Health: " + player.health + "/" + player.health_max + "\n";
    }
    text += "Moves : " + player.moveSpeed + "\n";

    const melee = player.slots.melee;
    if (melee) {
      text += "Melee : " + player.damage + " / " + player.attackSpeed + "\n";
      text += "#{teal}";
      text += `  ${melee.name} [${melee.power}]\n`;
      text += "#{}";
    } else if (player.damage.length > 0) {
      text += "Melee : " + player.damage + " / " + player.attackSpeed + "\n";
    } else {
      text += "Melee : None\n";
    }

    const ranged = player.slots.ranged;
    if (ranged) {
      text +=
        "Ranged: " +
        player.rangedDamage +
        " / " +
        player.rangedAttackSpeed +
        " @ " +
        player.range +
        " [" +
        player.ammo +
        "]\n";
      text += "#{teal}";
      text += "  " + ranged.name + " [" + ranged.power + "]\n";
    } else if (player.range > 0) {
      text +=
        "Ranged: " +
        player.rangedDamage +
        "  " +
        player.rangedAttackSpeed +
        " @ " +
        player.range +
        " [" +
        player.ammo +
        "]\n";
    } else {
      text += "Ranged: None";
    }

    this._text.text(text);

    this.bounds.height = this._text.bounds.height + 2;
    this.bounds.width = this._text.bounds.width + 2;
  }
}

export function details(
  scene: GWU.app.Scene,
  width: number,
  height: number
): Details {
  const widget = new Details({
    id: "DETAILS",
    tag: "details",

    x: 2,
    y: 2,
    width: width - 4,
    height: height - 4,

    scene,
    bg: GWU.color.from("dark_gray"),
  });

  return widget;
}
