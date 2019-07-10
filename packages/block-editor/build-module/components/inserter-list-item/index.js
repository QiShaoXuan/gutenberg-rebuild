import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * Internal dependencies
 */

import BlockIcon from '../block-icon';

function InserterListItem(_ref) {
  var icon = _ref.icon,
      hasChildBlocksWithInserterSupport = _ref.hasChildBlocksWithInserterSupport,
      _onClick = _ref.onClick,
      isDisabled = _ref.isDisabled,
      title = _ref.title,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["icon", "hasChildBlocksWithInserterSupport", "onClick", "isDisabled", "title", "className"]);

  var itemIconStyle = icon ? {
    backgroundColor: icon.background,
    color: icon.foreground
  } : {};
  var itemIconStackStyle = icon && icon.shadowColor ? {
    backgroundColor: icon.shadowColor
  } : {};
  return createElement("li", {
    className: "editor-block-types-list__list-item block-editor-block-types-list__list-item"
  }, createElement("button", _extends({
    className: classnames('editor-block-types-list__item block-editor-block-types-list__item', className, {
      'editor-block-types-list__item-has-children block-editor-block-types-list__item-has-children': hasChildBlocksWithInserterSupport
    }),
    onClick: function onClick(event) {
      event.preventDefault();

      _onClick();
    },
    disabled: isDisabled,
    "aria-label": title // Fix for IE11 and JAWS 2018.

  }, props), createElement("span", {
    className: "editor-block-types-list__item-icon block-editor-block-types-list__item-icon",
    style: itemIconStyle
  }, createElement(BlockIcon, {
    icon: icon,
    showColors: true
  }), hasChildBlocksWithInserterSupport && createElement("span", {
    className: "editor-block-types-list__item-icon-stack block-editor-block-types-list__item-icon-stack",
    style: itemIconStackStyle
  })), createElement("span", {
    className: "editor-block-types-list__item-title block-editor-block-types-list__item-title"
  }, title)));
}

export default InserterListItem;
//# sourceMappingURL=index.js.map