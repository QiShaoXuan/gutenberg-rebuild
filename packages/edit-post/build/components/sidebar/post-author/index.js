"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostAuthor = PostAuthor;
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

/**
 * WordPress dependencies
 */
function PostAuthor() {
  return (0, _element.createElement)(_editor.PostAuthorCheck, null, (0, _element.createElement)(_components.PanelRow, null, (0, _element.createElement)(_editor.PostAuthor, null)));
}

var _default = PostAuthor;
exports.default = _default;
//# sourceMappingURL=index.js.map