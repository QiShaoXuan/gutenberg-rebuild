import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * External dependencies
 */
import { sortBy, uniq } from 'lodash';
/**
 * Returns an array of strings with all inserter item titles.
 *
 * @return {Promise} Promise resolving with an array containing all inserter item titles.
 */

export function getAllBlockInserterItemTitles() {
  return _getAllBlockInserterItemTitles.apply(this, arguments);
}

function _getAllBlockInserterItemTitles() {
  _getAllBlockInserterItemTitles = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var inserterItemTitles;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.evaluate(function () {
              return Array.from(document.querySelectorAll('.block-editor-inserter__results .block-editor-block-types-list__item-title')).map(function (inserterItem) {
                return inserterItem.innerText;
              });
            });

          case 2:
            inserterItemTitles = _context.sent;
            return _context.abrupt("return", sortBy(uniq(inserterItemTitles)));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _getAllBlockInserterItemTitles.apply(this, arguments);
}
//# sourceMappingURL=get-all-block-inserter-item-titles.js.map