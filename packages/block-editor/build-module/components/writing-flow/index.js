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
import { overEvery, find, findLast, reverse, first, last } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { computeCaretRect, focus, isHorizontalEdge, isTextField, isVerticalEdge, placeCaretAtHorizontalEdge, placeCaretAtVerticalEdge, isEntirelySelected } from '@wordpress/dom';
import { UP, DOWN, LEFT, RIGHT, isKeyboardEvent } from '@wordpress/keycodes';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { isBlockFocusStop, isInSameBlock, hasInnerBlocksContext } from '../../utils/dom';
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

var isTabbableTextField = overEvery([isTextField, focus.tabbable.isTabbableIndex]);
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

export function isNavigationCandidate(element, keyCode, hasModifier) {
  var isVertical = keyCode === UP || keyCode === DOWN; // Currently, all elements support unmodified vertical navigation.

  if (isVertical && !hasModifier) {
    return true;
  } // Native inputs should not navigate horizontally.


  var tagName = element.tagName;
  return tagName !== 'INPUT' && tagName !== 'TEXTAREA';
}

var WritingFlow =
/*#__PURE__*/
function (_Component) {
  _inherits(WritingFlow, _Component);

  function WritingFlow() {
    var _this;

    _classCallCheck(this, WritingFlow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WritingFlow).apply(this, arguments));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindContainer = _this.bindContainer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.clearVerticalRect = _this.clearVerticalRect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusLastTextField = _this.focusLastTextField.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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

  _createClass(WritingFlow, [{
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
      var focusableNodes = focus.focusable.find(this.container);

      if (isReverse) {
        focusableNodes = reverse(focusableNodes);
      } // Consider as candidates those focusables after the current target.
      // It's assumed this can only be reached if the target is focusable
      // (on its keydown event), so no need to verify it exists in the set.


      focusableNodes = focusableNodes.slice(focusableNodes.indexOf(target) + 1);

      function isTabCandidate(node, i, array) {
        // Not a candidate if the node is not tabbable.
        if (!focus.tabbable.isTabbableIndex(node)) {
          return false;
        } // Prefer text fields...


        if (isTextField(node)) {
          return true;
        } // ...but settle for block focus stop.


        if (!isBlockFocusStop(node)) {
          return false;
        } // If element contains inner blocks, stop immediately at its focus
        // wrapper.


        if (hasInnerBlocksContext(node)) {
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

      return find(focusableNodes, isTabCandidate);
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
      return !closestTabbable || !isInSameBlock(target, closestTabbable);
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
      var isUp = keyCode === UP;
      var isDown = keyCode === DOWN;
      var isLeft = keyCode === LEFT;
      var isRight = keyCode === RIGHT;
      var isReverse = isUp || isLeft;
      var isHorizontal = isLeft || isRight;
      var isVertical = isUp || isDown;
      var isNav = isHorizontal || isVertical;
      var isShift = event.shiftKey;
      var hasModifier = isShift || event.ctrlKey || event.altKey || event.metaKey;
      var isNavEdge = isVertical ? isVerticalEdge : isHorizontalEdge; // This logic inside this condition needs to be checked before
      // the check for event.nativeEvent.defaultPrevented.
      // The logic handles meta+a keypress and this event is default prevented
      // by RichText.

      if (!isNav) {
        // Set immediately before the meta+a combination can be pressed.
        if (isKeyboardEvent.primary(event)) {
          this.isEntirelySelected = isEntirelySelected(target);
        }

        if (isKeyboardEvent.primary(event, 'a')) {
          // When the target is contentEditable, selection will already
          // have been set by the browser earlier in this call stack. We
          // need check the previous result, otherwise all blocks will be
          // selected right away.
          if (target.isContentEditable ? this.isEntirelySelected : isEntirelySelected(target)) {
            onMultiSelect(first(blocks), last(blocks));
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
        this.verticalRect = computeCaretRect(target);
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
      } else if (isVertical && isVerticalEdge(target, isReverse)) {
        var closestTabbable = this.getClosestTabbable(target, isReverse);

        if (closestTabbable) {
          placeCaretAtVerticalEdge(closestTabbable, isReverse, this.verticalRect);
          event.preventDefault();
        }
      } else if (isHorizontal && getSelection().isCollapsed && isHorizontalEdge(target, isReverse)) {
        var _closestTabbable = this.getClosestTabbable(target, isReverse);

        placeCaretAtHorizontalEdge(_closestTabbable, isReverse);
        event.preventDefault();
      }
    }
    /**
     * Sets focus to the end of the last tabbable text field, if one exists.
     */

  }, {
    key: "focusLastTextField",
    value: function focusLastTextField() {
      var focusableNodes = focus.focusable.find(this.container);
      var target = findLast(focusableNodes, isTabbableTextField);

      if (target) {
        placeCaretAtHorizontalEdge(target, true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children; // Disable reason: Wrapper itself is non-interactive, but must capture
      // bubbling events from children to determine focus transition intents.

      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return createElement("div", {
        className: "editor-writing-flow block-editor-writing-flow"
      }, createElement("div", {
        ref: this.bindContainer,
        onKeyDown: this.onKeyDown,
        onMouseDown: this.clearVerticalRect
      }, children), createElement("div", {
        "aria-hidden": true,
        tabIndex: -1,
        onClick: this.focusLastTextField,
        className: "wp-block editor-writing-flow__click-redirect block-editor-writing-flow__click-redirect"
      }));
      /* eslint-disable jsx-a11y/no-static-element-interactions */
    }
  }]);

  return WritingFlow;
}(Component);

export default compose([withSelect(function (select) {
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
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      multiSelect = _dispatch.multiSelect,
      selectBlock = _dispatch.selectBlock;

  return {
    onMultiSelect: multiSelect,
    onSelectBlock: selectBlock
  };
})])(WritingFlow);
//# sourceMappingURL=index.js.map