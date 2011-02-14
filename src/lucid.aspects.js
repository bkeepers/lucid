var Lucid;
Lucid = Lucid || {};

Lucid.Aspects = {
  before: function(method, callback) {
    var self = this,
        original = this[method];

    this[method] = function() {
      callback.apply(self, arguments);
      return original.apply(self, arguments);
    }

    return this;
  },

  after: function(method, callback) {
    var self = this,
        original = this[method];

    this[method] = function() {
      var result = original.apply(self, arguments);
      callback.apply(self, arguments);
      return result;
    }

    return this;
  }
};