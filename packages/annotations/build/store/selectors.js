"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__experimentalGetAnnotations = __experimentalGetAnnotations;
exports.__experimentalGetAnnotationsForRichText = exports.__experimentalGetAllAnnotationsForBlock = exports.__experimentalGetAnnotationsForBlock = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _rememo = _interopRequireDefault(require("rememo"));

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation, as in a connected or
 * other pure component which performs `shouldComponentUpdate` check on props.
 * This should be used as a last resort, since the normalized data should be
 * maintained by the reducer result in state.
 *
 * @type {Array}
 */
var EMPTY_ARRAY = [];
/**
 * Returns the annotations for a specific client ID.
 *
 * @param {Object} state Editor state.
 * @param {string} clientId The ID of the block to get the annotations for.
 *
 * @return {Array} The annotations applicable to this block.
 */

var __experimentalGetAnnotationsForBlock = (0, _rememo.default)(function (state, blockClientId) {
  return (0, _lodash.get)(state, blockClientId, []).filter(function (annotation) {
    return annotation.selector === 'block';
  });
}, function (state, blockClientId) {
  return [(0, _lodash.get)(state, blockClientId, EMPTY_ARRAY)];
});

exports.__experimentalGetAnnotationsForBlock = __experimentalGetAnnotationsForBlock;

var __experimentalGetAllAnnotationsForBlock = function __experimentalGetAllAnnotationsForBlock(state, blockClientId) {
  return (0, _lodash.get)(state, blockClientId, EMPTY_ARRAY);
};
/**
 * Returns the annotations that apply to the given RichText instance.
 *
 * Both a blockClientId and a richTextIdentifier are required. This is because
 * a block might have multiple `RichText` components. This does mean that every
 * block needs to implement annotations itself.
 *
 * @param {Object} state              Editor state.
 * @param {string} blockClientId      The client ID for the block.
 * @param {string} richTextIdentifier Unique identifier that identifies the given RichText.
 * @return {Array} All the annotations relevant for the `RichText`.
 */


exports.__experimentalGetAllAnnotationsForBlock = __experimentalGetAllAnnotationsForBlock;

var __experimentalGetAnnotationsForRichText = (0, _rememo.default)(function (state, blockClientId, richTextIdentifier) {
  return (0, _lodash.get)(state, blockClientId, []).filter(function (annotation) {
    return annotation.selector === 'range' && richTextIdentifier === annotation.richTextIdentifier;
  }).map(function (annotation) {
    var range = annotation.range,
        other = (0, _objectWithoutProperties2.default)(annotation, ["range"]);
    return (0, _objectSpread2.default)({}, range, other);
  });
}, function (state, blockClientId) {
  return [(0, _lodash.get)(state, blockClientId, EMPTY_ARRAY)];
});
/**
 * Returns all annotations in the editor state.
 *
 * @param {Object} state Editor state.
 * @return {Array} All annotations currently applied.
 */


exports.__experimentalGetAnnotationsForRichText = __experimentalGetAnnotationsForRichText;

function __experimentalGetAnnotations(state) {
  return (0, _lodash.flatMap)(state, function (annotations) {
    return annotations;
  });
}
//# sourceMappingURL=selectors.js.map