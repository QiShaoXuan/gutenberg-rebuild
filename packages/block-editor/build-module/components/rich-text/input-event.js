import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
export var UnstableRichTextInputEvent =
/*#__PURE__*/
function (_Component) {
  _inherits(UnstableRichTextInputEvent, _Component);

  function UnstableRichTextInputEvent() {
    var _this;

    _classCallCheck(this, UnstableRichTextInputEvent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UnstableRichTextInputEvent).apply(this, arguments));
    _this.onInput = _this.onInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(UnstableRichTextInputEvent, [{
    key: "onInput",
    value: function onInput(event) {
      if (event.inputType === this.props.inputType) {
        this.props.onInput();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('input', this.onInput, true);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('input', this.onInput, true);
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return UnstableRichTextInputEvent;
}(Component);
//# sourceMappingURL=input-event.js.map