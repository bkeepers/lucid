(function() {

  describe('Lucid.Persistence.Ajax', function() {
    var Responses;
    Responses = {
      fetch: {
        status: 200,
        responseText: JSON.stringify([
          {
            id: 1,
            text: 'Hello Lucid'
          }
        ])
      },
      record: {
        status: 200,
        responseText: JSON.stringify({
          id: 1,
          text: 'Hello Lucid'
        })
      }
    };
    beforeEach(function() {
      this.repository = {
        refresh: jasmine.createSpy('refresh')
      };
      return this.adapter = new Lucid.Persistence.Ajax(this.repository, {
        url: '/messages'
      });
    });
    describe('url', function() {
      return it('uses url option', function() {
        expect(this.adapter.url()).toEqual('/messages');
        return expect(this.adapter.url('5')).toEqual('/messages/5');
      });
    });
    return describe('fetch', function() {
      it('makes an ajax request', function() {
        var request;
        this.adapter.fetch();
        request = mostRecentAjaxRequest();
        expect(request.method).toEqual('GET');
        expect(request.url).toEqual('/messages');
        return expect(request.requestHeaders['Accept'].match(/^application\/json/)).toBeTruthy();
      });
      it('passes params', function() {
        var request;
        this.adapter.fetch({
          foo: 'bar'
        });
        request = mostRecentAjaxRequest();
        return expect(request.url).toEqual('/messages?foo=bar');
      });
      it('calls refresh on the repository', function() {
        var request;
        this.adapter.fetch();
        request = mostRecentAjaxRequest();
        request.response(Responses.fetch);
        return expect(this.repository.refresh).toHaveBeenCalledWith([
          {
            id: 1,
            text: 'Hello Lucid'
          }
        ]);
      });
      describe('create', function() {
        beforeEach(function() {
          this.adapter.create(1, {
            text: 'Hello'
          });
          return this.request = mostRecentAjaxRequest();
        });
        it('makes an ajax request', function() {
          expect(this.request.method).toEqual('POST');
          expect(this.request.url).toEqual('/messages/1');
          return expect(this.request.params).toEqual(JSON.stringify({
            text: 'Hello'
          }));
        });
        return it('calls refresh on the repository', function() {
          this.request.response(Responses.record);
          return expect(this.repository.refresh).toHaveBeenCalledWith({
            id: 1,
            text: 'Hello Lucid'
          });
        });
      });
      describe('update', function() {
        beforeEach(function() {
          this.adapter.update(1, {
            text: 'Hello'
          });
          return this.request = mostRecentAjaxRequest();
        });
        it('makes an ajax request', function() {
          expect(this.request.method).toEqual('PUT');
          expect(this.request.url).toEqual('/messages/1');
          return expect(this.request.params).toEqual(JSON.stringify({
            text: 'Hello'
          }));
        });
        return it('calls refresh on the repository', function() {
          this.request.response(Responses.record);
          return expect(this.repository.refresh).toHaveBeenCalledWith({
            id: 1,
            text: 'Hello Lucid'
          });
        });
      });
      describe('get', function() {
        beforeEach(function() {
          this.adapter.get(1);
          return this.request = mostRecentAjaxRequest();
        });
        it('makes an ajax request', function() {
          expect(this.request.method).toEqual('GET');
          return expect(this.request.url).toEqual('/messages/1');
        });
        return it('calls refresh on the repository', function() {
          this.request.response(Responses.record);
          return expect(this.repository.refresh).toHaveBeenCalledWith({
            id: 1,
            text: 'Hello Lucid'
          });
        });
      });
      return describe('destroy', function() {
        beforeEach(function() {
          this.adapter.destroy(1);
          return this.request = mostRecentAjaxRequest();
        });
        return it('makes an ajax request', function() {
          expect(this.request.method).toEqual('DELETE');
          return expect(this.request.url).toEqual('/messages/1');
        });
      });
    });
  });

}).call(this);
