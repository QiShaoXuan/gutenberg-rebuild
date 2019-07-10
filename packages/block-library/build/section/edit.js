"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function SectionEdit(_ref) {
  var className = _ref.className,
      setBackgroundColor = _ref.setBackgroundColor,
      backgroundColor = _ref.backgroundColor;
  var styles = {
    backgroundColor: backgroundColor.color
  };
  var classes = (0, _classnames.default)(className, backgroundColor.class, {
    'has-background': !!backgroundColor.color
  });
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_blockEditor.PanelColorSettings, {
    title: (0, _i18n.__)('Color Settings'),
    colorSettings: [{
      value: backgroundColor.color,
      onChange: setBackgroundColor,
      label: (0, _i18n.__)('Background Color')
    }]
  })), (0, _element.createElement)("div", {
    className: classes,
    style: styles
  }, (0, _element.createElement)(_blockEditor.InnerBlocks, null)));
}

var _default = (0, _blockEditor.withColors)('backgroundColor')(SectionEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map