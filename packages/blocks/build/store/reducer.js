"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockTypes = blockTypes;
exports.blockStyles = blockStyles;
exports.createBlockNameSetterReducer = createBlockNameSetterReducer;
exports.categories = categories;
exports.default = exports.unregisteredFallbackBlockName = exports.freeformFallbackBlockName = exports.defaultBlockName = exports.DEFAULT_CATEGORIES = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Module Constants
 */
var DEFAULT_CATEGORIES = [{
  slug: 'common',
  title: (0, _i18n.__)('Common Blocks')
}, {
  slug: 'formatting',
  title: (0, _i18n.__)('Formatting')
}, {
  slug: 'layout',
  title: (0, _i18n.__)('Layout Elements')
}, {
  slug: 'widgets',
  title: (0, _i18n.__)('Widgets')
}, {
  slug: 'embed',
  title: (0, _i18n.__)('Embeds')
}, {
  slug: 'reusable',
  title: (0, _i18n.__)('Reusable Blocks')
}];
/**
 * Reducer managing the block types
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

exports.DEFAULT_CATEGORIES = DEFAULT_CATEGORIES;

function blockTypes() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_BLOCK_TYPES':
      return (0, _objectSpread4.default)({}, state, (0, _lodash.keyBy)((0, _lodash.map)(action.blockTypes, function (blockType) {
        return (0, _lodash.omit)(blockType, 'styles ');
      }), 'name'));

    case 'REMOVE_BLOCK_TYPES':
      return (0, _lodash.omit)(state, action.names);
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


function blockStyles() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_BLOCK_TYPES':
      return (0, _objectSpread4.default)({}, state, (0, _lodash.mapValues)((0, _lodash.keyBy)(action.blockTypes, 'name'), function (blockType) {
        return (0, _lodash.uniqBy)([].concat((0, _toConsumableArray2.default)((0, _lodash.get)(blockType, ['styles'], [])), (0, _toConsumableArray2.default)((0, _lodash.get)(state, [blockType.name], []))), function (style) {
          return style.name;
        });
      }));

    case 'ADD_BLOCK_STYLES':
      return (0, _objectSpread4.default)({}, state, (0, _defineProperty2.default)({}, action.blockName, (0, _lodash.uniqBy)([].concat((0, _toConsumableArray2.default)((0, _lodash.get)(state, [action.blockName], [])), (0, _toConsumableArray2.default)(action.styles)), function (style) {
        return style.name;
      })));

    case 'REMOVE_BLOCK_STYLES':
      return (0, _objectSpread4.default)({}, state, (0, _defineProperty2.default)({}, action.blockName, (0, _lodash.filter)((0, _lodash.get)(state, [action.blockName], []), function (style) {
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


function createBlockNameSetterReducer(setActionType) {
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

var defaultBlockName = createBlockNameSetterReducer('SET_DEFAULT_BLOCK_NAME');
exports.defaultBlockName = defaultBlockName;
var freeformFallbackBlockName = createBlockNameSetterReducer('SET_FREEFORM_FALLBACK_BLOCK_NAME');
exports.freeformFallbackBlockName = freeformFallbackBlockName;
var unregisteredFallbackBlockName = createBlockNameSetterReducer('SET_UNREGISTERED_FALLBACK_BLOCK_NAME');
/**
 * Reducer managing the categories
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */

exports.unregisteredFallbackBlockName = unregisteredFallbackBlockName;

function categories() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_CATEGORIES;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_CATEGORIES':
      return action.categories || [];

    case 'UPDATE_CATEGORY':
      {
        if (!action.category || (0, _lodash.isEmpty)(action.category)) {
          return state;
        }

        var categoryToChange = (0, _lodash.find)(state, ['slug', action.slug]);

        if (categoryToChange) {
          return (0, _lodash.map)(state, function (category) {
            if (category.slug === action.slug) {
              return (0, _objectSpread4.default)({}, category, action.category);
            }

            return category;
          });
        }
      }
  }

  return state;
}

var _default = (0, _data.combineReducers)({
  blockTypes: blockTypes,
  blockStyles: blockStyles,
  defaultBlockName: defaultBlockName,
  freeformFallbackBlockName: freeformFallbackBlockName,
  unregisteredFallbackBlockName: unregisteredFallbackBlockName,
  categories: categories
});

exports.default = _default;
//# sourceMappingURL=reducer.js.map