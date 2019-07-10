import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import React from 'react';
import { Keyboard, LayoutAnimation, Platform, StyleSheet, View, Dimensions } from 'react-native';
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
  _inherits(KeyboardAvoidingView, _React$Component);

  function KeyboardAvoidingView() {
    var _this;

    _classCallCheck(this, KeyboardAvoidingView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(KeyboardAvoidingView).apply(this, arguments));
    _this._onKeyboardChange = _this._onKeyboardChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._subscriptions = [];
    _this.state = {
      bottom: 0
    };
    return _this;
  }

  _createClass(KeyboardAvoidingView, [{
    key: "_relativeKeyboardHeight",
    value: function _relativeKeyboardHeight(keyboardFrame) {
      if (!keyboardFrame) {
        return 0;
      }

      var windowHeight = Dimensions.get('window').height;
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
        LayoutAnimation.configureNext({
          duration: duration,
          update: {
            duration: duration,
            type: LayoutAnimation.Types[easing] || 'keyboard'
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
      if (Platform.OS === 'ios') {
        this._subscriptions = [Keyboard.addListener('keyboardWillChangeFrame', this._onKeyboardChange)];
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
          props = _objectWithoutProperties(_this$props, ["children", "enabled", "keyboardVerticalOffset", "style"]);

      var finalStyle = style;

      if (Platform.OS === 'ios') {
        var bottomHeight = enabled ? this.state.bottom : 0;
        finalStyle = StyleSheet.compose(style, {
          paddingBottom: bottomHeight
        });
      }

      return createElement(View, _extends({
        style: finalStyle
      }, props), children);
    }
  }]);

  return KeyboardAvoidingView;
}(React.Component);

KeyboardAvoidingView.defaultProps = {
  enabled: true,
  keyboardVerticalOffset: 0
};
export default KeyboardAvoidingView;
//# sourceMappingURL=keyboard-avoiding-view.native.js.map