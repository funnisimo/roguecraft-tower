import "jest-extended";
import * as GWU from "gw-utils";
import * as ITEM from ".";

describe("Item", () => {
  test("make w/ opts.create", () => {
    const createFn = jest.fn();

    const kind = ITEM.makeKind({
      id: "TEST",
    });

    const item = ITEM.make(kind, { create: createFn });

    expect(createFn).toHaveBeenCalledWith(item, { create: createFn });
  });

  test("make w/ opts.on.create", () => {
    const createFn = jest.fn();

    const kind = ITEM.makeKind({
      id: "TEST",
    });

    const item = ITEM.make(kind, { on: { create: createFn } });

    expect(createFn).toHaveBeenCalledWith(item, { on: { create: createFn } });
  });

  test("make w/ kind.on.create", () => {
    const createFn = jest.fn();

    const kind = ITEM.makeKind({
      id: "TEST",
      on: { create: createFn },
    });

    const item = ITEM.make(kind);

    expect(createFn).toHaveBeenCalledWith(item, {});
  });

  test("make w/ kind.on.create", () => {
    const createFn = jest.fn();

    const kind = ITEM.makeKind({
      id: "TEST",
      on: { create: createFn },
    });

    const item = ITEM.make(kind);

    expect(createFn).toHaveBeenCalledWith(item, {});
  });

  test("make w/ plugin.create", () => {
    const createFn = jest.fn();
    const maker = new ITEM.ItemFactory();

    maker.use({ create: createFn });

    const kind = ITEM.makeKind({
      id: "TEST",
    });

    const item = maker.create(kind);

    expect(createFn).toHaveBeenCalledWith(item, {});
  });

  test("make w/ 2 plugins & kind & opts", () => {
    const pluginFn = jest.fn();
    const pluginFn2 = jest.fn();
    const kindFn = jest.fn();
    const optsFn = jest.fn();
    const maker = new ITEM.ItemFactory();

    maker.use({ create: pluginFn });
    maker.use({ on: { create: pluginFn2 } });

    const kind = ITEM.makeKind({
      id: "TEST",
      on: { create: kindFn },
    });

    const item = maker.create(kind, { create: optsFn });

    expect(pluginFn).toHaveBeenCalledWith(item, { create: optsFn });
    expect(pluginFn2).toHaveBeenCalledWith(item, { create: optsFn });
    expect(kindFn).toHaveBeenCalledWith(item, { create: optsFn });
    expect(optsFn).toHaveBeenCalledWith(item, { create: optsFn });
  });

  test("set data", () => {
    const maker = new ITEM.ItemFactory();

    maker.use({
      create(item) {
        item.data = GWU.utils.mergeDeep(item.data, {
          apple: 1,
          banana: "two",
          cherry: { three: true },
        });
      },
    });

    const kind = ITEM.makeKind({
      id: "TEST",
    });

    const item = maker.create(kind, {});

    expect(item.data).toMatchObject({
      apple: 1,
      banana: "two",
      cherry: { three: true },
    });
  });

  test.todo("set data - show overwriting [it's quiet]");
});
