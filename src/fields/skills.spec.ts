import * as SKILLS from "./skills";

describe("SKILLS.Skills", function () {
  describe("Skill", function () {
    let skill: SKILLS.Skill;

    beforeEach(() => {
      skill = SKILLS.makeSkill(false);
    });

    it("is created without giving proficiency", function () {
      expect(skill.has).toBeFalsy();
      expect(skill.advantage).toBeUndefined();
      expect(skill.disadvantage).toBeUndefined();
      expect(skill.fixed).toBeUndefined();
      expect(skill.bonus).toBeUndefined();
      expect(skill.succeed).toBeUndefined();
      expect(skill.fail).toBeUndefined();
    });

    it("can be created with false values", function () {
      skill = SKILLS.makeSkill(false, false, false);
      expect(skill.has).toEqual(false);
      expect(skill.advantage).toEqual(false);
      expect(skill.disadvantage).toEqual(false);
      expect(skill.succeed).toBeUndefined();
      expect(skill.fail).toBeUndefined();
    });

    it("can be created with proficiency", function () {
      skill = SKILLS.makeSkill(true);
      expect(skill.has).toBeTruthy();
      expect(skill.advantage).toBeUndefined();
      expect(skill.disadvantage).toBeUndefined();
      expect(skill.succeed).toBeUndefined();
      expect(skill.fail).toBeUndefined();
    });

    it("can be adjusted to proficient", function () {
      SKILLS.addToSkill(skill, true);
      expect(skill.has).toBeTruthy();
      SKILLS.addToSkill(skill, true);
      expect(skill.has).toBeTruthy();
      SKILLS.addToSkill(skill, false);
      expect(skill.has).toBeFalsy();
    });

    it("can be adjusted to proficient 2", function () {
      SKILLS.addToSkill(skill, { has: true });
      expect(skill.has).toBeTruthy();
      SKILLS.addToSkill(skill, {});
      expect(skill.has).toBeTruthy();
      SKILLS.addToSkill(skill, { has: false });
      expect(skill.has).toBeFalsy();
    });

    it("can have advantage changed", function () {
      SKILLS.addToSkill(skill, { advantage: true });
      expect(skill.advantage).toBeTruthy();
      SKILLS.addToSkill(skill, {});
      expect(skill.advantage).toBeTruthy();
      SKILLS.addToSkill(skill, { advantage: false });
      expect(skill.advantage).toBeFalsy();
    });

    it("can have disadvantage changed", function () {
      SKILLS.addToSkill(skill, { disadvantage: true });
      expect(skill.disadvantage).toBeTruthy();
      SKILLS.addToSkill(skill, {});
      expect(skill.disadvantage).toBeTruthy();
      SKILLS.addToSkill(skill, { disadvantage: false });
      expect(skill.disadvantage).toBeFalsy();
    });

    it("can have fixed changed, always keeping the best (not the last)", function () {
      expect(skill.fixed).toBeUndefined();
      SKILLS.addToSkill(skill, { fixed: 3 });
      expect(skill.fixed).toEqual(3);
      SKILLS.addToSkill(skill, {});
      expect(skill.fixed).toEqual(3);
      SKILLS.addToSkill(skill, { fixed: 2 });
      expect(skill.fixed).toEqual(3);
      SKILLS.addToSkill(skill, { fixed: 4 });
      expect(skill.fixed).toEqual(4);
    });

    it("can have bonus changed, always adding", function () {
      expect(skill.bonus).toBeUndefined();
      SKILLS.addToSkill(skill, { bonus: 1 });
      expect(skill.bonus).toEqual(1);
      SKILLS.addToSkill(skill, {});
      expect(skill.bonus).toEqual(1);
      SKILLS.addToSkill(skill, { bonus: 1 });
      expect(skill.bonus).toEqual(2);
      SKILLS.addToSkill(skill, { bonus: -1 });
      expect(skill.bonus).toEqual(1);
      SKILLS.addToSkill(skill, { bonus: 2 });
      expect(skill.bonus).toEqual(3);
    });

    it("can be set to always succeed", function () {
      expect(skill.succeed).toBeUndefined();
      SKILLS.addToSkill(skill, { succeed: true });
      expect(skill.succeed).toBeTruthy();
      SKILLS.addToSkill(skill, {});
      expect(skill.succeed).toBeTruthy();
      SKILLS.addToSkill(skill, { succeed: false });
      expect(skill.succeed).toBeFalsy();
    });

    it("can be set to always fail", function () {
      expect(skill.fail).toBeUndefined();
      SKILLS.addToSkill(skill, { fail: true });
      expect(skill.fail).toBeTruthy();
      SKILLS.addToSkill(skill, {});
      expect(skill.fail).toBeTruthy();
      SKILLS.addToSkill(skill, { fail: false });
      expect(skill.fail).toBeFalsy();
    });

    // TODO - Why?
    // it("can get arbitrary members", function () {
    //   expect(skill.arbitrary).toBeUndefined();
    //   SKILLS.addToSkill(skill, { arbitrary: 3 });
    //   expect(skill.arbitrary).toEqual(3);
    // });

    it("can be compared with a plain object", function () {
      skill = SKILLS.makeSkill(true, true);
      expect(skill).toMatchObject({ has: true, advantage: true });
    });

    // TODO - add cursed adjustments
    // - has prefers false if cursed
    // - advantage prefers false if cursed
    // - disadvantage prefers true if cursed
    // - fixed prefers lower if cursed
    // - bonus works the same
  });

  describe("Tracker", function () {
    let skills: SKILLS.SkillsTracker;

    beforeEach(() => {
      skills = new SKILLS.SkillsTracker();
      skills.add("hide");
    });

    it("allows adding base skills", function () {
      expect(skills.get("test")).toBeNull();
      skills.add("test");
      expect(skills.get("test")).toMatchObject({ has: true });

      skills.add("test2", true);
      expect(skills.get("test2")).toMatchObject({ has: true, advantage: true });
    });

    describe("adjust", function () {
      it("allows adjustment of non-existing skills", function () {
        expect(skills.get("missing")).toBeNull();
        skills.adjust("missing", { disadvantage: true });
        expect(skills.get("missing")).toMatchObject({ disadvantage: true });
      });

      // it("allows adjustments", function () {
      //   let adjustment = { skill: "hide", advantage: true };
      //   expect(skills.get("hide")!.advantage).toBeFalsy();
      //   skills.adjust(adjustment);
      //   expect(skills.get("hide")!.advantage).toBeTruthy();
      //   skills.clearAdjustment(adjustment);
      // });

      it("adjusts with name member", function () {
        let adjustment = { name: "hide", advantage: true };
        expect(skills.get("hide")!.advantage).toBeFalsy();
        skills.adjust(adjustment);
        expect(skills.get("hide")!.advantage).toBeTruthy();
        skills.clearAdjustment(adjustment);
      });

      it("adjusts with name and number", function () {
        expect(skills.get("hide")!.bonus).toBeUndefined();
        skills.adjust("hide", 1);
        expect(skills.get("hide")!.bonus).toEqual(1);
        skills.clearAdjustment("hide", 1);
        expect(skills.get("hide")!.bonus).toBeUndefined();
      });

      it("adjusts with name and true", function () {
        expect(skills.get("martial")).toBeNull();
        skills.adjust("martial", true);
        expect(skills.get("martial")).toEqual({ has: true });
        skills.clearAdjustment("martial", true);
        expect(skills.get("martial")).toEqual({});
      });

      it("adjusts with name and object", function () {
        expect(skills.get("hide")!.bonus).toBeUndefined();
        skills.adjust("hide", { bonus: 1 });
        expect(skills.get("hide")!.bonus).toEqual(1);
        skills.clearAdjustment("hide", { bonus: 1 });
        expect(skills.get("hide")!.bonus).toBeUndefined();
      });

      it("adjusts with object of values", function () {
        expect(skills.get("hide")!.bonus).toBeUndefined();
        skills.adjustSet({ hide: 1 });
        expect(skills.get("hide")!.bonus).toEqual(1);
        skills.clearAdjustmentSet({ hide: 1 });
        expect(skills.get("hide")!.bonus).toBeUndefined();
      });

      it("adjusts to give and remove a skill", function () {
        expect(skills.get("martial")).toBeNull();
        skills.adjustSet({ martial: true });
        expect(skills.get("martial")).toEqual({ has: true });
        skills.clearAdjustmentSet({ martial: true });
        expect(skills.get("martial")).toEqual({});
      });

      it("adjusts with name and object", function () {
        expect(skills.get("hide")!.bonus).toBeUndefined();
        skills.adjustSet({ hide: { bonus: 1 } });
        expect(skills.get("hide")!.bonus).toEqual(1);
        skills.clearAdjustmentSet({ hide: { bonus: 1 } });
        expect(skills.get("hide")!.bonus).toBeUndefined();
      });

      it("adjusts all saves", function () {
        expect(skills.get("saves")).toBeNull();
        skills.adjustSet({ saves: 1 });
        expect(skills.get("saves")!.bonus).toEqual(1);
        skills.clearAdjustmentSet({ saves: 1 });
        expect(skills.get("saves")!.bonus).toBeUndefined();
      });

      // TODO - arbitrary values?
      // it("can adjust things to false", function () {
      //   expect(skills.get("defense")).toBeUndefined();
      //   skills.adjust({ defense: { criticalDamage: false } });
      //   expect(skills.get("defense")!.criticalDamage).toEqual(false);
      //   skills.clearAdjustment({ defense: { criticalDamage: false } });
      //   expect(skills.get("defense")!.criticalDamage).toBeUndefined();
      // });

      it("can adjust things to false", function () {
        expect(skills.get("defense", "critical")).toBeNull();
        skills.adjustSet({ "defense.critical": { bonus: 1 } });
        skills.adjustSet({ "defense.critical": { bonus: 1 } });
        expect(skills.get("defense", "critical")!.bonus).toEqual(2);
        skills.clearAdjustmentSet({ "defense.critical": { bonus: 1 } });
        expect(skills.get("defense", "critical")!.bonus).toEqual(1);
        skills.clearAdjustmentSet({ "defense.critical": { bonus: 1 } });
        expect(skills.get("defense", "critical")!.bonus).toBeUndefined();
      });
    });

    // it('allows changing base', function() {
    //   let adjustment = { skill: 'hide', advantage: true };
    //   expect(skills.get('hide').advantage).toBeFalsy();
    //   skills.change(adjustment);
    //   expect(skills.get('hide').advantage).toBeTruthy();
    //   skills.clearAdjustment(adjustment);
    //   expect(skills.get('hide').advantage).toBeTruthy();
    // });

    // TODO - add cursed tests
    // - cursed adjustments get added to front of list
    // - test with 2 adjustments that can only be correct if cursed is first

    // TODO - removeMatching

    describe("sub skills", function () {
      it("allows the addition of sub skills", function () {
        expect(skills.get("athletics")).toBeNull();
        expect(skills.get("athletics", "climb")).toBeNull();
        skills.adjust("athletics", "climb", { bonus: 1 });
        expect(skills.get("athletics", "climb")).toEqual({ bonus: 1 });
        expect(skills.get("athletics")).toBeNull();
        skills.add("athletics");
        expect(skills.get("athletics", "climb")).toMatchObject({
          bonus: 1,
          has: true,
        });
        expect(skills.get("athletics")).toMatchObject({ has: true });
        skills.clearAdjustment("athletics", "climb", { bonus: 1 });
        expect(skills.get("athletics", "climb")).toMatchObject({
          has: true,
        });
      });

      it("sub overrides main for booleans", function () {
        expect(skills.get("athletics")).toBeNull();
        expect(skills.get("athletics", "climb")).toBeNull();
        skills.adjust("athletics.climb", { bonus: 1, advantage: true });
        expect(skills.get("athletics", "climb")).toMatchObject({ bonus: 1 });
        expect(skills.get("athletics")).toBeNull();
        skills.add("athletics", false);
        expect(skills.get("athletics", "climb")).toEqual({
          bonus: 1,
          has: true,
          advantage: true,
        });
        expect(skills.get("athletics")).toMatchObject({
          has: true,
          advantage: false,
        });
      });

      it("bonus is additive", function () {
        expect(skills.get("athletics")).toBeNull();
        expect(skills.get("athletics", "climb")).toBeNull();
        skills.adjust("athletics", "climb", { bonus: 1 });
        expect(skills.get("athletics", "climb")).toEqual({ bonus: 1 });
        expect(skills.get("athletics")).toBeNull();
        skills.add("athletics", false);
        skills.adjust("athletics", { bonus: 1 });
        expect(skills.get("athletics", "climb")).toEqual({
          bonus: 2,
          has: true,
          advantage: false,
        });
        expect(skills.get("athletics")).toMatchObject({ bonus: 1, has: true });
      });
    });
  });
});
