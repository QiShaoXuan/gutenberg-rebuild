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
import classnames from 'classnames';
import { get } from 'lodash';
/**
 * WordPress dependencies
 */

import { withDispatch, withSelect } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { ClipboardButton, Button, ExternalLink } from '@wordpress/components';
import { safeDecodeURI, safeDecodeURIComponent } from '@wordpress/url';
/**
 * Internal dependencies
 */

import PostPermalinkEditor from './editor.js';
import { getWPAdminURL, cleanForSlug } from '../../utils/url';

var PostPermalink =
/*#__PURE__*/
function (_Component) {
  _inherits(PostPermalink, _Component);

  function PostPermalink() {
    var _this;

    _classCallCheck(this, PostPermalink);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostPermalink).apply(this, arguments));
    _this.addVisibilityCheck = _this.addVisibilityCheck.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onVisibilityChange = _this.onVisibilityChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      isCopied: false,
      isEditingPermalink: false
    };
    return _this;
  }

  _createClass(PostPermalink, [{
    key: "addVisibilityCheck",
    value: function addVisibilityCheck() {
      window.addEventListener('visibilitychange', this.onVisibilityChange);
    }
  }, {
    key: "onVisibilityChange",
    value: function onVisibilityChange() {
      var _this$props = this.props,
          isEditable = _this$props.isEditable,
          refreshPost = _this$props.refreshPost; // If the user just returned after having clicked the "Change Permalinks" button,
      // fetch a new copy of the post from the server, just in case they enabled permalinks.

      if (!isEditable && 'visible' === document.visibilityState) {
        refreshPost();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // If we've just stopped editing the permalink, focus on the new permalink.
      if (prevState.isEditingPermalink && !this.state.isEditingPermalink) {
        this.linkElement.focus();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('visibilitychange', this.addVisibilityCheck);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          isEditable = _this$props2.isEditable,
          isNew = _this$props2.isNew,
          isPublished = _this$props2.isPublished,
          isViewable = _this$props2.isViewable,
          permalinkParts = _this$props2.permalinkParts,
          postLink = _this$props2.postLink,
          postSlug = _this$props2.postSlug,
          postID = _this$props2.postID,
          postTitle = _this$props2.postTitle;

      if (isNew || !isViewable || !permalinkParts || !postLink) {
        return null;
      }

      var _this$state = this.state,
          isCopied = _this$state.isCopied,
          isEditingPermalink = _this$state.isEditingPermalink;
      var ariaLabel = isCopied ? __('Permalink copied') : __('Copy the permalink');
      var prefix = permalinkParts.prefix,
          suffix = permalinkParts.suffix;
      var slug = safeDecodeURIComponent(postSlug) || cleanForSlug(postTitle) || postID;
      var samplePermalink = isEditable ? prefix + slug + suffix : prefix;
      return createElement("div", {
        className: "editor-post-permalink"
      }, createElement(ClipboardButton, {
        className: classnames('editor-post-permalink__copy', {
          'is-copied': isCopied
        }),
        text: samplePermalink,
        label: ariaLabel,
        onCopy: function onCopy() {
          return _this2.setState({
            isCopied: true
          });
        },
        "aria-disabled": isCopied,
        icon: "admin-links"
      }), createElement("span", {
        className: "editor-post-permalink__label"
      }, __('Permalink:')), !isEditingPermalink && createElement(ExternalLink, {
        className: "editor-post-permalink__link",
        href: !isPublished ? postLink : samplePermalink,
        target: "_blank",
        ref: function ref(linkElement) {
          return _this2.linkElement = linkElement;
        }
      }, safeDecodeURI(samplePermalink), "\u200E"), isEditingPermalink && createElement(PostPermalinkEditor, {
        slug: slug,
        onSave: function onSave() {
          return _this2.setState({
            isEditingPermalink: false
          });
        }
      }), isEditable && !isEditingPermalink && createElement(Button, {
        className: "editor-post-permalink__edit",
        isLarge: true,
        onClick: function onClick() {
          return _this2.setState({
            isEditingPermalink: true
          });
        }
      }, __('Edit')), !isEditable && createElement(Button, {
        className: "editor-post-permalink__change",
        isLarge: true,
        href: getWPAdminURL('options-permalink.php'),
        onClick: this.addVisibilityCheck,
        target: "_blank"
      }, __('Change Permalinks')));
    }
  }]);

  return PostPermalink;
}(Component);

export default compose([withSelect(function (select) {
  var _select = select('core/editor'),
      isEditedPostNew = _select.isEditedPostNew,
      isPermalinkEditable = _select.isPermalinkEditable,
      getCurrentPost = _select.getCurrentPost,
      getPermalinkParts = _select.getPermalinkParts,
      getEditedPostAttribute = _select.getEditedPostAttribute,
      isCurrentPostPublished = _select.isCurrentPostPublished;

  var _select2 = select('core'),
      getPostType = _select2.getPostType;

  var _getCurrentPost = getCurrentPost(),
      id = _getCurrentPost.id,
      link = _getCurrentPost.link;

  var postTypeName = getEditedPostAttribute('type');
  var postType = getPostType(postTypeName);
  return {
    isNew: isEditedPostNew(),
    postLink: link,
    permalinkParts: getPermalinkParts(),
    postSlug: getEditedPostAttribute('slug'),
    isEditable: isPermalinkEditable(),
    isPublished: isCurrentPostPublished(),
    postTitle: getEditedPostAttribute('title'),
    postID: id,
    isViewable: get(postType, ['viewable'], false)
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      refreshPost = _dispatch.refreshPost;

  return {
    refreshPost: refreshPost
  };
})])(PostPermalink);
//# sourceMappingURL=index.js.map