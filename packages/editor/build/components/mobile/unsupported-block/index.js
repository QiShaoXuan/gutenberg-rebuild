"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _edit = _interopRequireDefault(require("./edit"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'gmobile/unsupported';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Unsupported Block'),
  description: (0, _i18n.__)('Unsupported block type.'),
  icon: 'editor-code',
  category: 'formatting',
  attributes: {
    content: {
      type: 'string',
      source: 'html'
    }
  },
  supports: {
    className: false,
    customClassName: false
  },
  transforms: {},
  edit: _edit.default,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    return (0, _element.createElement)(_element.RawHTML, null, attributes.content);
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map