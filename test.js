const assert = require('assert');
const append = require('./module');

describe('append-querystring', () => {
  it('should append query parameters from multiple sources', () => {
    const original = 'http://landing-page.com/?s1=sid1&sid2=sid3';
    const result = append(
      "http://click-url.com/?affid=1",
      original,
      { object_format_sid: "Hello Friends" }
    );
    assert.strictEqual(
      result,
      'http://click-url.com/?affid=1&s1=sid1&sid2=sid3&object_format_sid=Hello+Friends'
    );
  });

  it('should handle URL strings', () => {
    const result = append(
      'http://example.com',
      'http://test.com?foo=bar'
    );
    assert.strictEqual(result, 'http://example.com/?foo=bar');
  });

  it('should handle query string parameters', () => {
    const result = append('http://example.com', '?param1=value1&param2=value2');
    assert.strictEqual(result, 'http://example.com/?param1=value1&param2=value2');
  });

  it('should handle object parameters', () => {
    const result = append('http://example.com', { key1: 'value1', key2: 'value2' });
    assert.strictEqual(result, 'http://example.com/?key1=value1&key2=value2');
  });

  it('should return the original URL if no parameters are provided', () => {
    const original = 'http://example.com';
    const result = append(original);
    assert.strictEqual(result, original);
  });

  it('should handle invalid inputs gracefully', () => {
    const result = append('http://example.com', 'invalid query string', null, undefined);
    assert.strictEqual(result, 'http://example.com/?invalid+query+string=');
  });

});

// vim: set ts=2 sw=2 et
