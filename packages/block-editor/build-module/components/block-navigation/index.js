import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { map, noop } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { withSelect, withDispatch } from '@wordpress/data';
import { Button, NavigableMenu } from '@wordpress/components';
import { getBlockType } from '@wordpress/blocks';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import BlockIcon from '../block-icon';

function BlockNavigationList(_ref) {
  var blocks = _ref.blocks,
      selectedBlockClientId = _ref.selectedBlockClientId,
      selectBlock = _ref.selectBlock,
      showNestedBlocks = _ref.showNestedBlocks;
  return (
    /*
     * Disable reason: The `list` ARIA role is redundant but
     * Safari+VoiceOver won't announce the list otherwise.
     */

    /* eslint-disable jsx-a11y/no-redundant-roles */
    createElement("ul", {
      className: "editor-block-navigation__list block-editor-block-navigation__list",
      role: "list"
    }, map(blocks, function (block) {
      var blockType = getBlockType(block.name);
      var isSelected = block.clientId === selectedBlockClientId;
      return createElement("li", {
        key: block.clientId
      }, createElement("div", {
        className: "editor-block-navigation__item block-editor-block-navigation__item"
      }, createElement(Button, {
        className: classnames('editor-block-navigation__item-button block-editor-block-navigation__item-button', {
          'is-selected': isSelected
        }),
        onClick: function onClick() {
          return selectBlock(block.clientId);
        }
      }, createElement(BlockIcon, {
        icon: blockType.icon,
        showColors: true
      }), blockType.title, isSelected && createElement("span", {
        className: "screen-reader-text"
      }, __('(selected block)')))), showNestedBlocks && !!block.innerBlocks && !!block.innerBlocks.length && createElement(BlockNavigationList, {
        blocks: block.innerBlocks,
        selectedBlockClientId: selectedBlockClientId,
        selectBlock: selectBlock,
        showNestedBlocks: true
      }));
    }))
    /* eslint-enable jsx-a11y/no-redundant-roles */

  );
}

function BlockNavigation(_ref2) {
  var rootBlock = _ref2.rootBlock,
      rootBlocks = _ref2.rootBlocks,
      selectedBlockClientId = _ref2.selectedBlockClientId,
      selectBlock = _ref2.selectBlock;

  if (!rootBlocks || rootBlocks.length === 0) {
    return null;
  }

  var hasHierarchy = rootBlock && (rootBlock.clientId !== selectedBlockClientId || rootBlock.innerBlocks && rootBlock.innerBlocks.length !== 0);
  return createElement(NavigableMenu, {
    role: "presentation",
    className: "editor-block-navigation__container block-editor-block-navigation__container"
  }, createElement("p", {
    className: "editor-block-navigation__label block-editor-block-navigation__label"
  }, __('Block Navigation')), hasHierarchy && createElement(BlockNavigationList, {
    blocks: [rootBlock],
    selectedBlockClientId: selectedBlockClientId,
    selectBlock: selectBlock,
    showNestedBlocks: true
  }), !hasHierarchy && createElement(BlockNavigationList, {
    blocks: rootBlocks,
    selectedBlockClientId: selectedBlockClientId,
    selectBlock: selectBlock
  }));
}

export default compose(withSelect(function (select) {
  var _select = select('core/block-editor'),
      getSelectedBlockClientId = _select.getSelectedBlockClientId,
      getBlockHierarchyRootClientId = _select.getBlockHierarchyRootClientId,
      getBlock = _select.getBlock,
      getBlocks = _select.getBlocks;

  var selectedBlockClientId = getSelectedBlockClientId();
  return {
    rootBlocks: getBlocks(),
    rootBlock: selectedBlockClientId ? getBlock(getBlockHierarchyRootClientId(selectedBlockClientId)) : null,
    selectedBlockClientId: selectedBlockClientId
  };
}), withDispatch(function (dispatch, _ref3) {
  var _ref3$onSelect = _ref3.onSelect,
      onSelect = _ref3$onSelect === void 0 ? noop : _ref3$onSelect;
  return {
    selectBlock: function selectBlock(clientId) {
      dispatch('core/block-editor').selectBlock(clientId);
      onSelect(clientId);
    }
  };
}))(BlockNavigation);
//# sourceMappingURL=index.js.map