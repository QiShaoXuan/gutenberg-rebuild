"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.shortcuts = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _keycodes = require("@wordpress/keycodes");

var _compose = require("@wordpress/compose");

var _blockActions = _interopRequireDefault(require("../block-actions"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var preventDefault = function preventDefault(event) {
  event.preventDefault();
  return event;
};

var shortcuts = {
  duplicate: {
    raw: _keycodes.rawShortcut.primaryShift('d'),
    display: _keycodes.displayShortcut.primaryShift('d')
  },
  removeBlock: {
    raw: _keycodes.rawShortcut.access('z'),
    display: _keycodes.displayShortcut.access('z')
  },
  insertBefore: {
    raw: _keycodes.rawShortcut.primaryAlt('t'),
    display: _keycodes.displayShortcut.primaryAlt('t')
  },
  insertAfter: {
    raw: _keycodes.rawShortcut.primaryAlt('y'),
    display: _keycodes.displayShortcut.primaryAlt('y')
  }
};
exports.shortcuts = shortcuts;

var BlockEditorKeyboardShortcuts =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BlockEditorKeyboardShortcuts, _Component);

  function BlockEditorKeyboardShortcuts() {
    var _this;

    (0, _classCallCheck2.default)(this, BlockEditorKeyboardShortcuts);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockEditorKeyboardShortcuts).apply(this, arguments));
    _this.selectAll = _this.selectAll.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.deleteSelectedBlocks = _this.deleteSelectedBlocks.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.clearMultiSelection = _this.clearMultiSelection.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(BlockEditorKeyboardShortcuts, [{
    key: "selectAll",
    value: function selectAll(event) {
      var _this$props = this.props,
          rootBlocksClientIds = _this$props.rootBlocksClientIds,
          onMultiSelect = _this$props.onMultiSelect;
      event.preventDefault();
      onMultiSelect((0, _lodash.first)(rootBlocksClientIds), (0, _lodash.last)(rootBlocksClientIds));
    }
  }, {
    key: "deleteSelectedBlocks",
    value: function deleteSelectedBlocks(event) {
      var _this$props2 = this.props,
          selectedBlockClientIds = _this$props2.selectedBlockClientIds,
          hasMultiSelection = _this$props2.hasMultiSelection,
          onRemove = _this$props2.onRemove,
          isLocked = _this$props2.isLocked;

      if (hasMultiSelection) {
        event.preventDefault();

        if (!isLocked) {
          onRemove(selectedBlockClientIds);
        }
      }
    }
    /**
     * Clears current multi-selection, if one exists.
     */

  }, {
    key: "clearMultiSelection",
    value: function clearMultiSelection() {
      var _this$props3 = this.props,
          hasMultiSelection = _this$props3.hasMultiSelection,
          clearSelectedBlock = _this$props3.clearSelectedBlock;

      if (hasMultiSelection) {
        clearSelectedBlock();
        window.getSelection().removeAllRanges();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _ref;

      var selectedBlockClientIds = this.props.selectedBlockClientIds;
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.KeyboardShortcuts, {
        shortcuts: (_ref = {}, (0, _defineProperty2.default)(_ref, _keycodes.rawShortcut.primary('a'), this.selectAll), (0, _defineProperty2.default)(_ref, "backspace", this.deleteSelectedBlocks), (0, _defineProperty2.default)(_ref, "del", this.deleteSelectedBlocks), (0, _defineProperty2.default)(_ref, "escape", this.clearMultiSelection), _ref)
      }), selectedBlockClientIds.length > 0 && (0, _element.createElement)(_blockActions.default, {
        clientIds: selectedBlockClientIds
      }, function (_ref2) {
        var _ref3;

        var onDuplicate = _ref2.onDuplicate,
            onRemove = _ref2.onRemove,
            onInsertAfter = _ref2.onInsertAfter,
            onInsertBefore = _ref2.onInsertBefore;
        return (0, _element.createElement)(_components.KeyboardShortcuts, {
          bindGlobal: true,
          shortcuts: (_ref3 = {}, (0, _defineProperty2.default)(_ref3, shortcuts.duplicate.raw, (0, _lodash.flow)(preventDefault, onDuplicate)), (0, _defineProperty2.default)(_ref3, shortcuts.removeBlock.raw, (0, _lodash.flow)(preventDefault, onRemove)), (0, _defineProperty2.default)(_ref3, shortcuts.insertBefore.raw, (0, _lodash.flow)(preventDefault, onInsertBefore)), (0, _defineProperty2.default)(_ref3, shortcuts.insertAfter.raw, (0, _lodash.flow)(preventDefault, onInsertAfter)), _ref3)
        });
      }));
    }
  }]);
  return BlockEditorKeyboardShortcuts;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/block-editor'),
      getBlockOrder = _select.getBlockOrder,
      getSelectedBlockClientIds = _select.getSelectedBlockClientIds,
      hasMultiSelection = _select.hasMultiSelection,
      getBlockRootClientId = _select.getBlockRootClientId,
      getTemplateLock = _select.getTemplateLock;

  var selectedBlockClientIds = getSelectedBlockClientIds();
  return {
    rootBlocksClientIds: getBlockOrder(),
    hasMultiSelection: hasMultiSelection(),
    isLocked: (0, _lodash.some)(selectedBlockClientIds, function (clientId) {
      return !!getTemplateLock(getBlockRootClientId(clientId));
    }),
    selectedBlockClientIds: selectedBlockClientIds
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      clearSelectedBlock = _dispatch.clearSelectedBlock,
      multiSelect = _dispatch.multiSelect,
      removeBlocks = _dispatch.removeBlocks;

  return {
    clearSelectedBlock: clearSelectedBlock,
    onMultiSelect: multiSelect,
    onRemove: removeBlocks
  };
})])(BlockEditorKeyboardShortcuts);

exports.default = _default;
//# sourceMappingURL=index.js.map