import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
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
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { Dashicon, IconButton, withFallbackStyles } from '@wordpress/components';
import { URLInput, RichText, ContrastChecker, InspectorControls, withColors, PanelColorSettings } from '@wordpress/block-editor';
var _window = window,
    getComputedStyle = _window.getComputedStyle;
var applyFallbackStyles = withFallbackStyles(function (node, ownProps) {
  var textColor = ownProps.textColor,
      backgroundColor = ownProps.backgroundColor;
  var backgroundColorValue = backgroundColor && backgroundColor.color;
  var textColorValue = textColor && textColor.color; //avoid the use of querySelector if textColor color is known and verify if node is available.

  var textNode = !textColorValue && node ? node.querySelector('[contenteditable="true"]') : null;
  return {
    fallbackBackgroundColor: backgroundColorValue || !node ? undefined : getComputedStyle(node).backgroundColor,
    fallbackTextColor: textColorValue || !textNode ? undefined : getComputedStyle(textNode).color
  };
});

var ButtonEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(ButtonEdit, _Component);

  function ButtonEdit() {
    var _this;

    _classCallCheck(this, ButtonEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ButtonEdit).apply(this, arguments));
    _this.nodeRef = null;
    _this.bindRef = _this.bindRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ButtonEdit, [{
    key: "bindRef",
    value: function bindRef(node) {
      if (!node) {
        return;
      }

      this.nodeRef = node;
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          backgroundColor = _this$props.backgroundColor,
          textColor = _this$props.textColor,
          setBackgroundColor = _this$props.setBackgroundColor,
          setTextColor = _this$props.setTextColor,
          fallbackBackgroundColor = _this$props.fallbackBackgroundColor,
          fallbackTextColor = _this$props.fallbackTextColor,
          setAttributes = _this$props.setAttributes,
          isSelected = _this$props.isSelected,
          className = _this$props.className;
      var text = attributes.text,
          url = attributes.url,
          title = attributes.title;
      return createElement(Fragment, null, createElement("div", {
        className: className,
        title: title,
        ref: this.bindRef
      }, createElement(RichText, {
        placeholder: __('Add text…'),
        value: text,
        onChange: function onChange(value) {
          return setAttributes({
            text: value
          });
        },
        formattingControls: ['bold', 'italic', 'strikethrough'],
        className: classnames('wp-block-button__link', (_classnames = {
          'has-background': backgroundColor.color
        }, _defineProperty(_classnames, backgroundColor.class, backgroundColor.class), _defineProperty(_classnames, 'has-text-color', textColor.color), _defineProperty(_classnames, textColor.class, textColor.class), _classnames)),
        style: {
          backgroundColor: backgroundColor.color,
          color: textColor.color
        },
        keepPlaceholderOnFocus: true
      }), createElement(InspectorControls, null, createElement(PanelColorSettings, {
        title: __('Color Settings'),
        colorSettings: [{
          value: backgroundColor.color,
          onChange: setBackgroundColor,
          label: __('Background Color')
        }, {
          value: textColor.color,
          onChange: setTextColor,
          label: __('Text Color')
        }]
      }, createElement(ContrastChecker, {
        // Text is considered large if font size is greater or equal to 18pt or 24px,
        // currently that's not the case for button.
        isLargeText: false,
        textColor: textColor.color,
        backgroundColor: backgroundColor.color,
        fallbackBackgroundColor: fallbackBackgroundColor,
        fallbackTextColor: fallbackTextColor
      })))), isSelected && createElement("form", {
        className: "block-library-button__inline-link",
        onSubmit: function onSubmit(event) {
          return event.preventDefault();
        }
      }, createElement(Dashicon, {
        icon: "admin-links"
      }), createElement(URLInput, {
        value: url,
        onChange: function onChange(value) {
          return setAttributes({
            url: value
          });
        }
      }), createElement(IconButton, {
        icon: "editor-break",
        label: __('Apply'),
        type: "submit"
      })));
    }
  }]);

  return ButtonEdit;
}(Component);

export default compose([withColors('backgroundColor', {
  textColor: 'color'
}), applyFallbackStyles])(ButtonEdit);
//# sourceMappingURL=edit.js.map