"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJSONResponse = getJSONResponse;

/**
 * Get a JSON response for the passed in object, for use with `request.respond`.
 *
 * @param {Object} obj Object to seralise for response.
 * @return {Object} Response for use with `request.respond`.
 */
function getJSONResponse(obj) {
  return {
    content: 'application/json',
    body: JSON.stringify(obj)
  };
}
//# sourceMappingURL=get-json-response.js.map