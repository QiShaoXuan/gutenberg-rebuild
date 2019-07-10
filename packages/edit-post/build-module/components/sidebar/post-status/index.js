import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import PostVisibility from '../post-visibility';
import PostTrash from '../post-trash';
import PostSchedule from '../post-schedule';
import PostSticky from '../post-sticky';
import PostAuthor from '../post-author';
import PostFormat from '../post-format';
import PostPendingStatus from '../post-pending-status';
import PluginPostStatusInfo from '../plugin-post-status-info';
/**
 * Module Constants
 */

var PANEL_NAME = 'post-status';

function PostStatus(_ref) {
  var isOpened = _ref.isOpened,
      onTogglePanel = _ref.onTogglePanel;
  return createElement(PanelBody, {
    className: "edit-post-post-status",
    title: __('Status & Visibility'),
    opened: isOpened,
    onToggle: onTogglePanel
  }, createElement(PluginPostStatusInfo.Slot, null, function (fills) {
    return createElement(Fragment, null, createElement(PostVisibility, null), createElement(PostSchedule, null), createElement(PostFormat, null), createElement(PostSticky, null), createElement(PostPendingStatus, null), createElement(PostAuthor, null), fills, createElement(PostTrash, null));
  }));
}

export default compose([withSelect(function (select) {
  return {
    isOpened: select('core/edit-post').isEditorPanelOpened(PANEL_NAME)
  };
}), withDispatch(function (dispatch) {
  return {
    onTogglePanel: function onTogglePanel() {
      return dispatch('core/edit-post').toggleEditorPanelOpened(PANEL_NAME);
    }
  };
})])(PostStatus);
//# sourceMappingURL=index.js.map