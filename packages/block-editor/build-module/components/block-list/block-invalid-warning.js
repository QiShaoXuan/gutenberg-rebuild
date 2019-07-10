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
import { __, _x } from '@wordpress/i18n';
import { Button, Modal } from '@wordpress/components';
import { Component } from '@wordpress/element';
import { getBlockType, createBlock, rawHandler } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import Warning from '../warning';
import BlockCompare from '../block-compare';
export var BlockInvalidWarning =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockInvalidWarning, _Component);

  function BlockInvalidWarning(props) {
    var _this;

    _classCallCheck(this, BlockInvalidWarning);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockInvalidWarning).call(this, props));
    _this.state = {
      compare: false
    };
    _this.onCompare = _this.onCompare.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onCompareClose = _this.onCompareClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(BlockInvalidWarning, [{
    key: "onCompare",
    value: function onCompare() {
      this.setState({
        compare: true
      });
    }
  }, {
    key: "onCompareClose",
    value: function onCompareClose() {
      this.setState({
        compare: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          convertToHTML = _this$props.convertToHTML,
          convertToBlocks = _this$props.convertToBlocks,
          convertToClassic = _this$props.convertToClassic,
          attemptBlockRecovery = _this$props.attemptBlockRecovery,
          block = _this$props.block;
      var hasHTMLBlock = !!getBlockType('core/html');
      var compare = this.state.compare;
      var hiddenActions = [{
        title: __('Convert to Classic Block'),
        onClick: convertToClassic
      }, {
        title: __('Attempt Block Recovery'),
        onClick: attemptBlockRecovery
      }];

      if (compare) {
        return createElement(Modal, {
          title: // translators: Dialog title to fix block content
          __('Resolve Block'),
          onRequestClose: this.onCompareClose,
          className: "editor-block-compare block-editor-block-compare"
        }, createElement(BlockCompare, {
          block: block,
          onKeep: convertToHTML,
          onConvert: convertToBlocks,
          convertor: blockToBlocks,
          convertButtonText: __('Convert to Blocks')
        }));
      }

      return createElement(Warning, {
        actions: [createElement(Button, {
          key: "convert",
          onClick: this.onCompare,
          isLarge: true,
          isPrimary: !hasHTMLBlock
        }, // translators: Button to fix block content
        _x('Resolve', 'imperative verb')), hasHTMLBlock && createElement(Button, {
          key: "edit",
          onClick: convertToHTML,
          isLarge: true,
          isPrimary: true
        }, __('Convert to HTML'))],
        secondaryActions: hiddenActions
      }, __('This block contains unexpected or invalid content.'));
    }
  }]);

  return BlockInvalidWarning;
}(Component);

var blockToClassic = function blockToClassic(block) {
  return createBlock('core/freeform', {
    content: block.originalContent
  });
};

var blockToHTML = function blockToHTML(block) {
  return createBlock('core/html', {
    content: block.originalContent
  });
};

var blockToBlocks = function blockToBlocks(block) {
  return rawHandler({
    HTML: block.originalContent
  });
};

var recoverBlock = function recoverBlock(_ref) {
  var name = _ref.name,
      attributes = _ref.attributes,
      innerBlocks = _ref.innerBlocks;
  return createBlock(name, attributes, innerBlocks);
};

export default compose([withSelect(function (select, _ref2) {
  var clientId = _ref2.clientId;
  return {
    block: select('core/block-editor').getBlock(clientId)
  };
}), withDispatch(function (dispatch, _ref3) {
  var block = _ref3.block;

  var _dispatch = dispatch('core/block-editor'),
      replaceBlock = _dispatch.replaceBlock;

  return {
    convertToClassic: function convertToClassic() {
      replaceBlock(block.clientId, blockToClassic(block));
    },
    convertToHTML: function convertToHTML() {
      replaceBlock(block.clientId, blockToHTML(block));
    },
    convertToBlocks: function convertToBlocks() {
      replaceBlock(block.clientId, blockToBlocks(block));
    },
    attemptBlockRecovery: function attemptBlockRecovery() {
      replaceBlock(block.clientId, recoverBlock(block));
    }
  };
})])(BlockInvalidWarning);
//# sourceMappingURL=block-invalid-warning.js.map