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
