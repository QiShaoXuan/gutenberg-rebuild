"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PostPublishButton = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _nux = require("@wordpress/nux");

var _label = _interopRequireDefault(require("./label"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var PostPublishButton =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PostPublishButton, _Component);

  function PostPublishButton(props) {
    var _this;

    (0, _classCallCheck2.default)(this, PostPublishButton);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PostPublishButton).call(this, props));
    _this.buttonNode = (0, _element.createRef)();
    return _this;
  }

  (0, _createClass2.default)(PostPublishButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.focusOnMount) {
        this.buttonNode.current.focus();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          forceIsDirty = _this$props.forceIsDirty,
          forceIsSaving = _this$props.forceIsSaving,
          hasPublishAction = _this$props.hasPublishAction,
          isBeingScheduled = _this$props.isBeingScheduled,
          isOpen = _this$props.isOpen,
          isPostSavingLocked = _this$props.isPostSavingLocked,
          isPublishable = _this$props.isPublishable,
          isPublished = _this$props.isPublished,
          isSaveable = _this$props.isSaveable,
          isSaving = _this$props.isSaving,
          isToggle = _this$props.isToggle,
          onSave = _this$props.onSave,
          onStatusChange = _this$props.onStatusChange,
          _this$props$onSubmit = _this$props.onSubmit,
          onSubmit = _this$props$onSubmit === void 0 ? _lodash.noop : _this$props$onSubmit,
          onToggle = _this$props.onToggle,
          visibility = _this$props.visibility;
      var isButtonDisabled = isSaving || forceIsSaving || !isSaveable || isPostSavingLocked || !isPublishable && !forceIsDirty;
      var isToggleDisabled = isPublished || isSaving || forceIsSaving || !isSaveable || !isPublishable && !forceIsDirty;
      var publishStatus;

      if (!hasPublishAction) {
        publishStatus = 'pending';
      } else if (isBeingScheduled) {
        publishStatus = 'future';
      } else if (visibility === 'private') {
        publishStatus = 'private';
      } else {
        publishStatus = 'publish';
      }

      var onClickButton = function onClickButton() {
        if (isButtonDisabled) {
          return;
        }

        onSubmit();
        onStatusChange(publishStatus);
        onSave();
      };

      var onClickToggle = function onClickToggle() {
        if (isToggleDisabled) {
          return;
        }

        onToggle();
      };

      var buttonProps = {
        'aria-disabled': isButtonDisabled,
        className: 'editor-post-publish-button',
        isBusy: isSaving && isPublished,
        isLarge: true,
        isPrimary: true,
        onClick: onClickButton
      };
      var toggleProps = {
        'aria-disabled': isToggleDisabled,
        'aria-expanded': isOpen,
        className: 'editor-post-publish-panel__toggle',
        isBusy: isSaving && isPublished,
        isPrimary: true,
        onClick: onClickToggle
      };
      var toggleChildren = isBeingScheduled ? (0, _i18n.__)('Schedule…') : (0, _i18n.__)('Publish…');
      var buttonChildren = (0, _element.createElement)(_label.default, {
        forceIsSaving: forceIsSaving
      });
      var componentProps = isToggle ? toggleProps : buttonProps;
      var componentChildren = isToggle ? toggleChildren : buttonChildren;
      return (0, _element.createElement)(_components.Button, (0, _extends2.default)({
        ref: this.buttonNode
      }, componentProps), componentChildren, (0, _element.createElement)(_nux.DotTip, {
        tipId: "core/editor.publish"
      }, (0, _i18n.__)('Finished writing? That’s great, let’s get this published right now. Just click “Publish” and you’re good to go.')));
    }
  }]);
  return PostPublishButton;
}(_element.Component);

exports.PostPublishButton = PostPublishButton;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      isSavingPost = _select.isSavingPost,
      isEditedPostBeingScheduled = _select.isEditedPostBeingScheduled,
      getEditedPostVisibility = _select.getEditedPostVisibility,
      isCurrentPostPublished = _select.isCurrentPostPublished,
      isEditedPostSaveable = _select.isEditedPostSaveable,
      isEditedPostPublishable = _select.isEditedPostPublishable,
      isPostSavingLocked = _select.isPostSavingLocked,
      getCurrentPost = _select.getCurrentPost,
      getCurrentPostType = _select.getCurrentPostType;

  return {
    isSaving: isSavingPost(),
    isBeingScheduled: isEditedPostBeingScheduled(),
    visibility: getEditedPostVisibility(),
    isSaveable: isEditedPostSaveable(),
    isPostSavingLocked: isPostSavingLocked(),
    isPublishable: isEditedPostPublishable(),
    isPublished: isCurrentPostPublished(),
    hasPublishAction: (0, _lodash.get)(getCurrentPost(), ['_links', 'wp:action-publish'], false),
    postType: getCurrentPostType()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost,
      savePost = _dispatch.savePost;

  return {
    onStatusChange: function onStatusChange(status) {
      return editPost({
        status: status
      });
    },
    onSave: savePost
  };
})])(PostPublishButton);

exports.default = _default;
//# sourceMappingURL=index.js.map