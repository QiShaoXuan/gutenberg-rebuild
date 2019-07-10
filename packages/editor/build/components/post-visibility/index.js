"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PostVisibility = void 0;

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

var _utils = require("./utils");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var PostVisibility =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PostVisibility, _Component);

  function PostVisibility(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PostVisibility);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PostVisibility).apply(this, arguments));
    _this.setPublic = _this.setPublic.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setPrivate = _this.setPrivate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setPasswordProtected = _this.setPasswordProtected.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.updatePassword = _this.updatePassword.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      hasPassword: !!props.password
    };
    return _this;
  }

  (0, _createClass2.default)(PostVisibility, [{
    key: "setPublic",
    value: function setPublic() {
      var _this$props = this.props,
          visibility = _this$props.visibility,
          onUpdateVisibility = _this$props.onUpdateVisibility,
          status = _this$props.status;
      onUpdateVisibility(visibility === 'private' ? 'draft' : status);
      this.setState({
        hasPassword: false
      });
    }
  }, {
    key: "setPrivate",
    value: function setPrivate() {
      if (!window.confirm((0, _i18n.__)('Would you like to privately publish this post now?'))) {
        // eslint-disable-line no-alert
        return;
      }

      var _this$props2 = this.props,
          onUpdateVisibility = _this$props2.onUpdateVisibility,
          onSave = _this$props2.onSave;
      onUpdateVisibility('private');
      this.setState({
        hasPassword: false
      });
      onSave();
    }
  }, {
    key: "setPasswordProtected",
    value: function setPasswordProtected() {
      var _this$props3 = this.props,
          visibility = _this$props3.visibility,
          onUpdateVisibility = _this$props3.onUpdateVisibility,
          status = _this$props3.status,
          password = _this$props3.password;
      onUpdateVisibility(visibility === 'private' ? 'draft' : status, password || '');
      this.setState({
        hasPassword: true
      });
    }
  }, {
    key: "updatePassword",
    value: function updatePassword(event) {
      var _this$props4 = this.props,
          status = _this$props4.status,
          onUpdateVisibility = _this$props4.onUpdateVisibility;
      onUpdateVisibility(status, event.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          visibility = _this$props5.visibility,
          password = _this$props5.password,
          instanceId = _this$props5.instanceId;
      var visibilityHandlers = {
        public: {
          onSelect: this.setPublic,
          checked: visibility === 'public' && !this.state.hasPassword
        },
        private: {
          onSelect: this.setPrivate,
          checked: visibility === 'private'
        },
        password: {
          onSelect: this.setPasswordProtected,
          checked: this.state.hasPassword
        }
      };
      return [(0, _element.createElement)("fieldset", {
        key: "visibility-selector",
        className: "editor-post-visibility__dialog-fieldset"
      }, (0, _element.createElement)("legend", {
        className: "editor-post-visibility__dialog-legend"
      }, (0, _i18n.__)('Post Visibility')), _utils.visibilityOptions.map(function (_ref) {
        var value = _ref.value,
            label = _ref.label,
            info = _ref.info;
        return (0, _element.createElement)("div", {
          key: value,
          className: "editor-post-visibility__choice"
        }, (0, _element.createElement)("input", {
          type: "radio",
          name: "editor-post-visibility__setting-".concat(instanceId),
          value: value,
          onChange: visibilityHandlers[value].onSelect,
          checked: visibilityHandlers[value].checked,
          id: "editor-post-".concat(value, "-").concat(instanceId),
          "aria-describedby": "editor-post-".concat(value, "-").concat(instanceId, "-description"),
          className: "editor-post-visibility__dialog-radio"
        }), (0, _element.createElement)("label", {
          htmlFor: "editor-post-".concat(value, "-").concat(instanceId),
          className: "editor-post-visibility__dialog-label"
        }, label), (0, _element.createElement)("p", {
          id: "editor-post-".concat(value, "-").concat(instanceId, "-description"),
          className: "editor-post-visibility__dialog-info"
        }, info));
      })), this.state.hasPassword && (0, _element.createElement)("div", {
        className: "editor-post-visibility__dialog-password",
        key: "password-selector"
      }, (0, _element.createElement)("label", {
        htmlFor: "editor-post-visibility__dialog-password-input-".concat(instanceId),
        className: "screen-reader-text"
      }, (0, _i18n.__)('Create password')), (0, _element.createElement)("input", {
        className: "editor-post-visibility__dialog-password-input",
        id: "editor-post-visibility__dialog-password-input-".concat(instanceId),
        type: "text",
        onChange: this.updatePassword,
        value: password,
        placeholder: (0, _i18n.__)('Use a secure password')
      }))];
    }
  }]);
  return PostVisibility;
}(_element.Component);

exports.PostVisibility = PostVisibility;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute,
      getEditedPostVisibility = _select.getEditedPostVisibility;

  return {
    status: getEditedPostAttribute('status'),
    visibility: getEditedPostVisibility(),
    password: getEditedPostAttribute('password')
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      savePost = _dispatch.savePost,
      editPost = _dispatch.editPost;

  return {
    onSave: savePost,
    onUpdateVisibility: function onUpdateVisibility(status) {
      var password = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      editPost({
        status: status,
        password: password
      });
    }
  };
}), _compose.withInstanceId])(PostVisibility);

exports.default = _default;
//# sourceMappingURL=index.js.map