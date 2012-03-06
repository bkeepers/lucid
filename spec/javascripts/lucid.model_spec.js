(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  describe('Lucid.Model', function() {
    var Message;
    Message = null;
    beforeEach(function() {
      Message = (function(_super) {

        __extends(Message, _super);

        function Message() {
          Message.__super__.constructor.apply(this, arguments);
        }

        return Message;

      })(Lucid.Model);
      return this.message = new Message({
        text: 'Hello Lucid'
      });
    });
    describe('load', function() {
      it('sets properties', function() {
        this.message.load({
          sender: 'bkeepers'
        });
        return expect(this.message.sender).toEqual('bkeepers');
      });
      return it('passes value to function', function() {
        var date;
        Message.include({
          dateFromString: function(value) {
            return this.date = new Date(Date.parse(value));
          }
        });
        date = new Date();
        this.message.load({
          dateFromString: date.toISOString()
        });
        return expect(this.message.date).toEqual(date);
      });
    });
    return describe('toJSON', function() {
      return it('properly serializes', function() {
        return expect(JSON.stringify(this.message)).toEqual('{"text":"Hello Lucid"}');
      });
    });
  });

}).call(this);
