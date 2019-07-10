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
var name = 'core/rss';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('RSS'),
  description: (0, _i18n.__)('Display entries from any RSS or Atom feed.'),
  icon: 'rss',
  category: 'widgets',
  keywords: [(0, _i18n.__)('atom'), (0, _i18n.__)('feed')],
  supports: {
    align: true,
    html: false
  },
  edit: _edit.default
};
exports.settings = settings;
//# sourceMappingURL=index.js.map