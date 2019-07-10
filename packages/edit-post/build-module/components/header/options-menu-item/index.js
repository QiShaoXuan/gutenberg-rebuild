import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { MenuItem } from '@wordpress/components';
export function OptionsMenuItem(_ref) {
  var openModal = _ref.openModal,
      onSelect = _ref.onSelect;
  return createElement(MenuItem, {
    onClick: function onClick() {
      onSelect();
      openModal('edit-post/options');
    }
  }, __('Options'));
}
export default withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      openModal = _dispatch.openModal;

  return {
    openModal: openModal
  };
})(OptionsMenuItem);
//# sourceMappingURL=index.js.map