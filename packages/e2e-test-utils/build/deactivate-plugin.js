"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deactivatePlugin = deactivatePlugin;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _switchUserToAdmin = require("./switch-user-to-admin");

var _switchUserToTest = require("./switch-user-to-test");

var _visitAdminPage = require("./visit-admin-page");

/**
 * Internal dependencies
 */

/**
 * Deactivates an active plugin.
 *
 * @param {string} slug Plugin slug.
 */
function deactivatePlugin(_x) {
  return _deactivatePlugin.apply(this, arguments);
}

function _deactivatePlugin() {
  _deactivatePlugin = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(slug) {
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
            return page.click("tr[data-slug=\"".concat(slug, "\"] .deactivate a"));

          case 6:
            _context.next = 8;
            return page.waitForSelector("tr[data-slug=\"".concat(slug, "\"] .delete a"));

          case 8:
            _context.next = 10;
            return (0, _switchUserToTest.switchUserToTest)();

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _deactivatePlugin.apply(this, arguments);
}
//# sourceMappingURL=deactivate-plugin.js.map