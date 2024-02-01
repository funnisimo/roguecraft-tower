(function () {
  'use strict';

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  /**
   * The base implementation of `_.clamp` which doesn't coerce arguments.
   *
   * @private
   * @param {number} number The number to clamp.
   * @param {number} [lower] The lower bound.
   * @param {number} upper The upper bound.
   * @returns {number} Returns the clamped number.
   */

  function baseClamp$1(number, lower, upper) {
    if (number === number) {
      if (upper !== undefined) {
        number = number <= upper ? number : upper;
      }
      if (lower !== undefined) {
        number = number >= lower ? number : lower;
      }
    }
    return number;
  }

  var _baseClamp = baseClamp$1;

  /** Used to match a single whitespace character. */

  var reWhitespace = /\s/;

  /**
   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedEndIndex$1(string) {
    var index = string.length;

    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }

  var _trimmedEndIndex = trimmedEndIndex$1;

  var trimmedEndIndex = _trimmedEndIndex;

  /** Used to match leading whitespace. */
  var reTrimStart = /^\s+/;

  /**
   * The base implementation of `_.trim`.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} Returns the trimmed string.
   */
  function baseTrim$1(string) {
    return string
      ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
      : string;
  }

  var _baseTrim = baseTrim$1;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */

  function isObject$5(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject$5;

  /** Detect free variable `global` from Node.js. */

  var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal$1;

  var freeGlobal = _freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root$3 = freeGlobal || freeSelf || Function('return this')();

  var _root = root$3;

  var root$2 = _root;

  /** Built-in value references. */
  var Symbol$4 = root$2.Symbol;

  var _Symbol = Symbol$4;

  var Symbol$3 = _Symbol;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$5.toString;

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag$1(value) {
    var isOwn = hasOwnProperty$4.call(value, symToStringTag$1),
        tag = value[symToStringTag$1];

    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag$1;

  /** Used for built-in method references. */

  var objectProto$4 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$4.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString$1(value) {
    return nativeObjectToString.call(value);
  }

  var _objectToString = objectToString$1;

  var Symbol$2 = _Symbol,
      getRawTag = _getRawTag,
      objectToString = _objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag$2(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag && symToStringTag in Object(value))
      ? getRawTag(value)
      : objectToString(value);
  }

  var _baseGetTag = baseGetTag$2;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */

  function isObjectLike$1(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike$1;

  var baseGetTag$1 = _baseGetTag,
      isObjectLike = isObjectLike_1;

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol$4(value) {
    return typeof value == 'symbol' ||
      (isObjectLike(value) && baseGetTag$1(value) == symbolTag);
  }

  var isSymbol_1 = isSymbol$4;

  var baseTrim = _baseTrim,
      isObject$4 = isObject_1,
      isSymbol$3 = isSymbol_1;

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber$1(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol$3(value)) {
      return NAN;
    }
    if (isObject$4(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject$4(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  var toNumber_1 = toNumber$1;

  var baseClamp = _baseClamp,
      toNumber = toNumber_1;

  /**
   * Clamps `number` within the inclusive `lower` and `upper` bounds.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Number
   * @param {number} number The number to clamp.
   * @param {number} [lower] The lower bound.
   * @param {number} upper The upper bound.
   * @returns {number} Returns the clamped number.
   * @example
   *
   * _.clamp(-10, -5, 5);
   * // => -5
   *
   * _.clamp(10, -5, 5);
   * // => 5
   */
  function clamp$1(number, lower, upper) {
    if (upper === undefined) {
      upper = lower;
      lower = undefined;
    }
    if (upper !== undefined) {
      upper = toNumber(upper);
      upper = upper === upper ? upper : 0;
    }
    if (lower !== undefined) {
      lower = toNumber(lower);
      lower = lower === lower ? lower : 0;
    }
    return baseClamp(toNumber(number), lower, upper);
  }

  var clamp_1 = clamp$1;

  var _clamp = /*@__PURE__*/getDefaultExportFromCjs(clamp_1);

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */

  var isArray$3 = Array.isArray;

  var isArray_1 = isArray$3;

  var isArray$2 = isArray_1,
      isSymbol$2 = isSymbol_1;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey$1(value, object) {
    if (isArray$2(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol$2(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object));
  }

  var _isKey = isKey$1;

  var baseGetTag = _baseGetTag,
      isObject$3 = isObject_1;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction$1(value) {
    if (!isObject$3(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction$1;

  var root$1 = _root;

  /** Used to detect overreaching core-js shims. */
  var coreJsData$1 = root$1['__core-js_shared__'];

  var _coreJsData = coreJsData$1;

  var coreJsData = _coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked$1(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked$1;

  /** Used for built-in method references. */

  var funcProto$1 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource$1(func) {
    if (func != null) {
      try {
        return funcToString$1.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource$1;

  var isFunction = isFunction_1,
      isMasked = _isMasked,
      isObject$2 = isObject_1,
      toSource = _toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto$3 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString.call(hasOwnProperty$3).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative$1(value) {
    if (!isObject$2(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  var _baseIsNative = baseIsNative$1;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */

  function getValue$2(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue$2;

  var baseIsNative = _baseIsNative,
      getValue$1 = _getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative$3(object, key) {
    var value = getValue$1(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative$3;

  var getNative$2 = _getNative;

  /* Built-in method references that are verified to be native. */
  var nativeCreate$4 = getNative$2(Object, 'create');

  var _nativeCreate = nativeCreate$4;

  var nativeCreate$3 = _nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear$1() {
    this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear$1;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function hashDelete$1(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete$1;

  var nativeCreate$2 = _nativeCreate;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet$1(key) {
    var data = this.__data__;
    if (nativeCreate$2) {
      var result = data[key];
      return result === HASH_UNDEFINED$1 ? undefined : result;
    }
    return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet$1;

  var nativeCreate$1 = _nativeCreate;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas$1(key) {
    var data = this.__data__;
    return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$1.call(data, key);
  }

  var _hashHas = hashHas$1;

  var nativeCreate = _nativeCreate;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet$1(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
    return this;
  }

  var _hashSet = hashSet$1;

  var hashClear = _hashClear,
      hashDelete = _hashDelete,
      hashGet = _hashGet,
      hashHas = _hashHas,
      hashSet = _hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash$1(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash$1.prototype.clear = hashClear;
  Hash$1.prototype['delete'] = hashDelete;
  Hash$1.prototype.get = hashGet;
  Hash$1.prototype.has = hashHas;
  Hash$1.prototype.set = hashSet;

  var _Hash = Hash$1;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */

  function listCacheClear$1() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear$1;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */

  function eq$2(value, other) {
    return value === other || (value !== value && other !== other);
  }

  var eq_1 = eq$2;

  var eq$1 = eq_1;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf$4(array, key) {
    var length = array.length;
    while (length--) {
      if (eq$1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  var _assocIndexOf = assocIndexOf$4;

  var assocIndexOf$3 = _assocIndexOf;

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete$1(key) {
    var data = this.__data__,
        index = assocIndexOf$3(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete$1;

  var assocIndexOf$2 = _assocIndexOf;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet$1(key) {
    var data = this.__data__,
        index = assocIndexOf$2(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet$1;

  var assocIndexOf$1 = _assocIndexOf;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas$1(key) {
    return assocIndexOf$1(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas$1;

  var assocIndexOf = _assocIndexOf;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet$1(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  var _listCacheSet = listCacheSet$1;

  var listCacheClear = _listCacheClear,
      listCacheDelete = _listCacheDelete,
      listCacheGet = _listCacheGet,
      listCacheHas = _listCacheHas,
      listCacheSet = _listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache$1(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache$1.prototype.clear = listCacheClear;
  ListCache$1.prototype['delete'] = listCacheDelete;
  ListCache$1.prototype.get = listCacheGet;
  ListCache$1.prototype.has = listCacheHas;
  ListCache$1.prototype.set = listCacheSet;

  var _ListCache = ListCache$1;

  var getNative$1 = _getNative,
      root = _root;

  /* Built-in method references that are verified to be native. */
  var Map$1$1 = getNative$1(root, 'Map');

  var _Map = Map$1$1;

  var Hash = _Hash,
      ListCache = _ListCache,
      Map$2 = _Map;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear$1() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash,
      'map': new (Map$2 || ListCache),
      'string': new Hash
    };
  }

  var _mapCacheClear = mapCacheClear$1;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */

  function isKeyable$1(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  var _isKeyable = isKeyable$1;

  var isKeyable = _isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData$4(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  var _getMapData = getMapData$4;

  var getMapData$3 = _getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete$1(key) {
    var result = getMapData$3(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete$1;

  var getMapData$2 = _getMapData;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet$1(key) {
    return getMapData$2(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet$1;

  var getMapData$1 = _getMapData;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas$1(key) {
    return getMapData$1(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas$1;

  var getMapData = _getMapData;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet$1(key, value) {
    var data = getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet$1;

  var mapCacheClear = _mapCacheClear,
      mapCacheDelete = _mapCacheDelete,
      mapCacheGet = _mapCacheGet,
      mapCacheHas = _mapCacheHas,
      mapCacheSet = _mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache$1(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache$1.prototype.clear = mapCacheClear;
  MapCache$1.prototype['delete'] = mapCacheDelete;
  MapCache$1.prototype.get = mapCacheGet;
  MapCache$1.prototype.has = mapCacheHas;
  MapCache$1.prototype.set = mapCacheSet;

  var _MapCache = MapCache$1;

  var MapCache = _MapCache;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize$1(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize$1.Cache || MapCache);
    return memoized;
  }

  // Expose `MapCache`.
  memoize$1.Cache = MapCache;

  var memoize_1 = memoize$1;

  var memoize = memoize_1;

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped$1(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

  var _memoizeCapped = memoizeCapped$1;

  var memoizeCapped = _memoizeCapped;

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath$1 = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  var _stringToPath = stringToPath$1;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */

  function arrayMap$1(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  var _arrayMap = arrayMap$1;

  var Symbol$1 = _Symbol,
      arrayMap = _arrayMap,
      isArray$1 = isArray_1,
      isSymbol$1 = isSymbol_1;

  /** Used as references for various `Number` constants. */
  var INFINITY$1 = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString$1(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray$1(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return arrayMap(value, baseToString$1) + '';
    }
    if (isSymbol$1(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
  }

  var _baseToString = baseToString$1;

  var baseToString = _baseToString;

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString$2(value) {
    return value == null ? '' : baseToString(value);
  }

  var toString_1 = toString$2;

  var isArray = isArray_1,
      isKey = _isKey,
      stringToPath = _stringToPath,
      toString$1 = toString_1;

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath$2(value, object) {
    if (isArray(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath(toString$1(value));
  }

  var _castPath = castPath$2;

  var isSymbol = isSymbol_1;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey$2(value) {
    if (typeof value == 'string' || isSymbol(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  var _toKey = toKey$2;

  var castPath$1 = _castPath,
      toKey$1 = _toKey;

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet$1(object, path) {
    path = castPath$1(path, object);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[toKey$1(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

  var _baseGet = baseGet$1;

  var baseGet = _baseGet;

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get$1(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  var get_1 = get$1;

  var get$1$1 = /*@__PURE__*/getDefaultExportFromCjs(get_1);

  var getNative = _getNative;

  var defineProperty$1 = (function() {
    try {
      var func = getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var _defineProperty = defineProperty$1;

  var defineProperty = _defineProperty;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue$1(object, key, value) {
    if (key == '__proto__' && defineProperty) {
      defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue$1;

  var baseAssignValue = _baseAssignValue,
      eq = eq_1;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue$1(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  var _assignValue = assignValue$1;

  /** Used as references for various `Number` constants. */

  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex$1(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex$1;

  var assignValue = _assignValue,
      castPath = _castPath,
      isIndex = _isIndex,
      isObject$1 = isObject_1,
      toKey = _toKey;

  /**
   * The base implementation of `_.set`.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @param {Function} [customizer] The function to customize path creation.
   * @returns {Object} Returns `object`.
   */
  function baseSet$1(object, path, value, customizer) {
    if (!isObject$1(object)) {
      return object;
    }
    path = castPath(path, object);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = toKey(path[index]),
          newValue = value;

      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return object;
      }

      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;
        if (newValue === undefined) {
          newValue = isObject$1(objValue)
            ? objValue
            : (isIndex(path[index + 1]) ? [] : {});
        }
      }
      assignValue(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }

  var _baseSet = baseSet$1;

  var baseSet = _baseSet;

  /**
   * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
   * it's created. Arrays are created for missing index properties while objects
   * are created for all other missing properties. Use `_.setWith` to customize
   * `path` creation.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to modify.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns `object`.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.set(object, 'a[0].b.c', 4);
   * console.log(object.a[0].b.c);
   * // => 4
   *
   * _.set(object, ['x', '0', 'y', 'z'], 5);
   * console.log(object.x[0].y.z);
   * // => 5
   */
  function set(object, path, value) {
    return object == null ? object : baseSet(object, path, value);
  }

  var set_1 = set;

  var _setPath = /*@__PURE__*/getDefaultExportFromCjs(set_1);

  /**
   * GW.utils
   * @module utils
   */
  function NOOP() { }
  function TRUE() {
      return true;
  }
  function FALSE() {
      return false;
  }
  function ONE() {
      return 1;
  }
  function ZERO() {
      return 0;
  }
  function IDENTITY(x) {
      return x;
  }
  function IS_ZERO(x) {
      return x == 0;
  }
  function IS_NONZERO(x) {
      return x != 0;
  }
  function ERROR(message, options) {
      throw new Error(message, options);
  }
  function WARN(...args) {
      console.warn(...args);
  }
  /**
   * clamps a value between min and max (inclusive)
   * @param v {Number} the value to clamp
   * @param min {Number} the minimum value
   * @param max {Number} the maximum value
   * @returns {Number} the clamped value
   */
  const clamp = _clamp;
  const getPath = get$1$1;
  const setPath = _setPath;
  // export function clamp(v: number, min: number, max: number) {
  //     if (v < min) return min;
  //     if (v > max) return max;
  //     return v;
  // }
  function lerp$1(from, to, pct) {
      if (pct > 1)
          pct = 1;
      if (pct < 0)
          pct = 0;
      return Math.floor(from + (to - from) * pct);
  }
  function xave(rate, value, newValue) {
      return value * rate + newValue * (1 - rate);
  }
  function firstDefined(...args) {
      return args.find((v) => v !== undefined);
  }
  function arraysIntersect(a, b) {
      return a.some((av) => b.includes(av));
  }
  function arrayIncludesAll(a, b) {
      return b.every((av) => a.includes(av));
  }
  function arrayRevEach(a, fn) {
      for (let i = a.length - 1; i > -1; --i) {
          fn(a[i], i, a);
      }
  }
  function arrayDelete(a, b) {
      const index = a.indexOf(b);
      if (index < 0)
          return false;
      a.splice(index, 1);
      return true;
  }
  function arrayNullify(a, b) {
      const index = a.indexOf(b);
      if (index < 0)
          return false;
      a[index] = null;
      return true;
  }
  function arrayInsert(a, b, beforeFn) {
      if (!beforeFn) {
          a.push(b);
          return;
      }
      const index = a.findIndex(beforeFn);
      if (index < 0) {
          a.push(b);
      }
      else {
          a.splice(index, 0, b);
      }
  }
  function arrayFindRight(a, fn) {
      for (let i = a.length - 1; i >= 0; --i) {
          const e = a[i];
          if (fn(e))
              return e;
      }
      return undefined;
  }
  function sum(arr) {
      return arr.reduce((a, b) => a + b);
  }
  function arrayNext(a, current, fn, wrap = true, forward = true) {
      const len = a.length;
      if (len <= 1)
          return undefined;
      const startIndex = a.indexOf(current);
      if (startIndex < 0)
          return undefined;
      const dx = forward ? 1 : -1;
      let startI = wrap ? (len + startIndex + dx) % len : startIndex + dx;
      let endI = wrap ? startIndex : forward ? len : -1;
      for (let index = startI; index !== endI; index = wrap ? (len + index + dx) % len : index + dx) {
          const e = a[index];
          if (fn(e))
              return e;
      }
      return undefined;
  }
  function arrayPrev(a, current, fn, wrap = true) {
      return arrayNext(a, current, fn, wrap, false);
  }
  function nextIndex(index, length, wrap = true) {
      ++index;
      if (index >= length) {
          if (wrap)
              return index % length;
          return -1;
      }
      return index;
  }
  function prevIndex(index, length, wrap = true) {
      if (index < 0)
          return length - 1; // start in back
      --index;
      if (index < 0) {
          if (wrap)
              return length - 1;
          return -1;
      }
      return index;
  }
  function valueType(a) {
      const ta = typeof a;
      if (a === undefined)
          return 'undefined';
      if (ta == 'object') {
          if (Array.isArray(a)) {
              return 'array';
          }
      }
      return ta;
  }
  /// https://www.30secondsofcode.org/js/s/is-plain-object/
  function isPlainObject(val) {
      return !!val && typeof val === 'object' && val.constructor === Object;
  }
  /// https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
  ///
  function isObject(item) {
      return !!item && typeof item === 'object' && !Array.isArray(item);
  }
  // Modified to use: isPlainObject
  // Modified to mergeDeep recursively if key is not in target
  function mergeDeep(target, source) {
      let output = Object.assign({}, target);
      if (isPlainObject(target) && isPlainObject(source)) {
          Object.keys(source).forEach((key) => {
              if (isPlainObject(source[key])) {
                  if (!(key in target))
                      Object.assign(output, {
                          [key]: mergeDeep({}, source[key]),
                      });
                  else
                      output[key] = mergeDeep(target[key], source[key]);
              }
              else {
                  Object.assign(output, { [key]: source[key] });
              }
          });
      }
      else {
          throw new Error('mergeDeep only works on plain objects, not classes.');
      }
      return output;
  }
  ///

  var utils = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	ERROR: ERROR,
  	FALSE: FALSE,
  	IDENTITY: IDENTITY,
  	IS_NONZERO: IS_NONZERO,
  	IS_ZERO: IS_ZERO,
  	NOOP: NOOP,
  	ONE: ONE,
  	TRUE: TRUE,
  	WARN: WARN,
  	ZERO: ZERO,
  	arrayDelete: arrayDelete,
  	arrayFindRight: arrayFindRight,
  	arrayIncludesAll: arrayIncludesAll,
  	arrayInsert: arrayInsert,
  	arrayNext: arrayNext,
  	arrayNullify: arrayNullify,
  	arrayPrev: arrayPrev,
  	arrayRevEach: arrayRevEach,
  	arraysIntersect: arraysIntersect,
  	clamp: clamp,
  	firstDefined: firstDefined,
  	getPath: getPath,
  	isObject: isObject,
  	isPlainObject: isPlainObject,
  	lerp: lerp$1,
  	mergeDeep: mergeDeep,
  	nextIndex: nextIndex,
  	prevIndex: prevIndex,
  	setPath: setPath,
  	sum: sum,
  	valueType: valueType,
  	xave: xave
  });

  // DIRS are organized clockwise
  // - first 4 are arrow directions
  //   >> rotate 90 degrees clockwise ==>> newIndex = (oldIndex + 1) % 4
  //   >> opposite direction ==>> oppIndex = (index + 2) % 4
  // - last 4 are diagonals
  //   >> rotate 90 degrees clockwise ==>> newIndex = 4 + (oldIndex + 1) % 4;
  //   >> opposite diagonal ==>> newIndex = 4 + (index + 2) % 4;
  const DIRS$2 = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
      [1, -1],
      [1, 1],
      [-1, 1],
      [-1, -1],
  ];
  const NO_DIRECTION = -1;
  const UP = 0;
  const RIGHT = 1;
  const DOWN = 2;
  const LEFT = 3;
  const RIGHT_UP = 4;
  const RIGHT_DOWN = 5;
  const LEFT_DOWN = 6;
  const LEFT_UP = 7;
  // CLOCK DIRS are organized clockwise, starting at UP
  // >> opposite = (index + 4) % 8
  // >> 90 degrees rotate right = (index + 2) % 8
  // >> 90 degrees rotate left = (8 + index - 2) % 8
  const CLOCK_DIRS = [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
  ];
  function isLoc(a) {
      return (Array.isArray(a) &&
          a.length == 2 &&
          typeof a[0] === 'number' &&
          typeof a[1] === 'number');
  }
  function isXY(a) {
      return a && typeof a.x === 'number' && typeof a.y === 'number';
  }
  function asLoc(v) {
      if (Array.isArray(v))
          return v;
      return [x(v), y(v)];
  }
  function asXY(v) {
      if (!Array.isArray(v))
          return v;
      return { x: x(v), y: y(v) };
  }
  function x(src) {
      // @ts-ignore
      return src.x || src[0] || 0;
  }
  function y(src) {
      // @ts-ignore
      return src.y || src[1] || 0;
  }
  function contains(size, x, y) {
      return x >= 0 && y >= 0 && x < size.width && y < size.height;
  }
  class Bounds {
      constructor(x = 0, y = 0, w = 0, h = 0) {
          if (typeof x !== 'number') {
              const opts = x;
              h = opts.height || 0;
              w = opts.width || 0;
              y = opts.y || 0;
              x = opts.x || 0;
          }
          this.x = x;
          this.y = y;
          this.width = w;
          this.height = h;
      }
      get left() {
          return this.x;
      }
      set left(v) {
          this.x = v;
      }
      get right() {
          return this.x + this.width;
      }
      set right(v) {
          this.x = v - this.width;
      }
      get top() {
          return this.y;
      }
      set top(v) {
          this.y = v;
      }
      get bottom() {
          return this.y + this.height;
      }
      set bottom(v) {
          this.y = v - this.height;
      }
      get center() {
          return this.x + Math.floor(this.width / 2);
      }
      set center(v) {
          this.x += v - this.center;
      }
      get middle() {
          return this.y + Math.floor(this.height / 2);
      }
      set middle(v) {
          this.y += v - this.middle;
      }
      clone() {
          return new Bounds(this.x, this.y, this.width, this.height);
      }
      copy(other) {
          this.x = other.x;
          this.y = other.y;
          this.width = other.width;
          this.height = other.height;
      }
      contains(...args) {
          let i = args[0];
          let j = args[1];
          if (typeof i !== 'number') {
              j = y(i);
              i = x(i);
          }
          return (this.x <= i &&
              this.y <= j &&
              this.x + this.width > i &&
              this.y + this.height > j);
      }
      include(xy) {
          const left = Math.min(x(xy), this.x);
          const top = Math.min(y(xy), this.y);
          const right = Math.max(xy instanceof Bounds ? xy.right : left, this.right);
          const bottom = Math.max(xy instanceof Bounds ? xy.bottom : top, this.bottom);
          this.left = left;
          this.top = top;
          this.width = right - left;
          this.height = bottom - top;
      }
      pad(n = 1) {
          this.x -= n;
          this.y -= n;
          this.width += n * 2;
          this.height += n * 2;
      }
      forEach(cb) {
          forRect(this.x, this.y, this.width, this.height, cb);
      }
      toString() {
          return `[${this.x},${this.y} -> ${this.right},${this.bottom}]`;
      }
  }
  function copy(dest, src) {
      dest.x = x(src);
      dest.y = y(src);
  }
  function addTo(dest, src) {
      dest.x += x(src);
      dest.y += y(src);
  }
  function add(a, b) {
      if (Array.isArray(a)) {
          return [a[0] + x(b), a[1] + y(b)];
      }
      return { x: a.x + x(b), y: a.y + y(b) };
  }
  function equals(dest, src) {
      if (!dest && !src)
          return true;
      if (!dest || !src)
          return false;
      return x(dest) == x(src) && y(dest) == y(src);
  }
  function isDiagonal(xy) {
      return x(xy) != 0 && y(xy) != 0;
  }
  function lerp(a, b, pct) {
      if (pct > 1) {
          pct = pct / 100;
      }
      pct = clamp(pct, 0, 1);
      const dx = x(b) - x(a);
      const dy = y(b) - y(a);
      const x2 = x(a) + Math.floor(dx * pct);
      const y2 = y(a) + Math.floor(dy * pct);
      return [x2, y2];
  }
  function eachNeighbor(x, y, fn, only4dirs = false) {
      const max = only4dirs ? 4 : 8;
      for (let i = 0; i < max; ++i) {
          const dir = DIRS$2[i];
          const x1 = x + dir[0];
          const y1 = y + dir[1];
          fn(x1, y1, dir);
      }
  }
  async function eachNeighborAsync(x, y, fn, only4dirs = false) {
      const max = only4dirs ? 4 : 8;
      for (let i = 0; i < max; ++i) {
          const dir = DIRS$2[i];
          const x1 = x + dir[0];
          const y1 = y + dir[1];
          await fn(x1, y1, dir);
      }
  }
  function matchingNeighbor(x, y, matchFn, only4dirs = false) {
      const maxIndex = only4dirs ? 4 : 8;
      for (let d = 0; d < maxIndex; ++d) {
          const dir = DIRS$2[d];
          const i = x + dir[0];
          const j = y + dir[1];
          if (matchFn(i, j, dir))
              return [i, j];
      }
      return [-1, -1];
  }
  function straightDistanceBetween(x1, y1, x2, y2) {
      const x = Math.abs(x1 - x2);
      const y = Math.abs(y1 - y2);
      return x + y;
  }
  function maxAxisFromTo(a, b) {
      const xa = Math.abs(x(a) - x(b));
      const ya = Math.abs(y(a) - y(b));
      return Math.max(xa, ya);
  }
  function maxAxisBetween(x1, y1, x2, y2) {
      const xa = Math.abs(x1 - x2);
      const ya = Math.abs(y1 - y2);
      return Math.max(xa, ya);
  }
  function distanceBetween(x1, y1, x2, y2) {
      const x = Math.abs(x1 - x2);
      const y = Math.abs(y1 - y2);
      const min = Math.min(x, y);
      return x + y - 0.6 * min;
  }
  function distanceFromTo(a, b) {
      return distanceBetween(x(a), y(a), x(b), y(b));
  }
  function calcRadius(x, y) {
      return distanceBetween(0, 0, x, y);
  }
  function dirBetween(x, y, toX, toY) {
      let diffX = toX - x;
      let diffY = toY - y;
      if (diffX && diffY) {
          const absX = Math.abs(diffX);
          const absY = Math.abs(diffY);
          if (absX >= 2 * absY) {
              diffY = 0;
          }
          else if (absY >= 2 * absX) {
              diffX = 0;
          }
      }
      return [Math.sign(diffX), Math.sign(diffY)];
  }
  function dirFromTo(a, b) {
      return dirBetween(x(a), y(a), x(b), y(b));
  }
  function dirIndex(dir) {
      const x0 = x(dir);
      const y0 = y(dir);
      return DIRS$2.findIndex((a) => a[0] == x0 && a[1] == y0);
  }
  function isOppositeDir(a, b) {
      if (Math.sign(a[0]) + Math.sign(b[0]) != 0)
          return false;
      if (Math.sign(a[1]) + Math.sign(b[1]) != 0)
          return false;
      return true;
  }
  function isSameDir(a, b) {
      return (Math.sign(a[0]) == Math.sign(b[0]) && Math.sign(a[1]) == Math.sign(b[1]));
  }
  function dirSpread(dir) {
      const result = [dir];
      if (dir[0] == 0) {
          result.push([1, dir[1]]);
          result.push([-1, dir[1]]);
      }
      else if (dir[1] == 0) {
          result.push([dir[0], 1]);
          result.push([dir[0], -1]);
      }
      else {
          result.push([dir[0], 0]);
          result.push([0, dir[1]]);
      }
      return result;
  }
  function stepFromTo(a, b, fn) {
      const x0 = x(a);
      const y0 = y(a);
      const diff = [x(b) - x0, y(b) - y0];
      const steps = Math.abs(diff[0]) + Math.abs(diff[1]);
      const c = [0, 0];
      const last = [99999, 99999];
      for (let step = 0; step <= steps; ++step) {
          c[0] = x0 + Math.floor((diff[0] * step) / steps);
          c[1] = y0 + Math.floor((diff[1] * step) / steps);
          if (c[0] != last[0] || c[1] != last[1]) {
              fn(c[0], c[1]);
          }
          last[0] = c[0];
          last[1] = c[1];
      }
  }
  // LINES
  function forLine(x, y, dir, length, fn) {
      for (let l = 0; l < length; ++l) {
          fn(x + l * dir[0], y + l * dir[1]);
      }
  }
  const FP_BASE = 16;
  const FP_FACTOR = 1 << 16;
  function forLineBetween(fromX, fromY, toX, toY, stepFn) {
      let targetVector = [], error = [], currentVector = [], quadrantTransform = [];
      let largerTargetComponent, i;
      let currentLoc = [-1, -1];
      if (fromX == toX && fromY == toY) {
          return true;
      }
      const originLoc = [fromX, fromY];
      const targetLoc = [toX, toY];
      // Neither vector is negative. We keep track of negatives with quadrantTransform.
      for (i = 0; i <= 1; i++) {
          targetVector[i] = (targetLoc[i] - originLoc[i]) << FP_BASE; // FIXME: should use parens?
          if (targetVector[i] < 0) {
              targetVector[i] *= -1;
              quadrantTransform[i] = -1;
          }
          else {
              quadrantTransform[i] = 1;
          }
          currentVector[i] = error[i] = 0;
          currentLoc[i] = originLoc[i];
      }
      // normalize target vector such that one dimension equals 1 and the other is in [0, 1].
      largerTargetComponent = Math.max(targetVector[0], targetVector[1]);
      // targetVector[0] = Math.floor( (targetVector[0] << FP_BASE) / largerTargetComponent);
      // targetVector[1] = Math.floor( (targetVector[1] << FP_BASE) / largerTargetComponent);
      targetVector[0] = Math.floor((targetVector[0] * FP_FACTOR) / largerTargetComponent);
      targetVector[1] = Math.floor((targetVector[1] * FP_FACTOR) / largerTargetComponent);
      do {
          for (i = 0; i <= 1; i++) {
              currentVector[i] += targetVector[i] >> FP_BASE;
              error[i] += targetVector[i] == FP_FACTOR ? 0 : targetVector[i];
              if (error[i] >= Math.floor(FP_FACTOR / 2)) {
                  currentVector[i]++;
                  error[i] -= FP_FACTOR;
              }
              currentLoc[i] = Math.floor(quadrantTransform[i] * currentVector[i] + originLoc[i]);
          }
          const r = stepFn(...currentLoc);
          if (r === false) {
              return false;
          }
          else if (r !== true &&
              currentLoc[0] === toX &&
              currentLoc[1] === toY) {
              return true;
          }
      } while (true);
  }
  function forLineFromTo(a, b, stepFn) {
      return forLineBetween(x(a), y(a), x(b), y(b), stepFn);
  }
  // ADAPTED FROM BROGUE 1.7.5
  // Simple line algorithm (maybe this is Bresenham?) that returns a list of coordinates
  // that extends all the way to the edge of the map based on an originLoc (which is not included
  // in the list of coordinates) and a targetLoc.
  // Returns the number of entries in the list, and includes (-1, -1) as an additional
  // terminus indicator after the end of the list.
  function getLine(fromX, fromY, toX, toY) {
      const line = [];
      forLineBetween(fromX, fromY, toX, toY, (x, y) => {
          line.push([x, y]);
      });
      return line;
  }
  // ADAPTED FROM BROGUE 1.7.5
  // Simple line algorithm (maybe this is Bresenham?) that returns a list of coordinates
  // that extends all the way to the edge of the map based on an originLoc (which is not included
  // in the list of coordinates) and a targetLoc.
  function getLineThru(fromX, fromY, toX, toY, width, height) {
      const line = [];
      forLineBetween(fromX, fromY, toX, toY, (x, y) => {
          if (x < 0 || y < 0 || x >= width || y >= height)
              return false;
          line.push([x, y]);
          return true;
      });
      return line;
  }
  // CIRCLE
  function forCircle(x, y, radius, fn) {
      let i, j;
      for (i = x - radius - 1; i < x + radius + 1; i++) {
          for (j = y - radius - 1; j < y + radius + 1; j++) {
              if ((i - x) * (i - x) + (j - y) * (j - y) <
                  radius * radius + radius) {
                  // + radius softens the circle
                  fn(i, j);
              }
          }
      }
  }
  function forRect(...args) {
      let left = 0;
      let top = 0;
      if (arguments.length > 3) {
          left = args.shift();
          top = args.shift();
      }
      const right = left + args[0];
      const bottom = top + args[1];
      const fn = args[2];
      for (let i = left; i < right; ++i) {
          for (let j = top; j < bottom; ++j) {
              fn(i, j);
          }
      }
  }
  function dumpRect(left, top, width, height, fmtFn, log = console.log) {
      let i, j;
      const bottom = top + height;
      const right = left + width;
      let output = [];
      for (j = top; j < bottom; j++) {
          let line = ('' + j + ']').padStart(3, ' ');
          for (i = left; i < right; i++) {
              if (i % 10 == 0) {
                  line += ' ';
              }
              line += fmtFn(i, j);
          }
          output.push(line);
      }
      log(output.join('\n'));
  }
  function dumpAround(x, y, radius, fmtFn, log = console.log) {
      dumpRect(x - radius, y - radius, 2 * radius + 1, 2 * radius + 1, fmtFn, log);
  }
  function forBorder(...args) {
      let left = 0;
      let top = 0;
      if (arguments.length > 3) {
          left = args.shift();
          top = args.shift();
      }
      const right = left + args[0] - 1;
      const bottom = top + args[1] - 1;
      const fn = args[2];
      for (let x = left; x <= right; ++x) {
          fn(x, top);
          fn(x, bottom);
      }
      for (let y = top; y <= bottom; ++y) {
          fn(left, y);
          fn(right, y);
      }
  }
  // ARC COUNT
  // Rotates around the cell, counting up the number of distinct strings of neighbors with the same test result in a single revolution.
  //		Zero means there are no impassable tiles adjacent.
  //		One means it is adjacent to a wall.
  //		Two means it is in a hallway or something similar.
  //		Three means it is the center of a T-intersection or something similar.
  //		Four means it is in the intersection of two hallways.
  //		Five or more means there is a bug.
  function arcCount(x, y, testFn) {
      let oldX, oldY, newX, newY;
      // brogueAssert(grid.hasXY(x, y));
      let arcCount = 0;
      let matchCount = 0;
      for (let dir = 0; dir < CLOCK_DIRS.length; dir++) {
          oldX = x + CLOCK_DIRS[(dir + 7) % 8][0];
          oldY = y + CLOCK_DIRS[(dir + 7) % 8][1];
          newX = x + CLOCK_DIRS[dir][0];
          newY = y + CLOCK_DIRS[dir][1];
          // Counts every transition from passable to impassable or vice-versa on the way around the cell:
          const newOk = testFn(newX, newY);
          const oldOk = testFn(oldX, oldY);
          if (newOk)
              ++matchCount;
          if (newOk != oldOk) {
              arcCount++;
          }
      }
      if (arcCount == 0 && matchCount)
          return 1;
      return Math.floor(arcCount / 2); // Since we added one when we entered a wall and another when we left.
  }
  function closestMatchingLocs(x, y, matchFn) {
      const locs = [];
      let i, j, k;
      // count up the number of candidate locations
      for (k = 0; k < 100 && !locs.length; k++) {
          for (i = x - k; i <= x + k; i++) {
              for (j = y - k; j <= y + k; j++) {
                  if (Math.ceil(distanceBetween(x, y, i, j)) == k &&
                      matchFn(i, j)) {
                      locs.push([i, j]);
                  }
              }
          }
      }
      return locs.length ? locs : null;
  }

  var xy = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	Bounds: Bounds,
  	CLOCK_DIRS: CLOCK_DIRS,
  	DIRS: DIRS$2,
  	DOWN: DOWN,
  	LEFT: LEFT,
  	LEFT_DOWN: LEFT_DOWN,
  	LEFT_UP: LEFT_UP,
  	NO_DIRECTION: NO_DIRECTION,
  	RIGHT: RIGHT,
  	RIGHT_DOWN: RIGHT_DOWN,
  	RIGHT_UP: RIGHT_UP,
  	UP: UP,
  	add: add,
  	addTo: addTo,
  	arcCount: arcCount,
  	asLoc: asLoc,
  	asXY: asXY,
  	calcRadius: calcRadius,
  	closestMatchingLocs: closestMatchingLocs,
  	contains: contains,
  	copy: copy,
  	dirBetween: dirBetween,
  	dirFromTo: dirFromTo,
  	dirIndex: dirIndex,
  	dirSpread: dirSpread,
  	distanceBetween: distanceBetween,
  	distanceFromTo: distanceFromTo,
  	dumpAround: dumpAround,
  	dumpRect: dumpRect,
  	eachNeighbor: eachNeighbor,
  	eachNeighborAsync: eachNeighborAsync,
  	equals: equals,
  	forBorder: forBorder,
  	forCircle: forCircle,
  	forLine: forLine,
  	forLineBetween: forLineBetween,
  	forLineFromTo: forLineFromTo,
  	forRect: forRect,
  	getLine: getLine,
  	getLineThru: getLineThru,
  	isDiagonal: isDiagonal,
  	isLoc: isLoc,
  	isOppositeDir: isOppositeDir,
  	isSameDir: isSameDir,
  	isXY: isXY,
  	lerp: lerp,
  	matchingNeighbor: matchingNeighbor,
  	maxAxisBetween: maxAxisBetween,
  	maxAxisFromTo: maxAxisFromTo,
  	stepFromTo: stepFromTo,
  	straightDistanceBetween: straightDistanceBetween,
  	x: x,
  	y: y
  });

  // CHAIN
  function length$1(root) {
      let count = 0;
      while (root) {
          count += 1;
          root = root.next;
      }
      return count;
  }
  function at(root, index) {
      while (root && index) {
          root = root.next;
          --index;
      }
      return root;
  }
  function includes(root, entry) {
      while (root && root !== entry) {
          root = root.next;
      }
      return root === entry;
  }
  function forEach(root, fn) {
      let index = 0;
      while (root) {
          const next = root.next;
          fn(root, index++);
          root = next;
      }
      return index; // really count
  }
  function push(obj, name, entry) {
      entry.next = obj[name] || null;
      obj[name] = entry;
      return true;
  }
  function remove(obj, name, entry) {
      const root = obj[name];
      if (root === entry) {
          obj[name] = entry.next || null;
          entry.next = null;
          return true;
      }
      else if (!root) {
          return false;
      }
      else {
          let prev = root;
          let current = prev.next;
          while (current && current !== entry) {
              prev = current;
              current = prev.next;
          }
          if (current === entry) {
              prev.next = current.next;
              entry.next = null;
              return true;
          }
      }
      return false;
  }
  function find(root, cb) {
      while (root && !cb(root)) {
          root = root.next;
      }
      return root;
  }
  function insert(obj, name, entry, sort) {
      let root = obj[name];
      sort = sort || (() => -1); // always insert first
      if (!root || sort(root, entry) < 0) {
          entry.next = root;
          obj[name] = entry;
          return true;
      }
      let prev = root;
      let current = root.next;
      while (current && sort(current, entry) > 0) {
          prev = current;
          current = current.next;
      }
      entry.next = current;
      prev.next = entry;
      return true;
  }
  function reduce(root, cb, out) {
      let current = root;
      if (out === undefined) {
          if (!current)
              throw new TypeError('Empty list reduce without initial value not allowed.');
          out = current;
          current = current.next;
      }
      while (current) {
          out = cb(out, current);
          current = current.next;
      }
      return out;
  }
  function some(root, cb) {
      let current = root;
      while (current) {
          if (cb(current))
              return true;
          current = current.next;
      }
      return false;
  }
  function every(root, cb) {
      let current = root;
      while (current) {
          if (!cb(current))
              return false;
          current = current.next;
      }
      return true;
  }

  var list = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	at: at,
  	every: every,
  	find: find,
  	forEach: forEach,
  	includes: includes,
  	insert: insert,
  	length: length$1,
  	push: push,
  	reduce: reduce,
  	remove: remove,
  	some: some
  });

  const getValue = get$1$1;
  // export function extend(obj, name, fn) {
  //   const base = obj[name] || NOOP;
  //   const newFn = fn.bind(obj, base.bind(obj));
  //   newFn.fn = fn;
  //   newFn.base = base;
  //   obj[name] = newFn;
  // }
  // export function rebase(obj, name, newBase) {
  //   const fns = [];
  //   let fn = obj[name];
  //   while(fn && fn.fn) {
  //     fns.push(fn.fn);
  //     fn = fn.base;
  //   }
  //   obj[name] = newBase;
  //   while(fns.length) {
  //     fn = fns.pop();
  //     extend(obj, name, fn);
  //   }
  // }
  // export function cloneObject(obj:object) {
  //   const other = Object.create(obj.__proto__);
  //   assignObject(other, obj);
  //   return other;
  // }
  function assignField(dest, src, key) {
      const current = dest[key];
      const updated = src[key];
      if (current && current.copy && updated) {
          current.copy(updated);
      }
      else if (current && current.clear && !updated) {
          current.clear();
      }
      else if (current && current.nullify && !updated) {
          current.nullify();
      }
      else if (updated && updated.clone) {
          dest[key] = updated.clone(); // just use same object (shallow copy)
      }
      else if (updated && Array.isArray(updated)) {
          dest[key] = updated.slice();
      }
      else if (current && Array.isArray(current)) {
          current.length = 0;
      }
      else if (updated !== undefined) {
          dest[key] = updated;
      }
  }
  function copyObject(dest, src) {
      Object.keys(dest).forEach((key) => {
          assignField(dest, src, key);
      });
      return dest;
  }
  function assignObject(dest, src) {
      Object.keys(src).forEach((key) => {
          assignField(dest, src, key);
      });
      return dest;
  }
  function assignOmitting(omit, dest, src) {
      if (typeof omit === 'string') {
          omit = omit.split(/[,|]/g).map((t) => t.trim());
      }
      Object.keys(src).forEach((key) => {
          if (omit.includes(key))
              return;
          assignField(dest, src, key);
      });
      return dest;
  }
  function setDefault(obj, field, val) {
      if (obj[field] === undefined) {
          obj[field] = val;
      }
  }
  function setDefaults(obj, def, custom = null) {
      let dest;
      if (!def)
          return;
      Object.keys(def).forEach((key) => {
          const origKey = key;
          let defValue = def[key];
          dest = obj;
          // allow for => 'stats.health': 100
          const parts = key.split('.');
          while (parts.length > 1) {
              key = parts.shift();
              if (dest[key] === undefined) {
                  dest = dest[key] = {};
              }
              else if (typeof dest[key] !== 'object') {
                  ERROR('Trying to set default member on non-object config item: ' +
                      origKey);
              }
              else {
                  dest = dest[key];
              }
          }
          key = parts.shift();
          let current = dest[key];
          // console.log('def - ', key, current, defValue, obj, dest);
          if (custom && custom(dest, key, current, defValue)) ;
          else if (current === undefined) {
              if (defValue === null) {
                  dest[key] = null;
              }
              else if (Array.isArray(defValue)) {
                  dest[key] = defValue.slice();
              }
              else if (typeof defValue === 'object') {
                  dest[key] = defValue; // Object.assign({}, defValue); -- this breaks assigning a Color object as a default...
              }
              else {
                  dest[key] = defValue;
              }
          }
      });
  }
  function setOptions(obj, opts) {
      setDefaults(obj, opts, (dest, key, _current, opt) => {
          if (opt === null) {
              dest[key] = null;
          }
          else if (Array.isArray(opt)) {
              dest[key] = opt.slice();
          }
          else if (typeof opt === 'object') {
              dest[key] = opt; // Object.assign({}, opt); -- this breaks assigning a Color object as a default...
          }
          else {
              dest[key] = opt;
          }
          return true;
      });
  }
  function kindDefaults(obj, def) {
      function custom(dest, key, current, defValue) {
          if (key.search(/[fF]lags$/) < 0)
              return false;
          if (!current) {
              current = [];
          }
          else if (typeof current == 'string') {
              current = current.split(/[,|]/).map((t) => t.trim());
          }
          else if (!Array.isArray(current)) {
              current = [current];
          }
          if (typeof defValue === 'string') {
              defValue = defValue.split(/[,|]/).map((t) => t.trim());
          }
          else if (!Array.isArray(defValue)) {
              defValue = [defValue];
          }
          // console.log('flags', key, defValue, current);
          dest[key] = defValue.concat(current);
          return true;
      }
      return setDefaults(obj, def, custom);
  }
  function pick(obj, ...fields) {
      const data = {};
      fields.forEach((f) => {
          const v = obj[f];
          if (v !== undefined) {
              data[f] = v;
          }
      });
      return data;
  }
  function clearObject(obj) {
      Object.keys(obj).forEach((key) => (obj[key] = undefined));
  }
  function getOpt(obj, member, _default) {
      const v = obj[member];
      if (v === undefined)
          return _default;
      return v;
  }
  function firstOpt(field, ...args) {
      for (let arg of args) {
          if (typeof arg !== 'object' || Array.isArray(arg)) {
              return arg;
          }
          if (arg && arg[field] !== undefined) {
              return arg[field];
          }
      }
      return undefined;
  }

  var object = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	assignObject: assignObject,
  	assignOmitting: assignOmitting,
  	clearObject: clearObject,
  	copyObject: copyObject,
  	firstOpt: firstOpt,
  	getOpt: getOpt,
  	getValue: getValue,
  	kindDefaults: kindDefaults,
  	pick: pick,
  	setDefault: setDefault,
  	setDefaults: setDefaults,
  	setOptions: setOptions
  });

  const DIRS$1$1 = DIRS$2;
  function makeArray$1(l, fn) {
      if (fn === undefined)
          return new Array(l).fill(0);
      let initFn;
      if (typeof fn !== 'function') {
          initFn = () => fn;
      }
      else {
          initFn = fn;
      }
      const arr = new Array(l);
      for (let i = 0; i < l; ++i) {
          arr[i] = initFn(i);
      }
      return arr;
  }
  function _formatGridValue(v) {
      if (v === false) {
          return ' ';
      }
      else if (v === true) {
          return 'T';
      }
      else if (v < 10) {
          return '' + v;
      }
      else if (v < 36) {
          return String.fromCharCode('a'.charCodeAt(0) + v - 10);
      }
      else if (v < 62) {
          return String.fromCharCode('A'.charCodeAt(0) + v - 10 - 26);
      }
      else if (typeof v === 'string') {
          return v[0];
      }
      else {
          return '#';
      }
  }
  class Grid extends Array {
      constructor(w, h, v) {
          super(w);
          const grid = this;
          for (let x = 0; x < w; ++x) {
              if (typeof v === 'function') {
                  this[x] = new Array(h)
                      .fill(0)
                      .map((_, i) => v(x, i, grid));
              }
              else {
                  this[x] = new Array(h).fill(v);
              }
          }
          this._width = w;
          this._height = h;
      }
      get width() {
          return this._width;
      }
      get height() {
          return this._height;
      }
      get(x, y) {
          if (!this.hasXY(x, y))
              return undefined;
          return this[x][y];
      }
      set(x, y, v) {
          if (!this.hasXY(x, y))
              return false;
          this[x][y] = v;
          return true;
      }
      /**
       * Calls the supplied function for each cell in the grid.
       * @param fn - The function to call on each item in the grid.
       * TSIGNORE
       */
      // @ts-ignore
      forEach(fn) {
          let i, j;
          for (i = 0; i < this.width; i++) {
              for (j = 0; j < this.height; j++) {
                  fn(this[i][j], i, j, this);
              }
          }
      }
      async forEachAsync(fn) {
          let i, j;
          for (i = 0; i < this.width; i++) {
              for (j = 0; j < this.height; j++) {
                  await fn(this[i][j], i, j, this);
              }
          }
      }
      eachNeighbor(x, y, fn, only4dirs = false) {
          eachNeighbor(x, y, (i, j) => {
              if (this.hasXY(i, j)) {
                  fn(this[i][j], i, j, this);
              }
          }, only4dirs);
      }
      async eachNeighborAsync(x, y, fn, only4dirs = false) {
          const maxIndex = only4dirs ? 4 : 8;
          for (let d = 0; d < maxIndex; ++d) {
              const dir = DIRS$1$1[d];
              const i = x + dir[0];
              const j = y + dir[1];
              if (this.hasXY(i, j)) {
                  await fn(this[i][j], i, j, this);
              }
          }
      }
      forRect(x, y, w, h, fn) {
          forRect(x, y, w, h, (i, j) => {
              if (this.hasXY(i, j)) {
                  fn(this[i][j], i, j, this);
              }
          });
      }
      randomEach(fn) {
          const sequence = random$2.sequence(this.width * this.height);
          for (let i = 0; i < sequence.length; ++i) {
              const n = sequence[i];
              const x = n % this.width;
              const y = Math.floor(n / this.width);
              if (fn(this[x][y], x, y, this) === true)
                  return true;
          }
          return false;
      }
      /**
       * Returns a new Grid with the cells mapped according to the supplied function.
       * @param fn - The function that maps the cell values
       * TODO - Do we need this???
       * TODO - Should this only be in NumGrid?
       * TODO - Should it alloc instead of using constructor?
       * TSIGNORE
       */
      // @ts-ignore
      map(fn) {
          // @ts-ignore
          const other = new this.constructor(this.width, this.height);
          other.copy(this);
          other.update(fn);
          return other;
      }
      /**
       * Returns whether or not an item in the grid matches the provided function.
       * @param fn - The function that matches
       * TODO - Do we need this???
       * TODO - Should this only be in NumGrid?
       * TODO - Should it alloc instead of using constructor?
       * TSIGNORE
       */
      // @ts-ignore
      some(fn) {
          return super.some((col, x) => col.some((data, y) => fn(data, x, y, this)));
      }
      forCircle(x, y, radius, fn) {
          forCircle(x, y, radius, (i, j) => {
              if (this.hasXY(i, j))
                  fn(this[i][j], i, j, this);
          });
      }
      hasXY(x, y) {
          return x >= 0 && y >= 0 && x < this.width && y < this.height;
      }
      isBoundaryXY(x, y) {
          return (this.hasXY(x, y) &&
              (x == 0 || x == this.width - 1 || y == 0 || y == this.height - 1));
      }
      calcBounds() {
          const bounds = {
              left: this.width,
              top: this.height,
              right: 0,
              bottom: 0,
          };
          this.forEach((v, i, j) => {
              if (!v)
                  return;
              if (bounds.left > i)
                  bounds.left = i;
              if (bounds.right < i)
                  bounds.right = i;
              if (bounds.top > j)
                  bounds.top = j;
              if (bounds.bottom < j)
                  bounds.bottom = j;
          });
          return bounds;
      }
      update(fn) {
          forRect(this.width, this.height, (i, j) => {
              this[i][j] = fn(this[i][j], i, j, this);
          });
      }
      updateRect(x, y, width, height, fn) {
          forRect(x, y, width, height, (i, j) => {
              if (this.hasXY(i, j))
                  this[i][j] = fn(this[i][j], i, j, this);
          });
      }
      updateCircle(x, y, radius, fn) {
          forCircle(x, y, radius, (i, j) => {
              if (this.hasXY(i, j)) {
                  this[i][j] = fn(this[i][j], i, j, this);
              }
          });
      }
      /**
       * Fills the entire grid with the supplied value
       * @param v - The fill value or a function that returns the fill value.
       * TSIGNORE
       */
      // @ts-ignore
      fill(v) {
          const fn = typeof v === 'function' ? v : () => v;
          this.update(fn);
      }
      fillRect(x, y, w, h, v) {
          const fn = typeof v === 'function' ? v : () => v;
          this.updateRect(x, y, w, h, fn);
      }
      fillCircle(x, y, radius, v) {
          const fn = typeof v === 'function' ? v : () => v;
          this.updateCircle(x, y, radius, fn);
      }
      replace(findValue, replaceValue) {
          this.update((v) => (v == findValue ? replaceValue : v));
      }
      copy(from) {
          // TODO - check width, height?
          this.update((_, i, j) => from[i][j]);
      }
      count(match) {
          const fn = typeof match === 'function'
              ? match
              : (v) => v == match;
          let count = 0;
          this.forEach((v, i, j) => {
              if (fn(v, i, j, this))
                  ++count;
          });
          return count;
      }
      /**
       * Finds the first matching value/result and returns that location as an xy.Loc
       * @param v - The fill value or a function that returns the fill value.
       * @returns xy.Loc | null - The location of the first cell matching the criteria or null if not found.
       * TSIGNORE
       */
      // @ts-ignore
      find(match) {
          const fn = typeof match === 'function'
              ? match
              : (v) => v == match;
          for (let x = 0; x < this.width; ++x) {
              for (let y = 0; y < this.height; ++y) {
                  const v = this[x][y];
                  if (fn(v, x, y, this))
                      return [x, y];
              }
          }
          return null;
      }
      dump(fmtFn, log = console.log) {
          this.dumpRect(0, 0, this.width, this.height, fmtFn, log);
      }
      dumpRect(left, top, width, height, fmtFn, log = console.log) {
          fmtFn = fmtFn || _formatGridValue;
          const format = (x, y) => {
              return fmtFn(this.get(x, y), x, y);
          };
          return dumpRect(left, top, width, height, format, log);
      }
      dumpAround(x, y, radius, fmtFn, log = console.log) {
          this.dumpRect(x - radius, y - radius, 2 * radius + 1, 2 * radius + 1, fmtFn, log);
      }
      // TODO - Use for(radius) loop to speed this up (do not look at each cell)
      closestMatchingLoc(x, y, v) {
          let bestLoc = [-1, -1];
          let bestDistance = 100 * (this.width + this.height);
          const fn = typeof v === 'function'
              ? v
              : (val) => val == v;
          this.forEach((v, i, j) => {
              if (fn(v, i, j, this)) {
                  const dist = Math.floor(100 * distanceBetween(x, y, i, j));
                  if (dist < bestDistance) {
                      bestLoc[0] = i;
                      bestLoc[1] = j;
                      bestDistance = dist;
                  }
                  else if (dist == bestDistance && random$2.chance(50)) {
                      bestLoc[0] = i;
                      bestLoc[1] = j;
                  }
              }
          });
          return bestLoc;
      }
      firstMatchingLoc(v) {
          const fn = typeof v === 'function'
              ? v
              : (val) => val == v;
          for (let i = 0; i < this.width; ++i) {
              for (let j = 0; j < this.height; ++j) {
                  if (fn(this[i][j], i, j, this)) {
                      return [i, j];
                  }
              }
          }
          return [-1, -1];
      }
      randomMatchingLoc(v) {
          const fn = typeof v === 'function'
              ? (x, y) => v(this[x][y], x, y, this)
              : (x, y) => this.get(x, y) === v;
          return random$2.matchingLoc(this.width, this.height, fn);
      }
      matchingLocNear(x, y, v) {
          const fn = typeof v === 'function'
              ? (x, y) => v(this[x][y], x, y, this)
              : (x, y) => this.get(x, y) === v;
          return random$2.matchingLocNear(x, y, fn);
      }
      // Rotates around the cell, counting up the number of distinct strings of neighbors with the same test result in a single revolution.
      //		Zero means there are no impassable tiles adjacent.
      //		One means it is adjacent to a wall.
      //		Two means it is in a hallway or something similar.
      //		Three means it is the center of a T-intersection or something similar.
      //		Four means it is in the intersection of two hallways.
      //		Five or more means there is a bug.
      arcCount(x, y, testFn) {
          return arcCount(x, y, (i, j) => {
              return this.hasXY(i, j) && testFn(this[i][j], i, j, this);
          });
      }
  }
  const GRID_CACHE = [];
  const stats = {
      active: 0,
      alloc: 0,
      create: 0,
      free: 0,
  };
  class NumGrid extends Grid {
      static alloc(...args) {
          let w = args[0] || 0;
          let h = args[1] || 0;
          let v = args[2] || 0;
          if (args.length == 1) {
              // clone from NumGrid
              w = args[0].width;
              h = args[0].height;
              v = args[0].get.bind(args[0]);
          }
          if (!w || !h)
              throw new Error('Grid alloc requires width and height parameters.');
          ++stats.active;
          ++stats.alloc;
          let grid = GRID_CACHE.pop();
          if (!grid) {
              ++stats.create;
              return new NumGrid(w, h, v);
          }
          grid._resize(w, h, v);
          return grid;
      }
      static free(grid) {
          if (grid) {
              if (GRID_CACHE.indexOf(grid) >= 0)
                  return;
              GRID_CACHE.push(grid);
              ++stats.free;
              --stats.active;
          }
      }
      constructor(w, h, v = 0) {
          super(w, h, v);
      }
      _resize(width, height, v) {
          const fn = typeof v === 'function' ? v : () => v;
          while (this.length < width)
              this.push([]);
          this.length = width;
          let x = 0;
          let y = 0;
          for (x = 0; x < width; ++x) {
              const col = this[x];
              for (y = 0; y < height; ++y) {
                  col[y] = fn(x, y, this);
              }
              col.length = height;
          }
          this._width = width;
          this._height = height;
          if (this.x !== undefined) {
              this.x = undefined;
              this.y = undefined;
          }
      }
      findReplaceRange(findValueMin, findValueMax, fillValue) {
          this.update((v) => {
              if (v >= findValueMin && v <= findValueMax) {
                  return fillValue;
              }
              return v;
          });
      }
      // Flood-fills the grid from (x, y) along cells that are within the eligible range.
      // Returns the total count of filled cells.
      floodFillRange(x, y, eligibleValueMin, eligibleValueMax, fillValue) {
          let dir;
          let newX, newY, fillCount = 1;
          if (fillValue >= eligibleValueMin && fillValue <= eligibleValueMax) {
              throw new Error('Invalid grid flood fill');
          }
          const ok = (x, y) => {
              return (this.hasXY(x, y) &&
                  this[x][y] >= eligibleValueMin &&
                  this[x][y] <= eligibleValueMax);
          };
          if (!ok(x, y))
              return 0;
          this[x][y] = fillValue;
          for (dir = 0; dir < 4; dir++) {
              newX = x + DIRS$1$1[dir][0];
              newY = y + DIRS$1$1[dir][1];
              if (ok(newX, newY)) {
                  fillCount += this.floodFillRange(newX, newY, eligibleValueMin, eligibleValueMax, fillValue);
              }
          }
          return fillCount;
      }
      invert() {
          this.update((v) => (v ? 0 : 1));
      }
      leastPositiveValue() {
          let least = Number.MAX_SAFE_INTEGER;
          this.forEach((v) => {
              if (v > 0 && v < least) {
                  least = v;
              }
          });
          return least;
      }
      randomLeastPositiveLoc() {
          const targetValue = this.leastPositiveValue();
          return this.randomMatchingLoc(targetValue);
      }
      valueBounds(value, bounds) {
          let foundValueAtThisLine = false;
          let i, j;
          let left = this.width - 1, right = 0, top = this.height - 1, bottom = 0;
          // Figure out the top blob's height and width:
          // First find the max & min x:
          for (i = 0; i < this.width; i++) {
              foundValueAtThisLine = false;
              for (j = 0; j < this.height; j++) {
                  if (this[i][j] == value) {
                      foundValueAtThisLine = true;
                      break;
                  }
              }
              if (foundValueAtThisLine) {
                  if (i < left) {
                      left = i;
                  }
                  if (i > right) {
                      right = i;
                  }
              }
          }
          // Then the max & min y:
          for (j = 0; j < this.height; j++) {
              foundValueAtThisLine = false;
              for (i = 0; i < this.width; i++) {
                  if (this[i][j] == value) {
                      foundValueAtThisLine = true;
                      break;
                  }
              }
              if (foundValueAtThisLine) {
                  if (j < top) {
                      top = j;
                  }
                  if (j > bottom) {
                      bottom = j;
                  }
              }
          }
          bounds = bounds || new Bounds(0, 0, 0, 0);
          bounds.x = left;
          bounds.y = top;
          bounds.width = right - left + 1;
          bounds.height = bottom - top + 1;
          return bounds;
      }
      // Marks a cell as being a member of blobNumber, then recursively iterates through the rest of the blob
      floodFill(x, y, matchValue, fillValue) {
          const matchFn = typeof matchValue == 'function'
              ? matchValue
              : (v) => v == matchValue;
          const fillFn = typeof fillValue == 'function' ? fillValue : () => fillValue;
          let done = NumGrid.alloc(this.width, this.height);
          let newX, newY;
          const todo = [[x, y]];
          const free = [];
          let count = 1;
          while (todo.length) {
              const item = todo.pop();
              [x, y] = item;
              free.push(item);
              if (!this.hasXY(x, y) || done[x][y])
                  continue;
              if (!matchFn(this[x][y], x, y, this))
                  continue;
              this[x][y] = fillFn(this[x][y], x, y, this);
              done[x][y] = 1;
              ++count;
              // Iterate through the four cardinal neighbors.
              for (let dir = 0; dir < 4; dir++) {
                  newX = x + DIRS$1$1[dir][0];
                  newY = y + DIRS$1$1[dir][1];
                  // If the neighbor is an unmarked region cell,
                  const item = free.pop() || [-1, -1];
                  item[0] = newX;
                  item[1] = newY;
                  todo.push(item);
              }
          }
          NumGrid.free(done);
          return count;
      }
  }
  // Grid.fillBlob = fillBlob;
  const alloc$1 = NumGrid.alloc.bind(NumGrid);
  const free$1 = NumGrid.free.bind(NumGrid);
  function make$e(w, h, v) {
      if (v === undefined)
          return new NumGrid(w, h, 0);
      if (typeof v === 'number')
          return new NumGrid(w, h, v);
      return new Grid(w, h, v);
  }
  function offsetZip(destGrid, srcGrid, srcToDestX, srcToDestY, value) {
      const fn = typeof value === 'function'
          ? value
          : (_d, _s, dx, dy) => (destGrid[dx][dy] = value);
      srcGrid.forEach((c, i, j) => {
          const destX = i + srcToDestX;
          const destY = j + srcToDestY;
          if (!destGrid.hasXY(destX, destY))
              return;
          if (!c)
              return;
          fn(destGrid[destX][destY], c, destX, destY, i, j, destGrid, srcGrid);
      });
  }
  // Grid.offsetZip = offsetZip;
  function intersection(onto, a, b) {
      b = b || onto;
      // @ts-ignore
      onto.update((_, i, j) => (a[i][j] && b[i][j]) || 0);
  }
  // Grid.intersection = intersection;
  function unite(onto, a, b) {
      b = b || onto;
      // @ts-ignore
      onto.update((_, i, j) => b[i][j] || a[i][j]);
  }

  var grid = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	Grid: Grid,
  	NumGrid: NumGrid,
  	alloc: alloc$1,
  	free: free$1,
  	intersection: intersection,
  	make: make$e,
  	makeArray: makeArray$1,
  	offsetZip: offsetZip,
  	stats: stats,
  	unite: unite
  });

  /**
   * The code in this function is extracted from ROT.JS.
   * Source: https://github.com/ondras/rot.js/blob/v2.2.0/src/rng.ts
   * Copyright (c) 2012-now(), Ondrej Zara
   * All rights reserved.
   * License: BSD 3-Clause "New" or "Revised" License
   * See: https://github.com/ondras/rot.js/blob/v2.2.0/license.txt
   */
  function Alea(seed) {
      /**
       * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
       * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
       */
      seed = Math.abs(seed || Date.now());
      seed = seed < 1 ? 1 / seed : seed;
      const FRAC = 2.3283064365386963e-10; /* 2^-32 */
      let _s0 = 0;
      let _s1 = 0;
      let _s2 = 0;
      let _c = 0;
      /**
       * Seed the number generator
       */
      _s0 = (seed >>> 0) * FRAC;
      seed = (seed * 69069 + 1) >>> 0;
      _s1 = seed * FRAC;
      seed = (seed * 69069 + 1) >>> 0;
      _s2 = seed * FRAC;
      _c = 1;
      /**
       * @returns Pseudorandom value [0,1), uniformly distributed
       */
      return function alea() {
          let t = 2091639 * _s0 + _c * FRAC;
          _s0 = _s1;
          _s1 = _s2;
          _c = t | 0;
          _s2 = t - _c;
          return _s2;
      };
  }
  const RANDOM_CONFIG = {
      make: Alea,
      // make: (seed?: number) => {
      //     let rng = ROT.RNG.clone();
      //     if (seed) {
      //         rng.setSeed(seed);
      //     }
      //     return rng.getUniform.bind(rng);
      // },
  };
  function configure$1(config = {}) {
      if (config.make) {
          RANDOM_CONFIG.make = config.make;
          random$2.seed();
          cosmetic.seed();
      }
  }
  function lotteryDrawArray(rand, frequencies) {
      let i, maxFreq, randIndex;
      maxFreq = 0;
      for (i = 0; i < frequencies.length; i++) {
          maxFreq += frequencies[i];
      }
      if (maxFreq <= 0) {
          // console.warn(
          //     'Lottery Draw - no frequencies',
          //     frequencies,
          //     frequencies.length
          // );
          return -1;
      }
      randIndex = rand.range(0, maxFreq - 1);
      for (i = 0; i < frequencies.length; i++) {
          if (frequencies[i] > randIndex) {
              return i;
          }
          else {
              randIndex -= frequencies[i];
          }
      }
      console.warn('Lottery Draw failed.', frequencies, frequencies.length);
      return 0;
  }
  function lotteryDrawObject(rand, weights) {
      const entries = Object.entries(weights);
      const frequencies = entries.map(([_, weight]) => weight);
      const index = lotteryDrawArray(rand, frequencies);
      if (index < 0)
          return -1;
      return entries[index][0];
  }
  class Random {
      // static configure(opts: Partial<RandomConfig>) {
      //     if (opts.make) {
      //         if (typeof opts.make !== 'function')
      //             throw new Error('Random make parameter must be a function.');
      //         if (typeof opts.make(12345) !== 'function')
      //             throw new Error(
      //                 'Random make function must accept a numeric seed and return a random function.'
      //             );
      //         RANDOM_CONFIG.make = opts.make;
      //         random.seed();
      //         cosmetic.seed();
      //     }
      // }
      constructor(seed) {
          this._fn = RANDOM_CONFIG.make(seed);
      }
      seed(val) {
          val = val || Date.now();
          this._fn = RANDOM_CONFIG.make(val);
      }
      value() {
          return this._fn();
      }
      float() {
          return this.value();
      }
      number(max = Number.MAX_SAFE_INTEGER) {
          if (max <= 0)
              return 0;
          return Math.floor(this.value() * max);
      }
      int(max = 0) {
          return this.number(max);
      }
      range(lo, hi) {
          if (hi <= lo)
              return hi;
          const diff = hi - lo + 1;
          return lo + this.number(diff);
      }
      /**
       * @param mean Mean value
       * @param stddev Standard deviation. ~95% of the absolute values will be lower than 2*stddev.
       * @returns A normally distributed pseudorandom value
       * @see: https://github.com/ondras/rot.js/blob/v2.2.0/src/rng.ts
       */
      normal(mean = 0, stddev = 1) {
          let u, v, r;
          do {
              u = 2 * this.value() - 1;
              v = 2 * this.value() - 1;
              r = u * u + v * v;
          } while (r > 1 || r == 0);
          let gauss = u * Math.sqrt((-2 * Math.log(r)) / r);
          return mean + gauss * stddev;
      }
      dice(count, sides, addend = 0) {
          let total = 0;
          let mult = 1;
          if (count < 0) {
              count = -count;
              mult = -1;
          }
          addend = addend || 0;
          for (let i = 0; i < count; ++i) {
              total += this.range(1, sides);
          }
          total *= mult;
          return total + addend;
      }
      weighted(weights) {
          if (Array.isArray(weights)) {
              return lotteryDrawArray(this, weights);
          }
          return lotteryDrawObject(this, weights);
      }
      item(list) {
          if (!Array.isArray(list)) {
              list = Object.values(list);
          }
          return list[this.range(0, list.length - 1)];
      }
      key(obj) {
          return this.item(Object.keys(obj));
      }
      shuffle(list, fromIndex = 0, toIndex = 0) {
          if (arguments.length == 2) {
              toIndex = fromIndex;
              fromIndex = 0;
          }
          let i, r, buf;
          toIndex = toIndex || list.length;
          fromIndex = fromIndex || 0;
          for (i = fromIndex; i < toIndex; i++) {
              r = this.range(fromIndex, toIndex - 1);
              if (i != r) {
                  buf = list[r];
                  list[r] = list[i];
                  list[i] = buf;
              }
          }
          return list;
      }
      sequence(n) {
          const list = [];
          for (let i = 0; i < n; i++) {
              list[i] = i;
          }
          return this.shuffle(list);
      }
      chance(percent, outOf = 100) {
          if (percent <= 0)
              return false;
          if (percent >= outOf)
              return true;
          return this.number(outOf) < percent;
      }
      // Get a random int between lo and hi, inclusive, with probability distribution
      // affected by clumps.
      clumped(lo, hi, clumps) {
          if (hi <= lo) {
              return lo;
          }
          if (clumps <= 1) {
              return this.range(lo, hi);
          }
          let i, total = 0, numSides = Math.floor((hi - lo) / clumps);
          for (i = 0; i < (hi - lo) % clumps; i++) {
              total += this.range(0, numSides + 1);
          }
          for (; i < clumps; i++) {
              total += this.range(0, numSides);
          }
          return total + lo;
      }
      matchingLoc(width, height, matchFn) {
          let locationCount = 0;
          let i, j, index;
          const grid$1 = alloc$1(width, height);
          locationCount = 0;
          grid$1.update((_v, x, y) => {
              if (matchFn(x, y)) {
                  ++locationCount;
                  return 1;
              }
              return 0;
          });
          if (locationCount) {
              index = this.range(0, locationCount - 1);
              for (i = 0; i < width && index >= 0; i++) {
                  for (j = 0; j < height && index >= 0; j++) {
                      if (grid$1[i][j]) {
                          if (index == 0) {
                              free$1(grid$1);
                              return [i, j];
                          }
                          index--;
                      }
                  }
              }
          }
          free$1(grid$1);
          return [-1, -1];
      }
      matchingLocNear(x, y, matchFn) {
          let loc = [-1, -1];
          let i, j, k, candidateLocs, randIndex;
          candidateLocs = 0;
          // count up the number of candidate locations
          for (k = 0; k < 50 && !candidateLocs; k++) {
              for (i = x - k; i <= x + k; i++) {
                  for (j = y - k; j <= y + k; j++) {
                      if (Math.ceil(distanceBetween(x, y, i, j)) == k &&
                          matchFn(i, j)) {
                          candidateLocs++;
                      }
                  }
              }
          }
          if (candidateLocs == 0) {
              return [-1, -1];
          }
          // and pick one
          randIndex = 1 + this.number(candidateLocs);
          --k;
          // for (k = 0; k < 50; k++) {
          for (i = x - k; i <= x + k; i++) {
              for (j = y - k; j <= y + k; j++) {
                  if (Math.ceil(distanceBetween(x, y, i, j)) == k &&
                      matchFn(i, j)) {
                      if (--randIndex == 0) {
                          loc[0] = i;
                          loc[1] = j;
                          return loc;
                      }
                  }
              }
          }
          // }
          return [-1, -1]; // should never reach this point
      }
  }
  const random$2 = new Random();
  const cosmetic = new Random();
  function make$d(seed) {
      return new Random(seed);
  }

  var rng = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	Alea: Alea,
  	Random: Random,
  	configure: configure$1,
  	cosmetic: cosmetic,
  	make: make$d,
  	random: random$2
  });

  class Range {
      constructor(lower, upper = 0, clumps = 1) {
          if (Array.isArray(lower)) {
              clumps = lower[2];
              upper = lower[1];
              lower = lower[0];
          }
          if (upper < lower) {
              [upper, lower] = [lower, upper];
          }
          this.lo = lower || 0;
          this.hi = upper || this.lo;
          this.clumps = clumps || 1;
      }
      value(rng) {
          rng = rng || random$2;
          return rng.clumped(this.lo, this.hi, this.clumps);
      }
      max() {
          return this.hi;
      }
      contains(value) {
          return this.lo <= value && this.hi >= value;
      }
      copy(other) {
          this.lo = other.lo;
          this.hi = other.hi;
          this.clumps = other.clumps;
          return this;
      }
      toString() {
          if (this.lo >= this.hi) {
              return '' + this.lo;
          }
          return `${this.lo}-${this.hi}`;
      }
  }
  function make$c(config) {
      if (!config)
          return new Range(0, 0, 0);
      if (config instanceof Range)
          return config; // don't need to clone since they are immutable
      // if (config.value) return config;  // calc or damage
      if (typeof config == 'function')
          throw new Error('Custom range functions not supported - extend Range');
      if (config === undefined || config === null)
          return new Range(0, 0, 0);
      if (typeof config == 'number')
          return new Range(config, config, 1);
      // @ts-ignore
      if (config === true || config === false)
          throw new Error('Invalid random config: ' + config);
      if (Array.isArray(config)) {
          return new Range(config[0], config[1], config[2]);
      }
      if (typeof config !== 'string') {
          throw new Error('Calculations must be strings.  Received: ' + JSON.stringify(config));
      }
      if (config.length == 0)
          return new Range(0, 0, 0);
      const RE = /^(?:([+-]?\d*)[Dd](\d+)([+-]?\d*)|([+-]?\d+)-(\d+):?(\d+)?|([+-]?\d+)~(\d+)|([+-]?\d+)\+|([+-]?\d+))$/g;
      let results;
      while ((results = RE.exec(config)) !== null) {
          if (results[2]) {
              let count = Number.parseInt(results[1]) || 1;
              const sides = Number.parseInt(results[2]);
              const addend = Number.parseInt(results[3]) || 0;
              const lower = addend + count;
              const upper = addend + count * sides;
              return new Range(lower, upper, count);
          }
          else if (results[4] && results[5]) {
              const min = Number.parseInt(results[4]);
              const max = Number.parseInt(results[5]);
              const clumps = Number.parseInt(results[6]);
              return new Range(min, max, clumps);
          }
          else if (results[7] && results[8]) {
              const base = Number.parseInt(results[7]);
              const std = Number.parseInt(results[8]);
              return new Range(base - 2 * std, base + 2 * std, 3);
          }
          else if (results[9]) {
              const v = Number.parseInt(results[9]);
              return new Range(v, Number.MAX_SAFE_INTEGER, 1);
          }
          else if (results[10]) {
              const v = Number.parseInt(results[10]);
              return new Range(v, v, 1);
          }
      }
      throw new Error('Not a valid range - ' + config);
  }
  const from$4 = make$c;
  function asFn(config) {
      const range = make$c(config);
      return () => range.value();
  }
  function value(base) {
      const r = make$c(base);
      return r.value();
  }

  var range = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	Range: Range,
  	asFn: asFn,
  	from: from$4,
  	make: make$c,
  	value: value
  });

  function make$b(base) {
      if (!base)
          return [];
      if (typeof base === 'string') {
          base = base.split(/[|,]/g);
      }
      return base.map((t) => t.trim()).filter((v) => v && v.length);
  }
  // TACO & !CHICKEN  << A -AND- NOT B
  // FOOD
  // TACO & STEAK << A -AND- B
  // TACO | STEAK << A -OR- B
  // TACO, STEAK  << SPLITS GROUPS - groups are -OR-
  function makeMatch(rules) {
      if (!rules)
          return () => true;
      const fns = [];
      if (typeof rules === 'string') {
          const groups = rules.split(',').map((t) => t.trim());
          groups.forEach((info) => {
              const ors = info.split(/[|]/).map((t) => t.trim());
              ors.forEach((orPart) => {
                  const ands = orPart.split(/[&]/).map((t) => t.trim());
                  const andFns = ands.map((v) => {
                      if (v.startsWith('!')) {
                          const id = v.substring(1);
                          return (tags) => !tags.includes(id);
                      }
                      return (tags) => tags.includes(v);
                  });
                  fns.push((tags) => andFns.every((f) => f(tags)));
              });
          });
          return (tags) => fns.some((f) => f(tags));
      }
      else {
          if (typeof rules.tags === 'string') {
              rules.tags = rules.tags.split(/[:,|]/g).map((t) => t.trim());
          }
          if (typeof rules.forbidTags === 'string') {
              rules.forbidTags = rules.forbidTags
                  .split(/[:,|]/g)
                  .map((t) => t.trim());
          }
          const needTags = rules.tags;
          const forbidTags = rules.forbidTags || [];
          return (tags) => {
              return (needTags.every((t) => tags.includes(t)) &&
                  !forbidTags.some((t) => tags.includes(t)));
          };
      }
  }
  function match$1(tags, matchRules) {
      const matchFn = makeMatch(matchRules);
      return matchFn(tags);
  }

  var tags = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	make: make$b,
  	makeMatch: makeMatch,
  	match: match$1
  });

  ///////////////////////////////////
  // FLAG
  function fl$1(N) {
      return 2 ** N;
  }
  function toString(flagObj, value) {
      const inverse = Object.entries(flagObj).reduce((out, entry) => {
          const [key, value] = entry;
          if (typeof value === 'number') {
              if (out[value]) {
                  out[value] += ' | ' + key;
              }
              else {
                  out[value] = key;
              }
          }
          return out;
      }, []);
      const out = [];
      for (let index = 0; index < 32; ++index) {
          const fl = 1 << index;
          if (value & fl) {
              out.push(inverse[fl]);
          }
      }
      return out.join(' | ');
  }
  function from_base(obj, throws, ...args) {
      let result = 0;
      for (let index = 0; index < args.length; ++index) {
          let value = args[index];
          if (value === undefined)
              continue;
          if (typeof value == 'number') {
              result |= value;
              continue; // next
          }
          else if (typeof value === 'string') {
              value = value
                  .split(/[,|]/)
                  .map((t) => t.trim())
                  .map((u) => {
                  const n = Number.parseInt(u);
                  if (n >= 0)
                      return n;
                  return u;
              });
          }
          if (Array.isArray(value)) {
              value.forEach((v) => {
                  if (typeof v == 'string') {
                      v = v.trim();
                      const parts = v.split(/[,|]/);
                      if (parts.length > 1) {
                          result = from_base(obj, throws, result, parts);
                      }
                      else if (v.startsWith('!')) {
                          // @ts-ignore
                          const f = obj[v.substring(1)];
                          result &= ~f;
                      }
                      else {
                          const n = Number.parseInt(v);
                          if (n >= 0) {
                              result |= n;
                              return;
                          }
                          // @ts-ignore
                          const f = obj[v];
                          if (f) {
                              result |= f;
                          }
                          else {
                              if (throws) {
                                  throw new Error(`Unknown flag - ${v}`);
                              }
                          }
                      }
                  }
                  else if (v === 0) {
                      // to allow clearing flags when extending objects
                      result = 0;
                  }
                  else {
                      result |= v;
                  }
              });
          }
      }
      return result;
  }
  /**
   * Converts from a flag base to a flag.
   *
   * @param {Object} flagObj - The flag we are getting values from
   * @param {...FlagSource | FlagSource[]} args - The args to concatenate from flagObj
   * @returns {number}
   * @throws {Error} - If it encounters an unknown flag in args
   */
  function from$3(obj, ...args) {
      return from_base(obj, true, ...args);
  }
  /**
   * Converts from a flag base to a flag.  Will not throw if an unknown flag is encountered.
   *
   * @param {Object} flagObj - The flag we are getting values from
   * @param {...FlagSource | FlagSource[]} args - The args to concatenate from flagObj
   * @returns {number}
   */
  function from_safe(flagObj, ...args) {
      return from_base(flagObj, false, ...args);
  }
  function make$a(obj) {
      const out = {};
      if (typeof obj === 'string') {
          obj = obj.split(/[|,]/).map((v) => v.trim());
      }
      if (Array.isArray(obj)) {
          const arr = obj;
          const flags = {};
          let nextIndex = 0;
          let used = [];
          arr.forEach((v) => {
              if (v.includes('=')) {
                  const [name, value] = v.split('=').map((t) => t.trim());
                  const values = value.split('|').map((t) => t.trim());
                  // console.log(`flag: ${v} >> ${name} = ${value} >> ${values}`);
                  let i = 0;
                  for (let n = 0; n < values.length; ++n) {
                      const p = values[n];
                      if (flags[p]) {
                          i |= flags[p];
                      }
                      else {
                          const num = Number.parseInt(p);
                          if (num) {
                              i |= num;
                              for (let x = 0; x < 32; ++x) {
                                  if (i & (1 << x)) {
                                      used[x] = 1;
                                  }
                              }
                          }
                          else {
                              throw new Error(`Failed to parse flag = ${v}`);
                          }
                      }
                  }
                  flags[name] = i;
              }
              else {
                  while (used[nextIndex]) {
                      ++nextIndex;
                  }
                  if (nextIndex > 31) {
                      throw new Error('Flag uses too many bits! [Max=32]');
                  }
                  flags[v] = fl$1(nextIndex);
                  used[nextIndex] = 1;
              }
          });
          return flags;
      }
      Object.entries(obj).forEach(([key, value]) => {
          out[key] = from$3(out, value);
      });
      return out;
  }

  var flag = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	fl: fl$1,
  	from: from$3,
  	from_safe: from_safe,
  	make: make$a,
  	toString: toString
  });

  class AsyncQueue {
      constructor() {
          this._waiting = null;
          this._data = [];
      }
      get length() {
          return this._data.length;
      }
      clear() {
          this._data.length = 0;
      }
      get last() {
          return this._data[this._data.length - 1];
      }
      get first() {
          return this._data[0];
      }
      enqueue(obj) {
          if (this._waiting) {
              const fn = this._waiting;
              this._waiting = null;
              fn(obj);
          }
          else {
              this._data.push(obj);
          }
      }
      prepend(obj) {
          if (this._waiting) {
              this._waiting(obj);
              this._waiting = null;
          }
          else {
              this._data.unshift(obj);
          }
      }
      dequeue() {
          const t = this._data.shift();
          if (t) {
              return Promise.resolve(t);
          }
          if (this._waiting) {
              throw new Error('Too many requesters.');
          }
          const p = new Promise((resolve) => {
              this._waiting = resolve;
          });
          return p;
      }
  }

  var queue = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	AsyncQueue: AsyncQueue
  });

  // function toColorInt(r: number, g: number, b: number, base256: boolean) {
  //     if (base256) {
  //         r = Math.max(0, Math.min(255, Math.round(r * 2.550001)));
  //         g = Math.max(0, Math.min(255, Math.round(g * 2.550001)));
  //         b = Math.max(0, Math.min(255, Math.round(b * 2.550001)));
  //         return (r << 16) + (g << 8) + b;
  //     }
  //     r = Math.max(0, Math.min(15, Math.round((r / 100) * 15)));
  //     g = Math.max(0, Math.min(15, Math.round((g / 100) * 15)));
  //     b = Math.max(0, Math.min(15, Math.round((b / 100) * 15)));
  //     return (r << 8) + (g << 4) + b;
  // }
  const colors = {};
  // All colors are const!!!
  class Color {
      // values are 0-100 for normal RGBA
      constructor(r = -1, g = 0, b = 0, a = 100) {
          this._rand = null;
          this.dances = false;
          if (r < 0) {
              a = 0;
              r = 0;
          }
          this._data = [r, g, b, a];
      }
      rgb() {
          return [this.r, this.g, this.b];
      }
      rgba() {
          return [this.r, this.g, this.b, this.a];
      }
      get r() {
          return Math.round(this._data[0] * 2.550001);
      }
      get _r() {
          return this._data[0];
      }
      get _ra() {
          return Math.round((this._data[0] * this._data[3]) / 100);
      }
      get g() {
          return Math.round(this._data[1] * 2.550001);
      }
      get _g() {
          return this._data[1];
      }
      get _ga() {
          return Math.round((this._data[1] * this._data[3]) / 100);
      }
      get b() {
          return Math.round(this._data[2] * 2.550001);
      }
      get _b() {
          return this._data[2];
      }
      get _ba() {
          return Math.round((this._data[2] * this._data[3]) / 100);
      }
      get a() {
          return this._data[3];
      }
      get _a() {
          return this.a;
      }
      rand(all, r = 0, g = 0, b = 0) {
          this._rand = [all, r, g, b];
          this.dances = false;
          return this;
      }
      dance(all, r, g, b) {
          this.rand(all, r, g, b);
          this.dances = true;
          return this;
      }
      isNull() {
          return this._data[3] === 0;
      }
      alpha(v) {
          return new Color(this._data[0], this._data[1], this._data[2], clamp(v, 0, 100));
      }
      // luminosity (0-100)
      get l() {
          return Math.round(0.5 *
              (Math.min(this._r, this._g, this._b) +
                  Math.max(this._r, this._g, this._b)));
      }
      // saturation (0-100)
      get s() {
          if (this.l >= 100)
              return 0;
          return Math.round(((Math.max(this._r, this._g, this._b) -
              Math.min(this._r, this._g, this._b)) *
              (100 - Math.abs(this.l * 2 - 100))) /
              100);
      }
      // hue (0-360)
      get h() {
          let H = 0;
          let R = this.r;
          let G = this.g;
          let B = this.b;
          if (R >= G && G >= B) {
              H = 60 * ((G - B) / (R - B));
          }
          else if (G > R && R >= B) {
              H = 60 * (2 - (R - B) / (G - B));
          }
          else if (G >= B && B > R) {
              H = 60 * (2 + (B - R) / (G - R));
          }
          else if (B > G && G > R) {
              H = 60 * (4 - (G - R) / (B - R));
          }
          else if (B > R && R >= G) {
              H = 60 * (4 + (R - G) / (B - G));
          }
          else {
              H = 60 * (6 - (B - G) / (R - G));
          }
          return Math.round(H) || 0;
      }
      equals(other) {
          if (typeof other === 'string') {
              if (other.startsWith('#')) {
                  other = from$2(other);
                  return other.equals(this);
              }
              if (this.name)
                  return this.name === other;
          }
          else if (typeof other === 'number') {
              return this.toInt() === other;
          }
          const O = from$2(other);
          if (this.isNull())
              return O.isNull();
          if (O.isNull())
              return false;
          return this.toInt() === O.toInt();
      }
      toInt(useRand = true) {
          if (this.isNull())
              return 0x0000;
          let r = this._r;
          let g = this._g;
          let b = this._b;
          let a = this._a;
          if (useRand && (this._rand || this.dances)) {
              const rand = cosmetic.number(this._rand[0]);
              const redRand = cosmetic.number(this._rand[1]);
              const greenRand = cosmetic.number(this._rand[2]);
              const blueRand = cosmetic.number(this._rand[3]);
              r = Math.round(((r + rand + redRand) * a) / 100);
              g = Math.round(((g + rand + greenRand) * a) / 100);
              b = Math.round(((b + rand + blueRand) * a) / 100);
          }
          r = Math.max(0, Math.min(15, Math.round((r / 100) * 15)));
          g = Math.max(0, Math.min(15, Math.round((g / 100) * 15)));
          b = Math.max(0, Math.min(15, Math.round((b / 100) * 15)));
          a = Math.max(0, Math.min(15, Math.round((a / 100) * 15)));
          return (r << 12) + (g << 8) + (b << 4) + a;
      }
      toLight() {
          return [this._ra, this._ga, this._ba];
      }
      clamp() {
          if (this.isNull())
              return this;
          return make$9(this._data.map((v) => clamp(v, 0, 100)));
      }
      blend(other) {
          const O = from$2(other);
          if (O.isNull())
              return this;
          if (O.a === 100)
              return O;
          const pct = O.a / 100;
          const keepPct = 1 - pct;
          const newColor = make$9(Math.round(this._data[0] * keepPct + O._data[0] * pct), Math.round(this._data[1] * keepPct + O._data[1] * pct), Math.round(this._data[2] * keepPct + O._data[2] * pct), Math.round(O.a + this._data[3] * keepPct));
          if (this._rand) {
              newColor._rand = this._rand.map((v) => Math.round(v * keepPct));
              newColor.dances = this.dances;
          }
          if (O._rand) {
              if (!newColor._rand) {
                  newColor._rand = [0, 0, 0, 0];
              }
              for (let i = 0; i < 4; ++i) {
                  newColor._rand[i] += Math.round(O._rand[i] * pct);
              }
              newColor.dances = newColor.dances || O.dances;
          }
          return newColor;
      }
      mix(other, percent) {
          const O = from$2(other);
          if (O.isNull())
              return this;
          if (percent >= 100)
              return O;
          const pct = clamp(percent, 0, 100) / 100;
          const keepPct = 1 - pct;
          const newColor = make$9(Math.round(this._data[0] * keepPct + O._data[0] * pct), Math.round(this._data[1] * keepPct + O._data[1] * pct), Math.round(this._data[2] * keepPct + O._data[2] * pct), (this.isNull() ? 100 : this._data[3]) * keepPct + O._data[3] * pct);
          if (this._rand) {
              newColor._rand = this._rand.slice();
              newColor.dances = this.dances;
          }
          if (O._rand) {
              if (!newColor._rand) {
                  newColor._rand = O._rand.map((v) => Math.round(v * pct));
              }
              else {
                  for (let i = 0; i < 4; ++i) {
                      newColor._rand[i] = Math.round(newColor._rand[i] * keepPct + O._rand[i] * pct);
                  }
              }
              newColor.dances = newColor.dances || O.dances;
          }
          return newColor;
      }
      apply(other) {
          const O = from$2(other);
          if (O.isNull())
              return this;
          if (O.a >= 100)
              return O;
          if (O.a <= 0)
              return this;
          const pct = clamp(O.a, 0, 100) / 100;
          const keepPct = ((1 - pct) * this.a) / 100;
          const newColor = make$9(Math.round(this._data[0] * keepPct + O._data[0] * pct), Math.round(this._data[1] * keepPct + O._data[1] * pct), Math.round(this._data[2] * keepPct + O._data[2] * pct), Math.round(this._data[3] * keepPct + O._data[3] * pct));
          if (this._rand) {
              newColor._rand = this._rand.slice();
              newColor.dances = this.dances;
          }
          if (O._rand) {
              if (!newColor._rand) {
                  newColor._rand = O._rand.map((v) => Math.round(v * pct));
              }
              else {
                  for (let i = 0; i < 4; ++i) {
                      newColor._rand[i] = Math.round(newColor._rand[i] * keepPct + O._rand[i] * pct);
                  }
              }
              newColor.dances = newColor.dances || O.dances;
          }
          return newColor;
      }
      // Only adjusts r,g,b
      lighten(percent) {
          if (this.isNull())
              return this;
          if (percent <= 0)
              return this;
          const pct = clamp(percent, 0, 100) / 100;
          const keepPct = 1 - pct;
          return make$9(Math.round(this._data[0] * keepPct + 100 * pct), Math.round(this._data[1] * keepPct + 100 * pct), Math.round(this._data[2] * keepPct + 100 * pct), this._a);
      }
      // Only adjusts r,g,b
      darken(percent) {
          if (this.isNull())
              return this;
          const pct = clamp(percent, 0, 100) / 100;
          const keepPct = 1 - pct;
          return make$9(Math.round(this._data[0] * keepPct + 0 * pct), Math.round(this._data[1] * keepPct + 0 * pct), Math.round(this._data[2] * keepPct + 0 * pct), this._a);
      }
      bake(clearDancing = false) {
          if (this.isNull())
              return this;
          if (!this._rand)
              return this;
          if (this.dances && !clearDancing)
              return this;
          const d = this._rand;
          const rand = cosmetic.number(d[0]);
          const redRand = cosmetic.number(d[1]);
          const greenRand = cosmetic.number(d[2]);
          const blueRand = cosmetic.number(d[3]);
          return make$9(this._r + rand + redRand, this._g + rand + greenRand, this._b + rand + blueRand, this._a);
      }
      // Adds a color to this one
      add(other, percent = 100) {
          const O = from$2(other);
          if (O.isNull())
              return this;
          const alpha = (O.a / 100) * (percent / 100);
          return make$9(Math.round(this._data[0] + O._data[0] * alpha), Math.round(this._data[1] + O._data[1] * alpha), Math.round(this._data[2] + O._data[2] * alpha), clamp(Math.round(this._a + alpha * 100), 0, 100));
      }
      scale(percent) {
          if (this.isNull() || percent == 100)
              return this;
          const pct = Math.max(0, percent) / 100;
          return make$9(Math.round(this._data[0] * pct), Math.round(this._data[1] * pct), Math.round(this._data[2] * pct), this._a);
      }
      multiply(other) {
          if (this.isNull())
              return this;
          let data;
          if (Array.isArray(other)) {
              if (other.length < 3)
                  throw new Error('requires at least r,g,b values.');
              data = other;
          }
          else {
              if (other.isNull())
                  return this;
              data = other._data;
          }
          const pct = (data[3] || 100) / 100;
          return make$9(Math.round(this._ra * (data[0] / 100) * pct), Math.round(this._ga * (data[1] / 100) * pct), Math.round(this._ba * (data[2] / 100) * pct), 100);
      }
      // scales rgb down to a max of 100
      normalize() {
          if (this.isNull())
              return this;
          const max = Math.max(this._ra, this._ga, this._ba);
          if (max <= 100)
              return this;
          return make$9(Math.round((100 * this._ra) / max), Math.round((100 * this._ga) / max), Math.round((100 * this._ba) / max), 100);
      }
      inverse() {
          const other = new Color(100 - this.r, 100 - this.g, 100 - this.b, this.a);
          return other;
      }
      /**
       * Returns the css code for the current RGB values of the color.
       */
      css(useRand = true) {
          if (this.a !== 100) {
              const v = this.toInt(useRand);
              if (v <= 0)
                  return 'transparent';
              return '#' + v.toString(16).padStart(4, '0');
          }
          const v = this.toInt(useRand);
          if (v <= 0)
              return 'transparent';
          return '#' + v.toString(16).padStart(4, '0').substring(0, 3);
      }
      toString() {
          if (this.name)
              return this.name;
          if (this.isNull())
              return 'null color';
          return this.css();
      }
  }
  function fromArray(vals, base256 = false) {
      while (vals.length < 3)
          vals.push(0);
      if (base256) {
          for (let i = 0; i < 3; ++i) {
              vals[i] = Math.round(((vals[i] || 0) * 100) / 255);
          }
      }
      return new Color(...vals);
  }
  function fromCss(css) {
      if (!css.startsWith('#')) {
          throw new Error('Color CSS strings must be of form "#abc" or "#abcdef" - received: [' +
              css +
              ']');
      }
      const c = Number.parseInt(css.substring(1), 16);
      let r, g, b;
      let a = 100;
      if (css.length == 4) {
          r = Math.round(((c >> 8) / 15) * 100);
          g = Math.round((((c & 0xf0) >> 4) / 15) * 100);
          b = Math.round(((c & 0xf) / 15) * 100);
      }
      else if (css.length == 5) {
          r = Math.round(((c >> 12) / 15) * 100);
          g = Math.round((((c & 0xf00) >> 8) / 15) * 100);
          b = Math.round((((c & 0xf0) >> 4) / 15) * 100);
          a = Math.round(((c & 0xf) / 15) * 100);
      }
      else if (css.length === 7) {
          r = Math.round(((c >> 16) / 255) * 100);
          g = Math.round((((c & 0xff00) >> 8) / 255) * 100);
          b = Math.round(((c & 0xff) / 255) * 100);
      }
      else if (css.length === 9) {
          r = Math.round(((c >> 24) / 255) * 100);
          g = Math.round((((c & 0xff0000) >> 16) / 255) * 100);
          b = Math.round((((c & 0xff00) >> 8) / 255) * 100);
          a = Math.round(((c & 0xff) / 255) * 100);
      }
      return new Color(r, g, b, a);
  }
  function fromName(name) {
      const c = colors[name];
      if (!c) {
          throw new Error('Unknown color name: ' + name);
      }
      return c;
  }
  function fromNumber(val, base256 = false) {
      if (val < 0) {
          return new Color();
      }
      else if (base256 || val > 0xfff) {
          return new Color(Math.round((((val & 0xff0000) >> 16) * 100) / 255), Math.round((((val & 0xff00) >> 8) * 100) / 255), Math.round(((val & 0xff) * 100) / 255), 100);
      }
      else {
          return new Color(Math.round((((val & 0xf00) >> 8) * 100) / 15), Math.round((((val & 0xf0) >> 4) * 100) / 15), Math.round(((val & 0xf) * 100) / 15), 100);
      }
  }
  function make$9(...args) {
      let arg = args[0];
      let base256 = args[1];
      if (args.length == 0)
          return new Color();
      if (args.length > 2) {
          arg = args;
          base256 = false; // TODO - Change this!!!
      }
      if (arg === undefined || arg === null)
          return new Color();
      if (arg instanceof Color) {
          return arg;
      }
      if (typeof arg === 'string') {
          if (arg.startsWith('#')) {
              return fromCss(arg);
          }
          return fromName(arg);
      }
      else if (Array.isArray(arg)) {
          return fromArray(arg, base256);
      }
      else if (typeof arg === 'number') {
          return fromNumber(arg, base256);
      }
      throw new Error('Failed to make color - unknown argument: ' + JSON.stringify(arg));
  }
  function from$2(...args) {
      const arg = args[0];
      if (arg instanceof Color)
          return arg;
      if (arg === undefined)
          return NONE;
      if (arg === null)
          return NONE;
      if (typeof arg === 'string') {
          if (!arg.startsWith('#')) {
              return fromName(arg);
          }
      }
      else if (arg === -1) {
          return NONE;
      }
      return make$9(arg, args[1]);
  }
  // adjusts the luminosity of 2 colors to ensure there is enough separation between them
  function separate(a, b) {
      if (a.isNull() || b.isNull())
          return [a, b];
      const A = a.clamp();
      const B = b.clamp();
      // console.log('separate');
      // console.log('- a=%s, h=%d, s=%d, l=%d', A.toString(), A.h, A.s, A.l);
      // console.log('- b=%s, h=%d, s=%d, l=%d', B.toString(), B.h, B.s, B.l);
      let hDiff = Math.abs(A.h - B.h);
      if (hDiff > 180) {
          hDiff = 360 - hDiff;
      }
      if (hDiff > 45)
          return [A, B]; // colors are far enough apart in hue to be distinct
      const dist = 40;
      if (Math.abs(A.l - B.l) >= dist)
          return [A, B];
      // Get them sorted by saturation ( we will darken the more saturated color and lighten the other)
      const out = [A, B];
      const lo = A.s <= B.s ? 0 : 1;
      const hi = 1 - lo;
      // console.log('- lo=%s, hi=%s', lo.toString(), hi.toString());
      while (out[hi].l - out[lo].l < dist) {
          out[hi] = out[hi].mix(WHITE, 5);
          out[lo] = out[lo].mix(BLACK, 5);
      }
      // console.log('=>', a.toString(), b.toString());
      return out;
  }
  function relativeLuminance(a, b) {
      return Math.round((100 *
          ((a.r - b.r) * (a.r - b.r) * 0.2126 +
              (a.g - b.g) * (a.g - b.g) * 0.7152 +
              (a.b - b.b) * (a.b - b.b) * 0.0722)) /
          65025);
  }
  function distance(a, b) {
      return Math.round((100 *
          ((a.r - b.r) * (a.r - b.r) * 0.3333 +
              (a.g - b.g) * (a.g - b.g) * 0.3333 +
              (a.b - b.b) * (a.b - b.b) * 0.3333)) /
          65025);
  }
  // Draws the smooth gradient that appears on a button when you hover over or depress it.
  // Returns the percentage by which the current tile should be averaged toward a hilite color.
  function smoothScalar(rgb, maxRgb = 255) {
      return Math.floor(100 * Math.sin((Math.PI * rgb) / maxRgb));
  }
  function install$2$2(name, ...args) {
      let info = args;
      if (args.length == 1) {
          info = args[0];
      }
      const c = info instanceof Color ? info : make$9(info);
      // @ts-ignore
      c._const = true;
      colors[name] = c;
      c.name = name;
      return c;
  }
  function installSpread(name, ...args) {
      let c;
      if (args.length == 1) {
          c = install$2$2(name, args[0]);
      }
      else {
          c = install$2$2(name, ...args);
      }
      install$2$2('light_' + name, c.lighten(25));
      install$2$2('lighter_' + name, c.lighten(50));
      install$2$2('lightest_' + name, c.lighten(75));
      install$2$2('dark_' + name, c.darken(25));
      install$2$2('darker_' + name, c.darken(50));
      install$2$2('darkest_' + name, c.darken(75));
      return c;
  }
  const NONE = install$2$2('NONE', -1);
  const BLACK = install$2$2('black', 0x000);
  const WHITE = install$2$2('white', 0xfff);
  installSpread('teal', [30, 100, 100]);
  installSpread('brown', [60, 40, 0]);
  installSpread('tan', [80, 70, 55]); // 80, 67,		15);
  installSpread('pink', [100, 60, 66]);
  installSpread('gray', [50, 50, 50]);
  installSpread('yellow', [100, 100, 0]);
  installSpread('purple', [100, 0, 100]);
  installSpread('green', [0, 100, 0]);
  installSpread('orange', [100, 50, 0]);
  installSpread('blue', [0, 0, 100]);
  installSpread('red', [100, 0, 0]);
  installSpread('amber', [100, 75, 0]);
  installSpread('flame', [100, 25, 0]);
  installSpread('fuchsia', [100, 0, 100]);
  installSpread('magenta', [100, 0, 75]);
  installSpread('crimson', [100, 0, 25]);
  installSpread('lime', [75, 100, 0]);
  installSpread('chartreuse', [50, 100, 0]);
  installSpread('sepia', [50, 40, 25]);
  installSpread('violet', [50, 0, 100]);
  installSpread('han', [25, 0, 100]);
  installSpread('cyan', [0, 100, 100]);
  installSpread('turquoise', [0, 100, 75]);
  installSpread('sea', [0, 100, 50]);
  installSpread('sky', [0, 75, 100]);
  installSpread('azure', [0, 50, 100]);
  installSpread('silver', [75, 75, 75]);
  installSpread('gold', [100, 85, 0]);

  var index$9 = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	BLACK: BLACK,
  	Color: Color,
  	NONE: NONE,
  	WHITE: WHITE,
  	colors: colors,
  	distance: distance,
  	from: from$2,
  	fromArray: fromArray,
  	fromCss: fromCss,
  	fromName: fromName,
  	fromNumber: fromNumber,
  	install: install$2$2,
  	installSpread: installSpread,
  	make: make$9,
  	relativeLuminance: relativeLuminance,
  	separate: separate,
  	smoothScalar: smoothScalar
  });

  class Mixer {
      constructor(base = {}) {
          this.ch = firstDefined(base.ch, null);
          this.fg = make$9(base.fg);
          this.bg = make$9(base.bg);
      }
      _changed() {
          return this;
      }
      copy(other) {
          this.ch = other.ch || null;
          this.fg = from$2(other.fg);
          this.bg = from$2(other.bg);
          return this._changed();
      }
      fill(ch, fg, bg) {
          if (ch !== null)
              this.ch = ch;
          if (fg !== null)
              this.fg = from$2(fg);
          if (bg !== null)
              this.bg = from$2(bg);
          return this._changed();
      }
      clone() {
          const other = new Mixer();
          other.copy(this);
          return other;
      }
      equals(other) {
          return (this.ch == other.ch &&
              this.fg.equals(other.fg) &&
              this.bg.equals(other.bg));
      }
      get dances() {
          return this.fg.dances || this.bg.dances;
      }
      nullify() {
          this.ch = null;
          this.fg = NONE;
          this.bg = NONE;
          return this._changed();
      }
      blackOut() {
          this.ch = null;
          this.fg = BLACK;
          this.bg = BLACK;
          return this._changed();
      }
      draw(ch = null, fg = null, bg = null) {
          if (ch !== null) {
              this.ch = ch;
          }
          if (fg !== null) {
              fg = from$2(fg);
              this.fg = this.fg.blend(fg);
          }
          if (bg !== null) {
              bg = from$2(bg);
              this.bg = this.bg.blend(bg);
          }
          return this._changed();
      }
      drawSprite(src) {
          if (src === this)
              return this;
          // @ts-ignore
          // if (opacity === undefined) opacity = src.opacity;
          // if (opacity === undefined) opacity = 100;
          // if (opacity <= 0) return;
          if (src.fg && src.fg !== -1) {
              const fg = from$2(src.fg);
              if (src.ch && fg.a) {
                  this.ch = src.ch;
              }
              this.fg = this.fg.apply(fg);
          }
          if (src.bg && src.bg !== -1) {
              this.bg = this.bg.apply(src.bg);
          }
          return this._changed();
      }
      invert() {
          this.bg = this.bg.inverse();
          this.fg = this.fg.inverse();
          return this._changed();
      }
      swap() {
          [this.bg, this.fg] = [this.fg, this.bg];
          return this._changed();
      }
      multiply(color, fg = true, bg = true) {
          color = from$2(color);
          if (fg) {
              this.fg = this.fg.multiply(color);
          }
          if (bg) {
              this.bg = this.bg.multiply(color);
          }
          return this._changed();
      }
      scale(multiplier, fg = true, bg = true) {
          if (fg)
              this.fg = this.fg.scale(multiplier);
          if (bg)
              this.bg = this.bg.scale(multiplier);
          return this._changed();
      }
      mix(color, fg = 50, bg = fg) {
          color = from$2(color);
          if (fg > 0) {
              this.fg = this.fg.mix(color, fg);
          }
          if (bg > 0) {
              this.bg = this.bg.mix(color, bg);
          }
          return this._changed();
      }
      add(color, fg = 100, bg = fg) {
          color = from$2(color);
          if (fg > 0) {
              this.fg = this.fg.add(color, fg);
          }
          if (bg > 0) {
              this.bg = this.bg.add(color, bg);
          }
          return this._changed();
      }
      separate() {
          [this.fg, this.bg] = separate(this.fg, this.bg);
          return this._changed();
      }
      bake(clearDancing = false) {
          this.fg = this.fg.bake(clearDancing);
          this.bg = this.bg.bake(clearDancing);
          return this._changed();
      }
      toString() {
          // prettier-ignore
          return `{ ch: ${this.ch}, fg: ${this.fg.toString()}, bg: ${this.bg.toString()} }`;
      }
  }
  function makeMixer(base) {
      return new Mixer(base);
  }

  var options = {
      colorStart: '#{', // alt-z
      colorEnd: '}', // alt-j
      field: '{{', // alt-6
      fieldEnd: '}}',
      defaultFg: null,
      defaultBg: null,
  };
  var helpers = {
      default: (name, view, args) => {
          if (args.length === 0)
              return name;
          if (args.length === 1) {
              return '' + getValue(view, args[0]);
          }
          return args.map((a) => getValue(view, a)).join(' ');
      },
      debug: (name, _view, args) => {
          if (args.length) {
              return `{{${name} ${args.join(' ')}}}`;
          }
          return `{{${name}}}`;
      },
  };
  function addHelper(name, fn) {
      helpers[name] = fn;
  }

  function length(text) {
      if (!text || text.length == 0)
          return 0;
      let len = 0;
      let inside = false;
      let inline = false;
      for (let index = 0; index < text.length; ++index) {
          const ch = text.charAt(index);
          if (inline) {
              if (ch === '}') {
                  inline = false;
                  inside = false;
              }
              else {
                  len += 1;
              }
          }
          else if (inside) {
              if (ch === ' ') {
                  inline = true;
              }
              else if (ch === '}') {
                  inside = false;
              }
          }
          else if (ch === '#') {
              if (text.charAt(index + 1) === '{') {
                  inside = true;
                  index += 1;
              }
              else {
                  len += 1;
              }
          }
          else if (ch === '\\') {
              if (text.charAt(index + 1) === '#') {
                  index += 1; // skip next char
              }
              len += 1;
          }
          else {
              len += 1;
          }
      }
      return len;
  }
  /**
   * Advances the number of chars given by passing any color information in the text
   * @param {string} text - The text to scan
   * @param {number} start - The index to start from
   * @param {number} count - The number of characters to skip
   * @returns - The new index in the string
   */
  function advanceChars(text, start, count) {
      let len = 0;
      let inside = false;
      let inline = false;
      let index = start || 0;
      while (len < count) {
          const ch = text.charAt(index);
          if (inline) {
              if (ch === '}') {
                  inline = false;
                  inside = false;
              }
              else {
                  len += 1;
              }
          }
          else if (inside) {
              if (ch === ' ') {
                  inline = true;
              }
              else if (ch === '}') {
                  inside = false;
              }
          }
          else if (ch === '#') {
              if (text.charAt(index + 1) === '{') {
                  inside = true;
                  index += 1;
              }
              else {
                  len += 1;
              }
          }
          else if (ch === '\\') {
              if (text.charAt(index + 1) === '#') {
                  index += 1; // skip next char
              }
              len += 1;
          }
          else {
              len += 1;
          }
          ++index;
      }
      return index;
  }
  function findChar(text, matchFn, start = 0) {
      let inside = false;
      let inline = false;
      let index = start;
      while (index < text.length) {
          let ch = text.charAt(index);
          if (inline) {
              if (ch === '}') {
                  inline = false;
                  inside = false;
              }
              else {
                  if (matchFn(ch, index))
                      return index;
              }
          }
          else if (inside) {
              if (ch === ' ') {
                  inline = true;
              }
              else if (ch === '}') {
                  inside = false;
              }
          }
          else if (ch === '#') {
              if (text.charAt(index + 1) === '{') {
                  inside = true;
                  index += 1;
              }
              else {
                  if (matchFn(ch, index))
                      return index;
              }
          }
          else if (ch === '\\') {
              if (text.charAt(index + 1) === '#') {
                  index += 1; // skip next char
                  ch = text.charAt(index);
              }
              if (matchFn(ch, index))
                  return index;
          }
          else {
              if (matchFn(ch, index))
                  return index;
          }
          ++index;
      }
      return -1;
  }
  function firstChar(text) {
      const index = findChar(text, TRUE);
      if (index < 0)
          return '';
      return text.charAt(index);
  }
  function startsWith(text, match) {
      if (typeof match === 'string') {
          if (match.length === 1) {
              return firstChar(text) === match;
          }
      }
      const noColors = removeColors(text);
      if (typeof match === 'string') {
          return noColors.startsWith(match);
      }
      return match.exec(noColors) !== null;
  }
  function padStart(text, width, pad = ' ') {
      const len = length(text);
      if (len >= width)
          return text;
      const colorLen = text.length - len;
      return text.padStart(width + colorLen, pad);
  }
  function padEnd(text, width, pad = ' ') {
      const len = length(text);
      if (len >= width)
          return text;
      const colorLen = text.length - len;
      return text.padEnd(width + colorLen, pad);
  }
  function center(text, width, pad = ' ') {
      const rawLen = text.length;
      const len = length(text);
      const padLen = width - len;
      if (padLen <= 0)
          return text;
      const left = Math.floor(padLen / 2);
      return text.padStart(rawLen + left, pad).padEnd(rawLen + padLen, pad);
  }
  function truncate(text, width) {
      let len = 0;
      let inside = false;
      let inline = false;
      let index = 0;
      let colorCount = 0;
      while (len < width) {
          const ch = text.charAt(index);
          if (inline) {
              if (ch === '}') {
                  inline = false;
                  inside = false;
                  colorCount -= 1;
              }
              else {
                  len += 1;
              }
          }
          else if (inside) {
              if (ch === ' ') {
                  inline = true;
              }
              else if (ch === '}') {
                  inside = false;
              }
          }
          else if (ch === '#') {
              if (text.charAt(index + 1) === '{') {
                  if (text.charAt(index + 2) === '}') {
                      index += 2;
                      colorCount = 0;
                  }
                  else {
                      inside = true;
                      index += 1;
                      colorCount += 1;
                  }
              }
              else {
                  len += 1;
              }
          }
          else if (ch === '\\') {
              if (text.charAt(index + 1) === '#') {
                  index += 1; // skip next char
              }
              len += 1;
          }
          else {
              len += 1;
          }
          ++index;
      }
      if (inline) {
          return text.substring(0, index) + '}' + (colorCount > 1 ? '#{}' : '');
      }
      return text.substring(0, index) + (colorCount ? '#{}' : '');
  }
  /**
   * Capitalizes the first letter in the given text.
   *
   * @param {string} text - The text to capitalize
   * @returns {string} - The text with the first word capitalized
   */
  function capitalize(text) {
      // TODO - better test for first letter
      const i = findChar(text, (ch) => ch !== ' ');
      if (i < 0)
          return text;
      const ch = text.charAt(i);
      return text.substring(0, i) + ch.toUpperCase() + text.substring(i + 1);
  }
  /**
   * Capitalizes the first letter all words of the given text.
   *
   * @param {string} text - The text to capitalize
   * @returns {string} - The text with the words capitalized
   */
  function title_case(text) {
      // TODO - better test for first letter
      let i = findChar(text, (ch) => ch !== ' ');
      while (i >= 0) {
          const ch = text.charAt(i);
          text = text.substring(0, i) + ch.toUpperCase() + text.substring(i + 1);
          let next_space = findChar(text, (ch) => ch === ' ', i + 1);
          i = findChar(text, (ch) => ch !== ' ', next_space);
      }
      return text;
  }
  function removeColors(text) {
      let out = '';
      let inside = false;
      let inline = false;
      let index = 0;
      while (index < text.length) {
          let ch = text.charAt(index);
          if (inline) {
              if (ch === '}') {
                  inline = false;
                  inside = false;
              }
              else {
                  out += ch;
              }
          }
          else if (inside) {
              if (ch === ' ') {
                  inline = true;
              }
              else if (ch === '}') {
                  inside = false;
              }
          }
          else if (ch === '#') {
              if (text.charAt(index + 1) === '{') {
                  inside = true;
                  index += 1;
              }
              else {
                  out += ch;
              }
          }
          else if (ch === '\\') {
              if (text.charAt(index + 1) === '#') {
                  out += ch;
                  index += 1; // skip next char
                  ch = text.charAt(index);
              }
              out += ch;
          }
          else {
              out += ch;
          }
          ++index;
      }
      return out;
  }
  function spliceRaw(msg, begin, deleteLength, add = '') {
      const maxLen = msg.length;
      if (begin >= maxLen)
          return msg;
      const preText = msg.substring(0, begin);
      if (begin + deleteLength >= maxLen) {
          return preText;
      }
      const postText = msg.substring(begin + deleteLength);
      return preText + add + postText;
  }
  // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  function hash(str) {
      let hash = 0;
      const len = str.length;
      for (let i = 0; i < len; i++) {
          hash = (hash << 5) - hash + str.charCodeAt(i);
          hash |= 0; // Convert to 32bit integer
      }
      return hash;
  }
  function splitArgs(text) {
      const output = [];
      let index = 0;
      let start = 0;
      let insideQuote = false;
      let insideSingle = false;
      while (index < text.length) {
          const ch = text.charAt(index);
          if (insideQuote) {
              if (ch === '"') {
                  output.push(text.substring(start, index));
                  start = index + 1;
                  insideSingle = false;
                  insideQuote = false;
              }
          }
          else if (insideSingle) {
              if (ch === "'") {
                  output.push(text.substring(start, index));
                  start = index + 1;
                  insideSingle = false;
                  insideQuote = false;
              }
          }
          else if (ch === ' ') {
              if (start !== index) {
                  output.push(text.substring(start, index));
              }
              start = index + 1;
          }
          else if (ch === '"') {
              start = index + 1;
              insideQuote = true;
          }
          else if (ch === "'") {
              start = index + 1;
              insideSingle = true;
          }
          ++index;
      }
      if (start === 0) {
          output.push(text);
      }
      else if (start < index) {
          output.push(text.substring(start));
      }
      return output;
  }

  function fieldSplit(template, _opts = {}) {
      // const FS = opts.field || Config.options.field;
      // const FE = opts.fieldEnd || Config.options.fieldEnd;
      const output = [];
      let inside = false;
      let start = 0;
      let hasEscape = false;
      let index = 0;
      while (index < template.length) {
          const ch = template.charAt(index);
          if (inside) {
              if (ch === '}') {
                  if (template.charAt(index + 1) !== '}') {
                      throw new Error('Templates cannot contain }');
                  }
                  const snipet = template.slice(start, index);
                  output.push(snipet);
                  ++index;
                  inside = false;
                  start = index + 1;
              }
          }
          else {
              if (ch === '\\') {
                  if (template.charAt(index + 1) === '{') {
                      ++index;
                      hasEscape = true;
                  }
              }
              else if (ch === '{') {
                  if (template.charAt(index + 1) === '{') {
                      while (template.charAt(index + 1) === '{') {
                          ++index;
                      }
                      inside = true;
                      let snipet = template.slice(start, index - 1);
                      if (hasEscape) {
                          snipet = snipet.replace(/\\\{/g, '{');
                      }
                      output.push(snipet);
                      start = index + 1;
                      hasEscape = false;
                  }
              }
          }
          ++index;
      }
      if (start !== template.length) {
          let snipet = template.slice(start);
          if (hasEscape) {
              snipet = snipet.replace(/\\\{/g, '{');
          }
          output.push(snipet);
      }
      return output;
  }
  function compile$1(template, opts = {}) {
      const F = opts.field || options.field;
      const parts = fieldSplit(template);
      const sections = parts.map((part, i) => {
          if (i % 2 == 0)
              return textSegment(part);
          if (part.length == 0)
              return textSegment(F);
          return makeVariable(part, opts);
      });
      return function (view = {}) {
          if (typeof view === 'string') {
              view = { value: view };
          }
          return sections.map((f) => f(view)).join('');
      };
  }
  function apply(template, view = {}) {
      const fn = compile$1(template);
      const result = fn(view);
      return result;
  }
  function textSegment(value) {
      return () => value;
  }
  // export function baseValue(name: string, debug = false): FieldFn {
  //     return function (view: Config.View) {
  //         let h = Config.helpers[name];
  //         if (h) {
  //             return h(name, view);
  //         }
  //         const v = view[name];
  //         if (v !== undefined) return v;
  //         h = debug ? Config.helpers.debug : Config.helpers.default;
  //         return h(name, view);
  //     };
  // }
  // export function fieldValue(
  //     name: string,
  //     source: FieldFn,
  //     debug = false
  // ): FieldFn {
  //     const helper = debug ? Config.helpers.debug : Config.helpers.default;
  //     return function (view: Config.View) {
  //         const obj = source(view);
  //         if (!obj) return helper(name, view, obj);
  //         const value = obj[name];
  //         if (value === undefined) return helper(name, view, obj);
  //         return value;
  //     };
  // }
  // export function helperValue(
  //     name: string,
  //     source: FieldFn,
  //     debug = false
  // ): FieldFn {
  //     const helper =
  //         Config.helpers[name] ||
  //         (debug ? Config.helpers.debug : Config.helpers.default);
  //     return function (view: Config.View) {
  //         const base = source(view);
  //         return helper(name, view, base);
  //     };
  // }
  function stringFormat(format, source) {
      const data = /%(-?\d*)s/.exec(format) || [];
      const length = Number.parseInt(data[1] || '0');
      return function (view) {
          let text = '' + source(view);
          if (length < 0) {
              text = text.padEnd(-length);
          }
          else if (length) {
              text = text.padStart(length);
          }
          return text;
      };
  }
  function intFormat(format, source) {
      const data = /%([\+-]*)(\d*)d/.exec(format) || ['', '', '0'];
      let length = Number.parseInt(data[2] || '0');
      const wantSign = data[1].includes('+');
      const left = data[1].includes('-');
      return function (view) {
          const value = Number.parseInt(source(view) || '0');
          let text = '' + value;
          if (value > 0 && wantSign) {
              text = '+' + text;
          }
          if (length && left) {
              return text.padEnd(length);
          }
          else if (length) {
              return text.padStart(length);
          }
          return text;
      };
  }
  function floatFormat(format, source) {
      const data = /%([\+-]*)(\d*)(\.(\d+))?f/.exec(format) || ['', '', '0'];
      let length = Number.parseInt(data[2] || '0');
      const wantSign = data[1].includes('+');
      const left = data[1].includes('-');
      const fixed = Number.parseInt(data[4]) || 0;
      return function (view) {
          const value = Number.parseFloat(source(view) || '0');
          let text;
          if (fixed) {
              text = value.toFixed(fixed);
          }
          else {
              text = '' + value;
          }
          if (value > 0 && wantSign) {
              text = '+' + text;
          }
          if (length && left) {
              return text.padEnd(length);
          }
          else if (length) {
              return text.padStart(length);
          }
          return text;
      };
  }
  function makeVariable(pattern, _opts = {}) {
      let format = '';
      const formatStart = pattern.indexOf('%');
      if (formatStart > 0) {
          format = pattern.substring(formatStart);
          pattern = pattern.substring(0, formatStart);
      }
      const parts = splitArgs(pattern);
      let name = 'default';
      if (parts[0] in helpers) {
          name = parts[0];
          parts.shift();
      }
      const helper = helpers[name];
      function base(view) {
          return helper.call(this, name, view, parts);
      }
      const valueFn = base.bind({ get: getValue });
      if (format.length) {
          if (format.endsWith('d')) {
              return intFormat(format, valueFn);
          }
          else if (format.endsWith('f')) {
              return floatFormat(format, valueFn);
          }
          else {
              return stringFormat(format, valueFn);
          }
      }
      return valueFn || (() => '!!!');
      // const data =
      //     /((\w+) )?(\w+)(\.(\w+))?(%[\+\.\-\d]*[dsf])?/.exec(pattern) || [];
      // const helper = data[2];
      // const base = data[3];
      // const field = data[5];
      // const format = data[6];
      // let result = baseValue(base, opts.debug);
      // if (field && field.length) {
      //     result = fieldValue(field, result, opts.debug);
      // }
      // if (helper && helper.length) {
      //     result = helperValue(helper, result, opts.debug);
      // }
      // if (format && format.length) {
      //     if (format.endsWith('s')) {
      //         result = stringFormat(format, result);
      //     } else if (format.endsWith('d')) {
      //         result = intFormat(format, result);
      //     } else {
      //         result = floatFormat(format, result);
      //     }
      // }
      // return result;
  }

  function eachChar(text, fn, opts = {}) {
      if (text === null || text === undefined)
          return;
      if (!fn)
          return;
      text = '' + text; // force string
      if (!text.length)
          return;
      const colorFn = opts.eachColor || NOOP;
      const fg = opts.fg || options.defaultFg;
      const bg = opts.bg || options.defaultBg;
      const ctx = {
          fg,
          bg,
      };
      colorFn(ctx);
      const priorCtx = Object.assign({}, ctx);
      let len = 0;
      let inside = false;
      let inline = false;
      let index = 0;
      let colorText = '';
      while (index < text.length) {
          const ch = text.charAt(index);
          if (inline) {
              if (ch === '}') {
                  inline = false;
                  inside = false;
                  Object.assign(ctx, priorCtx);
                  colorFn(ctx);
              }
              else {
                  fn(ch, ctx.fg, ctx.bg, len, index);
                  ++len;
              }
          }
          else if (inside) {
              if (ch === ' ') {
                  inline = true;
                  Object.assign(priorCtx, ctx);
                  const colors = colorText.split(':');
                  if (colors[0].length) {
                      ctx.fg = colors[0];
                  }
                  if (colors[1]) {
                      ctx.bg = colors[1];
                  }
                  colorFn(ctx);
                  colorText = '';
              }
              else if (ch === '}') {
                  inside = false;
                  const colors = colorText.split(':');
                  if (colors[0].length) {
                      ctx.fg = colors[0];
                  }
                  if (colors[1]) {
                      ctx.bg = colors[1];
                  }
                  colorFn(ctx);
                  colorText = '';
              }
              else {
                  colorText += ch;
              }
          }
          else if (ch === '#') {
              if (text.charAt(index + 1) === '{') {
                  if (text.charAt(index + 2) === '}') {
                      index += 2;
                      ctx.fg = fg;
                      ctx.bg = bg;
                      colorFn(ctx);
                  }
                  else {
                      inside = true;
                      index += 1;
                  }
              }
              else {
                  fn(ch, ctx.fg, ctx.bg, len, index);
                  ++len;
              }
          }
          else if (ch === '\\') {
              index += 1; // skip next char
              const ch = text.charAt(index);
              fn(ch, ctx.fg, ctx.bg, len, index);
              ++len;
          }
          else {
              fn(ch, ctx.fg, ctx.bg, len, index);
              ++len;
          }
          ++index;
      }
      if (inline) {
          console.warn('Ended text without ending inline color!');
      }
  }
  function eachWord(text, fn, opts = {}) {
      let currentWord = '';
      let fg = '';
      let bg = '';
      let prefix = '';
      eachChar(text, (ch, fg0, bg0) => {
          if (fg0 !== fg || bg0 !== bg) {
              if (currentWord.length) {
                  fn(currentWord, fg, bg, prefix);
                  currentWord = '';
                  prefix = '';
              }
              fg = fg0;
              bg = bg0;
          }
          if (ch === ' ') {
              if (currentWord.length) {
                  fn(currentWord, fg, bg, prefix);
                  currentWord = '';
                  prefix = '';
              }
              prefix += ' ';
          }
          else if (ch === '\n') {
              if (currentWord.length) {
                  fn(currentWord, fg, bg, prefix);
                  currentWord = '';
                  prefix = '';
              }
              fn('\n', fg, bg, prefix);
              prefix = '';
          }
          else if (ch === '-') {
              currentWord += ch;
              if (currentWord.length > 3) {
                  fn(currentWord, fg, bg, prefix);
                  currentWord = '';
                  prefix = '';
              }
          }
          else {
              currentWord += ch;
          }
      }, opts);
      if (currentWord) {
          fn(currentWord, fg, bg, prefix);
      }
  }

  // import { Color } from '../color';
  // import * as Utils from './utils';
  function wordWrap(text, lineWidth, opts = {}) {
      // let inside = false;
      // let inline = false;
      if (lineWidth < 5)
          return text;
      // hyphenate is the wordlen needed to hyphenate
      // smaller words are not hyphenated
      let hyphenLen = lineWidth;
      if (opts.hyphenate) {
          if (opts.hyphenate === true) {
              opts.hyphenate = Math.floor(lineWidth / 2);
          }
          hyphenLen = clamp(opts.hyphenate, 6, lineWidth + 1);
      }
      opts.indent = opts.indent || 0;
      const indent = ' '.repeat(opts.indent);
      let output = '';
      let lastFg = null;
      let lastBg = null;
      let lineLeft = lineWidth;
      lineWidth -= opts.indent;
      eachWord(text, (word, fg, bg, prefix) => {
          let totalLen = prefix.length + word.length;
          // console.log('word', word, lineLen, newLen);
          if (totalLen > lineLeft && word.length > hyphenLen) {
              const parts = splitWord(word, lineWidth, lineLeft - prefix.length);
              if (parts[0].length === 0) {
                  // line doesn't have enough space left, end it
                  output += '\n';
                  if (fg || bg) {
                      output += `#{${fg ? fg : ''}${bg ? ':' + bg : ''}}`;
                  }
                  lineLeft = lineWidth;
                  parts.shift();
              }
              else {
                  output += prefix;
                  lineLeft -= prefix.length;
              }
              while (parts.length > 1) {
                  output += parts.shift() + '-\n';
                  if (fg || bg) {
                      output += `#{${fg ? fg : ''}${bg ? ':' + bg : ''}}`;
                  }
                  output += indent;
              }
              output += parts[0];
              lineLeft = lineWidth - parts[0].length - indent.length;
              return;
          }
          if (word === '\n' || totalLen > lineLeft) {
              output += '\n';
              // if (fg || bg || lastFg !== fg || lastBg !== bg) {
              //     output += `#{${fg ? fg : ''}${bg ? ':' + bg : ''}}`;
              // }
              // lastFg = fg;
              // lastBg = bg;
              if (fg || bg) {
                  lastFg = 'INVALID';
                  lastBg = 'INVALID';
              }
              lineLeft = lineWidth;
              output += indent;
              lineLeft -= indent.length;
              if (word === '\n')
                  return;
              // lineLeft -= word.length;
              prefix = '';
          }
          if (prefix.length) {
              output += prefix;
              lineLeft -= prefix.length;
          }
          if (fg !== lastFg || bg !== lastBg) {
              lastFg = fg;
              lastBg = bg;
              output += `#{${fg ? fg : ''}${bg ? ':' + bg : ''}}`;
          }
          lineLeft -= word.length;
          output += word;
      });
      return output;
  }
  function splitWord(word, lineWidth, firstWidth) {
      let index = 0;
      let output = [];
      let spaceLeftOnLine = firstWidth || lineWidth;
      while (index < word.length) {
          const wordWidth = word.length - index;
          // do not need to hyphenate
          if (spaceLeftOnLine >= wordWidth) {
              output.push(word.substring(index));
              return output;
          }
          // not much room left
          if (spaceLeftOnLine < 4) {
              spaceLeftOnLine = lineWidth;
              output.push(''); // need to fill first line
          }
          // if will fit on this line and next...
          if (wordWidth < spaceLeftOnLine + lineWidth) {
              output.push(word.substring(index, index + spaceLeftOnLine - 1));
              output.push(word.substring(index + spaceLeftOnLine - 1));
              return output;
          }
          // hyphenate next part
          const hyphenAt = Math.min(spaceLeftOnLine - 1, Math.floor(wordWidth / 2));
          const hyphen = word.substring(index, index + hyphenAt);
          output.push(hyphen);
          index += hyphenAt;
          spaceLeftOnLine = lineWidth;
      }
      return output;
  }
  // // Returns the number of lines, including the newlines already in the text.
  // // Puts the output in "to" only if we receive a "to" -- can make it null and just get a line count.
  // export function splitIntoLines(source: string, width = 200, indent = 0) {
  //     const output: string[] = [];
  //     if (!source) return output;
  //     if (width <= 0) width = 200;
  //     let text = wordWrap(source, width, indent);
  //     let start = 0;
  //     let fg0: Color | number | null = null;
  //     let bg0: Color | number | null = null;
  //     eachChar(text, (ch, fg, bg, _, n) => {
  //         if (ch == '\n') {
  //             let color =
  //                 fg0 || bg0 ? `#{${fg0 ? fg0 : ''}${bg0 ? ':' + bg0 : ''}}` : '';
  //             output.push(color + text.substring(start, n));
  //             start = n + 1;
  //             fg0 = fg;
  //             bg0 = bg;
  //         }
  //     });
  //     let color = fg0 || bg0 ? `#{${fg0 ? fg0 : ''}${bg0 ? ':' + bg0 : ''}}` : '';
  //     if (start < text.length) {
  //         output.push(color + text.substring(start));
  //     }
  //     return output;
  // }
  function splitIntoLines(text, width = 200, opts = {}) {
      if (typeof text !== 'string')
          return [];
      text = text.trimEnd();
      // if (text.endsWith('\n')) {
      //     text = text.trimEnd();
      // }
      const updated = wordWrap(text, width, opts);
      return updated.split('\n');
  }

  //
  // Formats:
  // moose
  // taco~
  // tomatoe[s]
  // |goose|geese|
  // go[es]
  const RE_BRACKETS = /\[(\w+)(?:\|(\w+))?\]/;
  const RE_ALTS = /\|(\w+)\|(\w+)\|/;
  // VERBS
  function toSingularVerb(text) {
      if (text.includes('~')) {
          return text.replace('~', 's');
      }
      let match = RE_BRACKETS.exec(text);
      if (match) {
          return text.replace(match[0], match[1]);
      }
      match = RE_ALTS.exec(text);
      if (match) {
          return match[1];
      }
      return text;
  }
  function toPluralVerb(text) {
      if (text.includes('~')) {
          return text.replace('~', '');
      }
      let match = RE_BRACKETS.exec(text);
      if (match) {
          return text.replace(match[0], match[2] || '');
      }
      match = RE_ALTS.exec(text);
      if (match) {
          return match[2];
      }
      return text;
  }
  // NOUNS
  function toSingularNoun(text) {
      text = text.replace('& ', '');
      if (text.includes('~')) {
          return text.replace('~', '');
      }
      let match = RE_BRACKETS.exec(text);
      if (match) {
          return text.replace(match[0], match[2] || '');
      }
      match = RE_ALTS.exec(text);
      if (match) {
          return match[1];
      }
      return text;
  }
  function toPluralNoun(text) {
      text = text.replace('& ', '');
      if (text.includes('~')) {
          return text.replace('~', 's');
      }
      let match = RE_BRACKETS.exec(text);
      if (match) {
          return text.replace(match[0], match[1]);
      }
      match = RE_ALTS.exec(text);
      if (match) {
          return match[2];
      }
      return text;
  }
  function toQuantity(text, count) {
      if (count == 1) {
          text = toSingularNoun(text);
      }
      else {
          text = toPluralNoun(text);
      }
      const countText = count > 1 ? '' + count : 'a';
      if (text.includes('&')) {
          return text.replace('&', countText);
      }
      return countText + ' ' + text;
  }

  function configure(opts = {}) {
      if (opts.fg !== undefined) {
          options.defaultFg = opts.fg;
      }
      if (opts.bg !== undefined) {
          options.defaultBg = opts.bg;
      }
      if (opts.colorStart) {
          options.colorStart = opts.colorStart;
      }
      if (opts.colorEnd) {
          options.colorEnd = opts.colorEnd;
      }
      if (opts.field) {
          options.field = opts.field;
      }
  }

  var index$8 = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	addHelper: addHelper,
  	advanceChars: advanceChars,
  	apply: apply,
  	capitalize: capitalize,
  	center: center,
  	compile: compile$1,
  	configure: configure,
  	eachChar: eachChar,
  	findChar: findChar,
  	firstChar: firstChar,
  	hash: hash,
  	length: length,
  	options: options,
  	padEnd: padEnd,
  	padStart: padStart,
  	removeColors: removeColors,
  	spliceRaw: spliceRaw,
  	splitArgs: splitArgs,
  	splitIntoLines: splitIntoLines,
  	startsWith: startsWith,
  	title_case: title_case,
  	toPluralNoun: toPluralNoun,
  	toPluralVerb: toPluralVerb,
  	toQuantity: toQuantity,
  	toSingularNoun: toSingularNoun,
  	toSingularVerb: toSingularVerb,
  	truncate: truncate,
  	wordWrap: wordWrap
  });

  class BufferBase {
      constructor(width, height) {
          this._clip = null;
          if (typeof width !== 'number') {
              height = width.height;
              width = width.width;
          }
          this._width = width;
          this._height = height;
      }
      get width() {
          return this._width;
      }
      get height() {
          return this._height;
      }
      hasXY(x, y) {
          return x >= 0 && y >= 0 && x < this.width && y < this.height;
      }
      // This is without opacity - opacity must be done in Mixer
      drawSprite(x, y, sprite) {
          const ch = sprite.ch;
          const fg = sprite.fg;
          const bg = sprite.bg;
          return this.draw(x, y, ch, fg, bg);
      }
      blackOut(...args) {
          if (args.length == 0) {
              return this.fill(' ', 0, 0);
          }
          return this.draw(args[0], args[1], ' ', 0, 0);
      }
      fill(glyph = ' ', fg = 0xfff, bg = 0) {
          if (arguments.length == 1) {
              bg = from$2(glyph);
              glyph = null;
              fg = bg;
          }
          return this.fillRect(0, 0, this.width, this.height, glyph, fg, bg);
      }
      drawText(x, y, text, fg = 0xfff, bg = null, maxWidth = 0, align = 'left') {
          // if (!this.hasXY(x, y)) return 0;
          if (typeof fg !== 'number')
              fg = from$2(fg);
          if (typeof bg !== 'number')
              bg = from$2(bg);
          maxWidth = Math.min(maxWidth || this.width, this.width - x);
          if (align == 'right') {
              const len = length(text);
              x += maxWidth - len;
          }
          else if (align == 'center') {
              const len = length(text);
              x += Math.floor((maxWidth - len) / 2);
          }
          eachChar(text, (ch, fg0, bg0, i) => {
              if (x + i >= this.width || i >= maxWidth)
                  return;
              this.draw(i + x, y, ch, fg0, bg0);
          }, { fg, bg });
          return 1; // used 1 line
      }
      wrapText(x, y, width, text, fg = 0xfff, bg = null, indent = 0 // TODO - convert to WrapOptions
      ) {
          // if (!this.hasXY(x, y)) return 0;
          fg = from$2(fg);
          bg = from$2(bg);
          width = Math.min(width, this.width - x);
          text = wordWrap(text, width, { indent });
          let lineCount = 0;
          let xi = x;
          eachChar(text, (ch, fg0, bg0) => {
              if (ch == '\n') {
                  while (xi < x + width) {
                      this.draw(xi++, y + lineCount, ' ', 0x000, bg0);
                  }
                  ++lineCount;
                  xi = x + indent;
                  return;
              }
              this.draw(xi++, y + lineCount, ch, fg0, bg0);
          }, { fg, bg });
          while (xi < x + width) {
              this.draw(xi++, y + lineCount, ' ', 0x000, bg);
          }
          return lineCount + 1;
      }
      fillBounds(bounds, ch = null, fg = null, bg = null) {
          return this.fillRect(bounds.x, bounds.y, bounds.width, bounds.height, ch, fg, bg);
      }
      fillRect(x, y, w, h, ch = null, fg = null, bg = null) {
          fg = fg !== null ? from$2(fg) : null;
          bg = bg !== null ? from$2(bg) : null;
          const xw = Math.min(x + w, this.width);
          const yh = Math.min(y + h, this.height);
          for (let i = x; i < xw; ++i) {
              for (let j = y; j < yh; ++j) {
                  this.set(i, j, ch, fg, bg);
              }
          }
          return this;
      }
      blackOutBounds(bounds, bg = 0) {
          return this.blackOutRect(bounds.x, bounds.y, bounds.width, bounds.height, bg);
      }
      blackOutRect(x, y, w, h, bg = 'black') {
          bg = from$2(bg);
          return this.fillRect(x, y, w, h, ' ', bg, bg);
      }
      highlight(x, y, color, strength) {
          if (!this.hasXY(x, y))
              return this;
          color = from$2(color);
          const mixer = new Mixer();
          const data = this.get(x, y);
          mixer.drawSprite(data);
          mixer.fg = mixer.fg.add(color, strength);
          mixer.bg = mixer.bg.add(color, strength);
          this.drawSprite(x, y, mixer);
          return this;
      }
      mix(color, percent, x = 0, y = 0, width = 0, height = 0) {
          color = from$2(color);
          if (color.isNull())
              return this;
          const mixer = new Mixer();
          if (!width)
              width = x ? 1 : this.width;
          if (!height)
              height = y ? 1 : this.height;
          const endX = Math.min(width + x, this.width);
          const endY = Math.min(height + y, this.height);
          for (let i = x; i < endX; ++i) {
              for (let j = y; j < endY; ++j) {
                  const data = this.get(i, j);
                  mixer.drawSprite(data);
                  mixer.fg = mixer.fg.mix(color, percent);
                  mixer.bg = mixer.bg.mix(color, percent);
                  this.drawSprite(i, j, mixer);
              }
          }
          return this;
      }
      blend(color, x = 0, y = 0, width = 0, height = 0) {
          color = from$2(color);
          if (color.isNull())
              return this;
          const mixer = new Mixer();
          if (!width)
              width = x ? 1 : this.width;
          if (!height)
              height = y ? 1 : this.height;
          const endX = Math.min(width + x, this.width);
          const endY = Math.min(height + y, this.height);
          for (let i = x; i < endX; ++i) {
              for (let j = y; j < endY; ++j) {
                  const data = this.get(i, j);
                  mixer.drawSprite(data);
                  mixer.fg = mixer.fg.blend(color);
                  mixer.bg = mixer.bg.blend(color);
                  this.drawSprite(i, j, mixer);
              }
          }
          return this;
      }
      setClip(...args) {
          if (args.length == 1) {
              this._clip = args[0].clone();
              return this;
          }
          this._clip = new Bounds(args[0], args[1], args[2], args[3]);
          return this;
      }
      clearClip() {
          this._clip = null;
          return this;
      }
  }
  let Buffer$1 = class Buffer extends BufferBase {
      constructor(...args) {
          super(args[0], args[1]);
          this.changed = false;
          this._data = [];
          this.resize(this._width, this._height);
      }
      clone() {
          const other = new (this.constructor)(this._width, this._height);
          other.copy(this);
          return other;
      }
      resize(width, height) {
          if (this._data.length === width * height)
              return;
          this._width = width;
          this._height = height;
          while (this._data.length < width * height) {
              this._data.push(new Mixer());
          }
          this._data.length = width * height; // truncate if was too large
          this.changed = true;
      }
      _index(x, y) {
          return y * this.width + x;
      }
      get(x, y) {
          if (!this.hasXY(x, y)) {
              throw new Error(`Invalid loc - ${x},${y}`);
          }
          let index = y * this.width + x;
          return this._data[index];
      }
      set(x, y, ch = null, fg = null, bg = null) {
          if (this._clip && !this._clip.contains(x, y))
              return this;
          const m = this.get(x, y);
          m.fill(ch, fg, bg);
          return this;
      }
      info(x, y) {
          if (!this.hasXY(x, y)) {
              throw new Error(`Invalid loc - ${x},${y}`);
          }
          let index = y * this.width + x;
          const m = this._data[index];
          return {
              ch: m.ch,
              fg: m.fg.toInt(),
              bg: m.bg.toInt(),
          };
      }
      copy(other) {
          this._data.forEach((m, i) => {
              m.copy(other._data[i]);
          });
          this.changed = true;
          this._clip = other._clip ? other._clip.clone() : null;
          return this;
      }
      apply(other) {
          if (this._clip) {
              this._clip.forEach((x, y) => {
                  const me = this.get(x, y);
                  const you = other.get(x, y);
                  me.drawSprite(you);
              });
              return this;
          }
          this._data.forEach((m, i) => {
              m.drawSprite(other._data[i]);
          });
          this.changed = true;
          return this;
      }
      // toGlyph(ch: string | number): number {
      //     if (typeof ch === 'number') return ch;
      //     if (!ch || !ch.length) return -1; // 0 handled elsewhere
      //     return ch.charCodeAt(0);
      // }
      draw(x, y, glyph = null, fg = null, // TODO - White?
      bg = null // TODO - Black?
      ) {
          if (this._clip && !this._clip.contains(x, y))
              return this;
          let index = y * this.width + x;
          const current = this._data[index];
          current.draw(glyph, fg, bg);
          this.changed = true;
          return this;
      }
      nullify(...args) {
          if (args.length == 0) {
              if (this._clip) {
                  this._clip.forEach((x, y) => {
                      this.nullify(x, y);
                  });
              }
              else {
                  this._data.forEach((d) => d.nullify());
              }
          }
          else {
              if (this._clip && !this._clip.contains(args[0], args[1]))
                  return this;
              this.get(args[0], args[1]).nullify();
          }
      }
      dump() {
          const data = [];
          let header = '    ';
          for (let x = 0; x < this.width; ++x) {
              if (x % 10 == 0)
                  header += ' ';
              header += x % 10;
          }
          data.push(header);
          data.push('');
          for (let y = 0; y < this.height; ++y) {
              let line = `${('' + y).padStart(2)}] `;
              for (let x = 0; x < this.width; ++x) {
                  if (x % 10 == 0)
                      line += ' ';
                  const data = this.get(x, y);
                  let glyph = data.ch;
                  if (glyph === null)
                      glyph = ' ';
                  line += glyph;
              }
              data.push(line);
          }
          console.log(data.join('\n'));
      }
  };
  function make$8(...args) {
      return new Buffer$1(args[0], args[1]);
  }

  var buffer = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	Buffer: Buffer$1,
  	BufferBase: BufferBase,
  	make: make$8
  });

  const FovFlags = make$a([
      'VISIBLE', // cell has sufficient light and is in field of view, ready to draw.
      'WAS_VISIBLE',
      'CLAIRVOYANT_VISIBLE',
      'WAS_CLAIRVOYANT_VISIBLE',
      'TELEPATHIC_VISIBLE', // potions of telepathy let you see through other creatures' eyes
      'WAS_TELEPATHIC_VISIBLE', // potions of telepathy let you see through other creatures' eyes
      'ITEM_DETECTED',
      'WAS_ITEM_DETECTED',
      'ACTOR_DETECTED',
      'WAS_ACTOR_DETECTED',
      'REVEALED',
      'MAGIC_MAPPED', // TODO - REMOVE !?!?
      'IN_FOV', // player has unobstructed line of sight whether or not there is enough light
      'WAS_IN_FOV',
      'ALWAYS_VISIBLE',
      'IS_CURSOR',
      'IS_HIGHLIGHTED',
      'ANY_KIND_OF_VISIBLE = VISIBLE | CLAIRVOYANT_VISIBLE | TELEPATHIC_VISIBLE',
      'IS_WAS_ANY_KIND_OF_VISIBLE = VISIBLE | WAS_VISIBLE |CLAIRVOYANT_VISIBLE | WAS_CLAIRVOYANT_VISIBLE |TELEPATHIC_VISIBLE |WAS_TELEPATHIC_VISIBLE',
      'WAS_ANY_KIND_OF_VISIBLE = WAS_VISIBLE | WAS_CLAIRVOYANT_VISIBLE | WAS_TELEPATHIC_VISIBLE',
      'WAS_DETECTED = WAS_ITEM_DETECTED | WAS_ACTOR_DETECTED',
      'IS_DETECTED = ITEM_DETECTED | ACTOR_DETECTED',
      'PLAYER = IN_FOV',
      'CLAIRVOYANT = CLAIRVOYANT_VISIBLE',
      'TELEPATHIC = TELEPATHIC_VISIBLE',
      'VIEWPORT_TYPES = PLAYER | VISIBLE |CLAIRVOYANT |TELEPATHIC |ITEM_DETECTED |ACTOR_DETECTED',
  ]);

  // CREDIT - This is adapted from: http://roguebasin.roguelikedevelopment.org/index.php?title=Improved_Shadowcasting_in_Java
  class FOV {
      constructor(strategy) {
          this._setVisible = null;
          this._startX = -1;
          this._startY = -1;
          this._maxRadius = 100;
          this._isBlocked = strategy.isBlocked;
          this._calcRadius = strategy.calcRadius || calcRadius;
          this._hasXY = strategy.hasXY || TRUE;
          this._debug = strategy.debug || NOOP;
      }
      calculate(x, y, maxRadius, setVisible) {
          this._setVisible = setVisible;
          this._setVisible(x, y, 1);
          this._startX = x;
          this._startY = y;
          this._maxRadius = maxRadius + 1;
          // uses the diagonals
          for (let i = 4; i < 8; ++i) {
              const d = DIRS$2[i];
              this._castLight(1, 1.0, 0.0, 0, d[0], d[1], 0);
              this._castLight(1, 1.0, 0.0, d[0], 0, 0, d[1]);
          }
      }
      // NOTE: slope starts a 1 and ends at 0.
      _castLight(row, startSlope, endSlope, xx, xy, yx, yy) {
          if (row >= this._maxRadius) {
              this._debug('CAST: row=%d, start=%d, end=%d, row >= maxRadius => cancel', row, startSlope.toFixed(2), endSlope.toFixed(2));
              return;
          }
          if (startSlope < endSlope) {
              this._debug('CAST: row=%d, start=%d, end=%d, start < end => cancel', row, startSlope.toFixed(2), endSlope.toFixed(2));
              return;
          }
          this._debug('CAST: row=%d, start=%d, end=%d, x=%d,%d, y=%d,%d', row, startSlope.toFixed(2), endSlope.toFixed(2), xx, xy, yx, yy);
          let nextStart = startSlope;
          let blocked = false;
          let deltaY = -row;
          let currentX, currentY, outerSlope, innerSlope, maxSlope, minSlope = 0;
          for (let deltaX = -row; deltaX <= 0; deltaX++) {
              currentX = Math.floor(this._startX + deltaX * xx + deltaY * xy);
              currentY = Math.floor(this._startY + deltaX * yx + deltaY * yy);
              outerSlope = (deltaX - 0.5) / (deltaY + 0.5);
              innerSlope = (deltaX + 0.5) / (deltaY - 0.5);
              maxSlope = deltaX / (deltaY + 0.5);
              minSlope = (deltaX + 0.5) / deltaY;
              if (!this._hasXY(currentX, currentY)) {
                  blocked = true;
                  // nextStart = innerSlope;
                  continue;
              }
              this._debug('- test %d,%d ... start=%d, min=%d, max=%d, end=%d, dx=%d, dy=%d', currentX, currentY, startSlope.toFixed(2), maxSlope.toFixed(2), minSlope.toFixed(2), endSlope.toFixed(2), deltaX, deltaY);
              if (startSlope < minSlope) {
                  blocked = this._isBlocked(currentX, currentY);
                  continue;
              }
              else if (endSlope > maxSlope) {
                  break;
              }
              //check if it's within the lightable area and light if needed
              const radius = this._calcRadius(deltaX, deltaY);
              if (radius < this._maxRadius) {
                  const bright = 1 - radius / this._maxRadius;
                  this._setVisible(currentX, currentY, bright);
                  this._debug('       - visible');
              }
              if (blocked) {
                  //previous cell was a blocking one
                  if (this._isBlocked(currentX, currentY)) {
                      //hit a wall
                      this._debug('       - blocked ... nextStart: %d', innerSlope.toFixed(2));
                      nextStart = innerSlope;
                      continue;
                  }
                  else {
                      blocked = false;
                  }
              }
              else {
                  if (this._isBlocked(currentX, currentY) &&
                      row < this._maxRadius) {
                      //hit a wall within sight line
                      this._debug('       - blocked ... start:%d, end:%d, nextStart: %d', nextStart.toFixed(2), outerSlope.toFixed(2), innerSlope.toFixed(2));
                      blocked = true;
                      this._castLight(row + 1, nextStart, outerSlope, xx, xy, yx, yy);
                      nextStart = innerSlope;
                  }
              }
          }
          if (!blocked) {
              this._castLight(row + 1, nextStart, endSlope, xx, xy, yx, yy);
          }
      }
  }
  function calculate(dest, isBlocked, x, y, radius) {
      dest.fill(0);
      const fov = new FOV({
          isBlocked,
          hasXY: dest.hasXY.bind(dest),
      });
      fov.calculate(x, y, radius, (i, j, v) => {
          dest.set(i, j, v);
      });
  }

  // import * as GWU from 'gw-utils';
  // import * as Flags from './mapFlags';
  // import * as Cell from './cell';
  // import * as Map from './map';
  class FovSystem {
      constructor(site, opts = {}) {
          // needsUpdate: boolean;
          this.changed = true;
          this._callback = NOOP;
          this.follow = null;
          this.site = site;
          let flag = 0;
          const visible = opts.visible || opts.alwaysVisible;
          if (opts.revealed || (visible && opts.revealed !== false))
              flag |= FovFlags.REVEALED;
          if (visible)
              flag |= FovFlags.VISIBLE;
          this.flags = make$e(site.width, site.height, flag);
          // this.needsUpdate = true;
          if (opts.callback) {
              this.callback = opts.callback;
          }
          this.fov = new FOV({
              isBlocked: (x, y) => {
                  return this.site.blocksVision(x, y);
              },
              hasXY: (x, y) => {
                  return (x >= 0 &&
                      y >= 0 &&
                      x < this.site.width &&
                      y < this.site.height);
              },
          });
          if (opts.alwaysVisible) {
              this.makeAlwaysVisible();
          }
          if (opts.visible || opts.alwaysVisible) {
              forRect(site.width, site.height, (x, y) => this._callback(x, y, true));
          }
      }
      get callback() {
          return this._callback;
      }
      set callback(v) {
          if (!v) {
              this._callback = NOOP;
          }
          else if (typeof v === 'function') {
              this._callback = v;
          }
          else {
              this._callback = v.onFovChange.bind(v);
          }
      }
      getFlag(x, y) {
          return this.flags[x][y];
      }
      isVisible(x, y) {
          return !!((this.flags.get(x, y) || 0) & FovFlags.VISIBLE);
      }
      isAnyKindOfVisible(x, y) {
          return !!((this.flags.get(x, y) || 0) & FovFlags.ANY_KIND_OF_VISIBLE);
      }
      isClairvoyantVisible(x, y) {
          return !!((this.flags.get(x, y) || 0) & FovFlags.CLAIRVOYANT_VISIBLE);
      }
      isTelepathicVisible(x, y) {
          return !!((this.flags.get(x, y) || 0) & FovFlags.TELEPATHIC_VISIBLE);
      }
      isInFov(x, y) {
          return !!((this.flags.get(x, y) || 0) & FovFlags.IN_FOV);
      }
      isDirectlyVisible(x, y) {
          const flags = FovFlags.VISIBLE | FovFlags.IN_FOV;
          return ((this.flags.get(x, y) || 0) & flags) === flags;
      }
      isActorDetected(x, y) {
          return !!((this.flags.get(x, y) || 0) & FovFlags.ACTOR_DETECTED);
      }
      isItemDetected(x, y) {
          return !!((this.flags.get(x, y) || 0) & FovFlags.ITEM_DETECTED);
      }
      isMagicMapped(x, y) {
          return !!((this.flags.get(x, y) || 0) & FovFlags.MAGIC_MAPPED);
      }
      isRevealed(x, y) {
          return !!((this.flags.get(x, y) || 0) & FovFlags.REVEALED);
      }
      fovChanged(x, y) {
          const flags = this.flags.get(x, y) || 0;
          const isVisible = !!(flags & FovFlags.ANY_KIND_OF_VISIBLE);
          const wasVisible = !!(flags & FovFlags.WAS_ANY_KIND_OF_VISIBLE);
          return isVisible !== wasVisible;
      }
      wasAnyKindOfVisible(x, y) {
          return !!((this.flags.get(x, y) || 0) & FovFlags.WAS_ANY_KIND_OF_VISIBLE);
      }
      makeAlwaysVisible() {
          this.changed = true;
          this.flags.forEach((_v, x, y) => {
              this.flags[x][y] |=
                  FovFlags.ALWAYS_VISIBLE | FovFlags.REVEALED | FovFlags.VISIBLE;
              this.callback(x, y, true);
          });
      }
      makeCellAlwaysVisible(x, y) {
          this.changed = true;
          this.flags[x][y] |=
              FovFlags.ALWAYS_VISIBLE | FovFlags.REVEALED | FovFlags.VISIBLE;
          this.callback(x, y, true);
      }
      revealAll(makeVisibleToo = true) {
          const flag = FovFlags.REVEALED | (makeVisibleToo ? FovFlags.VISIBLE : 0);
          this.flags.update((v) => v | flag);
          this.flags.forEach((v, x, y) => {
              this.callback(x, y, !!(v & FovFlags.VISIBLE));
          });
          this.changed = true;
      }
      revealCell(x, y, radius = 0, makeVisibleToo = true) {
          const flag = FovFlags.REVEALED | (makeVisibleToo ? FovFlags.VISIBLE : 0);
          this.fov.calculate(x, y, radius, (x0, y0) => {
              this.flags[x0][y0] |= flag;
              this.callback(x0, y0, !!(flag & FovFlags.VISIBLE));
          });
          this.changed = true;
      }
      hideCell(x, y) {
          this.flags[x][y] &= ~(FovFlags.MAGIC_MAPPED |
              FovFlags.REVEALED |
              FovFlags.ALWAYS_VISIBLE);
          this.flags[x][y] = this.demoteCellVisibility(this.flags[x][y]); // clears visible, etc...
          this.callback(x, y, false);
          this.changed = true;
      }
      magicMapCell(x, y) {
          this.flags[x][y] |= FovFlags.MAGIC_MAPPED;
          this.changed = true;
          this.callback(x, y, true);
      }
      reset() {
          this.flags.fill(0);
          this.changed = true;
          this.flags.forEach((_v, x, y) => {
              this.callback(x, y, false);
          });
      }
      // get changed(): boolean {
      //     return this._changed;
      // }
      // set changed(v: boolean) {
      //     this._changed = v;
      //     this.needsUpdate = this.needsUpdate || v;
      // }
      // CURSOR
      setCursor(x, y, keep = false) {
          if (!keep) {
              this.flags.update((f) => f & ~FovFlags.IS_CURSOR);
          }
          this.flags[x][y] |= FovFlags.IS_CURSOR;
          this.changed = true;
      }
      clearCursor(x, y) {
          if (x === undefined || y === undefined) {
              this.flags.update((f) => f & ~FovFlags.IS_CURSOR);
          }
          else {
              this.flags[x][y] &= ~FovFlags.IS_CURSOR;
          }
          this.changed = true;
      }
      isCursor(x, y) {
          return !!(this.flags[x][y] & FovFlags.IS_CURSOR);
      }
      // HIGHLIGHT
      setHighlight(x, y, keep = false) {
          if (!keep) {
              this.flags.update((f) => f & ~FovFlags.IS_HIGHLIGHTED);
          }
          this.flags[x][y] |= FovFlags.IS_HIGHLIGHTED;
          this.changed = true;
      }
      clearHighlight(x, y) {
          if (x === undefined || y === undefined) {
              this.flags.update((f) => f & ~FovFlags.IS_HIGHLIGHTED);
          }
          else {
              this.flags[x][y] &= ~FovFlags.IS_HIGHLIGHTED;
          }
          this.changed = true;
      }
      isHighlight(x, y) {
          return !!(this.flags[x][y] & FovFlags.IS_HIGHLIGHTED);
      }
      // COPY
      // copy(other: FovSystem) {
      //     this.site = other.site;
      //     this.flags.copy(other.flags);
      //     this.fov = other.fov;
      //     this.follow = other.follow;
      //     this.onFovChange = other.onFovChange;
      //     // this.needsUpdate = other.needsUpdate;
      //     // this._changed = other._changed;
      // }
      //////////////////////////
      // UPDATE
      demoteCellVisibility(flag) {
          flag &= ~(FovFlags.WAS_ANY_KIND_OF_VISIBLE |
              FovFlags.WAS_IN_FOV |
              FovFlags.WAS_DETECTED);
          if (flag & FovFlags.IN_FOV) {
              flag &= ~FovFlags.IN_FOV;
              flag |= FovFlags.WAS_IN_FOV;
          }
          if (flag & FovFlags.VISIBLE) {
              flag &= ~FovFlags.VISIBLE;
              flag |= FovFlags.WAS_VISIBLE;
          }
          if (flag & FovFlags.CLAIRVOYANT_VISIBLE) {
              flag &= ~FovFlags.CLAIRVOYANT_VISIBLE;
              flag |= FovFlags.WAS_CLAIRVOYANT_VISIBLE;
          }
          if (flag & FovFlags.TELEPATHIC_VISIBLE) {
              flag &= ~FovFlags.TELEPATHIC_VISIBLE;
              flag |= FovFlags.WAS_TELEPATHIC_VISIBLE;
          }
          if (flag & FovFlags.ALWAYS_VISIBLE) {
              flag |= FovFlags.VISIBLE;
          }
          if (flag & FovFlags.ITEM_DETECTED) {
              flag &= ~FovFlags.ITEM_DETECTED;
              flag |= FovFlags.WAS_ITEM_DETECTED;
          }
          if (flag & FovFlags.ACTOR_DETECTED) {
              flag &= ~FovFlags.ACTOR_DETECTED;
              flag |= FovFlags.WAS_ACTOR_DETECTED;
          }
          return flag;
      }
      updateCellVisibility(flag, x, y) {
          const isVisible = !!(flag & FovFlags.ANY_KIND_OF_VISIBLE);
          const wasVisible = !!(flag & FovFlags.WAS_ANY_KIND_OF_VISIBLE);
          if (isVisible && wasVisible) ;
          else if (isVisible && !wasVisible) {
              // if the cell became visible this move
              this.flags[x][y] |= FovFlags.REVEALED;
              this._callback(x, y, isVisible);
              this.changed = true;
          }
          else if (!isVisible && wasVisible) {
              // if the cell ceased being visible this move
              this._callback(x, y, isVisible);
              this.changed = true;
          }
          return isVisible;
      }
      // protected updateCellClairyvoyance(
      //     flag: number,
      //     x: number,
      //     y: number
      // ): boolean {
      //     const isClairy = !!(flag & FovFlags.CLAIRVOYANT_VISIBLE);
      //     const wasClairy = !!(flag & FovFlags.WAS_CLAIRVOYANT_VISIBLE);
      //     if (isClairy && wasClairy) {
      //         // if (this.site.lightChanged(x, y)) {
      //         //     this.site.redrawCell(x, y);
      //         // }
      //     } else if (!isClairy && wasClairy) {
      //         // ceased being clairvoyantly visible
      //         this._callback(x, y, isClairy);
      //     } else if (!wasClairy && isClairy) {
      //         // became clairvoyantly visible
      //         this._callback(x, y, isClairy);
      //     }
      //     return isClairy;
      // }
      // protected updateCellTelepathy(flag: number, x: number, y: number): boolean {
      //     const isTele = !!(flag & FovFlags.TELEPATHIC_VISIBLE);
      //     const wasTele = !!(flag & FovFlags.WAS_TELEPATHIC_VISIBLE);
      //     if (isTele && wasTele) {
      //         // if (this.site.lightChanged(x, y)) {
      //         //     this.site.redrawCell(x, y);
      //         // }
      //     } else if (!isTele && wasTele) {
      //         // ceased being telepathically visible
      //         this._callback(x, y, isTele);
      //     } else if (!wasTele && isTele) {
      //         // became telepathically visible
      //         this._callback(x, y, isTele);
      //     }
      //     return isTele;
      // }
      updateCellDetect(flag, x, y) {
          const isDetect = !!(flag & FovFlags.IS_DETECTED);
          const wasDetect = !!(flag & FovFlags.WAS_DETECTED);
          if (isDetect && wasDetect) ;
          else if (!isDetect && wasDetect) {
              // ceased being detected visible
              this._callback(x, y, isDetect);
              this.changed = true;
          }
          else if (!wasDetect && isDetect) {
              // became detected visible
              this._callback(x, y, isDetect);
              this.changed = true;
          }
          return isDetect;
      }
      // protected updateItemDetect(flag: number, x: number, y: number): boolean {
      //     const isItem = !!(flag & FovFlags.ITEM_DETECTED);
      //     const wasItem = !!(flag & FovFlags.WAS_ITEM_DETECTED);
      //     if (isItem && wasItem) {
      //         // if (this.site.lightChanged(x, y)) {
      //         //     this.site.redrawCell(x, y);
      //         // }
      //     } else if (!isItem && wasItem) {
      //         // ceased being detected visible
      //         this._callback(x, y, isItem);
      //     } else if (!wasItem && isItem) {
      //         // became detected visible
      //         this._callback(x, y, isItem);
      //     }
      //     return isItem;
      // }
      promoteCellVisibility(flag, x, y) {
          if (flag & FovFlags.IN_FOV &&
              this.site.hasVisibleLight(x, y) // &&
          // !(cell.flags.cellMech & FovFlagsMech.DARKENED)
          ) {
              flag = this.flags[x][y] |= FovFlags.VISIBLE;
          }
          if (this.updateCellVisibility(flag, x, y))
              return;
          // if (this.updateCellClairyvoyance(flag, x, y)) return;
          // if (this.updateCellTelepathy(flag, x, y)) return;
          if (this.updateCellDetect(flag, x, y))
              return;
          // if (this.updateItemDetect(flag, x, y)) return;
      }
      updateFor(subject) {
          return this.update(subject.x, subject.y, subject.visionDistance);
      }
      update(cx, cy, cr) {
          if (cx === undefined) {
              if (this.follow) {
                  return this.updateFor(this.follow);
              }
          }
          // if (
          //     // !this.needsUpdate &&
          //     cx === undefined &&
          //     !this.site.lightingChanged()
          // ) {
          //     return false;
          // }
          if (cr === undefined) {
              cr = this.site.width + this.site.height;
          }
          // this.needsUpdate = false;
          this.changed = false;
          this.flags.update(this.demoteCellVisibility.bind(this));
          this.site.eachViewport((x, y, radius, type) => {
              let flag = type & FovFlags.VIEWPORT_TYPES;
              if (!flag)
                  flag = FovFlags.VISIBLE;
              // if (!flag)
              //     throw new Error('Received invalid viewport type: ' + Flag.toString(FovFlags, type));
              if (radius == 0) {
                  this.flags[x][y] |= flag;
                  return;
              }
              this.fov.calculate(x, y, radius, (x, y, v) => {
                  if (v) {
                      this.flags[x][y] |= flag;
                  }
              });
          });
          if (cx !== undefined && cy !== undefined) {
              this.fov.calculate(cx, cy, cr, (x, y, v) => {
                  if (v) {
                      this.flags[x][y] |= FovFlags.PLAYER;
                  }
              });
          }
          // if (PLAYER.bonus.clairvoyance < 0) {
          //   discoverCell(PLAYER.xLoc, PLAYER.yLoc);
          // }
          //
          // if (PLAYER.bonus.clairvoyance != 0) {
          // 	updateClairvoyance();
          // }
          //
          // updateTelepathy();
          // updateMonsterDetection();
          // updateLighting();
          this.flags.forEach(this.promoteCellVisibility.bind(this));
          // if (PLAYER.status.hallucinating > 0) {
          // 	for (theItem of DUNGEON.items) {
          // 		if ((pmap[theItem.xLoc][theItem.yLoc].flags & DISCOVERED) && refreshDisplay) {
          // 			refreshDungeonCell(theItem.xLoc, theItem.yLoc);
          // 		}
          // 	}
          // 	for (monst of DUNGEON.monsters) {
          // 		if ((pmap[monst.xLoc][monst.yLoc].flags & DISCOVERED) && refreshDisplay) {
          // 			refreshDungeonCell(monst.xLoc, monst.yLoc);
          // 		}
          // 	}
          // }
          return this.changed;
      }
  }

  var index$7 = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	FOV: FOV,
  	FovFlags: FovFlags,
  	FovSystem: FovSystem,
  	calculate: calculate
  });

  const DIRS$3 = DIRS$2;
  const OK = 1;
  const AVOIDED = 10;
  const BLOCKED = 10000;
  const OBSTRUCTION = 20000; // Blocks Diagonal
  const NOT_DONE = 30000;
  function makeItem$1(x, y, distance = NOT_DONE) {
      return {
          x,
          y,
          distance,
          next: null,
          prev: null,
      };
  }
  class DijkstraMap {
      constructor(width, height) {
          this._data = [];
          this._todo = makeItem$1(-1, -1);
          this._width = 0;
          this._height = 0;
          if (width !== undefined && height !== undefined) {
              this.reset(width, height);
          }
      }
      get width() {
          return this._width;
      }
      get height() {
          return this._height;
      }
      copy(other) {
          this.reset(other.width, other.height);
          const max = other.width * other.height;
          for (let index = 0; index < max; ++index) {
              this._data[index].distance = other._data[index].distance;
          }
      }
      hasXY(x, y) {
          return x >= 0 && x < this._width && y >= 0 && y < this._height;
      }
      reset(width, height, distance = NOT_DONE) {
          this._width = width;
          this._height = height;
          while (this._data.length < width * height) {
              this._data.push(makeItem$1(-1, -1));
          }
          for (let y = 0; y < this._height; ++y) {
              for (let x = 0; x < this._width; ++x) {
                  const item = this._get(x, y);
                  item.x = x;
                  item.y = y;
                  item.distance = distance;
                  item.next = item.prev = null;
              }
          }
          this._todo.next = this._todo.prev = null;
      }
      _get(...args) {
          if (args.length == 1) {
              const x$1 = x(args[0]);
              const y$1 = y(args[0]);
              return this._data[x$1 + y$1 * this._width];
          }
          else {
              return this._data[args[0] + args[1] * this._width];
          }
      }
      setGoal(...args) {
          if (typeof args[0] === 'number') {
              this._add(args[0], args[1], args[2] || 0, 0);
          }
          else {
              this._add(x(args[0]), y(args[0]), args[1] || 0, 0);
          }
      }
      setDistance(x, y, distance) {
          this._add(x, y, 0, distance);
      }
      _add(x, y, distance, cost) {
          if (!this.hasXY(x, y))
              return false;
          const item = this._get(x, y);
          if (Math.floor(item.distance * 100) <=
              Math.floor((cost + distance) * 100)) {
              return false;
          }
          if (item.prev) {
              item.prev.next = item.next;
              item.next && (item.next.prev = item.prev);
          }
          item.prev = item.next = null;
          if (cost >= OBSTRUCTION) {
              item.distance = OBSTRUCTION;
              return false;
          }
          else if (cost >= BLOCKED) {
              item.distance = BLOCKED;
              return false;
          }
          item.distance = distance + cost;
          return this._insert(item);
      }
      _insert(item) {
          let prev = this._todo;
          let current = prev.next;
          while (current && current.distance < item.distance) {
              prev = current;
              current = prev.next;
          }
          prev.next = item;
          item.prev = prev;
          item.next = current;
          current && (current.prev = item);
          return true;
      }
      calculate(costFn, only4dirs = false) {
          let current = this._todo.next;
          while (current) {
              let next = current.next;
              current.prev = current.next = null;
              this._todo.next = next;
              next && (next.prev = this._todo);
              // console.log('current', current.x, current.y, current.distance);
              eachNeighbor(current.x, current.y, (x, y, dir) => {
                  let mult = 1;
                  if (isDiagonal(dir)) {
                      mult = 1.4;
                      // check to see if obstruction blocks this move
                      if (costFn(x, current.y) >= OBSTRUCTION ||
                          costFn(current.x, y) >= OBSTRUCTION) {
                          return;
                      }
                  }
                  const cost = costFn(x, y) * mult;
                  if (this._add(x, y, current.distance, cost)) ;
              }, only4dirs);
              current = this._todo.next;
          }
      }
      rescan(costFn, only4dirs = false) {
          this._data.forEach((item) => {
              item.next = item.prev = null;
              if (item.distance < BLOCKED) {
                  this._insert(item);
              }
          });
          this.calculate(costFn, only4dirs);
      }
      getDistance(x, y) {
          if (!this.hasXY(x, y))
              return NOT_DONE;
          return this._get(x, y).distance;
      }
      addObstacle(x, y, costFn, radius, penalty = radius) {
          const done = [[x, y]];
          const todo = [[x, y]];
          while (todo.length) {
              const item = todo.shift();
              const dist = distanceBetween(x, y, item[0], item[1]);
              if (dist > radius) {
                  continue;
              }
              const stepPenalty = penalty * ((radius - dist) / radius);
              const data = this._get(item);
              data.distance += stepPenalty;
              eachNeighbor(item[0], item[1], (i, j) => {
                  const stepCost = costFn(i, j);
                  if (done.findIndex((e) => e[0] === i && e[1] === j) >= 0) {
                      return;
                  }
                  if (stepCost >= BLOCKED) {
                      return;
                  }
                  done.push([i, j]);
                  todo.push([i, j]);
              });
          }
      }
      nextDir(fromX, fromY, isBlocked, only4dirs = false) {
          let newX, newY, bestScore;
          let index;
          // brogueAssert(coordinatesAreInMap(x, y));
          bestScore = 0;
          let bestDir = NO_DIRECTION;
          if (!this.hasXY(fromX, fromY))
              throw new Error('Invalid index.');
          const dist = this._get(fromX, fromY).distance;
          for (index = 0; index < (only4dirs ? 4 : 8); ++index) {
              const dir = DIRS$3[index];
              newX = fromX + dir[0];
              newY = fromY + dir[1];
              if (!this.hasXY(newX, newY))
                  continue;
              if (isDiagonal(dir)) {
                  if (this._get(newX, fromY).distance >= OBSTRUCTION ||
                      this._get(fromX, newY).distance >= OBSTRUCTION) {
                      continue; // diagonal blocked
                  }
              }
              const newDist = this._get(newX, newY).distance;
              if (newDist < dist) {
                  const diff = dist - newDist;
                  if (diff > bestScore &&
                      (newDist === 0 || !isBlocked(newX, newY))) {
                      bestDir = index;
                      bestScore = diff;
                  }
              }
          }
          return DIRS$3[bestDir] || null;
      }
      getPath(fromX, fromY, isBlocked, only4dirs = false) {
          const path = [];
          this.forPath(fromX, fromY, isBlocked, (x, y) => {
              path.push([x, y]);
          }, only4dirs);
          return path.length ? path : null;
      }
      // Populates path[][] with a list of coordinates starting at origin and traversing down the map. Returns the path.
      forPath(fromX, fromY, isBlocked, pathFn, only4dirs = false) {
          // actor = actor || GW.PLAYER;
          let x = fromX;
          let y = fromY;
          let dist = this._get(x, y).distance || 0;
          let count = 0;
          if (dist === 0) {
              pathFn(x, y);
              return count;
          }
          if (dist >= BLOCKED) {
              const locs = closestMatchingLocs(x, y, (v) => {
                  return v < BLOCKED;
              });
              if (!locs || locs.length === 0)
                  return 0;
              // get the loc with the lowest distance
              const loc = locs.reduce((best, current) => {
                  const bestItem = this._get(best);
                  const currentItem = this._get(current);
                  return bestItem.distance <= currentItem.distance
                      ? best
                      : current;
              });
              x = loc[0];
              y = loc[1];
              pathFn(x, y);
              ++count;
          }
          let dir;
          do {
              dir = this.nextDir(x, y, isBlocked, only4dirs);
              if (dir) {
                  pathFn(x, y);
                  ++count;
                  x += dir[0];
                  y += dir[1];
                  // path[steps][0] = x;
                  // path[steps][1] = y;
                  // brogueAssert(coordinatesAreInMap(x, y));
              }
          } while (dir);
          pathFn(x, y);
          return count;
      }
      // allows you to transform the data - for flee calcs, etc...
      update(fn) {
          for (let y = 0; y < this._height; ++y) {
              for (let x = 0; x < this._width; ++x) {
                  const item = this._get(x, y);
                  item.distance = fn(item.distance, item.x, item.y);
              }
          }
      }
      add(other) {
          if (this._width !== other._width || this._height !== other._height)
              throw new Error('Not same size!');
          for (let index = 0; index < this._width * this._height; ++index) {
              this._data[index].distance += other._data[index].distance;
          }
      }
      forEach(fn) {
          for (let y = 0; y < this._height; ++y) {
              for (let x = 0; x < this._width; ++x) {
                  const item = this._get(x, y);
                  fn(item.distance, item.x, item.y);
              }
          }
      }
      dump(fmtFn, log = console.log) {
          this.dumpRect(0, 0, this.width, this.height, fmtFn, log);
      }
      dumpRect(left, top, width, height, fmtFn, log = console.log) {
          fmtFn = fmtFn || _format;
          const format = (x, y) => {
              return fmtFn(this.getDistance(x, y));
          };
          return dumpRect(left, top, width, height, format, log);
      }
      dumpAround(x, y, radius, fmtFn, log = console.log) {
          this.dumpRect(x - radius, y - radius, 2 * radius, 2 * radius, fmtFn, log);
      }
      _dumpTodo() {
          let current = this._todo.next;
          const out = [];
          while (current) {
              out.push(`${current.x},${current.y}=${current.distance.toFixed(2)}`);
              current = current.next;
          }
          return out;
      }
  }
  function _format(v) {
      if (v < BLOCKED) {
          return v.toFixed(1).padStart(3, ' ') + ' ';
          // } else if (v < 36) {
          //     return String.fromCharCode('a'.charCodeAt(0) + v - 10);
          // } else if (v < 62) {
          //     return String.fromCharCode('A'.charCodeAt(0) + v - 10 - 26);
      }
      else if (v >= OBSTRUCTION) {
          return ' ## ';
      }
      else if (v >= BLOCKED) {
          return ' XX ';
      }
      else {
          return ' >> ';
      }
  }
  function computeDistances(grid, from, costFn = ONE, only4dirs = false) {
      const dm = new DijkstraMap();
      dm.reset(grid.width, grid.height);
      dm.setGoal(from);
      dm.calculate(costFn, only4dirs);
      dm.forEach((v, x, y) => (grid[x][y] = v));
  }
  const maps = [];
  function alloc() {
      let map = maps.pop();
      if (!map) {
          map = new DijkstraMap();
      }
      return map;
  }
  function free(map) {
      maps.push(map);
  }

  function fromTo(from, to, costFn = ONE, only4dirs = false) {
      const search = new AStar(to, costFn);
      return search.from(from, only4dirs);
  }
  class AStar {
      constructor(goal, costFn = ONE) {
          this._todo = [];
          this._done = [];
          this.goal = asLoc(goal);
          this.costFn = costFn;
      }
      _add(loc, cost = 1, prev = null) {
          const h = distanceFromTo(loc, this.goal);
          let newItem = {
              x: x(loc),
              y: y(loc),
              prev: prev,
              g: prev ? prev.g + cost : 0,
              h: h,
          };
          const f = newItem.g + newItem.h;
          const existing = this._todo.findIndex((i) => equals(i, newItem));
          if (existing > -1) {
              const oldItem = this._todo[existing];
              if (oldItem.g + oldItem.h <= f) {
                  return;
              }
              this._todo.splice(existing, 1); // this one is better
          }
          /* insert by distance */
          for (let i = 0; i < this._todo.length; i++) {
              const item = this._todo[i];
              const itemF = item.g + item.h;
              if (f < itemF || (f == itemF && h < item.h)) {
                  this._todo.splice(i, 0, newItem);
                  return;
              }
          }
          this._todo.push(newItem);
      }
      from(from, only4dirs = false) {
          this._add(from);
          let item = null;
          while (this._todo.length) {
              item = this._todo.shift() || null;
              if (!item)
                  break;
              if (this._done.findIndex((i) => equals(i, item)) > -1) {
                  continue;
              }
              this._done.push(item);
              if (equals(item, this.goal)) {
                  break;
              }
              eachNeighbor(item.x, item.y, (x, y, dir) => {
                  if (this._done.findIndex((i) => i.x === x && i.y === y) > -1) {
                      return;
                  }
                  // TODO - Handle OBSTRUCTION and diagonals
                  let mult = 1;
                  if (isDiagonal(dir)) {
                      mult = 1.4;
                      if (this.costFn(item.x, y) === OBSTRUCTION ||
                          this.costFn(x, item.y) === OBSTRUCTION) {
                          return;
                      }
                  }
                  const cost = this.costFn(x, y) * mult;
                  if (cost < 0 || cost >= 10000)
                      return;
                  this._add([x, y], cost, item);
              }, only4dirs);
          }
          if (item && !equals(item, this.goal))
              return [];
          let result = [];
          while (item) {
              result.push([item.x, item.y]);
              item = item.prev;
          }
          result.reverse();
          return result;
      }
  }

  var index$6 = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	AVOIDED: AVOIDED,
  	BLOCKED: BLOCKED,
  	DijkstraMap: DijkstraMap,
  	NOT_DONE: NOT_DONE,
  	OBSTRUCTION: OBSTRUCTION,
  	OK: OK,
  	alloc: alloc,
  	computeDistances: computeDistances,
  	free: free,
  	fromTo: fromTo
  });

  function make$7(v) {
      if (v === undefined)
          return () => 100;
      if (v === null)
          return () => 0;
      if (typeof v === 'number')
          return () => v;
      if (typeof v === 'function')
          return v;
      let base = {};
      if (typeof v === 'string') {
          const parts = v.split(/[,|]/).map((t) => t.trim());
          base = {};
          parts.forEach((p) => {
              let [level, weight] = p.split(':');
              base[level] = Number.parseInt(weight) || 100;
          });
      }
      else {
          base = v;
      }
      const parts = Object.entries(base);
      const funcs = parts.map(([levels, frequency]) => {
          let valueFn;
          if (typeof frequency === 'string') {
              const value = Number.parseInt(frequency);
              valueFn = () => value;
          }
          else if (typeof frequency === 'number') {
              valueFn = () => frequency;
          }
          else {
              valueFn = frequency;
          }
          if (levels.includes('-')) {
              let [start, end] = levels
                  .split('-')
                  .map((t) => t.trim())
                  .map((v) => Number.parseInt(v));
              return (level) => level >= start && level <= end ? valueFn(level) : 0;
          }
          else if (levels.endsWith('+')) {
              const found = Number.parseInt(levels);
              return (level) => (level >= found ? valueFn(level) : 0);
          }
          else {
              const found = Number.parseInt(levels);
              return (level) => (level === found ? valueFn(level) : 0);
          }
      });
      if (funcs.length == 1)
          return funcs[0];
      return (level) => funcs.reduce((out, fn) => out || fn(level), 0);
  }

  var frequency = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	make: make$7
  });

  class Scheduler {
      constructor() {
          this.next = null;
          this.time = 0;
          this.cache = null;
      }
      clear() {
          while (this.next) {
              const current = this.next;
              this.next = current.next;
              current.next = this.cache;
              this.cache = current;
          }
      }
      push(item, delay = 1) {
          let entry;
          if (this.cache) {
              entry = this.cache;
              this.cache = entry.next;
              entry.next = null;
          }
          else {
              entry = { item: null, time: 0, next: null };
          }
          entry.item = item;
          entry.time = this.time + delay;
          if (!this.next) {
              this.next = entry;
          }
          else {
              let current = this;
              let next = current.next;
              while (next && next.time <= entry.time) {
                  current = next;
                  next = current.next;
              }
              entry.next = current.next;
              current.next = entry;
          }
          return entry;
      }
      pop() {
          const n = this.next;
          if (!n)
              return null;
          this.next = n.next;
          n.next = this.cache;
          this.cache = n;
          this.time = Math.max(n.time, this.time); // so you can schedule -1 as a time uint
          return n.item;
      }
      peek() {
          const n = this.next;
          if (!n)
              return null;
          return n.item;
      }
      remove(item) {
          if (!item || !this.next)
              return;
          if (this.next.item === item) {
              this.next = this.next.next;
              return;
          }
          let prev = this.next;
          let current = prev.next;
          while (current && current.item !== item) {
              prev = current;
              current = current.next;
          }
          if (current && current.item === item) {
              prev.next = current.next;
          }
      }
  }

  var scheduler = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	Scheduler: Scheduler
  });

  class Glyphs {
      static fromImage(src) {
          if (typeof src === 'string') {
              if (src.startsWith('data:'))
                  throw new Error('Glyph: You must load a data string into an image element and use that.');
              const el = document.getElementById(src);
              if (!el)
                  throw new Error('Glyph: Failed to find image element with id:' + src);
              src = el;
          }
          const glyph = new this({
              tileWidth: src.width / 16,
              tileHeight: src.height / 16,
          });
          glyph._ctx.drawImage(src, 0, 0);
          return glyph;
      }
      static fromFont(src) {
          if (typeof src === 'string') {
              src = { font: src };
          }
          const glyphs = new this(src);
          const basicOnly = src.basicOnly || src.basic || false;
          const initFn = src.init || initGlyphs;
          initFn(glyphs, basicOnly);
          return glyphs;
      }
      constructor(opts = {}) {
          this._tileWidth = 12;
          this._tileHeight = 16;
          this.needsUpdate = true;
          this._toGlyph = {};
          this._toChar = [];
          opts.font = opts.font || 'monospace';
          this._node = document.createElement('canvas');
          this._ctx = this.node.getContext('2d');
          this._configure(opts);
      }
      get node() {
          return this._node;
      }
      get ctx() {
          return this._ctx;
      }
      get tileWidth() {
          return this._tileWidth;
      }
      get tileHeight() {
          return this._tileHeight;
      }
      get pxWidth() {
          return this._node.width;
      }
      get pxHeight() {
          return this._node.height;
      }
      forChar(ch) {
          if (!ch || !ch.length)
              return -1;
          return this._toGlyph[ch] || -1;
      }
      toChar(n) {
          return this._toChar[n] || ' ';
      }
      _configure(opts) {
          this._tileWidth = opts.tileWidth || this.tileWidth;
          this._tileHeight = opts.tileHeight || this.tileHeight;
          this.node.width = 16 * this.tileWidth;
          this.node.height = 16 * this.tileHeight;
          this._ctx.fillStyle = 'black';
          this._ctx.fillRect(0, 0, this.pxWidth, this.pxHeight);
          const size = opts.fontSize ||
              opts.size ||
              Math.min(this.tileWidth, this.tileHeight);
          this._ctx.font = '' + size + 'px ' + opts.font;
          this._ctx.textAlign = 'center';
          this._ctx.textBaseline = 'middle';
          this._ctx.fillStyle = 'white';
      }
      draw(n, ch) {
          if (n >= 256)
              throw new Error('Cannot draw more than 256 glyphs.');
          const x = (n % 16) * this.tileWidth;
          const y = Math.floor(n / 16) * this.tileHeight;
          const cx = x + Math.floor(this.tileWidth / 2);
          const cy = y + Math.floor(this.tileHeight / 2);
          this._ctx.save();
          this._ctx.beginPath();
          this._ctx.rect(x, y, this.tileWidth, this.tileHeight);
          this._ctx.clip();
          this._ctx.fillStyle = 'black';
          this._ctx.fillRect(x, y, this.tileWidth, this.tileHeight);
          this._ctx.fillStyle = 'white';
          if (typeof ch === 'function') {
              ch(this._ctx, x, y, this.tileWidth, this.tileHeight);
          }
          else {
              if (this._toGlyph[ch] === undefined)
                  this._toGlyph[ch] = n;
              this._toChar[n] = ch;
              this._ctx.fillText(ch, cx, cy);
          }
          this._ctx.restore();
          this.needsUpdate = true;
      }
  }
  function initGlyphs(glyphs, basicOnly = false) {
      for (let i = 32; i < 127; ++i) {
          glyphs.draw(i, String.fromCharCode(i));
      }
      [
          ' ', // empty
          '\u263a', // smiley hollow
          '\u263b', // smiley filled
          '\u2665', // hearts
          '\u2666', // diamonds
          '\u2663', // clubs
          '\u2660', // spades
          '\u263c', // sun hollow
          '\u2600', // sun filled
          '\u2606', // star hollow
          '\u2605', // star filled
          '\u2023', // bullet triangle
          '\u2219', // bullet square
          '\u2043', // bullet hyphen
          '\u2022', // bullet circle
          '\u2630', // trigram - hamburger menu
          '\u2637', // trigram split
          '\u2610', // unchecked
          '\u2611', // checked
          '\u2612', // checked - with X
          '\u26ac', // radio - off
          '\u29bf', // radio - on
          '\u2191', // up arrow
          '\u2192', // right arrow
          '\u2193', // down arrow
          '\u2190', // left arrow
          '\u2194', // left+right arrow
          '\u2195', // up+down arrow
          '\u25b2', // big up arrow
          '\u25b6', // big right arrow
          '\u25bc', // big down arrow
          '\u25c0', // big left arrow
      ].forEach((ch, i) => {
          glyphs.draw(i, ch);
      });
      if (!basicOnly) {
          // [
          // '\u2302',
          // '\u2b09', '\u272a', '\u2718', '\u2610', '\u2611', '\u25ef', '\u25ce', '\u2690',
          // '\u2691', '\u2598', '\u2596', '\u259d', '\u2597', '\u2744', '\u272d', '\u2727',
          // '\u25e3', '\u25e4', '\u25e2', '\u25e5', '\u25a8', '\u25a7', '\u259a', '\u265f',
          // '\u265c', '\u265e', '\u265d', '\u265b', '\u265a', '\u301c', '\u2694', '\u2692',
          // '\u25b6', '\u25bc', '\u25c0', '\u25b2', '\u25a4', '\u25a5', '\u25a6', '\u257a',
          // '\u257b', '\u2578', '\u2579', '\u2581', '\u2594', '\u258f', '\u2595', '\u272d',
          // '\u2591', '\u2592', '\u2593', '\u2503', '\u252b', '\u2561', '\u2562', '\u2556',
          // '\u2555', '\u2563', '\u2551', '\u2557', '\u255d', '\u255c', '\u255b', '\u2513',
          // '\u2517', '\u253b', '\u2533', '\u2523', '\u2501', '\u254b', '\u255e', '\u255f',
          // '\u255a', '\u2554', '\u2569', '\u2566', '\u2560', '\u2550', '\u256c', '\u2567',
          // '\u2568', '\u2564', '\u2565', '\u2559', '\u2558', '\u2552', '\u2553', '\u256b',
          // '\u256a', '\u251b', '\u250f', '\u2588', '\u2585', '\u258c', '\u2590', '\u2580',
          // '\u03b1', '\u03b2', '\u0393', '\u03c0', '\u03a3', '\u03c3', '\u03bc', '\u03c4',
          // '\u03a6', '\u03b8', '\u03a9', '\u03b4', '\u221e', '\u03b8', '\u03b5', '\u03b7',
          // '\u039e', '\u00b1', '\u2265', '\u2264', '\u2234', '\u2237', '\u00f7', '\u2248',
          // '\u22c4', '\u22c5', '\u2217', '\u27b5', '\u2620', '\u2625', '\u25fc', '\u25fb'
          // ].forEach( (ch, i) => {
          //   this.draw(i + 127, ch);
          // });
          [
              '\u2302',
              '\u00C7',
              '\u00FC',
              '\u00E9',
              '\u00E2',
              '\u00E4',
              '\u00E0',
              '\u00E5',
              '\u00E7',
              '\u00EA',
              '\u00EB',
              '\u00E8',
              '\u00EF',
              '\u00EE',
              '\u00EC',
              '\u00C4',
              '\u00C5',
              '\u00C9',
              '\u00E6',
              '\u00C6',
              '\u00F4',
              '\u00F6',
              '\u00F2',
              '\u00FB',
              '\u00F9',
              '\u00FF',
              '\u00D6',
              '\u00DC',
              '\u00A2',
              '\u00A3',
              '\u00A5',
              '\u20A7',
              '\u0192',
              '\u00E1',
              '\u00ED',
              '\u00F3',
              '\u00FA',
              '\u00F1',
              '\u00D1',
              '\u00AA',
              '\u00BA',
              '\u00BF',
              '\u2310',
              '\u00AC',
              '\u00BD',
              '\u00BC',
              '\u00A1',
              '\u00AB',
              '\u00BB',
              '\u2591',
              '\u2592',
              '\u2593',
              '\u2502',
              '\u2524',
              '\u2561',
              '\u2562',
              '\u2556',
              '\u2555',
              '\u2563',
              '\u2551',
              '\u2557',
              '\u255D',
              '\u255C',
              '\u255B',
              '\u2510',
              '\u2514',
              '\u2534',
              '\u252C',
              '\u251C',
              '\u2500',
              '\u253C',
              '\u255E',
              '\u255F',
              '\u255A',
              '\u2554',
              '\u2569',
              '\u2566',
              '\u2560',
              '\u2550',
              '\u256C',
              '\u2567',
              '\u2568',
              '\u2564',
              '\u2565',
              '\u2559',
              '\u2558',
              '\u2552',
              '\u2553',
              '\u256B',
              '\u256A',
              '\u2518',
              '\u250C',
              '\u2588',
              '\u2584',
              '\u258C',
              '\u2590',
              '\u2580',
              '\u03B1',
              '\u00DF',
              '\u0393',
              '\u03C0',
              '\u03A3',
              '\u03C3',
              '\u00B5',
              '\u03C4',
              '\u03A6',
              '\u0398',
              '\u03A9',
              '\u03B4',
              '\u221E',
              '\u03C6',
              '\u03B5',
              '\u2229', // n
              '\u2261',
              '\u00B1',
              '\u2265',
              '\u2264',
              '\u2320',
              '\u2321',
              '\u00F7',
              '\u2248',
              '\u00B0',
              '\u2219',
              '\u00B7',
              '\u221A',
              '\u207F',
              '\u00B2',
              '\u25A0',
              '\u00A0',
          ].forEach((ch, i) => {
              glyphs.draw(i + 127, ch);
          });
      }
  }

  const VS = `
#version 300 es

in vec2 position;
in uvec2 offset;
in uint fg;
in uint bg;
in uint glyph;

out vec2 fsOffset;
out vec4 fgRgb;
out vec4 bgRgb;
flat out uvec2 fontPos;

uniform int depth;

void main() {
	float fdepth = float(depth) / 255.0;
	gl_Position = vec4(position, fdepth, 1.0);

	float fgr = float((fg & uint(0xF000)) >> 12);
	float fgg = float((fg & uint(0x0F00)) >> 8);
	float fgb = float((fg & uint(0x00F0)) >> 4);
	float fga = float((fg & uint(0x000F)) >> 0);
	fgRgb = vec4(fgr, fgg, fgb, fga) / 15.0;
  
	float bgr = float((bg & uint(0xF000)) >> 12);
	float bgg = float((bg & uint(0x0F00)) >> 8);
	float bgb = float((bg & uint(0x00F0)) >> 4);
	float bga = float((bg & uint(0x000F)) >> 0);
	bgRgb = vec4(bgr, bgg, bgb, bga) / 15.0;

	uint glyphX = (glyph & uint(0xF));
	uint glyphY = (glyph >> 4);
	fontPos = uvec2(glyphX, glyphY);

	fsOffset = vec2(offset);
}`.trim();
  const FS = `
#version 300 es
precision highp float;

in vec2 fsOffset;
in vec4 fgRgb;
in vec4 bgRgb;
flat in uvec2 fontPos;

out vec4 fragColor;

uniform sampler2D font;
uniform uvec2 tileSize;

void main() {
	uvec2 fontPx = (tileSize * fontPos) + uvec2(vec2(tileSize) * fsOffset);
	vec4 texel = texelFetch(font, ivec2(fontPx), 0).rgba;

	fragColor = vec4(mix(bgRgb.rgb, fgRgb.rgb, texel.rgb), mix(bgRgb.a, fgRgb.a, texel.r));
}`.trim();

  class Event {
      constructor(type, opts) {
          this.target = null; // current handler information
          // Used in UI
          this.defaultPrevented = false;
          this.propagationStopped = false;
          // immediatePropagationStopped = false;
          // Key Event
          this.key = '';
          this.code = '';
          this.shiftKey = false;
          this.ctrlKey = false;
          this.altKey = false;
          this.metaKey = false;
          // Dir Event extends KeyEvent
          this.dir = null;
          // Mouse Event
          this.x = -1;
          this.y = -1;
          this.clientX = -1;
          this.clientY = -1;
          // Tick Event
          this.dt = 0;
          this.reset(type, opts);
      }
      doDefault() {
          this.defaultPrevented = false;
      }
      preventDefault() {
          this.defaultPrevented = true;
      }
      propagate() {
          this.propagationStopped = false;
      }
      stopPropagation() {
          this.propagationStopped = true;
      }
      // stopImmediatePropagation() {
      //     this.immediatePropagationStopped = true;
      // }
      reset(type, opts) {
          this.type = type;
          this.target = null;
          this.defaultPrevented = false;
          this.propagationStopped = false;
          this.shiftKey = false;
          this.ctrlKey = false;
          this.altKey = false;
          this.metaKey = false;
          this.key = '';
          this.code = '';
          this.x = -1;
          this.y = -1;
          this.dir = null;
          this.dt = 0;
          this.target = null;
          if (opts) {
              Object.assign(this, opts);
          }
      }
      clone() {
          const other = new Event(this.type, this);
          return other;
      }
      dispatch(handler) {
          if (this.type === KEYPRESS) {
              // this.propagationStopped = true;
              if (this.dir) {
                  handler.emit('dir', this);
              }
              if (!this.propagationStopped) {
                  handler.emit(this.key, this);
              }
              if (this.code !== this.key) {
                  if (!this.propagationStopped) {
                      handler.emit(this.code, this);
                  }
              }
              if (this.defaultPrevented || this.propagationStopped)
                  return;
          }
          handler.emit(this.type, this);
      }
  }
  // let IOMAP: IOMap = {};
  const DEAD_EVENTS = [];
  const KEYPRESS = 'keypress';
  const MOUSEMOVE = 'mousemove';
  const CLICK = 'click';
  const TICK = 'tick';
  const MOUSEUP = 'mouseup';
  const STOP = 'stop';
  const CONTROL_CODES = [
      'ShiftLeft',
      'ShiftRight',
      'ControlLeft',
      'ControlRight',
      'AltLeft',
      'AltRight',
      'MetaLeft',
      'MetaRight',
      //
      'Enter',
      'Delete',
      'Backspace',
      'Tab',
      'CapsLock',
      'Escape',
  ];
  function isControlCode(e) {
      if (typeof e === 'string') {
          return CONTROL_CODES.includes(e);
      }
      return CONTROL_CODES.includes(e.code);
  }
  // type EventHandler = (event: Event) => void;
  // export function setKeymap(keymap: IOMap) {
  //     IOMAP = keymap;
  // }
  // export function handlerFor(ev: EventType, km: Record<string, any>): any | null {
  //     let c;
  //     if ('dir' in ev) {
  //         c = km.dir || km.keypress;
  //     } else if (ev.type === KEYPRESS) {
  //         c = km[ev.key!] || km[ev.code!] || km.keypress;
  //     } else if (km[ev.type]) {
  //         c = km[ev.type];
  //     }
  //     if (!c) {
  //         c = km.dispatch;
  //     }
  //     return c || null;
  // }
  // export async function dispatchEvent(ev: Event, km: IOMap, thisArg?: any) {
  //     let result;
  //     km = km || IOMAP;
  //     if (ev.type === STOP) {
  //         recycleEvent(ev);
  //         return true; // Should stop loops, etc...
  //     }
  //     const handler = handlerFor(ev, km);
  //     if (handler) {
  //         // if (typeof c === 'function') {
  //         result = await handler.call(thisArg || km, ev);
  //         // } else if (commands[c]) {
  //         //     result = await commands[c](ev);
  //         // } else {
  //         //     Utils.WARN('No command found: ' + c);
  //         // }
  //     }
  //     // TODO - what is this here for?
  //     // if ('next' in km && km.next === false) {
  //     //     result = false;
  //     // }
  //     recycleEvent(ev);
  //     return result;
  // }
  function recycleEvent(ev) {
      DEAD_EVENTS.push(ev);
  }
  // STOP
  function makeStopEvent() {
      return makeCustomEvent(STOP);
  }
  // CUSTOM
  function makeCustomEvent(type, opts) {
      const ev = DEAD_EVENTS.pop() || null;
      if (!ev)
          return new Event(type, opts);
      ev.reset(type, opts);
      return ev;
  }
  // TICK
  function makeTickEvent(dt) {
      const ev = makeCustomEvent(TICK);
      ev.dt = dt;
      return ev;
  }
  // KEYBOARD
  function makeKeyEvent(e) {
      let key = e.key;
      let code = e.code; // .toLowerCase();
      if (e.shiftKey) {
          key = key.toUpperCase();
          // code = code.toUpperCase();
      }
      if (e.ctrlKey) {
          key = '^' + key;
          // code = '^' + code;
      }
      if (e.metaKey) {
          key = '#' + key;
          // code = '#' + code;
      }
      if (e.altKey) ;
      const ev = DEAD_EVENTS.pop() || new Event(KEYPRESS);
      ev.shiftKey = e.shiftKey;
      ev.ctrlKey = e.ctrlKey;
      ev.altKey = e.altKey;
      ev.metaKey = e.metaKey;
      ev.type = KEYPRESS;
      ev.defaultPrevented = false;
      ev.key = key;
      ev.code = code;
      ev.x = -1;
      ev.y = -1;
      ev.clientX = -1;
      ev.clientY = -1;
      ev.dir = keyCodeDirection(e.code);
      ev.dt = 0;
      ev.target = null;
      return ev;
  }
  function keyCodeDirection(key) {
      const lowerKey = key.toLowerCase();
      if (lowerKey === 'arrowup') {
          return [0, -1];
      }
      else if (lowerKey === 'arrowdown') {
          return [0, 1];
      }
      else if (lowerKey === 'arrowleft') {
          return [-1, 0];
      }
      else if (lowerKey === 'arrowright') {
          return [1, 0];
      }
      return null;
  }
  function ignoreKeyEvent(e) {
      return CONTROL_CODES.includes(e.code);
  }
  // MOUSE
  function makeMouseEvent(e, x, y) {
      const ev = DEAD_EVENTS.pop() || new Event(e.type);
      ev.shiftKey = e.shiftKey;
      ev.ctrlKey = e.ctrlKey;
      ev.altKey = e.altKey;
      ev.metaKey = e.metaKey;
      ev.type = e.type || 'mousemove';
      if (e.buttons && e.type !== 'mouseup') {
          ev.type = CLICK;
      }
      ev.defaultPrevented = false;
      ev.key = '';
      ev.code = '';
      ev.x = x;
      ev.y = y;
      ev.clientX = e.clientX;
      ev.clientY = e.clientY;
      ev.dir = null;
      ev.dt = 0;
      ev.target = null;
      return ev;
  }
  class Queue {
      constructor() {
          this.lastClick = { x: -1, y: -1 };
          this._events = [];
      }
      get length() {
          return this._events.length;
      }
      clear() {
          this._events.length = 0;
      }
      enqueue(ev) {
          if (this._events.length) {
              const last = this._events[this._events.length - 1];
              if (last.type === ev.type) {
                  if (last.type === MOUSEMOVE) {
                      last.x = ev.x;
                      last.y = ev.y;
                      recycleEvent(ev);
                      return;
                  }
              }
          }
          // Keep clicks down to one per cell if holding down mouse button
          if (ev.type === CLICK) {
              if (this.lastClick.x == ev.x && this.lastClick.y == ev.y) {
                  if (this._events.findIndex((e) => e.type === CLICK) >= 0) {
                      recycleEvent(ev);
                      return;
                  }
              }
              this.lastClick.x = ev.x;
              this.lastClick.y = ev.y;
          }
          else if (ev.type == MOUSEUP) {
              this.lastClick.x = -1;
              this.lastClick.y = -1;
              recycleEvent(ev);
              return;
          }
          if (ev.type === TICK) {
              const first = this._events[0];
              if (first && first.type === TICK) {
                  first.dt += ev.dt;
                  recycleEvent(ev);
                  return;
              }
              this._events.unshift(ev); // ticks go first
          }
          else {
              this._events.push(ev);
          }
      }
      dequeue() {
          return this._events.shift();
      }
      peek() {
          return this._events[0];
      }
  }

  // Based on: https://github.com/ondras/fastiles/blob/master/ts/scene.ts (v2.1.0)
  const VERTICES_PER_TILE = 6;
  class NotSupportedError extends Error {
      constructor(...params) {
          // Pass remaining arguments (including vendor specific ones) to parent constructor
          super(...params);
          // Maintains proper stack trace for where our error was thrown (only available on V8)
          // @ts-ignore
          if (Error.captureStackTrace) {
              // @ts-ignore
              Error.captureStackTrace(this, NotSupportedError);
          }
          this.name = 'NotSupportedError';
      }
  }
  class Canvas {
      constructor(options) {
          this.mouse = { x: -1, y: -1 };
          this._renderRequested = false;
          this._autoRender = true;
          this._width = 50;
          this._height = 25;
          this._layers = [];
          if (!options.glyphs)
              throw new Error('You must supply glyphs for the canvas.');
          this._node = this._createNode();
          this._createContext();
          this._configure(options);
      }
      get node() {
          return this._node;
      }
      get width() {
          return this._width;
      }
      get height() {
          return this._height;
      }
      get tileWidth() {
          return this._glyphs.tileWidth;
      }
      get tileHeight() {
          return this._glyphs.tileHeight;
      }
      get pxWidth() {
          return this.node.clientWidth;
      }
      get pxHeight() {
          return this.node.clientHeight;
      }
      get glyphs() {
          return this._glyphs;
      }
      set glyphs(glyphs) {
          this._setGlyphs(glyphs);
      }
      layer(depth = 0) {
          let layer = this._layers.find((l) => l.depth === depth);
          if (layer)
              return layer;
          layer = new Layer(this, depth);
          this._layers.push(layer);
          this._layers.sort((a, b) => a.depth - b.depth);
          return layer;
      }
      clearLayer(depth = 0) {
          const layer = this._layers.find((l) => l.depth === depth);
          if (layer)
              layer.clear();
      }
      removeLayer(depth = 0) {
          const index = this._layers.findIndex((l) => l.depth === depth);
          if (index > -1) {
              this._layers.splice(index, 1);
          }
      }
      _createNode() {
          return document.createElement('canvas');
      }
      _configure(options) {
          this._width = options.width || this._width;
          this._height = options.height || this._height;
          this._autoRender = options.render !== false;
          this._setGlyphs(options.glyphs);
          this.bg = from$2(options.bg || BLACK);
          if (options.div) {
              let el;
              if (typeof options.div === 'string') {
                  el = document.getElementById(options.div);
                  if (!el) {
                      console.warn('Failed to find parent element by ID: ' + options.div);
                  }
              }
              else {
                  el = options.div;
              }
              if (el && el.appendChild) {
                  el.appendChild(this.node);
              }
          }
      }
      _setGlyphs(glyphs) {
          if (glyphs === this._glyphs)
              return false;
          this._glyphs = glyphs;
          this.resize(this._width, this._height);
          const gl = this._gl;
          const uniforms = this._uniforms;
          gl.uniform2uiv(uniforms['tileSize'], [this.tileWidth, this.tileHeight]);
          this._uploadGlyphs();
          return true;
      }
      resize(width, height) {
          this._width = width;
          this._height = height;
          const node = this.node;
          node.width = this._width * this.tileWidth;
          node.height = this._height * this.tileHeight;
          const gl = this._gl;
          // const uniforms = this._uniforms;
          gl.viewport(0, 0, this.node.width, this.node.height);
          // gl.uniform2ui(uniforms["viewportSize"], this.node.width, this.node.height);
          this._createGeometry();
          this._createData();
      }
      _requestRender() {
          if (this._renderRequested)
              return;
          this._renderRequested = true;
          if (!this._autoRender)
              return;
          requestAnimationFrame(() => this._render());
      }
      hasXY(x, y) {
          return x >= 0 && y >= 0 && x < this.width && y < this.height;
      }
      toX(x) {
          return Math.floor((this.width * x) / this.node.clientWidth);
      }
      toY(y) {
          return Math.floor((this.height * y) / this.node.clientHeight);
      }
      get onclick() {
          throw new Error('Write only.');
      }
      set onclick(fn) {
          if (fn) {
              this.node.onclick = (e) => {
                  const x = this.toX(e.offsetX);
                  const y = this.toY(e.offsetY);
                  const ev = makeMouseEvent(e, x, y);
                  fn(ev);
                  e.preventDefault();
              };
          }
          else {
              this.node.onclick = null;
          }
      }
      get onmousemove() {
          throw new Error('write only.');
      }
      set onmousemove(fn) {
          if (fn) {
              this.node.onmousemove = (e) => {
                  const x = this.toX(e.offsetX);
                  const y = this.toY(e.offsetY);
                  if (x == this.mouse.x && y == this.mouse.y)
                      return;
                  this.mouse.x = x;
                  this.mouse.y = y;
                  const ev = makeMouseEvent(e, x, y);
                  fn(ev);
                  e.preventDefault();
              };
          }
          else {
              this.node.onmousemove = null;
          }
      }
      get onmouseup() {
          throw new Error('write only.');
      }
      set onmouseup(fn) {
          if (fn) {
              this.node.onmouseup = (e) => {
                  const x = this.toX(e.offsetX);
                  const y = this.toY(e.offsetY);
                  const ev = makeMouseEvent(e, x, y);
                  fn(ev);
                  e.preventDefault();
              };
          }
          else {
              this.node.onmouseup = null;
          }
      }
      get onkeydown() {
          throw new Error('write only.');
      }
      set onkeydown(fn) {
          if (fn) {
              this.node.tabIndex = 0;
              this.node.onkeydown = (e) => {
                  e.stopPropagation();
                  const ev = makeKeyEvent(e);
                  fn(ev);
                  e.preventDefault();
              };
          }
          else {
              this.node.onkeydown = null;
          }
      }
      _createContext() {
          let gl = this.node.getContext('webgl2');
          if (!gl) {
              throw new NotSupportedError('WebGL 2 not supported');
          }
          this._gl = gl;
          this._buffers = {};
          this._attribs = {};
          this._uniforms = {};
          const p = createProgram(gl, VS, FS);
          gl.useProgram(p);
          const attributeCount = gl.getProgramParameter(p, gl.ACTIVE_ATTRIBUTES);
          for (let i = 0; i < attributeCount; i++) {
              gl.enableVertexAttribArray(i);
              let info = gl.getActiveAttrib(p, i);
              this._attribs[info.name] = i;
          }
          const uniformCount = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
          for (let i = 0; i < uniformCount; i++) {
              let info = gl.getActiveUniform(p, i);
              this._uniforms[info.name] = gl.getUniformLocation(p, info.name);
          }
          gl.uniform1i(this._uniforms['font'], 0);
          this._texture = createTexture(gl);
      }
      _createGeometry() {
          const gl = this._gl;
          this._buffers.position && gl.deleteBuffer(this._buffers.position);
          this._buffers.uv && gl.deleteBuffer(this._buffers.uv);
          let buffers = createGeometry(gl, this._attribs, this.width, this.height);
          Object.assign(this._buffers, buffers);
      }
      _createData() {
          const gl = this._gl;
          const attribs = this._attribs;
          this._buffers.fg && gl.deleteBuffer(this._buffers.fg);
          this._buffers.bg && gl.deleteBuffer(this._buffers.bg);
          this._buffers.glyph && gl.deleteBuffer(this._buffers.glyph);
          if (this._layers.length) {
              this._layers.forEach((l) => l.detach());
              this._layers.length = 0;
          }
          const fg = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, fg);
          gl.vertexAttribIPointer(attribs['fg'], 1, gl.UNSIGNED_SHORT, 0, 0);
          const bg = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, bg);
          gl.vertexAttribIPointer(attribs['bg'], 1, gl.UNSIGNED_SHORT, 0, 0);
          const glyph = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, glyph);
          gl.vertexAttribIPointer(attribs['glyph'], 1, gl.UNSIGNED_BYTE, 0, 0);
          Object.assign(this._buffers, { fg, bg, glyph });
      }
      _uploadGlyphs() {
          if (!this._glyphs.needsUpdate)
              return;
          const gl = this._gl;
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, this._texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._glyphs.node);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          this._requestRender();
          this._glyphs.needsUpdate = false;
      }
      draw(x, y, glyph, fg, bg) {
          this.layer(0).draw(x, y, glyph, fg, bg);
      }
      render(buffer) {
          if (buffer) {
              this.layer().copy(buffer);
          }
          this._requestRender();
      }
      _render() {
          const gl = this._gl;
          if (this._glyphs.needsUpdate) {
              // auto keep glyphs up to date
              this._uploadGlyphs();
          }
          else if (!this._renderRequested) {
              return;
          }
          this._renderRequested = false;
          // clear to bg color?
          gl.enable(gl.BLEND);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
          gl.clearColor(this.bg.r / 100, this.bg.g / 100, this.bg.b / 100, this.bg.a / 100);
          gl.clear(gl.COLOR_BUFFER_BIT);
          // sort layers?
          this._layers.forEach((layer) => {
              if (layer.empty)
                  return;
              // set depth
              gl.uniform1i(this._uniforms['depth'], layer.depth);
              gl.bindBuffer(gl.ARRAY_BUFFER, this._buffers.fg);
              gl.bufferData(gl.ARRAY_BUFFER, layer.fg, gl.DYNAMIC_DRAW);
              gl.bindBuffer(gl.ARRAY_BUFFER, this._buffers.bg);
              gl.bufferData(gl.ARRAY_BUFFER, layer.bg, gl.DYNAMIC_DRAW);
              gl.bindBuffer(gl.ARRAY_BUFFER, this._buffers.glyph);
              gl.bufferData(gl.ARRAY_BUFFER, layer.glyph, gl.DYNAMIC_DRAW);
              gl.drawArrays(gl.TRIANGLES, 0, this._width * this._height * VERTICES_PER_TILE);
          });
      }
  }
  function withImage(image) {
      let opts = {};
      if (typeof image === 'string') {
          opts.glyphs = Glyphs.fromImage(image);
      }
      else if (image instanceof HTMLImageElement) {
          opts.glyphs = Glyphs.fromImage(image);
      }
      else {
          if (!image.image)
              throw new Error('You must supply the image.');
          Object.assign(opts, image);
          opts.glyphs = Glyphs.fromImage(image.image);
      }
      return new Canvas(opts);
  }
  function withFont(src) {
      if (typeof src === 'string') {
          src = { font: src };
      }
      src.glyphs = Glyphs.fromFont(src);
      return new Canvas(src);
  }
  // Copy of: https://github.com/ondras/fastiles/blob/master/ts/utils.ts (v2.1.0)
  function createProgram(gl, ...sources) {
      const p = gl.createProgram();
      [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, index) => {
          const shader = gl.createShader(type);
          gl.shaderSource(shader, sources[index]);
          gl.compileShader(shader);
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
              throw new Error(gl.getShaderInfoLog(shader));
          }
          gl.attachShader(p, shader);
      });
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
          throw new Error(gl.getProgramInfoLog(p));
      }
      return p;
  }
  function createTexture(gl) {
      let t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      return t;
  }
  // x, y offsets for 6 verticies (2 triangles) in square
  const QUAD = [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1];
  function createGeometry(gl, attribs, width, height) {
      let tileCount = width * height;
      let positionData = new Float32Array(tileCount * QUAD.length);
      let offsetData = new Uint8Array(tileCount * QUAD.length);
      for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
              const index = (x + y * width) * QUAD.length;
              positionData.set(QUAD.map((v, i) => {
                  if (i % 2) {
                      // y
                      return 1 - (2 * (y + v)) / height;
                  }
                  else {
                      return (2 * (x + v)) / width - 1;
                  }
              }), index);
              offsetData.set(QUAD, index);
          }
      }
      const position = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, position);
      gl.vertexAttribPointer(attribs['position'], 2, gl.FLOAT, false, 0, 0);
      gl.bufferData(gl.ARRAY_BUFFER, positionData, gl.STATIC_DRAW);
      const uv = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, uv);
      gl.vertexAttribIPointer(attribs['offset'], 2, gl.UNSIGNED_BYTE, 0, 0);
      gl.bufferData(gl.ARRAY_BUFFER, offsetData, gl.STATIC_DRAW);
      return { position, uv };
  }

  class Layer extends BufferBase {
      constructor(canvas, depth = 0) {
          super(canvas.width, canvas.height);
          this._empty = true;
          this.canvas = canvas;
          this.resize(canvas.width, canvas.height);
          this._depth = depth;
      }
      get width() {
          return this.canvas.width;
      }
      get height() {
          return this.canvas.height;
      }
      get depth() {
          return this._depth;
      }
      get empty() {
          return this._empty;
      }
      detach() {
          // @ts-ignore
          this.canvas = null;
      }
      resize(width, height) {
          const size = width * height * VERTICES_PER_TILE;
          if (!this.fg || this.fg.length !== size) {
              this.fg = new Uint16Array(size);
              this.bg = new Uint16Array(size);
              this.glyph = new Uint8Array(size);
          }
      }
      clear() {
          this.fg.fill(0);
          this.bg.fill(0);
          this.glyph.fill(0);
          this._empty = true;
      }
      get(x, y) {
          const index = x * y * VERTICES_PER_TILE;
          return {
              ch: this.fromGlyph(this.glyph[index]),
              fg: this.fg[index],
              bg: this.bg[index],
          };
      }
      set(x, y, glyph = null, fg = 0xfff, bg = -1) {
          return this.draw(x, y, glyph, fg, bg);
      }
      draw(x, y, glyph = null, fg = 0xfff, bg = -1) {
          const index = x + y * this.canvas.width;
          if (typeof glyph === 'string') {
              glyph = this.toGlyph(glyph);
          }
          else if (glyph === null) {
              glyph = this.glyph[index];
          }
          fg = from$2(fg).toInt();
          bg = from$2(bg).toInt();
          this._set(index, glyph, fg, bg);
          if (glyph || bg || fg) {
              this._empty = false;
              this.canvas._requestRender();
          }
          return this;
      }
      _set(index, glyph, fg, bg) {
          index *= VERTICES_PER_TILE;
          glyph = glyph & 0xff;
          bg = bg & 0xffff;
          fg = fg & 0xffff;
          for (let i = 0; i < VERTICES_PER_TILE; ++i) {
              this.glyph[index + i] = glyph;
              this.fg[index + i] = fg;
              this.bg[index + i] = bg;
          }
      }
      nullify(...args) {
          if (args.length === 2) {
              this._set(args[0] * args[1], 0, 0, 0);
          }
          else {
              this.glyph.fill(0);
              this.fg.fill(0);
              this.bg.fill(0);
          }
      }
      dump() {
          const data = [];
          let header = '    ';
          for (let x = 0; x < this.width; ++x) {
              if (x % 10 == 0)
                  header += ' ';
              header += x % 10;
          }
          data.push(header);
          data.push('');
          for (let y = 0; y < this.height; ++y) {
              let line = `${('' + y).padStart(2)}] `;
              for (let x = 0; x < this.width; ++x) {
                  if (x % 10 == 0)
                      line += ' ';
                  const data = this.get(x, y);
                  let glyph = data.ch;
                  if (glyph === null)
                      glyph = ' ';
                  line += glyph;
              }
              data.push(line);
          }
          console.log(data.join('\n'));
      }
      copy(buffer) {
          if (buffer.width !== this.width || buffer.height !== this.height) {
              console.log('auto resizing buffer');
              buffer.resize(this.width, this.height);
          }
          if (!this.canvas) {
              throw new Error('Layer is detached.  Did you resize the canvas?');
          }
          buffer._data.forEach((mixer, i) => {
              let glyph = mixer.ch ? this.canvas.glyphs.forChar(mixer.ch) : 0;
              this._set(i, glyph, mixer.fg.toInt(), mixer.bg.toInt());
          });
          this._empty = false;
          this.canvas._requestRender();
      }
      copyTo(buffer) {
          buffer.resize(this.width, this.height);
          for (let y = 0; y < this.height; ++y) {
              for (let x = 0; x < this.width; ++x) {
                  const index = (x + y * this.width) * VERTICES_PER_TILE;
                  buffer.draw(x, y, this.toChar(this.glyph[index]), this.fg[index], this.bg[index]);
              }
          }
      }
      toGlyph(ch) {
          return this.canvas.glyphs.forChar(ch);
      }
      fromGlyph(n) {
          return this.canvas.glyphs.toChar(n);
      }
      toChar(n) {
          return this.canvas.glyphs.toChar(n);
      }
  }

  class Buffer extends Buffer$1 {
      constructor(layer) {
          super(layer.width, layer.height);
          this._layer = layer;
          layer.copyTo(this);
      }
      // get canvas() { return this._target; }
      toGlyph(ch) {
          if (typeof ch === 'number')
              return ch;
          return this._layer.toGlyph(ch);
      }
      render() {
          this._layer.copy(this);
          return this;
      }
      copyFromLayer() {
          this._layer.copyTo(this);
          return this;
      }
  }

  function make$6(...args) {
      let width = args[0];
      let height = args[1];
      let opts = args[2];
      if (args.length == 1) {
          opts = args[0];
          height = opts.height || 34;
          width = opts.width || 80;
      }
      opts = opts || { font: 'monospace' };
      let glyphs;
      if (opts.image) {
          glyphs = Glyphs.fromImage(opts.image);
      }
      else {
          glyphs = Glyphs.fromFont(opts);
      }
      const canvas = new Canvas({ width, height, glyphs });
      if (opts.div) {
          let el;
          if (typeof opts.div === 'string') {
              el = document.getElementById(opts.div);
              if (!el) {
                  console.warn('Failed to find parent element by ID: ' + opts.div);
              }
          }
          else {
              el = opts.div;
          }
          if (el && el.appendChild) {
              el.appendChild(canvas.node);
          }
      }
      return canvas;
  }

  var index$5 = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	Buffer: Buffer,
  	Canvas: Canvas,
  	Glyphs: Glyphs,
  	Layer: Layer,
  	NotSupportedError: NotSupportedError,
  	QUAD: QUAD,
  	VERTICES_PER_TILE: VERTICES_PER_TILE,
  	createProgram: createProgram,
  	initGlyphs: initGlyphs,
  	make: make$6,
  	withFont: withFont,
  	withImage: withImage
  });

  class Sprite {
      constructor(ch, fg, bg, opacity = 100) {
          if (!ch)
              ch = null;
          this.ch = ch;
          this.fg = from$2(fg);
          this.bg = from$2(bg);
          this.opacity = clamp(opacity, 0, 100);
      }
      clone() {
          return new Sprite(this.ch, this.fg, this.bg, this.opacity);
      }
      toString() {
          const parts = [];
          if (this.ch)
              parts.push('ch: ' + this.ch);
          if (!this.fg.isNull())
              parts.push('fg: ' + this.fg.toString());
          if (!this.bg.isNull())
              parts.push('bg: ' + this.bg.toString());
          if (this.opacity !== 100)
              parts.push('opacity: ' + this.opacity);
          return '{ ' + parts.join(', ') + ' }';
      }
  }
  const sprites = {};
  function make$5(...args) {
      let ch = null, fg = -1, bg = -1, opacity;
      if (args.length == 0) {
          return new Sprite(null, -1, -1);
      }
      else if (args.length == 1 && Array.isArray(args[0])) {
          args = args[0];
      }
      if (args.length > 3) {
          opacity = args[3];
          args.pop();
      }
      else if (args.length == 2 &&
          typeof args[1] == 'number' &&
          args[0].length > 1) {
          opacity = args.pop();
      }
      if (args.length > 1) {
          ch = args[0] || null;
          fg = args[1];
          bg = args[2];
      }
      else {
          if (typeof args[0] === 'string' && args[0].length == 1) {
              ch = args[0];
              fg = 'white'; // white is default?
          }
          else if ((typeof args[0] === 'string' && args[0].length > 1) ||
              typeof args[0] === 'number') {
              bg = args[0];
          }
          else if (args[0] instanceof Color) {
              bg = args[0];
          }
          else {
              const sprite = args[0];
              ch = sprite.ch || null;
              fg = sprite.fg || -1;
              bg = sprite.bg || -1;
              opacity = sprite.opacity;
          }
      }
      if (typeof fg === 'string')
          fg = from$2(fg);
      else if (Array.isArray(fg))
          fg = make$9(fg);
      else if (fg === undefined || fg === null)
          fg = -1;
      if (typeof bg === 'string')
          bg = from$2(bg);
      else if (Array.isArray(bg))
          bg = make$9(bg);
      else if (bg === undefined || bg === null)
          bg = -1;
      return new Sprite(ch, fg, bg, opacity);
  }
  function from$1(config) {
      if (typeof config === 'string') {
          const sprite = sprites[config];
          if (!sprite)
              throw new Error('Failed to find sprite: ' + config);
          return sprite;
      }
      return make$5(config);
  }
  function install$1$2(name, ...args) {
      let sprite;
      // @ts-ignore
      sprite = make$5(...args);
      sprite.name = name;
      sprites[name] = sprite;
      return sprite;
  }

  var index$4 = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	Mixer: Mixer,
  	Sprite: Sprite,
  	from: from$1,
  	install: install$1$2,
  	make: make$5,
  	makeMixer: makeMixer,
  	sprites: sprites
  });

  var types$1 = /*#__PURE__*/Object.freeze({
  	__proto__: null
  });

  class Cache {
      constructor(opts = {}) {
          this._archive = [];
          this._confirmed = [];
          this.archiveLen = 30;
          this.msgWidth = 80;
          this._nextWriteIndex = 0;
          // _needsUpdate = true;
          this._combatMsg = null;
          this.archiveLen = opts.length || 30;
          this.msgWidth = opts.width || 80;
          this._reverse = opts.reverseMultiLine || false;
          this.clear();
      }
      clear() {
          for (let i = 0; i < this.archiveLen; ++i) {
              this._archive[i] = null;
              this._confirmed[i] = false;
          }
          this._nextWriteIndex = 0;
          // this._needsUpdate = true;
          this._combatMsg = null;
      }
      // get needsUpdate(): boolean {
      //     return this._needsUpdate;
      // }
      // set needsUpdate(needs: boolean) {
      //     this._needsUpdate = needs;
      // }
      // function messageWithoutCaps(msg, requireAcknowledgment) {
      _addMessageLine(msg) {
          if (!length(msg)) {
              return;
          }
          // Add the message to the archive.
          this._archive[this._nextWriteIndex] = msg;
          this._confirmed[this._nextWriteIndex] = false;
          this._nextWriteIndex = (this._nextWriteIndex + 1) % this.archiveLen;
      }
      add(msg) {
          this.commitCombatMessage();
          this._addMessage(msg);
      }
      _addMessage(msg) {
          msg = capitalize(msg);
          // // Implement the American quotation mark/period/comma ordering rule.
          // for (i=0; text.text[i] && text.text[i+1]; i++) {
          //     if (text.charCodeAt(i) === COLOR_ESCAPE) {
          //         i += 4;
          //     } else if (text.text[i] === '"'
          //                && (text.text[i+1] === '.' || text.text[i+1] === ','))
          // 		{
          // 			const replace = text.text[i+1] + '"';
          // 			text.spliceRaw(i, 2, replace);
          //     }
          // }
          const lines = splitIntoLines(msg, this.msgWidth);
          if (this._reverse) {
              lines.reverse();
          }
          lines.forEach((l) => this._addMessageLine(l));
          // display the message:
          // if (GAME.playbackMode) {
          // 	GAME.playbackDelayThisTurn += GAME.playbackDelayPerTurn * 5;
          // }
      }
      addCombat(msg) {
          this._addCombatMessage(msg);
      }
      _addCombatMessage(msg) {
          if (!this._combatMsg) {
              this._combatMsg = msg;
          }
          else {
              this._combatMsg += ', ' + capitalize(msg);
          }
      }
      commitCombatMessage() {
          if (!this._combatMsg)
              return false;
          this._addMessage(this._combatMsg + '.');
          this._combatMsg = null;
          return true;
      }
      confirmAll() {
          for (let i = 0; i < this._confirmed.length; i++) {
              this._confirmed[i] = true;
          }
      }
      forEach(fn) {
          this.commitCombatMessage();
          for (let i = 0; i < this.archiveLen; ++i) {
              const n = (this.archiveLen - i + this._nextWriteIndex - 1) %
                  this.archiveLen;
              const msg = this._archive[n];
              if (!msg)
                  return;
              if (fn(msg, this._confirmed[n], i) === false)
                  return;
          }
      }
      get length() {
          let count = 0;
          this.forEach(() => ++count);
          return count;
      }
  }

  var message = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	Cache: Cache
  });

  class Blob {
      constructor(opts = {}) {
          this.options = {
              rng: random$2,
              rounds: 5,
              minWidth: 10,
              minHeight: 10,
              maxWidth: 40,
              maxHeight: 20,
              percentSeeded: 50,
              birthParameters: 'ffffffttt',
              survivalParameters: 'ffffttttt',
          };
          Object.assign(this.options, opts);
          this.options.birthParameters = this.options.birthParameters.toLowerCase();
          this.options.survivalParameters = this.options.survivalParameters.toLowerCase();
          if (this.options.minWidth >= this.options.maxWidth) {
              this.options.minWidth = Math.round(0.75 * this.options.maxWidth);
              this.options.maxWidth = Math.round(1.25 * this.options.maxWidth);
          }
          if (this.options.minHeight >= this.options.maxHeight) {
              this.options.minHeight = Math.round(0.75 * this.options.maxHeight);
              this.options.maxHeight = Math.round(1.25 * this.options.maxHeight);
          }
      }
      carve(width, height, setFn) {
          let i, j, k;
          let blobNumber, blobSize, topBlobNumber, topBlobSize;
          let bounds = new Bounds(0, 0, 0, 0);
          const dest = alloc$1(width, height);
          const maxWidth = Math.min(width, this.options.maxWidth);
          const maxHeight = Math.min(height, this.options.maxHeight);
          const minWidth = Math.min(width, this.options.minWidth);
          const minHeight = Math.min(height, this.options.minHeight);
          const left = Math.floor((dest.width - maxWidth) / 2);
          const top = Math.floor((dest.height - maxHeight) / 2);
          let tries = 10;
          // Generate blobs until they satisfy the minBlobWidth and minBlobHeight restraints
          do {
              // Clear buffer.
              dest.fill(0);
              // Fill relevant portion with noise based on the percentSeeded argument.
              for (i = 0; i < maxWidth; i++) {
                  for (j = 0; j < maxHeight; j++) {
                      dest[i + left][j + top] = this.options.rng.chance(this.options.percentSeeded)
                          ? 1
                          : 0;
                  }
              }
              // Some iterations of cellular automata
              for (k = 0; k < this.options.rounds; k++) {
                  if (!this._cellularAutomataRound(dest)) {
                      k = this.options.rounds; // cellularAutomataRound did not make any changes
                  }
              }
              // Now to measure the result. These are best-of variables; start them out at worst-case values.
              topBlobSize = 0;
              topBlobNumber = 0;
              // Fill each blob with its own number, starting with 2 (since 1 means floor), and keeping track of the biggest:
              blobNumber = 2;
              for (i = 0; i < dest.width; i++) {
                  for (j = 0; j < dest.height; j++) {
                      if (dest[i][j] == 1) {
                          // an unmarked blob
                          // Mark all the cells and returns the total size:
                          blobSize = dest.floodFill(i, j, 1, blobNumber);
                          if (blobSize > topBlobSize) {
                              // if this blob is a new record
                              topBlobSize = blobSize;
                              topBlobNumber = blobNumber;
                          }
                          blobNumber++;
                      }
                  }
              }
              // Figure out the top blob's height and width:
              dest.valueBounds(topBlobNumber, bounds);
          } while ((bounds.width < minWidth ||
              bounds.height < minHeight ||
              topBlobNumber == 0) &&
              --tries);
          // Replace the winning blob with 1's, and everything else with 0's:
          for (i = 0; i < dest.width; i++) {
              for (j = 0; j < dest.height; j++) {
                  if (dest[i][j] == topBlobNumber) {
                      setFn(i, j);
                  }
              }
          }
          free$1(dest);
          // Populate the returned variables.
          return bounds;
      }
      _cellularAutomataRound(grid$1) {
          let i, j, nbCount, newX, newY;
          let dir;
          let buffer2;
          buffer2 = alloc$1(grid$1.width, grid$1.height);
          buffer2.copy(grid$1); // Make a backup of this in buffer2, so that each generation is isolated.
          let didSomething = false;
          for (i = 0; i < grid$1.width; i++) {
              for (j = 0; j < grid$1.height; j++) {
                  nbCount = 0;
                  for (dir = 0; dir < DIRS$2.length; dir++) {
                      newX = i + DIRS$2[dir][0];
                      newY = j + DIRS$2[dir][1];
                      if (grid$1.hasXY(newX, newY) && buffer2[newX][newY]) {
                          nbCount++;
                      }
                  }
                  if (!buffer2[i][j] &&
                      this.options.birthParameters[nbCount] == 't') {
                      grid$1[i][j] = 1; // birth
                      didSomething = true;
                  }
                  else if (buffer2[i][j] &&
                      this.options.survivalParameters[nbCount] == 't') ;
                  else {
                      grid$1[i][j] = 0; // death
                      didSomething = true;
                  }
              }
          }
          free$1(buffer2);
          return didSomething;
      }
  }
  function fillBlob(grid, opts = {}) {
      const blob = new Blob(opts);
      return blob.carve(grid.width, grid.height, (x, y) => (grid[x][y] = 1));
  }
  function make$4$1(opts = {}) {
      return new Blob(opts);
  }

  var blob = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	Blob: Blob,
  	fillBlob: fillBlob,
  	make: make$4$1
  });

  // const LIGHT_SMOOTHING_THRESHOLD = 150;       // light components higher than this magnitude will be toned down a little
  // export const config = (CONFIG.light = {
  //     INTENSITY_DARK: 20,
  //     INTENSITY_SHADOW: 50,
  // }); // less than 20% for highest color in rgb
  let LIGHT_COMPONENTS = make$9();
  class Light {
      constructor(color, radius = 1, fadeTo = 0, pass = false) {
          this.fadeTo = 0;
          this.passThroughActors = false;
          this.id = null;
          this.color = from$2(color); /* color */
          this.radius = make$c(radius);
          this.fadeTo = fadeTo;
          this.passThroughActors = pass; // generally no, but miner light does (TODO - string parameter?  'false' or 'true')
      }
      copy(other) {
          this.color = other.color;
          this.radius.copy(other.radius);
          this.fadeTo = other.fadeTo;
          this.passThroughActors = other.passThroughActors;
      }
      get intensity() {
          return intensity(this.color);
      }
      // Returns true if any part of the light hit cells that are in the player's field of view.
      paint(site, x, y, maintainShadows = false, isMinersLight = false) {
          if (!site)
              return false;
          let k;
          // let colorComponents = [0,0,0];
          let lightMultiplier = 0;
          let radius = this.radius.value();
          let outerRadius = Math.ceil(radius);
          if (outerRadius < 1)
              return false;
          // calcLightComponents(colorComponents, this);
          LIGHT_COMPONENTS = this.color.bake();
          // console.log('paint', LIGHT_COMPONENTS.toString(true), x, y, outerRadius);
          // the miner's light does not dispel IS_IN_SHADOW,
          // so the player can be in shadow despite casting his own light.
          const dispelShadows = !isMinersLight &&
              !maintainShadows &&
              !isDarkLight(LIGHT_COMPONENTS);
          const fadeToPercent = this.fadeTo;
          const grid$1 = alloc$1(site.width, site.height, 0);
          site.calcFov(x, y, outerRadius, this.passThroughActors, (i, j) => {
              grid$1[i][j] = 1;
          });
          // let overlappedFieldOfView = false;
          const lightValue = [0, 0, 0];
          grid$1.forCircle(x, y, outerRadius, (v, i, j) => {
              if (!v)
                  return;
              // const cell = map.cell(i, j);
              lightMultiplier = Math.floor(100 -
                  (100 - fadeToPercent) *
                      (distanceBetween(x, y, i, j) / radius));
              for (k = 0; k < 3; ++k) {
                  lightValue[k] = Math.floor((LIGHT_COMPONENTS._data[k] * lightMultiplier) / 100);
              }
              site.addCellLight(i, j, lightValue, dispelShadows);
              // if (dispelShadows) {
              //     map.clearCellFlag(i, j, CellFlags.IS_IN_SHADOW);
              // }
              // if (map.isVisible(i, j)) {
              //     overlappedFieldOfView = true;
              // }
              // console.log(i, j, lightMultiplier, cell.light);
          });
          // if (dispelShadows) {
          //     map.clearCellFlag(x, y, CellFlags.IS_IN_SHADOW);
          // }
          free$1(grid$1);
          // return overlappedFieldOfView;
          return true;
      }
  }
  function intensity(light) {
      let data = light;
      if (light instanceof Color) {
          data = light._data;
      }
      return Math.max(data[0], data[1], data[2]);
  }
  function isDarkLight(light, threshold = 20) {
      return intensity(light) <= threshold;
  }
  function isShadowLight(light, threshold = 40) {
      return intensity(light) <= threshold;
  }
  function make$3$1(...args) {
      if (args.length == 1) {
          const config = args[0];
          if (typeof config === 'string') {
              const cached = lights[config];
              if (cached)
                  return cached;
              const [color, radius, fadeTo, pass] = config
                  .split(/[,|]/)
                  .map((t) => t.trim());
              return new Light(from$2(color), from$4(radius || 1), Number.parseInt(fadeTo || '0'), !!pass && pass !== 'false');
          }
          else if (Array.isArray(config)) {
              const [color, radius, fadeTo, pass] = config;
              return new Light(color, radius, fadeTo, pass);
          }
          else if (config && config.color) {
              return new Light(from$2(config.color), from$4(config.radius), Number.parseInt(config.fadeTo || '0'), config.pass);
          }
          else {
              throw new Error('Unknown Light config - ' + config);
          }
      }
      else {
          const [color, radius, fadeTo, pass] = args;
          return new Light(color, radius, fadeTo, pass);
      }
  }
  const lights = {};
  function from$5(...args) {
      if (args.length != 1)
          ERROR('Unknown Light config: ' + JSON.stringify(args));
      const arg = args[0];
      if (typeof arg === 'string') {
          const cached = lights[arg];
          if (cached)
              return cached;
      }
      if (arg && arg.paint)
          return arg;
      return make$3$1(arg);
  }
  function install$9(id, ...args) {
      let source;
      if (args.length == 1) {
          source = make$3$1(args[0]);
      }
      else {
          source = make$3$1(args[0], args[1], args[2], args[3]);
      }
      lights[id] = source;
      source.id = id;
      return source;
  }
  function installAll(config) {
      const entries = Object.entries(config);
      entries.forEach(([name, info]) => {
          install$9(name, info);
      });
  }
  // // TODO - Move?
  // export function playerInDarkness(
  //     map: Types.LightSite,
  //     PLAYER: Utils.XY,
  //     darkColor?: Color.Color
  // ) {
  //     const cell = map.cell(PLAYER.x, PLAYER.y);
  //     return cell.isDark(darkColor);
  //     // return (
  //     //   cell.light[0] + 10 < darkColor.r &&
  //     //   cell.light[1] + 10 < darkColor.g &&
  //     //   cell.light[2] + 10 < darkColor.b
  //     // );
  // }

  const LightFlags = make$a([
      'LIT',
      'IN_SHADOW',
      'DARK',
      // 'MAGIC_DARK',
      'CHANGED',
  ]);
  class LightSystem {
      constructor(map, opts = {}) {
          this.staticLights = null;
          this.site = map;
          this.ambient = from$2(opts.ambient || 'white').toLight();
          this.changed = false;
          this.glowLightChanged = false;
          this.dynamicLightChanged = false;
          this.light = make$e(map.width, map.height, () => this.ambient.slice());
          this.glowLight = make$e(map.width, map.height, () => this.ambient.slice());
          this.oldLight = make$e(map.width, map.height, () => this.ambient.slice());
          this.flags = make$e(map.width, map.height);
          this.finishLightUpdate();
      }
      copy(other) {
          this.setAmbient(other.ambient);
          this.glowLightChanged = true;
          this.dynamicLightChanged = true;
          this.changed = true;
          this.staticLights = null;
          forEach(other.staticLights, (info) => this.addStatic(info.x, info.y, info.light));
      }
      getAmbient() {
          return this.ambient;
      }
      setAmbient(light) {
          if (light instanceof Color) {
              light = light.toLight();
          }
          else if (!Array.isArray(light)) {
              light = from$2(light).toLight();
          }
          for (let i = 0; i < 3; ++i) {
              this.ambient[i] = light[i];
          }
          this.glowLightChanged = true;
      }
      get needsUpdate() {
          return this.glowLightChanged || this.dynamicLightChanged;
      }
      getLight(x, y) {
          return this.light[x][y];
      }
      setLight(x, y, light) {
          const val = this.light[x][y];
          for (let i = 0; i < 3; ++i) {
              val[i] = light[i];
          }
      }
      isLit(x, y) {
          return !!(this.flags[x][y] & LightFlags.LIT);
      }
      isDark(x, y) {
          return !!(this.flags[x][y] & LightFlags.DARK);
      }
      isInShadow(x, y) {
          return !!(this.flags[x][y] & LightFlags.IN_SHADOW);
      }
      // isMagicDark(x: number, y: number): boolean {
      //     return !!(this.flags[x][y] & LightFlags.MAGIC_DARK);
      // }
      lightChanged(x, y) {
          return !!(this.flags[x][y] & LightFlags.CHANGED);
      }
      // setMagicDark(x: number, y: number, isDark = true) {
      //     if (isDark) {
      //         this.flags[x][y] |= LightFlags.MAGIC_DARK;
      //     } else {
      //         this.flags[x][y] &= ~LightFlags.MAGIC_DARK;
      //     }
      // }
      get width() {
          return this.site.width;
      }
      get height() {
          return this.site.height;
      }
      addStatic(x, y, light) {
          const info = {
              x,
              y,
              light: from$5(light),
              next: this.staticLights,
          };
          this.staticLights = info;
          this.glowLightChanged = true;
          return info;
      }
      removeStatic(x, y, light) {
          let prev = this.staticLights;
          if (!prev)
              return;
          function matches(info) {
              if (info.x != x || info.y != y)
                  return false;
              return !light || light === info.light;
          }
          this.glowLightChanged = true;
          while (prev && matches(prev)) {
              prev = this.staticLights = prev.next;
          }
          if (!prev)
              return;
          let current = prev.next;
          while (current) {
              if (matches(current)) {
                  prev.next = current.next;
              }
              else {
                  prev = current;
              }
              current = current.next;
          }
      }
      eachStaticLight(fn) {
          forEach(this.staticLights, (info) => fn(info.x, info.y, info.light));
          this.site.eachGlowLight((x, y, light) => {
              fn(x, y, light);
          });
      }
      eachDynamicLight(fn) {
          this.site.eachDynamicLight(fn);
      }
      update(force = false) {
          this.changed = false;
          if (!force && !this.needsUpdate)
              return false;
          // Copy Light over oldLight
          this.startLightUpdate();
          if (!this.glowLightChanged) {
              this.restoreGlowLights();
          }
          else {
              // GW.debug.log('painting glow lights.');
              // Paint all glowing tiles.
              this.eachStaticLight((x, y, light) => {
                  light.paint(this, x, y);
              });
              this.recordGlowLights();
              this.glowLightChanged = false;
          }
          // Cycle through monsters and paint their lights:
          this.eachDynamicLight((x, y, light) => light.paint(this, x, y)
          // if (monst.mutationIndex >= 0 && mutationCatalog[monst.mutationIndex].light != lights['NO_LIGHT']) {
          //     paint(map, mutationCatalog[monst.mutationIndex].light, actor.x, actor.y, false, false);
          // }
          // if (actor.isBurning()) { // monst.status.burning && !(actor.kind.flags & Flags.Actor.AF_FIERY)) {
          // 	paint(map, lights.BURNING_CREATURE, actor.x, actor.y, false, false);
          // }
          // if (actor.isTelepathicallyRevealed()) {
          // 	paint(map, lights['TELEPATHY_LIGHT'], actor.x, actor.y, false, true);
          // }
          );
          // Also paint telepathy lights for dormant monsters.
          // for (monst of map.dormantMonsters) {
          //     if (monsterTelepathicallyRevealed(monst)) {
          //         paint(map, lights['TELEPATHY_LIGHT'], monst.xLoc, monst.yLoc, false, true);
          //     }
          // }
          this.finishLightUpdate();
          // Miner's light:
          this.site.eachMinersLight((x, y, light) => {
              light.paint(this, x, y, true, true);
          });
          // const PLAYER = DATA.player;
          // if (PLAYER) {
          //     const PLAYERS_LIGHT = Light.lights.PLAYERS_LIGHT;
          //     if (PLAYERS_LIGHT) {
          //         PLAYERS_LIGHT.paint(this, PLAYER.x, PLAYER.y, true, true);
          //     }
          // }
          this.dynamicLightChanged = false;
          this.changed = true;
          // if (PLAYER.status.invisible) {
          //     PLAYER.info.foreColor = playerInvisibleColor;
          // } else if (playerInDarkness()) {
          // 	PLAYER.info.foreColor = playerInDarknessColor;
          // } else if (pmap[PLAYER.xLoc][PLAYER.yLoc].flags & IS_IN_SHADOW) {
          // 	PLAYER.info.foreColor = playerInShadowColor;
          // } else {
          // 	PLAYER.info.foreColor = playerInLightColor;
          // }
          return true;
      }
      startLightUpdate() {
          // record Old Lights
          // and then zero out Light.
          let i = 0;
          const flag = isShadowLight(this.ambient)
              ? LightFlags.IN_SHADOW
              : 0;
          this.light.forEach((val, x, y) => {
              for (i = 0; i < 3; ++i) {
                  this.oldLight[x][y][i] = val[i];
                  val[i] = this.ambient[i];
              }
              this.flags[x][y] = flag;
          });
      }
      finishLightUpdate() {
          forRect(this.width, this.height, (x, y) => {
              // clear light flags
              // this.flags[x][y] &= ~(LightFlags.LIT | LightFlags.DARK);
              const oldLight = this.oldLight[x][y];
              const light = this.light[x][y];
              if (light.some((v, i) => v !== oldLight[i])) {
                  this.flags[x][y] |= LightFlags.CHANGED;
              }
              if (isDarkLight(light)) {
                  this.flags[x][y] |= LightFlags.DARK;
              }
              else if (!isShadowLight(light)) {
                  this.flags[x][y] |= LightFlags.LIT;
              }
          });
      }
      recordGlowLights() {
          let i = 0;
          this.light.forEach((val, x, y) => {
              const glowLight = this.glowLight[x][y];
              for (i = 0; i < 3; ++i) {
                  glowLight[i] = val[i];
              }
          });
      }
      restoreGlowLights() {
          let i = 0;
          this.light.forEach((val, x, y) => {
              const glowLight = this.glowLight[x][y];
              for (i = 0; i < 3; ++i) {
                  val[i] = glowLight[i];
              }
          });
      }
      // PaintSite
      calcFov(x, y, radius, passThroughActors, cb) {
          const site = this.site;
          const fov = new FOV({
              isBlocked(x, y) {
                  if (!passThroughActors && site.hasActor(x, y))
                      return false;
                  return site.blocksVision(x, y);
              },
              hasXY(x, y) {
                  return site.hasXY(x, y);
              },
          });
          fov.calculate(x, y, radius, cb);
      }
      addCellLight(x, y, light, dispelShadows) {
          const val = this.light[x][y];
          for (let i = 0; i < 3; ++i) {
              val[i] += light[i];
          }
          if (dispelShadows && !isShadowLight(light)) {
              this.flags[x][y] &= ~LightFlags.IN_SHADOW;
          }
      }
  }

  var index$3 = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	Light: Light,
  	LightSystem: LightSystem,
  	from: from$5,
  	install: install$9,
  	installAll: installAll,
  	intensity: intensity,
  	isDarkLight: isDarkLight,
  	isShadowLight: isShadowLight,
  	lights: lights,
  	make: make$3$1
  });

  // import * as IO from './io';
  class Events {
      constructor(ctx, events) {
          this._events = {};
          this.onUnhandled = null;
          this._ctx = ctx;
          if (events) {
              this.on(events);
          }
      }
      has(name) {
          const events = this._events[name];
          if (!events)
              return false;
          return events.some((e) => e && e.fn);
      }
      on(...args) {
          if (args.length === 1) {
              const cancel = Object.entries(args[0]).map(([ev, cb]) => this.on(ev, cb));
              return () => cancel.forEach((c) => c());
          }
          const ev = args[0];
          const fn = args[1];
          if (Array.isArray(ev)) {
              const cleanup = ev.map((e) => this.on(e, fn));
              return () => {
                  cleanup.forEach((c) => c());
              };
          }
          if (!(ev in this._events)) {
              this._events[ev] = [];
          }
          const info = { fn };
          this._events[ev].unshift(info); // add to front
          return () => {
              arrayNullify(this._events[ev], info);
          };
      }
      once(ev, fn) {
          if (Array.isArray(ev)) {
              const cleanup = ev.map((e) => this.on(e, fn));
              return () => {
                  cleanup.forEach((c) => c());
              };
          }
          if (!(ev in this._events)) {
              this._events[ev] = [];
          }
          const info = { fn, once: true };
          this._events[ev].unshift(info); // add to front
          return () => {
              arrayNullify(this._events[ev], info);
          };
      }
      off(ev, cb) {
          if (Array.isArray(ev)) {
              ev.forEach((e) => this.off(e, cb));
              return;
          }
          const events = this._events[ev];
          if (!events)
              return;
          if (!cb) {
              for (let i = 0; i < events.length; ++i) {
                  events[i] = null;
              }
              return;
          }
          const current = events.findIndex((i) => i && i.fn === cb);
          if (current > -1) {
              events[current] = null;
          }
      }
      emit(ev, ...args) {
          if (Array.isArray(ev)) {
              let success = false;
              for (let name of ev) {
                  success = this.emit(name, ...args) || success;
              }
              return success;
          }
          const events = this._events[ev];
          if (!events || events.length == 0) {
              return this._unhandled(ev, args);
          }
          // newer events first (especially for input)
          events.forEach((info) => {
              // TODO - stopImmediatePropagation - how to check?
              info && info.fn.call(this._ctx, ...args);
          });
          this._events[ev] = events.filter((i) => i && !i.once);
          return true;
      }
      _unhandled(ev, args) {
          if (!this.onUnhandled)
              return false;
          this.onUnhandled.call(this._ctx, ev, ...args);
          return true;
      }
      clear() {
          this._events = {};
          this.onUnhandled = null;
      }
      // TODO - why is this here since we have: events.off(name)??
      /** @deprecated */
      clear_event(name) {
          if (name in this._events) {
              // Why the new array instead of making each null?  This will not change a currently running emit
              this._events[name] = this._events[name].map(() => null);
          }
      }
      // TODO - What is this for?
      /** @deprecated */
      restart() {
          Object.keys(this._events).forEach((ev) => {
              this._events[ev] = this._events[ev].filter((i) => i && !i.once);
          });
          this.onUnhandled = null;
      }
  }

  // Tweeing API based on - http://tweenjs.github.io/tween.js/
  class BaseObj {
      constructor() {
          this.events = new Events(this);
          this.children = [];
      }
      on(ev, fn) {
          this.events.on(ev, fn);
          return this;
      }
      once(ev, fn) {
          this.events.once(ev, fn);
          return this;
      }
      off(ev, fn) {
          this.events.off(ev, fn);
          return this;
      }
      emit(ev, ...args) {
          return this.events.emit(ev, ...args);
      }
      addChild(t) {
          this.children.push(t);
          return this;
      }
      removeChild(t) {
          arrayDelete(this.children, t);
          return this;
      }
      update(dt) {
          this.children.forEach((c) => c.update(dt));
          this.emit('update', dt);
      }
  }
  class Tween extends BaseObj {
      constructor(src) {
          super();
          this._repeat = 0;
          this._count = 0;
          this._from = false;
          this._duration = 0;
          this._delay = 0;
          this._repeatDelay = -1;
          this._yoyo = false;
          this._time = Number.MAX_SAFE_INTEGER;
          this._startTime = 0;
          this._goal = {};
          this._start = {};
          this._success = true;
          // _startCb: TweenCb | null = null;
          // _updateCb: TweenCb | null = null;
          // _repeatCb: TweenCb | null = null;
          // _finishCb: TweenFinishCb | null = null;
          this._easing = linear;
          this._interpolate = interpolate;
          this._obj = src;
      }
      isRunning() {
          return (this._startTime > 0 ||
              this._time < this._duration ||
              this.children.length > 0);
      }
      onStart(cb) {
          this.on('start', cb);
          return this;
      }
      onUpdate(cb) {
          this.on('update', cb);
          return this;
      }
      onRepeat(cb) {
          this.on('repeat', cb);
          return this;
      }
      onFinish(cb) {
          this.on('stop', cb);
          return this;
      }
      to(goal, dynamic) {
          if (dynamic) {
              if (typeof dynamic === 'boolean') {
                  dynamic = Object.keys(goal);
              }
              this._goal = {};
              dynamic.forEach((key) => {
                  this._goal[key] = () => goal[key];
              });
          }
          else {
              this._goal = goal;
          }
          // this._from = false;
          if (Object.keys(this._start).length == 0) {
              Object.keys(this._goal).forEach((k) => {
                  this._start[k] = this._obj[k];
              });
          }
          return this;
      }
      from(start, dynamic) {
          if (dynamic) {
              if (typeof dynamic === 'boolean') {
                  dynamic = Object.keys(start);
              }
              this._start = {};
              dynamic.forEach((key) => {
                  this._start[key] = () => start[key];
              });
          }
          else {
              this._start = start;
          }
          if (Object.keys(this._goal).length == 0) {
              Object.keys(this._start).forEach((k) => {
                  this._goal[k] = this._obj[k];
              });
          }
          return this;
      }
      duration(v) {
          if (v === undefined)
              return this._duration;
          this._duration = v;
          return this;
      }
      repeat(v) {
          if (v === undefined)
              return this._repeat;
          this._repeat = v;
          return this;
      }
      delay(v) {
          if (v === undefined)
              return this._delay;
          this._delay = v;
          return this;
      }
      repeatDelay(v) {
          if (v === undefined)
              return this._repeatDelay;
          this._repeatDelay = v;
          return this;
      }
      yoyo(v) {
          if (v === undefined)
              return this._yoyo;
          this._yoyo = v;
          return this;
      }
      start(animator) {
          this._success = true;
          if (this._time > 0) {
              this._time = 0;
              this._startTime = this._delay;
              this._count = 0;
              // if (this._from) {
              // this._goal = {};
              // Object.keys(this._start).forEach(
              //     (key) =>
              //         (this._goal[key as keyof T] = this._obj[key as keyof T])
              // );
              // } else {
              // this._start = {};
              // Object.keys(this._goal).forEach(
              //     (key) =>
              //         (this._start[key as keyof T] = this._obj[
              //             key as keyof T
              //         ])
              // );
              //     this._updateProperties(this._obj, this._start, this._goal, 0);
              // }
              this._updateProperties(this._obj, this._start, this._goal, 0);
          }
          if (animator) {
              animator.add(this);
          }
          return this;
      }
      update(dt) {
          if (!this.isRunning())
              return;
          this.children.forEach((c) => c.update(dt));
          this.children = this.children.filter((c) => c.isRunning());
          this._time += dt;
          if (this._startTime) {
              if (this._startTime > this._time)
                  return;
              this._time -= this._startTime;
              this._startTime = 0;
              if (this._count > 0)
                  this._restart();
          }
          if (this._count === 0) {
              this._restart();
          }
          const pct = this._easing(this._time / this._duration);
          let madeChange = this._updateProperties(this._obj, this._start, this._goal, pct);
          if (madeChange) {
              this.emit('update', this._obj, pct);
          }
          if (this._time >= this._duration) {
              if (this._repeat > this._count || this._repeat < 0) {
                  this._time = this._time % this._duration;
                  this._startTime =
                      this._repeatDelay > -1 ? this._repeatDelay : this._delay;
                  if (this._yoyo) {
                      [this._start, this._goal] = [this._goal, this._start];
                  }
                  if (!this._startTime) {
                      this._restart();
                  }
              }
              else if (!this.isRunning()) {
                  this.emit('stop', this._obj, this._success);
              }
          }
      }
      _restart() {
          ++this._count;
          // reset starting values
          // Object.entries(this._start).forEach(([key, value]) => {
          //     // @ts-ignore
          //     this._obj[key] = value;
          // });
          this._updateProperties(this._obj, this._start, this._goal, 0);
          if (this._count == 1) {
              this.emit('start', this._obj, 0);
          }
          else {
              this.emit('repeat', this._obj, this._count) ||
                  this.emit('update', this._obj, 0);
          }
      }
      // gameTick(_dt: number): boolean {
      //     return false;
      // }
      stop(success = false) {
          this._success = success;
          this._time = Number.MAX_SAFE_INTEGER;
          this.children.forEach((c) => c.stop(success));
      }
      _updateProperties(obj, start, goal, pct) {
          let madeChange = false;
          Object.entries(goal).forEach(([field, goalV]) => {
              let currentV = obj[field];
              let startV = start[field];
              if (typeof startV === 'function') {
                  startV = startV.call(start);
              }
              if (typeof goalV === 'function') {
                  goalV = goalV.call(obj);
              }
              const updatedV = this._interpolate(startV, goalV, pct);
              if (updatedV !== currentV) {
                  obj[field] = updatedV;
                  madeChange = true;
              }
          });
          return madeChange;
      }
  }
  function make$2$1(src, duration = 1000) {
      return new Tween(src).duration(duration);
  }
  const move = make$2$1;
  function linear(pct) {
      return clamp(pct, 0, 1);
  }
  // TODO - string, bool, Color
  function interpolate(start, goal, pct) {
      const startIsBinary = typeof start !== 'number';
      const goalIsBinary = typeof goal !== 'number';
      if (startIsBinary || goalIsBinary) {
          return Math.floor(pct) == 0 ? start : goal;
      }
      return Math.round((goal - start) * pct) + start;
  }

  var tween = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	BaseObj: BaseObj,
  	Tween: Tween,
  	interpolate: interpolate,
  	linear: linear,
  	make: make$2$1,
  	move: move
  });

  class Timers {
      constructor(ctx) {
          this._timers = [];
          this._ctx = ctx;
      }
      get length() {
          return this._timers.length;
      }
      clear() {
          this._timers = [];
      }
      // Clears all one time timers and resets all repeating timers
      restart() {
          this._timers.forEach((i) => {
              i.delay = i.repeat || 0;
          });
          this._timers = this._timers.filter((i) => i.delay > 0);
      }
      setTimeout(fn, delay) {
          const info = {
              fn,
              delay,
              repeat: 0,
          };
          this._timers.push(info);
          return () => arrayDelete(this._timers, info);
      }
      setInterval(fn, delay) {
          const info = {
              fn,
              delay,
              repeat: delay,
          };
          this._timers.push(info);
          return () => arrayDelete(this._timers, info);
      }
      update(dt) {
          if (!this._timers.length)
              return;
          let needFilter = false;
          this._timers.forEach((info) => {
              info.delay -= dt;
              if (info.delay <= 0) {
                  const result = info.fn.call(this._ctx);
                  if (info.repeat && result !== false) {
                      info.delay += info.repeat;
                      if (info.delay < 0) {
                          info.delay = info.repeat;
                      }
                  }
              }
              needFilter = needFilter || info.delay <= 0;
          });
          if (needFilter) {
              this._timers = this._timers.filter((info) => info.delay > 0);
          }
      }
  }

  class Tweens {
      constructor() {
          this._tweens = [];
      }
      get length() {
          return this._tweens.length;
      }
      clear() {
          this._tweens = [];
      }
      add(tween) {
          this._tweens.push(tween);
      }
      remove(tween) {
          arrayDelete(this._tweens, tween);
      }
      update(dt) {
          // // fire animations
          this._tweens.forEach((tw) => tw.update(dt));
          this._tweens = this._tweens.filter((tw) => tw.isRunning());
      }
  }

  class Selector {
      constructor(text) {
          this.priority = 0;
          if (text.startsWith(':') || text.startsWith('.')) {
              text = '*' + text;
          }
          this.text = text;
          this.matchFn = this._parse(text);
      }
      _parse(text) {
          const parts = text.split(/ +/g).map((p) => p.trim());
          const matches = [];
          for (let i = 0; i < parts.length; ++i) {
              let p = parts[i];
              if (p === '>') {
                  matches.push(this._parentMatch());
                  ++i;
                  p = parts[i];
              }
              else if (i > 0) {
                  matches.push(this._ancestorMatch());
              }
              matches.push(this._matchElement(p));
          }
          return matches.reduce((out, fn) => fn.bind(undefined, out), TRUE);
      }
      _parentMatch() {
          return function parentM(next, e) {
              // console.log('parent', e.parent);
              if (!e.parent)
                  return false;
              return next(e.parent);
          };
      }
      _ancestorMatch() {
          return function ancestorM(next, e) {
              let current = e.parent;
              while (current) {
                  if (next(current))
                      return true;
              }
              return false;
          };
      }
      _matchElement(text) {
          const CSS_RE = /(?:(\w+|\*|\$)|#(\w+)|\.([^\.: ]+))|(?::(?:(?:not\(\.([^\)]+)\))|(?:not\(:([^\)]+)\))|([^\.: ]+)))/g;
          const parts = [];
          const re = new RegExp(CSS_RE, 'g');
          let match = re.exec(text);
          while (match) {
              if (match[1]) {
                  const fn = this._matchTag(match[1]);
                  if (fn) {
                      parts.push(fn);
                  }
              }
              else if (match[2]) {
                  parts.push(this._matchId(match[2]));
              }
              else if (match[3]) {
                  parts.push(this._matchClass(match[3]));
              }
              else if (match[4]) {
                  parts.push(this._matchNot(this._matchClass(match[4])));
              }
              else if (match[5]) {
                  parts.push(this._matchNot(this._matchProp(match[5])));
              }
              else {
                  parts.push(this._matchProp(match[6]));
              }
              match = re.exec(text);
          }
          return (next, e) => {
              if (!parts.every((fn) => fn(e)))
                  return false;
              return next(e);
          };
      }
      _matchTag(tag) {
          if (tag === '*')
              return null;
          if (tag === '$') {
              this.priority += 10000;
              return null;
          }
          this.priority += 10;
          return (el) => el.tag === tag;
      }
      _matchClass(cls) {
          this.priority += 100;
          return (el) => el.classes.includes(cls);
      }
      _matchProp(prop) {
          if (prop.startsWith('first')) {
              return this._matchFirst();
          }
          else if (prop.startsWith('last')) {
              return this._matchLast();
          }
          else if (prop === 'invalid') {
              return this._matchNot(this._matchProp('valid'));
          }
          else if (prop === 'optional') {
              return this._matchNot(this._matchProp('required'));
          }
          else if (prop === 'enabled') {
              return this._matchNot(this._matchProp('disabled'));
          }
          else if (prop === 'unchecked') {
              return this._matchNot(this._matchProp('checked'));
          }
          this.priority += 2; // prop
          if (['odd', 'even'].includes(prop)) {
              this.priority -= 1;
          }
          return (el) => !!el.prop(prop);
      }
      _matchId(id) {
          this.priority += 1000;
          return (el) => el.attr('id') === id;
      }
      _matchFirst() {
          this.priority += 1; // prop
          return (el) => !!el.parent && !!el.parent.children && el.parent.children[0] === el;
      }
      _matchLast() {
          this.priority += 1; // prop
          return (el) => {
              if (!el.parent)
                  return false;
              if (!el.parent.children)
                  return false;
              return el.parent.children[el.parent.children.length - 1] === el;
          };
      }
      _matchNot(fn) {
          return (el) => !fn(el);
      }
      matches(obj) {
          return this.matchFn(obj);
      }
  }
  function compile(text) {
      return new Selector(text);
  }

  // static - size/pos automatic (ignore TRBL)
  // relative - size automatic, pos = automatic + TRBL
  // fixed - size = self, pos = TRBL vs root
  // absolute - size = self, pos = TRBL vs positioned parent (fixed, absolute)
  // export interface Stylable {
  //     tag: string;
  //     classes: string[];
  //     attr(name: string): string | undefined;
  //     prop(name: string): PropType | undefined;
  //     parent: UIWidget | null;
  //     children?: UIWidget[];
  //     style(): Style;
  // }
  // export interface StyleOptions {
  //     fg?: Color.ColorBase;
  //     bg?: Color.ColorBase;
  //     // depth?: number;
  //     align?: Text.Align;
  //     valign?: Text.VAlign;
  //     // minWidth?: number;
  //     // maxWidth?: number;
  //     // width?: number;
  //     // minHeight?: number;
  //     // maxHeight?: number;
  //     // height?: number;
  //     // left?: number;
  //     // right?: number;
  //     // top?: number;
  //     // bottom?: number;
  //     // //        all,     [t+b, l+r],        [t, r+l,b],               [t, r, b, l]
  //     // padding?:
  //     //     | number
  //     //     | [number]
  //     //     | [number, number]
  //     //     | [number, number, number]
  //     //     | [number, number, number, number];
  //     // padLeft?: number;
  //     // padRight?: number;
  //     // padTop?: number;
  //     // padBottom?: number;
  //     // //        all,     [t+b, l+r],        [t, l+r, b],               [t, r, b, l]
  //     // margin?:
  //     //     | number
  //     //     | [number]
  //     //     | [number, number]
  //     //     | [number, number, number]
  //     //     | [number, number, number, number];
  //     // marginLeft?: number;
  //     // marginRight?: number;
  //     // marginTop?: number;
  //     // marginBottom?: number;
  //     // border?: Color.ColorBase;
  // }
  class Style {
      constructor(selector = '$', init) {
          this._dirty = false;
          this.selector = new Selector(selector);
          if (init) {
              this.set(init);
          }
          this._dirty = false;
      }
      get dirty() {
          return this._dirty;
      }
      set dirty(v) {
          this._dirty = v;
      }
      get fg() {
          return this._fg;
      }
      get bg() {
          return this._bg;
      }
      get opacity() {
          return this._opacity;
      }
      dim(pct = 25, fg = true, bg = false) {
          if (fg) {
              this._fg = from$2(this._fg).darken(pct);
          }
          if (bg) {
              this._bg = from$2(this._bg).darken(pct);
          }
          return this;
      }
      bright(pct = 25, fg = true, bg = false) {
          if (fg) {
              this._fg = from$2(this._fg).lighten(pct);
          }
          if (bg) {
              this._bg = from$2(this._bg).lighten(pct);
          }
          return this;
      }
      invert() {
          [this._fg, this._bg] = [this._bg, this._fg];
          return this;
      }
      get align() {
          return this._align;
      }
      get valign() {
          return this._valign;
      }
      get(key) {
          const id = ('_' + key);
          return this[id];
      }
      set(key, value, setDirty = true) {
          if (typeof key === 'string') {
              const field = '_' + key;
              if (typeof value === 'string') {
                  if (value.match(/^[+-]?\d+$/)) {
                      value = Number.parseInt(value);
                  }
                  else if (value === 'true') {
                      value = true;
                  }
                  else if (value === 'false') {
                      value = false;
                  }
              }
              this[field] = value;
              // }
          }
          else if (key instanceof Style) {
              setDirty = value || value === undefined ? true : false;
              Object.entries(key).forEach(([name, value]) => {
                  if (name === 'selector' || name === '_dirty')
                      return;
                  if (value !== undefined && value !== null) {
                      this[name] = value;
                  }
                  else if (value === null) {
                      this.unset(name);
                  }
              });
          }
          else {
              setDirty = value || value === undefined ? true : false;
              Object.entries(key).forEach(([name, value]) => {
                  if (value === null) {
                      this.unset(name);
                  }
                  else {
                      this.set(name, value, setDirty);
                  }
              });
          }
          this.dirty ||= setDirty;
          return this;
      }
      unset(key) {
          const field = key.startsWith('_') ? key : '_' + key;
          delete this[field];
          this.dirty = true;
          return this;
      }
      clone() {
          const other = new this.constructor();
          other.copy(this);
          return other;
      }
      copy(other) {
          Object.assign(this, other);
          return this;
      }
  }
  function makeStyle(style, selector = '$') {
      const opts = {};
      const parts = style
          .trim()
          .split(';')
          .map((p) => p.trim());
      parts.forEach((p) => {
          const [name, base] = p.split(':').map((p) => p.trim());
          if (!name)
              return;
          const baseParts = base.split(/ +/g);
          if (baseParts.length == 1) {
              // @ts-ignore
              opts[name] = base;
          }
          else {
              // @ts-ignore
              opts[name] = baseParts;
          }
      });
      return new Style(selector, opts);
  }
  // const NO_BOUNDS = ['fg', 'bg', 'depth', 'align', 'valign'];
  // export function affectsBounds(key: keyof StyleOptions): boolean {
  //     return !NO_BOUNDS.includes(key);
  // }
  class ComputedStyle extends Style {
      // constructor(source: Stylable, sources?: Style[]) {
      constructor(sources) {
          super();
          // obj: Stylable;
          this.sources = [];
          // _opacity = 100;
          this._baseFg = null;
          this._baseBg = null;
          // this.obj = source;
          if (sources) {
              // sort low to high priority (highest should be this.obj._style, lowest = global default:'*')
              sources.sort((a, b) => a.selector.priority - b.selector.priority);
              this.sources = sources;
          }
          this.sources.forEach((s) => super.set(s));
          // this.opacity = opacity;
          this._dirty = false; // As far as I know I reflect all of the current source values.
      }
      get opacity() {
          return this._opacity ?? 100;
      }
      set opacity(v) {
          v = clamp(v, 0, 100);
          this._opacity = v;
          if (v === 100) {
              this._fg = this._baseFg || this._fg;
              this._bg = this._baseBg || this._bg;
              return;
          }
          if (this._fg !== undefined) {
              this._baseFg = this._baseFg || from$2(this._fg);
              this._fg = this._baseFg.alpha(v);
          }
          if (this._bg !== undefined) {
              this._baseBg = this._baseBg || from$2(this._bg);
              this._bg = this._baseBg.alpha(v);
          }
      }
      get dirty() {
          return this._dirty || this.sources.some((s) => s.dirty);
      }
      set dirty(v) {
          this._dirty = v;
      }
  }
  class Sheet {
      constructor(parentSheet) {
          this.rules = [];
          this._dirty = true;
          // if (parentSheet === undefined) {
          //     parentSheet = defaultStyle;
          // }
          // if (parentSheet) {
          //     this.rules = parentSheet.rules.slice();
          // }
          this._parent = parentSheet || null;
      }
      get dirty() {
          return this._dirty;
      }
      set dirty(v) {
          this._dirty = v;
          if (!this._dirty) {
              this.rules.forEach((r) => (r.dirty = false));
          }
      }
      setParent(sheet) {
          this._parent = sheet;
      }
      add(selector, props) {
          if (selector.includes(',')) {
              selector
                  .split(',')
                  .map((p) => p.trim())
                  .forEach((p) => this.add(p, props));
              return this;
          }
          if (selector.includes(' '))
              throw new Error('Hierarchical selectors not supported.');
          // if 2 '.' - Error('Only single class rules supported.')
          // if '&' - Error('Not supported.')
          let rule = new Style(selector, props);
          // const existing = this.rules.findIndex(
          //     (s) => s.selector.text === rule.selector.text
          // );
          // if (existing > -1) {
          //     // TODO - Should this delete the rule and add the new one at the end?
          //     const current = this.rules[existing];
          //     current.set(rule);
          //     rule = current;
          // } else {
          this.rules.push(rule);
          // }
          // rulesChanged = true;
          this.dirty = true;
          return this;
      }
      get(selector) {
          return this.rules.find((s) => s.selector.text === selector) || null;
      }
      load(styles) {
          Object.entries(styles).forEach(([selector, props]) => {
              this.add(selector, props);
          });
          return this;
      }
      remove(selector) {
          const existing = this.rules.findIndex((s) => s.selector.text === selector);
          if (existing > -1) {
              this.rules.splice(existing, 1);
              this.dirty = true;
          }
      }
      _rulesFor(widget) {
          let rules = this.rules.filter((r) => r.selector.matches(widget));
          if (this._parent) {
              rules = this._parent._rulesFor(widget).concat(rules);
          }
          return rules;
      }
      computeFor(widget) {
          const sources = this._rulesFor(widget);
          const widgetStyle = widget.style();
          if (widgetStyle) {
              sources.push(widgetStyle);
              widgetStyle.dirty = false;
          }
          return new ComputedStyle(sources);
      }
  }
  const defaultStyle = new Sheet(null);
  defaultStyle.add('*', { fg: 'white' });

  // Scene
  class Scene {
      constructor(id, app) {
          this.events = new Events(this);
          this.tweens = new Tweens();
          this.timers = new Timers(this);
          this.all = [];
          this.children = [];
          this.focused = null;
          this.dt = 0;
          this.time = 0;
          this.realTime = 0;
          this.skipTime = false;
          this.stopped = true;
          this.paused = {};
          this.debug = false;
          this.needsDraw = true;
          this.bg = BLACK;
          this.data = {};
          this.id = id;
          this.styles = new Sheet();
          this.app = app;
          this.buffer = new Buffer$1(app.width, app.height);
          this.styles.setParent(app.styles);
      }
      get width() {
          return this.buffer.width;
      }
      get height() {
          return this.buffer.height;
      }
      isActive() {
          return !this.stopped;
      }
      isPaused() {
          return this.isPaused;
      }
      isSleeping() {
          return this.isSleeping;
      }
      // GENERAL
      _create(opts = {}) {
          opts.bg && (this.bg = from$2(opts.bg));
          if (opts.data) {
              if (isPlainObject(opts.data)) {
                  this.data = mergeDeep(this.data, opts.data);
              }
              else {
                  throw new Error("SceneCreateOpts 'data' field must be plain object.");
              }
          }
          if (opts.on) {
              Object.entries(opts.on).forEach(([ev, fn]) => {
                  this.on(ev, fn);
              });
          }
          Object.entries(opts).forEach(([ev, fn]) => {
              if (typeof fn !== 'function')
                  return;
              this.on(ev, fn);
          });
          this.emit('create', opts);
      }
      // TODO - Who calls destroy
      destroy(data) {
          this.emit('destroy', data);
          this.all.forEach((c) => c.destroy());
          this.children = [];
          this.all = [];
          this.timers.clear();
          this.tweens.clear();
      }
      start(opts = {}) {
          this.app.scenes.stop(); // stop all running scenes
          this.app.scenes._start(this, opts); // start me
          return this;
      }
      _start(opts = {}) {
          this.stopped = false;
          // this.timers.restart();
          // this.events.restart();
          // this.tweens.clear();
          this.buffer.nullify();
          this.needsDraw = true;
          this.events.emit('start', opts); // this will start this one in the app.scenes obj
      }
      run(data = {}) {
          this.app.scenes.pause();
          this._start(data);
          this.once('stop', () => this.app.scenes.resume());
          return this;
      }
      stop(data) {
          this.stopped = true;
          this.events.emit('stop', data);
      }
      pause(opts) {
          opts = opts || {
              timers: true,
              tweens: true,
              update: true,
              input: true,
              draw: true,
          };
          Object.assign(this.paused, opts);
          this.events.emit('pause');
      }
      resume(opts) {
          opts = opts || {
              timers: true,
              tweens: true,
              update: true,
              input: true,
              draw: true,
          };
          Object.entries(opts).forEach(([key, value]) => {
              if (value === true) {
                  this.paused[key] = false;
              }
          });
          this.needsDraw = true;
          this.events.emit('resume');
      }
      // FRAME STEPS
      frameStart() {
          this.events.emit('frameStart');
      }
      input(e) {
          if (this.paused.input || this.stopped)
              return;
          this.emit('input', e);
          if (e.defaultPrevented || e.propagationStopped)
              return;
          if (e.type === KEYPRESS) {
              let w = this.focused;
              if (w && (w.hidden || w.disabled)) {
                  this.nextTabStop();
                  w = this.focused;
              }
              w && w.keypress(e);
              if (!e.defaultPrevented) {
                  if (e.key === 'Tab') {
                      this.nextTabStop();
                  }
                  else if (e.key === 'TAB') {
                      this.prevTabStop();
                  }
              }
          }
          else if (e.type === MOUSEMOVE) {
              this.children.forEach((c) => c.mousemove(e));
          }
          else {
              // click
              const c = this.childAt(e);
              if (c) {
                  c.click(e);
                  if (c.prop('tabStop') && !e.defaultPrevented) {
                      this.setFocusWidget(c);
                  }
              }
          }
          if (e.propagationStopped || e.defaultPrevented)
              return;
          e.dispatch(this.events);
      }
      update(dt) {
          if (this.stopped)
              return;
          if (!this.paused.timers)
              this.timers.update(dt);
          if (!this.paused.tweens)
              this.tweens.update(dt);
          if (!this.paused.update) {
              this.events.emit('update', dt);
              this.all.forEach((c) => c.update(dt));
          }
      }
      fixed_update(dt) {
          if (this.stopped)
              return;
          if (!this.paused.update) {
              this.events.emit('fixed_update', dt);
              this.all.forEach((c) => c.fixed_update(dt));
          }
      }
      draw(buffer) {
          if (this.stopped)
              return;
          if (!this.paused.draw && this.needsDraw) {
              this._draw(this.buffer);
              this.emit('draw', this.buffer);
              this.children.forEach((c) => c.draw(this.buffer));
              this.needsDraw = false;
          }
          // if (this.buffer.changed) {
          buffer.apply(this.buffer);
          this.buffer.changed = false;
          // }
      }
      _draw(buffer) {
          buffer.fill(this.bg);
      }
      frameDebug(buffer) {
          this.events.emit('frameDebug', buffer);
      }
      frameEnd(buffer) {
          this.events.emit('frameEnd', buffer);
      }
      // ANIMATION
      fadeIn(widget, ms) {
          return this.fadeTo(widget, 100, ms);
      }
      fadeOut(widget, ms) {
          return this.fadeTo(widget, 0, ms);
      }
      fadeTo(widget, opacity, ms) {
          const tween$1 = make$2$1({ pct: widget.style('opacity') })
              .to({ pct: opacity })
              .duration(ms)
              .onUpdate((info) => {
              widget.style('opacity', info.pct);
          });
          this.tweens.add(tween$1);
          return this;
      }
      fadeToggle(widget, ms) {
          return this.fadeTo(widget, widget._used.opacity ? 0 : 100, ms);
      }
      slideIn(widget, x, y, from, ms) {
          let start = { x, y };
          if (from === 'left') {
              start.x = -widget.bounds.width;
          }
          else if (from === 'right') {
              start.x = this.width + widget.bounds.width;
          }
          else if (from === 'top') {
              start.y = -widget.bounds.height;
          }
          else if (from === 'bottom') {
              start.y = this.height + widget.bounds.height;
          }
          return this.slide(widget, start, { x, y }, ms);
      }
      slideOut(widget, dir, ms) {
          let dest = { x: widget.bounds.x, y: widget.bounds.y };
          if (dir === 'left') {
              dest.x = -widget.bounds.width;
          }
          else if (dir === 'right') {
              dest.x = this.width + widget.bounds.width;
          }
          else if (dir === 'top') {
              dest.y = -widget.bounds.height;
          }
          else if (dir === 'bottom') {
              dest.y = this.height + widget.bounds.height;
          }
          return this.slide(widget, widget.bounds, dest, ms);
      }
      slide(widget, from, to, ms) {
          const tween$1 = make$2$1({ x: x(from), y: y(from) })
              .to({ x: x(to), y: y(to) })
              .duration(ms)
              .onUpdate((info) => {
              widget.pos(info.x, info.y);
          });
          this.tweens.add(tween$1);
          return this;
      }
      // async fadeTo(
      //     color: COLOR.ColorBase = 'black',
      //     duration = 1000
      // ): Promise<void> {
      //     return new Promise<void>((resolve) => {
      //         color = COLOR.from(color);
      //         this.pause();
      //         const buffer = this.buffer.clone();
      //         let pct = 0;
      //         let elapsed = 0;
      //         this.app.repeat(32, () => {
      //             elapsed += 32;
      //             pct = Math.floor((100 * elapsed) / duration);
      //             this.buffer.copy(buffer);
      //             this.buffer.mix(color, pct);
      //             if (elapsed >= duration) {
      //                 this.resume();
      //                 resolve();
      //                 return false; // end timer
      //             }
      //         });
      //     });
      // }
      // CHILDREN
      get(id) {
          return this.all.find((c) => c.id === id) || null;
      }
      _attach(widget) {
          if (this.all.includes(widget))
              return;
          if (widget.scene)
              throw new Error('Widget on another scene!');
          this.all.push(widget);
          widget.scene = this;
          widget.children.forEach((c) => this._attach(c));
          if (widget.prop('tabStop') &&
              !this.focused &&
              !widget.hidden &&
              !widget.disabled) {
              this.setFocusWidget(widget);
          }
      }
      _detach(widget) {
          const index = this.all.indexOf(widget);
          if (index < 0)
              return;
          this.all.splice(index, 1);
          widget.scene = null;
          widget.children.forEach((c) => this._detach(c));
      }
      addChild(child, opts) {
          if (this.children.includes(child))
              return;
          child.setParent(null);
          this.children.push(child);
          this._attach(child);
          if (opts) {
              child.updatePos(opts);
              if (opts.focused) {
                  this.setFocusWidget(child);
              }
          }
      }
      removeChild(child) {
          const index = this.children.indexOf(child);
          if (index < 0)
              return;
          this.children.splice(index, 1);
          child.setParent(null);
          this._detach(child);
      }
      childAt(xy, y) {
          let x = 0;
          if (typeof xy === 'number') {
              x = xy;
              y = y || 0;
          }
          else {
              x = xy.x;
              y = xy.y;
          }
          return (arrayFindRight(this.children, (c) => c.contains(x, y)) ||
              null);
      }
      widgetAt(xy, y) {
          let x = 0;
          if (typeof xy === 'number') {
              x = xy;
              y = y || 0;
          }
          else {
              x = xy.x;
              y = xy.y;
          }
          return arrayFindRight(this.all, (c) => c.contains(x, y)) || null;
      }
      // FOCUS
      setFocusWidget(w, reverse = false) {
          if (w === this.focused)
              return;
          const was = this.focused;
          const want = w;
          this.focused = null;
          was && was.blur(reverse);
          if (this.focused === null) {
              this.focused = want;
              want && want.focus(reverse);
          }
      }
      nextTabStop() {
          if (!this.focused) {
              this.setFocusWidget(this.all.find((w) => !!w.prop('tabStop') && !w.disabled && !w.hidden) || null);
              return !!this.focused;
          }
          const next = arrayNext(this.all, this.focused, (w) => !!w.prop('tabStop') && !w.disabled && !w.hidden);
          if (next) {
              this.setFocusWidget(next);
              return true;
          }
          this.setFocusWidget(null);
          return false;
      }
      prevTabStop() {
          if (!this.focused) {
              this.setFocusWidget(this.all.find((w) => !!w.prop('tabStop') && !w.disabled && !w.hidden) || null);
              return !!this.focused;
          }
          const prev = arrayPrev(this.all, this.focused, (w) => !!w.prop('tabStop') && !w.disabled && !w.hidden);
          if (prev) {
              this.setFocusWidget(prev, true);
              return true;
          }
          this.setFocusWidget(null, true);
          return false;
      }
      on(...args) {
          if (args.length === 1) {
              return this.events.on(args[0]);
          }
          return this.events.on(args[0], args[1]);
      }
      once(ev, cb) {
          return this.events.once(ev, cb);
      }
      emit(ev, ...args) {
          return this.events.emit(ev, ...args);
      }
      wait(delay, fn, ctx) {
          if (typeof fn === 'string') {
              const ev = fn;
              ctx = ctx || {};
              fn = () => this.emit(ev, ctx);
          }
          return this.timers.setTimeout(fn, delay);
      }
      repeat(delay, fn, ctx) {
          if (typeof fn === 'string') {
              const ev = fn;
              ctx = ctx || {};
              fn = () => this.emit(ev, ctx);
          }
          return this.timers.setInterval(fn, delay);
      }
  }

  class Scenes {
      constructor(gw) {
          // _scenes: Record<string, Scene> = {};
          this._active = [];
          this._busy = false;
          this._pending = [];
          this._app = gw;
          this._config = Object.assign({}, scenes);
      }
      get isBusy() {
          return this._busy;
      }
      config(...args) {
          if (args.length === 1) {
              const scenes = args[0];
              Object.entries(scenes).forEach(([id, fns]) => this.config(id, fns));
              return;
          }
          let [id, opts] = args;
          const current = this._config[id] || {};
          if (typeof opts === 'function') {
              opts = { make: opts };
          }
          Object.assign(current, opts);
          this._config[id] = current;
      }
      get(id) {
          if (id === undefined) {
              return this._active[this._active.length - 1];
          }
          return this._active.find((s) => s.id === id) || null;
      }
      emit(ev, ...args) {
          this._active.forEach((a) => a.emit(ev, ...args));
      }
      create(id, opts = {}) {
          let cfg = this._config[id] || {};
          const used = mergeDeep(cfg, opts);
          let scene;
          if (used.make) {
              scene = used.make(id, this._app);
          }
          else {
              scene = new Scene(id, this._app);
          }
          scene.on('start', () => this._started(scene));
          scene.on('stop', () => this._stopped(scene));
          scene._create(used);
          // this._scenes[scene.id] = scene;
          return scene;
      }
      // create(id: string, data: CreateOpts = {}): Scene {
      //     if (id in this._scenes) {
      //         console.log('Scene already created - ' + id);
      //         return this._scenes[id];
      //     }
      //     return this._create(id, data);
      // }
      start(id, opts) {
          let scene = this.get(id) || this.create(id, {});
          scene.start(opts);
          return scene;
      }
      _start(scene, opts = {}) {
          this._app.io.clear();
          if (this.isBusy) {
              this._pending.push({ action: '_start', scene, data: opts });
          }
          else {
              scene._start(opts);
          }
      }
      run(id, data) {
          let scene = this.get(id) || this.create(id, data);
          this._app.io.clear();
          if (this.isBusy) {
              this._pending.push({ action: 'run', scene, data });
          }
          else {
              scene.run(data);
          }
          return scene;
      }
      _started(scene) {
          this._active.push(scene);
      }
      stop(id, data) {
          if (typeof id === 'string') {
              const scene = this.get(id);
              if (!scene)
                  throw new Error('Unknown scene:' + id);
              id = scene;
          }
          if (id instanceof Scene) {
              if (this.isBusy) {
                  this._pending.push({ action: 'stop', scene: id, data });
              }
              else {
                  id.stop(data);
              }
          }
          else {
              this._active.forEach((s) => this.stop(s.id, id));
          }
      }
      _stopped(_scene) {
          this._active = this._active.filter((s) => s.isActive());
      }
      destroy(id, data) {
          const scene = this.get(id);
          if (!scene)
              return;
          if (scene.isActive()) {
              scene.stop(data);
          }
          scene.destroy(data);
          // delete this._scenes[id];
      }
      pause(id, opts) {
          if (typeof id === 'string') {
              const scene = this.get(id);
              if (!scene)
                  throw new Error('Unknown scene:' + id);
              scene.pause(opts);
          }
          else {
              this._active.forEach((s) => s.pause(id));
          }
      }
      resume(id, opts) {
          if (typeof id === 'string') {
              const scene = this.get(id);
              if (!scene)
                  throw new Error('Unknown scene:' + id);
              scene.resume(opts);
          }
          else {
              this._active.forEach((s) => s.resume(id));
          }
      }
      // FRAME
      frameStart() {
          this._busy = true;
          this._active.forEach((s) => s.frameStart());
      }
      input(ev) {
          arrayRevEach(this._active, (s) => {
              if (!ev.propagationStopped)
                  s.input(ev);
          });
      }
      update(dt) {
          this._active.forEach((s) => s.update(dt));
      }
      fixed_update(dt) {
          this._active.forEach((s) => s.fixed_update(dt));
      }
      draw(buffer) {
          this._active.forEach((s) => {
              // if (i > 0) {
              //     s.buffer.copy(this._active[i - 1].buffer);
              // }
              s.draw(buffer);
          });
      }
      frameDebug(buffer) {
          if (this._active.length) {
              this._active.forEach((s) => s.frameDebug(buffer));
          }
      }
      frameEnd(buffer) {
          if (this._active.length) {
              this._active.forEach((s) => s.frameEnd(buffer));
          }
          this._busy = false;
          for (let i = 0; i < this._pending.length; ++i) {
              const todo = this._pending[i];
              todo.scene[todo.action](todo.data);
          }
          this._pending.length = 0;
      }
  }
  const scenes = {};
  function installScene(id, scene) {
      if (typeof scene === 'function') {
          scene = { make: scene };
      }
      scenes[id] = scene;
  }

  // Widget
  class Widget {
      constructor(opts = {}) {
          // tag = 'widget';
          // id = '';
          this.parent = null;
          this.scene = null;
          this.children = [];
          this.events = new Events(this);
          this._style = new Style();
          this._data = {};
          this.classes = [];
          this._props = {
              needsDraw: true,
              needsStyle: true,
              hover: false,
          };
          this._attrs = {};
          if (opts.id)
              this.attr('id', opts.id);
          this.attr('tag', opts.tag || 'widget');
          this.bounds = new Bounds(opts);
          this._style.set(opts);
          // opts.tag && (this.tag = opts.tag);
          if (opts.class) {
              this.classes = opts.class.split(/ +/g).map((c) => c.trim());
          }
          if (opts.tabStop) {
              this.prop('tabStop', true);
          }
          if (opts.disabled) {
              this.prop('disabled', true);
          }
          if (opts.hidden) {
              this.hidden = true;
          }
          if (opts.data) {
              this._data = opts.data; // call set data yourself
          }
          opts.action = opts.action || opts.id;
          if (opts.action) {
              if (opts.action === true) {
                  if (!opts.id)
                      throw new Error('boolean action requires id.');
                  opts.action = opts.id;
              }
              this.attr('action', opts.action);
          }
          [
              'create',
              'input',
              'update',
              'draw',
              'destroy',
              'keypress',
              'mouseenter',
              'mousemove',
              'mouseleave',
              'click',
          ].forEach((n) => {
              if (n in opts) {
                  this.on(n, opts[n]);
              }
          });
          if (opts.on) {
              Object.entries(opts.on).forEach(([ev, fn]) => this.on(ev, fn));
          }
          if (opts.parent) {
              this.setParent(opts.parent, opts);
          }
          else if (opts.scene) {
              opts.scene.addChild(this, opts);
          }
      }
      get needsDraw() {
          return this.scene ? this.scene.needsDraw : false;
      }
      set needsDraw(v) {
          if (!v)
              return;
          this.scene && (this.scene.needsDraw = v);
      }
      get tag() {
          return this._attrStr('tag');
      }
      get id() {
          return this._attrStr('id');
      }
      data(...args) {
          if (args.length == 0) {
              return this._data;
          }
          if (args.length == 2) {
              this._setDataItem(args[0], args[1]);
              this.needsDraw = true;
              return this;
          }
          if (typeof args[0] === 'string') {
              if (Array.isArray(this._data)) {
                  throw new Error('Cannot access fields of array data.');
              }
              return this._data[args[0]];
          }
          this._setData(args[0]);
          this.needsDraw = true;
          return this;
      }
      _setData(v) {
          this._data = v;
      }
      _setDataItem(key, v) {
          if (Array.isArray(this._data)) {
              throw new Error('Cannot set field in array data.');
          }
          this._data[key] = v;
      }
      pos(x, y) {
          if (x === undefined)
              return this.bounds;
          if (typeof x === 'number') {
              this.bounds.x = x;
              this.bounds.y = y || 0;
          }
          else {
              this.bounds.x = x.x;
              this.bounds.y = x.y;
          }
          this.needsDraw = true;
          return this;
      }
      updatePos(opts) {
          if (!this.parent && !this.scene)
              return;
          if (opts.centerX || opts.center) {
              this.centerX();
          }
          else if (opts.left) {
              this.left(opts.left);
          }
          else if (opts.right) {
              this.right(opts.right);
          }
          else if (opts.x) {
              this.bounds.x = opts.x;
          }
          if (opts.centerY || opts.center) {
              this.centerY();
          }
          else if (opts.top) {
              this.top(opts.top);
          }
          else if (opts.bottom) {
              this.bottom(opts.bottom);
          }
          else if (opts.y) {
              this.bounds.y = opts.y;
          }
      }
      contains(...args) {
          if (this.hidden)
              return false;
          if (this.bounds.contains(args[0], args[1]))
              return true;
          return this.children.some((c) => c.contains(args[0], args[1]));
      }
      center(bounds) {
          return this.centerX(bounds).centerY(bounds);
      }
      centerX(bounds) {
          const dims = bounds || (this.parent ? this.parent.bounds : this.scene);
          if (!dims)
              throw new Error('Need parent or scene to apply center.');
          if ('x' in dims) {
              const w = this.bounds.width;
              const mid = Math.round((dims.width - w) / 2);
              this.bounds.x = dims.x + mid;
          }
          else {
              this.bounds.x = Math.round((dims.width - this.bounds.width) / 2);
          }
          return this;
      }
      centerY(bounds) {
          const dims = bounds || (this.parent ? this.parent.bounds : this.scene);
          if (!dims)
              throw new Error('Need parent or scene to apply center.');
          if ('y' in dims) {
              const h = this.bounds.height;
              const mid = Math.round((dims.height - h) / 2);
              this.bounds.y = dims.y + mid;
          }
          else {
              this.bounds.y = Math.round((dims.height - this.bounds.height) / 2);
          }
          return this;
      }
      left(n) {
          const x = this.parent ? this.parent.bounds.left : 0;
          this.bounds.left = x + n;
          return this;
      }
      right(n) {
          if (this.parent) {
              this.bounds.right = this.parent.bounds.right + n;
          }
          else if (this.scene) {
              this.bounds.right = this.scene.width + n - 1;
          }
          else {
              this.bounds.left = 0;
          }
          return this;
      }
      top(n) {
          const y = this.parent ? this.parent.bounds.top : 0;
          this.bounds.top = y + n;
          return this;
      }
      bottom(n) {
          if (this.parent) {
              this.bounds.bottom = this.parent.bounds.bottom + n - 1;
          }
          else if (this.scene) {
              this.bounds.bottom = this.scene.height + n - 1;
          }
          else {
              this.bounds.top = 0;
          }
          return this;
      }
      resize(w, h) {
          this.bounds.width = w || this.bounds.width;
          this.bounds.height = h || this.bounds.height;
          this.needsDraw = true;
          return this;
      }
      style(...args) {
          if (args.length == 0)
              return this._style;
          if (typeof args[0] !== 'string') {
              this._style.set(args[0]);
          }
          else {
              if (args[1] === undefined) {
                  const source = this._used || this._style;
                  return source.get(args[0]);
              }
              this._style.set(args[0], args[1]);
          }
          this.needsStyle = true;
          return this;
      }
      addClass(c) {
          const all = c.split(/ +/g);
          all.forEach((a) => {
              if (this.classes.includes(a))
                  return;
              this.classes.push(a);
          });
          return this;
      }
      removeClass(c) {
          const all = c.split(/ +/g);
          all.forEach((a) => {
              arrayDelete(this.classes, a);
          });
          return this;
      }
      hasClass(c) {
          const all = c.split(/ +/g);
          return arrayIncludesAll(this.classes, all);
      }
      toggleClass(c) {
          const all = c.split(/ +/g);
          all.forEach((a) => {
              if (this.classes.includes(a)) {
                  arrayDelete(this.classes, a);
              }
              else {
                  this.classes.push(a);
              }
          });
          return this;
      }
      attr(name, v) {
          if (v === undefined)
              return this._attrs[name];
          this._attrs[name] = v;
          return this;
      }
      _attrInt(name) {
          const n = this._attrs[name] || 0;
          if (typeof n === 'number')
              return n;
          if (typeof n === 'string')
              return Number.parseInt(n);
          return n ? 1 : 0;
      }
      _attrStr(name) {
          const n = this._attrs[name] || '';
          if (typeof n === 'string')
              return n;
          if (typeof n === 'number')
              return '' + n;
          return n ? 'true' : 'false';
      }
      _attrBool(name) {
          return !!this._attrs[name];
      }
      text(v) {
          if (v === undefined)
              return this._attrStr('text');
          this.attr('text', v);
          return this;
      }
      prop(name, v) {
          if (v === undefined)
              return this._props[name];
          const current = this._props[name];
          if (current !== v) {
              this._setProp(name, v);
          }
          return this;
      }
      _setProp(name, v) {
          // console.log(`${this.tag}.${name}=${v} (was:${this._props[name]})`);
          this._props[name] = v;
          this.needsStyle = true;
      }
      _propInt(name) {
          const n = this._props[name] || 0;
          if (typeof n === 'number')
              return n;
          if (typeof n === 'string')
              return Number.parseInt(n);
          return n ? 1 : 0;
      }
      _propStr(name) {
          const n = this._props[name] || '';
          if (typeof n === 'string')
              return n;
          if (typeof n === 'number')
              return '' + n;
          return n ? 'true' : 'false';
      }
      _propBool(name) {
          return !!this._props[name];
      }
      toggleProp(name) {
          const current = !!this._props[name];
          this.prop(name, !current);
          return this;
      }
      incProp(name, n = 1) {
          let current = this.prop(name) || 0;
          if (typeof current === 'boolean') {
              current = current ? 1 : 0;
          }
          else if (typeof current === 'string') {
              current = Number.parseInt(current) || 0;
          }
          current += n;
          this.prop(name, current);
          return this;
      }
      get hovered() {
          return !!this.prop('hover');
      }
      set hovered(v) {
          this.prop('hover', v);
      }
      get disabled() {
          let current = this;
          while (current) {
              if (current.prop('disabled'))
                  return true;
              current = current.parent;
          }
          return false;
      }
      set disabled(v) {
          this.prop('disabled', v);
      }
      get hidden() {
          let current = this;
          while (current) {
              if (current.prop('hidden'))
                  return true;
              current = current.parent;
          }
          return false;
      }
      set hidden(v) {
          this.prop('hidden', v);
          if (!v && this._used && this._used.opacity == 0) {
              this._used.opacity = 100;
          }
          if (v && this.scene && this.scene.focused === this) {
              this.scene.nextTabStop();
          }
          else if (!v && this.scene && this.scene.focused === null) {
              this.scene.setFocusWidget(this);
          }
          this.emit(v ? 'hide' : 'show');
      }
      get needsStyle() {
          return this._propBool('needsStyle');
      }
      set needsStyle(v) {
          this._props.needsStyle = v;
          if (v) {
              this.needsDraw = true; // changed style or state
          }
      }
      get focused() {
          return !!this.prop('focus');
      }
      focus(reverse = false) {
          if (this.prop('focus'))
              return;
          this.prop('focus', true);
          this.emit('focus', { reverse });
      }
      blur(reverse = false) {
          if (!this.prop('focus'))
              return;
          this.prop('focus', false);
          this.emit('blur', { reverse });
      }
      // CHILDREN
      setParent(parent, opts) {
          if (this.parent === parent)
              return;
          // remove from curent parent
          if (this.parent) {
              const index = this.parent.children.indexOf(this);
              if (index < 0)
                  throw new Error('Error in parent/child setup!');
              this.parent.children.splice(index, 1);
          }
          if (parent) {
              if (this.scene !== parent.scene) {
                  if (this.scene) {
                      this.scene._detach(this);
                  }
                  if (parent.scene) {
                      parent.scene._attach(this);
                  }
                  if (opts && opts.focused) {
                      this.scene.setFocusWidget(this);
                  }
              }
              if (opts && opts.first) {
                  parent.children.unshift(this);
              }
              else if (opts && opts.before) {
                  let index = -1;
                  if (typeof opts.before === 'string') {
                      index = parent.children.findIndex((c) => c.id === opts.before);
                  }
                  else {
                      index = parent.children.indexOf(opts.before);
                  }
                  if (index < 0) {
                      parent.children.unshift(this);
                  }
                  else {
                      parent.children.splice(index, 0, this);
                  }
              }
              else if (opts && opts.after) {
                  let index = -1;
                  if (typeof opts.after === 'string') {
                      index = parent.children.findIndex((c) => c.id === opts.before);
                  }
                  else {
                      index = parent.children.indexOf(opts.after);
                  }
                  if (index < 0) {
                      parent.children.push(this);
                  }
                  else {
                      parent.children.splice(index + 1, 0, this);
                  }
              }
              else {
                  parent.children.push(this);
              }
              this.parent = parent;
          }
          else {
              this.scene && this.scene._detach(this);
              this.parent = null;
          }
          if (opts && (this.parent || this.scene)) {
              this.updatePos(opts);
          }
      }
      addChild(child) {
          if (this.children.includes(child))
              return;
          child.setParent(this);
      }
      removeChild(child) {
          if (!this.children.includes(child))
              return;
          child.setParent(null);
      }
      childAt(xy$1, y) {
          if (!isXY(xy$1)) {
              xy$1 = { x: xy$1, y: y };
          }
          // if (!this.contains(xy)) return null;
          for (let child of this.children) {
              if (child.contains(xy$1))
                  return child;
          }
          return null;
      }
      getChild(id) {
          return this.children.find((c) => c.id === id) || null;
      }
      // EVENTS
      on(ev, cb) {
          if (ev === 'keypress') {
              this.prop('tabStop', true);
          }
          return this.events.on(ev, cb);
      }
      once(ev, cb) {
          if (ev === 'keypress') {
              this.prop('tabStop', true);
          }
          return this.events.once(ev, cb);
      }
      off(ev, cb) {
          this.events.off(ev, cb);
          // cannot turn off keypress automatically because
          // we could be waiting for dispatched events - e.g. 'Enter', or 'dir', ...
      }
      emit(ev, ...args) {
          return this.events.emit(ev, ...args);
      }
      action(ev) {
          if (ev && ev.defaultPrevented)
              return;
          if (this.emit('action')) {
              ev?.stopPropagation();
          }
          const action = this._attrStr('action');
          if (!action || !action.length)
              return;
          if (this.scene && this.scene.emit(action, this)) {
              ev?.stopPropagation();
          }
      }
      // FRAME
      input(e) {
          this.emit('input', e);
          if (e.defaultPrevented || e.propagationStopped)
              return;
          if (e.type === KEYPRESS) {
              this.keypress(e);
          }
          else if (e.type === MOUSEMOVE) {
              this.mousemove(e);
          }
          else if (e.type === CLICK) {
              this.click(e);
          }
      }
      _mouseenter(e) {
          if (!this.bounds.contains(e))
              return;
          if (this.hovered)
              return;
          this.hovered = true;
          this.emit('mouseenter', e);
          // if (this._parent) {
          //     this._parent._mouseenter(e);
          // }
      }
      mousemove(e) {
          for (let child of this.children) {
              child.mousemove(e);
          }
          if (this.bounds.contains(e) && !this.hidden) {
              //  && !e.defaultPrevented
              this._mouseenter(e);
              this._mousemove(e);
              // e.preventDefault();
          }
          else {
              this._mouseleave(e);
          }
      }
      _mousemove(e) {
          this.emit('mousemove', e);
      }
      _mouseleave(e) {
          if (!this.hovered)
              return;
          if (this.bounds.contains(e))
              return;
          this.hovered = false;
          this.emit('mouseleave', e);
          // if (this._parent) {
          //     this._parent.mouseleave(e);
          // }
      }
      click(e) {
          if (this.disabled || this.hidden)
              return;
          e.target = this;
          const c = this.childAt(e);
          if (c) {
              c.click(e);
          }
          if (!this.bounds.contains(e))
              return;
          if (e.propagationStopped)
              return;
          this._click(e);
          if (!e.defaultPrevented) {
              this.action(e);
          }
      }
      _click(e) {
          this.events.emit('click', e);
      }
      // keypress bubbles
      keypress(e) {
          if (this.hidden || this.disabled)
              return;
          let current = this;
          while (current && !e.propagationStopped) {
              e.dispatch(current.events);
              current = current.parent;
          }
      }
      draw(buffer) {
          if (this.needsStyle && this.scene) {
              this._used = this.scene.styles.computeFor(this);
              this.needsStyle = false;
          }
          if (this.hidden)
              return;
          this._draw(buffer);
          this.emit('draw', buffer);
          this.children.forEach((c) => c.draw(buffer));
      }
      _draw(buffer) {
          this._drawFill(buffer);
      }
      _drawFill(buffer) {
          const b = this.bounds;
          buffer.fillRect(b.x, b.y, b.width, b.height, ' ', this._used.bg, this._used.bg);
      }
      update(dt) {
          this.emit('update', dt);
      }
      fixed_update(dt) {
          this.emit('fixed_update', dt);
      }
      destroy() {
          if (this.parent) {
              this.setParent(null);
          }
          if (this.scene) {
              this.scene._detach(this);
          }
          this.children.forEach((c) => c.destroy());
          this.children = [];
          // @ts-ignore;
          this._used = null;
      }
  }
  function alignChildren(widget, align = 'left') {
      if (widget.children.length < 2)
          return;
      if (align === 'left') {
          const left = widget.children.reduce((out, c) => Math.min(out, c.bounds.left), 999);
          widget.children.forEach((c) => (c.bounds.left = left));
      }
      else if (align === 'right') {
          const right = widget.children.reduce((out, c) => Math.max(out, c.bounds.right), 0);
          widget.children.forEach((c) => (c.bounds.right = right));
      }
      else {
          // center
          const right = widget.children.reduce((out, c) => Math.max(out, c.bounds.right), 0);
          const left = widget.children.reduce((out, c) => Math.min(out, c.bounds.left), 999);
          const center = left + Math.floor((right - left) / 2);
          widget.children.forEach((c) => {
              c.bounds.center = center;
          });
      }
  }
  function spaceChildren(widget, space = 0) {
      if (widget.children.length < 2)
          return;
      let y = widget.children.reduce((out, c) => Math.min(out, c.bounds.top), 999);
      widget.children
          .slice()
          .sort((a, b) => a.bounds.top - b.bounds.top)
          .forEach((c) => {
          c.bounds.top = y;
          y = c.bounds.bottom + space;
      });
  }
  function wrapChildren(widget, pad = 0) {
      if (widget.children.length < 1)
          return;
      widget.bounds.copy(widget.children[0].bounds);
      widget.children.forEach((c) => {
          widget.bounds.include(c.bounds);
      });
      widget.bounds.pad(pad);
  }

  // import * as GWU from 'gw-utils';
  class Text extends Widget {
      constructor(opts) {
          super(opts);
          this._text = '';
          this._lines = [];
          this._fixedWidth = false;
          this._fixedHeight = false;
          this._fixedHeight = !!opts.height;
          this._fixedWidth = !!opts.width;
          this.bounds.width = opts.width || 0;
          this.bounds.height = opts.height || 1;
          this.text(opts.text || '');
      }
      text(v) {
          if (v === undefined)
              return this._text;
          this._text = v;
          let w = this._fixedWidth
              ? this.bounds.width
              : this.scene
                  ? this.scene.width
                  : 100;
          this._lines = splitIntoLines(this._text, w);
          if (!this._fixedWidth) {
              this.bounds.width = this._lines.reduce((out, line) => Math.max(out, length(line)), 0);
          }
          if (this._fixedHeight) {
              if (this._lines.length > this.bounds.height) {
                  this._lines.length = this.bounds.height;
              }
          }
          else {
              this.bounds.height = Math.max(1, this._lines.length);
          }
          this.needsDraw = true;
          return this;
      }
      resize(w, h) {
          super.resize(w, h);
          this._fixedWidth = w > 0;
          this._fixedHeight = h > 0;
          this.text(this._text);
          return this;
      }
      addChild() {
          throw new Error('Text widgets cannot have children.');
      }
      _draw(buffer) {
          super._draw(buffer);
          let vOffset = 0;
          if (this._used.valign === 'bottom') {
              vOffset = this.bounds.height - this._lines.length;
          }
          else if (this._used.valign === 'middle') {
              vOffset = Math.floor((this.bounds.height - this._lines.length) / 2);
          }
          this._lines.forEach((line, i) => {
              buffer.drawText(this.bounds.x, this.bounds.y + i + vOffset, line, this._used.fg, -1, this.bounds.width, this._used.align);
          });
      }
  }
  // // extend Layer
  // export type AddTextOptions = TextOptions & UpdatePosOpts & { parent?: Widget };
  // export function text(opts: AddTextOptions = {}): Text {
  //     const widget = new Text(opts);
  //     return widget;
  // }

  class Border extends Widget {
      constructor(opts) {
          super(opts);
          this.ascii = false;
          if (opts.ascii) {
              this.ascii = true;
          }
          else if (opts.fg && opts.ascii !== false) {
              this.ascii = true;
          }
      }
      // contains(e: XY.XY): boolean;
      // contains(x: number, y: number): boolean;
      contains() {
          return false;
      }
      _draw(buffer) {
          super._draw(buffer);
          const w = this.bounds.width;
          const h = this.bounds.height;
          const x = this.bounds.x;
          const y = this.bounds.y;
          const ascii = this.ascii;
          drawBorder(buffer, x, y, w, h, this._used, ascii);
          return true;
      }
  }
  /*
  // extend WidgetLayer
  export type AddBorderOptions = BorderOptions &
      Widget.SetParentOptions & { parent?: Widget.Widget };

  declare module './layer' {
      interface WidgetLayer {
          border(opts: AddBorderOptions): Border;
      }
  }
  WidgetLayer.prototype.border = function (opts: AddBorderOptions): Border {
      const options = Object.assign({}, this._opts, opts);
      const list = new Border(this, options);
      if (opts.parent) {
          list.setParent(opts.parent, opts);
      }
      return list;
  };
  */
  function drawBorder(buffer, x, y, w, h, style, ascii) {
      const fg = style.fg;
      const bg = style.bg;
      if (ascii) {
          for (let i = 1; i < w; ++i) {
              buffer.draw(x + i, y, '-', fg, bg);
              buffer.draw(x + i, y + h - 1, '-', fg, bg);
          }
          for (let j = 1; j < h; ++j) {
              buffer.draw(x, y + j, '|', fg, bg);
              buffer.draw(x + w - 1, y + j, '|', fg, bg);
          }
          buffer.draw(x, y, '+', fg, bg);
          buffer.draw(x + w - 1, y, '+', fg, bg);
          buffer.draw(x, y + h - 1, '+', fg, bg);
          buffer.draw(x + w - 1, y + h - 1, '+', fg, bg);
      }
      else {
          forBorder(x, y, w, h, (x, y) => {
              buffer.draw(x, y, ' ', bg, bg);
          });
      }
  }

  // import * as GWU from 'gw-utils';
  function toPadArray(pad) {
      if (!pad)
          return [0, 0, 0, 0];
      if (pad === true) {
          return [1, 1, 1, 1];
      }
      else if (typeof pad === 'number') {
          return [pad, pad, pad, pad];
      }
      else if (pad.length == 1) {
          const p = pad[0];
          return [p, p, p, p];
      }
      else if (pad.length == 2) {
          const [pv, ph] = pad;
          return [pv, ph, pv, ph];
      }
      throw new Error('Invalid pad: ' + pad);
  }
  defaultStyle.add('dialog', {
      bg: 'darkest_gray',
      fg: 'light_gray',
  });
  class Dialog extends Widget {
      static { this.default = {
          tag: 'dialog',
          border: 'none',
          pad: false,
          legendTag: 'legend',
          legendClass: '',
          legendAlign: 'left',
      }; }
      constructor(opts) {
          super((() => {
              opts.tag = opts.tag || Dialog.default.tag;
              return opts;
          })());
          this.legend = null;
          let border = opts.border || Dialog.default.border;
          this.attr('border', border);
          const pad = toPadArray(opts.pad || Dialog.default.pad);
          this.attr('padTop', pad[0]);
          this.attr('padRight', pad[1]);
          this.attr('padBottom', pad[2]);
          this.attr('padLeft', pad[3]);
          if (border !== 'none') {
              for (let i = 0; i < 4; ++i) {
                  pad[i] += 1;
              }
          }
          this._adjustBounds(pad);
          this.attr('legendTag', opts.legendTag || Dialog.default.legendTag);
          this.attr('legendClass', opts.legendClass || opts.class || Dialog.default.legendClass);
          this.attr('legendAlign', opts.legendAlign || Dialog.default.legendAlign);
          this._addLegend(opts);
      }
      _adjustBounds(pad) {
          // adjust w,h,x,y for border/pad
          this.bounds.width += pad[1] + pad[3];
          this.bounds.height += pad[0] + pad[2];
          this.bounds.x -= pad[3];
          this.bounds.y -= pad[0];
          return this;
      }
      get _innerLeft() {
          const border = this._attrStr('border');
          const padLeft = this._attrInt('padLeft');
          return this.bounds.x + padLeft + (border === 'none' ? 0 : 1);
      }
      get _innerWidth() {
          const border = this._attrStr('border');
          const padSize = this._attrInt('padLeft') + this._attrInt('padRight');
          return this.bounds.width - padSize - (border === 'none' ? 0 : 2);
      }
      get _innerTop() {
          const border = this._attrStr('border');
          const padTop = this._attrInt('padTop');
          return this.bounds.y + padTop + (border === 'none' ? 0 : 1);
      }
      get _innerHeight() {
          const border = this._attrStr('border');
          const padSize = this._attrInt('padTop') + this._attrInt('padBottom');
          return this.bounds.height - padSize - (border === 'none' ? 0 : 2);
      }
      _addLegend(opts) {
          if (!opts.legend) {
              if (this._attrStr('border') === 'none') {
                  this.bounds.height = 0;
              }
              return this;
          }
          const border = this._attrStr('border') !== 'none';
          const textWidth = length(opts.legend);
          const width = this.bounds.width - (border ? 4 : 0);
          const align = this._attrStr('legendAlign');
          let x = this.bounds.x + (border ? 2 : 0);
          if (align === 'center') {
              x += Math.floor((width - textWidth) / 2);
          }
          else if (align === 'right') {
              x += width - textWidth;
          }
          this.legend = new Text({
              parent: this,
              text: opts.legend,
              x,
              y: this.bounds.y,
              // depth: this.depth + 1,
              tag: this._attrStr('legendTag'),
              class: this._attrStr('legendClass'),
          });
          // if (this.bounds.width < this.legend.bounds.width + 4) {
          //     this.bounds.width = this.legend.bounds.width + 4;
          // }
          // this.bounds.height +=
          //     this._attrInt('padTop') + this._attrInt('padBottom');
          this.bounds.height = Math.max(1, this.bounds.height);
          return this;
      }
      _draw(buffer) {
          super._draw(buffer);
          const border = this._attrStr('border');
          if (border === 'none')
              return false;
          drawBorder(buffer, this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, this._used, border === 'ascii');
          return true;
      }
  }
  function dialog(opts) {
      const widget = new Dialog(opts);
      return widget;
  }

  // import * as Color from '../color';
  const AlertScene = {
      create() {
          this.on('mousemove', (e) => {
              e.stopPropagation();
          });
          this.on('click', (e) => {
              e.stopPropagation();
              this.stop({ click: true });
          });
          this.on('keypress', (e) => {
              e.stopPropagation();
              this.stop({ keypress: true });
          });
      },
      start(data) {
          if (data.args) {
              data.text = apply(data.text, data.args);
          }
          data.class = data.class || 'alert';
          data.border = data.border || 'ascii';
          data.pad = data.pad || 1;
          const text = new Text(data);
          if (!data.height) {
              data.height = text.bounds.height;
          }
          if (!data.width) {
              data.width = text.bounds.width;
          }
          data.scene = this;
          data.center = true;
          const dialog = new Dialog(data);
          text.setParent(dialog, { center: true });
          if (!data.waitForAck) {
              this.wait(data.duration || 3000, () => this.stop({}));
          }
      },
      stop() {
          this.children.forEach((c) => c.destroy());
          this.children = [];
          this.timers.clear();
      },
  };
  installScene('alert', AlertScene);

  // import * as GWU from 'gw-utils';
  class Button extends Text {
      constructor(opts) {
          super((() => {
              opts.text = opts.text || '';
              opts.tabStop = opts.tabStop === undefined ? true : opts.tabStop;
              opts.tag = opts.tag || 'button';
              if (!opts.text && !opts.width)
                  throw new Error('Buttons must have text or width.');
              if (opts.text.length == 0) {
                  opts.width = opts.width || 2;
              }
              return opts;
          })());
          this.on('click', this.action.bind(this));
          this.on('Enter', this.action.bind(this));
      }
  }
  /*
  // extend Layer

  export type AddButtonOptions = Omit<ButtonOptions, 'text'> &
      Widget.SetParentOptions & { parent?: Widget.Widget };

  declare module './layer' {
      interface WidgetLayer {
          button(text: string, opts?: AddButtonOptions): Button;
      }
  }
  WidgetLayer.prototype.button = function (
      text: string,
      opts: AddButtonOptions
  ): Button {
      const options: ButtonOptions = Object.assign({}, this._opts, opts, {
          text,
      });
      const widget = new Button(this, options);
      if (opts.parent) {
          widget.setParent(opts.parent, opts);
      }
      this.pos(widget.bounds.x, widget.bounds.bottom);
      return widget;
  };
  */

  // import * as GWU from 'gw-utils';
  const ConfirmScene = {
      create() {
          this.on('keypress', (e) => {
              if (e.key === 'Escape') {
                  this.emit('CANCEL');
              }
              else if (e.key === 'Enter') {
                  this.emit('OK');
              }
          });
          this.on('OK', () => {
              this.stop(true);
          });
          this.on('CANCEL', () => {
              this.stop(false);
          });
      },
      start(opts) {
          opts.class = opts.class || 'confirm';
          opts.border = opts.border || 'ascii';
          opts.pad = opts.pad || 1;
          // Fade the background
          const opacity = opts.opacity !== undefined ? opts.opacity : 50;
          this.bg = BLACK.alpha(opacity);
          if (opts.cancel === undefined) {
              opts.cancel = 'Cancel';
          }
          else if (opts.cancel === true) {
              opts.cancel = 'Cancel';
          }
          else if (!opts.cancel) {
              opts.cancel = '';
          }
          opts.ok = opts.ok || 'Ok';
          let buttonWidth = opts.buttonWidth || 0;
          if (!buttonWidth) {
              buttonWidth = Math.max(opts.ok.length, opts.cancel.length);
          }
          const width = Math.max(opts.width || 0, buttonWidth * 2 + 2);
          // create the text widget
          const textWidget = new Text({
              scene: this,
              text: opts.text,
              class: opts.textClass || opts.class,
              width: width,
              height: opts.height,
          }).center();
          Object.assign(opts, {
              scene: this,
              width: textWidget.bounds.width + 2,
              height: textWidget.bounds.height + 2, // for buttons
              x: textWidget.bounds.x,
              y: textWidget.bounds.y,
              tag: 'confirm',
          });
          const dialog = new Dialog(opts);
          dialog.addChild(textWidget);
          new Button({
              parent: dialog,
              text: opts.ok,
              class: opts.okClass || opts.class,
              width: buttonWidth,
              id: 'OK',
              right: -1 - dialog._attrInt('padRight'),
              bottom: -1 - dialog._attrInt('padBottom'),
          });
          if (opts.cancel.length) {
              new Button({
                  parent: dialog,
                  text: opts.cancel,
                  class: opts.cancelClass || opts.class,
                  width: buttonWidth,
                  id: 'CANCEL',
                  left: 1 + dialog._attrInt('padLeft'),
                  bottom: -1 - dialog._attrInt('padBottom'),
              });
          }
          if (opts.done) {
              const done = opts.done;
              this.once('OK', () => {
                  done(true);
              });
              this.once('CANCEL', () => {
                  done(false);
              });
          }
      },
      stop() {
          this.children.forEach((c) => c.destroy());
          this.children = [];
      },
  };
  installScene('confirm', ConfirmScene);

  // import * as GWU from 'gw-utils';
  defaultStyle.add('input', {
      bg: 'light_gray',
      fg: 'black',
      align: 'left',
      valign: 'top',
  });
  defaultStyle.add('input:invalid', {
      fg: 'red',
  });
  defaultStyle.add('input:empty', {
      fg: 'darkest_green',
  });
  defaultStyle.add('input:focus', {
      bg: 'lighter_gray',
  });
  class Input extends Text {
      static { this.default = {
          tag: 'input',
          width: 10,
          placeholder: '',
      }; }
      constructor(opts) {
          super((() => {
              opts.text = opts.text || '';
              opts.tag = opts.tag || 'input';
              opts.tabStop = opts.tabStop === undefined ? true : opts.tabStop;
              opts.width =
                  opts.width ||
                      opts.maxLength ||
                      Math.max(opts.minLength || 0, 10);
              return opts;
          })());
          this.minLength = 0;
          this.maxLength = 0;
          this.numbersOnly = false;
          this.min = 0;
          this.max = 0;
          this.attr('default', this._text);
          this.attr('placeholder', opts.placeholder || Input.default.placeholder);
          if (opts.numbersOnly) {
              this.numbersOnly = true;
              this.min = opts.min || 0;
              this.max = opts.max || 0;
          }
          else {
              this.minLength = opts.minLength || 0;
              this.maxLength = opts.maxLength || 0;
          }
          if (opts.required) {
              this.attr('required', true);
              this.prop('required', true);
          }
          if (opts.disabled) {
              this.attr('disabled', true);
              this.prop('disabled', true);
          }
          this.prop('valid', this.isValid()); // redo b/c rules are now set
          this.on('blur', () => this.action());
          // this.on('click', this.action.bind(this));
          this.reset();
      }
      reset() {
          this.text(this._attrStr('default'));
      }
      _setProp(name, v) {
          super._setProp(name, v);
          this._props.valid = this.isValid();
      }
      isValid() {
          const t = this._text || '';
          if (this.numbersOnly) {
              const val = Number.parseInt(t);
              if (this.min !== undefined && val < this.min)
                  return false;
              if (this.max !== undefined && val > this.max)
                  return false;
              return val > 0;
          }
          const minLength = Math.max(this.minLength, this.prop('required') ? 1 : 0);
          return (t.length >= minLength &&
              (!this.maxLength || t.length <= this.maxLength));
      }
      keypress(ev) {
          if (!ev.key)
              return;
          const textEntryBounds = this.numbersOnly ? ['0', '9'] : [' ', '~'];
          if (ev.key === 'Enter' && this.isValid()) {
              this.action();
              this.scene && this.scene.nextTabStop();
              ev.stopPropagation();
              return;
          }
          if (ev.key == 'Delete' || ev.key == 'Backspace') {
              if (this._text.length) {
                  this.text(spliceRaw(this._text, this._text.length - 1, 1));
                  this.emit('change');
                  this._used && this._draw(this.scene.buffer); // save some work?
              }
              ev.stopPropagation();
              return;
          }
          else if (isControlCode(ev)) {
              // ignore other special keys...
              return;
          }
          // eat/use all other keys
          if (ev.key >= textEntryBounds[0] && ev.key <= textEntryBounds[1]) {
              // allow only permitted input
              if (!this.maxLength || this._text.length < this.maxLength) {
                  this.text(this._text + ev.key);
                  this.emit('change');
                  this._used && this._draw(this.scene.buffer); // save some work?
              }
          }
          ev.stopPropagation();
      }
      click(e) {
          if (this.disabled || this.hidden)
              return;
          e.target = this;
          const c = this.childAt(e);
          if (c) {
              c.click(e);
          }
          if (!this.bounds.contains(e))
              return;
          if (e.propagationStopped)
              return;
          e.dispatch(this.events);
      }
      text(v) {
          if (v === undefined)
              return this._text;
          super.text(v);
          this.prop('empty', this._text.length === 0);
          this.prop('valid', this.isValid());
          return this;
      }
      _draw(buffer, _force = false) {
          this._drawFill(buffer);
          let vOffset = 0;
          if (!this._used) ;
          else if (this._used.valign === 'bottom') {
              vOffset = this.bounds.height - this._lines.length;
          }
          else if (this._used.valign === 'middle') {
              vOffset = Math.floor((this.bounds.height - this._lines.length) / 2);
          }
          let show = this._text;
          if (show.length == 0) {
              show = this._attrStr('placeholder');
          }
          if (this._text.length > this.bounds.width) {
              show = this._text.slice(this._text.length - this.bounds.width);
          }
          const fg = this._used ? this._used.fg : 'white';
          const align = this._used ? this._used.align : 'left';
          buffer.drawText(this.bounds.x, this.bounds.y + vOffset, show, fg, -1, this.bounds.width, align);
          return true;
      }
  }
  /*
  // extend WidgetLayer

  export type AddInputOptions = InputOptions &
      Widget.SetParentOptions & { parent?: Widget.Widget };

  declare module './layer' {
      interface WidgetLayer {
          input(opts: AddInputOptions): Input;
      }
  }
  WidgetLayer.prototype.input = function (opts: AddInputOptions): Input {
      const options = Object.assign({}, this._opts, opts);
      const list = new Input(this, options);
      if (opts.parent) {
          list.setParent(opts.parent, opts);
      }
      return list;
  };
  */

  // import * as GWU from 'gw-utils';
  const PromptScene = {
      create() {
          this.on('mousemove', (e) => {
              e.stopPropagation();
          });
          this.on('click', (e) => {
              e.stopPropagation();
          });
          this.on('keypress', (e) => {
              e.stopPropagation();
          });
          this.on('INPUT', () => {
              const input = this.get('INPUT');
              this.stop(input ? input.text() : null);
          });
          this.on('Escape', () => {
              this.stop(null);
          });
      },
      start(opts) {
          opts.class = opts.class || 'confirm';
          opts.border = opts.border || 'ascii';
          opts.pad = opts.pad || 0;
          // Fade the background
          const opacity = opts.opacity !== undefined ? opts.opacity : 50;
          this.bg = BLACK.alpha(opacity);
          // create the text widget
          const textWidget = new Text({
              text: opts.prompt,
              class: opts.textClass || opts.class,
              width: opts.width,
              height: opts.height,
          });
          Object.assign(opts, {
              width: textWidget.bounds.width + 2,
              height: textWidget.bounds.height + 1, // for input
              x: textWidget.bounds.x - 1,
              y: textWidget.bounds.y - 1,
              tag: 'inputbox',
              scene: this,
              center: true,
          });
          const dialog = new Dialog(opts);
          textWidget.setParent(dialog, { top: 1, centerX: true });
          let width = dialog._innerWidth - 2;
          let x = textWidget.bounds.left;
          if (opts.label) {
              const label = new Text({
                  parent: dialog,
                  text: opts.label,
                  class: opts.labelClass || opts.class,
                  tag: 'label',
                  x,
                  bottom: -1,
              });
              x += label.bounds.width + 1;
              width -= label.bounds.width + 1;
          }
          const input = new Input({
              parent: dialog,
              class: opts.inputClass || opts.class,
              width,
              id: 'INPUT',
              x,
              bottom: -1,
          });
          this.once('INPUT', () => {
              if (opts.done)
                  opts.done(input.text());
          });
          this.once('Escape', () => {
              if (opts.done)
                  opts.done(null);
          });
      },
      stop() {
          this.children.forEach((c) => c.destroy());
          this.children = [];
      },
  };
  installScene('prompt', PromptScene);

  // import * as Color from '../color';
  const MenuScene = {
      create() {
          this.on('click', () => {
              this.stop();
          });
          this.on('Escape', () => {
              this.stop();
          });
      },
      start(data) {
          if (!data.menu)
              throw new Error('Must supply a menu to show!');
          this.addChild(data.menu);
          this.events.onUnhandled = (ev, ...args) => {
              data.origin.emit(ev, ...args);
          };
      },
      stop() {
          this.children = [];
      },
  };
  installScene('menu', MenuScene);

  var index$2$1 = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	AlertScene: AlertScene,
  	ConfirmScene: ConfirmScene,
  	MenuScene: MenuScene,
  	PromptScene: PromptScene
  });

  // import * as GWU from 'gw-utils';
  class Fieldset extends Dialog {
      static { this.default = {
          tag: 'fieldset',
          border: 'none',
          separator: ' : ',
          pad: false,
          legendTag: 'legend',
          legendClass: 'legend',
          legendAlign: 'left',
          labelTag: 'label',
          labelClass: '',
          dataTag: 'field',
          dataClass: '',
      }; }
      constructor(opts) {
          super((() => {
              opts.tag = opts.tag || Fieldset.default.tag;
              opts.border = opts.border || Fieldset.default.border;
              opts.legendTag = opts.legendTag || Fieldset.default.legendTag;
              opts.legendClass =
                  opts.legendClass || Fieldset.default.legendClass;
              opts.legendAlign =
                  opts.legendAlign || Fieldset.default.legendAlign;
              opts.width = opts.width || 0;
              opts.height = opts.height || 0;
              return opts;
          })());
          this.fields = [];
          this.attr('separator', opts.separator || Fieldset.default.separator);
          this.attr('dataTag', opts.dataTag || Fieldset.default.dataTag);
          this.attr('dataClass', opts.dataClass || Fieldset.default.dataClass);
          this.attr('dataWidth', opts.dataWidth);
          this.attr('labelTag', opts.labelTag || Fieldset.default.labelTag);
          this.attr('labelClass', opts.labelClass || Fieldset.default.labelClass);
          this.attr('labelWidth', this._innerWidth - opts.dataWidth);
          this._addLegend(opts);
      }
      _adjustBounds(pad) {
          this.bounds.width = Math.max(this.bounds.width, pad[1] + pad[3]);
          this.bounds.height = Math.max(this.bounds.height, pad[0] + pad[2]);
          return this;
      }
      get _labelLeft() {
          const border = this._attrStr('border');
          const padLeft = this._attrInt('padLeft');
          return this.bounds.x + padLeft + (border === 'none' ? 0 : 1);
      }
      get _dataLeft() {
          return this._labelLeft + this._attrInt('labelWidth');
      }
      get _nextY() {
          let border = this._attrStr('border') === 'none' ? 0 : 1;
          const padBottom = this._attrInt('padBottom');
          return this.bounds.bottom - border - padBottom;
      }
      add(label, format) {
          const sep = this._attrStr('separator');
          const labelText = padEnd(label, this._attrInt('labelWidth') - sep.length, ' ') + sep;
          new Text({
              parent: this,
              text: labelText,
              x: this._labelLeft,
              y: this._nextY,
              width: this._attrInt('labelWidth'),
              tag: this._attrStr('labelTag'),
              class: this._attrStr('labelClass'),
          });
          if (typeof format === 'string') {
              format = { format };
          }
          format.x = this._dataLeft;
          format.y = this._nextY;
          format.width = this._attrInt('dataWidth');
          format.tag = format.tag || this._attrStr('dataTag');
          format.class = format.class || this._attrStr('dataClass');
          format.parent = this;
          const field = new Field(format);
          this.bounds.height += 1;
          this.fields.push(field);
          return this;
      }
      _setData(v) {
          super._setData(v);
          this.fields.forEach((f) => f.format(v));
      }
      _setDataItem(key, v) {
          super._setDataItem(key, v);
          this.fields.forEach((f) => f.format(v));
      }
  }
  class Field extends Text {
      constructor(opts) {
          super((() => {
              // @ts-ignore
              const topts = opts;
              topts.tag = topts.tag || 'field';
              topts.text = '';
              return topts;
          })());
          if (typeof opts.format === 'string') {
              this._format = compile$1(opts.format);
          }
          else {
              this._format = opts.format;
          }
      }
      format(v) {
          const t = this._format(v) || '';
          return this.text(t);
      }
  }

  class OrderedList extends Widget {
      static { this.default = {
          pad: 1,
      }; }
      constructor(opts) {
          super((() => {
              opts.tag = opts.tag || 'ol';
              return opts;
          })());
          this._fixedWidth = false;
          this._fixedHeight = false;
          this._fixedHeight = !!opts.height;
          this._fixedWidth = !!opts.width;
          this.prop('pad', opts.pad || OrderedList.default.pad);
      }
      addChild(w) {
          w.bounds.x = this.bounds.x + 2;
          if (!this._fixedHeight) {
              w.bounds.y = this.bounds.bottom - 2;
              this.bounds.height += w.bounds.height;
          }
          if (this._fixedWidth) {
              w.bounds.width = Math.min(w.bounds.width, this.bounds.width - 4);
          }
          else if (w.bounds.width > this.bounds.width - 4) {
              this.bounds.width = w.bounds.width + 4;
          }
          return super.addChild(w);
      }
      _draw(buffer) {
          this._drawFill(buffer);
          this.children.forEach((c, i) => {
              this._drawBulletFor(c, buffer, i);
          });
          return true;
      }
      _getBullet(index) {
          return '' + (index + 1);
      }
      _drawBulletFor(widget, buffer, index) {
          const bullet = this._getBullet(index);
          const size = this._attrInt('pad') + bullet.length;
          const x = widget.bounds.x - size;
          const y = widget.bounds.y;
          buffer.drawText(x, y, bullet, widget._used.fg, widget._used.bg, size);
      }
  }
  class UnorderedList extends OrderedList {
      static { this.default = {
          bullet: '\u2022', // bullet
          pad: 1,
      }; }
      constructor(opts) {
          super((() => {
              opts.tag = opts.tag || 'ul';
              return opts;
          })());
          this.prop('bullet', opts.bullet || UnorderedList.default.bullet);
          this.prop('pad', opts.pad || UnorderedList.default.pad);
      }
      _getBullet(_index) {
          return this._attrStr('bullet');
      }
  }
  /*
  // extend WidgetLayer

  export type AddOrderedListOptions = OrderedListOptions &
      Widget.SetParentOptions & { parent?: Widget.Widget };

  export type AddUnorderedListOptions = UnorderedListOptions &
      Widget.SetParentOptions & { parent?: Widget.Widget };

  declare module './layer' {
      interface WidgetLayer {
          ol(opts?: AddOrderedListOptions): OrderedList;
          ul(opts?: AddUnorderedListOptions): UnorderedList;
      }
  }

  WidgetLayer.prototype.ol = function (
      opts: AddOrderedListOptions = {}
  ): OrderedList {
      const options = Object.assign({}, this._opts, opts) as OrderedListOptions;
      const widget = new OrderedList(this, options);
      if (opts.parent) {
          widget.setParent(opts.parent, opts);
      }
      return widget;
  };

  WidgetLayer.prototype.ul = function (
      opts: AddUnorderedListOptions = {}
  ): UnorderedList {
      const options = Object.assign({}, this._opts, opts) as UnorderedListOptions;
      const widget = new UnorderedList(this, options);
      if (opts.parent) {
          widget.setParent(opts.parent, opts);
      }
      return widget;
  };
  */

  // import * as GWU from 'gw-utils';
  defaultStyle.add('datatable', { bg: 'black' });
  // STYLE.defaultStyle.add('th', { bg: 'light_teal', fg: 'dark_blue' });
  // STYLE.defaultStyle.add('td', { bg: 'darker_gray' });
  // STYLE.defaultStyle.add('td:odd', { bg: 'gray' });
  // STYLE.defaultStyle.add('td:hover', { bg: 'light_gray' });
  defaultStyle.add('td:selected', { bg: 'gray' });
  class Column {
      constructor(opts) {
          this.format = IDENTITY;
          this.width = opts.width || DataTable.default.columnWidth;
          if (typeof opts.format === 'function') {
              this.format = opts.format;
          }
          else if (opts.format) {
              this.format = compile$1(opts.format);
          }
          this.header = opts.header || '';
          this.headerTag = opts.headerTag || DataTable.default.headerTag;
          this.empty = opts.empty || DataTable.default.empty;
          this.dataTag = opts.dataTag || DataTable.default.dataTag;
      }
      addHeader(table, x, y, col) {
          const t = new Text({
              parent: table,
              x,
              y,
              class: table.classes.join(' '),
              tag: table._attrStr('headerTag'),
              width: this.width,
              height: table.rowHeight,
              // depth: table.depth + 1,
              text: this.header,
          });
          t.prop('row', -1);
          t.prop('col', col);
          // table.scene.attach(t);
          return t;
      }
      addData(table, data, x, y, col, row) {
          let text;
          if (Array.isArray(data)) {
              text = '' + (data[col] || this.empty);
          }
          else if (typeof data !== 'object') {
              text = '' + data;
          }
          else {
              text = this.format(data);
          }
          if (text === '') {
              text = this.empty;
          }
          const widget = new Text({
              parent: table,
              text,
              x,
              y,
              class: table.classes.join(' '),
              tag: table._attrStr('dataTag'),
              width: this.width,
              height: table.rowHeight,
              // depth: table.depth + 1,
          });
          widget.on('mouseenter', () => {
              table.select(col, row);
          });
          widget.prop(row % 2 == 0 ? 'even' : 'odd', true);
          widget.prop('row', row);
          widget.prop('col', col);
          // table.addChild(widget);
          return widget;
      }
      addEmpty(table, x, y, col, row) {
          return this.addData(table, [], x, y, col, row);
      }
  }
  class DataTable extends Widget {
      static { this.default = {
          columnWidth: 10,
          header: true,
          empty: '',
          tag: 'datatable',
          headerTag: 'th',
          dataTag: 'td',
          select: 'cell',
          hover: 'select',
          prefix: 'none',
          border: 'ascii',
          wrap: true,
      }; }
      constructor(opts) {
          super((() => {
              opts.tag = opts.tag || DataTable.default.tag;
              opts.tabStop = opts.tabStop === undefined ? true : opts.tabStop;
              if (opts.data) {
                  if (!Array.isArray(opts.data)) {
                      opts.data = [opts.data];
                  }
              }
              else {
                  opts.data = [];
              }
              return opts;
          })());
          this.columns = [];
          this.showHeader = false;
          this.rowHeight = 1;
          this.selectedRow = -1;
          this.selectedColumn = 0;
          this.size =
              opts.size ||
                  (this.parent
                      ? this.parent.bounds.height
                      : this.scene
                          ? this.scene.height
                          : 0);
          this.bounds.width = 0;
          opts.columns.forEach((o) => {
              const col = new Column(o);
              this.columns.push(col);
              this.bounds.width += col.width;
          });
          if (opts.border) {
              if (opts.border === true)
                  opts.border = 'ascii';
          }
          else if (opts.border === false) {
              opts.border = 'none';
          }
          this.attr('border', opts.border || DataTable.default.border);
          this.rowHeight = opts.rowHeight || 1;
          this.bounds.height = 1;
          this.attr('wrap', opts.wrap === undefined ? DataTable.default.wrap : opts.wrap);
          this.attr('header', opts.header === undefined ? DataTable.default.header : opts.header);
          this.attr('headerTag', opts.headerTag || DataTable.default.headerTag);
          this.attr('dataTag', opts.dataTag || DataTable.default.dataTag);
          this.attr('prefix', opts.prefix || DataTable.default.prefix);
          this.attr('select', opts.select || DataTable.default.select);
          this.attr('hover', opts.hover || DataTable.default.hover);
          this._setData(this._data);
      }
      get selectedData() {
          if (this.selectedRow < 0)
              return undefined;
          return this._data[this.selectedRow];
      }
      select(col, row) {
          // console.log('select', col, row);
          if (!this._data || this._data.length == 0) {
              this.selectedRow = this.selectedColumn = 0;
              return this;
          }
          if (this.attr('wrap')) {
              if (col < 0 || col >= this.columns.length) {
                  col += this.columns.length;
                  col %= this.columns.length;
              }
              if (row < 0 || row >= this._data.length) {
                  row += this._data.length;
                  row %= this._data.length;
              }
          }
          col = this.selectedColumn = clamp(col, 0, this.columns.length - 1);
          row = this.selectedRow = clamp(row, 0, this._data.length - 1);
          const select = this._attrStr('select');
          if (select === 'none') {
              this.children.forEach((c) => {
                  c.prop('selected', false);
              });
          }
          else if (select === 'row') {
              this.children.forEach((c) => {
                  const active = row == c.prop('row');
                  c.prop('selected', active);
              });
          }
          else if (select === 'column') {
              this.children.forEach((c) => {
                  const active = col == c.prop('col');
                  c.prop('selected', active);
              });
          }
          else if (select === 'cell') {
              this.children.forEach((c) => {
                  const active = col == c.prop('col') && row == c.prop('row');
                  c.prop('selected', active);
              });
          }
          this.emit('change', {
              row,
              col,
              data: this.selectedData,
          });
          return this;
      }
      selectNextRow() {
          return this.select(this.selectedColumn, this.selectedRow + 1);
      }
      selectPrevRow() {
          return this.select(this.selectedColumn, this.selectedRow - 1);
      }
      selectNextCol() {
          return this.select(this.selectedColumn + 1, this.selectedRow);
      }
      selectPrevCol() {
          return this.select(this.selectedColumn - 1, this.selectedRow);
      }
      blur(reverse) {
          this.emit('change', {
              col: this.selectedColumn,
              row: this.selectedRow,
              data: this.selectedData,
          });
          return super.blur(reverse);
      }
      _setData(v) {
          this._data = v;
          for (let i = this.children.length - 1; i >= 0; --i) {
              const c = this.children[i];
              if (c.tag !== this.attr('headerTag')) {
                  this.removeChild(c);
              }
          }
          const borderAdj = this.attr('border') !== 'none' ? 1 : 0;
          let x = this.bounds.x + borderAdj;
          let y = this.bounds.y + borderAdj;
          if (this.attr('header')) {
              this.columns.forEach((col, i) => {
                  col.addHeader(this, x, y, i);
                  x += col.width + borderAdj;
              });
              y += this.rowHeight + borderAdj;
          }
          this._data.forEach((obj, j) => {
              if (j >= this.size)
                  return;
              x = this.bounds.x + borderAdj;
              this.columns.forEach((col, i) => {
                  col.addData(this, obj, x, y, i, j);
                  x += col.width + borderAdj;
              });
              y += this.rowHeight + borderAdj;
          });
          if (this._data.length == 0) {
              x = this.bounds.x + borderAdj;
              this.columns.forEach((col, i) => {
                  col.addEmpty(this, x, y, i, 0);
                  x += col.width + borderAdj;
              });
              y += 1;
              this.select(-1, -1);
          }
          else {
              this.select(0, 0);
          }
          this.bounds.height = y - this.bounds.y;
          this.bounds.width = x - this.bounds.x;
          this.needsStyle = true; // sets this.needsDraw
          return this;
      }
      _draw(buffer) {
          this._drawFill(buffer);
          this.children.forEach((w) => {
              if (w._propInt('row') >= this.size)
                  return;
              if (this.attr('border') !== 'none') {
                  drawBorder(buffer, w.bounds.x - 1, w.bounds.y - 1, w.bounds.width + 2, w.bounds.height + 2, this._used, this.attr('border') == 'ascii');
              }
          });
          return true;
      }
      // _mouseenter(e: IO.Event): void {
      //     super._mouseenter(e);
      //     if (!this.hovered) return;
      //     const hovered = this.children.find((c) => c.contains(e));
      //     if (hovered) {
      //         const col = hovered._propInt('col');
      //         const row = hovered._propInt('row');
      //         if (col !== this.selectedColumn || row !== this.selectedRow) {
      //             this.selectedColumn = col;
      //             this.selectedRow = row;
      //             let select = false;
      //             let hover = this._attrStr('hover');
      //             if (hover === 'select') {
      //                 hover = this._attrStr('select');
      //                 select = true;
      //             }
      //             if (hover === 'none') {
      //                 this.children.forEach((c) => {
      //                     c.hovered = false;
      //                     if (select) c.prop('selected', false);
      //                 });
      //             } else if (hover === 'row') {
      //                 this.children.forEach((c) => {
      //                     const active = row == c.prop('row');
      //                     c.hovered = active;
      //                     if (select) c.prop('selected', active);
      //                 });
      //             } else if (hover === 'column') {
      //                 this.children.forEach((c) => {
      //                     const active = col == c.prop('col');
      //                     c.hovered = active;
      //                     if (select) c.prop('selected', active);
      //                 });
      //             } else if (hover === 'cell') {
      //                 this.children.forEach((c) => {
      //                     const active =
      //                         col == c.prop('col') && row == c.prop('row');
      //                     c.hovered = active;
      //                     if (select) c.prop('selected', active);
      //                 });
      //             }
      //             this.emit('change', {
      //                 row,
      //                 col,
      //                 data: this.selectedData,
      //             });
      //         }
      //     }
      // }
      // click(e: IO.Event): boolean {
      //     if (!this.contains(e) || this.disabled || this.hidden) return false;
      //     this.action();
      //     // this.emit('change', {
      //     //     row: this.selectedRow,
      //     //     col: this.selectedColumn,
      //     //     data: this.selectedData,
      //     // });
      //     // return false;
      //     return true;
      // }
      keypress(e) {
          if (!e.key)
              return false;
          if (e.dir) {
              return this.dir(e);
          }
          if (e.key === 'Enter') {
              this.action(e);
              // this.emit('change', {
              //     row: this.selectedRow,
              //     col: this.selectedColumn,
              //     data: this.selectedData,
              // });
              return true;
          }
          return false;
      }
      dir(e) {
          if (!e.dir)
              return false;
          if (e.dir[1] == 1) {
              this.selectNextRow();
          }
          else if (e.dir[1] == -1) {
              this.selectPrevRow();
          }
          if (e.dir[0] == 1) {
              this.selectNextCol();
          }
          else if (e.dir[0] == -1) {
              this.selectPrevCol();
          }
          return true;
      }
  }
  /*
  // extend WidgetLayer

  export type AddDataTableOptions = DataTableOptions &
      SetParentOptions & { parent?: Widget };

  declare module './layer' {
      interface WidgetLayer {
          datatable(opts: AddDataTableOptions): DataTable;
      }
  }
  WidgetLayer.prototype.datatable = function (
      opts: AddDataTableOptions
  ): DataTable {
      const options = Object.assign({}, this._opts, opts);
      const list = new DataTable(this, options);
      if (opts.parent) {
          list.setParent(opts.parent, opts);
      }
      return list;
  };
  */

  class DataList extends DataTable {
      constructor(opts) {
          super((() => {
              // @ts-ignore
              const tableOpts = opts;
              if (opts.border !== 'none' && opts.width) {
                  opts.width -= 2;
              }
              tableOpts.columns = [Object.assign({}, opts)];
              if (!opts.header || !opts.header.length) {
                  tableOpts.header = false;
              }
              return tableOpts;
          })());
      }
  }
  /*
  // extend WidgetLayer

  export type AddDataListOptions = DataListOptions &
      Widget.SetParentOptions & { parent?: Widget.Widget };

  declare module './layer' {
      interface WidgetLayer {
          datalist(opts: AddDataListOptions): DataList;
      }
  }
  WidgetLayer.prototype.datalist = function (opts: AddDataListOptions): DataList {
      const options = Object.assign({}, this._opts, opts);
      const list = new DataList(this, options);
      if (opts.parent) {
          list.setParent(opts.parent, opts);
      }
      return list;
  };
  */

  class Menu extends Widget {
      static { this.default = {
          tag: 'menu',
          class: '',
          buttonClass: '',
          buttonTag: 'mi',
          marker: ' \u25b6',
          minWidth: 4,
      }; }
      constructor(opts) {
          super((() => {
              opts.tag = opts.tag || Menu.default.tag;
              opts.class = opts.class || Menu.default.class;
              opts.tabStop = opts.tabStop === undefined ? true : opts.tabStop;
              return opts;
          })());
          this._selectedIndex = 0;
          if (Array.isArray(opts.buttonClass)) {
              this.attr('buttonClass', opts.buttonClass.join(' '));
          }
          else {
              this.attr('buttonClass', opts.buttonClass || Menu.default.buttonClass);
          }
          this.attr('buttonTag', opts.buttonTag || Menu.default.buttonTag);
          this.attr('marker', opts.marker || Menu.default.marker);
          this._initButtons(opts);
          this.bounds.height = this.children.length;
          this.on('mouseenter', (e) => {
              this.children.forEach((c) => {
                  if (!c.contains(e)) {
                      c.collapse();
                  }
                  else {
                      c.expand();
                  }
              });
              return true;
          });
          this.on('dir', (e) => {
              if (!e.dir)
                  return;
              if (e.dir[0] < 0) {
                  this.hide();
              }
              else if (e.dir[0] > 0) {
                  this.expandItem();
              }
              else if (e.dir[1] < 0) {
                  this.prevItem();
              }
              else if (e.dir[1] > 0) {
                  this.nextItem();
              }
              e.stopPropagation();
          });
          this.on(['Enter', ' '], () => {
              const btn = this.children[this._selectedIndex];
              btn.action();
              this.hide();
          });
      }
      _initButtons(opts) {
          this.children = [];
          const buttons = opts.buttons;
          const marker = this._attrStr('marker');
          const entries = Object.entries(buttons);
          this.bounds.width = Math.max(opts.minWidth || 0, this.bounds.width, entries.reduce((out, [key, value]) => {
              const textLen = length(key) +
                  (typeof value === 'string' ? 0 : marker.length);
              return Math.max(out, textLen);
          }, 0));
          entries.forEach(([key, value], i) => {
              const opts = {
                  x: this.bounds.x,
                  y: this.bounds.y + i,
                  class: this._attrStr('buttonClass'),
                  tag: this._attrStr('buttonTag'),
                  width: this.bounds.width,
                  height: 1,
                  // depth: this.depth + 1,
                  buttons: value,
                  text: key,
                  parent: this,
              };
              if (typeof value === 'string') {
                  opts.action = value;
              }
              else {
                  opts.text =
                      padEnd(key, this.bounds.width - marker.length, ' ') + marker;
              }
              const menuItem = new MenuButton(opts);
              menuItem.on('mouseenter', () => {
                  this.emit('change');
              });
              menuItem.on('click', () => {
                  this.hide();
              });
              if (menuItem.menu) {
                  menuItem.menu.on('hide', () => {
                      this.scene.setFocusWidget(this);
                  });
              }
          });
      }
      show() {
          this.hidden = false;
          this._selectedIndex = 0;
          this.scene.setFocusWidget(this);
          this.emit('show');
      }
      hide() {
          this.hidden = true;
          this.emit('hide');
      }
      nextItem() {
          ++this._selectedIndex;
          if (this._selectedIndex >= this.children.length) {
              this._selectedIndex = 0;
          }
      }
      prevItem() {
          --this._selectedIndex;
          if (this._selectedIndex < 0) {
              this._selectedIndex = this.children.length - 1;
          }
      }
      expandItem() {
          const c = this.children[this._selectedIndex];
          return c.expand();
      }
      selectItemWithKey(key) {
          let found = false;
          this.children.forEach((c) => {
              if (found)
                  return;
              if (c.text().startsWith(key)) {
                  found = true;
                  // ???
              }
          });
      }
  }
  class MenuButton extends Text {
      constructor(opts) {
          super((() => {
              opts.tag = opts.tag || 'mi';
              opts.tabStop = false;
              return opts;
          })());
          this.menu = null;
          // this.tag = opts.tag || 'mi';
          if (typeof opts.buttons !== 'string') {
              this.menu = this._initMenu(opts);
              this.on('mouseenter', () => {
                  this.menu.hidden = false;
                  this.menu.emit('change');
              });
              this.on('mouseleave', (_n, _w, e) => {
                  if (this.parent?.bounds.contains(e)) {
                      this.menu.hidden = true;
                  }
              });
              this.on('click', () => {
                  return true; // eat clicks
              });
          }
          this.on('click', this.action.bind(this));
      }
      collapse() {
          if (this.menu) {
              this.menu.hide();
          }
      }
      expand() {
          if (!this.menu)
              return null;
          this.menu.show();
          // this.scene!.setFocusWidget(this.menu);
          return this.menu;
      }
      _setMenuPos(xy, opts) {
          xy.x = this.bounds.x + this.bounds.width;
          xy.y = this.bounds.y;
          const height = Object.keys(opts.buttons).length;
          if (this.scene && xy.y + height >= this.scene.height) {
              xy.y = this.scene.height - height - 1;
          }
      }
      _initMenu(opts) {
          if (typeof opts.buttons === 'string')
              return null;
          const menuOpts = {
              x: this.bounds.x + this.bounds.width,
              y: this.bounds.y,
              class: opts.class,
              tag: opts.tag || 'mi',
              buttons: opts.buttons,
              // depth: this.depth + 1,
          };
          this._setMenuPos(menuOpts, opts);
          menuOpts.parent = this;
          const menu = new Menu(menuOpts);
          menu.hidden = true;
          return menu;
      }
  }
  /*
  // extend WidgetLayer

  export type AddMenuOptions = MenuOptions &
      Widget.SetParentOptions & { parent?: Widget.Widget };

  declare module './layer' {
      interface WidgetLayer {
          menu(opts: AddMenuOptions): Menu;
      }
  }
  WidgetLayer.prototype.menu = function (opts: AddMenuOptions): Menu {
      const options = Object.assign({}, this._opts, opts);
      const list = new Menu(this, options);
      if (opts.parent) {
          list.setParent(opts.parent, opts);
      }
      return list;
  };
  */

  class Menubar extends Widget {
      static { this.default = {
          buttonClass: '',
          buttonTag: 'mi',
          menuClass: '',
          menuTag: 'mi',
          prefix: ' ',
          separator: ' | ',
      }; }
      // _config!: DropdownConfig;
      // _buttons: MenubarButton[] = [];
      // _selectedIndex: number;
      constructor(opts) {
          super((() => {
              opts.tabStop = false;
              opts.tag = opts.tag || 'menu';
              return opts;
          })());
          if (opts.buttonClass) {
              if (Array.isArray(opts.buttonClass)) {
                  this.attr('buttonClass', opts.buttonClass.join(' '));
              }
              else {
                  this.attr('buttonClass', opts.buttonClass);
              }
          }
          else {
              this.attr('buttonClass', Menubar.default.buttonClass);
          }
          this.attr('buttonTag', opts.buttonTag || Menubar.default.buttonTag);
          if (opts.menuClass) {
              if (Array.isArray(opts.menuClass)) {
                  this.attr('menuClass', opts.menuClass.join(' '));
              }
              else {
                  this.attr('menuClass', opts.menuClass);
              }
          }
          else {
              this.attr('menuClass', Menubar.default.menuClass);
          }
          this.attr('menuTag', opts.menuTag || Menubar.default.menuTag);
          this.attr('prefix', opts.prefix || Menubar.default.prefix);
          this.attr('separator', opts.separator || Menubar.default.separator);
          this.bounds.height = 1;
          this._initButtons(opts);
          // // @ts-ignore
          // if (this._selectedIndex === undefined) {
          //     this._selectedIndex = -1;
          // } else if (this._selectedIndex == -2) {
          //     this._selectedIndex = 0;
          // }
      }
      // get selectedIndex(): number {
      //     return this._selectedIndex;
      // }
      // set selectedIndex(v: number) {
      //     if (this._selectedIndex >= 0) {
      //         this._buttons[this._selectedIndex].prop('focus', false).expand();
      //     }
      //     this._selectedIndex = v;
      //     if (v >= 0 && this._buttons && v < this._buttons.length) {
      //         this._buttons[v].prop('focus', true).expand();
      //     } else {
      //         this._selectedIndex = this._buttons ? -1 : -2;
      //     }
      // }
      // get selectedButton(): Widget.Widget {
      //     return this._buttons[this._selectedIndex];
      // }
      // focus(reverse = false): void {
      //     if (reverse) {
      //         this.selectedIndex = this._buttons.length - 1;
      //     } else {
      //         this.selectedIndex = 0;
      //     }
      //     super.focus(reverse);
      // }
      // blur(reverse = false): void {
      //     this.selectedIndex = -1;
      //     super.blur(reverse);
      // }
      // keypress(e: IO.Event): void {
      //     if (!e.key) return;
      //     this.events.dispatch(e);
      //     if (e.defaultPrevented) return;
      //     if (e.key === 'Tab') {
      //         this.selectedIndex += 1;
      //         if (this._selectedIndex !== -1) {
      //             e.preventDefault();
      //         }
      //     } else if (e.key === 'TAB') {
      //         this.selectedIndex -= 1;
      //         if (this._selectedIndex !== -1) {
      //             e.preventDefault();
      //         }
      //     } else if (this._selectedIndex >= 0) {
      //         super.keypress(e);
      //     }
      // }
      // mousemove(e: IO.Event): void {
      //     super.mousemove(e);
      //     if (!this.contains(e) || !this.focused) return;
      //     const active = this._buttons.findIndex((c) => c.contains(e));
      //     if (active < 0 || active === this._selectedIndex) return;
      //     this.selectedIndex = active;
      // }
      _initButtons(opts) {
          // this._config = opts.buttons;
          const entries = Object.entries(opts.buttons);
          const buttonTag = this._attrStr('buttonTag');
          const buttonClass = this._attrStr('buttonClass');
          let x = this.bounds.x;
          const y = this.bounds.y;
          entries.forEach(([key, value], i) => {
              const prefix = i == 0 ? this._attrStr('prefix') : this._attrStr('separator');
              new Text({ parent: this, text: prefix, x, y });
              x += prefix.length;
              this.bounds.width += prefix.length;
              const button = new Button({
                  parent: this,
                  id: key,
                  text: key,
                  x,
                  y,
                  tag: buttonTag,
                  class: buttonClass,
                  // buttons: value,
              });
              x += button.bounds.width;
              this.bounds.width += button.bounds.width;
              let menu = null;
              if (typeof value !== 'string') {
                  menu = new Menu({
                      buttons: value,
                      buttonClass: this._attrStr('menuClass'),
                      buttonTag: this._attrStr('menuTag'),
                      x: button.bounds.x,
                      y: button.bounds.y + 1,
                  });
                  button.data('menu', menu);
              }
              button.on(['click', 'Enter', ' '], () => {
                  if (typeof value === 'string') {
                      // simulate action
                      this.emit(value);
                      this.scene.emit(value);
                  }
                  else {
                      this.scene.app.scenes.run('menu', {
                          menu,
                          origin: this.scene,
                      });
                  }
              });
          });
      }
  }
  /*
  export interface MenubarButtonOptions extends Widget.WidgetOpts {
      text: string;
      buttons: ButtonConfig;
      action?: string | boolean;
  }

  export class MenubarButton extends Text.Text {
      menu: Menu | null = null;
      parent!: Menubar;

      constructor(opts: MenubarButtonOptions) {
          super(
              (() => {
                  opts.tag = opts.tag || 'mi';
                  if (typeof opts.buttons === 'string' && !opts.action) {
                      opts.action = opts.buttons;
                  }
                  return opts;
              })()
          );

          this.tag = opts.tag || 'mi';

          if (typeof opts.buttons !== 'string') {
              const menu = (this.menu = this._initMenu(opts)) as Menu;

              this.on('mouseenter', () => {
                  menu.hidden = false;
                  menu.emit('change');
                  return true;
              });
              this.on('mouseleave', (e) => {
                  if (this.parent!.contains(e)) {
                      menu.hidden = true;
                      return true;
                  }
                  return false;
              });
              this.on('click', () => {
                  return true; // eat clicks
              });
          }

          this.on('click', () => {
              this.parent.activate(this);
          });
          this.on('Enter', () => {
              this.parent.activate(this);
          });
          this.on(' ', () => {
              this.parent.activate(this);
          });
      }

      collapse(): void {
          if (!this.menu || this.menu.hidden) return;
          this.menu.hide();
      }

      expand(): Menu | null {
          if (!this.menu) return null;
          this.menu.show();
          return this.menu;
      }

      _setMenuPos(xy: XY.XY, opts: MenubarButtonOptions) {
          xy.x = this.bounds.x;
          const height = opts.height || Object.keys(opts.buttons).length;
          if (this.bounds.y < height) {
              xy.y = this.bounds.y + 1;
          } else {
              xy.y = this.bounds.top - height;
          }
      }

      _initMenu(opts: MenubarButtonOptions): Menu | null {
          if (typeof opts.buttons === 'string') return null;

          const menuOpts = {
              parent: this,
              x: this.bounds.x,
              y: this.bounds.y,
              class: opts.class,
              tag: opts.tag || 'mi',
              height: opts.height,
              buttons: opts.buttons,
              // depth: this.depth + 1,
          };
          this._setMenuPos(menuOpts, opts);
          const menu = new Menu(menuOpts);
          menu.hidden = true;

          return menu;
      }
  }

  export function runMenu(owner: Menubar, menu: Menu) {
      if (!owner || !owner.scene)
          throw new Error('need an owner that is attached to a scene.');

      let menus: Menu[] = [menu];
      let current = menu;

      menu.hidden = false;
      const scene = owner.scene;

      const offInput = scene.on('input', (e) => {
          if (e.type === IO.KEYPRESS) {
              if (e.dir) {
                  if (e.dir[0] > 0) {
                      const next = current.expandItem();
                      if (next) {
                          menus.push(next);
                          current = next;
                      }
                  } else if (e.dir[0] < 0) {
                      current.hide();
                      menus.pop();
                      if (menus.length == 0) {
                          return done(e);
                      } else {
                          current = menus[menus.length - 1];
                      }
                  } else if (e.dir[1] > 0) {
                      current.nextItem();
                  } else if (e.dir[1] < 0) {
                      current.prevItem();
                  }
              } else if (e.key === 'Enter' || e.key === ' ') {
                  const next = current.expandItem();
                  if (next) {
                      menus.push(next);
                      current = next;
                  } else {
                      done(e);
                      current.action();
                      return;
                  }
              } else if (e.key === 'Escape') {
                  current.hide();
                  menus.pop();
                  if (menus.length == 0) {
                      return done(e);
                  }
                  current = menus[menus.length - 1];
              } else if (e.key === 'Tab' || e.key === 'TAB') {
                  return done();
              } else {
                  current.selectItemWithKey(e.key);
              }
          } else if (e.type === IO.MOUSEMOVE) {
              if (!current.contains(e)) {
                  let found = -1;
                  for (let i = 0; i < menus.length; ++i) {
                      const m = menus[i];
                      if (found >= 0) {
                          m.hide();
                      } else {
                          if (m.contains(e)) {
                              current = m;
                              found = i;
                          }
                      }
                  }
                  if (found >= 0) {
                      menus.length = found + 1;
                  }
              }
              if (current.contains(e)) {
                  current.mousemove(e);
              } else if (owner.contains(e)) {
                  done();
                  return owner.mousemove(e);
              }
          } else if (e.type === IO.CLICK) {
              // assumes mousemove was called for this spot before click
              const btn = current.childAt(e);
              if (btn) {
                  btn.click(e);
              }
              done(e);
          }

          e.stopPropagation();
          e.preventDefault();
      });

      function done(e?: IO.Event) {
          offInput();
          menus.forEach((m) => (m.hidden = true));
          scene.setFocusWidget(owner);
          if (e) {
              e.stopPropagation();
              e.preventDefault();
          }
      }
  }
  */

  // import * as GWU from 'gw-utils';
  class Select extends Widget {
      constructor(opts) {
          super((() => {
              opts.tag = opts.tag || 'select';
              return opts;
          })());
          this._initText(opts);
          this._initMenu(opts);
          this.bounds.height = 1; // just the text component
      }
      _initText(opts) {
          this.dropdown = new Text({
              parent: this,
              text: opts.text + ' \u25bc',
              x: this.bounds.x,
              y: this.bounds.y,
              class: opts.class,
              tag: opts.tag || 'select',
              width: this.bounds.width,
              height: 1,
              // depth: this.depth + 1,
          });
          this.dropdown.on('click', () => {
              this.menu.toggleProp('hidden');
              return false;
          });
          // this.dropdown.setParent(this, { beforeIndex: 0 });
      }
      _initMenu(opts) {
          this.menu = new Menu({
              parent: this,
              x: this.bounds.x,
              y: this.bounds.y + 1,
              class: opts.buttonClass,
              tag: opts.buttonTag || 'select',
              width: opts.width,
              minWidth: this.dropdown.bounds.width,
              height: opts.height,
              buttons: opts.buttons,
              // depth: this.depth + 1,
          });
          this.menu.on('click', () => {
              this.menu.hidden = true;
              return false;
          });
          this.menu.hidden = true;
      }
  }
  /*
  // extend WidgetLayer

  export type AddSelectOptions = SelectOptions &
      Widget.SetParentOptions & { parent?: Widget.Widget };

  declare module './layer' {
      interface WidgetLayer {
          select(opts: AddSelectOptions): Select;
      }
  }
  WidgetLayer.prototype.select = function (opts: AddSelectOptions): Select {
      const options: SelectOptions = Object.assign({}, this._opts, opts);
      const list = new Select(this, options);
      if (opts.parent) {
          list.setParent(opts.parent, opts);
      }
      return list;
  };
  */

  // import * as GWU from 'gw-utils';
  class Prompt {
      constructor(question, field = {}) {
          this._id = null;
          this._defaultNext = null;
          this.selection = -1;
          if (typeof field === 'string') {
              field = { field };
          }
          this._prompt = question;
          this._field = field.field || '';
          this._choices = [];
          this._infos = [];
          this._values = [];
          this._next = [];
          this._defaultNext = field.next || null;
          this._id = field.id || field.field || '';
      }
      reset() {
          this.selection = -1;
      }
      field(v) {
          if (v === undefined)
              return this._field;
          this._field = v;
          return this;
      }
      id(v) {
          if (v === undefined)
              return this._id;
          this._id = v;
          return this;
      }
      prompt(arg) {
          if (typeof this._prompt === 'string')
              return this._prompt;
          return this._prompt(arg);
      }
      next(v) {
          if (v === undefined)
              return this._next[this.selection] || this._defaultNext;
          this._defaultNext = v;
          return this;
      }
      choices(choice, info) {
          if (choice === undefined)
              return this._choices;
          if (!Array.isArray(choice)) {
              info = Object.values(choice);
              choice = Object.keys(choice);
          }
          else if (!Array.isArray(info)) {
              info = new Array(choice.length).fill('');
          }
          info = info.map((i) => {
              if (typeof i === 'string')
                  return { info: i };
              return i;
          });
          if (choice.length !== info.length)
              throw new Error('Choices and Infos must have same length.');
          choice.forEach((c, i) => {
              this.choice(c, info[i]);
          });
          return this;
      }
      choice(choice, info = {}) {
          if (typeof info === 'string') {
              info = { info: info };
          }
          this._choices.push(choice);
          this._infos.push(info.info || '');
          this._next.push(info.next || null);
          this._values.push(info.value || choice);
          return this;
      }
      info(arg) {
          const i = this._infos[this.selection] || '';
          if (typeof i === 'string')
              return i;
          return i(arg);
      }
      choose(n) {
          this.selection = n;
          return this;
      }
      value() {
          return this._values[this.selection];
      }
      updateResult(res) {
          if (this.selection < 0)
              return this;
          res[this._field] = this.value();
          return this;
      }
  }
  class Choice extends Widget {
      static { this.default = {
          tag: 'choice',
          border: 'ascii',
          promptTag: 'prompt',
          promptClass: '',
          choiceTag: 'ci',
          choiceClass: '',
          infoTag: 'info',
          infoClass: '',
      }; }
      constructor(opts) {
          super((() => {
              opts.tag = opts.tag || Choice.default.tag;
              return opts;
          })());
          this._prompt = null;
          this._done = null;
          this.choiceWidth = opts.choiceWidth;
          this.attr('border', opts.border || Choice.default.border);
          this.attr('promptTag', opts.promptTag || Choice.default.promptTag);
          this.attr('promptClass', opts.promptClass || Choice.default.promptClass);
          this.attr('choiceTag', opts.choiceTag || Choice.default.choiceTag);
          this.attr('choiceClass', opts.choiceClass || Choice.default.choiceClass);
          this.attr('infoTag', opts.infoTag || Choice.default.infoTag);
          this.attr('infoClass', opts.infoClass || Choice.default.infoClass);
          this._addLegend();
          this._addList();
          this._addInfo();
          if (opts.prompt) {
              this.showPrompt(opts.prompt);
          }
      }
      get prompt() {
          return this._prompt;
      }
      showPrompt(prompt, arg) {
          this._prompt = prompt;
          prompt.choose(0);
          this._text.text(prompt.prompt(arg));
          this._list.data(prompt.choices());
          this._info.text(prompt.info(arg));
          this.emit('prompt', this._prompt);
          return new Promise((resolve) => (this._done = resolve));
      }
      _addList() {
          this._list = new DataList({
              parent: this,
              height: this.bounds.height - 2,
              x: this.bounds.x + 1,
              width: this.choiceWidth,
              y: this.bounds.y + 1,
              dataTag: this._attrStr('choiceTag'),
              dataClass: this._attrStr('choiceClass'),
              tabStop: true,
              border: 'none',
              hover: 'select',
          });
          this._list.on('change', () => {
              if (!this._prompt)
                  return false;
              const p = this._prompt;
              const row = this._list.selectedRow;
              p.choose(row);
              this._info.text(p.info());
              this.emit('change', p);
              // e.stopPropagation(); // I want to eat this event
          });
          this._list.on('action', () => {
              if (!this._prompt)
                  return false;
              const p = this._prompt;
              p.choose(this._list.selectedRow);
              this.action();
              this._done(p.value());
              // e.stopPropagation(); // eat this event
          });
          return this;
      }
      _addInfo() {
          this._info = new Text({
              parent: this,
              text: '',
              x: this.bounds.x + this.choiceWidth + 2,
              y: this.bounds.y + 1,
              width: this.bounds.width - this.choiceWidth - 3,
              height: this.bounds.height - 2,
              tag: this._attrStr('infoTag'),
              class: this._attrStr('infoClass'),
          });
          return this;
      }
      _addLegend() {
          this._text = new Text({
              parent: this,
              text: '',
              width: this.bounds.width - 4,
              x: this.bounds.x + 2,
              y: this.bounds.y,
              tag: this._attrStr('promptTag'),
              class: this._attrStr('promptClass'),
          });
          return this;
      }
      _draw(buffer) {
          let w = this.choiceWidth + 2;
          const h = this.bounds.height;
          let x = this.bounds.x;
          const y = this.bounds.y;
          const ascii = this.attr('border') === 'ascii';
          drawBorder(buffer, x, y, w, h, this._used, ascii);
          w = this.bounds.width - this.choiceWidth - 1;
          x = this.bounds.x + this.choiceWidth + 1;
          drawBorder(buffer, x, y, w, h, this._used, ascii);
          return true;
      }
  }
  /*
  // extend WidgetLayer

  export type AddChoiceOptions = ChoiceOptions &
      Widget.SetParentOptions & { parent?: Widget.Widget };

  declare module './layer' {
      interface WidgetLayer {
          choice(opts?: AddChoiceOptions): Choice;
      }
  }
  WidgetLayer.prototype.choice = function (opts: AddChoiceOptions): Choice {
      const options = Object.assign({}, this._opts, opts) as ChoiceOptions;
      const widget = new Choice(this, options);
      if (opts.parent) {
          widget.setParent(opts.parent, opts);
      }
      return widget;
  };
  */
  ////////////////////////////////////////////////////////////////////////////////
  // INQUIRY
  class Inquiry {
      constructor(widget) {
          this._prompts = [];
          this.events = {};
          this._result = {};
          this._stack = [];
          this._current = null;
          this.widget = widget;
          this._keypress = this._keypress.bind(this);
          this._change = this._change.bind(this);
      }
      prompts(v, ...args) {
          if (Array.isArray(v)) {
              this._prompts = v.slice();
          }
          else {
              args.unshift(v);
              this._prompts = args;
          }
          return this;
      }
      _finish() {
          this.widget.off('keypress', this._keypress);
          this.widget.off('change', this._change);
          this._fireEvent('finish', this.widget, this._result);
      }
      _cancel() {
          this.widget.off('keypress', this._keypress);
          this.widget.off('change', this._change);
          this._fireEvent('cancel', this.widget);
      }
      start() {
          this._current = this._prompts[0];
          this._result = {};
          this.widget.on('keypress', this._keypress);
          this.widget.on('change', this._change);
          this.widget.showPrompt(this._current, this._result);
      }
      back() {
          this._current.reset();
          this._current = this._stack.pop() || null;
          if (!this._current) {
              this._cancel();
          }
          else {
              this._current.reset(); // also reset the one we are going back to
              this._result = {};
              this._prompts.forEach((p) => p.updateResult(this._result));
              this.widget.showPrompt(this._current, this._result);
          }
      }
      restart() {
          this._prompts.forEach((p) => p.reset());
          this._result = {};
          this._current = this._prompts[0];
          this.widget.showPrompt(this._current, this._result);
      }
      quit() {
          this._cancel();
      }
      _keypress(_n, _w, e) {
          if (!e.key)
              return false;
          if (e.key === 'Escape') {
              this.back();
              return true;
          }
          else if (e.key === 'R') {
              this.restart();
              return true;
          }
          else if (e.key === 'Q') {
              this.quit();
              return true;
          }
          return false;
      }
      _change(_n, _w, p) {
          p.updateResult(this._result);
          const next = p.next();
          if (next) {
              this._current = this._prompts.find((p) => p.id() === next) || null;
              if (this._current) {
                  this._stack.push(p);
                  this.widget.showPrompt(this._current, this._result);
                  this._fireEvent('step', this.widget, {
                      prompt: this._current,
                      data: this._result,
                  });
                  return true;
              }
          }
          this._finish();
          return true;
      }
      on(event, cb) {
          let handlers = this.events[event];
          if (!handlers) {
              handlers = this.events[event] = [];
          }
          if (!handlers.includes(cb)) {
              handlers.push(cb);
          }
          return this;
      }
      off(event, cb) {
          let handlers = this.events[event];
          if (!handlers)
              return this;
          if (cb) {
              arrayDelete(handlers, cb);
          }
          else {
              handlers.length = 0; // clear all handlers
          }
          return this;
      }
      _fireEvent(name, source, args) {
          const handlers = this.events[name] || [];
          let handled = false;
          for (let handler of handlers) {
              handled = handler(name, source || this.widget, args) || handled;
          }
          if (!handled) {
              handled = this.widget.emit(name, args);
          }
          return handled;
      }
  }

  class Checkbox extends Text {
      static { this.default = {
          uncheck: '\u2610', // unchecked
          check: '\u2612', // checked - with X
          pad: 1,
          value: 'on',
      }; }
      constructor(opts) {
          super((() => {
              // opts.action = opts.action || opts.id || 'input';
              opts.tag = opts.tag || 'checkbox';
              opts.tabStop = opts.tabStop === undefined ? true : opts.tabStop;
              return opts;
          })());
          this.attr('uncheck', opts.uncheck || Checkbox.default.uncheck);
          this.attr('check', opts.check || Checkbox.default.check);
          this.attr('pad', opts.pad ?? Checkbox.default.pad);
          this.attr('offValue', '');
          if (Array.isArray(opts.value)) {
              this.attr('offValue', opts.value[0] || '');
              this.attr('value', opts.value[1] || Checkbox.default.value);
          }
          else {
              this.attr('value', opts.value || Checkbox.default.value);
          }
          this.bounds.width += this._attrInt('pad');
          if (opts.checked) {
              this.prop('checked', true);
          }
          this.on('click', (ev) => {
              if (ev.defaultPrevented)
                  return;
              this.toggleProp('checked');
          });
      }
      value() {
          return this._propBool('checked')
              ? this._attrStr('value')
              : this._attrStr('offValue');
      }
      text(v) {
          if (v === undefined)
              return super.text();
          super.text(v);
          this.bounds.width += 1 + this._attrInt('pad');
          return this;
      }
      keypress(ev) {
          if (!ev.key)
              return;
          super.keypress(ev);
          if (ev.defaultPrevented)
              return;
          if (ev.key === 'Enter' || ev.key === ' ') {
              this.toggleProp('checked');
              this.emit('change');
          }
          else if (ev.key === 'Backspace' || ev.key === 'Delete') {
              this.prop('checked', false);
              this.emit('change');
          }
      }
      _draw(buffer) {
          const fg = this._used.fg || WHITE;
          const bg = this._used.bg || NONE;
          const align = this._used.align;
          buffer.fillBounds(this.bounds, ' ', 0, bg);
          const state = this.prop('checked') ? 'check' : 'uncheck';
          let v = '' + this._attrs[state];
          buffer.drawText(this.bounds.x, this.bounds.y, v, fg, bg);
          let vOffset = 0;
          if (this._used.valign === 'bottom') {
              vOffset = this.bounds.height - this._lines.length;
          }
          else if (this._used.valign === 'middle') {
              vOffset = Math.floor((this.bounds.height - this._lines.length) / 2);
          }
          const pad = this._attrInt('pad') + 1;
          this._lines.forEach((line, i) => {
              buffer.drawText(this.bounds.x + pad, this.bounds.y + i + vOffset, line, fg, bg, this.bounds.width - pad, align);
          });
          return true;
      }
  }

  // export interface WidgetLayerOptions extends LayerOptions {}
  class Builder {
      constructor(scene) {
          this._opts = { x: 0, y: 0 };
          this.scene = scene;
          this._opts.scene = scene;
      }
      // Style and Opts
      reset() {
          this._opts = { x: 0, y: 0, scene: this.scene };
          return this;
      }
      fg(v) {
          this._opts.fg = v;
          return this;
      }
      bg(v) {
          this._opts.bg = v;
          return this;
      }
      dim(pct = 25, fg = true, bg = false) {
          if (fg) {
              this._opts.fg = from$2(this._opts.fg || 'white').darken(pct);
          }
          if (bg) {
              this._opts.bg = from$2(this._opts.bg || 'black').darken(pct);
          }
          return this;
      }
      bright(pct = 25, fg = true, bg = false) {
          if (fg) {
              this._opts.fg = from$2(this._opts.fg || 'white').lighten(pct);
          }
          if (bg) {
              this._opts.bg = from$2(this._opts.bg || 'black').lighten(pct);
          }
          return this;
      }
      invert() {
          [this._opts.fg, this._opts.bg] = [this._opts.bg, this._opts.fg];
          return this;
      }
      // STYLE
      style(opts) {
          Object.assign(this._opts, opts);
          return this;
      }
      class(c) {
          this._opts.class = this._opts.class || '';
          this._opts.class += ' ' + c;
          return this;
      }
      pos(x, y) {
          if (x === undefined)
              return this._opts;
          this._opts.x = clamp(x, 0, this.scene.width);
          this._opts.y = clamp(y, 0, this.scene.height);
          return this;
      }
      moveTo(x, y) {
          return this.pos(x, y);
      }
      move(dx, dy) {
          this._opts.x = clamp(this._opts.x + dx, 0, this.scene.width);
          this._opts.y = clamp(this._opts.y + dy, 0, this.scene.height);
          return this;
      }
      up(n = 1) {
          return this.move(0, -n);
      }
      down(n = 1) {
          return this.move(0, n);
      }
      left(n = 1) {
          return this.move(-n, 0);
      }
      right(n = 1) {
          return this.move(n, 0);
      }
      nextLine(n = 1) {
          return this.pos(0, this._opts.y + n);
      }
      prevLine(n = 1) {
          return this.pos(0, this._opts.y - n);
      }
      // grid(): Grid {
      //     return new Grid(this);
      // }
      // EDIT
      // erase and move back to top left
      clear(color) {
          this.scene.destroy();
          if (color) {
              this.scene.bg = from$2(color);
          }
          else {
              this.scene.bg = NONE;
          }
          return this;
      }
      // Widgets
      text(info = {}, opts) {
          if (typeof info === 'string') {
              opts = opts || {};
              opts.text = info;
          }
          else {
              opts = info;
          }
          const _opts = Object.assign({}, this._opts, opts);
          const widget = new Text(_opts);
          this.move(0, 1); // next line
          return widget;
      }
      border(opts) {
          const _opts = Object.assign({}, this._opts, opts);
          const widget = new Border(_opts);
          this.move(1, 1); // step inside border
          return widget;
      }
      button(opts) {
          const _opts = Object.assign({}, this._opts, opts);
          const widget = new Button(_opts);
          this.move(0, 1); // step inside border
          return widget;
      }
      checkbox(opts) {
          const _opts = Object.assign({}, this._opts, opts);
          const widget = new Checkbox(_opts);
          this.move(0, 1); // step inside border
          return widget;
      }
      input(opts) {
          const _opts = Object.assign({}, this._opts, opts);
          const widget = new Input(_opts);
          this.move(0, 1); // step inside border
          return widget;
      }
      fieldset(opts) {
          const _opts = Object.assign({}, this._opts, opts);
          const widget = new Fieldset(_opts);
          this.move(1, 1); // step inside border
          return widget;
      }
      datatable(opts) {
          const _opts = Object.assign({}, this._opts, opts);
          const widget = new DataTable(_opts);
          this.move(0, widget.bounds.height); // step inside border
          return widget;
      }
      datalist(opts) {
          const _opts = Object.assign({}, this._opts, opts);
          const widget = new DataList(_opts);
          this.move(0, widget.bounds.height); // step inside border
          return widget;
      }
      menubar(opts) {
          const _opts = Object.assign({}, this._opts, opts);
          const widget = new Menubar(_opts);
          this.move(0, widget.bounds.height); // step below menubar
          return widget;
      }
  }
  // // declare module '../ui/ui' {
  // //     interface UI {
  // //         startWidgetLayer(opts?: WidgetLayerOptions): WidgetLayer;
  // //     }
  // // }
  // // UI.prototype.startWidgetLayer = function (
  // //     opts: WidgetLayerOptions = {}
  // // ): WidgetLayer {
  // //     opts.styles = this.layer ? this.layer.styles : this.styles;
  // //     const layer = new WidgetLayer(this, opts);
  // //     this.startLayer(layer);
  // //     return layer;
  // // };

  function make$1$2(opts) {
      const w = new Widget(opts);
      if (opts.with) {
          Object.entries(opts.with).forEach(([name, fn]) => {
              // @ts-ignore
              w[name] = fn;
          });
      }
      return w;
  }

  var index$1$1 = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	Border: Border,
  	Builder: Builder,
  	Button: Button,
  	Choice: Choice,
  	Column: Column,
  	DataList: DataList,
  	DataTable: DataTable,
  	Dialog: Dialog,
  	Field: Field,
  	Fieldset: Fieldset,
  	Input: Input,
  	Inquiry: Inquiry,
  	Menu: Menu,
  	MenuButton: MenuButton,
  	Menubar: Menubar,
  	OrderedList: OrderedList,
  	Prompt: Prompt,
  	Select: Select,
  	Text: Text,
  	UnorderedList: UnorderedList,
  	Widget: Widget,
  	alignChildren: alignChildren,
  	dialog: dialog,
  	drawBorder: drawBorder,
  	make: make$1$2,
  	spaceChildren: spaceChildren,
  	toPadArray: toPadArray,
  	wrapChildren: wrapChildren
  });

  class Loop {
      constructor() {
          this._timer = 0;
      }
      get isRunning() {
          return this._timer != 0;
      }
      start(cb, dt = 16) {
          let busy = false;
          if (this._timer)
              throw new Error('Cannot start loop twice.');
          this._timer = setInterval(() => {
              if (!busy) {
                  busy = true;
                  cb();
                  busy = false;
              }
          }, dt);
      }
      stop() {
          if (this._timer) {
              clearInterval(this._timer);
              this._timer = 0;
          }
      }
  }

  class App {
      constructor(opts = {}) {
          this.dt = 16; // 16 ms per frame
          this.time = 0;
          this.realTime = 0;
          this.skipTime = false;
          this.fps = 0;
          this.fpsBuf = [];
          this.fpsTimer = 0;
          this.numFrames = 0;
          this.loopId = 0;
          this.stopped = true;
          this.paused = false;
          this.debug = false;
          if (typeof opts.seed === 'number' && opts.seed > 0) {
              random$2.seed(opts.seed);
          }
          if ('loop' in opts) {
              this.loop = opts.loop;
              delete opts.loop;
          }
          else {
              this.loop = new Loop();
          }
          this.name = opts.name || 'Goblinwerks';
          this.styles = defaultStyle;
          this.canvas = opts.canvas || make$6(opts);
          this.io = new Queue();
          this.events = new Events(this);
          this.timers = new Timers(this);
          this.scenes = new Scenes(this);
          if (opts.dt !== undefined) {
              this.dt = opts.dt || 16; // Can't have 0
          }
          this.data = mergeDeep({}, opts.data || {});
          this.canvas.onclick = this.io.enqueue.bind(this.io);
          this.canvas.onmousemove = this.io.enqueue.bind(this.io);
          this.canvas.onclick = this.io.enqueue.bind(this.io);
          this.canvas.onkeydown = this.io.enqueue.bind(this.io);
          this.buffer = new Buffer$1(this.canvas.width, this.canvas.height);
          if (opts.scenes) {
              this.scenes.config(opts.scenes);
              if (typeof opts.scene === 'string') {
                  this.scenes.start(opts.scene, opts.sceneStartOpts);
              }
              else {
                  this.scenes.start(Object.keys(opts.scenes)[0], opts.sceneStartOpts);
              }
          }
          else if (opts.scene) {
              if (typeof opts.scene === 'string') {
                  throw new Error("Cannot use string 'scene' option without including 'scenes'.");
              }
              if (opts.scene === true)
                  opts.scene = {};
              this.scenes.config('default', opts.scene);
              this.scenes.start('default', opts.sceneStartOpts);
          }
          if (opts.start !== false) {
              this.start();
          }
          globalThis.APP = this;
          active$1 = this;
      }
      // get buffer() {
      //     return this.scene.buffer;
      // }
      get width() {
          return this.canvas.width;
      }
      get height() {
          return this.canvas.height;
      }
      get node() {
          return this.canvas.node;
      }
      get mouseXY() {
          return this.canvas.mouse;
      }
      get scene() {
          return this.scenes.get();
      }
      on(ev, fn) {
          // return this.scene.on(ev, fn);
          return this.events.on(ev, fn);
      }
      emit(ev, ...args) {
          this.scenes.emit(ev, ...args);
          this.events.emit(ev, ...args);
      }
      wait(...args) {
          // @ts-ignore
          // return this.scene.wait.apply(this.scene, args);
          if (typeof args[1] === 'string') {
              const ev = args[1];
              args[2] = args[2] || {};
              args[1] = () => this.emit(ev, args[2]);
          }
          return this.timers.setTimeout(args[1], args[0]);
      }
      repeat(...args) {
          // @ts-ignore
          // return this.scene.repeat.apply(this.scene, args);
          if (typeof fn === 'string') {
              const ev = args[1];
              args[2] = args[2] || {};
              args[1] = () => this.emit(ev, args[2]);
          }
          return this.timers.setInterval(args[1], args[0]);
      }
      // run() {
      //     this.emit('run', this);
      //     let running = false;
      //     this.loopID = (setInterval(() => {
      //         if (!running) {
      //             running = true;
      //             this._frame();
      //             running = false;
      //         }
      //     }, 16) as unknown) as number;
      //     this.stopped = false;
      // }
      start() {
          if (this.loop.isRunning)
              return;
          this.loop.start(this._frame.bind(this));
      }
      stop() {
          this.emit('stop', this);
          this.loop.stop();
          this.stopped = true;
      }
      _frame(t = 0) {
          t = t || Date.now();
          if (typeof document !== 'undefined' &&
              document.visibilityState !== 'visible') {
              return;
          }
          if (this.realTime == 0) {
              this.realTime = t;
              this.time = t;
          }
          const realTime = t;
          const realDt = realTime - this.realTime;
          this.realTime = realTime;
          if (!this.skipTime) {
              this.fpsBuf.push(1000 / realDt);
              this.fpsTimer += realDt;
              if (this.fpsTimer >= 1) {
                  this.fpsTimer = 0;
                  this.fps = Math.round(this.fpsBuf.reduce((a, b) => a + b) / this.fpsBuf.length);
                  this.fpsBuf = [];
              }
          }
          this.skipTime = false;
          this.numFrames++;
          this._frameStart();
          // // unprocessed io is handled here
          while (this.io.length) {
              const ev = this.io.dequeue();
              this._input(ev);
          }
          if (!this.paused && this.debug !== true) {
              // TODO - Should update be called first to run timers, etc...?
              while (this.time + this.dt <= realTime) {
                  this.time += this.dt;
                  this._fixed_update(this.dt);
              }
              // call update
              this._update(realDt);
          }
          this._draw();
          if (this.debug !== false) {
              this._frameDebug();
          }
          this._frameEnd();
          this.io.clear();
      }
      _input(ev) {
          this.scenes.input(ev);
          if (ev.propagationStopped || ev.defaultPrevented)
              return;
          ev.dispatch(this.events);
      }
      _update(dt = 0) {
          dt = dt || this.dt;
          this.scenes.update(dt);
          this.timers.update(dt);
          this.events.emit('update', dt);
      }
      _fixed_update(dt = 0) {
          dt = dt || this.dt;
          this.scenes.fixed_update(dt);
          this.events.emit('fixed_update', dt);
      }
      _frameStart() {
          // this.buffer.nullify();
          this.scenes.frameStart();
          this.events.emit('frameStart');
      }
      _draw() {
          this.scenes.draw(this.buffer);
          this.events.emit('draw', this.buffer);
      }
      _frameDebug() {
          this.scenes.frameDebug(this.buffer);
          this.events.emit('frameDebug', this.buffer);
      }
      _frameEnd() {
          this.scenes.frameEnd(this.buffer);
          this.events.emit('frameEnd', this.buffer);
          this.canvas.render(this.buffer);
      }
      alert(text, opts = {}) {
          opts.text = text;
          return this.scenes.run('alert', opts);
      }
      confirm(text, opts = {}) {
          opts.text = text;
          return this.scenes.run('confirm', opts);
      }
      prompt(text, opts = {}) {
          // TODO - Do we really have to do this?  Can't we reset the scene instead?
          // NEED TO CREATE A NEW SCENE EVERY TIME SO WE DON"T HAVE HOLDOVER EVENTS, etc...
          opts.prompt = text;
          const prompt = this.scenes.create('prompt', PromptScene);
          prompt.run(opts);
          return prompt;
      }
  }
  function make$f(opts) {
      const app = new App(opts);
      return app;
  }
  var active$1;

  var index = /*#__PURE__*/Object.freeze({
  	__proto__: null,
  	App: App,
  	CLICK: CLICK,
  	ComputedStyle: ComputedStyle,
  	Event: Event,
  	Events: Events,
  	KEYPRESS: KEYPRESS,
  	Loop: Loop,
  	MOUSEMOVE: MOUSEMOVE,
  	MOUSEUP: MOUSEUP,
  	Queue: Queue,
  	STOP: STOP,
  	Scene: Scene,
  	Scenes: Scenes,
  	Selector: Selector,
  	Sheet: Sheet,
  	Style: Style,
  	TICK: TICK,
  	Timers: Timers,
  	Tweens: Tweens,
  	Widget: Widget,
  	get active () { return active$1; },
  	alignChildren: alignChildren,
  	compile: compile,
  	defaultStyle: defaultStyle,
  	ignoreKeyEvent: ignoreKeyEvent,
  	installScene: installScene,
  	isControlCode: isControlCode,
  	keyCodeDirection: keyCodeDirection,
  	make: make$f,
  	makeCustomEvent: makeCustomEvent,
  	makeKeyEvent: makeKeyEvent,
  	makeMouseEvent: makeMouseEvent,
  	makeStopEvent: makeStopEvent,
  	makeStyle: makeStyle,
  	makeTickEvent: makeTickEvent,
  	recycleEvent: recycleEvent,
  	scenes: scenes,
  	spaceChildren: spaceChildren,
  	wrapChildren: wrapChildren
  });

  // src/errors.ts
  var UndefinedBehaviorError = class extends Error {
    constructor(message, options) {
      super(message, options);
    }
  };

  // src/option.ts
  var Option = class _Option {
    constructor(status, value) {
      this.status = status;
      this.value = value;
    }
    /**
     * Returns the contained `Some` value, consuming the self value.
     * @example
     * const x = Some("value");
     * x.expect("fruits are healthy") === "value"; // true
     * 
     * const y: Option<string> = None();
     * y.expect("fruits are healthy"); // throws with `fruits are healthy`
     * @param {string} message
     * @return {*}  {Value}
     */
    expect(reason) {
      assertArgument("expect", reason, "string");
      if (this.status === 0 /* None */) {
        throw new Error(reason, { cause: "Option have 'None' status" });
      }
      return this.value;
    }
    /**
     * Returns the contained `Some` value, consuming the self value.
     * 
     * Because this function may throws, its use is generally discouraged. Instead, prefer to use pattern matching and handle the None case explicitly, or call `unwrapOr`, `unwrapOrElse`, or `unwrapOrDefault`.
     *
     * Throws an error when value is `None`
     * 
     * @example
     * const x = Some("air");
     * x.unwrap() === "air";
     * 
     * const x: Option<string> = None();
     * x.unwrap() // fails
     * @return {*}  {Value}
    */
    unwrap() {
      if (this.status === 0 /* None */) {
        throw new Error("Unwrap error. Option have 'None' status", { cause: { status: this.status, value: this.value } });
      }
      return this.value;
    }
    /**
     * Returns the contained `Some` value or a provided default.
     * @example
     * const x = Some("air");
     * x.unwrapOr("another") === "air";
     * 
     * const x: Option<string> = None();
     * x.unwrapOr("another") === 'another'
     * @param {T} another
     * @return {*}  {Value}
     */
    unwrapOr(fallback) {
      if (this.status === 0 /* None */) {
        return fallback;
      }
      return this.value;
    }
    /**
     * Returns the contained `Some` value or computes it from a closure.
     * @example
     * const k = 10;
     * Some(4).unwrapOrElse(() => 2 * k) === 4
     * None().unwrap_or_else(() => 2 * k) === 20
     * @param {() => T} predicate
     * @return {*}  {Value}
     */
    unwrapOrElse(fn) {
      if (this.status === 0 /* None */) {
        assertArgument("unwrapOrElse", fn, "function");
        return fn();
      }
      return this.value;
    }
    /**
     * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value (if `Some`) or returns `None` (if `None`).
     *
     * @example
     * const maybeSomeString = Some("Hello, World!");
     * const maybeSomeLen = maybeSomeString.map(s => s.length);
     * maybeSomeLen === Some(13));
     * 
     * const x: Option<string> = None();
     * x.map(s => s.length) === None();
     * @template U
     * @param {(value: T) => U} fn
     * @return {*}  {Option<U>}
     */
    map(fn) {
      if (this.status === 1 /* Some */) {
        assertArgument("map", fn, "function");
        return Some(fn(this.value));
      }
      return None();
    }
    /**
     * Returns the provided default result (if none), or applies a function to the contained value (if any).
     *
     * Arguments passed to `mapOr` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `mapOrElse`, which is lazily evaluated.
     *
     * @example
     * const x = Some("foo");
     * x.mapOr(42, v => v.length) === 3;
     * 
     * const x: Option<string> = None();
     * x.mapOr(42, v => v.len() === 42;
     * @template U
     * @param {U} value
     * @param {(value: T) => U} predicate
     * @return {*}  {U}
     */
    mapOr(value, predicate) {
      if (this.status === 0 /* None */) {
        return value;
      }
      assertArgument("mapOr", predicate, "function");
      return predicate(this.value);
    }
    /**
     * Computes a default function result (if none), or applies a different function to the contained value (if any).
     *
     * @example
     * const k = 21;
     * 
     * const x = Some("foo");
     * x.mapOrElse(() => 2 * k, v => v.length) === 3;
     * 
     * const x: Option<string> = None();
     * x.mapOrElse(() => 2 * k, v => v.length) === 42;
     * @template U
     * @return {*}  {U}
     */
    mapOrElse(noneFn, someFn) {
      assertArgument("mapOrElse", noneFn, "function");
      assertArgument("mapOrElse", someFn, "function");
      if (this.status === 0 /* None */) {
        return noneFn();
      }
      return someFn(this.value);
    }
    /**
     * Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and None to `Err(err)`.
     * 
     * Arguments passed to `okOr` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `okOrElse`, which is lazily evaluated.
     * 
     * @example
     * const x = Some("foo");
     * String(x.okOr(0)) === String(Ok("foo"));
     * 
     * const y: Option<string> = None();
     * y.okOr(0) === Err(0);
     */
    okOr(err) {
      if (this.status === 0 /* None */) {
        return Err(err);
      }
      return Ok(this.value);
    }
    /**
     * Transforms the `Option<T>` into a `Result<T, E>`, mapping `Some(v)` to `Ok(v)` and None to `Err(err())`.
     *
     * @example
     * const x = Some("foo");
     * console.assert(x.okOrElse(() => 0) === Ok("foo"));
     * 
     * let y: Option<string> = None();
     * console.assert(y.okOrElse(() => 0) === Err(0));
     * @return {*}  {Value}
     */
    okOrElse(err) {
      if (this.status === 0 /* None */) {
        assertArgument("okOrElse", err, "function");
        return Err(err());
      }
      return Ok(this.value);
    }
    /**
     * Returns `None` if the option is `None`, otherwise returns `optb`.
     * 
     * Arguments passed to and are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `andThen`, which is lazily evaluated.
     *
     * @example
     * const x = Some(2);
     * const y: Option<string> = None();
     * console.assert(x.and(y) === None());
     * // another example
     * let x: Option<number> = None();
     * let y = Some("foo");
     * console.assert(x.and(y) === None());
     * // another example
     * let x = Some(2);
     * let y = Some("foo");
     * console.assert(x.and(y) === Some("foo"));
     * // another example
     * let x: Option<number> = None();
     * let y: Option<string> = None();
     * console.assert(x.and(y) === None());
     */
    and(optb) {
      if (this.status === 0 /* None */) {
        return None();
      }
      if (!(optb instanceof _Option)) {
        throw new UndefinedBehaviorError(`Method "and" should accepts instance of Option`, { cause: { value: optb } });
      }
      return optb;
    }
    /**
     * Returns `None` if the option is `None`, otherwise calls `f` with the wrapped value and returns the result.
     * 
     * Some languages call this operation flatmap.
     *
     * @example
     * function toString(x: number): Option<string> {
     *  return Some(String(x));
     * }
     * console.assert(Some(2).andThen(toString) === Some(2.toString()));
     * console.assert(None().andThen(toString) === None());
     * @template U
     * @return {*}  {Option<U>}
     */
    andThen(f) {
      if (this.status === 0 /* None */) {
        return None();
      }
      assertArgument("andThen", f, "function");
      const res = f(this.value);
      if (!(res instanceof _Option)) {
        throw new UndefinedBehaviorError('callback for Method "andThen" expects to returns instance of Option. Use "None" or "Some" funtions', { cause: { value: res } });
      }
      return res;
    }
    /**
     * Returns `None` if the option is `None`, otherwise calls predicate with the wrapped value and returns:
     *
     * - `Some(t)` if predicate returns `true` (where t is the wrapped value), an
     * - `None` if predicate returns `false`
     *
     * @example
     * function isEven(n: number): boolean {
     *  return n % 2 == 0
     * }
     * console.assert(None().filter(isEven) === None());
     * console.assert(Some(3).filter(isEven) === None());
     * console.assert(Some(4).filter(isEven) === Some(4));
     * 
     * @param {(value: T) => boolean} predicate
     * @return {*}  {Option<Value>}
     */
    filter(predicate) {
      if (this.status === 0 /* None */) {
        return None();
      }
      assertArgument("filter", predicate, "function");
      const success = predicate(this.value);
      assertArgument("filter", success, "boolean");
      if (success) {
        return Some(this.value);
      }
      return None();
    }
    /**
     * Returns `Some` if exactly one of self, optb is `Some`, otherwise returns `None`.
     *
     * @param {Option<T>} optb
     * @return {*}  {Option<Value>}
     */
    xor(optb) {
      if (this.status === 1 /* Some */) {
        return this;
      }
      if (!(optb instanceof _Option)) {
        throw new UndefinedBehaviorError(`Method "xor" should accepts instance of Option`, { cause: { value: optb } });
      }
      return optb;
    }
    /**
     * Inserts value into the option, then returns a mutable reference to it.
     * 
     * If the option already contains a value, the old value is dropped.
     * 
     * See also `getOrInsert`, which doesn’t update the value if the option already contains `Some`.
     *
     * @example
     * const opt = None();
     * const val = opt.insert(1);
     * console.assert(val === 1);
     * console.assert(opt.unwrap() === 1);
     * // another example
     * const val = opt.insert(2);
     * console.assert(val === 2);
     * 
     * @param {T} value
     * @return {*}  {Option<Value>}
     */
    insert(value) {
      if (value === void 0) {
        this.status = 0 /* None */;
        this.value = void 0;
      } else {
        this.status = 1 /* Some */;
        this.value = value;
      }
      return this;
    }
    /**
     * Replaces the actual value in the option by the value given in parameter, returning the old value if present, leaving a `Some` in its place without deinitializing either one.
     *
     * @example
     * const x = Some(2);
     * const old = x.replace(5);
     * console.assert(x === Some(5));
     * console.assert(old === Some(2));
     * // another example
     * const x = None();
     * const old = x.replace(3);
     * console.assert(x === Some(3));
     * console.assert(old === None());
     * @param {T} value
     * @return {*}  {Option<Value>}
     */
    replace(value) {
      const newValue = Some(value);
      const oldValue = Some(this.value);
      this.value = newValue.value;
      this.status = newValue.status;
      return oldValue;
    }
    /**
     * Zips self with another Option.
     * 
     * If self is `Some(s)` and other is `Some(o)`, this method returns `Some((s, o))`. Otherwise, `None` is returned.
     *
     * @example
     * const x = Some(1);
     * const y = Some("hi");
     * const z = None<number>();
     * 
     * x.zip(y) === Some((1, "hi"));
     * x.zip(z) === None();
     * @template U
     * @param {Option<U>} other
     * @return {*}  {Option<[Value, U]>}
     */
    zip(other) {
      if (!(other instanceof _Option)) {
        throw new UndefinedBehaviorError(`Method "zip" should accepts instance of Option`, { cause: { value: other } });
      }
      if (this.status === 1 /* Some */ && other.status === 1 /* Some */) {
        return new _Option(1 /* Some */, [this.value, other.value]);
      }
      return None();
    }
    /**
     * Zips self and another Option with function `f`.
     * 
     * If self is `Some(s)` and other is `Some(o)`, this method returns `Some(f(s, o))`. Otherwise, `None` is returned.
     *
     * @example
     * class Point {
     *   constructor (readonly x: number, readonly y: number){}
     *   static create(x:number, y: number){
     *     return new Point(x,y);
     *   }
     * }
     * const x = Some(17.5);
     * const y = Some(42.7);
     * 
     * x.zipWith(y, Point.create) === Some({ x: 17.5, y: 42.7 })
     * 
     * @template U
     * @template R
     * @param {Option<U>} other
     * @param {(value: T, other: U) => R} fn
     * @return {*}  {Option<R>}
     */
    zipWith(other, fn) {
      if (!(other instanceof _Option)) {
        throw new UndefinedBehaviorError(`Method "zipWith" should accepts instance of Option`, { cause: { value: other } });
      }
      assertArgument("zipWith", fn, "function");
      if (this.status === 1 /* Some */ && other.status === 1 /* Some */) {
        return Some(fn(this.value, other.value));
      }
      return None();
    }
    /**
     * Unzips an option containing a tuple of two options.
     * 
     * If self is `Some((a, b))` this method returns `(Some(a), Some(b))`. Otherwise, `(None, None)` is returned.
     *
     * @example
     * const x = Some([1, "hi"]);
     * const y = None<[number, number]>();
     * console.assert(x.unzip() === [Some(1), Some("hi")]);
     * console.assert(y.unzip() === [None(), None()]);
     */
    unzip() {
      if (Array.isArray(this.value) && this.value.length === 2) {
        return [Some(this.value.at(0)), Some(this.value.at(1))];
      }
      return [None(), None()];
    }
    /**
     * Converts from `Option<Option<T>>` to `Option<T>`.
     * @example
     * const x: Option<Option<number>> = Some(Some(6));
     * Some(6) === x.flatten();
     * 
     * const x: Option<Option<number>> = Some(None());
     * None() === x.flatten();
     * 
     * const x: Option<Option<number>> = None();
     * None() === x.flatten()
     * @return {*}  {Value extends Option<infer Sub> ? Option<Sub> : Option<Value>}
     */
    flatten() {
      if (this.value instanceof _Option) {
        return Some(this.value.value);
      }
      return Some(this.value);
    }
    /**
     * Some value of type `T`.
     */
    static Some(value) {
      if (value === void 0) {
        return new _Option(0 /* None */, void 0);
      }
      return new _Option(1 /* Some */, value);
    }
    /**
     * No value.
     *
     * @static
     * @template T
     * @return {*}  {Option<Value>}
     * @memberof Option
     */
    static None() {
      return new _Option(0 /* None */, void 0);
    }
    equal(other) {
      if (other instanceof _Option) {
        return Object.is(other.value, this.value);
      }
      return false;
    }
    /**
     * Returns `true` if the option is a `Some` value.
     * 
     * @example
     * const x: Option<number> = Some(2);
     * x.isSome() === true // true
     * 
     * const x: Option<number> = None();
     * x.isSome() === false // true
     * @return {*}  {boolean}
     */
    isSome() {
      return this.status === 1 /* Some */;
    }
    /**
     * Returns true if the option is a `None` value.
     *
     * @return {*}  {boolean}
    */
    isNone() {
      return this.status === 0 /* None */;
    }
    /**
     * Returns `true` if the option is a `Some` and the value inside of it matches a predicate.
     * @example
     * const x: Option<number> = Some(2);
     * x.isSomeAnd(x => x > 1) === true // true
     * 
     * const x: Option<number> = Some(0);
     * x.isSomeAnd(x => x > 1 ) === false // true
     * 
     * const x: Option<number> = None();
     * x.isSomeAnd(x => x > 1 ) === false // true
    */
    isSomeAnd(predicate) {
      assertArgument("isSomeAnd", predicate, "function");
      if (this.status === 1 /* Some */) {
        const res = predicate(this.value);
        assertArgument("isSomeAnd", res, "boolean");
        return res;
      }
      return false;
    }
    /**
     * Inserts value into the option if it is `None`, then returns a mutable reference to the contained value. 
     * 
     * See also `insert`, which updates the value even if the option already contains `Some`.
     * @example
     * const x = None<number>();
     * const y = x.getOrInsert(7);
     * 
     * y === 7 // true
     * @param {T} value
     * @return {*}  {Value}
     */
    getOrInsert(value) {
      if (this.status === 0 /* None */) {
        if (value === void 0) {
          throw new UndefinedBehaviorError(`Method "getOrInsert" should provide non "undefined" value.`);
        }
        return this.insert(value).unwrap();
      }
      return this.value;
    }
    /**
     * Inserts a value computed from f into the option if it is `None`, then returns the contained value.
     * @example
     * const x = None<number>();
     * const y = x.getOrInsertWith(() => 5);
     * 
     * y === 5 // true
     * 
     * @param {() => T} predicate
     * @return {*}  {Value}
     */
    getOrInsertWith(callback) {
      if (this.status === 0 /* None */) {
        assertArgument("getOrInsertWith", callback, "function");
        const res = callback();
        if (res === void 0) {
          throw new UndefinedBehaviorError("Callback for method 'getOrInsertWith' should returns non 'undefined' value.");
        }
        return this.insert(res).unwrap();
      }
      return this.value;
    }
    /**
     * Returns the `Option` if it contains a value, otherwise returns `optb`.
     * Arguments passed to or are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `orElse`, which is lazily evaluated.
     *
     * @example
     * const x = Some(2);
     * const y = None();
     * console.assert(x.or(y) === Some(2));
     * // another example
     * const x = None();
     * const y = Some(100);
     * console.assert(x.or(y) === Some(100));
     * // another example
     * let x = Some(2)
     * let y = Some(100)
     * console.assert(x.or(y) === Some(2));
     * // another example
     * const x: Option<number> = None();
     * const y = None();
     * console.assert(x.or(y) === None());
     * 
     * @param {Option<T>} optb
     * @return {*}  {Option<Value>}
     */
    or(optb) {
      if (this.status === 1 /* Some */) {
        return this;
      }
      if (!(optb instanceof _Option)) {
        throw new UndefinedBehaviorError(`Method "or" should accepts isntance of Option`, { cause: { value: optb } });
      }
      return optb;
    }
    /**
     * Returns the `Option` if it contains a value, otherwise calls `f` and returns the result.
     *
     * @example
     * function nobody(): Option<string> { return None() }
     * function vikings(): Option<string> { return Some("vikings") }
     * 
     * Some("barbarians").orElse(vikings) === Some("barbarians"); // true
     * None().orElse(vikings) === Some("vikings"); // true
     * None().orElse(nobody) === None(); // true
     * 
     * @param {() => Option<T>} predicate
     * @return {*}  {Option<Value>}
     */
    orElse(callback) {
      if (this.status === 1 /* Some */) {
        return this;
      }
      assertArgument("orElse", callback, "function");
      const result = callback();
      if (!(result instanceof _Option)) {
        throw new UndefinedBehaviorError(`Callback result for method "orElse" should returns instance of Option. Use Some or None.`, { cause: { value: result } });
      }
      return result;
    }
    toString() {
      const printFn = this.status === 0 /* None */ ? `None` : `Some`;
      return `${printFn}(${this.status === 0 /* None */ ? "" : this.value})`;
    }
    toJSON() {
      return {
        status: this.status,
        value: this.value
      };
    }
    /**
     * @protected
     */
    [Symbol.toPrimitive]() {
      return this.value;
    }
    /**
     * @protected
     */
    get [Symbol.toStringTag]() {
      return "Option";
    }
  };
  function Some(value) {
    return Option.Some(value);
  }
  function None() {
    return Option.None();
  }
  var assertArgument = (method, value, expectedType) => {
    if (typeof value !== expectedType) {
      throw new UndefinedBehaviorError(`Method "${String(method)}" should accepts ${expectedType}`, { cause: { value, type: typeof value } });
    }
  };

  // src/result.ts
  var Result2 = class _Result {
    constructor(status, value, error) {
      this.status = status;
      this.value = value;
      this.error = error;
      if (error) {
        this.status = -1 /* Err */;
      }
    }
    /**
     * Returns the contained `Ok` value, consuming the self value.
     * 
     * Because this function may throws, its use is generally discouraged. Call `unwrapOr`, `unwrapOrElse`.
     *
     * Panics if the value is an `Err`, with a message including the passed message, and the content of the `Err`.
     * 
     * @example
     * const x: Result<number, string> = Err("emergency failure");
     * x.expect("Testing expect"); // `Testing expect`, cause: emergency failure
     * @param {string} reason
     * @return {*}  {T}
     */
    expect(reason) {
      if (this.status === -1 /* Err */) {
        throw new Error(reason, { cause: this.error });
      }
      return this.value;
    }
    /**
     * Returns the contained `Ok` value, consuming the self value.
     * 
     * Because this function may throws, its use is generally discouraged. Instead, call `unwrapOr`, `unwrapOrElse`.
     *
     * @example
     * const x: Result<number, string> = Ok(2);
     * x.unwrap() === 2;
     * @return {*}  {T}
     */
    unwrap() {
      if (this.status === 1 /* Ok */)
        return this.value;
      throw this.error;
    }
    /**
     * Returns the contained `Ok` value or a provided default.
     * 
     * Arguments passed to `unwrapOr` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `unwrapOrElse`, which is lazily evaluated.
     *
     * @example
     * const fallback = 2;
     * const x = Ok(9);
     * x.unwrapOr(fallback) === 9; // true
     *
     * cosnt x: Result<number, string> = Err("error");
     * x.unwrapOr(fallback) === fallback; // true
     * @param {T} fallback
     * @return {*}  {T}
     */
    unwrapOr(fallback) {
      if (this.status === 1 /* Ok */) {
        return this.value;
      }
      return fallback;
    }
    /**
     * Returns `true` if the result is `Ok`.
     *
     * @example
     * const x: Result<number, string> = Ok(-3);
     * x.isOk() // true
     * // another example
     * let x: Result<number, string> = Err("Some error message");
     * x.isOk() // false
     * @return {*}  {boolean}
     */
    isOk() {
      return this.status === 1 /* Ok */;
    }
    /**
     * Returns `true` if the result is `Ok` and the value inside of it matches a predicate.
     *
     * @example
     * const x: Result<number, string> = Ok(2);
     * console.assert(x.isOkAnd(x => x > 1) === true);
     * // another example
     * const x: Result<number, string> = Ok(0);
     * console.assert(x.isOkAnd(x => x > 1) === false);
     * // another example
     * const x: Result<number, string> = Err("hey");
     * console.assert(x.isOkAnd(x => x > 1) === false);
     * @return {*}  {boolean}
     */
    isOkAnd(predicate) {
      if (this.status === -1 /* Err */) {
        return false;
      }
      assertArgument2("isOkAnd", predicate, "function");
      const res = predicate(this.value);
      assertArgument2("isOkAnd", res, "boolean");
      return res;
    }
    /**
     * Returns `true` if the result is `Err`.
     * 
     * @example
     * const x: Result<number, string> = Ok(-3);
     * console.assert(x.isErr() === false);
     * // another example
     * const x: Result<number, string> = Err("Some error message");
     * console.assert(x.isErr() === true);
     *
     * @return {*}  {boolean}
     */
    isErr() {
      return this.status === -1 /* Err */;
    }
    /**
     * Returns `true` if the result is `Err` and the value inside of it matches a predicate.
     * @example
     * const x: Result<number, Error> = Err(new Error("not found"));
     * x.isErrAnd(e => e.message === 'not found') // true;
     * // another example
     * const x: Result<number, Error> = Err(new Error('permission denied'));
     * x.isErrAnd(x => x.name === 'TypeError') // false
     * // another example
     * const x: Result<number, Error> = Ok(123);
     * x.isErrAnd(e => e.name == 'Error'); // false
     *
     * @param {(err: E) => boolean} predicate
     * @return {*}  {boolean}
     */
    isErrAnd(predicate) {
      if (this.status === 1 /* Ok */) {
        return false;
      }
      assertArgument2("isErrAnd", predicate, "function");
      const res = predicate(this.err);
      assertArgument2("isErrAnd", res, "boolean");
      return res;
    }
    /**
     * Converts from `Result<T, E>` to `Option<T>`.
     * 
     * Converts self into an `Option<T>`, consuming self, and discarding the error, if any.
     *
     * @example
     * const x: Result<number, string> = Ok(2);
     * x.ok() === Some(2); // true
     * // another example
     * const x: Result<number, string> = Err("Nothing here");
     * x.ok() === None(); // true
     * @return {*}  {Option<T>}
     */
    ok() {
      if (this.status === 1 /* Ok */) {
        return Some(this.value);
      }
      return None();
    }
    /**
     * Converts from `Result<T, E>` to `Option<E>`.
     * 
     * Converts self into an `Option<E>`, consuming self, and discarding the success value, if any.
     *
     * @example
     * const x: Result<number, string> = Ok(2);
     * x.err() === None(); // true
     * 
     * const x: Result<number, string> = Err("Nothing here");
     * x.err() === Some("Nothing here"); // true
     * @return {*}  {Option<E>}
     */
    err() {
      if (this.status === -1 /* Err */) {
        return Some(this.error);
      }
      return None();
    }
    /**
     * Maps a `Result<T, E>` to `Result<U, E>` by applying a function to a contained Ok value, leaving an `Err` value untouched.
     * 
     * This function can be used to compose the results of two functions.
     * 
     * @example
     * const x = Ok(1);
     * x.map(v => v * 2) === Ok(2) // true
     *
     * @template U
     * @param {(value: T) => U} mapFn
     * @return {*}  {Result<U, E>}
     */
    map(mapFn) {
      assertArgument2("map", mapFn, "function");
      if (this.status === 1 /* Ok */) {
        return Ok(mapFn(this.value));
      } else {
        return Err(this.error);
      }
    }
    /**
     * Returns the provided default (if `Err`), or applies a function to the contained value (if `Ok`),
     * 
     * Arguments passed to `mapOr` are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `mapOrElse`, which is lazily evaluated.
     *
     * @example
     * const x: Result<string, string> = Ok("foo");
     * x.mapOr(42, v => v.length) // result is 3
     * // another example
     * const x: Result<number, string> = Err("bar");
     * x.mapOr(42, v => v.length) // 42
     * 
     * @template U
     * @param {U} another
     * @param {(value: T) => U} fn
     * @return {*}  {U}
     */
    mapOr(another, fn) {
      assertArgument2("mapOr", fn, "function");
      if (this.status === 1 /* Ok */) {
        return fn(this.value);
      }
      return another;
    }
    /**
     * Maps a `Result<T, E>` to `U` by applying fallback function default to a contained `Err` value, or function `f` to a contained `Ok` value.
     * 
     * This function can be used to unpack a successful result while handling an error.
     *
     * @example
     * let k = 21;
     * 
     * const x: Result<string, string> = Ok("foo");
     * x.mapOrElse(err => k * 2, v => v.length); // 3
     *
     * const y : Result<string, string> = Err("bar");
     * y.mapOrElse(e => k * 2, v => v.length) // 42
     * @template U
     * @param {(err: E) => U} errFn
     * @param {(value: T) => U} okFn
     * @return {*}  {U}
     */
    mapOrElse(errFn, okFn) {
      assertArgument2("mapOrElse", errFn, "function");
      assertArgument2("mapOrElse", okFn, "function");
      if (this.status === -1 /* Err */) {
        return errFn(this.error);
      }
      return okFn(this.value);
    }
    /**
     * Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a contained `Err` value, leaving an `Ok` value untouched.
     * 
     * This function can be used to pass through a successful result while handling an error.
     *
     * @example
     * const stringify = (x: number) => `error code: ${x}`
     * 
     * const x: Result<number, number> = Ok(2);
     * x.mapErr(stringify) === Ok(2) // true
     * 
     * const y: Result<number, number> = Err(13);
     * y.mapErr(stringify) === Err("error code: 13"));
     * @template F
     * @param {(err: E) => F} errFn
     * @return {*}  {Result<T, F>}
     */
    mapErr(errFn) {
      assertArgument2("mapErr", errFn, "function");
      if (this.status === -1 /* Err */) {
        return Err(errFn(this.error));
      }
      return Ok(this.value);
    }
    /**
     * Returns the contained `Err` value, consuming the self value.
     *
     * @example
     * const x: Result<number, string> = Ok(10);
     * x.expectErr("Testing expectErr"); // throws `Testing expectErr; cause: 10`
     * @param {string} reason
     * @return {*}  {E}
     */
    expectErr(reason) {
      assertArgument2("expectErr", reason, "string");
      if (this.status === 1 /* Ok */) {
        throw new Error(reason, { cause: this.error ?? this.value });
      }
      return this.error;
    }
    /**
     * Returns the contained `Err` value, consuming the self value.
     *
     * @example
     * const x: Result<number, string> = Err("emergency failure");
     * x.unwrapErr() === "emergency failure";
     * @return {*}  {E}
     */
    unwrapErr() {
      if (this.status === -1 /* Err */) {
        return this.error;
      }
      throw this.value;
    }
    /**
    * Returns the contained `Ok` value or computes it from a closure.
    *
    * @example
    * const count = (x: string) => x.length;
    * 
    * Ok(2).unwrapOrElse(count) === 2 // true
    * Err("foo").unwrapOrElse(count) === 3; // true
    *
    * @param {(err: E) => T} fn
    * @return {*}  {T}
    */
    unwrapOrElse(fn) {
      if (this.status === 1 /* Ok */) {
        return this.value;
      }
      assertArgument2("unwrapOrElse", fn, "function");
      return fn(this.error);
    }
    /**
     * Returns `res` if the result is `Ok`, otherwise returns the `Err` value of self.
     * 
     * Arguments passed to and are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `andThen`, which is lazily evaluated.
     *
     * @example
     * const x: Result<number, string> = Ok(2);
     * const y: Result<string, string> = Err("late error");
     * x.and(y) === Err("late error"); // true
     * // another example
     * const x: Result<number, string> = Err("early error");
     * const y: Result<string, string> = Ok("foo");
     * x.and(y) === Err("early error"); // true
     * // another example
     * const x: Result<number, string> = Err("not a 2");
     * const y: Result<string, string> = Err("late error");
     * x.and(y) === Err("not a 2"); // true
     * // another example
     * const x: Result<number, string> = Ok(2);
     * const y: Result<string, string> = Ok("different result type");
     * x.and(y) === Ok("different result type"); // true
     * @template U
     * @param {Result<U, E>} res
     * @return {*}  {Result<U, E>}
     */
    and(res) {
      if (!(res instanceof _Result)) {
        throw new UndefinedBehaviorError(`Method "and" should accepts isntance of Result`, { cause: { value: res } });
      }
      if (this.status === -1 /* Err */) {
        return Err(this.error);
      }
      return res;
    }
    /**
     * Calls op if the result is `Ok`, otherwise returns the `Err` value of self.
     * 
     * This function can be used for control flow based on `Result` values.
     *
     * @example
     * const sqThenToString = (x: number) => {
     *     return Ok(x * x).map(sq => sq.toString())
     * }
     * 
     * Ok(2).andThen(sqThenToString) === Ok(4.toString())); // true
     * Err("not a number").andThen(sqThenToString) === Err("not a number"); // true
     * @template U
     * @param {(value: T) => Result<U, E>} fn
     * @return {*}  {Result<U, E>}
     */
    andThen(fn) {
      assertArgument2("andThen", fn, "function");
      if (this.status === 1 /* Ok */) {
        const res = fn(this.value);
        if (res instanceof _Result) {
          return res;
        }
        throw new UndefinedBehaviorError("Function result expected to be instance of Result.", { cause: res });
      }
      return Err(this.error);
    }
    /**
     * Returns `res` if the result is `Err`, otherwise returns the `Ok` value of self.
     * 
     * Arguments passed to or are eagerly evaluated; if you are passing the result of a function call, it is recommended to use `orElse`, which is lazily evaluated.
     *
     * @example
     * const x: Result<number, string> = Ok(2);
     * const y: Result<number, string> = Err("late error");
     * x.or(y) === Ok(2); // true
     * // another example
     * const x: Result<number, string> = Err("early error");
     * const y: Result<number, string> = Ok(2);
     * x.or(y) === Ok(2); // true
     * // another example
     * const x: Result<number, string> = Err("not a 2");
     * const y: Result<number, string> = Err("late error");
     * x.or(y) === Err("late error"); // true
     * // another example
     * const x: Result<number, string> = Ok(2);
     * const y: Result<number, string> = Ok(100);
     * x.or(y) === Ok(2); // true
     * @template F
     * @param {Result<T, F>} res
     * @return {*}  {Result<T, F>}
     */
    or(res) {
      if (!(res instanceof _Result)) {
        throw new UndefinedBehaviorError(`Operator "or" expect to pass instance of Result`, { cause: { value: res } });
      }
      if (this.status === -1 /* Err */) {
        return res;
      }
      return Ok(this.value);
    }
    /**
     * Calls `fn` if the result is `Err`, otherwise returns the `Ok` value of self.
     * 
     * This function can be used for control flow based on result values.
     *
     * @example
     * const sq = (x: number) =>  Ok(x * x);
     * const err = (x: number) => Err(x);
     * 
     * Ok(2).orElse(sq).orElse(sq) === Ok(2); // true
     * Ok(2).orElse(err).orElse(sq) === Ok(2); // true
     * Err(3).orElse(sq).orElse(err) === Ok(9); // true
     * Err(3).orElse(err).orElse(err) === Err(3); // true
     * @template F
     * @param {(err: E) => Result<T, F>} fn
     * @return {*}  {Result<T, F>}
     */
    orElse(fn) {
      if (this.status === -1 /* Err */) {
        assertArgument2("orElse", fn, "function");
        const res = fn(this.error);
        if (!(res instanceof _Result)) {
          throw new UndefinedBehaviorError('Operator "orElse" expected to return instance of Result. Use "Ok" or "Err" function to define them.', { cause: { value: res, type: typeof res } });
        }
        return res;
      }
      return new _Result(this.status, this.value, this.error);
    }
    /**
      * Converts from `Result<Result<T, E>, E>` to `Result<T, E>`
      *
      * @example
      * const x: Result<Result<string, number>, number> = Ok(Ok("hello"));
      * Ok("hello") === x.flatten() // true
      * 
      * const x: Result<Result<string, number>, number> = Ok(Err(6));
      * Err(6) === x.flatten(); // true
      * 
      * const x: Result<Result<string, number>, number> = Err(6);
      * Err(6) === x.flatten(); // true
      * @return {*}  {T extends Result<infer Ok, E> ? Result<Ok, E> : Result<T, E>}
      */
    flatten() {
      if (this.value instanceof _Result) {
        return this.value;
      }
      return this;
    }
    static Ok(value) {
      return new _Result(1 /* Ok */, value, null);
    }
    static Err(value) {
      return new _Result(-1 /* Err */, null, value);
    }
    equal(other) {
      if (other instanceof _Result) {
        if (this.status === 1 /* Ok */ && other.status === 1 /* Ok */) {
          return this.value === other.value;
        }
        if (this.status === -1 /* Err */ && other.status === -1 /* Err */) {
          return this.error === other.error;
        }
        return false;
      }
      return false;
    }
    toString() {
      const printFn = this.status === -1 /* Err */ ? `Err` : `Ok`;
      return `${printFn}(${this.status === -1 /* Err */ ? this.error : this.value})`;
    }
    toJSON() {
      return {
        status: this.status,
        value: this.value,
        error: this.error
      };
    }
    /**
     * @protected
     */
    [Symbol.toPrimitive]() {
      return this.value;
    }
    /**
     * @protected
     */
    get [Symbol.toStringTag]() {
      return "Result";
    }
  };
  function Ok(value) {
    return Result2.Ok(value);
  }
  function Err(err) {
    return Result2.Err(err);
  }
  function assertArgument2(method, value, expectedType) {
    const type = typeof value;
    if (type !== expectedType) {
      throw new UndefinedBehaviorError(`Method "${String(method)}" should accepts or returns ${expectedType}`, { cause: { value, type } });
    }
  }

  // src/match.ts
  function match(value, okOrSomeCb, errOrNoneCb) {
    if (typeof okOrSomeCb !== "function") {
      throw new UndefinedBehaviorError(`match function expects to provide a function.`, { cause: { value: okOrSomeCb, type: typeof okOrSomeCb } });
    }
    if (typeof errOrNoneCb !== "function") {
      throw new UndefinedBehaviorError(`match function expects to provide a function.`, { cause: { value: okOrSomeCb, type: typeof okOrSomeCb } });
    }
    if (typeof value === "boolean") {
      if (value === true) {
        return okOrSomeCb(true);
      }
      return errOrNoneCb(false);
    } else if (value instanceof Option) {
      if (value.isSome()) {
        return okOrSomeCb(value.unwrap());
      }
      return errOrNoneCb(void 0);
    } else if (value instanceof Result2) {
      if (value.isOk()) {
        return okOrSomeCb(value.unwrap());
      }
      return errOrNoneCb(value.unwrapErr());
    }
    throw new UndefinedBehaviorError(`only boolean type, Option or Result instance are allowed`, { cause: { value, type: typeof value, ctor: value.constructor?.name } });
  }

  var GWU = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ERROR: ERROR,
    Err: Err,
    FALSE: FALSE,
    IDENTITY: IDENTITY,
    IS_NONZERO: IS_NONZERO,
    IS_ZERO: IS_ZERO,
    NOOP: NOOP,
    None: None,
    ONE: ONE,
    Ok: Ok,
    Option: Option,
    Result: Result2,
    Some: Some,
    TRUE: TRUE,
    UndefinedBehaviorError: UndefinedBehaviorError,
    WARN: WARN,
    ZERO: ZERO,
    app: index,
    blob: blob,
    buffer: buffer,
    canvas: index$5,
    color: index$9,
    colors: colors,
    cosmetic: cosmetic,
    flag: flag,
    fov: index$7,
    frequency: frequency,
    grid: grid,
    light: index$3,
    list: list,
    match: match,
    message: message,
    object: object,
    path: index$6,
    queue: queue,
    random: random$2,
    range: range,
    rng: rng,
    scheduler: scheduler,
    sprite: index$4,
    tags: tags,
    text: index$8,
    tween: tween,
    types: types$1,
    ui: index$2$1,
    utils: utils,
    widget: index$1$1,
    xy: xy
  });

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
      const info = object.assignOmitting('priority, extends', base, opts);
      info.id = id;
      info.index = allTiles.length;
      if (opts.tags) {
          info.tags = tags.make(opts.tags);
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
  function make$1$1(id, config) {
      if (!id)
          return FALSE;
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
              .map((config) => make$1$1(config))
              .filter((a) => a !== null);
      }
      else if (typeof id === 'function') {
          return id;
      }
      else {
          steps = Object.entries(id)
              .map(([key, config]) => make$1$1(key, config))
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
              .map((c) => make$1$1(c))
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
      const steps = Object.entries(cfg).map(([key, config]) => make$1$1(key, config));
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

  const Fl$2 = flag.fl;
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
      config.flags = flag.from(Flags$2, config.flags || 0);
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
      const spawnMap = grid.alloc(map.width, map.height);
      if (!computeSpawnMap(cfg, spawnMap, site, x, y)) {
          grid.free(spawnMap);
          return false;
      }
      if (abortIfBlocking && mapDisruptedBy(map, spawnMap)) {
          grid.free(spawnMap);
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
      grid.free(spawnMap);
      return didSomething;
  }
  function mapDisruptedBy(map, blockingGrid, blockingToMapX = 0, blockingToMapY = 0) {
      const walkableGrid = grid.alloc(map.width, map.height);
      let disrupts = false;
      // Get all walkable locations after lake added
      xy.forRect(map.width, map.height, (i, j) => {
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
      grid.free(walkableGrid);
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
          xy.eachNeighbor(x, y, (i, j) => {
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
          xy.eachNeighbor(x, y, (i, j) => {
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
                              x2 = i + xy.DIRS[dir][0];
                              y2 = j + xy.DIRS[dir][1];
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

  const hordes$1 = [];
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
                  member.count = range.make(value.count || 1);
                  member.make = value.make || {};
              }
              else {
                  // @ts-ignore
                  member.count = range.make(value);
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
      info.frequency = frequency.make(config.frequency);
      info.flags = 0;
      info.requiredTile = config.requiredTile || null;
      info.feature = config.feature ? make$1$1(config.feature) : null;
      info.blueprint = config.blueprint || null;
      hordes$1.push(info);
      return info;
  }
  function pickHorde(depth, rules, rng) {
      rng = rng || random$2;
      let tagMatch;
      if (typeof rules === 'string') {
          tagMatch = tags.makeMatch(rules);
      }
      else if ('id' in rules) {
          return hordes$1.find((h) => h.id === rules.id) || null;
      }
      else {
          tagMatch = tags.makeMatch(rules);
      }
      const choices = hordes$1.filter((horde) => tagMatch(horde.tags));
      if (choices.length == 0)
          return null;
      const freq = choices.map((info) => info.frequency(depth));
      const choice = rng.weighted(freq);
      return choices[choice] || null;
  }
  function spawnHorde(info, map, x = -1, y = -1, opts = {}) {
      // Leader info
      opts.canSpawn = opts.canSpawn || TRUE;
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
      info.frequency = frequency.make(config.frequency || 100);
      info.flags = 0;
      info.requiredTile = config.requiredTile || null;
      info.feature = config.feature || null;
      info.blueprint = config.blueprint || null;
      items.push(info);
      return info;
  }
  function pickItem(depth, tagRules, rng) {
      rng = rng || random$2;
      if (typeof tagRules !== 'string' && 'id' in tagRules) {
          // @ts-ignore
          return items.find((i) => i.id === tagRules.id) || null;
      }
      tagRules = typeof tagRules === 'string' ? tagRules : tagRules.tags;
      const tagMatch = tags.makeMatch(tagRules);
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

  const DIRS$1 = xy.DIRS;
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
      solutionDir = xy.NO_DIRECTION;
      for (dir = 0; dir < 4; dir++) {
          newX = x + DIRS$1[dir][0];
          newY = y + DIRS$1[dir][1];
          oppX = x - DIRS$1[dir][0];
          oppY = y - DIRS$1[dir][1];
          if (site.hasXY(oppX, oppY) &&
              site.hasXY(newX, newY) &&
              site.isFloor(oppX, oppY)) {
              // This grid cell would be a valid tile on which to place a door that, facing outward, points dir.
              if (solutionDir != xy.NO_DIRECTION) {
                  // Already claimed by another direction; no doors here!
                  return xy.NO_DIRECTION;
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
                  if (dir != xy.NO_DIRECTION) {
                      // Trace a ray 10 spaces outward from the door site to make sure it doesn't intersect the room.
                      // If it does, it's not a valid door site.
                      newX = i + xy.DIRS[dir][0];
                      newY = j + xy.DIRS[dir][1];
                      doorSiteFailed = false;
                      for (k = 0; k < 10 && site.hasXY(newX, newY) && !doorSiteFailed; k++) {
                          if (site.isSet(newX, newY)) {
                              doorSiteFailed = true;
                          }
                          newX += xy.DIRS[dir][0];
                          newY += xy.DIRS[dir][1];
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
      costGrid.update((_v, x, y) => source.isPassable(x, y) ? 1 : index$6.OBSTRUCTION);
  }
  function siteDisruptedByXY(site, x, y, options = {}) {
      var _a, _b, _c;
      (_a = options.offsetX) !== null && _a !== void 0 ? _a : (options.offsetX = 0);
      (_b = options.offsetY) !== null && _b !== void 0 ? _b : (options.offsetY = 0);
      (_c = options.machine) !== null && _c !== void 0 ? _c : (options.machine = 0);
      if (xy.arcCount(x, y, (i, j) => {
          return site.isPassable(i, j);
      }) <= 1)
          return false;
      const blockingGrid = grid.alloc(site.width, site.height);
      blockingGrid[x][y] = 1;
      const result = siteDisruptedBy(site, blockingGrid, options);
      grid.free(blockingGrid);
      return result;
  }
  function siteDisruptedBy(site, blockingGrid, options = {}) {
      var _a, _b, _c;
      (_a = options.offsetX) !== null && _a !== void 0 ? _a : (options.offsetX = 0);
      (_b = options.offsetY) !== null && _b !== void 0 ? _b : (options.offsetY = 0);
      (_c = options.machine) !== null && _c !== void 0 ? _c : (options.machine = 0);
      const walkableGrid = grid.alloc(site.width, site.height);
      let disrupts = false;
      // Get all walkable locations after lake added
      xy.forRect(site.width, site.height, (i, j) => {
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
      grid.free(walkableGrid);
      return disrupts;
  }
  function siteDisruptedSize(site, blockingGrid, blockingToMapX = 0, blockingToMapY = 0) {
      const walkableGrid = grid.alloc(site.width, site.height);
      let disrupts = 0;
      // Get all walkable locations after lake added
      xy.forRect(site.width, site.height, (i, j) => {
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
      grid.free(walkableGrid);
      return disrupts;
  }
  function computeDistanceMap(site, distanceMap, originX, originY, _maxDistance) {
      distanceMap.reset(site.width, site.height);
      distanceMap.setGoal(originX, originY);
      distanceMap.calculate((x, y) => {
          if (!site.hasXY(x, y))
              return index$6.OBSTRUCTION;
          if (site.isPassable(x, y))
              return index$6.OK;
          if (site.blocksDiagonal(x, y))
              return index$6.OBSTRUCTION;
          return index$6.BLOCKED;
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
      const blockMap = grid.alloc(map.width, map.height);
      const grid$1 = grid.alloc(map.width, map.height);
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
                          const oldX = i + xy.CLOCK_DIRS[(dir + 7) % 8][0];
                          const oldY = j + xy.CLOCK_DIRS[(dir + 7) % 8][1];
                          const newX = i + xy.CLOCK_DIRS[dir][0];
                          const newY = j + xy.CLOCK_DIRS[dir][1];
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
                          const newX = i + xy.DIRS[dir][0];
                          const newY = j + xy.DIRS[dir][1];
                          if (map.hasXY(newX, newY) && // RUT.Map.makeValidXy(map, newXy) &&
                              !blockMap[newX][newY] &&
                              !map.isChokepoint(newX, newY)) {
                              // OK, (newX, newY) is an open point and (i, j) is a chokepoint.
                              // Pretend (i, j) is blocked by changing passMap, and run a flood-fill cell count starting on (newX, newY).
                              // Keep track of the flooded region in grid[][].
                              grid$1.fill(0);
                              blockMap[i][j] = 1;
                              let cellCount = floodFillCount(map, grid$1, blockMap, newX, newY);
                              blockMap[i][j] = 0;
                              // CellCount is the size of the region that would be obstructed if the chokepoint were blocked.
                              // CellCounts less than 4 are not useful, so we skip those cases.
                              if (cellCount >= 4) {
                                  // Now, on the chokemap, all of those flooded cells should take the lesser of their current value or this resultant number.
                                  for (let i2 = 0; i2 < grid$1.width; i2++) {
                                      for (let j2 = 0; j2 < grid$1.height; j2++) {
                                          if (grid$1[i2][j2] &&
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
      grid.free(blockMap);
      grid.free(grid$1);
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
              const newX = x + xy.DIRS[dir][0];
              const newY = y + xy.DIRS[dir][1];
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
      xy.forRect(map.width, map.height, (x, y) => {
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
      const todo = grid.alloc(map.width, map.height, 1);
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
                  newX = x + xy.CLOCK_DIRS[sdir][0];
                  newY = y + xy.CLOCK_DIRS[sdir][1];
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
                  newX = x + xy.CLOCK_DIRS[dir % 8][0];
                  newY = y + xy.CLOCK_DIRS[dir % 8][1];
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
                      newX = x + xy.CLOCK_DIRS[dir][0];
                      newY = y + xy.CLOCK_DIRS[dir][1];
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
      const grid$1 = grid.alloc(map.width, map.height);
      fillInnerLoopGrid(map, grid$1);
      // const xy = { x: 0, y: 0 };
      let designationSurvives;
      for (let i = 0; i < grid$1.width; i++) {
          for (let j = 0; j < grid$1.height; j++) {
              // const cell = map.cell(i, j);
              if (map.isInLoop(i, j)) {
                  designationSurvives = false;
                  for (let dir = 0; dir < 8; dir++) {
                      let newX = i + xy.CLOCK_DIRS[dir][0];
                      let newY = j + xy.CLOCK_DIRS[dir][1];
                      if (map.hasXY(newX, newY) && // RUT.Map.makeValidXy(map, xy, newX, newY) &&
                          !grid$1[newX][newY] &&
                          !map.isInLoop(newX, newY)) {
                          designationSurvives = true;
                          break;
                      }
                  }
                  if (!designationSurvives) {
                      grid$1[i][j] = 1;
                      map.clearInLoop(i, j);
                      // map.cell(i, j).flags.cell &= ~Flags.Cell.IS_IN_LOOP;
                  }
              }
          }
      }
      grid.free(grid$1);
  }
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////

  const Flags$1 = flag.make([
      'CHOKEPOINT',
      'GATE_SITE',
      'IN_LOOP',
      'IN_MACHINE',
      'IN_AREA_MACHINE',
      'IMPREGNABLE',
  ]);
  class Site {
      constructor(width, height, opts = {}) {
          this.rng = rng.random;
          this.items = [];
          this.actors = [];
          this.depth = 0;
          this.machineCount = 0;
          this._tiles = grid.alloc(width, height);
          this._doors = grid.alloc(width, height);
          this._flags = grid.alloc(width, height);
          this._machine = grid.alloc(width, height);
          this._chokeCounts = grid.alloc(width, height);
          if (opts.rng) {
              this.rng = opts.rng;
          }
      }
      free() {
          grid.free(this._tiles);
          grid.free(this._doors);
          grid.free(this._flags);
          grid.free(this._machine);
          grid.free(this._chokeCounts);
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
          xy.forRect(this.width, this.height, (x, y) => {
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

  const Fl$1 = flag.fl;
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
          console.log(`onBlueprintPick - ${data.blueprint.id}, depth = ${depth}, matchingFlags = ${flag.toString(StepFlags, flags)}`);
      }
      onBlueprintCandidates(data) {
          const label = `onBlueprintCandidates - ${data.blueprint.id}`;
          console.group(label);
          data.candidates.dump();
          console.groupEnd();
      }
      onBlueprintStart(data) {
          console.group(`onBlueprintStart - ${data.blueprint.id} @ ${data.originX},${data.originY} : stepCount: ${data.blueprint.steps.length}, size: [${data.blueprint.size.toString()}], flags: ${flag.toString(StepFlags, data.blueprint.flags)}`);
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
          console.group(`onStepStart - ${data.blueprint.id}[${data.blueprint.steps.indexOf(step) + 1}/${data.blueprint.steps.length}] @ ${data.originX},${data.originY} : count: [${step.count.toString()}], flags: ${flag.toString(StepFlags, step.flags)}`);
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
          console.log(`onStepSuccess - ${data.blueprint.id}[${data.blueprint.steps.indexOf(step) + 1}/${data.blueprint.steps.length}] @ ${data.originX},${data.originY} : count: [${step.count.toString()}], flags: ${flag.toString(StepFlags, step.flags)}`);
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
      hordes: hordes$1,
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

  class Hall extends xy.Bounds {
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
      const dir = xy.DIRS[dirIndex];
      const x = Math.min(loc[0], loc[0] + dir[0] * (hallLength - 1));
      const y = Math.min(loc[1], loc[1] + dir[1] * (hallLength - 1));
      const width = Math.abs(dir[0] * hallLength) || hallWidth;
      const height = Math.abs(dir[1] * hallLength) || hallWidth;
      return new Hall(x, y, width, height);
  }
  class Room extends xy.Bounds {
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
          const range$1 = range.make(have); // throws if invalid
          config[key] = range$1;
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
              ERROR('Missing room digger choice: ' + id);
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
          const blobGrid = grid.alloc(site.width, site.height, 0);
          const minWidth = Math.floor(0.5 * width); // 6
          const maxWidth = width;
          const minHeight = Math.floor(0.5 * height); // 4
          const maxHeight = height;
          const blob$1 = new blob.Blob({
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
          const bounds = blob$1.carve(blobGrid.width, blobGrid.height, (x, y) => (blobGrid[x][y] = 1));
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
          grid.free(blobGrid);
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
          xy.forRect(roomX, roomY, roomWidth, roomHeight, (x, y) => site.setTile(x, y, tile));
          xy.forRect(roomX2, roomY2, roomWidth2, roomHeight2, (x, y) => site.setTile(x, y, tile));
          const room = new Room(Math.min(roomX, roomX2), Math.min(roomY, roomY2), Math.max(roomWidth, roomWidth2), Math.max(roomHeight, roomHeight2));
          room.doors[xy.DOWN] = [Math.floor(site.width / 2), site.height - 2];
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
          xy.forRect(roomX, roomY, roomWidth, roomHeight, (x, y) => site.setTile(x, y, tile));
          xy.forRect(roomX2, roomY2, roomWidth2, roomHeight2, (x, y) => site.setTile(x, y, tile));
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
          xy.forRect(x, y, width, minorHeight, (x, y) => site.setTile(x, y, tile));
          const x2 = Math.floor((site.width - minorWidth) / 2);
          const y2 = Math.floor((site.height - height) / 2);
          xy.forRect(x2, y2, minorWidth, height, (x, y) => site.setTile(x, y, tile));
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
          xy.forRect(x, y, width, height, (x, y) => site.setTile(x, y, tile));
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
              xy.forCircle(x, y, radius, (x, y) => site.setTile(x, y, tile));
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
          xy.forCircle(x, y, radius, (x, y) => site.setTile(x, y, tile));
          if (radius > ringMinWidth + holeMinSize &&
              site.rng.chance(this.options.holeChance.value(site.rng))) {
              xy.forCircle(x, y, site.rng.range(holeMinSize, radius - holeMinSize), (x, y) => site.clearTile(x, y));
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
          xy.forCircle(left, top, 2, (x, y) => site.setTile(x, y, tile));
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
                  xy.forCircle(x, y, 2, (x, y) => site.setTile(x, y, tile));
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
  function install$2$1(id, room) {
      rooms[id] = room;
      return room;
  }
  install$2$1('DEFAULT', new Rectangular());

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
      install: install$2$1
  });

  const DIRS = xy.DIRS;
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
      return utils.clamp(_pickWidth(width, rng), 1, 3);
  }
  function _pickWidth(width, rng$1) {
      if (!width)
          return 1;
      if (typeof width === 'number')
          return width;
      rng$1 = rng$1 !== null && rng$1 !== void 0 ? rng$1 : rng.random;
      if (Array.isArray(width)) {
          width = rng$1.weighted(width) + 1;
      }
      else if (typeof width === 'string') {
          width = range.make(width).value(rng$1);
      }
      else if (width instanceof range.Range) {
          width = width.value(rng$1);
      }
      else {
          const weights = width;
          width = Number.parseInt(rng$1.weighted(weights));
      }
      return width;
  }
  function pickLength(dir, lengths, rng) {
      if (dir == xy.UP || dir == xy.DOWN) {
          return lengths[1].value(rng);
      }
      else {
          return lengths[0].value(rng);
      }
  }
  function pickHallDirection(site, doors, lengths) {
      // Pick a direction.
      let dir = xy.NO_DIRECTION;
      if (dir == xy.NO_DIRECTION) {
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
              dir = xy.NO_DIRECTION;
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
              length: [range.make('2-15'), range.make('2-9')],
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
                  const l = range.make(options.length);
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
          if (dir === xy.NO_DIRECTION)
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
          const DIR = xy.DIRS[dir];
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
  function install$1$1(id, hall) {
      // @ts-ignore
      halls[id] = hall;
      return hall;
  }
  install$1$1('DEFAULT', new HallDigger({ chance: 15 }));

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
          object.assignObject(this.options, options);
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
          const lakeGrid = grid.alloc(site.width, site.height, 0);
          let attempts = 0;
          while (attempts < maxCount && count < maxCount) {
              // lake generations
              const width = Math.round(((lakeMaxWidth - lakeMinSize) * (maxCount - attempts)) /
                  maxCount) + lakeMinSize;
              const height = Math.round(((lakeMaxHeight - lakeMinSize) * (maxCount - attempts)) /
                  maxCount) + lakeMinSize;
              const blob$1 = new blob.Blob({
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
              const bounds = blob$1.carve(lakeGrid.width, lakeGrid.height, (x, y) => (lakeGrid[x][y] = 1));
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
                                      xy.forCircle(sx, sy, wreathSize, (i2, j2) => {
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
          grid.free(lakeGrid);
          return count;
      }
      isDisruptedBy(site, lakeGrid, lakeToMapX = 0, lakeToMapY = 0) {
          const walkableGrid = grid.alloc(site.width, site.height);
          let disrupts = false;
          // Get all walkable locations after lake added
          xy.forRect(site.width, site.height, (i, j) => {
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
          grid.free(walkableGrid);
          return disrupts;
      }
  }

  class Bridges {
      constructor(options = {}) {
          this.options = {
              minDistance: 20,
              maxLength: 5,
          };
          object.assignObject(this.options, options);
      }
      create(site) {
          let count = 0;
          let newX, newY;
          let i, j, d, x, y;
          const maxLength = this.options.maxLength;
          const minDistance = this.options.minDistance;
          const pathGrid = new index$6.DijkstraMap();
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
                              pathGrid.getDistance(x, y) < index$6.BLOCKED) {
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
          object.assignObject(this.options, options);
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
                  start = site.rng.matchingLocNear(xy.x(start), xy.y(start), isValidLoc);
              }
              locations.start = start;
          }
          if (Array.isArray(this.options.up) &&
              Array.isArray(this.options.down)) {
              const up = this.options.up;
              upLoc = site.rng.matchingLocNear(xy.x(up), xy.y(up), isValidLoc);
              const down = this.options.down;
              downLoc = site.rng.matchingLocNear(xy.x(down), xy.y(down), isValidLoc);
          }
          else if (Array.isArray(this.options.up) &&
              !Array.isArray(this.options.down)) {
              const up = this.options.up;
              upLoc = site.rng.matchingLocNear(xy.x(up), xy.y(up), isValidLoc);
              if (needDown) {
                  downLoc = site.rng.matchingLoc(site.width, site.height, (x, y) => {
                      if (
                      // @ts-ignore
                      xy.distanceBetween(x, y, upLoc[0], upLoc[1]) <
                          minDistance)
                          return false;
                      return isValidLoc(x, y);
                  });
              }
          }
          else if (Array.isArray(this.options.down) &&
              !Array.isArray(this.options.up)) {
              const down = this.options.down;
              downLoc = site.rng.matchingLocNear(xy.x(down), xy.y(down), isValidLoc);
              if (needUp) {
                  upLoc = site.rng.matchingLoc(site.width, site.height, (x, y) => {
                      if (xy.distanceBetween(x, y, downLoc[0], downLoc[1]) < minDistance)
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
                      xy.distanceBetween(x, y, upLoc[0], upLoc[1]) <
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
              const dir = xy.DIRS[i];
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
              dir = xy.DIRS[i];
              const x0 = x + dir[0];
              const y0 = y + dir[1];
              if (site.isFloor(x0, y0)) {
                  if (site.isDiggable(x - dir[0], y - dir[1]))
                      break;
              }
              dir = null;
          }
          if (!dir)
              ERROR('No stair direction found!');
          site.setTile(x, y, tile);
          const dirIndex = xy.CLOCK_DIRS.findIndex(
          // @ts-ignore
          (d) => d[0] == dir[0] && d[1] == dir[1]);
          for (let i = 0; i < xy.CLOCK_DIRS.length; ++i) {
              const l = i ? i - 1 : 7;
              const r = (i + 1) % 8;
              if (i == dirIndex || l == dirIndex || r == dirIndex)
                  continue;
              const d = xy.CLOCK_DIRS[i];
              site.setTile(x + d[0], y + d[1], wallTile);
              // map.setCellFlags(x + d[0], y + d[1], Flags.Cell.IMPREGNABLE);
          }
          // dungeon.debug('setup stairs', x, y, tile);
          return true;
      }
  }

  class LoopDigger {
      constructor(options = {}) {
          this.options = {
              minDistance: 100,
              maxLength: 1,
              doorChance: 50,
          };
          object.assignObject(this.options, options);
      }
      create(site) {
          let startX, startY, endX, endY;
          let i, j, d, x, y;
          const minDistance = Math.min(this.options.minDistance, Math.floor(Math.max(site.width, site.height) / 2));
          const maxLength = this.options.maxLength;
          const pathGrid = new index$6.DijkstraMap();
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
                              pathGrid.getDistance(endX, endY) < index$6.BLOCKED) {
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
          object.setOptions(this.rooms, options.rooms);
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
          object.setOptions(this.doors, options.doors);
          // Halls
          if (options.halls === false) {
              options.halls = { chance: 0 };
          }
          else if (options.halls === true) {
              options.halls = {};
          }
          object.setOptions(this.halls, options.halls);
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
              object.setOptions(this.loops, options.loops);
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
              object.setOptions(this.lakes, options.lakes);
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
              object.setOptions(this.bridges, options.bridges);
          }
          // Stairs
          if (options.stairs === false) {
              this.stairs = null;
          }
          else {
              if (typeof options.stairs !== 'object')
                  options.stairs = {};
              // @ts-ignore
              object.setOptions(this.stairs, options.stairs);
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
              xy.forRect(this.site.width, this.site.height, (x, y) => {
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
          const seed = this.seed || rng.random.number();
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
              if (dir != xy.NO_DIRECTION) {
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
          if (dir === xy.UP || dir === xy.DOWN) {
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
          xy.forRect(site.width, site.height, (x, y) => {
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
          xy.forRect(site.width, site.height, (x, y) => {
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

  const Fl$3 = flag.fl;
  var Flags$3;
  (function (Flags) {
      Flags[Flags["BP_ROOM"] = Fl$3(0)] = "BP_ROOM";
      Flags[Flags["BP_VESTIBULE"] = Fl$3(1)] = "BP_VESTIBULE";
      Flags[Flags["BP_REWARD"] = Fl$3(2)] = "BP_REWARD";
      Flags[Flags["BP_ADOPT_ITEM"] = Fl$3(3)] = "BP_ADOPT_ITEM";
      Flags[Flags["BP_PURGE_PATHING_BLOCKERS"] = Fl$3(4)] = "BP_PURGE_PATHING_BLOCKERS";
      Flags[Flags["BP_PURGE_INTERIOR"] = Fl$3(5)] = "BP_PURGE_INTERIOR";
      Flags[Flags["BP_PURGE_LIQUIDS"] = Fl$3(6)] = "BP_PURGE_LIQUIDS";
      Flags[Flags["BP_SURROUND_WITH_WALLS"] = Fl$3(7)] = "BP_SURROUND_WITH_WALLS";
      Flags[Flags["BP_IMPREGNABLE"] = Fl$3(8)] = "BP_IMPREGNABLE";
      Flags[Flags["BP_OPEN_INTERIOR"] = Fl$3(9)] = "BP_OPEN_INTERIOR";
      Flags[Flags["BP_MAXIMIZE_INTERIOR"] = Fl$3(10)] = "BP_MAXIMIZE_INTERIOR";
      Flags[Flags["BP_REDESIGN_INTERIOR"] = Fl$3(11)] = "BP_REDESIGN_INTERIOR";
      Flags[Flags["BP_TREAT_AS_BLOCKING"] = Fl$3(12)] = "BP_TREAT_AS_BLOCKING";
      Flags[Flags["BP_REQUIRE_BLOCKING"] = Fl$3(13)] = "BP_REQUIRE_BLOCKING";
      Flags[Flags["BP_NO_INTERIOR_FLAG"] = Fl$3(14)] = "BP_NO_INTERIOR_FLAG";
      Flags[Flags["BP_NOT_IN_HALLWAY"] = Fl$3(15)] = "BP_NOT_IN_HALLWAY";
  })(Flags$3 || (Flags$3 = {}));

  // export interface TileInfo extends TileConfig {
  //   index: number;
  // }
  const tilesByIndex = [];
  const tilesByName = {};
  function install$8(cfg) {
      const info = index$1.installTile(cfg);
      tilesByIndex[info.index] = info;
      tilesByName[info.id] = info;
  }
  install$8({ id: "FLOOR", ch: "\u00b7", fg: 0x666, bg: 0x222 });
  install$8({
      id: "WALL",
      ch: "#",
      fg: 0x333,
      bg: 0x666,
      blocksMove: true,
      blocksVision: true,
      blocksDiagonal: true,
  });
  install$8({
      id: "CORPSE",
      ch: "&",
      fg: 0x666,
      bg: 0x222,
      priority: 15,
      on: {
          place(game, x, y) {
              // game.wait(1000, () => {
              //   if (game.map.hasTile(x, y, ids.CORPSE)) {
              //     game.setTile(x, y, ids.FLOOR);
              //   }
              // });
          },
          tick(level, x, y) {
              if (level.rng.chance(5)) {
                  level.setTile(x, y, "FLOOR");
              }
          },
      },
  });
  install$8({
      id: "DOWN_STAIRS",
      ch: "<",
      fg: "gray",
      on: {
          enter(level, actor) {
              level.game.addMessage("There is no turning back.");
          },
      },
  });
  install$8({
      id: "UP_STAIRS",
      ch: ">",
      fg: "orange",
      on: {
          enter(level, actor) {
              level.game.addMessage("Going up!");
              level.emit("up_stairs", level, actor);
          },
      },
  });
  install$8({
      id: "UP_STAIRS_INACTIVE",
      ch: ">",
      fg: "gray",
      priority: 75,
      on: {
          enter(level, actor) {
              level.game.addMessage("There is more to do.");
          },
      },
  });
  install$8({
      id: "IMPREGNABLE",
      ch: "#",
      fg: 0x222,
      bg: 0x444,
      priority: 200,
      blocksMove: true,
      blocksVision: true,
      blocksDiagonal: true,
  });
  index$1.allTiles.forEach((t) => {
      if (tilesByName[t.id])
          return;
      install$8(t);
  });

  class Obj {
      x;
      y;
      z;
      events;
      // spawn: boolean;
      constructor() {
          this.x = -1;
          this.y = -1;
          this.z = 0;
          this.events = new index.Events(this);
          // this.spawn = false;
          // Object.assign(this, cfg);
      }
      // create(opts: ObjCreateOpts) {
      //   this._create(opts);
      //   this.emit("create", opts);
      // }
      _make(cfg) {
          this.x = cfg.x !== undefined ? cfg.x : this.x;
          this.y = cfg.y !== undefined ? cfg.y : this.y;
          this.z = cfg.z !== undefined ? cfg.z : this.z;
          const onFns = cfg.on || {};
          Object.entries(onFns).forEach(([key, value]) => {
              if (!value)
                  return;
              this.on(key, value);
          });
      }
      draw(buf) { }
      on(...args) {
          if (args.length == 1) {
              return this.events.on(args[0]);
          }
          return this.events.on(args[0], args[1]);
      }
      once(event, fn) {
          return this.events.once(event, fn);
      }
      emit(event, ...args) {
          return this.events.emit(event, ...args);
      }
  }

  class FX extends Obj {
      ch;
      fg;
      bg;
      constructor(cfg) {
          super();
          this.ch = cfg.ch || null;
          this.fg = cfg.fg || null;
          this.bg = cfg.bg || null;
          this._make(cfg);
          this.emit("create", this, cfg);
      }
      static make(cfg) {
          const fx = new FX(cfg);
          // fx._create(cfg);
          return fx;
      }
      draw(buf) {
          buf.drawSprite(this.x, this.y, this);
      }
  }
  function flash(level, x, y, color = "white", ms = 300) {
      const scene = level.scene;
      scene.pause({ update: true });
      const fx = FX.make({ x, y, bg: color, z: 4 });
      level.addFx(fx);
      let _success = NOOP;
      scene.needsDraw = true;
      scene.wait(ms, () => {
          level.removeFx(fx);
          scene.resume({ update: true });
          _success();
      });
      return {
          then(success) {
              _success = success || NOOP;
          },
      };
  }
  function flashGameTime(level, x, y, color = "white", ms = 300) {
      const scene = level.scene;
      const startTime = scene.app.time;
      const fx = FX.make({ x, y, bg: color, z: 4 });
      level.addFx(fx);
      let _success = NOOP;
      // let _fail: CallbackFn = GWU.NOOP;
      level.wait(ms, () => {
          const nowTime = scene.app.time;
          const timeLeft = ms - (nowTime - startTime);
          if (timeLeft > 0) {
              scene.pause({ update: true });
              scene.wait(timeLeft, () => {
                  level.removeFx(fx);
                  scene.resume({ update: true });
                  _success();
              });
          }
          else {
              level.removeFx(fx);
              _success();
          }
      });
      return {
          then(fn) {
              _success = fn || NOOP;
          },
      };
  }

  function projectile(level, from, to, sprite, ms) {
      level.game;
      const scene = level.scene;
      from = xy.asXY(from);
      to = xy.asXY(to);
      let _success = NOOP;
      if (sprite.ch && sprite.ch.length == 4) {
          const dir = xy.dirFromTo(from, to);
          let index = 0;
          if (dir[0] && dir[1]) {
              index = 2;
              if (dir[0] != dir[1]) {
                  // remember up is -y
                  index = 3;
              }
          }
          else if (dir[0]) {
              index = 1;
          }
          const ch = sprite.ch[index];
          sprite = index$4.make(ch, sprite.fg, sprite.bg);
      }
      else if (sprite.ch && sprite.ch.length !== 1) {
          throw new Error('projectile requires 4 chars - vert,horiz,diag-left,diag-right (e.g: "|-\\/")');
      }
      const fx = FX.make(sprite);
      // console.log("- fire", from, to);
      scene.pause({ update: true });
      const tween$1 = tween
          .make(fx)
          .from(from)
          .to(to, ["x", "y"])
          .duration(ms)
          .onStart((_vals) => {
          level.addFx(fx);
      })
          .onUpdate((vals) => {
          if (level.blocksMove(vals.x, vals.y)) {
              tween$1.stop(false);
          }
          // console.log("- >> ", vals);
          scene.needsDraw = true;
      })
          .onFinish((vals, isSuccess) => {
          level.removeFx(fx);
          scene.resume({ update: true });
          _success(vals, isSuccess);
      })
          .start(scene.tweens);
      return {
          then(success) {
              _success = success || NOOP;
          },
      };
  }

  const fl = flag.fl;
  var ARMOR_FLAGS;
  (function (ARMOR_FLAGS) {
      ARMOR_FLAGS[ARMOR_FLAGS["ARTIFACT_COOLDOWN_40"] = fl(0)] = "ARTIFACT_COOLDOWN_40";
      ARMOR_FLAGS[ARMOR_FLAGS["ARROWS_10"] = fl(1)] = "ARROWS_10";
      ARMOR_FLAGS[ARMOR_FLAGS["LONGER_ROLL_100"] = fl(2)] = "LONGER_ROLL_100";
      ARMOR_FLAGS[ARMOR_FLAGS["MELEE_DAMAGE_30"] = fl(3)] = "MELEE_DAMAGE_30";
      ARMOR_FLAGS[ARMOR_FLAGS["MOBS_TARGET_YOU_MORE"] = fl(4)] = "MOBS_TARGET_YOU_MORE";
      // add ?? MOBS_AVOID_YOU_MORE ??
      ARMOR_FLAGS[ARMOR_FLAGS["MOVESPEED_AURA_15"] = fl(5)] = "MOVESPEED_AURA_15";
      ARMOR_FLAGS[ARMOR_FLAGS["NEGATE_HITS_30"] = fl(6)] = "NEGATE_HITS_30";
      ARMOR_FLAGS[ARMOR_FLAGS["POTION_COOLDOWN_40"] = fl(7)] = "POTION_COOLDOWN_40";
      ARMOR_FLAGS[ARMOR_FLAGS["POTION_BOOSTS_DEFENSE"] = fl(8)] = "POTION_BOOSTS_DEFENSE";
      ARMOR_FLAGS[ARMOR_FLAGS["POTION_HEALS_NEARBY_ALLIES"] = fl(9)] = "POTION_HEALS_NEARBY_ALLIES";
      ARMOR_FLAGS[ARMOR_FLAGS["RANGED_DAMAGE_30"] = fl(10)] = "RANGED_DAMAGE_30";
      ARMOR_FLAGS[ARMOR_FLAGS["REDUCE_DAMAGE_35"] = fl(11)] = "REDUCE_DAMAGE_35";
      ARMOR_FLAGS[ARMOR_FLAGS["WEAPON_DAMAGE_AURA_20"] = fl(12)] = "WEAPON_DAMAGE_AURA_20";
  })(ARMOR_FLAGS || (ARMOR_FLAGS = {}));
  // @ts-ignore
  globalThis.ARMOR_FLAGS = ARMOR_FLAGS;
  var MELEE_FLAGS;
  (function (MELEE_FLAGS) {
      MELEE_FLAGS[MELEE_FLAGS["SPIN_ATTACK"] = fl(0)] = "SPIN_ATTACK";
      MELEE_FLAGS[MELEE_FLAGS["THRUST"] = fl(1)] = "THRUST";
      MELEE_FLAGS[MELEE_FLAGS["SWIRLING"] = fl(2)] = "SWIRLING";
      MELEE_FLAGS[MELEE_FLAGS["LONGER_REACH"] = fl(3)] = "LONGER_REACH";
      MELEE_FLAGS[MELEE_FLAGS["SHOCKWAVE"] = fl(4)] = "SHOCKWAVE";
      MELEE_FLAGS[MELEE_FLAGS["BURNS"] = fl(5)] = "BURNS";
      MELEE_FLAGS[MELEE_FLAGS["STUNS"] = fl(6)] = "STUNS";
      MELEE_FLAGS[MELEE_FLAGS["AMBUSH"] = fl(7)] = "AMBUSH";
      MELEE_FLAGS[MELEE_FLAGS["ECHO"] = fl(8)] = "ECHO";
      MELEE_FLAGS[MELEE_FLAGS["EXPLODING"] = fl(9)] = "EXPLODING";
      MELEE_FLAGS[MELEE_FLAGS["COMMITTED"] = fl(10)] = "COMMITTED";
      MELEE_FLAGS[MELEE_FLAGS["PUSHBACK"] = fl(11)] = "PUSHBACK";
      MELEE_FLAGS[MELEE_FLAGS["SHARPNESS"] = fl(12)] = "SHARPNESS";
      MELEE_FLAGS[MELEE_FLAGS["LEECHING"] = fl(13)] = "LEECHING";
      MELEE_FLAGS[MELEE_FLAGS["RAMPAGING"] = fl(14)] = "RAMPAGING";
      MELEE_FLAGS[MELEE_FLAGS["WEAKENING"] = fl(15)] = "WEAKENING";
      MELEE_FLAGS[MELEE_FLAGS["FREEZING"] = fl(16)] = "FREEZING";
      MELEE_FLAGS[MELEE_FLAGS["POISON_CLOUD"] = fl(17)] = "POISON_CLOUD";
      MELEE_FLAGS[MELEE_FLAGS["POISONS"] = fl(18)] = "POISONS";
      MELEE_FLAGS[MELEE_FLAGS["SPLASH"] = fl(19)] = "SPLASH";
      MELEE_FLAGS[MELEE_FLAGS["GRAVITY"] = fl(20)] = "GRAVITY";
      MELEE_FLAGS[MELEE_FLAGS["LIGHTNING_BOLTS"] = fl(21)] = "LIGHTNING_BOLTS";
      MELEE_FLAGS[MELEE_FLAGS["CHAINS"] = fl(22)] = "CHAINS";
      MELEE_FLAGS[MELEE_FLAGS["RADIANCE"] = fl(23)] = "RADIANCE";
      MELEE_FLAGS[MELEE_FLAGS["SHARED_PAIN"] = fl(24)] = "SHARED_PAIN";
      MELEE_FLAGS[MELEE_FLAGS["PROSPECTOR"] = fl(25)] = "PROSPECTOR";
      MELEE_FLAGS[MELEE_FLAGS["CRITICAL_HIT"] = fl(26)] = "CRITICAL_HIT";
      MELEE_FLAGS[MELEE_FLAGS["SPEED_RUSH"] = fl(27)] = "SPEED_RUSH";
      MELEE_FLAGS[MELEE_FLAGS["LOOTING"] = fl(28)] = "LOOTING";
      MELEE_FLAGS[MELEE_FLAGS["SPAWN_BEE"] = fl(29)] = "SPAWN_BEE";
  })(MELEE_FLAGS || (MELEE_FLAGS = {}));
  // @ts-ignore
  globalThis.MELEE_FLAGS = MELEE_FLAGS;
  var RANGED_FLAGS;
  (function (RANGED_FLAGS) {
      // "GROWING", // Not going to use
      RANGED_FLAGS[RANGED_FLAGS["EXTRA_SHOT"] = fl(0)] = "EXTRA_SHOT";
      RANGED_FLAGS[RANGED_FLAGS["INFINITE_SHOTS"] = fl(1)] = "INFINITE_SHOTS";
      RANGED_FLAGS[RANGED_FLAGS["POWER"] = fl(2)] = "POWER";
      RANGED_FLAGS[RANGED_FLAGS["SUPERCHARGED"] = fl(3)] = "SUPERCHARGED";
      RANGED_FLAGS[RANGED_FLAGS["EXPLODING"] = fl(4)] = "EXPLODING";
      RANGED_FLAGS[RANGED_FLAGS["RADIANCE_SHOT"] = fl(5)] = "RADIANCE_SHOT";
      RANGED_FLAGS[RANGED_FLAGS["ENRAGES"] = fl(6)] = "ENRAGES";
      RANGED_FLAGS[RANGED_FLAGS["ACCELERATE"] = fl(7)] = "ACCELERATE";
      RANGED_FLAGS[RANGED_FLAGS["RAPID_FIRE"] = fl(8)] = "RAPID_FIRE";
      RANGED_FLAGS[RANGED_FLAGS["FREEZES"] = fl(9)] = "FREEZES";
      RANGED_FLAGS[RANGED_FLAGS["TRIPLE_SHOT"] = fl(10)] = "TRIPLE_SHOT";
      RANGED_FLAGS[RANGED_FLAGS["CHAINS_HITS"] = fl(11)] = "CHAINS_HITS";
      RANGED_FLAGS[RANGED_FLAGS["POISON_CLOUD"] = fl(12)] = "POISON_CLOUD";
      RANGED_FLAGS[RANGED_FLAGS["POISONS"] = fl(13)] = "POISONS";
      RANGED_FLAGS[RANGED_FLAGS["ROLL_CHARGES"] = fl(14)] = "ROLL_CHARGES";
      RANGED_FLAGS[RANGED_FLAGS["GRAVITY_SHOT"] = fl(15)] = "GRAVITY_SHOT";
      RANGED_FLAGS[RANGED_FLAGS["RICOCHET"] = fl(16)] = "RICOCHET";
      RANGED_FLAGS[RANGED_FLAGS["TEMPO_THEFT"] = fl(17)] = "TEMPO_THEFT";
      RANGED_FLAGS[RANGED_FLAGS["PIERCING"] = fl(18)] = "PIERCING";
      RANGED_FLAGS[RANGED_FLAGS["CHAIN_REACTION"] = fl(19)] = "CHAIN_REACTION";
      RANGED_FLAGS[RANGED_FLAGS["KNOCKBACK"] = fl(20)] = "KNOCKBACK";
  })(RANGED_FLAGS || (RANGED_FLAGS = {}));
  // @ts-ignore
  globalThis.RANGED_FLAGS = RANGED_FLAGS;

  const kinds$3 = {};
  // @ts-ignore
  globalThis.ItemKinds = kinds$3;
  function makeKind$3(cfg) {
      const kind = Object.assign({
          name: "",
          ch: "!",
          fg: "white",
          //   bump: ["attack"],
          on: {},
          frequency: 10,
          speed: 100,
          damage: 0,
          combo: 0,
          combo_speed: 0,
          combo_damage: 0,
          range: 0,
          charge: 0,
          defense: 0,
          slot: null,
          tags: [],
          armor_flags: 0,
          melee_flags: 0,
          ranged_flags: 0,
          effects: {},
      }, cfg);
      if (!kind.id || kind.id.length === 0) {
          throw new Error("ItemKind must have 'id'.");
      }
      if (kind.name.length == 0) {
          kind.name = index$8.title_case(kind.id.toLowerCase().replace("_", " "));
      }
      if (typeof cfg.tags == "string") {
          kind.tags = cfg.tags.split(/[|,]/).map((v) => v.trim());
      }
      if (typeof cfg.armor_flags !== "number") {
          kind.armor_flags = flag.from_safe(ARMOR_FLAGS, cfg.armor_flags);
      }
      if (typeof cfg.melee_flags !== "number") {
          kind.melee_flags = flag.from_safe(MELEE_FLAGS, cfg.melee_flags);
      }
      if (typeof cfg.ranged_flags !== "number") {
          kind.ranged_flags = flag.from_safe(RANGED_FLAGS, cfg.ranged_flags);
      }
      //   if (typeof cfg.bump === "string") {
      //     kind.bump = cfg.bump.split(/[,]/g).map((t) => t.trim());
      //   }
      kind.frequency = frequency.make(kind.frequency);
      if (kind.slot === null) {
          if (kind.range > 0) {
              kind.slot = "ranged";
          }
          else if (kind.damage > 0) {
              kind.slot = "melee";
          }
          else if (kind.defense > 0) {
              kind.slot = "armor";
          }
      }
      return kind;
  }
  function install$7(cfg) {
      const kind = makeKind$3(cfg);
      kinds$3[kind.id.toLowerCase()] = kind;
  }
  function getKind$3(id) {
      return kinds$3[id.toLowerCase()] || null;
  }

  class Item extends Obj {
      _turnTime = 0;
      kind;
      data;
      _power;
      _damage;
      _comboDamage;
      _defense;
      constructor(kind) {
          super();
          this.kind = kind;
          if (!this.kind)
              throw new Error("Must have kind.");
          this.data = {};
          this._damage = this.kind.damage;
          this._comboDamage = this.kind.combo_damage;
          this._defense = this.kind.defense;
          Object.entries(this.kind.on).forEach(([key, value]) => {
              if (!value)
                  return;
              this.on(key, value);
          });
          this.power = 1; // cause calculations to fire
      }
      // create(opts: ItemCreateOpts) {
      //   this._create(opts);
      //   this.emit("create", this, opts);
      // }
      _make(opts) {
          super._make(opts);
          // install emit handlers for ItemEvents
          Object.entries(opts).forEach(([key, val]) => {
              if (typeof val === "function") {
                  this.on(key, val);
              }
          });
          this.power = opts.power || this.power;
      }
      draw(buf) {
          buf.drawSprite(this.x, this.y, this.kind);
      }
      get name() {
          return this.kind.name;
      }
      get power() {
          return this._power;
      }
      set power(val) {
          val = val || 1;
          this._power = val;
          // Value = POWER * BASE * Math.pow(1.025,POWER)
          this._damage = Math.round(this.kind.damage * (1 + (this._power - 1) / 2));
          this._comboDamage = Math.round(this.kind.combo_damage * (1 + (this._power - 1) / 2));
          this._defense = Math.round(this.kind.defense * (1 + (this._power - 1) / 2));
      }
      get damage() {
          return this._damage;
      }
      get comboDamage() {
          return this._comboDamage;
      }
      get range() {
          return this.kind.range;
      }
      get speed() {
          return this.kind.speed;
      }
      get comboSpeed() {
          return this.kind.combo_speed;
      }
      get combo() {
          return this.kind.combo;
      }
      get defense() {
          return this._defense;
      }
      get slot() {
          return this.kind.slot;
      }
      get charge() {
          return this.kind.charge;
      }
  }

  class ItemFactory {
      plugins = [];
      use(plugin) {
          this.plugins.push(plugin);
      }
      make(kind, opts = {}) {
          // Create the Item
          let out = Option.None();
          if (!!opts.create) {
              out = opts.create(kind, opts);
          }
          else if (!!opts.on && opts.on.create) {
              out = opts.on.create(kind, opts);
          }
          out = this.plugins.reduce((v, p) => {
              if (!!v && v.isSome())
                  return v;
              if (p.create) {
                  return p.create(kind, opts);
              }
              else if (!!p.on && p.on.create) {
                  return p.on.create(kind, opts);
              }
              return v;
          }, out);
          let item = out.isSome() ? out.unwrap() : new Item(kind);
          // Update the item events/data
          this.apply(item);
          // finish making the item
          item._make(opts);
          item.emit("make", item, opts);
          return item;
      }
      apply(item) {
          this.plugins.forEach((p) => {
              Object.entries(p).forEach(([key, val]) => {
                  if (key === "on") {
                      Object.entries(val).forEach(([k2, v2]) => {
                          if (typeof v2 === "function") {
                              item.on(k2, v2);
                          }
                          else {
                              console.warn("Invalid 'on' member in Item plugin: " + k2);
                          }
                      });
                  }
                  else if (key === "data") {
                      item.data = utils.mergeDeep(item.data, val);
                  }
                  else if (typeof val === "function") {
                      item.on(key, val);
                  }
                  else {
                      console.warn("Invalid member of Item plugin: " + key);
                  }
              });
          });
      }
  }
  const factory$4 = new ItemFactory();
  function use$4(plugin) {
      factory$4.use(plugin);
  }
  function make$4(id, opts = {}) {
      let kind = typeof id === "string" ? getKind$3(id) : id;
      if (!kind || typeof kind !== "object" || typeof kind.id !== "string") {
          throw new Error("Invalid ItemKind: " + JSON.stringify(id));
      }
      return factory$4.make(kind, opts);
  }
  function place(level, x, y, id = null) {
      let newbie;
      if (id === null) {
          newbie = random$1(level); // TODO - default match?
      }
      else if (typeof id === "string") {
          newbie = make$4(id);
      }
      else {
          newbie = id;
      }
      if (!newbie)
          return null;
      newbie.kind.fg;
      const game = level.game;
      // const scene = level.scene;
      // const level = level.level;
      const locs = xy.closestMatchingLocs(x, y, (i, j) => {
          return !level.blocksMove(i, j) && !level.hasItem(i, j);
      });
      if (!locs || locs.length == 0)
          return null;
      const loc = game.rng.item(locs);
      newbie.x = loc[0];
      newbie.y = loc[1];
      // level.events.emit("spawn_item", level, newbie);
      level.addItem(newbie);
      return newbie;
  }
  function placeRandom(level, x, y, match = null) {
      let item = random$1(level, match);
      if (!item) {
          return null;
      }
      return place(level, x, y, item);
  }
  function random$1(level, match = null) {
      // pick random kind
      let allKinds = Object.values(kinds$3);
      let matches;
      if (match === null) {
          matches = [];
      }
      else if (typeof match == "string") {
          matches = match.split(/[|,]/).map((v) => v.trim());
      }
      else {
          matches = match.map((v) => v.trim());
      }
      if (matches.length > 0) {
          allKinds = allKinds.filter((kind) => {
              return matches.every((m) => {
                  if (m[0] == "!") {
                      return !kind.tags.includes(m.substring(1));
                  }
                  else {
                      return kind.tags.includes(m);
                  }
              });
          });
      }
      const chances = allKinds.map((k) => k.frequency(level.depth));
      const index = level.rng.weighted(chances);
      if (index < 0)
          return null;
      const kind = allKinds[index];
      const item = make$4(kind);
      return item;
  }

  // @returns boolean - indicates whether or not the target dies
  function damage(level, target, damage) {
      const game = level.game;
      // TODO - apply defenses... event? "damage" << allows changing b/c it is the DamageConfig obj
      const armor_flags = target.armor_flags;
      let amount = (damage.amount = damage.amount || 0);
      damage.msg = damage.msg || `${target.name} is damaged`;
      damage.color = damage.color || "red";
      if (!damage.isRanged) {
          damage.isRanged = false;
      }
      if ((armor_flags & ARMOR_FLAGS.NEGATE_HITS_30) > 0) {
          if (game.rng.chance(30)) {
              game.messages.addCombat(damage.msg + "#{orange [X]}");
              flash(level, target.x, target.y, "orange", 150);
              damage.amount = 0;
              return false;
          }
      }
      if ((armor_flags & ARMOR_FLAGS.REDUCE_DAMAGE_35) > 0) {
          damage.amount = Math.round(damage.amount * 0.65);
      }
      target.emit("damage", damage);
      if (damage.amount <= 0) {
          return false;
      }
      target.health -= damage.amount || 0;
      if (damage.amount < amount) {
          damage.color = "orange";
      }
      game.messages.addCombat(damage.msg + `#{${damage.color} [${damage.amount}]}`);
      flash(level, target.x, target.y, damage.color, 150);
      if (target.health <= 0) {
          // do all of these move to event handlers?
          game.messages.addCombat(`${target.name} dies`);
          // TODO - This should be above the floor (FIXTURE)
          // that way when it decays the floor returns as normal
          // and corpses can be custom to the creature that died
          // no matter what the floor is
          level.setTile(target.x, target.y, "CORPSE");
          target.emit("death", level, target);
          level.removeActor(target);
          return true;
      }
      return false;
  }

  function heal(level, target, heal) {
      if (heal.amount <= 0)
          return;
      heal.amount = Math.min(heal.amount, target.health_max - target.health);
      target.health += heal.amount;
  }

  const actionsByName = {};
  function install$6(name, fn) {
      actionsByName[name] = fn;
  }
  function get(name) {
      return actionsByName[name] || null;
  }
  function idle(level, actor) {
      console.log("- idle", actor.name, actor.x, actor.y);
      level.game.endTurn(actor, Math.round(actor.kind.moveSpeed / 2));
      return true;
  }
  install$6("idle", idle);
  function moveRandom(level, actor, quiet = false) {
      const dir = level.rng.item(xy.DIRS);
      return moveDir(level, actor, dir, quiet);
  }
  install$6("move_random", moveRandom);
  function moveDir(level, actor, dir, quiet = false) {
      const game = level.game;
      const newX = actor.x + dir[0];
      const newY = actor.y + dir[1];
      if (level.diagonalBlocked(actor.x, actor.y, actor.x + dir[0], actor.y + dir[1])) {
          if (!quiet) {
              const tile = level.getTile(actor.x + dir[0], actor.y + dir[1]);
              game.addMessage(`Blocked by a ${tile.id}.`);
              flash(level, newX, newY, "orange", 150);
              idle(level, actor);
              return true;
          }
          else {
              console.log("- diagonal blocked!!!", actor.name, actor.x, actor.y);
              return false;
          }
      }
      const other = level.actorAt(newX, newY);
      if (other) {
          if (other.kind && other.bump(level, actor)) {
              return true;
          }
          if (actor.hasActed())
              return true;
          if (!quiet) {
              game.addMessage(`You bump into a ${other.name}.`);
              flash(level, newX, newY, "orange", 150);
              idle(level, actor);
              return true;
          }
          else {
              console.log("- nothing!!!", actor.name, actor.x, actor.y);
              return false;
          }
      }
      if (level.blocksMove(newX, newY)) {
          if (!quiet) {
              game.addMessage("You bump into a wall.");
              flash(level, newX, newY, "orange", 150);
              idle(level, actor);
              return false;
          }
          else {
              console.log("- nothing blocked!!!", actor.name, actor.x, actor.y);
              return false;
          }
      }
      actor.x;
      actor.y;
      actor.x = newX;
      actor.y = newY;
      // game.drawAt(oldX, oldY);
      // game.drawAt(newX, newY);
      const speed = Math.round(actor.kind.moveSpeed * (xy.isDiagonal(dir) ? 1.4 : 1.0));
      actor.emit("move", level, actor, newX, newY);
      level.triggerAction("enter", actor);
      game.endTurn(actor, speed);
      return true;
  }
  function moveTowardHero(level, actor, quiet = false) {
      const game = level.game;
      const player = game.hero;
      const dir = player.mapToMe.nextDir(actor.x, actor.y, (x, y) => {
          return level.hasActor(x, y);
      });
      if (dir) {
          if (moveDir(level, actor, dir, true)) {
              return true; // success
          }
          if (!quiet) {
              flash(level, actor.x, actor.y, "orange", 150);
          }
          return idle(level, actor);
      }
      return false;
  }
  install$6("move_toward_hero", moveTowardHero);
  function moveAwayFromHero(level, actor, quiet = false) {
      const game = level.game;
      const player = game.hero;
      // compute safety map
      const safety = new index$6.DijkstraMap(level.width, level.height);
      safety.copy(player.mapToMe);
      safety.update((v, x, y) => {
          if (v >= index$6.BLOCKED)
              return v;
          v = -1.2 * v;
          if (level.isInLoop(x, y))
              v -= 2;
          if (level.isGateSite(x, y))
              v -= 2;
          return Math.round(v);
      });
      safety.setDistance(player.x, player.y, index$6.BLOCKED);
      safety.rescan((x, y) => actor.moveCost(x, y));
      safety.addObstacle(player.x, player.y, (x, y) => player.moveCost(x, y), 5);
      let dir = safety.nextDir(actor.x, actor.y, (x, y) => {
          return level.hasActor(x, y);
      });
      console.log(`- move away (${actor.x},${actor.y}) from player (${player.x},${player.y}) - ${dir}`);
      // if (dir === null) {
      //   dir = safety.nextDir(actor.x, actor.y, (x, y) => {
      //     return map.hasActor(x, y);
      //   });
      // }
      if (dir) {
          const spread = xy.dirSpread(dir);
          for (let d of spread) {
              console.log("- try", d, safety.getDistance(actor.x, actor.y), safety.getDistance(actor.x + d[0], actor.y + d[1]));
              if (moveDir(level, actor, d, true)) {
                  console.log("- success");
                  return true; // success
              }
          }
          if (!quiet) {
              flash(level, actor.x, actor.y, "orange", 150);
          }
          return idle(level, actor);
      }
      return false;
  }
  install$6("move_away_from_hero", moveAwayFromHero);
  function attack(level, actor, target = null) {
      const game = level.game;
      if (target) {
          if (level.diagonalBlocked(actor.x, actor.y, target.x, target.y)) {
              return false;
          }
      }
      else {
          // todo - long reach melee -- spear, etc...
          const targets = game.level.actors.filter((a) => a !== actor &&
              actor.health > 0 &&
              xy.distanceBetween(a.x, a.y, actor.x, actor.y) < 2 && // can attack diagonal
              !level.diagonalBlocked(actor.x, actor.y, a.x, a.y));
          if (targets.length == 0) {
              game.addMessage("no targets.");
              flash(level, actor.x, actor.y, "orange", 150);
              game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
              return true; // did something
          }
          else if (targets.length > 1) {
              level.scene.app.scenes
                  .run("target", { game, actor, targets })
                  .once("stop", (result) => {
                  if (!result) {
                      flash(level, actor.x, actor.y, "orange", 150);
                      game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
                  }
                  else {
                      attack(level, actor, result);
                  }
              });
              return true; // didSomething
          }
          else {
              target = targets[0];
          }
      }
      // @ts-ignore
      const actorIsPlayer = actor === game.hero;
      // @ts-ignore
      const otherIsPlayer = target === game.hero;
      if (!actorIsPlayer && !otherIsPlayer) {
          return idle(level, actor); // no attacking
      }
      const attackInfo = actor.getMeleeAttack();
      if (!attackInfo) {
          game.addMessage("Cannot attack.");
          flash(level, actor.x, actor.y, "orange", 150);
          game.endTurn(actor, Math.floor(actor.kind.moveSpeed / 4));
      }
      // we have an actor and a target
      damage(level, target, {
          amount: attackInfo.damage,
          msg: `${actor.name} attacks ${target.name}`,
      });
      game.endTurn(actor, attackInfo.time);
      return true;
  }
  install$6("attack", attack);
  function fire(level, actor, target = null) {
      const game = level.game;
      const hero = game.hero;
      if (!actor.range) {
          game.addMessage("Nothing to fire.");
          return false;
      }
      if (!actor.ammo) {
          game.addMessage("No ammo.");
          return false;
      }
      if (target) {
          if (xy.distanceFromTo(actor, target) > actor.range)
              return false;
      }
      else {
          // todo - long reach melee -- spear, etc...
          const targets = game
              .level.actors.filter((a) => {
              if (a === actor)
                  return false;
              if (actor.health <= 0)
                  return false;
              const dist = xy.distanceBetween(a.x, a.y, actor.x, actor.y);
              if (dist > actor.range) {
                  console.log("too far - %f/%d - %s", dist, actor.range, a.name);
                  return false;
              }
              console.log("checking fov...");
              // HACK - for actor.canSee(a)
              if (!hero.isInFov(actor)) {
                  console.log("actor not visible");
                  return false;
              }
              if (!hero.isInFov(a)) {
                  console.log("target not visible");
                  return false;
              }
              // end hack
              console.log("ok - ", a.name);
              return true;
          })
              .sort((a, b) => xy.distanceFromTo(hero, a) - xy.distanceFromTo(hero, b));
          if (targets.length == 0) {
              game.addMessage("no targets.");
              // flash tiles you can fire into
              const fov = new index$7.FOV({
                  isBlocked(x, y) {
                      // TODO - This should be more about visible than move
                      return actor.moveCost(x, y) >= index$6.BLOCKED;
                  },
                  hasXY(x, y) {
                      return level.hasXY(x, y);
                  },
              });
              // TODO - FOV highlights cells we can't fire into...
              fov.calculate(actor.x, actor.y, actor.range - 0.9, (x, y) => {
                  flash(level, x, y, "dark_teal", 125);
              });
              // FX.flash(game, actor.x, actor.y, "orange", 150);
              game.endTurn(actor, Math.floor(actor.moveSpeed / 4));
              return true; // did something
          }
          else if (targets.length > 1) {
              level.scene.app.scenes
                  .run("target", { game, actor, targets })
                  .once("stop", (result) => {
                  if (!result) {
                      flash(level, actor.x, actor.y, "orange", 150);
                      game.endTurn(actor, Math.floor(actor.moveSpeed / 4));
                  }
                  else {
                      fire(level, actor, result);
                  }
              });
              return true; // didSomething
          }
          else {
              target = targets[0];
          }
      }
      // @ts-ignore
      const actorIsHero = actor === game.hero;
      // @ts-ignore
      const otherIsHero = target === game.hero;
      if (!actorIsHero && !otherIsHero) {
          return idle(level, actor); // no attacking
      }
      // we have an actor and a target
      // Does this move to an event handler?  'damage', { amount: #, type: string }
      actor.ammo -= 1;
      // TODO - get next attack details (and increment counter in actor)
      projectile(level, actor, target, { ch: "|-\\/", fg: "white" }, 300).then((xy, ok) => {
          if (!ok) {
              flash(level, xy.x, xy.y, "orange", 150);
          }
          else {
              damage(level, target, {
                  amount: actor.rangedDamage,
                  msg: `${actor.name} shoots ${target.name}`,
              });
          }
      });
      game.endTurn(actor, actor.rangedAttackSpeed);
      return true;
  }
  install$6("fire", fire);
  function fireAtHero(level, actor) {
      const game = level.game;
      const hero = game.hero;
      // if player can't see actor then actor can't see player!
      if (!hero.isInFov(actor.x, actor.y))
          return false;
      if (!actor.ammo)
          return false;
      actor.ammo -= 1;
      // TODO - get next attack details (and increment counter in actor)
      projectile(level, actor, hero, { ch: "|-\\/", fg: "white" }, 300).then((xy, ok) => {
          if (!ok) {
              flash(level, xy.x, xy.y, "orange", 150);
          }
          else {
              // @ts-ignore
              damage(level, hero, {
                  amount: actor.rangedDamage,
                  msg: `${actor.name} shoots ${hero.name}`,
              });
          }
      });
      game.endTurn(actor, actor.rangedAttackSpeed);
      return true;
  }
  install$6("fire_at_hero", fireAtHero);
  function climb(level, actor) {
      const game = level.game;
      const tile = game.level.getTile(actor.x, actor.y);
      if (tile.on && tile.on.climb) {
          tile.on.climb.call(tile, game, actor);
          return actor.hasActed();
      }
      else {
          return idle(level, actor);
      }
  }
  install$6("climb", climb);
  function pickup(level, actor) {
      const game = level.game;
      const item = level.itemAt(actor.x, actor.y);
      if (item) {
          item.emit("pickup", level, item, actor);
          return true;
      }
      game.addMessage("Nothing to pickup.");
      return idle(level, actor);
  }
  install$6("pickup", pickup);
  // export function potion(game: Game, hero: Hero): boolean {
  //   if (!hero.canUsePotion) {
  //     game.addMessage("Not ready.");
  //     // TODO - spend time? idle?
  //     return false;
  //   }
  //   if (hero.health >= hero.health_max) {
  //     game.addMessage("You do not need to drink a potion.");
  //     // TODO - spend time? idle?
  //     return false;
  //   }
  //   const heal = Math.floor(hero.health_max * 0.75);
  //   hero.health = Math.min(hero.health + heal, hero.health_max);
  //   hero.potion = 0; // Needs to recharge
  //   game.addMessage("You feel much better.");
  //   game.endTurn(hero, hero.moveSpeed);
  //   return true;
  // }

  function ai(level, actor) {
      const game = level.game;
      const hero = game.hero;
      const noticeDistance = actor.kind.notice || 10;
      const distToHero = xy.distanceBetween(hero.x, hero.y, actor.x, actor.y);
      const canSeeHero = hero.isInFov(actor);
      console.log(`Actor.AI - ${actor.kind.id}@${actor.x},${actor.y} - dist=${distToHero}, canSee=${canSeeHero}`);
      // TODO - If attacked by hero, then we need to ignore notice distance and move in to attack
      // TODO - Noticed prior to hero going out of range/view should skip this
      // Do this with a flag/mode/state/time value?
      if (distToHero > noticeDistance || !canSeeHero) {
          // wander to goal?  [wanderChance]
          // step randomly [idleMoveChance]
          // move around anchor? (e.g. guarding an area, hanging out by a campfire, ...)
          // random chance? [randomMoveChance]
          if (game.rng.chance(20)) {
              if (moveRandom(level, actor, true))
                  return;
          }
          return idle(level, actor);
      }
      if (distToHero <= actor.kind.tooClose) {
          // should there be a random chance on this?
          if (moveAwayFromHero(level, actor))
              return;
      }
      // shoot at player?
      if (actor.kind.rangedDamage && distToHero <= actor.kind.range) {
          if (fireAtHero(level, actor))
              return;
      }
      if (distToHero < 2) {
          // can attack diagonal
          if (actor.canMeleeAttack) {
              // @ts-ignore
              if (attack(level, actor, hero))
                  return;
          }
          if (distToHero == 1) {
              // Hmmm...
              return idle(level, actor);
          }
      }
      // If we don't have a min distance from hero then move closer (to get to melee range)
      if (!actor.kind.tooClose) {
          if (moveTowardHero(level, actor))
              return;
      }
      return idle(level, actor);
  }

  function messages(scene, y) {
      const widget = index$1$1.make({
          id: "MESSAGES",
          tag: "msg",
          x: 0,
          y: y,
          width: scene.width,
          height: scene.height - y,
          scene,
          bg: "darkest_gray",
          fg: "white",
          draw(buf) {
              buf.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, " ", this._used.bg, this._used.bg);
              const fg = index$9.from(this._used.fg);
              const fgc = fg.alpha(50);
              const scene = this.scene;
              const level = scene.data.level;
              const game = level.game;
              if (game && game.messages) {
                  game.messages.forEach((msg, confirmed, i) => {
                      if (i < this.bounds.height) {
                          const color = confirmed ? fgc : fg;
                          buf.drawText(this.bounds.x, this.bounds.top + i, msg, color);
                      }
                  });
              }
          },
          mousemove(e) {
              e.stopPropagation();
          },
          click(e) {
              e.stopPropagation();
          },
      });
      return widget;
  }

  let Map$1 = class Map extends index.Widget {
      _focus = [-1, -1];
      constructor(opts) {
          super(opts);
          this.on("draw", this._draw);
          this.on("mousemove", this._setFocus);
          this.on("mouseleave", this._clearFocus);
          this.on("keypress", this._clearFocus);
      }
      _draw(buf) {
          const scene = this.scene;
          const level = scene.data.level;
          const game = level.game;
          const player = game.hero;
          buf.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, " ", "black", "black");
          level.tiles.forEach((index, x, y) => {
              if (this.bounds.contains(x, y)) {
                  buf.blackOut(x, y);
                  level.drawAt(buf, x, y);
                  if (!player.fov || !player.fov.get(x, y)) {
                      buf.get(x, y).mix("black", 25, 25);
                  }
              }
          });
          if (player.goalPath) {
              player.goalPath.forEach(([x, y]) => {
                  buf.get(x, y).mix("green", 0, 25).separate();
              });
          }
      }
      _setFocus(e) {
          this._focus[0] = e.x;
          this._focus[1] = e.y;
          this.needsDraw = true;
          // e.stopPropagation();
      }
      _clearFocus() {
          this._focus[0] = -1;
          this._focus[1] = -1;
      }
  };
  function map(scene, width, height) {
      const widget = new Map$1({
          id: "MAP",
          tag: "map",
          x: 0,
          y: 0,
          width: width,
          height: height,
          scene,
          bg: index$9.BLACK,
      });
      return widget;
  }

  class SidebarEntry {
      // TODO - icon: GWU.sprite.SpriteData | null;
      name;
      nameColor;
      progressbars;
      statuses;
      constructor(name, color) {
          // TODO: this.icon = null;
          this.name = name;
          this.nameColor = color === undefined ? "white" : color;
          this.progressbars = [];
          this.statuses = [];
      }
      add_progress(text, color, val, max) {
          this.progressbars.push({
              text,
              color,
              val,
              max,
          });
          return this;
      }
      add_status(text, color) {
          this.statuses.push({ text, color });
          return this;
      }
  }
  class Sidebar extends index.Widget {
      _focus = [-1, -1];
      entries = [];
      constructor(opts) {
          super(opts);
      }
      setFocus(x, y) {
          const wasFocus = this._focus.slice();
          this._focus[0] = x;
          this._focus[1] = y;
          if (!xy.equals(wasFocus, this._focus)) {
              this.emit("focus", this._focus);
              this.needsDraw = true;
          }
      }
      clearFocus() {
          const wasFocus = this._focus.slice();
          this._focus[0] = -1;
          this._focus[1] = -1;
          if (!xy.equals(wasFocus, this._focus)) {
              this.emit("focus", this._focus);
              this.needsDraw = true;
          }
      }
      // drawPlayer(buf: GWU.buffer.Buffer, x: number, y: number, player: Hero) {
      //   buf.drawText(x, y, "Hero");
      //   this.drawHealth(buf, x, y + 1, 28, player);
      //   this.drawPotion(buf, x, y + 2, 28, player);
      //   let lines = 3; // Hero + health + potion
      //   player.statuses.forEach((status) => {
      //     if (status) {
      //       lines += status.draw_sidebar(buf, x, y + lines, 28, player);
      //     }
      //   });
      //   return lines;
      // }
      drawActor(buf, x, y, actor) {
          //   buf.drawText(x, y, actor.name, actor.kind.fg);
          //   this.drawHealth(buf, x, y + 1, 28, actor);
          //   let lines = 2; // name + health
          //   actor.statuses.forEach((status) => {
          //     if (status) {
          //       lines += status.draw_sidebar(buf, x, y + lines, 28, actor);
          //     }
          //   });
          //   return lines;
          let entry = actor.getSidebarEntry();
          return this.drawEntry(buf, x, y, entry);
      }
      drawEntry(buf, x, y, entry) {
          buf.drawText(x, y, entry.name, entry.nameColor);
          let lines = 1;
          entry.progressbars.forEach((p) => {
              this.drawProgress(buf, x, y + lines, 28, "white", p.color, p.val, p.max, p.text);
              lines += 1;
          });
          entry.statuses.forEach((s) => {
              buf.drawText(x, y + lines, s.text, s.color);
              lines += 1;
          });
          return lines;
      }
      drawProgress(buf, x, y, w, fg, bg, val, max, text = "") {
          const pct = val / max;
          const full = Math.floor(w * pct);
          const partialPct = Math.floor(100 * (w * pct - full));
          buf.fillRect(x, y, full, 1, null, null, bg);
          buf.draw(x + full, y, null, null, index$9.from(bg).alpha(partialPct));
          if (text && text.length) {
              buf.drawText(x, y, text, fg, null, w, "center");
          }
      }
      // drawHealth(
      //   buf: GWU.buffer.Buffer,
      //   x: number,
      //   y: number,
      //   w: number,
      //   actor: Actor
      // ) {
      //   const pct = actor.health / actor.health_max;
      //   const bg = GWU.color.colors.green.mix(
      //     GWU.color.colors.red,
      //     100 * (1 - pct)
      //   );
      //   this.drawProgress(
      //     buf,
      //     x,
      //     y,
      //     w,
      //     "white",
      //     bg,
      //     actor.health,
      //     actor.health_max,
      //     "HEALTH"
      //   );
      // }
      // drawPotion(
      //   buf: GWU.buffer.Buffer,
      //   x: number,
      //   y: number,
      //   w: number,
      //   player: Hero
      // ) {
      //   this.drawProgress(
      //     buf,
      //     x,
      //     y,
      //     w,
      //     "white",
      //     GWU.color.colors.blue,
      //     player.potion,
      //     player.potion_max,
      //     "Potion"
      //   );
      // }
      _draw(buf) {
          const scene = this.scene;
          const level = scene.data.level;
          const game = level.game;
          buf.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, " ", this._used.bg, this._used.bg);
          const x = this.bounds.x + 1;
          let y = this.bounds.y;
          buf.setClip(this.bounds);
          // buf.drawText(x);
          y += buf.drawText(x, y, scene.app.name, "green");
          y += buf.drawText(x, y, "Seed: " + game.seed, "pink");
          y += buf.drawText(x, y, "Level: " + level.data.depth, "pink");
          y += 1;
          let px = game.hero.x;
          let py = game.hero.y;
          // if (this._focus[0] != -1) {
          //   px = this._focus[0];
          //   py = this._focus[1];
          // }
          this.entries = level.actors.filter(
          // @ts-ignore
          (a) => a && a !== game.hero && a.health > 0);
          this.entries.sort((a, b) => xy.distanceBetween(a.x, a.y, px, py) -
              xy.distanceBetween(b.x, b.y, px, py));
          let focused = this.entries.find((a) => xy.equals(a, this._focus));
          // @ts-ignore
          let used = this.drawActor(buf, x, y, game.hero);
          game.hero.data.sideY = y;
          game.hero.data.sideH = used;
          if (xy.equals(game.hero, this._focus)) {
              buf.mix("white", 20, x - 1, y, this.bounds.width, used);
              // @ts-ignore
              focused = game.hero;
          }
          else if (focused) {
              buf.mix(this._used.bg || null, 50, x - 1, y, this.bounds.width, used);
          }
          y += used + 1;
          this.entries.forEach((a) => {
              const used = this.drawActor(buf, x, y, a);
              if (a === focused) {
                  buf.mix("white", 20, x - 1, y, this.bounds.width, used);
              }
              else if (focused) {
                  buf.mix(this._used.bg || null, 50, x - 1, y, this.bounds.width, used);
              }
              a.data.sideY = y;
              a.data.sideH = used;
              y += used + 1;
          });
          y += 1;
          // y += buf.drawText(x, y, "Press Escape to lose.");
          buf.clearClip();
      }
      _mousemove(e) {
          super._mousemove(e);
          if (e.defaultPrevented || e.propagationStopped)
              return;
          this._focus.slice();
          this.clearFocus();
          const level = this.scene.data.level;
          const game = level.game;
          const hero = game.hero;
          if (hero.data.sideY <= e.y && hero.data.sideY + hero.data.sideH >= e.y) {
              this.setFocus(hero.x, hero.y);
          }
          else {
              this.entries.forEach((a) => {
                  if (a.data.sideY <= e.y && a.data.sideY + a.data.sideH >= e.y) {
                      this.setFocus(a.x, a.y);
                  }
              });
          }
          // if (!GWU.xy.equals(wasFocus, this._focus)) {
          //   this.emit("focus", this._focus);
          //   this.needsDraw = true;
          // }
          e.stopPropagation();
      }
      _click(e) {
          super._click(e);
          if (e.defaultPrevented || e.propagationStopped)
              return;
          if (this._focus[0] > -1) {
              this.emit("choose", this._focus);
          }
      }
  }
  function sidebar(scene, x, height) {
      const widget = new Sidebar({
          id: "SIDEBAR",
          tag: "sidebar",
          x: x,
          y: 0,
          width: scene.width - x,
          height: height,
          scene,
          bg: index$9.from("dark_gray"),
      });
      return widget;
  }

  function flavor(scene, x, y) {
      const widget = index$1$1.make({
          id: "FLAVOR",
          tag: "flavor",
          x: x,
          y: y,
          width: scene.width - x,
          height: 1,
          scene,
          bg: index$9.from("darker_gray"),
          fg: index$9.from("purple"),
          draw(buf) {
              const scene = this.scene;
              const level = scene.data.level;
              level.game;
              buf.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, " ", this._used.bg, this._used.bg);
              buf.drawText(this.bounds.x, this.bounds.y, this.prop("text"), this._used.fg, this._used.bg, this.bounds.width);
          },
          mousemove(e) {
              e.stopPropagation();
          },
          click(e) {
              e.stopPropagation();
          },
      });
      return widget;
  }

  class Details extends index$1$1.Dialog {
      _text;
      constructor(opts) {
          opts.border = opts.border ?? "ascii";
          super(opts);
          this._text = new index$1$1.Text({
              id: "INFO",
              text: "details...",
              x: this.bounds.x + 1,
              y: this.bounds.y + 1,
          });
          this.addChild(this._text);
          this.hidden = true;
      }
      showActor(actor) {
          let text = actor.name + " [" + actor.power + "]\n";
          text += "Health: " + actor.health + " / " + actor.health_max + "\n";
          text += "Moves : " + actor.moveSpeed + "\n";
          if (actor.damage > 0) {
              text += "Melee : " + actor.damage + " / " + actor.attackSpeed + "\n";
          }
          else {
              text += "Melee : None\n";
          }
          if (actor.range > 0) {
              text +=
                  "Ranged: " +
                      actor.rangedDamage +
                      " / " +
                      actor.rangedAttackSpeed +
                      " @ " +
                      actor.range +
                      " (" +
                      actor.ammo +
                      ")\n";
          }
          else {
              text += "Ranged: None";
          }
          this._text.text(text);
          this.bounds.height = this._text.bounds.height + 2;
          this.bounds.width = this._text.bounds.width + 2;
      }
      showHero(player) {
          let text = player.name + "\n";
          const armor = player.slots.armor;
          if (armor) {
              text += "Health: " + player.health + " / " + player.health_max + "\n";
              text += "#{teal}";
              text += "  " + armor.name + " [" + armor.power + "]\n";
              if (armor.kind.armor_flags != 0) {
                  if (armor.kind.armor_flags & ARMOR_FLAGS.REDUCE_DAMAGE_35) {
                      text += "  {-35% Damage Received}\n";
                  }
                  if (armor.kind.armor_flags & ARMOR_FLAGS.NEGATE_HITS_30) {
                      text += "  {30% Negate Hits}\n";
                  }
                  if (armor.kind.armor_flags & ARMOR_FLAGS.ARTIFACT_COOLDOWN_40) {
                      text += "  {-40% Artifact Cooldown}\n";
                  }
                  if (armor.kind.armor_flags & ARMOR_FLAGS.ARROWS_10) {
                      text += "  {+10 Arrows Per Bundle}\n";
                  }
                  if (armor.kind.armor_flags & ARMOR_FLAGS.LONGER_ROLL_100) {
                      text += "  {100% Longer Roll Cooldown}\n";
                  }
                  if (armor.kind.armor_flags & ARMOR_FLAGS.MELEE_DAMAGE_30) {
                      text += "  {+30% Melee Damage}\n";
                  }
                  if (armor.kind.armor_flags & ARMOR_FLAGS.MOBS_TARGET_YOU_MORE) {
                      text += "  {Mobs Target You More}\n";
                  }
                  if (armor.kind.armor_flags & ARMOR_FLAGS.MOVESPEED_AURA_15) {
                      text += "  {+15% Move Speed Aura}\n";
                  }
                  if (armor.kind.armor_flags & ARMOR_FLAGS.POTION_COOLDOWN_40) {
                      text += "  {-40% Potion Cooldown}\n";
                  }
                  if (armor.kind.armor_flags & ARMOR_FLAGS.POTION_BOOSTS_DEFENSE) {
                      text += "  {Potion Boosts Defense}\n";
                  }
                  if (armor.kind.armor_flags & ARMOR_FLAGS.POTION_HEALS_NEARBY_ALLIES) {
                      text += "  {Potion Heals Nearby Allies}\n";
                  }
                  if (armor.kind.armor_flags & ARMOR_FLAGS.RANGED_DAMAGE_30) {
                      text += "  {+30% Ranged Damage}\n";
                  }
                  if (armor.kind.armor_flags & ARMOR_FLAGS.WEAPON_DAMAGE_AURA_20) {
                      text += "  {+20% Weapon Damage Aura}\n";
                  }
              }
              text += "#{}";
          }
          else {
              text += "Health: " + player.health + "/" + player.health_max + "\n";
          }
          text += "Moves : " + player.moveSpeed + "\n";
          const melee = player.slots.melee;
          if (melee) {
              text += "Melee : " + player.damage + " / " + player.attackSpeed + "\n";
              text += "#{teal}";
              text += `  ${melee.name} [${melee.power}]\n`;
              text += "#{}";
          }
          else if (player.damage > 0) {
              text += "Melee : " + player.damage + " / " + player.attackSpeed + "\n";
          }
          else {
              text += "Melee : None\n";
          }
          const ranged = player.slots.ranged;
          if (ranged) {
              text +=
                  "Ranged: " +
                      player.rangedDamage +
                      " / " +
                      player.rangedAttackSpeed +
                      " @ " +
                      player.range +
                      " (" +
                      player.ammo +
                      ")\n";
              text += "#{teal}";
              text += "  " + ranged.name + " [" + ranged.power + "]\n";
          }
          else if (player.range > 0) {
              text +=
                  "Ranged: " +
                      player.rangedDamage +
                      "  " +
                      player.rangedAttackSpeed +
                      " @ " +
                      player.range +
                      " (" +
                      player.ammo +
                      ")\n";
          }
          else {
              text += "Ranged: None";
          }
          this._text.text(text);
          this.bounds.height = this._text.bounds.height + 2;
          this.bounds.width = this._text.bounds.width + 2;
      }
  }
  function details(scene, width, height) {
      const widget = new Details({
          id: "DETAILS",
          tag: "details",
          x: 2,
          y: 2,
          width: width - 4,
          height: height - 4,
          scene,
          bg: index$9.from("dark_gray"),
      });
      return widget;
  }

  class AttackInfo {
      damage;
      time;
      constructor(damage, time) {
          this.damage = damage;
          this.time = time;
      }
  }
  class Actor extends Obj {
      _turnTime = 0;
      _level = null;
      kind;
      data = {};
      health = 0;
      health_max = 0;
      ammo = 0;
      _power = 1;
      armor_flags = 0;
      statuses = [];
      combo_index = 0;
      leader = null;
      constructor(kind) {
          super();
          this.kind = kind;
          if (!this.kind)
              throw new Error("Missing ActorKind!");
          this.z = 1;
          this.health_max = this.kind.health || 10;
          this.health = this.health_max;
          this.ammo = this.kind.ammo || 0; // TODO - scale with power?
          const onFns = kind.on || {};
          Object.entries(onFns).forEach(([key, val]) => {
              this.on(key, val);
          });
      }
      _make(opts) {
          super._make(opts);
          this.on("add", (level) => {
              level.scheduler.push(this, this.kind.moveSpeed);
              this._level = level;
          });
          this.on("destroy", (level) => {
              // console.group("ACTOR REMOVE", this);
              // console.group("before");
              // GWU.list.forEach(game.scheduler.next, (i) => console.log(i.item));
              // console.groupEnd();
              level.scheduler.remove(this);
              this._level = null;
              // console.group("after");
              // GWU.list.forEach(game.scheduler.next, (i) => console.log(i.item));
              // console.groupEnd();
              // console.groupEnd();
          });
          this.on("death", () => {
              if (this.kind.dropChance &&
                  this._level.rng.chance(this.kind.dropChance)) {
                  placeRandom(this._level, this.x, this.y, this.kind.dropMatch);
              }
          });
          // install emit handlers for ItemEvents
          Object.entries(opts).forEach(([key, val]) => {
              if (typeof val === "function") {
                  this.on(key, val);
              }
          });
          this.power = opts.power || 1;
          // machineHome
      }
      // attributes
      get name() {
          return this.kind.name;
      }
      get damage() {
          // TODO - combo damage
          return Math.round(this.kind.damage * (1 + (this._power - 1) / 2));
      }
      get attackSpeed() {
          // TODO - combo speed
          return this.kind.attackSpeed;
      }
      get range() {
          return this.kind.range;
      }
      get rangedDamage() {
          return Math.round(this.kind.rangedDamage * (1 + (this._power - 1) / 2));
      }
      get rangedAttackSpeed() {
          return this.kind.rangedAttackSpeed;
      }
      get moveSpeed() {
          return this.kind.moveSpeed;
      }
      get comboLen() {
          return this.kind.combo;
      }
      get power() {
          return this._power;
      }
      set power(val) {
          this._power = val;
          this.health = Math.round(this.kind.health * (1 + (this._power - 1) / 2));
          this.health_max = this.health;
      }
      isHero() {
          return false;
      }
      //
      getMeleeAttack() {
          const attack = new AttackInfo(this.damage, this.attackSpeed);
          this.combo_index += 1;
          this.combo_index = this.combo_index % this.comboLen;
          return attack;
      }
      hasArmorFlag(flag) {
          return (this.armor_flags & flag) > 0;
      }
      // TODO - Should this be a method instead of a property?
      get canMeleeAttack() {
          return this.damage > 0 && this.attackSpeed > 0;
      }
      addStatus(status) {
          const current = this.statuses.findIndex((current) => current && current.merge(status));
          if (current >= 0) {
              return;
          }
          const empty = this.statuses.findIndex((s) => !s);
          if (empty >= 0) {
              this.statuses[empty] = status;
          }
          else {
              this.statuses.push(status);
          }
      }
      remove_status(status) {
          const index = this.statuses.indexOf(status);
          if (index >= 0) {
              this.statuses[index] = null;
          }
      }
      startTurn(level) {
          this._turnTime = 0;
          this.emit("turn_start", level, this);
      }
      endTurn(level, time) {
          this._turnTime = time;
          this.emit("turn_end", level, this, time);
      }
      hasActed() {
          return this._turnTime > 0;
      }
      draw(buf) {
          if (this.health <= 0)
              return;
          buf.drawSprite(this.x, this.y, this.kind);
      }
      avoidsTile(tile) {
          return tile.blocksMove || false;
      }
      moveCost(x, y) {
          const level = this._level;
          if (!level)
              return index$6.OBSTRUCTION;
          if (!level.hasXY(x, y))
              return index$6.OBSTRUCTION;
          if (level.blocksDiagonal(x, y))
              return index$6.OBSTRUCTION;
          if (level.blocksMove(x, y))
              return index$6.BLOCKED;
          // if (level.hasActor(x, y)) return GWU.path.AVOIDED;
          return index$6.OK;
      }
      pathTo(loc) {
          const path = index$6.fromTo(this, loc, (x, y) => this.moveCost(x, y));
          return path;
      }
      act(level) {
          this.startTurn(level);
          ai(level, this);
          if (!this.hasActed()) {
              console.log("No actor AI action.");
          }
      }
      bump(level, actor) {
          const actions = this.kind.bump;
          for (let action of actions) {
              const fn = get(action);
              if (fn && fn(level, actor, this)) {
                  return true;
              }
          }
          return false; // did nothing
      }
      tick(level, time) {
          this.emit("tick", level, this, time);
          Object.values(this.statuses).forEach((status, i) => {
              if (status) {
                  if (!status.tick(this, level, time)) {
                      this.statuses[i] = null;
                  }
              }
          });
      }
      getSidebarEntry() {
          const entry = new SidebarEntry(this.name, this.kind.fg);
          entry.add_progress("Health", "green", this.health, this.health_max);
          this.statuses.forEach((s) => {
              s && s.update_sidebar(this, entry);
          });
          this.emit("sidebar", this, entry); // Allow plugins to update sidebar
          return entry;
      }
  }

  const kinds$2 = {};
  // @ts-ignore
  globalThis.ActorKinds = kinds$2;
  function makeKind$2(cfg) {
      const kind = Object.assign({
          name: "",
          hero: false,
          health: 10,
          notice: 10,
          moveSpeed: 100,
          ch: "!",
          fg: "white",
          bump: ["attack"],
          on: {},
          damage: 0,
          attackSpeed: 0,
          combo: 0,
          comboDamage: 0,
          comboSpeed: 0,
          range: 0,
          rangedDamage: 0,
          rangedAttackSpeed: 0,
          ammo: 0,
          tooClose: 0,
          dropChance: 0,
          dropMatch: [],
          slots: new Map(),
      }, cfg);
      if (kind.name == "") {
          kind.name = index$8.title_case(kind.id.toLowerCase().replace(/\_/g, " "));
      }
      if (typeof cfg.bump === "string") {
          kind.bump = cfg.bump.split(/[,]/g).map((t) => t.trim());
      }
      if (typeof cfg.dropMatch === "string") {
          kind.dropMatch = cfg.dropMatch.split(/[,]/g).map((t) => t.trim());
      }
      if (kind.dropChance > 0 && kind.dropMatch.length == 0) {
          kind.dropMatch.push("drop"); // Default drops
      }
      if (kind.attackSpeed == 0 && kind.damage > 0) {
          kind.attackSpeed = kind.moveSpeed;
      }
      if (kind.comboDamage == 0) {
          kind.combo = 0;
          kind.comboSpeed = 0;
      }
      else if (kind.combo < 2) {
          kind.comboDamage = 0;
          kind.comboSpeed = 0;
      }
      else if (kind.comboSpeed == 0) {
          kind.comboSpeed = kind.attackSpeed;
      }
      if (kind.ammo == 0 && kind.range > 0) {
          kind.ammo = 10; // You get 10 shots by default
      }
      // TODO: Create drop language
      //      - 50 (drop default treasure 50% of time)
      //      - ARROWS (always drop arrows)
      //      - ARROWS@35 (35% drop arrows)
      //      - ARROWS@50%/HEALTH@20% (arrows (50%) or health (20%) or nothing (30%)) (% is optional)
      //      - ARROWS@50%+HEALTH@20% (arrows (50%) AND/OR health (20%))
      //      - #TREASURE@50% (50% drop from the TREASURE tag)
      //      - #TREASURE*3@50% (50% drop 3 from TREASURE tag)
      //      - #TREASURE@50%*3 (try to drop from TREASURE with 50% chance 3 times)
      //      - [ARROWS+HEALTH]@50% (50% drop both arrows and health)
      //      - [ARROWS@50+HEALTH]@50 (50% drop health and 50% of those have arrows with them)
      if (kind.dropChance == 0 && kind.dropMatch.length > 0) {
          kind.dropChance = 100;
      }
      return kind;
  }
  function install$5(cfg) {
      const kind = makeKind$2(cfg);
      kinds$2[kind.id.toLowerCase()] = kind;
  }
  function getKind$2(id) {
      return kinds$2[id.toLowerCase()] || null;
  }

  class Status {
      start(actor, level) { }
      tick(actor, level, time) {
          return false; // no longer active
      }
      stop(actor, level) { }
      merge(status) {
          return false;
      }
      // TODO - Wrap this with higher level interface
      //      - Allow modifying the health bar
      //      - Allow set text { set_status("Regen") }
      update_sidebar(actor, entry) { }
      // TODO - Wrap this with higher level interface
      //      - Allow modifying other parts
      //      - Allow set text { set_status("Regen") }
      draw_details() { }
  }
  class RegenData {
      amount;
      time;
      elapsed;
      constructor(amount, time) {
          this.amount = amount;
          this.time = time;
          this.elapsed = 0;
      }
      get isActive() {
          return this.amount > 0.0 && this.elapsed < this.time;
      }
      tick(time) {
          let used = Math.floor((this.amount * this.elapsed) / this.time);
          this.elapsed = Math.min(this.time, this.elapsed + time);
          let new_used = Math.floor((this.amount * this.elapsed) / this.time);
          return new_used - used;
      }
  }
  class RegenStatus extends Status {
      data;
      constructor(amount, time) {
          super();
          this.data = [new RegenData(amount, time)];
      }
      tick(actor, level, time) {
          let still_active = false;
          this.data.forEach((d) => {
              if (d.isActive) {
                  still_active = true;
                  const amount = d.tick(time);
                  if (amount > 0) {
                      heal(level, actor, { amount });
                  }
              }
          });
          return still_active;
      }
      merge(status) {
          if (status instanceof RegenStatus) {
              // do merge
              this.data = this.data.concat(status.data);
              status.data = [];
              return true;
          }
          return false;
      }
      update_sidebar(actor, entry) {
          entry.add_status("{Regen}", "green");
      }
  }

  class ActorFactory {
      plugins = [];
      use(plugin) {
          this.plugins.push(plugin);
      }
      make(kind, opts = {}) {
          let actor;
          if (opts.make) {
              actor = opts.make(kind, opts);
          }
          else {
              const makePlugin = this.plugins.find((p) => typeof p.make === "function");
              if (makePlugin) {
                  actor = makePlugin.make(kind, opts);
              }
              else {
                  actor = new Actor(kind);
              }
          }
          this.apply(actor);
          actor._make(opts);
          actor.emit("create", actor, opts);
          return actor;
      }
      apply(item) {
          this.plugins.forEach((p) => {
              Object.entries(p).forEach(([key, val]) => {
                  if (key === "on") {
                      Object.entries(val).forEach(([k2, v2]) => {
                          if (typeof v2 === "function") {
                              item.on(k2, v2);
                          }
                          else {
                              console.warn("Invalid 'on' member in Item plugin: " + k2);
                          }
                      });
                  }
                  else if (key === "data") {
                      Object.assign(item.data, val);
                  }
                  else if (typeof val === "function") {
                      item.on(key, val);
                  }
                  else {
                      console.warn("Invalid member of Item plugin: " + key);
                  }
              });
          });
      }
  }
  const factory$3 = new ActorFactory();
  function use$3(plugin) {
      factory$3.use(plugin);
  }
  function make$3(kind, config = {}) {
      if (typeof kind === "string") {
          kind = getKind$2(kind);
          if (!kind)
              throw new Error("Failed to find kind.");
      }
      if (typeof config === "number") {
          config = { power: config };
      }
      if (kind.hero) {
          throw new Error("ActorKind is Hero: " + kind.id);
      }
      return factory$3.make(kind, config);
  }
  function randomSpawnLocFor(level, actor) {
      let x;
      let y;
      let tries = level.width * level.height;
      do {
          --tries;
          x = level.rng.number(level.width);
          y = level.rng.number(level.height);
          // TODO - also not in a currently visible location
      } while ((tries && !level.hasTile(x, y, "FLOOR")) || level.actorAt(x, y));
      if (!tries) {
          return Option.None();
      }
      return Option.Some({ x, y });
  }
  function spawn(level, id, // Should this be | ActorKind instead of | Actor?
  x, y) {
      const newbie = typeof id === "string" ? make$3(id) : id;
      if (x === undefined || y === undefined) {
          const loc = randomSpawnLocFor(level);
          if (loc.isNone()) {
              console.error("Failed to find spawn location for : " + newbie.name);
              return;
          }
          const xy = loc.unwrap();
          newbie.x = xy.x;
          newbie.y = xy.y;
      }
      else {
          newbie.x = x;
          newbie.y = y;
      }
      level.addActor(newbie);
      return newbie;
  }

  class Hero extends Actor {
      mapToMe;
      fov;
      potion;
      potion_max;
      goalPath;
      followPath;
      slots;
      constructor(kind) {
          super(kind);
          this.mapToMe = new index$6.DijkstraMap();
          this.fov = null;
          this.goalPath = null;
          this.followPath = false;
          this.slots = {};
          this.potion_max = 40 * 200;
          this.potion = this.potion_max; // Potion is ready
      }
      // @ts-ignore
      _make(opts) {
          // @ts-ignore
          super._make(opts);
          this.on("add", (level) => {
              this._level = level;
              this.updateMapToMe();
              this.updateFov();
              // level.game!.scene!.needsDraw = true;
          });
          this.on("move", () => {
              this.updateMapToMe();
              this.updateFov();
          });
          this.on("remove", () => {
              if (this.fov) {
                  grid.free(this.fov);
                  this.fov = null;
              }
              this.clearGoal();
          });
          this.on("turn_end", (game, time) => {
              this.potion = Math.min(this.potion + time, this.potion_max);
          });
          this.on("damage", () => this.clearGoal());
          // Need items in slots....
          Object.entries(this.kind.slots).forEach(([slot, id]) => {
              const item = make$4(id);
              if (item === null) {
                  console.log(`player UNKNOWN Item ERROR = ${id} @ ${slot}`);
              }
              else {
                  this.equip(item);
                  console.log(`player Item = ${item.kind.id} @ ${slot}`);
              }
          });
      }
      // attributes
      get damage() {
          const melee = this.slots.melee;
          if (melee) {
              // track combo...
              if (this.combo_index == melee.kind.combo - 1) {
                  return melee.comboDamage;
              }
              return melee.damage;
          }
          return super.damage;
      }
      get attackSpeed() {
          const melee = this.slots.melee;
          if (melee) {
              // track combo...
              if (this.combo_index == melee.kind.combo - 1) {
                  return melee.comboSpeed;
              }
              return melee.speed;
          }
          return super.attackSpeed;
      }
      get range() {
          const ranged = this.slots.ranged;
          if (ranged) {
              return ranged.range;
          }
          return super.range;
      }
      get rangedDamage() {
          const ranged = this.slots.ranged;
          if (ranged) {
              return ranged.damage;
          }
          return super.rangedDamage;
      }
      get rangedAttackSpeed() {
          const ranged = this.slots.ranged;
          if (ranged) {
              return ranged.speed;
          }
          return super.rangedAttackSpeed;
      }
      get canUsePotion() {
          return this.potion >= this.potion_max;
      }
      get comboLen() {
          const melee = this.slots.melee;
          if (melee) {
              return melee.combo;
          }
          return this.kind.combo;
      }
      isHero() {
          return true;
      }
      //
      equip(item) {
          if (item.slot === null) {
              throw new Error(`Item cannot be equipped - ${item.kind.id} - no slot`);
          }
          this.slots[item.slot] = item;
          this.armor_flags = 0; // TODO - this.kind.item_flags (allows mobs to have flags too)
          const health_pct = this.health / this.health_max;
          let new_health_max = this.kind.health;
          Object.entries(this.slots).forEach(([s, i]) => {
              if (i) {
                  this.armor_flags |= i.kind.armor_flags;
                  new_health_max += i.defense;
              }
          });
          this.health_max = new_health_max;
          this.health = Math.round(new_health_max * health_pct);
          this.combo_index = 0;
      }
      unequipSlot(slot) {
          this.slots[slot] = null;
          this.armor_flags = 0;
          const health_pct = this.health / this.health_max;
          let new_health_max = this.kind.health;
          Object.entries(this.slots).forEach(([s, i]) => {
              if (i) {
                  this.armor_flags |= i.kind.armor_flags;
                  new_health_max += i.defense;
              }
          });
          this.health_max = new_health_max;
          this.health = Math.round(new_health_max * health_pct);
          this.combo_index = 0;
      }
      act(level) {
          this.startTurn(level);
          if (this.goalPath && this.followPath && this.goalPath.length) {
              const step = this.goalPath[0];
              if (step) {
                  if (level.hasActor(step[0], step[1])) {
                      level.game.addMessage("You are blocked.");
                  }
                  else {
                      const dir = xy.dirFromTo(this, step);
                      // @ts-ignore
                      if (moveDir(level, this, dir, true)) {
                          if (xy.equals(this, step)) {
                              this.goalPath.shift(); // we moved there, so remove that step
                          }
                          else {
                              this.clearGoal();
                          }
                          return;
                      }
                      level.game.addMessage("You lost track of path.");
                  }
              }
          }
          this.clearGoal();
          level.game.needInput = true;
          console.log("Hero - await input", level.scheduler.time);
      }
      setGoal(x, y) {
          if (!this._level || this.followPath)
              return;
          const level = this._level;
          this.goalPath = index$6.fromTo(this, [x, y], (i, j) => {
              if (level.hasActor(i, j))
                  return index$6.AVOIDED;
              return this.moveCost(i, j);
          });
          if (this.goalPath &&
              this.goalPath.length &&
              xy.equals(this.goalPath[0], this)) {
              this.goalPath.shift(); // remove the spot we are standing on
          }
      }
      clearGoal() {
          this.followPath = false;
          this.goalPath = null;
      }
      updateMapToMe() {
          const level = this._level;
          if (!level)
              return;
          this.mapToMe.reset(level.width, level.height);
          this.mapToMe.setGoal(this.x, this.y);
          this.mapToMe.calculate((x, y) => this.moveCost(x, y));
      }
      updateFov() {
          const level = this._level;
          if (!level)
              return;
          if (!this.fov ||
              this.fov.width !== level.width ||
              this.fov.height !== level.height) {
              this.fov && grid.free(this.fov);
              this.fov = grid.alloc(level.width, level.height);
          }
          index$7.calculate(this.fov, (x, y) => {
              return this.moveCost(x, y) >= index$6.BLOCKED;
          }, this.x, this.y, 100);
      }
      isInFov(...args) {
          if (!this.fov)
              return false;
          if (args.length == 2) {
              const [x, y] = args;
              return this.fov.get(x, y) > 0;
          }
          else {
              const pos = args[0];
              return this.fov.get(xy.x(pos), xy.y(pos)) > 0;
          }
      }
  }

  const kinds$1 = {};
  // @ts-ignore
  globalThis.HeroKinds = kinds$1;
  function makeKind$1(cfg) {
      let kind;
      kind = makeKind$2(cfg);
      kind = Object.assign(kind, {
          slots: {},
      });
      if (cfg.slots) {
          kind.slots = cfg.slots;
      }
      return kind;
  }
  function install$4(cfg) {
      const kind = makeKind$1(cfg);
      kinds$1[kind.id.toLowerCase()] = kind;
  }
  function getKind$1(id) {
      return kinds$1[id.toLowerCase()] || null;
  }

  class HeroFactory {
      plugins = [];
      use(plugin) {
          this.plugins.push(plugin);
      }
      make(kind, opts = {}) {
          let hero;
          if (opts.make) {
              hero = opts.make(kind, opts);
          }
          else {
              const makePlugin = this.plugins.find((p) => typeof p.make === "function");
              if (makePlugin) {
                  hero = makePlugin.make(kind, opts);
              }
              else {
                  hero = new Hero(kind);
              }
          }
          this.apply(hero);
          hero._make(opts);
          hero.emit("create", hero, opts);
          return hero;
      }
      apply(hero) {
          this.plugins.forEach((p) => {
              Object.entries(p).forEach(([key, val]) => {
                  if (key === "on") {
                      Object.entries(val).forEach(([k2, v2]) => {
                          if (typeof v2 === "function") {
                              hero.on(k2, v2);
                          }
                          else {
                              console.warn("Invalid 'on' member in Item plugin: " + k2);
                          }
                      });
                  }
                  else if (key === "data") {
                      Object.assign(hero.data, val);
                  }
                  else if (typeof val === "function") {
                      hero.on(key, val);
                  }
                  else {
                      console.warn("Invalid member of Item plugin: " + key);
                  }
              });
          });
      }
  }
  const factory$2 = new HeroFactory();
  function use$2(plugin) {
      factory$2.use(plugin);
  }
  function make$2(kind, config = {}) {
      if (typeof kind === "string") {
          kind = getKind$1(kind);
          if (!kind)
              throw new Error("Failed to find kind.");
      }
      if (config === undefined) {
          config = {};
      }
      if (typeof config === "number") {
          config = { power: config };
      }
      if (kind.hero) {
          throw new Error("ActorKind is Hero: " + kind.id);
      }
      return factory$2.make(kind, config);
  }

  install$4({
      id: "HERO",
      name: "Hero",
      ch: "@",
      fg: "white",
      bg: -1,
      moveSpeed: 100,
      health: 20,
      ammo: 20,
      // damage: 10,
      // attackSpeed: 100,
      // rangedDamage: 3,
      // range: 10,
      // rangedAttackSpeed: 100,
      slots: {
          ranged: "SHORTBOW",
          melee: "CUTLASS",
          armor: "PLATE_ARMOR",
      },
  });
  install$5({
      id: "ZOMBIE",
      name: "Zombie",
      ch: "z",
      fg: "green",
      moveSpeed: 200,
      health: 6,
      damage: 8, // dps=4
      dropChance: 100,
  });
  install$5({
      id: "ARMOR_ZOMBIE",
      ch: "Z",
      fg: "green",
      moveSpeed: 200,
      health: 25,
      damage: 10, // dps=5
      dropChance: 10,
  });
  install$5({
      id: "ARMOR_ZOMBIE_2",
      ch: "Z",
      fg: "green",
      moveSpeed: 200,
      health: 50,
      damage: 12, // dps=6
      dropChance: 10,
  });
  install$5({
      id: "Vindicator",
      ch: "v",
      fg: "blue",
      moveSpeed: 100,
      health: 11,
      damage: 9,
      // chargeSpeed: 75
      // chargeDistance: 6
      // attackSpeed: 150
      dropChance: 10,
  });
  install$5({
      id: "SKELETON",
      ch: "s",
      fg: "white",
      moveSpeed: 125,
      health: 6,
      damage: 0,
      rangedDamage: 3,
      range: 8,
      tooClose: 4,
      rangedAttackSpeed: 200,
      // notice: 10
      dropChance: 100,
  });
  install$5({
      id: "ARMOR_SKELETON",
      ch: "S",
      fg: "white",
      moveSpeed: 125,
      health: 25,
      damage: 0,
      rangedDamage: 4,
      range: 9,
      tooClose: 4,
      rangedAttackSpeed: 200,
      // notice: 10
      dropChance: 10,
  });
  install$5({
      id: "ARMOR_SKELETON_2",
      ch: "S",
      fg: "white",
      moveSpeed: 125,
      health: 50,
      damage: 0,
      rangedDamage: 5,
      range: 10,
      tooClose: 4,
      rangedAttackSpeed: 200,
      // notice: 10
      dropChance: 10,
  });
  /*
  PLAYER - health = 100
  SWORD - 10-16 (10,10,16 thrust)
  BOW - 10-25

  ZOMBIE - 8 damage, 6 health
  SKELETON - 3 damage, 6 health
  VINDICATOR - 9 damage, 11 health

  SQUID COAST
  - Follow the path
  - Defeat 1 zombie
  - Defeat a few zombies (3-5)
  - Pickup arrows
  - shoot skeleton
  - follow path
  - defeat skeleton and raveger
  - ambush - defeat 3 ravegers
  - pickup some gear (fireworks arrow, enchantment point)
  - pull lever to open gate
  - shoot skeleton to drop bridge
  - kill a few more things (skeleton, rageger)
  - roll across gap to get chest
  - follow path to ending altar

  CREEPER WOODS
  - drops - food
  - fishing rod
  - fireworks arrow
  - speed potion
  - tnt
  - sheep, cows, etc..
  - free villagers
  - strength potion
  - shadow brew

  SPIDER - 5 hp, 3 damage
    << fires webs
    << ONLY attack if caught in web

  ARMORED SKELETON BOW - 25 hp, 4 damage
  ARMORED SKELETON POWER BOW - 50 hp, 4 damage

  ARMORED ZOMBIE DAGGER - 25 hp, 10 damage
  ARMORED ZOMBIE SWORD - 50 hp, 12 damage

  CREEPER - <10 hp, 36 damage

  VINDICATOR - 11 hp, ? damage
  ARMORED VINDICATOR AXE -
  ARMORED VINDICATOR DOUBLE AXE -

  ENCHANTER - <10 hp

  HAWKBRAND (5) = 13-21, CRITICAL HIT CHANCE


  NOTES
  - SUMMONER - 4 damage, 100 HP

  */

  const Fl = flag.fl;
  var Flags;
  (function (Flags) {
      Flags[Flags["HORDE_DIES_ON_LEADER_DEATH"] = Fl(0)] = "HORDE_DIES_ON_LEADER_DEATH";
      Flags[Flags["HORDE_IS_SUMMONED"] = Fl(1)] = "HORDE_IS_SUMMONED";
      Flags[Flags["HORDE_SUMMONED_AT_DISTANCE"] = Fl(2)] = "HORDE_SUMMONED_AT_DISTANCE";
      Flags[Flags["HORDE_NO_PERIODIC_SPAWN"] = Fl(3)] = "HORDE_NO_PERIODIC_SPAWN";
      Flags[Flags["HORDE_ALLIED_WITH_PLAYER"] = Fl(4)] = "HORDE_ALLIED_WITH_PLAYER";
      Flags[Flags["HORDE_NEVER_OOD"] = Fl(5)] = "HORDE_NEVER_OOD";
      // HORDE_LEADER_CAPTIVE = Fl(6), // the leader is in chains and the followers are guards
      // Move all these to tags?
      // HORDE_MACHINE_BOSS = Fl(6), // used in machines for a boss challenge
      // HORDE_MACHINE_WATER_MONSTER = Fl(7), // used in machines where the room floods with shallow water
      // HORDE_MACHINE_CAPTIVE = Fl(8), // powerful captive monsters without any captors
      // HORDE_MACHINE_STATUE = Fl(9), // the kinds of monsters that make sense in a statue
      // HORDE_MACHINE_TURRET = Fl(10), // turrets, for hiding in walls
      // HORDE_MACHINE_MUD = Fl(11), // bog monsters, for hiding in mud
      // HORDE_MACHINE_KENNEL = Fl(12), // monsters that can appear in cages in kennels
      // HORDE_VAMPIRE_FODDER = Fl(13), // monsters that are prone to capture and farming by vampires
      // HORDE_MACHINE_LEGENDARY_ALLY = Fl(14), // legendary allies
      // HORDE_MACHINE_THIEF = Fl(16), // monsters that can be generated in the key thief area machines
      // HORDE_MACHINE_GOBLIN_WARREN = Fl(17), // can spawn in goblin warrens
      // HORDE_SACRIFICE_TARGET = Fl(18), // can be the target of an assassination challenge; leader will get scary light.
      // HORDE_MACHINE_ONLY = HORDE_MACHINE_BOSS |
      //     HORDE_MACHINE_WATER_MONSTER |
      //     HORDE_MACHINE_CAPTIVE |
      //     HORDE_MACHINE_STATUE |
      //     HORDE_MACHINE_TURRET |
      //     HORDE_MACHINE_MUD |
      //     HORDE_MACHINE_KENNEL |
      //     HORDE_VAMPIRE_FODDER |
      //     HORDE_MACHINE_LEGENDARY_ALLY |
      //     HORDE_MACHINE_THIEF |
      //     HORDE_MACHINE_GOBLIN_WARREN |
      //     HORDE_SACRIFICE_TARGET,
  })(Flags || (Flags = {}));
  class Horde {
      tags = [];
      leader;
      members = {};
      frequency;
      // blueprintId: string | null = null;
      flags = { horde: 0 };
      // requiredTile: string | null = null;
      warnMs;
      memberWarnMs;
      warnColor;
      constructor(config) {
          if (config.tags) {
              if (typeof config.tags === "string") {
                  this.tags = config.tags.split(/[,|]/).map((t) => t.trim());
              }
              else {
                  this.tags = config.tags.slice();
              }
          }
          this.leader = config.leader;
          if (config.members) {
              Object.entries(config.members).forEach(([id, range$1]) => {
                  this.members[id] = range.make(range$1);
              });
          }
          this.frequency = frequency.make(config.frequency || 100);
          // this.blueprintId = config.blueprintId || null;
          this.flags.horde = flag.from(Flags, config.flags);
          // if (config.requiredTile) this.requiredTile = config.requiredTile;
          this.warnMs = config.warnMs ?? 500;
          this.memberWarnMs = config.memberWarnMs ?? this.warnMs;
          this.warnColor = config.warnColor ?? "green";
      }
      spawn(map, opts = {}) {
          opts.canSpawn = opts.canSpawn || TRUE;
          opts.rng = opts.rng || map.rng;
          opts.machine = opts.machine ?? 0;
          opts.power = opts.power || 1;
          if (opts.x === undefined) {
              opts.x = -1;
          }
          if (opts.y === undefined) {
              opts.y = -1;
          }
          const leader = this._spawnLeader(map, opts.x, opts.y, opts);
          if (!leader)
              return null;
          this._spawnMembers(leader, map, opts);
          return leader;
      }
      _spawnLeader(map, x, y, opts) {
          const leaderKind = getKind$2(this.leader);
          if (!leaderKind) {
              throw new Error("Failed to find leader kind = " + this.leader);
          }
          const leader = make$3(leaderKind, {
              machineHome: opts.machine,
              power: opts.power,
          });
          if (!leader)
              throw new Error("Failed to make horde leader - " + this.leader);
          if (x >= 0 && y >= 0) {
              if (leader.avoidsTile(map.getTile(x, y)))
                  return null;
          }
          if (x < 0 || y < 0) {
              [x, y] = this._pickLeaderLoc(leader, map, opts) || [-1, -1];
              if (x < 0 || y < 0) {
                  return null;
              }
          }
          // pre-placement stuff?  machine? effect?
          if (!this._addLeader(leader, map, x, y, opts)) {
              return null;
          }
          return leader;
      }
      _addLeader(leader, map, x, y, _opts) {
          map.game;
          leader.x = x;
          leader.y = y;
          flashGameTime(map, x, y, this.warnColor, this.warnMs).then(() => {
              map.addActor(leader);
          });
          return true;
      }
      _addMember(member, map, x, y, leader, _opts) {
          map.game;
          member.leader = leader;
          member.x = x;
          member.y = y;
          flashGameTime(map, x, y, this.warnColor, this.memberWarnMs).then(() => {
              map.addActor(member);
          });
          return true;
      }
      _spawnMembers(leader, map, opts) {
          const entries = Object.entries(this.members);
          if (entries.length == 0)
              return 0;
          let count = 0;
          entries.forEach(([kindId, countRange]) => {
              const count = countRange.value(opts.rng);
              for (let i = 0; i < count; ++i) {
                  this._spawnMember(kindId, map, leader, opts);
              }
          });
          return count;
      }
      _spawnMember(kindId, map, leader, opts) {
          const kind = getKind$2(kindId);
          if (!kind) {
              throw new Error("Failed to find member kind = " + kindId);
          }
          const member = make$3(kind, {
              machineHome: opts.machine,
              power: opts.power,
          });
          if (!member)
              throw new Error("Failed to make horde member - " + kindId);
          const [x, y] = this._pickMemberLoc(member, map, leader, opts) || [-1, -1];
          if (x < 0 || y < 0) {
              return null;
          }
          // pre-placement stuff?  machine? effect?
          if (!this._addMember(member, map, x, y, leader, opts)) {
              return null;
          }
          return member;
      }
      _pickLeaderLoc(leader, map, opts) {
          let loc = opts.rng.matchingLoc(map.width, map.height, (x, y) => {
              if (map.hasActor(x, y))
                  return false; // Brogue kills existing actors, but lets do this instead
              if (map.hasFx(x, y))
                  return false; // Could be someone else spawning here
              if (!opts.canSpawn(x, y))
                  return false;
              if (leader.avoidsTile(map.getTile(x, y)))
                  return false;
              if (map.isHallway(x, y)) {
                  return false;
              }
              return true;
          });
          return loc;
      }
      _pickMemberLoc(actor, map, leader, opts) {
          let loc = opts.rng.matchingLocNear(leader.x, leader.y, (x, y) => {
              if (!map.hasXY(x, y))
                  return false;
              if (map.hasActor(x, y))
                  return false; // Brogue kills existing actors, but lets do this instead
              if (map.hasFx(x, y))
                  return false; // Could be someone else spawning here
              // if (map.fov.isAnyKindOfVisible(x, y)) return false;
              if (actor.avoidsTile(map.getTile(x, y)))
                  return false;
              if (map.isHallway(x, y)) {
                  return false;
              }
              return true;
          });
          return loc;
      }
  }

  const hordes = {};
  function install$3(id, horde) {
      if (typeof horde === "string") {
          horde = { leader: horde };
      }
      if (!(horde instanceof Horde)) {
          horde = new Horde(horde);
      }
      hordes[id] = horde;
      return horde;
  }
  function from(id) {
      if (id instanceof Horde) {
          return id;
      }
      if (typeof id === "string") {
          return hordes[id];
      }
      return new Horde(id);
  }
  function random(opts = {}) {
      const match = {
          tags: [],
          forbidTags: [],
          flags: 0,
          forbidFlags: 0,
          depth: 0,
      };
      if (typeof opts === "string") {
          opts = {
              tags: opts,
          };
      }
      const rng$1 = opts.rng || rng.random;
      if (typeof opts.tags === "string") {
          opts.tags
              .split(/[,|&]/)
              .map((t) => t.trim())
              .forEach((t) => {
              if (t.startsWith("!")) {
                  match.forbidTags.push(t.substring(1).trim());
              }
              else {
                  match.tags.push(t);
              }
          });
      }
      else if (Array.isArray(opts.tags)) {
          match.tags = opts.tags.slice();
      }
      if (typeof opts.forbidTags === "string") {
          match.forbidTags = opts.forbidTags.split(/[,|&]/).map((t) => t.trim());
      }
      else if (Array.isArray(opts.forbidTags)) {
          match.forbidTags = opts.forbidTags.slice();
      }
      if (opts.flags) {
          if (typeof opts.flags === "string") {
              opts.flags
                  .split(/[,|]/)
                  .map((t) => t.trim())
                  .forEach((flag) => {
                  if (flag.startsWith("!")) {
                      const key = flag.substring(1);
                      match.forbidFlags |= Flags[key];
                  }
                  else {
                      match.flags |= Flags[flag];
                  }
              });
          }
      }
      if (opts.forbidFlags) {
          match.forbidFlags = flag.from(Flags, opts.forbidFlags);
      }
      if (opts.depth) {
          match.depth = opts.depth;
      }
      if (match.depth && opts.oodChance) {
          while (rng$1.chance(opts.oodChance)) {
              match.depth += 1;
          }
          match.forbidFlags |= Flags.HORDE_NEVER_OOD;
      }
      const matches = Object.values(hordes).filter((k) => {
          if (match.tags.length && !utils.arraysIntersect(match.tags, k.tags))
              return false;
          if (match.forbidTags && utils.arraysIntersect(match.forbidTags, k.tags))
              return false;
          if (match.flags && !(k.flags.horde & match.flags)) {
              return false;
          }
          if (match.forbidFlags && k.flags.horde & match.forbidFlags) {
              return false;
          }
          return true;
      });
      if (!match.depth) {
          return rng$1.item(matches) || null;
      }
      const depth = match.depth;
      const weights = matches.map((h) => h.frequency(depth));
      const index = rng$1.weighted(weights);
      if (index < 0)
          return null;
      return matches[index];
  }

  install$3("ZOMBIE", {
      leader: "ZOMBIE",
      members: { ZOMBIE: "2-3" },
      frequency: 10,
  });
  install$3("ZOMBIE2", {
      leader: "ARMOR_ZOMBIE",
      members: { ZOMBIE: "1-3" },
      frequency: (l) => l + 5,
  });
  install$3("ZOMBIE3", {
      leader: "ARMOR_ZOMBIE_2",
      members: { ARMOR_ZOMBIE: "0-2", ZOMBIE: "1-3" },
      frequency: (l) => 2 * l,
  });
  install$3("SKELETON", {
      leader: "SKELETON",
      members: { SKELETON: "2-3" },
      frequency: 10,
  });
  install$3("SKELETON2", {
      leader: "ARMOR_SKELETON",
      members: { SKELETON: "1-3" },
      frequency: (l) => l + 5,
  });
  install$3("SKELETON3", {
      leader: "ARMOR_SKELETON_2",
      members: { SKELETON: "1-3", ARMOR_SKELETON: "0-2" },
      frequency: (l) => 2 * l,
  });

  install$7({
      id: "HEALTH_POTION",
      ch: "!",
      fg: "pink",
      on: {
          pickup(level, item, actor) {
              // TODO - vary the messages
              // TODO - Different healing amounts?
              actor.health = actor.kind.health; // TODO - move this to an effect
              level.game.addMessage("You drink the potion.");
              level.removeItem(item);
              // destroy
              return true;
          },
      },
      tags: "", // Not a drop because it is innate
  });
  install$7({
      id: "ARROWS",
      ch: "|",
      fg: "yellow",
      on: {
          pickup(level, item, actor) {
              //   actor.health = actor.kind.health;
              level.game.addMessage("You pickup some ammo.");
              level.removeItem(this);
              // destroy
              actor.ammo += 10;
              if (actor.data.bonus_arrows > 0) {
                  actor.ammo += 10 * actor.data.bonus_arrows;
              }
              return true;
          },
      },
      tags: "drop",
  });
  install$7({
      id: "APPLE",
      ch: "&",
      fg: "yellow",
      on: {
          pickup(level, item, actor) {
              //   [] Apples - 20%/3s
              actor.addStatus(new RegenStatus(Math.floor(actor.health_max * 0.2), 3 * 200));
              level.game.addMessage("You eat an apple.");
              level.removeItem(this);
              // destroy
              return true;
          },
      },
      tags: "drop, food",
  });
  install$7({
      id: "BREAD",
      ch: "&",
      fg: "yellow",
      on: {
          pickup(level, item, actor) {
              //   [] Bread - 100%/30s
              actor.addStatus(new RegenStatus(Math.floor(actor.health_max), 30 * 200));
              level.game.addMessage("You eat some bread.");
              level.removeItem(this);
              // destroy
              return true;
          },
      },
      tags: "drop, food",
  });
  install$7({
      id: "PORK",
      ch: "&",
      fg: "yellow",
      on: {
          pickup(level, item, actor) {
              //   [] Pork - 50%/10s
              actor.addStatus(new RegenStatus(Math.floor(actor.health_max * 0.5), 10 * 200));
              level.game.addMessage("You eat some pork.");
              level.removeItem(this);
              // destroy
              return true;
          },
      },
      tags: "drop, food",
  });
  install$7({
      id: "SALMON",
      ch: "&",
      fg: "yellow",
      on: {
          pickup(level, item, actor) {
              //   [] Salmon - 35%/8s
              actor.addStatus(new RegenStatus(Math.floor(actor.health_max * 0.35), 8 * 200));
              level.game.addMessage("You eat some salmon.");
              level.removeItem(this);
              // destroy
              return true;
          },
      },
      tags: "drop, food",
  });
  install$7({
      id: "BERRIES",
      ch: "&",
      fg: "yellow",
      on: {
          pickup(level, item, actor) {
              //   [] Berries - 20%/5s + speedup
              actor.addStatus(new RegenStatus(Math.floor(actor.health_max * 0.2), 5 * 200));
              level.game.addMessage("You eat some berries.");
              level.removeItem(this);
              // destroy
              return true;
          },
      },
      tags: "drop, food",
  });
  install$7({
      id: "MELON",
      ch: "&",
      fg: "yellow",
      on: {
          pickup(level, item, actor) {
              //   [] Melon - 75%/15s
              actor.addStatus(new RegenStatus(Math.floor(actor.health_max * 0.75), 15 * 200));
              level.game.addMessage("You eat some melon.");
              level.removeItem(this);
              // destroy
              return true;
          },
      },
      tags: "drop, food",
  });
  install$7({
      id: "FRUIT",
      ch: "&",
      fg: "yellow",
      on: {
          pickup(level, item, actor) {
              //   [] Fruit - 30%/1s
              actor.addStatus(new RegenStatus(Math.floor(actor.health_max * 0.3), 1 * 200));
              level.game.addMessage("You eat some fruit.");
              level.removeItem(this);
              // destroy
              return true;
          },
      },
      tags: "drop, food",
  });
  install$7({
      id: "FISH",
      ch: "&",
      fg: "yellow",
      on: {
          pickup(level, item, actor) {
              //   [] Fish - 20%/2s + 10% oxygen
              actor.addStatus(new RegenStatus(Math.floor(actor.health_max * 0.2), 2 * 200));
              level.game.addMessage("You eat some fish.");
              level.removeItem(this);
              // destroy
              return true;
          },
      },
      tags: "drop, food",
  });

  //////////////////////////////////////////////////////
  // MELEE
  //////////////////////////////////////////////////////
  install$7({
      id: "DAGGERS",
      ch: "/",
      fg: "yellow",
      speed: 50,
      damage: 5,
      combo: 6,
      combo_speed: 80,
      combo_damage: 8,
      tags: "melee",
  });
  // FANGS_OF_FROST
  // MOON_DAGGERS
  // SHEER_DAGGERS
  // VOID_BLADES
  // BEGINNING_AND_END
  install$7({
      id: "KNIFE",
      ch: "/",
      fg: "yellow",
      speed: 70,
      damage: 7,
      combo: 5,
      combo_speed: 70,
      combo_damage: 7,
      tags: "melee",
  });
  // TEMPEST_KNIFE
  // CHILL_KNIFE
  // RESOLUTE_KNIFE
  install$7({
      id: "SWORD",
      ch: "/",
      fg: "yellow",
      speed: 100,
      damage: 10, // dps = 10 * 100 / 100 = 10
      combo: 3,
      combo_speed: 100,
      combo_damage: 10,
      tags: "melee",
  });
  // DIAMOND_SWORD
  // HAWKBRAND
  // SINISTER_SWORD
  install$7({
      id: "CUTLASS",
      ch: "/",
      fg: "yellow",
      speed: 110,
      damage: 11,
      combo: 3,
      combo_speed: 130,
      combo_damage: 13,
      tags: "melee",
  });
  // CORAL_BLADE
  // SPONGE_STRIKER
  install$7({
      id: "AXE",
      ch: "/",
      fg: "yellow",
      speed: 90,
      damage: 9,
      combo: 3,
      combo_speed: 120,
      combo_damage: 12,
      tags: "melee",
  });
  // HIGHLAND_AXE
  // FIREBRAND_AXE
  install$7({
      id: "DOUBLE_AXE",
      ch: "/",
      fg: "yellow",
      speed: 120,
      damage: 12,
      combo: 3,
      combo_speed: 150,
      combo_damage: 15,
      tags: "melee",
  });
  // CURSED_AXE
  // WHIRLWIND
  install$7({
      id: "BACKSTABBER",
      ch: "/",
      fg: "yellow",
      speed: 90,
      damage: 10,
      combo: 3,
      combo_speed: 120,
      combo_damage: 10,
      tags: "melee",
  });
  // SWIFT_STRIKER
  install$7({
      id: "BATTLESTAFF",
      ch: "/",
      fg: "yellow",
      speed: 70,
      damage: 7,
      combo: 4,
      combo_speed: 120,
      combo_damage: 12,
      tags: "melee",
  });
  // BATTLESTAFF_OF_TERROR
  // GROWING_STAFF
  install$7({
      id: "BONE_CLUB",
      ch: "/",
      fg: "yellow",
      speed: 150,
      damage: 15,
      combo: 2,
      combo_speed: 200,
      combo_damage: 20,
      tags: "melee",
  });
  // BONE_CUDGEL
  install$7({
      id: "CLAYMORE",
      ch: "/",
      fg: "yellow",
      speed: 120,
      damage: 12,
      combo: 3,
      combo_speed: 180,
      combo_damage: 18,
      tags: "melee",
  });
  // BROADSWORD
  // GREAT_AXEBLADE
  // HEARTSTEALER
  // OBSIDIAN_CLAYMORE
  // STARLESS_NIGHT
  // FROST_SLAYER
  // DANCERS_SWORD
  // NAMELESS_BLADE
  install$7({
      id: "GLAIVE",
      ch: "/",
      fg: "yellow",
      speed: 120,
      damage: 12,
      combo: 3,
      combo_speed: 150,
      combo_damage: 15,
      tags: "melee",
  });
  // GRAVE_BANE
  // VENOM_GLAIVE
  install$7({
      id: "GREAT_HAMMER",
      ch: "/",
      fg: "yellow",
      speed: 180,
      damage: 18,
      combo: 2,
      combo_speed: 200,
      combo_damage: 20,
      tags: "melee",
  });
  // HAMMER_OF_GRAVITY
  // STORMLANDER
  install$7({
      id: "MACE",
      ch: "/",
      fg: "yellow",
      speed: 110,
      damage: 11,
      combo: 3,
      combo_speed: 120,
      combo_damage: 12,
      tags: "melee",
  });
  // FLAIL
  // SUNS_GRACE
  install$7({
      id: "PICKAXE",
      ch: "/",
      fg: "yellow",
      speed: 120,
      damage: 12,
      combo: 3,
      combo_speed: 120,
      combo_damage: 12,
      tags: "melee",
  });
  // DIAMOND_PICKAXE
  install$7({
      id: "SICKLES",
      ch: "/",
      fg: "yellow",
      speed: 80,
      damage: 8,
      combo: 4,
      combo_speed: 120,
      combo_damage: 12,
      tags: "melee",
  });
  // NIGHTMARES_BITE
  // LAST_LAUGH
  // SOUL_KNIFE
  // ETERNAL_KNIFE
  // TRUTHSEEKER
  install$7({
      id: "WHIP",
      ch: "/",
      fg: "yellow",
      speed: 120,
      damage: 12,
      combo: 3,
      combo_speed: 120,
      combo_damage: 12,
      tags: "melee",
  });
  // VINE_WHIP
  install$7({
      id: "GAUNTLETS",
      ch: "/",
      fg: "yellow",
      speed: 50,
      damage: 5,
      combo: 7,
      combo_speed: 60,
      combo_damage: 6,
      tags: "melee",
  });
  // FIGHTERS_BINDINGS
  // MAULERS
  // SOUL_FISTS
  install$7({
      id: "SCYTHE",
      ch: "/",
      fg: "yellow",
      speed: 180,
      damage: 18,
      combo: 2,
      combo_speed: 180,
      combo_damage: 18,
      tags: "melee",
  });
  // SOUL_SCYTHE
  // FROST_SCYTHE
  // JAILORS_SCYTHE
  install$7({
      id: "KATANA",
      ch: "/",
      fg: "yellow",
      speed: 90,
      damage: 9,
      combo: 4,
      combo_speed: 110,
      combo_damage: 11,
      tags: "melee",
  });
  // DARK_KATANA
  // MASTERS_KATANA
  install$7({
      id: "SPEAR",
      ch: "/",
      fg: "yellow",
      speed: 120,
      damage: 12,
      combo: 3,
      combo_speed: 140,
      combo_damage: 14,
      tags: "melee",
  });
  // FORTUNE_SPEAR
  // WHISPERING_SPEAR
  install$7({
      id: "RAPIER",
      ch: "/",
      fg: "yellow",
      speed: 30,
      damage: 3,
      combo: 10,
      combo_speed: 60,
      combo_damage: 6,
      tags: "melee",
  });
  // BEE_STINGER
  // FREEZING_FOIL

  install$7({
      id: "SCALE_MAIL",
      name: "Scale Mail",
      ch: "]",
      fg: "yellow",
      defense: 50,
      armor_flags: "REDUCE_DAMAGE_35 | MELEE_DAMAGE_30",
      tags: "armor",
      effects: {
          damage_reduction: 35,
          melee_damage: 30,
      },
  });
  install$7({
      id: "MERCENARY_ARMOR",
      name: "Mercenary Armor",
      ch: "]",
      fg: "yellow",
      defense: 50,
      armor_flags: "REDUCE_DAMAGE_35 | WEAPON_DAMAGE_AURA_20",
      tags: "armor",
      effects: {
          damage_reduction: 35,
          weapon_damage_aura: 20,
      },
  });
  install$7({
      id: "GUARDS_ARMOR",
      name: "Guards Armor",
      ch: "]",
      fg: "yellow",
      defense: 50,
      armor_flags: "ARTIFACT_COOLDOWN_40 | ARROWS_10",
      tags: "armor",
      effects: {
          artifact_cooldown: 40,
          arrows: 10,
      },
  });
  install$7({
      id: "HUNTERS_ARMOR",
      name: "Hunters Armor",
      ch: "]",
      fg: "yellow",
      defense: 50,
      armor_flags: "RANGED_DAMAGE_30 | ARROWS_10",
      tags: "armor",
      effects: {
          ranged_damage: 30,
          arrows: 10,
      },
  });
  install$7({
      id: "ARCHERS_ARMOR",
      name: "Archers Armor",
      ch: "]",
      fg: "yellow",
      defense: 50,
      armor_flags: "RANGED_DAMAGE_30 | ARROWS_10 | MOVESPEED_AURA_15",
      tags: "armor",
      effects: {
          ranged_damage: 30,
          arrows: 10,
          move_speed_aura: 15,
      },
  });
  install$7({
      id: "REINFORCED_MAIL",
      name: "Reinforced Mail",
      ch: "]",
      fg: "yellow",
      defense: 50,
      armor_flags: "REDUCE_DAMAGE_35 | NEGATE_HITS_30 | LONGER_ROLL_100",
      tags: "armor",
      effects: {
          damage_reduction: 35,
          negate_hits: 30,
          roll_cooldown: 100,
      },
  });
  install$7({
      id: "STALWART_ARMOR",
      name: "Stalwart Armor",
      ch: "]",
      fg: "yellow",
      defense: 50,
      armor_flags: "REDUCE_DAMAGE_35 | NEGATE_HITS_30 | LONGER_ROLL_100 | POTION_BOOSTS_DEFENSE",
      tags: "armor",
      effects: {
          damage_reduction: 35,
          negate_hits: 30,
          roll_cooldown: 100,
          potion_boosts_defense: [90, 5 * 200],
      },
  });
  install$7({
      id: "PLATE_ARMOR",
      name: "Plate Armor",
      ch: "]",
      fg: "yellow",
      defense: 50,
      armor_flags: "REDUCE_DAMAGE_35 | NEGATE_HITS_30 | LONGER_ROLL_100",
      tags: "armor",
      effects: {
          damage_reduction: 35,
          negate_hits: 30,
          roll_cooldown: 100,
      },
  });
  install$7({
      id: "FULL_METAL_ARMOR",
      name: "Full Metal Armor",
      ch: "]",
      fg: "yellow",
      defense: 50,
      armor_flags: "REDUCE_DAMAGE_35 | NEGATE_HITS_30 | LONGER_ROLL_100 | MELEE_DAMAGE_30",
      tags: "armor",
      effects: {
          damage_reduction: 35,
          negate_hits: 30,
          roll_cooldown: 100,
          melee_damage: 30,
      },
  });
  install$7({
      id: "CHAMPIONS_ARMOR",
      name: "Champions Armor",
      ch: "]",
      fg: "yellow",
      defense: 50,
      armor_flags: "REDUCE_DAMAGE_35 | POTION_COOLDOWN_40 | MOBS_TARGET_YOU_MORE",
      tags: "armor",
      effects: {
          damage_reduction: 35,
          potion_cooldown: 40,
          mobs_target_you: 50, // 50%?
      },
  });
  install$7({
      id: "HEROS_ARMOR",
      name: "Heros Armor",
      ch: "]",
      fg: "yellow",
      defense: 50,
      armor_flags: "REDUCE_DAMAGE_35 | POTION_COOLDOWN_40 | MOBS_TARGET_YOU_MORE | POTION_HEALS_NEARBY_ALLIES",
      tags: "armor",
      effects: {
          damage_reduction: 35,
          potion_cooldown: 40,
          mobs_target_you: 50, // 50%?
          potion_heals_allies: 3,
      },
  });

  //////////////////////////////////////////////////////
  // RANGED
  //////////////////////////////////////////////////////
  install$7({
      id: "BOW",
      ch: "}",
      fg: "yellow",
      speed: 100,
      damage: 10,
      range: 10,
      charge: 3,
      tags: "ranged, bow",
  });
  // BONE_BOW
  // TWIN_BOW
  install$7({
      id: "HUNTING_BOW",
      ch: "}",
      fg: "yellow",
      speed: 90,
      damage: 9,
      range: 13,
      charge: 3,
      tags: "ranged, bow",
  });
  // ANCIENT_BOW
  // HUNTERS_PROMISE
  // MASTERS_BOW
  install$7({
      id: "LONGBOW",
      ch: "}",
      fg: "yellow",
      speed: 130,
      damage: 13,
      range: 15,
      charge: 4,
      tags: "ranged, bow",
  });
  // GUARDIAN_BOW
  // RED_SNAKE
  install$7({
      id: "POWER_BOW",
      ch: "}",
      fg: "yellow",
      speed: 150,
      damage: 15,
      range: 20,
      charge: 5,
      tags: "ranged, bow",
  });
  // ELITE_POWER_BOW
  // SABREWING
  install$7({
      id: "SHORTBOW",
      ch: "}",
      fg: "yellow",
      speed: 70,
      damage: 7,
      range: 8,
      charge: 2,
      tags: "ranged, bow",
  });
  // LOVE_SHORTBOW
  // MECHANICAL_SHORTBOW
  // PURPLE_STORM
  // SNOW_BOW
  // WINTERS_TOUCH
  install$7({
      id: "TRICKBOW",
      ch: "}",
      fg: "yellow",
      speed: 80,
      damage: 8,
      range: 10,
      charge: 2,
      tags: "ranged, bow",
  });
  // GREEN_MENACE
  // PINK_SCOUNDREL
  install$7({
      id: "CROSSBOW",
      ch: "}",
      fg: "yellow",
      speed: 120,
      damage: 12,
      range: 10,
      charge: 0,
      tags: "ranged, xbow",
  });
  // AZURE_SEEKER
  // SLICER
  // EXPLODING_CROSSBOW
  // FIREBOLT_THROWER
  // IMPLODING_CROSSBOW
  install$7({
      id: "DUAL_CROSSBOWS",
      ch: "}",
      fg: "yellow",
      speed: 60,
      damage: 6,
      range: 8,
      charge: 0,
      tags: "ranged, xbow",
  });
  // BABY_CROSSBOWS
  // SPELLBOUND_CROSSBOWS
  install$7({
      id: "HEAVY_CROSSBOW",
      ch: "}",
      fg: "yellow",
      speed: 200,
      damage: 20,
      range: 15,
      charge: 0,
      tags: "ranged, xbow",
  });
  // DOOM_CROSSBOW
  // SLAYER_CROSSBOW
  install$7({
      id: "RAPID_CROSSBOW",
      ch: "}",
      fg: "yellow",
      speed: 80,
      damage: 8,
      range: 10,
      charge: 0,
      tags: "ranged, xbow",
  });
  // AUTO_CROSSBOW
  // BUTTERFLY_CROSSBOW
  install$7({
      id: "SCATTER_CROSSBOW",
      ch: "}",
      fg: "yellow",
      speed: 100,
      damage: 10,
      range: 10,
      charge: 0,
      tags: "ranged, xbow",
  });
  // HARP_CROSSBOW
  // LIGHTNING_HARP_CROSSBOW

  class Level {
      id = 0;
      depth = 0;
      kind;
      // TODO - Convert to >> messages: { [id: string]: string }
      welcome = "";
      proceed = "";
      tick_time = 50;
      scheduler;
      done = false;
      started = false;
      // needsDraw = false;
      data = {};
      // TODO - move to Tower specific plugin
      // waves: WaveInfo[] = [];
      actors = [];
      items = [];
      fxs = [];
      tiles;
      flags;
      choke;
      game;
      scene_id = "level";
      scene_opts = {};
      scene = null;
      // // TODO - Can we do this without a hero?
      // hero: Hero;
      seed;
      // rng: GWU.rng.Random;
      locations = {};
      events;
      constructor(game, id, kind) {
          this.id = id;
          this.game = game;
          this.kind = kind;
          const { width, height, seed } = kind;
          this.events = new index.Events(this);
          this.tiles = grid.make(width, height);
          this.flags = grid.make(width, height);
          this.choke = grid.make(width, height);
          this.seed = seed || random$2.number(100000);
          // this.rng = GWU.rng.make(this.seed);
          this.scheduler = new scheduler.Scheduler();
          if (kind.scene) {
              this.scene_id = kind.scene;
              this.scene_opts = kind.scene_opts;
          }
          // TODO - Move to Tower specific plugin
          this.data.wavesLeft = 0;
      }
      get width() {
          return this.tiles.width;
      }
      get height() {
          return this.tiles.height;
      }
      get rng() {
          return this.game ? this.game.rng : random$2;
      }
      hasXY(x, y) {
          return this.tiles.hasXY(x, y);
      }
      create(kind, opts) {
          if (opts.seed) {
              this.seed = opts.seed;
          }
          this.depth = opts.depth || kind.depth || 1;
          if (kind.layout) {
              const { data, tiles } = kind.layout;
              loadLevel(this, data, tiles);
          }
          else if (kind.dig) {
              digLevel(this, kind.dig, this.seed);
          }
          else {
              throw new Error("Level must have either 'dig' or 'layout'.");
          }
          if (kind.welcome) {
              this.welcome = kind.welcome;
          }
          else {
              this.welcome = "Welcome.";
          }
          if (kind.proceed) {
              this.proceed = kind.proceed;
          }
          else {
              this.proceed = "Proceed.";
          }
          // if (kind.waves) {
          //   this.waves = kind.waves;
          // } else {
          //   this.waves = [];
          //   for (let i = 0; i < this.depth; ++i) {
          //     this.waves.push({
          //       delay: 500 + i * 2000,
          //       power: this.depth * 2 - 1 + this.rng.dice(1, 3),
          //       horde: { depth: this.depth },
          //     });
          //   }
          // }
          // if (kind.start) {
          //   level.startLoc = kind.start;
          // }
          // if (kind.finish) {
          //   level.finishLoc = kind.finish;
          // }
          this.tick_time = kind.tick_time || this.tick_time;
          if (this.tick_time > 0) {
              this.repeat(this.tick_time, this._tick);
          }
          if (opts.scene) {
              this.scene_id = opts.scene;
              this.scene_opts = opts.scene_opts || {};
          }
          else if (opts.scene_opts) {
              this.scene_opts = utils.mergeDeep(this.scene_opts, opts.scene_opts);
          }
          let onFns = kind.on || {};
          Object.entries(onFns).forEach(([key, val]) => {
              if (typeof val === "function") {
                  this.on(key, val);
              }
          });
          onFns = opts.on || {};
          Object.entries(onFns).forEach(([key, val]) => {
              if (typeof val === "function") {
                  this.on(key, val);
              }
          });
          this.emit("create", this, opts);
      }
      show() {
          this.done = false;
          this.started = true;
          this.scene = this.game.app.scenes
              .create(this.scene_id, this.scene_opts)
              .start({ level: this });
          this.scene.once("start", () => {
              this.emit("show", this, this.scene);
          });
          this.scene.once("stop", () => {
              this.hide();
          });
      }
      hide() {
          // TODO - Should we remove the emit('stop') and let plugins handle this?
          this.emit("hide", this);
          this.scene = null;
      }
      update(time) {
          // TODO - Need to support replacing this with a different update loop
          //      - For "turn_based", "real_time", "combo"
          const game = this.game;
          // TODO - Move inputQueue to Level
          while (game.inputQueue.length && game.needInput) {
              const e = game.inputQueue.dequeue();
              e &&
                  e.dispatch({
                      emit: (evt, e) => {
                          let action = game.keymap[evt];
                          if (!action)
                              return;
                          if (typeof action === "function") {
                              return action(this, e);
                          }
                          let fn = get(action);
                          if (!fn) {
                              console.warn(`Failed to find action: ${action} for key: ${evt}`);
                          }
                          else {
                              // @ts-ignore
                              fn(this, game.hero);
                              this.scene.needsDraw = true;
                              e.stopPropagation(); // We handled it
                          }
                      },
                  });
          }
          if (game.needInput)
              return;
          let filter = false;
          let actor = this.scheduler.pop();
          const startTime = this.scheduler.time;
          let elapsed = 0;
          while (actor) {
              if (typeof actor === "function") {
                  actor(this);
                  if (elapsed > 16)
                      return;
              }
              else if (actor.health <= 0) {
                  // skip
                  filter = true;
              }
              else if (actor === game.hero) {
                  actor.act(this);
                  if (filter) {
                      this.actors = this.actors.filter((a) => a && a.health > 0);
                  }
                  this.scene.needsDraw = true;
                  return;
              }
              else {
                  actor.act(this);
              }
              if (this.scene.timers.length || this.scene.tweens.length) {
                  return;
              }
              if (this.scene.paused.update) {
                  return;
              }
              actor = this.scheduler.pop();
              elapsed = this.scheduler.time - startTime;
          }
          // no other actors
          game.needInput = true;
          return;
      }
      _tick(dt) {
          // this.wait(this.tick_time, this.tick.bind(this));
          // tick actors
          this.actors.forEach((a) => {
              // TODO - check if alive?
              a.tick(this, dt);
          });
          // tick tiles
          this.tiles.forEach((index, x, y) => {
              const tile = tilesByIndex[index];
              if (tile.on && tile.on.tick) {
                  tile.on.tick.call(tile, this, x, y, dt);
              }
          });
          if (this.done || !this.started)
              return;
          // TODO - Should we remove this and let plugins handle it?
          this.emit("tick", this, dt);
          // @ts-ignore
          if (!this.actors.includes(this.game.hero)) {
              this.done = true;
              // lose
              // TODO - Do a real time flash before transitioning the scene
              this.emit("lose", this, "You died.");
          }
      }
      // keypress(e: GWU.app.Event) {
      //   this.game.inputQueue.enqueue(e.clone());
      //   e.stopPropagation();
      // }
      // click(e: GWU.app.Event) {
      //   this.game.inputQueue.enqueue(e.clone());
      //   e.stopPropagation();
      // }
      fill(tile) {
          if (typeof tile === "string") {
              tile = tilesByName[tile].index;
          }
          this.tiles.fill(tile);
      }
      setTile(x, y, id, opts = {}) {
          const tile = typeof id === "string" ? tilesByName[id] : tilesByIndex[id];
          if (!tile) {
              console.warn("Failed to find tile: " + id);
              return;
          }
          // priority, etc...
          let data = { x, y, tile }; // allows plugins to change the tile
          this.emit("set_tile", data); // TODO - Is this good?
          if (data.tile) {
              this.tiles[x][y] = data.tile.index;
              // this.game && this.game.drawAt(x, y);
              if (tile.on && tile.on.place) {
                  tile.on.place.call(tile, this, x, y);
              }
          }
      }
      hasTile(x, y, tile) {
          if (typeof tile === "string") {
              tile = tilesByName[tile].index;
          }
          return this.tiles.get(x, y) === tile;
      }
      getTile(x, y) {
          const id = this.tiles.get(x, y) || 0;
          return tilesByIndex[id];
      }
      //
      blocksMove(x, y) {
          const tile = this.getTile(x, y);
          return tile.blocksMove || false;
      }
      blocksPathing(x, y) {
          return this.blocksMove(x, y);
      }
      blocksDiagonal(x, y) {
          const tile = this.getTile(x, y);
          return tile.blocksDiagonal || false;
      }
      isHallway(x, y) {
          return (xy.arcCount(x, y, (i, j) => {
              return !this.blocksMove(i, j);
          }) > 1);
      }
      isSecretDoor(x, y) {
          const tile = this.getTile(x, y);
          return tile.secretDoor || false;
      }
      // AnalysisSite
      setInLoop(x, y) {
          this.flags[x][y] |= index$1.Flags.IN_LOOP;
      }
      clearInLoop(x, y) {
          this.flags[x][y] &= ~index$1.Flags.IN_LOOP;
      }
      isInLoop(x, y) {
          return ((this.flags[x][y] || 0) & index$1.Flags.IN_LOOP) > 0;
      }
      clearChokepoint(x, y) {
          this.flags[x][y] &= ~index$1.Flags.CHOKEPOINT;
      }
      setChokepoint(x, y) {
          this.flags[x][y] |= index$1.Flags.CHOKEPOINT;
      }
      isChokepoint(x, y) {
          return !!(this.flags[x][y] & index$1.Flags.CHOKEPOINT);
      }
      setChokeCount(x, y, count) {
          this.choke[x][y] = count;
      }
      getChokeCount(x, y) {
          return this.choke[x][y];
      }
      setGateSite(x, y) {
          this.flags[x][y] |= index$1.Flags.GATE_SITE;
      }
      clearGateSite(x, y) {
          this.flags[x][y] &= ~index$1.Flags.GATE_SITE;
      }
      isGateSite(x, y) {
          return !!(this.flags[x][y] & index$1.Flags.GATE_SITE);
      }
      isAreaMachine(x, y) {
          return !!(this.flags[x][y] & index$1.Flags.IN_AREA_MACHINE);
      }
      drawAt(buf, x, y) {
          buf.blackOut(x, y);
          buf.drawSprite(x, y, this.getTile(x, y));
          const item = this.itemAt(x, y);
          item && item.draw(buf);
          const actor = this.actorAt(x, y);
          actor && actor.draw(buf);
          const fx = this.fxAt(x, y);
          fx && fx.draw(buf);
      }
      actorAt(x, y) {
          return this.actors.find((a) => a.x === x && a.y === y);
      }
      addActor(obj) {
          this.actors.push(obj);
          obj.emit("add", this, obj);
          this.scene.needsDraw = true; // need to update sidebar too
      }
      removeActor(obj) {
          utils.arrayDelete(this.actors, obj);
          obj.emit("remove", this, obj);
          this.scene.needsDraw = true;
      }
      hasActor(x, y) {
          return this.actors.some((a) => a.x === x && a.y === y);
      }
      itemAt(x, y) {
          return this.items.find((i) => i.x === x && i.y === y);
      }
      addItem(obj) {
          this.items.push(obj);
          obj.emit("add", this, obj);
          this.scene.needsDraw = true; // need to update sidebar too
      }
      removeItem(obj) {
          utils.arrayDelete(this.items, obj);
          obj.emit("remove", this, obj);
          this.scene.needsDraw = true;
      }
      hasItem(x, y) {
          return this.items.some((i) => i.x === x && i.y === y);
      }
      fxAt(x, y) {
          return this.fxs.find((i) => i.x === x && i.y === y);
      }
      addFx(obj) {
          this.fxs.push(obj);
          obj.emit("add", this, obj);
          this.scene.needsDraw = true; // need to update sidebar too
      }
      removeFx(obj) {
          utils.arrayDelete(this.fxs, obj);
          obj.emit("remove", this, obj);
          this.scene.needsDraw = true;
      }
      hasFx(x, y) {
          return this.fxs.some((f) => f.x === x && f.y === y);
      }
      getFlavor(x, y) {
          if (!this.hasXY(x, y))
              return "";
          const actor = this.actorAt(x, y);
          if (actor && actor.kind) {
              return `You see a ${actor.kind.id}.`;
          }
          const item = this.itemAt(x, y);
          if (item && item.kind) {
              return `You see a ${item.kind.id}.`;
          }
          const tile = this.getTile(x, y);
          const text = `You see ${tile.id}.`;
          return text;
      }
      triggerAction(event, actor) {
          const tile = this.getTile(actor.x, actor.y);
          if (tile && tile.on && tile.on[event]) {
              tile.on[event].call(tile, this, actor);
          }
      }
      diagonalBlocked(fromX, fromY, toX, toY) {
          if (fromX == toX || fromY == toY)
              return false;
          // check if diagonal move is blocked by tiles
          const horiz = this.getTile(toX, fromY);
          if (horiz.blocksDiagonal)
              return true;
          const vert = this.getTile(fromX, toY);
          if (vert.blocksDiagonal)
              return true;
          return false;
      }
      on(...args) {
          if (args.length == 1) {
              return this.events.on(args[0]);
          }
          return this.events.on(args[0], args[1]);
      }
      once(event, fn) {
          return this.events.once(event, fn);
      }
      emit(event, ...args) {
          return this.events.emit(event, ...args);
      }
      // TODO - test me!!!
      wait(time, fn) {
          this.scheduler.push(fn, time);
      }
      // TODO - test me!!!
      repeat(time, fn, ...args) {
          function repeat_fn() {
              fn.call(this, time, ...args);
              this.scheduler.push(repeat_fn.bind(this), time);
          }
          this.scheduler.push(repeat_fn.bind(this), time);
      }
  }
  function loadLevel(level, data, tiles) {
      level.fill("NONE");
      for (let y = 0; y < data.length; ++y) {
          const line = data[y];
          for (let x = 0; x < line.length; ++x) {
              const ch = line[x];
              const tile = tiles[ch] || "NONE";
              level.setTile(x, y, tile);
          }
      }
  }
  room.install("ENTRANCE", new room.BrogueEntrance());
  room.install("ROOM", new room.Rectangular());
  room.install("BIG_ROOM", new room.Rectangular({ width: "10-20", height: "5-10" }));
  room.install("CROSS", new room.Cross({ width: "8-12", height: "5-7" }));
  room.install("SYMMETRICAL_CROSS", new room.SymmetricalCross({
      width: "8-10",
      height: "5-8",
  }));
  room.install("SMALL_ROOM", new room.Rectangular({
      width: "6-10",
      height: "4-8",
  }));
  room.install("LARGE_ROOM", new room.Rectangular({
      width: "15-20",
      height: "10-20",
  }));
  room.install("HUGE_ROOM", new room.Rectangular({
      width: "20-30",
      height: "20-30",
  }));
  room.install("SMALL_CIRCLE", new room.Circular({
      width: "4-6",
      height: "4-6",
  }));
  room.install("LARGE_CIRCLE", new room.Circular({
      width: 10,
      height: 10,
  }));
  room.install("BROGUE_DONUT", new room.BrogueDonut({
      width: 10,
      height: 10,
      ringMinWidth: 3,
      holeMinSize: 3,
      holeChance: 50,
  }));
  room.install("COMPACT_CAVE", new room.Cavern({
      width: 12,
      height: 8,
  }));
  room.install("LARGE_NS_CAVE", new room.Cavern({
      width: 12,
      height: 27,
  }));
  room.install("LARGE_EW_CAVE", new room.Cavern({
      width: 27,
      height: 8,
  }));
  room.install("BROGUE_CAVE", new room.ChoiceRoom({
      choices: ["COMPACT_CAVE", "LARGE_NS_CAVE", "LARGE_EW_CAVE"],
  }));
  room.install("HUGE_CAVE", new room.Cavern({ width: 77, height: 27 }));
  room.install("CHUNKY", new room.ChunkyRoom({
      width: 10,
      height: 10,
  }));
  room.install("PROFILE", new room.ChoiceRoom({
      choices: {
          ROOM: 10,
          CROSS: 20,
          SYMMETRICAL_CROSS: 20,
          LARGE_ROOM: 5,
          SMALL_CIRCLE: 10,
          LARGE_CIRCLE: 5,
          BROGUE_DONUT: 5,
          CHUNKY: 10,
      },
  }));
  room.install("FIRST_ROOM", new room.ChoiceRoom({
      choices: {
          ROOM: 5,
          CROSS: 5,
          SYMMETRICAL_CROSS: 5,
          LARGE_ROOM: 5,
          HUGE_ROOM: 5,
          LARGE_CIRCLE: 5,
          BROGUE_DONUT: 5,
          BROGUE_CAVE: 30, // These are harder to match
          HUGE_CAVE: 30, // ...
          ENTRANCE: 5,
          CHUNKY: 5,
      },
  }));
  function digLevel(level, dig, seed = 12345) {
      level.depth < 2 ? "ENTRANCE" : "FIRST_ROOM";
      const digger = new Digger(dig);
      digger.seed = seed;
      digger.create(level.width, level.height, (x, y, v) => {
          level.setTile(x, y, v);
      });
      index$1.analyze(level);
      level.locations = digger.locations;
  }

  const kinds = {};
  // @ts-ignore
  globalThis.LevelKinds = kinds;
  function makeKind(cfg) {
      const kind = Object.assign({
          id: "",
          tick_time: 50, // TODO - Is this a good default?
          on: {},
          data: {},
          scene: "level",
          scene_opts: {},
      }, cfg);
      if (!kind.id || kind.id.length === 0) {
          throw new Error("LevelKind must have 'id'.");
      }
      if (kind.layout) {
          const data = kind.layout.data;
          if (!data || !kind.layout.tiles)
              throw new Error("LevelKind 'layout' field must have 'data' and 'tiles'.");
          const h = data.length;
          const w = data[0].length;
          if (kind.width != w) {
              console.log("Changing LevelKind width to match 'layout' dimensions.");
              kind.width = w;
          }
          if (kind.height != h) {
              console.log("Changing LevelKind height to match 'layout' dimensions.");
              kind.height = h;
          }
      }
      else {
          kind.dig = kind.dig || {};
          // Is the default dig a good idea?
          kind.dig = utils.mergeDeep(
          // This is the default dig
          {
              rooms: { count: 20, first: "FIRST_ROOM", digger: "PROFILE" },
              doors: false, // { chance: 50 },
              halls: { chance: 50 },
              loops: { minDistance: 30, maxLength: 5 },
              lakes: false /* {
            count: 5,
            wreathSize: 1,
            wreathChance: 100,
            width: 10,
            height: 10,
          },
          bridges: {
            minDistance: 10,
            maxLength: 10,
          }, */,
              stairs: {
                  start: "down",
                  up: true,
                  upTile: "UP_STAIRS_INACTIVE",
                  down: true,
              },
              goesUp: true,
          }, 
          // Whatever you pass in overrides this
          kind.dig);
      }
      return kind;
  }
  function install$2(...args) {
      let id, config;
      if (args.length == 1) {
          config = args[0];
          id = config.id;
      }
      else {
          id = args[0];
          config = args[1];
      }
      const kind = makeKind(config);
      kind.id = id;
      kinds[id.toLowerCase()] = kind;
      return kind;
  }
  function getKind(id) {
      return kinds[id.toLowerCase()] || null;
  }

  class LevelFactory {
      plugins = [];
      use(plugin) {
          this.plugins.push(plugin);
      }
      make(game, id, kind, opts) {
          let level;
          if (opts.on && opts.on.make) {
              level = opts.on.make(game, id, kind, opts);
          }
          else {
              const makePlugin = this.plugins.find((p) => typeof p.make === "function");
              if (makePlugin) {
                  level = makePlugin.make(game, id, kind, opts);
              }
              else {
                  level = new Level(game, id, kind);
              }
          }
          this.apply(level);
          level.create(kind, opts);
          return level;
      }
      apply(level) {
          this.plugins.forEach((p) => {
              Object.entries(p).forEach(([key, val]) => {
                  if (key === "on") {
                      Object.entries(val).forEach(([k2, v2]) => {
                          if (typeof v2 === "function") {
                              level.on(k2, v2);
                          }
                          else {
                              console.warn("Invalid 'on' member in Item plugin: " + k2);
                          }
                      });
                  }
                  else if (key === "data") {
                      Object.assign(level.data, val);
                  }
                  else if (typeof val === "function") {
                      level.on(key, val);
                  }
                  else {
                      console.warn("Invalid member of Item plugin: " + key);
                  }
              });
          });
      }
  }
  const factory$1 = new LevelFactory();
  function use$1(plugin) {
      factory$1.use(plugin);
  }
  function make$1(game, id, kind, opts) {
      if (typeof kind === "string") {
          const id = kind;
          kind = getKind(id);
          if (!kind)
              throw new Error("Failed to find LevelKind: " + id);
      }
      return factory$1.make(game, id, kind, opts);
  }

  class Game {
      hero;
      app;
      // scene: GWU.app.Scene;
      level;
      levels;
      _levelObjs;
      start_level;
      // depth: number;
      // scheduler: GWU.scheduler.Scheduler;
      inputQueue;
      seed;
      rng;
      seeds;
      messages;
      events;
      needInput = false;
      actors;
      items;
      hordes;
      // TODO - tiles: ...
      keymap = {};
      data = {};
      constructor(app) {
          this.app = app;
          // this.scene = null;
          // this.level = null;
          // this.depth = 0;
          // this.scheduler = new GWU.scheduler.Scheduler();
          this.rng = rng.random; // Can access here or via GWU.rng.random
          this.seed = 0;
          this.seeds = {};
          this.levels = { default: { kind: "DEFAULT" } };
          this._levelObjs = {};
          this.start_level = 1;
          // Exposes types to world
          this.actors = kinds$2;
          this.items = kinds$3;
          this.hordes = hordes;
          //
          // TODO - Should be a reference or a copy?
          this.data = app.data; // GWU.utils.mergeDeep(this.data, app.data);
          // this.hero = ACTOR.Hero.make("HERO") as Hero;
          this.inputQueue = new index.Queue();
          this.messages = new message.Cache({ reverseMultiLine: true });
          this.events = new index.Events(this);
      }
      _create(opts) {
          // SEED
          if (typeof opts.seed === "number" && opts.seed > 0) {
              this.seed = opts.seed;
          }
          else {
              this.seed = this.rng.int(100000);
          }
          console.log("GAME, seed=", this.seed);
          this.rng.seed(this.seed);
          // LEVELS
          Object.assign(this.levels, opts.levels || {});
          if (opts.start_level) {
              this.start_level = opts.start_level;
          }
          // KEYMAP
          // TODO - move to default plugin
          this.keymap = Object.assign({
              a: "attack",
              f: "fire",
              g: "pickup",
              i: (level, e) => {
                  console.log(">> INVENTORY <<");
                  // TODO - Set focus to the player so that it shows their info
                  //      - Send event to level scene?
                  level.emit("inventory", level.game);
                  e.stopPropagation();
              },
              // z: (level: Level, e) => {
              //   ACTOR.spawn(game.level!, "zombie", game.hero.x, game.hero.y);
              //   game.level.needsDraw = true;
              //   e.stopPropagation();
              // },
              " ": "idle",
              ".": "idle",
              ">": (level, e) => {
                  // find stairs
                  let loc = [-1, -1];
                  level.tiles.forEach((t, x, y) => {
                      const tile = tilesByIndex[t];
                      if (tile.id === "UP_STAIRS" || tile.id === "UP_STAIRS_INACTIVE") {
                          loc[0] = x;
                          loc[1] = y;
                      }
                  });
                  // set player goal
                  if (loc[0] >= 0) {
                      level.game.hero.setGoal(loc[0], loc[1]);
                  }
                  level.scene.needsDraw = true;
                  e.stopPropagation();
              },
              "<": (level, e) => {
                  // find stairs
                  let loc = [-1, -1];
                  level.tiles.forEach((t, x, y) => {
                      const tile = tilesByIndex[t];
                      if (tile.id === "DOWN_STAIRS") {
                          loc[0] = x;
                          loc[1] = y;
                      }
                  });
                  // set player goal
                  if (loc[0] >= 0) {
                      level.game.hero.setGoal(loc[0], loc[1]);
                  }
                  level.scene.needsDraw = true;
                  e.stopPropagation();
              },
              dir: (level, e) => {
                  // @ts-ignore
                  moveDir(level, level.game.hero, e.dir);
                  level.scene.needsDraw = true;
                  e.stopPropagation();
              },
              Enter: (level, e) => {
                  const hero = level.game.hero;
                  if (hero.goalPath && hero.goalPath.length) {
                      hero.followPath = true;
                      hero.act(level);
                  }
                  level.scene.needsDraw = true;
                  e.stopPropagation();
              },
              // keypress: (level: Level, e) => {
              //   let action = game.keymap[e.key];
              //   if (!action) return;
              //   if (typeof action === "function") {
              //     return action(level: Level, e);
              //   }
              //   let fn = ACTIONS.get(action);
              //   if (!fn) {
              //     console.warn(`Failed to find action: ${action} for key: ${e.key}`);
              //   } else {
              //     fn(game.level, game.hero);
              //     game.level.needsDraw = true;
              //   }
              // },
          }, opts.keymap || {});
          // CREATE HERO
          // EVENTS - There are no events on GameOpts!!!  Must use plugins
          // Object.entries(opts).forEach(([key, val]) => {
          //   if (typeof val === "function") {
          //     this.on(key, val);
          //   }
          // });
          // Object.entries(opts.on || {}).forEach(([key, val]) => {
          //   if (typeof val === "function") {
          //     this.on(key, val);
          //   }
          // });
          // HERO
          // TODO - move to default plugin
          let hero_cfg = opts.hero_kind || { kind: "HERO" };
          if (typeof hero_cfg === "string") {
              hero_cfg = { kind: hero_cfg };
          }
          this.hero = make$2(hero_cfg.kind, hero_cfg);
      }
      makeLevel(levelId, opts = {}) {
          let info = this.levels[levelId] ||
              this.levels["default"] || { kind: "DEFAULT" };
          if (typeof info === "string") {
              info = { kind: info };
          }
          const config = utils.mergeDeep(info, opts);
          const level = make$1(this, levelId, config.kind, config);
          level.on("show", (level) => {
              this.level = level;
          });
          this._levelObjs[levelId] = level;
          return level;
      }
      getLevel(levelId) {
          return this._levelObjs[levelId] || this.makeLevel(levelId);
      }
      // lose() {
      //   this.scene!.emit("lose", this);
      // }
      // win() {
      //   this.scene!.emit("win", this);
      // }
      //   input(e) {
      //     this.inputQueue.enqueue(e.clone());
      //     e.stopPropagation();
      //   }
      // keypress(e: GWU.app.Event) {
      //   this.inputQueue.enqueue(e.clone());
      //   e.stopPropagation();
      // }
      // click(e: GWU.app.Event) {
      //   this.inputQueue.enqueue(e.clone());
      //   e.stopPropagation();
      // }
      // tick(dt: number = 50) {
      //   this.level.tick(this, dt);
      //   this.level.wait(dt, () => this.tick(dt));
      // }
      endTurn(actor, time) {
          if (!actor.hasActed()) {
              actor.endTurn(this.level, time);
              this.level.scheduler.push(actor, time);
              // @ts-ignore
              if (actor === this.hero) {
                  this.needInput = false;
              }
          }
          else {
              console.log("double end turn.!");
          }
      }
      // wait(time: number, fn: GWU.app.CallbackFn) {
      //   this.level.scheduler.push(fn, time);
      // }
      addMessage(msg) {
          this.messages.add(msg);
          // TODO - Is this necessary?
          if (!!this.level && !!this.level.scene) {
              // this.level.scene.get("MESSAGES")!.draw(this.level.scene.buffer);
              this.level.scene.needsDraw = true;
          }
      }
      on(...args) {
          if (args.length == 1) {
              return this.events.on(args[0]);
          }
          return this.events.on(args[0], args[1]);
      }
      once(event, fn) {
          return this.events.once(event, fn);
      }
      emit(event, ...args) {
          return this.events.emit(event, ...args);
      }
  }
  // export function startLevel(levelId: string | number): Level {
  //     // this.depth += 1;
  //     // this.scheduler.clear();
  //     let level = this._levelObjs[levelId] || this.makeLevel(levelId);
  //     // let level = LEVEL.levels.find((l) => l.depth === this.depth);
  //     if (!level) {
  //       console.error("Failed to start level: " + levelId);
  //       GWU.app.active.stop();
  //       return;
  //     }
  //     // LEVEL.levels.push(level);
  //     // } else if (level.width != 60 || level.height != 35) {
  //     //   throw new Error(
  //     //     `Map for level ${this.level} has wrong dimensions: ${map.width}x${map.height}`
  //     //   );
  //     // }
  //     this.level = level;
  //     this.needInput = false;
  //     // @ts-ignore
  //     globalThis.LEVEL = level;
  //     // @ts-ignore
  //     globalThis.HERO = this.hero;
  //     const startRes = PLUGINS.trigger(
  //       "start_level",
  //       { game: this, level: level, sceneId: "level", startOpts: {} },
  //       (req: {
  //         game: Game;
  //         level: Level;
  //         sceneId: string;
  //         startOpts: GWU.app.SceneStartOpts;
  //       }): Result<{ scene: GWU.app.Scene }> => {
  //         let { sceneId, startOpts } = req;
  //         startOpts = startOpts || {};
  //         startOpts.game = req.game;
  //         startOpts.level = req.level;
  //         const scene = GWU.app.active.scenes.start(sceneId, startOpts);
  //         req.level.show(req.game, scene);
  //         return Result.Ok({ scene });
  //       }
  //     );
  //     if (startRes.isErr()) {
  //       console.error("Failed to start level: " + startRes.unwrapErr());
  //       GWU.app.active.stop();
  //       return;
  //     }
  //   }
  // export function start(config: GameOpts = {}): Game {
  //   const game = PLUGINS.make(config);
  //   const resMake = PLUGINS.trigger("make_game", { config }, (config) => {
  //     const game = new Game();
  //     game.create(config);
  //     return Result.Ok(game);
  //   });
  //   resMake.expect("Failed to make Game");
  //   const game = resMake.unwrap();
  //   if (!game.hero) {
  //     console.log("Making default Hero: HERO");
  //     game.hero = Hero.make("HERO");
  //   }
  //   return game;
  // }

  const title = {
      create() {
          this.bg = index$9.from("dark_gray");
          const build = new index$1$1.Builder(this);
          build.pos(10, 15).text(this.app.name, { fg: "green" });
          build.pos(10, 30).text("Press any key to start.");
          build.pos(10, 32).text("Press s to enter seed.");
          build.pos(10, 34).text("Press h for help.");
          // Press 's' to choose a seed and start a game
          this.on("s", (e) => {
              const prompt = this.app.prompt("What is your starting seed?", {
                  numbersOnly: true,
                  bg: index$9.BLACK.alpha(50),
              });
              // TODO - This should be something better than "stop"
              prompt.on("stop", (seed) => {
                  e.stopPropagation();
                  if (seed) {
                      // TODO - Should be GAME.start(...) -> b/c separating game make and start isn't a thing
                      const full_opts = utils.mergeDeep(this.app.data.start_opts, {
                          seed,
                      });
                      const game = make(this.app, full_opts);
                      const level = game.getLevel(game.start_level);
                      level.show();
                  }
              });
              e.stopPropagation();
          });
          // press 'h' for help
          this.on("h", (e) => {
              this.app.scenes.start("help");
              e.stopPropagation();
          });
          // Any 'other' key results in starting a new game with a random seed
          this.on("keypress", (e) => {
              // TODO - Should be GAME.start(...) -> b/c separating game make and start isn't a thing
              const full_opts = utils.mergeDeep(this.app.data.start_opts, {});
              const game = make(this.app, full_opts);
              const level = game.getLevel(game.start_level);
              level.show();
              e.stopPropagation();
          });
      },
  };

  const level = {
      create(opts) {
          this.bg = index$9.from("dark_gray");
          // const level = this;
          // TODO - Get these sizes and locations dynamically
          const sidebar$1 = sidebar(this, 60, 35);
          const flavor$1 = flavor(this, 0, 35);
          const messages$1 = messages(this, 36);
          const map$1 = map(this, 60, 35);
          const details$1 = details(this, 60, 35);
          sidebar$1.on("focus", (loc) => {
              loc = loc || [-1, -1];
              map$1._focus = loc;
              const level = this.data.level;
              const game = level.game;
              const hero = game.hero;
              if (loc[0] < 0) {
                  // game.level.clearPath();
                  hero.clearGoal();
              }
              else {
                  // highlight path
                  hero.setGoal(loc[0], loc[1]);
                  // const player = game.player;
                  // const path = player.pathTo(loc);
                  // game.level.setPath(path);
              }
              const actor = level.actorAt(loc[0], loc[1]);
              if (actor) {
                  details$1.hidden = false;
                  // @ts-ignore
                  if (actor === hero) {
                      details$1.showHero(hero);
                  }
                  else {
                      details$1.showActor(actor);
                  }
              }
              else {
                  details$1.hidden = true;
              }
          });
          sidebar$1.on("mouseleave", () => {
              details$1.hidden = true;
          });
          sidebar$1.on("choose", (loc) => {
              console.log("sidebar choose - hero go to :", loc[0], loc[1]);
              const level = this.data.level;
              const game = level.game;
              game.hero.setGoal(loc[0], loc[1]);
              game.hero.followPath = true;
              game.hero.act(level);
          });
          messages$1.on("click", (e) => {
              const level = this.data.level;
              const game = level.game;
              if (game.messages.length > 10) {
                  this.app.scenes.run("archive", {
                      messages: game.messages,
                      startHeight: 10,
                  });
              }
              e.stopPropagation();
          });
          map$1.on("mousemove", (e) => {
              const level = this.data.level;
              const game = level.game;
              const text = level.getFlavor(e.x, e.y);
              flavor$1.prop("text", text);
              sidebar$1.setFocus(e.x, e.y);
              if (!level.started)
                  return;
              // highlight path
              const hero = game.hero;
              hero.setGoal(e.x, e.y);
              // const path = player.pathTo(e);
              // game.level.setPath(path);
          });
          map$1.on("mouseleave", (e) => {
              const level = this.data.level;
              const game = level.game;
              sidebar$1.clearFocus();
              // game.level.clearPath();
              game.hero.clearGoal();
          });
          map$1.on("click", (e) => {
              console.log("map click - player go to:", e.x, e.y);
              const level = this.data.level;
              const game = level.game;
              if (!level.started)
                  return;
              // TODO - This should follow the enqueue path..
              game.hero.setGoal(e.x, e.y);
              game.hero.followPath = true;
              game.hero.act(level);
          });
      },
      start(opts) {
          this.data.level = opts.level;
          this.needsDraw = true;
      },
      update(dt) {
          this.data.level.update(dt);
      },
      on: {
          // dir(e) {
          //   GAME.moveDir(this.data, this.data.player, e.dir);
          // },
          // a() {
          //   GAME.attack(this.data, this.data.player);
          // },
          // z() {
          //   ACTOR.spawn(this.data, "zombie", this.data.player.x, this.data.player.y);
          // },
          inventory() {
              const level = this.data.level;
              const game = level.game;
              const hero = game.hero;
              const sidebar = this.get("SIDEBAR");
              sidebar.setFocus(hero.x, hero.y);
          },
          // win(this: GWU.app.Scene) {
          //   const game = this.data.game as Game;
          //   game.messages.confirmAll();
          //   const LAST_LEVEL = this.app.data.get("LAST_LEVEL");
          //   if (this.data.level.depth === LAST_LEVEL) {
          //     this.app.scenes.start("win", this.data);
          //   } else {
          //     this.app.scenes.start("reward", this.data);
          //   }
          // },
          // lose(this: GWU.app.Scene) {
          //   this.app.scenes.start("lose", this.data);
          // },
          keypress(e) {
              const sidebar = this.get("SIDEBAR");
              sidebar.clearFocus();
              // this.data.level.clearPath();
              const level = this.data.level;
              const game = level.game;
              game.inputQueue.enqueue(e.clone());
              // if (e.key !== "Enter") {
              //   game.hero.clearGoal();
              // }
              // if (e.key == "Escape") {
              //   this.emit("lose"); // todo -- remove
              // }
              e.stopPropagation();
          },
          click(e) {
              const level = this.data.level;
              const game = level.game;
              game.inputQueue.enqueue(e.clone());
              e.stopPropagation();
          },
      },
  };

  const win = {
      create() {
          this.bg = index$9.from("dark_blue");
          const build = new index$1$1.Builder(this);
          build.pos(10, 15).text(this.app.name, { fg: "green" });
          build.pos(10, 17).text("WIN!", { fg: "green" });
          build.pos(10, 22).text("Final Level: {}", { fg: "pink", id: "LEVEL" });
          build.pos(10, 30).text("Press any key to restart.");
          this.on("keypress", () => {
              this.app.scenes.start("title");
          });
      },
      start(opts) {
          const level = opts.game.level;
          const id = level.depth || 1;
          const w = this.get("LEVEL");
          w.text("Final Level: " + id);
      },
  };

  const lose = {
      create() {
          this.bg = index$9.from("dark_gray");
          const build = new index$1$1.Builder(this);
          build.pos(10, 15).text(this.app.name, { fg: "green" });
          build.pos(10, 17).text("LOSE!", { fg: "green" });
          build.pos(10, 22).text("On Level: {}", { fg: "pink", id: "LEVEL" });
          build.pos(10, 24).text("{reason}", { fg: "pink", id: "REASON" });
          build.pos(10, 30).text("Press any key to restart.");
          this.on("keypress", () => {
              this.app.scenes.start("title");
          });
      },
      start(opts) {
          const id = opts.game.level.id || "???";
          const w = this.get("LEVEL");
          w.text("On Level: " + id);
          const r = this.get("REASON");
          r.text(opts.reason);
      },
  };

  const reward = {
      create() {
          this.bg = index$9.from("dark_gray");
          const build = new index$1$1.Builder(this);
          build.pos(5, 3).text(this.app.name, { fg: "green" });
          build
              .pos(5, 5)
              .text("Choose your reward \nfor Level: {}", { fg: "pink", id: "LEVEL" });
          const list = build
              .pos(5, 8)
              .datalist({ empty: "-", border: "ascii", id: "STUFF", width: 20 });
          //.text("REWARD", { fg: "green", id: "STUFF" });
          build
              .pos(5, 40)
              .text("Press <Enter> to choose your reward and go to the next level.");
          build.pos(30, 5).text("Armor", { id: "ARMOR", fg: "white" });
          build.pos(30, 16).text("Melee", { id: "MELEE", fg: "white" });
          build.pos(30, 27).text("Ranged", { id: "RANGED", fg: "white" });
          // this.on("Enter", () => {
          //   this.app.scenes.start("level", this.data.game);
          // });
          list.on("change", (e) => {
              const items = this.data.items;
              if (!this.data.equipped)
                  return;
              const used = [
                  null,
                  this.data.equipped.armor,
                  this.data.equipped.melee,
                  this.data.equipped.ranged,
              ];
              if (items) {
                  const item = items[e.row];
                  if (item) {
                      used[e.row] = item;
                  }
              }
              // update display
              const game = this.data.game;
              const a_text = this.get("ARMOR");
              const a_color = e.row == 1 ? "teal" : "white";
              a_text.text(`ARMOR:\n#{${a_color}}` + armor_text(used[1], game.hero.kind.health));
              const m_text = this.get("MELEE");
              const m_color = e.row == 2 ? "teal" : "white";
              m_text.text(`MELEE:\n#{${m_color}}` + melee_text(used[2]));
              const r_text = this.get("RANGED");
              const r_color = e.row == 3 ? "teal" : "white";
              r_text.text(`RANGED:\n#{${r_color}}` + ranged_text(used[3]));
          });
          list.on("action", () => {
              const items = this.data.items;
              const item = items[list.selectedRow];
              const game = this.data.game;
              if (item) {
                  console.log("list selection - " + item.name);
                  const player = game.hero;
                  player.equip(item);
                  game.addMessage(`You equip a ${item.name}`);
              }
              const level = game.getLevel(this.data.depth);
              level.show();
          });
      },
      start(opts) {
          const depth = opts.depth;
          const game = opts.game;
          const w = this.get("LEVEL");
          w.text("Choose your \nreward for Level: " + depth);
          const s = this.get("STUFF");
          const armor = random$1(game.level, "armor");
          const melee = random$1(game.level, "melee");
          const ranged = random$1(game.level, "ranged");
          armor.power = depth + game.rng.dice(1, 5);
          melee.power = depth + game.rng.dice(1, 5);
          ranged.power = depth + game.rng.dice(1, 5);
          const player = game.hero;
          const equipped = Object.entries(player.slots).reduce((o, current) => {
              o[current[0]] = current[1];
              return o;
          }, {});
          // depth + 1 to indicate that we are going to the next level
          this.data = {
              game,
              items: [null, armor, melee, ranged],
              equipped,
              depth: depth + 1, // NOTE: Adding 1 here so we always have the next level in mind!
          };
          s.data(["None", armor.name, melee.name, ranged.name]); // triggers - change
      },
  };
  function armor_text(armor, health = 10) {
      let text = armor.name + " [" + armor.power + "]\n";
      const defense = armor.defense + health;
      text += "  Health: " + defense + "\n";
      if (armor.kind.armor_flags != 0) {
          if (armor.kind.armor_flags & ARMOR_FLAGS.REDUCE_DAMAGE_35) {
              text += "  {-35% Damage Received}\n";
          }
          if (armor.kind.armor_flags & ARMOR_FLAGS.NEGATE_HITS_30) {
              text += "  {30% Negate Hits}\n";
          }
          if (armor.kind.armor_flags & ARMOR_FLAGS.ARTIFACT_COOLDOWN_40) {
              text += "  {-40% Artifact Cooldown}\n";
          }
          if (armor.kind.armor_flags & ARMOR_FLAGS.ARROWS_10) {
              text += "  {+10 Arrows Per Bundle}\n";
          }
          if (armor.kind.armor_flags & ARMOR_FLAGS.LONGER_ROLL_100) {
              text += "  {100% Longer Roll Cooldown}\n";
          }
          if (armor.kind.armor_flags & ARMOR_FLAGS.MELEE_DAMAGE_30) {
              text += "  {+30% Melee Damage}\n";
          }
          if (armor.kind.armor_flags & ARMOR_FLAGS.MOBS_TARGET_YOU_MORE) {
              text += "  {Mobs Target You More}\n";
          }
          if (armor.kind.armor_flags & ARMOR_FLAGS.MOVESPEED_AURA_15) {
              text += "  {+15% Move Speed Aura}\n";
          }
          if (armor.kind.armor_flags & ARMOR_FLAGS.POTION_COOLDOWN_40) {
              text += "  {-40% Potion Cooldown}\n";
          }
          if (armor.kind.armor_flags & ARMOR_FLAGS.POTION_BOOSTS_DEFENSE) {
              text += "  {Potion Boosts Defense}\n";
          }
          if (armor.kind.armor_flags & ARMOR_FLAGS.POTION_HEALS_NEARBY_ALLIES) {
              text += "  {Potion Heals Nearby Allies}\n";
          }
          if (armor.kind.armor_flags & ARMOR_FLAGS.RANGED_DAMAGE_30) {
              text += "  {+30% Ranged Damage}\n";
          }
          if (armor.kind.armor_flags & ARMOR_FLAGS.WEAPON_DAMAGE_AURA_20) {
              text += "  {+20% Weapon Damage Aura}\n";
          }
      }
      return text;
  }
  function melee_text(melee) {
      let text = melee.name + " [" + melee.power + "]\n";
      text += "  Attack: " + melee.damage + " / " + melee.speed + "\n";
      text +=
          "  Combo : " +
              melee.comboDamage +
              " / " +
              melee.comboSpeed +
              " % " +
              melee.combo +
              "\n";
      if (melee.kind.melee_flags != 0) ;
      return text;
  }
  function ranged_text(ranged) {
      let text = ranged.name + " [" + ranged.power + "]\n";
      text +=
          "  Attack: " +
              ranged.damage +
              " / " +
              ranged.speed +
              " @ " +
              ranged.range +
              "\n";
      if (ranged.charge > 0) {
          text += "  Charge: " + ranged.charge + "\n";
      }
      if (ranged.kind.ranged_flags != 0) ;
      return text;
  }

  const help = {
      create() {
          this.bg = index$9.from("dark_gray");
          const build = new index$1$1.Builder(this);
          build.pos(10, 15).text(this.app.name, { fg: "green" });
          build.pos(10, 17).text("HELP!", { fg: "green" });
          build.pos(10, 30).text("Press any key to return to title.");
          this.on("keypress", () => {
              this.app.scenes.start("title");
          });
      },
  };

  const TargetScene = {
      start(data) {
          // const game = data.game;
          // const actor = data.actor;
          // const targets = data.targets;
          this.data = data;
          this.data.current = 0;
          this.bg = index$9.NONE;
          this.needsDraw = false;
          this.buffer.nullify();
          let current = this.data.targets[this.data.current];
          const mixer = this.app.buffer.get(current.x, current.y).clone().swap();
          this.buffer.drawSprite(current.x, current.y, mixer);
          console.log("target", current.x, current.y);
      },
      on: {
          dir(e) {
              if (!e.dir)
                  return;
              let current = this.data.targets[this.data.current];
              this.buffer.nullify(current.x, current.y);
              if (e.dir[0] > 0) {
                  this.data.current += 1;
              }
              else if (e.dir[0] < 0) {
                  this.data.current -= 1;
              }
              else if (e.dir[1] > 0) {
                  this.data.current += 1;
              }
              else if (e.dir[1] < 0) {
                  this.data.current += 1;
              }
              if (this.data.current < 0) {
                  this.data.current = this.data.targets.length - 1;
              }
              else if (this.data.current >= this.data.targets.length) {
                  this.data.current = 0;
              }
              current = this.data.targets[this.data.current];
              console.log("target", current.x, current.y);
              const mixer = this.app.buffer.get(current.x, current.y).clone().swap();
              this.buffer.drawSprite(current.x, current.y, mixer);
          },
          Enter() {
              this.stop(this.data.targets[this.data.current]);
          },
          Escape() {
              this.stop(null);
          },
          keypress(e) {
              e.stopPropagation();
          },
          click(e) {
              e.stopPropagation();
          },
          mousemove(e) {
              e.stopPropagation();
          },
      },
  };
  index.installScene("target", TargetScene);

  const archive = {
      bg: index$9.BLACK.alpha(50),
      start(source) {
          this.data.messages = source.messages;
          this.data.shown = source.startHeight;
          this.data.startHeight = source.startHeight;
          this.data.mode = "forward";
          this.data.totalCount = source.messages.length;
          source.messages.confirmAll();
          this.wait(16, () => forward(this));
      },
      draw(buf) {
          drawArchive(this);
      },
      keypress(e) {
          next(this);
          e.stopPropagation();
      },
      click(e) {
          next(this);
          e.stopPropagation();
      },
  };
  // @ts-ignore
  index.installScene("archive", archive);
  function next(scene) {
      if (scene.data.mode === "ack") {
          scene.data.mode = "reverse";
          scene.needsDraw = true;
          if (scene.data.timerCancel) {
              scene.data.timerCancel();
          }
          scene.data.timerCancel = scene.wait(16, () => reverse(scene));
      }
      else if (scene.data.mode === "reverse") {
          scene.stop();
      }
      else {
          scene.data.mode = "ack";
          scene.data.shown = scene.data.totalCount;
          if (scene.data.timerCancel) {
              scene.data.timerCancel();
              scene.data.timerCancel = null;
          }
          scene.needsDraw = true;
      }
  }
  function forward(scene) {
      // console.log('forward');
      ++scene.data.shown;
      scene.data.timerCancel = null;
      scene.needsDraw = true;
      if (scene.data.shown < scene.data.totalCount) {
          scene.data.timerCancel = scene.wait(16, () => forward(scene));
      }
      else {
          scene.data.mode = "ack";
          scene.data.shown = scene.data.totalCount;
      }
  }
  function reverse(scene) {
      // console.log('reverse');
      --scene.data.shown;
      scene.data.timerCancel = null;
      if (scene.data.shown <= scene.data.startHeight) {
          scene.stop();
      }
      else {
          scene.needsDraw = true;
          scene.data.timerCancel = scene.wait(16, () => reverse(scene));
      }
  }
  function drawArchive(scene) {
      let fadePercent = 0;
      const dbuf = scene.buffer;
      const fg = index$9.from("white");
      const bg = index$9.from("black");
      // const dM = reverse ? -1 : 1;
      // const startM = reverse ? totalMessageCount : scene.bounds.height;
      // const endM = reverse
      //     ? scene.bounds.height + dM + 1
      //     : totalMessageCount + dM;
      const startY = scene.height - scene.data.shown;
      const endY = scene.height - 1;
      const dy = 1;
      dbuf.fillRect(0, Math.min(startY, endY), scene.width, scene.data.shown, " ", bg, bg);
      scene.data.messages.forEach((line, _confirmed, j) => {
          const y = startY + j * dy;
          if (y > endY)
              return;
          fadePercent = Math.floor((50 * j) / scene.data.shown);
          const fgColor = fg.mix(scene.bg, fadePercent);
          dbuf.drawText(0, y, line, fgColor, bg);
      });
      if (scene.data.mode === "ack") {
          const y = dbuf.height - 1;
          const x = dbuf.width - 8; // But definitely on the screen - overwrite some text if necessary
          dbuf.wrapText(x, y, 8, "--DONE--", bg, fg);
      }
  }

  class GameFactory {
      plugins = [];
      use(plugin) {
          this.plugins.push(plugin);
      }
      make(app, opts = {}) {
          let game;
          const makePlugin = this.plugins.find((p) => typeof p.make === "function");
          if (makePlugin) {
              game = makePlugin.make(app, opts);
          }
          else {
              game = new Game(app);
          }
          this.apply(game);
          game._create(opts);
          game.emit("create", game, opts);
          globalThis.GAME = game;
          return game;
      }
      apply(game) {
          this.plugins.forEach((p) => {
              Object.entries(p).forEach(([key, val]) => {
                  if (typeof val === "function") {
                      game.on(key, val);
                  }
                  else {
                      console.warn("Invalid member of 'game' events on plugin: " + key);
                  }
              });
          });
      }
  }
  const factory = new GameFactory();
  function use(plugin) {
      factory.use(plugin);
  }
  function make(app, opts) {
      const game = factory.make(app, opts);
      return game;
  }

  const plugins = {};
  const active = [];
  // @ts-ignore
  globalThis.PLUGINS = plugins;
  function install$1(...args) {
      let plugin;
      let name;
      if (args.length == 1) {
          plugin = args[0];
          name = plugin.name;
      }
      else {
          plugin = Object.assign({
              name: args[0],
              plugins: [],
          }, args[0]);
          if (plugin.name != name) {
              plugin.name = name;
          }
      }
      plugins[name.toLowerCase()] = plugin;
  }
  function getPlugin(id) {
      return plugins[id.toLowerCase()] || null;
  }
  function startPlugins(app, ...names) {
      names.forEach((name) => {
          // if already started, ignore
          if (!active.find((p) => p.name == name)) {
              const plugin = getPlugin(name);
              if (plugin) {
                  console.log("Starting plugin: " + name);
                  // start dependencies
                  if (plugin.plugins.length) {
                      startPlugins(app, ...plugin.plugins);
                  }
                  // install factory plugins
                  if (plugin.game) {
                      use(plugin.game);
                  }
                  if (plugin.actor) {
                      use$3(plugin.actor);
                  }
                  if (plugin.hero) {
                      use$2(plugin.hero);
                  }
                  if (plugin.item) {
                      use$4(plugin.item);
                  }
                  if (plugin.level) {
                      use$1(plugin.level);
                  }
                  // Start the plugin
                  if (plugin.app && plugin.app.start) {
                      plugin.app.start(app);
                  }
                  active.push(plugin);
              }
              else {
                  console.error(`MISSING PLUGIN: ${name}`);
              }
          }
      });
  }

  function startApp(config) {
      const appOpts = utils.mergeDeep({
          name: "Goblinwerks",
          width: 90,
          height: 45,
          div: "game",
          scenes: {
              title: title,
              level: level,
              win: win,
              lose: lose,
              help: help,
              reward: reward,
          },
          scene: "title",
          plugins: [],
      }, config);
      // make the App
      // - default is to start the app which will start the "title" scene
      // - the title screen will make and start a new game
      // - starting a game will make the default level
      // - ... and then start the level kind's screen with that level
      const app = index.make(appOpts);
      // This will be used when we start the game
      app.data.start_opts = config;
      // Start Plugins...
      startPlugins(app, ...config.plugins);
      return app;
  }

  install$6("potion", (level, actor) => {
      if (!actor.isHero)
          return false;
      if (actor.data.potion < actor.data.potion_max) {
          level.game.addMessage("Not ready.");
          // TODO - spend time? idle?
          return false;
      }
      // TODO - potion_heals_nearby
      if (actor.health >= actor.health_max) {
          // TODO - check for nearby
          level.game.addMessage("You do not need to drink a potion.");
          // TODO - spend time? idle?
          return false;
      }
      // TODO - potion_boosts_defense
      // adds {iron} status?
      const heal = Math.floor(actor.health_max * 0.75);
      actor.health = Math.min(actor.health + heal, actor.health_max);
      actor.data.potion = 0; // Needs to recharge
      level.game.addMessage("You drink a #{blue potion}.");
      level.game.endTurn(actor, actor.moveSpeed);
      return true;
  });
  install$1("potion", {
      game: {
          create(game) {
              game.keymap["p"] = "potion";
          },
      },
      hero: {
          create(hero, opts) {
              hero.data.potion_max = 40 * 100; // 40 moves
              hero.data.potion = hero.data.potion_max;
          },
          tick: (level, hero, time) => {
              let rate = Math.round(100 * Math.pow(0.85, hero.data.potion_cooldown || 0));
              hero.data.potion = Math.min(hero.data.potion + Math.round((time * 100) / rate), hero.data.potion_max);
          },
          sidebar: (hero, entry) => {
              entry.add_progress("Potion", "blue", hero.data.potion, hero.data.potion_max);
          },
      },
  });

  function install(name, enchant = {}) {
      Object.assign({
          apply(actor, level) {
              actor.data[name] = level;
          },
          unapply(actor) {
              actor.data[name] = 0;
          },
          actor: {},
          item: {},
      }, enchant);
  }

  // Plugin - Enchant related
  // apply_actor_enchant, unapply_actor_enchant
  // apply_item_enchant, unapply_item_enchant
  // equip, unequip, drop, pickup
  // make_item, destroy_item
  // make_actor, destroy_actor (death?)
  install("artifact_cooldown", {
      apply(actor, level) {
          // TODO - this is read in the end_turn handler of the hero to adjust artifact cooldown recovery
          actor.data.artifact_cooldown = level;
      },
      unapply(actor) {
          actor.data.artifact_cooldown = 0;
      },
  });
  install("bonus_arrows" // {
  //   apply(actor: Actor, level: number) {
  //     // This is read by the pickup of the ARROWS item to determine how many arrows are gained.
  //     actor.data.bonus_arrows = level;
  //   },
  //   unapply(actor: Actor) {
  //     actor.data.bonus_arrows = 0;
  //   },
  // }
  );
  install("roll_cooldown");
  /*

      // PLUGIN - Roll
          - keypress - 'r'
              - initiate roll
          
          - start
              - add action - "roll"
              - add keypress - 'r'
              - add enchant - ROLL_COOLDOWN

          - spawn_actor
              - add roll cooldown data

      // ACTION - roll
          - figure this out...
  */
  install("melee_damage", {
      actor: {
          attack(target, damage) {
              if (damage.isRanged) {
                  return;
              }
              const baseAmount = damage.amount || 0;
              const level = this.data.melee_damage || 0;
              damage.amount = Math.round((baseAmount * (100 + 10 * level)) / 100);
          },
      },
  });
  /*

    MOBS_TARGET_YOU_MORE = fl(4), // increases notice distance for all mobs?
      - apply
          - add "equip"
              - adjust notice bonus/penalty (global?)
          - add "unequip"
              - notice bonus/penalti auto-calculates
      - unapply
          - remove triggers

    // add ?? MOBS_AVOID_YOU_MORE ??
      - apply
          - add "equip"
              - adjust notice bonus/penalty (global?)
          - add "unequip"
              - notice bonus/penalti auto-calculates
      - unapply
          - remove triggers

  */
  install("negate_hits", {
      actor: {
          damage(source, damage) {
              let chance = 100 - Math.round(100 * Math.pow(0.9, this.data.negate_hits || 0));
              if (rng.random.chance(chance)) {
                  damage.amount = 0;
                  // TODO - Update msg or set flag for logging...
              }
          },
      },
  });
  // Handled by potion plugin
  install("potion_cooldown");
  // Handled by potion plugin
  install("potion_boosts_defense");
  // Handled by potion plugin
  install("potion_heals_nearby");
  /*
    MOVESPEED_AURA_15 = fl(5),
      - apply
          - add "equip"
              - adjust movespeed
          - add "unequip"
              - movespeed auto-calculates
      - unapply
          - remove triggers

    RANGED_DAMAGE_30 = fl(10),
      - apply
          - add "attack"  << params tell us it is ranged
              - add 30% to ranged
      - unapply
          - remove "attack"

    REDUCE_DAMAGE_35 = fl(11),
      - apply
          - add "damage"
              - reduce 35%
      - unapply
          - remove "damage"

    WEAPON_DAMAGE_AURA_20 = fl(12), // both melee and ranged
      - apply
          - add "attack"
              - increase 20%
      - unapply
          - remove "attack"
  */

  function start() {
      install$2({
          id: "TOWER",
          width: 60,
          height: 35,
          scene: "level",
          on: {
              create(level, opts) {
                  console.log("TOWER LEVEL CREATE");
                  const depth = (level.data.depth = parseInt(level.id.toString()));
                  if (level.kind.data.waves && level.kind.data.waves.length > 0) {
                      level.data.waves = level.kind.data.waves;
                  }
                  else {
                      level.data.waves = [];
                      for (let i = 0; i < depth; ++i) {
                          level.data.waves.push({
                              delay: 500 + i * 2000,
                              power: depth * 2 - 1 + level.rng.dice(1, 3),
                              horde: { depth: depth },
                          });
                      }
                  }
                  level.data.wavesLeft = level.data.waves.length;
              },
              show(level, scene) {
                  // put player in starting location
                  let startLoc = level.locations.start || [
                      Math.floor(level.width / 2),
                      Math.floor(level.height / 2),
                  ];
                  // TODO - this should be an Option<Loc>
                  startLoc = level.rng.matchingLocNear(startLoc[0], startLoc[1], (x, y) => level.hasTile(x, y, "FLOOR"));
                  // TODO - if (startLoc.isNone()) { return GWU.Result.Err("Failed to find starting location for Hero on level: " + level.id); }
                  // TODO - let res = next(req);
                  // TODO - if (res.isErr()) { return res; }
                  level.game.hero.clearGoal();
                  // TODO - real time flash, then do all of this...
                  // @ts-ignore
                  spawn(level, level.game.hero, startLoc[0], startLoc[1]);
                  level.data.wavesLeft = level.data.waves.length;
                  level.data.waves.forEach((wave) => {
                      console.log("WAVE - " + wave.delay);
                      level.wait(wave.delay || 0, () => {
                          let horde = null;
                          if (wave.horde) {
                              if (typeof wave.horde === "string") {
                                  horde = from(wave.horde);
                              }
                              else {
                                  wave.horde.depth = wave.horde.depth || level.depth;
                                  horde = random(wave.horde);
                              }
                          }
                          else {
                              horde = random({ depth: level.depth });
                          }
                          if (!horde) {
                              throw new Error("Failed to get horde: " + JSON.stringify(wave.horde));
                          }
                          const leader = horde.spawn(level, wave);
                          if (!leader)
                              throw new Error("Failed to place horde!");
                          leader.once("add", () => {
                              --level.data.wavesLeft;
                          });
                      });
                  });
                  if (level.welcome) {
                      level.game.addMessage(level.welcome);
                  }
              },
              tick(level, dt) {
                  // Do we have work left to do on the level?
                  if (level.done || !level.started)
                      return;
                  if (level.data.wavesLeft > 0)
                      return;
                  if (level.actors.length > 1)
                      return;
                  // win level
                  level.done = true;
                  if (level.proceed) {
                      level.game.addMessage(level.proceed);
                  }
                  const inactiveStairs = tilesByName["UP_STAIRS_INACTIVE"].index;
                  level.tiles.forEach((index, x, y) => {
                      if (index === inactiveStairs) {
                          flash(level, x, y, "yellow").then(() => {
                              level.setTile(x, y, "UP_STAIRS");
                          });
                      }
                  });
              },
              up_stairs(level, actor) {
                  const game = level.game;
                  const depth = level.data.depth;
                  if (depth >= game.data.LAST_LEVEL) {
                      game.app.scenes.start("win", { game });
                  }
                  else {
                      game.app.scenes.start("reward", { depth: depth, game });
                  }
              },
              lose(level, reason) {
                  const game = level.game;
                  game.app.scenes.start("lose", {
                      depth: level.data.depth,
                      game,
                      reason,
                  });
              },
          },
      });
      //   win(this: GWU.app.Scene) {
      //   const game = this.data.game as Game;
      //   const LAST_LEVEL = this.app.data.get("LAST_LEVEL");
      //   if (this.data.level.depth === LAST_LEVEL) {
      //     this.app.scenes.start("win", this.data);
      //   } else {
      //     this.app.scenes.start("reward", this.data);
      //   }
      // },
      // lose(this: GWU.app.Scene) {
      //   this.app.scenes.start("lose", this.data);
      // },
      // create the user interface
      const opts = {
          name: "Roguecraft: Tower",
          plugins: ["potion"],
          start_level: 1,
          data: { LAST_LEVEL: 10 },
          levels: { default: "TOWER" }, // TODO - Allow setting default without an object - e.g: levels: "TOWER",
          game: {
              create(game, opts) {
                  for (let i = 1; i <= game.data.LAST_LEVEL; ++i) {
                      const levelSeed = game.rng.number(100000);
                      game.seeds[i] = levelSeed;
                      console.log(`Level: ${i}, seed=${levelSeed}`);
                  }
              },
          },
      };
      startApp(opts);
  }
  globalThis.onload = start;
  // TODO - This should be in the gw-utils bundle
  // @ts-ignore
  globalThis.GWU = GWU;

})();
//# sourceMappingURL=bundle.js.map
