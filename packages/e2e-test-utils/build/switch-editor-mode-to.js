"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchEditorModeTo = switchEditorModeTo;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Switches editor mode.
 *
 * @param {string} mode String editor mode.
 */
function switchEditorModeTo(_x) {
  return _switchEditorModeTo.apply(this, arguments);
}

function _switchEditorModeTo() {
  _switchEditorModeTo = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(mode) {
    var _ref, _ref2, button;

    return _regenerator.default.wrap(function _callee$(_context) {
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
            _ref2 = (0, _slicedToArray2.default)(_ref, 1);
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