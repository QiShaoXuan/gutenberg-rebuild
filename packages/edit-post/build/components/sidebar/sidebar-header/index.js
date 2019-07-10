"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _keyboardShortcuts = _interopRequireDefault(require("../../../keyboard-shortcuts"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var SidebarHeader = function SidebarHeader(_ref) {
  var children = _ref.children,
      className = _ref.className,
      closeLabel = _ref.closeLabel,
      closeSidebar = _ref.closeSidebar,
      title = _ref.title;
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
    className: "components-panel__header edit-post-sidebar-header__small"
  }, (0, _element.createElement)("span", {
    className: "edit-post-sidebar-header__title"
  }, title || (0, _i18n.__)('(no title)')), (0, _element.createElement)(_components.IconButton, {
    onClick: closeSidebar,
    icon: "no-alt",
    label: closeLabel
  })), (0, _element.createElement)("div", {
    className: (0, _classnames.default)('components-panel__header edit-post-sidebar-header', className)
  }, children, (0, _element.createElement)(_components.IconButton, {
    onClick: closeSidebar,
    icon: "no-alt",
    label: closeLabel,
    shortcut: _keyboardShortcuts.default.toggleSidebar
  })));
};

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
  return {
    title: select('core/editor').getEditedPostAttribute('title')
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    closeSidebar: dispatch('core/edit-post').closeGeneralSidebar
  };
}))(SidebarHeader);

exports.default = _default;
//# sourceMappingURL=index.js.map