import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

/**
 * WordPress dependencies
 */
import triggerFetch from '@wordpress/api-fetch';
import { createRegistryControl } from '@wordpress/data';
/**
 * Dispatches a control action for triggering an api fetch call.
 *
 * @param {Object} request Arguments for the fetch request.
 *
 * @return {Object} control descriptor.
 */

export function apiFetch(request) {
  return {
    type: 'API_FETCH',
    request: request
  };
}
/**
 * Dispatches a control action for triggering a registry select.
 *
 * @param {string} storeKey
 * @param {string} selectorName
 * @param {Array}  args Arguments for the select.
 *
 * @return {Object} control descriptor.
 */

export function select(storeKey, selectorName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return {
    type: 'SELECT',
    storeKey: storeKey,
    selectorName: selectorName,
    args: args
  };
}
/**
 * Dispatches a control action for triggering a registry select that has a
 * resolver.
 *
 * @param {string}  storeKey
 * @param {string}  selectorName
 * @param {Array}   args  Arguments for the select.
 *
 * @return {Object} control descriptor.
 */

export function resolveSelect(storeKey, selectorName) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  return {
    type: 'RESOLVE_SELECT',
    storeKey: storeKey,
    selectorName: selectorName,
    args: args
  };
}
/**
 * Dispatches a control action for triggering a registry dispatch.
 *
 * @param {string} storeKey
 * @param {string} actionName
 * @param {Array} args  Arguments for the dispatch action.
 *
 * @return {Object}  control descriptor.
 */

export function dispatch(storeKey, actionName) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    args[_key3 - 2] = arguments[_key3];
  }

  return {
    type: 'DISPATCH',
    storeKey: storeKey,
    actionName: actionName,
    args: args
  };
}
export default {
  API_FETCH: function API_FETCH(_ref) {
    var request = _ref.request;
    return triggerFetch(request);
  },
  SELECT: createRegistryControl(function (registry) {
    return function (_ref2) {
      var _registry$select;

      var storeKey = _ref2.storeKey,
          selectorName = _ref2.selectorName,
          args = _ref2.args;
      return (_registry$select = registry.select(storeKey))[selectorName].apply(_registry$select, _toConsumableArray(args));
    };
  }),
  DISPATCH: createRegistryControl(function (registry) {
    return function (_ref3) {
      var _registry$dispatch;

      var storeKey = _ref3.storeKey,
          actionName = _ref3.actionName,
          args = _ref3.args;
      return (_registry$dispatch = registry.dispatch(storeKey))[actionName].apply(_registry$dispatch, _toConsumableArray(args));
    };
  }),
  RESOLVE_SELECT: createRegistryControl(function (registry) {
    return function (_ref4) {
      var storeKey = _ref4.storeKey,
          selectorName = _ref4.selectorName,
          args = _ref4.args;
      return new Promise(function (resolve) {
        var hasFinished = function hasFinished() {
          return registry.select('core/data').hasFinishedResolution(storeKey, selectorName, args);
        };

        var getResult = function getResult() {
          return registry.select(storeKey)[selectorName].apply(null, args);
        }; // trigger the selector (to trigger the resolver)


        var result = getResult();

        if (hasFinished()) {
          return resolve(result);
        }

        var unsubscribe = registry.subscribe(function () {
          if (hasFinished()) {
            unsubscribe();
            resolve(getResult());
          }
        });
      });
    };
  })
};
//# sourceMappingURL=controls.js.map