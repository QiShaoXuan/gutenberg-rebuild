import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

/**
 * External dependencies
 */
import { includes } from 'lodash';
/**
 * Higher-order reducer creator for tracking changes to state over time. The
 * returned reducer will include a `isDirty` property on the object reflecting
 * whether the original reference of the reducer has changed.
 *
 * @param {?Object} options             Optional options.
 * @param {?Array}  options.ignoreTypes Action types upon which to skip check.
 * @param {?Array}  options.resetTypes  Action types upon which to reset dirty.
 *
 * @return {Function} Higher-order reducer.
 */

var withChangeDetection = function withChangeDetection() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (reducer) {
    return function (state, action) {
      var nextState = reducer(state, action); // Reset at:
      //  - Initial state
      //  - Reset types

      var isReset = state === undefined || includes(options.resetTypes, action.type);
      var isChanging = state !== nextState; // If not intending to update dirty flag, return early and avoid clone.

      if (!isChanging && !isReset) {
        return state;
      } // Avoid mutating state, unless it's already changing by original
      // reducer and not initial.


      if (!isChanging || state === undefined) {
        nextState = _objectSpread({}, nextState);
      }

      var isIgnored = includes(options.ignoreTypes, action.type);

      if (isIgnored) {
        // Preserve the original value if ignored.
        nextState.isDirty = state.isDirty;
      } else {
        nextState.isDirty = !isReset && isChanging;
      }

      return nextState;
    };
  };
};

export default withChangeDetection;
//# sourceMappingURL=index.js.map