var Lucid;
Lucid = Lucid || {};

// Simple inheritance patterned after http://ejohn.org/blog/simple-javascript-inheritance/
(function () {
  Lucid.Class = function () {
  };

  var initializing = false;

  Lucid.Class.Methods = {
    extend: function (properties) {
      var Class = function () {
        if (!initializing && this.initialize) {
          this.initialize.apply(this, arguments);
        }
      };

      initializing = true;
      Class.prototype = _.extend(new this(), properties);
      initializing = false;

      _.extend(Class, this.Methods);
      Class.prototype.constructor = Class;
      return Class;
    },

    include: function () {
      _.extend.apply(_, [this.prototype].concat(_.toArray(arguments)));
      return this;
    }
  };

  _.extend(Lucid.Class, Lucid.Class.Methods);
})();
