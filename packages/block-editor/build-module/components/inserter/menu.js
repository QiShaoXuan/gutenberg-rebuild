import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { filter as _filter, find, findIndex, flow, groupBy, isEmpty, map, some, sortBy, without, includes, deburr } from 'lodash';
import scrollIntoView from 'dom-scroll-into-view';
/**
 * WordPress dependencies
 */

import { __, _n, _x, sprintf } from '@wordpress/i18n';
import { Component, createRef } from '@wordpress/element';
import { withSpokenMessages, PanelBody } from '@wordpress/components';
import { getCategories, isReusableBlock, createBlock, isUnmodifiedDefaultBlock } from '@wordpress/blocks';
import { withDispatch, withSelect } from '@wordpress/data';
import { withInstanceId, compose, withSafeTimeout } from '@wordpress/compose';
import { LEFT, RIGHT, UP, DOWN, BACKSPACE, ENTER } from '@wordpress/keycodes';
import { addQueryArgs } from '@wordpress/url';
/**
 * Internal dependencies
 */

import BlockPreview from '../block-preview';
import BlockTypesList from '../block-types-list';
import ChildBlocks from './child-blocks';
var MAX_SUGGESTED_ITEMS = 9;

var stopKeyPropagation = function stopKeyPropagation(event) {
  return event.stopPropagation();
};
/**
 * Filters an item list given a search term.
 *
 * @param {Array} items        Item list
 * @param {string} searchTerm  Search term.
 *
 * @return {Array}             Filtered item list.
 */


export var searchItems = function searchItems(items, searchTerm) {
  var normalizedSearchTerm = normalizeTerm(searchTerm);

  var matchSearch = function matchSearch(string) {
    return normalizeTerm(string).indexOf(normalizedSearchTerm) !== -1;
  };

  var categories = getCategories();
  return items.filter(function (item) {
    var itemCategory = find(categories, {
      slug: item.category
    });
    return matchSearch(item.title) || some(item.keywords, matchSearch) || itemCategory && matchSearch(itemCategory.title);
  });
};
/**
 * Converts the search term into a normalized term.
 *
 * @param {string} term The search term to normalize.
 *
 * @return {string} The normalized search term.
 */

export var normalizeTerm = function normalizeTerm(term) {
  // Disregard diacritics.
  //  Input: "média"
  term = deburr(term); // Accommodate leading slash, matching autocomplete expectations.
  //  Input: "/media"

  term = term.replace(/^\//, ''); // Lowercase.
  //  Input: "MEDIA"

  term = term.toLowerCase(); // Strip leading and trailing whitespace.
  //  Input: " media "

  term = term.trim();
  return term;
};
export var InserterMenu =
/*#__PURE__*/
function (_Component) {
  _inherits(InserterMenu, _Component);

  function InserterMenu() {
    var _this;

    _classCallCheck(this, InserterMenu);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InserterMenu).apply(this, arguments));
    _this.state = {
      childItems: [],
      filterValue: '',
      hoveredItem: null,
      suggestedItems: [],
      reusableItems: [],
      itemsPerCategory: {},
      openPanels: ['suggested']
    };
    _this.onChangeSearchInput = _this.onChangeSearchInput.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onHover = _this.onHover.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.panels = {};
    _this.inserterResults = createRef();
    return _this;
  }

  _createClass(InserterMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // This could be replaced by a resolver.
      this.props.fetchReusableBlocks();
      this.filter();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.items !== this.props.items) {
        this.filter(this.state.filterValue);
      }
    }
  }, {
    key: "onChangeSearchInput",
    value: function onChangeSearchInput(event) {
      this.filter(event.target.value);
    }
  }, {
    key: "onHover",
    value: function onHover(item) {
      this.setState({
        hoveredItem: item
      });
      var _this$props = this.props,
          showInsertionPoint = _this$props.showInsertionPoint,
          hideInsertionPoint = _this$props.hideInsertionPoint;

      if (item) {
        showInsertionPoint();
      } else {
        hideInsertionPoint();
      }
    }
  }, {
    key: "bindPanel",
    value: function bindPanel(name) {
      var _this2 = this;

      return function (ref) {
        _this2.panels[name] = ref;
      };
    }
  }, {
    key: "onTogglePanel",
    value: function onTogglePanel(panel) {
      var _this3 = this;

      return function () {
        var isOpened = _this3.state.openPanels.indexOf(panel) !== -1;

        if (isOpened) {
          _this3.setState({
            openPanels: without(_this3.state.openPanels, panel)
          });
        } else {
          _this3.setState({
            openPanels: [].concat(_toConsumableArray(_this3.state.openPanels), [panel])
          });

          _this3.props.setTimeout(function () {
            // We need a generic way to access the panel's container
            // eslint-disable-next-line react/no-find-dom-node
            scrollIntoView(_this3.panels[panel], _this3.inserterResults.current, {
              alignWithTop: true
            });
          });
        }
      };
    }
  }, {
    key: "filterOpenPanels",
    value: function filterOpenPanels(filterValue, itemsPerCategory, filteredItems, reusableItems) {
      if (filterValue === this.state.filterValue) {
        return this.state.openPanels;
      }

      if (!filterValue) {
        return ['suggested'];
      }

      var openPanels = [];

      if (reusableItems.length > 0) {
        openPanels.push('reusable');
      }

      if (filteredItems.length > 0) {
        openPanels = openPanels.concat(Object.keys(itemsPerCategory));
      }

      return openPanels;
    }
  }, {
    key: "filter",
    value: function filter() {
      var filterValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var _this$props2 = this.props,
          debouncedSpeak = _this$props2.debouncedSpeak,
          items = _this$props2.items,
          rootChildBlocks = _this$props2.rootChildBlocks;
      var filteredItems = searchItems(items, filterValue);

      var childItems = _filter(filteredItems, function (_ref) {
        var name = _ref.name;
        return includes(rootChildBlocks, name);
      });

      var suggestedItems = [];

      if (!filterValue) {
        var maxSuggestedItems = this.props.maxSuggestedItems || MAX_SUGGESTED_ITEMS;
        suggestedItems = _filter(items, function (item) {
          return item.utility > 0;
        }).slice(0, maxSuggestedItems);
      }

      var reusableItems = _filter(filteredItems, {
        category: 'reusable'
      });

      var getCategoryIndex = function getCategoryIndex(item) {
        return findIndex(getCategories(), function (category) {
          return category.slug === item.category;
        });
      };

      var itemsPerCategory = flow(function (itemList) {
        return _filter(itemList, function (item) {
          return item.category !== 'reusable';
        });
      }, function (itemList) {
        return sortBy(itemList, getCategoryIndex);
      }, function (itemList) {
        return groupBy(itemList, 'category');
      })(filteredItems);
      this.setState({
        hoveredItem: null,
        childItems: childItems,
        filterValue: filterValue,
        suggestedItems: suggestedItems,
        reusableItems: reusableItems,
        itemsPerCategory: itemsPerCategory,
        openPanels: this.filterOpenPanels(filterValue, itemsPerCategory, filteredItems, reusableItems)
      });
      var resultCount = Object.keys(itemsPerCategory).reduce(function (accumulator, currentCategorySlug) {
        return accumulator + itemsPerCategory[currentCategorySlug].length;
      }, 0);
      var resultsFoundMessage = sprintf(_n('%d result found.', '%d results found.', resultCount), resultCount);
      debouncedSpeak(resultsFoundMessage);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (includes([LEFT, DOWN, RIGHT, UP, BACKSPACE, ENTER], event.keyCode)) {
        // Stop the key event from propagating up to ObserveTyping.startTypingInTextField.
        event.stopPropagation();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props3 = this.props,
          instanceId = _this$props3.instanceId,
          onSelect = _this$props3.onSelect,
          rootClientId = _this$props3.rootClientId;
      var _this$state = this.state,
          childItems = _this$state.childItems,
          hoveredItem = _this$state.hoveredItem,
          itemsPerCategory = _this$state.itemsPerCategory,
          openPanels = _this$state.openPanels,
          reusableItems = _this$state.reusableItems,
          suggestedItems = _this$state.suggestedItems;

      var isPanelOpen = function isPanelOpen(panel) {
        return openPanels.indexOf(panel) !== -1;
      }; // Disable reason (no-autofocus): The inserter menu is a modal display, not one which
      // is always visible, and one which already incurs this behavior of autoFocus via
      // Popover's focusOnMount.
      // Disable reason (no-static-element-interactions): Navigational key-presses within
      // the menu are prevented from triggering WritingFlow and ObserveTyping interactions.

      /* eslint-disable jsx-a11y/no-autofocus, jsx-a11y/no-static-element-interactions */


      return createElement("div", {
        className: "editor-inserter__menu block-editor-inserter__menu",
        onKeyPress: stopKeyPropagation,
        onKeyDown: this.onKeyDown
      }, createElement("label", {
        htmlFor: "block-editor-inserter__search-".concat(instanceId),
        className: "screen-reader-text"
      }, __('Search for a block')), createElement("input", {
        id: "block-editor-inserter__search-".concat(instanceId),
        type: "search",
        placeholder: __('Search for a block'),
        className: "editor-inserter__search block-editor-inserter__search",
        autoFocus: true,
        onChange: this.onChangeSearchInput
      }), createElement("div", {
        className: "editor-inserter__results block-editor-inserter__results",
        ref: this.inserterResults,
        tabIndex: "0",
        role: "region",
        "aria-label": __('Available block types')
      }, createElement(ChildBlocks, {
        rootClientId: rootClientId,
        items: childItems,
        onSelect: onSelect,
        onHover: this.onHover
      }), !!suggestedItems.length && createElement(PanelBody, {
        title: _x('Most Used', 'blocks'),
        opened: isPanelOpen('suggested'),
        onToggle: this.onTogglePanel('suggested'),
        ref: this.bindPanel('suggested')
      }, createElement(BlockTypesList, {
        items: suggestedItems,
        onSelect: onSelect,
        onHover: this.onHover
      })), map(getCategories(), function (category) {
        var categoryItems = itemsPerCategory[category.slug];

        if (!categoryItems || !categoryItems.length) {
          return null;
        }

        return createElement(PanelBody, {
          key: category.slug,
          title: category.title,
          icon: category.icon,
          opened: isPanelOpen(category.slug),
          onToggle: _this4.onTogglePanel(category.slug),
          ref: _this4.bindPanel(category.slug)
        }, createElement(BlockTypesList, {
          items: categoryItems,
          onSelect: onSelect,
          onHover: _this4.onHover
        }));
      }), !!reusableItems.length && createElement(PanelBody, {
        className: "editor-inserter__reusable-blocks-panel block-editor-inserter__reusable-blocks-panel",
        title: __('Reusable'),
        opened: isPanelOpen('reusable'),
        onToggle: this.onTogglePanel('reusable'),
        icon: "controls-repeat",
        ref: this.bindPanel('reusable')
      }, createElement(BlockTypesList, {
        items: reusableItems,
        onSelect: onSelect,
        onHover: this.onHover
      }), createElement("a", {
        className: "editor-inserter__manage-reusable-blocks block-editor-inserter__manage-reusable-blocks",
        href: addQueryArgs('edit.php', {
          post_type: 'wp_block'
        })
      }, __('Manage All Reusable Blocks'))), isEmpty(suggestedItems) && isEmpty(reusableItems) && isEmpty(itemsPerCategory) && createElement("p", {
        className: "editor-inserter__no-results block-editor-inserter__no-results"
      }, __('No blocks found.'))), hoveredItem && isReusableBlock(hoveredItem) && createElement(BlockPreview, {
        name: hoveredItem.name,
        attributes: hoveredItem.initialAttributes
      }));
      /* eslint-enable jsx-a11y/no-autofocus, jsx-a11y/no-noninteractive-element-interactions */
    }
  }]);

  return InserterMenu;
}(Component);
export default compose(withSelect(function (select, _ref2) {
  var clientId = _ref2.clientId,
      isAppender = _ref2.isAppender,
      rootClientId = _ref2.rootClientId;

  var _select = select('core/block-editor'),
      getInserterItems = _select.getInserterItems,
      getBlockName = _select.getBlockName,
      getBlockRootClientId = _select.getBlockRootClientId,
      getBlockSelectionEnd = _select.getBlockSelectionEnd;

  var _select2 = select('core/blocks'),
      getChildBlockNames = _select2.getChildBlockNames;

  var destinationRootClientId = rootClientId;

  if (!destinationRootClientId && !clientId && !isAppender) {
    var end = getBlockSelectionEnd();

    if (end) {
      destinationRootClientId = getBlockRootClientId(end) || undefined;
    }
  }

  var destinationRootBlockName = getBlockName(destinationRootClientId);
  return {
    rootChildBlocks: getChildBlockNames(destinationRootBlockName),
    items: getInserterItems(destinationRootClientId),
    destinationRootClientId: destinationRootClientId
  };
}), withDispatch(function (dispatch, ownProps, _ref3) {
  var select = _ref3.select;

  var _dispatch = dispatch('core/block-editor'),
      _showInsertionPoint = _dispatch.showInsertionPoint,
      hideInsertionPoint = _dispatch.hideInsertionPoint; // This should be an external action provided in the editor settings.


  var _dispatch2 = dispatch('core/editor'),
      fetchReusableBlocks = _dispatch2.__experimentalFetchReusableBlocks; // To avoid duplication, getInsertionIndex is extracted and used in two event handlers
  // This breaks the withDispatch not containing any logic rule.
  // Since it's a function only called when the event handlers are called,
  // it's fine to extract it.
  // eslint-disable-next-line no-restricted-syntax


  function getInsertionIndex() {
    var _select3 = select('core/block-editor'),
        getBlockIndex = _select3.getBlockIndex,
        getBlockSelectionEnd = _select3.getBlockSelectionEnd,
        getBlockOrder = _select3.getBlockOrder;

    var clientId = ownProps.clientId,
        destinationRootClientId = ownProps.destinationRootClientId,
        isAppender = ownProps.isAppender; // If the clientId is defined, we insert at the position of the block.

    if (clientId) {
      return getBlockIndex(clientId, destinationRootClientId);
    } // If there a selected block, we insert after the selected block.


    var end = getBlockSelectionEnd();

    if (!isAppender && end) {
      return getBlockIndex(end, destinationRootClientId) + 1;
    } // Otherwise, we insert at the end of the current rootClientId


    return getBlockOrder(destinationRootClientId).length;
  }

  return {
    fetchReusableBlocks: fetchReusableBlocks,
    showInsertionPoint: function showInsertionPoint() {
      var index = getInsertionIndex();

      _showInsertionPoint(ownProps.destinationRootClientId, index);
    },
    hideInsertionPoint: hideInsertionPoint,
    onSelect: function onSelect(item) {
      var _dispatch3 = dispatch('core/block-editor'),
          replaceBlocks = _dispatch3.replaceBlocks,
          insertBlock = _dispatch3.insertBlock;

      var _select4 = select('core/block-editor'),
          getSelectedBlock = _select4.getSelectedBlock;

      var isAppender = ownProps.isAppender;
      var name = item.name,
          initialAttributes = item.initialAttributes;
      var selectedBlock = getSelectedBlock();
      var insertedBlock = createBlock(name, initialAttributes);

      if (!isAppender && selectedBlock && isUnmodifiedDefaultBlock(selectedBlock)) {
        replaceBlocks(selectedBlock.clientId, insertedBlock);
      } else {
        insertBlock(insertedBlock, getInsertionIndex(), ownProps.destinationRootClientId);
      }

      ownProps.onSelect();
    }
  };
}), withSpokenMessages, withInstanceId, withSafeTimeout)(InserterMenu);
//# sourceMappingURL=menu.js.map