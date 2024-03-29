import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

/**
 * External dependencies
 */
import { filter, find, get, isEmpty, keyBy, map, mapValues, omit, uniqBy } from 'lodash';
/**
 * WordPress dependencies
 */

import { combineReducers } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
/**
 * Module Constants
 */

export var DEFAULT_CATEGORIES = [{
  slug: 'common',
  title: __('Common Blocks')
}, {
  slug: 'formatting',
  title: __('Formatting')
}, {
  slug: 'layout',
  title: __('Layout Elements')
}, {
  slug: 'widgets',
  title: __('Widgets')
}, {
  slug: 'embed',
  title: __('Embeds')
}, {
  slug: 'reusable',
  title: __('Reusable Blocks')
}];
/**
 * Reducer managing the block types
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function blockTypes() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_BLOCK_TYPES':
      return _objectSpread({}, state, keyBy(map(action.blockTypes, function (blockType) {
        return omit(blockType, 'styles ');
      }), 'name'));

    case 'REMOVE_BLOCK_TYPES':
      return omit(state, action.names);
  }

  return state;
}
/**
 * Reducer managing the block style variations.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function blockStyles() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_BLOCK_TYPES':
      return _objectSpread({}, state, mapValues(keyBy(action.blockTypes, 'name'), function (blockType) {
        return uniqBy([].concat(_toConsumableArray(get(blockType, ['styles'], [])), _toConsumableArray(get(state, [blockType.name], []))), function (style) {
          return style.name;
        });
      }));

    case 'ADD_BLOCK_STYLES':
      return _objectSpread({}, state, _defineProperty({}, action.blockName, uniqBy([].concat(_toConsumableArray(get(state, [action.blockName], [])), _toConsumableArray(action.styles)), function (style) {
        return style.name;
      })));

    case 'REMOVE_BLOCK_STYLES':
      return _objectSpread({}, state, _defineProperty({}, action.blockName, filter(get(state, [action.blockName], []), function (style) {
        return action.styleNames.indexOf(style.name) === -1;
      })));
  }

  return state;
}
/**
 * Higher-order Reducer creating a reducer keeping track of given block name.
 *
 * @param {string} setActionType  Action type.
 *
 * @return {function} Reducer.
 */

export function createBlockNameSetterReducer(setActionType) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case 'REMOVE_BLOCK_TYPES':
        if (action.names.indexOf(state) !== -1) {
          return null;
        }

        return state;

      case setActionType:
        return action.name || null;
    }

    return state;
  };
}
export var defaultBlockName = createBlockNameSetterReducer('SET_DEFAULT_BLOCK_NAME');
export var freeformFallbackBlockName = createBlockNameSetterReducer('SET_FREEFORM_FALLBACK_BLOCK_NAME');
export var unregisteredFallbackBlockName = createBlockNameSetterReducer('SET_UNREGISTERED_FALLBACK_BLOCK_NAME');
/**
 * Reducer managing the categories
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

export function categories() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_CATEGORIES;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_CATEGORIES':
      return action.categories || [];

    case 'UPDATE_CATEGORY':
      {
        if (!action.category || isEmpty(action.category)) {
          return state;
        }

        var categoryToChange = find(state, ['slug', action.slug]);

        if (categoryToChange) {
          return map(state, function (category) {
            if (category.slug === action.slug) {
              return _objectSpread({}, category, action.category);
            }

            return category;
          });
        }
      }
  }

  return state;
}
export default combineReducers({
  blockTypes: blockTypes,
  blockStyles: blockStyles,
  defaultBlockName: defaultBlockName,
  freeformFallbackBlockName: freeformFallbackBlockName,
  unregisteredFallbackBlockName: unregisteredFallbackBlockName,
  categories: categories
});
//# sourceMappingURL=reducer.js.map