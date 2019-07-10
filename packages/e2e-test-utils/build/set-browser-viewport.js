"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBrowserViewport = setBrowserViewport;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _waitForWindowDimensions = require("./wait-for-window-dimensions");

/**
 * Internal dependencies
 */

/**
 * Sets browser viewport to specified type.
 *
 * @param {string} type String to represent dimensions type; can be either small or large.
 */
function setBrowserViewport(_x) {
  return _setBrowserViewport.apply(this, arguments);
}

function _setBrowserViewport() {
  _setBrowserViewport = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(type) {
    var allowedDimensions, currentDimension;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            allowedDimensions = {
              large: {
                width: 960,
                height: 700
              },
              small: {
                width: 600,
                height: 700
              }
            };
            currentDimension = allowedDimensions[type];
            _context.next = 4;
            return page.setViewport(currentDimension);

          case 4:
            _context.next = 6;
            return (0, _waitForWindowDimensions.waitForWindowDimensions)(currentDimension.width, currentDimension.height);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _setBrowserViewport.apply(this, arguments);
}
//# sourceMappingURL=set-browser-viewport.js.map