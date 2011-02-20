var Lucid;
Lucid = Lucid || {};

Lucid.Class = function () {
};

Lucid.Class.Methods = {
  extend: function (properties) {
    var Class = function () {
      if (this.initialize) {
        this.initialize.apply(this, arguments);
      }
    };

    Class.prototype = _.extend(new this(), properties);
    _.extend(Class, this.Methods);
    Class.prototype.constructor = Class;
    return Class;
  },

  include: function () {
    return _.extend.apply(_, [this.prototype].concat(_.toArray(arguments)));
  }
};

_.extend(Lucid.Class, Lucid.Class.Methods);
