import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { __experimentalBlockSettingsMenuPluginsExtension } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import ReusableBlockConvertButton from './reusable-block-convert-button';
import ReusableBlockDeleteButton from './reusable-block-delete-button';

function ReusableBlocksButtons(_ref) {
  var clientIds = _ref.clientIds;
  return createElement(__experimentalBlockSettingsMenuPluginsExtension, null, function (_ref2) {
    var onClose = _ref2.onClose;
    return createElement(Fragment, null, createElement(ReusableBlockConvertButton, {
      clientIds: clientIds,
      onToggle: onClose
    }), clientIds.length === 1 && createElement(ReusableBlockDeleteButton, {
      clientId: clientIds[0],
      onToggle: onClose
    }));
  });
}

export default withSelect(function (select) {
  var _select = select('core/block-editor'),
      getSelectedBlockClientIds = _select.getSelectedBlockClientIds;

  return {
    clientIds: getSelectedBlockClientIds()
  };
})(ReusableBlocksButtons);
//# sourceMappingURL=index.js.map