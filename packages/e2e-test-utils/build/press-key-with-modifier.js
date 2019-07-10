"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pressKeyWithModifier = pressKeyWithModifier;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _keycodes = require("@wordpress/keycodes");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Performs a key press with modifier (Shift, Control, Meta, Alt), where each modifier
 * is normalized to platform-specific modifier.
 *
 * @param {string} modifier Modifier key.
 * @param {string} key Key to press while modifier held.
 */
function pressKeyWithModifier(_x, _x2) {
  return _pressKeyWithModifier.apply(this, arguments);
}

function _pressKeyWithModifier() {
  _pressKeyWithModifier = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(modifier, key) {
    var isAppleOS, overWrittenModifiers, mappedModifiers, ctrlSwap;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isAppleOS = function isAppleOS() {
              return process.platform === 'darwin';
            };

            overWrittenModifiers = (0, _objectSpread2.default)({}, _keycodes.modifiers, {
              shiftAlt: function shiftAlt(_isApple) {
                return _isApple() ? [_keycodes.SHIFT, _keycodes.ALT] : [_keycodes.SHIFT, _keycodes.CTRL];
              }
            });
            mappedModifiers = overWrittenModifiers[modifier](isAppleOS);

            ctrlSwap = function ctrlSwap(mod) {
              return mod === _keycodes.CTRL ? 'control' : mod;
            };

            _context3.next = 6;
            return Promise.all(mappedModifiers.map(
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(mod) {
                var capitalizedMod;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        capitalizedMod = (0, _lodash.capitalize)(ctrlSwap(mod));
                        return _context.abrupt("return", page.keyboard.down(capitalizedMod));

                      case 2:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 6:
            _context3.next = 8;
            return page.keyboard.press(key);

          case 8:
            _context3.next = 10;
            return Promise.all(mappedModifiers.map(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee2(mod) {
                var capitalizedMod;
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        capitalizedMod = (0, _lodash.capitalize)(ctrlSwap(mod));
                        return _context2.abrupt("return", page.keyboard.up(capitalizedMod));

                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _pressKeyWithModifier.apply(this, arguments);
}
//# sourceMappingURL=press-key-with-modifier.js.map