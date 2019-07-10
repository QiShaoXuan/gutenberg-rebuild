"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clickOnCloseModalButton = clickOnCloseModalButton;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Click on the close button of an open modal.
 *
 * @param {?string} modalClassName Class name for the modal to close
 */
function clickOnCloseModalButton(_x) {
  return _clickOnCloseModalButton.apply(this, arguments);
}

function _clickOnCloseModalButton() {
  _clickOnCloseModalButton = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(modalClassName) {
    var closeButtonClassName, closeButton;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            closeButtonClassName = '.components-modal__header .components-icon-button';

            if (modalClassName) {
              closeButtonClassName = "".concat(modalClassName, " ").concat(closeButtonClassName);
            }

            _context.next = 4;
            return page.$(closeButtonClassName);

          case 4:
            closeButton = _context.sent;

            if (!closeButton) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return page.click(closeButtonClassName);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _clickOnCloseModalButton.apply(this, arguments);
}
//# sourceMappingURL=click-on-close-modal-button.js.map