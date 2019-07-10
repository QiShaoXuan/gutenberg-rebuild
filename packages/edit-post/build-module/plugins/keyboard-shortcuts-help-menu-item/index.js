import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { MenuItem } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { displayShortcut } from '@wordpress/keycodes';
export function KeyboardShortcutsHelpMenuItem(_ref) {
  var openModal = _ref.openModal,
      onSelect = _ref.onSelect;
  return createElement(MenuItem, {
    onClick: function onClick() {
      onSelect();
      openModal('edit-post/keyboard-shortcut-help');
    },
    shortcut: displayShortcut.access('h')
  }, __('Keyboard Shortcuts'));
}
export default withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      openModal = _dispatch.openModal;

  return {
    openModal: openModal
  };
})(KeyboardShortcutsHelpMenuItem);
//# sourceMappingURL=index.js.map