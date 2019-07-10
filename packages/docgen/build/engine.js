"use strict";

/**
* External dependencies.
*/
var espree = require('espree');

var _require = require('lodash'),
    flatten = _require.flatten;
/**
* Internal dependencies.
*/


var getIntermediateRepresentation = require('./get-intermediate-representation');

var getAST = function getAST(source) {
  return espree.parse(source, {
    attachComment: true,
    loc: true,
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  });
};

var getExportTokens = function getExportTokens(ast) {
  return ast.body.filter(function (node) {
    return ['ExportNamedDeclaration', 'ExportDefaultDeclaration', 'ExportAllDeclaration'].some(function (declaration) {
      return declaration === node.type;
    });
  });
};

var engine = function engine(path, code) {
  var getIRFromPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  var result = {};
  result.ast = getAST(code);
  result.tokens = getExportTokens(result.ast);
  result.ir = flatten(result.tokens.map(function (token) {
    return getIntermediateRepresentation(path, token, result.ast, getIRFromPath);
  }));
  return result;
};
/**
 * Function that takes code and returns an intermediate representation.
 *
 * @param {string} code The code to parse.
 * @param {Function} [getIRFromPath=noop] Callback to retrieve the
 * Intermediate Representation from a path relative to the file
 * being parsed.
 *
 * @return {Object} Intermediate Representation in JSON.
 */


module.exports = engine;
//# sourceMappingURL=engine.js.map