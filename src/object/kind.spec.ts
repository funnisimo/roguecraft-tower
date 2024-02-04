import * as OBJ from ".";

describe("ObjKind", () => {
  test("create - empty", () => {
    let kind = OBJ.makeKind({});
    expect(kind.bump).toEqual([]);
    expect(kind.performs).toEqual([]);
    expect(kind.resolves).toEqual([]);
  });
  test("create", () => {
    let kind = OBJ.makeKind({
      bump: "multi , string",
      performs: ["multi", "array"],
      resolves: "string",
    });
    expect(kind.bump).toEqual(["multi", "string"]);
    expect(kind.performs).toEqual(["multi", "array"]);
    expect(kind.resolves).toEqual(["string"]);
  });
  test("create - extra", () => {
    let kind = OBJ.makeKind({
      extra: true,
      stuff: "yes!",
    } as OBJ.ObjKindConfig);
    expect(kind.bump).toEqual([]);
    expect(kind.performs).toEqual([]);
    expect(kind.resolves).toEqual([]);
    // @ts-ignore
    expect(kind.extra).toBeTrue();
    // @ts-ignore
    expect(kind.stuff).toEqual("yes!");
  });
});
