import "jest-extended";
import * as ATTR from "./attributes";

describe("RUT.Attribute", function () {
  let attrs: ATTR.AttributeTracker;

  beforeEach(() => {
    attrs = new ATTR.AttributeTracker(ATTR.default_attributes);
  });

  // it("allows to create with default for all...", function () {
  //   attrs = new RL.Fields.Attributes.Tracker(12);
  //   RL.Config.Attributes.names.forEach((a) => {
  //     expect(attrs[a]).toEqual(12);
  //   });
  // });

  // it("will fill in the missing attributes", function () {
  //   attrs = new RL.Fields.Attributes.Tracker({ str: 12, wis: 12 });
  //   expect(attrs.dex).toEqual(10);
  //   expect(attrs.get('str')).toEqual(12);
  //   expect(attrs.wis).toEqual(12);
  //   expect(attrs.get('con')).toEqual(10);
  // });

  it("allows a lot of manipulation", function () {
    attrs.set("str", 10);
    expect(attrs.get("str")).toEqual(10);
    expect(attrs.base.str).toEqual(10);
    expect(attrs.max.str).toEqual(10);
    attrs.adjust("str", { base: 1 });
    expect(attrs.get("str")).toEqual(11);
    expect(attrs.base.str).toEqual(11);
    expect(attrs.max.str).toEqual(11);

    attrs.adjust("str", 1);
    expect(attrs.get("str")).toEqual(12);
    expect(attrs.base.str).toEqual(11);
    expect(attrs.max.str).toEqual(11);
    expect(attrs.bonus.str).toEqual([{ bonus: 1 }]);
    attrs.clearAdjustment("str", 1);
    expect(attrs.get("str")).toEqual(11);
    expect(attrs.base.str).toEqual(11);
    expect(attrs.max.str).toEqual(11);
    expect(attrs.bonus.str).toEqual([]);

    attrs.adjust("str", { min: 20 });
    expect(attrs.get("str")).toEqual(20);
    attrs.clearAdjustment("str", { min: 20 });
    expect(attrs.get("str")).toEqual(11);

    attrs.adjust("str", { max: 8 });
    expect(attrs.get("str")).toEqual(8);
    attrs.clearAdjustment("str", { max: 8 });
    expect(attrs.get("str")).toEqual(11);

    attrs.adjust("str", { fixed: 19 });
    attrs.adjust("str", 1);
    expect(attrs.get("str")).toEqual(19);
    attrs.clearAdjustment("str", { fixed: 19 });
    expect(attrs.get("str")).toEqual(12);
    attrs.clearAdjustment("str", 1);
    expect(attrs.get("str")).toEqual(11);

    attrs.adjust("str", { base: 1 });
    expect(attrs.get("str")).toEqual(12);
    expect(attrs.base.str).toEqual(12);
    expect(attrs.max.str).toEqual(12);
    attrs.adjust("str", 1);
    attrs.adjust("str", { base: -1 });
    expect(attrs.get("str")).toEqual(12);
    expect(attrs.base.str).toEqual(11);
    expect(attrs.max.str).toEqual(12);
    attrs.adjust("str", { restore: true });
    expect(attrs.get("str")).toEqual(13);
    attrs.clearAdjustment("str", 1);
    expect(attrs.get("str")).toEqual(12);
    expect(attrs.base.str).toEqual(12);
    expect(attrs.max.str).toEqual(12);

    expect(attrs.sustain.str).toBeFalse();
    attrs.adjust("str", { sustain: true });
    expect(attrs.sustain.str).toBeTruthy();
    expect(attrs.get("str")).toEqual(12);
    attrs.adjust("str", { base: -1 });
    expect(attrs.get("str")).toEqual(12);
    attrs.clearAdjustment("str", { sustain: true });
    expect(attrs.sustain.str).toBeFalsy();
    attrs.adjust("str", { base: -1 });
    expect(attrs.get("str")).toEqual(11);
  });

  it("will call callback if an attribute changes", function () {
    let cb = jest.fn();
    attrs.changed = cb;

    expect(attrs.get("str")).toEqual(10);
    let result = attrs.adjust("str", 1);
    expect(result).toEqual(1);
    expect(attrs.get("str")).toEqual(11);
    expect(cb).toHaveBeenCalledWith({ str: 1 });

    cb.mockClear();
    result = attrs.clearAdjustment("str", 1);
    expect(result).toEqual(-1);
    expect(attrs.get("str")).toEqual(10);
    expect(cb).toHaveBeenCalledWith({ str: -1 });
  });

  it("will call callback if an attribute changes via obj", function () {
    let cb = jest.fn();
    attrs.changed = cb;

    expect(attrs.get("str")).toEqual(10);
    expect(attrs.get("con")).toEqual(10);
    let result = attrs.adjustSet({ str: 1, con: 1 });
    expect(result).toEqual({ str: 1, con: 1 });
    expect(attrs.get("str")).toEqual(11);
    expect(attrs.get("con")).toEqual(11);
    expect(cb).toHaveBeenCalledWith({ str: 1, con: 1 });

    cb.mockClear();
    result = attrs.clearAdjustmentSet({ str: 1, con: 1 });
    expect(result).toEqual({ str: -1, con: -1 });
    expect(attrs.get("str")).toEqual(10);
    expect(attrs.get("con")).toEqual(10);
    expect(cb).toHaveBeenCalledWith({ str: -1, con: -1 });
  });

  // describe('rollAttributes', function() {
  //
  //   it('can roll with a default number', function() {
  //     attrs = new RUT.Attribute.rollAttributes(10);
  //
  //     expect(attrs.get('str')).toEqual(10);
  //     expect(attrs.dex).toEqual(10);
  //     expect(attrs.get('con')).toEqual(10);
  //     expect(attrs.intelligence).toEqual(10);
  //   });
  // });
});
