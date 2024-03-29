import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

/**
 * External dependencies
 */
import { createStore, applyMiddleware } from 'redux';
import { flowRight, get, mapValues } from 'lodash';
import combineReducers from 'turbo-combine-reducers';
/**
 * WordPress dependencies
 */

import createReduxRoutineMiddleware from '@wordpress/redux-routine';
/**
 * Internal dependencies
 */

import promise from '../promise-middleware';
import createResolversCacheMiddleware from '../resolvers-cache-middleware';
import metadataReducer from './metadata/reducer';
import * as metadataSelectors from './metadata/selectors';
import * as metadataActions from './metadata/actions';
/**
 * Creates a namespace object with a store derived from the reducer given.
 *
 * @param {string} key              Identifying string used for namespace and redex dev tools.
 * @param {Object} options          Contains reducer, actions, selectors, and resolvers.
 * @param {Object} registry         Registry reference.
 *
 * @return {Object} Store Object.
 */

export default function createNamespace(key, options, registry) {
  var reducer = options.reducer;
  var store = createReduxStore(key, options, registry);
  var resolvers;
  var actions = mapActions(_objectSpread({}, metadataActions, options.actions), store);
  var selectors = mapSelectors(_objectSpread({}, mapValues(metadataSelectors, function (selector) {
    return function (state) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return selector.apply(void 0, [state.metadata].concat(args));
    };
  }), mapValues(options.selectors, function (selector) {
    if (selector.isRegistrySelector) {
      var mappedSelector = function mappedSelector(reg) {
        return function (state) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          return selector(reg).apply(void 0, [state.root].concat(args));
        };
      };

      mappedSelector.isRegistrySelector = selector.isRegistrySelector;
      return mappedSelector;
    }

    return function (state) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return selector.apply(void 0, [state.root].concat(args));
    };
  })), store, registry);

  if (options.resolvers) {
    var result = mapResolvers(options.resolvers, selectors, store);
    resolvers = result.resolvers;
    selectors = result.selectors;
  }

  var getSelectors = function getSelectors() {
    return selectors;
  };

  var getActions = function getActions() {
    return actions;
  }; // We have some modules monkey-patching the store object
  // It's wrong to do so but until we refactor all of our effects to controls
  // We need to keep the same "store" instance here.


  store.__unstableOriginalGetState = store.getState;

  store.getState = function () {
    return store.__unstableOriginalGetState().root;
  }; // Customize subscribe behavior to call listeners only on effective change,
  // not on every dispatch.


  var subscribe = store && function (listener) {
    var lastState = store.__unstableOriginalGetState();

    store.subscribe(function () {
      var state = store.__unstableOriginalGetState();

      var hasChanged = state !== lastState;
      lastState = state;

      if (hasChanged) {
        listener();
      }
    });
  }; // This can be simplified to just { subscribe, getSelectors, getActions }
  // Once we remove the use function.


  return {
    reducer: reducer,
    store: store,
    actions: actions,
    selectors: selectors,
    resolvers: resolvers,
    getSelectors: getSelectors,
    getActions: getActions,
    subscribe: subscribe
  };
}
/**
 * Creates a redux store for a namespace.
 *
 * @param {string} key      Part of the state shape to register the
 *                          selectors for.
 * @param {Object} options  Registered store options.
 * @param {Object} registry Registry reference, for resolver enhancer support.
 *
 * @return {Object} Newly created redux store.
 */

function createReduxStore(key, options, registry) {
  var middlewares = [createResolversCacheMiddleware(registry, key), promise];

  if (options.controls) {
    var normalizedControls = mapValues(options.controls, function (control) {
      return control.isRegistryControl ? control(registry) : control;
    });
    middlewares.push(createReduxRoutineMiddleware(normalizedControls));
  }

  var enhancers = [applyMiddleware.apply(void 0, middlewares)];

  if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__({
      name: key,
      instanceId: key
    }));
  }

  var reducer = options.reducer,
      initialState = options.initialState;
  var enhancedReducer = combineReducers({
    metadata: metadataReducer,
    root: reducer
  });
  return createStore(enhancedReducer, {
    root: initialState
  }, flowRight(enhancers));
}
/**
 * Maps selectors to a redux store.
 *
 * @param {Object} selectors  Selectors to register. Keys will be used as the
 *                            public facing API. Selectors will get passed the
 *                            state as first argument.
 * @param {Object} store      The redux store to which the selectors should be mapped.
 * @param {Object} registry   Registry reference.
 *
 * @return {Object}           Selectors mapped to the redux store provided.
 */


function mapSelectors(selectors, store, registry) {
  var createStateSelector = function createStateSelector(registeredSelector) {
    var selector = registeredSelector.isRegistrySelector ? registeredSelector(registry.select) : registeredSelector;
    return function runSelector() {
      // This function is an optimized implementation of:
      //
      //   selector( store.getState(), ...arguments )
      //
      // Where the above would incur an `Array#concat` in its application,
      // the logic here instead efficiently constructs an arguments array via
      // direct assignment.
      var argsLength = arguments.length;
      var args = new Array(argsLength + 1);
      args[0] = store.__unstableOriginalGetState();

      for (var i = 0; i < argsLength; i++) {
        args[i + 1] = arguments[i];
      }

      return selector.apply(void 0, args);
    };
  };

  return mapValues(selectors, createStateSelector);
}
/**
 * Maps actions to dispatch from a given store.
 *
 * @param {Object} actions    Actions to register.
 * @param {Object} store      The redux store to which the actions should be mapped.
 * @return {Object}           Actions mapped to the redux store provided.
 */


function mapActions(actions, store) {
  var createBoundAction = function createBoundAction(action) {
    return function () {
      return store.dispatch(action.apply(void 0, arguments));
    };
  };

  return mapValues(actions, createBoundAction);
}
/**
 * Returns resolvers with matched selectors for a given namespace.
 * Resolvers are side effects invoked once per argument set of a given selector call,
 * used in ensuring that the data needs for the selector are satisfied.
 *
 * @param {Object} resolvers   Resolvers to register.
 * @param {Object} selectors   The current selectors to be modified.
 * @param {Object} store       The redux store to which the resolvers should be mapped.
 * @return {Object}            An object containing updated selectors and resolvers.
 */


function mapResolvers(resolvers, selectors, store) {
  var mappedResolvers = mapValues(resolvers, function (resolver) {
    var _resolver$fulfill = resolver.fulfill,
        resolverFulfill = _resolver$fulfill === void 0 ? resolver : _resolver$fulfill;
    return _objectSpread({}, resolver, {
      fulfill: resolverFulfill
    });
  });

  var mapSelector = function mapSelector(selector, selectorName) {
    var resolver = resolvers[selectorName];

    if (!resolver) {
      return selector;
    }

    return function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      function fulfillSelector() {
        return _fulfillSelector.apply(this, arguments);
      }

      function _fulfillSelector() {
        _fulfillSelector = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee() {
          var state, _store$__unstableOrig, metadata;

          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  state = store.getState();

                  if (!(typeof resolver.isFulfilled === 'function' && resolver.isFulfilled.apply(resolver, [state].concat(args)))) {
                    _context.next = 3;
                    break;
                  }

                  return _context.abrupt("return");

                case 3:
                  _store$__unstableOrig = store.__unstableOriginalGetState(), metadata = _store$__unstableOrig.metadata;

                  if (!metadataSelectors.hasStartedResolution(metadata, selectorName, args)) {
                    _context.next = 6;
                    break;
                  }

                  return _context.abrupt("return");

                case 6:
                  store.dispatch(metadataActions.startResolution(selectorName, args));
                  _context.next = 9;
                  return fulfillResolver.apply(void 0, [store, mappedResolvers, selectorName].concat(args));

                case 9:
                  store.dispatch(metadataActions.finishResolution(selectorName, args));

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
        return _fulfillSelector.apply(this, arguments);
      }

      fulfillSelector.apply(void 0, args);
      return selector.apply(void 0, args);
    };
  };

  return {
    resolvers: mappedResolvers,
    selectors: mapValues(selectors, mapSelector)
  };
}
/**
 * Calls a resolver given arguments
 *
 * @param {Object} store        Store reference, for fulfilling via resolvers
 * @param {Object} resolvers    Store Resolvers
 * @param {string} selectorName Selector name to fulfill.
 * @param {Array} args          Selector Arguments.
 */


function fulfillResolver(_x, _x2, _x3) {
  return _fulfillResolver.apply(this, arguments);
}

function _fulfillResolver() {
  _fulfillResolver = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(store, resolvers, selectorName) {
    var resolver,
        _len5,
        args,
        _key5,
        action,
        _args2 = arguments;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            resolver = get(resolvers, [selectorName]);

            if (resolver) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return");

          case 3:
            for (_len5 = _args2.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
              args[_key5 - 3] = _args2[_key5];
            }

            action = resolver.fulfill.apply(resolver, args);

            if (!action) {
              _context2.next = 8;
              break;
            }

            _context2.next = 8;
            return store.dispatch(action);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _fulfillResolver.apply(this, arguments);
}
//# sourceMappingURL=index.js.map