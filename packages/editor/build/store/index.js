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

var selectors = _interopRequireWildcard(require("./selectors"));

var actions = _interopRequireWildcard(require("./actions"));

var _controls = _interopRequireDefault(require("./controls"));

var _constants = require("./constants");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var store = (0, _data.registerStore)(_constants.STORE_KEY, {
  reducer: _reducer.default,
  selectors: selectors,
  actions: actions,
  controls: _controls.default,
  persist: ['preferences']
});
(0, _middlewares.default)(store);
var _default = store;
exports.default = _default;
//# sourceMappingURL=index.js.map