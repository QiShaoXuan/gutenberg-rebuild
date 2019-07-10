import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Clicks a block toolbar button.
 *
 * @param {string} buttonAriaLabel The aria label of the button to click.
 */
export function clickBlockToolbarButton(_x) {
  return _clickBlockToolbarButton.apply(this, arguments);
}

function _clickBlockToolbarButton() {
  _clickBlockToolbarButton = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(buttonAriaLabel) {
    var BLOCK_TOOLBAR_SELECTOR, BUTTON_SELECTOR;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            BLOCK_TOOLBAR_SELECTOR = '.block-editor-block-toolbar';
            BUTTON_SELECTOR = "".concat(BLOCK_TOOLBAR_SELECTOR, " button[aria-label=\"").concat(buttonAriaLabel, "\"]");
            _context.next = 4;
            return page.$(BLOCK_TOOLBAR_SELECTOR);

          case 4:
            _context.t0 = _context.sent;

            if (!(_context.t0 === null)) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return page.keyboard.press('Escape');

          case 8:
            _context.next = 10;
            return page.waitForSelector(BUTTON_SELECTOR);

          case 10:
            _context.next = 12;
            return page.click(BUTTON_SELECTOR);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _clickBlockToolbarButton.apply(this, arguments);
}
//# sourceMappingURL=click-block-toolbar-button.js.map