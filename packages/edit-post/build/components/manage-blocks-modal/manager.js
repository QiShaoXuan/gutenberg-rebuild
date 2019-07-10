"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _category = _interopRequireDefault(require("./category"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
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
  return (0, _element.createElement)("div", {
    className: "edit-post-manage-blocks-modal__content"
  }, (0, _element.createElement)(_components.TextControl, {
    type: "search",
    label: (0, _i18n.__)('Search for a block'),
    value: search,
    onChange: function onChange(nextSearch) {
      return setState({
        search: nextSearch
      });
    },
    className: "edit-post-manage-blocks-modal__search"
  }), (0, _element.createElement)("div", {
    tabIndex: "0",
    role: "region",
    "aria-label": (0, _i18n.__)('Available block types'),
    className: "edit-post-manage-blocks-modal__results"
  }, blockTypes.length === 0 && (0, _element.createElement)("p", {
    className: "edit-post-manage-blocks-modal__no-results"
  }, (0, _i18n.__)('No blocks found.')), categories.map(function (category) {
    return (0, _element.createElement)(_category.default, {
      key: category.slug,
      category: category,
      blockTypes: (0, _lodash.filter)(blockTypes, {
        category: category.slug
      })
    });
  })));
}

var _default = (0, _compose.compose)([(0, _compose.withState)({
  search: ''
}), (0, _data.withSelect)(function (select) {
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

exports.default = _default;
//# sourceMappingURL=manager.js.map