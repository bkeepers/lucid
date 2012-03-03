Lucid = require 'lucid'

describe 'Lucid.Events', ->
  beforeEach ->
    @spy = jasmine.createSpy('event handler')
    @context = {}
    @events = new Lucid.Events(@context)

  it 'binds and triggers events', ->
    @events.bind 'foo', @spy
    @events.bind 'bar', @spy
    @events.trigger 'foo'
    expect(@spy).toHaveBeenCalled()
    expect(@spy.callCount).toBe(1)

  it 'binds multiple events', ->
    @events.bind 'foo bar baz', @spy
    @events.trigger 'bar'
    expect(@spy).toHaveBeenCalled()

  it 'can cancel propogation', ->
    @events.bind 'foo', -> false
    @events.bind 'foo', @spy

    @events.trigger 'foo'
    expect(@spy).not.toHaveBeenCalled()

  describe 'bind', ->
    it 'returns events', ->
      expect(@events.bind('event', ->)).toBe(@events)

  describe 'trigger', ->
    it 'passes args to callbacks', ->
      @events.bind 'foo', @spy
      @events.trigger 'foo', 'arg1', 'arg2'
      expect(@spy).toHaveBeenCalledWith('arg1', 'arg2')

    it 'binds callback to context', ->
      context = @context
      @events.bind 'foo', ->
        expect(@).toBe(context)

      @events.trigger 'foo'

    it 'returns true with no callbacks', ->
      expect(@events.trigger('foo')).toBe(true)

    it 'returns true with callbacks', ->
      @events.bind 'foo', ->
      expect(@events.trigger('foo')).toBe(true)

    it 'returns false if propogation is canceled', ->
      @events.bind 'foo', -> false
      expect(@events.trigger('foo')).toBe(false)

  describe 'unbind', ->
    it 'removes callbacks for given event', ->
      @events.bind 'foo', @spy
      @events.unbind 'foo'
      @events.trigger 'foo'
      expect(@spy).not.toHaveBeenCalled()

    it 'removes all callbacks without an event', ->
      @events.bind 'foo', @spy
      @events.unbind()
      @events.trigger 'foo'
      expect(@spy).not.toHaveBeenCalled()

    it 'removes the given callback', ->
      unbound = jasmine.createSpy()
      @events.bind 'foo', @spy
      @events.bind 'foo', unbound
      @events.unbind 'foo', unbound

      @events.trigger('foo')

      expect(unbound).not.toHaveBeenCalled()
      expect(@spy).toHaveBeenCalled()

  describe 'one', ->
    it 'binds event once', ->
      @events.one 'foo', @spy
      @events.trigger 'foo'
      expect(@spy).toHaveBeenCalled()

      @spy.reset()
      @events.trigger 'foo'
      expect(@spy).not.toHaveBeenCalled()

    it 'binds callback to context', ->
      context = @context
      @events.one 'foo', ->
        expect(@).toBe(context)
      @events.trigger 'foo'

  describe 'extended', ->
    beforeEach ->
      class @Events extends Lucid.Module
        @extend Lucid.Events

    it 'sets up events', ->
      expect(@Events.events.constructor).toBe(Lucid.Events)

      @Events.bind 'foo', @spy
      @Events.trigger 'foo'
      expect(@spy).toHaveBeenCalled()

    it 'clears events on inherited objects', ->
      @Events.bind 'foo', @spy
      class Sub extends @Events
      Sub.trigger("foo")
      expect(@spy).not.toHaveBeenCalled()
