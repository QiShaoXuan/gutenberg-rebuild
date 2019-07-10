"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arePrePublishChecksEnabled = arePrePublishChecksEnabled;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Verifies if publish checks are enabled.
 * @return {boolean} Boolean which represents the state of prepublish checks.
 */
function arePrePublishChecksEnabled() {
  return _arePrePublishChecksEnabled.apply(this, arguments);
}

function _arePrePublishChecksEnabled() {
  _arePrePublishChecksEnabled = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", page.evaluate(function () {
              return window.wp.data.select('core/editor').isPublishSidebarEnabled();
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _arePrePublishChecksEnabled.apply(this, arguments);
}
//# sourceMappingURL=are-pre-publish-checks-enabled.js.map