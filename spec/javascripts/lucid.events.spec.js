describe('Lucid.Events', function() {
  var object;

  beforeEach(function() {
    object = _.extend({called:0}, Lucid.Events);
  });

  describe('.bind and .trigger', function() {
    beforeEach(function () {
      object.bind('event', function() { this.called++; });
    });

    it('should call function', function() {
      object.trigger('event');
      expect(object.called).toBe(1);
    });

    it('should allow binding multiple events with same name', function() {
      object.bind('event', function() { this.called += 2; });
      object.trigger('event');
      expect(object.called).toEqual(3);
    });

    it("should return the object", function() {
      expect(object.bind('foo', function() {})).toEqual(object);
    });

    describe("with instances", function() {
      var Thing;

      beforeEach(function() {
        Thing = _.extend(function() { this.called = false; }, Lucid.Events);
        _.extend(Thing.prototype, Lucid.Events);

        Thing.bind('create', function() {
          this.called = true;
        });
      });

      it("should trigger events on constructor", function() {
        var thing = new Thing();

        thing.trigger('create');
        expect(thing.called).toBe(true);
      });

      it('should not trigger on other instances', function() {
        var thing1 = new Thing();
        var thing2 = new Thing();

        thing1.trigger('create');
        expect(thing1.called).toBe(true);
        expect(thing2.called).toBe(false);
      });
    })
  });

  describe('.trigger', function() {
    it("should return the object", function() {
      expect(object.trigger('event')).toEqual(object);
    });

    it("should pass arguments to the event", function() {
      object.bind('event', function(x) { expect(x).toEqual(1) });
      object.trigger('event', [1]);
    });
  });

  describe('.unbind', function() {
    beforeEach(function() {
    });

    it("should return the object", function() {
      expect(object.unbind('event')).toEqual(object);
    });

    it('should remove given event listener', function() {
      var callback = function() { this.called++; };
      object.bind('event', callback);
      object.unbind('event', callback);
      object.trigger('event');
      expect(object.called).toBe(0);
    });

    it('should not remove other listeners on same event', function() {
      object.bind('event', function() { this.called++; });
      object.unbind('event', function() {});
      object.trigger('event');
      expect(object.called).toBe(1);
    });

    it("should remove all listeners for given event if no function is given", function() {
      object.bind('event', function() { this.called++; });
      object.unbind('event');
      object.trigger('event');
      expect(object.called).toBe(0);
    });
  });
});
