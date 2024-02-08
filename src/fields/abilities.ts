export interface Values {
  [id: string]: number;
}

export interface Adjustment {
  name?: string;
  restore?: boolean;
  base?: number;
  min?: number;
  max?: number;
  bonus?: number;
  sustain?: boolean;
  has?: boolean;
  fixed?: number;
}

export type AdjustmentOpt = boolean | number | keyof Adjustment | Adjustment;

export interface NamedAdjustment extends Omit<Adjustment, "name"> {
  name: string;
}

export interface Bonuses {
  [id: string]: Adjustment[];
}

export class AbilityTracker {
  value: Values = {};
  base: Values = {};
  max: Values = {};
  bonus: Bonuses = {};
  sustain: { [id: string]: boolean } = {};

  constructor(defaults = {}) {
    this.init(defaults);
  }

  init(defaults: Values) {
    for (let k in defaults) {
      this.set(k, defaults[k]);
    }
  }

  adjust(name: string, adj: AdjustmentOpt): number | undefined {
    adj = this._normalizeAdjustment(adj);

    let delta = undefined;
    if (adj.base) {
      delta = this.addBase(name, adj.base);
    } else if (adj.restore) {
      delta = this.restoreBase(name);
      if (delta == 0) delta = undefined;
    } else {
      delta = this.addBonus(name, adj);
    }
    return delta;
  }

  adjustSet(infos: Record<string, AdjustmentOpt>): Values | null {
    let didSomething = false;
    let res: Values = {};
    Object.entries(infos).forEach(([k, v]) => {
      let r = this.adjust(k, v);
      if (r) {
        res[k] = r;
        didSomething = true;
      }
    });
    return didSomething ? res : null;
  }

  clearAdjustment(name: string, adj: AdjustmentOpt): number {
    let a = this._normalizeAdjustment(adj);
    let delta = this.clearBonus(name, a);
    return delta;
  }

  clearAdjustmentSet(infos: Record<string, AdjustmentOpt>): Values | null {
    let didSomething = false;
    let res: Values = {};
    Object.entries(infos).forEach(([k, v]) => {
      let r = this.clearAdjustment(k, v);
      if (r) {
        res[k] = r;
        didSomething = true;
      }
    });
    return didSomething ? res : null;
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

  addBonus(name: string, bonus: Adjustment) {
    if (this.value[name] === undefined) {
      this.set(name);
    }
    this.bonus[name].push(bonus);
    let old = this.value[name] || 0;
    let delta = this._calcValue(name) - old;
    if (delta != 0) return delta;
    if (bonus.sustain) return 0;
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
