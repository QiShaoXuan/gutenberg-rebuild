"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installPlugin = installPlugin;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _switchUserToAdmin = require("./switch-user-to-admin");

var _switchUserToTest = require("./switch-user-to-test");

var _visitAdminPage = require("./visit-admin-page");

/**
 * Internal dependencies
 */

/**
 * Installs a plugin from the WP.org repository.
 *
 * @param {string} slug        Plugin slug.
 * @param {string?} searchTerm If the plugin is not findable by its slug use an alternative term to search.
 */
function installPlugin(_x, _x2) {
  return _installPlugin.apply(this, arguments);
}

function _installPlugin() {
  _installPlugin = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(slug, searchTerm) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _switchUserToAdmin.switchUserToAdmin)();

          case 2:
            _context.next = 4;
            return (0, _visitAdminPage.visitAdminPage)('plugin-install.php', 's=' + encodeURIComponent(searchTerm || slug) + '&tab=search&type=term');

          case 4:
            _context.next = 6;
            return page.click(".install-now[data-slug=\"".concat(slug, "\"]"));

          case 6:
            _context.next = 8;
            return page.waitForSelector(".activate-now[data-slug=\"".concat(slug, "\"]"));

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
  return _installPlugin.apply(this, arguments);
}
//# sourceMappingURL=install-plugin.js.map