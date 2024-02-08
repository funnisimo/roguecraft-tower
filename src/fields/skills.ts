// TODO - Levels?  XP?
export interface Skill {
  has?: boolean;
  advantage?: boolean;
  disadvantage?: boolean;
  bonus?: number;
  fixed?: number;
  succeed?: boolean;
  fail?: boolean;
}

export interface SkillAdjustment extends Skill {
  restore?: boolean;
  reset?: boolean;
}

export type NamedSkillInfo = Skill & { name: string };

export type NamedSkillAdjustment = SkillAdjustment & { name: string };

export type SkillAdjustmentOpt =
  | number
  | boolean
  | keyof SkillAdjustment
  | SkillAdjustment;

export type SkillAdjustmentSet = { [id: string]: SkillAdjustmentOpt };

// TODO - Should this have defaults for more fields?  esp. bonus?
export function makeSkill(
  has?: boolean,
  advantage?: boolean,
  disadvantage?: boolean
): Skill {
  const val: Skill = {};
  val.has = has;
  val.advantage = advantage;
  val.disadvantage = disadvantage;
  return val;
}

export function addToSkill(
  skill: Skill,
  val: boolean | Skill | NamedSkillInfo
) {
  if (typeof val === "boolean") {
    val = { has: val };
  }

  let k: keyof NamedSkillInfo;
  for (k in val) {
    let value = val[k];
    if (value === undefined) continue;
    if (value === false && skill[k]) {
      // TODO - Should this delete all fields?  esp. bonus, has?
      delete skill[k];
    } else if (k == "name") {
      continue;
    } else if (k == "bonus") {
      if (typeof value === "number") {
        skill.bonus = (skill.bonus || 0) + value;
      }
    } else if (k == "fixed") {
      if (typeof value === "number") {
        skill.fixed = Math.max(skill.fixed || 0, value);
      }
    } else {
      skill[k] = value;
    }
  }
  return skill;
}

export function mixSkills(a: Skill, b: Skill): Skill {
  let result = {};
  addToSkill(result, a);
  addToSkill(result, b);
  return result;
}
// }

export class SkillsTracker {
  _values: { [id: string]: Skill };
  _adjustments: { [id: string]: SkillAdjustment[] };
  _bases: { [id: string]: Skill };

  constructor(defaults: { [id: string]: number | Skill } = {}) {
    this._values = {};
    this._adjustments = {};
    this._bases = {};

    Object.entries(defaults).forEach(([key, value]) => {
      if (typeof value == "number") {
        this._bases[key] = { bonus: value };
        this._values[key] = { bonus: value };
        this._adjustments[key] = [];
      } else {
        if (value.has !== false) {
          // TODO - What about the rest of the potential fields
          this.add(key, value.advantage, value.disadvantage);
        }
      }
    });
  }

  add(name: string, advantage?: boolean, disadvantage?: boolean) {
    this._add(name, true, advantage, disadvantage);
  }

  _add(
    name: string,
    has?: boolean,
    advantage?: boolean,
    disadvantage?: boolean
  ) {
    this._bases[name] = makeSkill(has, advantage, disadvantage);
    this._values[name] = makeSkill(has, advantage, disadvantage);
    this._adjustments[name] = [];
  }

  get(name: string, sub?: string): Skill | null {
    if (sub === undefined) {
      return this._values[name] || null;
    }

    let main = this._values[name];
    let type = this._values[`${name}.${sub}`];

    if (!main && !type) return null;
    if (!main) return type;
    if (!type) return main;

    return mixSkills(main, type);
  }

  adjust(name: string, adj: SkillAdjustmentOpt): boolean;
  adjust(name: string, sub: string, adj: SkillAdjustmentOpt): boolean;
  adjust(adj: NamedSkillAdjustment): boolean;
  adjust(...args: any[]): boolean {
    let name: string;
    let adj: SkillAdjustment;
    if (args.length == 1) {
      adj = args[0];
      name = args[0].name;
    } else if (args.length == 2) {
      name = args[0];
      adj = this._normalizeAdjustment(args[1]);
    } else {
      name = `${args[0]}.${args[1]}`;
      adj = this._normalizeAdjustment(args[2]);
    }

    let result = true;
    let s = this._adjustments[name];
    if (!s) {
      this._add(name);
      s = this._adjustments[name];
    }
    if (adj.reset === true) {
      result = s.length != 0;
      this._adjustments[name] = [];
    } else {
      s.push(adj);
    }
    this._calcValue(name);
    return result;
  }

  adjustSet(adj: SkillAdjustmentSet): boolean {
    let didSomething = false;
    Object.entries(adj).forEach(([k, v]) => {
      didSomething = this.adjust(k, v) || didSomething;
    });
    return didSomething;
  }

  clearAdjustment(name: string, adj: SkillAdjustmentOpt): void;
  clearAdjustment(name: string, sub: string, adj: SkillAdjustmentOpt): void;
  clearAdjustment(adj: NamedSkillAdjustment): void;
  clearAdjustment(...args: any[]): void {
    let name: string;
    let adj: SkillAdjustment;
    if (args.length == 1) {
      adj = args[0];
      name = args[0].name;
    } else if (args.length == 2) {
      name = args[0];
      adj = this._normalizeAdjustment(args[1]);
    } else {
      name = `${args[0]}.${args[1]}`;
      adj = this._normalizeAdjustment(args[2]);
    }

    let key = JSON.stringify(adj);
    let index = this._adjustments[name].findIndex((o) => {
      return JSON.stringify(o) == key;
    });
    if (index > -1) {
      this._adjustments[name].splice(index, 1);
      this._calcValue(name);
    }
  }

  clearAdjustmentSet(infos: Record<string, SkillAdjustmentOpt>) {
    Object.entries(infos).forEach(([k, v]) => {
      this.clearAdjustment(k, v);
    });
  }

  _calcValue(name: string) {
    let value = makeSkill();
    let base = this._bases[name];
    addToSkill(value, base);
    this._adjustments[name].forEach((adjustment) => {
      addToSkill(value, adjustment);
    });
    this._values[name] = value;
  }

  _normalizeAdjustment(opts: SkillAdjustmentOpt): SkillAdjustment {
    if (opts === true || opts === false) {
      opts = { has: opts };
    } else if (typeof opts === "number") {
      opts = { bonus: opts };
    } else if (typeof opts === "string") {
      opts = { [opts]: true };
    }
    return opts;
  }

  normalizeAdjustment(
    name: string,
    adj: SkillAdjustmentOpt
  ): NamedSkillAdjustment[];
  normalizeAdjustment(
    name: string,
    sub: string,
    adj: SkillAdjustmentOpt
  ): NamedSkillAdjustment[];
  normalizeAdjustment(adj: SkillAdjustmentSet): NamedSkillAdjustment[];
  normalizeAdjustment(adj: NamedSkillAdjustment): NamedSkillAdjustment[];
  normalizeAdjustment(adj: NamedSkillAdjustment[]): NamedSkillAdjustment[];
  normalizeAdjustment(...args: any[]): NamedSkillAdjustment[] {
    if (args.length == 3) {
      let opts = args[2];
      if (opts === true || opts === false) {
        opts = { has: opts };
      } else if (typeof opts === "number") {
        opts = { bonus: opts };
      } else if (typeof opts === "string") {
        opts = { [opts]: true };
      }
      let name = `${args[0]}.${args[1]}`;
      return [Object.assign({ name }, opts)];
    }
    if (args.length == 2) {
      let opts = args[1];
      if (opts === true || opts === false) {
        opts = { has: opts };
      } else if (typeof opts === "number") {
        opts = { bonus: opts };
      } else if (typeof opts === "string") {
        opts = { [opts]: true };
      }
      return [Object.assign({ name: args[0] }, opts)];
    }

    let opts = args[0];
    if (Array.isArray(opts)) return opts;

    if (opts.name) {
      return [opts];
    }
    if (opts.skill) {
      opts.name = opts.skill;
      return [opts];
    }
    if (opts.restore) {
      if (opts.restore == "all") {
        return Object.keys(this._values).map((a) => {
          return { name: a, restore: true };
        });
      }
      return [{ name: opts.restore, restore: true }];
    }
    // if (opts.attribute) {
    //   opts.name = opts.attribute;
    //   return [opts];
    // }
    // if (opts.stat) {
    //   opts.name = opts.stat;
    //   return [opts];
    // }
    // if (opts.save) {
    //   opts.name = opts.save;
    //   return [opts];
    // }
    // if (opts.saves) {
    //   opts.name = opts.saves;
    //   return [opts];
    // }
    // if (opts.ability) {
    //   opts.name = opts.ability;
    //   return [opts];
    // }

    // now we assume that each key is for a separate skill...
    return Object.keys(opts).reduce((out, key) => {
      let opt = opts[key];
      if (key == "reset" || key == "restore") {
        if (typeof opt == "string") opt = [opt];
        opt.forEach((a: string) => {
          out.push({ name: a, restore: true });
        });
      } else {
        if (typeof opt == "number" || Array.isArray(opt)) {
          opt = { bonus: opt };
        } else if (opt === true || opt === false) {
          opt = { has: opt };
        } else if (opt == "reset" || opt == "restore") {
          opt = { restore: true };
        } else if (opt == "sustain") {
          opt = { sustain: true };
        }
        out.push(Object.assign({ name: key }, opt));
      }
      return out;
    }, [] as NamedSkillAdjustment[]);
  }
}
