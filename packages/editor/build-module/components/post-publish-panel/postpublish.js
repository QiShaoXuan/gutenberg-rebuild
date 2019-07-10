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

import { PanelBody, Button, ClipboardButton, TextControl } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { Component, Fragment, createRef } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { safeDecodeURIComponent } from '@wordpress/url';
/**
 * Internal dependencies
 */

import PostScheduleLabel from '../post-schedule/label';

var PostPublishPanelPostpublish =
/*#__PURE__*/
function (_Component) {
  _inherits(PostPublishPanelPostpublish, _Component);

  function PostPublishPanelPostpublish() {
    var _this;

    _classCallCheck(this, PostPublishPanelPostpublish);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostPublishPanelPostpublish).apply(this, arguments));
    _this.state = {
      showCopyConfirmation: false
    };
    _this.onCopy = _this.onCopy.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSelectInput = _this.onSelectInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.postLink = createRef();
    return _this;
  }

  _createClass(PostPublishPanelPostpublish, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.focusOnMount) {
        this.postLink.current.focus();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.dismissCopyConfirmation);
    }
  }, {
    key: "onCopy",
    value: function onCopy() {
      var _this2 = this;

      this.setState({
        showCopyConfirmation: true
      });
      clearTimeout(this.dismissCopyConfirmation);
      this.dismissCopyConfirmation = setTimeout(function () {
        _this2.setState({
          showCopyConfirmation: false
        });
      }, 4000);
    }
  }, {
    key: "onSelectInput",
    value: function onSelectInput(event) {
      event.target.select();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          isScheduled = _this$props.isScheduled,
          post = _this$props.post,
          postType = _this$props.postType;
      var postLabel = get(postType, ['labels', 'singular_name']);
      var viewPostLabel = get(postType, ['labels', 'view_item']);
      var postPublishNonLinkHeader = isScheduled ? createElement(Fragment, null, __('is now scheduled. It will go live on'), " ", createElement(PostScheduleLabel, null), ".") : __('is now live.');
      return createElement("div", {
        className: "post-publish-panel__postpublish"
      }, createElement(PanelBody, {
        className: "post-publish-panel__postpublish-header"
      }, createElement("a", {
        ref: this.postLink,
        href: post.link
      }, post.title || __('(no title)')), " ", postPublishNonLinkHeader), createElement(PanelBody, null, createElement("p", {
        className: "post-publish-panel__postpublish-subheader"
      }, createElement("strong", null, __('What’s next?'))), createElement(TextControl, {
        className: "post-publish-panel__postpublish-post-address",
        readOnly: true,
        label: sprintf(
        /* translators: %s: post type singular name */
        __('%s address'), postLabel),
        value: safeDecodeURIComponent(post.link),
        onFocus: this.onSelectInput
      }), createElement("div", {
        className: "post-publish-panel__postpublish-buttons"
      }, !isScheduled && createElement(Button, {
        isDefault: true,
        href: post.link
      }, viewPostLabel), createElement(ClipboardButton, {
        isDefault: true,
        text: post.link,
        onCopy: this.onCopy
      }, this.state.showCopyConfirmation ? __('Copied!') : __('Copy Link')))), children);
    }
  }]);

  return PostPublishPanelPostpublish;
}(Component);

export default withSelect(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute,
      getCurrentPost = _select.getCurrentPost,
      isCurrentPostScheduled = _select.isCurrentPostScheduled;

  var _select2 = select('core'),
      getPostType = _select2.getPostType;

  return {
    post: getCurrentPost(),
    postType: getPostType(getEditedPostAttribute('type')),
    isScheduled: isCurrentPostScheduled()
  };
})(PostPublishPanelPostpublish);
//# sourceMappingURL=postpublish.js.map