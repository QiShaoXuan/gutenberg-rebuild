import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { get, partial } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { PageAttributesCheck, PageAttributesOrder, PageAttributesParent, PageTemplate } from '@wordpress/editor';
import { withSelect, withDispatch } from '@wordpress/data';
/**
 * Module Constants
 */

var PANEL_NAME = 'page-attributes';
export function PageAttributes(_ref) {
  var isEnabled = _ref.isEnabled,
      isOpened = _ref.isOpened,
      onTogglePanel = _ref.onTogglePanel,
      postType = _ref.postType;

  if (!isEnabled || !postType) {
    return null;
  }

  return createElement(PageAttributesCheck, null, createElement(PanelBody, {
    title: get(postType, ['labels', 'attributes'], __('Page Attributes')),
    opened: isOpened,
    onToggle: onTogglePanel
  }, createElement(PageTemplate, null), createElement(PageAttributesParent, null), createElement(PanelRow, null, createElement(PageAttributesOrder, null))));
}
var applyWithSelect = withSelect(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute;

  var _select2 = select('core/edit-post'),
      isEditorPanelEnabled = _select2.isEditorPanelEnabled,
      isEditorPanelOpened = _select2.isEditorPanelOpened;

  var _select3 = select('core'),
      getPostType = _select3.getPostType;

  return {
    isEnabled: isEditorPanelEnabled(PANEL_NAME),
    isOpened: isEditorPanelOpened(PANEL_NAME),
    postType: getPostType(getEditedPostAttribute('type'))
  };
});
var applyWithDispatch = withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      toggleEditorPanelOpened = _dispatch.toggleEditorPanelOpened;

  return {
    onTogglePanel: partial(toggleEditorPanelOpened, PANEL_NAME)
  };
});
export default compose(applyWithSelect, applyWithDispatch)(PageAttributes);
//# sourceMappingURL=index.js.map