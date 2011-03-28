var Lucid;
Lucid = Lucid || {};

Lucid.Events = {
  bind: function (event, callback) {
    this._events_ = this.hasOwnProperty('_events_') ? this._events_ : {};
    this._events_[event] = this._events_[event] || [];
    this._events_[event].push(callback);
    return this;
  },

  trigger: function (name, data) {
    this._events_ = this.hasOwnProperty('_events_') ? this._events_ : {};
    var events = this._events_[name] || [];

    if (this.constructor.prototype._events_) {
      events = events.concat(this.constructor.prototype._events_[name] || []);
    }

    for (var i = 0; i < events.length; i++) {
      events[i].apply(this, data || []);
    }

    return this;
  },

  unbind: function (event, callback) {
    this._events_ = this._events_ || {};

    if (callback) {
      var events = this._events_[event] || [];

      for (var i = 0; i < events.length; i++) {
        if (events[i] === callback) {
          this._events_[event].splice(i, 1);
        }
      }
    } else {
      delete this._events_[event];
    }

    return this;
  }
};