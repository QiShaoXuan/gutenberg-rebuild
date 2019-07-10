import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

/**
 * External dependencies
 */
import { overSome, includes, first, last, drop, dropRight } from 'lodash';
/**
 * Default options for withHistory reducer enhancer. Refer to withHistory
 * documentation for options explanation.
 *
 * @see withHistory
 *
 * @type {Object}
 */

var DEFAULT_OPTIONS = {
  resetTypes: [],
  ignoreTypes: [],
  shouldOverwriteState: function shouldOverwriteState() {
    return false;
  }
};
/**
 * Higher-order reducer creator which transforms the result of the original
 * reducer into an object tracking its own history (past, present, future).
 *
 * @param {?Object}   options                      Optional options.
 * @param {?Array}    options.resetTypes           Action types upon which to
 *                                                 clear past.
 * @param {?Array}    options.ignoreTypes          Action types upon which to
 *                                                 avoid history tracking.
 * @param {?Function} options.shouldOverwriteState Function receiving last and
 *                                                 current actions, returning
 *                                                 boolean indicating whether
 *                                                 present should be merged,
 *                                                 rather than add undo level.
 *
 * @return {Function} Higher-order reducer.
 */

var withHistory = function withHistory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (reducer) {
    options = _objectSpread({}, DEFAULT_OPTIONS, options); // `ignoreTypes` is simply a convenience for `shouldOverwriteState`

    options.shouldOverwriteState = overSome([options.shouldOverwriteState, function (action) {
      return includes(options.ignoreTypes, action.type);
    }]);
    var initialState = {
      past: [],
      present: reducer(undefined, {}),
      future: [],
      lastAction: null,
      shouldCreateUndoLevel: false
    };
    var _options = options,
        _options$resetTypes = _options.resetTypes,
        resetTypes = _options$resetTypes === void 0 ? [] : _options$resetTypes,
        _options$shouldOverwr = _options.shouldOverwriteState,
        shouldOverwriteState = _options$shouldOverwr === void 0 ? function () {
      return false;
    } : _options$shouldOverwr;
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments.length > 1 ? arguments[1] : undefined;
      var past = state.past,
          present = state.present,
          future = state.future,
          lastAction = state.lastAction,
          shouldCreateUndoLevel = state.shouldCreateUndoLevel;
      var previousAction = lastAction;

      switch (action.type) {
        case 'UNDO':
          // Can't undo if no past.
          if (!past.length) {
            return state;
          }

          return {
            past: dropRight(past),
            present: last(past),
            future: [present].concat(_toConsumableArray(future)),
            lastAction: null,
            shouldCreateUndoLevel: false
          };

        case 'REDO':
          // Can't redo if no future.
          if (!future.length) {
            return state;
          }

          return {
            past: [].concat(_toConsumableArray(past), [present]),
            present: first(future),
            future: drop(future),
            lastAction: null,
            shouldCreateUndoLevel: false
          };

        case 'CREATE_UNDO_LEVEL':
          return _objectSpread({}, state, {
            lastAction: null,
            shouldCreateUndoLevel: true
          });
      }

      var nextPresent = reducer(present, action);

      if (includes(resetTypes, action.type)) {
        return {
          past: [],
          present: nextPresent,
          future: [],
          lastAction: null,
          shouldCreateUndoLevel: false
        };
      }

      if (present === nextPresent) {
        return state;
      }

      var nextPast = past; // The `lastAction` property is used to compare actions in the
      // `shouldOverwriteState` option. If an action should be ignored, do not
      // submit that action as the last action, otherwise the ability to
      // compare subsequent actions will break.

      var lastActionToSubmit = previousAction;

      if (shouldCreateUndoLevel || !past.length || !shouldOverwriteState(action, previousAction)) {
        nextPast = [].concat(_toConsumableArray(past), [present]);
        lastActionToSubmit = action;
      }

      return {
        past: nextPast,
        present: nextPresent,
        future: [],
        shouldCreateUndoLevel: false,
        lastAction: lastActionToSubmit
      };
    };
  };
};

export default withHistory;
//# sourceMappingURL=index.js.map