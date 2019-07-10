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

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _viewport = require("@wordpress/viewport");

var _data = require("@wordpress/data");

var _blocks = require("@wordpress/blocks");

var _isShallowEqual = _interopRequireDefault(require("@wordpress/is-shallow-equal"));

var _compose = require("@wordpress/compose");

var _blockList = _interopRequireDefault(require("../block-list"));

var _context = require("../block-edit/context");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var InnerBlocks =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(InnerBlocks, _Component);

  function InnerBlocks() {
    var _this;

    (0, _classCallCheck2.default)(this, InnerBlocks);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InnerBlocks).apply(this, arguments));
    _this.state = {
      templateInProcess: !!_this.props.template
    };

    _this.updateNestedSettings();

    return _this;
  }

  (0, _createClass2.default)(InnerBlocks, [{
    key: "getTemplateLock",
    value: function getTemplateLock() {
      var _this$props = this.props,
          templateLock = _this$props.templateLock,
          parentLock = _this$props.parentLock;
      return templateLock === undefined ? parentLock : templateLock;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var innerBlocks = this.props.block.innerBlocks; // only synchronize innerBlocks with template if innerBlocks are empty or a locking all exists

      if (innerBlocks.length === 0 || this.getTemplateLock() === 'all') {
        this.synchronizeBlocksWithTemplate();
      }

      if (this.state.templateInProcess) {
        this.setState({
          templateInProcess: false
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          template = _this$props2.template,
          block = _this$props2.block;
      var innerBlocks = block.innerBlocks;
      this.updateNestedSettings(); // only synchronize innerBlocks with template if innerBlocks are empty or a locking all exists

      if (innerBlocks.length === 0 || this.getTemplateLock() === 'all') {
        var hasTemplateChanged = !(0, _lodash.isEqual)(template, prevProps.template);

        if (hasTemplateChanged) {
          this.synchronizeBlocksWithTemplate();
        }
      }
    }
    /**
     * Called on mount or when a mismatch exists between the templates and
     * inner blocks, synchronizes inner blocks with the template, replacing
     * current blocks.
     */

  }, {
    key: "synchronizeBlocksWithTemplate",
    value: function synchronizeBlocksWithTemplate() {
      var _this$props3 = this.props,
          template = _this$props3.template,
          block = _this$props3.block,
          replaceInnerBlocks = _this$props3.replaceInnerBlocks;
      var innerBlocks = block.innerBlocks; // Synchronize with templates. If the next set differs, replace.

      var nextBlocks = (0, _blocks.synchronizeBlocksWithTemplate)(innerBlocks, template);

      if (!(0, _lodash.isEqual)(nextBlocks, innerBlocks)) {
        replaceInnerBlocks(nextBlocks);
      }
    }
  }, {
    key: "updateNestedSettings",
    value: function updateNestedSettings() {
      var _this$props4 = this.props,
          blockListSettings = _this$props4.blockListSettings,
          allowedBlocks = _this$props4.allowedBlocks,
          updateNestedSettings = _this$props4.updateNestedSettings;
      var newSettings = {
        allowedBlocks: allowedBlocks,
        templateLock: this.getTemplateLock()
      };

      if (!(0, _isShallowEqual.default)(blockListSettings, newSettings)) {
        updateNestedSettings(newSettings);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          clientId = _this$props5.clientId,
          isSmallScreen = _this$props5.isSmallScreen,
          isSelectedBlockInRoot = _this$props5.isSelectedBlockInRoot;
      var templateInProcess = this.state.templateInProcess;
      var classes = (0, _classnames.default)('editor-inner-blocks block-editor-inner-blocks', {
        'has-overlay': isSmallScreen && !isSelectedBlockInRoot
      });
      return (0, _element.createElement)("div", {
        className: classes
      }, !templateInProcess && (0, _element.createElement)(_blockList.default, {
        rootClientId: clientId
      }));
    }
  }]);
  return InnerBlocks;
}(_element.Component);

InnerBlocks = (0, _compose.compose)([(0, _context.withBlockEditContext)(function (context) {
  return (0, _lodash.pick)(context, ['clientId']);
}), (0, _viewport.withViewportMatch)({
  isSmallScreen: '< medium'
}), (0, _data.withSelect)(function (select, ownProps) {
  var _select = select('core/block-editor'),
      isBlockSelected = _select.isBlockSelected,
      hasSelectedInnerBlock = _select.hasSelectedInnerBlock,
      getBlock = _select.getBlock,
      getBlockListSettings = _select.getBlockListSettings,
      getBlockRootClientId = _select.getBlockRootClientId,
      getTemplateLock = _select.getTemplateLock;

  var clientId = ownProps.clientId;
  var rootClientId = getBlockRootClientId(clientId);
  return {
    isSelectedBlockInRoot: isBlockSelected(clientId) || hasSelectedInnerBlock(clientId),
    block: getBlock(clientId),
    blockListSettings: getBlockListSettings(clientId),
    parentLock: getTemplateLock(rootClientId)
  };
}), (0, _data.withDispatch)(function (dispatch, ownProps) {
  var _dispatch = dispatch('core/block-editor'),
      _replaceInnerBlocks = _dispatch.replaceInnerBlocks,
      updateBlockListSettings = _dispatch.updateBlockListSettings;

  var block = ownProps.block,
      clientId = ownProps.clientId,
      _ownProps$templateIns = ownProps.templateInsertUpdatesSelection,
      templateInsertUpdatesSelection = _ownProps$templateIns === void 0 ? true : _ownProps$templateIns;
  return {
    replaceInnerBlocks: function replaceInnerBlocks(blocks) {
      _replaceInnerBlocks(clientId, blocks, block.innerBlocks.length === 0 && templateInsertUpdatesSelection);
    },
    updateNestedSettings: function updateNestedSettings(settings) {
      dispatch(updateBlockListSettings(clientId, settings));
    }
  };
})])(InnerBlocks);
InnerBlocks.Content = (0, _blocks.withBlockContentContext)(function (_ref) {
  var BlockContent = _ref.BlockContent;
  return (0, _element.createElement)(BlockContent, null);
});
var _default = InnerBlocks;
exports.default = _default;
//# sourceMappingURL=index.js.map