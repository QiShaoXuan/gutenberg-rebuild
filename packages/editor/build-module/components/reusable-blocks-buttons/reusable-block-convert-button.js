import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop, every } from 'lodash';
/**
 * WordPress dependencies
 */

import { Fragment } from '@wordpress/element';
import { MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { hasBlockSupport, isReusableBlock } from '@wordpress/blocks';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
export function ReusableBlockConvertButton(_ref) {
  var isVisible = _ref.isVisible,
      isReusable = _ref.isReusable,
      onConvertToStatic = _ref.onConvertToStatic,
      onConvertToReusable = _ref.onConvertToReusable;

  if (!isVisible) {
    return null;
  }

  return createElement(Fragment, null, !isReusable && createElement(MenuItem, {
    className: "editor-block-settings-menu__control block-editor-block-settings-menu__control",
    icon: "controls-repeat",
    onClick: onConvertToReusable
  }, __('Add to Reusable Blocks')), isReusable && createElement(MenuItem, {
    className: "editor-block-settings-menu__control block-editor-block-settings-menu__control",
    icon: "controls-repeat",
    onClick: onConvertToStatic
  }, __('Convert to Regular Block')));
}
export default compose([withSelect(function (select, _ref2) {
  var clientIds = _ref2.clientIds;

  var _select = select('core/block-editor'),
      getBlocksByClientId = _select.getBlocksByClientId,
      canInsertBlockType = _select.canInsertBlockType;

  var _select2 = select('core/editor'),
      getReusableBlock = _select2.__experimentalGetReusableBlock;

  var _select3 = select('core'),
      canUser = _select3.canUser;

  var blocks = getBlocksByClientId(clientIds);
  var isReusable = blocks.length === 1 && blocks[0] && isReusableBlock(blocks[0]) && !!getReusableBlock(blocks[0].attributes.ref); // Show 'Convert to Regular Block' when selected block is a reusable block

  var isVisible = isReusable || // Hide 'Add to Reusable Blocks' when reusable blocks are disabled
  canInsertBlockType('core/block') && every(blocks, function (block) {
    return (// Guard against the case where a regular block has *just* been converted
      !!block && // Hide 'Add to Reusable Blocks' on invalid blocks
      block.isValid && // Hide 'Add to Reusable Blocks' when block doesn't support being made reusable
      hasBlockSupport(block.name, 'reusable', true)
    );
  }) && // Hide 'Add to Reusable Blocks' when current doesn't have permission to do that
  !!canUser('create', 'blocks');
  return {
    isReusable: isReusable,
    isVisible: isVisible
  };
}), withDispatch(function (dispatch, _ref3) {
  var clientIds = _ref3.clientIds,
      _ref3$onToggle = _ref3.onToggle,
      onToggle = _ref3$onToggle === void 0 ? noop : _ref3$onToggle;

  var _dispatch = dispatch('core/editor'),
      convertBlockToReusable = _dispatch.__experimentalConvertBlockToReusable,
      convertBlockToStatic = _dispatch.__experimentalConvertBlockToStatic;

  return {
    onConvertToStatic: function onConvertToStatic() {
      if (clientIds.length !== 1) {
        return;
      }

      convertBlockToStatic(clientIds[0]);
      onToggle();
    },
    onConvertToReusable: function onConvertToReusable() {
      convertBlockToReusable(clientIds);
      onToggle();
    }
  };
})])(ReusableBlockConvertButton);
//# sourceMappingURL=reusable-block-convert-button.js.map