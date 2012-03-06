(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Lucid.Persistence || (Lucid.Persistence = {});

  Lucid.Persistence.Ajax = (function(_super) {

    __extends(Ajax, _super);

    Ajax.prototype.defaults = {
      contentType: 'application/json',
      dataType: 'json',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    };

    function Ajax(repository, options) {
      this.repository = repository;
      this.options = options != null ? options : {};
      this.success = __bind(this.success, this);
    }

    Ajax.prototype.fetch = function(params) {
      return this.ajax({
        url: this.options.url,
        data: params
      }).done(this.success);
    };

    Ajax.prototype.get = function(id) {
      return this.ajax({
        url: this.url(id)
      }).done(this.success);
    };

    Ajax.prototype.create = function(id, attributes) {
      return this.ajax({
        url: this.url(id),
        type: 'POST',
        data: JSON.stringify(attributes)
      }).done(this.success);
    };

    Ajax.prototype.update = function(id, attributes) {
      return this.ajax({
        url: this.url(id),
        type: 'PUT',
        data: JSON.stringify(attributes)
      }).done(this.success);
    };

    Ajax.prototype.destroy = function(id) {
      return this.ajax({
        url: this.url(id),
        type: 'DELETE'
      });
    };

    Ajax.prototype.ajax = function(options) {
      return jQuery.ajax(jQuery.extend(options, this.defaults));
    };

    Ajax.prototype.url = function(id) {
      var url;
      url = this.options.url;
      if (id) url = "" + url + "/" + id;
      return url;
    };

    Ajax.prototype.success = function(data) {
      return this.repository.refresh(data);
    };

    return Ajax;

  })(Lucid.Module);

}).call(this);
