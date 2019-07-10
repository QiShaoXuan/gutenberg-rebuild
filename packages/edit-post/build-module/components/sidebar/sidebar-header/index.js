import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { IconButton } from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import shortcuts from '../../../keyboard-shortcuts';

var SidebarHeader = function SidebarHeader(_ref) {
  var children = _ref.children,
      className = _ref.className,
      closeLabel = _ref.closeLabel,
      closeSidebar = _ref.closeSidebar,
      title = _ref.title;
  return createElement(Fragment, null, createElement("div", {
    className: "components-panel__header edit-post-sidebar-header__small"
  }, createElement("span", {
    className: "edit-post-sidebar-header__title"
  }, title || __('(no title)')), createElement(IconButton, {
    onClick: closeSidebar,
    icon: "no-alt",
    label: closeLabel
  })), createElement("div", {
    className: classnames('components-panel__header edit-post-sidebar-header', className)
  }, children, createElement(IconButton, {
    onClick: closeSidebar,
    icon: "no-alt",
    label: closeLabel,
    shortcut: shortcuts.toggleSidebar
  })));
};

export default compose(withSelect(function (select) {
  return {
    title: select('core/editor').getEditedPostAttribute('title')
  };
}), withDispatch(function (dispatch) {
  return {
    closeSidebar: dispatch('core/edit-post').closeGeneralSidebar
  };
}))(SidebarHeader);
//# sourceMappingURL=index.js.map