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
import { __ } from '@wordpress/i18n';
import { Button, ClipboardButton } from '@wordpress/components';
import { select } from '@wordpress/data';
import { Warning } from '@wordpress/block-editor';

var ErrorBoundary =
/*#__PURE__*/
function (_Component) {
  _inherits(ErrorBoundary, _Component);

  function ErrorBoundary() {
    var _this;

    _classCallCheck(this, ErrorBoundary);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ErrorBoundary).apply(this, arguments));
    _this.reboot = _this.reboot.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getContent = _this.getContent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      error: null
    };
    return _this;
  }

  _createClass(ErrorBoundary, [{
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
        return select('core/editor').getEditedPostContent();
      } catch (error) {}
    }
  }, {
    key: "render",
    value: function render() {
      var error = this.state.error;

      if (!error) {
        return this.props.children;
      }

      return createElement(Warning, {
        className: "editor-error-boundary",
        actions: [createElement(Button, {
          key: "recovery",
          onClick: this.reboot,
          isLarge: true
        }, __('Attempt Recovery')), createElement(ClipboardButton, {
          key: "copy-post",
          text: this.getContent,
          isLarge: true
        }, __('Copy Post Text')), createElement(ClipboardButton, {
          key: "copy-error",
          text: error.stack,
          isLarge: true
        }, __('Copy Error'))]
      }, __('The editor has encountered an unexpected error.'));
    }
  }]);

  return ErrorBoundary;
}(Component);

export default ErrorBoundary;
//# sourceMappingURL=index.js.map