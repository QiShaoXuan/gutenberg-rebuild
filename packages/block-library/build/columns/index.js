"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _deprecated = _interopRequireDefault(require("./deprecated"));

var _edit = _interopRequireDefault(require("./edit"));

var _icon = _interopRequireDefault(require("./icon"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/columns';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Columns'),
  icon: _icon.default,
  category: 'layout',
  attributes: {
    columns: {
      type: 'number',
      default: 2
    },
    verticalAlignment: {
      type: 'string'
    }
  },
  description: (0, _i18n.__)('Add a block that displays content in multiple columns, then add whatever content blocks you’d like.'),
  supports: {
    align: ['wide', 'full'],
    html: false
  },
  deprecated: _deprecated.default,
  edit: _edit.default,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var columns = attributes.columns,
        verticalAlignment = attributes.verticalAlignment;
    var wrapperClasses = (0, _classnames2.default)("has-".concat(columns, "-columns"), (0, _defineProperty2.default)({}, "are-vertically-aligned-".concat(verticalAlignment), verticalAlignment));
    return (0, _element.createElement)("div", {
      className: wrapperClasses
    }, (0, _element.createElement)(_blockEditor.InnerBlocks.Content, null));
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map