import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { KeyboardShortcuts } from '@wordpress/components';
import { rawShortcut } from '@wordpress/keycodes';
export var RichTextShortcut =
/*#__PURE__*/
function (_Component) {
  _inherits(RichTextShortcut, _Component);

  function RichTextShortcut() {
    var _this;

    _classCallCheck(this, RichTextShortcut);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RichTextShortcut).apply(this, arguments));
    _this.onUse = _this.onUse.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(RichTextShortcut, [{
    key: "onUse",
    value: function onUse() {
      this.props.onUse();
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          character = _this$props.character,
          type = _this$props.type;
      return createElement(KeyboardShortcuts, {
        bindGlobal: true,
        shortcuts: _defineProperty({}, rawShortcut[type](character), this.onUse)
      });
    }
  }]);

  return RichTextShortcut;
}(Component);
//# sourceMappingURL=shortcut.js.map