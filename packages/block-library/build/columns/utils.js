"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumnsTemplate = void 0;

var _memize = _interopRequireDefault(require("memize"));

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * Returns the layouts configuration for a given number of columns.
 *
 * @param {number} columns Number of columns.
 *
 * @return {Object[]} Columns layout configuration.
 */
var getColumnsTemplate = (0, _memize.default)(function (columns) {
  return (0, _lodash.times)(columns, function () {
    return ['core/column'];
  });
});
exports.getColumnsTemplate = getColumnsTemplate;
//# sourceMappingURL=utils.js.map