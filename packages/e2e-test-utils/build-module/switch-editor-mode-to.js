import _regeneratorRuntime from "@babel/runtime/regenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Switches editor mode.
 *
 * @param {string} mode String editor mode.
 */
export function switchEditorModeTo(_x) {
  return _switchEditorModeTo.apply(this, arguments);
}

function _switchEditorModeTo() {
  _switchEditorModeTo = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(mode) {
    var _ref, _ref2, button;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.click('.edit-post-more-menu [aria-label="Show more tools & options"]');

          case 2:
            _context.next = 4;
            return page.$x("//button[contains(text(), '".concat(mode, " Editor')]"));

          case 4:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 1);
            button = _ref2[0];
            _context.next = 9;
            return button.click('button');

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _switchEditorModeTo.apply(this, arguments);
}
//# sourceMappingURL=switch-editor-mode-to.js.map