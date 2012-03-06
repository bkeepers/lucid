Lucid = @Lucid = {}

moduleKeywords = ['included', 'extended']

Util =
  # Generate a unique ID, useful for temporary IDs in memory
  uniqueId: (prefix) ->
    @idCounter or= 0
    "#{prefix}#{++@idCounter}"

class Lucid.Module
  @include: (obj) ->
    throw 'include(obj) requires obj' unless obj
    for key, value of obj when key not in moduleKeywords
      @::[key] = value
    obj.included?.apply(@)
    @

  @extend: (obj) ->
    throw('extend(obj) requires obj') unless obj
    for key, value of obj when key not in moduleKeywords
      @[key] = value
    obj.extended?.apply(@)
    @

class Lucid.Events
  @events: ->
    @_events_ = new Lucid.Events(@) unless @hasOwnProperty('_events_')
    @_events_

  @bind:    -> @events().bind(arguments...)
  @one:     -> @events().one(arguments...)
  @trigger: -> @events().trigger(arguments...)
  @unbind:  -> @events().unbind(arguments...)

  constructor: (@context) ->
    @callbacks = {}

  bind: (events, callback) ->
    for event in events.split(' ')
      @callbacks[event] or= []
      @callbacks[event].push(callback)
    @

  one: (event, callback) ->
    @bind event, =>
      @unbind event, arguments.callee
      callback.apply(@context, arguments)

  trigger: (event, args...) ->
    callbacks = @callbacks[event]
    return true unless callbacks

    for callback in callbacks
      if callback.apply(@context, args) is false
        return false

    true

  unbind: (event, callback) ->
    if event
      if callback
        callbacks = @callbacks[event]
        for cb, i in callbacks when cb is callback
          callbacks.splice(i, 1)
          break
      else
        delete @callbacks[event]
    else
      @callbacks = {}
    @

class Lucid.Model extends Lucid.Module
  constructor: (attrs) ->
    @load attrs

  load: (attrs) ->
    for key, value of attrs
      if typeof @[key] is 'function'
        @[key](value)
      else
        @[key] = value
    this

class Lucid.Repository extends Lucid.Module
  @persist: (persistence) ->

  save: (record) ->

class Lucid.Collection extends Lucid.Repository
  @include Lucid.Events

  constructor: ->
    @ids = {}
    @cids = {}

  add: (record) ->
    record.cid or= Util.uniqueId('c')
    record.id  or= record.cid

    @ids[record.id] = @cids[record.cid] = record
    @trigger 'add', record
    record

  remove: (record) ->
    delete @ids[record.id]
    delete @cids[record.cid]
    @trigger 'remove', record

  all: ->
    record for cid, record of @cids

  first: ->
    @all()[0]

  get: (id) ->
    @ids[id]

  getByCid: (cid) ->
    @cids[cid]

Lucid.Util = Util

module?.exports = Lucid