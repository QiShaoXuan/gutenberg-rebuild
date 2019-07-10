"use strict";

/**
 * External dependencies
 */
var _require = require('lodash'),
    findLast = _require.findLast;

var getHeadingIndex = function getHeadingIndex(ast, index) {
  var astBeforeIndex = ast.children.slice(0, index);
  var lastHeading = findLast(astBeforeIndex, function (node) {
    return node.type === 'heading';
  });
  return lastHeading ? lastHeading.depth : 1;
};
/**
 * Inserts new contents within the token boundaries.
 *
 * @param {string} token String to embed in the start/end tokens.
 * @param {Object} targetAst The remark AST of the file where the new contents are to be embedded.
 * @param {Object} newContentAst The new contents to be embedded in remark AST format.
 * @return {boolean} Whether the contents were embedded or not.
 */


var embed = function embed(token, targetAst, newContentAst) {
  var headingIndex = -1;
  var START_TOKEN = "<!-- START TOKEN(".concat(token, ") -->");
  var END_TOKEN = "<!-- END TOKEN(".concat(token, ") -->");
  var startIndex = targetAst.children.findIndex(function (node) {
    return node.type === 'html' && node.value === START_TOKEN;
  });

  if (startIndex === -1) {
    return false;
  }

  var endIndex = targetAst.children.findIndex(function (node) {
    return node.type === 'html' && node.value === END_TOKEN;
  });

  if (endIndex === -1) {
    return false;
  }

  if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
    headingIndex = getHeadingIndex(targetAst, startIndex);
    newContentAst.children.forEach(function (node) {
      if (node.type === 'heading') {
        node.depth = headingIndex + 1;
      }
    });
    targetAst.children.splice(startIndex + 1, endIndex - startIndex - 1, newContentAst);
    return true;
  }

  return false;
};

module.exports = embed;
//# sourceMappingURL=embed.js.map