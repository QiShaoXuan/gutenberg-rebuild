import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton, RichTextShortcut, UnstableRichTextInputEvent } from '@wordpress/block-editor';
var name = 'core/italic';
export var italic = {
  name: name,
  title: __('Italic'),
  tagName: 'em',
  className: null,
  edit: function edit(_ref) {
    var isActive = _ref.isActive,
        value = _ref.value,
        onChange = _ref.onChange;

    var onToggle = function onToggle() {
      return onChange(toggleFormat(value, {
        type: name
      }));
    };

    return createElement(Fragment, null, createElement(RichTextShortcut, {
      type: "primary",
      character: "i",
      onUse: onToggle
    }), createElement(RichTextToolbarButton, {
      name: "italic",
      icon: "editor-italic",
      title: __('Italic'),
      onClick: onToggle,
      isActive: isActive,
      shortcutType: "primary",
      shortcutCharacter: "i"
    }), createElement(UnstableRichTextInputEvent, {
      inputType: "formatItalic",
      onInput: onToggle
    }));
  }
};
//# sourceMappingURL=index.js.map