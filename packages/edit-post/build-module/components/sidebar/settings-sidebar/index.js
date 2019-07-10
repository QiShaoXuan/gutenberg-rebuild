import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Panel, PanelBody } from '@wordpress/components';
import { compose, ifCondition } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { BlockInspector } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import Sidebar from '../';
import SettingsHeader from '../settings-header';
import PostStatus from '../post-status';
import LastRevision from '../last-revision';
import PostTaxonomies from '../post-taxonomies';
import FeaturedImage from '../featured-image';
import PostExcerpt from '../post-excerpt';
import PostLink from '../post-link';
import DiscussionPanel from '../discussion-panel';
import PageAttributes from '../page-attributes';
import MetaBoxes from '../../meta-boxes';

var SettingsSidebar = function SettingsSidebar(_ref) {
  var sidebarName = _ref.sidebarName;
  return createElement(Sidebar, {
    name: sidebarName,
    label: __('Editor settings')
  }, createElement(SettingsHeader, {
    sidebarName: sidebarName
  }), createElement(Panel, null, sidebarName === 'edit-post/document' && createElement(Fragment, null, createElement(PostStatus, null), createElement(LastRevision, null), createElement(PostLink, null), createElement(PostTaxonomies, null), createElement(FeaturedImage, null), createElement(PostExcerpt, null), createElement(DiscussionPanel, null), createElement(PageAttributes, null), createElement(MetaBoxes, {
    location: "side"
  })), sidebarName === 'edit-post/block' && createElement(PanelBody, {
    className: "edit-post-settings-sidebar__panel-block"
  }, createElement(BlockInspector, null))));
};

export default compose(withSelect(function (select) {
  var _select = select('core/edit-post'),
      getActiveGeneralSidebarName = _select.getActiveGeneralSidebarName,
      isEditorSidebarOpened = _select.isEditorSidebarOpened;

  return {
    isEditorSidebarOpened: isEditorSidebarOpened(),
    sidebarName: getActiveGeneralSidebarName()
  };
}), ifCondition(function (_ref2) {
  var isEditorSidebarOpened = _ref2.isEditorSidebarOpened;
  return isEditorSidebarOpened;
}))(SettingsSidebar);
//# sourceMappingURL=index.js.map