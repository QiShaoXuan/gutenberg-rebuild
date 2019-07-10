"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PostPublishPanel = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _postPublishButton = _interopRequireDefault(require("../post-publish-button"));

var _prepublish = _interopRequireDefault(require("./prepublish"));

var _postpublish = _interopRequireDefault(require("./postpublish"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var PostPublishPanel =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PostPublishPanel, _Component);

  function PostPublishPanel() {
    var _this;

    (0, _classCallCheck2.default)(this, PostPublishPanel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PostPublishPanel).apply(this, arguments));
    _this.onSubmit = _this.onSubmit.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(PostPublishPanel, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Automatically collapse the publish sidebar when a post
      // is published and the user makes an edit.
      if (prevProps.isPublished && !this.props.isSaving && this.props.isDirty) {
        this.props.onClose();
      }
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      var _this$props = this.props,
          onClose = _this$props.onClose,
          hasPublishAction = _this$props.hasPublishAction,
          isPostTypeViewable = _this$props.isPostTypeViewable;

      if (!hasPublishAction || !isPostTypeViewable) {
        onClose();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          forceIsDirty = _this$props2.forceIsDirty,
          forceIsSaving = _this$props2.forceIsSaving,
          isBeingScheduled = _this$props2.isBeingScheduled,
          isPublished = _this$props2.isPublished,
          isPublishSidebarEnabled = _this$props2.isPublishSidebarEnabled,
          isScheduled = _this$props2.isScheduled,
          isSaving = _this$props2.isSaving,
          onClose = _this$props2.onClose,
          onTogglePublishSidebar = _this$props2.onTogglePublishSidebar,
          PostPublishExtension = _this$props2.PostPublishExtension,
          PrePublishExtension = _this$props2.PrePublishExtension,
          additionalProps = (0, _objectWithoutProperties2.default)(_this$props2, ["forceIsDirty", "forceIsSaving", "isBeingScheduled", "isPublished", "isPublishSidebarEnabled", "isScheduled", "isSaving", "onClose", "onTogglePublishSidebar", "PostPublishExtension", "PrePublishExtension"]);
      var propsForPanel = (0, _lodash.omit)(additionalProps, ['hasPublishAction', 'isDirty', 'isPostTypeViewable']);
      var isPublishedOrScheduled = isPublished || isScheduled && isBeingScheduled;
      var isPrePublish = !isPublishedOrScheduled && !isSaving;
      var isPostPublish = isPublishedOrScheduled && !isSaving;
      return (0, _element.createElement)("div", (0, _extends2.default)({
        className: "editor-post-publish-panel"
      }, propsForPanel), (0, _element.createElement)("div", {
        className: "editor-post-publish-panel__header"
      }, isPostPublish ? (0, _element.createElement)("div", {
        className: "editor-post-publish-panel__header-published"
      }, isScheduled ? (0, _i18n.__)('Scheduled') : (0, _i18n.__)('Published')) : (0, _element.createElement)("div", {
        className: "editor-post-publish-panel__header-publish-button"
      }, (0, _element.createElement)(_postPublishButton.default, {
        focusOnMount: true,
        onSubmit: this.onSubmit,
        forceIsDirty: forceIsDirty,
        forceIsSaving: forceIsSaving
      }), (0, _element.createElement)("span", {
        className: "editor-post-publish-panel__spacer"
      })), (0, _element.createElement)(_components.IconButton, {
        "aria-expanded": true,
        onClick: onClose,
        icon: "no-alt",
        label: (0, _i18n.__)('Close panel')
      })), (0, _element.createElement)("div", {
        className: "editor-post-publish-panel__content"
      }, isPrePublish && (0, _element.createElement)(_prepublish.default, null, PrePublishExtension && (0, _element.createElement)(PrePublishExtension, null)), isPostPublish && (0, _element.createElement)(_postpublish.default, {
        focusOnMount: true
      }, PostPublishExtension && (0, _element.createElement)(PostPublishExtension, null)), isSaving && (0, _element.createElement)(_components.Spinner, null)), (0, _element.createElement)("div", {
        className: "editor-post-publish-panel__footer"
      }, (0, _element.createElement)(_components.CheckboxControl, {
        label: (0, _i18n.__)('Always show pre-publish checks.'),
        checked: isPublishSidebarEnabled,
        onChange: onTogglePublishSidebar
      })));
    }
  }]);
  return PostPublishPanel;
}(_element.Component);

exports.PostPublishPanel = PostPublishPanel;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core'),
      getPostType = _select.getPostType;

  var _select2 = select('core/editor'),
      getCurrentPost = _select2.getCurrentPost,
      getEditedPostAttribute = _select2.getEditedPostAttribute,
      isCurrentPostPublished = _select2.isCurrentPostPublished,
      isCurrentPostScheduled = _select2.isCurrentPostScheduled,
      isEditedPostBeingScheduled = _select2.isEditedPostBeingScheduled,
      isEditedPostDirty = _select2.isEditedPostDirty,
      isSavingPost = _select2.isSavingPost;

  var _select3 = select('core/editor'),
      isPublishSidebarEnabled = _select3.isPublishSidebarEnabled;

  var postType = getPostType(getEditedPostAttribute('type'));
  return {
    hasPublishAction: (0, _lodash.get)(getCurrentPost(), ['_links', 'wp:action-publish'], false),
    isPostTypeViewable: (0, _lodash.get)(postType, ['viewable'], false),
    isBeingScheduled: isEditedPostBeingScheduled(),
    isDirty: isEditedPostDirty(),
    isPublished: isCurrentPostPublished(),
    isPublishSidebarEnabled: isPublishSidebarEnabled(),
    isSaving: isSavingPost(),
    isScheduled: isCurrentPostScheduled()
  };
}), (0, _data.withDispatch)(function (dispatch, _ref) {
  var isPublishSidebarEnabled = _ref.isPublishSidebarEnabled;

  var _dispatch = dispatch('core/editor'),
      disablePublishSidebar = _dispatch.disablePublishSidebar,
      enablePublishSidebar = _dispatch.enablePublishSidebar;

  return {
    onTogglePublishSidebar: function onTogglePublishSidebar() {
      if (isPublishSidebarEnabled) {
        disablePublishSidebar();
      } else {
        enablePublishSidebar();
      }
    }
  };
}), _components.withFocusReturn, _components.withConstrainedTabbing])(PostPublishPanel);

exports.default = _default;
//# sourceMappingURL=index.js.map