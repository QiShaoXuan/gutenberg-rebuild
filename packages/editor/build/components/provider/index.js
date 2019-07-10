"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _memize = _interopRequireDefault(require("memize"));

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _apiFetch = _interopRequireDefault(require("@wordpress/api-fetch"));

var _url = require("@wordpress/url");

var _htmlEntities = require("@wordpress/html-entities");

var _editorStyles = _interopRequireDefault(require("../../editor-styles"));

var _utils = require("../../utils");

var _reusableBlocksButtons = _interopRequireDefault(require("../reusable-blocks-buttons"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var fetchLinkSuggestions =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(search) {
    var posts;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _apiFetch.default)({
              path: (0, _url.addQueryArgs)('/wp/v2/search', {
                search: search,
                per_page: 20,
                type: 'post'
              })
            });

          case 2:
            posts = _context.sent;
            return _context.abrupt("return", (0, _lodash.map)(posts, function (post) {
              return {
                id: post.id,
                url: post.url,
                title: (0, _htmlEntities.decodeEntities)(post.title) || (0, _i18n.__)('(no title)')
              };
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetchLinkSuggestions(_x) {
    return _ref.apply(this, arguments);
  };
}();

var EditorProvider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(EditorProvider, _Component);

  function EditorProvider(props) {
    var _this;

    (0, _classCallCheck2.default)(this, EditorProvider);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EditorProvider).apply(this, arguments));
    _this.getBlockEditorSettings = (0, _memize.default)(_this.getBlockEditorSettings, {
      maxSize: 1
    }); // Assume that we don't need to initialize in the case of an error recovery.

    if (props.recovery) {
      return (0, _possibleConstructorReturn2.default)(_this);
    }

    props.updatePostLock(props.settings.postLock);
    props.setupEditor(props.post, props.initialEdits, props.settings.template);

    if (props.settings.autosave) {
      props.createWarningNotice((0, _i18n.__)('There is an autosave of this post that is more recent than the version below.'), {
        id: 'autosave-exists',
        actions: [{
          label: (0, _i18n.__)('View the autosave'),
          url: props.settings.autosave.editLink
        }]
      });
    }

    return _this;
  }

  (0, _createClass2.default)(EditorProvider, [{
    key: "getBlockEditorSettings",
    value: function getBlockEditorSettings(settings, meta, onMetaChange, reusableBlocks, hasUploadPermissions) {
      return (0, _objectSpread2.default)({}, (0, _lodash.pick)(settings, ['alignWide', 'allowedBlockTypes', 'availableLegacyWidgets', 'bodyPlaceholder', 'colors', 'disableCustomColors', 'disableCustomFontSizes', 'focusMode', 'fontSizes', 'hasFixedToolbar', 'hasPermissionsToManageWidgets', 'imageSizes', 'isRTL', 'maxWidth', 'styles', 'templateLock', 'titlePlaceholder']), {
        __experimentalMetaSource: {
          value: meta,
          onChange: onMetaChange
        },
        __experimentalReusableBlocks: reusableBlocks,
        __experimentalMediaUpload: hasUploadPermissions ? _utils.mediaUpload : undefined,
        __experimentalFetchLinkSuggestions: fetchLinkSuggestions
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.updateEditorSettings(this.props.settings);

      if (!this.props.settings.styles) {
        return;
      }

      var updatedStyles = (0, _editorStyles.default)(this.props.settings.styles, '.editor-styles-wrapper');
      (0, _lodash.map)(updatedStyles, function (updatedCSS) {
        if (updatedCSS) {
          var node = document.createElement('style');
          node.innerHTML = updatedCSS;
          document.body.appendChild(node);
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.settings !== prevProps.settings) {
        this.props.updateEditorSettings(this.props.settings);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          blocks = _this$props.blocks,
          resetEditorBlocks = _this$props.resetEditorBlocks,
          isReady = _this$props.isReady,
          settings = _this$props.settings,
          meta = _this$props.meta,
          onMetaChange = _this$props.onMetaChange,
          reusableBlocks = _this$props.reusableBlocks,
          resetEditorBlocksWithoutUndoLevel = _this$props.resetEditorBlocksWithoutUndoLevel,
          hasUploadPermissions = _this$props.hasUploadPermissions;

      if (!isReady) {
        return null;
      }

      var editorSettings = this.getBlockEditorSettings(settings, meta, onMetaChange, reusableBlocks, hasUploadPermissions);
      return (0, _element.createElement)(_blockEditor.BlockEditorProvider, {
        value: blocks,
        onInput: resetEditorBlocksWithoutUndoLevel,
        onChange: resetEditorBlocks,
        settings: editorSettings,
        useSubRegistry: false
      }, children, (0, _element.createElement)(_reusableBlocksButtons.default, null));
    }
  }]);
  return EditorProvider;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      isEditorReady = _select.__unstableIsEditorReady,
      getEditorBlocks = _select.getEditorBlocks,
      getEditedPostAttribute = _select.getEditedPostAttribute,
      __experimentalGetReusableBlocks = _select.__experimentalGetReusableBlocks;

  var _select2 = select('core'),
      canUser = _select2.canUser;

  return {
    isReady: isEditorReady(),
    blocks: getEditorBlocks(),
    meta: getEditedPostAttribute('meta'),
    reusableBlocks: __experimentalGetReusableBlocks(),
    hasUploadPermissions: (0, _lodash.defaultTo)(canUser('create', 'media'), true)
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      setupEditor = _dispatch.setupEditor,
      updatePostLock = _dispatch.updatePostLock,
      resetEditorBlocks = _dispatch.resetEditorBlocks,
      editPost = _dispatch.editPost,
      updateEditorSettings = _dispatch.updateEditorSettings;

  var _dispatch2 = dispatch('core/notices'),
      createWarningNotice = _dispatch2.createWarningNotice;

  return {
    setupEditor: setupEditor,
    updatePostLock: updatePostLock,
    createWarningNotice: createWarningNotice,
    resetEditorBlocks: resetEditorBlocks,
    updateEditorSettings: updateEditorSettings,
    resetEditorBlocksWithoutUndoLevel: function resetEditorBlocksWithoutUndoLevel(blocks) {
      resetEditorBlocks(blocks, {
        __unstableShouldCreateUndoLevel: false
      });
    },
    onMetaChange: function onMetaChange(meta) {
      editPost({
        meta: meta
      });
    }
  };
})])(EditorProvider);

exports.default = _default;
//# sourceMappingURL=index.js.map