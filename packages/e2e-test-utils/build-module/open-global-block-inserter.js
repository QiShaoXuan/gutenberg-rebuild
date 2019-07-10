import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Opens the global block inserter.
 */
export function openGlobalBlockInserter() {
  return _openGlobalBlockInserter.apply(this, arguments);
}

function _openGlobalBlockInserter() {
  _openGlobalBlockInserter = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.click('.edit-post-header [aria-label="Add block"]');

          case 2:
            _context.next = 4;
            return page.waitForSelector('.block-editor-inserter__menu');

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _openGlobalBlockInserter.apply(this, arguments);
}
//# sourceMappingURL=open-global-block-inserter.js.map