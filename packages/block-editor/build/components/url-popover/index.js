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

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */
var URLPopover =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(URLPopover, _Component);

  function URLPopover() {
    var _this;

    (0, _classCallCheck2.default)(this, URLPopover);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(URLPopover).apply(this, arguments));
    _this.toggleSettingsVisibility = _this.toggleSettingsVisibility.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      isSettingsExpanded: false
    };
    return _this;
  }

  (0, _createClass2.default)(URLPopover, [{
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
      return (0, _element.createElement)(_components.Popover, {
        className: "editor-url-popover block-editor-url-popover",
        focusOnMount: focusOnMount,
        position: position,
        onClose: onClose,
        onClickOutside: onClickOutside
      }, (0, _element.createElement)("div", {
        className: "editor-url-popover__row block-editor-url-popover__row"
      }, children, !!renderSettings && (0, _element.createElement)(_components.IconButton, {
        className: "editor-url-popover__settings-toggle block-editor-url-popover__settings-toggle",
        icon: "arrow-down-alt2",
        label: (0, _i18n.__)('Link Settings'),
        onClick: this.toggleSettingsVisibility,
        "aria-expanded": isSettingsExpanded
      })), showSettings && (0, _element.createElement)("div", {
        className: "editor-url-popover__row block-editor-url-popover__row editor-url-popover__settings block-editor-url-popover__settings"
      }, renderSettings()));
    }
  }]);
  return URLPopover;
}(_element.Component);

var _default = URLPopover;
exports.default = _default;
//# sourceMappingURL=index.js.map