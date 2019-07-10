import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop, get } from 'lodash';
/**
 * WordPress dependencies
 */

import { Button } from '@wordpress/components';
import { Component, createRef } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { DotTip } from '@wordpress/nux';
/**
 * Internal dependencies
 */

import PublishButtonLabel from './label';
export var PostPublishButton =
/*#__PURE__*/
function (_Component) {
  _inherits(PostPublishButton, _Component);

  function PostPublishButton(props) {
    var _this;

    _classCallCheck(this, PostPublishButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostPublishButton).call(this, props));
    _this.buttonNode = createRef();
    return _this;
  }

  _createClass(PostPublishButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.focusOnMount) {
        this.buttonNode.current.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          forceIsDirty = _this$props.forceIsDirty,
          forceIsSaving = _this$props.forceIsSaving,
          hasPublishAction = _this$props.hasPublishAction,
          isBeingScheduled = _this$props.isBeingScheduled,
          isOpen = _this$props.isOpen,
          isPostSavingLocked = _this$props.isPostSavingLocked,
          isPublishable = _this$props.isPublishable,
          isPublished = _this$props.isPublished,
          isSaveable = _this$props.isSaveable,
          isSaving = _this$props.isSaving,
          isToggle = _this$props.isToggle,
          onSave = _this$props.onSave,
          onStatusChange = _this$props.onStatusChange,
          _this$props$onSubmit = _this$props.onSubmit,
          onSubmit = _this$props$onSubmit === void 0 ? noop : _this$props$onSubmit,
          onToggle = _this$props.onToggle,
          visibility = _this$props.visibility;
      var isButtonDisabled = isSaving || forceIsSaving || !isSaveable || isPostSavingLocked || !isPublishable && !forceIsDirty;
      var isToggleDisabled = isPublished || isSaving || forceIsSaving || !isSaveable || !isPublishable && !forceIsDirty;
      var publishStatus;

      if (!hasPublishAction) {
        publishStatus = 'pending';
      } else if (isBeingScheduled) {
        publishStatus = 'future';
      } else if (visibility === 'private') {
        publishStatus = 'private';
      } else {
        publishStatus = 'publish';
      }

      var onClickButton = function onClickButton() {
        if (isButtonDisabled) {
          return;
        }

        onSubmit();
        onStatusChange(publishStatus);
        onSave();
      };

      var onClickToggle = function onClickToggle() {
        if (isToggleDisabled) {
          return;
        }

        onToggle();
      };

      var buttonProps = {
        'aria-disabled': isButtonDisabled,
        className: 'editor-post-publish-button',
        isBusy: isSaving && isPublished,
        isLarge: true,
        isPrimary: true,
        onClick: onClickButton
      };
      var toggleProps = {
        'aria-disabled': isToggleDisabled,
        'aria-expanded': isOpen,
        className: 'editor-post-publish-panel__toggle',
        isBusy: isSaving && isPublished,
        isPrimary: true,
        onClick: onClickToggle
      };
      var toggleChildren = isBeingScheduled ? __('Schedule…') : __('Publish…');
      var buttonChildren = createElement(PublishButtonLabel, {
        forceIsSaving: forceIsSaving
      });
      var componentProps = isToggle ? toggleProps : buttonProps;
      var componentChildren = isToggle ? toggleChildren : buttonChildren;
      return createElement(Button, _extends({
        ref: this.buttonNode
      }, componentProps), componentChildren, createElement(DotTip, {
        tipId: "core/editor.publish"
      }, __('Finished writing? That’s great, let’s get this published right now. Just click “Publish” and you’re good to go.')));
    }
  }]);

  return PostPublishButton;
}(Component);
export default compose([withSelect(function (select) {
  var _select = select('core/editor'),
      isSavingPost = _select.isSavingPost,
      isEditedPostBeingScheduled = _select.isEditedPostBeingScheduled,
      getEditedPostVisibility = _select.getEditedPostVisibility,
      isCurrentPostPublished = _select.isCurrentPostPublished,
      isEditedPostSaveable = _select.isEditedPostSaveable,
      isEditedPostPublishable = _select.isEditedPostPublishable,
      isPostSavingLocked = _select.isPostSavingLocked,
      getCurrentPost = _select.getCurrentPost,
      getCurrentPostType = _select.getCurrentPostType;

  return {
    isSaving: isSavingPost(),
    isBeingScheduled: isEditedPostBeingScheduled(),
    visibility: getEditedPostVisibility(),
    isSaveable: isEditedPostSaveable(),
    isPostSavingLocked: isPostSavingLocked(),
    isPublishable: isEditedPostPublishable(),
    isPublished: isCurrentPostPublished(),
    hasPublishAction: get(getCurrentPost(), ['_links', 'wp:action-publish'], false),
    postType: getCurrentPostType()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost,
      savePost = _dispatch.savePost;

  return {
    onStatusChange: function onStatusChange(status) {
      return editPost({
        status: status
      });
    },
    onSave: savePost
  };
})])(PostPublishButton);
//# sourceMappingURL=index.js.map