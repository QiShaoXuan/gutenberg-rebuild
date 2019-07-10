import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { isEmpty, map } from 'lodash';
/**
 * WordPress dependencies
 */

import { createSlotFill } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';

var _createSlotFill = createSlotFill('PluginBlockSettingsMenuGroup'),
    PluginBlockSettingsMenuGroup = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

var PluginBlockSettingsMenuGroupSlot = function PluginBlockSettingsMenuGroupSlot(_ref) {
  var fillProps = _ref.fillProps,
      selectedBlocks = _ref.selectedBlocks;
  selectedBlocks = map(selectedBlocks, function (block) {
    return block.name;
  });
  return createElement(Slot, {
    fillProps: _objectSpread({}, fillProps, {
      selectedBlocks: selectedBlocks
    })
  }, function (fills) {
    return !isEmpty(fills) && createElement(Fragment, null, createElement("div", {
      className: "editor-block-settings-menu__separator block-editor-block-settings-menu__separator"
    }), fills);
  });
};

PluginBlockSettingsMenuGroup.Slot = withSelect(function (select, _ref2) {
  var clientIds = _ref2.fillProps.clientIds;
  return {
    selectedBlocks: select('core/block-editor').getBlocksByClientId(clientIds)
  };
})(PluginBlockSettingsMenuGroupSlot);
export default PluginBlockSettingsMenuGroup;
//# sourceMappingURL=plugin-block-settings-menu-group.js.map