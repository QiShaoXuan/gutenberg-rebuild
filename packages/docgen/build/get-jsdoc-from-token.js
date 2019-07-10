"use strict";

/**
 * External dependencies.
 */
var doctrine = require('doctrine');
/**
 * Internal dependencies.
 */


var getLeadingComments = require('./get-leading-comments');

var getTypeAsString = require('./get-type-as-string');
/**
 * Function that takes an Espree token and returns
 * a object representing the leading JSDoc comment of the token,
 * if any.
 *
 * @param {Object} token Espree token.
 * @return {Object} Object representing the JSDoc comment.
 */


module.exports = function (token) {
  var jsdoc;
  var comments = getLeadingComments(token);

  if (comments && comments.startsWith('*\n')) {
    jsdoc = doctrine.parse(comments, {
      unwrap: true,
      recoverable: true,
      sloppy: true
    });
    jsdoc.tags = jsdoc.tags.map(function (tag) {
      if (tag.type) {
        tag.type = getTypeAsString(tag.type);
      }

      return tag;
    });
  }

  return jsdoc;
};
//# sourceMappingURL=get-jsdoc-from-token.js.map