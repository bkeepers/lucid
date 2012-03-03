Lucid = require 'lucid'

describe 'Lucid.Module', ->
  Message = null

  beforeEach ->
    class Message extends Lucid.Module

  describe 'included', ->
    it 'adds properties to prototype', ->
      Message.include({property: true})
      expect(Message.prototype.property).toBe(true)
      expect((new Message()).property).toBe(true)

    it 'raises an error without an object', ->
      expect(-> Message.include()).toThrow('include(obj) requires obj')

    it 'calls included callback', ->
      module =
        included: ->

      spyOn module, "included"
      Message.include(module)
      expect(module.included).toHaveBeenCalled()

    it 'returns constructor', ->
      expect(Message.include({})).toBe(Message)


  describe 'extended', ->
    it 'adds properties to constructor', ->
      Message.extend({property: true})
      expect(Message.property).toBe(true)

    it 'raises an error without an object', ->
      expect(-> Message.extend()).toThrow('extend(obj) requires obj')

    it 'calls extended callback', ->
      module =
        extended: ->

      spyOn module, "extended"
      Message.extend(module)
      expect(module.extended).toHaveBeenCalled()

    it 'returns constructor', ->
      expect(Message.extend({})).toBe(Message)
