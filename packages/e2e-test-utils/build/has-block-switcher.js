"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasBlockSwitcher = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Returns a boolean indicating if the current selected block has a block switcher or not.
 *
 * @return {Promise} Promise resolving with a boolean.
 */
var hasBlockSwitcher =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", page.evaluate(function (blockSwitcherSelector) {
              return !!document.querySelector(blockSwitcherSelector);
            }, '.block-editor-block-toolbar .block-editor-block-switcher'));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function hasBlockSwitcher() {
    return _ref.apply(this, arguments);
  };
}();

exports.hasBlockSwitcher = hasBlockSwitcher;
//# sourceMappingURL=has-block-switcher.js.map