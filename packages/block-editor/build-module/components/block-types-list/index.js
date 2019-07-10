import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { getBlockMenuDefaultClassName } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import InserterListItem from '../inserter-list-item';

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
    createElement("ul", {
      role: "list",
      className: "editor-block-types-list block-editor-block-types-list"
    }, items && items.map(function (item) {
      return createElement(InserterListItem, {
        key: item.id,
        className: getBlockMenuDefaultClassName(item.id),
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

export default BlockTypesList;
//# sourceMappingURL=index.js.map