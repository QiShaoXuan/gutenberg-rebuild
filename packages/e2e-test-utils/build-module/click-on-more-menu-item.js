import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * External dependencies
 */
import { first } from 'lodash';
/**
 * Clicks on More Menu item, searches for the button with the text provided and clicks it.
 *
 * @param {string} buttonLabel The label to search the button for.
 */

export function clickOnMoreMenuItem(_x) {
  return _clickOnMoreMenuItem.apply(this, arguments);
}

function _clickOnMoreMenuItem() {
  _clickOnMoreMenuItem = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(buttonLabel) {
    var moreMenuContainerSelector, elementToClick;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return expect(page).toClick('.edit-post-more-menu [aria-label="Show more tools & options"]');

          case 2:
            moreMenuContainerSelector = '//*[contains(concat(" ", @class, " "), " edit-post-more-menu__content ")]';
            _context.t0 = first;
            _context.next = 6;
            return page.$x("".concat(moreMenuContainerSelector, "//button[contains(text(), \"").concat(buttonLabel, "\")]"));

          case 6:
            _context.t1 = _context.sent;
            elementToClick = (0, _context.t0)(_context.t1);

            if (elementToClick) {
              _context.next = 14;
              break;
            }

            _context.t2 = first;
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