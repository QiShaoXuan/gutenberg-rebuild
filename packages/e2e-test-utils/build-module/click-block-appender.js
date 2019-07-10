import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Clicks the default block appender.
 */
export function clickBlockAppender() {
  return _clickBlockAppender.apply(this, arguments);
}

function _clickBlockAppender() {
  _clickBlockAppender = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.click('.block-editor-default-block-appender__content');

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _clickBlockAppender.apply(this, arguments);
}
//# sourceMappingURL=click-block-appender.js.map