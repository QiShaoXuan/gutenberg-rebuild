"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorPaletteControl = ColorPaletteControl;
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _ = _interopRequireDefault(require("./"));

var _withColorContext = _interopRequireDefault(require("./with-color-context"));

var _colors = require("../colors");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
// translators: first %s: The type of color (e.g. background color), second %s: the color name or value (e.g. red or #ff0000)
var colorIndicatorAriaLabel = (0, _i18n.__)('(current %s: %s)');

function ColorPaletteControl(_ref) {
  var colors = _ref.colors,
      disableCustomColors = _ref.disableCustomColors,
      label = _ref.label,
      onChange = _ref.onChange,
      value = _ref.value;
  var colorObject = (0, _colors.getColorObjectByColorValue)(colors, value);
  var colorName = colorObject && colorObject.name;
  var ariaLabel = (0, _i18n.sprintf)(colorIndicatorAriaLabel, label.toLowerCase(), colorName || value);
  var labelElement = (0, _element.createElement)(_element.Fragment, null, label, value && (0, _element.createElement)(_components.ColorIndicator, {
    colorValue: value,
    "aria-label": ariaLabel
  }));
  return (0, _element.createElement)(_components.BaseControl, {
    className: "editor-color-palette-control block-editor-color-palette-control",
    label: labelElement
  }, (0, _element.createElement)(_.default, (0, _extends2.default)({
    className: "editor-color-palette-control__color-palette block-editor-color-palette-control__color-palette",
    value: value,
    onChange: onChange
  }, {
    colors: colors,
    disableCustomColors: disableCustomColors
  })));
}

var _default = (0, _compose.compose)([_withColorContext.default, (0, _compose.ifCondition)(function (_ref2) {
  var hasColorsToChoose = _ref2.hasColorsToChoose;
  return hasColorsToChoose;
})])(ColorPaletteControl);

exports.default = _default;
//# sourceMappingURL=control.js.map