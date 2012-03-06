(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  describe('Lucid.Collection', function() {
    beforeEach(function() {
      this.MessageCollection = (function(_super) {

        __extends(MessageCollection, _super);

        function MessageCollection() {
          MessageCollection.__super__.constructor.apply(this, arguments);
        }

        return MessageCollection;

      })(Lucid.Collection);
      this.Message = (function(_super) {

        __extends(Message, _super);

        function Message() {
          Message.__super__.constructor.apply(this, arguments);
        }

        return Message;

      })(Lucid.Model);
      this.collection = new this.MessageCollection;
      return this.model = new this.Message({
        text: 'testing collections'
      });
    });
    describe('add', function() {
      it('sets cid and id', function() {
        this.collection.add(this.model);
        expect(this.model.cid.match(/^c\d+$/)).toBeTruthy();
        return expect(this.model.id).toEqual(this.model.cid);
      });
      it('does not override given id', function() {
        this.model.id = 'abc123';
        this.collection.add(this.model);
        return expect(this.model.id).toEqual('abc123');
      });
      it('adds the record to the collection', function() {
        this.collection.add(this.model);
        return expect(this.collection.all()).toEqual([this.model]);
      });
      it('returns record', function() {
        return expect(this.collection.add(this.model)).toBe(this.model);
      });
      return it('triggers add event', function() {
        var spy;
        spy = jasmine.createSpy();
        this.collection.bind('add', spy);
        this.collection.add(this.model);
        return expect(spy).toHaveBeenCalledWith(this.model);
      });
    });
    describe('first', function() {
      return it('returns first record', function() {
        this.collection.add(this.model);
        this.collection.add(new this.Message({
          text: 'second'
        }));
        return expect(this.collection.first()).toEqual(this.model);
      });
    });
    describe('getByCid', function() {
      it('returns existing record', function() {
        this.collection.add(this.model);
        return expect(this.collection.getByCid(this.model.cid)).toEqual(this.model);
      });
      return it('returns undefined for non-existent record', function() {
        return expect(this.collection.getByCid('404')).toBe(void 0);
      });
    });
    describe('get', function() {
      it('returns existing record', function() {
        this.collection.add(this.model);
        return expect(this.collection.get(this.model.id)).toEqual(this.model);
      });
      return it('returns undefined for non-existent record', function() {
        return expect(this.collection.get('404')).toBe(void 0);
      });
    });
    return describe('remove', function() {
      beforeEach(function() {
        return this.collection.add(this.model);
      });
      it('removes record', function() {
        var id, second, _;
        second = new this.Message({
          text: ''
        });
        this.collection.add(second);
        this.collection.remove(this.model);
        expect(this.collection.all()).toEqual([second]);
        expect((function() {
          var _ref, _results;
          _ref = this.collection.ids;
          _results = [];
          for (id in _ref) {
            _ = _ref[id];
            _results.push(id);
          }
          return _results;
        }).call(this)).toEqual([second.id]);
        return expect((function() {
          var _ref, _results;
          _ref = this.collection.cids;
          _results = [];
          for (id in _ref) {
            _ = _ref[id];
            _results.push(id);
          }
          return _results;
        }).call(this)).toEqual([second.cid]);
      });
      return it('triggers remove event', function() {
        var spy;
        spy = jasmine.createSpy();
        this.collection.bind('remove', spy);
        this.collection.remove(this.model);
        return expect(spy).toHaveBeenCalledWith(this.model);
      });
    });
  });

}).call(this);
