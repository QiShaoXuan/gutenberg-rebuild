"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginUser = loginUser;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = require("./shared/config");

var _createUrl = require("./create-url");

var _isCurrentUrl = require("./is-current-url");

var _pressKeyWithModifier = require("./press-key-with-modifier");

/**
 * Internal dependencies
 */

/**
 * Performs log in with specified username and password.
 *
 * @param {?string} username String to be used as user credential.
 * @param {?string} password String to be used as user credential.
 */
function loginUser() {
  return _loginUser.apply(this, arguments);
}

function _loginUser() {
  _loginUser = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var username,
        password,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            username = _args.length > 0 && _args[0] !== undefined ? _args[0] : _config.WP_USERNAME;
            password = _args.length > 1 && _args[1] !== undefined ? _args[1] : _config.WP_PASSWORD;

            if ((0, _isCurrentUrl.isCurrentURL)('wp-login.php')) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return page.goto((0, _createUrl.createURL)('wp-login.php'));

          case 5:
            _context.next = 7;
            return page.focus('#user_login');

          case 7:
            _context.next = 9;
            return (0, _pressKeyWithModifier.pressKeyWithModifier)('primary', 'a');

          case 9:
            _context.next = 11;
            return page.type('#user_login', username);

          case 11:
            _context.next = 13;
            return page.focus('#user_pass');

          case 13:
            _context.next = 15;
            return (0, _pressKeyWithModifier.pressKeyWithModifier)('primary', 'a');

          case 15:
            _context.next = 17;
            return page.type('#user_pass', password);

          case 17:
            _context.next = 19;
            return Promise.all([page.waitForNavigation(), page.click('#wp-submit')]);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _loginUser.apply(this, arguments);
}
//# sourceMappingURL=login-user.js.map