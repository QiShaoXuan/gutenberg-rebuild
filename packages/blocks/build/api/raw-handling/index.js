"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rawHandler = rawHandler;
Object.defineProperty(exports, "getPhrasingContentSchema", {
  enumerable: true,
  get: function get() {
    return _phrasingContent.getPhrasingContentSchema;
  }
});
Object.defineProperty(exports, "pasteHandler", {
  enumerable: true,
  get: function get() {
    return _pasteHandler.pasteHandler;
  }
});

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _factory = require("../factory");

var _parser = require("../parser");

var _normaliseBlocks = _interopRequireDefault(require("./normalise-blocks"));

var _specialCommentConverter = _interopRequireDefault(require("./special-comment-converter"));

var _listReducer = _interopRequireDefault(require("./list-reducer"));

var _blockquoteNormaliser = _interopRequireDefault(require("./blockquote-normaliser"));

var _figureContentReducer = _interopRequireDefault(require("./figure-content-reducer"));

var _shortcodeConverter = _interopRequireDefault(require("./shortcode-converter"));

var _utils = require("./utils");

var _phrasingContent = require("./phrasing-content");

var _pasteHandler = require("./paste-handler");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
function getRawTransformations() {
  return (0, _lodash.filter)((0, _factory.getBlockTransforms)('from'), {
    type: 'raw'
  }).map(function (transform) {
    return transform.isMatch ? transform : (0, _objectSpread2.default)({}, transform, {
      isMatch: function isMatch(node) {
        return transform.selector && node.matches(transform.selector);
      }
    });
  });
}
/**
 * Converts HTML directly to blocks. Looks for a matching transform for each
 * top-level tag. The HTML should be filtered to not have any text between
 * top-level tags and formatted in a way that blocks can handle the HTML.
 *
 * @param  {Object} $1               Named parameters.
 * @param  {string} $1.html          HTML to convert.
 * @param  {Array}  $1.rawTransforms Transforms that can be used.
 *
 * @return {Array} An array of blocks.
 */


function htmlToBlocks(_ref) {
  var html = _ref.html,
      rawTransforms = _ref.rawTransforms;
  var doc = document.implementation.createHTMLDocument('');
  doc.body.innerHTML = html;
  return Array.from(doc.body.children).map(function (node) {
    var rawTransform = (0, _factory.findTransform)(rawTransforms, function (_ref2) {
      var isMatch = _ref2.isMatch;
      return isMatch(node);
    });

    if (!rawTransform) {
      return (0, _factory.createBlock)( // Should not be hardcoded.
      'core/html', (0, _parser.getBlockAttributes)('core/html', node.outerHTML));
    }

    var transform = rawTransform.transform,
        blockName = rawTransform.blockName;

    if (transform) {
      return transform(node);
    }

    return (0, _factory.createBlock)(blockName, (0, _parser.getBlockAttributes)(blockName, node.outerHTML));
  });
}
/**
 * Converts an HTML string to known blocks.
 *
 * @param {string} $1.HTML The HTML to convert.
 *
 * @return {Array} A list of blocks.
 */


function rawHandler(_ref3) {
  var _ref3$HTML = _ref3.HTML,
      HTML = _ref3$HTML === void 0 ? '' : _ref3$HTML;

  // If we detect block delimiters, parse entirely as blocks.
  if (HTML.indexOf('<!-- wp:') !== -1) {
    return (0, _parser.parseWithGrammar)(HTML);
  } // An array of HTML strings and block objects. The blocks replace matched
  // shortcodes.


  var pieces = (0, _shortcodeConverter.default)(HTML);
  var rawTransforms = getRawTransformations();
  var blockContentSchema = (0, _utils.getBlockContentSchema)(rawTransforms);
  return (0, _lodash.compact)((0, _lodash.flatMap)(pieces, function (piece) {
    // Already a block from shortcode.
    if (typeof piece !== 'string') {
      return piece;
    } // These filters are essential for some blocks to be able to transform
    // from raw HTML. These filters move around some content or add
    // additional tags, they do not remove any content.


    var filters = [// Needed to adjust invalid lists.
    _listReducer.default, // Needed to create more and nextpage blocks.
    _specialCommentConverter.default, // Needed to create media blocks.
    _figureContentReducer.default, // Needed to create the quote block, which cannot handle text
    // without wrapper paragraphs.
    _blockquoteNormaliser.default];
    piece = (0, _utils.deepFilterHTML)(piece, filters, blockContentSchema);
    piece = (0, _normaliseBlocks.default)(piece);
    return htmlToBlocks({
      html: piece,
      rawTransforms: rawTransforms
    });
  }));
}
//# sourceMappingURL=index.js.map