/**
 * External dependencies
 */
import memoize from 'memize';
import { times } from 'lodash';
/**
 * Returns the layouts configuration for a given number of columns.
 *
 * @param {number} columns Number of columns.
 *
 * @return {Object[]} Columns layout configuration.
 */

export var getColumnsTemplate = memoize(function (columns) {
  return times(columns, function () {
    return ['core/column'];
  });
});
//# sourceMappingURL=utils.js.map