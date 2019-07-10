"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasEditorUndo = hasEditorUndo;
exports.hasEditorRedo = hasEditorRedo;
exports.isEditedPostNew = isEditedPostNew;
exports.hasChangedContent = hasChangedContent;
exports.isEditedPostDirty = isEditedPostDirty;
exports.isCleanNewPost = isCleanNewPost;
exports.getCurrentPost = getCurrentPost;
exports.getCurrentPostType = getCurrentPostType;
exports.getCurrentPostId = getCurrentPostId;
exports.getCurrentPostRevisionsCount = getCurrentPostRevisionsCount;
exports.getCurrentPostLastRevisionId = getCurrentPostLastRevisionId;
exports.getCurrentPostAttribute = getCurrentPostAttribute;
exports.getEditedPostAttribute = getEditedPostAttribute;
exports.getAutosaveAttribute = getAutosaveAttribute;
exports.getEditedPostVisibility = getEditedPostVisibility;
exports.isCurrentPostPending = isCurrentPostPending;
exports.isCurrentPostPublished = isCurrentPostPublished;
exports.isCurrentPostScheduled = isCurrentPostScheduled;
exports.isEditedPostPublishable = isEditedPostPublishable;
exports.isEditedPostSaveable = isEditedPostSaveable;
exports.isEditedPostEmpty = isEditedPostEmpty;
exports.isEditedPostAutosaveable = isEditedPostAutosaveable;
exports.getAutosave = getAutosave;
exports.hasAutosave = hasAutosave;
exports.isEditedPostBeingScheduled = isEditedPostBeingScheduled;
exports.isEditedPostDateFloating = isEditedPostDateFloating;
exports.isSavingPost = isSavingPost;
exports.didPostSaveRequestSucceed = didPostSaveRequestSucceed;
exports.didPostSaveRequestFail = didPostSaveRequestFail;
exports.isAutosavingPost = isAutosavingPost;
exports.isPreviewingPost = isPreviewingPost;
exports.getEditedPostPreviewLink = getEditedPostPreviewLink;
exports.getSuggestedPostFormat = getSuggestedPostFormat;
exports.getBlocksForSerialization = getBlocksForSerialization;
exports.__experimentalIsSavingReusableBlock = __experimentalIsSavingReusableBlock;
exports.__experimentalIsFetchingReusableBlock = __experimentalIsFetchingReusableBlock;
exports.getStateBeforeOptimisticTransaction = getStateBeforeOptimisticTransaction;
exports.isPublishingPost = isPublishingPost;
exports.isPermalinkEditable = isPermalinkEditable;
exports.getPermalink = getPermalink;
exports.getPermalinkParts = getPermalinkParts;
exports.inSomeHistory = inSomeHistory;
exports.isPostLocked = isPostLocked;
exports.isPostSavingLocked = isPostSavingLocked;
exports.isPostLockTakeover = isPostLockTakeover;
exports.getPostLockUser = getPostLockUser;
exports.getActivePostLock = getActivePostLock;
exports.canUserUseUnfilteredHTML = canUserUseUnfilteredHTML;
exports.isPublishSidebarEnabled = isPublishSidebarEnabled;
exports.getEditorBlocks = getEditorBlocks;
exports.__unstableIsEditorReady = __unstableIsEditorReady;
exports.getEditorSettings = getEditorSettings;
exports.getBlockListSettings = exports.hasInserterItems = exports.getInserterItems = exports.canInsertBlockType = exports.getTemplateLock = exports.getTemplate = exports.isValidTemplate = exports.isBlockInsertionPointVisible = exports.getBlockInsertionPoint = exports.isCaretWithinFormattedText = exports.isTyping = exports.getBlockMode = exports.isSelectionEnabled = exports.isMultiSelecting = exports.hasMultiSelection = exports.isBlockWithinSelection = exports.hasSelectedInnerBlock = exports.isBlockSelected = exports.getBlockIndex = exports.getBlockOrder = exports.getMultiSelectedBlocksEndClientId = exports.getMultiSelectedBlocksStartClientId = exports.isAncestorMultiSelected = exports.isBlockMultiSelected = exports.isFirstMultiSelectedBlock = exports.getLastMultiSelectedBlockClientId = exports.getFirstMultiSelectedBlockClientId = exports.getMultiSelectedBlocks = exports.getMultiSelectedBlockClientIds = exports.getSelectedBlocksInitialCaretPosition = exports.getNextBlockClientId = exports.getPreviousBlockClientId = exports.getAdjacentBlockClientId = exports.getBlockHierarchyRootClientId = exports.getBlockRootClientId = exports.getSelectedBlock = exports.getSelectedBlockClientId = exports.hasSelectedBlock = exports.getSelectedBlockCount = exports.getBlockSelectionEnd = exports.getBlockSelectionStart = exports.getBlockCount = exports.getBlocksByClientId = exports.getGlobalBlockCount = exports.getClientIdsWithDescendants = exports.getClientIdsOfDescendants = exports.__unstableGetBlockWithoutInnerBlocks = exports.getBlocks = exports.getBlock = exports.getBlockAttributes = exports.isBlockValid = exports.getBlockName = exports.getBlockDependantsCacheBust = exports.__experimentalGetReusableBlocks = exports.__experimentalGetReusableBlock = exports.getEditedPostContent = exports.getReferenceByDistinctEdits = exports.getPostEdits = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _rememo = _interopRequireDefault(require("rememo"));

var _blocks = require("@wordpress/blocks");

var _date = require("@wordpress/date");

var _autop = require("@wordpress/autop");

var _url = require("@wordpress/url");

var _data = require("@wordpress/data");

var _defaults = require("./defaults");

var _constants = require("./constants");

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
 * Shared reference to an empty object for cases where it is important to avoid
 * returning a new object reference on every invocation, as in a connected or
 * other pure component which performs `shouldComponentUpdate` check on props.
 * This should be used as a last resort, since the normalized data should be
 * maintained by the reducer result in state.
 */
var EMPTY_OBJECT = {};
/**
 * Returns true if any past editor history snapshots exist, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether undo history exists.
 */

function hasEditorUndo(state) {
  return state.editor.past.length > 0;
}
/**
 * Returns true if any future editor history snapshots exist, or false
 * otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether redo history exists.
 */


function hasEditorRedo(state) {
  return state.editor.future.length > 0;
}
/**
 * Returns true if the currently edited post is yet to be saved, or false if
 * the post has been saved.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post is new.
 */


function isEditedPostNew(state) {
  return getCurrentPost(state).status === 'auto-draft';
}
/**
 * Returns true if content includes unsaved changes, or false otherwise.
 *
 * @param {Object} state Editor state.
 *
 * @return {boolean} Whether content includes unsaved changes.
 */


function hasChangedContent(state) {
  return state.editor.present.blocks.isDirty || // `edits` is intended to contain only values which are different from
  // the saved post, so the mere presence of a property is an indicator
  // that the value is different than what is known to be saved. While
  // content in Visual mode is represented by the blocks state, in Text
  // mode it is tracked by `edits.content`.
  'content' in state.editor.present.edits;
}
/**
 * Returns true if there are unsaved values for the current edit session, or
 * false if the editing state matches the saved or new post.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether unsaved values exist.
 */


function isEditedPostDirty(state) {
  if (hasChangedContent(state)) {
    return true;
  } // Edits should contain only fields which differ from the saved post (reset
  // at initial load and save complete). Thus, a non-empty edits state can be
  // inferred to contain unsaved values.


  if (Object.keys(state.editor.present.edits).length > 0) {
    return true;
  } // Edits and change detection are reset at the start of a save, but a post
  // is still considered dirty until the point at which the save completes.
  // Because the save is performed optimistically, the prior states are held
  // until committed. These can be referenced to determine whether there's a
  // chance that state may be reverted into one considered dirty.


  return inSomeHistory(state, isEditedPostDirty);
}
/**
 * Returns true if there are no unsaved values for the current edit session and
 * if the currently edited post is new (has never been saved before).
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether new post and unsaved values exist.
 */


function isCleanNewPost(state) {
  return !isEditedPostDirty(state) && isEditedPostNew(state);
}
/**
 * Returns the post currently being edited in its last known saved state, not
 * including unsaved edits. Returns an object containing relevant default post
 * values if the post has not yet been saved.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} Post object.
 */


function getCurrentPost(state) {
  return state.currentPost;
}
/**
 * Returns the post type of the post currently being edited.
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Post type.
 */


function getCurrentPostType(state) {
  return state.currentPost.type;
}
/**
 * Returns the ID of the post currently being edited, or null if the post has
 * not yet been saved.
 *
 * @param {Object} state Global application state.
 *
 * @return {?number} ID of current post.
 */


function getCurrentPostId(state) {
  return getCurrentPost(state).id || null;
}
/**
 * Returns the number of revisions of the post currently being edited.
 *
 * @param {Object} state Global application state.
 *
 * @return {number} Number of revisions.
 */


function getCurrentPostRevisionsCount(state) {
  return (0, _lodash.get)(getCurrentPost(state), ['_links', 'version-history', 0, 'count'], 0);
}
/**
 * Returns the last revision ID of the post currently being edited,
 * or null if the post has no revisions.
 *
 * @param {Object} state Global application state.
 *
 * @return {?number} ID of the last revision.
 */


function getCurrentPostLastRevisionId(state) {
  return (0, _lodash.get)(getCurrentPost(state), ['_links', 'predecessor-version', 0, 'id'], null);
}
/**
 * Returns any post values which have been changed in the editor but not yet
 * been saved.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} Object of key value pairs comprising unsaved edits.
 */


var getPostEdits = (0, _rememo.default)(function (state) {
  return (0, _objectSpread2.default)({}, state.initialEdits, state.editor.present.edits);
}, function (state) {
  return [state.editor.present.edits, state.initialEdits];
});
/**
 * Returns a new reference when edited values have changed. This is useful in
 * inferring where an edit has been made between states by comparison of the
 * return values using strict equality.
 *
 * @example
 *
 * ```
 * const hasEditOccurred = (
 *    getReferenceByDistinctEdits( beforeState ) !==
 *    getReferenceByDistinctEdits( afterState )
 * );
 * ```
 *
 * @param {Object} state Editor state.
 *
 * @return {*} A value whose reference will change only when an edit occurs.
 */

exports.getPostEdits = getPostEdits;
var getReferenceByDistinctEdits = (0, _rememo.default)(function () {
  return [];
}, function (state) {
  return [state.editor];
});
/**
 * Returns an attribute value of the saved post.
 *
 * @param {Object} state         Global application state.
 * @param {string} attributeName Post attribute name.
 *
 * @return {*} Post attribute value.
 */

exports.getReferenceByDistinctEdits = getReferenceByDistinctEdits;

function getCurrentPostAttribute(state, attributeName) {
  var post = getCurrentPost(state);

  if (post.hasOwnProperty(attributeName)) {
    return post[attributeName];
  }
}
/**
 * Returns a single attribute of the post being edited, preferring the unsaved
 * edit if one exists, but merging with the attribute value for the last known
 * saved state of the post (this is needed for some nested attributes like meta).
 *
 * @param {Object} state         Global application state.
 * @param {string} attributeName Post attribute name.
 *
 * @return {*} Post attribute value.
 */


var getNestedEditedPostProperty = (0, _rememo.default)(function (state, attributeName) {
  var edits = getPostEdits(state);

  if (!edits.hasOwnProperty(attributeName)) {
    return getCurrentPostAttribute(state, attributeName);
  }

  return (0, _objectSpread2.default)({}, getCurrentPostAttribute(state, attributeName), edits[attributeName]);
}, function (state, attributeName) {
  return [(0, _lodash.get)(state.editor.present.edits, [attributeName], EMPTY_OBJECT), (0, _lodash.get)(state.currentPost, [attributeName], EMPTY_OBJECT)];
});
/**
 * Returns a single attribute of the post being edited, preferring the unsaved
 * edit if one exists, but falling back to the attribute for the last known
 * saved state of the post.
 *
 * @param {Object} state         Global application state.
 * @param {string} attributeName Post attribute name.
 *
 * @return {*} Post attribute value.
 */

function getEditedPostAttribute(state, attributeName) {
  // Special cases
  switch (attributeName) {
    case 'content':
      return getEditedPostContent(state);
  } // Fall back to saved post value if not edited.


  var edits = getPostEdits(state);

  if (!edits.hasOwnProperty(attributeName)) {
    return getCurrentPostAttribute(state, attributeName);
  } // Merge properties are objects which contain only the patch edit in state,
  // and thus must be merged with the current post attribute.


  if (_constants.EDIT_MERGE_PROPERTIES.has(attributeName)) {
    return getNestedEditedPostProperty(state, attributeName);
  }

  return edits[attributeName];
}
/**
 * Returns an attribute value of the current autosave revision for a post, or
 * null if there is no autosave for the post.
 *
 * @param {Object} state         Global application state.
 * @param {string} attributeName Autosave attribute name.
 *
 * @return {*} Autosave attribute value.
 */


function getAutosaveAttribute(state, attributeName) {
  if (!hasAutosave(state)) {
    return null;
  }

  var autosave = getAutosave(state);

  if (autosave.hasOwnProperty(attributeName)) {
    return autosave[attributeName];
  }
}
/**
 * Returns the current visibility of the post being edited, preferring the
 * unsaved value if different than the saved post. The return value is one of
 * "private", "password", or "public".
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Post visibility.
 */


function getEditedPostVisibility(state) {
  var status = getEditedPostAttribute(state, 'status');

  if (status === 'private') {
    return 'private';
  }

  var password = getEditedPostAttribute(state, 'password');

  if (password) {
    return 'password';
  }

  return 'public';
}
/**
 * Returns true if post is pending review.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether current post is pending review.
 */


function isCurrentPostPending(state) {
  return getCurrentPost(state).status === 'pending';
}
/**
 * Return true if the current post has already been published.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post has been published.
 */


function isCurrentPostPublished(state) {
  var post = getCurrentPost(state);
  return ['publish', 'private'].indexOf(post.status) !== -1 || post.status === 'future' && !(0, _date.isInTheFuture)(new Date(Number((0, _date.getDate)(post.date)) - _constants.ONE_MINUTE_IN_MS));
}
/**
 * Returns true if post is already scheduled.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether current post is scheduled to be posted.
 */


function isCurrentPostScheduled(state) {
  return getCurrentPost(state).status === 'future' && !isCurrentPostPublished(state);
}
/**
 * Return true if the post being edited can be published.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post can been published.
 */


function isEditedPostPublishable(state) {
  var post = getCurrentPost(state); // TODO: Post being publishable should be superset of condition of post
  // being saveable. Currently this restriction is imposed at UI.
  //
  //  See: <PostPublishButton /> (`isButtonEnabled` assigned by `isSaveable`)

  return isEditedPostDirty(state) || ['publish', 'private', 'future'].indexOf(post.status) === -1;
}
/**
 * Returns true if the post can be saved, or false otherwise. A post must
 * contain a title, an excerpt, or non-empty content to be valid for save.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post can be saved.
 */


function isEditedPostSaveable(state) {
  if (isSavingPost(state)) {
    return false;
  } // TODO: Post should not be saveable if not dirty. Cannot be added here at
  // this time since posts where meta boxes are present can be saved even if
  // the post is not dirty. Currently this restriction is imposed at UI, but
  // should be moved here.
  //
  //  See: `isEditedPostPublishable` (includes `isEditedPostDirty` condition)
  //  See: <PostSavedState /> (`forceIsDirty` prop)
  //  See: <PostPublishButton /> (`forceIsDirty` prop)
  //  See: https://github.com/WordPress/gutenberg/pull/4184


  return !!getEditedPostAttribute(state, 'title') || !!getEditedPostAttribute(state, 'excerpt') || !isEditedPostEmpty(state);
}
/**
 * Returns true if the edited post has content. A post has content if it has at
 * least one saveable block or otherwise has a non-empty content property
 * assigned.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether post has content.
 */


function isEditedPostEmpty(state) {
  // While the condition of truthy content string is sufficient to determine
  // emptiness, testing saveable blocks length is a trivial operation. Since
  // this function can be called frequently, optimize for the fast case as a
  // condition of the mere existence of blocks. Note that the value of edited
  // content takes precedent over block content, and must fall through to the
  // default logic.
  var blocks = state.editor.present.blocks.value;

  if (blocks.length && !('content' in getPostEdits(state))) {
    // Pierce the abstraction of the serializer in knowing that blocks are
    // joined with with newlines such that even if every individual block
    // produces an empty save result, the serialized content is non-empty.
    if (blocks.length > 1) {
      return false;
    } // There are two conditions under which the optimization cannot be
    // assumed, and a fallthrough to getEditedPostContent must occur:
    //
    // 1. getBlocksForSerialization has special treatment in omitting a
    //    single unmodified default block.
    // 2. Comment delimiters are omitted for a freeform or unregistered
    //    block in its serialization. The freeform block specifically may
    //    produce an empty string in its saved output.
    //
    // For all other content, the single block is assumed to make a post
    // non-empty, if only by virtue of its own comment delimiters.


    var blockName = blocks[0].name;

    if (blockName !== (0, _blocks.getDefaultBlockName)() && blockName !== (0, _blocks.getFreeformContentHandlerName)()) {
      return false;
    }
  }

  return !getEditedPostContent(state);
}
/**
 * Returns true if the post can be autosaved, or false otherwise.
 *
 * @param  {Object}  state Global application state.
 *
 * @return {boolean} Whether the post can be autosaved.
 */


function isEditedPostAutosaveable(state) {
  // A post must contain a title, an excerpt, or non-empty content to be valid for autosaving.
  if (!isEditedPostSaveable(state)) {
    return false;
  } // If we don't already have an autosave, the post is autosaveable.


  if (!hasAutosave(state)) {
    return true;
  } // To avoid an expensive content serialization, use the content dirtiness
  // flag in place of content field comparison against the known autosave.
  // This is not strictly accurate, and relies on a tolerance toward autosave
  // request failures for unnecessary saves.


  if (hasChangedContent(state)) {
    return true;
  } // If the title, excerpt or content has changed, the post is autosaveable.


  var autosave = getAutosave(state);
  return ['title', 'excerpt'].some(function (field) {
    return autosave[field] !== getEditedPostAttribute(state, field);
  });
}
/**
 * Returns the current autosave, or null if one is not set (i.e. if the post
 * has yet to be autosaved, or has been saved or published since the last
 * autosave).
 *
 * @param {Object} state Editor state.
 *
 * @return {?Object} Current autosave, if exists.
 */


function getAutosave(state) {
  return state.autosave;
}
/**
 * Returns the true if there is an existing autosave, otherwise false.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether there is an existing autosave.
 */


function hasAutosave(state) {
  return !!getAutosave(state);
}
/**
 * Return true if the post being edited is being scheduled. Preferring the
 * unsaved status values.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post has been published.
 */


function isEditedPostBeingScheduled(state) {
  var date = getEditedPostAttribute(state, 'date'); // Offset the date by one minute (network latency)

  var checkedDate = new Date(Number((0, _date.getDate)(date)) - _constants.ONE_MINUTE_IN_MS);
  return (0, _date.isInTheFuture)(checkedDate);
}
/**
 * Returns whether the current post should be considered to have a "floating"
 * date (i.e. that it would publish "Immediately" rather than at a set time).
 *
 * Unlike in the PHP backend, the REST API returns a full date string for posts
 * where the 0000-00-00T00:00:00 placeholder is present in the database. To
 * infer that a post is set to publish "Immediately" we check whether the date
 * and modified date are the same.
 *
 * @param  {Object}  state Editor state.
 *
 * @return {boolean} Whether the edited post has a floating date value.
 */


function isEditedPostDateFloating(state) {
  var date = getEditedPostAttribute(state, 'date');
  var modified = getEditedPostAttribute(state, 'modified');
  var status = getEditedPostAttribute(state, 'status');

  if (status === 'draft' || status === 'auto-draft' || status === 'pending') {
    return date === modified;
  }

  return false;
}
/**
 * Returns true if the post is currently being saved, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether post is being saved.
 */


function isSavingPost(state) {
  return state.saving.requesting;
}
/**
 * Returns true if a previous post save was attempted successfully, or false
 * otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post was saved successfully.
 */


function didPostSaveRequestSucceed(state) {
  return state.saving.successful;
}
/**
 * Returns true if a previous post save was attempted but failed, or false
 * otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post save failed.
 */


function didPostSaveRequestFail(state) {
  return !!state.saving.error;
}
/**
 * Returns true if the post is autosaving, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post is autosaving.
 */


function isAutosavingPost(state) {
  return isSavingPost(state) && !!state.saving.options.isAutosave;
}
/**
 * Returns true if the post is being previewed, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the post is being previewed.
 */


function isPreviewingPost(state) {
  return isSavingPost(state) && !!state.saving.options.isPreview;
}
/**
 * Returns the post preview link
 *
 * @param {Object} state Global application state.
 *
 * @return {string?} Preview Link.
 */


function getEditedPostPreviewLink(state) {
  var featuredImageId = getEditedPostAttribute(state, 'featured_media');
  var previewLink = state.previewLink;

  if (previewLink && featuredImageId) {
    return (0, _url.addQueryArgs)(previewLink, {
      _thumbnail_id: featuredImageId
    });
  }

  return previewLink;
}
/**
 * Returns a suggested post format for the current post, inferred only if there
 * is a single block within the post and it is of a type known to match a
 * default post format. Returns null if the format cannot be determined.
 *
 * @param {Object} state Global application state.
 *
 * @return {?string} Suggested post format.
 */


function getSuggestedPostFormat(state) {
  var blocks = state.editor.present.blocks.value;
  var name; // If there is only one block in the content of the post grab its name
  // so we can derive a suitable post format from it.

  if (blocks.length === 1) {
    name = blocks[0].name;
  } // If there are two blocks in the content and the last one is a text blocks
  // grab the name of the first one to also suggest a post format from it.


  if (blocks.length === 2) {
    if (blocks[1].name === 'core/paragraph') {
      name = blocks[0].name;
    }
  } // We only convert to default post formats in core.


  switch (name) {
    case 'core/image':
      return 'image';

    case 'core/quote':
    case 'core/pullquote':
      return 'quote';

    case 'core/gallery':
      return 'gallery';

    case 'core/video':
    case 'core-embed/youtube':
    case 'core-embed/vimeo':
      return 'video';

    case 'core/audio':
    case 'core-embed/spotify':
    case 'core-embed/soundcloud':
      return 'audio';
  }

  return null;
}
/**
 * Returns a set of blocks which are to be used in consideration of the post's
 * generated save content.
 *
 * @param {Object} state Editor state.
 *
 * @return {WPBlock[]} Filtered set of blocks for save.
 */


function getBlocksForSerialization(state) {
  var blocks = state.editor.present.blocks.value; // WARNING: Any changes to the logic of this function should be verified
  // against the implementation of isEditedPostEmpty, which bypasses this
  // function for performance' sake, in an assumption of this current logic
  // being irrelevant to the optimized condition of emptiness.
  // A single unmodified default block is assumed to be equivalent to an
  // empty post.

  var isSingleUnmodifiedDefaultBlock = blocks.length === 1 && (0, _blocks.isUnmodifiedDefaultBlock)(blocks[0]);

  if (isSingleUnmodifiedDefaultBlock) {
    return [];
  }

  return blocks;
}
/**
 * Returns the content of the post being edited, preferring raw string edit
 * before falling back to serialization of block state.
 *
 * @param {Object} state Global application state.
 *
 * @return {string} Post content.
 */


var getEditedPostContent = (0, _rememo.default)(function (state) {
  var edits = getPostEdits(state);

  if ('content' in edits) {
    return edits.content;
  }

  var blocks = getBlocksForSerialization(state);
  var content = (0, _blocks.serialize)(blocks); // For compatibility purposes, treat a post consisting of a single
  // freeform block as legacy content and downgrade to a pre-block-editor
  // removep'd content format.

  var isSingleFreeformBlock = blocks.length === 1 && blocks[0].name === (0, _blocks.getFreeformContentHandlerName)();

  if (isSingleFreeformBlock) {
    return (0, _autop.removep)(content);
  }

  return content;
}, function (state) {
  return [state.editor.present.blocks.value, state.editor.present.edits.content, state.initialEdits.content];
});
/**
 * Returns the reusable block with the given ID.
 *
 * @param {Object}        state Global application state.
 * @param {number|string} ref   The reusable block's ID.
 *
 * @return {Object} The reusable block, or null if none exists.
 */

exports.getEditedPostContent = getEditedPostContent;

var __experimentalGetReusableBlock = (0, _rememo.default)(function (state, ref) {
  var block = state.reusableBlocks.data[ref];

  if (!block) {
    return null;
  }

  var isTemporary = isNaN(parseInt(ref));
  return (0, _objectSpread2.default)({}, block, {
    id: isTemporary ? ref : +ref,
    isTemporary: isTemporary
  });
}, function (state, ref) {
  return [state.reusableBlocks.data[ref]];
});
/**
 * Returns whether or not the reusable block with the given ID is being saved.
 *
 * @param {Object} state Global application state.
 * @param {string} ref   The reusable block's ID.
 *
 * @return {boolean} Whether or not the reusable block is being saved.
 */


exports.__experimentalGetReusableBlock = __experimentalGetReusableBlock;

function __experimentalIsSavingReusableBlock(state, ref) {
  return state.reusableBlocks.isSaving[ref] || false;
}
/**
 * Returns true if the reusable block with the given ID is being fetched, or
 * false otherwise.
 *
 * @param {Object} state Global application state.
 * @param {string} ref   The reusable block's ID.
 *
 * @return {boolean} Whether the reusable block is being fetched.
 */


function __experimentalIsFetchingReusableBlock(state, ref) {
  return !!state.reusableBlocks.isFetching[ref];
}
/**
 * Returns an array of all reusable blocks.
 *
 * @param {Object} state Global application state.
 *
 * @return {Array} An array of all reusable blocks.
 */


var __experimentalGetReusableBlocks = (0, _rememo.default)(function (state) {
  return (0, _lodash.map)(state.reusableBlocks.data, function (value, ref) {
    return __experimentalGetReusableBlock(state, ref);
  });
}, function (state) {
  return [state.reusableBlocks.data];
});
/**
 * Returns state object prior to a specified optimist transaction ID, or `null`
 * if the transaction corresponding to the given ID cannot be found.
 *
 * @param {Object} state         Current global application state.
 * @param {Object} transactionId Optimist transaction ID.
 *
 * @return {Object} Global application state prior to transaction.
 */


exports.__experimentalGetReusableBlocks = __experimentalGetReusableBlocks;

function getStateBeforeOptimisticTransaction(state, transactionId) {
  var transaction = (0, _lodash.find)(state.optimist, function (entry) {
    return entry.beforeState && (0, _lodash.get)(entry.action, ['optimist', 'id']) === transactionId;
  });
  return transaction ? transaction.beforeState : null;
}
/**
 * Returns true if the post is being published, or false otherwise.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether post is being published.
 */


function isPublishingPost(state) {
  if (!isSavingPost(state)) {
    return false;
  } // Saving is optimistic, so assume that current post would be marked as
  // published if publishing


  if (!isCurrentPostPublished(state)) {
    return false;
  } // Use post update transaction ID to retrieve the state prior to the
  // optimistic transaction


  var stateBeforeRequest = getStateBeforeOptimisticTransaction(state, _constants.POST_UPDATE_TRANSACTION_ID); // Consider as publishing when current post prior to request was not
  // considered published

  return !!stateBeforeRequest && !isCurrentPostPublished(stateBeforeRequest);
}
/**
 * Returns whether the permalink is editable or not.
 *
 * @param {Object} state Editor state.
 *
 * @return {boolean} Whether or not the permalink is editable.
 */


function isPermalinkEditable(state) {
  var permalinkTemplate = getEditedPostAttribute(state, 'permalink_template');
  return _constants.PERMALINK_POSTNAME_REGEX.test(permalinkTemplate);
}
/**
 * Returns the permalink for the post.
 *
 * @param {Object} state Editor state.
 *
 * @return {?string} The permalink, or null if the post is not viewable.
 */


function getPermalink(state) {
  var permalinkParts = getPermalinkParts(state);

  if (!permalinkParts) {
    return null;
  }

  var prefix = permalinkParts.prefix,
      postName = permalinkParts.postName,
      suffix = permalinkParts.suffix;

  if (isPermalinkEditable(state)) {
    return prefix + postName + suffix;
  }

  return prefix;
}
/**
 * Returns the permalink for a post, split into it's three parts: the prefix,
 * the postName, and the suffix.
 *
 * @param {Object} state Editor state.
 *
 * @return {Object} An object containing the prefix, postName, and suffix for
 *                  the permalink, or null if the post is not viewable.
 */


function getPermalinkParts(state) {
  var permalinkTemplate = getEditedPostAttribute(state, 'permalink_template');

  if (!permalinkTemplate) {
    return null;
  }

  var postName = getEditedPostAttribute(state, 'slug') || getEditedPostAttribute(state, 'generated_slug');

  var _permalinkTemplate$sp = permalinkTemplate.split(_constants.PERMALINK_POSTNAME_REGEX),
      _permalinkTemplate$sp2 = (0, _slicedToArray2.default)(_permalinkTemplate$sp, 2),
      prefix = _permalinkTemplate$sp2[0],
      suffix = _permalinkTemplate$sp2[1];

  return {
    prefix: prefix,
    postName: postName,
    suffix: suffix
  };
}
/**
 * Returns true if an optimistic transaction is pending commit, for which the
 * before state satisfies the given predicate function.
 *
 * @param {Object}   state     Editor state.
 * @param {Function} predicate Function given state, returning true if match.
 *
 * @return {boolean} Whether predicate matches for some history.
 */


function inSomeHistory(state, predicate) {
  var optimist = state.optimist; // In recursion, optimist state won't exist. Assume exhausted options.

  if (!optimist) {
    return false;
  }

  return optimist.some(function (_ref) {
    var beforeState = _ref.beforeState;
    return beforeState && predicate(beforeState);
  });
}
/**
 * Returns whether the post is locked.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Is locked.
 */


function isPostLocked(state) {
  return state.postLock.isLocked;
}
/**
 * Returns whether post saving is locked.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Is locked.
 */


function isPostSavingLocked(state) {
  return Object.keys(state.postSavingLock).length > 0;
}
/**
 * Returns whether the edition of the post has been taken over.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Is post lock takeover.
 */


function isPostLockTakeover(state) {
  return state.postLock.isTakeover;
}
/**
 * Returns details about the post lock user.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} A user object.
 */


function getPostLockUser(state) {
  return state.postLock.user;
}
/**
 * Returns the active post lock.
 *
 * @param {Object} state Global application state.
 *
 * @return {Object} The lock object.
 */


function getActivePostLock(state) {
  return state.postLock.activePostLock;
}
/**
 * Returns whether or not the user has the unfiltered_html capability.
 *
 * @param {Object} state Editor state.
 *
 * @return {boolean} Whether the user can or can't post unfiltered HTML.
 */


function canUserUseUnfilteredHTML(state) {
  return (0, _lodash.has)(getCurrentPost(state), ['_links', 'wp:action-unfiltered-html']);
}
/**
 * Returns whether the pre-publish panel should be shown
 * or skipped when the user clicks the "publish" button.
 *
 * @param {Object} state Global application state.
 *
 * @return {boolean} Whether the pre-publish panel should be shown or not.
 */


function isPublishSidebarEnabled(state) {
  if (state.preferences.hasOwnProperty('isPublishSidebarEnabled')) {
    return state.preferences.isPublishSidebarEnabled;
  }

  return _defaults.PREFERENCES_DEFAULTS.isPublishSidebarEnabled;
}
/**
 * Return the current block list.
 *
 * @param {Object} state
 * @return {Array} Block list.
 */


function getEditorBlocks(state) {
  return state.editor.present.blocks.value;
}
/**
 * Is the editor ready
 *
 * @param {Object} state
 * @return {boolean} is Ready.
 */


function __unstableIsEditorReady(state) {
  return state.isReady;
}
/**
 * Returns the post editor settings.
 *
 * @param {Object} state Editor state.
 *
 * @return {Object} The editor settings object.
 */


function getEditorSettings(state) {
  return state.editorSettings;
}
/*
 * Backward compatibility
 */


function getBlockEditorSelector(name) {
  return (0, _data.createRegistrySelector)(function (select) {
    return function (state) {
      var _select;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (_select = select('core/block-editor'))[name].apply(_select, args);
    };
  });
}

var getBlockDependantsCacheBust = getBlockEditorSelector('getBlockDependantsCacheBust');
exports.getBlockDependantsCacheBust = getBlockDependantsCacheBust;
var getBlockName = getBlockEditorSelector('getBlockName');
exports.getBlockName = getBlockName;
var isBlockValid = getBlockEditorSelector('isBlockValid');
exports.isBlockValid = isBlockValid;
var getBlockAttributes = getBlockEditorSelector('getBlockAttributes');
exports.getBlockAttributes = getBlockAttributes;
var getBlock = getBlockEditorSelector('getBlock');
exports.getBlock = getBlock;
var getBlocks = getBlockEditorSelector('getBlocks');
exports.getBlocks = getBlocks;

var __unstableGetBlockWithoutInnerBlocks = getBlockEditorSelector('__unstableGetBlockWithoutInnerBlocks');

exports.__unstableGetBlockWithoutInnerBlocks = __unstableGetBlockWithoutInnerBlocks;
var getClientIdsOfDescendants = getBlockEditorSelector('getClientIdsOfDescendants');
exports.getClientIdsOfDescendants = getClientIdsOfDescendants;
var getClientIdsWithDescendants = getBlockEditorSelector('getClientIdsWithDescendants');
exports.getClientIdsWithDescendants = getClientIdsWithDescendants;
var getGlobalBlockCount = getBlockEditorSelector('getGlobalBlockCount');
exports.getGlobalBlockCount = getGlobalBlockCount;
var getBlocksByClientId = getBlockEditorSelector('getBlocksByClientId');
exports.getBlocksByClientId = getBlocksByClientId;
var getBlockCount = getBlockEditorSelector('getBlockCount');
exports.getBlockCount = getBlockCount;
var getBlockSelectionStart = getBlockEditorSelector('getBlockSelectionStart');
exports.getBlockSelectionStart = getBlockSelectionStart;
var getBlockSelectionEnd = getBlockEditorSelector('getBlockSelectionEnd');
exports.getBlockSelectionEnd = getBlockSelectionEnd;
var getSelectedBlockCount = getBlockEditorSelector('getSelectedBlockCount');
exports.getSelectedBlockCount = getSelectedBlockCount;
var hasSelectedBlock = getBlockEditorSelector('hasSelectedBlock');
exports.hasSelectedBlock = hasSelectedBlock;
var getSelectedBlockClientId = getBlockEditorSelector('getSelectedBlockClientId');
exports.getSelectedBlockClientId = getSelectedBlockClientId;
var getSelectedBlock = getBlockEditorSelector('getSelectedBlock');
exports.getSelectedBlock = getSelectedBlock;
var getBlockRootClientId = getBlockEditorSelector('getBlockRootClientId');
exports.getBlockRootClientId = getBlockRootClientId;
var getBlockHierarchyRootClientId = getBlockEditorSelector('getBlockHierarchyRootClientId');
exports.getBlockHierarchyRootClientId = getBlockHierarchyRootClientId;
var getAdjacentBlockClientId = getBlockEditorSelector('getAdjacentBlockClientId');
exports.getAdjacentBlockClientId = getAdjacentBlockClientId;
var getPreviousBlockClientId = getBlockEditorSelector('getPreviousBlockClientId');
exports.getPreviousBlockClientId = getPreviousBlockClientId;
var getNextBlockClientId = getBlockEditorSelector('getNextBlockClientId');
exports.getNextBlockClientId = getNextBlockClientId;
var getSelectedBlocksInitialCaretPosition = getBlockEditorSelector('getSelectedBlocksInitialCaretPosition');
exports.getSelectedBlocksInitialCaretPosition = getSelectedBlocksInitialCaretPosition;
var getMultiSelectedBlockClientIds = getBlockEditorSelector('getMultiSelectedBlockClientIds');
exports.getMultiSelectedBlockClientIds = getMultiSelectedBlockClientIds;
var getMultiSelectedBlocks = getBlockEditorSelector('getMultiSelectedBlocks');
exports.getMultiSelectedBlocks = getMultiSelectedBlocks;
var getFirstMultiSelectedBlockClientId = getBlockEditorSelector('getFirstMultiSelectedBlockClientId');
exports.getFirstMultiSelectedBlockClientId = getFirstMultiSelectedBlockClientId;
var getLastMultiSelectedBlockClientId = getBlockEditorSelector('getLastMultiSelectedBlockClientId');
exports.getLastMultiSelectedBlockClientId = getLastMultiSelectedBlockClientId;
var isFirstMultiSelectedBlock = getBlockEditorSelector('isFirstMultiSelectedBlock');
exports.isFirstMultiSelectedBlock = isFirstMultiSelectedBlock;
var isBlockMultiSelected = getBlockEditorSelector('isBlockMultiSelected');
exports.isBlockMultiSelected = isBlockMultiSelected;
var isAncestorMultiSelected = getBlockEditorSelector('isAncestorMultiSelected');
exports.isAncestorMultiSelected = isAncestorMultiSelected;
var getMultiSelectedBlocksStartClientId = getBlockEditorSelector('getMultiSelectedBlocksStartClientId');
exports.getMultiSelectedBlocksStartClientId = getMultiSelectedBlocksStartClientId;
var getMultiSelectedBlocksEndClientId = getBlockEditorSelector('getMultiSelectedBlocksEndClientId');
exports.getMultiSelectedBlocksEndClientId = getMultiSelectedBlocksEndClientId;
var getBlockOrder = getBlockEditorSelector('getBlockOrder');
exports.getBlockOrder = getBlockOrder;
var getBlockIndex = getBlockEditorSelector('getBlockIndex');
exports.getBlockIndex = getBlockIndex;
var isBlockSelected = getBlockEditorSelector('isBlockSelected');
exports.isBlockSelected = isBlockSelected;
var hasSelectedInnerBlock = getBlockEditorSelector('hasSelectedInnerBlock');
exports.hasSelectedInnerBlock = hasSelectedInnerBlock;
var isBlockWithinSelection = getBlockEditorSelector('isBlockWithinSelection');
exports.isBlockWithinSelection = isBlockWithinSelection;
var hasMultiSelection = getBlockEditorSelector('hasMultiSelection');
exports.hasMultiSelection = hasMultiSelection;
var isMultiSelecting = getBlockEditorSelector('isMultiSelecting');
exports.isMultiSelecting = isMultiSelecting;
var isSelectionEnabled = getBlockEditorSelector('isSelectionEnabled');
exports.isSelectionEnabled = isSelectionEnabled;
var getBlockMode = getBlockEditorSelector('getBlockMode');
exports.getBlockMode = getBlockMode;
var isTyping = getBlockEditorSelector('isTyping');
exports.isTyping = isTyping;
var isCaretWithinFormattedText = getBlockEditorSelector('isCaretWithinFormattedText');
exports.isCaretWithinFormattedText = isCaretWithinFormattedText;
var getBlockInsertionPoint = getBlockEditorSelector('getBlockInsertionPoint');
exports.getBlockInsertionPoint = getBlockInsertionPoint;
var isBlockInsertionPointVisible = getBlockEditorSelector('isBlockInsertionPointVisible');
exports.isBlockInsertionPointVisible = isBlockInsertionPointVisible;
var isValidTemplate = getBlockEditorSelector('isValidTemplate');
exports.isValidTemplate = isValidTemplate;
var getTemplate = getBlockEditorSelector('getTemplate');
exports.getTemplate = getTemplate;
var getTemplateLock = getBlockEditorSelector('getTemplateLock');
exports.getTemplateLock = getTemplateLock;
var canInsertBlockType = getBlockEditorSelector('canInsertBlockType');
exports.canInsertBlockType = canInsertBlockType;
var getInserterItems = getBlockEditorSelector('getInserterItems');
exports.getInserterItems = getInserterItems;
var hasInserterItems = getBlockEditorSelector('hasInserterItems');
exports.hasInserterItems = hasInserterItems;
var getBlockListSettings = getBlockEditorSelector('getBlockListSettings');
exports.getBlockListSettings = getBlockListSettings;
//# sourceMappingURL=selectors.js.map