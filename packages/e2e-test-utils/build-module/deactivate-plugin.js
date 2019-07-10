import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Internal dependencies
 */
import { switchUserToAdmin } from './switch-user-to-admin';
import { switchUserToTest } from './switch-user-to-test';
import { visitAdminPage } from './visit-admin-page';
/**
 * Deactivates an active plugin.
 *
 * @param {string} slug Plugin slug.
 */

export function deactivatePlugin(_x) {
  return _deactivatePlugin.apply(this, arguments);
}

function _deactivatePlugin() {
  _deactivatePlugin = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(slug) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return switchUserToAdmin();

          case 2:
            _context.next = 4;
            return visitAdminPage('plugins.php');

          case 4:
            _context.next = 6;
            return page.click("tr[data-slug=\"".concat(slug, "\"] .deactivate a"));

          case 6:
            _context.next = 8;
            return page.waitForSelector("tr[data-slug=\"".concat(slug, "\"] .delete a"));

          case 8:
            _context.next = 10;
            return switchUserToTest();

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