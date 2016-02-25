# append-querystring

# install

using [npm](https://npmjs.org)

```
npm i append-querystring --save
```

# example

``` coffeescript
log = console.log
append = require 'append-querystring'

original = 'http://landing-page.com/?s1=sid1&sid2=sid3'
log append "http://click-url.com/?affid=1", original, {object_format_sid:"Hello Friends"}

###
http://click-url.com/?affid=1&s1=sid1&sid2=sid3&object_format_sid=Hello%20Friends
###
```

