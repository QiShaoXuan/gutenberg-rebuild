"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openGlobalBlockInserter = openGlobalBlockInserter;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Opens the global block inserter.
 */
function openGlobalBlockInserter() {
  return _openGlobalBlockInserter.apply(this, arguments);
}

function _openGlobalBlockInserter() {
  _openGlobalBlockInserter = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.click('.edit-post-header [aria-label="Add block"]');

          case 2:
            _context.next = 4;
            return page.waitForSelector('.block-editor-inserter__menu');

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _openGlobalBlockInserter.apply(this, arguments);
}
//# sourceMappingURL=open-global-block-inserter.js.map