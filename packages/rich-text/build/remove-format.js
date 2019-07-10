"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFormat = removeFormat;

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
 * Remove any format object from a Rich Text value by type from the given
 * `startIndex` to the given `endIndex`. Indices are retrieved from the
 * selection if none are provided.
 *
 * @param {Object} value        Value to modify.
 * @param {string} formatType   Format type to remove.
 * @param {number} [startIndex] Start index.
 * @param {number} [endIndex]   End index.
 *
 * @return {Object} A new value with the format applied.
 */
function removeFormat(value, formatType) {
  var startIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : value.start;
  var endIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : value.end;
  var formats = value.formats,
      activeFormats = value.activeFormats;
  var newFormats = formats.slice(); // If the selection is collapsed, expand start and end to the edges of the
  // format.

  if (startIndex === endIndex) {
    var format = (0, _lodash.find)(newFormats[startIndex], {
      type: formatType
    });

    if (format) {
      while ((0, _lodash.find)(newFormats[startIndex], format)) {
        filterFormats(newFormats, startIndex, formatType);
        startIndex--;
      }

      endIndex++;

      while ((0, _lodash.find)(newFormats[endIndex], format)) {
        filterFormats(newFormats, endIndex, formatType);
        endIndex++;
      }
    } else {
      return (0, _objectSpread2.default)({}, value, {
        activeFormats: (0, _lodash.reject)(activeFormats, {
          type: formatType
        })
      });
    }
  } else {
    for (var i = startIndex; i < endIndex; i++) {
      if (newFormats[i]) {
        filterFormats(newFormats, i, formatType);
      }
    }
  }

  return (0, _normaliseFormats.normaliseFormats)((0, _objectSpread2.default)({}, value, {
    formats: newFormats
  }));
}

function filterFormats(formats, index, formatType) {
  var newFormats = formats[index].filter(function (_ref) {
    var type = _ref.type;
    return type !== formatType;
  });

  if (newFormats.length) {
    formats[index] = newFormats;
  } else {
    delete formats[index];
  }
}
//# sourceMappingURL=remove-format.js.map