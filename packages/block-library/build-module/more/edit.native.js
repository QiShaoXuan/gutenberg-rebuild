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
import { View } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { getDefaultBlockName, createBlock } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import { PlainText } from '@wordpress/block-editor';
import styles from './editor.scss';

var MoreEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(MoreEdit, _Component);

  function MoreEdit() {
    var _this;

    _classCallCheck(this, MoreEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoreEdit).apply(this, arguments));
    _this.onChangeInput = _this.onChangeInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      defaultText: __('Read more')
    };
    return _this;
  }

  _createClass(MoreEdit, [{
    key: "onChangeInput",
    value: function onChangeInput(newValue) {
      // Detect Enter.key and add new empty block after.
      // Note: This is detected after the fact, and the newline could be visible on the block
      // for a very small time. This is OK for the alpha, we will revisit the logic later.
      // See https://github.com/wordpress-mobile/gutenberg-mobile/issues/324
      if (newValue.indexOf('\n') !== -1) {
        var insertBlocksAfter = this.props.insertBlocksAfter;
        insertBlocksAfter([createBlock(getDefaultBlockName())]);
        return;
      } // Set defaultText to an empty string, allowing the user to clear/replace the input field's text


      this.setState({
        defaultText: ''
      });
      var value = newValue.length === 0 ? undefined : newValue;
      this.props.setAttributes({
        customText: value
      });
    }
  }, {
    key: "renderLine",
    value: function renderLine() {
      return createElement(View, {
        style: styles['block-library-more__line']
      });
    }
  }, {
    key: "renderText",
    value: function renderText() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          onFocus = _this$props.onFocus,
          onBlur = _this$props.onBlur;
      var customText = attributes.customText;
      var defaultText = this.state.defaultText;
      var value = customText !== undefined ? customText : defaultText;
      return createElement(View, null, createElement(PlainText, {
        style: styles['block-library-more__text'],
        value: value,
        multiline: true,
        underlineColorAndroid: "transparent",
        onChange: this.onChangeInput,
        placeholder: defaultText,
        isSelected: this.props.isSelected,
        onFocus: onFocus,
        onBlur: onBlur
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return createElement(View, {
        style: styles['block-library-more__container']
      }, this.renderLine(), this.renderText(), this.renderLine());
    }
  }]);

  return MoreEdit;
}(Component);

export { MoreEdit as default };
//# sourceMappingURL=edit.native.js.map