"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visitAdminPage = visitAdminPage;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = require("path");

var _createUrl = require("./create-url");

var _isCurrentUrl = require("./is-current-url");

var _loginUser = require("./login-user");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Visits admin page; if user is not logged in then it logging in it first, then visits admin page.
 *
 * @param {string} adminPath String to be serialized as pathname.
 * @param {string} query String to be serialized as query portion of URL.
 */
function visitAdminPage(_x, _x2) {
  return _visitAdminPage.apply(this, arguments);
}

function _visitAdminPage() {
  _visitAdminPage = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(adminPath, query) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.goto((0, _createUrl.createURL)((0, _path.join)('wp-admin', adminPath), query));

          case 2:
            if (!(0, _isCurrentUrl.isCurrentURL)('wp-login.php')) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return (0, _loginUser.loginUser)();

          case 5:
            _context.next = 7;
            return visitAdminPage(adminPath, query);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _visitAdminPage.apply(this, arguments);
}
//# sourceMappingURL=visit-admin-page.js.map