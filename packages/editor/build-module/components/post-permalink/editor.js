import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { withDispatch, withSelect } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { cleanForSlug } from '../../utils/url';

var PostPermalinkEditor =
/*#__PURE__*/
function (_Component) {
  _inherits(PostPermalinkEditor, _Component);

  function PostPermalinkEditor(_ref) {
    var _this;

    var permalinkParts = _ref.permalinkParts,
        slug = _ref.slug;

    _classCallCheck(this, PostPermalinkEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostPermalinkEditor).apply(this, arguments));
    _this.state = {
      editedPostName: slug || permalinkParts.postName
    };
    _this.onSavePermalink = _this.onSavePermalink.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(PostPermalinkEditor, [{
    key: "onSavePermalink",
    value: function onSavePermalink(event) {
      var postName = cleanForSlug(this.state.editedPostName);
      event.preventDefault();
      this.props.onSave();

      if (postName === this.props.postName) {
        return;
      }

      this.props.editPost({
        slug: postName
      });
      this.setState({
        editedPostName: postName
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$permalink = this.props.permalinkParts,
          prefix = _this$props$permalink.prefix,
          suffix = _this$props$permalink.suffix;
      var editedPostName = this.state.editedPostName;
      /* eslint-disable jsx-a11y/no-autofocus */
      // Autofocus is allowed here, as this mini-UI is only loaded when the user clicks to open it.

      return createElement("form", {
        className: "editor-post-permalink-editor",
        onSubmit: this.onSavePermalink
      }, createElement("span", {
        className: "editor-post-permalink__editor-container"
      }, createElement("span", {
        className: "editor-post-permalink-editor__prefix"
      }, prefix), createElement("input", {
        className: "editor-post-permalink-editor__edit",
        "aria-label": __('Edit post permalink'),
        value: editedPostName,
        onChange: function onChange(event) {
          return _this2.setState({
            editedPostName: event.target.value
          });
        },
        type: "text",
        autoFocus: true
      }), createElement("span", {
        className: "editor-post-permalink-editor__suffix"
      }, suffix), "\u200E"), createElement(Button, {
        className: "editor-post-permalink-editor__save",
        isLarge: true,
        onClick: this.onSavePermalink
      }, __('Save')));
      /* eslint-enable jsx-a11y/no-autofocus */
    }
  }]);

  return PostPermalinkEditor;
}(Component);

export default compose([withSelect(function (select) {
  var _select = select('core/editor'),
      getPermalinkParts = _select.getPermalinkParts;

  return {
    permalinkParts: getPermalinkParts()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost;

  return {
    editPost: editPost
  };
})])(PostPermalinkEditor);
//# sourceMappingURL=editor.js.map