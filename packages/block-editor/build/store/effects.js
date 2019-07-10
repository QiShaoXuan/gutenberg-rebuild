"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateBlocksToTemplate = validateBlocksToTemplate;
exports.ensureDefaultBlock = ensureDefaultBlock;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _a11y = require("@wordpress/a11y");

var _blocks = require("@wordpress/blocks");

var _i18n = require("@wordpress/i18n");

var _actions = require("./actions");

var _selectors = require("./selectors");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

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
function validateBlocksToTemplate(action, store) {
  var state = store.getState();
  var template = (0, _selectors.getTemplate)(state);
  var templateLock = (0, _selectors.getTemplateLock)(state); // Unlocked templates are considered always valid because they act
  // as default values only.

  var isBlocksValidToTemplate = !template || templateLock !== 'all' || (0, _blocks.doBlocksMatchTemplate)(action.blocks, template); // Update if validity has changed.

  if (isBlocksValidToTemplate !== (0, _selectors.isValidTemplate)(state)) {
    return (0, _actions.setTemplateValidity)(isBlocksValidToTemplate);
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


function ensureDefaultBlock(action, store) {
  if (!(0, _selectors.getBlockCount)(store.getState())) {
    return (0, _actions.insertDefaultBlock)();
  }
}

var _default = {
  MERGE_BLOCKS: function MERGE_BLOCKS(action, store) {
    var dispatch = store.dispatch;
    var state = store.getState();

    var _action$blocks = (0, _slicedToArray2.default)(action.blocks, 2),
        firstBlockClientId = _action$blocks[0],
        secondBlockClientId = _action$blocks[1];

    var blockA = (0, _selectors.getBlock)(state, firstBlockClientId);
    var blockType = (0, _blocks.getBlockType)(blockA.name); // Only focus the previous block if it's not mergeable

    if (!blockType.merge) {
      dispatch((0, _actions.selectBlock)(blockA.clientId));
      return;
    } // We can only merge blocks with similar types
    // thus, we transform the block to merge first


    var blockB = (0, _selectors.getBlock)(state, secondBlockClientId);
    var blocksWithTheSameType = blockA.name === blockB.name ? [blockB] : (0, _blocks.switchToBlockType)(blockB, blockA.name); // If the block types can not match, do nothing

    if (!blocksWithTheSameType || !blocksWithTheSameType.length) {
      return;
    } // Calling the merge to update the attributes and remove the block to be merged


    var updatedAttributes = blockType.merge(blockA.attributes, blocksWithTheSameType[0].attributes);
    dispatch((0, _actions.selectBlock)(blockA.clientId, -1));
    dispatch((0, _actions.replaceBlocks)([blockA.clientId, blockB.clientId], [(0, _objectSpread2.default)({}, blockA, {
      attributes: (0, _objectSpread2.default)({}, blockA.attributes, updatedAttributes)
    })].concat((0, _toConsumableArray2.default)(blocksWithTheSameType.slice(1)))));
  },
  RESET_BLOCKS: [validateBlocksToTemplate],
  REPLACE_BLOCKS: [ensureDefaultBlock],
  MULTI_SELECT: function MULTI_SELECT(action, _ref) {
    var getState = _ref.getState;
    var blockCount = (0, _selectors.getSelectedBlockCount)(getState());
    /* translators: %s: number of selected blocks */

    (0, _a11y.speak)((0, _i18n.sprintf)((0, _i18n._n)('%s block selected.', '%s blocks selected.', blockCount), blockCount), 'assertive');
  },
  SYNCHRONIZE_TEMPLATE: function SYNCHRONIZE_TEMPLATE(action, _ref2) {
    var getState = _ref2.getState;
    var state = getState();
    var blocks = (0, _selectors.getBlocks)(state);
    var template = (0, _selectors.getTemplate)(state);
    var updatedBlockList = (0, _blocks.synchronizeBlocksWithTemplate)(blocks, template);
    return (0, _actions.resetBlocks)(updatedBlockList);
  }
};
exports.default = _default;
//# sourceMappingURL=effects.js.map