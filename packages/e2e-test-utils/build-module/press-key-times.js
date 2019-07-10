import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * External dependencies
 */
import { times } from 'lodash';
/**
 * Given an array of functions, each returning a promise, performs all
 * promises in sequence (waterfall) order.
 *
 * @param {Function[]} sequence Array of promise creators.
 *
 * @return {Promise} Promise resolving once all in the sequence complete.
 */

function promiseSequence(_x) {
  return _promiseSequence.apply(this, arguments);
}
/**
 * Presses the given keyboard key a number of times in sequence.
 *
 * @param {string} key   Key to press.
 * @param {number} count Number of times to press.
 *
 * @return {Promise} Promise resolving when key presses complete.
 */


function _promiseSequence() {
  _promiseSequence = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(sequence) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", sequence.reduce(function (current, next) {
              return current.then(next);
            }, Promise.resolve()));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _promiseSequence.apply(this, arguments);
}

export function pressKeyTimes(_x2, _x3) {
  return _pressKeyTimes.apply(this, arguments);
}

function _pressKeyTimes() {
  _pressKeyTimes = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(key, count) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", promiseSequence(times(count, function () {
              return function () {
                return page.keyboard.press(key);
              };
            })));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _pressKeyTimes.apply(this, arguments);
}
//# sourceMappingURL=press-key-times.js.map