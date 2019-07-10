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
var name = 'core/missing';
exports.name = name;
var settings = {
  name: name,
  category: 'common',
  title: (0, _i18n.__)('Unrecognized Block'),
  description: (0, _i18n.__)('Your site doesn’t include support for this block.'),
  supports: {
    className: false,
    customClassName: false,
    inserter: false,
    html: false,
    reusable: false
  },
  attributes: {
    originalName: {
      type: 'string'
    },
    originalUndelimitedContent: {
      type: 'string'
    },
    originalContent: {
      type: 'string',
      source: 'html'
    }
  },
  edit: _edit.default,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    // Preserve the missing block's content.
    return (0, _element.createElement)(_element.RawHTML, null, attributes.originalContent);
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map