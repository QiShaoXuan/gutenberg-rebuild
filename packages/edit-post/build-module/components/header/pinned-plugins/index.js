import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */

import { createSlotFill } from '@wordpress/components';

var _createSlotFill = createSlotFill('PinnedPlugins'),
    PinnedPlugins = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

PinnedPlugins.Slot = function (props) {
  return createElement(Slot, props, function (fills) {
    return !isEmpty(fills) && createElement("div", {
      className: "edit-post-pinned-plugins"
    }, fills);
  });
};

export default PinnedPlugins;
//# sourceMappingURL=index.js.map