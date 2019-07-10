"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureSidebarOpened = ensureSidebarOpened;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Verifies that the edit post sidebar is opened, and if it is not, opens it.
 *
 * @return {Promise} Promise resolving once the edit post sidebar is opened.
 */
function ensureSidebarOpened() {
  return _ensureSidebarOpened.apply(this, arguments);
}

function _ensureSidebarOpened() {
  _ensureSidebarOpened = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            return _context.abrupt("return", page.$eval('.edit-post-sidebar', function () {}));

          case 4:
            _context.prev = 4;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", page.click('.edit-post-header__settings [aria-label="Settings"]'));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 4]]);
  }));
  return _ensureSidebarOpened.apply(this, arguments);
}
//# sourceMappingURL=ensure-sidebar-opened.js.map