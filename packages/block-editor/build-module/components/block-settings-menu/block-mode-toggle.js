import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { MenuItem } from '@wordpress/components';
import { getBlockType, hasBlockSupport } from '@wordpress/blocks';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
export function BlockModeToggle(_ref) {
  var blockType = _ref.blockType,
      mode = _ref.mode,
      onToggleMode = _ref.onToggleMode,
      _ref$small = _ref.small,
      small = _ref$small === void 0 ? false : _ref$small;

  if (!hasBlockSupport(blockType, 'html', true)) {
    return null;
  }

  var label = mode === 'visual' ? __('Edit as HTML') : __('Edit visually');
  return createElement(MenuItem, {
    className: "editor-block-settings-menu__control block-editor-block-settings-menu__control",
    onClick: onToggleMode,
    icon: "html"
  }, !small && label);
}
export default compose([withSelect(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/block-editor'),
      getBlock = _select.getBlock,
      getBlockMode = _select.getBlockMode;

  var block = getBlock(clientId);
  return {
    mode: getBlockMode(clientId),
    blockType: block ? getBlockType(block.name) : null
  };
}), withDispatch(function (dispatch, _ref3) {
  var _ref3$onToggle = _ref3.onToggle,
      onToggle = _ref3$onToggle === void 0 ? noop : _ref3$onToggle,
      clientId = _ref3.clientId;
  return {
    onToggleMode: function onToggleMode() {
      dispatch('core/block-editor').toggleBlockMode(clientId);
      onToggle();
    }
  };
})])(BlockModeToggle);
//# sourceMappingURL=block-mode-toggle.js.map