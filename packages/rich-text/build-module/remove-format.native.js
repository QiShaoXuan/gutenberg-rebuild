import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

/**
 * External dependencies
 */
import { cloneDeep } from 'lodash';
/**
 * Internal dependencies
 */

import { normaliseFormats } from './normalise-formats';
/**
 * Remove any format object from a Rich Text value by type from the given
 * `startIndex` to the given `endIndex`. Indices are retrieved from the
 * selection if none are provided.
 *
 * @param {Object} value      Value to modify.
 * @param {string} formatType Format type to remove.
 * @param {number} startIndex Start index.
 * @param {number} endIndex   End index.
 *
 * @return {Object} A new value with the format applied.
 */

export function removeFormat(value, formatType) {
  var startIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : value.start;
  var endIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : value.end;
  var formats = value.formats,
      formatPlaceholder = value.formatPlaceholder,
      start = value.start,
      end = value.end;
  var newFormats = formats.slice(0);
  var newFormatPlaceholder = null;

  if (start === end) {
    if (formatPlaceholder && formatPlaceholder.index === start) {
      var placeholderFormats = (formatPlaceholder.formats || []).slice(0);
      newFormatPlaceholder = _objectSpread({}, formatPlaceholder, {
        // make sure we do not reuse the formats reference in our placeholder `formats` array
        formats: cloneDeep(placeholderFormats.filter(function (_ref) {
          var type = _ref.type;
          return type !== formatType;
        }))
      });
    } else if (!formatPlaceholder) {
      var previousFormat = (start > 0 ? formats[start - 1] : formats[0]) || [];
      newFormatPlaceholder = {
        index: start,
        formats: cloneDeep(previousFormat.filter(function (_ref2) {
          var type = _ref2.type;
          return type !== formatType;
        }))
      };
    }
  } // Do not remove format if selection is empty


  for (var i = startIndex; i < endIndex; i++) {
    if (newFormats[i]) {
      filterFormats(newFormats, i, formatType);
    }
  }

  return normaliseFormats(_objectSpread({}, value, {
    formats: newFormats,
    formatPlaceholder: newFormatPlaceholder
  }));
}

function filterFormats(formats, index, formatType) {
  var newFormats = formats[index].filter(function (_ref3) {
    var type = _ref3.type;
    return type !== formatType;
  });

  if (newFormats.length) {
    formats[index] = newFormats;
  } else {
    delete formats[index];
  }
}
//# sourceMappingURL=remove-format.native.js.map