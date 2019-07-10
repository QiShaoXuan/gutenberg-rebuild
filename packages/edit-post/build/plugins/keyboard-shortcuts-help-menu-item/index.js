"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyboardShortcutsHelpMenuItem = KeyboardShortcutsHelpMenuItem;
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _keycodes = require("@wordpress/keycodes");

/**
 * WordPress dependencies
 */
function KeyboardShortcutsHelpMenuItem(_ref) {
  var openModal = _ref.openModal,
      onSelect = _ref.onSelect;
  return (0, _element.createElement)(_components.MenuItem, {
    onClick: function onClick() {
      onSelect();
      openModal('edit-post/keyboard-shortcut-help');
    },
    shortcut: _keycodes.displayShortcut.access('h')
  }, (0, _i18n.__)('Keyboard Shortcuts'));
}

var _default = (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      openModal = _dispatch.openModal;

  return {
    openModal: openModal
  };
})(KeyboardShortcutsHelpMenuItem);

exports.default = _default;
//# sourceMappingURL=index.js.map