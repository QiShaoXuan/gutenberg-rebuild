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
var name = 'core/freeform';
exports.name = name;
var settings = {
  title: (0, _i18n._x)('Classic', 'block title'),
  description: (0, _i18n.__)('Use the classic WordPress editor.'),
  icon: _icon.default,
  category: 'formatting',
  attributes: {
    content: {
      type: 'string',
      source: 'html'
    }
  },
  supports: {
    className: false,
    customClassName: false,
    // Hide 'Add to Reusable Blocks' on Classic blocks. Showing it causes a
    // confusing UX, because of its similarity to the 'Convert to Blocks' button.
    reusable: false
  },
  edit: _edit.default,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var content = attributes.content;
    return (0, _element.createElement)(_element.RawHTML, null, content);
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map