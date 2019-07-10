"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = require("@wordpress/data");

var _reducer = _interopRequireDefault(require("./reducer"));

var selectors = _interopRequireWildcard(require("./selectors"));

var actions = _interopRequireWildcard(require("./actions"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Module Constants
 */
var MODULE_KEY = 'core/annotations';
var store = (0, _data.registerStore)(MODULE_KEY, {
  reducer: _reducer.default,
  selectors: selectors,
  actions: actions
});
var _default = store;
exports.default = _default;
//# sourceMappingURL=index.js.map