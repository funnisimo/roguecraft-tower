export enum ArmorBonus {
  NO,
  LIMITED,
  YES,
}

export interface ComputedAdjustment {
  armor?: number;
  to_armor?: number;
  to_hit?: number;
  to_damage?: number;
  armor_bonus?: ArmorBonus;
  critical_injury?: boolean;
}

export interface NamedComputedAdjustment extends ComputedAdjustment {
  slot: string;
}

export class ComputedValues {
  slots: { [id: string]: ComputedAdjustment } = {};
  _baseArmor = 0;

  armor = 0;
  to_armor = 0;
  to_hit = 0;
  to_damage = 0;
  armor_bonus = ArmorBonus.YES;
  critical_injury = true;

  constructor(baseArmor = 0) {
    this._baseArmor = baseArmor;
    this.armor = baseArmor;
  }

  set baseArmor(value: number) {
    this._baseArmor = value;
    this.recalculate();
  }

  adjust(adj: NamedComputedAdjustment): void;
  adjust(name: string, adj: ComputedAdjustment): void;
  adjust(...args: any[]): void {
    let name: string;
    let info: ComputedAdjustment = args[0];

    if (args.length == 2) {
      info = args[1];
      name = args[0];
    } else {
      name = args[0].slot;
    }

    this.slots[name] = info;
    this.recalculate();
  }

  clearAdjustment(slot: string | { slot: string }) {
    if (typeof slot !== "string") slot = slot.slot;
    delete this.slots[slot];
    this.recalculate();
  }

  recalculate() {
    this.armor = this._baseArmor;
    this.to_armor = 0;
    this.to_hit = 0;
    this.to_damage = 0;
    this.armor_bonus = ArmorBonus.YES;
    this.critical_injury = true;

    for (let slot in this.slots) {
      let info = this.slots[slot];

      this.armor += info.armor || 0;
      this.to_armor += info.to_armor || 0;

      if (slot != "wield" && slot != "arm") {
        this.to_hit += info.to_hit || 0;
        this.to_damage += info.to_damage || 0;
      }

      if (info.critical_injury === false) {
        this.critical_injury = false;
      }

      if (info.armor_bonus !== undefined) {
        // YES > LIMITED > NO (so YES has highest priority and if you take away access that has priority)
        this.armor_bonus = Math.min(info.armor_bonus, this.armor_bonus);
      }
    }
  }
}
