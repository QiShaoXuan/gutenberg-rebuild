"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishPostWithPrePublishChecksDisabled = publishPostWithPrePublishChecksDisabled;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Publishes the post without the pre-publish checks,
 * resolving once the request is complete (once a notice is displayed).
 *
 * @return {Promise} Promise resolving when publish is complete.
 */
function publishPostWithPrePublishChecksDisabled() {
  return _publishPostWithPrePublishChecksDisabled.apply(this, arguments);
}

function _publishPostWithPrePublishChecksDisabled() {
  _publishPostWithPrePublishChecksDisabled = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.click('.editor-post-publish-button');

          case 2:
            return _context.abrupt("return", page.waitForSelector('.components-notice.is-success'));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _publishPostWithPrePublishChecksDisabled.apply(this, arguments);
}
//# sourceMappingURL=publish-post-with-pre-publish-checks-disabled.js.map