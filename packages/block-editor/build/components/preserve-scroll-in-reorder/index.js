"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _dom = require("@wordpress/dom");

var _dom2 = require("../../utils/dom");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

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
  (0, _inherits2.default)(PreserveScrollInReorder, _Component);

  function PreserveScrollInReorder() {
    (0, _classCallCheck2.default)(this, PreserveScrollInReorder);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PreserveScrollInReorder).apply(this, arguments));
  }

  (0, _createClass2.default)(PreserveScrollInReorder, [{
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
      var blockNode = (0, _dom2.getBlockDOMNode)(selectionStart);

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
      var blockNode = (0, _dom2.getBlockDOMNode)(selectionStart);

      if (blockNode) {
        var scrollContainer = (0, _dom.getScrollContainer)(blockNode);

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
}(_element.Component);

var _default = (0, _data.withSelect)(function (select) {
  return {
    blockOrder: select('core/block-editor').getBlockOrder(),
    selectionStart: select('core/block-editor').getBlockSelectionStart()
  };
})(PreserveScrollInReorder);

exports.default = _default;
//# sourceMappingURL=index.js.map