import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _regeneratorRuntime from "@babel/runtime/regenerator";

var _marked =
/*#__PURE__*/
_regeneratorRuntime.mark(setupEditor),
    _marked2 =
/*#__PURE__*/
_regeneratorRuntime.mark(savePost),
    _marked3 =
/*#__PURE__*/
_regeneratorRuntime.mark(refreshPost),
    _marked4 =
/*#__PURE__*/
_regeneratorRuntime.mark(trashPost),
    _marked5 =
/*#__PURE__*/
_regeneratorRuntime.mark(autosave);

/**
 * External dependencies
 */
import { castArray, pick, has } from 'lodash';
import { BEGIN, COMMIT, REVERT } from 'redux-optimist';
/**
 * Internal dependencies
 */

import { dispatch, select, resolveSelect, apiFetch } from './controls';
import { STORE_KEY, POST_UPDATE_TRANSACTION_ID, SAVE_POST_NOTICE_ID, TRASH_POST_NOTICE_ID } from './constants';
import { getNotificationArgumentsForSaveSuccess, getNotificationArgumentsForSaveFail, getNotificationArgumentsForTrashFail } from './utils/notice-builder';
/**
 * WordPress dependencies
 */

import { parse, synchronizeBlocksWithTemplate } from '@wordpress/blocks';
/**
 * Returns an action generator used in signalling that editor has initialized with
 * the specified post object and editor settings.
 *
 * @param {Object} post      Post object.
 * @param {Object} edits     Initial edited attributes object.
 * @param {Array?} template  Block Template.
 */

export function setupEditor(post, edits, template) {
  var content, blocks, isNewPost;
  return _regeneratorRuntime.wrap(function setupEditor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return {
            type: 'SETUP_EDITOR',
            post: post,
            edits: edits,
            template: template
          };

        case 2:
          if (has(edits, ['content'])) {
            content = edits.content;
          } else {
            content = post.content.raw;
          }

          blocks = parse(content); // Apply a template for new posts only, if exists.

          isNewPost = post.status === 'auto-draft';

          if (isNewPost && template) {
            blocks = synchronizeBlocksWithTemplate(blocks, template);
          }

          _context.next = 8;
          return resetEditorBlocks(blocks);

        case 8:
          _context.next = 10;
          return setupEditorState(post);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}
/**
 * Returns an action object used in signalling that the latest version of the
 * post has been received, either by initialization or save.
 *
 * @param {Object} post Post object.
 *
 * @return {Object} Action object.
 */

export function resetPost(post) {
  return {
    type: 'RESET_POST',
    post: post
  };
}
/**
 * Returns an action object used in signalling that the latest autosave of the
 * post has been received, by initialization or autosave.
 *
 * @param {Object} post Autosave post object.
 *
 * @return {Object} Action object.
 */

export function resetAutosave(post) {
  return {
    type: 'RESET_AUTOSAVE',
    post: post
  };
}
/**
 * Optimistic action for dispatching that a post update request has started.
 *
 * @param {Object} options
 *
 * @return {Object} An action object
 */

export function __experimentalRequestPostUpdateStart() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: 'REQUEST_POST_UPDATE_START',
    optimist: {
      type: BEGIN,
      id: POST_UPDATE_TRANSACTION_ID
    },
    options: options
  };
}
/**
 * Optimistic action for indicating that the request post update has completed
 * successfully.
 *
 * @param {Object}  data                The data for the action.
 * @param {Object}  data.previousPost   The previous post prior to update.
 * @param {Object}  data.post           The new post after update
 * @param {boolean} data.isRevision     Whether the post is a revision or not.
 * @param {Object}  data.options        Options passed through from the original
 *                                      action dispatch.
 * @param {Object}  data.postType       The post type object.
 *
 * @return {Object}	Action object.
 */

export function __experimentalRequestPostUpdateSuccess(_ref) {
  var previousPost = _ref.previousPost,
      post = _ref.post,
      isRevision = _ref.isRevision,
      options = _ref.options,
      postType = _ref.postType;
  return {
    type: 'REQUEST_POST_UPDATE_SUCCESS',
    previousPost: previousPost,
    post: post,
    optimist: {
      // Note: REVERT is not a failure case here. Rather, it
      // is simply reversing the assumption that the updates
      // were applied to the post proper, such that the post
      // treated as having unsaved changes.
      type: isRevision ? REVERT : COMMIT,
      id: POST_UPDATE_TRANSACTION_ID
    },
    options: options,
    postType: postType
  };
}
/**
 * Optimistic action for indicating that the request post update has completed
 * with a failure.
 *
 * @param {Object}  data          The data for the action
 * @param {Object}  data.post     The post that failed updating.
 * @param {Object}  data.edits    The fields that were being updated.
 * @param {*}       data.error    The error from the failed call.
 * @param {Object}  data.options  Options passed through from the original
 *                                action dispatch.
 * @return {Object} An action object
 */

export function __experimentalRequestPostUpdateFailure(_ref2) {
  var post = _ref2.post,
      edits = _ref2.edits,
      error = _ref2.error,
      options = _ref2.options;
  return {
    type: 'REQUEST_POST_UPDATE_FAILURE',
    optimist: {
      type: REVERT,
      id: POST_UPDATE_TRANSACTION_ID
    },
    post: post,
    edits: edits,
    error: error,
    options: options
  };
}
/**
 * Returns an action object used in signalling that a patch of updates for the
 * latest version of the post have been received.
 *
 * @param {Object} edits Updated post fields.
 *
 * @return {Object} Action object.
 */

export function updatePost(edits) {
  return {
    type: 'UPDATE_POST',
    edits: edits
  };
}
/**
 * Returns an action object used to setup the editor state when first opening
 * an editor.
 *
 * @param {Object} post   Post object.
 *
 * @return {Object} Action object.
 */

export function setupEditorState(post) {
  return {
    type: 'SETUP_EDITOR_STATE',
    post: post
  };
}
/**
 * Returns an action object used in signalling that attributes of the post have
 * been edited.
 *
 * @param {Object} edits Post attributes to edit.
 *
 * @return {Object} Action object.
 */

export function editPost(edits) {
  return {
    type: 'EDIT_POST',
    edits: edits
  };
}
/**
 * Returns action object produced by the updatePost creator augmented by
 * an optimist option that signals optimistically applying updates.
 *
 * @param {Object} edits  Updated post fields.
 *
 * @return {Object} Action object.
 */

export function __experimentalOptimisticUpdatePost(edits) {
  return _objectSpread({}, updatePost(edits), {
    optimist: {
      id: POST_UPDATE_TRANSACTION_ID
    }
  });
}
/**
 * Action generator for saving the current post in the editor.
 *
 * @param {Object} options
 */

export function savePost() {
  var options,
      isEditedPostSaveable,
      edits,
      isAutosave,
      isEditedPostNew,
      post,
      editedPostContent,
      toSend,
      currentPostType,
      postType,
      path,
      method,
      autoSavePost,
      newPost,
      resetAction,
      notifySuccessArgs,
      notifyFailArgs,
      _args2 = arguments;
  return _regeneratorRuntime.wrap(function savePost$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          _context2.next = 3;
          return select(STORE_KEY, 'isEditedPostSaveable');

        case 3:
          isEditedPostSaveable = _context2.sent;

          if (isEditedPostSaveable) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return");

        case 6:
          _context2.next = 8;
          return select(STORE_KEY, 'getPostEdits');

        case 8:
          edits = _context2.sent;
          isAutosave = !!options.isAutosave;

          if (isAutosave) {
            edits = pick(edits, ['title', 'content', 'excerpt']);
          }

          _context2.next = 13;
          return select(STORE_KEY, 'isEditedPostNew');

        case 13:
          isEditedPostNew = _context2.sent;

          // New posts (with auto-draft status) must be explicitly assigned draft
          // status if there is not already a status assigned in edits (publish).
          // Otherwise, they are wrongly left as auto-draft. Status is not always
          // respected for autosaves, so it cannot simply be included in the pick
          // above. This behavior relies on an assumption that an auto-draft post
          // would never be saved by anyone other than the owner of the post, per
          // logic within autosaves REST controller to save status field only for
          // draft/auto-draft by current user.
          //
          // See: https://core.trac.wordpress.org/ticket/43316#comment:88
          // See: https://core.trac.wordpress.org/ticket/43316#comment:89
          if (isEditedPostNew) {
            edits = _objectSpread({
              status: 'draft'
            }, edits);
          }

          _context2.next = 17;
          return select(STORE_KEY, 'getCurrentPost');

        case 17:
          post = _context2.sent;
          _context2.next = 20;
          return select(STORE_KEY, 'getEditedPostContent');

        case 20:
          editedPostContent = _context2.sent;
          toSend = _objectSpread({}, edits, {
            content: editedPostContent,
            id: post.id
          });
          _context2.next = 24;
          return select(STORE_KEY, 'getCurrentPostType');

        case 24:
          currentPostType = _context2.sent;
          _context2.next = 27;
          return resolveSelect('core', 'getPostType', currentPostType);

        case 27:
          postType = _context2.sent;
          _context2.next = 30;
          return dispatch(STORE_KEY, '__experimentalRequestPostUpdateStart', options);

        case 30:
          _context2.next = 32;
          return dispatch(STORE_KEY, '__experimentalOptimisticUpdatePost', toSend);

        case 32:
          path = "/wp/v2/".concat(postType.rest_base, "/").concat(post.id);
          method = 'PUT';

          if (!isAutosave) {
            _context2.next = 43;
            break;
          }

          _context2.next = 37;
          return select(STORE_KEY, 'getAutosave');

        case 37:
          autoSavePost = _context2.sent;
          // Ensure autosaves contain all expected fields, using autosave or
          // post values as fallback if not otherwise included in edits.
          toSend = _objectSpread({}, pick(post, ['title', 'content', 'excerpt']), autoSavePost, toSend);
          path += '/autosaves';
          method = 'POST';
          _context2.next = 47;
          break;

        case 43:
          _context2.next = 45;
          return dispatch('core/notices', 'removeNotice', SAVE_POST_NOTICE_ID);

        case 45:
          _context2.next = 47;
          return dispatch('core/notices', 'removeNotice', 'autosave-exists');

        case 47:
          _context2.prev = 47;
          _context2.next = 50;
          return apiFetch({
            path: path,
            method: method,
            data: toSend
          });

        case 50:
          newPost = _context2.sent;
          resetAction = isAutosave ? 'resetAutosave' : 'resetPost';
          _context2.next = 54;
          return dispatch(STORE_KEY, resetAction, newPost);

        case 54:
          _context2.next = 56;
          return dispatch(STORE_KEY, '__experimentalRequestPostUpdateSuccess', {
            previousPost: post,
            post: newPost,
            options: options,
            postType: postType,
            // An autosave may be processed by the server as a regular save
            // when its update is requested by the author and the post was
            // draft or auto-draft.
            isRevision: newPost.id !== post.id
          });

        case 56:
          notifySuccessArgs = getNotificationArgumentsForSaveSuccess({
            previousPost: post,
            post: newPost,
            postType: postType,
            options: options
          });

          if (!(notifySuccessArgs.length > 0)) {
            _context2.next = 60;
            break;
          }

          _context2.next = 60;
          return dispatch.apply(void 0, ['core/notices', 'createSuccessNotice'].concat(_toConsumableArray(notifySuccessArgs)));

        case 60:
          _context2.next = 70;
          break;

        case 62:
          _context2.prev = 62;
          _context2.t0 = _context2["catch"](47);
          _context2.next = 66;
          return dispatch(STORE_KEY, '__experimentalRequestPostUpdateFailure', {
            post: post,
            edits: edits,
            error: _context2.t0,
            options: options
          });

        case 66:
          notifyFailArgs = getNotificationArgumentsForSaveFail({
            post: post,
            edits: edits,
            error: _context2.t0
          });

          if (!(notifyFailArgs.length > 0)) {
            _context2.next = 70;
            break;
          }

          _context2.next = 70;
          return dispatch.apply(void 0, ['core/notices', 'createErrorNotice'].concat(_toConsumableArray(notifyFailArgs)));

        case 70:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[47, 62]]);
}
/**
 * Action generator for handling refreshing the current post.
 */

export function refreshPost() {
  var post, postTypeSlug, postType, newPost;
  return _regeneratorRuntime.wrap(function refreshPost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return select(STORE_KEY, 'getCurrentPost');

        case 2:
          post = _context3.sent;
          _context3.next = 5;
          return select(STORE_KEY, 'getCurrentPostType');

        case 5:
          postTypeSlug = _context3.sent;
          _context3.next = 8;
          return resolveSelect('core', 'getPostType', postTypeSlug);

        case 8:
          postType = _context3.sent;
          _context3.next = 11;
          return apiFetch({
            // Timestamp arg allows caller to bypass browser caching, which is
            // expected for this specific function.
            path: "/wp/v2/".concat(postType.rest_base, "/").concat(post.id) + "?context=edit&_timestamp=".concat(Date.now())
          });

        case 11:
          newPost = _context3.sent;
          _context3.next = 14;
          return dispatch(STORE_KEY, 'resetPost', newPost);

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}
/**
 * Action generator for trashing the current post in the editor.
 */

export function trashPost() {
  var postTypeSlug, postType, post;
  return _regeneratorRuntime.wrap(function trashPost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return select(STORE_KEY, 'getCurrentPostType');

        case 2:
          postTypeSlug = _context4.sent;
          _context4.next = 5;
          return resolveSelect('core', 'getPostType', postTypeSlug);

        case 5:
          postType = _context4.sent;
          _context4.next = 8;
          return dispatch('core/notices', 'removeNotice', TRASH_POST_NOTICE_ID);

        case 8:
          _context4.prev = 8;
          _context4.next = 11;
          return select(STORE_KEY, 'getCurrentPost');

        case 11:
          post = _context4.sent;
          _context4.next = 14;
          return apiFetch({
            path: "/wp/v2/".concat(postType.rest_base, "/").concat(post.id),
            method: 'DELETE'
          });

        case 14:
          _context4.next = 16;
          return dispatch(STORE_KEY, 'resetPost', _objectSpread({}, post, {
            status: 'trash'
          }));

        case 16:
          _context4.next = 22;
          break;

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](8);
          _context4.next = 22;
          return dispatch.apply(void 0, ['core/notices', 'createErrorNotice'].concat(_toConsumableArray(getNotificationArgumentsForTrashFail({
            error: _context4.t0
          }))));

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this, [[8, 18]]);
}
/**
 * Action generator used in signalling that the post should autosave.
 *
 * @param {Object?} options Extra flags to identify the autosave.
 */

export function autosave(options) {
  return _regeneratorRuntime.wrap(function autosave$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return dispatch(STORE_KEY, 'savePost', _objectSpread({
            isAutosave: true
          }, options));

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this);
}
/**
 * Returns an action object used in signalling that undo history should
 * restore last popped state.
 *
 * @return {Object} Action object.
 */

export function redo() {
  return {
    type: 'REDO'
  };
}
/**
 * Returns an action object used in signalling that undo history should pop.
 *
 * @return {Object} Action object.
 */

export function undo() {
  return {
    type: 'UNDO'
  };
}
/**
 * Returns an action object used in signalling that undo history record should
 * be created.
 *
 * @return {Object} Action object.
 */

export function createUndoLevel() {
  return {
    type: 'CREATE_UNDO_LEVEL'
  };
}
/**
 * Returns an action object used to lock the editor.
 *
 * @param {Object}  lock Details about the post lock status, user, and nonce.
 *
 * @return {Object} Action object.
 */

export function updatePostLock(lock) {
  return {
    type: 'UPDATE_POST_LOCK',
    lock: lock
  };
}
/**
 * Returns an action object used to fetch a single reusable block or all
 * reusable blocks from the REST API into the store.
 *
 * @param {?string} id If given, only a single reusable block with this ID will
 *                     be fetched.
 *
 * @return {Object} Action object.
 */

export function __experimentalFetchReusableBlocks(id) {
  return {
    type: 'FETCH_REUSABLE_BLOCKS',
    id: id
  };
}
/**
 * Returns an action object used in signalling that reusable blocks have been
 * received. `results` is an array of objects containing:
 *  - `reusableBlock` - Details about how the reusable block is persisted.
 *  - `parsedBlock` - The original block.
 *
 * @param {Object[]} results Reusable blocks received.
 *
 * @return {Object} Action object.
 */

export function __experimentalReceiveReusableBlocks(results) {
  return {
    type: 'RECEIVE_REUSABLE_BLOCKS',
    results: results
  };
}
/**
 * Returns an action object used to save a reusable block that's in the store to
 * the REST API.
 *
 * @param {Object} id The ID of the reusable block to save.
 *
 * @return {Object} Action object.
 */

export function __experimentalSaveReusableBlock(id) {
  return {
    type: 'SAVE_REUSABLE_BLOCK',
    id: id
  };
}
/**
 * Returns an action object used to delete a reusable block via the REST API.
 *
 * @param {number} id The ID of the reusable block to delete.
 *
 * @return {Object} Action object.
 */

export function __experimentalDeleteReusableBlock(id) {
  return {
    type: 'DELETE_REUSABLE_BLOCK',
    id: id
  };
}
/**
 * Returns an action object used in signalling that a reusable block's title is
 * to be updated.
 *
 * @param {number} id    The ID of the reusable block to update.
 * @param {string} title The new title.
 *
 * @return {Object} Action object.
 */

export function __experimentalUpdateReusableBlockTitle(id, title) {
  return {
    type: 'UPDATE_REUSABLE_BLOCK_TITLE',
    id: id,
    title: title
  };
}
/**
 * Returns an action object used to convert a reusable block into a static
 * block.
 *
 * @param {string} clientId The client ID of the block to attach.
 *
 * @return {Object} Action object.
 */

export function __experimentalConvertBlockToStatic(clientId) {
  return {
    type: 'CONVERT_BLOCK_TO_STATIC',
    clientId: clientId
  };
}
/**
 * Returns an action object used to convert a static block into a reusable
 * block.
 *
 * @param {string} clientIds The client IDs of the block to detach.
 *
 * @return {Object} Action object.
 */

export function __experimentalConvertBlockToReusable(clientIds) {
  return {
    type: 'CONVERT_BLOCK_TO_REUSABLE',
    clientIds: castArray(clientIds)
  };
}
/**
 * Returns an action object used in signalling that the user has enabled the
 * publish sidebar.
 *
 * @return {Object} Action object
 */

export function enablePublishSidebar() {
  return {
    type: 'ENABLE_PUBLISH_SIDEBAR'
  };
}
/**
 * Returns an action object used in signalling that the user has disabled the
 * publish sidebar.
 *
 * @return {Object} Action object
 */

export function disablePublishSidebar() {
  return {
    type: 'DISABLE_PUBLISH_SIDEBAR'
  };
}
/**
 * Returns an action object used to signal that post saving is locked.
 *
 * @param  {string} lockName The lock name.
 *
 * @return {Object} Action object
 */

export function lockPostSaving(lockName) {
  return {
    type: 'LOCK_POST_SAVING',
    lockName: lockName
  };
}
/**
 * Returns an action object used to signal that post saving is unlocked.
 *
 * @param  {string} lockName The lock name.
 *
 * @return {Object} Action object
 */

export function unlockPostSaving(lockName) {
  return {
    type: 'UNLOCK_POST_SAVING',
    lockName: lockName
  };
}
/**
 * Returns an action object used to signal that the blocks have been updated.
 *
 * @param {Array}   blocks  Block Array.
 * @param {?Object} options Optional options.
 *
 * @return {Object} Action object
 */

export function resetEditorBlocks(blocks) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    type: 'RESET_EDITOR_BLOCKS',
    blocks: blocks,
    shouldCreateUndoLevel: options.__unstableShouldCreateUndoLevel !== false
  };
}
/*
 * Returns an action object used in signalling that the post editor settings have been updated.
 *
 * @param {Object} settings Updated settings
 *
 * @return {Object} Action object
 */

export function updateEditorSettings(settings) {
  return {
    type: 'UPDATE_EDITOR_SETTINGS',
    settings: settings
  };
}
/**
 * Backward compatibility
 */

var getBlockEditorAction = function getBlockEditorAction(name) {
  return (
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var _len,
          args,
          _key,
          _args6 = arguments;

      return _regeneratorRuntime.wrap(function _callee$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              for (_len = _args6.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = _args6[_key];
              }

              _context6.next = 3;
              return dispatch.apply(void 0, ['core/block-editor', name].concat(args));

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee, this);
    })
  );
};

export var resetBlocks = getBlockEditorAction('resetBlocks');
export var receiveBlocks = getBlockEditorAction('receiveBlocks');
export var updateBlock = getBlockEditorAction('updateBlock');
export var updateBlockAttributes = getBlockEditorAction('updateBlockAttributes');
export var selectBlock = getBlockEditorAction('selectBlock');
export var startMultiSelect = getBlockEditorAction('startMultiSelect');
export var stopMultiSelect = getBlockEditorAction('stopMultiSelect');
export var multiSelect = getBlockEditorAction('multiSelect');
export var clearSelectedBlock = getBlockEditorAction('clearSelectedBlock');
export var toggleSelection = getBlockEditorAction('toggleSelection');
export var replaceBlocks = getBlockEditorAction('replaceBlocks');
export var moveBlocksDown = getBlockEditorAction('moveBlocksDown');
export var moveBlocksUp = getBlockEditorAction('moveBlocksUp');
export var moveBlockToPosition = getBlockEditorAction('moveBlockToPosition');
export var insertBlock = getBlockEditorAction('insertBlock');
export var insertBlocks = getBlockEditorAction('insertBlocks');
export var showInsertionPoint = getBlockEditorAction('showInsertionPoint');
export var hideInsertionPoint = getBlockEditorAction('hideInsertionPoint');
export var setTemplateValidity = getBlockEditorAction('setTemplateValidity');
export var synchronizeTemplate = getBlockEditorAction('synchronizeTemplate');
export var mergeBlocks = getBlockEditorAction('mergeBlocks');
export var removeBlocks = getBlockEditorAction('removeBlocks');
export var removeBlock = getBlockEditorAction('removeBlock');
export var toggleBlockMode = getBlockEditorAction('toggleBlockMode');
export var startTyping = getBlockEditorAction('startTyping');
export var stopTyping = getBlockEditorAction('stopTyping');
export var enterFormattedText = getBlockEditorAction('enterFormattedText');
export var exitFormattedText = getBlockEditorAction('exitFormattedText');
export var insertDefaultBlock = getBlockEditorAction('insertDefaultBlock');
export var updateBlockListSettings = getBlockEditorAction('updateBlockListSettings');
//# sourceMappingURL=actions.js.map