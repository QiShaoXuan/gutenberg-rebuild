import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Internal dependencies
 */
import { openGlobalBlockInserter } from './open-global-block-inserter';
/**
 * Search for block in the global inserter
 *
 * @param {string} searchTerm The text to search the inserter for.
 */

export function searchForBlock(_x) {
  return _searchForBlock.apply(this, arguments);
}

function _searchForBlock() {
  _searchForBlock = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(searchTerm) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return openGlobalBlockInserter();

          case 2:
            _context.next = 4;
            return page.keyboard.type(searchTerm);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _searchForBlock.apply(this, arguments);
}
//# sourceMappingURL=search-for-block.js.map