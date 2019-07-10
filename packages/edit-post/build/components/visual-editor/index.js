"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _editor = require("@wordpress/editor");

var _blockEditor = require("@wordpress/block-editor");

var _blockInspectorButton = _interopRequireDefault(require("./block-inspector-button"));

var _pluginBlockSettingsMenuGroup = _interopRequireDefault(require("../block-settings-menu/plugin-block-settings-menu-group"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function VisualEditor() {
  return (0, _element.createElement)(_blockEditor.BlockSelectionClearer, {
    className: "edit-post-visual-editor editor-styles-wrapper"
  }, (0, _element.createElement)(_editor.VisualEditorGlobalKeyboardShortcuts, null), (0, _element.createElement)(_blockEditor.MultiSelectScrollIntoView, null), (0, _element.createElement)(_blockEditor.WritingFlow, null, (0, _element.createElement)(_blockEditor.ObserveTyping, null, (0, _element.createElement)(_blockEditor.CopyHandler, null, (0, _element.createElement)(_editor.PostTitle, null), (0, _element.createElement)(_blockEditor.BlockList, null)))), (0, _element.createElement)(_blockEditor.__experimentalBlockSettingsMenuFirstItem, null, function (_ref) {
    var onClose = _ref.onClose;
    return (0, _element.createElement)(_blockInspectorButton.default, {
      onClick: onClose
    });
  }), (0, _element.createElement)(_blockEditor.__experimentalBlockSettingsMenuPluginsExtension, null, function (_ref2) {
    var clientIds = _ref2.clientIds,
        onClose = _ref2.onClose;
    return (0, _element.createElement)(_pluginBlockSettingsMenuGroup.default.Slot, {
      fillProps: {
        clientIds: clientIds,
        onClose: onClose
      }
    });
  }));
}

var _default = VisualEditor;
exports.default = _default;
//# sourceMappingURL=index.js.map