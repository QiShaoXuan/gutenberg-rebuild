"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createURLMatcher = createURLMatcher;

/**
 * Creates a function to determine if a request is calling a URL with the substring present.
 *
 * @param {string} substring The substring to check for.
 * @return {function} Function that determines if a request's URL contains substring.
 */
function createURLMatcher(substring) {
  return function (request) {
    return -1 !== request.url().indexOf(substring);
  };
}
//# sourceMappingURL=create-url-matcher.js.map