"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _reactNative = require("react-native");

var _reactNativeModal = _interopRequireDefault(require("react-native-modal"));

var _reactNativeSafeArea = _interopRequireDefault(require("react-native-safe-area"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _button = _interopRequireDefault(require("./button"));

var _cell = _interopRequireDefault(require("./cell"));

var _pickerCell = _interopRequireDefault(require("./picker-cell"));

var _keyboardAvoidingView = _interopRequireDefault(require("./keyboard-avoiding-view"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BottomSheet =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BottomSheet, _Component);

  function BottomSheet() {
    var _this;

    (0, _classCallCheck2.default)(this, BottomSheet);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BottomSheet).apply(this, arguments));
    _this.onSafeAreaInsetsUpdate = _this.onSafeAreaInsetsUpdate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      safeAreaBottomInset: 0
    };

    _reactNativeSafeArea.default.getSafeAreaInsetsForRootView().then(_this.onSafeAreaInsetsUpdate);

    return _this;
  }

  (0, _createClass2.default)(BottomSheet, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.safeAreaEventSubscription = _reactNativeSafeArea.default.addEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsUpdate);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.safeAreaEventSubscription === null) {
        return;
      }

      this.safeAreaEventSubscription.remove();
      this.safeAreaEventSubscription = null;

      _reactNativeSafeArea.default.removeEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsUpdate);
    }
  }, {
    key: "onSafeAreaInsetsUpdate",
    value: function onSafeAreaInsetsUpdate(result) {
      if (this.safeAreaEventSubscription === null) {
        return;
      }

      var safeAreaInsets = result.safeAreaInsets;

      if (this.state.safeAreaBottomInset !== safeAreaInsets.bottom) {
        this.setState({
          safeAreaBottomInset: safeAreaInsets.bottom
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$title = _this$props.title,
          title = _this$props$title === void 0 ? '' : _this$props$title,
          isVisible = _this$props.isVisible,
          leftButton = _this$props.leftButton,
          rightButton = _this$props.rightButton,
          hideHeader = _this$props.hideHeader,
          _this$props$style = _this$props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style,
          _this$props$contentSt = _this$props.contentStyle,
          contentStyle = _this$props$contentSt === void 0 ? {} : _this$props$contentSt;

      var panResponder = _reactNative.PanResponder.create({
        onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(evt, gestureState) {
          // Activates swipe down over child Touchables if the swipe is long enough.
          // With this we can adjust sensibility on the swipe vs tap gestures.
          if (gestureState.dy > 3) {
            gestureState.dy = 0;
            return true;
          }
        }
      });

      var getHeader = function getHeader() {
        return (0, _element.createElement)(_reactNative.View, null, (0, _element.createElement)(_reactNative.View, {
          style: _styles.default.head
        }, (0, _element.createElement)(_reactNative.View, {
          style: {
            flex: 1
          }
        }, leftButton), (0, _element.createElement)(_reactNative.View, {
          style: _styles.default.titleContainer
        }, (0, _element.createElement)(_reactNative.Text, {
          style: _styles.default.title
        }, title)), (0, _element.createElement)(_reactNative.View, {
          style: {
            flex: 1
          }
        }, rightButton)), (0, _element.createElement)(_reactNative.View, {
          style: _styles.default.separator
        }));
      };

      return (0, _element.createElement)(_reactNativeModal.default, {
        isVisible: isVisible,
        style: _styles.default.bottomModal,
        animationInTiming: 500,
        animationOutTiming: 500,
        backdropTransitionInTiming: 500,
        backdropTransitionOutTiming: 500,
        backdropOpacity: 0.2,
        onBackdropPress: this.props.onClose,
        onBackButtonPress: this.props.onClose,
        onSwipe: this.props.onClose,
        swipeDirection: "down",
        onMoveShouldSetResponder: panResponder.panHandlers.onMoveShouldSetResponder,
        onMoveShouldSetResponderCapture: panResponder.panHandlers.onMoveShouldSetResponderCapture
      }, (0, _element.createElement)(_keyboardAvoidingView.default, {
        behavior: _reactNative.Platform.OS === 'ios' && 'padding',
        style: (0, _objectSpread2.default)({}, _styles.default.background, {
          borderColor: 'rgba(0, 0, 0, 0.1)'
        }, style),
        keyboardVerticalOffset: -this.state.safeAreaBottomInset
      }, (0, _element.createElement)(_reactNative.View, {
        style: _styles.default.dragIndicator
      }), hideHeader && (0, _element.createElement)(_reactNative.View, {
        style: _styles.default.emptyHeaderSpace
      }), !hideHeader && getHeader(), (0, _element.createElement)(_reactNative.View, {
        style: [_styles.default.content, contentStyle]
      }, this.props.children), (0, _element.createElement)(_reactNative.View, {
        style: {
          height: this.state.safeAreaBottomInset
        }
      })));
    }
  }]);
  return BottomSheet;
}(_element.Component);

function getWidth() {
  return Math.min(_reactNative.Dimensions.get('window').width, _styles.default.background.maxWidth);
}

BottomSheet.getWidth = getWidth;
BottomSheet.Button = _button.default;
BottomSheet.Cell = _cell.default;
BottomSheet.PickerCell = _pickerCell.default;
var _default = BottomSheet;
exports.default = _default;
//# sourceMappingURL=index.native.js.map