var Lucid;
Lucid = Lucid || {};

Lucid.Model = function(methods) {
  var model = function() {
    this.initialize.apply(this, arguments);
  };
  _.extend(model.prototype, Lucid.Events, Lucid.Model.Methods, methods);
  _.extend(model, Lucid.Events);
  return model;
};

Lucid.Model.Methods = {
  initialize: function() {}
}