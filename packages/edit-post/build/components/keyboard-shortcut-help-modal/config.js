"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keycodes = require("@wordpress/keycodes");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
var primary = _keycodes.displayShortcutList.primary,
    primaryShift = _keycodes.displayShortcutList.primaryShift,
    primaryAlt = _keycodes.displayShortcutList.primaryAlt,
    secondary = _keycodes.displayShortcutList.secondary,
    access = _keycodes.displayShortcutList.access,
    ctrl = _keycodes.displayShortcutList.ctrl,
    alt = _keycodes.displayShortcutList.alt,
    ctrlShift = _keycodes.displayShortcutList.ctrlShift,
    shiftAlt = _keycodes.displayShortcutList.shiftAlt;
var globalShortcuts = {
  title: (0, _i18n.__)('Global shortcuts'),
  shortcuts: [{
    keyCombination: access('h'),
    description: (0, _i18n.__)('Display this help.')
  }, {
    keyCombination: primary('s'),
    description: (0, _i18n.__)('Save your changes.')
  }, {
    keyCombination: primary('z'),
    description: (0, _i18n.__)('Undo your last changes.')
  }, {
    keyCombination: primaryShift('z'),
    description: (0, _i18n.__)('Redo your last undo.')
  }, {
    keyCombination: primaryShift(','),
    description: (0, _i18n.__)('Show or hide the settings sidebar.'),
    ariaLabel: _keycodes.shortcutAriaLabel.primaryShift(',')
  }, {
    keyCombination: access('o'),
    description: (0, _i18n.__)('Open the block navigation menu.')
  }, {
    keyCombination: ctrl('`'),
    description: (0, _i18n.__)('Navigate to the next part of the editor.'),
    ariaLabel: _keycodes.shortcutAriaLabel.ctrl('`')
  }, {
    keyCombination: ctrlShift('`'),
    description: (0, _i18n.__)('Navigate to the previous part of the editor.'),
    ariaLabel: _keycodes.shortcutAriaLabel.ctrlShift('`')
  }, {
    keyCombination: shiftAlt('n'),
    description: (0, _i18n.__)('Navigate to the next part of the editor (alternative).')
  }, {
    keyCombination: shiftAlt('p'),
    description: (0, _i18n.__)('Navigate to the previous part of the editor (alternative).')
  }, {
    keyCombination: alt('F10'),
    description: (0, _i18n.__)('Navigate to the nearest toolbar.')
  }, {
    keyCombination: secondary('m'),
    description: (0, _i18n.__)('Switch between Visual Editor and Code Editor.')
  }]
};
var selectionShortcuts = {
  title: (0, _i18n.__)('Selection shortcuts'),
  shortcuts: [{
    keyCombination: primary('a'),
    description: (0, _i18n.__)('Select all text when typing. Press again to select all blocks.')
  }, {
    keyCombination: 'Esc',
    description: (0, _i18n.__)('Clear selection.'),

    /* translators: The 'escape' key on a keyboard. */
    ariaLabel: (0, _i18n.__)('Escape')
  }]
};
var blockShortcuts = {
  title: (0, _i18n.__)('Block shortcuts'),
  shortcuts: [{
    keyCombination: primaryShift('d'),
    description: (0, _i18n.__)('Duplicate the selected block(s).')
  }, {
    keyCombination: access('z'),
    description: (0, _i18n.__)('Remove the selected block(s).')
  }, {
    keyCombination: primaryAlt('t'),
    description: (0, _i18n.__)('Insert a new block before the selected block(s).')
  }, {
    keyCombination: primaryAlt('y'),
    description: (0, _i18n.__)('Insert a new block after the selected block(s).')
  }, {
    keyCombination: '/',
    description: (0, _i18n.__)('Change the block type after adding a new paragraph.'),

    /* translators: The forward-slash character. e.g. '/'. */
    ariaLabel: (0, _i18n.__)('Forward-slash')
  }]
};
var textFormattingShortcuts = {
  title: (0, _i18n.__)('Text formatting'),
  shortcuts: [{
    keyCombination: primary('b'),
    description: (0, _i18n.__)('Make the selected text bold.')
  }, {
    keyCombination: primary('i'),
    description: (0, _i18n.__)('Make the selected text italic.')
  }, {
    keyCombination: primary('u'),
    description: (0, _i18n.__)('Underline the selected text.')
  }, {
    keyCombination: primary('k'),
    description: (0, _i18n.__)('Convert the selected text into a link.')
  }, {
    keyCombination: primaryShift('k'),
    description: (0, _i18n.__)('Remove a link.')
  }, {
    keyCombination: access('d'),
    description: (0, _i18n.__)('Add a strikethrough to the selected text.')
  }, {
    keyCombination: access('x'),
    description: (0, _i18n.__)('Display the selected text in a monospaced font.')
  }]
};
var _default = [globalShortcuts, selectionShortcuts, blockShortcuts, textFormattingShortcuts];
exports.default = _default;
//# sourceMappingURL=config.js.map