import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { map, pick, defaultTo } from 'lodash';
import memize from 'memize';
/**
 * WordPress dependencies
 */

import { compose } from '@wordpress/compose';
import { Component } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { BlockEditorProvider } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
/**
 * Internal dependencies
 */

import transformStyles from '../../editor-styles';
import { mediaUpload } from '../../utils';
import ReusableBlocksButtons from '../reusable-blocks-buttons';

var fetchLinkSuggestions =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(search) {
    var posts;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return apiFetch({
              path: addQueryArgs('/wp/v2/search', {
                search: search,
                per_page: 20,
                type: 'post'
              })
            });

          case 2:
            posts = _context.sent;
            return _context.abrupt("return", map(posts, function (post) {
              return {
                id: post.id,
                url: post.url,
                title: decodeEntities(post.title) || __('(no title)')
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
  _inherits(EditorProvider, _Component);

  function EditorProvider(props) {
    var _this;

    _classCallCheck(this, EditorProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EditorProvider).apply(this, arguments));
    _this.getBlockEditorSettings = memize(_this.getBlockEditorSettings, {
      maxSize: 1
    }); // Assume that we don't need to initialize in the case of an error recovery.

    if (props.recovery) {
      return _possibleConstructorReturn(_this);
    }

    props.updatePostLock(props.settings.postLock);
    props.setupEditor(props.post, props.initialEdits, props.settings.template);

    if (props.settings.autosave) {
      props.createWarningNotice(__('There is an autosave of this post that is more recent than the version below.'), {
        id: 'autosave-exists',
        actions: [{
          label: __('View the autosave'),
          url: props.settings.autosave.editLink
        }]
      });
    }

    return _this;
  }

  _createClass(EditorProvider, [{
    key: "getBlockEditorSettings",
    value: function getBlockEditorSettings(settings, meta, onMetaChange, reusableBlocks, hasUploadPermissions) {
      return _objectSpread({}, pick(settings, ['alignWide', 'allowedBlockTypes', 'availableLegacyWidgets', 'bodyPlaceholder', 'colors', 'disableCustomColors', 'disableCustomFontSizes', 'focusMode', 'fontSizes', 'hasFixedToolbar', 'hasPermissionsToManageWidgets', 'imageSizes', 'isRTL', 'maxWidth', 'styles', 'templateLock', 'titlePlaceholder']), {
        __experimentalMetaSource: {
          value: meta,
          onChange: onMetaChange
        },
        __experimentalReusableBlocks: reusableBlocks,
        __experimentalMediaUpload: hasUploadPermissions ? mediaUpload : undefined,
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

      var updatedStyles = transformStyles(this.props.settings.styles, '.editor-styles-wrapper');
      map(updatedStyles, function (updatedCSS) {
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
      return createElement(BlockEditorProvider, {
        value: blocks,
        onInput: resetEditorBlocksWithoutUndoLevel,
        onChange: resetEditorBlocks,
        settings: editorSettings,
        useSubRegistry: false
      }, children, createElement(ReusableBlocksButtons, null));
    }
  }]);

  return EditorProvider;
}(Component);

export default compose([withSelect(function (select) {
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
    hasUploadPermissions: defaultTo(canUser('create', 'media'), true)
  };
}), withDispatch(function (dispatch) {
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
//# sourceMappingURL=index.js.map