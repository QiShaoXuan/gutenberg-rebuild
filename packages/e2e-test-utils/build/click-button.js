"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clickButton = clickButton;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Clicks a button based on the text on the button.
 *
 * @param {string} buttonText The text that appears on the button to click.
 */
function clickButton(_x) {
  return _clickButton.apply(this, arguments);
}

function _clickButton() {
  _clickButton = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(buttonText) {
    var button;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.waitForXPath("//button[contains(text(), '".concat(buttonText, "')]"));

          case 2:
            button = _context.sent;
            _context.next = 5;
            return button.click();

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _clickButton.apply(this, arguments);
}
//# sourceMappingURL=click-button.js.map