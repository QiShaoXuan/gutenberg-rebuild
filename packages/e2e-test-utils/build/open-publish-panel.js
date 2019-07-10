"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openPublishPanel = openPublishPanel;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Opens the publish panel.
 */
function openPublishPanel() {
  return _openPublishPanel.apply(this, arguments);
}

function _openPublishPanel() {
  _openPublishPanel = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.click('.editor-post-publish-panel__toggle');

          case 2:
            _context.next = 4;
            return page.waitFor(100);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _openPublishPanel.apply(this, arguments);
}
//# sourceMappingURL=open-publish-panel.js.map