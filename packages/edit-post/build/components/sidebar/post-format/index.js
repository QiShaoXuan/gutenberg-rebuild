"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostFormat = PostFormat;
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

/**
 * WordPress dependencies
 */
function PostFormat() {
  return (0, _element.createElement)(_editor.PostFormatCheck, null, (0, _element.createElement)(_components.PanelRow, null, (0, _element.createElement)(_editor.PostFormat, null)));
}

var _default = PostFormat;
exports.default = _default;
//# sourceMappingURL=index.js.map