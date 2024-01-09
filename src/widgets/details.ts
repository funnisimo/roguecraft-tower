import * as GWU from "gw-utils";

import { Actor } from "../actor/actor";
import { Player } from "../actor/player";
import { FLAGS as ItemFlags } from "../item";

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
    text += "Health: " + actor.health + "/" + actor.health_max + "\n";
    text += "Moves : " + actor.moveSpeed + "\n";

    if (actor.damage.length > 0) {
      text += "Melee : damage=" + actor.damage + "\n";
      text += "        speed =" + actor.attackSpeed + "\n";
    } else {
      text += "Melee : None\n";
    }
    if (actor.range > 0) {
      text += "Ranged: damage=" + actor.rangedDamage + "\n";
      text += "      : speed =" + actor.rangedAttackSpeed + "\n";
      text += "      : range =" + actor.range + "\n";
      text += "      : ammo=" + actor.ammo + "\n";
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
      text += "Health: " + player.health + "/" + player.health_max + "\n";
      text += "#{teal}";
      text += "  " + armor.name + " [" + armor.power + "]\n";

      if (armor.kind.flags != 0) {
        if (armor.kind.flags & ItemFlags.REDUCE_DAMAGE_35) {
          text += "  {-35% Damage Received}\n";
        }
        if (armor.kind.flags & ItemFlags.NEGATE_HITS_30) {
          text += "  {30% Negate Hits}\n";
        }
        if (armor.kind.flags & ItemFlags.ARTIFACT_COOLDOWN_40) {
          text += "  {-40% Artifact Cooldown}\n";
        }
        if (armor.kind.flags & ItemFlags.ARROWS_10) {
          text += "  {+10 Arrows Per Bundle}\n";
        }
        if (armor.kind.flags & ItemFlags.LONGER_ROLL_100) {
          text += "  {100% Longer Roll Cooldown}\n";
        }
        if (armor.kind.flags & ItemFlags.MELEE_DAMAGE_30) {
          text += "  {+30% Melee Damage}\n";
        }
        if (armor.kind.flags & ItemFlags.MOBS_TARGET_YOU_MORE) {
          text += "  {Mobs Target You More}\n";
        }
        if (armor.kind.flags & ItemFlags.MOVESPEED_AURA_15) {
          text += "  {+15% Move Speed Aura}\n";
        }
        if (armor.kind.flags & ItemFlags.POTION_COOLDOWN_40) {
          text += "  {-40% Potion Cooldown}\n";
        }
        if (armor.kind.flags & ItemFlags.POTION_BOOSTS_DEFENSE) {
          text += "  {Potion Boosts Defense}\n";
        }
        if (armor.kind.flags & ItemFlags.POTION_HEALS_NEARBY_ALLIES) {
          text += "  {Potion Heals Nearby Allies}\n";
        }
        if (armor.kind.flags & ItemFlags.RANGED_DAMAGE_30) {
          text += "  {+30% Ranged Damage}\n";
        }
        if (armor.kind.flags & ItemFlags.WEAPON_DAMAGE_AURA_20) {
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
      text += "Melee : " + melee.name + " [" + melee.power + "]\n";
      text += "      : damage=" + player.damage + "\n";
      text += "      : speed =" + player.attackSpeed + "\n";
    } else if (player.damage.length > 0) {
      text += "Melee : damage=" + player.damage + "\n";
      text += "        speed =" + player.attackSpeed + "\n";
    } else {
      text += "Melee : None\n";
    }

    const ranged = player.slots.ranged;
    if (ranged) {
      text += "Ranged: " + ranged.name + " [" + ranged.power + "]\n";
      text += "      : damage=" + player.rangedDamage + "\n";
      text += "      : range =" + player.range + "\n";
      text += "      : speed =" + player.rangedAttackSpeed + "\n";
      text += "      : ammo  =" + player.ammo + "\n";
    } else if (player.range > 0) {
      text += "Ranged: damage=" + player.rangedDamage + "\n";
      text += "      : speed =" + player.rangedAttackSpeed + "\n";
      text += "      : range =" + player.range + "\n";
      text += "      : ammo  =" + player.ammo + "\n";
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
