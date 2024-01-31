import "jest-extended";

import * as ACTOR from ".";

describe("Actor", () => {
  test("make w/ opts.create", () => {
    const createFn = jest.fn();

    const kind = ACTOR.makeKind({
      id: "TEST",
    });

    const actor = ACTOR.make(kind, { create: createFn });

    expect(createFn).toHaveBeenCalledWith(actor, {
      create: createFn,
    });
  });

  test("make w/ opts.on.create", () => {
    const createFn = jest.fn();

    const kind = ACTOR.makeKind({
      id: "TEST",
    });

    const actor = ACTOR.make(kind, { on: { create: createFn } });

    expect(createFn).toHaveBeenCalledWith(actor, {
      on: { create: createFn },
    });
  });

  test("make w/ kind.on.create", () => {
    const createFn = jest.fn();

    const kind = ACTOR.makeKind({
      id: "TEST",
      on: { create: createFn },
    });

    const actor = ACTOR.make(kind);

    expect(createFn).toHaveBeenCalledWith(actor, {});
  });

  test("make w/ plugin.create", () => {
    const createFn = jest.fn();
    const maker = new ACTOR.ActorFactory();

    maker.use({ create: createFn });

    const kind = ACTOR.makeKind({
      id: "TEST",
    });

    const actor = maker.make(kind);

    expect(createFn).toHaveBeenCalledWith(actor, {});
  });

  test("make w/ 2 plugins & kind & opts", () => {
    const pluginFn = jest.fn();
    const pluginFn2 = jest.fn();
    const kindFn = jest.fn();
    const optsFn = jest.fn();
    const maker = new ACTOR.ActorFactory();

    maker.use({ create: pluginFn });
    maker.use({ on: { create: pluginFn2 } });

    const kind = ACTOR.makeKind({
      id: "TEST",
      on: { create: kindFn },
    });

    const actor = maker.make(kind, { create: optsFn });

    expect(pluginFn).toHaveBeenCalledWith(actor, { create: optsFn });
    expect(pluginFn2).toHaveBeenCalledWith(actor, { create: optsFn });
    expect(kindFn).toHaveBeenCalledWith(actor, { create: optsFn });
    expect(optsFn).toHaveBeenCalledWith(actor, { create: optsFn });
  });

  test("set data", () => {
    const maker = new ACTOR.ActorFactory();

    maker.use({ data: { apple: 1, banana: "two", cherry: { three: true } } });

    const kind = ACTOR.makeKind({
      id: "TEST",
    });

    const actor = maker.make(kind, {});

    expect(actor.data).toMatchObject({
      apple: 1,
      banana: "two",
      cherry: { three: true },
    });
  });

  test.todo("set data - show overwriting [it's quiet]");
});
