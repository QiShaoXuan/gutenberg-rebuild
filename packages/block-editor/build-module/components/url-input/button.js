import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { IconButton } from '@wordpress/components';
/**
 * Internal dependencies
 */

import URLInput from './';

var URLInputButton =
/*#__PURE__*/
function (_Component) {
  _inherits(URLInputButton, _Component);

  function URLInputButton() {
    var _this;

    _classCallCheck(this, URLInputButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(URLInputButton).apply(this, arguments));
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.submitLink = _this.submitLink.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      expanded: false
    };
    return _this;
  }

  _createClass(URLInputButton, [{
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
      var buttonLabel = url ? __('Edit Link') : __('Insert Link');
      return createElement("div", {
        className: "editor-url-input__button block-editor-url-input__button"
      }, createElement(IconButton, {
        icon: "admin-links",
        label: buttonLabel,
        onClick: this.toggle,
        className: classnames('components-toolbar__control', {
          'is-active': url
        })
      }), expanded && createElement("form", {
        className: "editor-url-input__button-modal block-editor-url-input__button-modal",
        onSubmit: this.submitLink
      }, createElement("div", {
        className: "editor-url-input__button-modal-line block-editor-url-input__button-modal-line"
      }, createElement(IconButton, {
        className: "editor-url-input__back block-editor-url-input__back",
        icon: "arrow-left-alt",
        label: __('Close'),
        onClick: this.toggle
      }), createElement(URLInput, {
        value: url || '',
        onChange: onChange
      }), createElement(IconButton, {
        icon: "editor-break",
        label: __('Submit'),
        type: "submit"
      }))));
    }
  }]);

  return URLInputButton;
}(Component);

export default URLInputButton;
//# sourceMappingURL=button.js.map