"use strict";

/**
 * External dependencies.
 */
var _require = require('lodash'),
    last = _require.last;
/**
 * Function that returns the leading comment
 * of a Espree node.
 *
 * @param {Object} declaration Espree node to inspect
 *
 * @return {?string} Leading comment or undefined if there is none.
 */


module.exports = function (declaration) {
  var comments;

  if (declaration.leadingComments) {
    comments = last(declaration.leadingComments).value;
  }

  return comments;
};
//# sourceMappingURL=get-leading-comments.js.map