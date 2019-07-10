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

import { Component, renderToString } from '@wordpress/element';
import { Button, Path, SVG } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';
import { DotTip } from '@wordpress/nux';
import { ifCondition, compose } from '@wordpress/compose';
import { applyFilters } from '@wordpress/hooks';

function writeInterstitialMessage(targetDocument) {
  var markup = renderToString(createElement("div", {
    className: "editor-post-preview-button__interstitial-message"
  }, createElement(SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 96 96"
  }, createElement(Path, {
    className: "outer",
    d: "M48 12c19.9 0 36 16.1 36 36S67.9 84 48 84 12 67.9 12 48s16.1-36 36-36",
    fill: "none"
  }), createElement(Path, {
    className: "inner",
    d: "M69.5 46.4c0-3.9-1.4-6.7-2.6-8.8-1.6-2.6-3.1-4.9-3.1-7.5 0-2.9 2.2-5.7 5.4-5.7h.4C63.9 19.2 56.4 16 48 16c-11.2 0-21 5.7-26.7 14.4h2.1c3.3 0 8.5-.4 8.5-.4 1.7-.1 1.9 2.4.2 2.6 0 0-1.7.2-3.7.3L40 67.5l7-20.9L42 33c-1.7-.1-3.3-.3-3.3-.3-1.7-.1-1.5-2.7.2-2.6 0 0 5.3.4 8.4.4 3.3 0 8.5-.4 8.5-.4 1.7-.1 1.9 2.4.2 2.6 0 0-1.7.2-3.7.3l11.5 34.3 3.3-10.4c1.6-4.5 2.4-7.8 2.4-10.5zM16.1 48c0 12.6 7.3 23.5 18 28.7L18.8 35c-1.7 4-2.7 8.4-2.7 13zm32.5 2.8L39 78.6c2.9.8 5.9 1.3 9 1.3 3.7 0 7.3-.6 10.6-1.8-.1-.1-.2-.3-.2-.4l-9.8-26.9zM76.2 36c0 3.2-.6 6.9-2.4 11.4L64 75.6c9.5-5.5 15.9-15.8 15.9-27.6 0-5.5-1.4-10.8-3.9-15.3.1 1 .2 2.1.2 3.3z",
    fill: "none"
  })), createElement("p", null, __('Generating preview…'))));
  markup += "\n\t\t<style>\n\t\t\tbody {\n\t\t\t\tmargin: 0;\n\t\t\t}\n\t\t\t.editor-post-preview-button__interstitial-message {\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-direction: column;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\twidth: 100vw;\n\t\t\t}\n\t\t\t@-webkit-keyframes paint {\n\t\t\t\t0% {\n\t\t\t\t\tstroke-dashoffset: 0;\n\t\t\t\t}\n\t\t\t}\n\t\t\t@-moz-keyframes paint {\n\t\t\t\t0% {\n\t\t\t\t\tstroke-dashoffset: 0;\n\t\t\t\t}\n\t\t\t}\n\t\t\t@-o-keyframes paint {\n\t\t\t\t0% {\n\t\t\t\t\tstroke-dashoffset: 0;\n\t\t\t\t}\n\t\t\t}\n\t\t\t@keyframes paint {\n\t\t\t\t0% {\n\t\t\t\t\tstroke-dashoffset: 0;\n\t\t\t\t}\n\t\t\t}\n\t\t\t.editor-post-preview-button__interstitial-message svg {\n\t\t\t\twidth: 192px;\n\t\t\t\theight: 192px;\n\t\t\t\tstroke: #555d66;\n\t\t\t\tstroke-width: 0.75;\n\t\t\t}\n\t\t\t.editor-post-preview-button__interstitial-message svg .outer,\n\t\t\t.editor-post-preview-button__interstitial-message svg .inner {\n\t\t\t\tstroke-dasharray: 280;\n\t\t\t\tstroke-dashoffset: 280;\n\t\t\t\t-webkit-animation: paint 1.5s ease infinite alternate;\n\t\t\t\t-moz-animation: paint 1.5s ease infinite alternate;\n\t\t\t\t-o-animation: paint 1.5s ease infinite alternate;\n\t\t\t\tanimation: paint 1.5s ease infinite alternate;\n\t\t\t}\n\t\t\tp {\n\t\t\t\ttext-align: center;\n\t\t\t\tfont-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;\n\t\t\t}\n\t\t</style>\n\t";
  /**
   * Filters the interstitial message shown when generating previews.
   *
   * @param {String} markup The preview interstitial markup.
   */

  markup = applyFilters('editor.PostPreview.interstitialMarkup', markup);
  targetDocument.write(markup);
  targetDocument.title = __('Generating preview…');
  targetDocument.close();
}

export var PostPreviewButton =
/*#__PURE__*/
function (_Component) {
  _inherits(PostPreviewButton, _Component);

  function PostPreviewButton() {
    var _this;

    _classCallCheck(this, PostPreviewButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostPreviewButton).apply(this, arguments));
    _this.openPreviewWindow = _this.openPreviewWindow.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(PostPreviewButton, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var previewLink = this.props.previewLink; // This relies on the window being responsible to unset itself when
      // navigation occurs or a new preview window is opened, to avoid
      // unintentional forceful redirects.

      if (previewLink && !prevProps.previewLink) {
        this.setPreviewWindowLink(previewLink);
      }
    }
    /**
     * Sets the preview window's location to the given URL, if a preview window
     * exists and is not closed.
     *
     * @param {string} url URL to assign as preview window location.
     */

  }, {
    key: "setPreviewWindowLink",
    value: function setPreviewWindowLink(url) {
      var previewWindow = this.previewWindow;

      if (previewWindow && !previewWindow.closed) {
        previewWindow.location = url;
      }
    }
  }, {
    key: "getWindowTarget",
    value: function getWindowTarget() {
      var postId = this.props.postId;
      return "wp-preview-".concat(postId);
    }
  }, {
    key: "openPreviewWindow",
    value: function openPreviewWindow(event) {
      // Our Preview button has its 'href' and 'target' set correctly for a11y
      // purposes. Unfortunately, though, we can't rely on the default 'click'
      // handler since sometimes it incorrectly opens a new tab instead of reusing
      // the existing one.
      // https://github.com/WordPress/gutenberg/pull/8330
      event.preventDefault(); // Open up a Preview tab if needed. This is where we'll show the preview.

      if (!this.previewWindow || this.previewWindow.closed) {
        this.previewWindow = window.open('', this.getWindowTarget());
      } // Focus the Preview tab. This might not do anything, depending on the browser's
      // and user's preferences.
      // https://html.spec.whatwg.org/multipage/interaction.html#dom-window-focus


      this.previewWindow.focus(); // If we don't need to autosave the post before previewing, then we simply
      // load the Preview URL in the Preview tab.

      if (!this.props.isAutosaveable) {
        this.setPreviewWindowLink(event.target.href);
        return;
      } // Request an autosave. This happens asynchronously and causes the component
      // to update when finished.


      if (this.props.isDraft) {
        this.props.savePost({
          isPreview: true
        });
      } else {
        this.props.autosave({
          isPreview: true
        });
      } // Display a 'Generating preview' message in the Preview tab while we wait for the
      // autosave to finish.


      writeInterstitialMessage(this.previewWindow.document);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          previewLink = _this$props.previewLink,
          currentPostLink = _this$props.currentPostLink,
          isSaveable = _this$props.isSaveable; // Link to the `?preview=true` URL if we have it, since this lets us see
      // changes that were autosaved since the post was last published. Otherwise,
      // just link to the post's URL.

      var href = previewLink || currentPostLink;
      return createElement(Button, {
        isLarge: true,
        className: "editor-post-preview",
        href: href,
        target: this.getWindowTarget(),
        disabled: !isSaveable,
        onClick: this.openPreviewWindow
      }, _x('Preview', 'imperative verb'), createElement("span", {
        className: "screen-reader-text"
      },
      /* translators: accessibility text */
      __('(opens in a new tab)')), createElement(DotTip, {
        tipId: "core/editor.preview"
      }, __('Click “Preview” to load a preview of this page, so you can make sure you’re happy with your blocks.')));
    }
  }]);

  return PostPreviewButton;
}(Component);
export default compose([withSelect(function (select, _ref) {
  var forcePreviewLink = _ref.forcePreviewLink,
      forceIsAutosaveable = _ref.forceIsAutosaveable;

  var _select = select('core/editor'),
      getCurrentPostId = _select.getCurrentPostId,
      getCurrentPostAttribute = _select.getCurrentPostAttribute,
      getEditedPostAttribute = _select.getEditedPostAttribute,
      isEditedPostSaveable = _select.isEditedPostSaveable,
      isEditedPostAutosaveable = _select.isEditedPostAutosaveable,
      getEditedPostPreviewLink = _select.getEditedPostPreviewLink;

  var _select2 = select('core'),
      getPostType = _select2.getPostType;

  var previewLink = getEditedPostPreviewLink();
  var postType = getPostType(getEditedPostAttribute('type'));
  return {
    postId: getCurrentPostId(),
    currentPostLink: getCurrentPostAttribute('link'),
    previewLink: forcePreviewLink !== undefined ? forcePreviewLink : previewLink,
    isSaveable: isEditedPostSaveable(),
    isAutosaveable: forceIsAutosaveable || isEditedPostAutosaveable(),
    isViewable: get(postType, ['viewable'], false),
    isDraft: ['draft', 'auto-draft'].indexOf(getEditedPostAttribute('status')) !== -1
  };
}), withDispatch(function (dispatch) {
  return {
    autosave: dispatch('core/editor').autosave,
    savePost: dispatch('core/editor').savePost
  };
}), ifCondition(function (_ref2) {
  var isViewable = _ref2.isViewable;
  return isViewable;
})])(PostPreviewButton);
//# sourceMappingURL=index.js.map