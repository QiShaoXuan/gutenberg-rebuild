"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockOrTransform = mockOrTransform;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _getJsonResponse = require("../shared/get-json-response");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Mocks a request with the supplied mock object, or allows it to run with an optional transform, based on the
 * deserialised JSON response for the request.
 *
 * @param {function} mockCheck function that returns true if the request should be mocked.
 * @param {Object} mock A mock object to wrap in a JSON response, if the request should be mocked.
 * @param {function|undefined} responseObjectTransform An optional function that transforms the response's object before the response is used.
 * @return {Promise} Promise that uses `mockCheck` to see if a request should be mocked with `mock`, and optionally transforms the response with `responseObjectTransform`.
 */
function mockOrTransform(mockCheck, mock) {
  var responseObjectTransform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (obj) {
    return obj;
  };
  return (
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(request) {
        var response, responseObject;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _nodeFetch.default)(request.url(), {
                  headers: request.headers(),
                  method: request.method(),
                  body: request.postData()
                });

              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.json();

              case 5:
                responseObject = _context.sent;

                if (mockCheck(responseObject)) {
                  request.respond((0, _getJsonResponse.getJSONResponse)(mock));
                } else {
                  request.respond((0, _getJsonResponse.getJSONResponse)(responseObjectTransform(responseObject)));
                }

              case 7:
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
//# sourceMappingURL=mock-or-transform.js.map