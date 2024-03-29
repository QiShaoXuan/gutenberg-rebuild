import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Internal dependencies
 */
import { toggleScreenOption } from './toggle-screen-option';
/**
 * Disables Pre-publish checks.
 */

export function disablePrePublishChecks() {
  return _disablePrePublishChecks.apply(this, arguments);
}

function _disablePrePublishChecks() {
  _disablePrePublishChecks = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return toggleScreenOption('Enable Pre-publish Checks', false);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _disablePrePublishChecks.apply(this, arguments);
}
//# sourceMappingURL=disable-pre-publish-checks.js.map