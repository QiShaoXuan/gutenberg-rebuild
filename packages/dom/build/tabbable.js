"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTabbableIndex = isTabbableIndex;
exports.find = find;

var _lodash = require("lodash");

var _focusable = require("./focusable");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Returns the tab index of the given element. In contrast with the tabIndex
 * property, this normalizes the default (0) to avoid browser inconsistencies,
 * operating under the assumption that this function is only ever called with a
 * focusable node.
 *
 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1190261
 *
 * @param {Element} element Element from which to retrieve.
 *
 * @return {?number} Tab index of element (default 0).
 */
function getTabIndex(element) {
  var tabIndex = element.getAttribute('tabindex');
  return tabIndex === null ? 0 : parseInt(tabIndex, 10);
}
/**
 * Returns true if the specified element is tabbable, or false otherwise.
 *
 * @param {Element} element Element to test.
 *
 * @return {boolean} Whether element is tabbable.
 */


function isTabbableIndex(element) {
  return getTabIndex(element) !== -1;
}
/**
 * Returns a stateful reducer function which constructs a filtered array of
 * tabbable elements, where at most one radio input is selected for a given
 * name, giving priority to checked input, falling back to the first
 * encountered.
 *
 * @return {Function} Radio group collapse reducer.
 */


function createStatefulCollapseRadioGroup() {
  var CHOSEN_RADIO_BY_NAME = {};
  return function collapseRadioGroup(result, element) {
    var nodeName = element.nodeName,
        type = element.type,
        checked = element.checked,
        name = element.name; // For all non-radio tabbables, construct to array by concatenating.

    if (nodeName !== 'INPUT' || type !== 'radio' || !name) {
      return result.concat(element);
    }

    var hasChosen = CHOSEN_RADIO_BY_NAME.hasOwnProperty(name); // Omit by skipping concatenation if the radio element is not chosen.

    var isChosen = checked || !hasChosen;

    if (!isChosen) {
      return result;
    } // At this point, if there had been a chosen element, the current
    // element is checked and should take priority. Retroactively remove
    // the element which had previously been considered the chosen one.


    if (hasChosen) {
      var hadChosenElement = CHOSEN_RADIO_BY_NAME[name];
      result = (0, _lodash.without)(result, hadChosenElement);
    }

    CHOSEN_RADIO_BY_NAME[name] = element;
    return result.concat(element);
  };
}
/**
 * An array map callback, returning an object with the element value and its
 * array index location as properties. This is used to emulate a proper stable
 * sort where equal tabIndex should be left in order of their occurrence in the
 * document.
 *
 * @param {Element} element Element.
 * @param {number}  index   Array index of element.
 *
 * @return {Object} Mapped object with element, index.
 */


function mapElementToObjectTabbable(element, index) {
  return {
    element: element,
    index: index
  };
}
/**
 * An array map callback, returning an element of the given mapped object's
 * element value.
 *
 * @param {Object} object Mapped object with index.
 *
 * @return {Element} Mapped object element.
 */


function mapObjectTabbableToElement(object) {
  return object.element;
}
/**
 * A sort comparator function used in comparing two objects of mapped elements.
 *
 * @see mapElementToObjectTabbable
 *
 * @param {Object} a First object to compare.
 * @param {Object} b Second object to compare.
 *
 * @return {number} Comparator result.
 */


function compareObjectTabbables(a, b) {
  var aTabIndex = getTabIndex(a.element);
  var bTabIndex = getTabIndex(b.element);

  if (aTabIndex === bTabIndex) {
    return a.index - b.index;
  }

  return aTabIndex - bTabIndex;
}

function find(context) {
  return (0, _focusable.find)(context).filter(isTabbableIndex).map(mapElementToObjectTabbable).sort(compareObjectTabbables).map(mapObjectTabbableToElement).reduce(createStatefulCollapseRadioGroup(), []);
}
//# sourceMappingURL=tabbable.js.map