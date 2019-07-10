import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { PostTextEditor, PostTitle, TextEditorGlobalKeyboardShortcuts } from '@wordpress/editor';
import { IconButton } from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { displayShortcut } from '@wordpress/keycodes';
import { compose } from '@wordpress/compose';

function TextEditor(_ref) {
  var onExit = _ref.onExit,
      isRichEditingEnabled = _ref.isRichEditingEnabled;
  return createElement("div", {
    className: "edit-post-text-editor"
  }, isRichEditingEnabled && createElement("div", {
    className: "edit-post-text-editor__toolbar"
  }, createElement("h2", null, __('Editing Code')), createElement(IconButton, {
    onClick: onExit,
    icon: "no-alt",
    shortcut: displayShortcut.secondary('m')
  }, __('Exit Code Editor')), createElement(TextEditorGlobalKeyboardShortcuts, null)), createElement("div", {
    className: "edit-post-text-editor__body"
  }, createElement(PostTitle, null), createElement(PostTextEditor, null)));
}

export default compose(withSelect(function (select) {
  return {
    isRichEditingEnabled: select('core/editor').getEditorSettings().richEditingEnabled
  };
}), withDispatch(function (dispatch) {
  return {
    onExit: function onExit() {
      dispatch('core/edit-post').switchEditorMode('visual');
    }
  };
}))(TextEditor);
//# sourceMappingURL=index.js.map