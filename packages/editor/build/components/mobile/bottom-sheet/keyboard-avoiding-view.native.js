"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

/**
 * External dependencies
 */

/**
 * This is a simplified version of Facebook's KeyboardAvoidingView.
 * It's meant to work specifically with BottomSheets.
 * This fixes an issue in the bottom padding calculation, when the
 * BottomSheet was presented on Landscape, with the keyboard already present,
 * and a TextField on Autofocus (situation present on Links UI)
 */
var KeyboardAvoidingView =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(KeyboardAvoidingView, _React$Component);

  function KeyboardAvoidingView() {
    var _this;

    (0, _classCallCheck2.default)(this, KeyboardAvoidingView);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(KeyboardAvoidingView).apply(this, arguments));
    _this._onKeyboardChange = _this._onKeyboardChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this._subscriptions = [];
    _this.state = {
      bottom: 0
    };
    return _this;
  }

  (0, _createClass2.default)(KeyboardAvoidingView, [{
    key: "_relativeKeyboardHeight",
    value: function _relativeKeyboardHeight(keyboardFrame) {
      if (!keyboardFrame) {
        return 0;
      }

      var windowHeight = _reactNative.Dimensions.get('window').height;

      var keyboardY = keyboardFrame.screenY - this.props.keyboardVerticalOffset;
      var final = Math.max(windowHeight - keyboardY, 0);
      return final;
    }
    /**
     * @param {Object} event Keyboard event.
     */

  }, {
    key: "_onKeyboardChange",
    value: function _onKeyboardChange(event) {
      if (event === null) {
        this.setState({
          bottom: 0
        });
        return;
      }

      var duration = event.duration,
          easing = event.easing,
          endCoordinates = event.endCoordinates;

      var height = this._relativeKeyboardHeight(endCoordinates);

      if (this.state.bottom === height) {
        return;
      }

      if (duration && easing) {
        _reactNative.LayoutAnimation.configureNext({
          duration: duration,
          update: {
            duration: duration,
            type: _reactNative.LayoutAnimation.Types[easing] || 'keyboard'
          }
        });
      }

      this.setState({
        bottom: height
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (_reactNative.Platform.OS === 'ios') {
        this._subscriptions = [_reactNative.Keyboard.addListener('keyboardWillChangeFrame', this._onKeyboardChange)];
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._subscriptions.forEach(function (subscription) {
        subscription.remove();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          enabled = _this$props.enabled,
          keyboardVerticalOffset = _this$props.keyboardVerticalOffset,
          style = _this$props.style,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["children", "enabled", "keyboardVerticalOffset", "style"]);
      var finalStyle = style;

      if (_reactNative.Platform.OS === 'ios') {
        var bottomHeight = enabled ? this.state.bottom : 0;
        finalStyle = _reactNative.StyleSheet.compose(style, {
          paddingBottom: bottomHeight
        });
      }

      return (0, _element.createElement)(_reactNative.View, (0, _extends2.default)({
        style: finalStyle
      }, props), children);
    }
  }]);
  return KeyboardAvoidingView;
}(_react.default.Component);

KeyboardAvoidingView.defaultProps = {
  enabled: true,
  keyboardVerticalOffset: 0
};
var _default = KeyboardAvoidingView;
exports.default = _default;
//# sourceMappingURL=keyboard-avoiding-view.native.js.map