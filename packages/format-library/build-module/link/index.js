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
import { Component, Fragment } from '@wordpress/element';
import { withSpokenMessages } from '@wordpress/components';
import { getTextContent, applyFormat, removeFormat, slice } from '@wordpress/rich-text';
import { isURL } from '@wordpress/url';
import { RichTextToolbarButton, RichTextShortcut } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import InlineLinkUI from './inline';
var name = 'core/link';
export var link = {
  name: name,
  title: __('Link'),
  tagName: 'a',
  className: null,
  attributes: {
    url: 'href',
    target: 'target'
  },
  edit: withSpokenMessages(
  /*#__PURE__*/
  function (_Component) {
    _inherits(LinkEdit, _Component);

    function LinkEdit() {
      var _this;

      _classCallCheck(this, LinkEdit);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(LinkEdit).apply(this, arguments));
      _this.addLink = _this.addLink.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.stopAddingLink = _this.stopAddingLink.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onRemoveFormat = _this.onRemoveFormat.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {
        addingLink: false
      };
      return _this;
    }

    _createClass(LinkEdit, [{
      key: "addLink",
      value: function addLink() {
        var _this$props = this.props,
            value = _this$props.value,
            onChange = _this$props.onChange;
        var text = getTextContent(slice(value));

        if (text && isURL(text)) {
          onChange(applyFormat(value, {
            type: name,
            attributes: {
              url: text
            }
          }));
        } else {
          this.setState({
            addingLink: true
          });
        }
      }
    }, {
      key: "stopAddingLink",
      value: function stopAddingLink() {
        this.setState({
          addingLink: false
        });
      }
    }, {
      key: "onRemoveFormat",
      value: function onRemoveFormat() {
        var _this$props2 = this.props,
            value = _this$props2.value,
            onChange = _this$props2.onChange,
            speak = _this$props2.speak;
        onChange(removeFormat(value, name));
        speak(__('Link removed.'), 'assertive');
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props3 = this.props,
            isActive = _this$props3.isActive,
            activeAttributes = _this$props3.activeAttributes,
            value = _this$props3.value,
            onChange = _this$props3.onChange;
        return createElement(Fragment, null, createElement(RichTextShortcut, {
          type: "access",
          character: "a",
          onUse: this.addLink
        }), createElement(RichTextShortcut, {
          type: "access",
          character: "s",
          onUse: this.onRemoveFormat
        }), createElement(RichTextShortcut, {
          type: "primary",
          character: "k",
          onUse: this.addLink
        }), createElement(RichTextShortcut, {
          type: "primaryShift",
          character: "k",
          onUse: this.onRemoveFormat
        }), isActive && createElement(RichTextToolbarButton, {
          name: "link",
          icon: "editor-unlink",
          title: __('Unlink'),
          onClick: this.onRemoveFormat,
          isActive: isActive,
          shortcutType: "primaryShift",
          shortcutCharacter: "k"
        }), !isActive && createElement(RichTextToolbarButton, {
          name: "link",
          icon: "admin-links",
          title: __('Link'),
          onClick: this.addLink,
          isActive: isActive,
          shortcutType: "primary",
          shortcutCharacter: "k"
        }), createElement(InlineLinkUI, {
          addingLink: this.state.addingLink,
          stopAddingLink: this.stopAddingLink,
          isActive: isActive,
          activeAttributes: activeAttributes,
          value: value,
          onChange: onChange
        }));
      }
    }]);

    return LinkEdit;
  }(Component))
};
//# sourceMappingURL=index.js.map