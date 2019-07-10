"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _blockEditor = require("@wordpress/block-editor");

var _edit = _interopRequireDefault(require("./edit"));

var _icon = _interopRequireDefault(require("./icon"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/subhead';
exports.name = name;
var settings = {
  title: (0, _i18n.__)('Subheading (deprecated)'),
  description: (0, _i18n.__)('This block is deprecated. Please use the Paragraph block instead.'),
  icon: _icon.default,
  category: 'common',
  supports: {
    // Hide from inserter as this block is deprecated.
    inserter: false,
    multiple: false
  },
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: 'p'
    },
    align: {
      type: 'string'
    }
  },
  transforms: {
    to: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(attributes) {
        return (0, _blocks.createBlock)('core/paragraph', attributes);
      }
    }]
  },
  edit: _edit.default,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var align = attributes.align,
        content = attributes.content;
    return (0, _element.createElement)(_blockEditor.RichText.Content, {
      tagName: "p",
      style: {
        textAlign: align
      },
      value: content
    });
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map