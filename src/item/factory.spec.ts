import "jest-extended";
import * as GWU from "gw-utils";
import * as ITEM from ".";

describe("Item", () => {
  test("make w/ opts.create", () => {
    const makeFn = jest.fn();

    const kind = ITEM.makeKind({
      id: "TEST",
    });

    const item = ITEM.make(kind, { make: makeFn });

    expect(makeFn).toHaveBeenCalledWith(item, { make: makeFn });
  });

  test("make w/ opts.on.create", () => {
    const makeFn = jest.fn();

    const kind = ITEM.makeKind({
      id: "TEST",
    });

    const item = ITEM.make(kind, { on: { make: makeFn } });

    expect(makeFn).toHaveBeenCalledWith(item, { on: { make: makeFn } });
  });

  test("make w/ kind.on.create", () => {
    const makeFn = jest.fn();

    const kind = ITEM.makeKind({
      id: "TEST",
      on: { make: makeFn },
    });

    const item = ITEM.make(kind);

    expect(makeFn).toHaveBeenCalledWith(item, {});
  });

  test("make w/ kind.on.create", () => {
    const makeFn = jest.fn();

    const kind = ITEM.makeKind({
      id: "TEST",
      on: { make: makeFn },
    });

    const item = ITEM.make(kind);

    expect(makeFn).toHaveBeenCalledWith(item, {});
  });

  test("make w/ plugin.create", () => {
    const makeFn = jest.fn();
    const maker = new ITEM.ItemFactory();

    maker.use({ make: makeFn });

    const kind = ITEM.makeKind({
      id: "TEST",
    });

    const item = maker.make(kind);

    expect(makeFn).toHaveBeenCalledWith(item, {});
  });

  test("make w/ 2 plugins & kind & opts", () => {
    const pluginFn = jest.fn();
    const pluginFn2 = jest.fn();
    const kindFn = jest.fn();
    const optsFn = jest.fn();
    const maker = new ITEM.ItemFactory();

    maker.use({ make: pluginFn });
    maker.use({ on: { make: pluginFn2 } });

    const kind = ITEM.makeKind({
      id: "TEST",
      on: { make: kindFn },
    });

    const item = maker.make(kind, { make: optsFn });

    expect(pluginFn).toHaveBeenCalledWith(item, { make: optsFn });
    expect(pluginFn2).toHaveBeenCalledWith(item, { make: optsFn });
    expect(kindFn).toHaveBeenCalledWith(item, { make: optsFn });
    expect(optsFn).toHaveBeenCalledWith(item, { make: optsFn });
  });

  test("set data", () => {
    const maker = new ITEM.ItemFactory();

    maker.use({
      make(item) {
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

    const item = maker.make(kind, {});

    expect(item.data).toMatchObject({
      apple: 1,
      banana: "two",
      cherry: { three: true },
    });
  });

  test.todo("set data - show overwriting [it's quiet]");
});
