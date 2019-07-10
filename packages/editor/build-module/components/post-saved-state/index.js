import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { get } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Dashicon, Button, IconButton } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { displayShortcut } from '@wordpress/keycodes';
import { withSafeTimeout, compose } from '@wordpress/compose';
import { withViewportMatch } from '@wordpress/viewport';
/**
 * Internal dependencies
 */

import PostSwitchToDraftButton from '../post-switch-to-draft-button';
/**
 * Component showing whether the post is saved or not and displaying save links.
 *
 * @param   {Object}    Props Component Props.
 */

export var PostSavedState =
/*#__PURE__*/
function (_Component) {
  _inherits(PostSavedState, _Component);

  function PostSavedState() {
    var _this;

    _classCallCheck(this, PostSavedState);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostSavedState).apply(this, arguments));
    _this.state = {
      forceSavedMessage: false
    };
    return _this;
  }

  _createClass(PostSavedState, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      if (prevProps.isSaving && !this.props.isSaving) {
        this.setState({
          forceSavedMessage: true
        });
        this.props.setTimeout(function () {
          _this2.setState({
            forceSavedMessage: false
          });
        }, 1000);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          post = _this$props.post,
          isNew = _this$props.isNew,
          isScheduled = _this$props.isScheduled,
          isPublished = _this$props.isPublished,
          isDirty = _this$props.isDirty,
          isSaving = _this$props.isSaving,
          isSaveable = _this$props.isSaveable,
          onSave = _this$props.onSave,
          isAutosaving = _this$props.isAutosaving,
          isPending = _this$props.isPending,
          isLargeViewport = _this$props.isLargeViewport;
      var forceSavedMessage = this.state.forceSavedMessage;

      if (isSaving) {
        // TODO: Classes generation should be common across all return
        // paths of this function, including proper naming convention for
        // the "Save Draft" button.
        var classes = classnames('editor-post-saved-state', 'is-saving', {
          'is-autosaving': isAutosaving
        });
        return createElement("span", {
          className: classes
        }, createElement(Dashicon, {
          icon: "cloud"
        }), isAutosaving ? __('Autosaving') : __('Saving'));
      }

      if (isPublished || isScheduled) {
        return createElement(PostSwitchToDraftButton, null);
      }

      if (!isSaveable) {
        return null;
      }

      if (forceSavedMessage || !isNew && !isDirty) {
        return createElement("span", {
          className: "editor-post-saved-state is-saved"
        }, createElement(Dashicon, {
          icon: "saved"
        }), __('Saved'));
      } // Once the post has been submitted for review this button
      // is not needed for the contributor role.


      var hasPublishAction = get(post, ['_links', 'wp:action-publish'], false);

      if (!hasPublishAction && isPending) {
        return null;
      }

      var label = isPending ? __('Save as Pending') : __('Save Draft');

      if (!isLargeViewport) {
        return createElement(IconButton, {
          className: "editor-post-save-draft",
          label: label,
          onClick: onSave,
          shortcut: displayShortcut.primary('s'),
          icon: "cloud-upload"
        });
      }

      return createElement(Button, {
        className: "editor-post-save-draft",
        onClick: onSave,
        shortcut: displayShortcut.primary('s'),
        isTertiary: true
      }, label);
    }
  }]);

  return PostSavedState;
}(Component);
export default compose([withSelect(function (select, _ref) {
  var forceIsDirty = _ref.forceIsDirty,
      forceIsSaving = _ref.forceIsSaving;

  var _select = select('core/editor'),
      isEditedPostNew = _select.isEditedPostNew,
      isCurrentPostPublished = _select.isCurrentPostPublished,
      isCurrentPostScheduled = _select.isCurrentPostScheduled,
      isEditedPostDirty = _select.isEditedPostDirty,
      isSavingPost = _select.isSavingPost,
      isEditedPostSaveable = _select.isEditedPostSaveable,
      getCurrentPost = _select.getCurrentPost,
      isAutosavingPost = _select.isAutosavingPost,
      getEditedPostAttribute = _select.getEditedPostAttribute;

  return {
    post: getCurrentPost(),
    isNew: isEditedPostNew(),
    isPublished: isCurrentPostPublished(),
    isScheduled: isCurrentPostScheduled(),
    isDirty: forceIsDirty || isEditedPostDirty(),
    isSaving: forceIsSaving || isSavingPost(),
    isSaveable: isEditedPostSaveable(),
    isAutosaving: isAutosavingPost(),
    isPending: 'pending' === getEditedPostAttribute('status')
  };
}), withDispatch(function (dispatch) {
  return {
    onSave: dispatch('core/editor').savePost
  };
}), withSafeTimeout, withViewportMatch({
  isLargeViewport: 'medium'
})])(PostSavedState);
//# sourceMappingURL=index.js.map