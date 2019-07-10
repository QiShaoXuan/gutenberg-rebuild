"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findSidebarPanelWithTitle = findSidebarPanelWithTitle;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * Finds the button responsible for toggling the sidebar panel with the provided title.
 *
 * @param {string} panelTitle The name of sidebar panel.
 *
 * @return {?ElementHandle} Object that represents an in-page DOM element.
 */
function findSidebarPanelWithTitle(_x) {
  return _findSidebarPanelWithTitle.apply(this, arguments);
}

function _findSidebarPanelWithTitle() {
  _findSidebarPanelWithTitle = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(panelTitle) {
    var classSelect, buttonSelector, panelSelector;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            classSelect = function classSelect(className) {
              return "[contains(concat(\" \", @class, \" \"), \" ".concat(className, " \")]");
            };

            buttonSelector = "//div".concat(classSelect('edit-post-sidebar'), "//button").concat(classSelect('components-button')).concat(classSelect('components-panel__body-toggle'), "[contains(text(),\"").concat(panelTitle, "\")]");
            panelSelector = "".concat(buttonSelector, "/ancestor::*[contains(concat(\" \", @class, \" \"), \" components-panel__body \")]");
            _context.t0 = _lodash.first;
            _context.next = 6;
            return page.$x(panelSelector);

          case 6:
            _context.t1 = _context.sent;
            return _context.abrupt("return", (0, _context.t0)(_context.t1));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _findSidebarPanelWithTitle.apply(this, arguments);
}
//# sourceMappingURL=find-sidebar-panel-with-title.js.map