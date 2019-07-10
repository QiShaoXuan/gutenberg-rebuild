import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

/**
 * External dependencies
 */
import { flow, reduce, first, last, omit, without, mapValues, keys, isEqual, isEmpty, get } from 'lodash';
/**
 * WordPress dependencies
 */

import { combineReducers } from '@wordpress/data';
import { isReusableBlock } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import { PREFERENCES_DEFAULTS, SETTINGS_DEFAULTS } from './defaults';
import { insertAt, moveTo } from './array';
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

  var result = _defineProperty({}, rootClientId, []);

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

  var stack = _toConsumableArray(blocks);

  while (stack.length) {
    var _stack$shift = stack.shift(),
        innerBlocks = _stack$shift.innerBlocks,
        block = _objectWithoutProperties(_stack$shift, ["innerBlocks"]);

    stack.push.apply(stack, _toConsumableArray(innerBlocks));
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
    return omit(block, 'attributes');
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
  return reduce(blocksOrder[rootClientId], function (result, clientId) {
    return [].concat(_toConsumableArray(result), [clientId], _toConsumableArray(getNestedBlockClientIds(blocksOrder, clientId)));
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
    return _objectSpread({}, original);
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


export function hasSameKeys(a, b) {
  return isEqual(keys(a), keys(b));
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

export function isUpdatingSameBlockAttribute(action, lastAction) {
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
      return _objectSpread({}, nextState, {
        isPersistentChange: get(state, ['isPersistentChange'], true)
      });
    } // Some state changes should not be considered persistent, namely those
    // which are not a direct result of user interaction.


    var isIgnoredActionType = IGNORED_ACTION_TYPES.has(action.type);

    if (isIgnoredActionType) {
      return _objectSpread({}, nextState, {
        isPersistentChange: false
      });
    }

    nextState = _objectSpread({}, nextState, {
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
      var clientIds = _toConsumableArray(action.clientIds); // For each removed client ID, include its inner blocks to remove,
      // recursing into those so long as inner blocks exist.


      for (var i = 0; i < clientIds.length; i++) {
        clientIds.push.apply(clientIds, _toConsumableArray(state.order[clientIds[i]]));
      }

      action = _objectSpread({}, action, {
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
      return _objectSpread({}, state, {
        byClientId: _objectSpread({}, omit(state.byClientId, visibleClientIds), getFlattenedBlocksWithoutAttributes(action.blocks)),
        attributes: _objectSpread({}, omit(state.attributes, visibleClientIds), getFlattenedBlockAttributes(action.blocks)),
        order: _objectSpread({}, omit(state.order, visibleClientIds), mapBlockOrder(action.blocks))
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
      stateAfterInsert = reducer(stateAfterInsert, _objectSpread({}, action, {
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

      state = _objectSpread({}, state);
      state.attributes = mapValues(state.attributes, function (attributes, clientId) {
        var name = state.byClientId[clientId].name;

        if (name === 'core/block' && attributes.ref === id) {
          return _objectSpread({}, attributes, {
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


export var blocks = flow(combineReducers, withInnerBlocksRemoveCascade, withReplaceInnerBlocks, // needs to be after withInnerBlocksRemoveCascade
withBlockReset, withSaveReusableBlock, withPersistentBlockChange)({
  byClientId: function byClientId() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'RESET_BLOCKS':
        return getFlattenedBlocksWithoutAttributes(action.blocks);

      case 'RECEIVE_BLOCKS':
        return _objectSpread({}, state, getFlattenedBlocksWithoutAttributes(action.blocks));

      case 'UPDATE_BLOCK':
        // Ignore updates if block isn't known
        if (!state[action.clientId]) {
          return state;
        } // Do nothing if only attributes change.


        var changes = omit(action.updates, 'attributes');

        if (isEmpty(changes)) {
          return state;
        }

        return _objectSpread({}, state, _defineProperty({}, action.clientId, _objectSpread({}, state[action.clientId], changes)));

      case 'INSERT_BLOCKS':
        return _objectSpread({}, state, getFlattenedBlocksWithoutAttributes(action.blocks));

      case 'REPLACE_BLOCKS':
        if (!action.blocks) {
          return state;
        }

        return _objectSpread({}, omit(state, action.clientIds), getFlattenedBlocksWithoutAttributes(action.blocks));

      case 'REMOVE_BLOCKS':
        return omit(state, action.clientIds);
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
        return _objectSpread({}, state, getFlattenedBlockAttributes(action.blocks));

      case 'UPDATE_BLOCK':
        // Ignore updates if block isn't known or there are no attribute changes.
        if (!state[action.clientId] || !action.updates.attributes) {
          return state;
        }

        return _objectSpread({}, state, _defineProperty({}, action.clientId, _objectSpread({}, state[action.clientId], action.updates.attributes)));

      case 'UPDATE_BLOCK_ATTRIBUTES':
        // Ignore updates if block isn't known
        if (!state[action.clientId]) {
          return state;
        } // Consider as updates only changed values


        var nextAttributes = reduce(action.attributes, function (result, value, key) {
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


        return _objectSpread({}, state, _defineProperty({}, action.clientId, nextAttributes));

      case 'INSERT_BLOCKS':
        return _objectSpread({}, state, getFlattenedBlockAttributes(action.blocks));

      case 'REPLACE_BLOCKS':
        if (!action.blocks) {
          return state;
        }

        return _objectSpread({}, omit(state, action.clientIds), getFlattenedBlockAttributes(action.blocks));

      case 'REMOVE_BLOCKS':
        return omit(state, action.clientIds);
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
        return _objectSpread({}, state, omit(mapBlockOrder(action.blocks), ''));

      case 'INSERT_BLOCKS':
        {
          var _action$rootClientId = action.rootClientId,
              rootClientId = _action$rootClientId === void 0 ? '' : _action$rootClientId;
          var subState = state[rootClientId] || [];
          var mappedBlocks = mapBlockOrder(action.blocks, rootClientId);
          var _action$index = action.index,
              index = _action$index === void 0 ? subState.length : _action$index;
          return _objectSpread({}, state, mappedBlocks, _defineProperty({}, rootClientId, insertAt(subState, mappedBlocks[rootClientId], index)));
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

            return _objectSpread({}, state, _defineProperty({}, toRootClientId, moveTo(state[toRootClientId], fromIndex, _index)));
          } // Moving from a parent block to another


          return _objectSpread({}, state, (_objectSpread7 = {}, _defineProperty(_objectSpread7, fromRootClientId, without(state[fromRootClientId], clientId)), _defineProperty(_objectSpread7, toRootClientId, insertAt(state[toRootClientId], clientId, _index)), _objectSpread7));
        }

      case 'MOVE_BLOCKS_UP':
        {
          var clientIds = action.clientIds,
              _action$rootClientId2 = action.rootClientId,
              _rootClientId = _action$rootClientId2 === void 0 ? '' : _action$rootClientId2;

          var firstClientId = first(clientIds);
          var _subState2 = state[_rootClientId];

          if (!_subState2.length || firstClientId === first(_subState2)) {
            return state;
          }

          var firstIndex = _subState2.indexOf(firstClientId);

          return _objectSpread({}, state, _defineProperty({}, _rootClientId, moveTo(_subState2, firstIndex, firstIndex - 1, clientIds.length)));
        }

      case 'MOVE_BLOCKS_DOWN':
        {
          var _clientIds = action.clientIds,
              _action$rootClientId3 = action.rootClientId,
              _rootClientId2 = _action$rootClientId3 === void 0 ? '' : _action$rootClientId3;

          var _firstClientId = first(_clientIds);

          var lastClientId = last(_clientIds);
          var _subState3 = state[_rootClientId2];

          if (!_subState3.length || lastClientId === last(_subState3)) {
            return state;
          }

          var _firstIndex = _subState3.indexOf(_firstClientId);

          return _objectSpread({}, state, _defineProperty({}, _rootClientId2, moveTo(_subState3, _firstIndex, _firstIndex + 1, _clientIds.length)));
        }

      case 'REPLACE_BLOCKS':
        {
          var _clientIds2 = action.clientIds;

          if (!action.blocks) {
            return state;
          }

          var _mappedBlocks = mapBlockOrder(action.blocks);

          return flow([function (nextState) {
            return omit(nextState, _clientIds2);
          }, function (nextState) {
            return _objectSpread({}, nextState, omit(_mappedBlocks, ''));
          }, function (nextState) {
            return mapValues(nextState, function (subState) {
              return reduce(subState, function (result, clientId) {
                if (clientId === _clientIds2[0]) {
                  return [].concat(_toConsumableArray(result), _toConsumableArray(_mappedBlocks['']));
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
        return flow([// Remove inner block ordering for removed blocks
        function (nextState) {
          return omit(nextState, action.clientIds);
        }, // Remove deleted blocks from other blocks' orderings
        function (nextState) {
          return mapValues(nextState, function (subState) {
            return without.apply(void 0, [subState].concat(_toConsumableArray(action.clientIds)));
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

export function isTyping() {
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

export function isCaretWithinFormattedText() {
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

export function blockSelection() {
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

      return _objectSpread({}, state, {
        start: null,
        end: null,
        isMultiSelecting: false,
        initialPosition: null
      });

    case 'START_MULTI_SELECT':
      if (state.isMultiSelecting) {
        return state;
      }

      return _objectSpread({}, state, {
        isMultiSelecting: true,
        initialPosition: null
      });

    case 'STOP_MULTI_SELECT':
      if (!state.isMultiSelecting) {
        return state;
      }

      return _objectSpread({}, state, {
        isMultiSelecting: false,
        initialPosition: null
      });

    case 'MULTI_SELECT':
      return _objectSpread({}, state, {
        start: action.start,
        end: action.end,
        initialPosition: null
      });

    case 'SELECT_BLOCK':
      if (action.clientId === state.start && action.clientId === state.end) {
        return state;
      }

      return _objectSpread({}, state, {
        start: action.clientId,
        end: action.clientId,
        initialPosition: action.initialPosition
      });

    case 'REPLACE_INNER_BLOCKS': // REPLACE_INNER_BLOCKS and INSERT_BLOCKS should follow the same logic.

    case 'INSERT_BLOCKS':
      {
        if (action.updateSelection) {
          return _objectSpread({}, state, {
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

      return _objectSpread({}, state, {
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


      var lastBlock = last(action.blocks);
      var nextSelectedBlockClientId = lastBlock ? lastBlock.clientId : null;

      if (nextSelectedBlockClientId === state.start && nextSelectedBlockClientId === state.end) {
        return state;
      }

      return _objectSpread({}, state, {
        start: nextSelectedBlockClientId,
        end: nextSelectedBlockClientId,
        initialPosition: null,
        isMultiSelecting: false
      });

    case 'TOGGLE_SELECTION':
      return _objectSpread({}, state, {
        isEnabled: action.isSelectionEnabled
      });
  }

  return state;
}
export function blocksMode() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === 'TOGGLE_BLOCK_MODE') {
    var clientId = action.clientId;
    return _objectSpread({}, state, _defineProperty({}, clientId, state[clientId] && state[clientId] === 'html' ? 'visual' : 'html'));
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

export function insertionPoint() {
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

export function template() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isValid: true
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_TEMPLATE_VALIDITY':
      return _objectSpread({}, state, {
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

export function settings() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SETTINGS_DEFAULTS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_SETTINGS':
      return _objectSpread({}, state, action.settings);
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

export function preferences() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PREFERENCES_DEFAULTS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'INSERT_BLOCKS':
    case 'REPLACE_BLOCKS':
      return action.blocks.reduce(function (prevState, block) {
        var id = block.name;
        var insert = {
          name: block.name
        };

        if (isReusableBlock(block)) {
          insert.ref = block.attributes.ref;
          id += '/' + block.attributes.ref;
        }

        return _objectSpread({}, prevState, {
          insertUsage: _objectSpread({}, prevState.insertUsage, _defineProperty({}, id, {
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

export var blockListSettings = function blockListSettings() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    // Even if the replaced blocks have the same client ID, our logic
    // should correct the state.
    case 'REPLACE_BLOCKS':
    case 'REMOVE_BLOCKS':
      {
        return omit(state, action.clientIds);
      }

    case 'UPDATE_BLOCK_LIST_SETTINGS':
      {
        var clientId = action.clientId;

        if (!action.settings) {
          if (state.hasOwnProperty(clientId)) {
            return omit(state, clientId);
          }

          return state;
        }

        if (isEqual(state[clientId], action.settings)) {
          return state;
        }

        return _objectSpread({}, state, _defineProperty({}, clientId, action.settings));
      }
  }

  return state;
};
export default combineReducers({
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
//# sourceMappingURL=reducer.js.map