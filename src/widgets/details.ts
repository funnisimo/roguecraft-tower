import * as GWU from "gw-utils";

import { Actor } from "../actor/actor";
import { Player } from "../actor/player";

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
      text +=
        "Ranged: damage=" +
        actor.rangedDamage +
        "\n" +
        "      : speed =" +
        actor.rangedAttackSpeed +
        "\n" +
        "      : range =" +
        actor.range +
        "\n" +
        "      : ammo=" +
        actor.ammo +
        "\n";
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
      text += "Health: " + armor.name + "^" + armor.power + "\n";
      text += "      : " + player.health + "/" + player.health_max + "\n";
    } else {
      text += "Health: " + player.health + "/" + player.health_max + "\n";
    }
    text += "Moves : " + player.moveSpeed + "\n";

    const melee = player.slots.melee;
    if (melee) {
      text += "Melee : " + melee.name + "^" + melee.power + "\n";
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
      text += "Ranged: " + ranged.name + "^" + ranged.power + "\n";
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
