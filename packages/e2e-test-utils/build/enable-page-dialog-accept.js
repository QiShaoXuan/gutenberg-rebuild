"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enablePageDialogAccept = enablePageDialogAccept;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Callback which automatically accepts dialog.
 *
 * @param {puppeteer.Dialog} dialog Dialog object dispatched by page via the 'dialog' event.
 */
function acceptPageDialog(_x) {
  return _acceptPageDialog.apply(this, arguments);
}
/**
 * Enables even listener which accepts a page dialog which
 * may appear when navigating away from Gutenberg.
 */


function _acceptPageDialog() {
  _acceptPageDialog = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(dialog) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return dialog.accept();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _acceptPageDialog.apply(this, arguments);
}

function enablePageDialogAccept() {
  page.on('dialog', acceptPageDialog);
}
//# sourceMappingURL=enable-page-dialog-accept.js.map