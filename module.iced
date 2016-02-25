# vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2
log = (x...) -> console.log x...

url = require 'url'
qs = require 'querystring'

_type = (obj) ->
  if obj is 'undefined' or obj is null then return no
  Object::toString.call(obj).slice(8,-1).toLowerCase()

module.exports = append = (url_str,objs...) ->
  url_parts = url.parse(url_str)

  append = []

  try append.push qs.parse(url_parts.query)

  for obj in objs

    # url str
    if _type(obj) is 'string' and obj.indexOf('://') > -1
      parts = url.parse obj
      try append.push qs.parse(parts.query)
      continue

    # query str
    if _type(obj) is 'string'
      if obj.substr(0,1) is '?' then obj = obj.substr(1)
      continue if !obj.trim()
      try append.push qs.parse(obj)
      continue

    if _type(obj) is 'object' and obj
      append.push obj
      continue

  return url_str if !append.length

  append_obj = {}

  for x in append
    append_obj[k] = v for k,v of x

  url.resolve(url_str,'?' + qs.stringify(append_obj))

if process.env.TAKY_DEV
  log /test/

  original = 'http://landing-page.com/?s1=sid1&sid2=sid3'
  log append "http://click-url.com/?affid=1", original, {object_format_sid:"Hello Friends"}

  ###
  http://click-url.com/?affid=1&s1=sid1&sid2=sid3&object_format_sid=Hello%20Friends
  ###

  process.exit 0

