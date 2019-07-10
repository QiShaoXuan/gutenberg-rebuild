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

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
var ErrorBoundary =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ErrorBoundary, _Component);

  function ErrorBoundary() {
    var _this;

    (0, _classCallCheck2.default)(this, ErrorBoundary);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ErrorBoundary).apply(this, arguments));
    _this.reboot = _this.reboot.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getContent = _this.getContent.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      error: null
    };
    return _this;
  }

  (0, _createClass2.default)(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error) {
      this.setState({
        error: error
      });
    }
  }, {
    key: "reboot",
    value: function reboot() {
      this.props.onError();
    }
  }, {
    key: "getContent",
    value: function getContent() {
      try {
        // While `select` in a component is generally discouraged, it is
        // used here because it (a) reduces the chance of data loss in the
        // case of additional errors by performing a direct retrieval and
        // (b) avoids the performance cost associated with unnecessary
        // content serialization throughout the lifetime of a non-erroring
        // application.
        return (0, _data.select)('core/editor').getEditedPostContent();
      } catch (error) {}
    }
  }, {
    key: "render",
    value: function render() {
      var error = this.state.error;

      if (!error) {
        return this.props.children;
      }

      return (0, _element.createElement)(_blockEditor.Warning, {
        className: "editor-error-boundary",
        actions: [(0, _element.createElement)(_components.Button, {
          key: "recovery",
          onClick: this.reboot,
          isLarge: true
        }, (0, _i18n.__)('Attempt Recovery')), (0, _element.createElement)(_components.ClipboardButton, {
          key: "copy-post",
          text: this.getContent,
          isLarge: true
        }, (0, _i18n.__)('Copy Post Text')), (0, _element.createElement)(_components.ClipboardButton, {
          key: "copy-error",
          text: error.stack,
          isLarge: true
        }, (0, _i18n.__)('Copy Error'))]
      }, (0, _i18n.__)('The editor has encountered an unexpected error.'));
    }
  }]);
  return ErrorBoundary;
}(_element.Component);

var _default = ErrorBoundary;
exports.default = _default;
//# sourceMappingURL=index.js.map