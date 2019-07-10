"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostPendingStatus = PostPendingStatus;
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

/**
 * WordPress dependencies
 */
function PostPendingStatus() {
  return (0, _element.createElement)(_editor.PostPendingStatusCheck, null, (0, _element.createElement)(_components.PanelRow, null, (0, _element.createElement)(_editor.PostPendingStatus, null)));
}

var _default = PostPendingStatus;
exports.default = _default;
//# sourceMappingURL=index.js.map