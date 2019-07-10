"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostSticky = PostSticky;
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

/**
 * WordPress dependencies
 */
function PostSticky() {
  return (0, _element.createElement)(_editor.PostStickyCheck, null, (0, _element.createElement)(_components.PanelRow, null, (0, _element.createElement)(_editor.PostSticky, null)));
}

var _default = PostSticky;
exports.default = _default;
//# sourceMappingURL=index.js.map