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

var _reactAutosizeTextarea = _interopRequireDefault(require("react-autosize-textarea"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _htmlEntities = require("@wordpress/html-entities");

var _keycodes = require("@wordpress/keycodes");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _postPermalink = _interopRequireDefault(require("../post-permalink"));

var _postTypeSupportCheck = _interopRequireDefault(require("../post-type-support-check"));

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
 * Constants
 */
var REGEXP_NEWLINES = /[\r\n]+/g;

var PostTitle =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PostTitle, _Component);

  function PostTitle() {
    var _this;

    (0, _classCallCheck2.default)(this, PostTitle);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PostTitle).apply(this, arguments));
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSelect = _this.onSelect.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onUnselect = _this.onUnselect.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.redirectHistory = _this.redirectHistory.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      isSelected: false
    };
    return _this;
  }

  (0, _createClass2.default)(PostTitle, [{
    key: "handleFocusOutside",
    value: function handleFocusOutside() {
      this.onUnselect();
    }
  }, {
    key: "onSelect",
    value: function onSelect() {
      this.setState({
        isSelected: true
      });
      this.props.clearSelectedBlock();
    }
  }, {
    key: "onUnselect",
    value: function onUnselect() {
      this.setState({
        isSelected: false
      });
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      var newTitle = event.target.value.replace(REGEXP_NEWLINES, ' ');
      this.props.onUpdate(newTitle);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.keyCode === _keycodes.ENTER) {
        event.preventDefault();
        this.props.onEnterPress();
      }
    }
    /**
     * Emulates behavior of an undo or redo on its corresponding key press
     * combination. This is a workaround to React's treatment of undo in a
     * controlled textarea where characters are updated one at a time.
     * Instead, leverage the store's undo handling of title changes.
     *
     * @see https://github.com/facebook/react/issues/8514
     *
     * @param {KeyboardEvent} event Key event.
     */

  }, {
    key: "redirectHistory",
    value: function redirectHistory(event) {
      if (event.shiftKey) {
        this.props.onRedo();
      } else {
        this.props.onUndo();
      }

      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          hasFixedToolbar = _this$props.hasFixedToolbar,
          isCleanNewPost = _this$props.isCleanNewPost,
          isFocusMode = _this$props.isFocusMode,
          isPostTypeViewable = _this$props.isPostTypeViewable,
          instanceId = _this$props.instanceId,
          placeholder = _this$props.placeholder,
          title = _this$props.title;
      var isSelected = this.state.isSelected; // The wp-block className is important for editor styles.

      var className = (0, _classnames.default)('wp-block editor-post-title__block', {
        'is-selected': isSelected,
        'is-focus-mode': isFocusMode,
        'has-fixed-toolbar': hasFixedToolbar
      });
      var decodedPlaceholder = (0, _htmlEntities.decodeEntities)(placeholder);
      return (0, _element.createElement)(_postTypeSupportCheck.default, {
        supportKeys: "title"
      }, (0, _element.createElement)("div", {
        className: "editor-post-title"
      }, (0, _element.createElement)("div", {
        className: className
      }, (0, _element.createElement)(_components.KeyboardShortcuts, {
        shortcuts: {
          'mod+z': this.redirectHistory,
          'mod+shift+z': this.redirectHistory
        }
      }, (0, _element.createElement)("label", {
        htmlFor: "post-title-".concat(instanceId),
        className: "screen-reader-text"
      }, decodedPlaceholder || (0, _i18n.__)('Add title')), (0, _element.createElement)(_reactAutosizeTextarea.default, {
        id: "post-title-".concat(instanceId),
        className: "editor-post-title__input",
        value: title,
        onChange: this.onChange,
        placeholder: decodedPlaceholder || (0, _i18n.__)('Add title'),
        onFocus: this.onSelect,
        onKeyDown: this.onKeyDown,
        onKeyPress: this.onUnselect
        /*
        	Only autofocus the title when the post is entirely empty.
        	This should only happen for a new post, which means we
        	focus the title on new post so the author can start typing
        	right away, without needing to click anything.
        */

        /* eslint-disable jsx-a11y/no-autofocus */
        ,
        autoFocus: isCleanNewPost
        /* eslint-enable jsx-a11y/no-autofocus */

      })), isSelected && isPostTypeViewable && (0, _element.createElement)(_postPermalink.default, null))));
    }
  }]);
  return PostTitle;
}(_element.Component);

var applyWithSelect = (0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute,
      isCleanNewPost = _select.isCleanNewPost;

  var _select2 = select('core/block-editor'),
      getSettings = _select2.getSettings;

  var _select3 = select('core'),
      getPostType = _select3.getPostType;

  var postType = getPostType(getEditedPostAttribute('type'));

  var _getSettings = getSettings(),
      titlePlaceholder = _getSettings.titlePlaceholder,
      focusMode = _getSettings.focusMode,
      hasFixedToolbar = _getSettings.hasFixedToolbar;

  return {
    isCleanNewPost: isCleanNewPost(),
    title: getEditedPostAttribute('title'),
    isPostTypeViewable: (0, _lodash.get)(postType, ['viewable'], false),
    placeholder: titlePlaceholder,
    isFocusMode: focusMode,
    hasFixedToolbar: hasFixedToolbar
  };
});
var applyWithDispatch = (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      insertDefaultBlock = _dispatch.insertDefaultBlock,
      clearSelectedBlock = _dispatch.clearSelectedBlock;

  var _dispatch2 = dispatch('core/editor'),
      editPost = _dispatch2.editPost,
      undo = _dispatch2.undo,
      redo = _dispatch2.redo;

  return {
    onEnterPress: function onEnterPress() {
      insertDefaultBlock(undefined, undefined, 0);
    },
    onUpdate: function onUpdate(title) {
      editPost({
        title: title
      });
    },
    onUndo: undo,
    onRedo: redo,
    clearSelectedBlock: clearSelectedBlock
  };
});

var _default = (0, _compose.compose)(applyWithSelect, applyWithDispatch, _compose.withInstanceId, _components.withFocusOutside)(PostTitle);

exports.default = _default;
//# sourceMappingURL=index.js.map