import * as COMP from "./computed";

describe("RL.Fields.Computed", function () {
  let computed: COMP.ComputedValues;

  beforeEach(() => {
    computed = new COMP.ComputedValues(10);
  });

  it("allows adjustments", function () {
    expect(computed.armor).toEqual(10);
    expect(computed.armor_bonus).toEqual(COMP.ArmorBonus.YES);
    computed.adjust({
      slot: "head",
      armor: 1,
      armor_bonus: COMP.ArmorBonus.NO,
    });
    computed.adjust({ slot: "body", armor: 1 });
    expect(computed.armor).toEqual(12);
    expect(computed.armor_bonus).toEqual(COMP.ArmorBonus.NO);
  });

  it("does not take to_hit and to_damage from weapons", function () {
    expect(computed.to_hit).toEqual(0);
    expect(computed.to_damage).toEqual(0);
    computed.adjust({ slot: "wield", to_hit: 1, to_damage: 1 });
    expect(computed.to_hit).toEqual(0);
    expect(computed.to_damage).toEqual(0);

    // TODO - How to identify a secondary weapon vs a shield?
    computed.adjust({ slot: "arm", to_hit: 1, to_damage: 1 });
    expect(computed.to_hit).toEqual(0);
    expect(computed.to_damage).toEqual(0);
  });

  it("allows handles bonuses as numbers", function () {
    expect(computed.armor).toEqual(10);
    expect(computed.armor_bonus).toEqual(COMP.ArmorBonus.YES);
    computed.adjust({
      slot: "head",
      armor: 1,
      armor_bonus: COMP.ArmorBonus.LIMITED,
    });
    computed.adjust({ slot: "body", armor: 1 });
    expect(computed.armor).toEqual(12);
    expect(computed.armor_bonus).toEqual(COMP.ArmorBonus.LIMITED);
  });

  it("false overrides numbers", function () {
    expect(computed.armor).toEqual(10);
    expect(computed.armor_bonus).toEqual(COMP.ArmorBonus.YES);
    computed.adjust({
      slot: "head",
      armor: 1,
      armor_bonus: COMP.ArmorBonus.LIMITED,
    });
    computed.adjust({
      slot: "body",
      armor: 1,
      armor_bonus: COMP.ArmorBonus.NO,
    });
    expect(computed.armor).toEqual(12);
    expect(computed.armor_bonus).toEqual(COMP.ArmorBonus.NO);
  });

  describe("critical_injury", function () {
    it("allows adjusting critical_injury to false", function () {
      expect(computed.critical_injury).toBeTruthy();
      computed.adjust({
        slot: "body",
        critical_injury: false,
      });
      expect(computed.critical_injury).toBeFalsy();
      computed.clearAdjustment({ slot: "body" });
      expect(computed.critical_injury).toBeTruthy();
    });
  });
});
