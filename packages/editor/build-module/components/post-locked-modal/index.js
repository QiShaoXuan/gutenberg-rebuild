import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { get } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, sprintf } from '@wordpress/i18n';
import { Modal, Button } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { addQueryArgs } from '@wordpress/url';
import { Component } from '@wordpress/element';
import { addAction, removeAction } from '@wordpress/hooks';
import { compose, withGlobalEvents, withInstanceId } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { getWPAdminURL } from '../../utils/url';
import PostPreviewButton from '../post-preview-button';

var PostLockedModal =
/*#__PURE__*/
function (_Component) {
  _inherits(PostLockedModal, _Component);

  function PostLockedModal() {
    var _this;

    _classCallCheck(this, PostLockedModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostLockedModal).apply(this, arguments));
    _this.sendPostLock = _this.sendPostLock.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.receivePostLock = _this.receivePostLock.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.releasePostLock = _this.releasePostLock.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(PostLockedModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var hookName = this.getHookName(); // Details on these events on the Heartbeat API docs
      // https://developer.wordpress.org/plugins/javascript/heartbeat-api/

      addAction('heartbeat.send', hookName, this.sendPostLock);
      addAction('heartbeat.tick', hookName, this.receivePostLock);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var hookName = this.getHookName();
      removeAction('heartbeat.send', hookName);
      removeAction('heartbeat.tick', hookName);
    }
    /**
     * Returns a `@wordpress/hooks` hook name specific to the instance of the
     * component.
     *
     * @return {string} Hook name prefix.
     */

  }, {
    key: "getHookName",
    value: function getHookName() {
      var instanceId = this.props.instanceId;
      return 'core/editor/post-locked-modal-' + instanceId;
    }
    /**
     * Keep the lock refreshed.
     *
     * When the user does not send a heartbeat in a heartbeat-tick
     * the user is no longer editing and another user can start editing.
     *
     * @param {Object} data Data to send in the heartbeat request.
     */

  }, {
    key: "sendPostLock",
    value: function sendPostLock(data) {
      var _this$props = this.props,
          isLocked = _this$props.isLocked,
          activePostLock = _this$props.activePostLock,
          postId = _this$props.postId;

      if (isLocked) {
        return;
      }

      data['wp-refresh-post-lock'] = {
        lock: activePostLock,
        post_id: postId
      };
    }
    /**
     * Refresh post locks: update the lock string or show the dialog if somebody has taken over editing.
     *
     * @param {Object} data Data received in the heartbeat request
     */

  }, {
    key: "receivePostLock",
    value: function receivePostLock(data) {
      if (!data['wp-refresh-post-lock']) {
        return;
      }

      var _this$props2 = this.props,
          autosave = _this$props2.autosave,
          updatePostLock = _this$props2.updatePostLock;
      var received = data['wp-refresh-post-lock'];

      if (received.lock_error) {
        // Auto save and display the takeover modal.
        autosave();
        updatePostLock({
          isLocked: true,
          isTakeover: true,
          user: {
            avatar: received.lock_error.avatar_src
          }
        });
      } else if (received.new_lock) {
        updatePostLock({
          isLocked: false,
          activePostLock: received.new_lock
        });
      }
    }
    /**
     * Unlock the post before the window is exited.
     */

  }, {
    key: "releasePostLock",
    value: function releasePostLock() {
      var _this$props3 = this.props,
          isLocked = _this$props3.isLocked,
          activePostLock = _this$props3.activePostLock,
          postLockUtils = _this$props3.postLockUtils,
          postId = _this$props3.postId;

      if (isLocked || !activePostLock) {
        return;
      }

      var data = new window.FormData();
      data.append('action', 'wp-remove-post-lock');
      data.append('_wpnonce', postLockUtils.unlockNonce);
      data.append('post_ID', postId);
      data.append('active_post_lock', activePostLock);
      var xhr = new window.XMLHttpRequest();
      xhr.open('POST', postLockUtils.ajaxUrl, false);
      xhr.send(data);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          user = _this$props4.user,
          postId = _this$props4.postId,
          isLocked = _this$props4.isLocked,
          isTakeover = _this$props4.isTakeover,
          postLockUtils = _this$props4.postLockUtils,
          postType = _this$props4.postType;

      if (!isLocked) {
        return null;
      }

      var userDisplayName = user.name;
      var userAvatar = user.avatar;
      var unlockUrl = addQueryArgs('post.php', {
        'get-post-lock': '1',
        lockKey: true,
        post: postId,
        action: 'edit',
        _wpnonce: postLockUtils.nonce
      });
      var allPostsUrl = getWPAdminURL('edit.php', {
        post_type: get(postType, ['slug'])
      });

      var allPostsLabel = __('Exit the Editor');

      return createElement(Modal, {
        title: isTakeover ? __('Someone else has taken over this post.') : __('This post is already being edited.'),
        focusOnMount: true,
        shouldCloseOnClickOutside: false,
        shouldCloseOnEsc: false,
        isDismissable: false,
        className: "editor-post-locked-modal"
      }, !!userAvatar && createElement("img", {
        src: userAvatar,
        alt: __('Avatar'),
        className: "editor-post-locked-modal__avatar"
      }), !!isTakeover && createElement("div", null, createElement("div", null, userDisplayName ? sprintf(
      /* translators: %s: user's display name */
      __('%s now has editing control of this post. Don’t worry, your changes up to this moment have been saved.'), userDisplayName) : __('Another user now has editing control of this post. Don’t worry, your changes up to this moment have been saved.')), createElement("div", {
        className: "editor-post-locked-modal__buttons"
      }, createElement(Button, {
        isPrimary: true,
        isLarge: true,
        href: allPostsUrl
      }, allPostsLabel))), !isTakeover && createElement("div", null, createElement("div", null, userDisplayName ? sprintf(
      /* translators: %s: user's display name */
      __('%s is currently working on this post, which means you cannot make changes, unless you take over.'), userDisplayName) : __('Another user is currently working on this post, which means you cannot make changes, unless you take over.')), createElement("div", {
        className: "editor-post-locked-modal__buttons"
      }, createElement(Button, {
        isDefault: true,
        isLarge: true,
        href: allPostsUrl
      }, allPostsLabel), createElement(PostPreviewButton, null), createElement(Button, {
        isPrimary: true,
        isLarge: true,
        href: unlockUrl
      }, __('Take Over')))));
    }
  }]);

  return PostLockedModal;
}(Component);

export default compose(withSelect(function (select) {
  var _select = select('core/editor'),
      isPostLocked = _select.isPostLocked,
      isPostLockTakeover = _select.isPostLockTakeover,
      getPostLockUser = _select.getPostLockUser,
      getCurrentPostId = _select.getCurrentPostId,
      getActivePostLock = _select.getActivePostLock,
      getEditedPostAttribute = _select.getEditedPostAttribute,
      getEditorSettings = _select.getEditorSettings;

  var _select2 = select('core'),
      getPostType = _select2.getPostType;

  return {
    isLocked: isPostLocked(),
    isTakeover: isPostLockTakeover(),
    user: getPostLockUser(),
    postId: getCurrentPostId(),
    postLockUtils: getEditorSettings().postLockUtils,
    activePostLock: getActivePostLock(),
    postType: getPostType(getEditedPostAttribute('type'))
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      autosave = _dispatch.autosave,
      updatePostLock = _dispatch.updatePostLock;

  return {
    autosave: autosave,
    updatePostLock: updatePostLock
  };
}), withInstanceId, withGlobalEvents({
  beforeunload: 'releasePostLock'
}))(PostLockedModal);
//# sourceMappingURL=index.js.map