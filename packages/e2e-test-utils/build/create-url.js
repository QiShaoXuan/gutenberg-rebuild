"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createURL = createURL;

var _path = require("path");

var _url = require("url");

var _config = require("./shared/config");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Creates new URL by parsing base URL, WPPath and query string.
 *
 * @param {string} WPPath String to be serialized as pathname.
 * @param {?string} query String to be serialized as query portion of URL.
 * @return {string} String which represents full URL.
 */
function createURL(WPPath) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var url = new _url.URL(_config.WP_BASE_URL);
  url.pathname = (0, _path.join)(url.pathname, WPPath);
  url.search = query;
  return url.href;
}
//# sourceMappingURL=create-url.js.map