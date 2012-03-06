(function() {

  describe('Lucid.Util', function() {
    return describe('uniqueId', function() {
      it('generates unique ids', function() {
        return expect(Lucid.Util.uniqueId()).not.toEqual(Lucid.Util.uniqueId());
      });
      return it('adds prefix', function() {
        return expect(Lucid.Util.uniqueId('foo').match(/^foo\d+$/)).toBeTruthy();
      });
    });
  });

}).call(this);
