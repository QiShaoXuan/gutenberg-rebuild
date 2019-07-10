"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createJSONResponse = createJSONResponse;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _getJsonResponse = require("../shared/get-json-response");

/**
 * Internal dependencies
 */

/**
 * Respond to a request with a JSON response.
 *
 * @param {string} mockResponse The mock object to wrap in a JSON response.
 * @return {Promise} Promise that responds to a request with the mock JSON response.
 */
function createJSONResponse(mockResponse) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(request) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", request.respond((0, _getJsonResponse.getJSONResponse)(mockResponse)));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()
  );
}
//# sourceMappingURL=create-json-response.js.map