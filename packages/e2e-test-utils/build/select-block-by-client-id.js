"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectBlockByClientId = selectBlockByClientId;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Given the clientId of a block, selects the block on the editor.
 *
 * @param {string} clientId Identified of the block.
 */
function selectBlockByClientId(_x) {
  return _selectBlockByClientId.apply(this, arguments);
}

function _selectBlockByClientId() {
  _selectBlockByClientId = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(clientId) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.evaluate(function (id) {
              wp.data.dispatch('core/editor').selectBlock(id);
            }, clientId);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _selectBlockByClientId.apply(this, arguments);
}
//# sourceMappingURL=select-block-by-client-id.js.map