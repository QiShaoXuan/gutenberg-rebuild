"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PostAuthor = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _check = _interopRequireDefault(require("./check"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var PostAuthor =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PostAuthor, _Component);

  function PostAuthor() {
    var _this;

    (0, _classCallCheck2.default)(this, PostAuthor);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PostAuthor).apply(this, arguments));
    _this.setAuthorId = _this.setAuthorId.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(PostAuthor, [{
    key: "setAuthorId",
    value: function setAuthorId(event) {
      var onUpdateAuthor = this.props.onUpdateAuthor;
      var value = event.target.value;
      onUpdateAuthor(Number(value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          postAuthor = _this$props.postAuthor,
          instanceId = _this$props.instanceId,
          authors = _this$props.authors;
      var selectId = 'post-author-selector-' + instanceId; // Disable reason: A select with an onchange throws a warning

      /* eslint-disable jsx-a11y/no-onchange */

      return (0, _element.createElement)(_check.default, null, (0, _element.createElement)("label", {
        htmlFor: selectId
      }, (0, _i18n.__)('Author')), (0, _element.createElement)("select", {
        id: selectId,
        value: postAuthor,
        onChange: this.setAuthorId,
        className: "editor-post-author__select"
      }, authors.map(function (author) {
        return (0, _element.createElement)("option", {
          key: author.id,
          value: author.id
        }, author.name);
      })));
      /* eslint-enable jsx-a11y/no-onchange */
    }
  }]);
  return PostAuthor;
}(_element.Component);

exports.PostAuthor = PostAuthor;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  return {
    postAuthor: select('core/editor').getEditedPostAttribute('author'),
    authors: select('core').getAuthors()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    onUpdateAuthor: function onUpdateAuthor(author) {
      dispatch('core/editor').editPost({
        author: author
      });
    }
  };
}), _compose.withInstanceId])(PostAuthor);

exports.default = _default;
//# sourceMappingURL=index.js.map