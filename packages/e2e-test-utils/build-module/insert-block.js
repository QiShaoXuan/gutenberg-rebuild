import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Internal dependencies
 */
import { searchForBlock } from './search-for-block';
/**
 * Opens the inserter, searches for the given term, then selects the first
 * result that appears.
 *
 * @param {string} searchTerm The text to search the inserter for.
 * @param {string} panelName  The inserter panel to open (if it's closed by default).
 */

export function insertBlock(_x) {
  return _insertBlock.apply(this, arguments);
}

function _insertBlock() {
  _insertBlock = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(searchTerm) {
    var panelName,
        panelButton,
        _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            panelName = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
            _context.next = 3;
            return searchForBlock(searchTerm);

          case 3:
            if (!panelName) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return page.$x("//button[contains(text(), '".concat(panelName, "')]"));

          case 6:
            panelButton = _context.sent[0];
            _context.next = 9;
            return panelButton.click();

          case 9:
            _context.next = 11;
            return page.click("button[aria-label=\"".concat(searchTerm, "\"]"));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _insertBlock.apply(this, arguments);
}
//# sourceMappingURL=insert-block.js.map