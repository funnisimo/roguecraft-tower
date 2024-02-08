import * as ABILITIES from "./abilities";

describe("Abilities", function () {
  let abilities: ABILITIES.AbilityTracker;

  beforeEach(() => {
    abilities = new ABILITIES.AbilityTracker();
  });

  it("lets you manage abilties", function () {
    abilities.set("fly", 10);
    expect(abilities.get("fly")).toEqual(10);
    abilities.adjust("fly", { base: 1 });
    expect(abilities.get("fly")).toEqual(11);

    abilities.adjust("fly", 1);
    expect(abilities.get("fly")).toEqual(12);
    abilities.clearAdjustment("fly", 1);
    expect(abilities.get("fly")).toEqual(11);

    abilities.adjust("fly", { min: 20 });
    expect(abilities.get("fly")).toEqual(20);
    abilities.clearAdjustment("fly", { min: 20 });
    expect(abilities.get("fly")).toEqual(11);

    abilities.adjust("fly", { max: 8 });
    expect(abilities.get("fly")).toEqual(8);
    abilities.clearAdjustment("fly", { max: 8 });
    expect(abilities.get("fly")).toEqual(11);

    abilities.adjust("fly", { fixed: 19 });
    abilities.adjust("fly", 1);
    expect(abilities.get("fly")).toEqual(19);
    abilities.clearAdjustment("fly", { fixed: 19 });
    expect(abilities.get("fly")).toEqual(12);
    abilities.clearAdjustment("fly", 1);
    expect(abilities.get("fly")).toEqual(11);

    abilities.adjust("fly", { base: 10 });
    expect(abilities.get("fly")).toEqual(21);
    abilities.adjust("fly", 1);
    abilities.adjust("fly", { base: -1 });
    expect(abilities.get("fly")).toEqual(21);
    abilities.adjust("fly", { restore: true });
    expect(abilities.get("fly")).toEqual(22);
  });

  describe("Abilities", function () {
    it("lets you zero an ability", function () {
      abilities.set("vision", 10);
      expect(abilities.get("vision")).toEqual(10);

      abilities.adjust("vision", { max: 0 });
      expect(abilities.get("vision")).toEqual(0);
      abilities.clearAdjustment("vision", { max: 0 });
      expect(abilities.get("vision")).toEqual(10);

      abilities.adjust("vision", { fixed: 0 });
      expect(abilities.get("vision")).toEqual(0);
      abilities.clearAdjustment("vision", { fixed: 0 });
      expect(abilities.get("vision")).toEqual(10);
    });

    // it('lets you get how far the being can see', function() {
    //
    //   abilities.set('vision', 10);
    //   abilities.set('darkvision', 12);
    //
    //   // expect(RUT.Senses.sightAt(being, 4, RUT.Light.DIM)).toEqual(RUT.Light.BRIGHT);
    //   // expect(RUT.Senses.sightAt(being, 8, RUT.Light.NONE)).toEqual(RUT.Light.DIM);
    //   // expect(RUT.Senses.sightAt(being, 11, RUT.Light.DIM)).toEqual(RUT.Light.BRIGHT);
    //   // expect(RUT.Senses.sightAt(being, 15, RUT.Light.NONE)).toEqual(RUT.Light.DIM);
    //
    //   // expect(abilities.canSee(4)).toBeTruthy();
    //   // expect(abilities.canSee(8)).toBeTruthy();
    //   // expect(abilities.canSee(11)).toBeTruthy();
    //   // expect(abilities.canSee(15)).toBeFalsy();
    //
    //   expect(RUT.Senses.maxVision(being)).toEqual(12);
    //
    //   abilities.set('darkvision', 0);
    //   expect(RUT.Senses.maxVision(being)).toEqual(10);
    // });

    it("lets you adjust with just a number", function () {
      abilities.set("move", 30);
      expect(abilities.get("move")).toEqual(30);
      abilities.adjust("move", -10);
      expect(abilities.get("move")).toEqual(20);
      abilities.clearAdjustment("move", -10);
      expect(abilities.get("move")).toEqual(30);
    });
  });

  describe("adjust", function () {
    beforeEach(() => {
      abilities = new ABILITIES.AbilityTracker({ move: 10, fly: 20 });
    });

    it("will publish an event if an ability changes", function () {
      expect(abilities.get("move")).toEqual(10);
      let result = abilities.adjust("move", 1);
      expect(result).toEqual(1);
      expect(abilities.get("move")).toEqual(11);
      // expect(player.changed).toHaveBeenCalledWith({ abilities: { move: 1 }});

      // player.changed.calls.reset();
      result = abilities.clearAdjustment("move", 1);
      expect(result).toEqual(-1);
      expect(abilities.get("move")).toEqual(10);
      // expect(player.changed).toHaveBeenCalledWith({ abilities: { move: -1 }});
    });

    it("will publish an event if an ability changes via obj", function () {
      expect(abilities.get("move")).toEqual(10);
      expect(abilities.get("fly")).toEqual(20);
      let result = abilities.adjustSet({ move: 1, fly: 1 });
      expect(result).toEqual({ move: 1, fly: 1 });
      expect(abilities.get("move")).toEqual(11);
      expect(abilities.get("fly")).toEqual(21);
      // expect(player.changed).toHaveBeenCalledWith({ abilities: { move: 1, fly: 1 }});

      // player.changed.calls.reset();
      result = abilities.clearAdjustmentSet({ move: 1, fly: 1 });
      expect(result).toEqual({ move: -1, fly: -1 });
      expect(abilities.get("move")).toEqual(10);
      expect(abilities.get("fly")).toEqual(20);
      // expect(player.changed).toHaveBeenCalledWith({ abilities: { move: -1, fly: -1 }});
    });
  });
});
