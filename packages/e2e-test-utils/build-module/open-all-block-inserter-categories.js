import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Opens all block inserter categories.
 */
export function openAllBlockInserterCategories() {
  return _openAllBlockInserterCategories.apply(this, arguments);
}

function _openAllBlockInserterCategories() {
  _openAllBlockInserterCategories = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var notOppenedCategorySelector, categoryPanel;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            notOppenedCategorySelector = '.block-editor-inserter__results .components-panel__body:not(.is-opened)';
            _context.next = 3;
            return page.$(notOppenedCategorySelector);

          case 3:
            categoryPanel = _context.sent;

          case 4:
            if (!(categoryPanel !== null)) {
              _context.next = 12;
              break;
            }

            _context.next = 7;
            return categoryPanel.click();

          case 7:
            _context.next = 9;
            return page.$(notOppenedCategorySelector);

          case 9:
            categoryPanel = _context.sent;
            _context.next = 4;
            break;

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _openAllBlockInserterCategories.apply(this, arguments);
}
//# sourceMappingURL=open-all-block-inserter-categories.js.map