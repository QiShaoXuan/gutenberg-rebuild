import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

/**
 * WordPress dependencies
 */
import { speak } from '@wordpress/a11y';
import { getBlockType, doBlocksMatchTemplate, switchToBlockType, synchronizeBlocksWithTemplate } from '@wordpress/blocks';
import { _n, sprintf } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import { replaceBlocks, selectBlock, setTemplateValidity, insertDefaultBlock, resetBlocks } from './actions';
import { getBlock, getBlocks, getSelectedBlockCount, getBlockCount, getTemplateLock, getTemplate, isValidTemplate } from './selectors';
/**
 * Block validity is a function of blocks state (at the point of a
 * reset) and the template setting. As a compromise to its placement
 * across distinct parts of state, it is implemented here as a side-
 * effect of the block reset action.
 *
 * @param {Object} action RESET_BLOCKS action.
 * @param {Object} store  Store instance.
 *
 * @return {?Object} New validity set action if validity has changed.
 */

export function validateBlocksToTemplate(action, store) {
  var state = store.getState();
  var template = getTemplate(state);
  var templateLock = getTemplateLock(state); // Unlocked templates are considered always valid because they act
  // as default values only.

  var isBlocksValidToTemplate = !template || templateLock !== 'all' || doBlocksMatchTemplate(action.blocks, template); // Update if validity has changed.

  if (isBlocksValidToTemplate !== isValidTemplate(state)) {
    return setTemplateValidity(isBlocksValidToTemplate);
  }
}
/**
 * Effect handler which will return a default block insertion action if there
 * are no other blocks at the root of the editor. This is expected to be used
 * in actions which may result in no blocks remaining in the editor (removal,
 * replacement, etc).
 *
 * @param {Object} action Action which had initiated the effect handler.
 * @param {Object} store  Store instance.
 *
 * @return {?Object} Default block insert action, if no other blocks exist.
 */

export function ensureDefaultBlock(action, store) {
  if (!getBlockCount(store.getState())) {
    return insertDefaultBlock();
  }
}
export default {
  MERGE_BLOCKS: function MERGE_BLOCKS(action, store) {
    var dispatch = store.dispatch;
    var state = store.getState();

    var _action$blocks = _slicedToArray(action.blocks, 2),
        firstBlockClientId = _action$blocks[0],
        secondBlockClientId = _action$blocks[1];

    var blockA = getBlock(state, firstBlockClientId);
    var blockType = getBlockType(blockA.name); // Only focus the previous block if it's not mergeable

    if (!blockType.merge) {
      dispatch(selectBlock(blockA.clientId));
      return;
    } // We can only merge blocks with similar types
    // thus, we transform the block to merge first


    var blockB = getBlock(state, secondBlockClientId);
    var blocksWithTheSameType = blockA.name === blockB.name ? [blockB] : switchToBlockType(blockB, blockA.name); // If the block types can not match, do nothing

    if (!blocksWithTheSameType || !blocksWithTheSameType.length) {
      return;
    } // Calling the merge to update the attributes and remove the block to be merged


    var updatedAttributes = blockType.merge(blockA.attributes, blocksWithTheSameType[0].attributes);
    dispatch(selectBlock(blockA.clientId, -1));
    dispatch(replaceBlocks([blockA.clientId, blockB.clientId], [_objectSpread({}, blockA, {
      attributes: _objectSpread({}, blockA.attributes, updatedAttributes)
    })].concat(_toConsumableArray(blocksWithTheSameType.slice(1)))));
  },
  RESET_BLOCKS: [validateBlocksToTemplate],
  REPLACE_BLOCKS: [ensureDefaultBlock],
  MULTI_SELECT: function MULTI_SELECT(action, _ref) {
    var getState = _ref.getState;
    var blockCount = getSelectedBlockCount(getState());
    /* translators: %s: number of selected blocks */

    speak(sprintf(_n('%s block selected.', '%s blocks selected.', blockCount), blockCount), 'assertive');
  },
  SYNCHRONIZE_TEMPLATE: function SYNCHRONIZE_TEMPLATE(action, _ref2) {
    var getState = _ref2.getState;
    var state = getState();
    var blocks = getBlocks(state);
    var template = getTemplate(state);
    var updatedBlockList = synchronizeBlocksWithTemplate(blocks, template);
    return resetBlocks(updatedBlockList);
  }
};
//# sourceMappingURL=effects.js.map