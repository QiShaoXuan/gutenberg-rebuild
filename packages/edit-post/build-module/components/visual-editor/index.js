import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { PostTitle, VisualEditorGlobalKeyboardShortcuts } from '@wordpress/editor';
import { WritingFlow, ObserveTyping, BlockList, CopyHandler, BlockSelectionClearer, MultiSelectScrollIntoView, __experimentalBlockSettingsMenuFirstItem, __experimentalBlockSettingsMenuPluginsExtension } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import BlockInspectorButton from './block-inspector-button';
import PluginBlockSettingsMenuGroup from '../block-settings-menu/plugin-block-settings-menu-group';

function VisualEditor() {
  return createElement(BlockSelectionClearer, {
    className: "edit-post-visual-editor editor-styles-wrapper"
  }, createElement(VisualEditorGlobalKeyboardShortcuts, null), createElement(MultiSelectScrollIntoView, null), createElement(WritingFlow, null, createElement(ObserveTyping, null, createElement(CopyHandler, null, createElement(PostTitle, null), createElement(BlockList, null)))), createElement(__experimentalBlockSettingsMenuFirstItem, null, function (_ref) {
    var onClose = _ref.onClose;
    return createElement(BlockInspectorButton, {
      onClick: onClose
    });
  }), createElement(__experimentalBlockSettingsMenuPluginsExtension, null, function (_ref2) {
    var clientIds = _ref2.clientIds,
        onClose = _ref2.onClose;
    return createElement(PluginBlockSettingsMenuGroup.Slot, {
      fillProps: {
        clientIds: clientIds,
        onClose: onClose
      }
    });
  }));
}

export default VisualEditor;
//# sourceMappingURL=index.js.map