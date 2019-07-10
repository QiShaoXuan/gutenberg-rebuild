"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InserterMenu = exports.normalizeTerm = exports.searchItems = void 0;

var _element = require("@wordpress/element");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _keycodes = require("@wordpress/keycodes");

var _url = require("@wordpress/url");

var _blockPreview = _interopRequireDefault(require("../block-preview"));

var _blockTypesList = _interopRequireDefault(require("../block-types-list"));

var _childBlocks = _interopRequireDefault(require("./child-blocks"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
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


var searchItems = function searchItems(items, searchTerm) {
  var normalizedSearchTerm = normalizeTerm(searchTerm);

  var matchSearch = function matchSearch(string) {
    return normalizeTerm(string).indexOf(normalizedSearchTerm) !== -1;
  };

  var categories = (0, _blocks.getCategories)();
  return items.filter(function (item) {
    var itemCategory = (0, _lodash.find)(categories, {
      slug: item.category
    });
    return matchSearch(item.title) || (0, _lodash.some)(item.keywords, matchSearch) || itemCategory && matchSearch(itemCategory.title);
  });
};
/**
 * Converts the search term into a normalized term.
 *
 * @param {string} term The search term to normalize.
 *
 * @return {string} The normalized search term.
 */


exports.searchItems = searchItems;

var normalizeTerm = function normalizeTerm(term) {
  // Disregard diacritics.
  //  Input: "média"
  term = (0, _lodash.deburr)(term); // Accommodate leading slash, matching autocomplete expectations.
  //  Input: "/media"

  term = term.replace(/^\//, ''); // Lowercase.
  //  Input: "MEDIA"

  term = term.toLowerCase(); // Strip leading and trailing whitespace.
  //  Input: " media "

  term = term.trim();
  return term;
};

exports.normalizeTerm = normalizeTerm;

var InserterMenu =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(InserterMenu, _Component);

  function InserterMenu() {
    var _this;

    (0, _classCallCheck2.default)(this, InserterMenu);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InserterMenu).apply(this, arguments));
    _this.state = {
      childItems: [],
      filterValue: '',
      hoveredItem: null,
      suggestedItems: [],
      reusableItems: [],
      itemsPerCategory: {},
      openPanels: ['suggested']
    };
    _this.onChangeSearchInput = _this.onChangeSearchInput.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onHover = _this.onHover.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.panels = {};
    _this.inserterResults = (0, _element.createRef)();
    return _this;
  }

  (0, _createClass2.default)(InserterMenu, [{
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
            openPanels: (0, _lodash.without)(_this3.state.openPanels, panel)
          });
        } else {
          _this3.setState({
            openPanels: [].concat((0, _toConsumableArray2.default)(_this3.state.openPanels), [panel])
          });

          _this3.props.setTimeout(function () {
            // We need a generic way to access the panel's container
            // eslint-disable-next-line react/no-find-dom-node
            (0, _domScrollIntoView.default)(_this3.panels[panel], _this3.inserterResults.current, {
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
      var childItems = (0, _lodash.filter)(filteredItems, function (_ref) {
        var name = _ref.name;
        return (0, _lodash.includes)(rootChildBlocks, name);
      });
      var suggestedItems = [];

      if (!filterValue) {
        var maxSuggestedItems = this.props.maxSuggestedItems || MAX_SUGGESTED_ITEMS;
        suggestedItems = (0, _lodash.filter)(items, function (item) {
          return item.utility > 0;
        }).slice(0, maxSuggestedItems);
      }

      var reusableItems = (0, _lodash.filter)(filteredItems, {
        category: 'reusable'
      });

      var getCategoryIndex = function getCategoryIndex(item) {
        return (0, _lodash.findIndex)((0, _blocks.getCategories)(), function (category) {
          return category.slug === item.category;
        });
      };

      var itemsPerCategory = (0, _lodash.flow)(function (itemList) {
        return (0, _lodash.filter)(itemList, function (item) {
          return item.category !== 'reusable';
        });
      }, function (itemList) {
        return (0, _lodash.sortBy)(itemList, getCategoryIndex);
      }, function (itemList) {
        return (0, _lodash.groupBy)(itemList, 'category');
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
      var resultsFoundMessage = (0, _i18n.sprintf)((0, _i18n._n)('%d result found.', '%d results found.', resultCount), resultCount);
      debouncedSpeak(resultsFoundMessage);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if ((0, _lodash.includes)([_keycodes.LEFT, _keycodes.DOWN, _keycodes.RIGHT, _keycodes.UP, _keycodes.BACKSPACE, _keycodes.ENTER], event.keyCode)) {
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


      return (0, _element.createElement)("div", {
        className: "editor-inserter__menu block-editor-inserter__menu",
        onKeyPress: stopKeyPropagation,
        onKeyDown: this.onKeyDown
      }, (0, _element.createElement)("label", {
        htmlFor: "block-editor-inserter__search-".concat(instanceId),
        className: "screen-reader-text"
      }, (0, _i18n.__)('Search for a block')), (0, _element.createElement)("input", {
        id: "block-editor-inserter__search-".concat(instanceId),
        type: "search",
        placeholder: (0, _i18n.__)('Search for a block'),
        className: "editor-inserter__search block-editor-inserter__search",
        autoFocus: true,
        onChange: this.onChangeSearchInput
      }), (0, _element.createElement)("div", {
        className: "editor-inserter__results block-editor-inserter__results",
        ref: this.inserterResults,
        tabIndex: "0",
        role: "region",
        "aria-label": (0, _i18n.__)('Available block types')
      }, (0, _element.createElement)(_childBlocks.default, {
        rootClientId: rootClientId,
        items: childItems,
        onSelect: onSelect,
        onHover: this.onHover
      }), !!suggestedItems.length && (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n._x)('Most Used', 'blocks'),
        opened: isPanelOpen('suggested'),
        onToggle: this.onTogglePanel('suggested'),
        ref: this.bindPanel('suggested')
      }, (0, _element.createElement)(_blockTypesList.default, {
        items: suggestedItems,
        onSelect: onSelect,
        onHover: this.onHover
      })), (0, _lodash.map)((0, _blocks.getCategories)(), function (category) {
        var categoryItems = itemsPerCategory[category.slug];

        if (!categoryItems || !categoryItems.length) {
          return null;
        }

        return (0, _element.createElement)(_components.PanelBody, {
          key: category.slug,
          title: category.title,
          icon: category.icon,
          opened: isPanelOpen(category.slug),
          onToggle: _this4.onTogglePanel(category.slug),
          ref: _this4.bindPanel(category.slug)
        }, (0, _element.createElement)(_blockTypesList.default, {
          items: categoryItems,
          onSelect: onSelect,
          onHover: _this4.onHover
        }));
      }), !!reusableItems.length && (0, _element.createElement)(_components.PanelBody, {
        className: "editor-inserter__reusable-blocks-panel block-editor-inserter__reusable-blocks-panel",
        title: (0, _i18n.__)('Reusable'),
        opened: isPanelOpen('reusable'),
        onToggle: this.onTogglePanel('reusable'),
        icon: "controls-repeat",
        ref: this.bindPanel('reusable')
      }, (0, _element.createElement)(_blockTypesList.default, {
        items: reusableItems,
        onSelect: onSelect,
        onHover: this.onHover
      }), (0, _element.createElement)("a", {
        className: "editor-inserter__manage-reusable-blocks block-editor-inserter__manage-reusable-blocks",
        href: (0, _url.addQueryArgs)('edit.php', {
          post_type: 'wp_block'
        })
      }, (0, _i18n.__)('Manage All Reusable Blocks'))), (0, _lodash.isEmpty)(suggestedItems) && (0, _lodash.isEmpty)(reusableItems) && (0, _lodash.isEmpty)(itemsPerCategory) && (0, _element.createElement)("p", {
        className: "editor-inserter__no-results block-editor-inserter__no-results"
      }, (0, _i18n.__)('No blocks found.'))), hoveredItem && (0, _blocks.isReusableBlock)(hoveredItem) && (0, _element.createElement)(_blockPreview.default, {
        name: hoveredItem.name,
        attributes: hoveredItem.initialAttributes
      }));
      /* eslint-enable jsx-a11y/no-autofocus, jsx-a11y/no-noninteractive-element-interactions */
    }
  }]);
  return InserterMenu;
}(_element.Component);

exports.InserterMenu = InserterMenu;

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref2) {
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
}), (0, _data.withDispatch)(function (dispatch, ownProps, _ref3) {
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
      var insertedBlock = (0, _blocks.createBlock)(name, initialAttributes);

      if (!isAppender && selectedBlock && (0, _blocks.isUnmodifiedDefaultBlock)(selectedBlock)) {
        replaceBlocks(selectedBlock.clientId, insertedBlock);
      } else {
        insertBlock(insertedBlock, getInsertionIndex(), ownProps.destinationRootClientId);
      }

      ownProps.onSelect();
    }
  };
}), _components.withSpokenMessages, _compose.withInstanceId, _compose.withSafeTimeout)(InserterMenu);

exports.default = _default;
//# sourceMappingURL=menu.js.map