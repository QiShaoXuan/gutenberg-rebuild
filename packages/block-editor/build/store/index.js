"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.storeConfig = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _data = require("@wordpress/data");

var _reducer = _interopRequireDefault(require("./reducer"));

var _middlewares = _interopRequireDefault(require("./middlewares"));

var selectors = _interopRequireWildcard(require("./selectors"));

var actions = _interopRequireWildcard(require("./actions"));

var _controls = _interopRequireDefault(require("./controls"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Module Constants
 */
var MODULE_KEY = 'core/block-editor';
var storeConfig = {
  reducer: _reducer.default,
  selectors: selectors,
  actions: actions,
  controls: _controls.default
};
exports.storeConfig = storeConfig;
var store = (0, _data.registerStore)(MODULE_KEY, (0, _objectSpread2.default)({}, storeConfig, {
  persist: ['preferences']
}));
(0, _middlewares.default)(store);
var _default = store;
exports.default = _default;
//# sourceMappingURL=index.js.map