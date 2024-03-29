import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Saves the post as a draft, resolving once the request is complete (once the
 * "Saved" indicator is displayed).
 *
 * @return {Promise} Promise resolving when draft save is complete.
 */
export function saveDraft() {
  return _saveDraft.apply(this, arguments);
}

function _saveDraft() {
  _saveDraft = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.click('.editor-post-save-draft');

          case 2:
            return _context.abrupt("return", page.waitForSelector('.editor-post-saved-state.is-saved'));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _saveDraft.apply(this, arguments);
}
//# sourceMappingURL=save-draft.js.map