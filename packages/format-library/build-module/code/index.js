import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { toggleFormat } from '@wordpress/rich-text';
import { RichTextShortcut, RichTextToolbarButton } from '@wordpress/block-editor';
var name = 'core/code';
export var code = {
  name: name,
  title: __('Code'),
  tagName: 'code',
  className: null,
  edit: function edit(_ref) {
    var value = _ref.value,
        onChange = _ref.onChange,
        isActive = _ref.isActive;

    var onToggle = function onToggle() {
      return onChange(toggleFormat(value, {
        type: name
      }));
    };

    return createElement(Fragment, null, createElement(RichTextShortcut, {
      type: "access",
      character: "x",
      onUse: onToggle
    }), createElement(RichTextToolbarButton, {
      icon: "editor-code",
      title: __('Code'),
      onClick: onToggle,
      isActive: isActive,
      shortcutType: "access",
      shortcutCharacter: "x"
    }));
  }
};
//# sourceMappingURL=index.js.map