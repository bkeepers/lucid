
Lucid.Persistence or= {}

class Lucid.Persistence.Ajax extends Lucid.Module
  defaults:
    contentType: 'application/json'
    dataType: 'json'
    headers: {'X-Requested-With': 'XMLHttpRequest'}

  constructor: (@repository, @options = {}) ->

  fetch: (params) ->
    @ajax(url: @options.url, data: params)
      .done @success

  get: (id) ->
    @ajax
      url: @url(id)
    .done @success

  create: (id, attributes) ->
    @ajax
      url: @url(id)
      type: 'POST'
      data: JSON.stringify(attributes)
    .done @success

  update: (id, attributes) ->
    @ajax
      url: @url(id)
      type: 'PUT'
      data: JSON.stringify(attributes)
    .done @success

  destroy: (id) ->
    @ajax
      url: @url(id)
      type: 'DELETE'

  ajax: (options) ->
    jQuery.ajax(jQuery.extend(options, @defaults))

  url: (id) ->
    url = @options.url
    url = "#{url}/#{id}" if id
    url

  success: (data) =>
    @repository.refresh(data)