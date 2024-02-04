import * as GWU from "gw-utils";
import { CallbackFn, ObjEvents } from "../object";
import { HeroMakeOpts, Hero } from "./hero";
import {
  HeroEvents,
  HeroKind,
  HeroKindConfig,
  getKind,
  makeKind,
} from "./kind";

export interface HeroPlugin extends HeroEvents {
  createKind?: (kind: HeroKind, opts: HeroKindConfig) => void;
  on?: HeroEvents & ObjEvents;
  data?: { [key: string]: any };
  kinds?: Record<string, HeroKindConfig>;
}

export class HeroFactory {
  plugins: HeroPlugin[] = [];
  kinds: Record<string, HeroKind> = {};

  use(plugin: HeroPlugin) {
    this.plugins.push(plugin);
  }

  installKind(opts: HeroKindConfig): HeroKind;
  installKind(id: string, opts: HeroKindConfig): HeroKind;
  installKind(...args: any[]): HeroKind {
    let id: string;
    let opts: HeroKindConfig;
    if (args.length == 1) {
      opts = args[0];
      id = args[0].id;
    } else {
      id = args[0];
      opts = args[1];
    }

    const kind = makeKind(opts);

    this.plugins.forEach((p) => {
      if (p.createKind) {
        p.createKind(kind, opts);
      }
    });

    this.kinds[id.toLowerCase()] = kind;
    return kind;
  }

  getKind(id: string): HeroKind | null {
    return this.kinds[id.toLowerCase()] || null;
  }

  create(kind: HeroKind, opts: HeroMakeOpts = {}): Hero {
    let out: GWU.Option<Hero> = GWU.Option.None();
    if (opts.ctor) {
      out = opts.ctor(kind, opts);
    }
    out = this.plugins.reduce((v, p) => {
      if (v.isNone() && p.ctor) {
        return p.ctor(kind, opts);
      }
      return v;
    }, out);
    let hero = out.unwrapOrElse(() => new Hero(kind));

    this.apply(hero);

    hero._create(opts);
    hero.emit("create", hero, opts);

    return hero;
  }

  apply(hero: Hero) {
    this.plugins.forEach((p) => {
      Object.entries(p).forEach(([key, val]) => {
        if (key === "on") {
          Object.entries(val).forEach(([k2, v2]: [string, CallbackFn]) => {
            if (typeof v2 === "function") {
              hero.on(k2, v2);
            } else {
              console.warn("Invalid 'on' member in Item plugin: " + k2);
            }
          });
        } else if (key === "data") {
          Object.assign(hero.data, val);
        } else if (key === "kinds") {
          // Skip
        } else if (typeof val === "function") {
          hero.on(key, val);
        } else {
          console.warn("Invalid member of Item plugin: " + key);
        }
      });
    });
  }
}

export const factory = new HeroFactory();

export function use(plugin: HeroPlugin) {
  factory.use(plugin);
}

export function create(
  kind: HeroKind | string,
  config: HeroMakeOpts | number = {}
): Hero {
  if (typeof kind === "string") {
    kind = getKind(kind);
    if (!kind) throw new Error("Failed to find kind.");
  }
  if (config === undefined) {
    config = {};
  }
  if (typeof config === "number") {
    config = { power: config };
  }

  return factory.create(kind, config);
}
