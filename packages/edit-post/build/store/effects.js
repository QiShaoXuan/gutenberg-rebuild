"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _a11y = require("@wordpress/a11y");

var _i18n = require("@wordpress/i18n");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _actions = require("./actions");

var _selectors = require("./selectors");

var _metaBoxes = require("../utils/meta-boxes");

var _utils = require("./utils");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var VIEW_AS_LINK_SELECTOR = '#wp-admin-bar-view a';
var effects = {
  SET_META_BOXES_PER_LOCATIONS: function SET_META_BOXES_PER_LOCATIONS(action, store) {
    // Allow toggling metaboxes panels
    // We need to wait for all scripts to load
    // If the meta box loads the post script, it will already trigger this.
    // After merge in Core, make sure to drop the timeout and update the postboxes script
    // to avoid the double binding.
    setTimeout(function () {
      var postType = (0, _data.select)('core/editor').getCurrentPostType();

      if (window.postboxes.page !== postType) {
        window.postboxes.add_postbox_toggles(postType);
      }
    });
    var wasSavingPost = (0, _data.select)('core/editor').isSavingPost();
    var wasAutosavingPost = (0, _data.select)('core/editor').isAutosavingPost();
    var wasPreviewingPost = (0, _data.select)('core/editor').isPreviewingPost(); // Save metaboxes when performing a full save on the post.

    (0, _data.subscribe)(function () {
      var isSavingPost = (0, _data.select)('core/editor').isSavingPost();
      var isAutosavingPost = (0, _data.select)('core/editor').isAutosavingPost();
      var isPreviewingPost = (0, _data.select)('core/editor').isPreviewingPost();
      var hasActiveMetaBoxes = (0, _data.select)('core/edit-post').hasMetaBoxes(); // Save metaboxes on save completion, except for autosaves that are not a post preview.

      var shouldTriggerMetaboxesSave = hasActiveMetaBoxes && (wasSavingPost && !isSavingPost && !wasAutosavingPost || wasAutosavingPost && wasPreviewingPost && !isPreviewingPost); // Save current state for next inspection.

      wasSavingPost = isSavingPost;
      wasAutosavingPost = isAutosavingPost;
      wasPreviewingPost = isPreviewingPost;

      if (shouldTriggerMetaboxesSave) {
        store.dispatch((0, _actions.requestMetaBoxUpdates)());
      }
    });
  },
  REQUEST_META_BOX_UPDATES: function REQUEST_META_BOX_UPDATES(action, store) {
    // Saves the wp_editor fields
    if (window.tinyMCE) {
      window.tinyMCE.triggerSave();
    }

    var state = store.getState(); // Additional data needed for backward compatibility.
    // If we do not provide this data, the post will be overridden with the default values.

    var post = (0, _data.select)('core/editor').getCurrentPost(state);
    var additionalData = [post.comment_status ? ['comment_status', post.comment_status] : false, post.ping_status ? ['ping_status', post.ping_status] : false, post.sticky ? ['sticky', post.sticky] : false, ['post_author', post.author]].filter(Boolean); // We gather all the metaboxes locations data and the base form data

    var baseFormData = new window.FormData(document.querySelector('.metabox-base-form'));
    var formDataToMerge = [baseFormData].concat((0, _toConsumableArray2.default)((0, _selectors.getActiveMetaBoxLocations)(state).map(function (location) {
      return new window.FormData((0, _metaBoxes.getMetaBoxContainer)(location));
    }))); // Merge all form data objects into a single one.

    var formData = (0, _lodash.reduce)(formDataToMerge, function (memo, currentFormData) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = currentFormData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray2.default)(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          memo.append(key, value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return memo;
    }, new window.FormData());
    additionalData.forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return formData.append(key, value);
    }); // Save the metaboxes

    (0, _apiFetch.default)({
      url: window._wpMetaBoxUrl,
      method: 'POST',
      body: formData,
      parse: false
    }).then(function () {
      return store.dispatch((0, _actions.metaBoxUpdatesSuccess)());
    });
  },
  SWITCH_MODE: function SWITCH_MODE(action) {
    // Unselect blocks when we switch to the code editor.
    if (action.mode !== 'visual') {
      (0, _data.dispatch)('core/block-editor').clearSelectedBlock();
    }

    var message = action.mode === 'visual' ? (0, _i18n.__)('Visual editor selected') : (0, _i18n.__)('Code editor selected');
    (0, _a11y.speak)(message, 'assertive');
  },
  INIT: function INIT(_, store) {
    // Select the block settings tab when the selected block changes
    (0, _data.subscribe)((0, _utils.onChangeListener)(function () {
      return !!(0, _data.select)('core/block-editor').getBlockSelectionStart();
    }, function (hasBlockSelection) {
      if (!(0, _data.select)('core/edit-post').isEditorSidebarOpened()) {
        return;
      }

      if (hasBlockSelection) {
        store.dispatch((0, _actions.openGeneralSidebar)('edit-post/block'));
      } else {
        store.dispatch((0, _actions.openGeneralSidebar)('edit-post/document'));
      }
    }));

    var isMobileViewPort = function isMobileViewPort() {
      return (0, _data.select)('core/viewport').isViewportMatch('< medium');
    };

    var adjustSidebar = function () {
      // contains the sidebar we close when going to viewport sizes lower than medium.
      // This allows to reopen it when going again to viewport sizes greater than medium.
      var sidebarToReOpenOnExpand = null;
      return function (isSmall) {
        if (isSmall) {
          sidebarToReOpenOnExpand = (0, _selectors.getActiveGeneralSidebarName)(store.getState());

          if (sidebarToReOpenOnExpand) {
            store.dispatch((0, _actions.closeGeneralSidebar)());
          }
        } else if (sidebarToReOpenOnExpand && !(0, _selectors.getActiveGeneralSidebarName)(store.getState())) {
          store.dispatch((0, _actions.openGeneralSidebar)(sidebarToReOpenOnExpand));
        }
      };
    }();

    adjustSidebar(isMobileViewPort()); // Collapse sidebar when viewport shrinks.
    // Reopen sidebar it if viewport expands and it was closed because of a previous shrink.

    (0, _data.subscribe)((0, _utils.onChangeListener)(isMobileViewPort, adjustSidebar)); // Update View as link when currentPost link changes

    var updateViewAsLink = function updateViewAsLink(newPermalink) {
      if (!newPermalink) {
        return;
      }

      var nodeToUpdate = document.querySelector(VIEW_AS_LINK_SELECTOR);

      if (!nodeToUpdate) {
        return;
      }

      nodeToUpdate.setAttribute('href', newPermalink);
    };

    (0, _data.subscribe)((0, _utils.onChangeListener)(function () {
      return (0, _data.select)('core/editor').getCurrentPost().link;
    }, updateViewAsLink));
  }
};
var _default = effects;
exports.default = _default;
//# sourceMappingURL=effects.js.map