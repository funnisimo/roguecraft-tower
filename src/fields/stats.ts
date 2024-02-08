export interface StatInfo {
  value?: number;
  max?: number;
  rate?: number;
}

export interface NamedStatInfo extends StatInfo {
  name: string;
}

export type NamedStatSet = Record<string, StatInfo>;

export interface StatSet {
  value?: number | boolean;
  max?: number | boolean;
  rate?: number | boolean;
}

export interface StatAdjust extends StatSet {
  over?: number;
  bonus?: number;
  reset?: boolean;
}

export interface NamedStatAdjust extends StatAdjust {
  name: string;
}

export type NamedAdjustSet = Record<string, StatAdjust>;

export class StatTracker {
  _value: Record<string, number> = {};
  _max: Record<string, number> = {};
  _rate: Record<string, number> = {};

  constructor(values: Record<string, number> = {}) {
    Object.entries(values).forEach(([k, v]) => {
      this.add(k, v);
    });
  }

  value(name: string): number {
    return this._value[name] || 0;
  }

  max(name: string): number {
    return this._max[name] || 0;
  }

  rate(name: string): number {
    return this._rate[name] || 0;
  }

  init(...vals: Record<string, number>[]) {
    for (let stats of vals) {
      if (!stats) continue;
      for (let name in stats) {
        this.add(name, stats[name]);
      }
    }
  }

  add(name: string, value?: number, max?: number, rate?: number): void;
  add(name: string, info: StatInfo): void;
  add(name: NamedStatInfo): void;
  add(...args: any[]) {
    let name: string;
    let value: number;
    let max: number;
    let rate: number;
    if (args.length > 1) {
      name = args[0];
      if (args.length == 2 && typeof args[1] == "object") {
        const info = args[1];
        value = info.value;
        max = info.max;
        rate = info.rate;
      } else {
        value = args[1];
        max = args[2];
        rate = args[3];
      }
    } else {
      if (typeof args[0] === "string") {
        name = args[0];
      } else if (args[0].name) {
        const info = args[0];
        name = info.name;
        value = info.value;
        max = info.max;
        rate = info.rate;
      } else {
        throw new Error("invalid args.");
      }
    }

    if (!name) {
      return;
    }
    value = value || 0;
    value = this._value[name] = value || 0; // RL.Calc.calc(
    this._max[name] = max || value || 0;
    this._rate[name] = rate || 0;
  }

  addSet(infos: Record<string, StatInfo>) {
    Object.entries(infos).forEach(([k, v]) => {
      this.add(k, v);
    });
  }

  adjust(name: string, info: number | StatAdjust): number;
  adjust(info: NamedStatAdjust): number;
  adjust(...args: any[]): number {
    let name: string;
    let adj: StatAdjust = {};

    if (args.length == 1) {
      if (args[0].name) {
        name = args[0].name;
        adj = args[0];
      } else {
        throw new Error("Invalid argument.");
      }
    } else if (args.length == 2) {
      name = args[0];
      adj = args[1];
      if (typeof args[1] === "number") {
        adj = { value: args[1] };
      }
    } else {
      throw new Error("Expected different parameters");
    }

    const old = this._value[name];

    if (adj.over) {
      // only change amount over max
      const value = adj.over; // RL.Calc.calc(
      this._value[name] = Math.max(this._max[name], this._value[name] + value);
    } else if (adj.bonus) {
      // allows you to go over max
      const value = adj.bonus; // RL.Calc.calc(
      this._value[name] = Math.max(0, this._value[name] + value);
    } else if (adj.value && typeof adj.value === "number") {
      // adjust within 0, max -- RL.Calc.isValue
      const value = adj.value; // RL.Calc.calc(
      let newValue = this._value[name] + value;
      if (newValue > this._max[name]) {
        newValue = this._max[name];
      }
      if (newValue < 0) {
        newValue = 0;
      }
      this._value[name] = newValue;
    }

    if (adj.max && typeof adj.max === "number") {
      // RL.Calc.isValue
      const value = adj.max; // RL.Calc.calc(
      this._max[name] = this._max[name] + value;

      if (adj.value === true) {
        this._value[name] = this._max[name];
      }
    }
    if (adj.rate && typeof adj.rate === "number") {
      this._rate[name] += adj.rate; // RL.Calc.calc(
    }
    if (adj.reset === true) {
      this.reset(name);
    }
    if (this._value[name] == 0 && old > 0) return -Math.ceil(old);
    const oldInt = Math.floor(old);
    const newInt = Math.floor(this._value[name]);
    return newInt - oldInt;
  }

  adjustSet(infos: Record<string, StatAdjust>): Record<string, number> {
    const res: Record<string, number> = {};
    Object.entries(infos).forEach(([k, v]) => {
      res[k] = this.adjust(k, v);
    });
    return res;
  }

  set(
    name: string,
    value: number | boolean,
    max?: number | boolean,
    rate?: number | boolean
  ): void;
  set(name: string, info: StatSet): void;
  set(...args: any[]): void {
    let name: string = args[0];
    let value: number | boolean;
    let max: number | boolean;
    let rate: number | boolean;

    if (args.length == 2 && typeof args[1] === "object") {
      const info = args[1];
      max = info.max || false;
      rate = info.rate || false;
      value = info.bonus || info.value || false;
    } else {
      value = args[1] || false;
      max = args[2] || false;
      rate = args[3] || false;
    }

    if (typeof value === "number") {
      // RL.Calc.isValue
      let newValue = value; // RL.Calc.calc(
      let delta = newValue - this.value(name);
      this._value[name] = newValue;
      if (max === true) {
        this._max[name] = Math.max(this._max[name], value);
      }
    }
    if (typeof max === "number") {
      // RL.Calc.isValue
      let newValue = max; // RL.Calc.calc(
      let delta = newValue - this.max(name);
      this._max[name] = newValue;
      if (value === true) {
        // adjust value by same amount
        this._value[name] = Math.min(newValue, this.value(name) + delta);
      } else if (value !== false) {
        // Make sure value is ok
        this._value[name] = Math.min(newValue, this.value(name));
      }
    }
    if (typeof rate === "number") {
      this._rate[name] = rate; // RL.Calc.calc(
    }
  }

  regen() {
    for (let name in this.rate) {
      this._value[name] = this._value[name] + this._rate[name];
      if (this._value[name] < 0) {
        this._value[name] = 0;
      }
      if (this._value[name] > this._max[name]) {
        this._value[name] = this._max[name];
      }
    }
  }

  reset(name: string, value?: number) {
    if (value === undefined) value = this._max[name];
    this._value[name] = this._max[name] = value;
  }

  forEach(fn: (name: string, value: number) => void) {
    for (let name in this._value) {
      fn(name, this._value[name]);
    }
  }
}
