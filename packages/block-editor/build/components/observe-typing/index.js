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

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _dom = require("@wordpress/dom");

var _keycodes = require("@wordpress/keycodes");

var _compose = require("@wordpress/compose");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Set of key codes upon which typing is to be initiated on a keydown event.
 *
 * @type {number[]}
 */
var KEY_DOWN_ELIGIBLE_KEY_CODES = [_keycodes.UP, _keycodes.RIGHT, _keycodes.DOWN, _keycodes.LEFT, _keycodes.ENTER, _keycodes.BACKSPACE];
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
  return !shiftKey && (0, _lodash.includes)(KEY_DOWN_ELIGIBLE_KEY_CODES, keyCode);
}

var ObserveTyping =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ObserveTyping, _Component);

  function ObserveTyping() {
    var _this;

    (0, _classCallCheck2.default)(this, ObserveTyping);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ObserveTyping).apply(this, arguments));
    _this.stopTypingOnSelectionUncollapse = _this.stopTypingOnSelectionUncollapse.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.stopTypingOnMouseMove = _this.stopTypingOnMouseMove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.startTypingInTextField = _this.startTypingInTextField.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.stopTypingOnNonTextField = _this.stopTypingOnNonTextField.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.stopTypingOnEscapeKey = _this.stopTypingOnEscapeKey.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onKeyDown = (0, _lodash.over)([_this.startTypingInTextField, _this.stopTypingOnEscapeKey]);
    _this.lastMouseMove = null;
    return _this;
  }

  (0, _createClass2.default)(ObserveTyping, [{
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
      if (this.props.isTyping && event.keyCode === _keycodes.ESCAPE) {
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

      if (isTyping || !(0, _dom.isTextField)(target) || target.closest('.block-editor-block-toolbar')) {
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

        if (isTyping && !(0, _dom.isTextField)(target)) {
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

      return (0, _element.createElement)("div", {
        onFocus: this.stopTypingOnNonTextField,
        onKeyPress: this.startTypingInTextField,
        onKeyDown: this.onKeyDown
      }, children);
      /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
  }]);
  return ObserveTyping;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/block-editor'),
      isTyping = _select.isTyping;

  return {
    isTyping: isTyping()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      startTyping = _dispatch.startTyping,
      stopTyping = _dispatch.stopTyping;

  return {
    onStartTyping: startTyping,
    onStopTyping: stopTyping
  };
}), _compose.withSafeTimeout])(ObserveTyping);

exports.default = _default;
//# sourceMappingURL=index.js.map