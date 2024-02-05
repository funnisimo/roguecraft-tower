import "jest-extended";

import * as TILE from "../tile";
import * as LEVEL from ".";
import { Game } from "../game";
import * as PLUGINS from "../plugins";

describe("Level", () => {
  beforeAll(() => {
    TILE.installSet(TILE.default_tiles);
  });

  test("make w/ opts.on.create", () => {
    const createFn = jest.fn();

    const game = {} as Game;

    const kind = LEVEL.makeKind({
      id: "TEST",
      width: 30,
      height: 20,
      dig: {
        rooms: { count: 10, first: "FIRST_ROOM", digger: "PROFILE" },
        halls: { chance: 50 },
        loops: { minDistance: 30, maxLength: 5 },
        stairs: {
          start: "down",
          up: true,
          // upTile: "UP_STAIRS_INACTIVE",
          down: true,
        },
        goesUp: true,
      },
    });

    const factory = new LEVEL.LevelFactory();
    factory.use(PLUGINS.dig_level.level);

    // TODO - Figure out how to set 'start' location in opts so that the stairs match
    const opts = {
      on: { create: createFn },
      seed: 12345,
    };
    const level = factory.create(game, 1, kind, opts);

    expect(createFn).toHaveBeenCalledWith(level, opts);
    expect(level.locations).toMatchObject({
      start: [15, 18],
      up: [4, 18],
      end: [4, 18],
      down: [15, 18],
    });
  });

  test("make w/ kind.on.create", () => {
    const createFn = jest.fn();

    const game = {} as Game;

    // Uses default dig
    const kind = LEVEL.makeKind({
      id: "TEST",
      width: 30,
      height: 20,
      dig: true,
      on: { create: createFn },
    });

    const factory = new LEVEL.LevelFactory();
    factory.use(PLUGINS.dig_level.level);

    // TODO - Figure out how to set 'start' location in opts so that the stairs match
    const opts = {
      seed: 12345,
    };
    const level = factory.create(game, 1, kind, opts);

    expect(createFn).toHaveBeenCalledWith(level, opts);
    expect(level.locations).toMatchObject({
      start: [15, 18],
      up: [4, 18],
      end: [4, 18],
      down: [15, 18],
    });
  });
});
