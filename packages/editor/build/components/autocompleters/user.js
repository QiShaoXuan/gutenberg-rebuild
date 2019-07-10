"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

/**
 * WordPress dependencies
 */

/**
* A user mentions completer.
*
* @type {Completer}
*/
var _default = {
  name: 'users',
  className: 'editor-autocompleters__user',
  triggerPrefix: '@',
  options: function options(search) {
    var payload = '';

    if (search) {
      payload = '?search=' + encodeURIComponent(search);
    }

    return (0, _apiFetch.default)({
      path: '/wp/v2/users' + payload
    });
  },
  isDebounced: true,
  getOptionKeywords: function getOptionKeywords(user) {
    return [user.slug, user.name];
  },
  getOptionLabel: function getOptionLabel(user) {
    return [(0, _element.createElement)("img", {
      key: "avatar",
      className: "editor-autocompleters__user-avatar",
      alt: "",
      src: user.avatar_urls[24]
    }), (0, _element.createElement)("span", {
      key: "name",
      className: "editor-autocompleters__user-name"
    }, user.name), (0, _element.createElement)("span", {
      key: "slug",
      className: "editor-autocompleters__user-slug"
    }, user.slug)];
  },
  getOptionCompletion: function getOptionCompletion(user) {
    return "@".concat(user.slug);
  }
};
exports.default = _default;
//# sourceMappingURL=user.js.map