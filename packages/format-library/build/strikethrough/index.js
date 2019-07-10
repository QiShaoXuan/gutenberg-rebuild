"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strikethrough = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _richText = require("@wordpress/rich-text");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
var name = 'core/strikethrough';
var strikethrough = {
  name: name,
  title: (0, _i18n.__)('Strikethrough'),
  tagName: 's',
  className: null,
  edit: function edit(_ref) {
    var isActive = _ref.isActive,
        value = _ref.value,
        onChange = _ref.onChange;

    var onToggle = function onToggle() {
      return onChange((0, _richText.toggleFormat)(value, {
        type: name
      }));
    };

    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.RichTextShortcut, {
      type: "access",
      character: "d",
      onUse: onToggle
    }), (0, _element.createElement)(_blockEditor.RichTextToolbarButton, {
      icon: "editor-strikethrough",
      title: (0, _i18n.__)('Strikethrough'),
      onClick: onToggle,
      isActive: isActive,
      shortcutType: "access",
      shortcutCharacter: "d"
    }));
  }
};
exports.strikethrough = strikethrough;
//# sourceMappingURL=index.js.map