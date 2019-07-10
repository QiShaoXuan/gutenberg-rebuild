import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { IconButton, Dropdown, SVG, Path, KeyboardShortcuts } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import BlockNavigation from './';
var MenuIcon = createElement(SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "20",
  height: "20"
}, createElement(Path, {
  d: "M5 5H3v2h2V5zm3 8h11v-2H8v2zm9-8H6v2h11V5zM7 11H5v2h2v-2zm0 8h2v-2H7v2zm3-2v2h11v-2H10z"
}));

function BlockNavigationDropdown(_ref) {
  var hasBlocks = _ref.hasBlocks,
      isDisabled = _ref.isDisabled;
  var isEnabled = hasBlocks && !isDisabled;
  return createElement(Dropdown, {
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
          onToggle = _ref2.onToggle;
      return createElement(Fragment, null, isEnabled && createElement(KeyboardShortcuts, {
        bindGlobal: true,
        shortcuts: _defineProperty({}, rawShortcut.access('o'), onToggle)
      }), createElement(IconButton, {
        icon: MenuIcon,
        "aria-expanded": isOpen,
        onClick: isEnabled ? onToggle : undefined,
        label: __('Block Navigation'),
        className: "editor-block-navigation block-editor-block-navigation",
        shortcut: displayShortcut.access('o'),
        "aria-disabled": !isEnabled
      }));
    },
    renderContent: function renderContent(_ref4) {
      var onClose = _ref4.onClose;
      return createElement(BlockNavigation, {
        onSelect: onClose
      });
    }
  });
}

export default withSelect(function (select) {
  return {
    hasBlocks: !!select('core/block-editor').getBlockCount()
  };
})(BlockNavigationDropdown);
//# sourceMappingURL=dropdown.js.map