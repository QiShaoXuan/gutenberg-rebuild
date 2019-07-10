"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _editor = require("@wordpress/editor");

var _data = require("@wordpress/data");

var _plugins = require("@wordpress/plugins");

var _viewport = require("@wordpress/viewport");

var _compose = require("@wordpress/compose");

var _browserUrl = _interopRequireDefault(require("../browser-url"));

var _header = _interopRequireDefault(require("../header"));

var _textEditor = _interopRequireDefault(require("../text-editor"));

var _visualEditor = _interopRequireDefault(require("../visual-editor"));

var _keyboardShortcuts = _interopRequireDefault(require("../keyboard-shortcuts"));

var _keyboardShortcutHelpModal = _interopRequireDefault(require("../keyboard-shortcut-help-modal"));

var _manageBlocksModal = _interopRequireDefault(require("../manage-blocks-modal"));

var _optionsModal = _interopRequireDefault(require("../options-modal"));

var _metaBoxes = _interopRequireDefault(require("../meta-boxes"));

var _settingsSidebar = _interopRequireDefault(require("../sidebar/settings-sidebar"));

var _sidebar = _interopRequireDefault(require("../sidebar"));

var _pluginPostPublishPanel = _interopRequireDefault(require("../sidebar/plugin-post-publish-panel"));

var _pluginPrePublishPanel = _interopRequireDefault(require("../sidebar/plugin-pre-publish-panel"));

var _fullscreenMode = _interopRequireDefault(require("../fullscreen-mode"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
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
  var className = (0, _classnames.default)('edit-post-layout', {
    'is-sidebar-opened': sidebarIsOpened,
    'has-fixed-toolbar': hasFixedToolbar
  });
  var publishLandmarkProps = {
    role: 'region',

    /* translators: accessibility text for the publish landmark region. */
    'aria-label': (0, _i18n.__)('Editor publish'),
    tabIndex: -1
  };
  return (0, _element.createElement)(_components.FocusReturnProvider, {
    className: className
  }, (0, _element.createElement)(_fullscreenMode.default, null), (0, _element.createElement)(_browserUrl.default, null), (0, _element.createElement)(_editor.UnsavedChangesWarning, null), (0, _element.createElement)(_editor.AutosaveMonitor, null), (0, _element.createElement)(_header.default, null), (0, _element.createElement)("div", {
    className: "edit-post-layout__content",
    role: "region"
    /* translators: accessibility text for the content landmark region. */
    ,
    "aria-label": (0, _i18n.__)('Editor content'),
    tabIndex: "-1"
  }, (0, _element.createElement)(_editor.EditorNotices, {
    dismissible: false,
    className: "is-pinned"
  }), (0, _element.createElement)(_editor.EditorNotices, {
    dismissible: true
  }), (0, _element.createElement)(_blockEditor.PreserveScrollInReorder, null), (0, _element.createElement)(_keyboardShortcuts.default, null), (0, _element.createElement)(_keyboardShortcutHelpModal.default, null), (0, _element.createElement)(_manageBlocksModal.default, null), (0, _element.createElement)(_optionsModal.default, null), (mode === 'text' || !isRichEditingEnabled) && (0, _element.createElement)(_textEditor.default, null), isRichEditingEnabled && mode === 'visual' && (0, _element.createElement)(_visualEditor.default, null), (0, _element.createElement)("div", {
    className: "edit-post-layout__metaboxes"
  }, (0, _element.createElement)(_metaBoxes.default, {
    location: "normal"
  })), (0, _element.createElement)("div", {
    className: "edit-post-layout__metaboxes"
  }, (0, _element.createElement)(_metaBoxes.default, {
    location: "advanced"
  }))), publishSidebarOpened ? (0, _element.createElement)(_editor.PostPublishPanel, (0, _extends2.default)({}, publishLandmarkProps, {
    onClose: closePublishSidebar,
    forceIsDirty: hasActiveMetaboxes,
    forceIsSaving: isSaving,
    PrePublishExtension: _pluginPrePublishPanel.default.Slot,
    PostPublishExtension: _pluginPostPublishPanel.default.Slot
  })) : (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", (0, _extends2.default)({
    className: "edit-post-toggle-publish-panel"
  }, publishLandmarkProps), (0, _element.createElement)(_components.Button, {
    isDefault: true,
    type: "button",
    className: "edit-post-toggle-publish-panel__button",
    onClick: togglePublishSidebar,
    "aria-expanded": false
  }, (0, _i18n.__)('Open publish panel'))), (0, _element.createElement)(_settingsSidebar.default, null), (0, _element.createElement)(_sidebar.default.Slot, null), isMobileViewport && sidebarIsOpened && (0, _element.createElement)(_components.ScrollLock, null)), (0, _element.createElement)(_components.Popover.Slot, null), (0, _element.createElement)(_plugins.PluginArea, null));
}

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
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
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      closePublishSidebar = _dispatch.closePublishSidebar,
      togglePublishSidebar = _dispatch.togglePublishSidebar;

  return {
    closePublishSidebar: closePublishSidebar,
    togglePublishSidebar: togglePublishSidebar
  };
}), _components.navigateRegions, (0, _viewport.withViewportMatch)({
  isMobileViewport: '< small'
}))(Layout);

exports.default = _default;
//# sourceMappingURL=index.js.map