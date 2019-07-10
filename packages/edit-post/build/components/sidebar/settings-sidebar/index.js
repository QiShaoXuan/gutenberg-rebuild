"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

var _ = _interopRequireDefault(require("../"));

var _settingsHeader = _interopRequireDefault(require("../settings-header"));

var _postStatus = _interopRequireDefault(require("../post-status"));

var _lastRevision = _interopRequireDefault(require("../last-revision"));

var _postTaxonomies = _interopRequireDefault(require("../post-taxonomies"));

var _featuredImage = _interopRequireDefault(require("../featured-image"));

var _postExcerpt = _interopRequireDefault(require("../post-excerpt"));

var _postLink = _interopRequireDefault(require("../post-link"));

var _discussionPanel = _interopRequireDefault(require("../discussion-panel"));

var _pageAttributes = _interopRequireDefault(require("../page-attributes"));

var _metaBoxes = _interopRequireDefault(require("../../meta-boxes"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var SettingsSidebar = function SettingsSidebar(_ref) {
  var sidebarName = _ref.sidebarName;
  return (0, _element.createElement)(_.default, {
    name: sidebarName,
    label: (0, _i18n.__)('Editor settings')
  }, (0, _element.createElement)(_settingsHeader.default, {
    sidebarName: sidebarName
  }), (0, _element.createElement)(_components.Panel, null, sidebarName === 'edit-post/document' && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_postStatus.default, null), (0, _element.createElement)(_lastRevision.default, null), (0, _element.createElement)(_postLink.default, null), (0, _element.createElement)(_postTaxonomies.default, null), (0, _element.createElement)(_featuredImage.default, null), (0, _element.createElement)(_postExcerpt.default, null), (0, _element.createElement)(_discussionPanel.default, null), (0, _element.createElement)(_pageAttributes.default, null), (0, _element.createElement)(_metaBoxes.default, {
    location: "side"
  })), sidebarName === 'edit-post/block' && (0, _element.createElement)(_components.PanelBody, {
    className: "edit-post-settings-sidebar__panel-block"
  }, (0, _element.createElement)(_blockEditor.BlockInspector, null))));
};

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
  var _select = select('core/edit-post'),
      getActiveGeneralSidebarName = _select.getActiveGeneralSidebarName,
      isEditorSidebarOpened = _select.isEditorSidebarOpened;

  return {
    isEditorSidebarOpened: isEditorSidebarOpened(),
    sidebarName: getActiveGeneralSidebarName()
  };
}), (0, _compose.ifCondition)(function (_ref2) {
  var isEditorSidebarOpened = _ref2.isEditorSidebarOpened;
  return isEditorSidebarOpened;
}))(SettingsSidebar);

exports.default = _default;
//# sourceMappingURL=index.js.map