/**
 * External dependencies
 */
import createSelector from 'rememo';
import { filter, get, includes, map, some, flow, deburr } from 'lodash';
/**
 * Given a block name or block type object, returns the corresponding
 * normalized block type object.
 *
 * @param {Object}          state      Blocks state.
 * @param {(string|Object)} nameOrType Block name or type object
 *
 * @return {Object} Block type object.
 */

var getNormalizedBlockType = function getNormalizedBlockType(state, nameOrType) {
  return 'string' === typeof nameOrType ? getBlockType(state, nameOrType) : nameOrType;
};
/**
 * Returns all the available block types.
 *
 * @param {Object} state Data state.
 *
 * @return {Array} Block Types.
 */


export var getBlockTypes = createSelector(function (state) {
  return Object.values(state.blockTypes);
}, function (state) {
  return [state.blockTypes];
});
/**
 * Returns a block type by name.
 *
 * @param {Object} state Data state.
 * @param {string} name Block type name.
 *
 * @return {Object?} Block Type.
 */

export function getBlockType(state, name) {
  return state.blockTypes[name];
}
/**
 * Returns block styles by block name.
 *
 * @param {Object} state Data state.
 * @param {string} name  Block type name.
 *
 * @return {Array?} Block Styles.
 */

export function getBlockStyles(state, name) {
  return state.blockStyles[name];
}
/**
 * Returns all the available categories.
 *
 * @param {Object} state Data state.
 *
 * @return {Array} Categories list.
 */

export function getCategories(state) {
  return state.categories;
}
/**
 * Returns the name of the default block name.
 *
 * @param {Object} state Data state.
 *
 * @return {string?} Default block name.
 */

export function getDefaultBlockName(state) {
  return state.defaultBlockName;
}
/**
 * Returns the name of the block for handling non-block content.
 *
 * @param {Object} state Data state.
 *
 * @return {string?} Name of the block for handling non-block content.
 */

export function getFreeformFallbackBlockName(state) {
  return state.freeformFallbackBlockName;
}
/**
 * Returns the name of the block for handling unregistered blocks.
 *
 * @param {Object} state Data state.
 *
 * @return {string?} Name of the block for handling unregistered blocks.
 */

export function getUnregisteredFallbackBlockName(state) {
  return state.unregisteredFallbackBlockName;
}
/**
 * Returns an array with the child blocks of a given block.
 *
 * @param {Object} state     Data state.
 * @param {string} blockName Block type name.
 *
 * @return {Array} Array of child block names.
 */

export var getChildBlockNames = createSelector(function (state, blockName) {
  return map(filter(state.blockTypes, function (blockType) {
    return includes(blockType.parent, blockName);
  }), function (_ref) {
    var name = _ref.name;
    return name;
  });
}, function (state) {
  return [state.blockTypes];
});
/**
 * Returns the block support value for a feature, if defined.
 *
 * @param  {Object}          state           Data state.
 * @param  {(string|Object)} nameOrType      Block name or type object
 * @param  {string}          feature         Feature to retrieve
 * @param  {*}               defaultSupports Default value to return if not
 *                                           explicitly defined
 *
 * @return {?*} Block support value
 */

export var getBlockSupport = function getBlockSupport(state, nameOrType, feature, defaultSupports) {
  var blockType = getNormalizedBlockType(state, nameOrType);
  return get(blockType, ['supports', feature], defaultSupports);
};
/**
 * Returns true if the block defines support for a feature, or false otherwise.
 *
 * @param  {Object}         state           Data state.
 * @param {(string|Object)} nameOrType      Block name or type object.
 * @param {string}          feature         Feature to test.
 * @param {boolean}         defaultSupports Whether feature is supported by
 *                                          default if not explicitly defined.
 *
 * @return {boolean} Whether block supports feature.
 */

export function hasBlockSupport(state, nameOrType, feature, defaultSupports) {
  return !!getBlockSupport(state, nameOrType, feature, defaultSupports);
}
/**
 * Returns true if the block type by the given name or object value matches a
 * search term, or false otherwise.
 *
 * @param {Object}          state      Blocks state.
 * @param {(string|Object)} nameOrType Block name or type object.
 * @param {string}          searchTerm Search term by which to filter.
 *
 * @return {Object[]} Wheter block type matches search term.
 */

export function isMatchingSearchTerm(state, nameOrType, searchTerm) {
  var blockType = getNormalizedBlockType(state, nameOrType);
  var getNormalizedSearchTerm = flow([// Disregard diacritics.
  //  Input: "média"
  deburr, // Lowercase.
  //  Input: "MEDIA"
  function (term) {
    return term.toLowerCase();
  }, // Strip leading and trailing whitespace.
  //  Input: " media "
  function (term) {
    return term.trim();
  }]);
  var normalizedSearchTerm = getNormalizedSearchTerm(searchTerm);
  var isSearchMatch = flow([getNormalizedSearchTerm, function (normalizedCandidate) {
    return includes(normalizedCandidate, normalizedSearchTerm);
  }]);
  return isSearchMatch(blockType.title) || some(blockType.keywords, isSearchMatch) || isSearchMatch(blockType.category);
}
/**
 * Returns a boolean indicating if a block has child blocks or not.
 *
 * @param {Object} state     Data state.
 * @param {string} blockName Block type name.
 *
 * @return {boolean} True if a block contains child blocks and false otherwise.
 */

export var hasChildBlocks = function hasChildBlocks(state, blockName) {
  return getChildBlockNames(state, blockName).length > 0;
};
/**
 * Returns a boolean indicating if a block has at least one child block with inserter support.
 *
 * @param {Object} state     Data state.
 * @param {string} blockName Block type name.
 *
 * @return {boolean} True if a block contains at least one child blocks with inserter support
 *                   and false otherwise.
 */

export var hasChildBlocksWithInserterSupport = function hasChildBlocksWithInserterSupport(state, blockName) {
  return some(getChildBlockNames(state, blockName), function (childBlockName) {
    return hasBlockSupport(state, childBlockName, 'inserter', true);
  });
};
//# sourceMappingURL=selectors.js.map