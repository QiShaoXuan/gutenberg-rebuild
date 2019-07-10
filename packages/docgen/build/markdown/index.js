"use strict";

/**
 * External dependencies.
 */
var remark = require('remark');

var unified = require('unified');

var remarkParser = require('remark-parse');

var inject = require('mdast-util-inject');

var fs = require('fs');
/**
 * Internal dependencies.
 */


var formatter = require('./formatter');

var embed = require('./embed');

var appendOrEmbedContents = function appendOrEmbedContents(_ref) {
  var options = _ref.options,
      newContents = _ref.newContents;
  return function transform(targetAst, file, next) {
    if (options.toSection && !inject(options.toSection, targetAst, newContents)) {
      return next(new Error("Heading ".concat(options.toSection, " not found.")));
    } else if (options.toToken && !embed(options.useToken, targetAst, newContents)) {
      return next(new Error("Start and/or end tokens for ".concat(options.useToken, " not found.")));
    }

    next();
  };
};

module.exports = function (options, processDir, doc, filteredIr, headingTitle) {
  if (options.toSection || options.toToken) {
    var currentReadmeFile = fs.readFileSync(options.output, 'utf8');
    var newContents = unified().use(remarkParser).parse(formatter(processDir, doc, filteredIr, null));
    remark().use({
      settings: {
        commonmark: true
      }
    }).use(appendOrEmbedContents, {
      options: options,
      newContents: newContents
    }).process(currentReadmeFile, function (err, file) {
      if (err) {
        throw err;
      }

      fs.writeFileSync(doc, file);
    });
  } else {
    var output = formatter(processDir, doc, filteredIr, headingTitle);
    fs.writeFileSync(doc, output);
  }
};
//# sourceMappingURL=index.js.map