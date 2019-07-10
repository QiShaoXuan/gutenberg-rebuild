"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTable = createTable;
exports.updateCellContent = updateCellContent;
exports.insertRow = insertRow;
exports.deleteRow = deleteRow;
exports.insertColumn = insertColumn;
exports.deleteColumn = deleteColumn;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * Creates a table state.
 *
 * @param {number} options.rowCount    Row count for the table to create.
 * @param {number} options.columnCount Column count for the table to create.
 *
 * @return {Object} New table state.
 */
function createTable(_ref) {
  var rowCount = _ref.rowCount,
      columnCount = _ref.columnCount;
  return {
    body: (0, _lodash.times)(rowCount, function () {
      return {
        cells: (0, _lodash.times)(columnCount, function () {
          return {
            content: '',
            tag: 'td'
          };
        })
      };
    })
  };
}
/**
 * Updates cell content in the table state.
 *
 * @param {Object} state               Current table state.
 * @param {string} options.section     Section of the cell to update.
 * @param {number} options.rowIndex    Row index of the cell to update.
 * @param {number} options.columnIndex Column index of the cell to update.
 * @param {Array}  options.content     Content to set for the cell.
 *
 * @return {Object} New table state.
 */


function updateCellContent(state, _ref2) {
  var section = _ref2.section,
      rowIndex = _ref2.rowIndex,
      columnIndex = _ref2.columnIndex,
      content = _ref2.content;
  return (0, _defineProperty2.default)({}, section, state[section].map(function (row, currentRowIndex) {
    if (currentRowIndex !== rowIndex) {
      return row;
    }

    return {
      cells: row.cells.map(function (cell, currentColumnIndex) {
        if (currentColumnIndex !== columnIndex) {
          return cell;
        }

        return (0, _objectSpread2.default)({}, cell, {
          content: content
        });
      })
    };
  }));
}
/**
 * Inserts a row in the table state.
 *
 * @param {Object} state            Current table state.
 * @param {string} options.section  Section in which to insert the row.
 * @param {number} options.rowIndex Row index at which to insert the row.
 *
 * @return {Object} New table state.
 */


function insertRow(state, _ref4) {
  var section = _ref4.section,
      rowIndex = _ref4.rowIndex;
  var cellCount = state[section][0].cells.length;
  return (0, _defineProperty2.default)({}, section, [].concat((0, _toConsumableArray2.default)(state[section].slice(0, rowIndex)), [{
    cells: (0, _lodash.times)(cellCount, function () {
      return {
        content: '',
        tag: 'td'
      };
    })
  }], (0, _toConsumableArray2.default)(state[section].slice(rowIndex))));
}
/**
 * Deletes a row from the table state.
 *
 * @param {Object} state            Current table state.
 * @param {string} options.section  Section in which to delete the row.
 * @param {number} options.rowIndex Row index to delete.
 *
 * @return {Object} New table state.
 */


function deleteRow(state, _ref6) {
  var section = _ref6.section,
      rowIndex = _ref6.rowIndex;
  return (0, _defineProperty2.default)({}, section, state[section].filter(function (row, index) {
    return index !== rowIndex;
  }));
}
/**
 * Inserts a column in the table state.
 *
 * @param {Object} state               Current table state.
 * @param {string} options.section     Section in which to insert the column.
 * @param {number} options.columnIndex Column index at which to insert the column.
 *
 * @return {Object} New table state.
 */


function insertColumn(state, _ref8) {
  var section = _ref8.section,
      columnIndex = _ref8.columnIndex;
  return (0, _defineProperty2.default)({}, section, state[section].map(function (row) {
    return {
      cells: [].concat((0, _toConsumableArray2.default)(row.cells.slice(0, columnIndex)), [{
        content: '',
        tag: 'td'
      }], (0, _toConsumableArray2.default)(row.cells.slice(columnIndex)))
    };
  }));
}
/**
 * Deletes a column from the table state.
 *
 * @param {Object} state               Current table state.
 * @param {string} options.section     Section in which to delete the column.
 * @param {number} options.columnIndex Column index to delete.
 *
 * @return {Object} New table state.
 */


function deleteColumn(state, _ref10) {
  var section = _ref10.section,
      columnIndex = _ref10.columnIndex;
  return (0, _defineProperty2.default)({}, section, state[section].map(function (row) {
    return {
      cells: row.cells.filter(function (cell, index) {
        return index !== columnIndex;
      })
    };
  }).filter(function (row) {
    return row.cells.length;
  }));
}
//# sourceMappingURL=state.js.map