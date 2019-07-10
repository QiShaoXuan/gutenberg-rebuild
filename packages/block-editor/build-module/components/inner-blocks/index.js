import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { pick, isEqual } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { withViewportMatch } from '@wordpress/viewport';
import { Component } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { synchronizeBlocksWithTemplate as _synchronizeBlocksWithTemplate, withBlockContentContext } from '@wordpress/blocks';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BlockList from '../block-list';
import { withBlockEditContext } from '../block-edit/context';

var InnerBlocks =
/*#__PURE__*/
function (_Component) {
  _inherits(InnerBlocks, _Component);

  function InnerBlocks() {
    var _this;

    _classCallCheck(this, InnerBlocks);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InnerBlocks).apply(this, arguments));
    _this.state = {
      templateInProcess: !!_this.props.template
    };

    _this.updateNestedSettings();

    return _this;
  }

  _createClass(InnerBlocks, [{
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
        var hasTemplateChanged = !isEqual(template, prevProps.template);

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

      var nextBlocks = _synchronizeBlocksWithTemplate(innerBlocks, template);

      if (!isEqual(nextBlocks, innerBlocks)) {
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

      if (!isShallowEqual(blockListSettings, newSettings)) {
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
      var classes = classnames('editor-inner-blocks block-editor-inner-blocks', {
        'has-overlay': isSmallScreen && !isSelectedBlockInRoot
      });
      return createElement("div", {
        className: classes
      }, !templateInProcess && createElement(BlockList, {
        rootClientId: clientId
      }));
    }
  }]);

  return InnerBlocks;
}(Component);

InnerBlocks = compose([withBlockEditContext(function (context) {
  return pick(context, ['clientId']);
}), withViewportMatch({
  isSmallScreen: '< medium'
}), withSelect(function (select, ownProps) {
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
}), withDispatch(function (dispatch, ownProps) {
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
InnerBlocks.Content = withBlockContentContext(function (_ref) {
  var BlockContent = _ref.BlockContent;
  return createElement(BlockContent, null);
});
export default InnerBlocks;
//# sourceMappingURL=index.js.map