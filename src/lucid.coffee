Lucid = @Lucid = {}

moduleKeywords = ['included', 'extended']

class Lucid.Events
  @extended: ->
    @events = new Lucid.Events(@)

  @bind:    -> @events.bind(arguments...)
  @one:     -> @events.one(arguments...)
  @trigger: -> @events.trigger(arguments...)
  @unbind:  -> @events.unbind(arguments...)

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

module?.exports = Lucid