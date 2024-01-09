(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('gw-utils')) :
    typeof define === 'function' && define.amd ? define(['exports', 'gw-utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.GWD = {}, global.GWU));
})(this, (function (exports, GWU) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var GWU__namespace = /*#__PURE__*/_interopNamespace(GWU);

    const tileIds = {};
    const allTiles = [];
    function installTile(id, opts = {}) {
        if (typeof id !== 'string') {
            opts = id;
            id = id.id;
        }
        const base = { id, index: allTiles.length, priority: 0, tags: [] };
        opts.extends = opts.extends || id;
        if (opts.extends) {
            const root = getTile(opts.extends);
            if (root) {
                Object.assign(base, root);
            }
            else if (opts.extends !== id) {
                throw new Error('Cannot extend tile: ' + opts.extends);
            }
        }
        const info = GWU__namespace.object.assignOmitting('priority, extends', base, opts);
        info.id = id;
        info.index = allTiles.length;
        if (opts.tags) {
            info.tags = GWU__namespace.tags.make(opts.tags);
        }
        if (typeof opts.priority === 'string') {
            let text = opts.priority.replace(/ /g, '');
            let index = text.search(/[+-]/);
            if (index == 0) {
                info.priority = info.priority + Number.parseInt(text);
            }
            else if (index == -1) {
                if (text.search(/[a-zA-Z]/) == 0) {
                    const tile = getTile(text);
                    if (!tile)
                        throw new Error('Failed to find tile for priority - ' + text + '.');
                    info.priority = tile.priority;
                }
                else {
                    info.priority = Number.parseInt(text);
                }
            }
            else {
                const id = text.substring(0, index);
                const delta = Number.parseInt(text.substring(index));
                const tile = getTile(id);
                if (!tile)
                    throw new Error('Failed to find tile for priority - ' + id + '.');
                info.priority = tile.priority + delta;
            }
        }
        else if (opts.priority !== undefined) {
            info.priority = opts.priority;
        }
        if (info.blocksPathing === undefined) {
            if (info.blocksMove) {
                info.blocksPathing = true;
            }
        }
        if (tileIds[id]) {
            info.index = tileIds[id];
            allTiles[info.index] = info;
        }
        else {
            allTiles.push(info);
            tileIds[id] = info.index;
        }
        return info;
    }
    function getTile(name) {
        if (typeof name === 'string') {
            name = tileIds[name];
        }
        return allTiles[name];
    }
    function tileId(name) {
        var _a;
        if (typeof name === 'number')
            return name;
        return (_a = tileIds[name]) !== null && _a !== void 0 ? _a : -1;
    }
    function blocksMove(name) {
        const info = getTile(name);
        return info.blocksMove || false;
    }
    tileIds['NOTHING'] = tileIds['NULL'] = installTile('NONE', {
        priority: 0,
        ch: '',
    }).index;
    installTile('FLOOR', { priority: 10, ch: '.' });
    installTile('WALL', {
        blocksMove: true,
        blocksVision: true,
        priority: 50,
        ch: '#',
    });
    installTile('DOOR', {
        blocksVision: true,
        door: true,
        priority: 60,
        ch: '+',
    });
    installTile('SECRET_DOOR', {
        blocksMove: true,
        secretDoor: true,
        priority: 70,
        ch: '%',
    });
    installTile('UP_STAIRS', {
        stairs: true,
        priority: 80,
        ch: '>',
    });
    installTile('DOWN_STAIRS', {
        stairs: true,
        priority: 80,
        ch: '<',
    });
    tileIds['DEEP'] = installTile('LAKE', {
        priority: 40,
        liquid: true,
        ch: '~',
    }).index;
    installTile('SHALLOW', { priority: 30, ch: '`' });
    installTile('BRIDGE', { priority: 45, ch: '=' }); // layers help here
    installTile('IMPREGNABLE', {
        priority: 200,
        ch: '%',
        impregnable: true,
        blocksMove: true,
        blocksVision: true,
    });

    const features = {};
    function install$3(name, fn) {
        if (typeof fn !== 'function') {
            fn = make$1(fn);
        }
        features[name] = fn;
    }
    const types = {};
    function installType(name, fn) {
        types[name] = fn;
    }
    // FEATURE TYPE
    function feature(id) {
        if (Array.isArray(id))
            id = id[0];
        if (id && typeof id !== 'string') {
            id = id.id;
        }
        if (!id || !id.length)
            throw new Error('Feature effect needs ID');
        return featureFeature.bind(undefined, id);
    }
    function featureFeature(id, site, x, y) {
        const feat = features[id];
        if (!feat) {
            throw new Error('Failed to find feature: ' + id);
        }
        return feat(site, x, y);
    }
    installType('feature', feature);
    installType('effect', feature);
    installType('id', feature);
    function make$1(id, config) {
        if (!id)
            return GWU__namespace.FALSE;
        if (typeof id === 'string') {
            if (!id.length)
                throw new Error('Cannot create effect from empty string.');
            if (!config) {
                const parts = id.split(':');
                id = parts.shift().toLowerCase();
                config = parts;
            }
            // string with no parameters is interpreted as id of registered feature
            if (config.length === 0) {
                config = id;
                id = 'feature';
            }
            const handler = types[id];
            if (!handler)
                throw new Error('Failed to find effect - ' + id);
            return handler(config || {});
        }
        let steps;
        if (Array.isArray(id)) {
            steps = id
                .map((config) => make$1(config))
                .filter((a) => a !== null);
        }
        else if (typeof id === 'function') {
            return id;
        }
        else {
            steps = Object.entries(id)
                .map(([key, config]) => make$1(key, config))
                .filter((a) => a !== null);
        }
        if (steps.length === 1) {
            return steps[0];
        }
        return (site, x, y) => {
            return steps.every((step) => step(site, x, y));
        };
    }
    function makeArray(cfg) {
        if (!cfg)
            return [];
        if (Array.isArray(cfg)) {
            return cfg
                .map((c) => make$1(c))
                .filter((fn) => fn !== null);
        }
        if (typeof cfg === 'string') {
            if (!cfg.length)
                throw new Error('Cannot create effect from empty string.');
            const parts = cfg.split(':');
            cfg = parts.shift().toLowerCase();
            const handler = types[cfg];
            if (!handler)
                return [];
            return [handler(parts)];
        }
        else if (typeof cfg === 'function') {
            return [cfg];
        }
        const steps = Object.entries(cfg).map(([key, config]) => make$1(key, config));
        return steps.filter((s) => s !== null);
    }

    function tile(src) {
        if (!src)
            throw new Error('Tile effect needs configuration.');
        if (typeof src === 'string') {
            src = { id: src };
        }
        else if (Array.isArray(src)) {
            src = { id: src[0] };
        }
        else if (!src.id) {
            throw new Error('Tile effect needs configuration with id.');
        }
        const opts = src;
        if (opts.id.includes('!')) {
            opts.superpriority = true;
        }
        if (opts.id.includes('~')) {
            opts.blockedByActors = true;
            opts.blockedByItems = true;
        }
        // if (opts.id.includes('+')) {
        //     opts.protected = true;
        // }
        opts.id = opts.id.replace(/[!~+]*/g, '');
        return tileAction.bind(undefined, opts);
    }
    function tileAction(cfg, site, x, y) {
        cfg.machine = 0; // >???<
        if (site.setTile(x, y, cfg.id, cfg)) {
            return true;
        }
        return false;
    }
    installType('tile', tile);

    //////////////////////////////////////////////
    // chance
    function chance(opts) {
        if (Array.isArray(opts)) {
            opts = opts[0];
        }
        if (typeof opts === 'object') {
            opts = opts.chance;
        }
        if (typeof opts === 'string') {
            if (opts.endsWith('%')) {
                opts = Number.parseFloat(opts) * 100;
            }
            else {
                opts = Number.parseInt(opts || '10000');
            }
        }
        if (typeof opts !== 'number') {
            throw new Error('Chance effect config must be number or string that can be a number.');
        }
        return chanceAction.bind(undefined, opts);
    }
    function chanceAction(cfg, site) {
        return site.rng.chance(cfg, 10000);
    }
    installType('chance', chance);

    const Fl$2 = GWU__namespace.flag.fl;
    ///////////////////////////////////////////////////////
    // TILE EVENT
    var Flags$2;
    (function (Flags) {
        // E_ALWAYS_FIRE = Fl(10), // Fire even if the cell is marked as having fired this turn
        // E_NEXT_ALWAYS = Fl(0), // Always fire the next effect, even if no tiles changed.
        // E_NEXT_EVERYWHERE = Fl(1), // next effect spawns in every cell that this effect spawns in, instead of only the origin
        // E_FIRED = Fl(2), // has already been fired once
        // E_NO_MARK_FIRED = Fl(3), // Do not mark this cell as having fired an effect (so can log messages multiple times)
        // MUST_REPLACE_LAYER
        // NEEDS_EMPTY_LAYER
        // E_PROTECTED = Fl(4),
        // E_NO_REDRAW_CELL = Fl(),
        Flags[Flags["E_TREAT_AS_BLOCKING"] = Fl$2(5)] = "E_TREAT_AS_BLOCKING";
        Flags[Flags["E_PERMIT_BLOCKING"] = Fl$2(6)] = "E_PERMIT_BLOCKING";
        Flags[Flags["E_ABORT_IF_BLOCKS_MAP"] = Fl$2(7)] = "E_ABORT_IF_BLOCKS_MAP";
        Flags[Flags["E_BLOCKED_BY_ITEMS"] = Fl$2(8)] = "E_BLOCKED_BY_ITEMS";
        Flags[Flags["E_BLOCKED_BY_ACTORS"] = Fl$2(9)] = "E_BLOCKED_BY_ACTORS";
        Flags[Flags["E_BLOCKED_BY_OTHER_LAYERS"] = Fl$2(10)] = "E_BLOCKED_BY_OTHER_LAYERS";
        Flags[Flags["E_SUPERPRIORITY"] = Fl$2(11)] = "E_SUPERPRIORITY";
        Flags[Flags["E_IGNORE_FOV"] = Fl$2(12)] = "E_IGNORE_FOV";
        // E_SPREAD_CIRCLE = Fl(13), // Spread in a circle around the spot (using FOV), radius calculated using spread+decrement
        // E_SPREAD_LINE = Fl(14), // Spread in a line in one random direction
        Flags[Flags["E_EVACUATE_CREATURES"] = Fl$2(15)] = "E_EVACUATE_CREATURES";
        Flags[Flags["E_EVACUATE_ITEMS"] = Fl$2(16)] = "E_EVACUATE_ITEMS";
        Flags[Flags["E_BUILD_IN_WALLS"] = Fl$2(17)] = "E_BUILD_IN_WALLS";
        Flags[Flags["E_MUST_TOUCH_WALLS"] = Fl$2(18)] = "E_MUST_TOUCH_WALLS";
        Flags[Flags["E_NO_TOUCH_WALLS"] = Fl$2(19)] = "E_NO_TOUCH_WALLS";
        Flags[Flags["E_CLEAR_GROUND"] = Fl$2(21)] = "E_CLEAR_GROUND";
        Flags[Flags["E_CLEAR_SURFACE"] = Fl$2(22)] = "E_CLEAR_SURFACE";
        Flags[Flags["E_CLEAR_LIQUID"] = Fl$2(23)] = "E_CLEAR_LIQUID";
        Flags[Flags["E_CLEAR_GAS"] = Fl$2(24)] = "E_CLEAR_GAS";
        Flags[Flags["E_CLEAR_TILE"] = Fl$2(25)] = "E_CLEAR_TILE";
        Flags[Flags["E_CLEAR_CELL"] = Flags.E_CLEAR_GROUND |
            Flags.E_CLEAR_SURFACE |
            Flags.E_CLEAR_LIQUID |
            Flags.E_CLEAR_GAS] = "E_CLEAR_CELL";
        Flags[Flags["E_ONLY_IF_EMPTY"] = Flags.E_BLOCKED_BY_ITEMS | Flags.E_BLOCKED_BY_ACTORS] = "E_ONLY_IF_EMPTY";
        // E_NULLIFY_CELL = E_NULL_SURFACE | E_NULL_LIQUID | E_NULL_GAS,
        // These should be effect types
        // E_ACTIVATE_DORMANT_MONSTER = Fl(27), // Dormant monsters on this tile will appear -- e.g. when a statue bursts to reveal a monster.
        // E_AGGRAVATES_MONSTERS = Fl(28), // Will act as though an aggravate monster scroll of effectRadius radius had been read at that point.
        // E_RESURRECT_ALLY = Fl(29), // Will bring back to life your most recently deceased ally.
    })(Flags$2 || (Flags$2 = {}));
    function spread(...args) {
        let config = {};
        if (!args.length) {
            throw new Error('Must have config to create spread.');
        }
        if (args.length === 1) {
            if (typeof args[0] === 'string') {
                args = args[0].split(':').map((t) => t.trim());
            }
            else if (Array.isArray(args[0])) {
                args = args[0];
            }
            else {
                Object.assign(config, args[0]);
                args = [config];
            }
        }
        if (args.length >= 3) {
            Object.assign(config, args[3] || {});
            config.grow = Number.parseInt(args[0]);
            config.decrement = Number.parseInt(args[1]);
            config.features = args[2];
        }
        else if (args.length === 2) {
            throw new Error('Must have actions to run for spread.');
        }
        if (typeof config.grow !== 'number')
            config.grow = Number.parseInt(config.grow || 0);
        if (typeof config.decrement !== 'number')
            config.decrement = Number.parseInt(config.decrement || 100);
        config.flags = GWU__namespace.flag.from(Flags$2, config.flags || 0);
        config.matchTile = config.matchTile || '';
        if (typeof config.features === 'string' &&
            // @ts-ignore
            config.features.indexOf(':') < 0) {
            if (tileId(config.features) >= 0) {
                // @ts-ignore
                config.features = 'TILE:' + config.features;
            }
        }
        const action = makeArray(config.features);
        if (!action)
            throw new Error('Failed to make action for spread.');
        config.features = action;
        const fn = spreadFeature.bind(undefined, config);
        fn.config = config;
        return fn;
    }
    installType('spread', spread);
    function spreadFeature(cfg, site, x, y) {
        const abortIfBlocking = !!(cfg.flags & Flags$2.E_ABORT_IF_BLOCKS_MAP);
        const map = site;
        let didSomething = false;
        const spawnMap = GWU__namespace.grid.alloc(map.width, map.height);
        if (!computeSpawnMap(cfg, spawnMap, site, x, y)) {
            GWU__namespace.grid.free(spawnMap);
            return false;
        }
        if (abortIfBlocking && mapDisruptedBy(map, spawnMap)) {
            GWU__namespace.grid.free(spawnMap);
            return false;
        }
        if (cfg.flags & Flags$2.E_EVACUATE_CREATURES) {
            // first, evacuate creatures, so that they do not re-trigger the tile.
            if (evacuateCreatures(map, spawnMap)) {
                didSomething = true;
            }
        }
        if (cfg.flags & Flags$2.E_EVACUATE_ITEMS) {
            // first, evacuate items, so that they do not re-trigger the tile.
            if (evacuateItems(map, spawnMap)) {
                didSomething = true;
            }
        }
        if (cfg.flags & Flags$2.E_CLEAR_CELL) {
            // first, clear other tiles (not base/ground)
            if (clearCells(map, spawnMap, cfg.flags)) {
                didSomething = true;
            }
        }
        spawnMap.update((v) => {
            if (!v)
                return 0;
            return 1;
        });
        cfg.features.forEach((fn, i) => {
            spawnMap.forEach((v, x, y) => {
                if (v !== i + 1)
                    return;
                if (fn(site, x, y)) {
                    didSomething = true;
                    spawnMap[x][y] += 1;
                }
            });
        });
        if (didSomething) {
            didSomething = true;
        }
        GWU__namespace.grid.free(spawnMap);
        return didSomething;
    }
    function mapDisruptedBy(map, blockingGrid, blockingToMapX = 0, blockingToMapY = 0) {
        const walkableGrid = GWU__namespace.grid.alloc(map.width, map.height);
        let disrupts = false;
        // Get all walkable locations after lake added
        GWU__namespace.xy.forRect(map.width, map.height, (i, j) => {
            const lakeX = i + blockingToMapX;
            const lakeY = j + blockingToMapY;
            if (blockingGrid.get(lakeX, lakeY)) {
                if (map.isStairs(i, j)) {
                    disrupts = true;
                }
            }
            else if (!map.blocksMove(i, j)) {
                walkableGrid[i][j] = 1;
            }
        });
        let first = true;
        for (let i = 0; i < walkableGrid.width && !disrupts; ++i) {
            for (let j = 0; j < walkableGrid.height && !disrupts; ++j) {
                if (walkableGrid[i][j] == 1) {
                    if (first) {
                        walkableGrid.floodFill(i, j, 1, 2);
                        first = false;
                    }
                    else {
                        disrupts = true;
                    }
                }
            }
        }
        // console.log('WALKABLE GRID');
        // walkableGWU.grid.dump();
        GWU__namespace.grid.free(walkableGrid);
        return disrupts;
    }
    // Spread
    function cellIsOk(effect, map, x, y, isStart) {
        if (!map.hasXY(x, y))
            return false;
        if (map.isProtected(x, y))
            return false;
        if (map.blocksEffects(x, y) && !effect.matchTile && !isStart) {
            return false;
        }
        if (effect.flags & Flags$2.E_BUILD_IN_WALLS) {
            if (!map.isWall(x, y))
                return false;
        }
        else if (effect.flags & Flags$2.E_MUST_TOUCH_WALLS) {
            let ok = false;
            GWU__namespace.xy.eachNeighbor(x, y, (i, j) => {
                if (map.isWall(i, j)) {
                    ok = true;
                }
            }, true);
            if (!ok)
                return false;
        }
        else if (effect.flags & Flags$2.E_NO_TOUCH_WALLS) {
            let ok = true;
            if (map.isWall(x, y))
                return false; // or on wall
            GWU__namespace.xy.eachNeighbor(x, y, (i, j) => {
                if (map.isWall(i, j)) {
                    ok = false;
                }
            }, true);
            if (!ok)
                return false;
        }
        // if (ctx.bounds && !ctx.bounds.containsXY(x, y)) return false;
        if (effect.matchTile && !isStart && !map.hasTile(x, y, effect.matchTile)) {
            return false;
        }
        return true;
    }
    function computeSpawnMap(effect, spawnMap, site, x, y) {
        let i, j, dir, t, x2, y2;
        let madeChange;
        // const bounds = ctx.bounds || null;
        // if (bounds) {
        //   // Activation.debug('- bounds', bounds);
        // }
        const map = site;
        let startProb = effect.grow || 0;
        let probDec = effect.decrement || 0;
        spawnMap.fill(0);
        if (!cellIsOk(effect, map, x, y, true)) {
            return false;
        }
        spawnMap[x][y] = t = 1; // incremented before anything else happens
        let count = 1;
        if (startProb) {
            madeChange = true;
            if (startProb >= 100) {
                probDec = probDec || 100;
            }
            if (probDec <= 0) {
                probDec = startProb;
            }
            while (madeChange && startProb > 0) {
                madeChange = false;
                t++;
                for (i = 0; i < map.width; i++) {
                    for (j = 0; j < map.height; j++) {
                        if (spawnMap[i][j] == t - 1) {
                            for (dir = 0; dir < 4; dir++) {
                                x2 = i + GWU__namespace.xy.DIRS[dir][0];
                                y2 = j + GWU__namespace.xy.DIRS[dir][1];
                                if (spawnMap.hasXY(x2, y2) &&
                                    !spawnMap[x2][y2] &&
                                    map.rng.chance(startProb) &&
                                    cellIsOk(effect, map, x2, y2, false)) {
                                    spawnMap[x2][y2] = t;
                                    madeChange = true;
                                    ++count;
                                }
                            }
                        }
                    }
                }
                startProb -= probDec;
            }
        }
        return count > 0;
    }
    function clearCells(map, spawnMap, _flags = 0) {
        let didSomething = false;
        // const clearAll = (flags & Flags.E_CLEAR_CELL) === Flags.E_CLEAR_CELL;
        spawnMap.forEach((v, i, j) => {
            if (!v)
                return;
            // if (clearAll) {
            map.clearTile(i, j);
            // } else {
            //     if (flags & Flags.E_CLEAR_GAS) {
            //         cell.clearDepth(Flags.Depth.GAS);
            //     }
            //     if (flags & Flags.E_CLEAR_LIQUID) {
            //         cell.clearDepth(Flags.Depth.LIQUID);
            //     }
            //     if (flags & Flags.E_CLEAR_SURFACE) {
            //         cell.clearDepth(Flags.Depth.SURFACE);
            //     }
            //     if (flags & Flags.E_CLEAR_GROUND) {
            //         cell.clearDepth(Flags.Depth.GROUND);
            //     }
            // }
            didSomething = true;
        });
        return didSomething;
    }
    function evacuateCreatures(map, blockingMap) {
        let didSomething = false;
        map.eachActor((a) => {
            if (!blockingMap[a.x][a.y])
                return;
            const loc = map.rng.matchingLocNear(a.x, a.y, (x, y) => {
                if (!map.hasXY(x, y))
                    return false;
                if (blockingMap[x][y])
                    return false;
                return !map.forbidsActor(x, y, a);
            });
            if (loc && loc[0] >= 0 && loc[1] >= 0) {
                a.y = loc[0];
                a.y = loc[1];
                // map.redrawXY(loc[0], loc[1]);
                didSomething = true;
            }
        });
        return didSomething;
    }
    function evacuateItems(map, blockingMap) {
        let didSomething = false;
        map.eachItem((i) => {
            if (!blockingMap[i.x][i.y])
                return;
            const loc = map.rng.matchingLocNear(i.x, i.y, (x, y) => {
                if (!map.hasXY(x, y))
                    return false;
                if (blockingMap[x][y])
                    return false;
                return !map.forbidsItem(x, y, i);
            });
            if (loc && loc[0] >= 0 && loc[1] >= 0) {
                i.x = loc[0];
                i.y = loc[1];
                // map.redrawXY(loc[0], loc[1]);
                didSomething = true;
            }
        });
        return didSomething;
    }

    var index$3 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        tile: tile,
        tileAction: tileAction,
        chance: chance,
        chanceAction: chanceAction,
        features: features,
        install: install$3,
        types: types,
        installType: installType,
        feature: feature,
        featureFeature: featureFeature,
        make: make$1,
        makeArray: makeArray,
        get Flags () { return Flags$2; },
        spread: spread,
        spreadFeature: spreadFeature,
        mapDisruptedBy: mapDisruptedBy,
        computeSpawnMap: computeSpawnMap,
        clearCells: clearCells,
        evacuateCreatures: evacuateCreatures,
        evacuateItems: evacuateItems
    });

    const hordes = [];
    function installHorde(config) {
        const info = {};
        info.id = config.id || config.leader;
        info.leader = config.leader;
        info.make = config.make || {};
        info.members = {};
        if (config.members) {
            Object.entries(config.members).forEach(([key, value]) => {
                let member = {};
                if (typeof value === 'object' &&
                    ('count' in value || 'make' in value)) {
                    member.count = GWU__namespace.range.make(value.count || 1);
                    member.make = value.make || {};
                }
                else {
                    // @ts-ignore
                    member.count = GWU__namespace.range.make(value);
                }
                info.members[key] = member;
            });
        }
        info.tags = [];
        if (config.tags) {
            if (typeof config.tags === 'string') {
                config.tags = config.tags.split(/[:|,]/g).map((t) => t.trim());
            }
            info.tags = config.tags;
        }
        info.frequency = GWU__namespace.frequency.make(config.frequency);
        info.flags = 0;
        info.requiredTile = config.requiredTile || null;
        info.feature = config.feature ? make$1(config.feature) : null;
        info.blueprint = config.blueprint || null;
        hordes.push(info);
        return info;
    }
    function pickHorde(depth, rules, rng) {
        rng = rng || GWU__namespace.random;
        let tagMatch;
        if (typeof rules === 'string') {
            tagMatch = GWU__namespace.tags.makeMatch(rules);
        }
        else if ('id' in rules) {
            return hordes.find((h) => h.id === rules.id) || null;
        }
        else {
            tagMatch = GWU__namespace.tags.makeMatch(rules);
        }
        const choices = hordes.filter((horde) => tagMatch(horde.tags));
        if (choices.length == 0)
            return null;
        const freq = choices.map((info) => info.frequency(depth));
        const choice = rng.weighted(freq);
        return choices[choice] || null;
    }
    function spawnHorde(info, map, x = -1, y = -1, opts = {}) {
        // Leader info
        opts.canSpawn = opts.canSpawn || GWU__namespace.TRUE;
        opts.rng = opts.rng || map.rng;
        opts.machine = opts.machine || 0;
        const leader = _spawnLeader(info, map, x, y, opts);
        if (!leader)
            return null;
        _spawnMembers(info, leader, map, opts);
        return leader;
    }
    function _spawnLeader(info, map, x, y, opts) {
        const leader = {
            id: info.leader,
            make: info.make,
            x,
            y,
            machine: opts.machine || 0,
        };
        if (x >= 0 && y >= 0) {
            if (!map.canSpawnActor(x, y, leader))
                return null;
        }
        else {
            [x, y] = _pickLeaderLoc(leader, map, opts) || [-1, -1];
            if (x < 0 || y < 0) {
                return null;
            }
        }
        // pre-placement stuff?  machine? effect?
        if (!_addLeader(leader, map, x, y)) {
            return null;
        }
        return leader;
    }
    function _addLeader(leader, map, x, y, _opts) {
        return map.addActor(x, y, leader);
    }
    function _addMember(member, map, x, y, leader, _opts) {
        member.leader = leader;
        return map.addActor(x, y, member);
    }
    function _spawnMembers(horde, leader, map, opts) {
        const entries = Object.entries(horde.members);
        if (entries.length == 0)
            return 0;
        let count = 0;
        entries.forEach(([kindId, config]) => {
            const count = config.count.value(opts.rng);
            for (let i = 0; i < count; ++i) {
                _spawnMember(kindId, config, map, leader, opts);
            }
        });
        return count;
    }
    function _spawnMember(id, member, map, leader, opts) {
        const instance = {
            id,
            make: member.make,
            x: -1,
            y: -1,
            machine: leader.machine,
        };
        const [x, y] = _pickMemberLoc(instance, map, leader, opts) || [-1, -1];
        if (x < 0 || y < 0) {
            return null;
        }
        // pre-placement stuff?  machine? effect?
        if (!_addMember(instance, map, x, y, leader)) {
            return null;
        }
        return instance;
    }
    function _pickLeaderLoc(leader, map, opts) {
        let loc = opts.rng.matchingLoc(map.width, map.height, (x, y) => {
            if (!map.hasXY(x, y))
                return false;
            if (map.hasActor(x, y))
                return false; // Brogue kills existing actors, but lets do this instead
            if (!opts.canSpawn(x, y))
                return false;
            if (!map.canSpawnActor(x, y, leader))
                return false;
            // const cell = map.cell(x, y);
            // if (leader.avoidsCell(cell)) return false;
            // if (Map.isHallway(map, x, y)) {
            //     return false;
            // }
            return true;
        });
        return loc;
    }
    function _pickMemberLoc(actor, map, leader, opts) {
        let loc = opts.rng.matchingLocNear(leader.x, leader.y, (x, y) => {
            if (!map.hasXY(x, y))
                return false;
            if (map.hasActor(x, y))
                return false;
            // if (map.fov.isAnyKindOfVisible(x, y)) return false;
            if (!map.canSpawnActor(x, y, actor))
                return false;
            if (!opts.canSpawn(x, y))
                return false;
            return true;
        });
        return loc;
    }

    const items = [];
    function installItem(config, cfg) {
        const info = {};
        if (typeof config === 'string') {
            info.id = config;
            if (!cfg)
                throw new Error('Need a configuration.');
            config = cfg;
        }
        else {
            info.id = config.id;
        }
        info.make = config.make || {};
        info.tags = [];
        if (config.tags) {
            if (typeof config.tags === 'string') {
                config.tags = config.tags.split(/[:|,]/g).map((t) => t.trim());
            }
            info.tags = config.tags;
        }
        info.frequency = GWU__namespace.frequency.make(config.frequency || 100);
        info.flags = 0;
        info.requiredTile = config.requiredTile || null;
        info.feature = config.feature || null;
        info.blueprint = config.blueprint || null;
        items.push(info);
        return info;
    }
    function pickItem(depth, tagRules, rng) {
        rng = rng || GWU__namespace.random;
        if (typeof tagRules !== 'string' && 'id' in tagRules) {
            // @ts-ignore
            return items.find((i) => i.id === tagRules.id) || null;
        }
        tagRules = typeof tagRules === 'string' ? tagRules : tagRules.tags;
        const tagMatch = GWU__namespace.tags.makeMatch(tagRules);
        const choices = items.filter((item) => tagMatch(item.tags));
        if (choices.length == 0)
            return null;
        const freq = choices.map((info) => info.frequency(depth));
        const choice = rng.weighted(freq);
        return choices[choice] || null;
    }
    function makeItem(info) {
        return {
            id: info.id,
            make: info.make,
            x: -1,
            y: -1,
        };
    }
    function getItemInfo(id) {
        return items.find((i) => i.id === id);
    }

    const DIRS$1 = GWU__namespace.xy.DIRS;
    function loadSite(site, cells, tiles) {
        const w = site.width;
        const h = site.height;
        cells.forEach((line, j) => {
            if (j >= h)
                return;
            for (let i = 0; i < w && i < line.length; ++i) {
                const ch = line[i];
                const tile = tiles[ch] || 'FLOOR';
                site.setTile(i, j, tile);
            }
        });
    }
    // export function attachRoom(
    //     map: GWU.grid.NumGrid,
    //     roomGrid: GWU.grid.NumGrid,
    //     room: TYPES.Room,
    //     opts: TYPES.DigInfo
    // ) {
    //     // console.log('attachRoom');
    //     const doorSites = room.hall ? room.hall.doors : room.doors;
    //     const site = new SITE.GridSite(map);
    //     // Slide hyperspace across real space, in a random but predetermined order, until the room matches up with a wall.
    //     for (let i = 0; i < SITE.SEQ.length; i++) {
    //         const x = Math.floor(SITE.SEQ[i] / map.height);
    //         const y = SITE.SEQ[i] % map.height;
    //         if (!(map.get(x, y) == SITE.NOTHING)) continue;
    //         const dir = directionOfDoorSite(site, x, y);
    //         if (dir != GWU.xy.NO_DIRECTION) {
    //             const oppDir = (dir + 2) % 4;
    //             const door = doorSites[oppDir];
    //             if (!door) continue;
    //             const offsetX = x - door[0];
    //             const offsetY = y - door[1];
    //             if (door[0] != -1 && roomFitsAt(map, roomGrid, offsetX, offsetY)) {
    //                 // TYPES.Room fits here.
    //                 GWU.grid.offsetZip(
    //                     map,
    //                     roomGrid,
    //                     offsetX,
    //                     offsetY,
    //                     (_d, _s, i, j) => {
    //                         map[i][j] = opts.room.tile || SITE.FLOOR;
    //                     }
    //                 );
    //                 attachDoor(map, room, opts, x, y, oppDir);
    //                 // door[0] = -1;
    //                 // door[1] = -1;
    //                 room.translate(offsetX, offsetY);
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }
    // export function attachDoor(
    //     map: GWU.grid.NumGrid,
    //     room: TYPES.Room,
    //     opts: TYPES.DigInfo,
    //     x: number,
    //     y: number,
    //     dir: number
    // ) {
    //     if (opts.door === 0) return; // no door at all
    //     const tile = opts.door || SITE.DOOR;
    //     map[x][y] = tile; // Door site.
    //     // most cases...
    //     if (!room.hall || !(room.hall.width > 1) || room.hall.dir !== dir) {
    //         return;
    //     }
    //     if (dir === GWU.utils.UP || dir === GWU.utils.DOWN) {
    //         let didSomething = true;
    //         let k = 1;
    //         while (didSomething) {
    //             didSomething = false;
    //             if (map.get(x - k, y) === 0) {
    //                 if (map.get(x - k, y - 1) && map.get(x - k, y + 1)) {
    //                     map[x - k][y] = tile;
    //                     didSomething = true;
    //                 }
    //             }
    //             if (map.get(x + k, y) === 0) {
    //                 if (map.get(x + k, y - 1) && map.get(x + k, y + 1)) {
    //                     map[x + k][y] = tile;
    //                     didSomething = true;
    //                 }
    //             }
    //             ++k;
    //         }
    //     } else {
    //         let didSomething = true;
    //         let k = 1;
    //         while (didSomething) {
    //             didSomething = false;
    //             if (map.get(x, y - k) === 0) {
    //                 if (map.get(x - 1, y - k) && map.get(x + 1, y - k)) {
    //                     map[x][y - k] = opts.door;
    //                     didSomething = true;
    //                 }
    //             }
    //             if (map.get(x, y + k) === 0) {
    //                 if (map.get(x - 1, y + k) && map.get(x + 1, y + k)) {
    //                     map[x][y + k] = opts.door;
    //                     didSomething = true;
    //                 }
    //             }
    //             ++k;
    //         }
    //     }
    // }
    // export function roomFitsAt(
    //     map: GWU.grid.NumGrid,
    //     roomGrid: GWU.grid.NumGrid,
    //     roomToSiteX: number,
    //     roomToSiteY: number
    // ) {
    //     let xRoom, yRoom, xSite, ySite, i, j;
    //     // console.log('roomFitsAt', roomToSiteX, roomToSiteY);
    //     for (xRoom = 0; xRoom < roomGrid.width; xRoom++) {
    //         for (yRoom = 0; yRoom < roomGrid.height; yRoom++) {
    //             if (roomGrid[xRoom][yRoom]) {
    //                 xSite = xRoom + roomToSiteX;
    //                 ySite = yRoom + roomToSiteY;
    //                 for (i = xSite - 1; i <= xSite + 1; i++) {
    //                     for (j = ySite - 1; j <= ySite + 1; j++) {
    //                         if (
    //                             !map.hasXY(i, j) ||
    //                             map.isBoundaryXY(i, j) ||
    //                             !(map.get(i, j) === SITE.NOTHING)
    //                         ) {
    //                             // console.log('- NO');
    //                             return false;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     // console.log('- YES');
    //     return true;
    // }
    // If the indicated tile is a wall on the room stored in grid, and it could be the site of
    // a door out of that room, then return the outbound direction that the door faces.
    // Otherwise, return def.NO_DIRECTION.
    function directionOfDoorSite(site, x, y) {
        let dir, solutionDir;
        let newX, newY, oppX, oppY;
        solutionDir = GWU__namespace.xy.NO_DIRECTION;
        for (dir = 0; dir < 4; dir++) {
            newX = x + DIRS$1[dir][0];
            newY = y + DIRS$1[dir][1];
            oppX = x - DIRS$1[dir][0];
            oppY = y - DIRS$1[dir][1];
            if (site.hasXY(oppX, oppY) &&
                site.hasXY(newX, newY) &&
                site.isFloor(oppX, oppY)) {
                // This grid cell would be a valid tile on which to place a door that, facing outward, points dir.
                if (solutionDir != GWU__namespace.xy.NO_DIRECTION) {
                    // Already claimed by another direction; no doors here!
                    return GWU__namespace.xy.NO_DIRECTION;
                }
                solutionDir = dir;
            }
        }
        return solutionDir;
    }
    function chooseRandomDoorSites(site) {
        let i, j, k, newX, newY;
        let dir;
        let doorSiteFailed;
        const DOORS = [[], [], [], []];
        // const grid = GWU.grid.alloc(sourceGrid.width, sourceGrid.height);
        // grid.copy(sourceGrid);
        const h = site.height;
        const w = site.width;
        for (i = 0; i < w; i++) {
            for (j = 0; j < h; j++) {
                if (site.isDiggable(i, j)) {
                    dir = directionOfDoorSite(site, i, j);
                    if (dir != GWU__namespace.xy.NO_DIRECTION) {
                        // Trace a ray 10 spaces outward from the door site to make sure it doesn't intersect the room.
                        // If it does, it's not a valid door site.
                        newX = i + GWU__namespace.xy.DIRS[dir][0];
                        newY = j + GWU__namespace.xy.DIRS[dir][1];
                        doorSiteFailed = false;
                        for (k = 0; k < 10 && site.hasXY(newX, newY) && !doorSiteFailed; k++) {
                            if (site.isSet(newX, newY)) {
                                doorSiteFailed = true;
                            }
                            newX += GWU__namespace.xy.DIRS[dir][0];
                            newY += GWU__namespace.xy.DIRS[dir][1];
                        }
                        if (!doorSiteFailed) {
                            DOORS[dir].push([i, j]);
                        }
                    }
                }
            }
        }
        let doorSites = [];
        // Pick four doors, one in each direction, and store them in doorSites[dir].
        for (dir = 0; dir < 4; dir++) {
            const loc = site.rng.item(DOORS[dir]) || [-1, -1];
            doorSites[dir] = [loc[0], loc[1]];
        }
        // GWU.grid.free(grid);
        return doorSites;
    }
    // export function forceRoomAtMapLoc(
    //     map: GWU.grid.NumGrid,
    //     xy: GWU.xy.Loc,
    //     roomGrid: GWU.grid.NumGrid,
    //     room: TYPES.Room,
    //     opts: TYPES.DigConfig
    // ) {
    //     // console.log('forceRoomAtMapLoc', xy);
    //     const site = new SITE.GridSite(map);
    //     // Slide room across map, in a random but predetermined order, until the room matches up with a wall.
    //     for (let i = 0; i < SITE.SEQ.length; i++) {
    //         const x = Math.floor(SITE.SEQ[i] / map.height);
    //         const y = SITE.SEQ[i] % map.height;
    //         if (roomGrid[x][y]) continue;
    //         const dir = directionOfDoorSite(site, x, y);
    //         if (dir != GWU.xy.NO_DIRECTION) {
    //             const dx = xy[0] - x;
    //             const dy = xy[1] - y;
    //             if (roomFitsAt(map, roomGrid, dx, dy)) {
    //                 GWU.grid.offsetZip(map, roomGrid, dx, dy, (_d, _s, i, j) => {
    //                     map[i][j] = opts.room.tile || SITE.FLOOR;
    //                 });
    //                 if (opts.room.door !== false) {
    //                     const door =
    //                         opts.room.door === true || !opts.room.door
    //                             ? SITE.DOOR
    //                             : opts.room.door;
    //                     map[xy[0]][xy[1]] = door; // Door site.
    //                 }
    //                 // TODO - Update doors - we may have to erase one...
    //                 room.translate(dx, dy);
    //                 return true;
    //             }
    //         }
    //     }
    //     return false;
    // }
    // export function attachRoomAtMapDoor(
    //     map: GWU.grid.NumGrid,
    //     mapDoors: GWU.xy.Loc[],
    //     roomGrid: GWU.grid.NumGrid,
    //     room: TYPES.Room,
    //     opts: TYPES.DigInfo
    // ): boolean | GWU.xy.Loc[] {
    //     const doorIndexes = site.rng.sequence(mapDoors.length);
    //     // console.log('attachRoomAtMapDoor', mapDoors.join(', '));
    //     // Slide hyperspace across real space, in a random but predetermined order, until the room matches up with a wall.
    //     for (let i = 0; i < doorIndexes.length; i++) {
    //         const index = doorIndexes[i];
    //         const door = mapDoors[index];
    //         if (!door) continue;
    //         const x = door[0];
    //         const y = door[1];
    //         if (attachRoomAtXY(map, x, y, roomGrid, room, opts)) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    // function attachRoomAtXY(
    //     map: GWU.grid.NumGrid,
    //     x: number,
    //     y: number,
    //     roomGrid: GWU.grid.NumGrid,
    //     room: TYPES.Room,
    //     opts: TYPES.DigInfo
    // ): boolean | GWU.xy.Loc[] {
    //     const doorSites = room.hall ? room.hall.doors : room.doors;
    //     const dirs = site.rng.sequence(4);
    //     // console.log('attachRoomAtXY', x, y, doorSites.join(', '));
    //     for (let dir of dirs) {
    //         const oppDir = (dir + 2) % 4;
    //         const door = doorSites[oppDir];
    //         if (!door) continue;
    //         if (
    //             door[0] != -1 &&
    //             roomFitsAt(map, roomGrid, x - door[0], y - door[1])
    //         ) {
    //             // dungeon.debug("attachRoom: ", x, y, oppDir);
    //             // TYPES.Room fits here.
    //             const offX = x - door[0];
    //             const offY = y - door[1];
    //             GWU.grid.offsetZip(map, roomGrid, offX, offY, (_d, _s, i, j) => {
    //                 map[i][j] = opts.room.tile || SITE.FLOOR;
    //             });
    //             attachDoor(map, room, opts, x, y, oppDir);
    //             room.translate(offX, offY);
    //             // const newDoors = doorSites.map((site) => {
    //             //     const x0 = site[0] + offX;
    //             //     const y0 = site[1] + offY;
    //             //     if (x0 == x && y0 == y) return [-1, -1] as GWU.xy.Loc;
    //             //     return [x0, y0] as GWU.xy.Loc;
    //             // });
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    function fillCostGrid(source, costGrid) {
        costGrid.update((_v, x, y) => source.isPassable(x, y) ? 1 : GWU__namespace.path.OBSTRUCTION);
    }
    function siteDisruptedByXY(site, x, y, options = {}) {
        var _a, _b, _c;
        (_a = options.offsetX) !== null && _a !== void 0 ? _a : (options.offsetX = 0);
        (_b = options.offsetY) !== null && _b !== void 0 ? _b : (options.offsetY = 0);
        (_c = options.machine) !== null && _c !== void 0 ? _c : (options.machine = 0);
        if (GWU__namespace.xy.arcCount(x, y, (i, j) => {
            return site.isPassable(i, j);
        }) <= 1)
            return false;
        const blockingGrid = GWU__namespace.grid.alloc(site.width, site.height);
        blockingGrid[x][y] = 1;
        const result = siteDisruptedBy(site, blockingGrid, options);
        GWU__namespace.grid.free(blockingGrid);
        return result;
    }
    function siteDisruptedBy(site, blockingGrid, options = {}) {
        var _a, _b, _c;
        (_a = options.offsetX) !== null && _a !== void 0 ? _a : (options.offsetX = 0);
        (_b = options.offsetY) !== null && _b !== void 0 ? _b : (options.offsetY = 0);
        (_c = options.machine) !== null && _c !== void 0 ? _c : (options.machine = 0);
        const walkableGrid = GWU__namespace.grid.alloc(site.width, site.height);
        let disrupts = false;
        // Get all walkable locations after lake added
        GWU__namespace.xy.forRect(site.width, site.height, (i, j) => {
            const blockingX = i + options.offsetX;
            const blockingY = j + options.offsetY;
            if (blockingGrid.get(blockingX, blockingY)) {
                if (site.isStairs(i, j)) {
                    disrupts = true;
                }
            }
            else if (site.isPassable(i, j) &&
                (site.getMachine(i, j) == 0 ||
                    site.getMachine(i, j) == options.machine)) {
                walkableGrid[i][j] = 1;
            }
        });
        if (options.updateWalkable) {
            if (!options.updateWalkable(walkableGrid)) {
                return true;
            }
        }
        let first = true;
        for (let i = 0; i < walkableGrid.width && !disrupts; ++i) {
            for (let j = 0; j < walkableGrid.height && !disrupts; ++j) {
                if (walkableGrid[i][j] == 1) {
                    if (first) {
                        walkableGrid.floodFill(i, j, 1, 2);
                        first = false;
                    }
                    else {
                        disrupts = true;
                    }
                }
            }
        }
        // console.log('WALKABLE GRID');
        // walkableGrid.dump();
        GWU__namespace.grid.free(walkableGrid);
        return disrupts;
    }
    function siteDisruptedSize(site, blockingGrid, blockingToMapX = 0, blockingToMapY = 0) {
        const walkableGrid = GWU__namespace.grid.alloc(site.width, site.height);
        let disrupts = 0;
        // Get all walkable locations after lake added
        GWU__namespace.xy.forRect(site.width, site.height, (i, j) => {
            const lakeX = i + blockingToMapX;
            const lakeY = j + blockingToMapY;
            if (blockingGrid.get(lakeX, lakeY)) {
                if (site.isStairs(i, j)) {
                    disrupts = site.width * site.height;
                }
            }
            else if (site.isPassable(i, j)) {
                walkableGrid[i][j] = 1;
            }
        });
        if (disrupts)
            return disrupts;
        let first = true;
        let nextId = 2;
        let minSize = site.width * site.height;
        for (let i = 0; i < walkableGrid.width; ++i) {
            for (let j = 0; j < walkableGrid.height; ++j) {
                if (walkableGrid[i][j] == 1) {
                    const disrupted = walkableGrid.floodFill(i, j, 1, nextId++);
                    minSize = Math.min(minSize, disrupted);
                    if (first) {
                        first = false;
                    }
                    else {
                        disrupts = minSize;
                    }
                }
            }
        }
        // console.log('WALKABLE GRID');
        // walkableGrid.dump();
        GWU__namespace.grid.free(walkableGrid);
        return disrupts;
    }
    function computeDistanceMap(site, distanceMap, originX, originY, _maxDistance) {
        distanceMap.reset(site.width, site.height);
        distanceMap.setGoal(originX, originY);
        distanceMap.calculate((x, y) => {
            if (!site.hasXY(x, y))
                return GWU__namespace.path.OBSTRUCTION;
            if (site.isPassable(x, y))
                return GWU__namespace.path.OK;
            if (site.blocksDiagonal(x, y))
                return GWU__namespace.path.OBSTRUCTION;
            return GWU__namespace.path.BLOCKED;
        }, false);
    }
    function clearInteriorFlag(site, machine) {
        for (let i = 0; i < site.width; i++) {
            for (let j = 0; j < site.height; j++) {
                if (site.getMachine(i, j) == machine && !site.needsMachine(i, j)) {
                    site.setMachine(i, j, 0);
                }
            }
        }
    }

    function analyze(map, updateChokeCounts = true) {
        updateLoopiness(map);
        updateChokepoints(map, updateChokeCounts);
    }
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    // TODO - Move to Map?
    function updateChokepoints(map, updateCounts) {
        const blockMap = GWU__namespace.grid.alloc(map.width, map.height);
        const grid = GWU__namespace.grid.alloc(map.width, map.height);
        for (let i = 0; i < map.width; i++) {
            for (let j = 0; j < map.height; j++) {
                if (map.blocksDiagonal(i, j)) {
                    blockMap[i][j] = 2;
                }
                else if ((map.blocksPathing(i, j) || map.blocksMove(i, j)) &&
                    !map.isSecretDoor(i, j)) {
                    // cell.flags &= ~Flags.Cell.IS_IN_LOOP;
                    blockMap[i][j] = 1;
                }
                else {
                    // cell.flags |= Flags.Cell.IS_IN_LOOP;
                    blockMap[i][j] = 0;
                }
            }
        }
        let passableArcCount;
        // done finding loops; now flag chokepoints
        for (let i = 1; i < blockMap.width - 1; i++) {
            for (let j = 1; j < blockMap.height - 1; j++) {
                map.clearChokepoint(i, j);
                if (!blockMap[i][j]) {
                    if (!map.isInLoop(i, j)) {
                        passableArcCount = 0;
                        for (let dir = 0; dir < 8; dir++) {
                            const oldX = i + GWU__namespace.xy.CLOCK_DIRS[(dir + 7) % 8][0];
                            const oldY = j + GWU__namespace.xy.CLOCK_DIRS[(dir + 7) % 8][1];
                            const newX = i + GWU__namespace.xy.CLOCK_DIRS[dir][0];
                            const newY = j + GWU__namespace.xy.CLOCK_DIRS[dir][1];
                            if ((map.hasXY(newX, newY) && // RUT.Map.makeValidXy(map, newXy) &&
                                blockMap[newX][newY] > 0) !=
                                (map.hasXY(oldX, oldY) && // RUT.Map.makeValidXy(map, oldXy) &&
                                    blockMap[oldX][oldY] > 0)) {
                                if (++passableArcCount > 2) {
                                    if ((blockMap[i - 1][j] &&
                                        blockMap[i + 1][j]) ||
                                        (blockMap[i][j - 1] && blockMap[i][j + 1])) {
                                        map.setChokepoint(i, j);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    const left = i - 1;
                    const right = i + 1;
                    const up = j - 1;
                    const down = j + 1;
                    if (blockMap[i][up] && blockMap[i][down]) {
                        if (!blockMap[left][j] && !blockMap[right][j]) {
                            if (!blockMap[left][up] ||
                                !blockMap[left][down] ||
                                !blockMap[right][up] ||
                                !blockMap[right][down]) {
                                map.setGateSite(i, j);
                            }
                        }
                    }
                    else if (blockMap[left][j] && blockMap[right][j]) {
                        if (!blockMap[i][up] && !blockMap[i][down]) {
                            if (!blockMap[left][up] ||
                                !blockMap[left][down] ||
                                !blockMap[right][up] ||
                                !blockMap[right][down]) {
                                map.setGateSite(i, j);
                            }
                        }
                    }
                }
            }
        }
        if (updateCounts) {
            // Done finding chokepoints; now create a chokepoint map.
            // The chokepoint map is a number for each passable tile. If the tile is a chokepoint,
            // then the number indicates the number of tiles that would be rendered unreachable if the
            // chokepoint were blocked. If the tile is not a chokepoint, then the number indicates
            // the number of tiles that would be rendered unreachable if the nearest exit chokepoint
            // were blocked.
            // The cost of all of this is one depth-first flood-fill per open point that is adjacent to a chokepoint.
            // Start by setting the chokepoint values really high, and roping off room machines.
            for (let i = 0; i < map.width; i++) {
                for (let j = 0; j < map.height; j++) {
                    map.setChokeCount(i, j, 30000);
                    // Not sure why this was done in Brogue
                    // if (map.cell(i, j).flags.cell & Flags.Cell.IS_IN_ROOM_MACHINE) {
                    //     passMap[i][j] = 0;
                    // }
                }
            }
            // Scan through and find a chokepoint next to an open point.
            for (let i = 0; i < map.width; i++) {
                for (let j = 0; j < map.height; j++) {
                    if (!blockMap[i][j] && map.isChokepoint(i, j)) {
                        for (let dir = 0; dir < 4; dir++) {
                            const newX = i + GWU__namespace.xy.DIRS[dir][0];
                            const newY = j + GWU__namespace.xy.DIRS[dir][1];
                            if (map.hasXY(newX, newY) && // RUT.Map.makeValidXy(map, newXy) &&
                                !blockMap[newX][newY] &&
                                !map.isChokepoint(newX, newY)) {
                                // OK, (newX, newY) is an open point and (i, j) is a chokepoint.
                                // Pretend (i, j) is blocked by changing passMap, and run a flood-fill cell count starting on (newX, newY).
                                // Keep track of the flooded region in grid[][].
                                grid.fill(0);
                                blockMap[i][j] = 1;
                                let cellCount = floodFillCount(map, grid, blockMap, newX, newY);
                                blockMap[i][j] = 0;
                                // CellCount is the size of the region that would be obstructed if the chokepoint were blocked.
                                // CellCounts less than 4 are not useful, so we skip those cases.
                                if (cellCount >= 4) {
                                    // Now, on the chokemap, all of those flooded cells should take the lesser of their current value or this resultant number.
                                    for (let i2 = 0; i2 < grid.width; i2++) {
                                        for (let j2 = 0; j2 < grid.height; j2++) {
                                            if (grid[i2][j2] &&
                                                cellCount <
                                                    map.getChokeCount(i2, j2)) {
                                                map.setChokeCount(i2, j2, cellCount);
                                                // map.clearGateSite(i2, j2);
                                            }
                                        }
                                    }
                                    // The chokepoint itself should also take the lesser of its current value or the flood count.
                                    if (cellCount < map.getChokeCount(i, j)) {
                                        map.setChokeCount(i, j, cellCount);
                                        // map.setGateSite(i, j);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        GWU__namespace.grid.free(blockMap);
        GWU__namespace.grid.free(grid);
    }
    // Assumes it is called with respect to a passable (startX, startY), and that the same is not already included in results.
    // Returns 10000 if the area included an area machine.
    function floodFillCount(map, results, blockMap, startX, startY) {
        function getCount(x, y) {
            let count = 1;
            if (map.isAreaMachine(x, y)) {
                // huh?
                count = 10000;
            }
            return count;
        }
        let count = 0;
        const todo = [[startX, startY]];
        const free = [];
        while (todo.length) {
            const item = todo.pop();
            free.push(item);
            const x = item[0];
            const y = item[1];
            if (results[x][y])
                continue;
            results[x][y] = 1;
            count += getCount(x, y);
            for (let dir = 0; dir < 4; dir++) {
                const newX = x + GWU__namespace.xy.DIRS[dir][0];
                const newY = y + GWU__namespace.xy.DIRS[dir][1];
                if (map.hasXY(newX, newY) && // RUT.Map.makeValidXy(map, newXy) &&
                    !blockMap[newX][newY] &&
                    !results[newX][newY]) {
                    const item = free.pop() || [-1, -1];
                    item[0] = newX;
                    item[1] = newY;
                    todo.push(item);
                }
            }
        }
        return Math.min(count, 10000);
    }
    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    function updateLoopiness(map) {
        resetLoopiness(map);
        checkLoopiness(map);
        cleanLoopiness(map);
    }
    function resetLoopiness(map) {
        GWU__namespace.xy.forRect(map.width, map.height, (x, y) => {
            if ((map.blocksPathing(x, y) || map.blocksMove(x, y)) &&
                !map.isSecretDoor(x, y)) {
                map.clearInLoop(x, y);
                // cell.flags.cell &= ~Flags.Cell.IS_IN_LOOP;
                // passMap[i][j] = false;
            }
            else {
                map.setInLoop(x, y);
                // cell.flags.cell |= Flags.Cell.IS_IN_LOOP;
                // passMap[i][j] = true;
            }
        });
    }
    function checkLoopiness(map) {
        let inString;
        let newX, newY, dir, sdir;
        let numStrings, maxStringLength, currentStringLength;
        const todo = GWU__namespace.grid.alloc(map.width, map.height, 1);
        let tryAgain = true;
        while (tryAgain) {
            tryAgain = false;
            todo.forEach((v, x, y) => {
                if (!v)
                    return;
                // const cell = map.cell(x, y);
                todo[x][y] = 0;
                if (!map.isInLoop(x, y)) {
                    return;
                }
                // find an unloopy neighbor to start on
                for (sdir = 0; sdir < 8; sdir++) {
                    newX = x + GWU__namespace.xy.CLOCK_DIRS[sdir][0];
                    newY = y + GWU__namespace.xy.CLOCK_DIRS[sdir][1];
                    if (!map.hasXY(newX, newY))
                        continue;
                    // const cell = map.cell(newX, newY);
                    if (!map.isInLoop(newX, newY)) {
                        break;
                    }
                }
                if (sdir == 8) {
                    // no unloopy neighbors
                    return; // leave cell loopy
                }
                // starting on this unloopy neighbor,
                // work clockwise and count up:
                // (a) the number of strings of loopy neighbors, and
                // (b) the length of the longest such string.
                numStrings = maxStringLength = currentStringLength = 0;
                inString = false;
                for (dir = sdir; dir < sdir + 8; dir++) {
                    newX = x + GWU__namespace.xy.CLOCK_DIRS[dir % 8][0];
                    newY = y + GWU__namespace.xy.CLOCK_DIRS[dir % 8][1];
                    if (!map.hasXY(newX, newY))
                        continue;
                    // const newCell = map.cell(newX, newY);
                    if (map.isInLoop(newX, newY)) {
                        currentStringLength++;
                        if (!inString) {
                            numStrings++;
                            inString = true;
                            if (numStrings > 1) {
                                break; // more than one string here; leave loopy
                            }
                        }
                    }
                    else if (inString) {
                        if (currentStringLength > maxStringLength) {
                            maxStringLength = currentStringLength;
                        }
                        currentStringLength = 0;
                        inString = false;
                    }
                }
                if (inString && currentStringLength > maxStringLength) {
                    maxStringLength = currentStringLength;
                }
                if (numStrings == 1 && maxStringLength <= 4) {
                    map.clearInLoop(x, y);
                    // cell.clearCellFlag(Flags.Cell.IS_IN_LOOP);
                    // console.log(x, y, numStrings, maxStringLength);
                    // map.dump((c) =>
                    //     c.hasCellFlag(Flags.Cell.IS_IN_LOOP) ? '*' : ' '
                    // );
                    for (dir = 0; dir < 8; dir++) {
                        newX = x + GWU__namespace.xy.CLOCK_DIRS[dir][0];
                        newY = y + GWU__namespace.xy.CLOCK_DIRS[dir][1];
                        if (map.hasXY(newX, newY) && map.isInLoop(newX, newY)) {
                            todo[newX][newY] = 1;
                            tryAgain = true;
                        }
                    }
                }
            });
        }
    }
    function fillInnerLoopGrid(map, grid) {
        for (let x = 0; x < map.width; ++x) {
            for (let y = 0; y < map.height; ++y) {
                // const cell = map.cell(x, y);
                if (map.isInLoop(x, y)) {
                    grid[x][y] = 1;
                }
                else if (x > 0 && y > 0) {
                    // const up = map.cell(x, y - 1);
                    // const left = map.cell(x - 1, y);
                    if (map.isInLoop(x, y - 1) &&
                        map.isInLoop(x - 1, y)
                    // up.flags.cell & Flags.Cell.IS_IN_LOOP &&
                    // left.flags.cell & Flags.Cell.IS_IN_LOOP
                    ) {
                        grid[x][y] = 1;
                    }
                }
            }
        }
    }
    function cleanLoopiness(map) {
        // remove extraneous loop markings
        const grid = GWU__namespace.grid.alloc(map.width, map.height);
        fillInnerLoopGrid(map, grid);
        // const xy = { x: 0, y: 0 };
        let designationSurvives;
        for (let i = 0; i < grid.width; i++) {
            for (let j = 0; j < grid.height; j++) {
                // const cell = map.cell(i, j);
                if (map.isInLoop(i, j)) {
                    designationSurvives = false;
                    for (let dir = 0; dir < 8; dir++) {
                        let newX = i + GWU__namespace.xy.CLOCK_DIRS[dir][0];
                        let newY = j + GWU__namespace.xy.CLOCK_DIRS[dir][1];
                        if (map.hasXY(newX, newY) && // RUT.Map.makeValidXy(map, xy, newX, newY) &&
                            !grid[newX][newY] &&
                            !map.isInLoop(newX, newY)) {
                            designationSurvives = true;
                            break;
                        }
                    }
                    if (!designationSurvives) {
                        grid[i][j] = 1;
                        map.clearInLoop(i, j);
                        // map.cell(i, j).flags.cell &= ~Flags.Cell.IS_IN_LOOP;
                    }
                }
            }
        }
        GWU__namespace.grid.free(grid);
    }
    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////

    const Flags$1 = GWU__namespace.flag.make([
        'CHOKEPOINT',
        'GATE_SITE',
        'IN_LOOP',
        'IN_MACHINE',
        'IN_AREA_MACHINE',
        'IMPREGNABLE',
    ]);
    class Site {
        constructor(width, height, opts = {}) {
            this.rng = GWU__namespace.rng.random;
            this.items = [];
            this.actors = [];
            this.depth = 0;
            this.machineCount = 0;
            this._tiles = GWU__namespace.grid.alloc(width, height);
            this._doors = GWU__namespace.grid.alloc(width, height);
            this._flags = GWU__namespace.grid.alloc(width, height);
            this._machine = GWU__namespace.grid.alloc(width, height);
            this._chokeCounts = GWU__namespace.grid.alloc(width, height);
            if (opts.rng) {
                this.rng = opts.rng;
            }
        }
        free() {
            GWU__namespace.grid.free(this._tiles);
            GWU__namespace.grid.free(this._doors);
            GWU__namespace.grid.free(this._flags);
            GWU__namespace.grid.free(this._machine);
            GWU__namespace.grid.free(this._chokeCounts);
        }
        clear() {
            this._tiles.fill(0);
            this._doors.fill(0);
            this._flags.fill(0);
            this._machine.fill(0);
            this._chokeCounts.fill(0);
            // this.depth = 0;
            this.machineCount = 0;
        }
        dump(fmt) {
            if (fmt) {
                return this._tiles.dump(fmt);
            }
            this._tiles.dump((c) => getTile(c).ch || '?');
        }
        // drawInto(buffer: GWU.canvas.Buffer): void {
        //     buffer.blackOut();
        //     this.tiles.forEach((t, x, y) => {
        //         const tile = GWM.tile.get(t);
        //         buffer.drawSprite(x, y, tile.sprite);
        //     });
        // }
        copy(other) {
            this.depth = other.depth;
            this.machineCount = other.machineCount;
            this._tiles.copy(other._tiles);
            this._doors.copy(other._doors);
            this._machine.copy(other._machine);
            this._flags.copy(other._flags);
            this._chokeCounts.copy(other._chokeCounts);
            this.rng = other.rng;
            this.items = other.items.slice();
            this.actors = other.actors.slice();
        }
        copyTiles(other, offsetX = 0, offsetY = 0) {
            GWU__namespace.xy.forRect(this.width, this.height, (x, y) => {
                const otherX = x - offsetX;
                const otherY = y - offsetY;
                const v = other._tiles.get(otherX, otherY);
                if (!v)
                    return;
                this._tiles[x][y] = v;
            });
        }
        setSeed(seed) {
            this.rng.seed(seed);
        }
        get width() {
            return this._tiles.width;
        }
        get height() {
            return this._tiles.height;
        }
        hasXY(x, y) {
            return this._tiles.hasXY(x, y);
        }
        isBoundaryXY(x, y) {
            return this._tiles.isBoundaryXY(x, y);
        }
        isPassable(x, y) {
            return (this.isFloor(x, y) ||
                this.isDoor(x, y) ||
                this.isBridge(x, y) ||
                this.isStairs(x, y) ||
                this.isShallow(x, y));
        }
        isNothing(x, y) {
            return this.hasTile(x, y, 'NOTHING');
        }
        isDiggable(x, y) {
            return this.hasTile(x, y, 'NOTHING') || this.hasTile(x, y, 'WALL');
        }
        isProtected(_x, _y) {
            return false;
        }
        isFloor(x, y) {
            return this.hasTile(x, y, 'FLOOR');
        }
        isDoor(x, y) {
            return this.hasTile(x, y, 'DOOR');
        }
        isSecretDoor(x, y) {
            return this.hasTile(x, y, 'SECRET_DOOR');
        }
        isBridge(x, y) {
            return this.hasTile(x, y, 'BRIDGE');
        }
        isWall(x, y) {
            return this.blocksMove(x, y) && this.blocksVision(x, y);
        }
        blocksMove(x, y) {
            return getTile(this._tiles[x][y]).blocksMove || false;
        }
        blocksDiagonal(x, y) {
            return this.isNothing(x, y) || this.isWall(x, y);
        }
        blocksPathing(x, y) {
            return (this.isNothing(x, y) ||
                this.isWall(x, y) ||
                this.isDeep(x, y) ||
                this.isStairs(x, y));
        }
        blocksVision(x, y) {
            return getTile(this._tiles[x][y]).blocksVision || false;
        }
        blocksItems(x, y) {
            return (this.blocksPathing(x, y) ||
                this.isChokepoint(x, y) ||
                this.isInLoop(x, y) ||
                this.isInMachine(x, y));
            // site.hasCellFlag(
            //     x,
            //     y,
            //     GWM.flags.Cell.IS_CHOKEPOINT |
            //         GWM.flags.Cell.IS_IN_LOOP |
            //         GWM.flags.Cell.IS_IN_MACHINE
            // );
        }
        blocksEffects(x, y) {
            return this.isWall(x, y);
        }
        isStairs(x, y) {
            return (this.hasTile(x, y, 'UP_STAIRS') || this.hasTile(x, y, 'DOWN_STAIRS'));
        }
        isDeep(x, y) {
            return this.hasTile(x, y, 'DEEP');
        }
        isShallow(x, y) {
            return this.hasTile(x, y, 'SHALLOW');
        }
        isAnyLiquid(x, y) {
            return this.isDeep(x, y) || this.isShallow(x, y);
        }
        isSet(x, y) {
            return (this._tiles.get(x, y) || 0) > 0;
        }
        tileBlocksMove(tile) {
            return getTile(tile).blocksMove || false;
        }
        setTile(x, y, tile, _opts = {}) {
            // if (tile instanceof GWM.tile.Tile) {
            //     tile = tile.index;
            // }
            if (!this._tiles.hasXY(x, y))
                return false;
            if (typeof tile === 'string') {
                tile = tileId(tile);
            }
            // priority checks...
            this._tiles[x][y] = tile;
            return true;
        }
        clearTile(x, y) {
            if (this.hasXY(x, y)) {
                this._tiles[x][y] = 0;
            }
        }
        getTile(x, y) {
            const id = this._tiles[x][y];
            return getTile(id);
        }
        makeImpregnable(x, y) {
            this._flags[x][y] |= Flags$1.IMPREGNABLE;
            // site.setCellFlag(x, y, GWM.flags.Cell.IMPREGNABLE);
        }
        isImpregnable(x, y) {
            return !!(this._flags[x][y] & Flags$1.IMPREGNABLE);
        }
        hasTile(x, y, tile) {
            if (typeof tile === 'string') {
                tile = tileId(tile);
            }
            return this.hasXY(x, y) && this._tiles[x][y] == tile;
        }
        getChokeCount(x, y) {
            return this._chokeCounts[x][y];
        }
        setChokeCount(x, y, count) {
            this._chokeCounts[x][y] = count;
        }
        getFlags(x, y) {
            return this._flags[x][y];
        }
        setChokepoint(x, y) {
            this._flags[x][y] |= Flags$1.CHOKEPOINT;
        }
        isChokepoint(x, y) {
            return !!(this._flags[x][y] & Flags$1.CHOKEPOINT);
        }
        clearChokepoint(x, y) {
            this._flags[x][y] &= ~Flags$1.CHOKEPOINT;
        }
        setGateSite(x, y) {
            this._flags[x][y] |= Flags$1.GATE_SITE;
        }
        isGateSite(x, y) {
            return !!(this._flags[x][y] & Flags$1.GATE_SITE);
        }
        clearGateSite(x, y) {
            this._flags[x][y] &= ~Flags$1.GATE_SITE;
        }
        setInLoop(x, y) {
            this._flags[x][y] |= Flags$1.IN_LOOP;
        }
        isInLoop(x, y) {
            return !!(this._flags[x][y] & Flags$1.IN_LOOP);
        }
        clearInLoop(x, y) {
            this._flags[x][y] &= ~Flags$1.IN_LOOP;
        }
        analyze(updateChokeCounts = true) {
            analyze(this, updateChokeCounts);
        }
        snapshot() {
            const other = new Site(this.width, this.height);
            other.copy(this);
            return other;
        }
        restore(snapshot) {
            this.copy(snapshot);
        }
        nextMachineId() {
            this.machineCount += 1;
            return this.machineCount;
        }
        setMachine(x, y, id, isRoom) {
            this._machine[x][y] = id;
            const flag = isRoom ? Flags$1.IN_MACHINE : Flags$1.IN_AREA_MACHINE;
            this._flags[x][y] |= flag;
        }
        isAreaMachine(x, y) {
            return !!(this._machine[x][y] & Flags$1.IN_AREA_MACHINE);
        }
        isInMachine(x, y) {
            return this._machine[x][y] > 0;
        }
        getMachine(x, y) {
            return this._machine[x][y];
        }
        needsMachine(_x, _y) {
            // site.hasCellFlag(
            //     i,
            //     j,
            //     GWM.flags.Cell.IS_WIRED | GWM.flags.Cell.IS_CIRCUIT_BREAKER
            // );
            return false;
        }
        updateDoorDirs() {
            this._doors.update((_v, x, y) => {
                return directionOfDoorSite(this, x, y);
            });
        }
        getDoorDir(x, y) {
            return this._doors[x][y];
        }
        // tileBlocksMove(tile: number): boolean {
        //     return (
        //         tile === WALL ||
        //         tile === DEEP ||
        //         tile === IMPREGNABLE ||
        //         tile === DIG.NOTHING
        //     );
        // }
        isOccupied(x, y) {
            return this.hasActor(x, y) || this.hasItem(x, y);
        }
        canSpawnActor(x, y, _actor) {
            // const cell = map.cell(x, y);
            // if (actor.avoidsCell(cell)) return false;
            // if (Map.isHallway(map, x, y)) {
            //     return false;
            // }
            return this.isFloor(x, y);
        }
        eachActor(cb) {
            this.actors.forEach(cb);
        }
        addActor(x, y, a) {
            a.x = x;
            a.y = y;
            this.actors.push(a);
            return this.actors.length;
        }
        getActor(i) {
            return this.actors[i];
        }
        // removeActor(a: HORDE.ActorInstance): void {
        //     GWU.arrayDelete(this.actors, a);
        // }
        forbidsActor(x, y, _a) {
            return !this.isFloor(x, y);
        }
        hasActor(x, y) {
            return this.actors.some((a) => a.x === x && a.y === y);
        }
        eachItem(cb) {
            this.items.forEach(cb);
        }
        addItem(x, y, i) {
            i.x = x;
            i.y = y;
            this.items.push(i);
            return this.items.length;
        }
        getItem(i) {
            return this.items[i];
        }
        // removeItem(i: ITEM.ItemInstance): void {
        //     GWU.arrayDelete(this.items, i);
        // }
        forbidsItem(x, y, _i) {
            return !this.isFloor(x, y);
        }
        hasItem(x, y) {
            return this.items.some((i) => i.x === x && i.y === y);
        }
    }

    class NullLogger {
        onDigFirstRoom() { }
        onRoomCandidate() { }
        onRoomFailed() { }
        onRoomSuccess() { }
        onLoopsAdded() { }
        onLakesAdded() { }
        onBridgesAdded() { }
        onStairsAdded() { }
        onBuildError() { }
        onBlueprintPick() { }
        onBlueprintCandidates() { }
        onBlueprintStart() { }
        onBlueprintInterior() { }
        onBlueprintFail() { }
        onBlueprintSuccess() { }
        onStepStart() { }
        onStepCandidates() { }
        onStepInstanceSuccess() { }
        onStepInstanceFail() { }
        onStepSuccess() { }
        onStepFail() { }
    }

    const Fl$1 = GWU__namespace.flag.fl;
    var StepFlags;
    (function (StepFlags) {
        StepFlags[StepFlags["BS_OUTSOURCE_ITEM_TO_MACHINE"] = Fl$1(1)] = "BS_OUTSOURCE_ITEM_TO_MACHINE";
        StepFlags[StepFlags["BS_BUILD_VESTIBULE"] = Fl$1(2)] = "BS_BUILD_VESTIBULE";
        StepFlags[StepFlags["BS_ADOPT_ITEM"] = Fl$1(3)] = "BS_ADOPT_ITEM";
        StepFlags[StepFlags["BS_BUILD_AT_ORIGIN"] = Fl$1(4)] = "BS_BUILD_AT_ORIGIN";
        StepFlags[StepFlags["BS_PERMIT_BLOCKING"] = Fl$1(5)] = "BS_PERMIT_BLOCKING";
        StepFlags[StepFlags["BS_TREAT_AS_BLOCKING"] = Fl$1(6)] = "BS_TREAT_AS_BLOCKING";
        StepFlags[StepFlags["BS_NEAR_ORIGIN"] = Fl$1(7)] = "BS_NEAR_ORIGIN";
        StepFlags[StepFlags["BS_FAR_FROM_ORIGIN"] = Fl$1(8)] = "BS_FAR_FROM_ORIGIN";
        StepFlags[StepFlags["BS_IN_VIEW_OF_ORIGIN"] = Fl$1(9)] = "BS_IN_VIEW_OF_ORIGIN";
        StepFlags[StepFlags["BS_IN_PASSABLE_VIEW_OF_ORIGIN"] = Fl$1(10)] = "BS_IN_PASSABLE_VIEW_OF_ORIGIN";
        StepFlags[StepFlags["BS_HORDE_TAKES_ITEM"] = Fl$1(11)] = "BS_HORDE_TAKES_ITEM";
        StepFlags[StepFlags["BS_HORDE_SLEEPING"] = Fl$1(12)] = "BS_HORDE_SLEEPING";
        StepFlags[StepFlags["BS_HORDE_FLEEING"] = Fl$1(13)] = "BS_HORDE_FLEEING";
        StepFlags[StepFlags["BS_HORDES_DORMANT"] = Fl$1(14)] = "BS_HORDES_DORMANT";
        StepFlags[StepFlags["BS_ITEM_IS_KEY"] = Fl$1(15)] = "BS_ITEM_IS_KEY";
        StepFlags[StepFlags["BS_ITEM_IDENTIFIED"] = Fl$1(16)] = "BS_ITEM_IDENTIFIED";
        StepFlags[StepFlags["BS_ITEM_PLAYER_AVOIDS"] = Fl$1(17)] = "BS_ITEM_PLAYER_AVOIDS";
        StepFlags[StepFlags["BS_EVERYWHERE"] = Fl$1(18)] = "BS_EVERYWHERE";
        StepFlags[StepFlags["BS_ALTERNATIVE"] = Fl$1(19)] = "BS_ALTERNATIVE";
        StepFlags[StepFlags["BS_ALTERNATIVE_2"] = Fl$1(20)] = "BS_ALTERNATIVE_2";
        StepFlags[StepFlags["BS_BUILD_IN_WALLS"] = Fl$1(21)] = "BS_BUILD_IN_WALLS";
        StepFlags[StepFlags["BS_BUILD_ANYWHERE_ON_LEVEL"] = Fl$1(22)] = "BS_BUILD_ANYWHERE_ON_LEVEL";
        StepFlags[StepFlags["BS_REPEAT_UNTIL_NO_PROGRESS"] = Fl$1(23)] = "BS_REPEAT_UNTIL_NO_PROGRESS";
        StepFlags[StepFlags["BS_IMPREGNABLE"] = Fl$1(24)] = "BS_IMPREGNABLE";
        StepFlags[StepFlags["BS_NO_BLOCK_ORIGIN"] = Fl$1(25)] = "BS_NO_BLOCK_ORIGIN";
        // TODO - BS_ALLOW_IN_HALLWAY instead?
        StepFlags[StepFlags["BS_NOT_IN_HALLWAY"] = Fl$1(27)] = "BS_NOT_IN_HALLWAY";
        StepFlags[StepFlags["BS_ALLOW_BOUNDARY"] = Fl$1(28)] = "BS_ALLOW_BOUNDARY";
        StepFlags[StepFlags["BS_SKELETON_KEY"] = Fl$1(29)] = "BS_SKELETON_KEY";
        StepFlags[StepFlags["BS_KEY_DISPOSABLE"] = Fl$1(30)] = "BS_KEY_DISPOSABLE";
    })(StepFlags || (StepFlags = {}));
    class BuildStep {
        // next: null = null;
        // id = 'n/a';
        constructor(cfg = {}) {
            this.tile = null;
            this.flags = 0;
            this.pad = 0;
            this.item = null;
            this.horde = null;
            this.feature = null;
            this.chance = 0;
            this.index = -1;
            this.tile = cfg.tile || null;
            if (cfg.flags) {
                this.flags = GWU__namespace.flag.from(StepFlags, cfg.flags);
            }
            if (cfg.pad) {
                this.pad = cfg.pad;
            }
            this.count = GWU__namespace.range.make(cfg.count || 1);
            if (typeof cfg.item === 'string') {
                this.item = { tags: cfg.item };
            }
            else if (cfg.item) {
                // @ts-ignore
                this.item = Object.assign({ tags: '' }, cfg.item);
                if (this.item.feature) {
                    this.item.feature = make$1(this.item.feature);
                }
            }
            else {
                this.item = null;
            }
            if (cfg.horde) {
                if (cfg.horde === true) {
                    this.horde = { tags: '' };
                }
                else if (typeof cfg.horde === 'string') {
                    this.horde = { tags: cfg.horde };
                }
                else {
                    // @ts-ignore
                    this.horde = Object.assign({ tags: '' }, cfg.horde);
                    if (this.horde.feature) {
                        this.horde.feature = make$1(this.horde.feature);
                    }
                }
            }
            else {
                this.horde = null;
            }
            if (cfg.feature) {
                this.feature = make$1(cfg.feature);
            }
            else {
                this.feature = null;
            }
            if (this.item && this.flags & StepFlags.BS_ADOPT_ITEM) {
                throw new Error('Cannot have blueprint step with item and BS_ADOPT_ITEM.');
            }
            if (this.buildAtOrigin && this.count.hi > 1) {
                throw new Error('Cannot have count > 1 for step with BS_BUILD_AT_ORIGIN.');
            }
            if (this.buildAtOrigin && this.repeatUntilNoProgress) {
                throw new Error('Cannot have BS_BUILD_AT_ORIGIN and BS_REPEAT_UNTIL_NO_PROGRESS together in a build step.');
            }
            if (this.hordeTakesItem && !this.horde) {
                throw new Error('Cannot have BS_HORDE_TAKES_ITEM without a horde configured.');
            }
        }
        get allowBoundary() {
            return !!(this.flags & StepFlags.BS_ALLOW_BOUNDARY);
        }
        get notInHallway() {
            return !!(this.flags & StepFlags.BS_NOT_IN_HALLWAY);
        }
        get buildInWalls() {
            return !!(this.flags & StepFlags.BS_BUILD_IN_WALLS);
        }
        get buildAnywhere() {
            return !!(this.flags & StepFlags.BS_BUILD_ANYWHERE_ON_LEVEL);
        }
        get repeatUntilNoProgress() {
            return !!(this.flags & StepFlags.BS_REPEAT_UNTIL_NO_PROGRESS);
        }
        get permitBlocking() {
            return !!(this.flags & StepFlags.BS_PERMIT_BLOCKING);
        }
        get treatAsBlocking() {
            return !!(this.flags &
                (StepFlags.BS_TREAT_AS_BLOCKING | StepFlags.BS_NO_BLOCK_ORIGIN));
        }
        get noBlockOrigin() {
            return !!(this.flags & StepFlags.BS_NO_BLOCK_ORIGIN);
        }
        get adoptItem() {
            return !!(this.flags & StepFlags.BS_ADOPT_ITEM);
        }
        get itemIsKey() {
            return !!(this.flags & StepFlags.BS_ITEM_IS_KEY);
        }
        get keyIsDisposable() {
            return !!(this.flags & StepFlags.BS_KEY_DISPOSABLE);
        }
        get outsourceItem() {
            return !!(this.flags & StepFlags.BS_OUTSOURCE_ITEM_TO_MACHINE);
        }
        get impregnable() {
            return !!(this.flags & StepFlags.BS_IMPREGNABLE);
        }
        get buildVestibule() {
            return !!(this.flags & StepFlags.BS_BUILD_VESTIBULE);
        }
        get hordeTakesItem() {
            return !!(this.flags & StepFlags.BS_HORDE_TAKES_ITEM);
        }
        get generateEverywhere() {
            return !!(this.flags &
                StepFlags.BS_EVERYWHERE &
                ~StepFlags.BS_BUILD_AT_ORIGIN);
        }
        get buildAtOrigin() {
            return !!(this.flags & StepFlags.BS_BUILD_AT_ORIGIN);
        }
        get buildsInstances() {
            return !!(this.feature ||
                this.tile ||
                this.item ||
                this.horde ||
                this.adoptItem);
        }
        // makeItem(data: BuildData): ITEM.ItemInfo | null {
        //     if (!this.item) return null;
        //     return ITEM.pick(data.depth, this.item);
        // }
        // cellIsCandidate(
        //     builder: BuildData,
        //     blueprint: Blueprint,
        //     x: number,
        //     y: number,
        //     distanceBound: [number, number]
        // ) {
        //     return cellIsCandidate(builder, blueprint, this, x, y, distanceBound);
        // }
        // distanceBound(builder: BuildData): [number, number] {
        //     return calcDistanceBound(builder, this);
        // }
        // updateViewMap(builder: BuildData): void {
        //     updateViewMap(builder, this);
        // }
        // build(
        //     builder: BuildData,
        //     blueprint: Blueprint,
        //     adoptedItem: GWM.item.Item | null
        // ): boolean {
        //     return buildStep(builder, blueprint, this, adoptedItem);
        // }
        markCandidates(data, candidates, distanceBound = [0, 10000]) {
            updateViewMap(data, this);
            const blueprint = data.blueprint;
            let count = 0;
            candidates.update((_v, i, j) => {
                const candidateType = cellIsCandidate(data, blueprint, this, i, j, distanceBound);
                if (candidateType === CandidateType.OK) {
                    count++;
                }
                return candidateType;
            });
            return count;
        }
        makePersonalSpace(_data, x, y, candidates) {
            let count = 0;
            if (this.pad < 1)
                return 0; // do not mark occupied
            // or...
            // if (this.buildEverywhere) return 0;  // do not mark occupied
            for (let i = x - this.pad; i <= x + this.pad; i++) {
                for (let j = y - this.pad; j <= y + this.pad; j++) {
                    if (candidates.hasXY(i, j)) {
                        if (candidates[i][j] == 1) {
                            candidates[i][j] = 0;
                            ++count;
                        }
                        // builder.occupied[i][j] = 1;
                    }
                }
            }
            return count;
        }
        toString() {
            let parts = [];
            if (this.tile) {
                parts.push('tile: ' + this.tile);
            }
            if (this.feature) {
                parts.push('effect: ' + JSON.stringify(this.feature));
            }
            if (this.item) {
                parts.push('item: ' + JSON.stringify(this.item));
            }
            if (this.horde) {
                parts.push('horde: ' + JSON.stringify(this.horde));
            }
            if (this.pad > 1) {
                parts.push('pad: ' + this.pad);
            }
            if (this.count.lo > 1 || this.count.hi > 1) {
                parts.push('count: ' + this.count.toString());
            }
            if (this.chance) {
                parts.push('chance: ' + this.chance);
            }
            if (this.flags) {
                parts.push('flags: ' + GWU__namespace.flag.toString(StepFlags, this.flags));
            }
            return '{ ' + parts.join(', ') + ' }';
        }
    }
    function updateViewMap(builder, buildStep) {
        if (buildStep.flags &
            (StepFlags.BS_IN_VIEW_OF_ORIGIN |
                StepFlags.BS_IN_PASSABLE_VIEW_OF_ORIGIN)) {
            const site = builder.site;
            if (buildStep.flags & StepFlags.BS_IN_PASSABLE_VIEW_OF_ORIGIN) {
                const fov = new GWU__namespace.fov.FOV({
                    isBlocked: (x, y) => {
                        return site.blocksPathing(x, y) || site.blocksVision(x, y);
                    },
                    hasXY: (x, y) => {
                        return site.hasXY(x, y);
                    },
                });
                fov.calculate(builder.originX, builder.originY, 50, (x, y) => {
                    builder.viewMap[x][y] = 1;
                });
            }
            else {
                const fov = new GWU__namespace.fov.FOV({
                    isBlocked: (x, y) => {
                        return site.blocksVision(x, y);
                    },
                    hasXY: (x, y) => {
                        return site.hasXY(x, y);
                    },
                });
                fov.calculate(builder.originX, builder.originY, 50, (x, y) => {
                    builder.viewMap[x][y] = 1;
                });
            }
            builder.viewMap[builder.originX][builder.originY] = 1;
        }
    }
    function calcDistanceBound(builder, buildStep) {
        const distanceBound = [0, 10000];
        if (buildStep.flags & StepFlags.BS_NEAR_ORIGIN) {
            distanceBound[1] = builder.distance25;
        }
        if (buildStep.flags & StepFlags.BS_FAR_FROM_ORIGIN) {
            distanceBound[0] = builder.distance75;
        }
        return distanceBound;
    }
    var CandidateType;
    (function (CandidateType) {
        CandidateType[CandidateType["NOT_CANDIDATE"] = 0] = "NOT_CANDIDATE";
        CandidateType[CandidateType["OK"] = 1] = "OK";
        CandidateType[CandidateType["IN_HALLWAY"] = 2] = "IN_HALLWAY";
        CandidateType[CandidateType["ON_BOUNDARY"] = 3] = "ON_BOUNDARY";
        CandidateType[CandidateType["MUST_BE_ORIGIN"] = 4] = "MUST_BE_ORIGIN";
        CandidateType[CandidateType["NOT_ORIGIN"] = 5] = "NOT_ORIGIN";
        CandidateType[CandidateType["OCCUPIED"] = 6] = "OCCUPIED";
        CandidateType[CandidateType["NOT_IN_VIEW"] = 7] = "NOT_IN_VIEW";
        CandidateType[CandidateType["TOO_FAR"] = 8] = "TOO_FAR";
        CandidateType[CandidateType["TOO_CLOSE"] = 9] = "TOO_CLOSE";
        CandidateType[CandidateType["INVALID_WALL"] = 10] = "INVALID_WALL";
        CandidateType[CandidateType["BLOCKED"] = 11] = "BLOCKED";
        CandidateType[CandidateType["FAILED"] = 12] = "FAILED";
    })(CandidateType || (CandidateType = {}));
    function cellIsCandidate(builder, blueprint, buildStep, x, y, distanceBound) {
        const site = builder.site;
        // No building in the hallway if it's prohibited.
        // This check comes before the origin check, so an area machine will fail altogether
        // if its origin is in a hallway and the feature that must be built there does not permit as much.
        if (buildStep.notInHallway &&
            GWU__namespace.xy.arcCount(x, y, (i, j) => site.hasXY(i, j) && site.isPassable(i, j)) > 1) {
            return CandidateType.IN_HALLWAY;
        }
        // if (buildStep.noBlockOrigin) {
        //     let ok = true;
        //     GWU.xy.eachNeighbor(
        //         x,
        //         y,
        //         (nx, ny) => {
        //             if (nx === builder.originX && ny === builder.originY) {
        //                 ok = false;
        //             }
        //         },
        //         true
        //     );
        //     if (!ok) return false;
        // }
        // No building along the perimeter of the level if it's prohibited.
        if ((x == 0 || x == site.width - 1 || y == 0 || y == site.height - 1) &&
            !buildStep.allowBoundary) {
            return CandidateType.ON_BOUNDARY;
        }
        // The origin is a candidate if the feature is flagged to be built at the origin.
        // If it's a room, the origin (i.e. doorway) is otherwise NOT a candidate.
        if (buildStep.buildAtOrigin) {
            if (x == builder.originX && y == builder.originY)
                return CandidateType.OK;
            return CandidateType.MUST_BE_ORIGIN;
        }
        else if (blueprint.isRoom &&
            x == builder.originX &&
            y == builder.originY) {
            return CandidateType.NOT_ORIGIN;
        }
        // No building in another feature's personal space!
        if (builder.occupied[x][y]) {
            return CandidateType.OCCUPIED;
        }
        // Must be in the viewmap if the appropriate flag is set.
        if (buildStep.flags &
            (StepFlags.BS_IN_VIEW_OF_ORIGIN |
                StepFlags.BS_IN_PASSABLE_VIEW_OF_ORIGIN) &&
            !builder.viewMap[x][y]) {
            return CandidateType.NOT_IN_VIEW;
        }
        // Do a distance check if the feature requests it.
        let distance = 10000;
        if (site.isWall(x, y)) {
            // Distance is calculated for walls too.
            GWU__namespace.xy.eachNeighbor(x, y, (i, j) => {
                if (!builder.distanceMap.hasXY(i, j))
                    return;
                if (!site.blocksPathing(i, j) &&
                    distance > builder.distanceMap.getDistance(i, j) + 1) {
                    distance = builder.distanceMap.getDistance(i, j) + 1;
                }
            }, true);
        }
        else {
            distance = builder.distanceMap.getDistance(x, y);
        }
        if (distance > distanceBound[1])
            return CandidateType.TOO_FAR; // distance exceeds max
        if (distance < distanceBound[0])
            return CandidateType.TOO_CLOSE;
        if (buildStep.buildInWalls) {
            // If we're supposed to build in a wall...
            const cellMachine = site.getMachine(x, y);
            if (!builder.interior[x][y] &&
                (!cellMachine || cellMachine == builder.machineNumber) &&
                site.isWall(x, y)) {
                let ok = false;
                let failed = false;
                // ...and this location is a wall that's not already machined...
                GWU__namespace.xy.eachNeighbor(x, y, (newX, newY) => {
                    if (failed)
                        return;
                    if (!site.hasXY(newX, newY))
                        return;
                    if (!builder.interior[newX][newY] &&
                        !buildStep.buildAnywhere) {
                        return;
                    }
                    // ...and it's next to an interior spot or permitted elsewhere and next to passable spot...
                    const neighborMachine = site.getMachine(newX, newY);
                    if (!site.blocksPathing(newX, newY) &&
                        (!neighborMachine ||
                            neighborMachine == builder.machineNumber) &&
                        !(newX == builder.originX && newY == builder.originY)) {
                        if (buildStep.notInHallway &&
                            GWU__namespace.xy.arcCount(newX, newY, (i, j) => site.hasXY(i, j) && site.isPassable(i, j)) > 1) {
                            // return CandidateType.IN_HALLWAY;
                            failed = true;
                            ok = false;
                        }
                        else {
                            ok = true;
                        }
                    }
                }, true);
                return ok ? CandidateType.OK : CandidateType.INVALID_WALL;
            }
            return CandidateType.NOT_CANDIDATE;
        }
        else if (site.isWall(x, y)) {
            // Can't build in a wall unless instructed to do so.
            return CandidateType.INVALID_WALL;
        }
        else if (buildStep.buildAnywhere) {
            if (buildStep.item && site.blocksItems(x, y)) {
                return CandidateType.BLOCKED;
            }
            else {
                return CandidateType.OK;
            }
        }
        else if (builder.interior[x][y]) {
            return CandidateType.OK;
        }
        return CandidateType.FAILED;
    }
    // export function buildStep(
    //     builder: BuildData,
    //     blueprint: Blueprint,
    //     buildStep: BuildStep,
    //     adoptedItem: GWM.item.Item | null
    // ): boolean {
    //     let wantCount = 0;
    //     let builtCount = 0;
    //     const site = builder.site;
    //     const candidates = GWU.grid.alloc(site.width, site.height);
    //     // Figure out the distance bounds.
    //     const distanceBound = calcDistanceBound(builder, buildStep);
    //     buildStep.updateViewMap(builder);
    //     // If the StepFlags.BS_REPEAT_UNTIL_NO_PROGRESS flag is set, repeat until we fail to build the required number of instances.
    //     // Make a master map of candidate locations for this feature.
    //     let qualifyingTileCount = markCandidates(
    //         candidates,
    //         builder,
    //         blueprint,
    //         buildStep,
    //         distanceBound
    //     );
    //     if (!buildStep.generateEverywhere) {
    //         wantCount = buildStep.count.value();
    //     }
    //     if (!qualifyingTileCount || qualifyingTileCount < buildStep.count.lo) {
    //         console.log(
    //             ' - Only %s qualifying tiles - want at least %s.',
    //             qualifyingTileCount,
    //             buildStep.count.lo
    //         );
    //         GWU.grid.free(candidates);
    //         return false;
    //     }
    //     let x = 0,
    //         y = 0;
    //     let success = true;
    //     let didSomething = false;
    //     do {
    //         success = true;
    //         // Find a location for the feature.
    //         if (buildStep.buildAtOrigin) {
    //             // Does the feature want to be at the origin? If so, put it there. (Just an optimization.)
    //             x = builder.originX;
    //             y = builder.originY;
    //         } else {
    //             // Pick our candidate location randomly, and also strike it from
    //             // the candidates map so that subsequent instances of this same feature can't choose it.
    //             [x, y] = site.rng.matchingLoc(
    //                 candidates.width,
    //                 candidates.height,
    //                 (x, y) => candidates[x][y] > 0
    //             );
    //         }
    //         // Don't waste time trying the same place again whether or not this attempt succeeds.
    //         candidates[x][y] = 0;
    //         qualifyingTileCount--;
    //         // Try to build the DF first, if any, since we don't want it to be disrupted by subsequently placed terrain.
    //         if (buildStep.effect) {
    //             success = site.fireEffect(buildStep.effect, x, y);
    //             didSomething = success;
    //         }
    //         // Now try to place the terrain tile, if any.
    //         if (success && buildStep.tile !== -1) {
    //             const tile = GWM.tile.get(buildStep.tile);
    //             if (
    //                 !(buildStep.flags & StepFlags.BS_PERMIT_BLOCKING) &&
    //                 (tile.blocksMove() ||
    //                     buildStep.flags & StepFlags.BS_TREAT_AS_BLOCKING)
    //             ) {
    //                 // Yes, check for blocking.
    //                 success = !SITE.siteDisruptedByXY(site, x, y, {
    //                     machine: site.machineCount,
    //                 });
    //             }
    //             if (success) {
    //                 success = site.setTile(x, y, tile);
    //                 didSomething = didSomething || success;
    //             }
    //         }
    //         // Generate an actor, if necessary
    //         // Generate an item, if necessary
    //         if (success && buildStep.item) {
    //             const item = site.makeRandomItem(buildStep.item);
    //             if (!item) {
    //                 success = false;
    //             }
    //             if (buildStep.flags & StepFlags.BS_ITEM_IS_KEY) {
    //                 item.key = GWM.entity.makeKeyInfo(
    //                     x,
    //                     y,
    //                     !!(buildStep.flags & StepFlags.BS_KEY_DISPOSABLE)
    //                 );
    //             }
    //             if (buildStep.flags & StepFlags.BS_OUTSOURCE_ITEM_TO_MACHINE) {
    //                 success = builder.buildRandom(
    //                     Flags.BP_ADOPT_ITEM,
    //                     -1,
    //                     -1,
    //                     item
    //                 );
    //                 if (success) {
    //                     didSomething = true;
    //                 }
    //             } else {
    //                 success = site.addItem(x, y, item);
    //                 didSomething = didSomething || success;
    //             }
    //         } else if (success && buildStep.flags & StepFlags.BS_ADOPT_ITEM) {
    //             // adopt item if necessary
    //             if (!adoptedItem) {
    //                 GWU.grid.free(candidates);
    //                 throw new Error(
    //                     'Failed to build blueprint because there is no adopted item.'
    //                 );
    //             }
    //             if (buildStep.flags & StepFlags.BS_TREAT_AS_BLOCKING) {
    //                 // Yes, check for blocking.
    //                 success = !SITE.siteDisruptedByXY(site, x, y);
    //             }
    //             if (success) {
    //                 success = site.addItem(x, y, adoptedItem);
    //                 if (success) {
    //                     didSomething = true;
    //                 } else {
    //                     console.log('- failed to add item', x, y);
    //                 }
    //             } else {
    //                 // console.log('- blocks map', x, y);
    //             }
    //         }
    //         if (success && didSomething) {
    //             // OK, if placement was successful, clear some personal space around the feature so subsequent features can't be generated too close.
    //             qualifyingTileCount -= makePersonalSpace(
    //                 builder,
    //                 x,
    //                 y,
    //                 candidates,
    //                 buildStep.pad
    //             );
    //             builtCount++; // we've placed an instance
    //             // Mark the feature location as part of the machine, in case it is not already inside of it.
    //             if (!(blueprint.flags & Flags.BP_NO_INTERIOR_FLAG)) {
    //                 site.setMachine(x, y, builder.machineNumber, blueprint.isRoom);
    //             }
    //             // Mark the feature location as impregnable if requested.
    //             if (buildStep.flags & StepFlags.BS_IMPREGNABLE) {
    //                 site.setCellFlag(x, y, GWM.flags.Cell.IMPREGNABLE);
    //             }
    //         }
    //         // Finished with this instance!
    //     } while (
    //         qualifyingTileCount > 0 &&
    //         (buildStep.generateEverywhere ||
    //             builtCount < wantCount ||
    //             buildStep.flags & StepFlags.BS_REPEAT_UNTIL_NO_PROGRESS)
    //     );
    //     if (success && buildStep.flags & StepFlags.BS_BUILD_VESTIBULE) {
    //         // Generate a door guard machine.
    //         // Try to create a sub-machine that qualifies.
    //         success = builder.buildRandom(
    //             Flags.BP_VESTIBULE,
    //             builder.originX,
    //             builder.originY
    //         );
    //         if (!success) {
    //             // console.log(
    //             //     `Depth ${builder.depth}: Failed to place blueprint ${blueprint.id} because it requires a vestibule and we couldn't place one.`
    //             // );
    //             // failure! abort!
    //             GWU.grid.free(candidates);
    //             return false;
    //         }
    //         ++builtCount;
    //     }
    //     //DEBUG printf("\nFinished feature %i. Here's the candidates map:", feat);
    //     //DEBUG logBuffer(candidates);
    //     success = builtCount > 0;
    //     GWU.grid.free(candidates);
    //     return success;
    // }

    class ConsoleLogger {
        onDigFirstRoom(site) {
            console.group('dig first room');
            site.dump();
            console.groupEnd();
        }
        onRoomCandidate(room, roomSite) {
            console.group('room candidate: ' + room.toString());
            roomSite.dump();
            console.groupEnd();
        }
        onRoomFailed(_site, _room, _roomSite, error) {
            console.log('Room Failed - ', error);
        }
        onRoomSuccess(site, room) {
            console.group('Added Room - ' + room.toString());
            site.dump();
            console.groupEnd();
        }
        onLoopsAdded(_site) {
            console.log('loops added');
        }
        onLakesAdded(_site) {
            console.log('lakes added');
        }
        onBridgesAdded(_site) {
            console.log('bridges added');
        }
        onStairsAdded(_site) {
            console.log('stairs added');
        }
        //
        onBuildError(error) {
            console.log(`onBuildError - error: ${error}`);
        }
        onBlueprintPick(data, flags, depth) {
            console.log(`onBlueprintPick - ${data.blueprint.id}, depth = ${depth}, matchingFlags = ${GWU__namespace.flag.toString(StepFlags, flags)}`);
        }
        onBlueprintCandidates(data) {
            const label = `onBlueprintCandidates - ${data.blueprint.id}`;
            console.group(label);
            data.candidates.dump();
            console.groupEnd();
        }
        onBlueprintStart(data) {
            console.group(`onBlueprintStart - ${data.blueprint.id} @ ${data.originX},${data.originY} : stepCount: ${data.blueprint.steps.length}, size: [${data.blueprint.size.toString()}], flags: ${GWU__namespace.flag.toString(StepFlags, data.blueprint.flags)}`);
        }
        onBlueprintInterior(data) {
            console.group(`onBlueprintInterior - ${data.blueprint.id}`);
            data.interior.dump();
            console.groupEnd();
        }
        onBlueprintFail(data, error) {
            console.log(`onBlueprintFail - ${data.blueprint.id} @ ${data.originX},${data.originY} : error: ${error}`);
            console.groupEnd();
        }
        onBlueprintSuccess(data) {
            console.log(`onBlueprintSuccess - ${data.blueprint.id} @ ${data.originX},${data.originY}`);
            console.groupEnd();
        }
        onStepStart(data, step) {
            console.group(`onStepStart - ${data.blueprint.id}[${data.blueprint.steps.indexOf(step) + 1}/${data.blueprint.steps.length}] @ ${data.originX},${data.originY} : count: [${step.count.toString()}], flags: ${GWU__namespace.flag.toString(StepFlags, step.flags)}`);
            console.log(step.toString());
        }
        onStepCandidates(data, step, candidates, wantCount) {
            const haveCount = candidates.count((v) => v == 1);
            console.log(`onStepCandidates - ${data.blueprint.id}[${data.blueprint.steps.indexOf(step) + 1}/${data.blueprint.steps.length}] @ ${data.originX},${data.originY} : wantCount: ${wantCount}, have: ${haveCount}`);
            candidates.dump();
            if (haveCount == 0) {
                console.log('No candidates - check interior');
                data.interior.dump();
            }
        }
        onStepInstanceSuccess(_data, _step, x, y) {
            console.log(`onStepInstance @ ${x},${y}`);
        }
        onStepInstanceFail(_data, _step, x, y, error) {
            console.log(`onStepInstanceFail @ ${x},${y} - error: ${error}`);
        }
        onStepSuccess(data, step) {
            console.log(`onStepSuccess - ${data.blueprint.id}[${data.blueprint.steps.indexOf(step) + 1}/${data.blueprint.steps.length}] @ ${data.originX},${data.originY} : count: [${step.count.toString()}], flags: ${GWU__namespace.flag.toString(StepFlags, step.flags)}`);
            console.groupEnd();
        }
        onStepFail(data, step, error) {
            console.log(`onStepFail - ${data.blueprint.id}[${data.blueprint.steps.indexOf(step) + 1}/${data.blueprint.steps.length}] @ ${data.originX},${data.originY} : error : ${error}`);
            console.groupEnd();
        }
    }

    // export * from './visualizer';

    var index$2 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        NullLogger: NullLogger,
        ConsoleLogger: ConsoleLogger
    });

    var index$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        log: index$2,
        tileIds: tileIds,
        allTiles: allTiles,
        installTile: installTile,
        getTile: getTile,
        tileId: tileId,
        blocksMove: blocksMove,
        hordes: hordes,
        installHorde: installHorde,
        pickHorde: pickHorde,
        spawnHorde: spawnHorde,
        items: items,
        installItem: installItem,
        pickItem: pickItem,
        makeItem: makeItem,
        getItemInfo: getItemInfo,
        Flags: Flags$1,
        Site: Site,
        loadSite: loadSite,
        directionOfDoorSite: directionOfDoorSite,
        chooseRandomDoorSites: chooseRandomDoorSites,
        fillCostGrid: fillCostGrid,
        siteDisruptedByXY: siteDisruptedByXY,
        siteDisruptedBy: siteDisruptedBy,
        siteDisruptedSize: siteDisruptedSize,
        computeDistanceMap: computeDistanceMap,
        clearInteriorFlag: clearInteriorFlag,
        analyze: analyze,
        updateChokepoints: updateChokepoints,
        floodFillCount: floodFillCount,
        updateLoopiness: updateLoopiness,
        resetLoopiness: resetLoopiness,
        checkLoopiness: checkLoopiness,
        fillInnerLoopGrid: fillInnerLoopGrid,
        cleanLoopiness: cleanLoopiness
    });

    class Hall extends GWU__namespace.xy.Bounds {
        constructor(x, y, width, height) {
            super(x, y, width, height);
            this.doors = [];
        }
        translate(dx, dy) {
            this.x += dx;
            this.y += dy;
            if (this.doors) {
                this.doors.forEach((d) => {
                    if (!d)
                        return;
                    if (d[0] < 0 || d[1] < 0)
                        return;
                    d[0] += dx;
                    d[1] += dy;
                });
            }
        }
    }
    function makeHall(loc, dirIndex, hallLength, hallWidth = 1) {
        const dir = GWU__namespace.xy.DIRS[dirIndex];
        const x = Math.min(loc[0], loc[0] + dir[0] * (hallLength - 1));
        const y = Math.min(loc[1], loc[1] + dir[1] * (hallLength - 1));
        const width = Math.abs(dir[0] * hallLength) || hallWidth;
        const height = Math.abs(dir[1] * hallLength) || hallWidth;
        return new Hall(x, y, width, height);
    }
    class Room extends GWU__namespace.xy.Bounds {
        constructor(x, y, width, height) {
            super(x, y, width, height);
            this.doors = [];
            this.hall = null;
        }
        get cx() {
            return this.x + Math.floor(this.width / 2);
        }
        get cy() {
            return this.y + Math.floor(this.height / 2);
        }
        translate(dx, dy) {
            this.x += dx;
            this.y += dy;
            if (this.doors) {
                this.doors.forEach((d) => {
                    if (!d)
                        return;
                    if (d[0] < 0 || d[1] < 0)
                        return;
                    d[0] += dx;
                    d[1] += dy;
                });
            }
            if (this.hall) {
                this.hall.translate(dx, dy);
            }
        }
    }
    // export interface DigInfo {
    //     room: RoomData;
    //     hall: HallData | null;
    //     tries: number;
    //     locs: GWU.xy.Loc[] | null;
    //     door: number;
    // }

    function checkConfig(config, expected = {}) {
        config = config || {};
        expected = expected || {};
        Object.entries(expected).forEach(([key, expect]) => {
            let have = config[key];
            if (key === 'tile') {
                if (have === undefined) {
                    config[key] = expect;
                }
                return;
            }
            if (expect === true) {
                // needs to be present
                if (!have) {
                    throw new Error('Missing required config for room digger: ' + key);
                }
            }
            else if (typeof expect === 'number') {
                // needs to be a number, this is the default
                have = have || expect;
            }
            else if (Array.isArray(expect)) {
                have = have || expect;
            }
            else {
                // just set the value
                have = have || expect;
            }
            const range = GWU__namespace.range.make(have); // throws if invalid
            config[key] = range;
        });
        return config;
    }
    class RoomDigger {
        constructor(config, expected = {}) {
            this.options = {};
            this.doors = [];
            this._setOptions(config, expected);
        }
        _setOptions(config, expected = {}) {
            this.options = checkConfig(config, expected);
        }
        create(site) {
            const result = this.carve(site);
            if (result) {
                if (!result.doors ||
                    result.doors.length == 0 ||
                    result.doors.every((loc) => !loc || loc[0] == -1)) {
                    result.doors = chooseRandomDoorSites(site);
                }
            }
            return result;
        }
    }
    var rooms = {};
    class ChoiceRoom extends RoomDigger {
        constructor(config = {}) {
            super(config, {
                choices: ['DEFAULT'],
            });
        }
        _setOptions(config, expected = {}) {
            const choices = config.choices || expected.choices;
            if (Array.isArray(choices)) {
                this.randomRoom = (rng) => rng.item(choices);
            }
            else if (typeof choices == 'object') {
                this.randomRoom = (rng) => rng.weighted(choices);
            }
            else {
                throw new Error('Expected choices to be either array of room ids or weighted map - ex: { ROOM_ID: weight }');
            }
        }
        carve(site) {
            let id = this.randomRoom(site.rng);
            const room = rooms[id];
            if (!room) {
                GWU__namespace.ERROR('Missing room digger choice: ' + id);
            }
            // debug('Chose room: ', id);
            return room.create(site);
        }
    }
    function choiceRoom(config, site) {
        // grid.fill(0);
        const digger = new ChoiceRoom(config);
        return digger.create(site);
    }
    class Cavern extends RoomDigger {
        constructor(config = {}) {
            super(config, {
                width: 12,
                height: 8,
            });
        }
        carve(site) {
            const width = this.options.width.value(site.rng);
            const height = this.options.height.value(site.rng);
            const tile = this.options.tile || 'FLOOR';
            const blobGrid = GWU__namespace.grid.alloc(site.width, site.height, 0);
            const minWidth = Math.floor(0.5 * width); // 6
            const maxWidth = width;
            const minHeight = Math.floor(0.5 * height); // 4
            const maxHeight = height;
            const blob = new GWU__namespace.blob.Blob({
                rng: site.rng,
                rounds: 5,
                minWidth: minWidth,
                minHeight: minHeight,
                maxWidth: maxWidth,
                maxHeight: maxHeight,
                percentSeeded: 55,
                birthParameters: 'ffffftttt',
                survivalParameters: 'ffffttttt',
            });
            const bounds = blob.carve(blobGrid.width, blobGrid.height, (x, y) => (blobGrid[x][y] = 1));
            // Position the new cave in the middle of the grid...
            const destX = Math.floor((site.width - bounds.width) / 2);
            const dx = destX - bounds.x;
            const destY = Math.floor((site.height - bounds.height) / 2);
            const dy = destY - bounds.y;
            // ...and copy it to the destination.
            blobGrid.forEach((v, x, y) => {
                if (v)
                    site.setTile(x + dx, y + dy, tile);
            });
            GWU__namespace.grid.free(blobGrid);
            return new Room(destX, destY, bounds.width, bounds.height);
        }
    }
    function cavern(config, site) {
        // grid.fill(0);
        const digger = new Cavern(config);
        return digger.create(site);
    }
    // From BROGUE => This is a special room that appears at the entrance to the dungeon on depth 1.
    class BrogueEntrance extends RoomDigger {
        constructor(config = {}) {
            super(config, {
                width: 20,
                height: 10,
            });
        }
        carve(site) {
            const width = this.options.width.value(site.rng);
            const height = this.options.height.value(site.rng);
            const tile = this.options.tile || 'FLOOR';
            const roomWidth = Math.floor(0.4 * width); // 8
            const roomHeight = height;
            const roomWidth2 = width;
            const roomHeight2 = Math.floor(0.5 * height); // 5
            // ALWAYS start at bottom+center of map
            const roomX = Math.floor(site.width / 2 - roomWidth / 2 - 1);
            const roomY = site.height - roomHeight - 2;
            const roomX2 = Math.floor(site.width / 2 - roomWidth2 / 2 - 1);
            const roomY2 = site.height - roomHeight2 - 2;
            GWU__namespace.xy.forRect(roomX, roomY, roomWidth, roomHeight, (x, y) => site.setTile(x, y, tile));
            GWU__namespace.xy.forRect(roomX2, roomY2, roomWidth2, roomHeight2, (x, y) => site.setTile(x, y, tile));
            const room = new Room(Math.min(roomX, roomX2), Math.min(roomY, roomY2), Math.max(roomWidth, roomWidth2), Math.max(roomHeight, roomHeight2));
            room.doors[GWU__namespace.xy.DOWN] = [Math.floor(site.width / 2), site.height - 2];
            return room;
        }
    }
    function brogueEntrance(config, site) {
        // grid.fill(0);
        const digger = new BrogueEntrance(config);
        return digger.create(site);
    }
    class Cross extends RoomDigger {
        constructor(config = {}) {
            super(config, { width: 12, height: 20 });
        }
        carve(site) {
            const width = this.options.width.value(site.rng);
            const height = this.options.height.value(site.rng);
            const tile = this.options.tile || 'FLOOR';
            const roomWidth = width;
            const roomWidth2 = Math.max(3, Math.floor((width * site.rng.range(25, 75)) / 100)); // [4,20]
            const roomHeight = Math.max(3, Math.floor((height * site.rng.range(25, 75)) / 100)); // [2,5]
            const roomHeight2 = height;
            const roomX = Math.floor((site.width - roomWidth) / 2);
            const roomX2 = roomX + site.rng.range(2, Math.max(2, roomWidth - roomWidth2 - 2));
            const roomY2 = Math.floor((site.height - roomHeight2) / 2);
            const roomY = roomY2 +
                site.rng.range(2, Math.max(2, roomHeight2 - roomHeight - 2));
            GWU__namespace.xy.forRect(roomX, roomY, roomWidth, roomHeight, (x, y) => site.setTile(x, y, tile));
            GWU__namespace.xy.forRect(roomX2, roomY2, roomWidth2, roomHeight2, (x, y) => site.setTile(x, y, tile));
            return new Room(roomX, roomY2, Math.max(roomWidth, roomWidth2), Math.max(roomHeight, roomHeight2));
        }
    }
    function cross(config, site) {
        // grid.fill(0);
        const digger = new Cross(config);
        return digger.create(site);
    }
    class SymmetricalCross extends RoomDigger {
        constructor(config = {}) {
            super(config, { width: 7, height: 7 });
        }
        carve(site) {
            const width = this.options.width.value(site.rng);
            const height = this.options.height.value(site.rng);
            const tile = this.options.tile || 'FLOOR';
            let minorWidth = Math.max(3, Math.floor((width * site.rng.range(25, 50)) / 100)); // [2,4]
            // if (height % 2 == 0 && minorWidth > 2) {
            //     minorWidth -= 1;
            // }
            let minorHeight = Math.max(3, Math.floor((height * site.rng.range(25, 50)) / 100)); // [2,3]?
            // if (width % 2 == 0 && minorHeight > 2) {
            //     minorHeight -= 1;
            // }
            const x = Math.floor((site.width - width) / 2);
            const y = Math.floor((site.height - minorHeight) / 2);
            GWU__namespace.xy.forRect(x, y, width, minorHeight, (x, y) => site.setTile(x, y, tile));
            const x2 = Math.floor((site.width - minorWidth) / 2);
            const y2 = Math.floor((site.height - height) / 2);
            GWU__namespace.xy.forRect(x2, y2, minorWidth, height, (x, y) => site.setTile(x, y, tile));
            return new Room(Math.min(x, x2), Math.min(y, y2), Math.max(width, minorWidth), Math.max(height, minorHeight));
        }
    }
    function symmetricalCross(config, site) {
        // grid.fill(0);
        const digger = new SymmetricalCross(config);
        return digger.create(site);
    }
    class Rectangular extends RoomDigger {
        constructor(config = {}) {
            super(config, {
                width: [3, 6],
                height: [3, 6],
            });
        }
        carve(site) {
            const width = this.options.width.value(site.rng);
            const height = this.options.height.value(site.rng);
            const tile = this.options.tile || 'FLOOR';
            const x = Math.floor((site.width - width) / 2);
            const y = Math.floor((site.height - height) / 2);
            GWU__namespace.xy.forRect(x, y, width, height, (x, y) => site.setTile(x, y, tile));
            return new Room(x, y, width, height);
        }
    }
    function rectangular(config, site) {
        // grid.fill(0);
        const digger = new Rectangular(config);
        return digger.create(site);
    }
    class Circular extends RoomDigger {
        constructor(config = {}) {
            super(config, {
                radius: [3, 4],
            });
        }
        carve(site) {
            const radius = this.options.radius.value(site.rng);
            const tile = this.options.tile || 'FLOOR';
            const x = Math.floor(site.width / 2);
            const y = Math.floor(site.height / 2);
            if (radius > 1) {
                GWU__namespace.xy.forCircle(x, y, radius, (x, y) => site.setTile(x, y, tile));
            }
            return new Room(x - radius, y - radius, radius * 2 + 1, radius * 2 + 1);
        }
    }
    function circular(config, site) {
        // grid.fill(0);
        const digger = new Circular(config);
        return digger.create(site);
    }
    class BrogueDonut extends RoomDigger {
        constructor(config = {}) {
            super(config, {
                radius: [5, 10],
                ringMinWidth: 3,
                holeMinSize: 3,
                holeChance: 50,
            });
        }
        carve(site) {
            const radius = this.options.radius.value(site.rng);
            const ringMinWidth = this.options.ringMinWidth.value(site.rng);
            const holeMinSize = this.options.holeMinSize.value(site.rng);
            const tile = this.options.tile || 'FLOOR';
            const x = Math.floor(site.width / 2);
            const y = Math.floor(site.height / 2);
            GWU__namespace.xy.forCircle(x, y, radius, (x, y) => site.setTile(x, y, tile));
            if (radius > ringMinWidth + holeMinSize &&
                site.rng.chance(this.options.holeChance.value(site.rng))) {
                GWU__namespace.xy.forCircle(x, y, site.rng.range(holeMinSize, radius - holeMinSize), (x, y) => site.clearTile(x, y));
            }
            return new Room(x - radius, y - radius, radius * 2 + 1, radius * 2 + 1);
        }
    }
    function brogueDonut(config, site) {
        // grid.fill(0);
        const digger = new BrogueDonut(config);
        return digger.create(site);
    }
    class ChunkyRoom extends RoomDigger {
        constructor(config = {}) {
            super(config, {
                count: [2, 12],
                width: [5, 20],
                height: [5, 20],
            });
        }
        carve(site) {
            let i, x, y;
            let chunkCount = this.options.count.value(site.rng);
            const width = this.options.width.value(site.rng);
            const height = this.options.height.value(site.rng);
            const tile = this.options.tile || 'FLOOR';
            const minX = Math.floor(site.width / 2) - Math.floor(width / 2);
            const maxX = Math.floor(site.width / 2) + Math.floor(width / 2);
            const minY = Math.floor(site.height / 2) - Math.floor(height / 2);
            const maxY = Math.floor(site.height / 2) + Math.floor(height / 2);
            let left = Math.floor(site.width / 2);
            let right = left;
            let top = Math.floor(site.height / 2);
            let bottom = top;
            GWU__namespace.xy.forCircle(left, top, 2, (x, y) => site.setTile(x, y, tile));
            left -= 2;
            right += 2;
            top -= 2;
            bottom += 2;
            for (i = 0; i < chunkCount;) {
                x = site.rng.range(minX, maxX);
                y = site.rng.range(minY, maxY);
                if (site.isSet(x, y)) {
                    if (x - 2 < minX)
                        continue;
                    if (x + 2 > maxX)
                        continue;
                    if (y - 2 < minY)
                        continue;
                    if (y + 2 > maxY)
                        continue;
                    left = Math.min(x - 2, left);
                    right = Math.max(x + 2, right);
                    top = Math.min(y - 2, top);
                    bottom = Math.max(y + 2, bottom);
                    GWU__namespace.xy.forCircle(x, y, 2, (x, y) => site.setTile(x, y, tile));
                    i++;
                }
            }
            return new Room(left, top, right - left + 1, bottom - top + 1);
        }
    }
    function chunkyRoom(config, site) {
        // grid.fill(0);
        const digger = new ChunkyRoom(config);
        return digger.create(site);
    }
    function install$2(id, room) {
        rooms[id] = room;
        return room;
    }
    install$2('DEFAULT', new Rectangular());

    var room = /*#__PURE__*/Object.freeze({
        __proto__: null,
        checkConfig: checkConfig,
        RoomDigger: RoomDigger,
        rooms: rooms,
        ChoiceRoom: ChoiceRoom,
        choiceRoom: choiceRoom,
        Cavern: Cavern,
        cavern: cavern,
        BrogueEntrance: BrogueEntrance,
        brogueEntrance: brogueEntrance,
        Cross: Cross,
        cross: cross,
        SymmetricalCross: SymmetricalCross,
        symmetricalCross: symmetricalCross,
        Rectangular: Rectangular,
        rectangular: rectangular,
        Circular: Circular,
        circular: circular,
        BrogueDonut: BrogueDonut,
        brogueDonut: brogueDonut,
        ChunkyRoom: ChunkyRoom,
        chunkyRoom: chunkyRoom,
        install: install$2
    });

    const DIRS = GWU__namespace.xy.DIRS;
    function isDoorLoc(site, loc, dir) {
        if (!site.hasXY(loc[0], loc[1]))
            return false;
        // TODO - boundary?
        if (!site.isDiggable(loc[0], loc[1]))
            return false; // must be a wall/diggable space
        const room = [loc[0] - dir[0], loc[1] - dir[1]];
        if (!site.hasXY(room[0], room[1]))
            return false;
        // TODO - boundary?
        if (!site.isFloor(room[0], room[1]))
            return false; // must have floor in opposite direction
        return true;
    }
    function pickWidth(width, rng) {
        return GWU__namespace.clamp(_pickWidth(width, rng), 1, 3);
    }
    function _pickWidth(width, rng) {
        if (!width)
            return 1;
        if (typeof width === 'number')
            return width;
        rng = rng !== null && rng !== void 0 ? rng : GWU__namespace.rng.random;
        if (Array.isArray(width)) {
            width = rng.weighted(width) + 1;
        }
        else if (typeof width === 'string') {
            width = GWU__namespace.range.make(width).value(rng);
        }
        else if (width instanceof GWU__namespace.range.Range) {
            width = width.value(rng);
        }
        else {
            const weights = width;
            width = Number.parseInt(rng.weighted(weights));
        }
        return width;
    }
    function pickLength(dir, lengths, rng) {
        if (dir == GWU__namespace.xy.UP || dir == GWU__namespace.xy.DOWN) {
            return lengths[1].value(rng);
        }
        else {
            return lengths[0].value(rng);
        }
    }
    function pickHallDirection(site, doors, lengths) {
        // Pick a direction.
        let dir = GWU__namespace.xy.NO_DIRECTION;
        if (dir == GWU__namespace.xy.NO_DIRECTION) {
            const dirs = site.rng.sequence(4);
            for (let i = 0; i < 4; i++) {
                dir = dirs[i];
                const length = lengths[(i + 1) % 2].hi; // biggest measurement
                const door = doors[dir];
                if (door && door[0] != -1 && door[1] != -1) {
                    const dx = door[0] + Math.floor(DIRS[dir][0] * length);
                    const dy = door[1] + Math.floor(DIRS[dir][1] * length);
                    if (site.hasXY(dx, dy)) {
                        break; // That's our direction!
                    }
                }
                dir = GWU__namespace.xy.NO_DIRECTION;
            }
        }
        return dir;
    }
    function pickHallExits(site, x, y, dir, obliqueChance) {
        let newX, newY;
        const allowObliqueHallwayExit = site.rng.chance(obliqueChance);
        const hallDoors = [
        // [-1, -1],
        // [-1, -1],
        // [-1, -1],
        // [-1, -1],
        ];
        for (let dir2 = 0; dir2 < 4; dir2++) {
            newX = x + DIRS[dir2][0];
            newY = y + DIRS[dir2][1];
            if ((dir2 != dir && !allowObliqueHallwayExit) ||
                !site.hasXY(newX, newY) ||
                site.isSet(newX, newY)) ;
            else {
                hallDoors[dir2] = [newX, newY];
            }
        }
        return hallDoors;
    }
    class HallDigger {
        constructor(options = {}) {
            this.config = {
                width: 1,
                length: [GWU__namespace.range.make('2-15'), GWU__namespace.range.make('2-9')],
                tile: 'FLOOR',
                obliqueChance: 15,
                chance: 100,
            };
            this._setOptions(options);
        }
        _setOptions(options = {}) {
            if (options.width) {
                this.config.width = options.width;
            }
            if (options.length) {
                if (typeof options.length === 'number') {
                    const l = GWU__namespace.range.make(options.length);
                    this.config.length = [l, l];
                }
            }
            if (options.tile) {
                this.config.tile = options.tile;
            }
            if (options.chance) {
                this.config.chance = options.chance;
            }
        }
        create(site, doors = []) {
            doors = doors || chooseRandomDoorSites(site);
            if (!site.rng.chance(this.config.chance))
                return null;
            const dir = pickHallDirection(site, doors, this.config.length);
            if (dir === GWU__namespace.xy.NO_DIRECTION)
                return null;
            if (!doors[dir])
                return null;
            const width = pickWidth(this.config.width, site.rng);
            const length = pickLength(dir, this.config.length, site.rng);
            const doorLoc = doors[dir];
            if (width == 1) {
                return this.dig(site, dir, doorLoc, length);
            }
            else {
                return this.digWide(site, dir, doorLoc, length, width);
            }
        }
        _digLine(site, door, dir, length) {
            let x = door[0];
            let y = door[1];
            const tile = this.config.tile;
            for (let i = 0; i < length; i++) {
                site.setTile(x, y, tile);
                x += dir[0];
                y += dir[1];
            }
            x -= dir[0];
            y -= dir[1];
            return [x, y];
        }
        dig(site, dir, door, length) {
            const DIR = DIRS[dir];
            const [x, y] = this._digLine(site, door, DIR, length);
            const hall = makeHall(door, dir, length);
            hall.doors = pickHallExits(site, x, y, dir, this.config.obliqueChance);
            return hall;
        }
        digWide(site, dir, door, length, width) {
            const DIR = GWU__namespace.xy.DIRS[dir];
            const lower = [door[0] - DIR[1], door[1] - DIR[0]];
            const higher = [door[0] + DIR[1], door[1] + DIR[0]];
            this._digLine(site, door, DIR, length);
            let actual = 1;
            let startX = door[0];
            let startY = door[1];
            if (actual < width && isDoorLoc(site, lower, DIR)) {
                this._digLine(site, lower, DIR, length);
                startX = Math.min(lower[0], startX);
                startY = Math.min(lower[1], startY);
                ++actual;
            }
            if (actual < width && isDoorLoc(site, higher, DIR)) {
                this._digLine(site, higher, DIR, length);
                startX = Math.min(higher[0], startX);
                startY = Math.min(higher[1], startY);
                ++actual;
            }
            const hall = makeHall([startX, startY], dir, length, width);
            hall.doors = [];
            hall.doors[dir] = [
                door[0] + length * DIR[0],
                door[1] + length * DIR[1],
            ];
            // hall.width = width;
            return hall;
        }
    }
    function dig(config, site, doors) {
        const digger = new HallDigger(config);
        return digger.create(site, doors);
    }
    var halls = {};
    function install$1(id, hall) {
        // @ts-ignore
        halls[id] = hall;
        return hall;
    }
    install$1('DEFAULT', new HallDigger({ chance: 15 }));

    var hall = /*#__PURE__*/Object.freeze({
        __proto__: null,
        isDoorLoc: isDoorLoc,
        pickWidth: pickWidth,
        pickLength: pickLength,
        pickHallDirection: pickHallDirection,
        pickHallExits: pickHallExits,
        HallDigger: HallDigger,
        dig: dig,
        halls: halls,
        install: install$1
    });

    class Lakes {
        constructor(options = {}) {
            this.options = {
                height: 15,
                width: 30,
                minSize: 5,
                tries: 20,
                count: 1,
                canDisrupt: false,
                wreathTile: 'SHALLOW',
                wreathChance: 50,
                wreathSize: 1,
                tile: 'DEEP',
            };
            GWU__namespace.object.assignObject(this.options, options);
        }
        create(site) {
            let i, j, k;
            let x, y;
            let lakeMaxHeight, lakeMaxWidth, lakeMinSize, tries, maxCount, canDisrupt;
            let count = 0;
            lakeMaxHeight = this.options.height || 15; // TODO - Make this a range "5-15"
            lakeMaxWidth = this.options.width || 30; // TODO - Make this a range "5-30"
            lakeMinSize = this.options.minSize || 5;
            tries = this.options.tries || 20;
            maxCount = this.options.count || 1;
            canDisrupt = this.options.canDisrupt || false;
            const hasWreath = site.rng.chance(this.options.wreathChance)
                ? true
                : false;
            const wreathTile = this.options.wreathTile || 'SHALLOW';
            const wreathSize = this.options.wreathSize || 1; // TODO - make this a range "0-2" or a weighted choice { 0: 50, 1: 40, 2" 10 }
            const tile = this.options.tile || 'DEEP';
            const lakeGrid = GWU__namespace.grid.alloc(site.width, site.height, 0);
            let attempts = 0;
            while (attempts < maxCount && count < maxCount) {
                // lake generations
                const width = Math.round(((lakeMaxWidth - lakeMinSize) * (maxCount - attempts)) /
                    maxCount) + lakeMinSize;
                const height = Math.round(((lakeMaxHeight - lakeMinSize) * (maxCount - attempts)) /
                    maxCount) + lakeMinSize;
                const blob = new GWU__namespace.blob.Blob({
                    rng: site.rng,
                    rounds: 5,
                    minWidth: 4,
                    minHeight: 4,
                    maxWidth: width,
                    maxHeight: height,
                    percentSeeded: 55,
                    // birthParameters: 'ffffftttt',
                    // survivalParameters: 'ffffttttt',
                });
                lakeGrid.fill(0);
                const bounds = blob.carve(lakeGrid.width, lakeGrid.height, (x, y) => (lakeGrid[x][y] = 1));
                // console.log('LAKE ATTEMPT');
                // lakeGrid.dump();
                let success = false;
                for (k = 0; k < tries && !success; k++) {
                    // placement attempts
                    // propose a position for the top-left of the lakeGrid in the dungeon
                    x = site.rng.range(1 - bounds.x, lakeGrid.width - bounds.width - bounds.x - 2);
                    y = site.rng.range(1 - bounds.y, lakeGrid.height - bounds.height - bounds.y - 2);
                    if (canDisrupt || !this.isDisruptedBy(site, lakeGrid, -x, -y)) {
                        // level with lake is completely connected
                        //   dungeon.debug("Placed a lake!", x, y);
                        success = true;
                        // copy in lake
                        for (i = 0; i < bounds.width; i++) {
                            // skip boundary
                            for (j = 0; j < bounds.height; j++) {
                                // skip boundary
                                if (lakeGrid[i + bounds.x][j + bounds.y]) {
                                    const sx = i + bounds.x + x;
                                    const sy = j + bounds.y + y;
                                    site.setTile(sx, sy, tile);
                                    if (hasWreath) {
                                        // if (site.hasTile(sx, sy, wreathTile)) {
                                        //     site.clearTile(sx, sy, wreathTile);
                                        // }
                                        GWU__namespace.xy.forCircle(sx, sy, wreathSize, (i2, j2) => {
                                            if (site.isPassable(i2, j2) &&
                                                !lakeGrid[i2 - x][j2 - y]
                                            // SITE.isFloor(map, i, j) ||
                                            // SITE.isDoor(map, i, j)
                                            ) {
                                                site.setTile(i2, j2, wreathTile);
                                            }
                                        });
                                    }
                                }
                            }
                        }
                        break;
                    }
                }
                if (success) {
                    ++count;
                    attempts = 0;
                }
                else {
                    ++attempts;
                }
            }
            GWU__namespace.grid.free(lakeGrid);
            return count;
        }
        isDisruptedBy(site, lakeGrid, lakeToMapX = 0, lakeToMapY = 0) {
            const walkableGrid = GWU__namespace.grid.alloc(site.width, site.height);
            let disrupts = false;
            // Get all walkable locations after lake added
            GWU__namespace.xy.forRect(site.width, site.height, (i, j) => {
                const lakeX = i + lakeToMapX;
                const lakeY = j + lakeToMapY;
                if (lakeGrid.get(lakeX, lakeY)) {
                    if (site.isStairs(i, j)) {
                        disrupts = true;
                    }
                }
                else if (site.isPassable(i, j)) {
                    walkableGrid[i][j] = 1;
                }
            });
            let first = true;
            for (let i = 0; i < walkableGrid.width && !disrupts; ++i) {
                for (let j = 0; j < walkableGrid.height && !disrupts; ++j) {
                    if (walkableGrid[i][j] == 1) {
                        if (first) {
                            walkableGrid.floodFill(i, j, 1, 2);
                            first = false;
                        }
                        else {
                            disrupts = true;
                        }
                    }
                }
            }
            // console.log('WALKABLE GRID');
            // walkableGrid.dump();
            GWU__namespace.grid.free(walkableGrid);
            return disrupts;
        }
    }

    var lake = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Lakes: Lakes
    });

    class Bridges {
        constructor(options = {}) {
            this.options = {
                minDistance: 20,
                maxLength: 5,
            };
            GWU__namespace.object.assignObject(this.options, options);
        }
        create(site) {
            let count = 0;
            let newX, newY;
            let i, j, d, x, y;
            const maxLength = this.options.maxLength;
            const minDistance = this.options.minDistance;
            const pathGrid = new GWU__namespace.path.DijkstraMap();
            // const costGrid = GWU.grid.alloc(site.width, site.height);
            const dirCoords = [
                [1, 0],
                [0, 1],
            ];
            const seq = site.rng.sequence(site.width * site.height);
            for (i = 0; i < seq.length; i++) {
                x = Math.floor(seq[i] / site.height);
                y = seq[i] % site.height;
                if (
                // map.hasXY(x, y) &&
                // map.get(x, y) &&
                site.isPassable(x, y) &&
                    (site.isBridge(x, y) || !site.isAnyLiquid(x, y))) {
                    for (d = 0; d <= 1; d++) {
                        // Try right, then down
                        const bridgeDir = dirCoords[d];
                        newX = x + bridgeDir[0];
                        newY = y + bridgeDir[1];
                        j = maxLength;
                        // if (!map.hasXY(newX, newY)) continue;
                        // check for line of lake tiles
                        // if (isBridgeCandidate(newX, newY, bridgeDir)) {
                        if (site.isAnyLiquid(newX, newY) &&
                            !site.isBridge(newX, newY)) {
                            for (j = 0; j < maxLength; ++j) {
                                newX += bridgeDir[0];
                                newY += bridgeDir[1];
                                // if (!isBridgeCandidate(newX, newY, bridgeDir)) {
                                if (site.isBridge(newX, newY) ||
                                    !site.isAnyLiquid(newX, newY)) {
                                    break;
                                }
                            }
                        }
                        if (
                        // map.get(newX, newY) &&
                        site.isPassable(newX, newY) &&
                            j < maxLength) {
                            computeDistanceMap(site, pathGrid, newX, newY);
                            if (pathGrid.getDistance(x, y) > minDistance &&
                                pathGrid.getDistance(x, y) < GWU__namespace.path.BLOCKED) {
                                // and if the pathing distance between the two flanking floor tiles exceeds minDistance,
                                // dungeon.debug(
                                //     'Adding Bridge',
                                //     x,
                                //     y,
                                //     ' => ',
                                //     newX,
                                //     newY
                                // );
                                while (x !== newX || y !== newY) {
                                    if (this.isBridgeCandidate(site, x, y, bridgeDir)) {
                                        site.setTile(x, y, 'BRIDGE'); // map[x][y] = SITE.BRIDGE;
                                        // costGrid[x][y] = 1; // (Cost map also needs updating.)
                                    }
                                    else {
                                        site.setTile(x, y, 'FLOOR'); // map[x][y] = SITE.FLOOR;
                                        // costGrid[x][y] = 1;
                                    }
                                    x += bridgeDir[0];
                                    y += bridgeDir[1];
                                }
                                ++count;
                                break;
                            }
                        }
                    }
                }
            }
            // GWU.grid.free(costGrid);
            return count;
        }
        isBridgeCandidate(site, x, y, _bridgeDir) {
            if (site.isBridge(x, y))
                return true;
            if (!site.isAnyLiquid(x, y))
                return false;
            // if (!site.isAnyLiquid(x + bridgeDir[1], y + bridgeDir[0])) return false;
            // if (!site.isAnyLiquid(x - bridgeDir[1], y - bridgeDir[0])) return false;
            return true;
        }
    }

    var bridge = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Bridges: Bridges
    });

    class Stairs {
        constructor(options = {}) {
            this.options = {
                up: true,
                down: true,
                minDistance: 10,
                start: false,
                upTile: 'UP_STAIRS',
                downTile: 'DOWN_STAIRS',
                wall: 'IMPREGNABLE',
            };
            GWU__namespace.object.assignObject(this.options, options);
        }
        create(site) {
            let needUp = this.options.up !== false;
            let needDown = this.options.down !== false;
            const minDistance = this.options.minDistance ||
                Math.floor(Math.max(site.width, site.height) / 2);
            const locations = {};
            let upLoc = null;
            let downLoc = null;
            const isValidLoc = this.isStairXY.bind(this, site);
            if (this.options.start && typeof this.options.start !== 'string') {
                let start = this.options.start;
                if (start === true) {
                    start = site.rng.matchingLoc(site.width, site.height, isValidLoc);
                }
                else {
                    start = site.rng.matchingLocNear(GWU__namespace.xy.x(start), GWU__namespace.xy.y(start), isValidLoc);
                }
                locations.start = start;
            }
            if (Array.isArray(this.options.up) &&
                Array.isArray(this.options.down)) {
                const up = this.options.up;
                upLoc = site.rng.matchingLocNear(GWU__namespace.xy.x(up), GWU__namespace.xy.y(up), isValidLoc);
                const down = this.options.down;
                downLoc = site.rng.matchingLocNear(GWU__namespace.xy.x(down), GWU__namespace.xy.y(down), isValidLoc);
            }
            else if (Array.isArray(this.options.up) &&
                !Array.isArray(this.options.down)) {
                const up = this.options.up;
                upLoc = site.rng.matchingLocNear(GWU__namespace.xy.x(up), GWU__namespace.xy.y(up), isValidLoc);
                if (needDown) {
                    downLoc = site.rng.matchingLoc(site.width, site.height, (x, y) => {
                        if (
                        // @ts-ignore
                        GWU__namespace.xy.distanceBetween(x, y, upLoc[0], upLoc[1]) <
                            minDistance)
                            return false;
                        return isValidLoc(x, y);
                    });
                }
            }
            else if (Array.isArray(this.options.down) &&
                !Array.isArray(this.options.up)) {
                const down = this.options.down;
                downLoc = site.rng.matchingLocNear(GWU__namespace.xy.x(down), GWU__namespace.xy.y(down), isValidLoc);
                if (needUp) {
                    upLoc = site.rng.matchingLoc(site.width, site.height, (x, y) => {
                        if (GWU__namespace.xy.distanceBetween(x, y, downLoc[0], downLoc[1]) < minDistance)
                            return false;
                        return isValidLoc(x, y);
                    });
                }
            }
            else if (needUp) {
                upLoc = site.rng.matchingLoc(site.width, site.height, isValidLoc);
                if (needDown) {
                    downLoc = site.rng.matchingLoc(site.width, site.height, (x, y) => {
                        if (
                        // @ts-ignore
                        GWU__namespace.xy.distanceBetween(x, y, upLoc[0], upLoc[1]) <
                            minDistance)
                            return false;
                        return isValidLoc(x, y);
                    });
                }
            }
            else if (needDown) {
                downLoc = site.rng.matchingLoc(site.width, site.height, isValidLoc);
            }
            if (upLoc) {
                locations.up = upLoc.slice();
                this.setupStairs(site, upLoc[0], upLoc[1], this.options.upTile, this.options.wall);
                if (this.options.start === 'up') {
                    locations.start = locations.up;
                }
                else {
                    locations.end = locations.up;
                }
            }
            if (downLoc) {
                locations.down = downLoc.slice();
                this.setupStairs(site, downLoc[0], downLoc[1], this.options.downTile, this.options.wall);
                if (this.options.start === 'down') {
                    locations.start = locations.down;
                }
                else {
                    locations.end = locations.down;
                }
            }
            return upLoc || downLoc ? locations : null;
        }
        hasXY(site, x, y) {
            if (x < 0 || y < 0)
                return false;
            if (x >= site.width || y >= site.height)
                return false;
            return true;
        }
        isStairXY(site, x, y) {
            let count = 0;
            if (!this.hasXY(site, x, y) || !site.isDiggable(x, y))
                return false;
            for (let i = 0; i < 4; ++i) {
                const dir = GWU__namespace.xy.DIRS[i];
                if (!this.hasXY(site, x + dir[0], y + dir[1]))
                    return false;
                if (!this.hasXY(site, x - dir[0], y - dir[1]))
                    return false;
                if (site.isFloor(x + dir[0], y + dir[1])) {
                    count += 1;
                    if (!site.isDiggable(x - dir[0] + dir[1], y - dir[1] + dir[0]))
                        return false;
                    if (!site.isDiggable(x - dir[0] - dir[1], y - dir[1] - dir[0]))
                        return false;
                }
                else if (!site.isDiggable(x + dir[0], y + dir[1])) {
                    return false;
                }
            }
            return count == 1;
        }
        setupStairs(site, x, y, tile, wallTile) {
            const indexes = site.rng.sequence(4);
            let dir = null;
            for (let i = 0; i < indexes.length; ++i) {
                dir = GWU__namespace.xy.DIRS[i];
                const x0 = x + dir[0];
                const y0 = y + dir[1];
                if (site.isFloor(x0, y0)) {
                    if (site.isDiggable(x - dir[0], y - dir[1]))
                        break;
                }
                dir = null;
            }
            if (!dir)
                GWU__namespace.ERROR('No stair direction found!');
            site.setTile(x, y, tile);
            const dirIndex = GWU__namespace.xy.CLOCK_DIRS.findIndex(
            // @ts-ignore
            (d) => d[0] == dir[0] && d[1] == dir[1]);
            for (let i = 0; i < GWU__namespace.xy.CLOCK_DIRS.length; ++i) {
                const l = i ? i - 1 : 7;
                const r = (i + 1) % 8;
                if (i == dirIndex || l == dirIndex || r == dirIndex)
                    continue;
                const d = GWU__namespace.xy.CLOCK_DIRS[i];
                site.setTile(x + d[0], y + d[1], wallTile);
                // map.setCellFlags(x + d[0], y + d[1], Flags.Cell.IMPREGNABLE);
            }
            // dungeon.debug('setup stairs', x, y, tile);
            return true;
        }
    }

    var stairs = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Stairs: Stairs
    });

    class LoopDigger {
        constructor(options = {}) {
            this.options = {
                minDistance: 100,
                maxLength: 1,
                doorChance: 50,
            };
            GWU__namespace.object.assignObject(this.options, options);
        }
        create(site) {
            let startX, startY, endX, endY;
            let i, j, d, x, y;
            const minDistance = Math.min(this.options.minDistance, Math.floor(Math.max(site.width, site.height) / 2));
            const maxLength = this.options.maxLength;
            const pathGrid = new GWU__namespace.path.DijkstraMap();
            // const costGrid = GWU.grid.alloc(site.width, site.height);
            const dirCoords = [
                [1, 0],
                [0, 1],
            ];
            // SITE.fillCostGrid(site, costGrid);
            function isValidTunnelStart(x, y, dir) {
                if (!site.hasXY(x, y))
                    return false;
                if (!site.hasXY(x + dir[1], y + dir[0]))
                    return false;
                if (!site.hasXY(x - dir[1], y - dir[0]))
                    return false;
                if (site.isSet(x, y))
                    return false;
                if (site.isSet(x + dir[1], y + dir[0]))
                    return false;
                if (site.isSet(x - dir[1], y - dir[0]))
                    return false;
                return true;
            }
            function isValidTunnelEnd(x, y, dir) {
                if (!site.hasXY(x, y))
                    return false;
                if (!site.hasXY(x + dir[1], y + dir[0]))
                    return false;
                if (!site.hasXY(x - dir[1], y - dir[0]))
                    return false;
                if (site.isSet(x, y))
                    return true;
                if (site.isSet(x + dir[1], y + dir[0]))
                    return true;
                if (site.isSet(x - dir[1], y - dir[0]))
                    return true;
                return false;
            }
            let count = 0;
            const seq = site.rng.sequence(site.width * site.height);
            for (i = 0; i < seq.length; i++) {
                x = Math.floor(seq[i] / site.height);
                y = seq[i] % site.height;
                if (!site.isSet(x, y)) {
                    for (d = 0; d <= 1; d++) {
                        // Try a horizontal door, and then a vertical door.
                        let dir = dirCoords[d];
                        if (!isValidTunnelStart(x, y, dir))
                            continue;
                        j = maxLength;
                        // check up/left
                        if (site.hasXY(x + dir[0], y + dir[1]) &&
                            site.isPassable(x + dir[0], y + dir[1])) {
                            // just can't build directly into a door
                            if (!site.hasXY(x - dir[0], y - dir[1]) ||
                                site.isDoor(x - dir[0], y - dir[1])) {
                                continue;
                            }
                        }
                        else if (site.hasXY(x - dir[0], y - dir[1]) &&
                            site.isPassable(x - dir[0], y - dir[1])) {
                            if (!site.hasXY(x + dir[0], y + dir[1]) ||
                                site.isDoor(x + dir[0], y + dir[1])) {
                                continue;
                            }
                            dir = dir.map((v) => -1 * v);
                        }
                        else {
                            continue; // not valid start for tunnel
                        }
                        startX = x + dir[0];
                        startY = y + dir[1];
                        endX = x;
                        endY = y;
                        for (j = 0; j < maxLength; ++j) {
                            endX -= dir[0];
                            endY -= dir[1];
                            // if (site.hasXY(endX, endY) && !grid.cell(endX, endY).isNull()) {
                            if (isValidTunnelEnd(endX, endY, dir)) {
                                break;
                            }
                        }
                        if (j < maxLength) {
                            computeDistanceMap(site, pathGrid, startX, startY);
                            // pathGrid.fill(30000);
                            // pathGrid[startX][startY] = 0;
                            // dijkstraScan(pathGrid, costGrid, false);
                            if (pathGrid.getDistance(endX, endY) > minDistance &&
                                pathGrid.getDistance(endX, endY) < GWU__namespace.path.BLOCKED) {
                                // and if the pathing distance between the two flanking floor tiles exceeds minDistance,
                                // dungeon.debug(
                                //     'Adding Loop',
                                //     startX,
                                //     startY,
                                //     ' => ',
                                //     endX,
                                //     endY,
                                //     ' : ',
                                //     pathGrid[endX][endY]
                                // );
                                while (endX !== startX || endY !== startY) {
                                    if (site.isNothing(endX, endY)) {
                                        site.setTile(endX, endY, 'FLOOR');
                                        // costGrid[endX][endY] = 1; // (Cost map also needs updating.)
                                    }
                                    endX += dir[0];
                                    endY += dir[1];
                                }
                                // TODO - Door is optional
                                const tile = site.rng.chance(this.options.doorChance)
                                    ? 'DOOR'
                                    : 'FLOOR';
                                site.setTile(x, y, tile); // then turn the tile into a doorway.
                                ++count;
                                break;
                            }
                        }
                    }
                }
            }
            // pathGrid.free();
            // GWU.grid.free(costGrid);
            return count;
        }
    }
    // Add some loops to the otherwise simply connected network of rooms.
    function digLoops(site, opts = {}) {
        const digger = new LoopDigger(opts);
        return digger.create(site);
    }

    var loop = /*#__PURE__*/Object.freeze({
        __proto__: null,
        LoopDigger: LoopDigger,
        digLoops: digLoops
    });

    class Digger {
        constructor(options = {}) {
            var _a, _b;
            this.seed = 0;
            this.rooms = { fails: 20 };
            this.doors = { chance: 15 };
            this.halls = { chance: 15 };
            this.loops = {};
            this.lakes = {};
            this.bridges = {};
            this.stairs = {};
            this.boundary = true;
            // startLoc: GWU.xy.Loc = [-1, -1];
            // endLoc: GWU.xy.Loc = [-1, -1];
            this.locations = {};
            this._locs = {};
            this.goesUp = false;
            this.seed = options.seed || 0;
            if (typeof options.rooms === 'number') {
                options.rooms = { count: options.rooms };
            }
            GWU__namespace.object.setOptions(this.rooms, options.rooms);
            this.goesUp = options.goesUp || false;
            if (options.startLoc) {
                this._locs.start = options.startLoc;
            }
            if (options.endLoc) {
                this._locs.end = options.endLoc;
            }
            // Doors
            if (options.doors === false) {
                options.doors = { chance: 0 };
            }
            else if (options.doors === true) {
                options.doors = { chance: 100 };
            }
            GWU__namespace.object.setOptions(this.doors, options.doors);
            // Halls
            if (options.halls === false) {
                options.halls = { chance: 0 };
            }
            else if (options.halls === true) {
                options.halls = {};
            }
            GWU__namespace.object.setOptions(this.halls, options.halls);
            // Loops
            if (options.loops === false) {
                this.loops = null;
            }
            else {
                if (options.loops === true)
                    options.loops = {};
                else if (typeof options.loops === 'number') {
                    options.loops = { maxLength: options.loops };
                }
                options.loops = options.loops || {};
                options.loops.doorChance =
                    (_a = options.loops.doorChance) !== null && _a !== void 0 ? _a : (_b = options.doors) === null || _b === void 0 ? void 0 : _b.chance;
                // @ts-ignore
                GWU__namespace.object.setOptions(this.loops, options.loops);
            }
            // Lakes
            if (options.lakes === false) {
                this.lakes = null;
            }
            else {
                if (options.lakes === true)
                    options.lakes = {};
                else if (typeof options.lakes === 'number') {
                    options.lakes = { count: options.lakes };
                }
                options.lakes = options.lakes || {};
                // @ts-ignore
                GWU__namespace.object.setOptions(this.lakes, options.lakes);
            }
            // Bridges
            if (options.bridges === false) {
                this.bridges = null;
            }
            else {
                if (typeof options.bridges === 'number') {
                    options.bridges = { maxLength: options.bridges };
                }
                if (options.bridges === true)
                    options.bridges = {};
                // @ts-ignore
                GWU__namespace.object.setOptions(this.bridges, options.bridges);
            }
            // Stairs
            if (options.stairs === false) {
                this.stairs = null;
            }
            else {
                if (typeof options.stairs !== 'object')
                    options.stairs = {};
                // @ts-ignore
                GWU__namespace.object.setOptions(this.stairs, options.stairs);
                this.stairs.start = this.goesUp ? 'down' : 'up';
            }
            // this.startLoc = options.startLoc || [-1, -1];
            // this.endLoc = options.endLoc || [-1, -1];
            if (options.log === true) {
                this.log = new ConsoleLogger();
            }
            else if (options.log) {
                this.log = options.log;
            }
            else {
                this.log = new NullLogger();
            }
        }
        _makeRoomSite(width, height) {
            const site = new Site(width, height);
            site.rng = this.site.rng;
            return site;
        }
        _createSite(width, height) {
            this.site = new Site(width, height);
        }
        create(...args) {
            let needsFree = true;
            if (args.length == 1) {
                const dest = args[0];
                if (dest instanceof Site) {
                    this.site = dest;
                    needsFree = false;
                }
                else {
                    this._createSite(dest.width, dest.height);
                }
            }
            else {
                this._createSite(args[0], args[1]);
            }
            const result = this._create(this.site);
            const cb = args[2] || null;
            if (cb) {
                GWU__namespace.xy.forRect(this.site.width, this.site.height, (x, y) => {
                    const t = this.site._tiles[x][y];
                    if (t)
                        cb(x, y, t);
                });
            }
            else if (args.length == 1 && needsFree) {
                const dest = args[0];
                dest.copy(this.site._tiles);
            }
            needsFree && this.site.free();
            return result;
        }
        _create(site) {
            this.start(site);
            this.addRooms(site);
            if (this.loops) {
                this.addLoops(site, this.loops);
                this.log.onLoopsAdded(site);
            }
            if (this.lakes) {
                this.addLakes(site, this.lakes);
                this.log.onLakesAdded(site);
            }
            if (this.bridges) {
                this.addBridges(site, this.bridges);
                this.log.onBridgesAdded(site);
            }
            if (this.stairs) {
                this.addStairs(site, this.stairs);
                this.log.onStairsAdded(site);
            }
            this.finish(site);
            return true;
        }
        start(site) {
            this.site = site;
            const seed = this.seed || GWU__namespace.rng.random.number();
            site.setSeed(seed);
            site.clear();
            this.seq = site.rng.sequence(site.width * site.height);
            this.locations = Object.assign({}, this._locs);
            if (!this.locations.start || this.locations.start[0] < 0) {
                const stair = this.goesUp ? 'down' : 'up';
                if (this.stairs && Array.isArray(this.stairs[stair])) {
                    this.locations.start = this.stairs[stair];
                }
                else {
                    this.locations.start = [
                        Math.floor(site.width / 2),
                        site.height - 2,
                    ];
                    if (this.stairs && this.stairs[stair]) {
                        this.stairs[stair] = this.locations.start;
                    }
                }
            }
            if (!this.locations.end || this.locations.end[0] < 0) {
                const stair = this.goesUp ? 'up' : 'down';
                if (this.stairs && Array.isArray(this.stairs[stair])) {
                    this.locations.end = this.stairs[stair];
                }
            }
            // if (this.startLoc[0] < 0 && this.startLoc[0] < 0) {
            //     this.startLoc[0] = Math.floor(site.width / 2);
            //     this.startLoc[1] = site.height - 2;
            // }
        }
        getDigger(id) {
            if (!id)
                throw new Error('Missing digger!');
            if (id instanceof RoomDigger)
                return id;
            if (typeof id === 'string') {
                const digger = rooms[id];
                if (!digger) {
                    throw new Error('Failed to find digger - ' + id);
                }
                return digger;
            }
            return new ChoiceRoom(id);
        }
        addRooms(site) {
            let tries = 20;
            while (--tries) {
                if (this.addFirstRoom(site))
                    break;
            }
            if (!tries)
                throw new Error('Failed to place first room!');
            site.updateDoorDirs();
            this.log.onDigFirstRoom(site);
            // site.dump();
            // console.log('- rng.number', site.rng.number());
            let fails = 0;
            let count = 1;
            const maxFails = this.rooms.fails || 20;
            while (fails < maxFails) {
                if (this.addRoom(site)) {
                    fails = 0;
                    site.updateDoorDirs();
                    site.rng.shuffle(this.seq);
                    // site.dump();
                    // console.log('- rng.number', site.rng.number());
                    if (this.rooms.count && ++count >= this.rooms.count) {
                        break; // we are done
                    }
                }
                else {
                    ++fails;
                }
            }
        }
        addFirstRoom(site) {
            const roomSite = this._makeRoomSite(site.width, site.height);
            let digger = this.getDigger(this.rooms.first || this.rooms.digger || 'DEFAULT');
            let room = digger.create(roomSite);
            if (room &&
                !this._attachRoomAtLoc(site, roomSite, room, this.locations.start)) {
                room = null;
            }
            roomSite.free();
            // Should we add the starting stairs now too?
            return room;
        }
        addRoom(site) {
            const roomSite = this._makeRoomSite(site.width, site.height);
            let digger = this.getDigger(this.rooms.digger || 'DEFAULT');
            let room = digger.create(roomSite);
            // attach hall?
            if (room && this.halls.chance) {
                let hall$1 = dig(this.halls, roomSite, room.doors);
                if (hall$1) {
                    room.hall = hall$1;
                }
            }
            // console.log('potential room');
            // roomSite.dump();
            if (room) {
                this.log.onRoomCandidate(room, roomSite);
                if (this._attachRoom(site, roomSite, room)) {
                    this.log.onRoomSuccess(site, room);
                }
                else {
                    this.log.onRoomFailed(site, room, roomSite, 'Did not fit.');
                    room = null;
                }
            }
            roomSite.free();
            return room;
        }
        _attachRoom(site, roomSite, room) {
            // console.log('attachRoom');
            const doorSites = room.hall ? room.hall.doors : room.doors;
            let i = 0;
            const len = this.seq.length;
            // Slide hyperspace across real space, in a random but predetermined order, until the room matches up with a wall.
            for (i = 0; i < len; i++) {
                const x = Math.floor(this.seq[i] / site.height);
                const y = this.seq[i] % site.height;
                const dir = site.getDoorDir(x, y);
                if (dir != GWU__namespace.xy.NO_DIRECTION) {
                    const oppDir = (dir + 2) % 4;
                    const door = doorSites[oppDir];
                    if (!door)
                        continue;
                    const offsetX = x - door[0];
                    const offsetY = y - door[1];
                    if (door[0] != -1 &&
                        this._roomFitsAt(site, roomSite, room, offsetX, offsetY)) {
                        // TYPES.Room fits here.
                        site.copyTiles(roomSite, offsetX, offsetY);
                        this._attachDoor(site, room, x, y, oppDir);
                        // door[0] = -1;
                        // door[1] = -1;
                        room.translate(offsetX, offsetY);
                        return true;
                    }
                }
            }
            return false;
        }
        _attachRoomAtLoc(site, roomSite, room, attachLoc) {
            const [x, y] = attachLoc;
            const doorSites = room.hall ? room.hall.doors : room.doors;
            const dirs = site.rng.sequence(4);
            // console.log('attachRoomAtXY', x, y, doorSites.join(', '));
            for (let dir of dirs) {
                const oppDir = (dir + 2) % 4;
                const door = doorSites[oppDir];
                if (!door || door[0] == -1)
                    continue;
                const offX = x - door[0];
                const offY = y - door[1];
                if (this._roomFitsAt(site, roomSite, room, offX, offY)) {
                    // dungeon.debug("attachRoom: ", x, y, oppDir);
                    // TYPES.Room fits here.
                    site.copyTiles(roomSite, offX, offY);
                    // this._attachDoor(site, room, x, y, oppDir);  // No door on first room!
                    room.translate(offX, offY);
                    // const newDoors = doorSites.map((site) => {
                    //     const x0 = site[0] + offX;
                    //     const y0 = site[1] + offY;
                    //     if (x0 == x && y0 == y) return [-1, -1] as GWU.xy.Loc;
                    //     return [x0, y0] as GWU.xy.Loc;
                    // });
                    return true;
                }
            }
            return false;
        }
        _roomFitsAt(map, roomGrid, room, roomToSiteX, roomToSiteY) {
            let xRoom, yRoom, xSite, ySite, i, j;
            // console.log('roomFitsAt', roomToSiteX, roomToSiteY);
            const hall = room.hall || room;
            const left = Math.min(room.left, hall.left);
            const top = Math.min(room.top, hall.top);
            const right = Math.max(room.right, hall.right);
            const bottom = Math.max(room.bottom, hall.bottom);
            for (xRoom = left; xRoom <= right; xRoom++) {
                for (yRoom = top; yRoom <= bottom; yRoom++) {
                    if (roomGrid.isSet(xRoom, yRoom)) {
                        xSite = xRoom + roomToSiteX;
                        ySite = yRoom + roomToSiteY;
                        if (!map.hasXY(xSite, ySite) ||
                            map.isBoundaryXY(xSite, ySite)) {
                            return false;
                        }
                        for (i = xSite - 1; i <= xSite + 1; i++) {
                            for (j = ySite - 1; j <= ySite + 1; j++) {
                                if (!map.isNothing(i, j)) {
                                    // console.log('- NO');
                                    return false;
                                }
                            }
                        }
                    }
                }
            }
            // console.log('- YES');
            return true;
        }
        _attachDoor(site, room, x, y, dir) {
            const opts = this.doors;
            let isDoor = false;
            if (opts.chance && site.rng.chance(opts.chance)) {
                isDoor = true;
            }
            const tile = isDoor ? opts.tile || 'DOOR' : 'FLOOR';
            site.setTile(x, y, tile); // Door site.
            // most cases...
            if (!room.hall || room.hall.width == 1 || room.hall.height == 1) {
                return;
            }
            if (dir === GWU__namespace.xy.UP || dir === GWU__namespace.xy.DOWN) {
                let didSomething = true;
                let k = 1;
                while (didSomething) {
                    didSomething = false;
                    if (site.isNothing(x - k, y)) {
                        if (site.isSet(x - k, y - 1) && site.isSet(x - k, y + 1)) {
                            site.setTile(x - k, y, tile);
                            didSomething = true;
                        }
                    }
                    if (site.isNothing(x + k, y)) {
                        if (site.isSet(x + k, y - 1) && site.isSet(x + k, y + 1)) {
                            site.setTile(x + k, y, tile);
                            didSomething = true;
                        }
                    }
                    ++k;
                }
            }
            else {
                let didSomething = true;
                let k = 1;
                while (didSomething) {
                    didSomething = false;
                    if (site.isNothing(x, y - k)) {
                        if (site.isSet(x - 1, y - k) && site.isSet(x + 1, y - k)) {
                            site.setTile(x, y - k, tile);
                            didSomething = true;
                        }
                    }
                    if (site.isNothing(x, y + k)) {
                        if (site.isSet(x - 1, y + k) && site.isSet(x + 1, y + k)) {
                            site.setTile(x, y + k, tile);
                            didSomething = true;
                        }
                    }
                    ++k;
                }
            }
        }
        addLoops(site, opts) {
            const digger = new LoopDigger(opts);
            return digger.create(site);
        }
        addLakes(site, opts) {
            const digger = new Lakes(opts);
            return digger.create(site);
        }
        addBridges(site, opts) {
            const digger = new Bridges(opts);
            return digger.create(site);
        }
        addStairs(site, opts) {
            const digger = new Stairs(opts);
            const locs = digger.create(site);
            if (locs)
                Object.assign(this.locations, locs);
            return !!locs;
        }
        finish(site) {
            this._removeDiagonalOpenings(site);
            this._finishWalls(site);
            this._finishDoors(site);
        }
        _removeDiagonalOpenings(site) {
            let i, j, k, x1, y1;
            let diagonalCornerRemoved;
            do {
                diagonalCornerRemoved = false;
                for (i = 0; i < site.width - 1; i++) {
                    for (j = 0; j < site.height - 1; j++) {
                        for (k = 0; k <= 1; k++) {
                            if (!site.blocksMove(i + k, j) &&
                                site.blocksMove(i + (1 - k), j) &&
                                site.blocksDiagonal(i + (1 - k), j) &&
                                site.blocksMove(i + k, j + 1) &&
                                site.blocksDiagonal(i + k, j + 1) &&
                                !site.blocksMove(i + (1 - k), j + 1)) {
                                if (site.rng.chance(50)) {
                                    x1 = i + (1 - k);
                                    y1 = j;
                                }
                                else {
                                    x1 = i + k;
                                    y1 = j + 1;
                                }
                                diagonalCornerRemoved = true;
                                site.setTile(x1, y1, 'FLOOR'); // todo - pick one of the passable tiles around it...
                            }
                        }
                    }
                }
            } while (diagonalCornerRemoved == true);
        }
        _finishDoors(site) {
            GWU__namespace.xy.forRect(site.width, site.height, (x, y) => {
                if (site.isBoundaryXY(x, y))
                    return;
                // todo - isDoorway...
                if (site.isDoor(x, y)) {
                    // if (
                    //     // TODO - isPassable
                    //     (site.isPassable(x + 1, y) || site.isPassable(x - 1, y)) &&
                    //     (site.isPassable(x, y + 1) || site.isPassable(x, y - 1))
                    // ) {
                    //     // If there's passable terrain to the left or right, and there's passable terrain
                    //     // above or below, then the door is orphaned and must be removed.
                    //     site.setTile(x, y, SITE.FLOOR); // todo - take passable neighbor value
                    // } else
                    if ((site.isWall(x + 1, y) ? 1 : 0) +
                        (site.isWall(x - 1, y) ? 1 : 0) +
                        (site.isWall(x, y + 1) ? 1 : 0) +
                        (site.isWall(x, y - 1) ? 1 : 0) !=
                        2) {
                        // If the door has three or more pathing blocker neighbors in the four cardinal directions,
                        // then the door is orphaned and must be removed.
                        site.setTile(x, y, 'FLOOR', { superpriority: true }); // todo - take passable neighbor
                    }
                }
            });
        }
        _finishWalls(site) {
            const boundaryTile = this.boundary ? 'IMPREGNABLE' : 'WALL';
            GWU__namespace.xy.forRect(site.width, site.height, (x, y) => {
                if (site.isNothing(x, y)) {
                    if (site.isBoundaryXY(x, y)) {
                        site.setTile(x, y, boundaryTile);
                    }
                    else {
                        site.setTile(x, y, 'WALL');
                    }
                }
            });
        }
    }
    // export function digMap(map: GWM.map.Map, options: Partial<DiggerOptions> = {}) {
    //     const digger = new Digger(options);
    //     return digger.create(map);
    // }

    class Dungeon {
        constructor(options) {
            // @ts-ignore
            this.config = {
                levels: 1,
                width: 80,
                height: 34,
                rooms: { fails: 20 },
                // rooms: { count: 20, digger: 'DEFAULT' },
                // halls: {},
                // loops: {},
                // lakes: {},
                // bridges: {},
                // stairs: {},
                boundary: true,
            };
            this.seeds = [];
            this.stairLocs = [];
            GWU__namespace.object.setOptions(this.config, options);
            if (this.config.seed) {
                GWU__namespace.rng.random.seed(this.config.seed);
            }
            if (typeof this.config.stairs === 'boolean' || !this.config.stairs) {
                this.config.stairs = {};
            }
            if (!this.config.rooms) {
                this.config.rooms = {};
            }
            else if (typeof this.config.rooms === 'number') {
                this.config.rooms = { count: this.config.rooms };
            }
            this._initSeeds();
            this._initStairLocs();
        }
        get length() {
            return this.config.levels;
        }
        _initSeeds() {
            for (let i = 0; i < this.config.levels; ++i) {
                this.seeds[i] = GWU__namespace.rng.random.number(2 ** 32);
            }
        }
        _initStairLocs() {
            let startLoc = this.config.startLoc || [
                Math.floor(this.config.width / 2),
                this.config.height - 2,
            ];
            const minDistance = this.config.stairDistance ||
                Math.floor(Math.max(this.config.width / 2, this.config.height / 2));
            let needUpdate = false;
            for (let i = 0; i < this.config.levels; ++i) {
                let endLoc;
                if (this.stairLocs[i] &&
                    this.stairLocs[i][1] &&
                    this.stairLocs[i][1][0] > 0) {
                    endLoc = this.stairLocs[i][1];
                    needUpdate =
                        GWU__namespace.xy.distanceBetween(startLoc[0], startLoc[1], endLoc[0], endLoc[1]) < minDistance;
                }
                else {
                    endLoc = GWU__namespace.rng.random.matchingLoc(this.config.width, this.config.height, (x, y) => {
                        return (GWU__namespace.xy.distanceBetween(startLoc[0], startLoc[1], x, y) > minDistance);
                    });
                }
                this.stairLocs[i] = [
                    [startLoc[0], startLoc[1]],
                    [endLoc[0], endLoc[1]],
                ];
                startLoc = endLoc;
            }
            if (needUpdate) {
                // loop does not go all the way to level 0
                for (let i = this.config.levels - 1; i > 0; --i) {
                    let [startLoc, endLoc] = this.stairLocs[i];
                    if (GWU__namespace.xy.distanceBetween(startLoc[0], startLoc[1], endLoc[0], endLoc[1]) > minDistance) {
                        break;
                    }
                    startLoc = GWU__namespace.rng.random.matchingLoc(this.config.width, this.config.height, (x, y) => {
                        return (GWU__namespace.xy.distanceBetween(endLoc[0], endLoc[1], x, y) >
                            minDistance);
                    });
                    this.stairLocs[i][0] = startLoc;
                    this.stairLocs[i - 1][1] = startLoc;
                }
            }
        }
        getLevel(id, cb) {
            if (id < 0 || id > this.config.levels)
                throw new Error('Invalid level id: ' + id);
            // Generate the level
            const [startLoc, endLoc] = this.stairLocs[id];
            const stairOpts = Object.assign({}, this.config.stairs);
            if (this.config.goesUp) {
                stairOpts.down = startLoc;
                stairOpts.up = endLoc;
                if (id == 0 && this.config.startTile) {
                    stairOpts.downTile = this.config.startTile;
                }
                if (id == this.config.levels - 1 && this.config.endTile) {
                    stairOpts.upTile = this.config.endTile;
                }
            }
            else {
                stairOpts.down = endLoc;
                stairOpts.up = startLoc;
                if (id == 0 && this.config.startTile) {
                    stairOpts.upTile = this.config.startTile;
                }
                if (id == this.config.levels - 1 && this.config.endTile) {
                    stairOpts.downTile = this.config.endTile;
                }
            }
            const rooms = Object.assign({}, this.config.rooms);
            if (id === 0 && this.config.entrance) {
                rooms.first = this.config.entrance;
            }
            let width = this.config.width, height = this.config.height;
            // if (cb instanceof GWM.map.Map) {
            //     width = cb.width;
            //     height = cb.height;
            // }
            const levelOpts = {
                seed: this.seeds[id],
                loops: this.config.loops,
                lakes: this.config.lakes,
                bridges: this.config.bridges,
                rooms: rooms,
                stairs: stairOpts,
                boundary: this.config.boundary,
                goesUp: this.config.goesUp,
                width,
                height,
            };
            return this._makeLevel(id, levelOpts, cb);
            // TODO - Update startLoc, endLoc
        }
        _makeLevel(id, opts, cb) {
            const digger = new Digger(opts);
            let result = false;
            // if (cb instanceof GWM.map.Map) {
            //     result = digger.create(cb);
            // } else {
            result = digger.create(this.config.width, this.config.height, cb);
            // }
            this.stairLocs[id] = [digger.locations.start, digger.locations.end];
            // if (cb instanceof GWM.map.Map) {
            //     const locs = this.stairLocs[id];
            //     if (this.config.goesUp) {
            //         cb.locations.down = cb.locations.start = locs[0];
            //         cb.locations.up = cb.locations.end = locs[1];
            //     } else {
            //         cb.locations.down = cb.locations.start = locs[1];
            //         cb.locations.up = cb.locations.end = locs[0];
            //     }
            // }
            return result;
        }
    }

    class BuildData {
        // depth = 0;
        // seed = 0;
        constructor(site, blueprint, machine = 0) {
            this.originX = -1;
            this.originY = -1;
            this.distance25 = -1;
            this.distance75 = -1;
            this.site = site;
            this.blueprint = blueprint;
            this.interior = GWU__namespace.grid.alloc(site.width, site.height);
            this.occupied = GWU__namespace.grid.alloc(site.width, site.height);
            this.viewMap = GWU__namespace.grid.alloc(site.width, site.height);
            this.distanceMap = new GWU__namespace.path.DijkstraMap(site.width, site.height);
            this.candidates = GWU__namespace.grid.alloc(site.width, site.height);
            this.machineNumber = machine;
        }
        free() {
            GWU__namespace.grid.free(this.interior);
            GWU__namespace.grid.free(this.occupied);
            GWU__namespace.grid.free(this.viewMap);
            GWU__namespace.grid.free(this.candidates);
        }
        get rng() {
            return this.site.rng;
        }
        reset(originX, originY) {
            this.interior.fill(0);
            this.occupied.fill(0);
            this.viewMap.fill(0);
            this.distanceMap.reset(this.site.width, this.site.height);
            // this.candidates.fill(0);
            this.originX = originX;
            this.originY = originY;
            this.distance25 = 0;
            this.distance75 = 0;
            // if (this.seed) {
            //     this.site.setSeed(this.seed);
            // }
        }
        calcDistances(maxDistance) {
            computeDistanceMap(this.site, this.distanceMap, this.originX, this.originY);
            let qualifyingTileCount = 0;
            const distances = new Array(100).fill(0);
            this.interior.forEach((v, x, y) => {
                if (!v)
                    return;
                const dist = Math.round(this.distanceMap.getDistance(x, y));
                if (dist < 100) {
                    distances[dist]++; // create a histogram of distances -- poor man's sort function
                    qualifyingTileCount++;
                }
            });
            let distance25 = Math.round(qualifyingTileCount / 4);
            let distance75 = Math.round((3 * qualifyingTileCount) / 4);
            for (let i = 0; i < 100; i++) {
                if (distance25 <= distances[i]) {
                    distance25 = i;
                    break;
                }
                else {
                    distance25 -= distances[i];
                }
            }
            for (let i = 0; i < 100; i++) {
                if (distance75 <= distances[i]) {
                    distance75 = i;
                    break;
                }
                else {
                    distance75 -= distances[i];
                }
            }
            this.distance25 = distance25;
            this.distance75 = distance75;
        }
    }

    const Fl = GWU__namespace.flag.fl;
    var Flags;
    (function (Flags) {
        Flags[Flags["BP_ROOM"] = Fl(0)] = "BP_ROOM";
        Flags[Flags["BP_VESTIBULE"] = Fl(1)] = "BP_VESTIBULE";
        Flags[Flags["BP_REWARD"] = Fl(2)] = "BP_REWARD";
        Flags[Flags["BP_ADOPT_ITEM"] = Fl(3)] = "BP_ADOPT_ITEM";
        Flags[Flags["BP_PURGE_PATHING_BLOCKERS"] = Fl(4)] = "BP_PURGE_PATHING_BLOCKERS";
        Flags[Flags["BP_PURGE_INTERIOR"] = Fl(5)] = "BP_PURGE_INTERIOR";
        Flags[Flags["BP_PURGE_LIQUIDS"] = Fl(6)] = "BP_PURGE_LIQUIDS";
        Flags[Flags["BP_SURROUND_WITH_WALLS"] = Fl(7)] = "BP_SURROUND_WITH_WALLS";
        Flags[Flags["BP_IMPREGNABLE"] = Fl(8)] = "BP_IMPREGNABLE";
        Flags[Flags["BP_OPEN_INTERIOR"] = Fl(9)] = "BP_OPEN_INTERIOR";
        Flags[Flags["BP_MAXIMIZE_INTERIOR"] = Fl(10)] = "BP_MAXIMIZE_INTERIOR";
        Flags[Flags["BP_REDESIGN_INTERIOR"] = Fl(11)] = "BP_REDESIGN_INTERIOR";
        Flags[Flags["BP_TREAT_AS_BLOCKING"] = Fl(12)] = "BP_TREAT_AS_BLOCKING";
        Flags[Flags["BP_REQUIRE_BLOCKING"] = Fl(13)] = "BP_REQUIRE_BLOCKING";
        Flags[Flags["BP_NO_INTERIOR_FLAG"] = Fl(14)] = "BP_NO_INTERIOR_FLAG";
        Flags[Flags["BP_NOT_IN_HALLWAY"] = Fl(15)] = "BP_NOT_IN_HALLWAY";
    })(Flags || (Flags = {}));
    class Blueprint {
        constructor(opts = {}) {
            this.tags = [];
            this.flags = 0;
            this.steps = [];
            this.id = 'n/a';
            if (opts.tags) {
                if (typeof opts.tags === 'string') {
                    opts.tags = opts.tags.split(/[,|]/).map((v) => v.trim());
                }
                this.tags = opts.tags;
            }
            this.frequency = GWU__namespace.frequency.make(opts.frequency || 100);
            if (opts.size) {
                this.size = GWU__namespace.range.make(opts.size);
                if (this.size.lo <= 0)
                    this.size.lo = 1;
                if (this.size.hi < this.size.lo)
                    this.size.hi = this.size.lo;
            }
            else {
                this.size = GWU__namespace.range.make([1, 1]); // Anything bigger makes weird things happen
            }
            if (opts.flags) {
                this.flags = GWU__namespace.flag.from(Flags, opts.flags);
            }
            if (opts.steps) {
                this.steps = opts.steps.map((cfg) => new BuildStep(cfg));
                this.steps.forEach((s, i) => (s.index = i));
            }
            if (opts.id) {
                this.id = opts.id;
            }
            if (this.flags & Flags.BP_ADOPT_ITEM) {
                if (!this.steps.some((step) => {
                    if (step.adoptItem)
                        return true;
                    if (step.hordeTakesItem && !step.item)
                        return true;
                    return false;
                })) {
                    throw new Error('Blueprint calls for BP_ADOPT_ITEM, but has no adoptive step.');
                }
            }
        }
        get isRoom() {
            return !!(this.flags & Flags.BP_ROOM);
        }
        get isReward() {
            return !!(this.flags & Flags.BP_REWARD);
        }
        get isVestiblue() {
            return !!(this.flags & Flags.BP_VESTIBULE);
        }
        get adoptsItem() {
            return !!(this.flags & Flags.BP_ADOPT_ITEM);
        }
        get treatAsBlocking() {
            return !!(this.flags & Flags.BP_TREAT_AS_BLOCKING);
        }
        get requireBlocking() {
            return !!(this.flags & Flags.BP_REQUIRE_BLOCKING);
        }
        get purgeInterior() {
            return !!(this.flags & Flags.BP_PURGE_INTERIOR);
        }
        get purgeBlockers() {
            return !!(this.flags & Flags.BP_PURGE_PATHING_BLOCKERS);
        }
        get purgeLiquids() {
            return !!(this.flags & Flags.BP_PURGE_LIQUIDS);
        }
        get surroundWithWalls() {
            return !!(this.flags & Flags.BP_SURROUND_WITH_WALLS);
        }
        get makeImpregnable() {
            return !!(this.flags & Flags.BP_IMPREGNABLE);
        }
        get maximizeInterior() {
            return !!(this.flags & Flags.BP_MAXIMIZE_INTERIOR);
        }
        get openInterior() {
            return !!(this.flags & Flags.BP_OPEN_INTERIOR);
        }
        get noInteriorFlag() {
            return !!(this.flags & Flags.BP_NO_INTERIOR_FLAG);
        }
        get notInHallway() {
            return !!(this.flags & Flags.BP_NOT_IN_HALLWAY);
        }
        qualifies(requiredFlags, tags) {
            if (tags && tags.length) {
                if (typeof tags === 'string') {
                    tags = tags.split(/[,|]/).map((v) => v.trim());
                }
                // Must match all tags!
                if (!tags.every((want) => this.tags.includes(want)))
                    return false;
            }
            if (
            // Must have the required flags:
            ~this.flags & requiredFlags ||
                // May NOT have BP_ADOPT_ITEM unless that flag is required:
                this.flags & Flags.BP_ADOPT_ITEM & ~requiredFlags ||
                // May NOT have BP_VESTIBULE unless that flag is required:
                this.flags & Flags.BP_VESTIBULE & ~requiredFlags) {
                return false;
            }
            return true;
        }
        pickComponents(rng) {
            const alternativeFlags = [
                StepFlags.BS_ALTERNATIVE,
                StepFlags.BS_ALTERNATIVE_2,
            ];
            const keepFeature = new Array(this.steps.length).fill(true);
            for (let j = 0; j <= 1; j++) {
                let totalFreq = 0;
                for (let i = 0; i < keepFeature.length; i++) {
                    if (this.steps[i].flags & alternativeFlags[j]) {
                        keepFeature[i] = false;
                        totalFreq++;
                    }
                }
                if (totalFreq > 0) {
                    let randIndex = rng.range(1, totalFreq);
                    for (let i = 0; i < keepFeature.length; i++) {
                        if (this.steps[i].flags & alternativeFlags[j]) {
                            if (randIndex == 1) {
                                keepFeature[i] = true; // This is the alternative that gets built. The rest do not.
                                break;
                            }
                            else {
                                randIndex--;
                            }
                        }
                    }
                }
            }
            return this.steps.filter((_f, i) => keepFeature[i]);
        }
        fillInterior(builder) {
            const interior = builder.interior;
            const site = builder.site;
            interior.fill(0);
            // Find a location and map out the machine interior.
            if (this.isRoom) {
                // If it's a room machine, count up the gates of appropriate
                // choke size and remember where they are. The origin of the room will be the gate location.
                // Now map out the interior into interior[][].
                // Start at the gate location and do a depth-first floodfill to grab all adjoining tiles with the
                // same or lower choke value, ignoring any tiles that are already part of a machine.
                // If we get false from this, try again. If we've tried too many times already, abort.
                return addTileToInteriorAndIterate(builder, builder.originX, builder.originY);
            }
            else if (this.isVestiblue) {
                return computeVestibuleInterior(builder, this);
                // success
            }
            else {
                // Find a location and map out the interior for a non-room machine.
                // The strategy here is simply to pick a random location on the map,
                // expand it along a pathing map by one space in all directions until the size reaches
                // the chosen size, and then make sure the resulting space qualifies.
                // If not, try again. If we've tried too many times already, abort.
                let distanceMap = builder.distanceMap;
                computeDistanceMap(site, distanceMap, builder.originX, builder.originY, this.size.hi);
                const seq = site.rng.sequence(site.width * site.height);
                let qualifyingTileCount = 0; // Keeps track of how many interior cells we've added.
                let goalSize = this.size.value(); // Keeps track of the goal size.
                for (let k = 0; k < 1000 && qualifyingTileCount < goalSize; k++) {
                    for (let n = 0; n < seq.length && qualifyingTileCount < goalSize; n++) {
                        const i = Math.floor(seq[n] / site.height);
                        const j = seq[n] % site.height;
                        if (Math.round(distanceMap.getDistance(i, j)) == k) {
                            interior[i][j] = 1;
                            qualifyingTileCount++;
                            const machine = site.getMachine(i, j);
                            if (site.isOccupied(i, j) ||
                                (machine > 0 && machine !== builder.machineNumber) // in different machine
                            ) {
                                // Abort if we've entered another machine or engulfed another machine's item or monster.
                                return 0;
                            }
                        }
                    }
                }
                // If locationFailsafe runs out, tryAgain will still be true, and we'll try a different machine.
                // If we're not choosing the blueprint, then don't bother with the locationFailsafe; just use the higher-level failsafe.
                return qualifyingTileCount;
            }
        }
    }
    function markCandidates(buildData) {
        const site = buildData.site;
        const candidates = buildData.candidates;
        const blueprint = buildData.blueprint;
        candidates.fill(0);
        // Find a location and map out the machine interior.
        if (blueprint.isRoom) {
            // If it's a room machine, count up the gates of appropriate
            // choke size and remember where they are. The origin of the room will be the gate location.
            candidates.update((_v, x, y) => {
                return site.isGateSite(x, y) &&
                    blueprint.size.contains(site.getChokeCount(x, y))
                    ? 1
                    : 0;
            });
        }
        else if (blueprint.isVestiblue) {
            //  Door machines must have locations passed in. We can't pick one ourselves.
            throw new Error('ERROR: Attempted to build a vestiblue without a location being provided.');
        }
        else {
            candidates.update((_v, x, y) => {
                if (!site.isPassable(x, y))
                    return 0;
                if (blueprint.notInHallway) {
                    const count = GWU__namespace.xy.arcCount(x, y, (i, j) => site.isPassable(i, j));
                    return count <= 1 ? 1 : 0;
                }
                return 1;
            });
        }
        return candidates.count((v) => v == 1);
    }
    function pickCandidateLoc(buildData) {
        const site = buildData.site;
        const candidates = buildData.candidates;
        const randSite = site.rng.matchingLoc(site.width, site.height, (x, y) => candidates[x][y] == 1);
        if (!randSite || randSite[0] < 0 || randSite[1] < 0) {
            // If no suitable sites, abort.
            return null;
        }
        return randSite;
    }
    // // Assume site has been analyzed (aka GateSites and ChokeCounts set)
    // export function computeInterior(
    //     builder: BuildData,
    //     blueprint: Blueprint
    // ): boolean {
    //     let failsafe = blueprint.isRoom ? 10 : 20;
    //     let tryAgain;
    //     const interior = builder.interior;
    //     const site = builder.site;
    //     do {
    //         tryAgain = false;
    //         if (--failsafe <= 0) {
    //             // console.log(
    //             //     `Failed to build blueprint ${blueprint.id}; failed repeatedly to find a suitable blueprint location.`
    //             // );
    //             return false;
    //         }
    //         let count = fillInterior(builder, blueprint);
    //         // Now make sure the interior map satisfies the machine's qualifications.
    //         if (!count) {
    //             console.debug('- no interior');
    //             tryAgain = true;
    //         } else if (!blueprint.size.contains(count)) {
    //             console.debug('- too small');
    //             tryAgain = true;
    //         } else if (
    //             blueprint.treatAsBlocking &&
    //             SITE.siteDisruptedBy(site, interior, { machine: site.machineCount })
    //         ) {
    //             console.debug('- blocks');
    //             tryAgain = true;
    //         } else if (
    //             blueprint.requireBlocking &&
    //             SITE.siteDisruptedSize(site, interior) < 100
    //         ) {
    //             console.debug('- does not block');
    //             tryAgain = true;
    //         }
    //         // Now loop if necessary.
    //     } while (tryAgain);
    //     // console.log(tryAgain, failsafe);
    //     return true;
    // }
    function computeVestibuleInterior(builder, blueprint) {
        let success = true;
        const site = builder.site;
        const interior = builder.interior;
        interior.fill(0);
        if (blueprint.size.hi == 1) {
            interior[builder.originX][builder.originY] = 1;
            return 1;
        }
        // If this is a wall - it is really an error (maybe manually trying a build location?)
        const doorChokeCount = site.getChokeCount(builder.originX, builder.originY);
        if (doorChokeCount > 10000) {
            return 0;
        }
        const vestibuleLoc = [-1, -1];
        let vestibuleChokeCount = doorChokeCount;
        GWU__namespace.xy.eachNeighbor(builder.originX, builder.originY, (x, y) => {
            const count = site.getChokeCount(x, y);
            if (count == doorChokeCount)
                return;
            if (count > 10000)
                return;
            if (count < 0)
                return;
            vestibuleLoc[0] = x;
            vestibuleLoc[1] = y;
            vestibuleChokeCount = count;
        }, true);
        const roomSize = vestibuleChokeCount - doorChokeCount;
        if (blueprint.size.contains(roomSize)) {
            // The room entirely fits within the vestibule desired size
            const count = interior.floodFill(vestibuleLoc[0], vestibuleLoc[1], (_v, i, j) => {
                if (site.isOccupied(i, j)) {
                    success = false;
                }
                return site.getChokeCount(i, j) === vestibuleChokeCount;
            }, 1);
            if (success && blueprint.size.contains(count))
                return roomSize;
        }
        let qualifyingTileCount = 0; // Keeps track of how many interior cells we've added.
        const wantSize = blueprint.size.value(site.rng); // Keeps track of the goal size.
        const distMap = builder.distanceMap;
        computeDistanceMap(site, distMap, builder.originX, builder.originY, blueprint.size.hi);
        const cells = site.rng.sequence(site.width * site.height);
        success = true;
        for (let k = 0; k < 1000 && qualifyingTileCount < wantSize; k++) {
            for (let i = 0; i < cells.length && qualifyingTileCount < wantSize; ++i) {
                const x = Math.floor(cells[i] / site.height);
                const y = cells[i] % site.height;
                const dist = Math.round(distMap.getDistance(x, y));
                if (dist != k)
                    continue;
                if (site.isOccupied(x, y)) {
                    success = false;
                    qualifyingTileCount = wantSize;
                }
                if (site.getChokeCount(x, y) <= doorChokeCount)
                    continue;
                interior[x][y] = 1;
                qualifyingTileCount += 1;
            }
        }
        return qualifyingTileCount;
    }
    // Assumes (startX, startY) is in the machine.
    // Returns true if everything went well, and false if we ran into a machine component
    // that was already there, as we don't want to build a machine around it.
    function addTileToInteriorAndIterate(builder, startX, startY) {
        let goodSoFar = true;
        const interior = builder.interior;
        const site = builder.site;
        let count = 1;
        interior[startX][startY] = 1;
        const startChokeCount = site.getChokeCount(startX, startY);
        for (let dir = 0; dir < 4 && goodSoFar; dir++) {
            const newX = startX + GWU__namespace.xy.DIRS[dir][0];
            const newY = startY + GWU__namespace.xy.DIRS[dir][1];
            if (!site.hasXY(newX, newY))
                continue;
            if (interior[newX][newY])
                continue; // already done
            if (site.isOccupied(newX, newY) ||
                (site.getMachine(newX, newY) && !site.isGateSite(newX, newY))) {
                // Abort if there's an item in the room.
                // Items haven't been populated yet, so the only way this could happen is if another machine
                // previously placed an item here.
                // Also abort if we're touching another machine at any point other than a gate tile.
                return 0;
            }
            if (site.getChokeCount(newX, newY) <= startChokeCount && // don't have to worry about walls since they're all 30000
                !site.getMachine(newX, newY)) {
                let additional = addTileToInteriorAndIterate(builder, newX, newY);
                if (additional <= 0)
                    return 0;
                count += additional;
            }
        }
        return count;
    }
    function maximizeInterior(data, minimumInteriorNeighbors = 1) {
        const interior = data.interior;
        const site = data.site;
        let interiorNeighborCount = 0;
        // let openNeighborCount = 0;
        let madeChange = true;
        let interiorCount = 0;
        let maxInteriorCount = data.blueprint.size.hi;
        let gen = 0;
        while (madeChange && interiorCount < maxInteriorCount) {
            madeChange = false;
            interiorCount = 0;
            ++gen;
            interior.forEach((i, x, y) => {
                if (!i)
                    return;
                ++interiorCount;
                if (i != gen)
                    return;
                GWU__namespace.xy.eachNeighbor(x, y, (i, j) => {
                    if (!interior.hasXY(i, j) || interior[i][j])
                        return;
                    if (interior.isBoundaryXY(i, j))
                        return;
                    interiorNeighborCount = 0;
                    let ok = true;
                    GWU__namespace.xy.eachNeighbor(i, j, (x2, y2) => {
                        if (interior[x2][y2]) {
                            ++interiorNeighborCount;
                        }
                        else if (!site.isWall(x2, y2)) {
                            ok = false; // non-interior and not wall
                        }
                        else if (site.getMachine(x2, y2)) {
                            ok = false; // in another machine
                        }
                    }, false // 8 dirs
                    );
                    if (!ok || interiorNeighborCount < minimumInteriorNeighbors)
                        return;
                    interior[i][j] = gen + 1;
                    ++interiorCount;
                    if (site.blocksPathing(i, j)) {
                        site.setTile(i, j, 'FLOOR');
                    }
                    madeChange = true;
                }, true // 4 dirs
                );
            });
        }
        interior.update((v) => (v > 0 ? 1 : 0));
    }
    function prepareInterior(builder) {
        const interior = builder.interior;
        const site = builder.site;
        const blueprint = builder.blueprint;
        // If requested, clear and expand the room as far as possible until either it's convex or it bumps into surrounding rooms
        if (blueprint.maximizeInterior) {
            maximizeInterior(builder, 1);
        }
        else if (blueprint.openInterior) {
            maximizeInterior(builder, 4);
        }
        // If requested, cleanse the interior -- no interesting terrain allowed.
        if (blueprint.purgeInterior) {
            interior.forEach((v, x, y) => {
                if (v)
                    site.setTile(x, y, 'FLOOR');
            });
        }
        else {
            if (blueprint.purgeBlockers) {
                // If requested, purge pathing blockers -- no traps allowed.
                interior.forEach((v, x, y) => {
                    if (!v)
                        return;
                    if (site.blocksPathing(x, y)) {
                        site.setTile(x, y, 'FLOOR');
                    }
                });
            }
            // If requested, purge the liquid layer in the interior -- no liquids allowed.
            if (blueprint.purgeLiquids) {
                interior.forEach((v, x, y) => {
                    if (v && site.isAnyLiquid(x, y)) {
                        site.setTile(x, y, 'FLOOR');
                    }
                });
            }
        }
        // Surround with walls if requested.
        if (blueprint.surroundWithWalls) {
            interior.forEach((v, x, y) => {
                if (!v || site.isGateSite(x, y))
                    return;
                GWU__namespace.xy.eachNeighbor(x, y, (i, j) => {
                    if (!interior.hasXY(i, j))
                        return; // Not valid x,y
                    if (interior[i][j])
                        return; // is part of machine
                    if (site.isWall(i, j))
                        return; // is already a wall (of some sort)
                    if (site.isGateSite(i, j))
                        return; // is a door site
                    if (site.getMachine(i, j))
                        return; // is part of a machine
                    if (site.blocksPathing(i, j))
                        return; // is a blocker for the player (water?)
                    site.setTile(i, j, 'WALL');
                }, false // all 8 directions
                );
            });
        }
        // Completely clear the interior, fill with granite, and cut entirely new rooms into it from the gate site.
        // Then zero out any portion of the interior that is still wall.
        // if (flags & BPFlags.BP_REDESIGN_INTERIOR) {
        //     RUT.Map.Blueprint.redesignInterior(map, interior, originX, originY, dungeonProfileIndex);
        // }
        // Reinforce surrounding tiles and interior tiles if requested to prevent tunneling in or through.
        if (blueprint.makeImpregnable) {
            interior.forEach((v, x, y) => {
                if (!v || site.isGateSite(x, y))
                    return;
                site.makeImpregnable(x, y);
                GWU__namespace.xy.eachNeighbor(x, y, (i, j) => {
                    if (!interior.hasXY(i, j))
                        return;
                    if (interior[i][j])
                        return;
                    if (site.isGateSite(i, j))
                        return;
                    site.makeImpregnable(i, j);
                }, false);
            });
        }
        // If necessary, label the interior as IS_IN_AREA_MACHINE or IS_IN_ROOM_MACHINE and mark down the number.
        const machineNumber = builder.machineNumber;
        interior.forEach((v, x, y) => {
            if (!v)
                return;
            if (!blueprint.noInteriorFlag) {
                site.setMachine(x, y, machineNumber, blueprint.isRoom);
            }
            // secret doors mess up machines
            // TODO - is this still true?
            if (site.isSecretDoor(x, y)) {
                site.setTile(x, y, 'DOOR');
            }
        });
    }
    // export function expandMachineInterior(
    //     builder: BuildData,
    //     minimumInteriorNeighbors = 1
    // ) {
    //     let madeChange;
    //     const interior = builder.interior;
    //     const site = builder.site;
    //     do {
    //         madeChange = false;
    //         interior.forEach((_v, x, y) => {
    //             // if (v && site.isDoor(x, y)) {
    //             //     site.setTile(x, y, SITE.FLOOR); // clean out the doors...
    //             //     return;
    //             // }
    //             if (site.hasCellFlag(x, y, GWM.flags.Cell.IS_IN_MACHINE)) return;
    //             if (!site.blocksPathing(x, y)) return;
    //             let nbcount = 0;
    //             GWU.xy.eachNeighbor(
    //                 x,
    //                 y,
    //                 (i, j) => {
    //                     if (!interior.hasXY(i, j)) return; // Not in map
    //                     if (interior.isBoundaryXY(i, j)) return; // Not on boundary
    //                     if (interior[i][j] && !site.blocksPathing(i, j)) {
    //                         ++nbcount; // in machine and open tile
    //                     }
    //                 },
    //                 false
    //             );
    //             if (nbcount < minimumInteriorNeighbors) return;
    //             nbcount = 0;
    //             GWU.xy.eachNeighbor(
    //                 x,
    //                 y,
    //                 (i, j) => {
    //                     if (!interior.hasXY(i, j)) return; // not on map
    //                     if (interior[i][j]) return; // already part of machine
    //                     if (
    //                         !site.isWall(i, j) ||
    //                         site.hasCellFlag(i, j, GWM.flags.Cell.IS_IN_MACHINE)
    //                     ) {
    //                         ++nbcount; // tile is not a wall or is in a machine
    //                     }
    //                 },
    //                 false
    //             );
    //             if (nbcount) return;
    //             // Eliminate this obstruction; welcome its location into the machine.
    //             madeChange = true;
    //             interior[x][y] = 1;
    //             if (site.blocksPathing(x, y)) {
    //                 site.setTile(x, y, SITE.FLOOR);
    //             }
    //             GWU.xy.eachNeighbor(x, y, (i, j) => {
    //                 if (!interior.hasXY(i, j)) return;
    //                 if (site.isSet(i, j)) return;
    //                 site.setTile(i, j, SITE.WALL);
    //             });
    //         });
    //     } while (madeChange);
    // }
    ///////////////////////////
    // INSTALL
    const blueprints = {};
    function install(id, blueprint) {
        if (!(blueprint instanceof Blueprint)) {
            blueprint = new Blueprint(blueprint);
        }
        blueprints[id] = blueprint;
        blueprint.id = id;
        return blueprint;
    }
    function random(requiredFlags, depth, rng) {
        const matches = Object.values(blueprints).filter((b) => b.qualifies(requiredFlags) && b.frequency(depth));
        rng = rng || GWU__namespace.rng.random;
        return rng.item(matches);
    }
    function get(id) {
        if (id instanceof Blueprint)
            return id;
        return blueprints[id];
    }
    function make(config) {
        // if (!config.id) throw new Error('id is required to make Blueprint.');
        return new Blueprint(config);
    }

    class Builder {
        constructor(options = {}) {
            this.blueprints = null;
            if (options.blueprints) {
                if (!Array.isArray(options.blueprints)) {
                    options.blueprints = Object.values(options.blueprints);
                }
                this.blueprints = options.blueprints.map((v) => get(v));
            }
            if (options.log === true) {
                this.log = new ConsoleLogger();
            }
            else {
                this.log = options.log || new NullLogger();
            }
            if (options.seed) {
                this.seed = options.seed;
            }
            else {
                this.seed = 0;
            }
        }
        _pickRandom(requiredFlags, depth, rng) {
            rng = rng || GWU__namespace.rng.random;
            const blueprints$1 = this.blueprints || Object.values(blueprints);
            const weights = blueprints$1.map((b) => {
                if (!b.qualifies(requiredFlags))
                    return 0;
                return b.frequency(depth);
            });
            const index = rng.weighted(weights);
            return blueprints$1[index] || null;
        }
        buildRandom(site, requiredMachineFlags = Flags.BP_ROOM, x = -1, y = -1, adoptedItem = null) {
            const depth = site.depth;
            let tries = 0;
            while (tries < 10) {
                const blueprint = this._pickRandom(requiredMachineFlags, depth, site.rng);
                if (!blueprint) {
                    this.log.onBuildError(`Failed to find matching blueprint: requiredMachineFlags : ${GWU__namespace.flag.toString(Flags, requiredMachineFlags)}, depth: ${depth}`);
                    return null;
                }
                const data = new BuildData(site, blueprint);
                site.analyze();
                this.log.onBlueprintPick(data, requiredMachineFlags, depth);
                if (this._buildAt(data, x, y, adoptedItem)) {
                    return { x, y };
                }
                ++tries;
            }
            // console.log(
            //     'Failed to build random blueprint matching flags: ' +
            //         GWU.flag.toString(BLUE.Flags, requiredMachineFlags) +
            //         ' tried : ' +
            //         tries.join(', ')
            // );
            return null;
        }
        build(site, blueprint, x = -1, y = -1, adoptedItem = null) {
            if (typeof blueprint === 'string') {
                const id = blueprint;
                blueprint = blueprints[id];
                if (!blueprint)
                    throw new Error('Failed to find blueprint - ' + id);
            }
            if (this.seed) {
                site.rng.seed(this.seed);
            }
            const data = new BuildData(site, blueprint);
            site.analyze();
            return this._buildAt(data, x, y, adoptedItem);
        }
        _buildAt(data, x = -1, y = -1, adoptedItem = null) {
            if (x >= 0 && y >= 0) {
                return this._build(data, x, y, adoptedItem);
            }
            let count = this._markCandidates(data);
            if (!count) {
                return null;
            }
            let tries = 20; // TODO - Make property of Blueprint
            while (count-- && tries--) {
                const loc = pickCandidateLoc(data) || false;
                if (loc) {
                    if (this._build(data, loc[0], loc[1], adoptedItem)) {
                        return { x: loc[0], y: loc[1] };
                    }
                }
            }
            this.log.onBlueprintFail(data, 'No suitable locations found to build blueprint.');
            return null;
        }
        //////////////////////////////////////////
        // Returns true if the machine got built; false if it was aborted.
        // If empty array spawnedItems or spawnedMonsters is given, will pass those back for deletion if necessary.
        _build(data, originX, originY, adoptedItem = null) {
            data.reset(originX, originY);
            this.log.onBlueprintStart(data, adoptedItem);
            if (!this._computeInterior(data)) {
                return null;
            }
            // This is the point of no return. Back up the level so it can be restored if we have to abort this machine after this point.
            const snapshot = data.site.snapshot();
            data.machineNumber = data.site.nextMachineId(); // Reserve this machine number, starting with 1.
            // Perform any transformations to the interior indicated by the blueprint flags, including expanding the interior if requested.
            prepareInterior(data);
            // Calculate the distance map (so that features that want to be close to or far from the origin can be placed accordingly)
            // and figure out the 33rd and 67th percentiles for features that want to be near or far from the origin.
            data.calcDistances(data.blueprint.size.hi);
            // Now decide which features will be skipped -- of the features marked MF_ALTERNATIVE, skip all but one, chosen randomly.
            // Then repeat and do the same with respect to MF_ALTERNATIVE_2, to provide up to two independent sets of alternative features per machine.
            const components = data.blueprint.pickComponents(data.site.rng);
            // Zero out occupied[][], and use it to keep track of the personal space around each feature that gets placed.
            // Now tick through the features and build them.
            for (let index = 0; index < components.length; index++) {
                const component = components[index];
                // console.log('BUILD COMPONENT', component);
                if (!this._buildStep(data, component, adoptedItem)) {
                    // failure! abort!
                    // Restore the map to how it was before we touched it.
                    this.log.onBlueprintFail(data, `Failed to build step ${component.index + 1}/${data.blueprint.steps.length}.`);
                    data.site.restore(snapshot);
                    snapshot.free();
                    // abortItemsAndMonsters(spawnedItems, spawnedMonsters);
                    return null;
                }
            }
            // Clear out the interior flag for all non-wired cells, if requested.
            if (data.blueprint.noInteriorFlag) {
                clearInteriorFlag(data.site, data.machineNumber);
            }
            // if (torchBearer && torch) {
            // 	if (torchBearer->carriedItem) {
            // 		deleteItem(torchBearer->carriedItem);
            // 	}
            // 	removeItemFromChain(torch, floorItems);
            // 	torchBearer->carriedItem = torch;
            // }
            this.log.onBlueprintSuccess(data);
            snapshot.free();
            // console.log('Built a machine from blueprint:', originX, originY);
            return { x: originX, y: originY };
        }
        _markCandidates(data) {
            const count = markCandidates(data);
            if (count <= 0) {
                this.log.onBlueprintFail(data, 'No suitable candidate locations found.');
                return 0;
            }
            this.log.onBlueprintCandidates(data);
            return count;
        }
        _computeInterior(data) {
            let fail = null;
            let count = data.blueprint.fillInterior(data);
            // Now make sure the interior map satisfies the machine's qualifications.
            if (!count) {
                fail = 'Interior error.';
            }
            else if (!data.blueprint.size.contains(count)) {
                fail = `Interior wrong size - have: ${count}, want: ${data.blueprint.size.toString()}`;
            }
            else if (data.blueprint.treatAsBlocking &&
                siteDisruptedBy(data.site, data.interior, {
                    machine: data.site.machineCount,
                })) {
                fail = 'Interior blocks map.';
            }
            else if (data.blueprint.requireBlocking &&
                siteDisruptedSize(data.site, data.interior) < 100) {
                fail = 'Interior does not block enough cells.';
            }
            if (!fail) {
                this.log.onBlueprintInterior(data);
                return true;
            }
            this.log.onBlueprintFail(data, fail);
            return false;
        }
        _buildStep(data, buildStep, adoptedItem) {
            let wantCount = 0;
            let builtCount = 0;
            const site = data.site;
            this.log.onStepStart(data, buildStep, adoptedItem);
            // console.log(
            //     'buildComponent',
            //     blueprint.id,
            //     blueprint.steps.indexOf(buildStep)
            // );
            // Figure out the distance bounds.
            const distanceBound = calcDistanceBound(data, buildStep);
            // If the StepFlags.BS_REPEAT_UNTIL_NO_PROGRESS flag is set, repeat until we fail to build the required number of instances.
            // Make a master map of candidate locations for this feature.
            let qualifyingTileCount = 0;
            if (buildStep.buildVestibule) {
                // Generate a door guard machine.
                // Try to create a sub-machine that qualifies.
                let success = this.buildRandom(data.site, Flags.BP_VESTIBULE, data.originX, data.originY);
                if (!success) {
                    this.log.onStepFail(data, buildStep, 'Failed to build vestibule');
                    return false;
                }
            }
            // If we are just building a vestibule, then we can exit here...
            if (!buildStep.buildsInstances) {
                this.log.onStepSuccess(data, buildStep);
                return true;
            }
            const candidates = GWU__namespace.grid.alloc(site.width, site.height);
            let didSomething = false;
            do {
                didSomething = false;
                if (buildStep.buildAtOrigin) {
                    candidates[data.originX][data.originY] = 1;
                    qualifyingTileCount = 1;
                    wantCount = 1;
                }
                else {
                    qualifyingTileCount = buildStep.markCandidates(data, candidates, distanceBound);
                    if (buildStep.generateEverywhere ||
                        buildStep.repeatUntilNoProgress) {
                        wantCount = qualifyingTileCount;
                    }
                    else {
                        wantCount = buildStep.count.value(site.rng);
                    }
                    this.log.onStepCandidates(data, buildStep, candidates, wantCount);
                    // get rid of all error/invalid codes
                    candidates.update((v) => (v == 1 ? 1 : 0));
                    if (!qualifyingTileCount ||
                        qualifyingTileCount < buildStep.count.lo) {
                        this.log.onStepFail(data, buildStep, `Only ${qualifyingTileCount} qualifying tiles - want ${buildStep.count.toString()}.`);
                        return false;
                    }
                }
                let x = 0, y = 0;
                while (qualifyingTileCount > 0 && builtCount < wantCount) {
                    // Find a location for the feature.
                    if (buildStep.buildAtOrigin) {
                        // Does the feature want to be at the origin? If so, put it there. (Just an optimization.)
                        x = data.originX;
                        y = data.originY;
                    }
                    else {
                        // Pick our candidate location randomly, and also strike it from
                        // the candidates map so that subsequent instances of this same feature can't choose it.
                        [x, y] = data.rng.matchingLoc(candidates.width, candidates.height, (x, y) => candidates[x][y] == 1);
                    }
                    // Don't waste time trying the same place again whether or not this attempt succeeds.
                    candidates[x][y] = 0;
                    qualifyingTileCount--;
                    const snapshot = data.site.snapshot();
                    if (this._buildStepInstance(data, buildStep, x, y, adoptedItem)) {
                        // OK, if placement was successful, clear some personal space around the feature so subsequent features can't be generated too close.
                        qualifyingTileCount -= buildStep.makePersonalSpace(data, x, y, candidates);
                        builtCount++; // we've placed an instance
                        didSomething = true;
                        snapshot.free(); // This snapshot is useless b/c we made changes...
                    }
                    else {
                        data.site.restore(snapshot); // need to undo any changes...
                        snapshot.free();
                    }
                    // Finished with this instance!
                }
            } while (didSomething && buildStep.repeatUntilNoProgress);
            GWU__namespace.grid.free(candidates);
            if (!buildStep.count.contains(builtCount) &&
                !buildStep.generateEverywhere &&
                !buildStep.repeatUntilNoProgress) {
                this.log.onStepFail(data, buildStep, `Failed to build enough instances - want: ${buildStep.count.toString()}, built: ${builtCount}`);
                return false;
            }
            this.log.onStepSuccess(data, buildStep);
            return true;
        }
        _buildStepInstance(data, buildStep, x, y, adoptedItem = null) {
            let success = true;
            let didSomething = true;
            const site = data.site;
            if (success && buildStep.treatAsBlocking) {
                // Yes, check for blocking.
                const options = {
                    machine: site.machineCount,
                };
                if (buildStep.noBlockOrigin) {
                    options.updateWalkable = (g) => {
                        g[data.originX][data.originY] = 1;
                        return true;
                    };
                }
                if (siteDisruptedByXY(site, x, y, options)) {
                    this.log.onStepInstanceFail(data, buildStep, x, y, 'instance blocks map');
                    success = false;
                }
            }
            // Try to build the DF first, if any, since we don't want it to be disrupted by subsequently placed terrain.
            if (success && buildStep.feature) {
                success = buildStep.feature(site, x, y);
                didSomething = success;
                if (!success) {
                    this.log.onStepInstanceFail(data, buildStep, x, y, 'Failed to build effect - ' +
                        JSON.stringify(buildStep.feature));
                }
            }
            // Now try to place the terrain tile, if any.
            if (success && buildStep.tile) {
                if (!buildStep.permitBlocking &&
                    site.tileBlocksMove(buildStep.tile) &&
                    !buildStep.treatAsBlocking // already did treatAsBlocking
                ) {
                    if (siteDisruptedByXY(site, x, y, {
                        machine: site.machineCount,
                    })) {
                        this.log.onStepInstanceFail(data, buildStep, x, y, 'tile blocks site');
                        success = false;
                    }
                }
                if (success) {
                    success = site.setTile(x, y, buildStep.tile);
                    didSomething = didSomething || success;
                    if (!success) {
                        this.log.onStepInstanceFail(data, buildStep, x, y, 'failed to set tile - ' + buildStep.tile);
                    }
                }
            }
            let torch = adoptedItem;
            // Generate an item, if necessary
            if (success && buildStep.item) {
                const itemInfo = pickItem(data.site.depth, buildStep.item);
                if (!itemInfo) {
                    success = false;
                    this.log.onStepInstanceFail(data, buildStep, x, y, 'Failed to make random item - ' +
                        JSON.stringify(buildStep.item));
                }
                else {
                    const item = makeItem(itemInfo);
                    if (buildStep.itemIsKey) {
                        item.key = {
                            x,
                            y,
                            disposable: !!buildStep.keyIsDisposable,
                        };
                    }
                    if (buildStep.outsourceItem) {
                        const result = this.buildRandom(data.site, Flags.BP_ADOPT_ITEM, -1, -1, item);
                        if (result) {
                            didSomething = true;
                        }
                        else {
                            this.log.onStepInstanceFail(data, buildStep, x, y, 'Failed to build machine to adopt item - ' + item.id);
                            success = false;
                        }
                    }
                    else if (buildStep.hordeTakesItem) {
                        torch = item;
                    }
                    else {
                        success = site.addItem(x, y, item) > 0;
                        didSomething = didSomething || success;
                        if (!success) {
                            this.log.onStepInstanceFail(data, buildStep, x, y, 'Failed to add item to site - ' + item.id);
                        }
                    }
                }
            }
            else if (success && buildStep.adoptItem) {
                // adopt item if necessary
                if (!adoptedItem) {
                    throw new Error('Failed to build blueprint because there is no adopted item.');
                }
                if (success) {
                    success = site.addItem(x, y, adoptedItem) > 0;
                    if (success) {
                        didSomething = true;
                    }
                    else {
                        this.log.onStepInstanceFail(data, buildStep, x, y, 'Failed to add adopted item to site - ' + adoptedItem.id);
                    }
                }
            }
            let torchBearer = null;
            if (success && buildStep.horde) {
                let horde = pickHorde(data.site.depth, buildStep.horde, site.rng);
                // if (buildStep.horde.random) {
                //     horde = GWM.horde.random({ rng: site.rng });
                // } else if (buildStep.horde.id) {
                //     horde = GWM.horde.from(buildStep.horde.id);
                // } else {
                //     buildStep.horde.rng = site.rng;
                //     horde = GWM.horde.random(buildStep.horde);
                // }
                if (!horde) {
                    success = false;
                    this.log.onStepInstanceFail(data, buildStep, x, y, 'Failed to pick horde - ' + JSON.stringify(buildStep.horde));
                }
                else {
                    if (horde.blueprint) {
                        const blueprint = get(horde.blueprint);
                        const newData = new BuildData(data.site, blueprint, data.machineNumber);
                        const result = this._build(newData, x, y, null);
                        newData.free();
                        if (!result) {
                            return false;
                        }
                    }
                    const leader = spawnHorde(horde, site, x, y, {
                        machine: site.machineCount,
                    });
                    if (!leader) {
                        success = false;
                        this.log.onStepInstanceFail(data, buildStep, x, y, 'Failed to build horde - ' + horde);
                    }
                    else {
                        // What to do now?
                        didSomething = true;
                        // leader adopts item...
                        if (torch && buildStep.hordeTakesItem) {
                            torchBearer = leader;
                            torchBearer.item = torch;
                            torch.x = -1;
                            torch.y = -1;
                        }
                        if (horde.feature) {
                            horde.feature(site, x, y);
                        }
                        if (buildStep.horde.feature) {
                            buildStep.horde.feature(site, x, y);
                        }
                    }
                }
            }
            if (success && didSomething) {
                // Mark the feature location as part of the machine, in case it is not already inside of it.
                if (!data.blueprint.noInteriorFlag) {
                    site.setMachine(x, y, data.machineNumber, data.blueprint.isRoom);
                }
                // Mark the feature location as impregnable if requested.
                if (buildStep.impregnable) {
                    site.makeImpregnable(x, y);
                }
                this.log.onStepInstanceSuccess(data, buildStep, x, y);
            }
            return success && didSomething;
        }
    }
    ////////////////////////////////////////////////////
    // TODO - Change this!!!
    // const blue = BLUE.get(id | blue);
    // const result =  blue.buildAt(map, x, y);
    //
    function build(blueprint, site, x, y, opts) {
        const builder = new Builder(opts);
        return builder.build(site, blueprint, x, y);
    }

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        BuildData: BuildData,
        get StepFlags () { return StepFlags; },
        BuildStep: BuildStep,
        updateViewMap: updateViewMap,
        calcDistanceBound: calcDistanceBound,
        get CandidateType () { return CandidateType; },
        cellIsCandidate: cellIsCandidate,
        Builder: Builder,
        build: build,
        get Flags () { return Flags; },
        Blueprint: Blueprint,
        markCandidates: markCandidates,
        pickCandidateLoc: pickCandidateLoc,
        computeVestibuleInterior: computeVestibuleInterior,
        maximizeInterior: maximizeInterior,
        prepareInterior: prepareInterior,
        blueprints: blueprints,
        install: install,
        random: random,
        get: get,
        make: make
    });

    exports.Digger = Digger;
    exports.Dungeon = Dungeon;
    exports.Hall = Hall;
    exports.Room = Room;
    exports.blueprint = index;
    exports.bridge = bridge;
    exports.feature = index$3;
    exports.hall = hall;
    exports.lake = lake;
    exports.loop = loop;
    exports.makeHall = makeHall;
    exports.room = room;
    exports.site = index$1;
    exports.stairs = stairs;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=gw-dig.js.map
