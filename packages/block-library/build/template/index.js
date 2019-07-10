"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _icon = _interopRequireDefault(require("./icon"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/template';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Reusable Template'),
  category: 'reusable',
  description: (0, _i18n.__)('Template block used as a container.'),
  icon: _icon.default,
  supports: {
    customClassName: false,
    html: false,
    inserter: false
  },
  edit: function edit() {
    return (0, _element.createElement)(_blockEditor.InnerBlocks, null);
  },
  save: function save() {
    return (0, _element.createElement)(_blockEditor.InnerBlocks.Content, null);
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map