/**
 * WordPress dependencies
 */
import { displayShortcutList, shortcutAriaLabel } from '@wordpress/keycodes';
import { __ } from '@wordpress/i18n';
var primary = displayShortcutList.primary,
    primaryShift = displayShortcutList.primaryShift,
    primaryAlt = displayShortcutList.primaryAlt,
    secondary = displayShortcutList.secondary,
    access = displayShortcutList.access,
    ctrl = displayShortcutList.ctrl,
    alt = displayShortcutList.alt,
    ctrlShift = displayShortcutList.ctrlShift,
    shiftAlt = displayShortcutList.shiftAlt;
var globalShortcuts = {
  title: __('Global shortcuts'),
  shortcuts: [{
    keyCombination: access('h'),
    description: __('Display this help.')
  }, {
    keyCombination: primary('s'),
    description: __('Save your changes.')
  }, {
    keyCombination: primary('z'),
    description: __('Undo your last changes.')
  }, {
    keyCombination: primaryShift('z'),
    description: __('Redo your last undo.')
  }, {
    keyCombination: primaryShift(','),
    description: __('Show or hide the settings sidebar.'),
    ariaLabel: shortcutAriaLabel.primaryShift(',')
  }, {
    keyCombination: access('o'),
    description: __('Open the block navigation menu.')
  }, {
    keyCombination: ctrl('`'),
    description: __('Navigate to the next part of the editor.'),
    ariaLabel: shortcutAriaLabel.ctrl('`')
  }, {
    keyCombination: ctrlShift('`'),
    description: __('Navigate to the previous part of the editor.'),
    ariaLabel: shortcutAriaLabel.ctrlShift('`')
  }, {
    keyCombination: shiftAlt('n'),
    description: __('Navigate to the next part of the editor (alternative).')
  }, {
    keyCombination: shiftAlt('p'),
    description: __('Navigate to the previous part of the editor (alternative).')
  }, {
    keyCombination: alt('F10'),
    description: __('Navigate to the nearest toolbar.')
  }, {
    keyCombination: secondary('m'),
    description: __('Switch between Visual Editor and Code Editor.')
  }]
};
var selectionShortcuts = {
  title: __('Selection shortcuts'),
  shortcuts: [{
    keyCombination: primary('a'),
    description: __('Select all text when typing. Press again to select all blocks.')
  }, {
    keyCombination: 'Esc',
    description: __('Clear selection.'),

    /* translators: The 'escape' key on a keyboard. */
    ariaLabel: __('Escape')
  }]
};
var blockShortcuts = {
  title: __('Block shortcuts'),
  shortcuts: [{
    keyCombination: primaryShift('d'),
    description: __('Duplicate the selected block(s).')
  }, {
    keyCombination: access('z'),
    description: __('Remove the selected block(s).')
  }, {
    keyCombination: primaryAlt('t'),
    description: __('Insert a new block before the selected block(s).')
  }, {
    keyCombination: primaryAlt('y'),
    description: __('Insert a new block after the selected block(s).')
  }, {
    keyCombination: '/',
    description: __('Change the block type after adding a new paragraph.'),

    /* translators: The forward-slash character. e.g. '/'. */
    ariaLabel: __('Forward-slash')
  }]
};
var textFormattingShortcuts = {
  title: __('Text formatting'),
  shortcuts: [{
    keyCombination: primary('b'),
    description: __('Make the selected text bold.')
  }, {
    keyCombination: primary('i'),
    description: __('Make the selected text italic.')
  }, {
    keyCombination: primary('u'),
    description: __('Underline the selected text.')
  }, {
    keyCombination: primary('k'),
    description: __('Convert the selected text into a link.')
  }, {
    keyCombination: primaryShift('k'),
    description: __('Remove a link.')
  }, {
    keyCombination: access('d'),
    description: __('Add a strikethrough to the selected text.')
  }, {
    keyCombination: access('x'),
    description: __('Display the selected text in a monospaced font.')
  }]
};
export default [globalShortcuts, selectionShortcuts, blockShortcuts, textFormattingShortcuts];
//# sourceMappingURL=config.js.map