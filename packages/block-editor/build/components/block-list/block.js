"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockListBlock = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _dom = require("@wordpress/dom");

var _keycodes = require("@wordpress/keycodes");

var _blocks = require("@wordpress/blocks");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _viewport = require("@wordpress/viewport");

var _compose = require("@wordpress/compose");

var _blockEdit = _interopRequireDefault(require("../block-edit"));

var _blockMover = _interopRequireDefault(require("../block-mover"));

var _blockDropZone = _interopRequireDefault(require("../block-drop-zone"));

var _blockInvalidWarning = _interopRequireDefault(require("./block-invalid-warning"));

var _blockCrashWarning = _interopRequireDefault(require("./block-crash-warning"));

var _blockCrashBoundary = _interopRequireDefault(require("./block-crash-boundary"));

var _blockHtml = _interopRequireDefault(require("./block-html"));

var _breadcrumb = _interopRequireDefault(require("./breadcrumb"));

var _blockContextualToolbar = _interopRequireDefault(require("./block-contextual-toolbar"));

var _multiControls = _interopRequireDefault(require("./multi-controls"));

var _blockMobileToolbar = _interopRequireDefault(require("./block-mobile-toolbar"));

var _insertionPoint = _interopRequireDefault(require("./insertion-point"));

var _ignoreNestedEvents = _interopRequireDefault(require("../ignore-nested-events"));

var _inserterWithShortcuts = _interopRequireDefault(require("../inserter-with-shortcuts"));

var _inserter = _interopRequireDefault(require("../inserter"));

var _hoverArea = _interopRequireDefault(require("./hover-area"));

var _dom2 = require("../../utils/dom");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BlockListBlock =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BlockListBlock, _Component);

  function BlockListBlock() {
    var _this;

    (0, _classCallCheck2.default)(this, BlockListBlock);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockListBlock).apply(this, arguments));
    _this.setBlockListRef = _this.setBlockListRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindBlockNode = _this.bindBlockNode.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.setAttributes = _this.setAttributes.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.maybeHover = _this.maybeHover.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.forceFocusedContextualToolbar = _this.forceFocusedContextualToolbar.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.hideHoverEffects = _this.hideHoverEffects.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onFocus = _this.onFocus.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.preventDrag = _this.preventDrag.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onPointerDown = _this.onPointerDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.deleteOrInsertAfterWrapper = _this.deleteOrInsertAfterWrapper.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onBlockError = _this.onBlockError.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onTouchStart = _this.onTouchStart.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onClick = _this.onClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onDragStart = _this.onDragStart.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onDragEnd = _this.onDragEnd.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.selectOnOpen = _this.selectOnOpen.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.hadTouchStart = false;
    _this.state = {
      error: null,
      dragging: false,
      isHovered: false
    };
    _this.isForcingContextualToolbar = false;
    return _this;
  }

  (0, _createClass2.default)(BlockListBlock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.isSelected) {
        this.focusTabbable();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.isForcingContextualToolbar) {
        // The forcing of contextual toolbar should only be true during one update,
        // after the first update normal conditions should apply.
        this.isForcingContextualToolbar = false;
      }

      if (this.props.isTypingWithinBlock || this.props.isSelected) {
        this.hideHoverEffects();
      }

      if (this.props.isSelected && !prevProps.isSelected) {
        this.focusTabbable(true);
      } // When triggering a multi-selection, move the focus to the wrapper of the first selected block.
      // This ensures that it is not possible to continue editing the initially selected block
      // when a multi-selection is triggered.


      if (this.props.isFirstMultiSelected && !prevProps.isFirstMultiSelected) {
        this.wrapperNode.focus();
      }
    }
  }, {
    key: "setBlockListRef",
    value: function setBlockListRef(node) {
      this.wrapperNode = node;
      this.props.blockRef(node, this.props.clientId); // We need to rerender to trigger a rerendering of HoverArea
      // it depents on this.wrapperNode but we can't keep this.wrapperNode in state
      // Because we need it to be immediately availeble for `focusableTabbable` to work.

      this.forceUpdate();
    }
  }, {
    key: "bindBlockNode",
    value: function bindBlockNode(node) {
      this.node = node;
    }
    /**
     * When a block becomes selected, transition focus to an inner tabbable.
     *
     * @param {boolean} ignoreInnerBlocks Should not focus inner blocks.
     */

  }, {
    key: "focusTabbable",
    value: function focusTabbable(ignoreInnerBlocks) {
      var _this2 = this;

      var initialPosition = this.props.initialPosition; // Focus is captured by the wrapper node, so while focus transition
      // should only consider tabbables within editable display, since it
      // may be the wrapper itself or a side control which triggered the
      // focus event, don't unnecessary transition to an inner tabbable.

      if (this.wrapperNode.contains(document.activeElement)) {
        return;
      } // Find all tabbables within node.


      var textInputs = _dom.focus.tabbable.find(this.node).filter(_dom.isTextField) // Exclude inner blocks
      .filter(function (node) {
        return !ignoreInnerBlocks || (0, _dom2.isInsideRootBlock)(_this2.node, node);
      }); // If reversed (e.g. merge via backspace), use the last in the set of
      // tabbables.


      var isReverse = -1 === initialPosition;
      var target = (isReverse ? _lodash.last : _lodash.first)(textInputs);

      if (!target) {
        this.wrapperNode.focus();
        return;
      }

      target.focus(); // In reverse case, need to explicitly place caret position.

      if (isReverse) {
        (0, _dom.placeCaretAtHorizontalEdge)(target, true);
        (0, _dom.placeCaretAtVerticalEdge)(target, true);
      }
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(attributes) {
      var _this$props = this.props,
          clientId = _this$props.clientId,
          name = _this$props.name,
          onChange = _this$props.onChange;
      var type = (0, _blocks.getBlockType)(name);
      onChange(clientId, attributes);
      var metaAttributes = (0, _lodash.reduce)(attributes, function (result, value, key) {
        if ((0, _lodash.get)(type, ['attributes', key, 'source']) === 'meta') {
          result[type.attributes[key].meta] = value;
        }

        return result;
      }, {});

      if ((0, _lodash.size)(metaAttributes)) {
        this.props.onMetaChange(metaAttributes);
      }
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart() {
      // Detect touchstart to disable hover on iOS
      this.hadTouchStart = true;
    }
  }, {
    key: "onClick",
    value: function onClick() {
      // Clear touchstart detection
      // Browser will try to emulate mouse events also see https://www.html5rocks.com/en/mobile/touchandmouse/
      this.hadTouchStart = false;
    }
    /**
     * A mouseover event handler to apply hover effect when a pointer device is
     * placed within the bounds of the block. The mouseover event is preferred
     * over mouseenter because it may be the case that a previous mouseenter
     * event was blocked from being handled by a IgnoreNestedEvents component,
     * therefore transitioning out of a nested block to the bounds of the block
     * would otherwise not trigger a hover effect.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/Events/mouseenter
     */

  }, {
    key: "maybeHover",
    value: function maybeHover() {
      var _this$props2 = this.props,
          isPartOfMultiSelection = _this$props2.isPartOfMultiSelection,
          isSelected = _this$props2.isSelected;
      var isHovered = this.state.isHovered;

      if (isHovered || isPartOfMultiSelection || isSelected || this.hadTouchStart) {
        return;
      }

      this.setState({
        isHovered: true
      });
    }
    /**
     * Sets the block state as unhovered if currently hovering. There are cases
     * where mouseleave may occur but the block is not hovered (multi-select),
     * so to avoid unnecesary renders, the state is only set if hovered.
     */

  }, {
    key: "hideHoverEffects",
    value: function hideHoverEffects() {
      if (this.state.isHovered) {
        this.setState({
          isHovered: false
        });
      }
    }
    /**
     * Marks the block as selected when focused and not already selected. This
     * specifically handles the case where block does not set focus on its own
     * (via `setFocus`), typically if there is no focusable input in the block.
     *
     * @return {void}
     */

  }, {
    key: "onFocus",
    value: function onFocus() {
      if (!this.props.isSelected && !this.props.isPartOfMultiSelection) {
        this.props.onSelect();
      }
    }
    /**
     * Prevents default dragging behavior within a block to allow for multi-
     * selection to take effect unhampered.
     *
     * @param {DragEvent} event Drag event.
     *
     * @return {void}
     */

  }, {
    key: "preventDrag",
    value: function preventDrag(event) {
      event.preventDefault();
    }
    /**
     * Begins tracking cursor multi-selection when clicking down within block.
     *
     * @param {MouseEvent} event A mousedown event.
     *
     * @return {void}
     */

  }, {
    key: "onPointerDown",
    value: function onPointerDown(event) {
      // Not the main button.
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
      if (event.button !== 0) {
        return;
      }

      if (event.shiftKey) {
        if (!this.props.isSelected) {
          this.props.onShiftSelection();
          event.preventDefault();
        }
      } else {
        this.props.onSelectionStart(this.props.clientId); // Allow user to escape out of a multi-selection to a singular
        // selection of a block via click. This is handled here since
        // onFocus excludes blocks involved in a multiselection, as
        // focus can be incurred by starting a multiselection (focus
        // moved to first block's multi-controls).

        if (this.props.isPartOfMultiSelection) {
          this.props.onSelect();
        }
      }
    }
    /**
     * Interprets keydown event intent to remove or insert after block if key
     * event occurs on wrapper node. This can occur when the block has no text
     * fields of its own, particularly after initial insertion, to allow for
     * easy deletion and continuous writing flow to add additional content.
     *
     * @param {KeyboardEvent} event Keydown event.
     */

  }, {
    key: "deleteOrInsertAfterWrapper",
    value: function deleteOrInsertAfterWrapper(event) {
      var keyCode = event.keyCode,
          target = event.target; // These block shortcuts should only trigger if the wrapper of the block is selected
      // And when it's not a multi-selection to avoid conflicting with RichText/Inputs and multiselection.

      if (!this.props.isSelected || target !== this.wrapperNode || this.props.isLocked) {
        return;
      }

      switch (keyCode) {
        case _keycodes.ENTER:
          // Insert default block after current block if enter and event
          // not already handled by descendant.
          this.props.onInsertDefaultBlockAfter();
          event.preventDefault();
          break;

        case _keycodes.BACKSPACE:
        case _keycodes.DELETE:
          // Remove block on backspace.
          var _this$props3 = this.props,
              clientId = _this$props3.clientId,
              onRemove = _this$props3.onRemove;
          onRemove(clientId);
          event.preventDefault();
          break;
      }
    }
  }, {
    key: "onBlockError",
    value: function onBlockError(error) {
      this.setState({
        error: error
      });
    }
  }, {
    key: "onDragStart",
    value: function onDragStart() {
      this.setState({
        dragging: true
      });
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd() {
      this.setState({
        dragging: false
      });
    }
  }, {
    key: "selectOnOpen",
    value: function selectOnOpen(open) {
      if (open && !this.props.isSelected) {
        this.props.onSelect();
      }
    }
  }, {
    key: "forceFocusedContextualToolbar",
    value: function forceFocusedContextualToolbar() {
      this.isForcingContextualToolbar = true; // trigger a re-render

      this.setState(function () {
        return {};
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return (0, _element.createElement)(_hoverArea.default, {
        container: this.wrapperNode
      }, function (_ref) {
        var hoverArea = _ref.hoverArea;
        var _this3$props = _this3.props,
            mode = _this3$props.mode,
            isFocusMode = _this3$props.isFocusMode,
            hasFixedToolbar = _this3$props.hasFixedToolbar,
            isLocked = _this3$props.isLocked,
            isFirst = _this3$props.isFirst,
            isLast = _this3$props.isLast,
            clientId = _this3$props.clientId,
            rootClientId = _this3$props.rootClientId,
            isSelected = _this3$props.isSelected,
            isPartOfMultiSelection = _this3$props.isPartOfMultiSelection,
            isFirstMultiSelected = _this3$props.isFirstMultiSelected,
            isTypingWithinBlock = _this3$props.isTypingWithinBlock,
            isCaretWithinFormattedText = _this3$props.isCaretWithinFormattedText,
            isEmptyDefaultBlock = _this3$props.isEmptyDefaultBlock,
            isMovable = _this3$props.isMovable,
            isParentOfSelectedBlock = _this3$props.isParentOfSelectedBlock,
            isDraggable = _this3$props.isDraggable,
            className = _this3$props.className,
            name = _this3$props.name,
            isValid = _this3$props.isValid,
            attributes = _this3$props.attributes;
        var isHovered = _this3.state.isHovered && !isPartOfMultiSelection;
        var blockType = (0, _blocks.getBlockType)(name); // translators: %s: Type of block (i.e. Text, Image etc)

        var blockLabel = (0, _i18n.sprintf)((0, _i18n.__)('Block: %s'), blockType.title); // The block as rendered in the editor is composed of general block UI
        // (mover, toolbar, wrapper) and the display of the block content.

        var isUnregisteredBlock = name === (0, _blocks.getUnregisteredTypeHandlerName)(); // If the block is selected and we're typing the block should not appear.
        // Empty paragraph blocks should always show up as unselected.

        var showEmptyBlockSideInserter = (isSelected || isHovered) && isEmptyDefaultBlock && isValid;
        var shouldAppearSelected = !isFocusMode && !showEmptyBlockSideInserter && isSelected && !isTypingWithinBlock;
        var shouldAppearHovered = !isFocusMode && !hasFixedToolbar && isHovered && !isEmptyDefaultBlock; // We render block movers and block settings to keep them tabbale even if hidden

        var shouldRenderMovers = !isFocusMode && (isSelected || hoverArea === 'left') && !showEmptyBlockSideInserter && !isPartOfMultiSelection && !isTypingWithinBlock;
        var shouldShowBreadcrumb = !isFocusMode && isHovered && !isEmptyDefaultBlock;
        var shouldShowContextualToolbar = !hasFixedToolbar && !showEmptyBlockSideInserter && (isSelected && (!isTypingWithinBlock || isCaretWithinFormattedText) || isFirstMultiSelected);
        var shouldShowMobileToolbar = shouldAppearSelected;
        var _this3$state = _this3.state,
            error = _this3$state.error,
            dragging = _this3$state.dragging; // Insertion point can only be made visible if the block is at the
        // the extent of a multi-selection, or not in a multi-selection.

        var shouldShowInsertionPoint = isPartOfMultiSelection && isFirstMultiSelected || !isPartOfMultiSelection; // The wp-block className is important for editor styles.
        // Generate the wrapper class names handling the different states of the block.

        var wrapperClassName = (0, _classnames.default)('wp-block editor-block-list__block block-editor-block-list__block', {
          'has-warning': !isValid || !!error || isUnregisteredBlock,
          'is-selected': shouldAppearSelected,
          'is-multi-selected': isPartOfMultiSelection,
          'is-hovered': shouldAppearHovered,
          'is-reusable': (0, _blocks.isReusableBlock)(blockType),
          'is-dragging': dragging,
          'is-typing': isTypingWithinBlock,
          'is-focused': isFocusMode && (isSelected || isParentOfSelectedBlock),
          'is-focus-mode': isFocusMode
        }, className);
        var onReplace = _this3.props.onReplace; // Determine whether the block has props to apply to the wrapper.

        var wrapperProps = _this3.props.wrapperProps;

        if (blockType.getEditWrapperProps) {
          wrapperProps = (0, _objectSpread2.default)({}, wrapperProps, blockType.getEditWrapperProps(attributes));
        }

        var blockElementId = "block-".concat(clientId); // We wrap the BlockEdit component in a div that hides it when editing in
        // HTML mode. This allows us to render all of the ancillary pieces
        // (InspectorControls, etc.) which are inside `BlockEdit` but not
        // `BlockHTML`, even in HTML mode.

        var blockEdit = (0, _element.createElement)(_blockEdit.default, {
          name: name,
          isSelected: isSelected,
          attributes: attributes,
          setAttributes: _this3.setAttributes,
          insertBlocksAfter: isLocked ? undefined : _this3.props.onInsertBlocksAfter,
          onReplace: isLocked ? undefined : onReplace,
          mergeBlocks: isLocked ? undefined : _this3.props.onMerge,
          clientId: clientId,
          isSelectionEnabled: _this3.props.isSelectionEnabled,
          toggleSelection: _this3.props.toggleSelection
        });

        if (mode !== 'visual') {
          blockEdit = (0, _element.createElement)("div", {
            style: {
              display: 'none'
            }
          }, blockEdit);
        } // Disable reasons:
        //
        //  jsx-a11y/mouse-events-have-key-events:
        //   - onMouseOver is explicitly handling hover effects
        //
        //  jsx-a11y/no-static-element-interactions:
        //   - Each block can be selected by clicking on it

        /* eslint-disable jsx-a11y/mouse-events-have-key-events, jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */


        return (0, _element.createElement)(_ignoreNestedEvents.default, (0, _extends2.default)({
          id: blockElementId,
          ref: _this3.setBlockListRef,
          onMouseOver: _this3.maybeHover,
          onMouseOverHandled: _this3.hideHoverEffects,
          onMouseLeave: _this3.hideHoverEffects,
          className: wrapperClassName,
          "data-type": name,
          onTouchStart: _this3.onTouchStart,
          onFocus: _this3.onFocus,
          onClick: _this3.onClick,
          onKeyDown: _this3.deleteOrInsertAfterWrapper,
          tabIndex: "0",
          "aria-label": blockLabel,
          childHandledEvents: ['onDragStart', 'onMouseDown']
        }, wrapperProps), shouldShowInsertionPoint && (0, _element.createElement)(_insertionPoint.default, {
          clientId: clientId,
          rootClientId: rootClientId
        }), (0, _element.createElement)(_blockDropZone.default, {
          clientId: clientId,
          rootClientId: rootClientId
        }), isFirstMultiSelected && (0, _element.createElement)(_multiControls.default, {
          rootClientId: rootClientId
        }), (0, _element.createElement)("div", {
          className: "editor-block-list__block-edit block-editor-block-list__block-edit"
        }, shouldRenderMovers && (0, _element.createElement)(_blockMover.default, {
          clientIds: clientId,
          blockElementId: blockElementId,
          isFirst: isFirst,
          isLast: isLast,
          isHidden: !(isHovered || isSelected) || hoverArea !== 'left',
          isDraggable: isDraggable !== false && !isPartOfMultiSelection && isMovable,
          onDragStart: _this3.onDragStart,
          onDragEnd: _this3.onDragEnd
        }), shouldShowBreadcrumb && (0, _element.createElement)(_breadcrumb.default, {
          clientId: clientId,
          isHidden: !(isHovered || isSelected) || hoverArea !== 'left'
        }), (shouldShowContextualToolbar || _this3.isForcingContextualToolbar) && (0, _element.createElement)(_blockContextualToolbar.default // If the toolbar is being shown because of being forced
        // it should focus the toolbar right after the mount.
        , {
          focusOnMount: _this3.isForcingContextualToolbar
        }), !shouldShowContextualToolbar && isSelected && !hasFixedToolbar && !isEmptyDefaultBlock && (0, _element.createElement)(_components.KeyboardShortcuts, {
          bindGlobal: true,
          eventName: "keydown",
          shortcuts: {
            'alt+f10': _this3.forceFocusedContextualToolbar
          }
        }), (0, _element.createElement)(_ignoreNestedEvents.default, {
          ref: _this3.bindBlockNode,
          onDragStart: _this3.preventDrag,
          onMouseDown: _this3.onPointerDown,
          "data-block": clientId
        }, (0, _element.createElement)(_blockCrashBoundary.default, {
          onError: _this3.onBlockError
        }, isValid && blockEdit, isValid && mode === 'html' && (0, _element.createElement)(_blockHtml.default, {
          clientId: clientId
        }), !isValid && [(0, _element.createElement)(_blockInvalidWarning.default, {
          key: "invalid-warning",
          clientId: clientId
        }), (0, _element.createElement)("div", {
          key: "invalid-preview"
        }, (0, _blocks.getSaveElement)(blockType, attributes))]), shouldShowMobileToolbar && (0, _element.createElement)(_blockMobileToolbar.default, {
          clientId: clientId
        }), !!error && (0, _element.createElement)(_blockCrashWarning.default, null))), showEmptyBlockSideInserter && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
          className: "editor-block-list__side-inserter block-editor-block-list__side-inserter"
        }, (0, _element.createElement)(_inserterWithShortcuts.default, {
          clientId: clientId,
          rootClientId: rootClientId,
          onToggle: _this3.selectOnOpen
        })), (0, _element.createElement)("div", {
          className: "editor-block-list__empty-block-inserter block-editor-block-list__empty-block-inserter"
        }, (0, _element.createElement)(_inserter.default, {
          position: "top right",
          onToggle: _this3.selectOnOpen,
          rootClientId: rootClientId,
          clientId: clientId
        }))));
        /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
      });
    }
  }]);
  return BlockListBlock;
}(_element.Component);

exports.BlockListBlock = BlockListBlock;
var applyWithSelect = (0, _data.withSelect)(function (select, _ref2) {
  var clientId = _ref2.clientId,
      rootClientId = _ref2.rootClientId,
      isLargeViewport = _ref2.isLargeViewport;

  var _select = select('core/block-editor'),
      isBlockSelected = _select.isBlockSelected,
      isAncestorMultiSelected = _select.isAncestorMultiSelected,
      isBlockMultiSelected = _select.isBlockMultiSelected,
      isFirstMultiSelectedBlock = _select.isFirstMultiSelectedBlock,
      isTyping = _select.isTyping,
      isCaretWithinFormattedText = _select.isCaretWithinFormattedText,
      getBlockMode = _select.getBlockMode,
      isSelectionEnabled = _select.isSelectionEnabled,
      getSelectedBlocksInitialCaretPosition = _select.getSelectedBlocksInitialCaretPosition,
      getSettings = _select.getSettings,
      hasSelectedInnerBlock = _select.hasSelectedInnerBlock,
      getTemplateLock = _select.getTemplateLock,
      __unstableGetBlockWithoutInnerBlocks = _select.__unstableGetBlockWithoutInnerBlocks;

  var block = __unstableGetBlockWithoutInnerBlocks(clientId);

  var isSelected = isBlockSelected(clientId);

  var _getSettings = getSettings(),
      hasFixedToolbar = _getSettings.hasFixedToolbar,
      focusMode = _getSettings.focusMode;

  var templateLock = getTemplateLock(rootClientId);
  var isParentOfSelectedBlock = hasSelectedInnerBlock(clientId, true); // The fallback to `{}` is a temporary fix.
  // This function should never be called when a block is not present in the state.
  // It happens now because the order in withSelect rendering is not correct.

  var _ref3 = block || {},
      name = _ref3.name,
      attributes = _ref3.attributes,
      isValid = _ref3.isValid;

  return {
    isPartOfMultiSelection: isBlockMultiSelected(clientId) || isAncestorMultiSelected(clientId),
    isFirstMultiSelected: isFirstMultiSelectedBlock(clientId),
    // We only care about this prop when the block is selected
    // Thus to avoid unnecessary rerenders we avoid updating the prop if the block is not selected.
    isTypingWithinBlock: (isSelected || isParentOfSelectedBlock) && isTyping(),
    isCaretWithinFormattedText: isCaretWithinFormattedText(),
    mode: getBlockMode(clientId),
    isSelectionEnabled: isSelectionEnabled(),
    initialPosition: isSelected ? getSelectedBlocksInitialCaretPosition() : null,
    isEmptyDefaultBlock: name && (0, _blocks.isUnmodifiedDefaultBlock)({
      name: name,
      attributes: attributes
    }),
    isMovable: 'all' !== templateLock,
    isLocked: !!templateLock,
    isFocusMode: focusMode && isLargeViewport,
    hasFixedToolbar: hasFixedToolbar && isLargeViewport,
    // Users of the editor.BlockListBlock filter used to be able to access the block prop
    // Ideally these blocks would rely on the clientId prop only.
    // This is kept for backward compatibility reasons.
    block: block,
    name: name,
    attributes: attributes,
    isValid: isValid,
    isSelected: isSelected,
    isParentOfSelectedBlock: isParentOfSelectedBlock
  };
});
var applyWithDispatch = (0, _data.withDispatch)(function (dispatch, ownProps, _ref4) {
  var select = _ref4.select;

  var _dispatch = dispatch('core/block-editor'),
      updateBlockAttributes = _dispatch.updateBlockAttributes,
      selectBlock = _dispatch.selectBlock,
      multiSelect = _dispatch.multiSelect,
      insertBlocks = _dispatch.insertBlocks,
      insertDefaultBlock = _dispatch.insertDefaultBlock,
      removeBlock = _dispatch.removeBlock,
      mergeBlocks = _dispatch.mergeBlocks,
      replaceBlocks = _dispatch.replaceBlocks,
      _toggleSelection = _dispatch.toggleSelection;

  return {
    onChange: function onChange(clientId, attributes) {
      updateBlockAttributes(clientId, attributes);
    },
    onSelect: function onSelect() {
      var clientId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ownProps.clientId;
      var initialPosition = arguments.length > 1 ? arguments[1] : undefined;
      selectBlock(clientId, initialPosition);
    },
    onInsertBlocks: function onInsertBlocks(blocks, index) {
      var rootClientId = ownProps.rootClientId;
      insertBlocks(blocks, index, rootClientId);
    },
    onInsertDefaultBlockAfter: function onInsertDefaultBlockAfter() {
      var clientId = ownProps.clientId,
          rootClientId = ownProps.rootClientId;

      var _select2 = select('core/block-editor'),
          getBlockIndex = _select2.getBlockIndex;

      var index = getBlockIndex(clientId, rootClientId);
      insertDefaultBlock({}, rootClientId, index + 1);
    },
    onInsertBlocksAfter: function onInsertBlocksAfter(blocks) {
      var clientId = ownProps.clientId,
          rootClientId = ownProps.rootClientId;

      var _select3 = select('core/block-editor'),
          getBlockIndex = _select3.getBlockIndex;

      var index = getBlockIndex(clientId, rootClientId);
      insertBlocks(blocks, index + 1, rootClientId);
    },
    onRemove: function onRemove(clientId) {
      removeBlock(clientId);
    },
    onMerge: function onMerge(forward) {
      var clientId = ownProps.clientId;

      var _select4 = select('core/block-editor'),
          getPreviousBlockClientId = _select4.getPreviousBlockClientId,
          getNextBlockClientId = _select4.getNextBlockClientId;

      if (forward) {
        var nextBlockClientId = getNextBlockClientId(clientId);

        if (nextBlockClientId) {
          mergeBlocks(clientId, nextBlockClientId);
        }
      } else {
        var previousBlockClientId = getPreviousBlockClientId(clientId);

        if (previousBlockClientId) {
          mergeBlocks(previousBlockClientId, clientId);
        }
      }
    },
    onReplace: function onReplace(blocks) {
      replaceBlocks([ownProps.clientId], blocks);
    },
    onMetaChange: function onMetaChange(updatedMeta) {
      var _select5 = select('core/block-editor'),
          getSettings = _select5.getSettings;

      var onChangeMeta = getSettings().__experimentalMetaSource.onChange;

      onChangeMeta(updatedMeta);
    },
    onShiftSelection: function onShiftSelection() {
      if (!ownProps.isSelectionEnabled) {
        return;
      }

      var _select6 = select('core/block-editor'),
          getBlockSelectionStart = _select6.getBlockSelectionStart;

      if (getBlockSelectionStart()) {
        multiSelect(getBlockSelectionStart(), ownProps.clientId);
      } else {
        selectBlock(ownProps.clientId);
      }
    },
    toggleSelection: function toggleSelection(selectionEnabled) {
      _toggleSelection(selectionEnabled);
    }
  };
});

var _default = (0, _compose.compose)(_compose.pure, (0, _viewport.withViewportMatch)({
  isLargeViewport: 'medium'
}), applyWithSelect, applyWithDispatch, (0, _components.withFilters)('editor.BlockListBlock'))(BlockListBlock);

exports.default = _default;
//# sourceMappingURL=block.js.map