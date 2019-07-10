"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _edit = _interopRequireDefault(require("./edit"));

var _icon = _interopRequireDefault(require("./icon"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/spacer';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Spacer'),
  description: (0, _i18n.__)('Add white space between blocks and customize its height.'),
  icon: _icon.default,
  category: 'layout',
  attributes: {
    height: {
      type: 'number',
      default: 100
    }
  },
  edit: _edit.default,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    return (0, _element.createElement)("div", {
      style: {
        height: attributes.height
      },
      "aria-hidden": true
    });
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map