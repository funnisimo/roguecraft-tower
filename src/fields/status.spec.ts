import "jest-extended";
import * as STATUS from "./status";

describe("RL.Status", function () {
  let status: STATUS.StatusTracker;

  beforeEach(() => {
    status = new STATUS.StatusTracker();
  });

  describe("Counts", function () {
    it("setCount", async function () {
      const done = jest.fn();

      expect(status.isActive("test")).toBeFalsy();
      expect(status.setCount("test", 2, done)).toBeTruthy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.decrement("test")).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(done).not.toHaveBeenCalled();
      expect(status.decrement("test")).toBeTruthy();
      expect(status.isActive("test")).toBeFalsy();
      expect(done).toHaveBeenCalled();
    });

    it("setCount is max of value or count", async function () {
      const done = jest.fn();

      expect(status.isActive("test")).toBeFalsy();
      expect(status.setCount("test", 2, done)).toBeTruthy();
      expect(status.setCount("test", 1, done)).toBeFalsy();
      expect(status.isActive("test")).toBeTrue();
      expect(status.decrement("test")).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(done).not.toHaveBeenCalled();
      expect(status.decrement("test")).toBeTruthy();
      expect(status.isActive("test")).toBeFalsy();
      expect(done).toHaveBeenCalled();
    });

    it("increment", async function () {
      const done = jest.fn();

      expect(status.isActive("test")).toBeFalsy();
      expect(status.increment("test", 2, done)).toBeTruthy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.decrement("test")).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(done).not.toHaveBeenCalled();
      expect(status.decrement("test")).toBeTruthy();
      expect(status.isActive("test")).toBeFalsy();
      expect(done).toHaveBeenCalled();
    });

    it("double setCount", async function () {
      const done = jest.fn();
      const done2 = jest.fn();

      expect(status.isActive("test")).toBeFalsy();
      expect(status.setCount("test", 4, done)).toBeTruthy();
      expect(status.setCount("test", 2, done2)).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.decrement("test")).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(done).not.toHaveBeenCalled();
      expect(done2).not.toHaveBeenCalled();
      expect(status.decrement("test")).toBeFalsy();
      expect(status.decrement("test", 2)).toBeTruthy();
      expect(status.isActive("test")).toBeFalsy();
      expect(done).toHaveBeenCalled();
      expect(done2).not.toHaveBeenCalled();
    });

    it("double increment", async function () {
      const done = jest.fn();
      const done2 = jest.fn();

      expect(status.isActive("test")).toBeFalsy();
      expect(status.increment("test", 1, done)).toBeTruthy();
      expect(status.increment("test", 1, done2)).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.decrement("test")).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(done).not.toHaveBeenCalled();
      expect(done2).not.toHaveBeenCalled();
      expect(status.decrement("test")).toBeTruthy();
      expect(status.isActive("test")).toBeFalsy();
      expect(done).toHaveBeenCalled();
      expect(done2).not.toHaveBeenCalled();
    });

    it("clearCount", async function () {
      const done = jest.fn();

      expect(status.isActive("test")).toBeFalsy();
      expect(status.setCount("test", 2, done)).toBeTruthy();
      expect(status.isActive("test")).toBeTruthy();
      expect(done).not.toHaveBeenCalled();
      expect(status.clearCount("test")).toBeTruthy();
      expect(status.isActive("test")).toBeFalsy();
      expect(done).toHaveBeenCalled();
    });
  });

  describe("On/Off", function () {
    it("can be turned on and off", async function () {
      const done = jest.fn();
      const done2 = jest.fn();

      expect(status.isActive("test")).toBeFalsy();
      expect(status.setOn("test", done)).toBeTruthy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.setOn("test", done2)).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.setOff("test")).toBeTruthy();
      expect(done).toHaveBeenCalled();
      expect(done2).not.toHaveBeenCalled();
      expect(status.isActive("test")).toBeFalsy();
      expect(status.setOff("test")).toBeFalsy();
    });
  });

  describe("Time", function () {
    it("setTime", async function () {
      const done = jest.fn();

      expect(status.isActive("test")).toBeFalsy();
      expect(status.setTime("test", 10, done)).toBeTruthy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.removeTime("test", 2)).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.removeTime("test", 10)).toBeTruthy();
      expect(status.isActive("test")).toBeFalsy();
      expect(done).toHaveBeenCalled();
    });

    it("sets to max of set and current", async function () {
      const done = jest.fn();

      expect(status.isActive("test")).toBeFalsy();
      expect(status.setTime("test", 5, done)).toBeTruthy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.removeTime("test", 2)).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.setTime("test", 5, done)).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.setTime("test", 10, done)).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.setTime("test", 5, done)).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.removeTime("test", 6)).toBeFalsy();
      expect(status.removeTime("test", 10)).toBeTruthy();
      expect(status.isActive("test")).toBeFalsy();
      expect(done).toHaveBeenCalled();
    });

    it("addTime", async function () {
      const done = jest.fn();
      const done2 = jest.fn();

      expect(status.isActive("test")).toBeFalsy();
      expect(status.addTime("test", 5, done)).toBeTruthy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.addTime("test", 5, done)).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.removeTime("test", 6)).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(done).not.toHaveBeenCalled();
      expect(done2).not.toHaveBeenCalled();
      expect(status.removeTime("test", 10)).toBeTruthy();
      expect(status.isActive("test")).toBeFalsy();
      expect(done).toHaveBeenCalled();
      expect(done2).not.toHaveBeenCalled();
    });

    it("clearTime", async function () {
      const done = jest.fn();

      expect(status.isActive("test")).toBeFalsy();
      expect(status.clearTime("test")).toBeFalsy();
      expect(status.setTime("test", 10, done)).toBeTruthy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.removeTime("test", 2)).toBeFalsy();
      expect(status.isActive("test")).toBeTruthy();
      expect(status.clearTime("test")).toBeTruthy();
      expect(status.isActive("test")).toBeFalsy();
      expect(done).toHaveBeenCalled();
    });

    it("decayAllTimes", async function () {
      const doneApple = jest.fn();
      const doneBanana = jest.fn();

      expect(status.isActive("apple")).toBeFalsy();
      expect(status.isActive("banana")).toBeFalsy();
      expect(status.setTime("apple", 5, doneApple)).toBeTruthy();
      expect(status.setTime("banana", 10, doneBanana)).toBeTruthy();

      expect(status.isActive("apple")).toBeTruthy();
      expect(status.isActive("banana")).toBeTruthy();

      expect(status.decayAllTimes(3)).toBeFalsy();
      expect(status.decayAllTimes(3)).toEqual({ apple: false });
      expect(doneApple).toHaveBeenCalled();
      expect(doneBanana).not.toHaveBeenCalled();
      expect(status.isActive("apple")).toBeFalsy();
      expect(status.isActive("banana")).toBeTruthy();
      expect(status.decayAllTimes(8)).toEqual({ banana: false });
      expect(doneBanana).toHaveBeenCalled();
      expect(status.isActive("apple")).toBeFalsy();
      expect(status.isActive("banana")).toBeFalsy();
    });
  });

  describe("Status", function () {
    let flag: string;

    beforeEach(() => {
      flag = "test";
    });

    describe("constructor", function () {
      it("is defaulted to off", function () {
        expect(status.isActive(flag)).toBeFalsy();
      });

      it("can be set with no value", function () {
        status.setOn(flag);
        expect(status.isActive(flag)).toBeTruthy();
      });

      // it('can be constructed with a boolean value', function() {
      //   status.setOn(flag, true);
      //   expect(status.isActive(flag)).toBeTruthy();
      //
      //   status.setOn(flag, false);
      //   expect(status.isActive(flag)).toBeFalsy();
      // });

      it("can be added with no value", function () {
        status.addTime(flag);
        expect(status.isActive(flag)).toBeTruthy();
        status.removeTime(flag);
        expect(status.isActive(flag)).toBeFalsy();
      });

      // it('can be constructed with an object', function() {
      //   status.addTime(flag, { set: true });
      //   expect(status.isActive(flag)).toBeTruthy();
      //
      //   status.addTime( flag, { set: false });
      //   expect(status.isActive(flag)).toBeFalsy();
      //
      //   status.addTime(flag, { time: 1 });
      //   expect(status.isActive(flag)).toBeTruthy();
      //
      //   status.addTime(flag, { time: [1,10] });
      //   expect(status.isActive(flag)).toBeTruthy();
      //
      //   status.addTime(flag, { time: 0 });
      //   expect(status.isActive(flag)).toBeFalsy();
      // });

      it("can be constructed with a done fn", function () {
        let fn = jest.fn();
        status.addTime(flag, 1, fn);

        expect(fn).not.toHaveBeenCalled();
        expect(status.isActive(flag)).toBeTrue();
        status.removeTime(flag); // need to do it twice b/c of issues with where decay gets called in the framework.
        expect(status.isActive(flag)).toBeFalse();
        expect(fn).toHaveBeenCalled();
      });

      // it('allows the decay function in the opts', function() {
      //   let fn = jest.fn();
      //   status.addTime(flag, { time: 1, done: fn } });
      //
      //   expect(fn).not.toHaveBeenCalled();
      //   expect(status.isActive(flag)).toBeTruthy();
      //   status.decay(); // need to do it twice b/c of issues with where decay gets called in the framework.
      //   status.decay();
      //   expect(status.isActive(flag)).toBeFalsy();
      //   expect(fn).toHaveBeenCalled();
      // });
    });

    describe("increment", function () {
      it("allows incrment/decrement of count", function () {
        let fn = jest.fn();

        expect(status.isActive(flag)).toBeFalsy();
        status.increment(flag, 2, fn);
        expect(status.isActive(flag)).toBeTrue();
        status.decrement(flag);
        expect(status.isActive(flag)).toBeTrue();
        status.decrement(flag);
        expect(status.isActive(flag)).toBeFalse();
        expect(fn).toHaveBeenCalled();
      });
    });

    describe("clear", function () {
      it("can clear set", function () {
        status.setOn(flag);
        expect(status.isActive(flag)).toBeTruthy();
        status.setOff(flag);
        expect(status.isActive(flag)).toBeFalsy();
      });

      // it('can clear set', function() {
      //   status.adjust(flag, true);
      //   expect(status.isActive(flag)).toBeTruthy();
      //   status.setOff(flag, { set: true });
      //   expect(status.isActive(flag)).toBeFalsy();
      //
      //   status.adjust(flag, true);
      //   expect(status.isActive(flag)).toBeTruthy();
      //   status.setOff(flag, 'set');
      //   expect(status.isActive(flag)).toBeFalsy();
      // });
      //
      // it('can clear time', function() {
      //   status.adjust(flag, 10);
      //   expect(status.isActive(flag)).toBeTruthy();
      //   status.setOff(flag, { time: true });
      //   expect(status.isActive(flag)).toBeFalsy();
      //
      //   status.adjust(flag, 10);
      //   expect(status.isActive(flag)).toBeTruthy();
      //   status.setOff(flag, 'time');
      //   expect(status.isActive(flag)).toBeFalsy();
      // });
    });
  });

  describe("Flags", function () {
    let done: jest.Mock;

    beforeEach(() => {
      done = jest.fn();
    });

    it("can add and remove status", function () {
      for (let x = 0; x < 10; ++x) {
        done.mockClear();
        let a = status.isActive("test");
        let r = status.addTime("test", 20, done);
        expect(r).toBeTruthy();
        let b = status.isActive("test");
        status.clearTime("test");
        expect(done).toHaveBeenCalled();
        expect(status.isActive("test")).toBeFalsy();
      }
    });

    it("can add and remove multiple times", function () {
      expect(status.addTime("test", 3, done)).toBeTruthy();
      expect(status.removeTime("test")).toBeFalsy();
      expect(done).not.toHaveBeenCalled();
      expect(status.removeTime("test")).toBeFalsy();
      expect(done).not.toHaveBeenCalled();
      expect(status.removeTime("test")).toBeTruthy();
      expect(done).toHaveBeenCalled();
    });
  });
});
