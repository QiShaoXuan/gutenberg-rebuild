import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { withViewportMatch } from '@wordpress/viewport';
import { DotTip } from '@wordpress/nux';
import { __ } from '@wordpress/i18n';
import { Inserter, BlockToolbar, NavigableToolbar, BlockNavigationDropdown } from '@wordpress/block-editor';
import { TableOfContents, EditorHistoryRedo, EditorHistoryUndo } from '@wordpress/editor';
/**
 * Internal dependencies
 */

import FullscreenModeClose from '../fullscreen-mode-close';

function HeaderToolbar(_ref) {
  var hasFixedToolbar = _ref.hasFixedToolbar,
      isLargeViewport = _ref.isLargeViewport,
      showInserter = _ref.showInserter,
      isTextModeEnabled = _ref.isTextModeEnabled;
  var toolbarAriaLabel = hasFixedToolbar ?
  /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
  __('Document and block tools') :
  /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
  __('Document tools');
  return createElement(NavigableToolbar, {
    className: "edit-post-header-toolbar",
    "aria-label": toolbarAriaLabel
  }, createElement(FullscreenModeClose, null), createElement("div", null, createElement(Inserter, {
    disabled: !showInserter,
    position: "bottom right"
  }), createElement(DotTip, {
    tipId: "core/editor.inserter"
  }, __('Welcome to the wonderful world of blocks! Click the “+” (“Add block”) button to add a new block. There are blocks available for all kinds of content: you can insert text, headings, images, lists, and lots more!'))), createElement(EditorHistoryUndo, null), createElement(EditorHistoryRedo, null), createElement(TableOfContents, {
    hasOutlineItemsDisabled: isTextModeEnabled
  }), createElement(BlockNavigationDropdown, {
    isDisabled: isTextModeEnabled
  }), hasFixedToolbar && isLargeViewport && createElement("div", {
    className: "edit-post-header-toolbar__block-toolbar"
  }, createElement(BlockToolbar, null)));
}

export default compose([withSelect(function (select) {
  return {
    hasFixedToolbar: select('core/edit-post').isFeatureActive('fixedToolbar'),
    // This setting (richEditingEnabled) should not live in the block editor's setting.
    showInserter: select('core/edit-post').getEditorMode() === 'visual' && select('core/editor').getEditorSettings().richEditingEnabled,
    isTextModeEnabled: select('core/edit-post').getEditorMode() === 'text'
  };
}), withViewportMatch({
  isLargeViewport: 'medium'
})])(HeaderToolbar);
//# sourceMappingURL=index.js.map