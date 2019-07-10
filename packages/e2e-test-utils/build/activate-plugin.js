"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activatePlugin = activatePlugin;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _switchUserToAdmin = require("./switch-user-to-admin");

var _switchUserToTest = require("./switch-user-to-test");

var _visitAdminPage = require("./visit-admin-page");

/**
 * Internal dependencies
 */

/**
 * Activates an installed plugin.
 *
 * @param {string} slug Plugin slug.
 */
function activatePlugin(_x) {
  return _activatePlugin.apply(this, arguments);
}

function _activatePlugin() {
  _activatePlugin = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(slug) {
    var disableLink;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _switchUserToAdmin.switchUserToAdmin)();

          case 2:
            _context.next = 4;
            return (0, _visitAdminPage.visitAdminPage)('plugins.php');

          case 4:
            _context.next = 6;
            return page.$("tr[data-slug=\"".concat(slug, "\"] .deactivate a"));

          case 6:
            disableLink = _context.sent;

            if (!disableLink) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return");

          case 9:
            _context.next = 11;
            return page.click("tr[data-slug=\"".concat(slug, "\"] .activate a"));

          case 11:
            _context.next = 13;
            return page.waitForSelector("tr[data-slug=\"".concat(slug, "\"] .deactivate a"));

          case 13:
            _context.next = 15;
            return (0, _switchUserToTest.switchUserToTest)();

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _activatePlugin.apply(this, arguments);
}
//# sourceMappingURL=activate-plugin.js.map