import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Internal dependencies
 */
import { toggleScreenOption } from './toggle-screen-option';
/**
 * Enables Pre-publish checks.
 */

export function enablePrePublishChecks() {
  return _enablePrePublishChecks.apply(this, arguments);
}

function _enablePrePublishChecks() {
  _enablePrePublishChecks = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return toggleScreenOption('Enable Pre-publish Checks', true);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _enablePrePublishChecks.apply(this, arguments);
}
//# sourceMappingURL=enable-pre-publish-checks.js.map