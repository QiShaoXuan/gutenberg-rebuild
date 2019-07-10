"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyFormat = applyFormat;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _normaliseFormats = require("./normalise-formats");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Apply a format object to a Rich Text value from the given `startIndex` to the
 * given `endIndex`. Indices are retrieved from the selection if none are
 * provided.
 *
 * @param {Object} value      Value to modify.
 * @param {Object} formats    Formats to apply.
 * @param {number} startIndex Start index.
 * @param {number} endIndex   End index.
 *
 * @return {Object} A new value with the format applied.
 */
function applyFormat(value, formats) {
  var startIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : value.start;
  var endIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : value.end;
  var currentFormats = value.formats,
      formatPlaceholder = value.formatPlaceholder,
      start = value.start;

  if (!Array.isArray(formats)) {
    formats = [formats];
  } // The selection is collpased, insert a placeholder with the format so new input appears
  // with the format applied.


  if (startIndex === endIndex) {
    var previousFormats = currentFormats[startIndex - 1] || [];
    var placeholderFormats = formatPlaceholder && formatPlaceholder.index === start && formatPlaceholder.formats; // Follow the same logic as in getActiveFormat: placeholderFormats has priority over previousFormats

    var activeFormats = (placeholderFormats ? placeholderFormats : previousFormats) || [];
    return (0, _objectSpread2.default)({}, value, {
      formats: currentFormats,
      formatPlaceholder: {
        index: start,
        formats: mergeFormats(activeFormats, formats)
      }
    });
  }

  var newFormats = currentFormats.slice(0);

  for (var index = startIndex; index < endIndex; index++) {
    applyFormats(newFormats, index, formats);
  }

  return (0, _normaliseFormats.normaliseFormats)((0, _objectSpread2.default)({}, value, {
    formats: newFormats
  }));
}

function mergeFormats(formats1, formats2) {
  var formatsOut = (0, _lodash.cloneDeep)(formats1);
  formats2.forEach(function (format2) {
    var format1In2 = formatsOut.find(function (format1) {
      return format1.type === format2.type;
    }); // update properties while keeping the formats ordered

    if (format1In2) {
      Object.assign(format1In2, format2);
    } else {
      formatsOut.push((0, _lodash.cloneDeep)(format2));
    }
  });
  return formatsOut;
}

function applyFormats(formats, index, newFormats) {
  if (formats[index]) {
    formats[index] = mergeFormats(formats[index], newFormats);
  } else {
    formats[index] = (0, _lodash.cloneDeep)(newFormats);
  }
}
//# sourceMappingURL=apply-format.native.js.map