import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton, RichTextShortcut } from '@wordpress/block-editor';
var name = 'core/strikethrough';
export var strikethrough = {
  name: name,
  title: __('Strikethrough'),
  tagName: 's',
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
      type: "access",
      character: "d",
      onUse: onToggle
    }), createElement(RichTextToolbarButton, {
      icon: "editor-strikethrough",
      title: __('Strikethrough'),
      onClick: onToggle,
      isActive: isActive,
      shortcutType: "access",
      shortcutCharacter: "d"
    }));
  }
};
//# sourceMappingURL=index.js.map