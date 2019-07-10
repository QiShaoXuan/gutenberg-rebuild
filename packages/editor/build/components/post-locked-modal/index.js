"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _url = require("@wordpress/url");

var _hooks = require("@wordpress/hooks");

var _compose = require("@wordpress/compose");

var _url2 = require("../../utils/url");

var _postPreviewButton = _interopRequireDefault(require("../post-preview-button"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var PostLockedModal =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PostLockedModal, _Component);

  function PostLockedModal() {
    var _this;

    (0, _classCallCheck2.default)(this, PostLockedModal);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PostLockedModal).apply(this, arguments));
    _this.sendPostLock = _this.sendPostLock.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.receivePostLock = _this.receivePostLock.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.releasePostLock = _this.releasePostLock.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(PostLockedModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var hookName = this.getHookName(); // Details on these events on the Heartbeat API docs
      // https://developer.wordpress.org/plugins/javascript/heartbeat-api/

      (0, _hooks.addAction)('heartbeat.send', hookName, this.sendPostLock);
      (0, _hooks.addAction)('heartbeat.tick', hookName, this.receivePostLock);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var hookName = this.getHookName();
      (0, _hooks.removeAction)('heartbeat.send', hookName);
      (0, _hooks.removeAction)('heartbeat.tick', hookName);
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
      var unlockUrl = (0, _url.addQueryArgs)('post.php', {
        'get-post-lock': '1',
        lockKey: true,
        post: postId,
        action: 'edit',
        _wpnonce: postLockUtils.nonce
      });
      var allPostsUrl = (0, _url2.getWPAdminURL)('edit.php', {
        post_type: (0, _lodash.get)(postType, ['slug'])
      });
      var allPostsLabel = (0, _i18n.__)('Exit the Editor');
      return (0, _element.createElement)(_components.Modal, {
        title: isTakeover ? (0, _i18n.__)('Someone else has taken over this post.') : (0, _i18n.__)('This post is already being edited.'),
        focusOnMount: true,
        shouldCloseOnClickOutside: false,
        shouldCloseOnEsc: false,
        isDismissable: false,
        className: "editor-post-locked-modal"
      }, !!userAvatar && (0, _element.createElement)("img", {
        src: userAvatar,
        alt: (0, _i18n.__)('Avatar'),
        className: "editor-post-locked-modal__avatar"
      }), !!isTakeover && (0, _element.createElement)("div", null, (0, _element.createElement)("div", null, userDisplayName ? (0, _i18n.sprintf)(
      /* translators: %s: user's display name */
      (0, _i18n.__)('%s now has editing control of this post. Don’t worry, your changes up to this moment have been saved.'), userDisplayName) : (0, _i18n.__)('Another user now has editing control of this post. Don’t worry, your changes up to this moment have been saved.')), (0, _element.createElement)("div", {
        className: "editor-post-locked-modal__buttons"
      }, (0, _element.createElement)(_components.Button, {
        isPrimary: true,
        isLarge: true,
        href: allPostsUrl
      }, allPostsLabel))), !isTakeover && (0, _element.createElement)("div", null, (0, _element.createElement)("div", null, userDisplayName ? (0, _i18n.sprintf)(
      /* translators: %s: user's display name */
      (0, _i18n.__)('%s is currently working on this post, which means you cannot make changes, unless you take over.'), userDisplayName) : (0, _i18n.__)('Another user is currently working on this post, which means you cannot make changes, unless you take over.')), (0, _element.createElement)("div", {
        className: "editor-post-locked-modal__buttons"
      }, (0, _element.createElement)(_components.Button, {
        isDefault: true,
        isLarge: true,
        href: allPostsUrl
      }, allPostsLabel), (0, _element.createElement)(_postPreviewButton.default, null), (0, _element.createElement)(_components.Button, {
        isPrimary: true,
        isLarge: true,
        href: unlockUrl
      }, (0, _i18n.__)('Take Over')))));
    }
  }]);
  return PostLockedModal;
}(_element.Component);

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
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
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      autosave = _dispatch.autosave,
      updatePostLock = _dispatch.updatePostLock;

  return {
    autosave: autosave,
    updatePostLock: updatePostLock
  };
}), _compose.withInstanceId, (0, _compose.withGlobalEvents)({
  beforeunload: 'releasePostLock'
}))(PostLockedModal);

exports.default = _default;
//# sourceMappingURL=index.js.map