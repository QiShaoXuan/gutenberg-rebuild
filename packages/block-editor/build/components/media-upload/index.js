"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */

/**
 * This is a placeholder for the media upload component necessary to make it possible to provide
 * an integration with the core blocks that handle media files. By default it renders nothing but
 * it provides a way to have it overridden with the `editor.MediaUpload` filter.
 *
 * @return {WPElement} Media upload element.
 */
var MediaUpload = function MediaUpload() {
  return null;
}; // Todo: rename the filter


var _default = (0, _components.withFilters)('editor.MediaUpload')(MediaUpload);

exports.default = _default;
//# sourceMappingURL=index.js.map