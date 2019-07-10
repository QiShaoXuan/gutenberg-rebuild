import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
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
import { first, last, some, flow } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, Fragment } from '@wordpress/element';
import { KeyboardShortcuts } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BlockActions from '../block-actions';

var preventDefault = function preventDefault(event) {
  event.preventDefault();
  return event;
};

export var shortcuts = {
  duplicate: {
    raw: rawShortcut.primaryShift('d'),
    display: displayShortcut.primaryShift('d')
  },
  removeBlock: {
    raw: rawShortcut.access('z'),
    display: displayShortcut.access('z')
  },
  insertBefore: {
    raw: rawShortcut.primaryAlt('t'),
    display: displayShortcut.primaryAlt('t')
  },
  insertAfter: {
    raw: rawShortcut.primaryAlt('y'),
    display: displayShortcut.primaryAlt('y')
  }
};

var BlockEditorKeyboardShortcuts =
/*#__PURE__*/
function (_Component) {
  _inherits(BlockEditorKeyboardShortcuts, _Component);

  function BlockEditorKeyboardShortcuts() {
    var _this;

    _classCallCheck(this, BlockEditorKeyboardShortcuts);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BlockEditorKeyboardShortcuts).apply(this, arguments));
    _this.selectAll = _this.selectAll.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.deleteSelectedBlocks = _this.deleteSelectedBlocks.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.clearMultiSelection = _this.clearMultiSelection.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(BlockEditorKeyboardShortcuts, [{
    key: "selectAll",
    value: function selectAll(event) {
      var _this$props = this.props,
          rootBlocksClientIds = _this$props.rootBlocksClientIds,
          onMultiSelect = _this$props.onMultiSelect;
      event.preventDefault();
      onMultiSelect(first(rootBlocksClientIds), last(rootBlocksClientIds));
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
      return createElement(Fragment, null, createElement(KeyboardShortcuts, {
        shortcuts: (_ref = {}, _defineProperty(_ref, rawShortcut.primary('a'), this.selectAll), _defineProperty(_ref, "backspace", this.deleteSelectedBlocks), _defineProperty(_ref, "del", this.deleteSelectedBlocks), _defineProperty(_ref, "escape", this.clearMultiSelection), _ref)
      }), selectedBlockClientIds.length > 0 && createElement(BlockActions, {
        clientIds: selectedBlockClientIds
      }, function (_ref2) {
        var _ref3;

        var onDuplicate = _ref2.onDuplicate,
            onRemove = _ref2.onRemove,
            onInsertAfter = _ref2.onInsertAfter,
            onInsertBefore = _ref2.onInsertBefore;
        return createElement(KeyboardShortcuts, {
          bindGlobal: true,
          shortcuts: (_ref3 = {}, _defineProperty(_ref3, shortcuts.duplicate.raw, flow(preventDefault, onDuplicate)), _defineProperty(_ref3, shortcuts.removeBlock.raw, flow(preventDefault, onRemove)), _defineProperty(_ref3, shortcuts.insertBefore.raw, flow(preventDefault, onInsertBefore)), _defineProperty(_ref3, shortcuts.insertAfter.raw, flow(preventDefault, onInsertAfter)), _ref3)
        });
      }));
    }
  }]);

  return BlockEditorKeyboardShortcuts;
}(Component);

export default compose([withSelect(function (select) {
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
    isLocked: some(selectedBlockClientIds, function (clientId) {
      return !!getTemplateLock(getBlockRootClientId(clientId));
    }),
    selectedBlockClientIds: selectedBlockClientIds
  };
}), withDispatch(function (dispatch) {
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
//# sourceMappingURL=index.js.map