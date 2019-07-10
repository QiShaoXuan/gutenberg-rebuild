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
import Textarea from 'react-autosize-textarea';
import classnames from 'classnames';
import { get } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { ENTER } from '@wordpress/keycodes';
import { withSelect, withDispatch } from '@wordpress/data';
import { KeyboardShortcuts, withFocusOutside } from '@wordpress/components';
import { withInstanceId, compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import PostPermalink from '../post-permalink';
import PostTypeSupportCheck from '../post-type-support-check';
/**
 * Constants
 */

var REGEXP_NEWLINES = /[\r\n]+/g;

var PostTitle =
/*#__PURE__*/
function (_Component) {
  _inherits(PostTitle, _Component);

  function PostTitle() {
    var _this;

    _classCallCheck(this, PostTitle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostTitle).apply(this, arguments));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSelect = _this.onSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onUnselect = _this.onUnselect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.redirectHistory = _this.redirectHistory.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      isSelected: false
    };
    return _this;
  }

  _createClass(PostTitle, [{
    key: "handleFocusOutside",
    value: function handleFocusOutside() {
      this.onUnselect();
    }
  }, {
    key: "onSelect",
    value: function onSelect() {
      this.setState({
        isSelected: true
      });
      this.props.clearSelectedBlock();
    }
  }, {
    key: "onUnselect",
    value: function onUnselect() {
      this.setState({
        isSelected: false
      });
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      var newTitle = event.target.value.replace(REGEXP_NEWLINES, ' ');
      this.props.onUpdate(newTitle);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.keyCode === ENTER) {
        event.preventDefault();
        this.props.onEnterPress();
      }
    }
    /**
     * Emulates behavior of an undo or redo on its corresponding key press
     * combination. This is a workaround to React's treatment of undo in a
     * controlled textarea where characters are updated one at a time.
     * Instead, leverage the store's undo handling of title changes.
     *
     * @see https://github.com/facebook/react/issues/8514
     *
     * @param {KeyboardEvent} event Key event.
     */

  }, {
    key: "redirectHistory",
    value: function redirectHistory(event) {
      if (event.shiftKey) {
        this.props.onRedo();
      } else {
        this.props.onUndo();
      }

      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          hasFixedToolbar = _this$props.hasFixedToolbar,
          isCleanNewPost = _this$props.isCleanNewPost,
          isFocusMode = _this$props.isFocusMode,
          isPostTypeViewable = _this$props.isPostTypeViewable,
          instanceId = _this$props.instanceId,
          placeholder = _this$props.placeholder,
          title = _this$props.title;
      var isSelected = this.state.isSelected; // The wp-block className is important for editor styles.

      var className = classnames('wp-block editor-post-title__block', {
        'is-selected': isSelected,
        'is-focus-mode': isFocusMode,
        'has-fixed-toolbar': hasFixedToolbar
      });
      var decodedPlaceholder = decodeEntities(placeholder);
      return createElement(PostTypeSupportCheck, {
        supportKeys: "title"
      }, createElement("div", {
        className: "editor-post-title"
      }, createElement("div", {
        className: className
      }, createElement(KeyboardShortcuts, {
        shortcuts: {
          'mod+z': this.redirectHistory,
          'mod+shift+z': this.redirectHistory
        }
      }, createElement("label", {
        htmlFor: "post-title-".concat(instanceId),
        className: "screen-reader-text"
      }, decodedPlaceholder || __('Add title')), createElement(Textarea, {
        id: "post-title-".concat(instanceId),
        className: "editor-post-title__input",
        value: title,
        onChange: this.onChange,
        placeholder: decodedPlaceholder || __('Add title'),
        onFocus: this.onSelect,
        onKeyDown: this.onKeyDown,
        onKeyPress: this.onUnselect
        /*
        	Only autofocus the title when the post is entirely empty.
        	This should only happen for a new post, which means we
        	focus the title on new post so the author can start typing
        	right away, without needing to click anything.
        */

        /* eslint-disable jsx-a11y/no-autofocus */
        ,
        autoFocus: isCleanNewPost
        /* eslint-enable jsx-a11y/no-autofocus */

      })), isSelected && isPostTypeViewable && createElement(PostPermalink, null))));
    }
  }]);

  return PostTitle;
}(Component);

var applyWithSelect = withSelect(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute,
      isCleanNewPost = _select.isCleanNewPost;

  var _select2 = select('core/block-editor'),
      getSettings = _select2.getSettings;

  var _select3 = select('core'),
      getPostType = _select3.getPostType;

  var postType = getPostType(getEditedPostAttribute('type'));

  var _getSettings = getSettings(),
      titlePlaceholder = _getSettings.titlePlaceholder,
      focusMode = _getSettings.focusMode,
      hasFixedToolbar = _getSettings.hasFixedToolbar;

  return {
    isCleanNewPost: isCleanNewPost(),
    title: getEditedPostAttribute('title'),
    isPostTypeViewable: get(postType, ['viewable'], false),
    placeholder: titlePlaceholder,
    isFocusMode: focusMode,
    hasFixedToolbar: hasFixedToolbar
  };
});
var applyWithDispatch = withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      insertDefaultBlock = _dispatch.insertDefaultBlock,
      clearSelectedBlock = _dispatch.clearSelectedBlock;

  var _dispatch2 = dispatch('core/editor'),
      editPost = _dispatch2.editPost,
      undo = _dispatch2.undo,
      redo = _dispatch2.redo;

  return {
    onEnterPress: function onEnterPress() {
      insertDefaultBlock(undefined, undefined, 0);
    },
    onUpdate: function onUpdate(title) {
      editPost({
        title: title
      });
    },
    onUndo: undo,
    onRedo: redo,
    clearSelectedBlock: clearSelectedBlock
  };
});
export default compose(applyWithSelect, applyWithDispatch, withInstanceId, withFocusOutside)(PostTitle);
//# sourceMappingURL=index.js.map