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
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { withInstanceId, compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import { visibilityOptions } from './utils';
export var PostVisibility =
/*#__PURE__*/
function (_Component) {
  _inherits(PostVisibility, _Component);

  function PostVisibility(props) {
    var _this;

    _classCallCheck(this, PostVisibility);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostVisibility).apply(this, arguments));
    _this.setPublic = _this.setPublic.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setPrivate = _this.setPrivate.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setPasswordProtected = _this.setPasswordProtected.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.updatePassword = _this.updatePassword.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      hasPassword: !!props.password
    };
    return _this;
  }

  _createClass(PostVisibility, [{
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
      if (!window.confirm(__('Would you like to privately publish this post now?'))) {
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
      return [createElement("fieldset", {
        key: "visibility-selector",
        className: "editor-post-visibility__dialog-fieldset"
      }, createElement("legend", {
        className: "editor-post-visibility__dialog-legend"
      }, __('Post Visibility')), visibilityOptions.map(function (_ref) {
        var value = _ref.value,
            label = _ref.label,
            info = _ref.info;
        return createElement("div", {
          key: value,
          className: "editor-post-visibility__choice"
        }, createElement("input", {
          type: "radio",
          name: "editor-post-visibility__setting-".concat(instanceId),
          value: value,
          onChange: visibilityHandlers[value].onSelect,
          checked: visibilityHandlers[value].checked,
          id: "editor-post-".concat(value, "-").concat(instanceId),
          "aria-describedby": "editor-post-".concat(value, "-").concat(instanceId, "-description"),
          className: "editor-post-visibility__dialog-radio"
        }), createElement("label", {
          htmlFor: "editor-post-".concat(value, "-").concat(instanceId),
          className: "editor-post-visibility__dialog-label"
        }, label), createElement("p", {
          id: "editor-post-".concat(value, "-").concat(instanceId, "-description"),
          className: "editor-post-visibility__dialog-info"
        }, info));
      })), this.state.hasPassword && createElement("div", {
        className: "editor-post-visibility__dialog-password",
        key: "password-selector"
      }, createElement("label", {
        htmlFor: "editor-post-visibility__dialog-password-input-".concat(instanceId),
        className: "screen-reader-text"
      }, __('Create password')), createElement("input", {
        className: "editor-post-visibility__dialog-password-input",
        id: "editor-post-visibility__dialog-password-input-".concat(instanceId),
        type: "text",
        onChange: this.updatePassword,
        value: password,
        placeholder: __('Use a secure password')
      }))];
    }
  }]);

  return PostVisibility;
}(Component);
export default compose([withSelect(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute,
      getEditedPostVisibility = _select.getEditedPostVisibility;

  return {
    status: getEditedPostAttribute('status'),
    visibility: getEditedPostVisibility(),
    password: getEditedPostAttribute('password')
  };
}), withDispatch(function (dispatch) {
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
}), withInstanceId])(PostVisibility);
//# sourceMappingURL=index.js.map