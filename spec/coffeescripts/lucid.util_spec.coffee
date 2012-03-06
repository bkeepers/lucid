describe 'Lucid.Util', ->
  describe 'uniqueId', ->
    it 'generates unique ids', ->
      expect(Lucid.Util.uniqueId()).not.toEqual(Lucid.Util.uniqueId())

    it 'adds prefix', ->
      expect(Lucid.Util.uniqueId('foo').match(/^foo\d+$/)).toBeTruthy()
