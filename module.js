const url = require('url');
const querystring = require('querystring');

function getType(obj) {
  if (obj === undefined || obj === null) return false;
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

function append(urlStr, ...objs) {
  const urlParts = url.parse(urlStr, true);
  const append = [];

  append.push(urlParts.query);

  for (const obj of objs) {
    const objType = getType(obj);

    if (objType === 'string' && obj.includes('://')) {
      const parts = url.parse(obj, true);
      append.push(parts.query);
      continue;
    }

    if (objType === 'string') {
      let queryStr = obj.startsWith('?') ? obj.substr(1) : obj;
      if (queryStr.trim()) {
        append.push(querystring.parse(queryStr));
      }
      continue;
    }

    if (objType === 'object') {
      append.push(obj);
    }
  }

  if (append.length <= 1) return urlStr;

  const appendObj = Object.assign({}, ...append);
  const newQuery = querystring.stringify(appendObj);

  if (newQuery) {
    urlParts.search = `?${newQuery}`;
    urlParts.query = appendObj;
    return url.format(urlParts).replace(/%20/g, '+');
  } else {
    return urlStr;
  }
}

module.exports = append;

// vim: set ts=2 sw=2 et
