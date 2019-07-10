"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasSameKeys = hasSameKeys;
exports.isUpdatingSameBlockAttribute = isUpdatingSameBlockAttribute;
exports.isTyping = isTyping;
exports.isCaretWithinFormattedText = isCaretWithinFormattedText;
exports.blockSelection = blockSelection;
exports.blocksMode = blocksMode;
exports.insertionPoint = insertionPoint;
exports.template = template;
exports.settings = settings;
exports.preferences = preferences;
exports.default = exports.blockListSettings = exports.blocks = void 0;

var _objectSpread13 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _blocks = require("@wordpress/blocks");

var _defaults = require("./defaults");

var _array = require("./array");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Given an array of blocks, returns an object where each key is a nesting
 * context, the value of which is an array of block client IDs existing within
 * that nesting context.
 *
 * @param {Array}   blocks       Blocks to map.
 * @param {?string} rootClientId Assumed root client ID.
 *
 * @return {Object} Block order map object.
 */
function mapBlockOrder(blocks) {
  var rootClientId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var result = (0, _defineProperty2.default)({}, rootClientId, []);
  blocks.forEach(function (block) {
    var clientId = block.clientId,
        innerBlocks = block.innerBlocks;
    result[rootClientId].push(clientId);
    Object.assign(result, mapBlockOrder(innerBlocks, clientId));
  });
  return result;
}
/**
 * Helper method to iterate through all blocks, recursing into inner blocks,
 * applying a transformation function to each one.
 * Returns a flattened object with the transformed blocks.
 *
 * @param {Array} blocks Blocks to flatten.
 * @param {Function} transform Transforming function to be applied to each block.
 *
 * @return {Object} Flattened object.
 */


function flattenBlocks(blocks, transform) {
  var result = {};
  var stack = (0, _toConsumableArray2.default)(blocks);

  while (stack.length) {
    var _stack$shift = stack.shift(),
        innerBlocks = _stack$shift.innerBlocks,
        block = (0, _objectWithoutProperties2.default)(_stack$shift, ["innerBlocks"]);

    stack.push.apply(stack, (0, _toConsumableArray2.default)(innerBlocks));
    result[block.clientId] = transform(block);
  }

  return result;
}
/**
 * Given an array of blocks, returns an object containing all blocks, without
 * attributes, recursing into inner blocks. Keys correspond to the block client
 * ID, the value of which is the attributes object.
 *
 * @param {Array} blocks Blocks to flatten.
 *
 * @return {Object} Flattened block attributes object.
 */


function getFlattenedBlocksWithoutAttributes(blocks) {
  return flattenBlocks(blocks, function (block) {
    return (0, _lodash.omit)(block, 'attributes');
  });
}
/**
 * Given an array of blocks, returns an object containing all block attributes,
 * recursing into inner blocks. Keys correspond to the block client ID, the
 * value of which is the attributes object.
 *
 * @param {Array} blocks Blocks to flatten.
 *
 * @return {Object} Flattened block attributes object.
 */


function getFlattenedBlockAttributes(blocks) {
  return flattenBlocks(blocks, function (block) {
    return block.attributes;
  });
}
/**
 * Given a block order map object, returns *all* of the block client IDs that are
 * a descendant of the given root client ID.
 *
 * Calling this with `rootClientId` set to `''` results in a list of client IDs
 * that are in the post. That is, it excludes blocks like fetched reusable
 * blocks which are stored into state but not visible.
 *
 * @param {Object}  blocksOrder  Object that maps block client IDs to a list of
 *                               nested block client IDs.
 * @param {?string} rootClientId The root client ID to search. Defaults to ''.
 *
 * @return {Array} List of descendant client IDs.
 */


function getNestedBlockClientIds(blocksOrder) {
  var rootClientId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return (0, _lodash.reduce)(blocksOrder[rootClientId], function (result, clientId) {
    return [].concat((0, _toConsumableArray2.default)(result), [clientId], (0, _toConsumableArray2.default)(getNestedBlockClientIds(blocksOrder, clientId)));
  }, []);
}
/**
 * Returns an object against which it is safe to perform mutating operations,
 * given the original object and its current working copy.
 *
 * @param {Object} original Original object.
 * @param {Object} working  Working object.
 *
 * @return {Object} Mutation-safe object.
 */


function getMutateSafeObject(original, working) {
  if (original === working) {
    return (0, _objectSpread13.default)({}, original);
  }

  return working;
}
/**
 * Returns true if the two object arguments have the same keys, or false
 * otherwise.
 *
 * @param {Object} a First object.
 * @param {Object} b Second object.
 *
 * @return {boolean} Whether the two objects have the same keys.
 */


function hasSameKeys(a, b) {
  return (0, _lodash.isEqual)((0, _lodash.keys)(a), (0, _lodash.keys)(b));
}
/**
 * Returns true if, given the currently dispatching action and the previously
 * dispatched action, the two actions are updating the same block attribute, or
 * false otherwise.
 *
 * @param {Object} action     Currently dispatching action.
 * @param {Object} lastAction Previously dispatched action.
 *
 * @return {boolean} Whether actions are updating the same block attribute.
 */


function isUpdatingSameBlockAttribute(action, lastAction) {
  return action.type === 'UPDATE_BLOCK_ATTRIBUTES' && lastAction !== undefined && lastAction.type === 'UPDATE_BLOCK_ATTRIBUTES' && action.clientId === lastAction.clientId && hasSameKeys(action.attributes, lastAction.attributes);
}
/**
 * Higher-order reducer intended to augment the blocks reducer, assigning an
 * `isPersistentChange` property value corresponding to whether a change in
 * state can be considered as persistent. All changes are considered persistent
 * except when updating the same block attribute as in the previous action.
 *
 * @param {Function} reducer Original reducer function.
 *
 * @return {Function} Enhanced reducer function.
 */


function withPersistentBlockChange(reducer) {
  var lastAction;
  /**
   * Set of action types for which a blocks state change should be considered
   * non-persistent.
   *
   * @type {Set}
   */

  var IGNORED_ACTION_TYPES = new Set(['RECEIVE_BLOCKS']);
  return function (state, action) {
    var nextState = reducer(state, action);
    var isExplicitPersistentChange = action.type === 'MARK_LAST_CHANGE_AS_PERSISTENT'; // Defer to previous state value (or default) unless changing or
    // explicitly marking as persistent.

    if (state === nextState && !isExplicitPersistentChange) {
      return (0, _objectSpread13.default)({}, nextState, {
        isPersistentChange: (0, _lodash.get)(state, ['isPersistentChange'], true)
      });
    } // Some state changes should not be considered persistent, namely those
    // which are not a direct result of user interaction.


    var isIgnoredActionType = IGNORED_ACTION_TYPES.has(action.type);

    if (isIgnoredActionType) {
      return (0, _objectSpread13.default)({}, nextState, {
        isPersistentChange: false
      });
    }

    nextState = (0, _objectSpread13.default)({}, nextState, {
      isPersistentChange: isExplicitPersistentChange || !isUpdatingSameBlockAttribute(action, lastAction)
    }); // In comparing against the previous action, consider only those which
    // would have qualified as one which would have been ignored or not
    // have resulted in a changed state.

    lastAction = action;
    return nextState;
  };
}
/**
 * Higher-order reducer targeting the combined blocks reducer, augmenting
 * block client IDs in remove action to include cascade of inner blocks.
 *
 * @param {Function} reducer Original reducer function.
 *
 * @return {Function} Enhanced reducer function.
 */


var withInnerBlocksRemoveCascade = function withInnerBlocksRemoveCascade(reducer) {
  return function (state, action) {
    if (state && action.type === 'REMOVE_BLOCKS') {
      var clientIds = (0, _toConsumableArray2.default)(action.clientIds); // For each removed client ID, include its inner blocks to remove,
      // recursing into those so long as inner blocks exist.

      for (var i = 0; i < clientIds.length; i++) {
        clientIds.push.apply(clientIds, (0, _toConsumableArray2.default)(state.order[clientIds[i]]));
      }

      action = (0, _objectSpread13.default)({}, action, {
        clientIds: clientIds
      });
    }

    return reducer(state, action);
  };
};
/**
 * Higher-order reducer which targets the combined blocks reducer and handles
 * the `RESET_BLOCKS` action. When dispatched, this action will replace all
 * blocks that exist in the post, leaving blocks that exist only in state (e.g.
 * reusable blocks) alone.
 *
 * @param {Function} reducer Original reducer function.
 *
 * @return {Function} Enhanced reducer function.
 */


var withBlockReset = function withBlockReset(reducer) {
  return function (state, action) {
    if (state && action.type === 'RESET_BLOCKS') {
      var visibleClientIds = getNestedBlockClientIds(state.order);
      return (0, _objectSpread13.default)({}, state, {
        byClientId: (0, _objectSpread13.default)({}, (0, _lodash.omit)(state.byClientId, visibleClientIds), getFlattenedBlocksWithoutAttributes(action.blocks)),
        attributes: (0, _objectSpread13.default)({}, (0, _lodash.omit)(state.attributes, visibleClientIds), getFlattenedBlockAttributes(action.blocks)),
        order: (0, _objectSpread13.default)({}, (0, _lodash.omit)(state.order, visibleClientIds), mapBlockOrder(action.blocks))
      });
    }

    return reducer(state, action);
  };
};
/**
 * Higher-order reducer which targets the combined blocks reducer and handles
 * the `REPLACE_INNER_BLOCKS` action. When dispatched, this action the state should become equivalent
 * to the execution of a `REMOVE_BLOCKS` action containing all the child's of the root block followed by
 * the execution of `INSERT_BLOCKS` with the new blocks.
 *
 * @param {Function} reducer Original reducer function.
 *
 * @return {Function} Enhanced reducer function.
 */


var withReplaceInnerBlocks = function withReplaceInnerBlocks(reducer) {
  return function (state, action) {
    if (action.type !== 'REPLACE_INNER_BLOCKS') {
      return reducer(state, action);
    }

    var stateAfterBlocksRemoval = state;

    if (state.order[action.rootClientId]) {
      stateAfterBlocksRemoval = reducer(stateAfterBlocksRemoval, {
        type: 'REMOVE_BLOCKS',
        clientIds: state.order[action.rootClientId]
      });
    }

    var stateAfterInsert = stateAfterBlocksRemoval;

    if (action.blocks.length) {
      stateAfterInsert = reducer(stateAfterInsert, (0, _objectSpread13.default)({}, action, {
        type: 'INSERT_BLOCKS',
        index: 0
      }));
    }

    return stateAfterInsert;
  };
};
/**
 * Higher-order reducer which targets the combined blocks reducer and handles
 * the `SAVE_REUSABLE_BLOCK_SUCCESS` action. This action can't be handled by
 * regular reducers and needs a higher-order reducer since it needs access to
 * both `byClientId` and `attributes` simultaneously.
 *
 * @param {Function} reducer Original reducer function.
 *
 * @return {Function} Enhanced reducer function.
 */


var withSaveReusableBlock = function withSaveReusableBlock(reducer) {
  return function (state, action) {
    if (state && action.type === 'SAVE_REUSABLE_BLOCK_SUCCESS') {
      var id = action.id,
          updatedId = action.updatedId; // If a temporary reusable block is saved, we swap the temporary id with the final one

      if (id === updatedId) {
        return state;
      }

      state = (0, _objectSpread13.default)({}, state);
      state.attributes = (0, _lodash.mapValues)(state.attributes, function (attributes, clientId) {
        var name = state.byClientId[clientId].name;

        if (name === 'core/block' && attributes.ref === id) {
          return (0, _objectSpread13.default)({}, attributes, {
            ref: updatedId
          });
        }

        return attributes;
      });
    }

    return reducer(state, action);
  };
};
/**
 * Reducer returning the blocks state.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @returns {Object} Updated state.
 */


var blocks = (0, _lodash.flow)(_data.combineReducers, withInnerBlocksRemoveCascade, withReplaceInnerBlocks, // needs to be after withInnerBlocksRemoveCascade
withBlockReset, withSaveReusableBlock, withPersistentBlockChange)({
  byClientId: function byClientId() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'RESET_BLOCKS':
        return getFlattenedBlocksWithoutAttributes(action.blocks);

      case 'RECEIVE_BLOCKS':
        return (0, _objectSpread13.default)({}, state, getFlattenedBlocksWithoutAttributes(action.blocks));

      case 'UPDATE_BLOCK':
        // Ignore updates if block isn't known
        if (!state[action.clientId]) {
          return state;
        } // Do nothing if only attributes change.


        var changes = (0, _lodash.omit)(action.updates, 'attributes');

        if ((0, _lodash.isEmpty)(changes)) {
          return state;
        }

        return (0, _objectSpread13.default)({}, state, (0, _defineProperty2.default)({}, action.clientId, (0, _objectSpread13.default)({}, state[action.clientId], changes)));

      case 'INSERT_BLOCKS':
        return (0, _objectSpread13.default)({}, state, getFlattenedBlocksWithoutAttributes(action.blocks));

      case 'REPLACE_BLOCKS':
        if (!action.blocks) {
          return state;
        }

        return (0, _objectSpread13.default)({}, (0, _lodash.omit)(state, action.clientIds), getFlattenedBlocksWithoutAttributes(action.blocks));

      case 'REMOVE_BLOCKS':
        return (0, _lodash.omit)(state, action.clientIds);
    }

    return state;
  },
  attributes: function attributes() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'RESET_BLOCKS':
        return getFlattenedBlockAttributes(action.blocks);

      case 'RECEIVE_BLOCKS':
        return (0, _objectSpread13.default)({}, state, getFlattenedBlockAttributes(action.blocks));

      case 'UPDATE_BLOCK':
        // Ignore updates if block isn't known or there are no attribute changes.
        if (!state[action.clientId] || !action.updates.attributes) {
          return state;
        }

        return (0, _objectSpread13.default)({}, state, (0, _defineProperty2.default)({}, action.clientId, (0, _objectSpread13.default)({}, state[action.clientId], action.updates.attributes)));

      case 'UPDATE_BLOCK_ATTRIBUTES':
        // Ignore updates if block isn't known
        if (!state[action.clientId]) {
          return state;
        } // Consider as updates only changed values


        var nextAttributes = (0, _lodash.reduce)(action.attributes, function (result, value, key) {
          if (value !== result[key]) {
            result = getMutateSafeObject(state[action.clientId], result);
            result[key] = value;
          }

          return result;
        }, state[action.clientId]); // Skip update if nothing has been changed. The reference will
        // match the original block if `reduce` had no changed values.

        if (nextAttributes === state[action.clientId]) {
          return state;
        } // Otherwise replace attributes in state


        return (0, _objectSpread13.default)({}, state, (0, _defineProperty2.default)({}, action.clientId, nextAttributes));

      case 'INSERT_BLOCKS':
        return (0, _objectSpread13.default)({}, state, getFlattenedBlockAttributes(action.blocks));

      case 'REPLACE_BLOCKS':
        if (!action.blocks) {
          return state;
        }

        return (0, _objectSpread13.default)({}, (0, _lodash.omit)(state, action.clientIds), getFlattenedBlockAttributes(action.blocks));

      case 'REMOVE_BLOCKS':
        return (0, _lodash.omit)(state, action.clientIds);
    }

    return state;
  },
  order: function order() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'RESET_BLOCKS':
        return mapBlockOrder(action.blocks);

      case 'RECEIVE_BLOCKS':
        return (0, _objectSpread13.default)({}, state, (0, _lodash.omit)(mapBlockOrder(action.blocks), ''));

      case 'INSERT_BLOCKS':
        {
          var _action$rootClientId = action.rootClientId,
              rootClientId = _action$rootClientId === void 0 ? '' : _action$rootClientId;
          var subState = state[rootClientId] || [];
          var mappedBlocks = mapBlockOrder(action.blocks, rootClientId);
          var _action$index = action.index,
              index = _action$index === void 0 ? subState.length : _action$index;
          return (0, _objectSpread13.default)({}, state, mappedBlocks, (0, _defineProperty2.default)({}, rootClientId, (0, _array.insertAt)(subState, mappedBlocks[rootClientId], index)));
        }

      case 'MOVE_BLOCK_TO_POSITION':
        {
          var _objectSpread7;

          var _action$fromRootClien = action.fromRootClientId,
              fromRootClientId = _action$fromRootClien === void 0 ? '' : _action$fromRootClien,
              _action$toRootClientI = action.toRootClientId,
              toRootClientId = _action$toRootClientI === void 0 ? '' : _action$toRootClientI,
              clientId = action.clientId;

          var _action$index2 = action.index,
              _index = _action$index2 === void 0 ? state[toRootClientId].length : _action$index2; // Moving inside the same parent block


          if (fromRootClientId === toRootClientId) {
            var _subState = state[toRootClientId];

            var fromIndex = _subState.indexOf(clientId);

            return (0, _objectSpread13.default)({}, state, (0, _defineProperty2.default)({}, toRootClientId, (0, _array.moveTo)(state[toRootClientId], fromIndex, _index)));
          } // Moving from a parent block to another


          return (0, _objectSpread13.default)({}, state, (_objectSpread7 = {}, (0, _defineProperty2.default)(_objectSpread7, fromRootClientId, (0, _lodash.without)(state[fromRootClientId], clientId)), (0, _defineProperty2.default)(_objectSpread7, toRootClientId, (0, _array.insertAt)(state[toRootClientId], clientId, _index)), _objectSpread7));
        }

      case 'MOVE_BLOCKS_UP':
        {
          var clientIds = action.clientIds,
              _action$rootClientId2 = action.rootClientId,
              _rootClientId = _action$rootClientId2 === void 0 ? '' : _action$rootClientId2;

          var firstClientId = (0, _lodash.first)(clientIds);
          var _subState2 = state[_rootClientId];

          if (!_subState2.length || firstClientId === (0, _lodash.first)(_subState2)) {
            return state;
          }

          var firstIndex = _subState2.indexOf(firstClientId);

          return (0, _objectSpread13.default)({}, state, (0, _defineProperty2.default)({}, _rootClientId, (0, _array.moveTo)(_subState2, firstIndex, firstIndex - 1, clientIds.length)));
        }

      case 'MOVE_BLOCKS_DOWN':
        {
          var _clientIds = action.clientIds,
              _action$rootClientId3 = action.rootClientId,
              _rootClientId2 = _action$rootClientId3 === void 0 ? '' : _action$rootClientId3;

          var _firstClientId = (0, _lodash.first)(_clientIds);

          var lastClientId = (0, _lodash.last)(_clientIds);
          var _subState3 = state[_rootClientId2];

          if (!_subState3.length || lastClientId === (0, _lodash.last)(_subState3)) {
            return state;
          }

          var _firstIndex = _subState3.indexOf(_firstClientId);

          return (0, _objectSpread13.default)({}, state, (0, _defineProperty2.default)({}, _rootClientId2, (0, _array.moveTo)(_subState3, _firstIndex, _firstIndex + 1, _clientIds.length)));
        }

      case 'REPLACE_BLOCKS':
        {
          var _clientIds2 = action.clientIds;

          if (!action.blocks) {
            return state;
          }

          var _mappedBlocks = mapBlockOrder(action.blocks);

          return (0, _lodash.flow)([function (nextState) {
            return (0, _lodash.omit)(nextState, _clientIds2);
          }, function (nextState) {
            return (0, _objectSpread13.default)({}, nextState, (0, _lodash.omit)(_mappedBlocks, ''));
          }, function (nextState) {
            return (0, _lodash.mapValues)(nextState, function (subState) {
              return (0, _lodash.reduce)(subState, function (result, clientId) {
                if (clientId === _clientIds2[0]) {
                  return [].concat((0, _toConsumableArray2.default)(result), (0, _toConsumableArray2.default)(_mappedBlocks['']));
                }

                if (_clientIds2.indexOf(clientId) === -1) {
                  result.push(clientId);
                }

                return result;
              }, []);
            });
          }])(state);
        }

      case 'REMOVE_BLOCKS':
        return (0, _lodash.flow)([// Remove inner block ordering for removed blocks
        function (nextState) {
          return (0, _lodash.omit)(nextState, action.clientIds);
        }, // Remove deleted blocks from other blocks' orderings
        function (nextState) {
          return (0, _lodash.mapValues)(nextState, function (subState) {
            return _lodash.without.apply(void 0, [subState].concat((0, _toConsumableArray2.default)(action.clientIds)));
          });
        }])(state);
    }

    return state;
  }
});
/**
 * Reducer returning typing state.
 *
 * @param {boolean} state  Current state.
 * @param {Object}  action Dispatched action.
 *
 * @return {boolean} Updated state.
 */

exports.blocks = blocks;

function isTyping() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'START_TYPING':
      return true;

    case 'STOP_TYPING':
      return false;
  }

  return state;
}
/**
 * Reducer returning whether the caret is within formatted text.
 *
 * @param {boolean} state  Current state.
 * @param {Object}  action Dispatched action.
 *
 * @return {boolean} Updated state.
 */


function isCaretWithinFormattedText() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ENTER_FORMATTED_TEXT':
      return true;

    case 'EXIT_FORMATTED_TEXT':
      return false;
  }

  return state;
}
/**
 * Reducer returning the block selection's state.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


function blockSelection() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    start: null,
    end: null,
    isMultiSelecting: false,
    isEnabled: true,
    initialPosition: null
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'CLEAR_SELECTED_BLOCK':
      if (state.start === null && state.end === null && !state.isMultiSelecting) {
        return state;
      }

      return (0, _objectSpread13.default)({}, state, {
        start: null,
        end: null,
        isMultiSelecting: false,
        initialPosition: null
      });

    case 'START_MULTI_SELECT':
      if (state.isMultiSelecting) {
        return state;
      }

      return (0, _objectSpread13.default)({}, state, {
        isMultiSelecting: true,
        initialPosition: null
      });

    case 'STOP_MULTI_SELECT':
      if (!state.isMultiSelecting) {
        return state;
      }

      return (0, _objectSpread13.default)({}, state, {
        isMultiSelecting: false,
        initialPosition: null
      });

    case 'MULTI_SELECT':
      return (0, _objectSpread13.default)({}, state, {
        start: action.start,
        end: action.end,
        initialPosition: null
      });

    case 'SELECT_BLOCK':
      if (action.clientId === state.start && action.clientId === state.end) {
        return state;
      }

      return (0, _objectSpread13.default)({}, state, {
        start: action.clientId,
        end: action.clientId,
        initialPosition: action.initialPosition
      });

    case 'REPLACE_INNER_BLOCKS': // REPLACE_INNER_BLOCKS and INSERT_BLOCKS should follow the same logic.

    case 'INSERT_BLOCKS':
      {
        if (action.updateSelection) {
          return (0, _objectSpread13.default)({}, state, {
            start: action.blocks[0].clientId,
            end: action.blocks[0].clientId,
            initialPosition: null,
            isMultiSelecting: false
          });
        }

        return state;
      }

    case 'REMOVE_BLOCKS':
      if (!action.clientIds || !action.clientIds.length || action.clientIds.indexOf(state.start) === -1) {
        return state;
      }

      return (0, _objectSpread13.default)({}, state, {
        start: null,
        end: null,
        initialPosition: null,
        isMultiSelecting: false
      });

    case 'REPLACE_BLOCKS':
      if (action.clientIds.indexOf(state.start) === -1) {
        return state;
      } // If there are replacement blocks, assign last block as the next
      // selected block, otherwise set to null.


      var lastBlock = (0, _lodash.last)(action.blocks);
      var nextSelectedBlockClientId = lastBlock ? lastBlock.clientId : null;

      if (nextSelectedBlockClientId === state.start && nextSelectedBlockClientId === state.end) {
        return state;
      }

      return (0, _objectSpread13.default)({}, state, {
        start: nextSelectedBlockClientId,
        end: nextSelectedBlockClientId,
        initialPosition: null,
        isMultiSelecting: false
      });

    case 'TOGGLE_SELECTION':
      return (0, _objectSpread13.default)({}, state, {
        isEnabled: action.isSelectionEnabled
      });
  }

  return state;
}

function blocksMode() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === 'TOGGLE_BLOCK_MODE') {
    var clientId = action.clientId;
    return (0, _objectSpread13.default)({}, state, (0, _defineProperty2.default)({}, clientId, state[clientId] && state[clientId] === 'html' ? 'visual' : 'html'));
  }

  return state;
}
/**
 * Reducer returning the block insertion point visibility, either null if there
 * is not an explicit insertion point assigned, or an object of its `index` and
 * `rootClientId`.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


function insertionPoint() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SHOW_INSERTION_POINT':
      var rootClientId = action.rootClientId,
          index = action.index;
      return {
        rootClientId: rootClientId,
        index: index
      };

    case 'HIDE_INSERTION_POINT':
      return null;
  }

  return state;
}
/**
 * Reducer returning whether the post blocks match the defined template or not.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {boolean} Updated state.
 */


function template() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isValid: true
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_TEMPLATE_VALIDITY':
      return (0, _objectSpread13.default)({}, state, {
        isValid: action.isValid
      });
  }

  return state;
}
/**
 * Reducer returning the editor setting.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


function settings() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaults.SETTINGS_DEFAULTS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return (0, _objectSpread13.default)({}, state, action.settings);
  }

  return state;
}
/**
 * Reducer returning the user preferences.
 *
 * @param {Object}  state                 Current state.
 * @param {Object}  action                Dispatched action.
 *
 * @return {string} Updated state.
 */


function preferences() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaults.PREFERENCES_DEFAULTS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'INSERT_BLOCKS':
    case 'REPLACE_BLOCKS':
      return action.blocks.reduce(function (prevState, block) {
        var id = block.name;
        var insert = {
          name: block.name
        };

        if ((0, _blocks.isReusableBlock)(block)) {
          insert.ref = block.attributes.ref;
          id += '/' + block.attributes.ref;
        }

        return (0, _objectSpread13.default)({}, prevState, {
          insertUsage: (0, _objectSpread13.default)({}, prevState.insertUsage, (0, _defineProperty2.default)({}, id, {
            time: action.time,
            count: prevState.insertUsage[id] ? prevState.insertUsage[id].count + 1 : 1,
            insert: insert
          }))
        });
      }, state);
  }

  return state;
}
/**
 * Reducer returning an object where each key is a block client ID, its value
 * representing the settings for its nested blocks.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */


var blockListSettings = function blockListSettings() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    // Even if the replaced blocks have the same client ID, our logic
    // should correct the state.
    case 'REPLACE_BLOCKS':
    case 'REMOVE_BLOCKS':
      {
        return (0, _lodash.omit)(state, action.clientIds);
      }

    case 'UPDATE_BLOCK_LIST_SETTINGS':
      {
        var clientId = action.clientId;

        if (!action.settings) {
          if (state.hasOwnProperty(clientId)) {
            return (0, _lodash.omit)(state, clientId);
          }

          return state;
        }

        if ((0, _lodash.isEqual)(state[clientId], action.settings)) {
          return state;
        }

        return (0, _objectSpread13.default)({}, state, (0, _defineProperty2.default)({}, clientId, action.settings));
      }
  }

  return state;
};

exports.blockListSettings = blockListSettings;

var _default = (0, _data.combineReducers)({
  blocks: blocks,
  isTyping: isTyping,
  isCaretWithinFormattedText: isCaretWithinFormattedText,
  blockSelection: blockSelection,
  blocksMode: blocksMode,
  blockListSettings: blockListSettings,
  insertionPoint: insertionPoint,
  template: template,
  settings: settings,
  preferences: preferences
});

exports.default = _default;
//# sourceMappingURL=reducer.js.map