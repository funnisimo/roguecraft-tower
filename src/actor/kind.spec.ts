import * as GWU from "gw-utils";
import * as ACTOR from ".";
import * as ITEM from "../item";

describe("ActorKind", () => {
  test("create - empty", () => {
    let kind = ACTOR.makeKind({
      id: "TEST",
      fg: "white",
      bg: "green",
      ch: "1",
    });
    expect(kind.id).toEqual("TEST");
    expect(kind.name).toEqual("Test");
    expect(kind.fg).toEqual(GWU.colors.white);
    expect(kind.bg).toEqual(GWU.colors.green);
    expect(kind.dropChance).toEqual(0);
    expect(kind.dropMatch).toEqual([]);
  });
  test("create", () => {
    let kind = ACTOR.makeKind({
      id: "TEST",
      tags: "multi , string",
      dropMatch: "armor",
    });
    expect(kind.id).toEqual("TEST");
    expect(kind.name).toEqual("Test");
    expect(kind.tags).toEqual(["multi", "string"]);
    expect(kind.dropChance).toEqual(100);
    expect(kind.dropMatch).toEqual(["armor"]);
  });
  test("create - extra", () => {
    let kind = ACTOR.makeKind({
      id: "TEST",
      name: "My Cool Name",
      extra: true,
      stuff: "yes!",
    } as ACTOR.ActorKindConfig);
    expect(kind.id).toEqual("TEST");
    expect(kind.name).toEqual("My Cool Name");
    // @ts-ignore
    expect(kind.extra).toBeTrue();
    // @ts-ignore
    expect(kind.stuff).toEqual("yes!");
  });
});
