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
    let text = actor.kind.id + "\n";
    text += "Health: " + actor.health + "/" + actor.kind.health + "\n";
    text += "Moves : " + actor.kind.moveSpeed + "\n";

    if (actor.kind.damage > 0) {
      // TODO - Add Hero weapons
      text += "Melee : damage=" + actor.damage + "\n";
      text += "        speed =" + actor.kind.attackSpeed + "\n";
    } else {
      text += "Melee : None\n";
    }
    if (actor.kind.range > 0) {
      // TODO - Add Hero weapons
      // TODO - Add Ammo
      text +=
        "Ranged: damage=" +
        actor.kind.rangedDamage +
        "\n" +
        "      : speed =" +
        actor.kind.rangedAttackSpeed +
        "\n" +
        "      : range =" +
        actor.kind.range +
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
    this.showActor(player);
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
