"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keycodes = require("@wordpress/keycodes");

/**
 * WordPress dependencies
 */
var _default = {
  toggleEditorMode: {
    raw: _keycodes.rawShortcut.secondary('m'),
    display: _keycodes.displayShortcut.secondary('m')
  },
  toggleSidebar: {
    raw: _keycodes.rawShortcut.primaryShift(','),
    display: _keycodes.displayShortcut.primaryShift(','),
    ariaLabel: _keycodes.shortcutAriaLabel.primaryShift(',')
  }
};
exports.default = _default;
//# sourceMappingURL=keyboard-shortcuts.js.map