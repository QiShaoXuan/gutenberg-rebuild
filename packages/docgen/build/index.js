"use strict";

/**
 * External dependencies
 */
var fs = require('fs');

var path = require('path');

var _require = require('lodash'),
    last = _require.last;
/**
 * Internal dependencies
 */


var engine = require('./engine');

var defaultMarkdownFormatter = require('./markdown');
/**
 * Helpers functions.
 */


var relativeToAbsolute = function relativeToAbsolute(basePath, relativePath) {
  var target = path.join(path.dirname(basePath), relativePath);

  if (path.extname(target) === '.js') {
    return target;
  }

  var targetFile = target + '.js';

  if (fs.existsSync(targetFile)) {
    return targetFile;
  }

  targetFile = path.join(target, 'index.js');

  if (fs.existsSync(targetFile)) {
    return targetFile;
  }

  process.stderr.write('\nRelative path does not exists.');
  process.stderr.write('\n');
  process.stderr.write("\nBase: ".concat(basePath));
  process.stderr.write("\nRelative: ".concat(relativePath));
  process.stderr.write('\n\n');
  process.exit(1);
};

var getIRFromRelativePath = function getIRFromRelativePath(rootDir, basePath) {
  return function (relativePath) {
    if (!relativePath.startsWith('.')) {
      return [];
    }

    var absolutePath = relativeToAbsolute(basePath, relativePath);
    var result = processFile(rootDir, absolutePath);
    return result.ir || undefined;
  };
};

var processFile = function processFile(rootDir, inputFile) {
  try {
    var data = fs.readFileSync(inputFile, 'utf8');
    currentFileStack.push(inputFile);
    var relativePath = path.relative(rootDir, inputFile);
    var result = engine(relativePath, data, getIRFromRelativePath(rootDir, last(currentFileStack)));
    currentFileStack.pop(inputFile);
    return result;
  } catch (e) {
    process.stderr.write("\n".concat(e));
    process.stderr.write('\n\n');
    process.exit(1);
  }
};

var runCustomFormatter = function runCustomFormatter(customFormatterFile, rootDir, doc, symbols, headingTitle) {
  try {
    var customFormatter = require(customFormatterFile);

    var output = customFormatter(rootDir, doc, symbols, headingTitle);
    fs.writeFileSync(doc, output);
  } catch (e) {
    process.stderr.write("\n".concat(e));
    process.stderr.write('\n\n');
    process.exit(1);
  }

  return 'custom formatter';
}; // To keep track of file being processed.


var currentFileStack = [];

module.exports = function (sourceFile, options) {
  // Input: process CLI args, prepare files, etc
  var processDir = process.cwd();

  if (sourceFile === undefined) {
    process.stderr.write('\n');
    process.stderr.write('No source file provided');
    process.stderr.write('\n\n');
    process.exit(1);
  }

  sourceFile = path.join(processDir, sourceFile);
  var debugMode = options.debug ? true : false;
  var inputBase = path.join(path.dirname(sourceFile), path.basename(sourceFile, path.extname(sourceFile)));
  var ast = inputBase + '-ast.json';
  var tokens = inputBase + '-exports.json';
  var ir = inputBase + '-ir.json';
  var doc = options.output ? path.join(processDir, options.output) : inputBase + '-api.md'; // Process

  var result = processFile(processDir, sourceFile);
  var filteredIr = result.ir.filter(function (_ref) {
    var name = _ref.name;
    return options.ignore ? !name.match(options.ignore) : true;
  }); // Ouput

  if (result === undefined) {
    process.stdout.write('\nFile was processed, but contained no ES6 module exports:');
    process.stdout.write("\n".concat(sourceFile));
    process.stdout.write('\n\n');
    process.exit(0);
  }

  if (options.formatter) {
    runCustomFormatter(path.join(processDir, options.formatter), processDir, doc, filteredIr, 'API');
  } else {
    defaultMarkdownFormatter(options, processDir, doc, filteredIr, 'API');
  }

  if (debugMode) {
    fs.writeFileSync(ir, JSON.stringify(result.ir));
    fs.writeFileSync(tokens, JSON.stringify(result.tokens));
    fs.writeFileSync(ast, JSON.stringify(result.ast));
  }

  process.exit(0);
};
//# sourceMappingURL=index.js.map