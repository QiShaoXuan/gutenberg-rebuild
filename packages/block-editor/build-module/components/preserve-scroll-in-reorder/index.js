import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { getScrollContainer } from '@wordpress/dom';
/**
 * Internal dependencies
 */

import { getBlockDOMNode } from '../../utils/dom';
/**
 * Non-visual component which preserves offset of selected block within nearest
 * scrollable container while reordering.
 *
 * @example
 *
 * ```jsx
 * <PreserveScrollInReorder />
 * ```
 */

var PreserveScrollInReorder =
/*#__PURE__*/
function (_Component) {
  _inherits(PreserveScrollInReorder, _Component);

  function PreserveScrollInReorder() {
    _classCallCheck(this, PreserveScrollInReorder);

    return _possibleConstructorReturn(this, _getPrototypeOf(PreserveScrollInReorder).apply(this, arguments));
  }

  _createClass(PreserveScrollInReorder, [{
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(prevProps) {
      var _this$props = this.props,
          blockOrder = _this$props.blockOrder,
          selectionStart = _this$props.selectionStart;

      if (blockOrder !== prevProps.blockOrder && selectionStart) {
        return this.getOffset(selectionStart);
      }

      return null;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (snapshot) {
        this.restorePreviousOffset(snapshot);
      }
    }
    /**
     * Given the block client ID of the start of the selection, saves the
     * block's top offset as an instance property before a reorder is to occur.
     *
     * @param {string} selectionStart Client ID of selected block.
     *
     * @return {number?} The scroll offset.
     */

  }, {
    key: "getOffset",
    value: function getOffset(selectionStart) {
      var blockNode = getBlockDOMNode(selectionStart);

      if (!blockNode) {
        return null;
      }

      return blockNode.getBoundingClientRect().top;
    }
    /**
     * After a block reordering, restores the previous viewport top offset.
     *
     * @param {number} offset The scroll offset.
     */

  }, {
    key: "restorePreviousOffset",
    value: function restorePreviousOffset(offset) {
      var selectionStart = this.props.selectionStart;
      var blockNode = getBlockDOMNode(selectionStart);

      if (blockNode) {
        var scrollContainer = getScrollContainer(blockNode);

        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollTop + blockNode.getBoundingClientRect().top - offset;
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return PreserveScrollInReorder;
}(Component);

export default withSelect(function (select) {
  return {
    blockOrder: select('core/block-editor').getBlockOrder(),
    selectionStart: select('core/block-editor').getBlockSelectionStart()
  };
})(PreserveScrollInReorder);
//# sourceMappingURL=index.js.map