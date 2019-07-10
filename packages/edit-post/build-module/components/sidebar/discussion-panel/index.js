import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow } from '@wordpress/components';
import { PostComments, PostPingbacks, PostTypeSupportCheck } from '@wordpress/editor';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
/**
 * Module Constants
 */

var PANEL_NAME = 'discussion-panel';

function DiscussionPanel(_ref) {
  var isEnabled = _ref.isEnabled,
      isOpened = _ref.isOpened,
      onTogglePanel = _ref.onTogglePanel;

  if (!isEnabled) {
    return null;
  }

  return createElement(PostTypeSupportCheck, {
    supportKeys: ['comments', 'trackbacks']
  }, createElement(PanelBody, {
    title: __('Discussion'),
    opened: isOpened,
    onToggle: onTogglePanel
  }, createElement(PostTypeSupportCheck, {
    supportKeys: "comments"
  }, createElement(PanelRow, null, createElement(PostComments, null))), createElement(PostTypeSupportCheck, {
    supportKeys: "trackbacks"
  }, createElement(PanelRow, null, createElement(PostPingbacks, null)))));
}

export default compose([withSelect(function (select) {
  return {
    isEnabled: select('core/edit-post').isEditorPanelEnabled(PANEL_NAME),
    isOpened: select('core/edit-post').isEditorPanelOpened(PANEL_NAME)
  };
}), withDispatch(function (dispatch) {
  return {
    onTogglePanel: function onTogglePanel() {
      return dispatch('core/edit-post').toggleEditorPanelOpened(PANEL_NAME);
    }
  };
})])(DiscussionPanel);
//# sourceMappingURL=index.js.map