"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _sidebarHeader = _interopRequireDefault(require("../sidebar-header"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var SettingsHeader = function SettingsHeader(_ref) {
  var openDocumentSettings = _ref.openDocumentSettings,
      openBlockSettings = _ref.openBlockSettings,
      sidebarName = _ref.sidebarName;
  var blockLabel = (0, _i18n.__)('Block');

  var _ref2 = sidebarName === 'edit-post/document' ? // translators: ARIA label for the Document sidebar tab, selected.
  [(0, _i18n.__)('Document (selected)'), 'is-active'] : // translators: ARIA label for the Document sidebar tab, not selected.
  [(0, _i18n.__)('Document'), ''],
      _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
      documentAriaLabel = _ref3[0],
      documentActiveClass = _ref3[1];

  var _ref4 = sidebarName === 'edit-post/block' ? // translators: ARIA label for the Block sidebar tab, selected.
  [(0, _i18n.__)('Block (selected)'), 'is-active'] : // translators: ARIA label for the Block sidebar tab, not selected.
  [(0, _i18n.__)('Block'), ''],
      _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
      blockAriaLabel = _ref5[0],
      blockActiveClass = _ref5[1];

  return (0, _element.createElement)(_sidebarHeader.default, {
    className: "edit-post-sidebar__panel-tabs",
    closeLabel: (0, _i18n.__)('Close settings')
  }, (0, _element.createElement)("ul", null, (0, _element.createElement)("li", null, (0, _element.createElement)("button", {
    onClick: openDocumentSettings,
    className: "edit-post-sidebar__panel-tab ".concat(documentActiveClass),
    "aria-label": documentAriaLabel,
    "data-label": (0, _i18n.__)('Document')
  }, (0, _i18n.__)('Document'))), (0, _element.createElement)("li", null, (0, _element.createElement)("button", {
    onClick: openBlockSettings,
    className: "edit-post-sidebar__panel-tab ".concat(blockActiveClass),
    "aria-label": blockAriaLabel,
    "data-label": blockLabel
  }, blockLabel))));
};

var _default = (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      openGeneralSidebar = _dispatch.openGeneralSidebar;

  var _dispatch2 = dispatch('core/block-editor'),
      clearSelectedBlock = _dispatch2.clearSelectedBlock;

  return {
    openDocumentSettings: function openDocumentSettings() {
      openGeneralSidebar('edit-post/document');
      clearSelectedBlock();
    },
    openBlockSettings: function openBlockSettings() {
      openGeneralSidebar('edit-post/block');
    }
  };
})(SettingsHeader);

exports.default = _default;
//# sourceMappingURL=index.js.map