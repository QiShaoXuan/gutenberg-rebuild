"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveFormat = getActiveFormat;

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * Gets the format object by type at the start of the selection. This can be
 * used to get e.g. the URL of a link format at the current selection, but also
 * to check if a format is active at the selection. Returns undefined if there
 * is no format at the selection.
 *
 * @param {Object} value      Value to inspect.
 * @param {string} formatType Format type to look for.
 *
 * @return {?Object} Active format object of the specified type, or undefined.
 */
function getActiveFormat(_ref, formatType) {
  var formats = _ref.formats,
      formatPlaceholder = _ref.formatPlaceholder,
      start = _ref.start,
      end = _ref.end;

  if (start === undefined) {
    return;
  } // if selection is not empty, get the first character format


  if (start !== end) {
    return (0, _lodash.find)(formats[start], {
      type: formatType
    });
  } // if user picked (or unpicked) formats but didn't write anything in those formats yet return this format


  if (formatPlaceholder && formatPlaceholder.index === start) {
    return (0, _lodash.find)(formatPlaceholder.formats, {
      type: formatType
    });
  } // if we're at the start of text, use the first char to pick up the formats


  var startPos = start === 0 ? 0 : start - 1; // otherwise get the previous character format

  var previousLetterFormat = (0, _lodash.find)(formats[startPos], {
    type: formatType
  });

  if (previousLetterFormat) {
    return previousLetterFormat;
  }

  return undefined;
}
//# sourceMappingURL=get-active-format.native.js.map