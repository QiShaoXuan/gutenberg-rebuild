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

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _import = _interopRequireDefault(require("../../utils/import"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var ImportForm =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ImportForm, _Component);

  function ImportForm() {
    var _this;

    (0, _classCallCheck2.default)(this, ImportForm);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ImportForm).apply(this, arguments));
    _this.state = {
      isLoading: false,
      error: null,
      file: null
    };
    _this.isStillMounted = true;
    _this.onChangeFile = _this.onChangeFile.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSubmit = _this.onSubmit.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(ImportForm, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isStillMounted = false;
    }
  }, {
    key: "onChangeFile",
    value: function onChangeFile(event) {
      this.setState({
        file: event.target.files[0]
      });
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      var _this2 = this;

      event.preventDefault();
      var file = this.state.file;
      var onUpload = this.props.onUpload;

      if (!file) {
        return;
      }

      this.setState({
        isLoading: true
      });
      (0, _import.default)(file).then(function (reusableBlock) {
        if (!_this2.isStillMounted) {
          return;
        }

        _this2.setState({
          isLoading: false
        });

        onUpload(reusableBlock);
      }).catch(function (error) {
        if (!_this2.isStillMounted) {
          return;
        }

        var uiMessage;

        switch (error.message) {
          case 'Invalid JSON file':
            uiMessage = (0, _i18n.__)('Invalid JSON file');
            break;

          case 'Invalid Reusable Block JSON file':
            uiMessage = (0, _i18n.__)('Invalid Reusable Block JSON file');
            break;

          default:
            uiMessage = (0, _i18n.__)('Unknown error');
        }

        _this2.setState({
          isLoading: false,
          error: uiMessage
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var instanceId = this.props.instanceId;
      var _this$state = this.state,
          file = _this$state.file,
          isLoading = _this$state.isLoading,
          error = _this$state.error;
      var inputId = 'list-reusable-blocks-import-form-' + instanceId;
      return (0, _element.createElement)("form", {
        className: "list-reusable-blocks-import-form",
        onSubmit: this.onSubmit
      }, error && (0, _element.createElement)(_components.Notice, {
        status: "error"
      }, error), (0, _element.createElement)("label", {
        htmlFor: inputId,
        className: "list-reusable-blocks-import-form__label"
      }, (0, _i18n.__)('File')), (0, _element.createElement)("input", {
        id: inputId,
        type: "file",
        onChange: this.onChangeFile
      }), (0, _element.createElement)(_components.Button, {
        type: "submit",
        isBusy: isLoading,
        disabled: !file || isLoading,
        isDefault: true,
        className: "list-reusable-blocks-import-form__button"
      }, (0, _i18n._x)('Import', 'button label')));
    }
  }]);
  return ImportForm;
}(_element.Component);

var _default = (0, _compose.withInstanceId)(ImportForm);

exports.default = _default;
//# sourceMappingURL=index.js.map