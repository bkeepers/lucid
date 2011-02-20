describe('Lucid.Aspects', function () {
  describe('before', function () {
    describe('with methods on the object', function () {
      var object;

      beforeEach(function () {
        object = _.extend({
          calls: [],
          foo: function () {
            this.calls.push('foo');
            return 'bar';
          }
        }, Lucid.Aspects);

        object.before('foo', function () {
          this.calls.push('before');
        });
      });

      it('should fire before method is called', function () {
        object.foo();
        expect(object.calls).toEqual(['before', 'foo']);
      });

      it('should return self', function () {
        expect(object.before('foo', function () {})).toEqual(object);
      });

      it('should fire multiple', function () {
        object.before('foo', function () {
          this.calls.push('again');
        });
        object.foo();
        expect(object.calls).toEqual(['again', 'before', 'foo']);
      });

      it('should maintain return value', function () {
        expect(object.foo()).toEqual('bar');
      });

      it('should pass method arguments', function () {
        var called = false;
        object.before('foo', function (a) {
          called = true;
          expect(a).toEqual(1);
        });
        object.foo(1);
        expect(called).toBe(true);
      });

      it('should call original method with proper arguments', function () {
        object.foo = function (a) {
          expect(a).toEqual(2);
        };
        object.before('foo', function () {});
        object.foo(2);
      });
    });

    describe('with methods on the prototype', function () {
      var O;

      beforeEach(function () {
        O = function () {};
        _.extend(O.prototype, Lucid.Aspects, {
          calls: [],
          foo: function () {
            this.calls.push('foo');
            return 'bar';
          }
        });
        object = new O();

        O.prototype.before('foo', function () {
          this.calls.push('before');
        });
      });

      it('should fire before method is called', function () {
        object.foo();
        expect(object.calls).toEqual(['before', 'foo']);
      });

      it('should fire multiple', function () {
        O.prototype.before('foo', function () {
          this.calls.push('again');
        });
        object.foo();
        expect(object.calls).toEqual(['again', 'before', 'foo']);
      });

      it('should maintain return value', function () {
        expect(object.foo()).toEqual('bar');
      });

      it('should pass method arguments', function () {
        var called = false;
        object.before('foo', function (a) {
          called = true;
          expect(a).toEqual(1);
        });
        object.foo(1);
        expect(called).toBe(true);
      });

      it('should call original method with proper arguments', function () {
        object.foo = function (a) {
          expect(a).toEqual(2);
        };
        object.before('foo', function () {});
        object.foo(2);
      });
    });
  });

  describe('after', function () {
    describe('with methods on the object', function () {
      var object;

      beforeEach(function () {
        object = _.extend({
          calls: [],
          foo: function () {
            this.calls.push('foo');
            return 'bar';
          }
        }, Lucid.Aspects);

        object.after('foo', function () {
          this.calls.push('after');
        });
      });

      it('should fire after method is called', function () {
        object.foo();
        expect(object.calls).toEqual(['foo', 'after']);
      });

      it('should return self', function () {
        expect(object.after('foo', function () {})).toEqual(object);
      });

      it('should fire multiple', function () {
        object.after('foo', function () {
          this.calls.push('again');
        });
        object.foo();
        expect(object.calls).toEqual(['foo', 'after', 'again']);
      });

      it('should maintain return value', function () {
        expect(object.foo()).toEqual('bar');
      });

      it('should pass method arguments', function () {
        var called = false;
        object.after('foo', function (a) {
          called = true;
          expect(a).toEqual(1);
        });
        object.foo(1);
        expect(called).toBe(true);
      });

      it('should call original method with proper arguments', function () {
        object.foo = function (a) {
          expect(a).toEqual(2);
        };
        object.after('foo', function () {});
        object.foo(2);
      });
    });

    describe('with methods on the prototype', function () {
      var O;

      beforeEach(function () {
        O = function () {};
        _.extend(O.prototype, Lucid.Aspects, {
          calls: [],
          foo: function () {
            this.calls.push('foo');
            return 'bar';
          }
        });
        object = new O();

        O.prototype.after('foo', function () {
          this.calls.push('after');
        });
      });

      it('should fire after method is called', function () {
        object.foo();
        expect(object.calls).toEqual(['foo', 'after']);
      });

      it('should fire multiple', function () {
        O.prototype.after('foo', function () {
          this.calls.push('again');
        });
        object.foo();
        expect(object.calls).toEqual(['foo', 'after', 'again']);
      });

      it('should maintain return value', function () {
        expect(object.foo()).toEqual('bar');
      });

      it('should pass method arguments', function () {
        var called = false;
        object.after('foo', function (a) {
          called = true;
          expect(a).toEqual(1);
        });
        object.foo(1);
        expect(called).toBe(true);
      });

      it('should call original method with proper arguments', function () {
        object.foo = function (a) {
          expect(a).toEqual(2);
        };
        object.after('foo', function () {});
        object.foo(2);
      });
    });
  });
});