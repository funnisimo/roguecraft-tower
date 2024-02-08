import {
  AbilityTracker,
  type Adjustment,
  type AdjustmentOpt,
  type Bonuses,
  type NamedAdjustment,
  type Values,
} from "./abilities";

export interface AttributeConfig {
  names: string[];
  default: number;
  roll?: {
    dice?: string;
    minAverage?: number;
    maxAverage?: number;
  };
}

export const default_attributes: AttributeConfig = {
  names: ["str", "int", "dex", "wis", "con", "cha"],
  default: 10,
  roll: { dice: "3d6", minAverage: 12, maxAverage: 17 },
};

export class AttributeTracker {
  changed: (values: Values) => void = () => {};
  value: Values = {};
  base: Values = {};
  max: Values = {};
  bonus: Bonuses = {};
  sustain: { [id: string]: boolean } = {};

  constructor(names: string[], defaultValue?: number);
  constructor(values: AttributeConfig);
  constructor(defaults: Values);
  constructor(...args: any[]) {
    if (Array.isArray(args[0])) {
      let val = args[1] || 10;
      const values = args[0].reduce((out, n) => {
        out[n] = val;
        return out;
      }, {});
      this.init(values);
    } else if (args[0].names) {
      let def = args[0].default || 10;
      let values = args[0].names.reduce((out: Values, n: string) => {
        out[n] = def;
        return out;
      }, {} as Values);
      this.init(values);
    } else {
      this.init(args[0]);
    }
  }

  init(defaults: Values) {
    for (let k in defaults) {
      this.set(k, defaults[k]);
    }
  }

  set(name: string, value = 0): number {
    this.value[name] = value;
    this.base[name] = value;
    this.max[name] = value;
    this.bonus[name] = [];
    this.sustain[name] = false;
    return value;
  }

  get(name: string): number {
    return this.value[name] || 0;
  }

  adjust(name: string, adj: AdjustmentOpt): number {
    adj = this._normalizeAdjustment(adj);
    return this._adjust(name, adj);
  }

  _adjust(name: string, adj: Adjustment): number {
    let delta = 0;
    if (adj.base) {
      delta = this.addBase(name, adj.base);
    } else if (adj.restore) {
      delta = this.restoreBase(name);
    } else {
      delta = this.addBonus(name, adj);
    }
    if (delta && this.changed) {
      this.changed({ [name]: delta });
    }
    return delta;
  }

  adjustSet(infos: Record<string, AdjustmentOpt>): Values | null {
    let didSomething = false;
    let res: Values = {};
    Object.entries(infos).forEach(([k, v]) => {
      const adj = this._normalizeAdjustment(v);
      let r = this._adjust(k, adj);
      if (r) {
        res[k] = r;
        didSomething = true;
      }
    });
    if (didSomething && this.changed) {
      this.changed(res);
    }
    return didSomething ? res : null;
  }

  clearAdjustment(name: string, adj: AdjustmentOpt): number {
    let a = this._normalizeAdjustment(adj);
    let delta = this.clearBonus(name, a);
    if (delta && this.changed) {
      this.changed({ [name]: delta });
    }
    return delta;
  }

  clearAdjustmentSet(infos: Record<string, AdjustmentOpt>): Values | null {
    let didSomething = false;
    let res: Values = {};
    Object.entries(infos).forEach(([k, v]) => {
      let a = this._normalizeAdjustment(v);
      let r = this.clearBonus(k, a);
      if (r) {
        res[k] = r;
        didSomething = true;
      }
    });
    if (didSomething && this.changed) {
      this.changed(res);
    }
    return didSomething ? res : null;
  }

  // This is for AD&D style adjustments
  modifier(name: string) {
    return Math.floor((this.get(name) - 10) / 2);
  }

  addBase(name: string, delta = 0) {
    if (delta < 0 && this.sustain[name]) return 0;
    this.base[name] += delta;
    if (this.base[name] > this.max[name]) {
      this.max[name] = this.base[name];
    }
    let old = this.value[name];
    return this._calcValue(name) - old;
  }

  restoreBase(name: string) {
    this.base[name] = this.max[name];
    let old = this.value[name];
    return this._calcValue(name) - old;
  }

  addBonus(name: string, bonus: Adjustment): number {
    if (this.value[name] === undefined) {
      this.set(name);
    }
    this.bonus[name].push(bonus);
    let old = this.value[name] || 0;
    let delta = this._calcValue(name) - old;
    // if (delta != 0) return delta;
    // if (bonus.sustain) return 0;
    return delta;
  }

  clearBonus(name: string, bonus: Adjustment) {
    let arr = this.bonus[name] || [];

    let key = JSON.stringify(bonus);
    let index = arr.findIndex((o) => {
      return JSON.stringify(o) == key;
    });
    if (index > -1) {
      arr.splice(index, 1);
      let old = this.value[name] || 0;
      return this._calcValue(name) - old;
    }
    return 0;
  }

  _calcValue(name: string) {
    let allAdjustments: Adjustment = { name };
    this.bonus[name].forEach((adj) =>
      this._applyAdjustment(allAdjustments, adj)
    );
    this.sustain[name] = allAdjustments.sustain || false;
    let value = this.base[name] || 0;

    if (allAdjustments.fixed !== undefined) {
      value = allAdjustments.fixed;
    } else {
      value += allAdjustments.bonus || 0;
      if (allAdjustments.min !== undefined) {
        value = Math.max(allAdjustments.min, value);
      }
      if (allAdjustments.max !== undefined) {
        value = Math.min(allAdjustments.max, value);
      }
    }

    return (this.value[name] = value);
  }

  _applyAdjustment(total: Adjustment, opts: Adjustment) {
    if (opts.bonus) {
      total.bonus = (total.bonus || 0) + opts.bonus;
    }
    if (opts.fixed !== undefined) {
      total.fixed = Math.max(total.fixed || 0, opts.fixed);
    }
    if (opts.min !== undefined) {
      total.min = Math.max(total.min || 0, opts.min);
    }
    if (opts.max !== undefined) {
      total.max = Math.max(total.max || 0, opts.max);
    }
    if (opts.sustain !== undefined) {
      total.sustain = opts.sustain;
    }
  }

  _normalizeAdjustment(opt: AdjustmentOpt): Adjustment {
    if (typeof opt == "number") {
      opt = { bonus: opt };
    } else if (opt === true || opt === false) {
      opt = { has: opt };
    } else if (typeof opt === "string") {
      opt = { [opt]: true };
    }
    return opt;
  }
}
