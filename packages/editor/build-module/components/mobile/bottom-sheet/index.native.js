import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
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
import { Text, View, Platform, PanResponder, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import SafeArea from 'react-native-safe-area';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
/**
 * Internal dependencies
 */

import styles from './styles.scss';
import Button from './button';
import Cell from './cell';
import PickerCell from './picker-cell';
import KeyboardAvoidingView from './keyboard-avoiding-view';

var BottomSheet =
/*#__PURE__*/
function (_Component) {
  _inherits(BottomSheet, _Component);

  function BottomSheet() {
    var _this;

    _classCallCheck(this, BottomSheet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BottomSheet).apply(this, arguments));
    _this.onSafeAreaInsetsUpdate = _this.onSafeAreaInsetsUpdate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      safeAreaBottomInset: 0
    };
    SafeArea.getSafeAreaInsetsForRootView().then(_this.onSafeAreaInsetsUpdate);
    return _this;
  }

  _createClass(BottomSheet, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.safeAreaEventSubscription = SafeArea.addEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsUpdate);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.safeAreaEventSubscription === null) {
        return;
      }

      this.safeAreaEventSubscription.remove();
      this.safeAreaEventSubscription = null;
      SafeArea.removeEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsUpdate);
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
      var panResponder = PanResponder.create({
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
        return createElement(View, null, createElement(View, {
          style: styles.head
        }, createElement(View, {
          style: {
            flex: 1
          }
        }, leftButton), createElement(View, {
          style: styles.titleContainer
        }, createElement(Text, {
          style: styles.title
        }, title)), createElement(View, {
          style: {
            flex: 1
          }
        }, rightButton)), createElement(View, {
          style: styles.separator
        }));
      };

      return createElement(Modal, {
        isVisible: isVisible,
        style: styles.bottomModal,
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
      }, createElement(KeyboardAvoidingView, {
        behavior: Platform.OS === 'ios' && 'padding',
        style: _objectSpread({}, styles.background, {
          borderColor: 'rgba(0, 0, 0, 0.1)'
        }, style),
        keyboardVerticalOffset: -this.state.safeAreaBottomInset
      }, createElement(View, {
        style: styles.dragIndicator
      }), hideHeader && createElement(View, {
        style: styles.emptyHeaderSpace
      }), !hideHeader && getHeader(), createElement(View, {
        style: [styles.content, contentStyle]
      }, this.props.children), createElement(View, {
        style: {
          height: this.state.safeAreaBottomInset
        }
      })));
    }
  }]);

  return BottomSheet;
}(Component);

function getWidth() {
  return Math.min(Dimensions.get('window').width, styles.background.maxWidth);
}

BottomSheet.getWidth = getWidth;
BottomSheet.Button = Button;
BottomSheet.Cell = Cell;
BottomSheet.PickerCell = PickerCell;
export default BottomSheet;
//# sourceMappingURL=index.native.js.map