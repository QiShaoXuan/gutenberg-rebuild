"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _reactNative = require("react-native");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _styles = _interopRequireDefault(require("./styles.scss"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function MediaPlaceholder(props) {
  return (0, _element.createElement)(_reactNative.TouchableWithoutFeedback, {
    onPress: props.onMediaOptionsPressed
  }, (0, _element.createElement)(_reactNative.View, {
    style: _styles.default.emptyStateContainer
  }, (0, _element.createElement)(_components.Dashicon, {
    icon: 'format-image'
  }), (0, _element.createElement)(_reactNative.Text, {
    style: _styles.default.emptyStateTitle
  }, (0, _i18n.__)('Image')), (0, _element.createElement)(_reactNative.Text, {
    style: _styles.default.emptyStateDescription
  }, (0, _i18n.__)('CHOOSE IMAGE'))));
}

var _default = MediaPlaceholder;
exports.default = _default;
//# sourceMappingURL=index.native.js.map