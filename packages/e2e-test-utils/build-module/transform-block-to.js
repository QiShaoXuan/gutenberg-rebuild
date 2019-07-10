import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Converts editor's block type.
 *
 * @param {string} name Block name.
 */
export function transformBlockTo(_x) {
  return _transformBlockTo.apply(this, arguments);
}

function _transformBlockTo() {
  _transformBlockTo = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(name) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.mouse.move(200, 300, {
              steps: 10
            });

          case 2:
            _context.next = 4;
            return page.mouse.move(250, 350, {
              steps: 10
            });

          case 4:
            _context.next = 6;
            return page.click('.block-editor-block-switcher__toggle');

          case 6:
            _context.next = 8;
            return page.waitForSelector(".block-editor-block-types-list__item[aria-label=\"".concat(name, "\"]"));

          case 8:
            _context.next = 10;
            return page.click(".block-editor-block-types-list__item[aria-label=\"".concat(name, "\"]"));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _transformBlockTo.apply(this, arguments);
}
//# sourceMappingURL=transform-block-to.js.map