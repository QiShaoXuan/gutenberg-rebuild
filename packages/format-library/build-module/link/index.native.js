import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
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
import { find } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { withSpokenMessages } from '@wordpress/components';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { applyFormat, getActiveFormat, getTextContent, isCollapsed, removeFormat, slice } from '@wordpress/rich-text';
import { isURL } from '@wordpress/url';
/**
 * Internal dependencies
 */

import ModalLinkUI from './modal';
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
      key: "getLinkSelection",
      value: function getLinkSelection() {
        var _this$props2 = this.props,
            value = _this$props2.value,
            isActive = _this$props2.isActive;
        var startFormat = getActiveFormat(value, 'core/link'); // if the link isn't selected, get the link manually by looking around the cursor
        // TODO: handle partly selected links

        if (startFormat && isCollapsed(value) && isActive) {
          var startIndex = value.start;
          var endIndex = value.end;

          while (find(value.formats[startIndex], startFormat)) {
            startIndex--;
          }

          endIndex++;

          while (find(value.formats[endIndex], startFormat)) {
            endIndex++;
          }

          return _objectSpread({}, value, {
            start: startIndex + 1,
            end: endIndex
          });
        }

        return value;
      }
    }, {
      key: "onRemoveFormat",
      value: function onRemoveFormat() {
        var _this$props3 = this.props,
            onChange = _this$props3.onChange,
            speak = _this$props3.speak;
        var linkSelection = this.getLinkSelection();
        onChange(removeFormat(linkSelection, name));
        speak(__('Link removed.'), 'assertive');
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props4 = this.props,
            isActive = _this$props4.isActive,
            activeAttributes = _this$props4.activeAttributes,
            onChange = _this$props4.onChange;
        var linkSelection = this.getLinkSelection();
        return createElement(Fragment, null, createElement(ModalLinkUI, {
          isVisible: this.state.addingLink,
          isActive: isActive,
          activeAttributes: activeAttributes,
          onClose: this.stopAddingLink,
          onChange: onChange,
          onRemove: this.onRemoveFormat,
          value: linkSelection
        }), createElement(RichTextToolbarButton, {
          name: "link",
          icon: "admin-links",
          title: __('Link'),
          onClick: this.addLink,
          isActive: isActive,
          shortcutType: "primary",
          shortcutCharacter: "k"
        }));
      }
    }]);

    return LinkEdit;
  }(Component))
};
//# sourceMappingURL=index.native.js.map