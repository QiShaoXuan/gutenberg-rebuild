import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { last } from 'lodash';
/**
 * WordPress dependencies
 */

import { withSelect } from '@wordpress/data';
import { getDefaultBlockName } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { IconButton } from '@wordpress/components';
/**
 * Internal dependencies
 */

import IgnoreNestedEvents from '../ignore-nested-events';
import DefaultBlockAppender from '../default-block-appender';
import Inserter from '../inserter';

function BlockListAppender(_ref) {
  var blockClientIds = _ref.blockClientIds,
      rootClientId = _ref.rootClientId,
      canInsertDefaultBlock = _ref.canInsertDefaultBlock,
      isLocked = _ref.isLocked;

  if (isLocked) {
    return null;
  }

  if (canInsertDefaultBlock) {
    return createElement(IgnoreNestedEvents, {
      childHandledEvents: ['onFocus', 'onClick', 'onKeyDown']
    }, createElement(DefaultBlockAppender, {
      rootClientId: rootClientId,
      lastBlockClientId: last(blockClientIds)
    }));
  }

  return createElement("div", {
    className: "block-list-appender"
  }, createElement(Inserter, {
    rootClientId: rootClientId,
    renderToggle: function renderToggle(_ref2) {
      var onToggle = _ref2.onToggle,
          disabled = _ref2.disabled,
          isOpen = _ref2.isOpen;
      return createElement(IconButton, {
        label: __('Add block'),
        icon: "insert",
        onClick: onToggle,
        className: "block-list-appender__toggle",
        "aria-haspopup": "true",
        "aria-expanded": isOpen,
        disabled: disabled
      });
    },
    isAppender: true
  }));
}

export default withSelect(function (select, _ref3) {
  var rootClientId = _ref3.rootClientId;

  var _select = select('core/block-editor'),
      getBlockOrder = _select.getBlockOrder,
      canInsertBlockType = _select.canInsertBlockType,
      getTemplateLock = _select.getTemplateLock;

  return {
    isLocked: !!getTemplateLock(rootClientId),
    blockClientIds: getBlockOrder(rootClientId),
    canInsertDefaultBlock: canInsertBlockType(getDefaultBlockName(), rootClientId)
  };
})(BlockListAppender);
//# sourceMappingURL=index.js.map