(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  describe('Lucid.Events', function() {
    beforeEach(function() {
      this.spy = jasmine.createSpy('event handler');
      this.context = {};
      return this.events = new Lucid.Events(this.context);
    });
    it('binds and triggers events', function() {
      this.events.bind('foo', this.spy);
      this.events.bind('bar', this.spy);
      this.events.trigger('foo');
      expect(this.spy).toHaveBeenCalled();
      return expect(this.spy.callCount).toBe(1);
    });
    it('binds multiple events', function() {
      this.events.bind('foo bar baz', this.spy);
      this.events.trigger('bar');
      return expect(this.spy).toHaveBeenCalled();
    });
    it('can cancel propogation', function() {
      this.events.bind('foo', function() {
        return false;
      });
      this.events.bind('foo', this.spy);
      this.events.trigger('foo');
      return expect(this.spy).not.toHaveBeenCalled();
    });
    describe('bind', function() {
      return it('returns events', function() {
        return expect(this.events.bind('event', function() {})).toBe(this.events);
      });
    });
    describe('trigger', function() {
      it('passes args to callbacks', function() {
        this.events.bind('foo', this.spy);
        this.events.trigger('foo', 'arg1', 'arg2');
        return expect(this.spy).toHaveBeenCalledWith('arg1', 'arg2');
      });
      it('binds callback to context', function() {
        var context;
        context = this.context;
        this.events.bind('foo', function() {
          return expect(this).toBe(context);
        });
        return this.events.trigger('foo');
      });
      it('returns true with no callbacks', function() {
        return expect(this.events.trigger('foo')).toBe(true);
      });
      it('returns true with callbacks', function() {
        this.events.bind('foo', function() {});
        return expect(this.events.trigger('foo')).toBe(true);
      });
      return it('returns false if propogation is canceled', function() {
        this.events.bind('foo', function() {
          return false;
        });
        return expect(this.events.trigger('foo')).toBe(false);
      });
    });
    describe('unbind', function() {
      it('removes callbacks for given event', function() {
        this.events.bind('foo', this.spy);
        this.events.unbind('foo');
        this.events.trigger('foo');
        return expect(this.spy).not.toHaveBeenCalled();
      });
      it('removes all callbacks without an event', function() {
        this.events.bind('foo', this.spy);
        this.events.unbind();
        this.events.trigger('foo');
        return expect(this.spy).not.toHaveBeenCalled();
      });
      return it('removes the given callback', function() {
        var unbound;
        unbound = jasmine.createSpy();
        this.events.bind('foo', this.spy);
        this.events.bind('foo', unbound);
        this.events.unbind('foo', unbound);
        this.events.trigger('foo');
        expect(unbound).not.toHaveBeenCalled();
        return expect(this.spy).toHaveBeenCalled();
      });
    });
    describe('one', function() {
      it('binds event once', function() {
        this.events.one('foo', this.spy);
        this.events.trigger('foo');
        expect(this.spy).toHaveBeenCalled();
        this.spy.reset();
        this.events.trigger('foo');
        return expect(this.spy).not.toHaveBeenCalled();
      });
      return it('binds callback to context', function() {
        var context;
        context = this.context;
        this.events.one('foo', function() {
          return expect(this).toBe(context);
        });
        return this.events.trigger('foo');
      });
    });
    return describe('extended', function() {
      beforeEach(function() {
        return this.Events = (function(_super) {

          __extends(Events, _super);

          function Events() {
            Events.__super__.constructor.apply(this, arguments);
          }

          Events.extend(Lucid.Events);

          return Events;

        })(Lucid.Module);
      });
      it('sets up events', function() {
        expect(this.Events.events().constructor).toBe(Lucid.Events);
        this.Events.bind('foo', this.spy);
        this.Events.trigger('foo');
        return expect(this.spy).toHaveBeenCalled();
      });
      return it('clears events on inherited objects', function() {
        var Sub;
        this.Events.bind('foo', this.spy);
        Sub = (function(_super) {

          __extends(Sub, _super);

          function Sub() {
            Sub.__super__.constructor.apply(this, arguments);
          }

          return Sub;

        })(this.Events);
        Sub.trigger("foo");
        return expect(this.spy).not.toHaveBeenCalled();
      });
    });
  });

}).call(this);
