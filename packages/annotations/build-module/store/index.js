/**
 * WordPress dependencies
 */
import { registerStore } from '@wordpress/data';
/**
 * Internal dependencies
 */

import reducer from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';
/**
 * Module Constants
 */

var MODULE_KEY = 'core/annotations';
var store = registerStore(MODULE_KEY, {
  reducer: reducer,
  selectors: selectors,
  actions: actions
});
export default store;
//# sourceMappingURL=index.js.map