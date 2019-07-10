"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PostSavedState = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _keycodes = require("@wordpress/keycodes");

var _compose = require("@wordpress/compose");

var _viewport = require("@wordpress/viewport");

var _postSwitchToDraftButton = _interopRequireDefault(require("../post-switch-to-draft-button"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Component showing whether the post is saved or not and displaying save links.
 *
 * @param   {Object}    Props Component Props.
 */
var PostSavedState =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PostSavedState, _Component);

  function PostSavedState() {
    var _this;

    (0, _classCallCheck2.default)(this, PostSavedState);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PostSavedState).apply(this, arguments));
    _this.state = {
      forceSavedMessage: false
    };
    return _this;
  }

  (0, _createClass2.default)(PostSavedState, [{
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
        var classes = (0, _classnames.default)('editor-post-saved-state', 'is-saving', {
          'is-autosaving': isAutosaving
        });
        return (0, _element.createElement)("span", {
          className: classes
        }, (0, _element.createElement)(_components.Dashicon, {
          icon: "cloud"
        }), isAutosaving ? (0, _i18n.__)('Autosaving') : (0, _i18n.__)('Saving'));
      }

      if (isPublished || isScheduled) {
        return (0, _element.createElement)(_postSwitchToDraftButton.default, null);
      }

      if (!isSaveable) {
        return null;
      }

      if (forceSavedMessage || !isNew && !isDirty) {
        return (0, _element.createElement)("span", {
          className: "editor-post-saved-state is-saved"
        }, (0, _element.createElement)(_components.Dashicon, {
          icon: "saved"
        }), (0, _i18n.__)('Saved'));
      } // Once the post has been submitted for review this button
      // is not needed for the contributor role.


      var hasPublishAction = (0, _lodash.get)(post, ['_links', 'wp:action-publish'], false);

      if (!hasPublishAction && isPending) {
        return null;
      }

      var label = isPending ? (0, _i18n.__)('Save as Pending') : (0, _i18n.__)('Save Draft');

      if (!isLargeViewport) {
        return (0, _element.createElement)(_components.IconButton, {
          className: "editor-post-save-draft",
          label: label,
          onClick: onSave,
          shortcut: _keycodes.displayShortcut.primary('s'),
          icon: "cloud-upload"
        });
      }

      return (0, _element.createElement)(_components.Button, {
        className: "editor-post-save-draft",
        onClick: onSave,
        shortcut: _keycodes.displayShortcut.primary('s'),
        isTertiary: true
      }, label);
    }
  }]);
  return PostSavedState;
}(_element.Component);

exports.PostSavedState = PostSavedState;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref) {
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
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    onSave: dispatch('core/editor').savePost
  };
}), _compose.withSafeTimeout, (0, _viewport.withViewportMatch)({
  isLargeViewport: 'medium'
})])(PostSavedState);

exports.default = _default;
//# sourceMappingURL=index.js.map