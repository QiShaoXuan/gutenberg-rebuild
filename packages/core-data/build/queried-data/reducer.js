"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMergedItemIds = getMergedItemIds;
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _redux = require("redux");

var _lodash = require("lodash");

var _utils = require("../utils");

var _entities = require("../entities");

var _getQueryParts = _interopRequireDefault(require("./get-query-parts"));

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Returns a merged array of item IDs, given details of the received paginated
 * items. The array is sparse-like with `undefined` entries where holes exist.
 *
 * @param {?Array<number>} itemIds     Original item IDs (default empty array).
 * @param {number[]}       nextItemIds Item IDs to merge.
 * @param {number}         page        Page of items merged.
 * @param {number}         perPage     Number of items per page.
 *
 * @return {number[]} Merged array of item IDs.
 */
function getMergedItemIds(itemIds, nextItemIds, page, perPage) {
  var nextItemIdsStartIndex = (page - 1) * perPage; // If later page has already been received, default to the larger known
  // size of the existing array, else calculate as extending the existing.

  var size = Math.max(itemIds.length, nextItemIdsStartIndex + nextItemIds.length); // Preallocate array since size is known.

  var mergedItemIds = new Array(size);

  for (var i = 0; i < size; i++) {
    // Preserve existing item ID except for subset of range of next items.
    var isInNextItemsRange = i >= nextItemIdsStartIndex && i < nextItemIdsStartIndex + nextItemIds.length;
    mergedItemIds[i] = isInNextItemsRange ? nextItemIds[i - nextItemIdsStartIndex] : itemIds[i];
  }

  return mergedItemIds;
}
/**
 * Reducer tracking items state, keyed by ID. Items are assumed to be normal,
 * where identifiers are common across all queries.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Next state.
 */


function items() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RECEIVE_ITEMS':
      return (0, _objectSpread2.default)({}, state, (0, _lodash.keyBy)(action.items, action.key || _entities.DEFAULT_ENTITY_KEY));
  }

  return state;
}
/**
 * Reducer tracking queries state, keyed by stable query key. Each reducer
 * query object includes `itemIds` and `requestingPageByPerPage`.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Next state.
 */


var queries = (0, _lodash.flowRight)([// Limit to matching action type so we don't attempt to replace action on
// an unhandled action.
(0, _utils.ifMatchingAction)(function (action) {
  return 'query' in action;
}), // Inject query parts into action for use both in `onSubKey` and reducer.
(0, _utils.replaceAction)(function (action) {
  // `ifMatchingAction` still passes on initialization, where state is
  // undefined and a query is not assigned. Avoid attempting to parse
  // parts. `onSubKey` will omit by lack of `stableKey`.
  if (action.query) {
    return (0, _objectSpread2.default)({}, action, (0, _getQueryParts.default)(action.query));
  }

  return action;
}), // Queries shape is shared, but keyed by query `stableKey` part. Original
// reducer tracks only a single query object.
(0, _utils.onSubKey)('stableKey')])(function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      page = action.page,
      perPage = action.perPage,
      _action$key = action.key,
      key = _action$key === void 0 ? _entities.DEFAULT_ENTITY_KEY : _action$key;

  if (type !== 'RECEIVE_ITEMS') {
    return state;
  }

  return getMergedItemIds(state || [], (0, _lodash.map)(action.items, key), page, perPage);
});

var _default = (0, _redux.combineReducers)({
  items: items,
  queries: queries
});

exports.default = _default;
//# sourceMappingURL=reducer.js.map