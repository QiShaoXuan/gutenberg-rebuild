import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
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
import React from 'react';
import { Switch, Platform } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { BottomSheet } from '@wordpress/editor';
import { prependHTTP } from '@wordpress/url';
import { withSpokenMessages } from '@wordpress/components';
import { create, insert, isCollapsed, applyFormat, getTextContent, slice } from '@wordpress/rich-text';
/**
 * Internal dependencies
 */

import { createLinkFormat, isValidHref } from './utils';
import styles from './modal.scss';

var ModalLinkUI =
/*#__PURE__*/
function (_Component) {
  _inherits(ModalLinkUI, _Component);

  function ModalLinkUI() {
    var _this;

    _classCallCheck(this, ModalLinkUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ModalLinkUI).apply(this, arguments));
    _this.submitLink = _this.submitLink.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onChangeInputValue = _this.onChangeInputValue.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onChangeText = _this.onChangeText.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onChangeOpensInNewWindow = _this.onChangeOpensInNewWindow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.removeLink = _this.removeLink.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onDismiss = _this.onDismiss.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      inputValue: '',
      text: '',
      opensInNewWindow: false
    };
    return _this;
  }

  _createClass(ModalLinkUI, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps) {
      if (oldProps === this.props) {
        return;
      }

      this.setState({
        inputValue: this.props.activeAttributes.url || '',
        text: getTextContent(slice(this.props.value)),
        opensInNewWindow: false
      });
    }
  }, {
    key: "onChangeInputValue",
    value: function onChangeInputValue(inputValue) {
      this.setState({
        inputValue: inputValue
      });
    }
  }, {
    key: "onChangeText",
    value: function onChangeText(text) {
      this.setState({
        text: text
      });
    }
  }, {
    key: "onChangeOpensInNewWindow",
    value: function onChangeOpensInNewWindow(opensInNewWindow) {
      this.setState({
        opensInNewWindow: opensInNewWindow
      });
    }
  }, {
    key: "submitLink",
    value: function submitLink() {
      var _this$props = this.props,
          isActive = _this$props.isActive,
          onChange = _this$props.onChange,
          speak = _this$props.speak,
          value = _this$props.value;
      var _this$state = this.state,
          inputValue = _this$state.inputValue,
          opensInNewWindow = _this$state.opensInNewWindow,
          text = _this$state.text;
      var url = prependHTTP(inputValue);
      var linkText = text || inputValue;
      var format = createLinkFormat({
        url: url,
        opensInNewWindow: opensInNewWindow,
        text: linkText
      });
      var placeholderFormats = value.formatPlaceholder && value.formatPlaceholder.formats || [];

      if (isCollapsed(value) && !isActive) {
        // insert link
        var toInsert = applyFormat(create({
          text: linkText
        }), [].concat(_toConsumableArray(placeholderFormats), [format]), 0, linkText.length);
        var newAttributes = insert(value, toInsert);
        onChange(_objectSpread({}, newAttributes, {
          needsSelectionUpdate: true
        }));
      } else if (text !== getTextContent(slice(value))) {
        // edit text in selected link
        var _toInsert = applyFormat(create({
          text: text
        }), [].concat(_toConsumableArray(placeholderFormats), [format]), 0, text.length);

        var _newAttributes = insert(value, _toInsert, value.start, value.end);

        onChange(_objectSpread({}, _newAttributes, {
          needsSelectionUpdate: true
        }));
      } else {
        // transform selected text into link
        var _newAttributes2 = applyFormat(value, [].concat(_toConsumableArray(placeholderFormats), [format]));

        onChange(_objectSpread({}, _newAttributes2, {
          needsSelectionUpdate: true
        }));
      }

      if (!isValidHref(url)) {
        speak(__('Warning: the link has been inserted but may have errors. Please test it.'), 'assertive');
      } else if (isActive) {
        speak(__('Link edited.'), 'assertive');
      } else {
        speak(__('Link inserted'), 'assertive');
      }

      this.props.onClose();
    }
  }, {
    key: "removeLink",
    value: function removeLink() {
      this.props.onRemove();
      this.props.onClose();
    }
  }, {
    key: "onDismiss",
    value: function onDismiss() {
      if (this.state.inputValue === '') {
        this.removeLink();
      } else {
        this.submitLink();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var isVisible = this.props.isVisible;
      return createElement(BottomSheet, {
        isVisible: isVisible,
        onClose: this.onDismiss,
        hideHeader: true
      },
      /* eslint-disable jsx-a11y/no-autofocus */
      createElement(BottomSheet.Cell, {
        icon: 'admin-links',
        label: __('URL'),
        value: this.state.inputValue,
        placeholder: __('Add URL'),
        autoCapitalize: "none",
        autoCorrect: false,
        keyboardType: "url",
        onChangeValue: this.onChangeInputValue,
        autoFocus: Platform.OS === 'ios'
      })
      /* eslint-enable jsx-a11y/no-autofocus */
      , createElement(BottomSheet.Cell, {
        icon: 'editor-textcolor',
        label: __('Link Text'),
        value: this.state.text,
        placeholder: __('Add Link Text'),
        onChangeValue: this.onChangeText
      }), createElement(BottomSheet.Cell, {
        icon: 'external',
        label: __('Open in New Tab'),
        value: ''
      }, createElement(Switch, {
        value: this.state.opensInNewWindow,
        onValueChange: this.onChangeOpensInNewWindow
      })), createElement(BottomSheet.Cell, {
        label: __('Remove Link'),
        labelStyle: styles.clearLinkButton,
        separatorType: 'none',
        onPress: this.removeLink
      }));
    }
  }]);

  return ModalLinkUI;
}(Component);

export default withSpokenMessages(ModalLinkUI);
//# sourceMappingURL=modal.native.js.map