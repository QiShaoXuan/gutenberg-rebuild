"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _keyboardShortcuts = _interopRequireDefault(require("../../../keyboard-shortcuts"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Set of available mode options.
 *
 * @type {Array}
 */
var MODES = [{
  value: 'visual',
  label: (0, _i18n.__)('Visual Editor')
}, {
  value: 'text',
  label: (0, _i18n.__)('Code Editor')
}];

function ModeSwitcher(_ref) {
  var onSwitch = _ref.onSwitch,
      mode = _ref.mode;
  var choices = MODES.map(function (choice) {
    if (choice.value !== mode) {
      return (0, _objectSpread2.default)({}, choice, {
        shortcut: _keyboardShortcuts.default.toggleEditorMode.display
      });
    }

    return choice;
  });
  return (0, _element.createElement)(_components.MenuGroup, {
    label: (0, _i18n.__)('Editor')
  }, (0, _element.createElement)(_components.MenuItemsChoice, {
    choices: choices,
    value: mode,
    onSelect: onSwitch
  }));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  return {
    isRichEditingEnabled: select('core/editor').getEditorSettings().richEditingEnabled,
    mode: select('core/edit-post').getEditorMode()
  };
}), (0, _compose.ifCondition)(function (_ref2) {
  var isRichEditingEnabled = _ref2.isRichEditingEnabled;
  return isRichEditingEnabled;
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    onSwitch: function onSwitch(mode) {
      dispatch('core/edit-post').switchEditorMode(mode);
    }
  };
})])(ModeSwitcher);

exports.default = _default;
//# sourceMappingURL=index.js.map