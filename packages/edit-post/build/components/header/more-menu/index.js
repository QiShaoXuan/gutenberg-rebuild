"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _modeSwitcher = _interopRequireDefault(require("../mode-switcher"));

var _pluginsMoreMenuGroup = _interopRequireDefault(require("../plugins-more-menu-group"));

var _toolsMoreMenuGroup = _interopRequireDefault(require("../tools-more-menu-group"));

var _optionsMenuItem = _interopRequireDefault(require("../options-menu-item"));

var _writingMenu = _interopRequireDefault(require("../writing-menu"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var ariaClosed = (0, _i18n.__)('Show more tools & options');
var ariaOpen = (0, _i18n.__)('Hide more tools & options');

var MoreMenu = function MoreMenu() {
  return (0, _element.createElement)(_components.Dropdown, {
    className: "edit-post-more-menu",
    contentClassName: "edit-post-more-menu__content",
    position: "bottom left",
    renderToggle: function renderToggle(_ref) {
      var isOpen = _ref.isOpen,
          onToggle = _ref.onToggle;
      return (0, _element.createElement)(_components.IconButton, {
        icon: "ellipsis",
        label: isOpen ? ariaOpen : ariaClosed,
        labelPosition: "bottom",
        onClick: onToggle,
        "aria-expanded": isOpen
      });
    },
    renderContent: function renderContent(_ref2) {
      var onClose = _ref2.onClose;
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_writingMenu.default, null), (0, _element.createElement)(_modeSwitcher.default, null), (0, _element.createElement)(_pluginsMoreMenuGroup.default.Slot, {
        fillProps: {
          onClose: onClose
        }
      }), (0, _element.createElement)(_toolsMoreMenuGroup.default.Slot, {
        fillProps: {
          onClose: onClose
        }
      }), (0, _element.createElement)(_components.MenuGroup, null, (0, _element.createElement)(_optionsMenuItem.default, {
        onSelect: onClose
      })));
    }
  });
};

var _default = MoreMenu;
exports.default = _default;
//# sourceMappingURL=index.js.map