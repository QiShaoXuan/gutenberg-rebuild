import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { flow } from 'lodash';
/**
 * WordPress dependencies
 */

import { MenuItem } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
export function ManageBlocksMenuItem(_ref) {
  var onSelect = _ref.onSelect,
      openModal = _ref.openModal;
  return createElement(MenuItem, {
    onClick: flow([onSelect, function () {
      return openModal('edit-post/manage-blocks');
    }])
  }, __('Block Manager'));
}
export default withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      openModal = _dispatch.openModal;

  return {
    openModal: openModal
  };
})(ManageBlocksMenuItem);
//# sourceMappingURL=index.js.map