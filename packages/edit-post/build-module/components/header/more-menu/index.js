import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { IconButton, Dropdown, MenuGroup } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
/**
 * Internal dependencies
 */

import ModeSwitcher from '../mode-switcher';
import PluginMoreMenuGroup from '../plugins-more-menu-group';
import ToolsMoreMenuGroup from '../tools-more-menu-group';
import OptionsMenuItem from '../options-menu-item';
import WritingMenu from '../writing-menu';

var ariaClosed = __('Show more tools & options');

var ariaOpen = __('Hide more tools & options');

var MoreMenu = function MoreMenu() {
  return createElement(Dropdown, {
    className: "edit-post-more-menu",
    contentClassName: "edit-post-more-menu__content",
    position: "bottom left",
    renderToggle: function renderToggle(_ref) {
      var isOpen = _ref.isOpen,
          onToggle = _ref.onToggle;
      return createElement(IconButton, {
        icon: "ellipsis",
        label: isOpen ? ariaOpen : ariaClosed,
        labelPosition: "bottom",
        onClick: onToggle,
        "aria-expanded": isOpen
      });
    },
    renderContent: function renderContent(_ref2) {
      var onClose = _ref2.onClose;
      return createElement(Fragment, null, createElement(WritingMenu, null), createElement(ModeSwitcher, null), createElement(PluginMoreMenuGroup.Slot, {
        fillProps: {
          onClose: onClose
        }
      }), createElement(ToolsMoreMenuGroup.Slot, {
        fillProps: {
          onClose: onClose
        }
      }), createElement(MenuGroup, null, createElement(OptionsMenuItem, {
        onSelect: onClose
      })));
    }
  });
};

export default MoreMenu;
//# sourceMappingURL=index.js.map