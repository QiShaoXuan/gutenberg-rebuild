"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _editor = require("@wordpress/editor");

var _taxonomyPanel = _interopRequireDefault(require("./taxonomy-panel"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function PostTaxonomies() {
  return (0, _element.createElement)(_editor.PostTaxonomiesCheck, null, (0, _element.createElement)(_editor.PostTaxonomies, {
    taxonomyWrapper: function taxonomyWrapper(content, taxonomy) {
      return (0, _element.createElement)(_taxonomyPanel.default, {
        taxonomy: taxonomy
      }, content);
    }
  }));
}

var _default = PostTaxonomies;
exports.default = _default;
//# sourceMappingURL=index.js.map