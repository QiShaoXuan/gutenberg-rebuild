"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchUserToTest = switchUserToTest;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _loginUser = require("./login-user");

var _config = require("./shared/config");

/**
 * Internal dependencies
 */

/**
 * Switches the current user to whichever user we should be
 * running the tests as (if we're not already that user).
 */
function switchUserToTest() {
  return _switchUserToTest.apply(this, arguments);
}

function _switchUserToTest() {
  _switchUserToTest = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(_config.WP_USERNAME === _config.WP_ADMIN_USER.username)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.next = 4;
            return (0, _loginUser.loginUser)();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _switchUserToTest.apply(this, arguments);
}
//# sourceMappingURL=switch-user-to-test.js.map