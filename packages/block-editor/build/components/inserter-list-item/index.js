"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _blockIcon = _interopRequireDefault(require("../block-icon"));

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
function InserterListItem(_ref) {
  var icon = _ref.icon,
      hasChildBlocksWithInserterSupport = _ref.hasChildBlocksWithInserterSupport,
      _onClick = _ref.onClick,
      isDisabled = _ref.isDisabled,
      title = _ref.title,
      className = _ref.className,
      props = (0, _objectWithoutProperties2.default)(_ref, ["icon", "hasChildBlocksWithInserterSupport", "onClick", "isDisabled", "title", "className"]);
  var itemIconStyle = icon ? {
    backgroundColor: icon.background,
    color: icon.foreground
  } : {};
  var itemIconStackStyle = icon && icon.shadowColor ? {
    backgroundColor: icon.shadowColor
  } : {};
  return (0, _element.createElement)("li", {
    className: "editor-block-types-list__list-item block-editor-block-types-list__list-item"
  }, (0, _element.createElement)("button", (0, _extends2.default)({
    className: (0, _classnames.default)('editor-block-types-list__item block-editor-block-types-list__item', className, {
      'editor-block-types-list__item-has-children block-editor-block-types-list__item-has-children': hasChildBlocksWithInserterSupport
    }),
    onClick: function onClick(event) {
      event.preventDefault();

      _onClick();
    },
    disabled: isDisabled,
    "aria-label": title // Fix for IE11 and JAWS 2018.

  }, props), (0, _element.createElement)("span", {
    className: "editor-block-types-list__item-icon block-editor-block-types-list__item-icon",
    style: itemIconStyle
  }, (0, _element.createElement)(_blockIcon.default, {
    icon: icon,
    showColors: true
  }), hasChildBlocksWithInserterSupport && (0, _element.createElement)("span", {
    className: "editor-block-types-list__item-icon-stack block-editor-block-types-list__item-icon-stack",
    style: itemIconStackStyle
  })), (0, _element.createElement)("span", {
    className: "editor-block-types-list__item-title block-editor-block-types-list__item-title"
  }, title)));
}

var _default = InserterListItem;
exports.default = _default;
//# sourceMappingURL=index.js.map