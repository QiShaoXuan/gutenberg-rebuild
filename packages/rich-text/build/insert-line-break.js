"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertLineBreak = insertLineBreak;

var _insert = require("./insert");

/**
 * Internal dependencies
 */

/**
 * Inserts a line break at the given or selected position.
 *
 * @param {Object} value Value to modify.
 *
 * @return {Object} The value with the line break inserted.
 */
function insertLineBreak(value) {
  return (0, _insert.insert)(value, '\n');
}
//# sourceMappingURL=insert-line-break.js.map