"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCurrentURL = isCurrentURL;

var _url = require("url");

var _createUrl = require("./create-url");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Checks if current URL is a WordPress path.
 *
 * @param {string} WPPath String to be serialized as pathname.
 * @param {?string} query String to be serialized as query portion of URL.
 * @return {boolean} Boolean represents whether current URL is or not a WordPress path.
 */
function isCurrentURL(WPPath) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var currentURL = new _url.URL(page.url());
  currentURL.search = query;
  return (0, _createUrl.createURL)(WPPath) === currentURL.href;
}
//# sourceMappingURL=is-current-url.js.map