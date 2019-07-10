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
import { withInstanceId } from '@wordpress/compose';
import { __, _x } from '@wordpress/i18n';
import { Button, Notice } from '@wordpress/components';
/**
 * Internal dependencies
 */

import importReusableBlock from '../../utils/import';

var ImportForm =
/*#__PURE__*/
function (_Component) {
  _inherits(ImportForm, _Component);

  function ImportForm() {
    var _this;

    _classCallCheck(this, ImportForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImportForm).apply(this, arguments));
    _this.state = {
      isLoading: false,
      error: null,
      file: null
    };
    _this.isStillMounted = true;
    _this.onChangeFile = _this.onChangeFile.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSubmit = _this.onSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ImportForm, [{
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
      importReusableBlock(file).then(function (reusableBlock) {
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
            uiMessage = __('Invalid JSON file');
            break;

          case 'Invalid Reusable Block JSON file':
            uiMessage = __('Invalid Reusable Block JSON file');
            break;

          default:
            uiMessage = __('Unknown error');
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
      return createElement("form", {
        className: "list-reusable-blocks-import-form",
        onSubmit: this.onSubmit
      }, error && createElement(Notice, {
        status: "error"
      }, error), createElement("label", {
        htmlFor: inputId,
        className: "list-reusable-blocks-import-form__label"
      }, __('File')), createElement("input", {
        id: inputId,
        type: "file",
        onChange: this.onChangeFile
      }), createElement(Button, {
        type: "submit",
        isBusy: isLoading,
        disabled: !file || isLoading,
        isDefault: true,
        className: "list-reusable-blocks-import-form__button"
      }, _x('Import', 'button label')));
    }
  }]);

  return ImportForm;
}(Component);

export default withInstanceId(ImportForm);
//# sourceMappingURL=index.js.map