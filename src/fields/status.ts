export type StatusValues = Record<string, number>;
export type StatusOnValues = Record<string, boolean>;
export type StatusCbFn = (name: string) => void;
export type StatusCbFns = Record<string, StatusCbFn | null>;

/*
  // A Status object allows us to track the state
  // of various events.  It is mostly used on Beings.
  // Examples of status items would be:
  // * is the player currently flying?
  // * poisoned?
  // * confused?
  // * slowed?
  // * etc...
  // There are three ways that you can set a status...
  // 1) Set
  // 2) Counts
  // 3) Time
  // Each of these has a different way of being tracked and
  // adjusted.
  // A status is considered to be active if it is "truthy".
  // So you can check if something is set very easily by doing this:
  // if (being.status.flying) { ... }
  // -----
  // ON
  // -----
  // This is for when you want to set a status until further notice.
  // It is used for things like making the player fly as long as they
  // wear that ring of flying.
  // To turn on a status use:
  // RL.Status.setOn(being, <STATUS>, [DONE()]);
  // To turn off a status use:
  // RL.Status.setOff(being, STATUS>);
  // -----
  // COUNT
  // -----
  // This is for when a status can be activated or used a certain number
  // of times.  It allows you to track it in once place.
  // To set a count:
  // RL.Status.setCount(being, <STATUS>, count, [DONE()]);
  // To decrement/increment a count:
  // RL.Status.increment(being, <STATUS>, [count], [DONE()]);
  // RL.Status.decrement(being, <STATUS>, [count]);
  // -----
  // TIME
  // -----
  // This is for when a player gets someting for a limited time.
  // It is up to the game to determine how time progresses, but for
  // the default setting of "real-time", it is the numnber of milliseconds
  // of game time that the status is set.
  // To set:
  // RL.Status.setTime(being, <STATUS>, time, [DONE()]);
  // To add/remove:
  // RL.Status.addTime(being, <STATUS>, time, [DONE()]);
  // RL.Status.removeTime(being, <STATUS>, time);
  // As the game progresses, it will decay the time values of all
  // status variables automatically.  This will cause them to become unset
  // whenever the time elapses.  It is done with this call:
  // RL.Status.decayTime(being);
  //
   */
export class StatusTracker {
  _value: Record<string, number | boolean> = {};
  _set: StatusOnValues = {};
  _time: StatusValues = {};
  _count: StatusValues = {};
  _done: StatusCbFns = {};

  isActive(name: string): boolean {
    return !!this._value[name];
  }

  clear(name: string) {
    return this.clearCount(name) || this.clearTime(name);
  }

  /**
   * Sets the count for a this variable.
   * If setting the count turns on the status (it was off),
   * then this function returns true.  Otherwise, false.
   * The done variable is only set if there is no other done function
   * already for this status.
   * @param {string} name The name of the status to set.
   * @param {number} count The count to set.
   * @param {function} [done] The function to call whenever the count goes to 0.
   * @returns {boolean} Whether or not setting the count turned the status on.
   */
  setCount(name: string, count: number, done?: StatusCbFn) {
    this._count[name] = Math.max(count, this._count[name] || 0);
    if (done && !this._done[name]) {
      this._done[name] = done;
    }
    return this._update(name);
  }

  /**
   * Increments the count for the status by the given amount (1=default)
   * If incrementing the count turns on the status (it was off),
   * then this function returns true.  Otherwise, false.
   * The done variable is only set if there is no other done function
   * already for this status.
   * @param {string} name The name of the status to set.
   * @param {number} [count=1] The count to incrmeent.
   * @param {function} [done] The function to call whenever the count goes to 0.
   * @returns {boolean} Whether or not incrementing the count turned the status on.
   */
  increment(name: string, count = 1, done?: StatusCbFn) {
    if (typeof count == "function" && done === undefined) {
      done = count;
      count = 1;
    }
    this._count[name] = (this._count[name] || 0) + count;
    if (done && !this._done[name]) {
      this._done[name] = done;
    }
    return this._update(name);
  }

  /**
   * Decrements the count for the this by the given amount (1=default)
   * If decrementing the count turns off the status (it was on),
   * then this function returns true.  Otherwise, false.
   * Also, if the status is turned off, and a done function was set, then it
   * is called.
   * @param {string} name The name of the status to adjust.
   * @param {number} [count=1] The count to decrement.
   * @returns {boolean} Whether or not decrementing the count turned the status off.
   */
  decrement(name: string, count = 1) {
    this._count[name] = Math.max(0, (this._count[name] || 0) - count);
    return this._update(name);
  }

  /**
   * Clears all counts from the given status.
   * If clearing the count turns off the status (it was on),
   * then this function returns true.  Otherwise, false.
   * Also, if the status is turned off, and a done function was set, then it
   * is called.
   * @param {string} name The name of the status to adjust.
   * @returns {boolean} Whether or not decrementing the count turned the status off.
   */
  clearCount(name: string) {
    this._count[name] = 0;
    return this._update(name);
  }

  /**
   * Turns on the given status.
   * @param {string} name The status to adjust.
   * @param {function} [done] The function to call when the status is turned off.
   * @returns {boolean} True if this turns on the status. (It could be on because of a time or count).
   */
  setOn(name: string, done?: StatusCbFn) {
    this._set[name] = true;
    if (done && !this._done[name]) {
      this._done[name] = done;
    }
    return this._update(name);
  }

  /**
   * Turns off the given status.
   *
   * @param {string} name The status to adjust.
   * @returns {boolean} True if this turns off the status. (It could be on because of a time or count).
   */
  setOff(name: string) {
    this._set[name] = false;
    return this._update(name);
  }

  /**
   * Sets the time for a status variable.
   * If setting the time turns on the status (it was off),
   * then this function returns true.  Otherwise, false.
   * The done variable is only set if there is no other done function
   * already for this status.
   * @param {string} name The name of the status to set.
   * @param {number} time The time value to set.
   * @param {function} [done] The function to call whenever the status goes false.
   * @returns {boolean} Whether or not setting the time turned the status on.
   */
  setTime(name: string, value: number, done?: StatusCbFn) {
    const current = this._time[name] || 0;
    this._time[name] = Math.max(value, current);
    if (done && !this._done[name]) {
      this._done[name] = done;
    }
    return this._update(name);
  }

  /**
   * Adds to the time for a status variable.
   * If adding to the time turns on the status (it was off),
   * then this function returns true.  Otherwise, false.
   * The done variable is only set if there is no other done function
   * already for this status.
   * @param {string} name The name of the status to set.
   * @param {number} time The time value to add.
   * @param {function} [done] The function to call whenever the status goes false.
   * @returns {boolean} Whether or not adding the time turned the status on.
   */
  addTime(name: string, value = 1, done?: StatusCbFn) {
    if (typeof value == "function") {
      done = value;
      value = 1;
    }
    this._time[name] = (this._time[name] || 0) + value;
    if (done && !this._done[name]) {
      this._done[name] = done;
    }
    return this._update(name);
  }

  /**
   * Removes time for a status variable.
   * If removing to the time turns off the status (it was on),
   * then this function returns true.  Otherwise, false.
   * @param {string} name The name of the status to set.
   * @param {number} time The time value to remove.
   * @returns {boolean} Whether or not removing the time turned the status off.
   */
  removeTime(name: string, value = 1) {
    this._time[name] = Math.max(0, (this._time[name] || 0) - value);
    return this._update(name);
  }

  /**
   * Removes all time for a status variable.
   * If removing to the time turns off the status (it was on),
   * then this function returns true.  Otherwise, false.
   * @param {string} name The name of the status to set.
   * @returns {boolean} Whether or not removing the time turned the status off.
   */
  clearTime(name: string, delta = 1): boolean {
    this._time[name] = 0;
    return this._update(name);
  }

  /**
   * Removes time for all status variables that have time.
   * If removing the time turns off any status (it was on),
   * then this function returns an object with all of those statuses as keys and false as the values.  Otherwise, false.
   * @param {string} name The name of the status to set.
   * @returns {boolean|object} false or an object with the names of the statuses that were cleared as keys and false as the values.
   */
  decayAllTimes(delta = 1): StatusOnValues | false {
    const cleared: StatusOnValues = {};
    let noticed = false;
    for (let name in this._time) {
      if (this.removeTime(name, delta)) {
        noticed = true;
        cleared[name] = false;
      }
    }
    return noticed ? cleared : false;
  }

  /**
   * Updates the value of the status and returns whether or not this change
   * turned the status on or off (true = change, false = no change)
   * @param {Status|object} source The object to adjust the value on
   * @param {string} name The name of the status to update
   * @returns {boolean} True if the value was turned on or off, False otherwise.
   */
  _update(name: string) {
    let was = this._value[name] || 0;
    let value = (this._value[name] =
      this._set[name] || this._time[name] || this._count[name] || 0);
    if (was && !value) {
      const done = this._done[name];
      if (done) {
        done(name);
        this._done[name] = null;
      }
      // if (source.changed) source.changed({ status: { [name]: false }});
      // console.log('called changed: false');
      return true;
    } else if (!was && value) {
      // if (source.changed) source.changed({ status: { [name]: true }});
      // console.log('called changed: true');
      return true;
    }
    return false;
  }
}
