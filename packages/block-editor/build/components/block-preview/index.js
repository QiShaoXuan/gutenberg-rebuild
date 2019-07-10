"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockPreviewContent = BlockPreviewContent;
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _components = require("@wordpress/components");

var _blockEdit = _interopRequireDefault(require("../block-edit"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Block Preview Component: It renders a preview given a block name and attributes.
 *
 * @param {Object} props Component props.
 *
 * @return {WPElement} Rendered element.
 */
function BlockPreview(props) {
  return (0, _element.createElement)("div", {
    className: "editor-block-preview block-editor-block-preview"
  }, (0, _element.createElement)("div", {
    className: "editor-block-preview__title block-editor-block-preview__title"
  }, (0, _i18n.__)('Preview')), (0, _element.createElement)(BlockPreviewContent, props));
}

function BlockPreviewContent(_ref) {
  var name = _ref.name,
      attributes = _ref.attributes;
  var block = (0, _blocks.createBlock)(name, attributes);
  return (0, _element.createElement)(_components.Disabled, {
    className: "editor-block-preview__content block-editor-block-preview__content editor-styles-wrapper",
    "aria-hidden": true
  }, (0, _element.createElement)(_blockEdit.default, {
    name: name,
    focus: false,
    attributes: block.attributes,
    setAttributes: _lodash.noop
  }));
}

var _default = BlockPreview;
exports.default = _default;
//# sourceMappingURL=index.js.map