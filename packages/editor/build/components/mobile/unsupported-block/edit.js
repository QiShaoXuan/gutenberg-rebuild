"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _reactNative = require("react-native");

var _style = _interopRequireDefault(require("./style.scss"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var UnsupportedBlockEdit =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(UnsupportedBlockEdit, _Component);

  function UnsupportedBlockEdit() {
    (0, _classCallCheck2.default)(this, UnsupportedBlockEdit);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(UnsupportedBlockEdit).apply(this, arguments));
  }

  (0, _createClass2.default)(UnsupportedBlockEdit, [{
    key: "render",
    value: function render() {
      return (0, _element.createElement)(_reactNative.View, {
        style: _style.default.unsupportedBlock
      }, (0, _element.createElement)(_reactNative.Text, {
        style: _style.default.unsupportedBlockMessage
      }, "Unsupported"));
    }
  }]);
  return UnsupportedBlockEdit;
}(_element.Component);

exports.default = UnsupportedBlockEdit;
//# sourceMappingURL=edit.js.map