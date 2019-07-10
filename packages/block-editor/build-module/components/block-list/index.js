import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { findLast, map, invert, mapValues, sortBy, throttle } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { withSelect, withDispatch, __experimentalAsyncModeProvider as AsyncModeProvider } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BlockListBlock from './block';
import BlockListAppender from '../block-list-appender';
import { getBlockDOMNode } from '../../utils/dom';

var forceSyncUpdates = function forceSyncUpdates(WrappedComponent) {
  return function (props) {
    return createElement(AsyncModeProvider, {
      value: false
    }, createElement(WrappedComponent, props));
  };
};

var BlockList =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockList, _Component);

  function BlockList(props) {
    var _this;

    _classCallCheck(this, BlockList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockList).call(this, props));
    _this.onSelectionStart = _this.onSelectionStart.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onSelectionEnd = _this.onSelectionEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setBlockRef = _this.setBlockRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setLastClientY = _this.setLastClientY.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPointerMove = throttle(_this.onPointerMove.bind(_assertThisInitialized(_assertThisInitialized(_this))), 100); // Browser does not fire `*move` event when the pointer position changes
    // relative to the document, so fire it with the last known position.

    _this.onScroll = function () {
      return _this.onPointerMove({
        clientY: _this.lastClientY
      });
    };

    _this.lastClientY = 0;
    _this.nodes = {};
    return _this;
  }

  _createClass(BlockList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('mousemove', this.setLastClientY);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('mousemove', this.setLastClientY);
    }
  }, {
    key: "setLastClientY",
    value: function setLastClientY(_ref) {
      var clientY = _ref.clientY;
      this.lastClientY = clientY;
    }
  }, {
    key: "setBlockRef",
    value: function setBlockRef(node, clientId) {
      if (node === null) {
        delete this.nodes[clientId];
      } else {
        this.nodes = _objectSpread({}, this.nodes, _defineProperty({}, clientId, node));
      }
    }
    /**
     * Handles a pointer move event to update the extent of the current cursor
     * multi-selection.
     *
     * @param {MouseEvent} event A mousemove event object.
     *
     * @return {void}
     */

  }, {
    key: "onPointerMove",
    value: function onPointerMove(_ref2) {
      var clientY = _ref2.clientY;

      // We don't start multi-selection until the mouse starts moving, so as
      // to avoid dispatching multi-selection actions on an in-place click.
      if (!this.props.isMultiSelecting) {
        this.props.onStartMultiSelect();
      }

      var blockContentBoundaries = getBlockDOMNode(this.selectionAtStart).getBoundingClientRect(); // prevent multi-selection from triggering when the selected block is a float
      // and the cursor is still between the top and the bottom of the block.

      if (clientY >= blockContentBoundaries.top && clientY <= blockContentBoundaries.bottom) {
        return;
      }

      var y = clientY - blockContentBoundaries.top;
      var key = findLast(this.coordMapKeys, function (coordY) {
        return coordY < y;
      });
      this.onSelectionChange(this.coordMap[key]);
    }
    /**
     * Binds event handlers to the document for tracking a pending multi-select
     * in response to a mousedown event occurring in a rendered block.
     *
     * @param {string} clientId Client ID of block where mousedown occurred.
     *
     * @return {void}
     */

  }, {
    key: "onSelectionStart",
    value: function onSelectionStart(clientId) {
      if (!this.props.isSelectionEnabled) {
        return;
      }

      var boundaries = this.nodes[clientId].getBoundingClientRect(); // Create a clientId to Y coördinate map.

      var clientIdToCoordMap = mapValues(this.nodes, function (node) {
        return node.getBoundingClientRect().top - boundaries.top;
      }); // Cache a Y coördinate to clientId map for use in `onPointerMove`.

      this.coordMap = invert(clientIdToCoordMap); // Cache an array of the Y coördinates for use in `onPointerMove`.
      // Sort the coördinates, as `this.nodes` will not necessarily reflect
      // the current block sequence.

      this.coordMapKeys = sortBy(Object.values(clientIdToCoordMap));
      this.selectionAtStart = clientId;
      window.addEventListener('mousemove', this.onPointerMove); // Capture scroll on all elements.

      window.addEventListener('scroll', this.onScroll, true);
      window.addEventListener('mouseup', this.onSelectionEnd);
    }
    /**
     * Handles multi-selection changes in response to pointer move.
     *
     * @param {string} clientId Client ID of block under cursor in multi-select
     *                          drag.
     */

  }, {
    key: "onSelectionChange",
    value: function onSelectionChange(clientId) {
      var _this$props = this.props,
          onMultiSelect = _this$props.onMultiSelect,
          selectionStart = _this$props.selectionStart,
          selectionEnd = _this$props.selectionEnd;
      var selectionAtStart = this.selectionAtStart;
      var isAtStart = selectionAtStart === clientId;

      if (!selectionAtStart || !this.props.isSelectionEnabled) {
        return;
      } // If multi-selecting and cursor extent returns to the start of
      // selection, cancel multi-select.


      if (isAtStart && selectionStart) {
        onMultiSelect(null, null);
      } // Expand multi-selection to block under cursor.


      if (!isAtStart && selectionEnd !== clientId) {
        onMultiSelect(selectionAtStart, clientId);
      }
    }
    /**
     * Handles a mouseup event to end the current cursor multi-selection.
     *
     * @return {void}
     */

  }, {
    key: "onSelectionEnd",
    value: function onSelectionEnd() {
      // Cancel throttled calls.
      this.onPointerMove.cancel();
      delete this.coordMap;
      delete this.coordMapKeys;
      delete this.selectionAtStart;
      window.removeEventListener('mousemove', this.onPointerMove);
      window.removeEventListener('scroll', this.onScroll, true);
      window.removeEventListener('mouseup', this.onSelectionEnd); // We may or may not be in a multi-selection when mouseup occurs (e.g.
      // an in-place mouse click), so only trigger stop if multi-selecting.

      if (this.props.isMultiSelecting) {
        this.props.onStopMultiSelect();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          blockClientIds = _this$props2.blockClientIds,
          rootClientId = _this$props2.rootClientId,
          isDraggable = _this$props2.isDraggable,
          selectedBlockClientId = _this$props2.selectedBlockClientId,
          multiSelectedBlockClientIds = _this$props2.multiSelectedBlockClientIds,
          hasMultiSelection = _this$props2.hasMultiSelection;
      return createElement("div", {
        className: "editor-block-list__layout block-editor-block-list__layout"
      }, map(blockClientIds, function (clientId, blockIndex) {
        var isBlockInSelection = hasMultiSelection ? multiSelectedBlockClientIds.includes(clientId) : selectedBlockClientId === clientId;
        return createElement(AsyncModeProvider, {
          key: 'block-' + clientId,
          value: !isBlockInSelection
        }, createElement(BlockListBlock, {
          clientId: clientId,
          blockRef: _this2.setBlockRef,
          onSelectionStart: _this2.onSelectionStart,
          rootClientId: rootClientId,
          isFirst: blockIndex === 0,
          isLast: blockIndex === blockClientIds.length - 1,
          isDraggable: isDraggable
        }));
      }), createElement(BlockListAppender, {
        rootClientId: rootClientId
      }));
    }
  }]);

  return BlockList;
}(Component);

export default compose([// This component needs to always be synchronous
// as it's the one changing the async mode
// depending on the block selection.
forceSyncUpdates, withSelect(function (select, ownProps) {
  var _select = select('core/block-editor'),
      getBlockOrder = _select.getBlockOrder,
      isSelectionEnabled = _select.isSelectionEnabled,
      isMultiSelecting = _select.isMultiSelecting,
      getMultiSelectedBlocksStartClientId = _select.getMultiSelectedBlocksStartClientId,
      getMultiSelectedBlocksEndClientId = _select.getMultiSelectedBlocksEndClientId,
      getSelectedBlockClientId = _select.getSelectedBlockClientId,
      getMultiSelectedBlockClientIds = _select.getMultiSelectedBlockClientIds,
      hasMultiSelection = _select.hasMultiSelection;

  var rootClientId = ownProps.rootClientId;
  return {
    blockClientIds: getBlockOrder(rootClientId),
    selectionStart: getMultiSelectedBlocksStartClientId(),
    selectionEnd: getMultiSelectedBlocksEndClientId(),
    isSelectionEnabled: isSelectionEnabled(),
    isMultiSelecting: isMultiSelecting(),
    selectedBlockClientId: getSelectedBlockClientId(),
    multiSelectedBlockClientIds: getMultiSelectedBlockClientIds(),
    hasMultiSelection: hasMultiSelection()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      startMultiSelect = _dispatch.startMultiSelect,
      stopMultiSelect = _dispatch.stopMultiSelect,
      multiSelect = _dispatch.multiSelect;

  return {
    onStartMultiSelect: startMultiSelect,
    onStopMultiSelect: stopMultiSelect,
    onMultiSelect: multiSelect
  };
})])(BlockList);
//# sourceMappingURL=index.js.map