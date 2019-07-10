"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _nux = require("@wordpress/nux");

var _moreMenu = _interopRequireDefault(require("./more-menu"));

var _headerToolbar = _interopRequireDefault(require("./header-toolbar"));

var _pinnedPlugins = _interopRequireDefault(require("./pinned-plugins"));

var _keyboardShortcuts = _interopRequireDefault(require("../../keyboard-shortcuts"));

var _postPublishButtonOrToggle = _interopRequireDefault(require("./post-publish-button-or-toggle"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function Header(_ref) {
  var closeGeneralSidebar = _ref.closeGeneralSidebar,
      hasActiveMetaboxes = _ref.hasActiveMetaboxes,
      isEditorSidebarOpened = _ref.isEditorSidebarOpened,
      isPublishSidebarOpened = _ref.isPublishSidebarOpened,
      isSaving = _ref.isSaving,
      openGeneralSidebar = _ref.openGeneralSidebar;
  var toggleGeneralSidebar = isEditorSidebarOpened ? closeGeneralSidebar : openGeneralSidebar;
  return (0, _element.createElement)("div", {
    role: "region"
    /* translators: accessibility text for the top bar landmark region. */
    ,
    "aria-label": (0, _i18n.__)('Editor top bar'),
    className: "edit-post-header",
    tabIndex: "-1"
  }, (0, _element.createElement)(_headerToolbar.default, null), (0, _element.createElement)("div", {
    className: "edit-post-header__settings"
  }, !isPublishSidebarOpened && // This button isn't completely hidden by the publish sidebar.
  // We can't hide the whole toolbar when the publish sidebar is open because
  // we want to prevent mounting/unmounting the PostPublishButtonOrToggle DOM node.
  // We track that DOM node to return focus to the PostPublishButtonOrToggle
  // when the publish sidebar has been closed.
  (0, _element.createElement)(_editor.PostSavedState, {
    forceIsDirty: hasActiveMetaboxes,
    forceIsSaving: isSaving
  }), (0, _element.createElement)(_editor.PostPreviewButton, {
    forceIsAutosaveable: hasActiveMetaboxes,
    forcePreviewLink: isSaving ? null : undefined
  }), (0, _element.createElement)(_postPublishButtonOrToggle.default, {
    forceIsDirty: hasActiveMetaboxes,
    forceIsSaving: isSaving
  }), (0, _element.createElement)("div", null, (0, _element.createElement)(_components.IconButton, {
    icon: "admin-generic",
    label: (0, _i18n.__)('Settings'),
    onClick: toggleGeneralSidebar,
    isToggled: isEditorSidebarOpened,
    "aria-expanded": isEditorSidebarOpened,
    shortcut: _keyboardShortcuts.default.toggleSidebar
  }), (0, _element.createElement)(_nux.DotTip, {
    tipId: "core/editor.settings"
  }, (0, _i18n.__)('You’ll find more settings for your page and blocks in the sidebar. Click the cog icon to toggle the sidebar open and closed.'))), (0, _element.createElement)(_pinnedPlugins.default.Slot, null), (0, _element.createElement)(_moreMenu.default, null)));
}

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
  return {
    hasActiveMetaboxes: select('core/edit-post').hasMetaBoxes(),
    isEditorSidebarOpened: select('core/edit-post').isEditorSidebarOpened(),
    isPublishSidebarOpened: select('core/edit-post').isPublishSidebarOpened(),
    isSaving: select('core/edit-post').isSavingMetaBoxes()
  };
}), (0, _data.withDispatch)(function (dispatch, ownProps, _ref2) {
  var select = _ref2.select;

  var _select = select('core/block-editor'),
      getBlockSelectionStart = _select.getBlockSelectionStart;

  var _dispatch = dispatch('core/edit-post'),
      _openGeneralSidebar = _dispatch.openGeneralSidebar,
      closeGeneralSidebar = _dispatch.closeGeneralSidebar;

  return {
    openGeneralSidebar: function openGeneralSidebar() {
      return _openGeneralSidebar(getBlockSelectionStart() ? 'edit-post/block' : 'edit-post/document');
    },
    closeGeneralSidebar: closeGeneralSidebar
  };
}))(Header);

exports.default = _default;
//# sourceMappingURL=index.js.map