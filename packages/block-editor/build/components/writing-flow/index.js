"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNavigationCandidate = isNavigationCandidate;
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _dom = require("@wordpress/dom");

var _keycodes = require("@wordpress/keycodes");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

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

/**
 * Browser constants
 */
var _window = window,
    getSelection = _window.getSelection;
/**
 * Given an element, returns true if the element is a tabbable text field, or
 * false otherwise.
 *
 * @param {Element} element Element to test.
 *
 * @return {boolean} Whether element is a tabbable text field.
 */

var isTabbableTextField = (0, _lodash.overEvery)([_dom.isTextField, _dom.focus.tabbable.isTabbableIndex]);
/**
 * Returns true if the element should consider edge navigation upon a keyboard
 * event of the given directional key code, or false otherwise.
 *
 * @param {Element} element     HTML element to test.
 * @param {number}  keyCode     KeyboardEvent keyCode to test.
 * @param {boolean} hasModifier Whether a modifier is pressed.
 *
 * @return {boolean} Whether element should consider edge navigation.
 */

function isNavigationCandidate(element, keyCode, hasModifier) {
  var isVertical = keyCode === _keycodes.UP || keyCode === _keycodes.DOWN; // Currently, all elements support unmodified vertical navigation.

  if (isVertical && !hasModifier) {
    return true;
  } // Native inputs should not navigate horizontally.


  var tagName = element.tagName;
  return tagName !== 'INPUT' && tagName !== 'TEXTAREA';
}

var WritingFlow =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(WritingFlow, _Component);

  function WritingFlow() {
    var _this;

    (0, _classCallCheck2.default)(this, WritingFlow);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(WritingFlow).apply(this, arguments));
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindContainer = _this.bindContainer.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.clearVerticalRect = _this.clearVerticalRect.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.focusLastTextField = _this.focusLastTextField.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    /**
     * Here a rectangle is stored while moving the caret vertically so
     * vertical position of the start position can be restored.
     * This is to recreate browser behaviour across blocks.
     *
     * @type {?DOMRect}
     */

    _this.verticalRect = null;
    return _this;
  }

  (0, _createClass2.default)(WritingFlow, [{
    key: "bindContainer",
    value: function bindContainer(ref) {
      this.container = ref;
    }
  }, {
    key: "clearVerticalRect",
    value: function clearVerticalRect() {
      this.verticalRect = null;
    }
    /**
     * Returns the optimal tab target from the given focused element in the
     * desired direction. A preference is made toward text fields, falling back
     * to the block focus stop if no other candidates exist for the block.
     *
     * @param {Element} target    Currently focused text field.
     * @param {boolean} isReverse True if considering as the first field.
     *
     * @return {?Element} Optimal tab target, if one exists.
     */

  }, {
    key: "getClosestTabbable",
    value: function getClosestTabbable(target, isReverse) {
      // Since the current focus target is not guaranteed to be a text field,
      // find all focusables. Tabbability is considered later.
      var focusableNodes = _dom.focus.focusable.find(this.container);

      if (isReverse) {
        focusableNodes = (0, _lodash.reverse)(focusableNodes);
      } // Consider as candidates those focusables after the current target.
      // It's assumed this can only be reached if the target is focusable
      // (on its keydown event), so no need to verify it exists in the set.


      focusableNodes = focusableNodes.slice(focusableNodes.indexOf(target) + 1);

      function isTabCandidate(node, i, array) {
        // Not a candidate if the node is not tabbable.
        if (!_dom.focus.tabbable.isTabbableIndex(node)) {
          return false;
        } // Prefer text fields...


        if ((0, _dom.isTextField)(node)) {
          return true;
        } // ...but settle for block focus stop.


        if (!(0, _dom2.isBlockFocusStop)(node)) {
          return false;
        } // If element contains inner blocks, stop immediately at its focus
        // wrapper.


        if ((0, _dom2.hasInnerBlocksContext)(node)) {
          return true;
        } // If navigating out of a block (in reverse), don't consider its
        // block focus stop.


        if (node.contains(target)) {
          return false;
        } // In case of block focus stop, check to see if there's a better
        // text field candidate within.


        for (var offset = 1, nextNode; nextNode = array[i + offset]; offset++) {
          // Abort if no longer testing descendents of focus stop.
          if (!node.contains(nextNode)) {
            break;
          } // Apply same tests by recursion. This is important to consider
          // nestable blocks where we don't want to settle for the inner
          // block focus stop.


          if (isTabCandidate(nextNode, i + offset, array)) {
            return false;
          }
        }

        return true;
      }

      return (0, _lodash.find)(focusableNodes, isTabCandidate);
    }
  }, {
    key: "expandSelection",
    value: function expandSelection(isReverse) {
      var _this$props = this.props,
          selectedBlockClientId = _this$props.selectedBlockClientId,
          selectionStartClientId = _this$props.selectionStartClientId,
          selectionBeforeEndClientId = _this$props.selectionBeforeEndClientId,
          selectionAfterEndClientId = _this$props.selectionAfterEndClientId;
      var nextSelectionEndClientId = isReverse ? selectionBeforeEndClientId : selectionAfterEndClientId;

      if (nextSelectionEndClientId) {
        this.props.onMultiSelect(selectionStartClientId || selectedBlockClientId, nextSelectionEndClientId);
      }
    }
  }, {
    key: "moveSelection",
    value: function moveSelection(isReverse) {
      var _this$props2 = this.props,
          selectedFirstClientId = _this$props2.selectedFirstClientId,
          selectedLastClientId = _this$props2.selectedLastClientId;
      var focusedBlockClientId = isReverse ? selectedFirstClientId : selectedLastClientId;

      if (focusedBlockClientId) {
        this.props.onSelectBlock(focusedBlockClientId);
      }
    }
    /**
     * Returns true if the given target field is the last in its block which
     * can be considered for tab transition. For example, in a block with two
     * text fields, this would return true when reversing from the first of the
     * two fields, but false when reversing from the second.
     *
     * @param {Element} target    Currently focused text field.
     * @param {boolean} isReverse True if considering as the first field.
     *
     * @return {boolean} Whether field is at edge for tab transition.
     */

  }, {
    key: "isTabbableEdge",
    value: function isTabbableEdge(target, isReverse) {
      var closestTabbable = this.getClosestTabbable(target, isReverse);
      return !closestTabbable || !(0, _dom2.isInSameBlock)(target, closestTabbable);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var _this$props3 = this.props,
          hasMultiSelection = _this$props3.hasMultiSelection,
          onMultiSelect = _this$props3.onMultiSelect,
          blocks = _this$props3.blocks,
          selectionBeforeEndClientId = _this$props3.selectionBeforeEndClientId,
          selectionAfterEndClientId = _this$props3.selectionAfterEndClientId;
      var keyCode = event.keyCode,
          target = event.target;
      var isUp = keyCode === _keycodes.UP;
      var isDown = keyCode === _keycodes.DOWN;
      var isLeft = keyCode === _keycodes.LEFT;
      var isRight = keyCode === _keycodes.RIGHT;
      var isReverse = isUp || isLeft;
      var isHorizontal = isLeft || isRight;
      var isVertical = isUp || isDown;
      var isNav = isHorizontal || isVertical;
      var isShift = event.shiftKey;
      var hasModifier = isShift || event.ctrlKey || event.altKey || event.metaKey;
      var isNavEdge = isVertical ? _dom.isVerticalEdge : _dom.isHorizontalEdge; // This logic inside this condition needs to be checked before
      // the check for event.nativeEvent.defaultPrevented.
      // The logic handles meta+a keypress and this event is default prevented
      // by RichText.

      if (!isNav) {
        // Set immediately before the meta+a combination can be pressed.
        if (_keycodes.isKeyboardEvent.primary(event)) {
          this.isEntirelySelected = (0, _dom.isEntirelySelected)(target);
        }

        if (_keycodes.isKeyboardEvent.primary(event, 'a')) {
          // When the target is contentEditable, selection will already
          // have been set by the browser earlier in this call stack. We
          // need check the previous result, otherwise all blocks will be
          // selected right away.
          if (target.isContentEditable ? this.isEntirelySelected : (0, _dom.isEntirelySelected)(target)) {
            onMultiSelect((0, _lodash.first)(blocks), (0, _lodash.last)(blocks));
            event.preventDefault();
          } // After pressing primary + A we can assume isEntirelySelected is true.
          // Calling right away isEntirelySelected after primary + A may still return false on some browsers.


          this.isEntirelySelected = true;
        }

        return;
      } // Abort if navigation has already been handled (e.g. RichText inline
      // boundaries).


      if (event.nativeEvent.defaultPrevented) {
        return;
      } // Abort if our current target is not a candidate for navigation (e.g.
      // preserve native input behaviors).


      if (!isNavigationCandidate(target, keyCode, hasModifier)) {
        return;
      }

      if (!isVertical) {
        this.verticalRect = null;
      } else if (!this.verticalRect) {
        this.verticalRect = (0, _dom.computeCaretRect)(target);
      }

      if (isShift) {
        if (( // Ensure that there is a target block.
        isReverse && selectionBeforeEndClientId || !isReverse && selectionAfterEndClientId) && (hasMultiSelection || this.isTabbableEdge(target, isReverse) && isNavEdge(target, isReverse))) {
          // Shift key is down, and there is multi selection or we're at
          // the end of the current block.
          this.expandSelection(isReverse);
          event.preventDefault();
        }
      } else if (hasMultiSelection) {
        // Moving from block multi-selection to single block selection
        this.moveSelection(isReverse);
        event.preventDefault();
      } else if (isVertical && (0, _dom.isVerticalEdge)(target, isReverse)) {
        var closestTabbable = this.getClosestTabbable(target, isReverse);

        if (closestTabbable) {
          (0, _dom.placeCaretAtVerticalEdge)(closestTabbable, isReverse, this.verticalRect);
          event.preventDefault();
        }
      } else if (isHorizontal && getSelection().isCollapsed && (0, _dom.isHorizontalEdge)(target, isReverse)) {
        var _closestTabbable = this.getClosestTabbable(target, isReverse);

        (0, _dom.placeCaretAtHorizontalEdge)(_closestTabbable, isReverse);
        event.preventDefault();
      }
    }
    /**
     * Sets focus to the end of the last tabbable text field, if one exists.
     */

  }, {
    key: "focusLastTextField",
    value: function focusLastTextField() {
      var focusableNodes = _dom.focus.focusable.find(this.container);

      var target = (0, _lodash.findLast)(focusableNodes, isTabbableTextField);

      if (target) {
        (0, _dom.placeCaretAtHorizontalEdge)(target, true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children; // Disable reason: Wrapper itself is non-interactive, but must capture
      // bubbling events from children to determine focus transition intents.

      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return (0, _element.createElement)("div", {
        className: "editor-writing-flow block-editor-writing-flow"
      }, (0, _element.createElement)("div", {
        ref: this.bindContainer,
        onKeyDown: this.onKeyDown,
        onMouseDown: this.clearVerticalRect
      }, children), (0, _element.createElement)("div", {
        "aria-hidden": true,
        tabIndex: -1,
        onClick: this.focusLastTextField,
        className: "wp-block editor-writing-flow__click-redirect block-editor-writing-flow__click-redirect"
      }));
      /* eslint-disable jsx-a11y/no-static-element-interactions */
    }
  }]);
  return WritingFlow;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/block-editor'),
      getSelectedBlockClientId = _select.getSelectedBlockClientId,
      getMultiSelectedBlocksStartClientId = _select.getMultiSelectedBlocksStartClientId,
      getMultiSelectedBlocksEndClientId = _select.getMultiSelectedBlocksEndClientId,
      getPreviousBlockClientId = _select.getPreviousBlockClientId,
      getNextBlockClientId = _select.getNextBlockClientId,
      getFirstMultiSelectedBlockClientId = _select.getFirstMultiSelectedBlockClientId,
      getLastMultiSelectedBlockClientId = _select.getLastMultiSelectedBlockClientId,
      hasMultiSelection = _select.hasMultiSelection,
      getBlockOrder = _select.getBlockOrder;

  var selectedBlockClientId = getSelectedBlockClientId();
  var selectionStartClientId = getMultiSelectedBlocksStartClientId();
  var selectionEndClientId = getMultiSelectedBlocksEndClientId();
  return {
    selectedBlockClientId: selectedBlockClientId,
    selectionStartClientId: selectionStartClientId,
    selectionBeforeEndClientId: getPreviousBlockClientId(selectionEndClientId || selectedBlockClientId),
    selectionAfterEndClientId: getNextBlockClientId(selectionEndClientId || selectedBlockClientId),
    selectedFirstClientId: getFirstMultiSelectedBlockClientId(),
    selectedLastClientId: getLastMultiSelectedBlockClientId(),
    hasMultiSelection: hasMultiSelection(),
    blocks: getBlockOrder()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      multiSelect = _dispatch.multiSelect,
      selectBlock = _dispatch.selectBlock;

  return {
    onMultiSelect: multiSelect,
    onSelectBlock: selectBlock
  };
})])(WritingFlow);

exports.default = _default;
//# sourceMappingURL=index.js.map