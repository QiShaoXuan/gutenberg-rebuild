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
import { first, partial, castArray } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { IconButton } from '@wordpress/components';
import { getBlockType } from '@wordpress/blocks';
import { Component } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { withInstanceId, compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { getBlockMoverDescription } from './mover-description';
import { upArrow, downArrow, dragHandle } from './icons';
import { IconDragHandle } from './drag-handle';
export var BlockMover =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockMover, _Component);

  function BlockMover() {
    var _this;

    _classCallCheck(this, BlockMover);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockMover).apply(this, arguments));
    _this.state = {
      isFocused: false
    };
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(BlockMover, [{
    key: "onFocus",
    value: function onFocus() {
      this.setState({
        isFocused: true
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.setState({
        isFocused: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onMoveUp = _this$props.onMoveUp,
          onMoveDown = _this$props.onMoveDown,
          isFirst = _this$props.isFirst,
          isLast = _this$props.isLast,
          isDraggable = _this$props.isDraggable,
          onDragStart = _this$props.onDragStart,
          onDragEnd = _this$props.onDragEnd,
          clientIds = _this$props.clientIds,
          blockElementId = _this$props.blockElementId,
          blockType = _this$props.blockType,
          firstIndex = _this$props.firstIndex,
          isLocked = _this$props.isLocked,
          instanceId = _this$props.instanceId,
          isHidden = _this$props.isHidden;
      var isFocused = this.state.isFocused;
      var blocksCount = castArray(clientIds).length;

      if (isLocked || isFirst && isLast) {
        return null;
      } // We emulate a disabled state because forcefully applying the `disabled`
      // attribute on the button while it has focus causes the screen to change
      // to an unfocused state (body as active element) without firing blur on,
      // the rendering parent, leaving it unable to react to focus out.


      return createElement("div", {
        className: classnames('editor-block-mover block-editor-block-mover', {
          'is-visible': isFocused || !isHidden
        })
      }, createElement(IconButton, {
        className: "editor-block-mover__control block-editor-block-mover__control",
        onClick: isFirst ? null : onMoveUp,
        icon: upArrow,
        label: __('Move up'),
        "aria-describedby": "block-editor-block-mover__up-description-".concat(instanceId),
        "aria-disabled": isFirst,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      }), createElement(IconDragHandle, {
        className: "editor-block-mover__control block-editor-block-mover__control",
        icon: dragHandle,
        clientId: clientIds,
        blockElementId: blockElementId,
        isVisible: isDraggable,
        onDragStart: onDragStart,
        onDragEnd: onDragEnd
      }), createElement(IconButton, {
        className: "editor-block-mover__control block-editor-block-mover__control",
        onClick: isLast ? null : onMoveDown,
        icon: downArrow,
        label: __('Move down'),
        "aria-describedby": "block-editor-block-mover__down-description-".concat(instanceId),
        "aria-disabled": isLast,
        onFocus: this.onFocus,
        onBlur: this.onBlur
      }), createElement("span", {
        id: "block-editor-block-mover__up-description-".concat(instanceId),
        className: "editor-block-mover__description block-editor-block-mover__description"
      }, getBlockMoverDescription(blocksCount, blockType && blockType.title, firstIndex, isFirst, isLast, -1)), createElement("span", {
        id: "block-editor-block-mover__down-description-".concat(instanceId),
        className: "editor-block-mover__description block-editor-block-mover__description"
      }, getBlockMoverDescription(blocksCount, blockType && blockType.title, firstIndex, isFirst, isLast, 1)));
    }
  }]);

  return BlockMover;
}(Component);
export default compose(withSelect(function (select, _ref) {
  var clientIds = _ref.clientIds;

  var _select = select('core/block-editor'),
      getBlock = _select.getBlock,
      getBlockIndex = _select.getBlockIndex,
      getTemplateLock = _select.getTemplateLock,
      getBlockRootClientId = _select.getBlockRootClientId;

  var firstClientId = first(castArray(clientIds));
  var block = getBlock(firstClientId);
  var rootClientId = getBlockRootClientId(first(castArray(clientIds)));
  return {
    firstIndex: getBlockIndex(firstClientId, rootClientId),
    blockType: block ? getBlockType(block.name) : null,
    isLocked: getTemplateLock(rootClientId) === 'all',
    rootClientId: rootClientId
  };
}), withDispatch(function (dispatch, _ref2) {
  var clientIds = _ref2.clientIds,
      rootClientId = _ref2.rootClientId;

  var _dispatch = dispatch('core/block-editor'),
      moveBlocksDown = _dispatch.moveBlocksDown,
      moveBlocksUp = _dispatch.moveBlocksUp;

  return {
    onMoveDown: partial(moveBlocksDown, clientIds, rootClientId),
    onMoveUp: partial(moveBlocksUp, clientIds, rootClientId)
  };
}), withInstanceId)(BlockMover);
//# sourceMappingURL=index.js.map