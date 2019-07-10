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
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { Popover, IconButton } from '@wordpress/components';

var URLPopover =
/*#__PURE__*/
function (_Component) {
  _inherits(URLPopover, _Component);

  function URLPopover() {
    var _this;

    _classCallCheck(this, URLPopover);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(URLPopover).apply(this, arguments));
    _this.toggleSettingsVisibility = _this.toggleSettingsVisibility.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      isSettingsExpanded: false
    };
    return _this;
  }

  _createClass(URLPopover, [{
    key: "toggleSettingsVisibility",
    value: function toggleSettingsVisibility() {
      this.setState({
        isSettingsExpanded: !this.state.isSettingsExpanded
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          renderSettings = _this$props.renderSettings,
          onClose = _this$props.onClose,
          onClickOutside = _this$props.onClickOutside,
          _this$props$position = _this$props.position,
          position = _this$props$position === void 0 ? 'bottom center' : _this$props$position,
          _this$props$focusOnMo = _this$props.focusOnMount,
          focusOnMount = _this$props$focusOnMo === void 0 ? 'firstElement' : _this$props$focusOnMo;
      var isSettingsExpanded = this.state.isSettingsExpanded;
      var showSettings = !!renderSettings && isSettingsExpanded;
      return createElement(Popover, {
        className: "editor-url-popover block-editor-url-popover",
        focusOnMount: focusOnMount,
        position: position,
        onClose: onClose,
        onClickOutside: onClickOutside
      }, createElement("div", {
        className: "editor-url-popover__row block-editor-url-popover__row"
      }, children, !!renderSettings && createElement(IconButton, {
        className: "editor-url-popover__settings-toggle block-editor-url-popover__settings-toggle",
        icon: "arrow-down-alt2",
        label: __('Link Settings'),
        onClick: this.toggleSettingsVisibility,
        "aria-expanded": isSettingsExpanded
      })), showSettings && createElement("div", {
        className: "editor-url-popover__row block-editor-url-popover__row editor-url-popover__settings block-editor-url-popover__settings"
      }, renderSettings()));
    }
  }]);

  return URLPopover;
}(Component);

export default URLPopover;
//# sourceMappingURL=index.js.map