"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNotificationArgumentsForSaveSuccess = getNotificationArgumentsForSaveSuccess;
exports.getNotificationArgumentsForSaveFail = getNotificationArgumentsForSaveFail;
exports.getNotificationArgumentsForTrashFail = getNotificationArgumentsForTrashFail;

var _i18n = require("@wordpress/i18n");

var _constants = require("../constants");

var _lodash = require("lodash");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * External dependencies
 */

/**
 * Builds the arguments for a success notification dispatch.
 *
 * @param {Object} data Incoming data to build the arguments from.
 *
 * @return {Array} Arguments for dispatch. An empty array signals no
 *                 notification should be sent.
 */
function getNotificationArgumentsForSaveSuccess(data) {
  var previousPost = data.previousPost,
      post = data.post,
      postType = data.postType; // Autosaves are neither shown a notice nor redirected.

  if ((0, _lodash.get)(data.options, ['isAutosave'])) {
    return [];
  }

  var publishStatus = ['publish', 'private', 'future'];
  var isPublished = (0, _lodash.includes)(publishStatus, previousPost.status);
  var willPublish = (0, _lodash.includes)(publishStatus, post.status);
  var noticeMessage;
  var shouldShowLink = (0, _lodash.get)(postType, ['viewable'], false);

  if (!isPublished && !willPublish) {
    // If saving a non-published post, don't show notice.
    noticeMessage = null;
  } else if (isPublished && !willPublish) {
    // If undoing publish status, show specific notice
    noticeMessage = postType.labels.item_reverted_to_draft;
    shouldShowLink = false;
  } else if (!isPublished && willPublish) {
    // If publishing or scheduling a post, show the corresponding
    // publish message
    noticeMessage = {
      publish: postType.labels.item_published,
      private: postType.labels.item_published_privately,
      future: postType.labels.item_scheduled
    }[post.status];
  } else {
    // Generic fallback notice
    noticeMessage = postType.labels.item_updated;
  }

  if (noticeMessage) {
    var actions = [];

    if (shouldShowLink) {
      actions.push({
        label: postType.labels.view_item,
        url: post.link
      });
    }

    return [noticeMessage, {
      id: _constants.SAVE_POST_NOTICE_ID,
      actions: actions
    }];
  }

  return [];
}
/**
 * Builds the fail notification arguments for dispatch.
 *
 * @param {Object} data Incoming data to build the arguments with.
 *
 * @return {Array} Arguments for dispatch. An empty array signals no
 *                 notification should be sent.
 */


function getNotificationArgumentsForSaveFail(data) {
  var post = data.post,
      edits = data.edits,
      error = data.error;

  if (error && 'rest_autosave_no_changes' === error.code) {
    // Autosave requested a new autosave, but there were no changes. This shouldn't
    // result in an error notice for the user.
    return [];
  }

  var publishStatus = ['publish', 'private', 'future'];
  var isPublished = publishStatus.indexOf(post.status) !== -1; // If the post was being published, we show the corresponding publish error message
  // Unless we publish an "updating failed" message

  var messages = {
    publish: (0, _i18n.__)('Publishing failed'),
    private: (0, _i18n.__)('Publishing failed'),
    future: (0, _i18n.__)('Scheduling failed')
  };
  var noticeMessage = !isPublished && publishStatus.indexOf(edits.status) !== -1 ? messages[edits.status] : (0, _i18n.__)('Updating failed');
  return [noticeMessage, {
    id: _constants.SAVE_POST_NOTICE_ID
  }];
}
/**
 * Builds the trash fail notification arguments for dispatch.
 *
 * @param {Object} data
 *
 * @return {Array} Arguments for dispatch.
 */


function getNotificationArgumentsForTrashFail(data) {
  return [data.error.message && data.error.code !== 'unknown_error' ? data.error.message : (0, _i18n.__)('Trashing failed'), {
    id: _constants.TRASH_POST_NOTICE_ID
  }];
}
//# sourceMappingURL=notice-builder.js.map