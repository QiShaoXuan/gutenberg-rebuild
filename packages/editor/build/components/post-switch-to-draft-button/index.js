"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

/**
 * WordPress dependencies
 */
function PostSwitchToDraftButton(_ref) {
  var isSaving = _ref.isSaving,
      isPublished = _ref.isPublished,
      isScheduled = _ref.isScheduled,
      onClick = _ref.onClick;

  if (!isPublished && !isScheduled) {
    return null;
  }

  var onSwitch = function onSwitch() {
    var alertMessage;

    if (isPublished) {
      alertMessage = (0, _i18n.__)('Are you sure you want to unpublish this post?');
    } else if (isScheduled) {
      alertMessage = (0, _i18n.__)('Are you sure you want to unschedule this post?');
    } // eslint-disable-next-line no-alert


    if (window.confirm(alertMessage)) {
      onClick();
    }
  };

  return (0, _element.createElement)(_components.Button, {
    className: "editor-post-switch-to-draft",
    onClick: onSwitch,
    disabled: isSaving,
    isTertiary: true
  }, (0, _i18n.__)('Switch to Draft'));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      isSavingPost = _select.isSavingPost,
      isCurrentPostPublished = _select.isCurrentPostPublished,
      isCurrentPostScheduled = _select.isCurrentPostScheduled;

  return {
    isSaving: isSavingPost(),
    isPublished: isCurrentPostPublished(),
    isScheduled: isCurrentPostScheduled()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost,
      savePost = _dispatch.savePost;

  return {
    onClick: function onClick() {
      editPost({
        status: 'draft'
      });
      savePost();
    }
  };
})])(PostSwitchToDraftButton);

exports.default = _default;
//# sourceMappingURL=index.js.map