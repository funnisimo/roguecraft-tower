import * as STATS from "./stats";

describe("RL.Fields.Stats", function () {
  describe("Tracker", function () {
    let stat: string;
    let stats: STATS.StatTracker;

    beforeEach(() => {
      stats = new STATS.StatTracker();
      stat = "test";
    });

    it("initializes to 0", function () {
      stats.add(stat);
      expect(stats.value(stat)).toEqual(0);
      expect(stats.max(stat)).toEqual(0);
      expect(stats.rate(stat)).toEqual(0);
    });

    it("can be set with value", function () {
      stats.add(stat, 10);
      expect(stats.value(stat)).toEqual(10);
      expect(stats.max(stat)).toEqual(10);
      expect(stats.rate(stat)).toEqual(0);
    });

    it("can be set with v, m, r", function () {
      stats.add(stat, 10, 20, 1);
      expect(stats.value(stat)).toEqual(10);
      expect(stats.max(stat)).toEqual(20);
      expect(stats.rate(stat)).toEqual(1);
    });

    it("can be set with an object", function () {
      stats.add(stat, { value: 10, max: 20, rate: 1 });
      expect(stats.value(stat)).toEqual(10);
      expect(stats.max(stat)).toEqual(20);
      expect(stats.rate(stat)).toEqual(1);
    });

    it("can be adjusted", function () {
      stats.add(stat, 10);
      stats.adjust(stat, -5);
      expect(stats.value(stat)).toEqual(5);

      expect(stats.max(stat)).toEqual(10);
      stats.adjust(stat, 10); // keeps to max
      expect(stats.value(stat)).toEqual(10);
    });

    test("can set values", () => {
      stats.add(stat, 100);
      expect(stats.value(stat)).toEqual(100);
      expect(stats.max(stat)).toEqual(100);
      expect(stats.rate(stat)).toEqual(0);

      stats.set(stat, 50, 75, 1);
      expect(stats.value(stat)).toEqual(50);
      expect(stats.max(stat)).toEqual(75);
      expect(stats.rate(stat)).toEqual(1);

      stats.set(stat, 60, true);
      expect(stats.value(stat)).toEqual(60);
      expect(stats.max(stat)).toEqual(75); // NO CHANGE
      expect(stats.rate(stat)).toEqual(1);

      stats.set(stat, 100, true);
      expect(stats.value(stat)).toEqual(100);
      expect(stats.max(stat)).toEqual(100); // CHANGED B/C VALUE > MAX
      expect(stats.rate(stat)).toEqual(1);
    });

    it("can have max set, with pull of value", function () {
      stats.set(stat, { max: 20, value: true });
      expect(stats.max(stat)).toEqual(20);
      expect(stats.value(stat)).toEqual(20);

      stats.set(stat, 15);
      stats.set(stat, { max: 30, value: false });
      expect(stats.max(stat)).toEqual(30);
      expect(stats.value(stat)).toEqual(15);

      stats.set(stat, { max: 40 });
      expect(stats.max(stat)).toEqual(40);
      expect(stats.value(stat)).toEqual(15);
    });

    it("can be adjusted over max", function () {
      stats.set(stat, { max: 20, value: true });
      expect(stats.max(stat)).toEqual(20);
      expect(stats.value(stat)).toEqual(20);

      stats.adjust(stat, { over: 10 });
      expect(stats.max(stat)).toEqual(20);
      expect(stats.value(stat)).toEqual(30);

      stats.adjust(stat, { over: -5 });
      expect(stats.max(stat)).toEqual(20);
      expect(stats.value(stat)).toEqual(25);

      stats.reset(stat);
      expect(stats.value(stat)).toEqual(20);

      stats.adjust(stat, { over: -5 });
      expect(stats.max(stat)).toEqual(20);
      expect(stats.value(stat)).toEqual(20);
    });

    it("can be adjusted down to 0", function () {
      stats.add("health", 0.6);
      expect(stats.value("health")).toEqual(0.6);

      expect(stats.adjust("health", -1)).toEqual(-1);
      expect(stats.value("health")).toEqual(0);
    });

    it("can reset a stat with an adjustment", function () {
      stats.add("energy", 100);
      stats.adjust("energy", -25);

      expect(stats.value("energy")).toEqual(75);
      stats.adjust("energy", { reset: true });
      expect(stats.value("energy")).toEqual(100);
    });

    it("can be adjusted various ways", function () {
      stats = new STATS.StatTracker({ energy: 100, mana: 100 });
      expect(stats.value("energy")).toEqual(100);
      expect(stats.value("mana")).toEqual(100);

      stats.adjust("energy", { value: -25 });
      stats.adjust("mana", -10);
      stats.adjust("energy", -10);

      expect(stats.value("energy")).toEqual(65);
      expect(stats.value("mana")).toEqual(90);
    });

    it("can be setup", function () {
      stats.init({ health: 200, mana: 300 });

      expect(stats.value("health")).toEqual(200);
      expect(stats.value("mana")).toEqual(300);
    });
  });
});
