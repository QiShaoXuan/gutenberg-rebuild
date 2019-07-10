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
import { over, includes } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { isTextField } from '@wordpress/dom';
import { UP, RIGHT, DOWN, LEFT, ENTER, BACKSPACE, ESCAPE } from '@wordpress/keycodes';
import { withSafeTimeout, compose } from '@wordpress/compose';
/**
 * Set of key codes upon which typing is to be initiated on a keydown event.
 *
 * @type {number[]}
 */

var KEY_DOWN_ELIGIBLE_KEY_CODES = [UP, RIGHT, DOWN, LEFT, ENTER, BACKSPACE];
/**
 * Returns true if a given keydown event can be inferred as intent to start
 * typing, or false otherwise. A keydown is considered eligible if it is a
 * text navigation without shift active.
 *
 * @param {KeyboardEvent} event Keydown event to test.
 *
 * @return {boolean} Whether event is eligible to start typing.
 */

function isKeyDownEligibleForStartTyping(event) {
  var keyCode = event.keyCode,
      shiftKey = event.shiftKey;
  return !shiftKey && includes(KEY_DOWN_ELIGIBLE_KEY_CODES, keyCode);
}

var ObserveTyping =
/*#__PURE__*/
function (_Component) {
  _inherits(ObserveTyping, _Component);

  function ObserveTyping() {
    var _this;

    _classCallCheck(this, ObserveTyping);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ObserveTyping).apply(this, arguments));
    _this.stopTypingOnSelectionUncollapse = _this.stopTypingOnSelectionUncollapse.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.stopTypingOnMouseMove = _this.stopTypingOnMouseMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.startTypingInTextField = _this.startTypingInTextField.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.stopTypingOnNonTextField = _this.stopTypingOnNonTextField.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.stopTypingOnEscapeKey = _this.stopTypingOnEscapeKey.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onKeyDown = over([_this.startTypingInTextField, _this.stopTypingOnEscapeKey]);
    _this.lastMouseMove = null;
    return _this;
  }

  _createClass(ObserveTyping, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.toggleEventBindings(this.props.isTyping);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.isTyping !== prevProps.isTyping) {
        this.toggleEventBindings(this.props.isTyping);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleEventBindings(false);
    }
    /**
     * Bind or unbind events to the document when typing has started or stopped
     * respectively, or when component has become unmounted.
     *
     * @param {boolean} isBound Whether event bindings should be applied.
     */

  }, {
    key: "toggleEventBindings",
    value: function toggleEventBindings(isBound) {
      var bindFn = isBound ? 'addEventListener' : 'removeEventListener';
      document[bindFn]('selectionchange', this.stopTypingOnSelectionUncollapse);
      document[bindFn]('mousemove', this.stopTypingOnMouseMove);
    }
    /**
     * On mouse move, unset typing flag if user has moved cursor.
     *
     * @param {MouseEvent} event Mousemove event.
     */

  }, {
    key: "stopTypingOnMouseMove",
    value: function stopTypingOnMouseMove(event) {
      var clientX = event.clientX,
          clientY = event.clientY; // We need to check that the mouse really moved because Safari triggers
      // mousemove events when shift or ctrl are pressed.

      if (this.lastMouseMove) {
        var _this$lastMouseMove = this.lastMouseMove,
            lastClientX = _this$lastMouseMove.clientX,
            lastClientY = _this$lastMouseMove.clientY;

        if (lastClientX !== clientX || lastClientY !== clientY) {
          this.props.onStopTyping();
        }
      }

      this.lastMouseMove = {
        clientX: clientX,
        clientY: clientY
      };
    }
    /**
     * On selection change, unset typing flag if user has made an uncollapsed
     * (shift) selection.
     */

  }, {
    key: "stopTypingOnSelectionUncollapse",
    value: function stopTypingOnSelectionUncollapse() {
      var selection = window.getSelection();
      var isCollapsed = selection.rangeCount > 0 && selection.getRangeAt(0).collapsed;

      if (!isCollapsed) {
        this.props.onStopTyping();
      }
    }
    /**
     * Unsets typing flag if user presses Escape while typing flag is active.
     *
     * @param {KeyboardEvent} event Keypress or keydown event to interpret.
     */

  }, {
    key: "stopTypingOnEscapeKey",
    value: function stopTypingOnEscapeKey(event) {
      if (this.props.isTyping && event.keyCode === ESCAPE) {
        this.props.onStopTyping();
      }
    }
    /**
     * Handles a keypress or keydown event to infer intention to start typing.
     *
     * @param {KeyboardEvent} event Keypress or keydown event to interpret.
     */

  }, {
    key: "startTypingInTextField",
    value: function startTypingInTextField(event) {
      var _this$props = this.props,
          isTyping = _this$props.isTyping,
          onStartTyping = _this$props.onStartTyping;
      var type = event.type,
          target = event.target; // Abort early if already typing, or key press is incurred outside a
      // text field (e.g. arrow-ing through toolbar buttons).
      // Ignore typing in a block toolbar

      if (isTyping || !isTextField(target) || target.closest('.block-editor-block-toolbar')) {
        return;
      } // Special-case keydown because certain keys do not emit a keypress
      // event. Conversely avoid keydown as the canonical event since there
      // are many keydown which are explicitly not targeted for typing.


      if (type === 'keydown' && !isKeyDownEligibleForStartTyping(event)) {
        return;
      }

      onStartTyping();
    }
    /**
     * Stops typing when focus transitions to a non-text field element.
     *
     * @param {FocusEvent} event Focus event.
     */

  }, {
    key: "stopTypingOnNonTextField",
    value: function stopTypingOnNonTextField(event) {
      var _this2 = this;

      event.persist(); // Since focus to a non-text field via arrow key will trigger before
      // the keydown event, wait until after current stack before evaluating
      // whether typing is to be stopped. Otherwise, typing will re-start.

      this.props.setTimeout(function () {
        var _this2$props = _this2.props,
            isTyping = _this2$props.isTyping,
            onStopTyping = _this2$props.onStopTyping;
        var target = event.target;

        if (isTyping && !isTextField(target)) {
          onStopTyping();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children; // Disable reason: This component is responsible for capturing bubbled
      // keyboard events which are interpreted as typing intent.

      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return createElement("div", {
        onFocus: this.stopTypingOnNonTextField,
        onKeyPress: this.startTypingInTextField,
        onKeyDown: this.onKeyDown
      }, children);
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
  }]);

  return ObserveTyping;
}(Component);

export default compose([withSelect(function (select) {
  var _select = select('core/block-editor'),
      isTyping = _select.isTyping;

  return {
    isTyping: isTyping()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      startTyping = _dispatch.startTyping,
      stopTyping = _dispatch.stopTyping;

  return {
    onStartTyping: startTyping,
    onStopTyping: stopTyping
  };
}), withSafeTimeout])(ObserveTyping);
//# sourceMappingURL=index.js.map