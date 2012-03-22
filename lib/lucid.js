(function() {
  var Lucid, Util, moduleKeywords,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = Array.prototype.slice,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Lucid = this.Lucid = {};

  moduleKeywords = ['included', 'extended'];

  Util = {
    uniqueId: function(prefix) {
      this.idCounter || (this.idCounter = 0);
      return "" + prefix + (++this.idCounter);
    }
  };

  Lucid.Module = (function() {

    function Module() {}

    Module.include = function(obj) {
      var key, value, _ref;
      if (!obj) throw 'include(obj) requires obj';
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) this.prototype[key] = value;
      }
      if ((_ref = obj.included) != null) _ref.apply(this);
      return this;
    };

    Module.extend = function(obj) {
      var key, value, _ref;
      if (!obj) throw 'extend(obj) requires obj';
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) this[key] = value;
      }
      if ((_ref = obj.extended) != null) _ref.apply(this);
      return this;
    };

    return Module;

  })();

  Lucid.Events = (function() {

    Events.events = function() {
      if (!this.hasOwnProperty('_events_')) this._events_ = new Lucid.Events(this);
      return this._events_;
    };

    Events.bind = function() {
      var _ref;
      return (_ref = this.events()).bind.apply(_ref, arguments);
    };

    Events.one = function() {
      var _ref;
      return (_ref = this.events()).one.apply(_ref, arguments);
    };

    Events.trigger = function() {
      var _ref;
      return (_ref = this.events()).trigger.apply(_ref, arguments);
    };

    Events.unbind = function() {
      var _ref;
      return (_ref = this.events()).unbind.apply(_ref, arguments);
    };

    function Events(context) {
      this.context = context;
      this.callbacks = {};
    }

    Events.prototype.bind = function(events, callback) {
      var event, _base, _i, _len, _ref;
      _ref = events.split(' ');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        event = _ref[_i];
        (_base = this.callbacks)[event] || (_base[event] = []);
        this.callbacks[event].push(callback);
      }
      return this;
    };

    Events.prototype.one = function(event, callback) {
      var _this = this;
      return this.bind(event, function() {
        _this.unbind(event, arguments.callee);
        return callback.apply(_this.context, arguments);
      });
    };

    Events.prototype.trigger = function() {
      var args, callback, callbacks, event, _i, _len;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      callbacks = this.callbacks[event];
      if (!callbacks) return true;
      for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
        callback = callbacks[_i];
        if (callback.apply(this.context, args) === false) return false;
      }
      return true;
    };

    Events.prototype.unbind = function(event, callback) {
      var callbacks, cb, i, _len;
      if (event) {
        if (callback) {
          callbacks = this.callbacks[event];
          for (i = 0, _len = callbacks.length; i < _len; i++) {
            cb = callbacks[i];
            if (!(cb === callback)) continue;
            callbacks.splice(i, 1);
            break;
          }
        } else {
          delete this.callbacks[event];
        }
      } else {
        this.callbacks = {};
      }
      return this;
    };

    return Events;

  })();

  Lucid.Model = (function(_super) {

    __extends(Model, _super);

    function Model(attrs) {
      this.load(attrs);
    }

    Model.prototype.load = function(attrs) {
      var key, value;
      for (key in attrs) {
        value = attrs[key];
        if (typeof this[key] === 'function') {
          this[key](value);
        } else {
          this[key] = value;
        }
      }
      return this;
    };

    Model.prototype.attributes = function() {
      var key, result, value;
      result = {};
      for (key in this) {
        if (!__hasProp.call(this, key)) continue;
        value = this[key];
        if (key !== 'id') result[key] = value;
      }
      return result;
    };

    return Model;

  })(Lucid.Module);

  Lucid.Repository = (function(_super) {

    __extends(Repository, _super);

    function Repository() {
      Repository.__super__.constructor.apply(this, arguments);
    }

    Repository.persist = function(persistence) {};

    Repository.prototype.save = function(record) {};

    return Repository;

  })(Lucid.Module);

  Lucid.Collection = (function(_super) {

    __extends(Collection, _super);

    Collection.include(Lucid.Events);

    function Collection() {
      this.ids = {};
      this.cids = {};
    }

    Collection.prototype.add = function(record) {
      record.cid || (record.cid = Util.uniqueId('c'));
      record.id || (record.id = record.cid);
      this.ids[record.id] = this.cids[record.cid] = record;
      this.trigger('add', record);
      return record;
    };

    Collection.prototype.remove = function(record) {
      delete this.ids[record.id];
      delete this.cids[record.cid];
      return this.trigger('remove', record);
    };

    Collection.prototype.all = function() {
      var cid, record, _ref, _results;
      _ref = this.cids;
      _results = [];
      for (cid in _ref) {
        record = _ref[cid];
        _results.push(record);
      }
      return _results;
    };

    Collection.prototype.first = function() {
      return this.all()[0];
    };

    Collection.prototype.get = function(id) {
      return this.ids[id];
    };

    Collection.prototype.getByCid = function(cid) {
      return this.cids[cid];
    };

    return Collection;

  })(Lucid.Repository);

  Lucid.Util = Util;

  if (typeof module !== "undefined" && module !== null) module.exports = Lucid;

}).call(this);
