import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { first, last } from 'lodash';
/**
 * WordPress dependencies
 */

import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import BlockMover from '../block-mover';

function BlockListMultiControls(_ref) {
  var multiSelectedBlockClientIds = _ref.multiSelectedBlockClientIds,
      clientId = _ref.clientId,
      isSelecting = _ref.isSelecting,
      isFirst = _ref.isFirst,
      isLast = _ref.isLast;

  if (isSelecting) {
    return null;
  }

  return createElement(BlockMover, {
    key: "mover",
    clientId: clientId,
    clientIds: multiSelectedBlockClientIds,
    isFirst: isFirst,
    isLast: isLast
  });
}

export default withSelect(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/block-editor'),
      getMultiSelectedBlockClientIds = _select.getMultiSelectedBlockClientIds,
      isMultiSelecting = _select.isMultiSelecting,
      getBlockIndex = _select.getBlockIndex,
      getBlockCount = _select.getBlockCount;

  var clientIds = getMultiSelectedBlockClientIds();
  var firstIndex = getBlockIndex(first(clientIds), clientId);
  var lastIndex = getBlockIndex(last(clientIds), clientId);
  return {
    multiSelectedBlockClientIds: clientIds,
    isSelecting: isMultiSelecting(),
    isFirst: firstIndex === 0,
    isLast: lastIndex + 1 === getBlockCount()
  };
})(BlockListMultiControls);
//# sourceMappingURL=multi-controls.js.map