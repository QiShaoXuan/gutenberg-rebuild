import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { withSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
/**
 * Internal dependencies
 */

import BlockSwitcher from '../block-switcher';
import MultiBlocksSwitcher from '../block-switcher/multi-blocks-switcher';
import BlockControls from '../block-controls';
import BlockFormatControls from '../block-format-controls';
import BlockSettingsMenu from '../block-settings-menu';

function BlockToolbar(_ref) {
  var blockClientIds = _ref.blockClientIds,
      isValid = _ref.isValid,
      mode = _ref.mode;

  if (blockClientIds.length === 0) {
    return null;
  }

  if (blockClientIds.length > 1) {
    return createElement("div", {
      className: "editor-block-toolbar block-editor-block-toolbar"
    }, createElement(MultiBlocksSwitcher, null), createElement(BlockSettingsMenu, {
      clientIds: blockClientIds
    }));
  }

  return createElement("div", {
    className: "editor-block-toolbar block-editor-block-toolbar"
  }, mode === 'visual' && isValid && createElement(Fragment, null, createElement(BlockSwitcher, {
    clientIds: blockClientIds
  }), createElement(BlockControls.Slot, null), createElement(BlockFormatControls.Slot, null)), createElement(BlockSettingsMenu, {
    clientIds: blockClientIds
  }));
}

export default withSelect(function (select) {
  var _select = select('core/block-editor'),
      getBlockMode = _select.getBlockMode,
      getSelectedBlockClientIds = _select.getSelectedBlockClientIds,
      isBlockValid = _select.isBlockValid;

  var blockClientIds = getSelectedBlockClientIds();
  return {
    blockClientIds: blockClientIds,
    isValid: blockClientIds.length === 1 ? isBlockValid(blockClientIds[0]) : null,
    mode: blockClientIds.length === 1 ? getBlockMode(blockClientIds[0]) : null
  };
})(BlockToolbar);
//# sourceMappingURL=index.js.map