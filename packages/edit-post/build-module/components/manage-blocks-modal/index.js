import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BlockManager from './manager';
/**
 * Unique identifier for Manage Blocks modal.
 *
 * @type {string}
 */

var MODAL_NAME = 'edit-post/manage-blocks';
export function ManageBlocksModal(_ref) {
  var isActive = _ref.isActive,
      closeModal = _ref.closeModal;

  if (!isActive) {
    return null;
  }

  return createElement(Modal, {
    className: "edit-post-manage-blocks-modal",
    title: __('Block Manager'),
    closeLabel: __('Close'),
    onRequestClose: closeModal
  }, createElement(BlockManager, null));
}
export default compose([withSelect(function (select) {
  var _select = select('core/edit-post'),
      isModalActive = _select.isModalActive;

  return {
    isActive: isModalActive(MODAL_NAME)
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      closeModal = _dispatch.closeModal;

  return {
    closeModal: closeModal
  };
})])(ManageBlocksModal);
//# sourceMappingURL=index.js.map