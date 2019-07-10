"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

/**
 * External dependencies
 */

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

      var isReset = state === undefined || (0, _lodash.includes)(options.resetTypes, action.type);
      var isChanging = state !== nextState; // If not intending to update dirty flag, return early and avoid clone.

      if (!isChanging && !isReset) {
        return state;
      } // Avoid mutating state, unless it's already changing by original
      // reducer and not initial.


      if (!isChanging || state === undefined) {
        nextState = (0, _objectSpread2.default)({}, nextState);
      }

      var isIgnored = (0, _lodash.includes)(options.ignoreTypes, action.type);

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

var _default = withChangeDetection;
exports.default = _default;
//# sourceMappingURL=index.js.map