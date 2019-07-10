/**
 * External dependencies.
 */
var _require = require('lodash'),
    get = _require.get;
/**
 * Internal dependencies.
 */


var getExportEntries = require('./get-export-entries');

var getJSDocFromToken = require('./get-jsdoc-from-token');

var getDependencyPath = require('./get-dependency-path');

var UNDOCUMENTED = 'Undocumented declaration.';
var NAMESPACE_EXPORT = '*';
var DEFAULT_EXPORT = 'default';

var hasClassWithName = function hasClassWithName(node, name) {
  return node.type === 'ClassDeclaration' && node.id.name === name;
};

var hasFunctionWithName = function hasFunctionWithName(node, name) {
  return node.type === 'FunctionDeclaration' && node.id.name === name;
};

var hasVariableWithName = function hasVariableWithName(node, name) {
  return node.type === 'VariableDeclaration' && node.declarations.some(function (declaration) {
    if (declaration.id.type === 'ObjectPattern') {
      return declaration.id.properties.some(function (property) {
        return property.key.name === name;
      });
    }

    return declaration.id.name === name;
  });
};

var hasNamedExportWithName = function hasNamedExportWithName(node, name) {
  return node.type === 'ExportNamedDeclaration' && (node.declaration && hasClassWithName(node.declaration, name) || node.declaration && hasFunctionWithName(node.declaration, name) || node.declaration && hasVariableWithName(node.declaration, name));
};

var hasImportWithName = function hasImportWithName(node, name) {
  return node.type === 'ImportDeclaration' && node.specifiers.some(function (specifier) {
    return specifier.local.name === name;
  });
};

var isImportDeclaration = function isImportDeclaration(node) {
  return node.type === 'ImportDeclaration';
};

var someImportMatchesName = function someImportMatchesName(name, token) {
  var matches = false;
  token.specifiers.forEach(function (specifier) {
    if (specifier.type === 'ImportDefaultSpecifier' && name === 'default') {
      matches = true;
    }

    if (specifier.type === 'ImportSpecifier' && name === specifier.imported.name) {
      matches = true;
    }
  });
  return matches;
};

var someEntryMatchesName = function someEntryMatchesName(name, entry, token) {
  return token.type === 'ExportNamedDeclaration' && entry.localName === name || token.type === 'ImportDeclaration' && someImportMatchesName(name, token);
};

var getJSDocFromDependency = function getJSDocFromDependency(token, entry, parseDependency) {
  var doc;
  var ir = parseDependency(getDependencyPath(token));

  if (entry.localName === NAMESPACE_EXPORT) {
    doc = ir.filter(function (_ref) {
      var name = _ref.name;
      return name !== DEFAULT_EXPORT;
    });
  } else {
    doc = ir.find(function (_ref2) {
      var name = _ref2.name;
      return someEntryMatchesName(name, entry, token);
    });
  }

  return doc;
};

var getJSDoc = function getJSDoc(token, entry, ast, parseDependency) {
  var doc;

  if (entry.localName !== NAMESPACE_EXPORT) {
    doc = getJSDocFromToken(token);

    if (doc !== undefined) {
      return doc;
    }
  }

  if (entry && entry.module === null) {
    var candidates = ast.body.filter(function (node) {
      return hasClassWithName(node, entry.localName) || hasFunctionWithName(node, entry.localName) || hasVariableWithName(node, entry.localName) || hasNamedExportWithName(node, entry.localName) || hasImportWithName(node, entry.localName);
    });

    if (candidates.length !== 1) {
      return doc;
    }

    var node = candidates[0];

    if (isImportDeclaration(node)) {
      doc = getJSDocFromDependency(node, entry, parseDependency);
    } else {
      doc = getJSDocFromToken(node);
    }

    return doc;
  }

  return getJSDocFromDependency(token, entry, parseDependency);
};
/**
 * Takes a export token and returns an intermediate representation in JSON.
 *
 * If the export token doesn't contain any JSDoc, and it's a identifier,
 * the identifier declaration will be looked up in the file or dependency
 * if an `ast` and `parseDependency` callback are provided.
 *
 * @param {string} path Path to file being processed.
 * @param {Object} token Espree export token.
 * @param {Object} [ast] Espree ast of the file being parsed.
 * @param {Function} [parseDependency] Function that takes a path
 * and returns the intermediate representation of the dependency file.
 *
 * @return {Object} Intermediate Representation in JSON.
 */


module.exports = function (path, token) {
  var ast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    body: []
  };
  var parseDependency = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
  var exportEntries = getExportEntries(token);
  var ir = [];
  exportEntries.forEach(function (entry) {
    var doc = getJSDoc(token, entry, ast, parseDependency);

    if (entry.localName === NAMESPACE_EXPORT) {
      doc.forEach(function (namedExport) {
        ir.push({
          path: path,
          name: namedExport.name,
          description: namedExport.description,
          tags: namedExport.tags,
          lineStart: entry.lineStart,
          lineEnd: entry.lineEnd
        });
      });
    } else {
      ir.push({
        path: path,
        name: entry.exportName,
        description: get(doc, ['description'], UNDOCUMENTED),
        tags: get(doc, ['tags'], []),
        lineStart: entry.lineStart,
        lineEnd: entry.lineEnd
      });
    }
  });
  return ir;
};
//# sourceMappingURL=get-intermediate-representation.js.map