import * as GWU from "gw-utils";
import { ItemKind, ItemMakeOpts } from "./kind";
import { Obj } from "../game/obj";

export class Item extends Obj {
  _turnTime = 0;
  kind: ItemKind;
  data: Record<string, any>;
  _power: number;
  _damage: number;
  _comboDamage: number;
  _defense: number;

  constructor(kind: ItemKind) {
    super();
    this.kind = kind;
    if (!this.kind) throw new Error("Must have kind.");

    this.data = {};
    this._damage = this.kind.damage;
    this._comboDamage = this.kind.combo_damage;
    this._defense = this.kind.defense;

    Object.entries(this.kind.on).forEach(([key, value]) => {
      if (!value) return;
      this.on(key, value);
    });

    this.power = 1; // cause calculations to fire
  }

  // create(opts: ItemCreateOpts) {
  //   this._create(opts);
  //   this.emit("create", this, opts);
  // }

  _make(opts: ItemMakeOpts) {
    super._make(opts);

    // install emit handlers for ItemEvents
    Object.entries(opts).forEach(([key, val]) => {
      if (typeof val === "function") {
        this.on(key, val);
      }
    });

    this.power = opts.power || this.power;
  }

  draw(buf: GWU.buffer.Buffer) {
    buf.drawSprite(this.x, this.y, this.kind);
  }

  get name(): string {
    return this.kind.name;
  }

  get power(): number {
    return this._power;
  }

  set power(val: number) {
    val = val || 1;
    this._power = val;

    // Value = POWER * BASE * Math.pow(1.025,POWER)
    this._damage = Math.round(this.kind.damage * (1 + (this._power - 1) / 2));
    this._comboDamage = Math.round(
      this.kind.combo_damage * (1 + (this._power - 1) / 2)
    );
    this._defense = Math.round(this.kind.defense * (1 + (this._power - 1) / 2));
  }

  get damage(): number {
    return this._damage;
  }

  get comboDamage(): number {
    return this._comboDamage;
  }

  get range(): number {
    return this.kind.range;
  }

  get speed(): number {
    return this.kind.speed;
  }

  get comboSpeed(): number {
    return this.kind.combo_speed;
  }

  get combo(): number {
    return this.kind.combo;
  }

  get defense(): number {
    return this._defense;
  }

  get slot(): string | null {
    return this.kind.slot;
  }

  get charge(): number {
    return this.kind.charge;
  }
}
