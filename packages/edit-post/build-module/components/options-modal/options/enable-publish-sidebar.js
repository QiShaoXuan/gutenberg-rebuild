/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { ifViewportMatches } from '@wordpress/viewport';
/**
 * Internal dependencies
 */

import BaseOption from './base';
export default compose(withSelect(function (select) {
  return {
    isChecked: select('core/editor').isPublishSidebarEnabled()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      enablePublishSidebar = _dispatch.enablePublishSidebar,
      disablePublishSidebar = _dispatch.disablePublishSidebar;

  return {
    onChange: function onChange(isEnabled) {
      return isEnabled ? enablePublishSidebar() : disablePublishSidebar();
    }
  };
}), // In < medium viewports we override this option and always show the publish sidebar.
// See the edit-post's header component for the specific logic.
ifViewportMatches('medium'))(BaseOption);
//# sourceMappingURL=enable-publish-sidebar.js.map