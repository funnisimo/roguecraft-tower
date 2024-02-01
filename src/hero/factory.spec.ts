import "jest-extended";

import * as HERO from ".";

describe("Hero", () => {
  test("make w/ opts.create", () => {
    const createFn = jest.fn();

    const kind = HERO.makeKind({
      id: "TEST",
    });

    const hero = HERO.make(kind, { make: createFn });

    expect(createFn).toHaveBeenCalledWith(hero, {
      create: createFn,
    });
  });

  test("make w/ opts.on.create", () => {
    const createFn = jest.fn();

    const kind = HERO.makeKind({
      id: "TEST",
    });

    const hero = HERO.make(kind, { on: { create: createFn } });

    expect(createFn).toHaveBeenCalledWith(hero, {
      on: { create: createFn },
    });
  });

  test("make w/ kind.on.create", () => {
    const createFn = jest.fn();

    const kind = HERO.makeKind({
      id: "TEST",
      on: { make: createFn },
    });

    const hero = HERO.make(kind);

    expect(createFn).toHaveBeenCalledWith(hero, {});
  });

  test("make w/ plugin.create", () => {
    const createFn = jest.fn();
    const maker = new HERO.HeroFactory();

    maker.use({ make: createFn });

    const kind = HERO.makeKind({
      id: "TEST",
    });

    const hero = maker.make(kind);

    expect(createFn).toHaveBeenCalledWith(hero, {});
  });

  test("make w/ 2 plugins & kind & opts", () => {
    const pluginFn = jest.fn();
    const pluginFn2 = jest.fn();
    const kindFn = jest.fn();
    const optsFn = jest.fn();
    const maker = new HERO.HeroFactory();

    maker.use({ make: pluginFn });
    maker.use({ on: { make: pluginFn2 } });

    const kind = HERO.makeKind({
      id: "TEST",
      on: { make: kindFn },
    });

    const hero = maker.make(kind, { make: optsFn });

    expect(pluginFn).toHaveBeenCalledWith(hero, { create: optsFn });
    expect(pluginFn2).toHaveBeenCalledWith(hero, { create: optsFn });
    expect(kindFn).toHaveBeenCalledWith(hero, { create: optsFn });
    expect(optsFn).toHaveBeenCalledWith(hero, { create: optsFn });
  });

  test("set data", () => {
    const maker = new HERO.HeroFactory();

    maker.use({ data: { apple: 1, banana: "two", cherry: { three: true } } });

    const kind = HERO.makeKind({
      id: "TEST",
    });

    const hero = maker.make(kind, {});

    expect(hero.data).toMatchObject({
      apple: 1,
      banana: "two",
      cherry: { three: true },
    });
  });

  test.todo("set data - show overwriting [it's quiet]");
});
