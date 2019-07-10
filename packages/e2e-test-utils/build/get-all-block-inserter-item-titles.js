"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllBlockInserterItemTitles = getAllBlockInserterItemTitles;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * Returns an array of strings with all inserter item titles.
 *
 * @return {Promise} Promise resolving with an array containing all inserter item titles.
 */
function getAllBlockInserterItemTitles() {
  return _getAllBlockInserterItemTitles.apply(this, arguments);
}

function _getAllBlockInserterItemTitles() {
  _getAllBlockInserterItemTitles = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var inserterItemTitles;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.evaluate(function () {
              return Array.from(document.querySelectorAll('.block-editor-inserter__results .block-editor-block-types-list__item-title')).map(function (inserterItem) {
                return inserterItem.innerText;
              });
            });

          case 2:
            inserterItemTitles = _context.sent;
            return _context.abrupt("return", (0, _lodash.sortBy)((0, _lodash.uniq)(inserterItemTitles)));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getAllBlockInserterItemTitles.apply(this, arguments);
}
//# sourceMappingURL=get-all-block-inserter-item-titles.js.map