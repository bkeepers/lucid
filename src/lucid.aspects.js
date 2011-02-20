var Lucid;
Lucid = Lucid || {};

Lucid.Aspects = {
  before: function (method, callback) {
    var original = this[method];

    this[method] = function () {
      callback.apply(this, arguments);
      return original.apply(this, arguments);
    };

    return this;
  },

  after: function (method, callback) {
    var original = this[method];

    this[method] = function () {
      var result = original.apply(this, arguments);
      callback.apply(this, arguments);
      return result;
    };

    return this;
  }
};