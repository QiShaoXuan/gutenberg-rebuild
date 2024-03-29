"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "combineReducers", {
  enumerable: true,
  get: function get() {
    return _turboCombineReducers.default;
  }
});
Object.defineProperty(exports, "withSelect", {
  enumerable: true,
  get: function get() {
    return _withSelect.default;
  }
});
Object.defineProperty(exports, "withDispatch", {
  enumerable: true,
  get: function get() {
    return _withDispatch.default;
  }
});
Object.defineProperty(exports, "withRegistry", {
  enumerable: true,
  get: function get() {
    return _withRegistry.default;
  }
});
Object.defineProperty(exports, "RegistryProvider", {
  enumerable: true,
  get: function get() {
    return _registryProvider.default;
  }
});
Object.defineProperty(exports, "RegistryConsumer", {
  enumerable: true,
  get: function get() {
    return _registryProvider.RegistryConsumer;
  }
});
Object.defineProperty(exports, "__experimentalAsyncModeProvider", {
  enumerable: true,
  get: function get() {
    return _asyncModeProvider.default;
  }
});
Object.defineProperty(exports, "createRegistry", {
  enumerable: true,
  get: function get() {
    return _registry.createRegistry;
  }
});
Object.defineProperty(exports, "createRegistrySelector", {
  enumerable: true,
  get: function get() {
    return _factory.createRegistrySelector;
  }
});
Object.defineProperty(exports, "createRegistryControl", {
  enumerable: true,
  get: function get() {
    return _factory.createRegistryControl;
  }
});
exports.plugins = exports.use = exports.registerStore = exports.registerGenericStore = exports.subscribe = exports.dispatch = exports.select = void 0;

var _turboCombineReducers = _interopRequireDefault(require("turbo-combine-reducers"));

var _defaultRegistry = _interopRequireDefault(require("./default-registry"));

var plugins = _interopRequireWildcard(require("./plugins"));

exports.plugins = plugins;

var _withSelect = _interopRequireDefault(require("./components/with-select"));

var _withDispatch = _interopRequireDefault(require("./components/with-dispatch"));

var _withRegistry = _interopRequireDefault(require("./components/with-registry"));

var _registryProvider = _interopRequireWildcard(require("./components/registry-provider"));

var _asyncModeProvider = _interopRequireDefault(require("./components/async-mode-provider"));

var _registry = require("./registry");

var _factory = require("./factory");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * The combineReducers helper function turns an object whose values are different
 * reducing functions into a single reducing function you can pass to registerReducer.
 *
 * @param {Object} reducers An object whose values correspond to different reducing
 *                          functions that need to be combined into one.
 *
 * @example
 * ```js
 * const { combineReducers, registerStore } = wp.data;
 *
 * const prices = ( state = {}, action ) => {
 * 	return action.type === 'SET_PRICE' ?
 * 		{
 * 			...state,
 * 			[ action.item ]: action.price,
 * 		} :
 * 		state;
 * };
 *
 * const discountPercent = ( state = 0, action ) => {
 * 	return action.type === 'START_SALE' ?
 * 		action.discountPercent :
 * 		state;
 * };
 *
 * registerStore( 'my-shop', {
 * 	reducer: combineReducers( {
 * 		prices,
 * 		discountPercent,
 * 	} ),
 * } );
 * ```
 *
 * @return {Function}       A reducer that invokes every reducer inside the reducers
 *                          object, and constructs a state object with the same shape.
 */

/**
 * Given the name of a registered store, returns an object of the store's selectors.
 * The selector functions are been pre-bound to pass the current state automatically.
 * As a consumer, you need only pass arguments of the selector, if applicable.
 *
 * @param {string} name Store name
 *
 * @example
 * ```js
 * const { select } = wp.data;
 *
 * select( 'my-shop' ).getPrice( 'hammer' );
 * ```
 *
 * @return {Object} Object containing the store's selectors.
 */
var select = _defaultRegistry.default.select;
/**
 * Given the name of a registered store, returns an object of the store's action creators.
 * Calling an action creator will cause it to be dispatched, updating the state value accordingly.
 *
 * @param {string} name Store name
 *
 * @example
 * ```js
 * const { dispatch } = wp.data;
 *
 * dispatch( 'my-shop' ).setPrice( 'hammer', 9.75 );
 * ```
 * @return {Object} Object containing the action creators.
 */

exports.select = select;
var dispatch = _defaultRegistry.default.dispatch;
/**
 * Given a listener function, the function will be called any time the state value
 * of one of the registered stores has changed. This function returns a `unsubscribe`
 * function used to stop the subscription.
 *
 * @param {Function} listener Callback function.
 *
 * @example
 * ```js
 * const { subscribe } = wp.data;
 *
 * const unsubscribe = subscribe( () => {
 * 	// You could use this opportunity to test whether the derived result of a
 * 	// selector has subsequently changed as the result of a state update.
 * } );
 *
 * // Later, if necessary...
 * unsubscribe();
 * ```
 */

exports.dispatch = dispatch;
var subscribe = _defaultRegistry.default.subscribe;
/**
* Registers a generic store.
*
* @param {string} key    Store registry key.
* @param {Object} config Configuration (getSelectors, getActions, subscribe).
*/

exports.subscribe = subscribe;
var registerGenericStore = _defaultRegistry.default.registerGenericStore;
/**
 * Registers a standard `@wordpress/data` store.
 *
 * @param {string} reducerKey Reducer key.
 * @param {Object} options    Store description (reducer, actions, selectors, resolvers).
 *
 * @return {Object} Registered store object.
 */

exports.registerGenericStore = registerGenericStore;
var registerStore = _defaultRegistry.default.registerStore;
exports.registerStore = registerStore;
var use = _defaultRegistry.default.use;
exports.use = use;
//# sourceMappingURL=index.js.map