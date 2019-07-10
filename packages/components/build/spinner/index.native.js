"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Spinner;

var _element = require("@wordpress/element");

var _reactNative = require("react-native");

/**
 * External dependencies
 */
function Spinner(props) {
  var progress = props.progress;
  var width = progress + '%';
  return (0, _element.createElement)(_reactNative.View, {
    style: {
      flex: 1,
      height: 5,
      backgroundColor: '#c8d7e1'
    }
  }, (0, _element.createElement)(_reactNative.View, {
    style: {
      width: width,
      height: 5,
      backgroundColor: '#0087be'
    }
  }));
}
//# sourceMappingURL=index.native.js.map