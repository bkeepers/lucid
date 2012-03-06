describe 'Lucid.Persistence.Ajax', ->
  Responses =
    fetch:
      status: 200
      responseText: JSON.stringify([id: 1, text: 'Hello Lucid'])
    record:
      status: 200
      responseText: JSON.stringify({id: 1, text: 'Hello Lucid'})

  beforeEach ->

    @repository =
      refresh: jasmine.createSpy('refresh')

    @adapter = new Lucid.Persistence.Ajax @repository, url: '/messages'

  describe 'url', ->
    it 'uses url option', ->
      expect(@adapter.url()).toEqual('/messages')
      expect(@adapter.url('5')).toEqual('/messages/5')

  describe 'fetch', ->
    it 'makes an ajax request', ->
      @adapter.fetch()
      request = mostRecentAjaxRequest()

      expect(request.method).toEqual('GET')
      expect(request.url).toEqual('/messages')
      expect(request.requestHeaders['Accept'].match(/^application\/json/)).toBeTruthy()

    it 'passes params', ->
      @adapter.fetch(foo: 'bar')
      request = mostRecentAjaxRequest()
      expect(request.url).toEqual('/messages?foo=bar')

    it 'calls refresh on the repository', ->
      @adapter.fetch()
      request = mostRecentAjaxRequest()
      request.response(Responses.fetch)

      expect(@repository.refresh).toHaveBeenCalledWith([{id: 1, text: 'Hello Lucid'}])

    describe 'create', ->
      beforeEach ->
        @adapter.create(1, {text: 'Hello'})
        @request = mostRecentAjaxRequest()

      it 'makes an ajax request', ->
        expect(@request.method).toEqual('POST')
        expect(@request.url).toEqual('/messages/1')
        expect(@request.params).toEqual(JSON.stringify({text:'Hello'}))

      it 'calls refresh on the repository', ->
        @request.response(Responses.record)

        expect(@repository.refresh).toHaveBeenCalledWith({id: 1, text: 'Hello Lucid'})

    describe 'update', ->
      beforeEach ->
        @adapter.update(1, {text: 'Hello'})
        @request = mostRecentAjaxRequest()

      it 'makes an ajax request', ->
        expect(@request.method).toEqual('PUT')
        expect(@request.url).toEqual('/messages/1')
        expect(@request.params).toEqual(JSON.stringify({text:'Hello'}))

      it 'calls refresh on the repository', ->
        @request.response(Responses.record)

        expect(@repository.refresh).toHaveBeenCalledWith({id: 1, text: 'Hello Lucid'})

    describe 'get', ->
      beforeEach ->
        @adapter.get(1)
        @request = mostRecentAjaxRequest()

      it 'makes an ajax request', ->
        expect(@request.method).toEqual('GET')
        expect(@request.url).toEqual('/messages/1')

      it 'calls refresh on the repository', ->
        @request.response(Responses.record)
        expect(@repository.refresh).toHaveBeenCalledWith({id: 1, text: 'Hello Lucid'})

    describe 'destroy', ->
      beforeEach ->
        @adapter.destroy(1)
        @request = mostRecentAjaxRequest()

      it 'makes an ajax request', ->
        expect(@request.method).toEqual('DELETE')
        expect(@request.url).toEqual('/messages/1')
