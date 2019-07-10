"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uninstallPlugin = uninstallPlugin;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _switchUserToAdmin = require("./switch-user-to-admin");

var _switchUserToTest = require("./switch-user-to-test");

var _visitAdminPage = require("./visit-admin-page");

/**
 * Internal dependencies
 */

/**
 * Uninstalls a plugin.
 *
 * @param {string} slug Plugin slug.
 */
function uninstallPlugin(_x) {
  return _uninstallPlugin.apply(this, arguments);
}

function _uninstallPlugin() {
  _uninstallPlugin = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(slug) {
    var confirmPromise;
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
            confirmPromise = new Promise(function (resolve) {
              page.once('dialog', function () {
                return resolve();
              });
            });
            _context.next = 7;
            return Promise.all([confirmPromise, page.click("tr[data-slug=\"".concat(slug, "\"] .delete a"))]);

          case 7:
            _context.next = 9;
            return page.waitForSelector("tr[data-slug=\"".concat(slug, "\"].deleted"));

          case 9:
            _context.next = 11;
            return (0, _switchUserToTest.switchUserToTest)();

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _uninstallPlugin.apply(this, arguments);
}
//# sourceMappingURL=uninstall-plugin.js.map