"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

/**
 * WordPress dependencies
 */
function LastRevision() {
  return (0, _element.createElement)(_editor.PostLastRevisionCheck, null, (0, _element.createElement)(_components.PanelBody, {
    className: "edit-post-last-revision__panel"
  }, (0, _element.createElement)(_editor.PostLastRevision, null)));
}

var _default = LastRevision;
exports.default = _default;
//# sourceMappingURL=index.js.map