import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isString } from 'lodash';
/**
 * WordPress dependencies
 */

import { createElement, cloneElement } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Button from '../button';
import Shortcut from '../shortcut';
import IconButton from '../icon-button';
/**
 * Renders a generic menu item for use inside the more menu.
 *
 * @return {WPElement} More menu item.
 */

export function MenuItem(_ref) {
  var children = _ref.children,
      info = _ref.info,
      className = _ref.className,
      icon = _ref.icon,
      shortcut = _ref.shortcut,
      isSelected = _ref.isSelected,
      _ref$role = _ref.role,
      role = _ref$role === void 0 ? 'menuitem' : _ref$role,
      props = _objectWithoutProperties(_ref, ["children", "info", "className", "icon", "shortcut", "isSelected", "role"]);

  className = classnames('components-menu-item__button', className, {
    'has-icon': icon
  });

  if (info) {
    children = createElement("span", {
      className: "components-menu-item__info-wrapper"
    }, children, createElement("span", {
      className: "components-menu-item__info"
    }, info));
  }

  var tagName = Button;

  if (icon) {
    if (!isString(icon)) {
      icon = cloneElement(icon, {
        className: 'components-menu-items__item-icon',
        height: 20,
        width: 20
      });
    }

    tagName = IconButton;
    props.icon = icon;
  }

  return createElement(tagName, _objectSpread({
    // Make sure aria-checked matches spec https://www.w3.org/TR/wai-aria-1.1/#aria-checked
    'aria-checked': role === 'menuitemcheckbox' || role === 'menuitemradio' ? isSelected : undefined,
    role: role,
    className: className
  }, props), children, createElement(Shortcut, {
    className: "components-menu-item__shortcut",
    shortcut: shortcut
  }));
}
export default MenuItem;
//# sourceMappingURL=index.js.map