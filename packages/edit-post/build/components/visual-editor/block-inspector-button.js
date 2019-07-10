"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockInspectorButton = BlockInspectorButton;
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _keyboardShortcuts = _interopRequireDefault(require("../../keyboard-shortcuts"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BlockInspectorButton(_ref) {
  var areAdvancedSettingsOpened = _ref.areAdvancedSettingsOpened,
      closeSidebar = _ref.closeSidebar,
      openEditorSidebar = _ref.openEditorSidebar,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? _lodash.noop : _ref$onClick,
      _ref$small = _ref.small,
      small = _ref$small === void 0 ? false : _ref$small,
      speak = _ref.speak;

  var speakMessage = function speakMessage() {
    if (areAdvancedSettingsOpened) {
      speak((0, _i18n.__)('Block settings closed'));
    } else {
      speak((0, _i18n.__)('Additional settings are now available in the Editor block settings sidebar'));
    }
  };

  var label = areAdvancedSettingsOpened ? (0, _i18n.__)('Hide Block Settings') : (0, _i18n.__)('Show Block Settings');
  return (0, _element.createElement)(_components.MenuItem, {
    className: "editor-block-settings-menu__control block-editor-block-settings-menu__control",
    onClick: (0, _lodash.flow)(areAdvancedSettingsOpened ? closeSidebar : openEditorSidebar, speakMessage, onClick),
    icon: "admin-generic",
    shortcut: _keyboardShortcuts.default.toggleSidebar
  }, !small && label);
}

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
  return {
    areAdvancedSettingsOpened: select('core/edit-post').getActiveGeneralSidebarName() === 'edit-post/block'
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    openEditorSidebar: function openEditorSidebar() {
      return dispatch('core/edit-post').openGeneralSidebar('edit-post/block');
    },
    closeSidebar: dispatch('core/edit-post').closeGeneralSidebar
  };
}), _components.withSpokenMessages)(BlockInspectorButton);

exports.default = _default;
//# sourceMappingURL=block-inspector-button.js.map