"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishPost = publishPost;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _openPublishPanel = require("./open-publish-panel");

/**
 * Internal dependencies
 */

/**
 * Publishes the post, resolving once the request is complete (once a notice
 * is displayed).
 *
 * @return {Promise} Promise resolving when publish is complete.
 */
function publishPost() {
  return _publishPost.apply(this, arguments);
}

function _publishPost() {
  _publishPost = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _openPublishPanel.openPublishPanel)();

          case 2:
            _context.next = 4;
            return page.click('.editor-post-publish-button');

          case 4:
            return _context.abrupt("return", page.waitForSelector('.components-notice.is-success'));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _publishPost.apply(this, arguments);
}
//# sourceMappingURL=publish-post.js.map