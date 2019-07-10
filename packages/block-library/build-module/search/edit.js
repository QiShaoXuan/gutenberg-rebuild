import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
export default function SearchEdit(_ref) {
  var className = _ref.className,
      attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
  var label = attributes.label,
      placeholder = attributes.placeholder,
      buttonText = attributes.buttonText;
  return createElement("div", {
    className: className
  }, createElement(RichText, {
    wrapperClassName: "wp-block-search__label",
    "aria-label": __('Label text'),
    placeholder: __('Add label…'),
    keepPlaceholderOnFocus: true,
    formattingControls: [],
    value: label,
    onChange: function onChange(html) {
      return setAttributes({
        label: html
      });
    }
  }), createElement("input", {
    className: "wp-block-search__input",
    "aria-label": __('Optional placeholder text') // We hide the placeholder field's placeholder when there is a value. This
    // stops screen readers from reading the placeholder field's placeholder
    // which is confusing.
    ,
    placeholder: placeholder ? undefined : __('Optional placeholder…'),
    value: placeholder,
    onChange: function onChange(event) {
      return setAttributes({
        placeholder: event.target.value
      });
    }
  }), createElement(RichText, {
    wrapperClassName: "wp-block-search__button",
    className: "wp-block-search__button-rich-text",
    "aria-label": __('Button text'),
    placeholder: __('Add button text…'),
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