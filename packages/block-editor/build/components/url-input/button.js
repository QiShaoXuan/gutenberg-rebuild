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

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _ = _interopRequireDefault(require("./"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var URLInputButton =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(URLInputButton, _Component);

  function URLInputButton() {
    var _this;

    (0, _classCallCheck2.default)(this, URLInputButton);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(URLInputButton).apply(this, arguments));
    _this.toggle = _this.toggle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.submitLink = _this.submitLink.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      expanded: false
    };
    return _this;
  }

  (0, _createClass2.default)(URLInputButton, [{
    key: "toggle",
    value: function toggle() {
      this.setState({
        expanded: !this.state.expanded
      });
    }
  }, {
    key: "submitLink",
    value: function submitLink(event) {
      event.preventDefault();
      this.toggle();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          url = _this$props.url,
          onChange = _this$props.onChange;
      var expanded = this.state.expanded;
      var buttonLabel = url ? (0, _i18n.__)('Edit Link') : (0, _i18n.__)('Insert Link');
      return (0, _element.createElement)("div", {
        className: "editor-url-input__button block-editor-url-input__button"
      }, (0, _element.createElement)(_components.IconButton, {
        icon: "admin-links",
        label: buttonLabel,
        onClick: this.toggle,
        className: (0, _classnames.default)('components-toolbar__control', {
          'is-active': url
        })
      }), expanded && (0, _element.createElement)("form", {
        className: "editor-url-input__button-modal block-editor-url-input__button-modal",
        onSubmit: this.submitLink
      }, (0, _element.createElement)("div", {
        className: "editor-url-input__button-modal-line block-editor-url-input__button-modal-line"
      }, (0, _element.createElement)(_components.IconButton, {
        className: "editor-url-input__back block-editor-url-input__back",
        icon: "arrow-left-alt",
        label: (0, _i18n.__)('Close'),
        onClick: this.toggle
      }), (0, _element.createElement)(_.default, {
        value: url || '',
        onChange: onChange
      }), (0, _element.createElement)(_components.IconButton, {
        icon: "editor-break",
        label: (0, _i18n.__)('Submit'),
        type: "submit"
      }))));
    }
  }]);
  return URLInputButton;
}(_element.Component);

var _default = URLInputButton;
exports.default = _default;
//# sourceMappingURL=button.js.map