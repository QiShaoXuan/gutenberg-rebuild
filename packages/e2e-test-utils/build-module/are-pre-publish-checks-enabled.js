import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Verifies if publish checks are enabled.
 * @return {boolean} Boolean which represents the state of prepublish checks.
 */
export function arePrePublishChecksEnabled() {
  return _arePrePublishChecksEnabled.apply(this, arguments);
}

function _arePrePublishChecksEnabled() {
  _arePrePublishChecksEnabled = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", page.evaluate(function () {
              return window.wp.data.select('core/editor').isPublishSidebarEnabled();
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _arePrePublishChecksEnabled.apply(this, arguments);
}
//# sourceMappingURL=are-pre-publish-checks-enabled.js.map