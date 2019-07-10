"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findSidebarPanelToggleButtonWithTitle = findSidebarPanelToggleButtonWithTitle;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * Finds a sidebar panel with the provided title.
 *
 * @param {string} panelTitle The name of sidebar panel.
 *
 * @return {?ElementHandle} Object that represents an in-page DOM element.
 */
function findSidebarPanelToggleButtonWithTitle(_x) {
  return _findSidebarPanelToggleButtonWithTitle.apply(this, arguments);
}

function _findSidebarPanelToggleButtonWithTitle() {
  _findSidebarPanelToggleButtonWithTitle = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(panelTitle) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _lodash.first;
            _context.next = 3;
            return page.$x("//div[contains(@class,\"edit-post-sidebar\")]//button[@class=\"components-button components-panel__body-toggle\"][contains(text(),\"".concat(panelTitle, "\")]"));

          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt("return", (0, _context.t0)(_context.t1));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _findSidebarPanelToggleButtonWithTitle.apply(this, arguments);
}
//# sourceMappingURL=find-sidebar-panel-toggle-button-with-title.js.map