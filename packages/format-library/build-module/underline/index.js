import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextShortcut, UnstableRichTextInputEvent } from '@wordpress/block-editor';
var name = 'core/underline';
export var underline = {
  name: name,
  title: __('Underline'),
  tagName: 'span',
  className: null,
  attributes: {
    style: 'style'
  },
  edit: function edit(_ref) {
    var value = _ref.value,
        onChange = _ref.onChange;

    var onToggle = function onToggle() {
      onChange(toggleFormat(value, {
        type: name,
        attributes: {
          style: 'text-decoration: underline;'
        }
      }));
    };

    return createElement(Fragment, null, createElement(RichTextShortcut, {
      type: "primary",
      character: "u",
      onUse: onToggle
    }), createElement(UnstableRichTextInputEvent, {
      inputType: "formatUnderline",
      onInput: onToggle
    }));
  }
};
//# sourceMappingURL=index.js.map