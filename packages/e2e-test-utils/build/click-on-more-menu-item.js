"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clickOnMoreMenuItem = clickOnMoreMenuItem;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * Clicks on More Menu item, searches for the button with the text provided and clicks it.
 *
 * @param {string} buttonLabel The label to search the button for.
 */
function clickOnMoreMenuItem(_x) {
  return _clickOnMoreMenuItem.apply(this, arguments);
}

function _clickOnMoreMenuItem() {
  _clickOnMoreMenuItem = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(buttonLabel) {
    var moreMenuContainerSelector, elementToClick;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return expect(page).toClick('.edit-post-more-menu [aria-label="Show more tools & options"]');

          case 2:
            moreMenuContainerSelector = '//*[contains(concat(" ", @class, " "), " edit-post-more-menu__content ")]';
            _context.t0 = _lodash.first;
            _context.next = 6;
            return page.$x("".concat(moreMenuContainerSelector, "//button[contains(text(), \"").concat(buttonLabel, "\")]"));

          case 6:
            _context.t1 = _context.sent;
            elementToClick = (0, _context.t0)(_context.t1);

            if (elementToClick) {
              _context.next = 14;
              break;
            }

            _context.t2 = _lodash.first;
            _context.next = 12;
            return page.$x(moreMenuContainerSelector + '//button' + "/*[contains(concat(\" \", @class, \" \"), \" components-menu-item__info-wrapper \")][contains(text(), \"".concat(buttonLabel, "\")]"));

          case 12:
            _context.t3 = _context.sent;
            elementToClick = (0, _context.t2)(_context.t3);

          case 14:
            _context.next = 16;
            return elementToClick.click();

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _clickOnMoreMenuItem.apply(this, arguments);
}
//# sourceMappingURL=click-on-more-menu-item.js.map