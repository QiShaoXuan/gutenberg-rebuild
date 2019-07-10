"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NextPageEdit;

var _element = require("@wordpress/element");

var _reactNative = require("react-native");

var _reactNativeHr = _interopRequireDefault(require("react-native-hr"));

var _i18n = require("@wordpress/i18n");

var _editor = _interopRequireDefault(require("./editor.scss"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function NextPageEdit(_ref) {
  var attributes = _ref.attributes;
  var _attributes$customTex = attributes.customText,
      customText = _attributes$customTex === void 0 ? (0, _i18n.__)('Page break') : _attributes$customTex;
  return (0, _element.createElement)(_reactNative.View, {
    style: _editor.default['block-library-nextpage__container']
  }, (0, _element.createElement)(_reactNativeHr.default, {
    text: customText,
    textStyle: _editor.default['block-library-nextpage__text'],
    lineStyle: _editor.default['block-library-nextpage__line']
  }));
}
//# sourceMappingURL=edit.native.js.map