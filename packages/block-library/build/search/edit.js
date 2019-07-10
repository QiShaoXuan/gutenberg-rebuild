"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SearchEdit;

var _element = require("@wordpress/element");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function SearchEdit(_ref) {
  var className = _ref.className,
      attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
  var label = attributes.label,
      placeholder = attributes.placeholder,
      buttonText = attributes.buttonText;
  return (0, _element.createElement)("div", {
    className: className
  }, (0, _element.createElement)(_blockEditor.RichText, {
    wrapperClassName: "wp-block-search__label",
    "aria-label": (0, _i18n.__)('Label text'),
    placeholder: (0, _i18n.__)('Add label…'),
    keepPlaceholderOnFocus: true,
    formattingControls: [],
    value: label,
    onChange: function onChange(html) {
      return setAttributes({
        label: html
      });
    }
  }), (0, _element.createElement)("input", {
    className: "wp-block-search__input",
    "aria-label": (0, _i18n.__)('Optional placeholder text') // We hide the placeholder field's placeholder when there is a value. This
    // stops screen readers from reading the placeholder field's placeholder
    // which is confusing.
    ,
    placeholder: placeholder ? undefined : (0, _i18n.__)('Optional placeholder…'),
    value: placeholder,
    onChange: function onChange(event) {
      return setAttributes({
        placeholder: event.target.value
      });
    }
  }), (0, _element.createElement)(_blockEditor.RichText, {
    wrapperClassName: "wp-block-search__button",
    className: "wp-block-search__button-rich-text",
    "aria-label": (0, _i18n.__)('Button text'),
    placeholder: (0, _i18n.__)('Add button text…'),
    keepPlaceholderOnFocus: true,
    formattingControls: [],
    value: buttonText,
    onChange: function onChange(html) {
      return setAttributes({
        buttonText: html
      });
    }
  }));
}
//# sourceMappingURL=edit.js.map