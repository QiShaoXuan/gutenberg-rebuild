import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

/**
 * External dependencies
 */
import { without, mapValues } from 'lodash';
/**
 * Internal dependencies
 */

import createNamespace from './namespace-store';
import createCoreDataStore from './store';
/**
 * An isolated orchestrator of store registrations.
 *
 * @typedef {WPDataRegistry}
 *
 * @property {Function} registerGenericStore
 * @property {Function} registerStore
 * @property {Function} subscribe
 * @property {Function} select
 * @property {Function} dispatch
 */

/**
 * An object of registry function overrides.
 *
 * @typedef {WPDataPlugin}
 */

/**
 * Creates a new store registry, given an optional object of initial store
 * configurations.
 *
 * @param {Object}  storeConfigs Initial store configurations.
 * @param {Object?} parent       Parent registry.
 *
 * @return {WPDataRegistry} Data registry.
 */

export function createRegistry() {
  var storeConfigs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var stores = {};
  var listeners = [];
  /**
   * Global listener called for each store's update.
   */

  function globalListener() {
    listeners.forEach(function (listener) {
      return listener();
    });
  }
  /**
   * Subscribe to changes to any data.
   *
   * @param {Function}   listener Listener function.
   *
   * @return {Function}           Unsubscribe function.
   */


  var subscribe = function subscribe(listener) {
    listeners.push(listener);
    return function () {
      listeners = without(listeners, listener);
    };
  };
  /**
   * Calls a selector given the current state and extra arguments.
   *
   * @param {string} reducerKey Part of the state shape to register the
   *                            selectors for.
   *
   * @return {*} The selector's returned value.
   */


  function select(reducerKey) {
    var store = stores[reducerKey];

    if (store) {
      return store.getSelectors();
    }

    return parent && parent.select(reducerKey);
  }
  /**
   * Returns the available actions for a part of the state.
   *
   * @param {string} reducerKey Part of the state shape to dispatch the
   *                            action for.
   *
   * @return {*} The action's returned value.
   */


  function dispatch(reducerKey) {
    var store = stores[reducerKey];

    if (store) {
      return store.getActions();
    }

    return parent && parent.dispatch(reducerKey);
  } //
  // Deprecated
  // TODO: Remove this after `use()` is removed.
  //


  function withPlugins(attributes) {
    return mapValues(attributes, function (attribute, key) {
      if (typeof attribute !== 'function') {
        return attribute;
      }

      return function () {
        return registry[key].apply(null, arguments);
      };
    });
  }
  /**
   * Registers a generic store.
   *
   * @param {string} key    Store registry key.
   * @param {Object} config Configuration (getSelectors, getActions, subscribe).
   */


  function registerGenericStore(key, config) {
    if (typeof config.getSelectors !== 'function') {
      throw new TypeError('config.getSelectors must be a function');
    }

    if (typeof config.getActions !== 'function') {
      throw new TypeError('config.getActions must be a function');
    }

    if (typeof config.subscribe !== 'function') {
      throw new TypeError('config.subscribe must be a function');
    }

    stores[key] = config;
    config.subscribe(globalListener);
  }

  var registry = {
    registerGenericStore: registerGenericStore,
    stores: stores,
    namespaces: stores,
    // TODO: Deprecate/remove this.
    subscribe: subscribe,
    select: select,
    dispatch: dispatch,
    use: use
  };
  /**
   * Registers a standard `@wordpress/data` store.
   *
   * @param {string} reducerKey Reducer key.
   * @param {Object} options    Store description (reducer, actions, selectors, resolvers).
   *
   * @return {Object} Registered store object.
   */

  registry.registerStore = function (reducerKey, options) {
    if (!options.reducer) {
      throw new TypeError('Must specify store reducer');
    }

    var namespace = createNamespace(reducerKey, options, registry);
    registerGenericStore(reducerKey, namespace);
    return namespace.store;
  }; //
  // TODO:
  // This function will be deprecated as soon as it is no longer internally referenced.
  //


  function use(plugin, options) {
    registry = _objectSpread({}, registry, plugin(registry, options));
    return registry;
  }

  registerGenericStore('core/data', createCoreDataStore(registry));
  Object.entries(storeConfigs).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        name = _ref2[0],
        config = _ref2[1];

    return registry.registerStore(name, config);
  });

  if (parent) {
    parent.subscribe(globalListener);
  }

  return withPlugins(registry);
}
//# sourceMappingURL=registry.js.map