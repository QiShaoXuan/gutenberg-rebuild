"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBlock = createBlock;
exports.cloneBlock = cloneBlock;
exports.getPossibleBlockTransformations = getPossibleBlockTransformations;
exports.findTransform = findTransform;
exports.getBlockTransforms = getBlockTransforms;
exports.switchToBlockType = switchToBlockType;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _lodash = require("lodash");

var _hooks = require("@wordpress/hooks");

var _registration = require("./registration");

var _utils = require("./utils");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Returns a block object given its type and attributes.
 *
 * @param {string} name        Block name.
 * @param {Object} attributes  Block attributes.
 * @param {?Array} innerBlocks Nested blocks.
 *
 * @return {Object} Block object.
 */
function createBlock(name) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var innerBlocks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  // Get the type definition associated with a registered block.
  var blockType = (0, _registration.getBlockType)(name); // Ensure attributes contains only values defined by block type, and merge
  // default values for missing attributes.

  var sanitizedAttributes = (0, _lodash.reduce)(blockType.attributes, function (result, schema, key) {
    var value = attributes[key];

    if (undefined !== value) {
      result[key] = value;
    } else if (schema.hasOwnProperty('default')) {
      result[key] = schema.default;
    }

    if (['node', 'children'].indexOf(schema.source) !== -1) {
      // Ensure value passed is always an array, which we're expecting in
      // the RichText component to handle the deprecated value.
      if (typeof result[key] === 'string') {
        result[key] = [result[key]];
      } else if (!Array.isArray(result[key])) {
        result[key] = [];
      }
    }

    return result;
  }, {});
  var clientId = (0, _v.default)(); // Blocks are stored with a unique ID, the assigned type name, the block
  // attributes, and their inner blocks.

  return {
    clientId: clientId,
    name: name,
    isValid: true,
    attributes: sanitizedAttributes,
    innerBlocks: innerBlocks
  };
}
/**
 * Given a block object, returns a copy of the block object, optionally merging
 * new attributes and/or replacing its inner blocks.
 *
 * @param {Object} block              Block instance.
 * @param {Object} mergeAttributes    Block attributes.
 * @param {?Array} newInnerBlocks     Nested blocks.
 *
 * @return {Object} A cloned block.
 */


function cloneBlock(block) {
  var mergeAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var newInnerBlocks = arguments.length > 2 ? arguments[2] : undefined;
  var clientId = (0, _v.default)();
  return (0, _objectSpread2.default)({}, block, {
    clientId: clientId,
    attributes: (0, _objectSpread2.default)({}, block.attributes, mergeAttributes),
    innerBlocks: newInnerBlocks || block.innerBlocks.map(function (innerBlock) {
      return cloneBlock(innerBlock);
    })
  });
}
/**
 * Returns a boolean indicating whether a transform is possible based on
 * various bits of context.
 *
 * @param {Object} transform The transform object to validate.
 * @param {string} direction Is this a 'from' or 'to' transform.
 * @param {Array} blocks The blocks to transform from.
 *
 * @return {boolean} Is the transform possible?
 */


var isPossibleTransformForSource = function isPossibleTransformForSource(transform, direction, blocks) {
  if ((0, _lodash.isEmpty)(blocks)) {
    return false;
  } // If multiple blocks are selected, only multi block transforms are allowed.


  var isMultiBlock = blocks.length > 1;
  var isValidForMultiBlocks = !isMultiBlock || transform.isMultiBlock;

  if (!isValidForMultiBlocks) {
    return false;
  } // Only consider 'block' type transforms as valid.


  var isBlockType = transform.type === 'block';

  if (!isBlockType) {
    return false;
  } // Check if the transform's block name matches the source block only if this is a transform 'from'.


  var sourceBlock = (0, _lodash.first)(blocks);
  var hasMatchingName = direction !== 'from' || transform.blocks.indexOf(sourceBlock.name) !== -1;

  if (!hasMatchingName) {
    return false;
  } // If the transform has a `isMatch` function specified, check that it returns true.


  if ((0, _lodash.isFunction)(transform.isMatch)) {
    var attributes = transform.isMultiBlock ? blocks.map(function (block) {
      return block.attributes;
    }) : sourceBlock.attributes;

    if (!transform.isMatch(attributes)) {
      return false;
    }
  }

  return true;
};
/**
 * Returns block types that the 'blocks' can be transformed into, based on
 * 'from' transforms on other blocks.
 *
 * @param {Array}  blocks  The blocks to transform from.
 *
 * @return {Array} Block types that the blocks can be transformed into.
 */


var getBlockTypesForPossibleFromTransforms = function getBlockTypesForPossibleFromTransforms(blocks) {
  if ((0, _lodash.isEmpty)(blocks)) {
    return [];
  }

  var allBlockTypes = (0, _registration.getBlockTypes)(); // filter all blocks to find those with a 'from' transform.

  var blockTypesWithPossibleFromTransforms = (0, _lodash.filter)(allBlockTypes, function (blockType) {
    var fromTransforms = getBlockTransforms('from', blockType.name);
    return !!findTransform(fromTransforms, function (transform) {
      return isPossibleTransformForSource(transform, 'from', blocks);
    });
  });
  return blockTypesWithPossibleFromTransforms;
};
/**
 * Returns block types that the 'blocks' can be transformed into, based on
 * the source block's own 'to' transforms.
 *
 * @param {Array} blocks The blocks to transform from.
 *
 * @return {Array} Block types that the source can be transformed into.
 */


var getBlockTypesForPossibleToTransforms = function getBlockTypesForPossibleToTransforms(blocks) {
  if ((0, _lodash.isEmpty)(blocks)) {
    return [];
  }

  var sourceBlock = (0, _lodash.first)(blocks);
  var blockType = (0, _registration.getBlockType)(sourceBlock.name);
  var transformsTo = getBlockTransforms('to', blockType.name); // filter all 'to' transforms to find those that are possible.

  var possibleTransforms = (0, _lodash.filter)(transformsTo, function (transform) {
    return isPossibleTransformForSource(transform, 'to', blocks);
  }); // Build a list of block names using the possible 'to' transforms.

  var blockNames = (0, _lodash.flatMap)(possibleTransforms, function (transformation) {
    return transformation.blocks;
  }); // Map block names to block types.

  return blockNames.map(function (name) {
    return (0, _registration.getBlockType)(name);
  });
};
/**
 * Returns an array of block types that the set of blocks received as argument
 * can be transformed into.
 *
 * @param {Array} blocks Blocks array.
 *
 * @return {Array} Block types that the blocks argument can be transformed to.
 */


function getPossibleBlockTransformations(blocks) {
  if ((0, _lodash.isEmpty)(blocks)) {
    return [];
  }

  var sourceBlock = (0, _lodash.first)(blocks);
  var isMultiBlock = blocks.length > 1;

  if (isMultiBlock && !(0, _lodash.every)(blocks, {
    name: sourceBlock.name
  })) {
    return [];
  }

  var blockTypesForFromTransforms = getBlockTypesForPossibleFromTransforms(blocks);
  var blockTypesForToTransforms = getBlockTypesForPossibleToTransforms(blocks);
  return (0, _lodash.uniq)([].concat((0, _toConsumableArray2.default)(blockTypesForFromTransforms), (0, _toConsumableArray2.default)(blockTypesForToTransforms)));
}
/**
 * Given an array of transforms, returns the highest-priority transform where
 * the predicate function returns a truthy value. A higher-priority transform
 * is one with a lower priority value (i.e. first in priority order). Returns
 * null if the transforms set is empty or the predicate function returns a
 * falsey value for all entries.
 *
 * @param {Object[]} transforms Transforms to search.
 * @param {Function} predicate  Function returning true on matching transform.
 *
 * @return {?Object} Highest-priority transform candidate.
 */


function findTransform(transforms, predicate) {
  // The hooks library already has built-in mechanisms for managing priority
  // queue, so leverage via locally-defined instance.
  var hooks = (0, _hooks.createHooks)();

  var _loop = function _loop(i) {
    var candidate = transforms[i];

    if (predicate(candidate)) {
      hooks.addFilter('transform', 'transform/' + i.toString(), function (result) {
        return result ? result : candidate;
      }, candidate.priority);
    }
  };

  for (var i = 0; i < transforms.length; i++) {
    _loop(i);
  } // Filter name is arbitrarily chosen but consistent with above aggregation.


  return hooks.applyFilters('transform', null);
}
/**
 * Returns normal block transforms for a given transform direction, optionally
 * for a specific block by name, or an empty array if there are no transforms.
 * If no block name is provided, returns transforms for all blocks. A normal
 * transform object includes `blockName` as a property.
 *
 * @param {string}  direction Transform direction ("to", "from").
 * @param {string|Object} blockTypeOrName  Block type or name.
 *
 * @return {Array} Block transforms for direction.
 */


function getBlockTransforms(direction, blockTypeOrName) {
  // When retrieving transforms for all block types, recurse into self.
  if (blockTypeOrName === undefined) {
    return (0, _lodash.flatMap)((0, _registration.getBlockTypes)(), function (_ref) {
      var name = _ref.name;
      return getBlockTransforms(direction, name);
    });
  } // Validate that block type exists and has array of direction.


  var blockType = (0, _utils.normalizeBlockType)(blockTypeOrName);

  var _ref2 = blockType || {},
      blockName = _ref2.name,
      transforms = _ref2.transforms;

  if (!transforms || !Array.isArray(transforms[direction])) {
    return [];
  } // Map transforms to normal form.


  return transforms[direction].map(function (transform) {
    return (0, _objectSpread2.default)({}, transform, {
      blockName: blockName
    });
  });
}
/**
 * Switch one or more blocks into one or more blocks of the new block type.
 *
 * @param {Array|Object} blocks Blocks array or block object.
 * @param {string}       name   Block name.
 *
 * @return {Array} Array of blocks.
 */


function switchToBlockType(blocks, name) {
  var blocksArray = (0, _lodash.castArray)(blocks);
  var isMultiBlock = blocksArray.length > 1;
  var firstBlock = blocksArray[0];
  var sourceName = firstBlock.name;

  if (isMultiBlock && !(0, _lodash.every)(blocksArray, function (block) {
    return block.name === sourceName;
  })) {
    return null;
  } // Find the right transformation by giving priority to the "to"
  // transformation.


  var transformationsFrom = getBlockTransforms('from', name);
  var transformationsTo = getBlockTransforms('to', sourceName);
  var transformation = findTransform(transformationsTo, function (t) {
    return t.type === 'block' && t.blocks.indexOf(name) !== -1 && (!isMultiBlock || t.isMultiBlock);
  }) || findTransform(transformationsFrom, function (t) {
    return t.type === 'block' && t.blocks.indexOf(sourceName) !== -1 && (!isMultiBlock || t.isMultiBlock);
  }); // Stop if there is no valid transformation.

  if (!transformation) {
    return null;
  }

  var transformationResults;

  if (transformation.isMultiBlock) {
    transformationResults = transformation.transform(blocksArray.map(function (currentBlock) {
      return currentBlock.attributes;
    }), blocksArray.map(function (currentBlock) {
      return currentBlock.innerBlocks;
    }));
  } else {
    transformationResults = transformation.transform(firstBlock.attributes, firstBlock.innerBlocks);
  } // Ensure that the transformation function returned an object or an array
  // of objects.


  if (!(0, _lodash.isObjectLike)(transformationResults)) {
    return null;
  } // If the transformation function returned a single object, we want to work
  // with an array instead.


  transformationResults = (0, _lodash.castArray)(transformationResults); // Ensure that every block object returned by the transformation has a
  // valid block type.

  if (transformationResults.some(function (result) {
    return !(0, _registration.getBlockType)(result.name);
  })) {
    return null;
  }

  var firstSwitchedBlock = (0, _lodash.findIndex)(transformationResults, function (result) {
    return result.name === name;
  }); // Ensure that at least one block object returned by the transformation has
  // the expected "destination" block type.

  if (firstSwitchedBlock < 0) {
    return null;
  }

  return transformationResults.map(function (result, index) {
    var transformedBlock = (0, _objectSpread2.default)({}, result, {
      // The first transformed block whose type matches the "destination"
      // type gets to keep the existing client ID of the first block.
      clientId: index === firstSwitchedBlock ? firstBlock.clientId : result.clientId
    });
    /**
     * Filters an individual transform result from block transformation.
     * All of the original blocks are passed, since transformations are
     * many-to-many, not one-to-one.
     *
     * @param {Object}   transformedBlock The transformed block.
     * @param {Object[]} blocks           Original blocks transformed.
     */

    return (0, _hooks.applyFilters)('blocks.switchToBlockType.transformedBlock', transformedBlock, blocks);
  });
}
//# sourceMappingURL=factory.js.map