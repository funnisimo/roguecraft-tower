import { CallbackFn, ObjEvents } from "../game";
import { HeroCreateOpts, Hero } from "./hero";
import { HeroEvents, HeroKind, getKind } from "./kind";

export interface HeroPlugin extends HeroEvents {
  on?: HeroEvents & ObjEvents;
  data?: { [key: string]: any };
}

export class HeroFactory {
  plugins: HeroPlugin[] = [];

  use(plugin: HeroPlugin) {
    this.plugins.push(plugin);
  }

  make(kind: HeroKind, opts: HeroCreateOpts = {}): Hero {
    let hero: Hero;
    if (opts.make) {
      hero = opts.make(kind, opts);
    } else {
      const makePlugin = this.plugins.find((p) => typeof p.make === "function");
      if (makePlugin) {
        hero = makePlugin.make(kind, opts);
      } else {
        hero = new Hero(kind);
      }
    }

    this.apply(hero);

    hero._make(opts);

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

export function make(
  kind: HeroKind | string,
  config: HeroCreateOpts | number = {}
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

  if (kind.hero) {
    throw new Error("ActorKind is Hero: " + kind.id);
  }

  return factory.make(kind, config);
}
