"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _blocks = require("@wordpress/blocks");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _hooks = require("@wordpress/hooks");

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var enhance = (0, _compose.compose)(
/**
 * For blocks whose block type doesn't support `multiple`, provides the
 * wrapped component with `originalBlockClientId` -- a reference to the
 * first block of the same type in the content -- if and only if that
 * "original" block is not the current one. Thus, an inexisting
 * `originalBlockClientId` prop signals that the block is valid.
 *
 * @param {Component} WrappedBlockEdit A filtered BlockEdit instance.
 *
 * @return {Component} Enhanced component with merged state data props.
 */
(0, _data.withSelect)(function (select, block) {
  var multiple = (0, _blocks.hasBlockSupport)(block.name, 'multiple', true); // For block types with `multiple` support, there is no "original
  // block" to be found in the content, as the block itself is valid.

  if (multiple) {
    return {};
  } // Otherwise, only pass `originalBlockClientId` if it refers to a different
  // block from the current one.


  var blocks = select('core/block-editor').getBlocks();
  var firstOfSameType = (0, _lodash.find)(blocks, function (_ref) {
    var name = _ref.name;
    return block.name === name;
  });
  var isInvalid = firstOfSameType && firstOfSameType.clientId !== block.clientId;
  return {
    originalBlockClientId: isInvalid && firstOfSameType.clientId
  };
}), (0, _data.withDispatch)(function (dispatch, _ref2) {
  var originalBlockClientId = _ref2.originalBlockClientId;
  return {
    selectFirst: function selectFirst() {
      return dispatch('core/block-editor').selectBlock(originalBlockClientId);
    }
  };
}));
var withMultipleValidation = (0, _compose.createHigherOrderComponent)(function (BlockEdit) {
  return enhance(function (_ref3) {
    var originalBlockClientId = _ref3.originalBlockClientId,
        selectFirst = _ref3.selectFirst,
        props = (0, _objectWithoutProperties2.default)(_ref3, ["originalBlockClientId", "selectFirst"]);

    if (!originalBlockClientId) {
      return (0, _element.createElement)(BlockEdit, props);
    }

    var blockType = (0, _blocks.getBlockType)(props.name);
    var outboundType = getOutboundType(props.name);
    return [(0, _element.createElement)("div", {
      key: "invalid-preview",
      style: {
        minHeight: '60px'
      }
    }, (0, _element.createElement)(BlockEdit, (0, _extends2.default)({
      key: "block-edit"
    }, props))), (0, _element.createElement)(_blockEditor.Warning, {
      key: "multiple-use-warning",
      actions: [(0, _element.createElement)(_components.Button, {
        key: "find-original",
        isLarge: true,
        onClick: selectFirst
      }, (0, _i18n.__)('Find original')), (0, _element.createElement)(_components.Button, {
        key: "remove",
        isLarge: true,
        onClick: function onClick() {
          return props.onReplace([]);
        }
      }, (0, _i18n.__)('Remove')), outboundType && (0, _element.createElement)(_components.Button, {
        key: "transform",
        isLarge: true,
        onClick: function onClick() {
          return props.onReplace((0, _blocks.createBlock)(outboundType.name, props.attributes));
        }
      }, (0, _i18n.__)('Transform into:'), ' ', outboundType.title)]
    }, (0, _element.createElement)("strong", null, blockType.title, ": "), (0, _i18n.__)('This block can only be used once.'))];
  });
}, 'withMultipleValidation');
/**
 * Given a base block name, returns the default block type to which to offer
 * transforms.
 *
 * @param {string} blockName Base block name.
 *
 * @return {?Object} The chosen default block type.
 */

function getOutboundType(blockName) {
  // Grab the first outbound transform
  var transform = (0, _blocks.findTransform)((0, _blocks.getBlockTransforms)('to', blockName), function (_ref4) {
    var type = _ref4.type,
        blocks = _ref4.blocks;
    return type === 'block' && blocks.length === 1;
  } // What about when .length > 1?
  );

  if (!transform) {
    return null;
  }

  return (0, _blocks.getBlockType)(transform.blocks[0]);
}

(0, _hooks.addFilter)('editor.BlockEdit', 'core/edit-post/validate-multiple-use/with-multiple-validation', withMultipleValidation);
//# sourceMappingURL=index.js.map