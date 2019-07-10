import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { castArray } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { Toolbar, Dropdown, NavigableMenu, MenuItem } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import { shortcuts } from '../block-editor-keyboard-shortcuts';
import BlockActions from '../block-actions';
import BlockModeToggle from './block-mode-toggle';
import BlockHTMLConvertButton from './block-html-convert-button';
import BlockUnknownConvertButton from './block-unknown-convert-button';
import __experimentalBlockSettingsMenuFirstItem from './block-settings-menu-first-item';
import __experimentalBlockSettingsMenuPluginsExtension from './block-settings-menu-plugins-extension';
export function BlockSettingsMenu(_ref) {
  var clientIds = _ref.clientIds,
      onSelect = _ref.onSelect;
  var blockClientIds = castArray(clientIds);
  var count = blockClientIds.length;
  var firstBlockClientId = blockClientIds[0];
  return createElement(BlockActions, {
    clientIds: clientIds
  }, function (_ref2) {
    var onDuplicate = _ref2.onDuplicate,
        onRemove = _ref2.onRemove,
        onInsertAfter = _ref2.onInsertAfter,
        onInsertBefore = _ref2.onInsertBefore,
        canDuplicate = _ref2.canDuplicate,
        isLocked = _ref2.isLocked;
    return createElement(Dropdown, {
      contentClassName: "editor-block-settings-menu__popover block-editor-block-settings-menu__popover",
      position: "bottom right",
      renderToggle: function renderToggle(_ref3) {
        var onToggle = _ref3.onToggle,
            isOpen = _ref3.isOpen;
        var toggleClassname = classnames('editor-block-settings-menu__toggle block-editor-block-settings-menu__toggle', {
          'is-opened': isOpen
        });
        var label = isOpen ? __('Hide options') : __('More options');
        return createElement(Toolbar, {
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
        return createElement(NavigableMenu, {
          className: "editor-block-settings-menu__content block-editor-block-settings-menu__content"
        }, createElement(__experimentalBlockSettingsMenuFirstItem.Slot, {
          fillProps: {
            onClose: onClose
          }
        }), count === 1 && createElement(BlockUnknownConvertButton, {
          clientId: firstBlockClientId
        }), count === 1 && createElement(BlockHTMLConvertButton, {
          clientId: firstBlockClientId
        }), !isLocked && canDuplicate && createElement(MenuItem, {
          className: "editor-block-settings-menu__control block-editor-block-settings-menu__control",
          onClick: onDuplicate,
          icon: "admin-page",
          shortcut: shortcuts.duplicate.display
        }, __('Duplicate')), !isLocked && createElement(Fragment, null, createElement(MenuItem, {
          className: "editor-block-settings-menu__control block-editor-block-settings-menu__control",
          onClick: onInsertBefore,
          icon: "insert-before",
          shortcut: shortcuts.insertBefore.display
        }, __('Insert Before')), createElement(MenuItem, {
          className: "editor-block-settings-menu__control block-editor-block-settings-menu__control",
          onClick: onInsertAfter,
          icon: "insert-after",
          shortcut: shortcuts.insertAfter.display
        }, __('Insert After'))), count === 1 && createElement(BlockModeToggle, {
          clientId: firstBlockClientId,
          onToggle: onClose
        }), createElement(__experimentalBlockSettingsMenuPluginsExtension.Slot, {
          fillProps: {
            clientIds: clientIds,
            onClose: onClose
          }
        }), createElement("div", {
          className: "editor-block-settings-menu__separator block-editor-block-settings-menu__separator"
        }), !isLocked && createElement(MenuItem, {
          className: "editor-block-settings-menu__control block-editor-block-settings-menu__control",
          onClick: onRemove,
          icon: "trash",
          shortcut: shortcuts.removeBlock.display
        }, __('Remove Block')));
      }
    });
  });
}
export default withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      selectBlock = _dispatch.selectBlock;

  return {
    onSelect: function onSelect(clientId) {
      selectBlock(clientId);
    }
  };
})(BlockSettingsMenu);
//# sourceMappingURL=index.js.map