import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { orderBy } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Toolbar, Slot, DropdownMenu } from '@wordpress/components';

var FormatToolbar = function FormatToolbar(_ref) {
  var controls = _ref.controls;
  return createElement("div", {
    className: "editor-format-toolbar block-editor-format-toolbar"
  }, createElement(Toolbar, null, controls.map(function (format) {
    return createElement(Slot, {
      name: "RichText.ToolbarControls.".concat(format),
      key: format
    });
  }), createElement(Slot, {
    name: "RichText.ToolbarControls"
  }, function (fills) {
    return fills.length !== 0 && createElement(DropdownMenu, {
      icon: false,
      position: "bottom left",
      label: __('More Rich Text Controls'),
      controls: orderBy(fills.map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            props = _ref3[0].props;

        return props;
      }), 'title')
    });
  })));
};

export default FormatToolbar;
//# sourceMappingURL=index.js.map