# append-querystring

Append anything to a URL's query-string.

## Install

Using [npm](https://npmjs.org):

```
npm install append-querystring --save
```

## Example

```javascript
const append = require('append-querystring');

const original = 'http://landing-page.com/?s1=sid1&sid2=sid3';
const result = append("http://click-url.com/?affid=1", original, {object_format_sid: "Hello Friends"});

console.log(result);
// Output: http://click-url.com/?affid=1&s1=sid1&sid2=sid3&object_format_sid=Hello%20Friends
```

## Usage

The exported function takes a base URL as its first argument, followed by any number of additional arguments that can be:

- URL strings
- Query string fragments (with or without a leading '?')
- Objects with key-value pairs to be added to the query string

The function returns a new URL with all the query parameters combined.
