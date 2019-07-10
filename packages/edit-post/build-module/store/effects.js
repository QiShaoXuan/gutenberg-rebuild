import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

/**
 * External dependencies
 */
import { reduce } from 'lodash';
/**
 * WordPress dependencies
 */

import { select, subscribe, dispatch } from '@wordpress/data';
import { speak } from '@wordpress/a11y';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
/**
 * Internal dependencies
 */

import { metaBoxUpdatesSuccess, requestMetaBoxUpdates, openGeneralSidebar, closeGeneralSidebar } from './actions';
import { getActiveMetaBoxLocations, getActiveGeneralSidebarName } from './selectors';
import { getMetaBoxContainer } from '../utils/meta-boxes';
import { onChangeListener } from './utils';
var VIEW_AS_LINK_SELECTOR = '#wp-admin-bar-view a';
var effects = {
  SET_META_BOXES_PER_LOCATIONS: function SET_META_BOXES_PER_LOCATIONS(action, store) {
    // Allow toggling metaboxes panels
    // We need to wait for all scripts to load
    // If the meta box loads the post script, it will already trigger this.
    // After merge in Core, make sure to drop the timeout and update the postboxes script
    // to avoid the double binding.
    setTimeout(function () {
      var postType = select('core/editor').getCurrentPostType();

      if (window.postboxes.page !== postType) {
        window.postboxes.add_postbox_toggles(postType);
      }
    });
    var wasSavingPost = select('core/editor').isSavingPost();
    var wasAutosavingPost = select('core/editor').isAutosavingPost();
    var wasPreviewingPost = select('core/editor').isPreviewingPost(); // Save metaboxes when performing a full save on the post.

    subscribe(function () {
      var isSavingPost = select('core/editor').isSavingPost();
      var isAutosavingPost = select('core/editor').isAutosavingPost();
      var isPreviewingPost = select('core/editor').isPreviewingPost();
      var hasActiveMetaBoxes = select('core/edit-post').hasMetaBoxes(); // Save metaboxes on save completion, except for autosaves that are not a post preview.

      var shouldTriggerMetaboxesSave = hasActiveMetaBoxes && (wasSavingPost && !isSavingPost && !wasAutosavingPost || wasAutosavingPost && wasPreviewingPost && !isPreviewingPost); // Save current state for next inspection.

      wasSavingPost = isSavingPost;
      wasAutosavingPost = isAutosavingPost;
      wasPreviewingPost = isPreviewingPost;

      if (shouldTriggerMetaboxesSave) {
        store.dispatch(requestMetaBoxUpdates());
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

    var post = select('core/editor').getCurrentPost(state);
    var additionalData = [post.comment_status ? ['comment_status', post.comment_status] : false, post.ping_status ? ['ping_status', post.ping_status] : false, post.sticky ? ['sticky', post.sticky] : false, ['post_author', post.author]].filter(Boolean); // We gather all the metaboxes locations data and the base form data

    var baseFormData = new window.FormData(document.querySelector('.metabox-base-form'));
    var formDataToMerge = [baseFormData].concat(_toConsumableArray(getActiveMetaBoxLocations(state).map(function (location) {
      return new window.FormData(getMetaBoxContainer(location));
    }))); // Merge all form data objects into a single one.

    var formData = reduce(formDataToMerge, function (memo, currentFormData) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = currentFormData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
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
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return formData.append(key, value);
    }); // Save the metaboxes

    apiFetch({
      url: window._wpMetaBoxUrl,
      method: 'POST',
      body: formData,
      parse: false
    }).then(function () {
      return store.dispatch(metaBoxUpdatesSuccess());
    });
  },
  SWITCH_MODE: function SWITCH_MODE(action) {
    // Unselect blocks when we switch to the code editor.
    if (action.mode !== 'visual') {
      dispatch('core/block-editor').clearSelectedBlock();
    }

    var message = action.mode === 'visual' ? __('Visual editor selected') : __('Code editor selected');
    speak(message, 'assertive');
  },
  INIT: function INIT(_, store) {
    // Select the block settings tab when the selected block changes
    subscribe(onChangeListener(function () {
      return !!select('core/block-editor').getBlockSelectionStart();
    }, function (hasBlockSelection) {
      if (!select('core/edit-post').isEditorSidebarOpened()) {
        return;
      }

      if (hasBlockSelection) {
        store.dispatch(openGeneralSidebar('edit-post/block'));
      } else {
        store.dispatch(openGeneralSidebar('edit-post/document'));
      }
    }));

    var isMobileViewPort = function isMobileViewPort() {
      return select('core/viewport').isViewportMatch('< medium');
    };

    var adjustSidebar = function () {
      // contains the sidebar we close when going to viewport sizes lower than medium.
      // This allows to reopen it when going again to viewport sizes greater than medium.
      var sidebarToReOpenOnExpand = null;
      return function (isSmall) {
        if (isSmall) {
          sidebarToReOpenOnExpand = getActiveGeneralSidebarName(store.getState());

          if (sidebarToReOpenOnExpand) {
            store.dispatch(closeGeneralSidebar());
          }
        } else if (sidebarToReOpenOnExpand && !getActiveGeneralSidebarName(store.getState())) {
          store.dispatch(openGeneralSidebar(sidebarToReOpenOnExpand));
        }
      };
    }();

    adjustSidebar(isMobileViewPort()); // Collapse sidebar when viewport shrinks.
    // Reopen sidebar it if viewport expands and it was closed because of a previous shrink.

    subscribe(onChangeListener(isMobileViewPort, adjustSidebar)); // Update View as link when currentPost link changes

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

    subscribe(onChangeListener(function () {
      return select('core/editor').getCurrentPost().link;
    }, updateViewAsLink));
  }
};
export default effects;
//# sourceMappingURL=effects.js.map