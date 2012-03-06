(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  describe('Lucid.Module', function() {
    var Message;
    Message = null;
    beforeEach(function() {
      return Message = (function(_super) {

        __extends(Message, _super);

        function Message() {
          Message.__super__.constructor.apply(this, arguments);
        }

        return Message;

      })(Lucid.Module);
    });
    describe('included', function() {
      it('adds properties to prototype', function() {
        Message.include({
          property: true
        });
        expect(Message.prototype.property).toBe(true);
        return expect((new Message()).property).toBe(true);
      });
      it('raises an error without an object', function() {
        return expect(function() {
          return Message.include();
        }).toThrow('include(obj) requires obj');
      });
      it('calls included callback', function() {
        var module;
        module = {
          included: function() {}
        };
        spyOn(module, "included");
        Message.include(module);
        return expect(module.included).toHaveBeenCalled();
      });
      return it('returns constructor', function() {
        return expect(Message.include({})).toBe(Message);
      });
    });
    return describe('extended', function() {
      it('adds properties to constructor', function() {
        Message.extend({
          property: true
        });
        return expect(Message.property).toBe(true);
      });
      it('raises an error without an object', function() {
        return expect(function() {
          return Message.extend();
        }).toThrow('extend(obj) requires obj');
      });
      it('calls extended callback', function() {
        var module;
        module = {
          extended: function() {}
        };
        spyOn(module, "extended");
        Message.extend(module);
        return expect(module.extended).toHaveBeenCalled();
      });
      return it('returns constructor', function() {
        return expect(Message.extend({})).toBe(Message);
      });
    });
  });

}).call(this);
