"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _i18n = require("@wordpress/i18n");

var _edit = _interopRequireDefault(require("./edit"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/search';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Search'),
  description: (0, _i18n.__)('Help visitors find your content.'),
  icon: 'search',
  category: 'widgets',
  keywords: [(0, _i18n.__)('find')],
  supports: {
    align: true
  },
  edit: _edit.default
};
exports.settings = settings;
//# sourceMappingURL=index.js.map