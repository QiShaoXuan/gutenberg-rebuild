"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBlockType = getBlockType;
exports.getBlockStyles = getBlockStyles;
exports.getCategories = getCategories;
exports.getDefaultBlockName = getDefaultBlockName;
exports.getFreeformFallbackBlockName = getFreeformFallbackBlockName;
exports.getUnregisteredFallbackBlockName = getUnregisteredFallbackBlockName;
exports.hasBlockSupport = hasBlockSupport;
exports.isMatchingSearchTerm = isMatchingSearchTerm;
exports.hasChildBlocksWithInserterSupport = exports.hasChildBlocks = exports.getBlockSupport = exports.getChildBlockNames = exports.getBlockTypes = void 0;

var _rememo = _interopRequireDefault(require("rememo"));

var _lodash = require("lodash");

/**
 * External dependencies
 */

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


var getBlockTypes = (0, _rememo.default)(function (state) {
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

exports.getBlockTypes = getBlockTypes;

function getBlockType(state, name) {
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


function getBlockStyles(state, name) {
  return state.blockStyles[name];
}
/**
 * Returns all the available categories.
 *
 * @param {Object} state Data state.
 *
 * @return {Array} Categories list.
 */


function getCategories(state) {
  return state.categories;
}
/**
 * Returns the name of the default block name.
 *
 * @param {Object} state Data state.
 *
 * @return {string?} Default block name.
 */


function getDefaultBlockName(state) {
  return state.defaultBlockName;
}
/**
 * Returns the name of the block for handling non-block content.
 *
 * @param {Object} state Data state.
 *
 * @return {string?} Name of the block for handling non-block content.
 */


function getFreeformFallbackBlockName(state) {
  return state.freeformFallbackBlockName;
}
/**
 * Returns the name of the block for handling unregistered blocks.
 *
 * @param {Object} state Data state.
 *
 * @return {string?} Name of the block for handling unregistered blocks.
 */


function getUnregisteredFallbackBlockName(state) {
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


var getChildBlockNames = (0, _rememo.default)(function (state, blockName) {
  return (0, _lodash.map)((0, _lodash.filter)(state.blockTypes, function (blockType) {
    return (0, _lodash.includes)(blockType.parent, blockName);
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

exports.getChildBlockNames = getChildBlockNames;

var getBlockSupport = function getBlockSupport(state, nameOrType, feature, defaultSupports) {
  var blockType = getNormalizedBlockType(state, nameOrType);
  return (0, _lodash.get)(blockType, ['supports', feature], defaultSupports);
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


exports.getBlockSupport = getBlockSupport;

function hasBlockSupport(state, nameOrType, feature, defaultSupports) {
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


function isMatchingSearchTerm(state, nameOrType, searchTerm) {
  var blockType = getNormalizedBlockType(state, nameOrType);
  var getNormalizedSearchTerm = (0, _lodash.flow)([// Disregard diacritics.
  //  Input: "média"
  _lodash.deburr, // Lowercase.
  //  Input: "MEDIA"
  function (term) {
    return term.toLowerCase();
  }, // Strip leading and trailing whitespace.
  //  Input: " media "
  function (term) {
    return term.trim();
  }]);
  var normalizedSearchTerm = getNormalizedSearchTerm(searchTerm);
  var isSearchMatch = (0, _lodash.flow)([getNormalizedSearchTerm, function (normalizedCandidate) {
    return (0, _lodash.includes)(normalizedCandidate, normalizedSearchTerm);
  }]);
  return isSearchMatch(blockType.title) || (0, _lodash.some)(blockType.keywords, isSearchMatch) || isSearchMatch(blockType.category);
}
/**
 * Returns a boolean indicating if a block has child blocks or not.
 *
 * @param {Object} state     Data state.
 * @param {string} blockName Block type name.
 *
 * @return {boolean} True if a block contains child blocks and false otherwise.
 */


var hasChildBlocks = function hasChildBlocks(state, blockName) {
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


exports.hasChildBlocks = hasChildBlocks;

var hasChildBlocksWithInserterSupport = function hasChildBlocksWithInserterSupport(state, blockName) {
  return (0, _lodash.some)(getChildBlockNames(state, blockName), function (childBlockName) {
    return hasBlockSupport(state, childBlockName, 'inserter', true);
  });
};

exports.hasChildBlocksWithInserterSupport = hasChildBlocksWithInserterSupport;
//# sourceMappingURL=selectors.js.map