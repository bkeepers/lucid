Lucid = @Lucid = {}

moduleKeywords = ['included', 'extended']

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