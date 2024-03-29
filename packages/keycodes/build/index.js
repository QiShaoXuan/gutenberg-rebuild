"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isKeyboardEvent = exports.shortcutAriaLabel = exports.displayShortcut = exports.displayShortcutList = exports.rawShortcut = exports.modifiers = exports.SHIFT = exports.COMMAND = exports.CTRL = exports.ALT = exports.F10 = exports.DELETE = exports.DOWN = exports.RIGHT = exports.UP = exports.LEFT = exports.SPACE = exports.ESCAPE = exports.ENTER = exports.TAB = exports.BACKSPACE = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _platform = require("./platform");

/**
 * Note: The order of the modifier keys in many of the [foo]Shortcut()
 * functions in this file are intentional and should not be changed. They're
 * designed to fit with the standard menu keyboard shortcuts shown in the
 * user's platform.
 *
 * For example, on MacOS menu shortcuts will place Shift before Command, but
 * on Windows Control will usually come first. So don't provide your own
 * shortcut combos directly to keyboardShortcut().
 */

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Keycode for BACKSPACE key.
 */
var BACKSPACE = 8;
/**
 * Keycode for TAB key.
 */

exports.BACKSPACE = BACKSPACE;
var TAB = 9;
/**
 * Keycode for ENTER key.
 */

exports.TAB = TAB;
var ENTER = 13;
/**
 * Keycode for ESCAPE key.
 */

exports.ENTER = ENTER;
var ESCAPE = 27;
/**
 * Keycode for SPACE key.
 */

exports.ESCAPE = ESCAPE;
var SPACE = 32;
/**
 * Keycode for LEFT key.
 */

exports.SPACE = SPACE;
var LEFT = 37;
/**
 * Keycode for UP key.
 */

exports.LEFT = LEFT;
var UP = 38;
/**
 * Keycode for RIGHT key.
 */

exports.UP = UP;
var RIGHT = 39;
/**
 * Keycode for DOWN key.
 */

exports.RIGHT = RIGHT;
var DOWN = 40;
/**
 * Keycode for DELETE key.
 */

exports.DOWN = DOWN;
var DELETE = 46;
/**
 * Keycode for F10 key.
 */

exports.DELETE = DELETE;
var F10 = 121;
/**
 * Keycode for ALT key.
 */

exports.F10 = F10;
var ALT = 'alt';
/**
 * Keycode for CTRL key.
 */

exports.ALT = ALT;
var CTRL = 'ctrl';
/**
 * Keycode for COMMAND/META key.
 */

exports.CTRL = CTRL;
var COMMAND = 'meta';
/**
 * Keycode for SHIFT key.
 */

exports.COMMAND = COMMAND;
var SHIFT = 'shift';
/**
 * Object that contains functions that return the available modifier
 * depending on platform.
 *
 * - `primary`: takes a isApple function as a parameter.
 * - `primaryShift`: takes a isApple function as a parameter.
 * - `primaryAlt`: takes a isApple function as a parameter.
 * - `secondary`: takes a isApple function as a parameter.
 * - `access`: takes a isApple function as a parameter.
 * - `ctrl`
 * - `alt`
 * - `ctrlShift`
 * - `shift`
 * - `shiftAlt`
 */

exports.SHIFT = SHIFT;
var modifiers = {
  primary: function primary(_isApple) {
    return _isApple() ? [COMMAND] : [CTRL];
  },
  primaryShift: function primaryShift(_isApple) {
    return _isApple() ? [SHIFT, COMMAND] : [CTRL, SHIFT];
  },
  primaryAlt: function primaryAlt(_isApple) {
    return _isApple() ? [ALT, COMMAND] : [CTRL, ALT];
  },
  secondary: function secondary(_isApple) {
    return _isApple() ? [SHIFT, ALT, COMMAND] : [CTRL, SHIFT, ALT];
  },
  access: function access(_isApple) {
    return _isApple() ? [CTRL, ALT] : [SHIFT, ALT];
  },
  ctrl: function ctrl() {
    return [CTRL];
  },
  alt: function alt() {
    return [ALT];
  },
  ctrlShift: function ctrlShift() {
    return [CTRL, SHIFT];
  },
  shift: function shift() {
    return [SHIFT];
  },
  shiftAlt: function shiftAlt() {
    return [SHIFT, ALT];
  }
};
/**
 * An object that contains functions to get raw shortcuts.
 * E.g. rawShortcut.primary( 'm' ) will return 'meta+m' on Mac.
 * These are intended for user with the KeyboardShortcuts component or TinyMCE.
 *
 * @type {Object} Keyed map of functions to raw shortcuts.
 */

exports.modifiers = modifiers;
var rawShortcut = (0, _lodash.mapValues)(modifiers, function (modifier) {
  return function (character) {
    var _isApple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _platform.isAppleOS;

    return [].concat((0, _toConsumableArray2.default)(modifier(_isApple)), [character.toLowerCase()]).join('+');
  };
});
/**
 * Return an array of the parts of a keyboard shortcut chord for display
 * E.g displayShortcutList.primary( 'm' ) will return [ '⌘', 'M' ] on Mac.
 *
 * @type {Object} keyed map of functions to shortcut sequences
 */

exports.rawShortcut = rawShortcut;
var displayShortcutList = (0, _lodash.mapValues)(modifiers, function (modifier) {
  return function (character) {
    var _replacementKeyMap;

    var _isApple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _platform.isAppleOS;

    var isApple = _isApple();

    var replacementKeyMap = (_replacementKeyMap = {}, (0, _defineProperty2.default)(_replacementKeyMap, ALT, isApple ? '⌥' : 'Alt'), (0, _defineProperty2.default)(_replacementKeyMap, CTRL, isApple ? '^' : 'Ctrl'), (0, _defineProperty2.default)(_replacementKeyMap, COMMAND, '⌘'), (0, _defineProperty2.default)(_replacementKeyMap, SHIFT, isApple ? '⇧' : 'Shift'), _replacementKeyMap);
    var modifierKeys = modifier(_isApple).reduce(function (accumulator, key) {
      var replacementKey = (0, _lodash.get)(replacementKeyMap, key, key); // If on the Mac, adhere to platform convention and don't show plus between keys.

      if (isApple) {
        return [].concat((0, _toConsumableArray2.default)(accumulator), [replacementKey]);
      }

      return [].concat((0, _toConsumableArray2.default)(accumulator), [replacementKey, '+']);
    }, []);
    var capitalizedCharacter = (0, _lodash.capitalize)(character);
    return [].concat((0, _toConsumableArray2.default)(modifierKeys), [capitalizedCharacter]);
  };
});
/**
 * An object that contains functions to display shortcuts.
 * E.g. displayShortcut.primary( 'm' ) will return '⌘M' on Mac.
 *
 * @type {Object} Keyed map of functions to display shortcuts.
 */

exports.displayShortcutList = displayShortcutList;
var displayShortcut = (0, _lodash.mapValues)(displayShortcutList, function (shortcutList) {
  return function (character) {
    var _isApple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _platform.isAppleOS;

    return shortcutList(character, _isApple).join('');
  };
});
/**
 * An object that contains functions to return an aria label for a keyboard shortcut.
 * E.g. shortcutAriaLabel.primary( '.' ) will return 'Command + Period' on Mac.
 */

exports.displayShortcut = displayShortcut;
var shortcutAriaLabel = (0, _lodash.mapValues)(modifiers, function (modifier) {
  return function (character) {
    var _replacementKeyMap2;

    var _isApple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _platform.isAppleOS;

    var isApple = _isApple();

    var replacementKeyMap = (_replacementKeyMap2 = {}, (0, _defineProperty2.default)(_replacementKeyMap2, SHIFT, 'Shift'), (0, _defineProperty2.default)(_replacementKeyMap2, COMMAND, isApple ? 'Command' : 'Control'), (0, _defineProperty2.default)(_replacementKeyMap2, CTRL, 'Control'), (0, _defineProperty2.default)(_replacementKeyMap2, ALT, isApple ? 'Option' : 'Alt'), (0, _defineProperty2.default)(_replacementKeyMap2, ',', (0, _i18n.__)('Comma')), (0, _defineProperty2.default)(_replacementKeyMap2, '.', (0, _i18n.__)('Period')), (0, _defineProperty2.default)(_replacementKeyMap2, '`', (0, _i18n.__)('Backtick')), _replacementKeyMap2);
    return [].concat((0, _toConsumableArray2.default)(modifier(_isApple)), [character]).map(function (key) {
      return (0, _lodash.capitalize)((0, _lodash.get)(replacementKeyMap, key, key));
    }).join(isApple ? ' ' : ' + ');
  };
});
/**
 * An object that contains functions to check if a keyboard event matches a
 * predefined shortcut combination.
 * E.g. isKeyboardEvent.primary( event, 'm' ) will return true if the event
 * signals pressing ⌘M.
 *
 * @type {Object} Keyed map of functions to match events.
 */

exports.shortcutAriaLabel = shortcutAriaLabel;
var isKeyboardEvent = (0, _lodash.mapValues)(modifiers, function (getModifiers) {
  return function (event, character) {
    var _isApple = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _platform.isAppleOS;

    var mods = getModifiers(_isApple);

    if (!mods.every(function (key) {
      return event["".concat(key, "Key")];
    })) {
      return false;
    }

    if (!character) {
      return (0, _lodash.includes)(mods, event.key.toLowerCase());
    }

    return event.key === character;
  };
});
exports.isKeyboardEvent = isKeyboardEvent;
//# sourceMappingURL=index.js.map