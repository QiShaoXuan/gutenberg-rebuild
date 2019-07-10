import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { find } from 'lodash';
/**
 * WordPress dependencies
 */

import { createBlock, findTransform, getBlockTransforms, getBlockType, hasBlockSupport } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { Warning } from '@wordpress/block-editor';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { compose, createHigherOrderComponent } from '@wordpress/compose';
var enhance = compose(
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
withSelect(function (select, block) {
  var multiple = hasBlockSupport(block.name, 'multiple', true); // For block types with `multiple` support, there is no "original
  // block" to be found in the content, as the block itself is valid.

  if (multiple) {
    return {};
  } // Otherwise, only pass `originalBlockClientId` if it refers to a different
  // block from the current one.


  var blocks = select('core/block-editor').getBlocks();
  var firstOfSameType = find(blocks, function (_ref) {
    var name = _ref.name;
    return block.name === name;
  });
  var isInvalid = firstOfSameType && firstOfSameType.clientId !== block.clientId;
  return {
    originalBlockClientId: isInvalid && firstOfSameType.clientId
  };
}), withDispatch(function (dispatch, _ref2) {
  var originalBlockClientId = _ref2.originalBlockClientId;
  return {
    selectFirst: function selectFirst() {
      return dispatch('core/block-editor').selectBlock(originalBlockClientId);
    }
  };
}));
var withMultipleValidation = createHigherOrderComponent(function (BlockEdit) {
  return enhance(function (_ref3) {
    var originalBlockClientId = _ref3.originalBlockClientId,
        selectFirst = _ref3.selectFirst,
        props = _objectWithoutProperties(_ref3, ["originalBlockClientId", "selectFirst"]);

    if (!originalBlockClientId) {
      return createElement(BlockEdit, props);
    }

    var blockType = getBlockType(props.name);
    var outboundType = getOutboundType(props.name);
    return [createElement("div", {
      key: "invalid-preview",
      style: {
        minHeight: '60px'
      }
    }, createElement(BlockEdit, _extends({
      key: "block-edit"
    }, props))), createElement(Warning, {
      key: "multiple-use-warning",
      actions: [createElement(Button, {
        key: "find-original",
        isLarge: true,
        onClick: selectFirst
      }, __('Find original')), createElement(Button, {
        key: "remove",
        isLarge: true,
        onClick: function onClick() {
          return props.onReplace([]);
        }
      }, __('Remove')), outboundType && createElement(Button, {
        key: "transform",
        isLarge: true,
        onClick: function onClick() {
          return props.onReplace(createBlock(outboundType.name, props.attributes));
        }
      }, __('Transform into:'), ' ', outboundType.title)]
    }, createElement("strong", null, blockType.title, ": "), __('This block can only be used once.'))];
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
  var transform = findTransform(getBlockTransforms('to', blockName), function (_ref4) {
    var type = _ref4.type,
        blocks = _ref4.blocks;
    return type === 'block' && blocks.length === 1;
  } // What about when .length > 1?
  );

  if (!transform) {
    return null;
  }

  return getBlockType(transform.blocks[0]);
}

addFilter('editor.BlockEdit', 'core/edit-post/validate-multiple-use/with-multiple-validation', withMultipleValidation);
//# sourceMappingURL=index.js.map