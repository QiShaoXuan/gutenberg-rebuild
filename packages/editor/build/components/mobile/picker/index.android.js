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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _i18n = require("@wordpress/i18n");

var _editor = require("@wordpress/editor");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var Picker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Picker, _Component);

  function Picker() {
    var _this;

    (0, _classCallCheck2.default)(this, Picker);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Picker).apply(this, arguments));
    _this.onClose = _this.onClose.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onCellPress = _this.onCellPress.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      isVisible: false
    };
    return _this;
  }

  (0, _createClass2.default)(Picker, [{
    key: "presentPicker",
    value: function presentPicker() {
      this.setState({
        isVisible: true
      });
    }
  }, {
    key: "onClose",
    value: function onClose() {
      this.setState({
        isVisible: false
      });
    }
  }, {
    key: "onCellPress",
    value: function onCellPress(value) {
      this.props.onChange(value);
      this.onClose();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return (0, _element.createElement)(_editor.BottomSheet, {
        isVisible: this.state.isVisible,
        onClose: this.onClose,
        style: {
          paddingBottom: 20
        },
        hideHeader: true
      }, (0, _element.createElement)(_reactNative.View, null, this.props.options.map(function (option, index) {
        return (0, _element.createElement)(_editor.BottomSheet.Cell, {
          icon: option.icon,
          key: index,
          label: option.label,
          separatorType: 'none',
          onPress: function onPress() {
            return _this2.onCellPress(option.value);
          }
        });
      }), !this.props.hideCancelButton && (0, _element.createElement)(_editor.BottomSheet.Cell, {
        label: (0, _i18n.__)('Cancel'),
        onPress: this.onClose,
        separatorType: 'none'
      })));
    }
  }]);
  return Picker;
}(_element.Component);

exports.default = Picker;
//# sourceMappingURL=index.android.js.map