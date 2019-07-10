import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { filter } from 'lodash';
/**
 * WordPress dependencies
 */

import { withSelect } from '@wordpress/data';
import { compose, withState } from '@wordpress/compose';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import BlockManagerCategory from './category';

function BlockManager(_ref) {
  var search = _ref.search,
      setState = _ref.setState,
      blockTypes = _ref.blockTypes,
      categories = _ref.categories,
      hasBlockSupport = _ref.hasBlockSupport,
      isMatchingSearchTerm = _ref.isMatchingSearchTerm;
  // Filtering occurs here (as opposed to `withSelect`) to avoid wasted
  // wasted renders by consequence of `Array#filter` producing a new
  // value reference on each call.
  blockTypes = blockTypes.filter(function (blockType) {
    return hasBlockSupport(blockType, 'inserter', true) && (!search || isMatchingSearchTerm(blockType, search));
  });
  return createElement("div", {
    className: "edit-post-manage-blocks-modal__content"
  }, createElement(TextControl, {
    type: "search",
    label: __('Search for a block'),
    value: search,
    onChange: function onChange(nextSearch) {
      return setState({
        search: nextSearch
      });
    },
    className: "edit-post-manage-blocks-modal__search"
  }), createElement("div", {
    tabIndex: "0",
    role: "region",
    "aria-label": __('Available block types'),
    className: "edit-post-manage-blocks-modal__results"
  }, blockTypes.length === 0 && createElement("p", {
    className: "edit-post-manage-blocks-modal__no-results"
  }, __('No blocks found.')), categories.map(function (category) {
    return createElement(BlockManagerCategory, {
      key: category.slug,
      category: category,
      blockTypes: filter(blockTypes, {
        category: category.slug
      })
    });
  })));
}

export default compose([withState({
  search: ''
}), withSelect(function (select) {
  var _select = select('core/blocks'),
      getBlockTypes = _select.getBlockTypes,
      getCategories = _select.getCategories,
      hasBlockSupport = _select.hasBlockSupport,
      isMatchingSearchTerm = _select.isMatchingSearchTerm;

  return {
    blockTypes: getBlockTypes(),
    categories: getCategories(),
    hasBlockSupport: hasBlockSupport,
    isMatchingSearchTerm: isMatchingSearchTerm
  };
})])(BlockManager);
//# sourceMappingURL=manager.js.map