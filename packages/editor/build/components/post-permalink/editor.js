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

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _url = require("../../utils/url");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var PostPermalinkEditor =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PostPermalinkEditor, _Component);

  function PostPermalinkEditor(_ref) {
    var _this;

    var permalinkParts = _ref.permalinkParts,
        slug = _ref.slug;
    (0, _classCallCheck2.default)(this, PostPermalinkEditor);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PostPermalinkEditor).apply(this, arguments));
    _this.state = {
      editedPostName: slug || permalinkParts.postName
    };
    _this.onSavePermalink = _this.onSavePermalink.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(PostPermalinkEditor, [{
    key: "onSavePermalink",
    value: function onSavePermalink(event) {
      var postName = (0, _url.cleanForSlug)(this.state.editedPostName);
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

      return (0, _element.createElement)("form", {
        className: "editor-post-permalink-editor",
        onSubmit: this.onSavePermalink
      }, (0, _element.createElement)("span", {
        className: "editor-post-permalink__editor-container"
      }, (0, _element.createElement)("span", {
        className: "editor-post-permalink-editor__prefix"
      }, prefix), (0, _element.createElement)("input", {
        className: "editor-post-permalink-editor__edit",
        "aria-label": (0, _i18n.__)('Edit post permalink'),
        value: editedPostName,
        onChange: function onChange(event) {
          return _this2.setState({
            editedPostName: event.target.value
          });
        },
        type: "text",
        autoFocus: true
      }), (0, _element.createElement)("span", {
        className: "editor-post-permalink-editor__suffix"
      }, suffix), "\u200E"), (0, _element.createElement)(_components.Button, {
        className: "editor-post-permalink-editor__save",
        isLarge: true,
        onClick: this.onSavePermalink
      }, (0, _i18n.__)('Save')));
      /* eslint-enable jsx-a11y/no-autofocus */
    }
  }]);
  return PostPermalinkEditor;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      getPermalinkParts = _select.getPermalinkParts;

  return {
    permalinkParts: getPermalinkParts()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost;

  return {
    editPost: editPost
  };
})])(PostPermalinkEditor);

exports.default = _default;
//# sourceMappingURL=editor.js.map