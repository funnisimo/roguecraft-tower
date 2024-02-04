import * as GWU from "gw-utils";
import * as HERO from ".";
import * as ITEM from "../item";

describe("HeroKind", () => {
  test("create - empty", () => {
    let kind = HERO.makeKind({
      id: "TEST",
      fg: "white",
      bg: "green",
      ch: "1",
    });
    expect(kind.id).toEqual("TEST");
    expect(kind.name).toEqual("Test");
    expect(kind.fg).toEqual(GWU.colors.white);
    expect(kind.bg).toEqual(GWU.colors.green);
    expect(kind.slots).toEqual({});
  });
  test("create", () => {
    let kind = HERO.makeKind({
      id: "TEST",
      tags: "multi , string",
      slots: { ranged: "taco" },
    });
    expect(kind.id).toEqual("TEST");
    expect(kind.name).toEqual("Test");
    expect(kind.tags).toEqual(["multi", "string"]);
    expect(kind.slots).toEqual({ ranged: "taco" });
  });
  test("create - extra", () => {
    let kind = HERO.makeKind({
      id: "TEST",
      name: "My Cool Name",
      extra: true,
      stuff: "yes!",
    } as HERO.HeroKindConfig);
    expect(kind.id).toEqual("TEST");
    expect(kind.name).toEqual("My Cool Name");
    // @ts-ignore
    expect(kind.extra).toBeTrue();
    // @ts-ignore
    expect(kind.stuff).toEqual("yes!");
  });
});
