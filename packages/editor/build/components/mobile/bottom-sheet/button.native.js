"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Button;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _reactNative = require("react-native");

var _styles = _interopRequireDefault(require("./styles.scss"));

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
function Button(props) {
  var onPress = props.onPress,
      disabled = props.disabled,
      text = props.text,
      color = props.color;
  return (0, _element.createElement)(_reactNative.TouchableOpacity, {
    accessible: true,
    onPress: onPress,
    disabled: disabled
  }, (0, _element.createElement)(_reactNative.View, {
    style: {
      flexDirection: 'row',
      justifyContent: 'center'
    }
  }, (0, _element.createElement)(_reactNative.Text, {
    style: (0, _objectSpread2.default)({}, _styles.default.buttonText, {
      color: color
    })
  }, text)));
}
//# sourceMappingURL=button.native.js.map