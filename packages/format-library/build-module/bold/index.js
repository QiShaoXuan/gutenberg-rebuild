import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton, RichTextShortcut, UnstableRichTextInputEvent } from '@wordpress/block-editor';
var name = 'core/bold';
export var bold = {
  name: name,
  title: __('Bold'),
  tagName: 'strong',
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
      character: "b",
      onUse: onToggle
    }), createElement(RichTextToolbarButton, {
      name: "bold",
      icon: "editor-bold",
      title: __('Bold'),
      onClick: onToggle,
      isActive: isActive,
      shortcutType: "primary",
      shortcutCharacter: "b"
    }), createElement(UnstableRichTextInputEvent, {
      inputType: "formatBold",
      onInput: onToggle
    }));
  }
};
//# sourceMappingURL=index.js.map