import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';
/**
 * Internal dependencies
 */

import reducer from './reducer';
import applyMiddlewares from './middlewares';
import * as selectors from './selectors';
import * as actions from './actions';
import controls from './controls';
/**
 * Module Constants
 */

var MODULE_KEY = 'core/block-editor';
export var storeConfig = {
  reducer: reducer,
  selectors: selectors,
  actions: actions,
  controls: controls
};
var store = registerStore(MODULE_KEY, _objectSpread({}, storeConfig, {
  persist: ['preferences']
}));
applyMiddlewares(store);
export default store;
//# sourceMappingURL=index.js.map