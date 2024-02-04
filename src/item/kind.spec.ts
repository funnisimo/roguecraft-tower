import * as GWU from "gw-utils";
import * as ITEM from ".";

describe("ObjKind", () => {
  test("create - empty", () => {
    let kind = ITEM.makeKind({
      id: "TEST",
      frequency: 1,
      fg: "white",
      bg: "green",
      ch: "1",
      armor_flags: "ARROWS_10",
      melee_flags: "BURNS | CHAINS",
    });
    expect(kind.id).toEqual("TEST");
    expect(kind.name).toEqual("Test");
    expect(kind.frequency(100)).toEqual(1);
    expect(kind.fg).toEqual(GWU.colors.white);
    expect(kind.bg).toEqual(GWU.colors.green);
    expect(kind.slot).toBeNull();
    expect(kind.armor_flags).toEqual(ITEM.ARMOR_FLAGS.ARROWS_10);
    expect(kind.melee_flags).toEqual(
      ITEM.MELEE_FLAGS.BURNS | ITEM.MELEE_FLAGS.CHAINS
    );
    expect(kind.ranged_flags).toEqual(0);
  });
  test("create", () => {
    let kind = ITEM.makeKind({
      id: "TEST",
      tags: "multi , string",
      frequency: "1-5:1,6-10:2",
      slot: "head",
    });
    expect(kind.id).toEqual("TEST");
    expect(kind.name).toEqual("Test");
    expect(kind.tags).toEqual(["multi", "string"]);
    expect(kind.frequency(2)).toEqual(1);
    expect(kind.frequency(9)).toEqual(2);
    expect(kind.frequency(20)).toEqual(0);
    expect(kind.slot).toEqual("head");
  });
  test("create - extra", () => {
    let kind = ITEM.makeKind({
      id: "TEST",
      name: "My Cool Name",
      extra: true,
      stuff: "yes!",
    } as ITEM.ItemKindConfig);
    expect(kind.id).toEqual("TEST");
    expect(kind.name).toEqual("My Cool Name");
    // @ts-ignore
    expect(kind.extra).toBeTrue();
    // @ts-ignore
    expect(kind.stuff).toEqual("yes!");
  });
});
