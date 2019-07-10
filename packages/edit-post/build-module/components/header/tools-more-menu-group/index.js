import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */

import { createSlotFill, MenuGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

var _createSlotFill = createSlotFill('ToolsMoreMenuGroup'),
    ToolsMoreMenuGroup = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

ToolsMoreMenuGroup.Slot = function (_ref) {
  var fillProps = _ref.fillProps;
  return createElement(Slot, {
    fillProps: fillProps
  }, function (fills) {
    return !isEmpty(fills) && createElement(MenuGroup, {
      label: __('Tools')
    }, fills);
  });
};

export default ToolsMoreMenuGroup;
//# sourceMappingURL=index.js.map