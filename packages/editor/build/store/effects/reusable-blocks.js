"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertBlockToReusable = exports.convertBlockToStatic = exports.receiveReusableBlocks = exports.deleteReusableBlocks = exports.saveReusableBlocks = exports.fetchReusableBlocks = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _reduxOptimist = require("redux-optimist");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _blocks = require("@wordpress/blocks");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _actions = require("../actions");

var _selectors = require("../selectors");

var _reducer = require("../reducer");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
// TODO: Ideally this would be the only dispatch in scope. This requires either
// refactoring editor actions to yielded controls, or replacing direct dispatch
// on the editor store with action creators (e.g. `REMOVE_REUSABLE_BLOCK`).

/**
 * Internal dependencies
 */

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

var fetchReusableBlocks =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(action, store) {
    var id, dispatch, postType, posts, results;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = action.id;
            dispatch = store.dispatch; // TODO: these are potentially undefined, this fix is in place
            // until there is a filter to not use reusable blocks if undefined

            _context.next = 4;
            return (0, _apiFetch.default)({
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
            return (0, _apiFetch.default)({
              path: "/wp/v2/".concat(postType.rest_base, "/").concat(id)
            });

          case 11:
            _context.t0 = _context.sent;
            posts = [_context.t0];
            _context.next = 18;
            break;

          case 15:
            _context.next = 17;
            return (0, _apiFetch.default)({
              path: "/wp/v2/".concat(postType.rest_base, "?per_page=-1")
            });

          case 17:
            posts = _context.sent;

          case 18:
            results = (0, _lodash.compact)((0, _lodash.map)(posts, function (post) {
              if (post.status !== 'publish' || post.content.protected) {
                return null;
              }

              var parsedBlocks = (0, _blocks.parse)(post.content.raw);
              return {
                reusableBlock: {
                  id: post.id,
                  title: (0, _reducer.getPostRawValue)(post.title)
                },
                parsedBlock: parsedBlocks.length === 1 ? parsedBlocks[0] : (0, _blocks.createBlock)('core/template', {}, parsedBlocks)
              };
            }));

            if (results.length) {
              dispatch((0, _actions.__experimentalReceiveReusableBlocks)(results));
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


exports.fetchReusableBlocks = fetchReusableBlocks;

var saveReusableBlocks =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(action, store) {
    var postType, id, dispatch, state, _getReusableBlock, clientId, title, isTemporary, reusableBlock, content, data, path, method, updatedReusableBlock, message;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _apiFetch.default)({
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
            _getReusableBlock = (0, _selectors.__experimentalGetReusableBlock)(state, id), clientId = _getReusableBlock.clientId, title = _getReusableBlock.title, isTemporary = _getReusableBlock.isTemporary;
            reusableBlock = (0, _data.select)('core/block-editor').getBlock(clientId);
            content = (0, _blocks.serialize)(reusableBlock.name === 'core/template' ? reusableBlock.innerBlocks : reusableBlock);
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
            return (0, _apiFetch.default)({
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
            message = isTemporary ? (0, _i18n.__)('Block created.') : (0, _i18n.__)('Block updated.');
            (0, _data.dispatch)('core/notices').createSuccessNotice(message, {
              id: REUSABLE_BLOCK_NOTICE_ID
            });

            (0, _data.dispatch)('core/block-editor').__unstableSaveReusableBlock(id, updatedReusableBlock.id);

            _context2.next = 28;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](14);
            dispatch({
              type: 'SAVE_REUSABLE_BLOCK_FAILURE',
              id: id
            });
            (0, _data.dispatch)('core/notices').createErrorNotice(_context2.t0.message, {
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


exports.saveReusableBlocks = saveReusableBlocks;

var deleteReusableBlocks =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(action, store) {
    var postType, id, getState, dispatch, reusableBlock, allBlocks, associatedBlocks, associatedBlockClientIds, transactionId, message;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _apiFetch.default)({
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

            reusableBlock = (0, _selectors.__experimentalGetReusableBlock)(getState(), id);

            if (!(!reusableBlock || reusableBlock.isTemporary)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return");

          case 10:
            // Remove any other blocks that reference this reusable block
            allBlocks = (0, _data.select)('core/block-editor').getBlocks();
            associatedBlocks = allBlocks.filter(function (block) {
              return (0, _blocks.isReusableBlock)(block) && block.attributes.ref === id;
            });
            associatedBlockClientIds = associatedBlocks.map(function (block) {
              return block.clientId;
            });
            transactionId = (0, _lodash.uniqueId)();
            dispatch({
              type: 'REMOVE_REUSABLE_BLOCK',
              id: id,
              optimist: {
                type: _reduxOptimist.BEGIN,
                id: transactionId
              }
            }); // Remove the parsed block.

            (0, _data.dispatch)('core/block-editor').removeBlocks([].concat((0, _toConsumableArray2.default)(associatedBlockClientIds), [reusableBlock.clientId]));
            _context3.prev = 16;
            _context3.next = 19;
            return (0, _apiFetch.default)({
              path: "/wp/v2/".concat(postType.rest_base, "/").concat(id),
              method: 'DELETE'
            });

          case 19:
            dispatch({
              type: 'DELETE_REUSABLE_BLOCK_SUCCESS',
              id: id,
              optimist: {
                type: _reduxOptimist.COMMIT,
                id: transactionId
              }
            });
            message = (0, _i18n.__)('Block deleted.');
            (0, _data.dispatch)('core/notices').createSuccessNotice(message, {
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
                type: _reduxOptimist.REVERT,
                id: transactionId
              }
            });
            (0, _data.dispatch)('core/notices').createErrorNotice(_context3.t0.message, {
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


exports.deleteReusableBlocks = deleteReusableBlocks;

var receiveReusableBlocks = function receiveReusableBlocks(action) {
  (0, _data.dispatch)('core/block-editor').receiveBlocks((0, _lodash.map)(action.results, 'parsedBlock'));
};
/**
 * Convert a reusable block to a static block effect handler
 *
 * @param {Object} action  action object.
 * @param {Object} store   Redux Store.
 */


exports.receiveReusableBlocks = receiveReusableBlocks;

var convertBlockToStatic = function convertBlockToStatic(action, store) {
  var state = store.getState();
  var oldBlock = (0, _data.select)('core/block-editor').getBlock(action.clientId);
  var reusableBlock = (0, _selectors.__experimentalGetReusableBlock)(state, oldBlock.attributes.ref);
  var referencedBlock = (0, _data.select)('core/block-editor').getBlock(reusableBlock.clientId);
  var newBlocks;

  if (referencedBlock.name === 'core/template') {
    newBlocks = referencedBlock.innerBlocks.map(function (innerBlock) {
      return (0, _blocks.cloneBlock)(innerBlock);
    });
  } else {
    newBlocks = [(0, _blocks.cloneBlock)(referencedBlock)];
  }

  (0, _data.dispatch)('core/block-editor').replaceBlocks(oldBlock.clientId, newBlocks);
};
/**
 * Convert a static block to a reusable block effect handler
 *
 * @param {Object} action  action object.
 * @param {Object} store   Redux Store.
 */


exports.convertBlockToStatic = convertBlockToStatic;

var convertBlockToReusable = function convertBlockToReusable(action, store) {
  var dispatch = store.dispatch;
  var parsedBlock;

  if (action.clientIds.length === 1) {
    parsedBlock = (0, _data.select)('core/block-editor').getBlock(action.clientIds[0]);
  } else {
    parsedBlock = (0, _blocks.createBlock)('core/template', {}, (0, _data.select)('core/block-editor').getBlocksByClientId(action.clientIds)); // This shouldn't be necessary but at the moment
    // we expect the content of the shared blocks to live in the blocks state.

    (0, _data.dispatch)('core/block-editor').receiveBlocks([parsedBlock]);
  }

  var reusableBlock = {
    id: (0, _lodash.uniqueId)('reusable'),
    clientId: parsedBlock.clientId,
    title: (0, _i18n.__)('Untitled Reusable Block')
  };
  dispatch((0, _actions.__experimentalReceiveReusableBlocks)([{
    reusableBlock: reusableBlock,
    parsedBlock: parsedBlock
  }]));
  dispatch((0, _actions.__experimentalSaveReusableBlock)(reusableBlock.id));
  (0, _data.dispatch)('core/block-editor').replaceBlocks(action.clientIds, (0, _blocks.createBlock)('core/block', {
    ref: reusableBlock.id
  })); // Re-add the original block to the store, since replaceBlock() will have removed it

  (0, _data.dispatch)('core/block-editor').receiveBlocks([parsedBlock]);
};

exports.convertBlockToReusable = convertBlockToReusable;
//# sourceMappingURL=reusable-blocks.js.map