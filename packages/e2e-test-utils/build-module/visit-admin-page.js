import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * External dependencies
 */
import { join } from 'path';
/**
 * Internal dependencies
 */

import { createURL } from './create-url';
import { isCurrentURL } from './is-current-url';
import { loginUser } from './login-user';
/**
 * Visits admin page; if user is not logged in then it logging in it first, then visits admin page.
 *
 * @param {string} adminPath String to be serialized as pathname.
 * @param {string} query String to be serialized as query portion of URL.
 */

export function visitAdminPage(_x, _x2) {
  return _visitAdminPage.apply(this, arguments);
}

function _visitAdminPage() {
  _visitAdminPage = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(adminPath, query) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.goto(createURL(join('wp-admin', adminPath), query));

          case 2:
            if (!isCurrentURL('wp-login.php')) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return loginUser();

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