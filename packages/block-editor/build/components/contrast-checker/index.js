"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function ContrastChecker(_ref) {
  var backgroundColor = _ref.backgroundColor,
      fallbackBackgroundColor = _ref.fallbackBackgroundColor,
      fallbackTextColor = _ref.fallbackTextColor,
      fontSize = _ref.fontSize,
      isLargeText = _ref.isLargeText,
      textColor = _ref.textColor;

  if (!(backgroundColor || fallbackBackgroundColor) || !(textColor || fallbackTextColor)) {
    return null;
  }

  var tinyBackgroundColor = (0, _tinycolor.default)(backgroundColor || fallbackBackgroundColor);
  var tinyTextColor = (0, _tinycolor.default)(textColor || fallbackTextColor);
  var hasTransparency = tinyBackgroundColor.getAlpha() !== 1 || tinyTextColor.getAlpha() !== 1;

  if (hasTransparency || _tinycolor.default.isReadable(tinyBackgroundColor, tinyTextColor, {
    level: 'AA',
    size: isLargeText || isLargeText !== false && fontSize >= 24 ? 'large' : 'small'
  })) {
    return null;
  }

  var msg = tinyBackgroundColor.getBrightness() < tinyTextColor.getBrightness() ? (0, _i18n.__)('This color combination may be hard for people to read. Try using a darker background color and/or a brighter text color.') : (0, _i18n.__)('This color combination may be hard for people to read. Try using a brighter background color and/or a darker text color.');
  return (0, _element.createElement)("div", {
    className: "editor-contrast-checker block-editor-contrast-checker"
  }, (0, _element.createElement)(_components.Notice, {
    status: "warning",
    isDismissible: false
  }, msg));
}

var _default = ContrastChecker;
exports.default = _default;
//# sourceMappingURL=index.js.map