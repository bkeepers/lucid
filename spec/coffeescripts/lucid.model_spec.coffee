describe 'Lucid.Model', ->
  Message = null

  beforeEach ->
    class Message extends Lucid.Model
    @message = new Message(text: 'Hello Lucid')

  describe 'load', ->
    it 'sets properties', ->
      @message.load(sender: 'bkeepers')
      expect(@message.sender).toEqual('bkeepers')

    it 'passes value to function', ->
      Message.include
        dateFromString: (value) -> @date = new Date(Date.parse(value))

      date = new Date()
      @message.load(dateFromString: date.toISOString())
      expect(@message.date).toEqual(date)

  describe 'toJSON', ->
    it 'properly serializes', ->
      expect(JSON.stringify(@message)).toEqual('{"text":"Hello Lucid"}')

  describe 'attributes', ->
    it 'includes constructor args', ->
      expect(@message.attributes()).toEqual(text: 'Hello Lucid')

    it 'includes properties set explicitly', ->
      @message.sender = 'brandon'
      expect(@message.attributes()).toEqual(text: 'Hello Lucid', sender: 'brandon')

    it 'excludes id', ->
      model = new Message(id: '5', text: 'hello')
      expect(model.attributes()).toEqual(text: 'hello')