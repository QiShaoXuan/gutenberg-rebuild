import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Internal dependencies
 */
import { waitForWindowDimensions } from './wait-for-window-dimensions';
/**
 * Sets browser viewport to specified type.
 *
 * @param {string} type String to represent dimensions type; can be either small or large.
 */

export function setBrowserViewport(_x) {
  return _setBrowserViewport.apply(this, arguments);
}

function _setBrowserViewport() {
  _setBrowserViewport = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(type) {
    var allowedDimensions, currentDimension;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
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
            return waitForWindowDimensions(currentDimension.width, currentDimension.height);

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