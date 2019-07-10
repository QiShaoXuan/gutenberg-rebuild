"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAvailableBlockTransforms = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _hasBlockSwitcher = require("./has-block-switcher");

/**
 * Internal dependencies
 */

/**
 * Returns an array of strings with all block titles,
 * that the current selected block can be transformed into.
 *
 * @return {Promise} Promise resolving with an array containing all possible block transforms
 */
var getAvailableBlockTransforms =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _hasBlockSwitcher.hasBlockSwitcher)();

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

exports.getAvailableBlockTransforms = getAvailableBlockTransforms;
//# sourceMappingURL=get-available-block-transforms.js.map