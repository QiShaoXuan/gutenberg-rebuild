import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _typeof from "@babel/runtime/helpers/esm/typeof";

/**
 * External dependencies
 */
import optimist from 'redux-optimist';
import { flow, reduce, omit, mapValues, keys, isEqual, last } from 'lodash';
/**
 * WordPress dependencies
 */

import { combineReducers } from '@wordpress/data';
import { addQueryArgs } from '@wordpress/url';
/**
 * Internal dependencies
 */

import { PREFERENCES_DEFAULTS, INITIAL_EDITS_DEFAULTS, EDITOR_SETTINGS_DEFAULTS } from './defaults';
import { EDIT_MERGE_PROPERTIES } from './constants';
import withChangeDetection from '../utils/with-change-detection';
import withHistory from '../utils/with-history';
/**
 * Returns a post attribute value, flattening nested rendered content using its
 * raw value in place of its original object form.
 *
 * @param {*} value Original value.
 *
 * @return {*} Raw value.
 */

export function getPostRawValue(value) {
  if (value && 'object' === _typeof(value) && 'raw' in value) {
    return value.raw;
  }

  return value;
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
 * dispatched action, the two actions are editing the same post property, or
 * false otherwise.
 *
 * @param {Object} action         Currently dispatching action.
 * @param {Object} previousAction Previously dispatched action.
 *
 * @return {boolean} Whether actions are updating the same post property.
 */

export function isUpdatingSamePostProperty(action, previousAction) {
  return action.type === 'EDIT_POST' && hasSameKeys(action.edits, previousAction.edits);
}
/**
 * Returns true if, given the currently dispatching action and the previously
 * dispatched action, the two actions are modifying the same property such that
 * undo history should be batched.
 *
 * @param {Object} action         Currently dispatching action.
 * @param {Object} previousAction Previously dispatched action.
 *
 * @return {boolean} Whether to overwrite present state.
 */

export function shouldOverwriteState(action, previousAction) {
  if (action.type === 'RESET_EDITOR_BLOCKS') {
    return !action.shouldCreateUndoLevel;
  }

  if (!previousAction || action.type !== previousAction.type) {
    return false;
  }

  return isUpdatingSamePostProperty(action, previousAction);
}
/**
 * Undoable reducer returning the editor post state, including blocks parsed
 * from current HTML markup.
 *
 * Handles the following state keys:
 *  - edits: an object describing changes to be made to the current post, in
 *           the format accepted by the WP REST API
 *  - blocks: post content blocks
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @returns {Object} Updated state.
 */

export var editor = flow([combineReducers, withHistory({
  resetTypes: ['SETUP_EDITOR_STATE'],
  ignoreTypes: ['RESET_POST', 'UPDATE_POST'],
  shouldOverwriteState: shouldOverwriteState
})])({
  // Track whether changes exist, resetting at each post save. Relies on
  // editor initialization firing post reset as an effect.
  blocks: withChangeDetection({
    resetTypes: ['SETUP_EDITOR_STATE', 'REQUEST_POST_UPDATE_START']
  })(function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      value: []
    };
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'RESET_EDITOR_BLOCKS':
        if (action.blocks === state.value) {
          return state;
        }

        return {
          value: action.blocks
        };
    }

    return state;
  }),
  edits: function edits() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'EDIT_POST':
        return reduce(action.edits, function (result, value, key) {
          // Only assign into result if not already same value
          if (value !== state[key]) {
            result = getMutateSafeObject(state, result);

            if (EDIT_MERGE_PROPERTIES.has(key)) {
              // Merge properties should assign to current value.
              result[key] = _objectSpread({}, result[key], value);
            } else {
              // Otherwise override.
              result[key] = value;
            }
          }

          return result;
        }, state);

      case 'UPDATE_POST':
      case 'RESET_POST':
        var getCanonicalValue = action.type === 'UPDATE_POST' ? function (key) {
          return action.edits[key];
        } : function (key) {
          return getPostRawValue(action.post[key]);
        };
        return reduce(state, function (result, value, key) {
          if (!isEqual(value, getCanonicalValue(key))) {
            return result;
          }

          result = getMutateSafeObject(state, result);
          delete result[key];
          return result;
        }, state);

      case 'RESET_EDITOR_BLOCKS':
        if ('content' in state) {
          return omit(state, 'content');
        }

        return state;
    }

    return state;
  }
});
/**
 * Reducer returning the initial edits state. With matching shape to that of
 * `editor.edits`, the initial edits are those applied programmatically, are
 * not considered in prompting the user for unsaved changes, and are included
 * in (and reset by) the next save payload.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Action object.
 *
 * @return {Object} Next state.
 */

export function initialEdits() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_EDITS_DEFAULTS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SETUP_EDITOR':
      if (!action.edits) {
        break;
      }

      return action.edits;

    case 'SETUP_EDITOR_STATE':
      if ('content' in state) {
        return omit(state, 'content');
      }

      return state;

    case 'UPDATE_POST':
      return reduce(action.edits, function (result, value, key) {
        if (!result.hasOwnProperty(key)) {
          return result;
        }

        result = getMutateSafeObject(state, result);
        delete result[key];
        return result;
      }, state);

    case 'RESET_POST':
      return INITIAL_EDITS_DEFAULTS;
  }

  return state;
}
/**
 * Reducer returning the last-known state of the current post, in the format
 * returned by the WP REST API.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function currentPost() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SETUP_EDITOR_STATE':
    case 'RESET_POST':
    case 'UPDATE_POST':
      var post;

      if (action.post) {
        post = action.post;
      } else if (action.edits) {
        post = _objectSpread({}, state, action.edits);
      } else {
        return state;
      }

      return mapValues(post, getPostRawValue);
  }

  return state;
}
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
    case 'ENABLE_PUBLISH_SIDEBAR':
      return _objectSpread({}, state, {
        isPublishSidebarEnabled: true
      });

    case 'DISABLE_PUBLISH_SIDEBAR':
      return _objectSpread({}, state, {
        isPublishSidebarEnabled: false
      });
  }

  return state;
}
/**
 * Reducer returning current network request state (whether a request to
 * the WP REST API is in progress, successful, or failed).
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function saving() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'REQUEST_POST_UPDATE_START':
      return {
        requesting: true,
        successful: false,
        error: null,
        options: action.options || {}
      };

    case 'REQUEST_POST_UPDATE_SUCCESS':
      return {
        requesting: false,
        successful: true,
        error: null,
        options: action.options || {}
      };

    case 'REQUEST_POST_UPDATE_FAILURE':
      return {
        requesting: false,
        successful: false,
        error: action.error,
        options: action.options || {}
      };
  }

  return state;
}
/**
 * Post Lock State.
 *
 * @typedef {Object} PostLockState
 *
 * @property {boolean} isLocked       Whether the post is locked.
 * @property {?boolean} isTakeover     Whether the post editing has been taken over.
 * @property {?boolean} activePostLock Active post lock value.
 * @property {?Object}  user           User that took over the post.
 */

/**
 * Reducer returning the post lock status.
 *
 * @param {PostLockState} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {PostLockState} Updated state.
 */

export function postLock() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isLocked: false
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_POST_LOCK':
      return action.lock;
  }

  return state;
}
/**
 * Post saving lock.
 *
 * When post saving is locked, the post cannot be published or updated.
 *
 * @param {PostSavingLockState} state  Current state.
 * @param {Object}              action Dispatched action.
 *
 * @return {PostLockState} Updated state.
 */

export function postSavingLock() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'LOCK_POST_SAVING':
      return _objectSpread({}, state, _defineProperty({}, action.lockName, true));

    case 'UNLOCK_POST_SAVING':
      return omit(state, action.lockName);
  }

  return state;
}
export var reusableBlocks = combineReducers({
  data: function data() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'RECEIVE_REUSABLE_BLOCKS':
        {
          return reduce(action.results, function (nextState, result) {
            var _result$reusableBlock = result.reusableBlock,
                id = _result$reusableBlock.id,
                title = _result$reusableBlock.title;
            var clientId = result.parsedBlock.clientId;
            var value = {
              clientId: clientId,
              title: title
            };

            if (!isEqual(nextState[id], value)) {
              nextState = getMutateSafeObject(state, nextState);
              nextState[id] = value;
            }

            return nextState;
          }, state);
        }

      case 'UPDATE_REUSABLE_BLOCK_TITLE':
        {
          var id = action.id,
              title = action.title;

          if (!state[id] || state[id].title === title) {
            return state;
          }

          return _objectSpread({}, state, _defineProperty({}, id, _objectSpread({}, state[id], {
            title: title
          })));
        }

      case 'SAVE_REUSABLE_BLOCK_SUCCESS':
        {
          var _id = action.id,
              updatedId = action.updatedId; // If a temporary reusable block is saved, we swap the temporary id with the final one

          if (_id === updatedId) {
            return state;
          }

          var value = state[_id];
          return _objectSpread({}, omit(state, _id), _defineProperty({}, updatedId, value));
        }

      case 'REMOVE_REUSABLE_BLOCK':
        {
          var _id2 = action.id;
          return omit(state, _id2);
        }
    }

    return state;
  },
  isFetching: function isFetching() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'FETCH_REUSABLE_BLOCKS':
        {
          var id = action.id;

          if (!id) {
            return state;
          }

          return _objectSpread({}, state, _defineProperty({}, id, true));
        }

      case 'FETCH_REUSABLE_BLOCKS_SUCCESS':
      case 'FETCH_REUSABLE_BLOCKS_FAILURE':
        {
          var _id3 = action.id;
          return omit(state, _id3);
        }
    }

    return state;
  },
  isSaving: function isSaving() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'SAVE_REUSABLE_BLOCK':
        return _objectSpread({}, state, _defineProperty({}, action.id, true));

      case 'SAVE_REUSABLE_BLOCK_SUCCESS':
      case 'SAVE_REUSABLE_BLOCK_FAILURE':
        {
          var id = action.id;
          return omit(state, id);
        }
    }

    return state;
  }
});
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
/**
 * Reducer returning the most recent autosave.
 *
 * @param  {Object} state  The autosave object.
 * @param  {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function autosave() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RESET_AUTOSAVE':
      var post = action.post;

      var _map = ['title', 'excerpt', 'content'].map(function (field) {
        return getPostRawValue(post[field]);
      }),
          _map2 = _slicedToArray(_map, 3),
          title = _map2[0],
          excerpt = _map2[1],
          content = _map2[2];

      return {
        title: title,
        excerpt: excerpt,
        content: content
      };
  }

  return state;
}
/**
 * Reducer returning the post preview link.
 *
 * @param {string?} state  The preview link
 * @param {Object}  action Dispatched action.
 *
 * @return {string?} Updated state.
 */

export function previewLink() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'REQUEST_POST_UPDATE_SUCCESS':
      if (action.post.preview_link) {
        return action.post.preview_link;
      } else if (action.post.link) {
        return addQueryArgs(action.post.link, {
          preview: true
        });
      }

      return state;

    case 'REQUEST_POST_UPDATE_START':
      // Invalidate known preview link when autosave starts.
      if (state && action.options.isPreview) {
        return null;
      }

      break;
  }

  return state;
}
/**
 * Reducer returning whether the editor is ready to be rendered.
 * The editor is considered ready to be rendered once
 * the post object is loaded properly and the initial blocks parsed.
 *
 * @param {boolean} state
 * @param {Object} action
 *
 * @return {boolean} Updated state.
 */

export function isReady() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SETUP_EDITOR_STATE':
      return true;
  }

  return state;
}
/**
 * Reducer returning the post editor setting.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function editorSettings() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : EDITOR_SETTINGS_DEFAULTS;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'UPDATE_EDITOR_SETTINGS':
      return _objectSpread({}, state, action.settings);
  }

  return state;
}
export default optimist(combineReducers({
  editor: editor,
  initialEdits: initialEdits,
  currentPost: currentPost,
  preferences: preferences,
  saving: saving,
  postLock: postLock,
  reusableBlocks: reusableBlocks,
  template: template,
  autosave: autosave,
  previewLink: previewLink,
  postSavingLock: postSavingLock,
  isReady: isReady,
  editorSettings: editorSettings
}));
//# sourceMappingURL=reducer.js.map