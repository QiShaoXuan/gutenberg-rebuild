import _regeneratorRuntime from "@babel/runtime/regenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Internal dependencies
 */
import { clickOnMoreMenuItem } from './click-on-more-menu-item';
/**
 * Toggles the screen option with the given label.
 *
 * @param {string}   label           The label of the screen option, e.g. 'Show Tips'.
 * @param {?boolean} shouldBeChecked If true, turns the option on. If false, off. If
 *                                   undefined, the option will be toggled.
 */

export function toggleScreenOption(_x) {
  return _toggleScreenOption.apply(this, arguments);
}

function _toggleScreenOption() {
  _toggleScreenOption = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(label) {
    var shouldBeChecked,
        _ref,
        _ref2,
        handle,
        isChecked,
        _args = arguments;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            shouldBeChecked = _args.length > 1 && _args[1] !== undefined ? _args[1] : undefined;
            _context.next = 3;
            return clickOnMoreMenuItem('Options');

          case 3:
            _context.next = 5;
            return page.$x("//label[contains(text(), \"".concat(label, "\")]"));

          case 5:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 1);
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