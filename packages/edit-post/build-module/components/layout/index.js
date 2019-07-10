import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Button, Popover, ScrollLock, FocusReturnProvider, navigateRegions } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { PreserveScrollInReorder } from '@wordpress/block-editor';
import { AutosaveMonitor, UnsavedChangesWarning, EditorNotices, PostPublishPanel } from '@wordpress/editor';
import { withDispatch, withSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { PluginArea } from '@wordpress/plugins';
import { withViewportMatch } from '@wordpress/viewport';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BrowserURL from '../browser-url';
import Header from '../header';
import TextEditor from '../text-editor';
import VisualEditor from '../visual-editor';
import EditorModeKeyboardShortcuts from '../keyboard-shortcuts';
import KeyboardShortcutHelpModal from '../keyboard-shortcut-help-modal';
import ManageBlocksModal from '../manage-blocks-modal';
import OptionsModal from '../options-modal';
import MetaBoxes from '../meta-boxes';
import SettingsSidebar from '../sidebar/settings-sidebar';
import Sidebar from '../sidebar';
import PluginPostPublishPanel from '../sidebar/plugin-post-publish-panel';
import PluginPrePublishPanel from '../sidebar/plugin-pre-publish-panel';
import FullscreenMode from '../fullscreen-mode';

function Layout(_ref) {
  var mode = _ref.mode,
      editorSidebarOpened = _ref.editorSidebarOpened,
      pluginSidebarOpened = _ref.pluginSidebarOpened,
      publishSidebarOpened = _ref.publishSidebarOpened,
      hasFixedToolbar = _ref.hasFixedToolbar,
      closePublishSidebar = _ref.closePublishSidebar,
      togglePublishSidebar = _ref.togglePublishSidebar,
      hasActiveMetaboxes = _ref.hasActiveMetaboxes,
      isSaving = _ref.isSaving,
      isMobileViewport = _ref.isMobileViewport,
      isRichEditingEnabled = _ref.isRichEditingEnabled;
  var sidebarIsOpened = editorSidebarOpened || pluginSidebarOpened || publishSidebarOpened;
  var className = classnames('edit-post-layout', {
    'is-sidebar-opened': sidebarIsOpened,
    'has-fixed-toolbar': hasFixedToolbar
  });
  var publishLandmarkProps = {
    role: 'region',

    /* translators: accessibility text for the publish landmark region. */
    'aria-label': __('Editor publish'),
    tabIndex: -1
  };
  return createElement(FocusReturnProvider, {
    className: className
  }, createElement(FullscreenMode, null), createElement(BrowserURL, null), createElement(UnsavedChangesWarning, null), createElement(AutosaveMonitor, null), createElement(Header, null), createElement("div", {
    className: "edit-post-layout__content",
    role: "region"
    /* translators: accessibility text for the content landmark region. */
    ,
    "aria-label": __('Editor content'),
    tabIndex: "-1"
  }, createElement(EditorNotices, {
    dismissible: false,
    className: "is-pinned"
  }), createElement(EditorNotices, {
    dismissible: true
  }), createElement(PreserveScrollInReorder, null), createElement(EditorModeKeyboardShortcuts, null), createElement(KeyboardShortcutHelpModal, null), createElement(ManageBlocksModal, null), createElement(OptionsModal, null), (mode === 'text' || !isRichEditingEnabled) && createElement(TextEditor, null), isRichEditingEnabled && mode === 'visual' && createElement(VisualEditor, null), createElement("div", {
    className: "edit-post-layout__metaboxes"
  }, createElement(MetaBoxes, {
    location: "normal"
  })), createElement("div", {
    className: "edit-post-layout__metaboxes"
  }, createElement(MetaBoxes, {
    location: "advanced"
  }))), publishSidebarOpened ? createElement(PostPublishPanel, _extends({}, publishLandmarkProps, {
    onClose: closePublishSidebar,
    forceIsDirty: hasActiveMetaboxes,
    forceIsSaving: isSaving,
    PrePublishExtension: PluginPrePublishPanel.Slot,
    PostPublishExtension: PluginPostPublishPanel.Slot
  })) : createElement(Fragment, null, createElement("div", _extends({
    className: "edit-post-toggle-publish-panel"
  }, publishLandmarkProps), createElement(Button, {
    isDefault: true,
    type: "button",
    className: "edit-post-toggle-publish-panel__button",
    onClick: togglePublishSidebar,
    "aria-expanded": false
  }, __('Open publish panel'))), createElement(SettingsSidebar, null), createElement(Sidebar.Slot, null), isMobileViewport && sidebarIsOpened && createElement(ScrollLock, null)), createElement(Popover.Slot, null), createElement(PluginArea, null));
}

export default compose(withSelect(function (select) {
  return {
    mode: select('core/edit-post').getEditorMode(),
    editorSidebarOpened: select('core/edit-post').isEditorSidebarOpened(),
    pluginSidebarOpened: select('core/edit-post').isPluginSidebarOpened(),
    publishSidebarOpened: select('core/edit-post').isPublishSidebarOpened(),
    hasFixedToolbar: select('core/edit-post').isFeatureActive('fixedToolbar'),
    hasActiveMetaboxes: select('core/edit-post').hasMetaBoxes(),
    isSaving: select('core/edit-post').isSavingMetaBoxes(),
    isRichEditingEnabled: select('core/editor').getEditorSettings().richEditingEnabled
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      closePublishSidebar = _dispatch.closePublishSidebar,
      togglePublishSidebar = _dispatch.togglePublishSidebar;

  return {
    closePublishSidebar: closePublishSidebar,
    togglePublishSidebar: togglePublishSidebar
  };
}), navigateRegions, withViewportMatch({
  isMobileViewport: '< small'
}))(Layout);
//# sourceMappingURL=index.js.map