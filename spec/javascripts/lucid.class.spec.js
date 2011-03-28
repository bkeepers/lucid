describe('Lucid.Class', function () {
  var Foo;

  beforeEach(function () {
    Foo = Lucid.Class.extend({
      initialize: function () {},
      bar: function () {}
    });
  });

  describe('extend', function () {
    it('should be an instance of Lucid.Class', function () {
      var f = new Foo();
      expect(f instanceof Lucid.Class).toBe(true);
    });

    it('should properly set constructor', function () {
      var f = new Foo();
      expect(f.constructor === Foo).toBe(true);
    });

    it('should add methods to prototype', function () {
      expect(_.isFunction(Foo.prototype.bar)).toBe(true);
    });

    it('should call the initialize method', function () {
      spyOn(Foo.prototype, 'initialize');
      new Foo('foo');
      expect(Foo.prototype.initialize).toHaveBeenCalledWith('foo');
    });

    it('should not blow up if initialize is not defined', function () {
      Foo = Lucid.Class.extend({});
      expect(function () {
        new Foo();
      }).not.toThrow();
    });
  });

  describe('class methods', function () {
    describe('include', function () {
      it('should add properties to the class', function () {
        Foo.include({a: 1}, {b: 2});
        expect(Foo.prototype.a).toEqual(1);
        expect(Foo.prototype.b).toEqual(2);
      });

      it('should return the class', function () {
        expect(Foo.include({})).toEqual(Foo);
      });
    });

    describe('extend', function () {
      it('should create subclasses', function () {
        var A = Lucid.Class.extend();
        var B = A.extend();
        var b = new B();
        expect(b instanceof A).toBe(true);
        expect(b instanceof Lucid.Class).toBe(true);
      });
    });
  });
});
