"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _blocks = require("@wordpress/blocks");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function BlockActions(_ref) {
  var onDuplicate = _ref.onDuplicate,
      onRemove = _ref.onRemove,
      onInsertBefore = _ref.onInsertBefore,
      onInsertAfter = _ref.onInsertAfter,
      isLocked = _ref.isLocked,
      canDuplicate = _ref.canDuplicate,
      children = _ref.children;
  return children({
    onDuplicate: onDuplicate,
    onRemove: onRemove,
    onInsertAfter: onInsertAfter,
    onInsertBefore: onInsertBefore,
    isLocked: isLocked,
    canDuplicate: canDuplicate
  });
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, props) {
  var _select = select('core/block-editor'),
      getBlocksByClientId = _select.getBlocksByClientId,
      getTemplateLock = _select.getTemplateLock,
      getBlockRootClientId = _select.getBlockRootClientId;

  var blocks = getBlocksByClientId(props.clientIds);
  var canDuplicate = (0, _lodash.every)(blocks, function (block) {
    return !!block && (0, _blocks.hasBlockSupport)(block.name, 'multiple', true);
  });
  var rootClientId = getBlockRootClientId(props.clientIds[0]);
  return {
    isLocked: !!getTemplateLock(rootClientId),
    blocks: blocks,
    canDuplicate: canDuplicate,
    rootClientId: rootClientId,
    extraProps: props
  };
}), (0, _data.withDispatch)(function (dispatch, props, _ref2) {
  var select = _ref2.select;
  var clientIds = props.clientIds,
      rootClientId = props.rootClientId,
      blocks = props.blocks,
      isLocked = props.isLocked,
      canDuplicate = props.canDuplicate;

  var _dispatch = dispatch('core/block-editor'),
      insertBlocks = _dispatch.insertBlocks,
      multiSelect = _dispatch.multiSelect,
      removeBlocks = _dispatch.removeBlocks,
      insertDefaultBlock = _dispatch.insertDefaultBlock;

  return {
    onDuplicate: function onDuplicate() {
      if (isLocked || !canDuplicate) {
        return;
      }

      var _select2 = select('core/block-editor'),
          getBlockIndex = _select2.getBlockIndex;

      var lastSelectedIndex = getBlockIndex((0, _lodash.last)((0, _lodash.castArray)(clientIds)), rootClientId);
      var clonedBlocks = blocks.map(function (block) {
        return (0, _blocks.cloneBlock)(block);
      });
      insertBlocks(clonedBlocks, lastSelectedIndex + 1, rootClientId);

      if (clonedBlocks.length > 1) {
        multiSelect((0, _lodash.first)(clonedBlocks).clientId, (0, _lodash.last)(clonedBlocks).clientId);
      }
    },
    onRemove: function onRemove() {
      if (!isLocked) {
        removeBlocks(clientIds);
      }
    },
    onInsertBefore: function onInsertBefore() {
      if (!isLocked) {
        var _select3 = select('core/block-editor'),
            getBlockIndex = _select3.getBlockIndex;

        var firstSelectedIndex = getBlockIndex((0, _lodash.first)((0, _lodash.castArray)(clientIds)), rootClientId);
        insertDefaultBlock({}, rootClientId, firstSelectedIndex);
      }
    },
    onInsertAfter: function onInsertAfter() {
      if (!isLocked) {
        var _select4 = select('core/block-editor'),
            getBlockIndex = _select4.getBlockIndex;

        var lastSelectedIndex = getBlockIndex((0, _lodash.last)((0, _lodash.castArray)(clientIds)), rootClientId);
        insertDefaultBlock({}, rootClientId, lastSelectedIndex + 1);
      }
    }
  };
})])(BlockActions);

exports.default = _default;
//# sourceMappingURL=index.js.map