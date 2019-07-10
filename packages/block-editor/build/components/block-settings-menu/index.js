"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockSettingsMenu = BlockSettingsMenu;
exports.default = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _blockEditorKeyboardShortcuts = require("../block-editor-keyboard-shortcuts");

var _blockActions = _interopRequireDefault(require("../block-actions"));

var _blockModeToggle = _interopRequireDefault(require("./block-mode-toggle"));

var _blockHtmlConvertButton = _interopRequireDefault(require("./block-html-convert-button"));

var _blockUnknownConvertButton = _interopRequireDefault(require("./block-unknown-convert-button"));

var _blockSettingsMenuFirstItem = _interopRequireDefault(require("./block-settings-menu-first-item"));

var _blockSettingsMenuPluginsExtension = _interopRequireDefault(require("./block-settings-menu-plugins-extension"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BlockSettingsMenu(_ref) {
  var clientIds = _ref.clientIds,
      onSelect = _ref.onSelect;
  var blockClientIds = (0, _lodash.castArray)(clientIds);
  var count = blockClientIds.length;
  var firstBlockClientId = blockClientIds[0];
  return (0, _element.createElement)(_blockActions.default, {
    clientIds: clientIds
  }, function (_ref2) {
    var onDuplicate = _ref2.onDuplicate,
        onRemove = _ref2.onRemove,
        onInsertAfter = _ref2.onInsertAfter,
        onInsertBefore = _ref2.onInsertBefore,
        canDuplicate = _ref2.canDuplicate,
        isLocked = _ref2.isLocked;
    return (0, _element.createElement)(_components.Dropdown, {
      contentClassName: "editor-block-settings-menu__popover block-editor-block-settings-menu__popover",
      position: "bottom right",
      renderToggle: function renderToggle(_ref3) {
        var onToggle = _ref3.onToggle,
            isOpen = _ref3.isOpen;
        var toggleClassname = (0, _classnames.default)('editor-block-settings-menu__toggle block-editor-block-settings-menu__toggle', {
          'is-opened': isOpen
        });
        var label = isOpen ? (0, _i18n.__)('Hide options') : (0, _i18n.__)('More options');
        return (0, _element.createElement)(_components.Toolbar, {
          controls: [{
            icon: 'ellipsis',
            title: label,
            onClick: function onClick() {
              if (count === 1) {
                onSelect(firstBlockClientId);
              }

              onToggle();
            },
            className: toggleClassname,
            extraProps: {
              'aria-expanded': isOpen
            }
          }]
        });
      },
      renderContent: function renderContent(_ref4) {
        var onClose = _ref4.onClose;
        return (0, _element.createElement)(_components.NavigableMenu, {
          className: "editor-block-settings-menu__content block-editor-block-settings-menu__content"
        }, (0, _element.createElement)(_blockSettingsMenuFirstItem.default.Slot, {
          fillProps: {
            onClose: onClose
          }
        }), count === 1 && (0, _element.createElement)(_blockUnknownConvertButton.default, {
          clientId: firstBlockClientId
        }), count === 1 && (0, _element.createElement)(_blockHtmlConvertButton.default, {
          clientId: firstBlockClientId
        }), !isLocked && canDuplicate && (0, _element.createElement)(_components.MenuItem, {
          className: "editor-block-settings-menu__control block-editor-block-settings-menu__control",
          onClick: onDuplicate,
          icon: "admin-page",
          shortcut: _blockEditorKeyboardShortcuts.shortcuts.duplicate.display
        }, (0, _i18n.__)('Duplicate')), !isLocked && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.MenuItem, {
          className: "editor-block-settings-menu__control block-editor-block-settings-menu__control",
          onClick: onInsertBefore,
          icon: "insert-before",
          shortcut: _blockEditorKeyboardShortcuts.shortcuts.insertBefore.display
        }, (0, _i18n.__)('Insert Before')), (0, _element.createElement)(_components.MenuItem, {
          className: "editor-block-settings-menu__control block-editor-block-settings-menu__control",
          onClick: onInsertAfter,
          icon: "insert-after",
          shortcut: _blockEditorKeyboardShortcuts.shortcuts.insertAfter.display
        }, (0, _i18n.__)('Insert After'))), count === 1 && (0, _element.createElement)(_blockModeToggle.default, {
          clientId: firstBlockClientId,
          onToggle: onClose
        }), (0, _element.createElement)(_blockSettingsMenuPluginsExtension.default.Slot, {
          fillProps: {
            clientIds: clientIds,
            onClose: onClose
          }
        }), (0, _element.createElement)("div", {
          className: "editor-block-settings-menu__separator block-editor-block-settings-menu__separator"
        }), !isLocked && (0, _element.createElement)(_components.MenuItem, {
          className: "editor-block-settings-menu__control block-editor-block-settings-menu__control",
          onClick: onRemove,
          icon: "trash",
          shortcut: _blockEditorKeyboardShortcuts.shortcuts.removeBlock.display
        }, (0, _i18n.__)('Remove Block')));
      }
    });
  });
}

var _default = (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      selectBlock = _dispatch.selectBlock;

  return {
    onSelect: function onSelect(clientId) {
      selectBlock(clientId);
    }
  };
})(BlockSettingsMenu);

exports.default = _default;
//# sourceMappingURL=index.js.map