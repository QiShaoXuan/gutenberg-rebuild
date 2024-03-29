import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Internal dependencies
 */
import { hasBlockSwitcher } from './has-block-switcher';
/**
 * Returns an array of strings with all block titles,
 * that the current selected block can be transformed into.
 *
 * @return {Promise} Promise resolving with an array containing all possible block transforms
 */

export var getAvailableBlockTransforms =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return hasBlockSwitcher();

          case 2:
            if (_context.sent) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", []);

          case 4:
            _context.next = 6;
            return page.click('.block-editor-block-toolbar .block-editor-block-switcher');

          case 6:
            return _context.abrupt("return", page.evaluate(function (buttonSelector) {
              return Array.from(document.querySelectorAll(buttonSelector)).map(function (button) {
                return button.getAttribute('aria-label');
              });
            }, '.block-editor-block-types-list .block-editor-block-types-list__list-item button'));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getAvailableBlockTransforms() {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=get-available-block-transforms.js.map