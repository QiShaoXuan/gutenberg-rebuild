"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _blocks = require("@wordpress/blocks");

var _inserterListItem = _interopRequireDefault(require("../inserter-list-item"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BlockTypesList(_ref) {
  var items = _ref.items,
      onSelect = _ref.onSelect,
      _ref$onHover = _ref.onHover,
      onHover = _ref$onHover === void 0 ? function () {} : _ref$onHover,
      children = _ref.children;
  return (
    /*
     * Disable reason: The `list` ARIA role is redundant but
     * Safari+VoiceOver won't announce the list otherwise.
     */

    /* eslint-disable jsx-a11y/no-redundant-roles */
    (0, _element.createElement)("ul", {
      role: "list",
      className: "editor-block-types-list block-editor-block-types-list"
    }, items && items.map(function (item) {
      return (0, _element.createElement)(_inserterListItem.default, {
        key: item.id,
        className: (0, _blocks.getBlockMenuDefaultClassName)(item.id),
        icon: item.icon,
        hasChildBlocksWithInserterSupport: item.hasChildBlocksWithInserterSupport,
        onClick: function onClick() {
          onSelect(item);
          onHover(null);
        },
        onFocus: function onFocus() {
          return onHover(item);
        },
        onMouseEnter: function onMouseEnter() {
          return onHover(item);
        },
        onMouseLeave: function onMouseLeave() {
          return onHover(null);
        },
        onBlur: function onBlur() {
          return onHover(null);
        },
        isDisabled: item.isDisabled,
        title: item.title
      });
    }), children)
    /* eslint-enable jsx-a11y/no-redundant-roles */

  );
}

var _default = BlockTypesList;
exports.default = _default;
//# sourceMappingURL=index.js.map