"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEmbeddingMatcher = createEmbeddingMatcher;

var _createUrlMatcher = require("./create-url-matcher");

/**
 * Internal dependencies
 */

/**
 * Creates a function to determine if a request has a parameter with a certain value.
 *
 * @param {string} parameterName The query parameter to check.
 * @param {string} value The value to check for.
 * @return {function} Function that determines if a request's query parameter is the specified value.
 */
function parameterEquals(parameterName, value) {
  return function (request) {
    var url = request.url();
    var match = new RegExp(".*".concat(parameterName, "=([^&]+).*")).exec(url);

    if (!match) {
      return false;
    }

    return value === decodeURIComponent(match[1]);
  };
}
/**
 * Creates a function to determine if a request is embedding a certain URL.
 *
 * @param {string} url The URL to check against a request.
 * @return {function} Function that determines if a request is for the embed API, embedding a specific URL.
 */


function createEmbeddingMatcher(url) {
  return function (request) {
    return (0, _createUrlMatcher.createURLMatcher)('oembed%2F1.0%2Fproxy')(request) && parameterEquals('url', url)(request);
  };
}
//# sourceMappingURL=create-embedding-matcher.js.map