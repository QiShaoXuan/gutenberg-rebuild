"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchForBlock = searchForBlock;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _openGlobalBlockInserter = require("./open-global-block-inserter");

/**
 * Internal dependencies
 */

/**
 * Search for block in the global inserter
 *
 * @param {string} searchTerm The text to search the inserter for.
 */
function searchForBlock(_x) {
  return _searchForBlock.apply(this, arguments);
}

function _searchForBlock() {
  _searchForBlock = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(searchTerm) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _openGlobalBlockInserter.openGlobalBlockInserter)();

          case 2:
            _context.next = 4;
            return page.keyboard.type(searchTerm);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _searchForBlock.apply(this, arguments);
}
//# sourceMappingURL=search-for-block.js.map