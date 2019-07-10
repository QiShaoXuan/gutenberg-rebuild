"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItem = MenuItem;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _element = require("@wordpress/element");

var _button = _interopRequireDefault(require("../button"));

var _shortcut = _interopRequireDefault(require("../shortcut"));

var _iconButton = _interopRequireDefault(require("../icon-button"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Renders a generic menu item for use inside the more menu.
 *
 * @return {WPElement} More menu item.
 */
function MenuItem(_ref) {
  var children = _ref.children,
      info = _ref.info,
      className = _ref.className,
      icon = _ref.icon,
      shortcut = _ref.shortcut,
      isSelected = _ref.isSelected,
      _ref$role = _ref.role,
      role = _ref$role === void 0 ? 'menuitem' : _ref$role,
      props = (0, _objectWithoutProperties2.default)(_ref, ["children", "info", "className", "icon", "shortcut", "isSelected", "role"]);
  className = (0, _classnames.default)('components-menu-item__button', className, {
    'has-icon': icon
  });

  if (info) {
    children = (0, _element.createElement)("span", {
      className: "components-menu-item__info-wrapper"
    }, children, (0, _element.createElement)("span", {
      className: "components-menu-item__info"
    }, info));
  }

  var tagName = _button.default;

  if (icon) {
    if (!(0, _lodash.isString)(icon)) {
      icon = (0, _element.cloneElement)(icon, {
        className: 'components-menu-items__item-icon',
        height: 20,
        width: 20
      });
    }

    tagName = _iconButton.default;
    props.icon = icon;
  }

  return (0, _element.createElement)(tagName, (0, _objectSpread2.default)({
    // Make sure aria-checked matches spec https://www.w3.org/TR/wai-aria-1.1/#aria-checked
    'aria-checked': role === 'menuitemcheckbox' || role === 'menuitemradio' ? isSelected : undefined,
    role: role,
    className: className
  }, props), children, (0, _element.createElement)(_shortcut.default, {
    className: "components-menu-item__shortcut",
    shortcut: shortcut
  }));
}

var _default = MenuItem;
exports.default = _default;
//# sourceMappingURL=index.js.map