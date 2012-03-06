describe 'Lucid.Collection', ->
  beforeEach ->
    class @MessageCollection extends Lucid.Collection
    class @Message extends Lucid.Model

    @collection = new @MessageCollection
    @model = new @Message(text: 'testing collections')

  describe 'add', ->
    it 'sets cid and id', ->
      @collection.add(@model)
      expect(@model.cid.match(/^c\d+$/)).toBeTruthy()
      expect(@model.id).toEqual(@model.cid)

    it 'does not override given id', ->
      @model.id = 'abc123'
      @collection.add(@model)
      expect(@model.id).toEqual('abc123')

    it 'adds the record to the collection', ->
      @collection.add(@model)
      expect(@collection.all()).toEqual([@model])

    it 'returns record', ->
      expect(@collection.add(@model)).toBe(@model)

    it 'triggers add event', ->
      spy = jasmine.createSpy()
      @collection.bind('add', spy)
      @collection.add(@model)
      expect(spy).toHaveBeenCalledWith(@model)

  describe 'first', ->
    it 'returns first record', ->
      @collection.add(@model)
      @collection.add(new @Message(text: 'second'))
      expect(@collection.first()).toEqual(@model)

  describe 'getByCid', ->
    it 'returns existing record', ->
      @collection.add(@model)
      expect(@collection.getByCid(@model.cid)).toEqual(@model)

    it 'returns undefined for non-existent record', ->
      expect(@collection.getByCid('404')).toBe(undefined)

  describe 'get', ->
    it 'returns existing record', ->
      @collection.add(@model)
      expect(@collection.get(@model.id)).toEqual(@model)

    it 'returns undefined for non-existent record', ->
      expect(@collection.get('404')).toBe(undefined)

  describe 'remove', ->
    beforeEach ->
      @collection.add(@model)

    it 'removes record', ->
      second = new @Message(text: '')
      @collection.add(second)

      @collection.remove(@model)
      expect(@collection.all()).toEqual([second])
      expect(id for id, _ of @collection.ids).toEqual([second.id])
      expect(id for id, _ of @collection.cids).toEqual([second.cid])

    it 'triggers remove event', ->
      spy = jasmine.createSpy()
      @collection.bind('remove', spy)
      @collection.remove(@model)
      expect(spy).toHaveBeenCalledWith(@model)
