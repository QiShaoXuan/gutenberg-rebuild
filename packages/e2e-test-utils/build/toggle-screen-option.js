"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleScreenOption = toggleScreenOption;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _clickOnMoreMenuItem = require("./click-on-more-menu-item");

/**
 * Internal dependencies
 */

/**
 * Toggles the screen option with the given label.
 *
 * @param {string}   label           The label of the screen option, e.g. 'Show Tips'.
 * @param {?boolean} shouldBeChecked If true, turns the option on. If false, off. If
 *                                   undefined, the option will be toggled.
 */
function toggleScreenOption(_x) {
  return _toggleScreenOption.apply(this, arguments);
}

function _toggleScreenOption() {
  _toggleScreenOption = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(label) {
    var shouldBeChecked,
        _ref,
        _ref2,
        handle,
        isChecked,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shouldBeChecked = _args.length > 1 && _args[1] !== undefined ? _args[1] : undefined;
            _context.next = 3;
            return (0, _clickOnMoreMenuItem.clickOnMoreMenuItem)('Options');

          case 3:
            _context.next = 5;
            return page.$x("//label[contains(text(), \"".concat(label, "\")]"));

          case 5:
            _ref = _context.sent;
            _ref2 = (0, _slicedToArray2.default)(_ref, 1);
            handle = _ref2[0];
            _context.next = 10;
            return page.evaluate(function (element) {
              return element.control.checked;
            }, handle);

          case 10:
            isChecked = _context.sent;

            if (!(isChecked !== shouldBeChecked)) {
              _context.next = 14;
              break;
            }

            _context.next = 14;
            return handle.click();

          case 14:
            _context.next = 16;
            return page.click('button[aria-label="Close dialog"]');

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _toggleScreenOption.apply(this, arguments);
}
//# sourceMappingURL=toggle-screen-option.js.map