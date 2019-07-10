/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';
/**
 * Internal dependencies
 */

import reducer from './reducer';
import applyMiddlewares from './middlewares';
import * as actions from './actions';
import * as selectors from './selectors';
var store = registerStore('core/edit-post', {
  reducer: reducer,
  actions: actions,
  selectors: selectors,
  persist: ['preferences']
});
applyMiddlewares(store);
store.dispatch({
  type: 'INIT'
});
export default store;
//# sourceMappingURL=index.js.map