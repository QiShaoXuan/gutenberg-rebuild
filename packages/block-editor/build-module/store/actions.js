import _regeneratorRuntime from "@babel/runtime/regenerator";

var _marked =
/*#__PURE__*/
_regeneratorRuntime.mark(selectPreviousBlock),
    _marked2 =
/*#__PURE__*/
_regeneratorRuntime.mark(selectNextBlock),
    _marked3 =
/*#__PURE__*/
_regeneratorRuntime.mark(removeBlocks);

/**
 * External dependencies
 */
import { castArray } from 'lodash';
/**
 * WordPress dependencies
 */

import { getDefaultBlockName, createBlock } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import { select } from './controls';
/**
 * Returns an action object used in signalling that blocks state should be
 * reset to the specified array of blocks, taking precedence over any other
 * content reflected as an edit in state.
 *
 * @param {Array} blocks Array of blocks.
 *
 * @return {Object} Action object.
 */

export function resetBlocks(blocks) {
  return {
    type: 'RESET_BLOCKS',
    blocks: blocks
  };
}
/**
 * Returns an action object used in signalling that blocks have been received.
 * Unlike resetBlocks, these should be appended to the existing known set, not
 * replacing.
 *
 * @param {Object[]} blocks Array of block objects.
 *
 * @return {Object} Action object.
 */

export function receiveBlocks(blocks) {
  return {
    type: 'RECEIVE_BLOCKS',
    blocks: blocks
  };
}
/**
 * Returns an action object used in signalling that the block attributes with
 * the specified client ID has been updated.
 *
 * @param {string} clientId   Block client ID.
 * @param {Object} attributes Block attributes to be merged.
 *
 * @return {Object} Action object.
 */

export function updateBlockAttributes(clientId, attributes) {
  return {
    type: 'UPDATE_BLOCK_ATTRIBUTES',
    clientId: clientId,
    attributes: attributes
  };
}
/**
 * Returns an action object used in signalling that the block with the
 * specified client ID has been updated.
 *
 * @param {string} clientId Block client ID.
 * @param {Object} updates  Block attributes to be merged.
 *
 * @return {Object} Action object.
 */

export function updateBlock(clientId, updates) {
  return {
    type: 'UPDATE_BLOCK',
    clientId: clientId,
    updates: updates
  };
}
/**
 * Returns an action object used in signalling that the block with the
 * specified client ID has been selected, optionally accepting a position
 * value reflecting its selection directionality. An initialPosition of -1
 * reflects a reverse selection.
 *
 * @param {string}  clientId        Block client ID.
 * @param {?number} initialPosition Optional initial position. Pass as -1 to
 *                                  reflect reverse selection.
 *
 * @return {Object} Action object.
 */

export function selectBlock(clientId) {
  var initialPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return {
    type: 'SELECT_BLOCK',
    initialPosition: initialPosition,
    clientId: clientId
  };
}
/**
 * Yields action objects used in signalling that the block preceding the given
 * clientId should be selected.
 *
 * @param {string} clientId Block client ID.
 */

export function selectPreviousBlock(clientId) {
  var previousBlockClientId;
  return _regeneratorRuntime.wrap(function selectPreviousBlock$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return select('core/block-editor', 'getPreviousBlockClientId', clientId);

        case 2:
          previousBlockClientId = _context.sent;
          _context.next = 5;
          return selectBlock(previousBlockClientId, -1);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}
/**
 * Yields action objects used in signalling that the block following the given
 * clientId should be selected.
 *
 * @param {string} clientId Block client ID.
 */

export function selectNextBlock(clientId) {
  var nextBlockClientId;
  return _regeneratorRuntime.wrap(function selectNextBlock$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return select('core/block-editor', 'getNextBlockClientId', clientId);

        case 2:
          nextBlockClientId = _context2.sent;
          _context2.next = 5;
          return selectBlock(nextBlockClientId);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
/**
 * Returns an action object used in signalling that a block multi-selection has started.
 *
 * @return {Object} Action object.
 */

export function startMultiSelect() {
  return {
    type: 'START_MULTI_SELECT'
  };
}
/**
 * Returns an action object used in signalling that block multi-selection stopped.
 *
 * @return {Object} Action object.
 */

export function stopMultiSelect() {
  return {
    type: 'STOP_MULTI_SELECT'
  };
}
/**
 * Returns an action object used in signalling that block multi-selection changed.
 *
 * @param {string} start First block of the multi selection.
 * @param {string} end   Last block of the multiselection.
 *
 * @return {Object} Action object.
 */

export function multiSelect(start, end) {
  return {
    type: 'MULTI_SELECT',
    start: start,
    end: end
  };
}
/**
 * Returns an action object used in signalling that the block selection is cleared.
 *
 * @return {Object} Action object.
 */

export function clearSelectedBlock() {
  return {
    type: 'CLEAR_SELECTED_BLOCK'
  };
}
/**
 * Returns an action object that enables or disables block selection.
 *
 * @param {boolean} [isSelectionEnabled=true] Whether block selection should
 *                                            be enabled.

 * @return {Object} Action object.
 */

export function toggleSelection() {
  var isSelectionEnabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return {
    type: 'TOGGLE_SELECTION',
    isSelectionEnabled: isSelectionEnabled
  };
}
/**
 * Returns an action object signalling that a blocks should be replaced with
 * one or more replacement blocks.
 *
 * @param {(string|string[])} clientIds Block client ID(s) to replace.
 * @param {(Object|Object[])} blocks    Replacement block(s).
 *
 * @return {Object} Action object.
 */

export function replaceBlocks(clientIds, blocks) {
  return {
    type: 'REPLACE_BLOCKS',
    clientIds: castArray(clientIds),
    blocks: castArray(blocks),
    time: Date.now()
  };
}
/**
 * Returns an action object signalling that a single block should be replaced
 * with one or more replacement blocks.
 *
 * @param {(string|string[])} clientId Block client ID to replace.
 * @param {(Object|Object[])} block    Replacement block(s).
 *
 * @return {Object} Action object.
 */

export function replaceBlock(clientId, block) {
  return replaceBlocks(clientId, block);
}
/**
 * Higher-order action creator which, given the action type to dispatch creates
 * an action creator for managing block movement.
 *
 * @param {string} type Action type to dispatch.
 *
 * @return {Function} Action creator.
 */

function createOnMove(type) {
  return function (clientIds, rootClientId) {
    return {
      clientIds: castArray(clientIds),
      type: type,
      rootClientId: rootClientId
    };
  };
}

export var moveBlocksDown = createOnMove('MOVE_BLOCKS_DOWN');
export var moveBlocksUp = createOnMove('MOVE_BLOCKS_UP');
/**
 * Returns an action object signalling that an indexed block should be moved
 * to a new index.
 *
 * @param  {?string} clientId         The client ID of the block.
 * @param  {?string} fromRootClientId Root client ID source.
 * @param  {?string} toRootClientId   Root client ID destination.
 * @param  {number}  index            The index to move the block into.
 *
 * @return {Object} Action object.
 */

export function moveBlockToPosition(clientId, fromRootClientId, toRootClientId, index) {
  return {
    type: 'MOVE_BLOCK_TO_POSITION',
    fromRootClientId: fromRootClientId,
    toRootClientId: toRootClientId,
    clientId: clientId,
    index: index
  };
}
/**
 * Returns an action object used in signalling that a single block should be
 * inserted, optionally at a specific index respective a root block list.
 *
 * @param {Object}  block            Block object to insert.
 * @param {?number} index            Index at which block should be inserted.
 * @param {?string} rootClientId     Optional root client ID of block list on which to insert.
 * @param {?boolean} updateSelection If true block selection will be updated. If false, block selection will not change. Defaults to true.
 *
 * @return {Object} Action object.
 */

export function insertBlock(block, index, rootClientId) {
  var updateSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return insertBlocks([block], index, rootClientId, updateSelection);
}
/**
 * Returns an action object used in signalling that an array of blocks should
 * be inserted, optionally at a specific index respective a root block list.
 *
 * @param {Object[]} blocks          Block objects to insert.
 * @param {?number}  index           Index at which block should be inserted.
 * @param {?string}  rootClientId    Optional root client ID of block list on which to insert.
 * @param {?boolean} updateSelection If true block selection will be updated.  If false, block selection will not change. Defaults to true.
 *
 * @return {Object} Action object.
 */

export function insertBlocks(blocks, index, rootClientId) {
  var updateSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  return {
    type: 'INSERT_BLOCKS',
    blocks: castArray(blocks),
    index: index,
    rootClientId: rootClientId,
    time: Date.now(),
    updateSelection: updateSelection
  };
}
/**
 * Returns an action object used in signalling that the insertion point should
 * be shown.
 *
 * @param {?string} rootClientId Optional root client ID of block list on
 *                               which to insert.
 * @param {?number} index        Index at which block should be inserted.
 *
 * @return {Object} Action object.
 */

export function showInsertionPoint(rootClientId, index) {
  return {
    type: 'SHOW_INSERTION_POINT',
    rootClientId: rootClientId,
    index: index
  };
}
/**
 * Returns an action object hiding the insertion point.
 *
 * @return {Object} Action object.
 */

export function hideInsertionPoint() {
  return {
    type: 'HIDE_INSERTION_POINT'
  };
}
/**
 * Returns an action object resetting the template validity.
 *
 * @param {boolean}  isValid  template validity flag.
 *
 * @return {Object} Action object.
 */

export function setTemplateValidity(isValid) {
  return {
    type: 'SET_TEMPLATE_VALIDITY',
    isValid: isValid
  };
}
/**
 * Returns an action object synchronize the template with the list of blocks
 *
 * @return {Object} Action object.
 */

export function synchronizeTemplate() {
  return {
    type: 'SYNCHRONIZE_TEMPLATE'
  };
}
/**
 * Returns an action object used in signalling that two blocks should be merged
 *
 * @param {string} firstBlockClientId  Client ID of the first block to merge.
 * @param {string} secondBlockClientId Client ID of the second block to merge.
 *
 * @return {Object} Action object.
 */

export function mergeBlocks(firstBlockClientId, secondBlockClientId) {
  return {
    type: 'MERGE_BLOCKS',
    blocks: [firstBlockClientId, secondBlockClientId]
  };
}
/**
 * Yields action objects used in signalling that the blocks corresponding to
 * the set of specified client IDs are to be removed.
 *
 * @param {string|string[]} clientIds      Client IDs of blocks to remove.
 * @param {boolean}         selectPrevious True if the previous block should be
 *                                         selected when a block is removed.
 */

export function removeBlocks(clientIds) {
  var selectPrevious,
      count,
      _args3 = arguments;
  return _regeneratorRuntime.wrap(function removeBlocks$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          selectPrevious = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : true;
          clientIds = castArray(clientIds);

          if (!selectPrevious) {
            _context3.next = 5;
            break;
          }

          _context3.next = 5;
          return selectPreviousBlock(clientIds[0]);

        case 5:
          _context3.next = 7;
          return {
            type: 'REMOVE_BLOCKS',
            clientIds: clientIds
          };

        case 7:
          _context3.next = 9;
          return select('core/block-editor', 'getBlockCount');

        case 9:
          count = _context3.sent;

          if (!(count === 0)) {
            _context3.next = 13;
            break;
          }

          _context3.next = 13;
          return insertDefaultBlock();

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}
/**
 * Returns an action object used in signalling that the block with the
 * specified client ID is to be removed.
 *
 * @param {string}  clientId       Client ID of block to remove.
 * @param {boolean} selectPrevious True if the previous block should be
 *                                 selected when a block is removed.
 *
 * @return {Object} Action object.
 */

export function removeBlock(clientId, selectPrevious) {
  return removeBlocks([clientId], selectPrevious);
}
/**
 * Returns an action object used in signalling that the inner blocks with the
 * specified client ID should be replaced.
 *
 * @param {string}   rootClientId    Client ID of the block whose InnerBlocks will re replaced.
 * @param {Object[]} blocks          Block objects to insert as new InnerBlocks
 * @param {?boolean} updateSelection If true block selection will be updated. If false, block selection will not change. Defaults to true.
 *
 * @return {Object} Action object.
 */

export function replaceInnerBlocks(rootClientId, blocks) {
  var updateSelection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return {
    type: 'REPLACE_INNER_BLOCKS',
    rootClientId: rootClientId,
    blocks: blocks,
    updateSelection: updateSelection,
    time: Date.now()
  };
}
/**
 * Returns an action object used to toggle the block editing mode between
 * visual and HTML modes.
 *
 * @param {string} clientId Block client ID.
 *
 * @return {Object} Action object.
 */

export function toggleBlockMode(clientId) {
  return {
    type: 'TOGGLE_BLOCK_MODE',
    clientId: clientId
  };
}
/**
 * Returns an action object used in signalling that the user has begun to type.
 *
 * @return {Object} Action object.
 */

export function startTyping() {
  return {
    type: 'START_TYPING'
  };
}
/**
 * Returns an action object used in signalling that the user has stopped typing.
 *
 * @return {Object} Action object.
 */

export function stopTyping() {
  return {
    type: 'STOP_TYPING'
  };
}
/**
 * Returns an action object used in signalling that the caret has entered formatted text.
 *
 * @return {Object} Action object.
 */

export function enterFormattedText() {
  return {
    type: 'ENTER_FORMATTED_TEXT'
  };
}
/**
 * Returns an action object used in signalling that the user caret has exited formatted text.
 *
 * @return {Object} Action object.
 */

export function exitFormattedText() {
  return {
    type: 'EXIT_FORMATTED_TEXT'
  };
}
/**
 * Returns an action object used in signalling that a new block of the default
 * type should be added to the block list.
 *
 * @param {?Object} attributes   Optional attributes of the block to assign.
 * @param {?string} rootClientId Optional root client ID of block list on which
 *                               to append.
 * @param {?number} index        Optional index where to insert the default block
 *
 * @return {Object} Action object
 */

export function insertDefaultBlock(attributes, rootClientId, index) {
  var block = createBlock(getDefaultBlockName(), attributes);
  return insertBlock(block, index, rootClientId);
}
/**
 * Returns an action object that changes the nested settings of a given block.
 *
 * @param {string} clientId Client ID of the block whose nested setting are
 *                          being received.
 * @param {Object} settings Object with the new settings for the nested block.
 *
 * @return {Object} Action object
 */

export function updateBlockListSettings(clientId, settings) {
  return {
    type: 'UPDATE_BLOCK_LIST_SETTINGS',
    clientId: clientId,
    settings: settings
  };
}
/*
 * Returns an action object used in signalling that the block editor settings have been updated.
 *
 * @param {Object} settings Updated settings
 *
 * @return {Object} Action object
 */

export function updateSettings(settings) {
  return {
    type: 'UPDATE_SETTINGS',
    settings: settings
  };
}
/**
 * Returns an action object used in signalling that a temporary reusable blocks have been saved
 * in order to switch its temporary id with the real id.
 *
 * @param {string} id        Reusable block's id.
 * @param {string} updatedId Updated block's id.
 *
 * @return {Object} Action object.
 */

export function __unstableSaveReusableBlock(id, updatedId) {
  return {
    type: 'SAVE_REUSABLE_BLOCK_SUCCESS',
    id: id,
    updatedId: updatedId
  };
}
/**
 * Returns an action object used in signalling that the last block change should be marked explicitely as persistent.
 *
 * @return {Object} Action object.
 */

export function __unstableMarkLastChangeAsPersistent() {
  return {
    type: 'MARK_LAST_CHANGE_AS_PERSISTENT'
  };
}
//# sourceMappingURL=actions.js.map