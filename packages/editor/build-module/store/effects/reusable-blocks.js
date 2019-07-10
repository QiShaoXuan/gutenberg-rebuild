import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * External dependencies
 */
import { compact, map, uniqueId } from 'lodash';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
/**
 * WordPress dependencies
 */

import apiFetch from '@wordpress/api-fetch';
import { parse, serialize, createBlock, isReusableBlock, cloneBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n'; // TODO: Ideally this would be the only dispatch in scope. This requires either
// refactoring editor actions to yielded controls, or replacing direct dispatch
// on the editor store with action creators (e.g. `REMOVE_REUSABLE_BLOCK`).

import { dispatch as dataDispatch, select } from '@wordpress/data';
/**
 * Internal dependencies
 */

import { __experimentalReceiveReusableBlocks as receiveReusableBlocksAction, __experimentalSaveReusableBlock as saveReusableBlock } from '../actions';
import { __experimentalGetReusableBlock as getReusableBlock } from '../selectors';
import { getPostRawValue } from '../reducer';
/**
 * Module Constants
 */

var REUSABLE_BLOCK_NOTICE_ID = 'REUSABLE_BLOCK_NOTICE_ID';
/**
 * Fetch Reusable Blocks Effect Handler.
 *
 * @param {Object} action  action object.
 * @param {Object} store   Redux Store.
 */

export var fetchReusableBlocks =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(action, store) {
    var id, dispatch, postType, posts, results;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = action.id;
            dispatch = store.dispatch; // TODO: these are potentially undefined, this fix is in place
            // until there is a filter to not use reusable blocks if undefined

            _context.next = 4;
            return apiFetch({
              path: '/wp/v2/types/wp_block'
            });

          case 4:
            postType = _context.sent;

            if (postType) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            _context.prev = 7;

            if (!id) {
              _context.next = 15;
              break;
            }

            _context.next = 11;
            return apiFetch({
              path: "/wp/v2/".concat(postType.rest_base, "/").concat(id)
            });

          case 11:
            _context.t0 = _context.sent;
            posts = [_context.t0];
            _context.next = 18;
            break;

          case 15:
            _context.next = 17;
            return apiFetch({
              path: "/wp/v2/".concat(postType.rest_base, "?per_page=-1")
            });

          case 17:
            posts = _context.sent;

          case 18:
            results = compact(map(posts, function (post) {
              if (post.status !== 'publish' || post.content.protected) {
                return null;
              }

              var parsedBlocks = parse(post.content.raw);
              return {
                reusableBlock: {
                  id: post.id,
                  title: getPostRawValue(post.title)
                },
                parsedBlock: parsedBlocks.length === 1 ? parsedBlocks[0] : createBlock('core/template', {}, parsedBlocks)
              };
            }));

            if (results.length) {
              dispatch(receiveReusableBlocksAction(results));
            }

            dispatch({
              type: 'FETCH_REUSABLE_BLOCKS_SUCCESS',
              id: id
            });
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t1 = _context["catch"](7);
            dispatch({
              type: 'FETCH_REUSABLE_BLOCKS_FAILURE',
              id: id,
              error: _context.t1
            });

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[7, 23]]);
  }));

  return function fetchReusableBlocks(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Save Reusable Blocks Effect Handler.
 *
 * @param {Object} action  action object.
 * @param {Object} store   Redux Store.
 */

export var saveReusableBlocks =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(action, store) {
    var postType, id, dispatch, state, _getReusableBlock, clientId, title, isTemporary, reusableBlock, content, data, path, method, updatedReusableBlock, message;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return apiFetch({
              path: '/wp/v2/types/wp_block'
            });

          case 2:
            postType = _context2.sent;

            if (postType) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return");

          case 5:
            id = action.id;
            dispatch = store.dispatch;
            state = store.getState();
            _getReusableBlock = getReusableBlock(state, id), clientId = _getReusableBlock.clientId, title = _getReusableBlock.title, isTemporary = _getReusableBlock.isTemporary;
            reusableBlock = select('core/block-editor').getBlock(clientId);
            content = serialize(reusableBlock.name === 'core/template' ? reusableBlock.innerBlocks : reusableBlock);
            data = isTemporary ? {
              title: title,
              content: content,
              status: 'publish'
            } : {
              id: id,
              title: title,
              content: content,
              status: 'publish'
            };
            path = isTemporary ? "/wp/v2/".concat(postType.rest_base) : "/wp/v2/".concat(postType.rest_base, "/").concat(id);
            method = isTemporary ? 'POST' : 'PUT';
            _context2.prev = 14;
            _context2.next = 17;
            return apiFetch({
              path: path,
              data: data,
              method: method
            });

          case 17:
            updatedReusableBlock = _context2.sent;
            dispatch({
              type: 'SAVE_REUSABLE_BLOCK_SUCCESS',
              updatedId: updatedReusableBlock.id,
              id: id
            });
            message = isTemporary ? __('Block created.') : __('Block updated.');
            dataDispatch('core/notices').createSuccessNotice(message, {
              id: REUSABLE_BLOCK_NOTICE_ID
            });

            dataDispatch('core/block-editor').__unstableSaveReusableBlock(id, updatedReusableBlock.id);

            _context2.next = 28;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](14);
            dispatch({
              type: 'SAVE_REUSABLE_BLOCK_FAILURE',
              id: id
            });
            dataDispatch('core/notices').createErrorNotice(_context2.t0.message, {
              id: REUSABLE_BLOCK_NOTICE_ID
            });

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[14, 24]]);
  }));

  return function saveReusableBlocks(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Delete Reusable Blocks Effect Handler.
 *
 * @param {Object} action  action object.
 * @param {Object} store   Redux Store.
 */

export var deleteReusableBlocks =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3(action, store) {
    var postType, id, getState, dispatch, reusableBlock, allBlocks, associatedBlocks, associatedBlockClientIds, transactionId, message;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return apiFetch({
              path: '/wp/v2/types/wp_block'
            });

          case 2:
            postType = _context3.sent;

            if (postType) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return");

          case 5:
            id = action.id;
            getState = store.getState, dispatch = store.dispatch; // Don't allow a reusable block with a temporary ID to be deleted

            reusableBlock = getReusableBlock(getState(), id);

            if (!(!reusableBlock || reusableBlock.isTemporary)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return");

          case 10:
            // Remove any other blocks that reference this reusable block
            allBlocks = select('core/block-editor').getBlocks();
            associatedBlocks = allBlocks.filter(function (block) {
              return isReusableBlock(block) && block.attributes.ref === id;
            });
            associatedBlockClientIds = associatedBlocks.map(function (block) {
              return block.clientId;
            });
            transactionId = uniqueId();
            dispatch({
              type: 'REMOVE_REUSABLE_BLOCK',
              id: id,
              optimist: {
                type: BEGIN,
                id: transactionId
              }
            }); // Remove the parsed block.

            dataDispatch('core/block-editor').removeBlocks([].concat(_toConsumableArray(associatedBlockClientIds), [reusableBlock.clientId]));
            _context3.prev = 16;
            _context3.next = 19;
            return apiFetch({
              path: "/wp/v2/".concat(postType.rest_base, "/").concat(id),
              method: 'DELETE'
            });

          case 19:
            dispatch({
              type: 'DELETE_REUSABLE_BLOCK_SUCCESS',
              id: id,
              optimist: {
                type: COMMIT,
                id: transactionId
              }
            });
            message = __('Block deleted.');
            dataDispatch('core/notices').createSuccessNotice(message, {
              id: REUSABLE_BLOCK_NOTICE_ID
            });
            _context3.next = 28;
            break;

          case 24:
            _context3.prev = 24;
            _context3.t0 = _context3["catch"](16);
            dispatch({
              type: 'DELETE_REUSABLE_BLOCK_FAILURE',
              id: id,
              optimist: {
                type: REVERT,
                id: transactionId
              }
            });
            dataDispatch('core/notices').createErrorNotice(_context3.t0.message, {
              id: REUSABLE_BLOCK_NOTICE_ID
            });

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[16, 24]]);
  }));

  return function deleteReusableBlocks(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Receive Reusable Blocks Effect Handler.
 *
 * @param {Object} action  action object.
 */

export var receiveReusableBlocks = function receiveReusableBlocks(action) {
  dataDispatch('core/block-editor').receiveBlocks(map(action.results, 'parsedBlock'));
};
/**
 * Convert a reusable block to a static block effect handler
 *
 * @param {Object} action  action object.
 * @param {Object} store   Redux Store.
 */

export var convertBlockToStatic = function convertBlockToStatic(action, store) {
  var state = store.getState();
  var oldBlock = select('core/block-editor').getBlock(action.clientId);
  var reusableBlock = getReusableBlock(state, oldBlock.attributes.ref);
  var referencedBlock = select('core/block-editor').getBlock(reusableBlock.clientId);
  var newBlocks;

  if (referencedBlock.name === 'core/template') {
    newBlocks = referencedBlock.innerBlocks.map(function (innerBlock) {
      return cloneBlock(innerBlock);
    });
  } else {
    newBlocks = [cloneBlock(referencedBlock)];
  }

  dataDispatch('core/block-editor').replaceBlocks(oldBlock.clientId, newBlocks);
};
/**
 * Convert a static block to a reusable block effect handler
 *
 * @param {Object} action  action object.
 * @param {Object} store   Redux Store.
 */

export var convertBlockToReusable = function convertBlockToReusable(action, store) {
  var dispatch = store.dispatch;
  var parsedBlock;

  if (action.clientIds.length === 1) {
    parsedBlock = select('core/block-editor').getBlock(action.clientIds[0]);
  } else {
    parsedBlock = createBlock('core/template', {}, select('core/block-editor').getBlocksByClientId(action.clientIds)); // This shouldn't be necessary but at the moment
    // we expect the content of the shared blocks to live in the blocks state.

    dataDispatch('core/block-editor').receiveBlocks([parsedBlock]);
  }

  var reusableBlock = {
    id: uniqueId('reusable'),
    clientId: parsedBlock.clientId,
    title: __('Untitled Reusable Block')
  };
  dispatch(receiveReusableBlocksAction([{
    reusableBlock: reusableBlock,
    parsedBlock: parsedBlock
  }]));
  dispatch(saveReusableBlock(reusableBlock.id));
  dataDispatch('core/block-editor').replaceBlocks(action.clientIds, createBlock('core/block', {
    ref: reusableBlock.id
  })); // Re-add the original block to the store, since replaceBlock() will have removed it

  dataDispatch('core/block-editor').receiveBlocks([parsedBlock]);
};
//# sourceMappingURL=reusable-blocks.js.map