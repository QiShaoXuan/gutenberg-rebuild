"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = require("@wordpress/data");

var _reducer = _interopRequireDefault(require("./reducer"));

var _middlewares = _interopRequireDefault(require("./middlewares"));

var actions = _interopRequireWildcard(require("./actions"));

var selectors = _interopRequireWildcard(require("./selectors"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var store = (0, _data.registerStore)('core/edit-post', {
  reducer: _reducer.default,
  actions: actions,
  selectors: selectors,
  persist: ['preferences']
});
(0, _middlewares.default)(store); // Do not dispatch INIT for mobile as its effect currently only deals with
// setting up the sidebar and we don't need/support it at the moment for mobile

var _default = store;
exports.default = _default;
//# sourceMappingURL=index.native.js.map