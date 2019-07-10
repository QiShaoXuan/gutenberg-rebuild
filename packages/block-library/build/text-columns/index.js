"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settings = exports.name = exports.metadata = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _blocks = require("@wordpress/blocks");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _edit = _interopRequireDefault(require("./edit"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Internal dependencies
 */
var metadata = {
  name: "core/text-columns",
  icon: "columns",
  category: "layout",
  attributes: {
    content: {
      type: "array",
      source: "query",
      selector: "p",
      query: {
        children: {
          type: "string",
          source: "html"
        }
      },
      "default": [{}, {}]
    },
    columns: {
      type: "number",
      "default": 2
    },
    width: {
      type: "string"
    }
  }
};
exports.metadata = metadata;
var name = metadata.name;
exports.name = name;
var settings = {
  // Disable insertion as this block is deprecated and ultimately replaced by the Columns block.
  supports: {
    inserter: false
  },
  title: (0, _i18n.__)('Text Columns (deprecated)'),
  description: (0, _i18n.__)('This block is deprecated. Please use the Columns block instead.'),
  transforms: {
    to: [{
      type: 'block',
      blocks: ['core/columns'],
      transform: function transform(_ref) {
        var className = _ref.className,
            columns = _ref.columns,
            content = _ref.content,
            width = _ref.width;
        return (0, _blocks.createBlock)('core/columns', {
          align: 'wide' === width || 'full' === width ? width : undefined,
          className: className,
          columns: columns
        }, content.map(function (_ref2) {
          var children = _ref2.children;
          return (0, _blocks.createBlock)('core/column', {}, [(0, _blocks.createBlock)('core/paragraph', {
            content: children
          })]);
        }));
      }
    }]
  },
  getEditWrapperProps: function getEditWrapperProps(attributes) {
    var width = attributes.width;

    if ('wide' === width || 'full' === width) {
      return {
        'data-align': width
      };
    }
  },
  edit: _edit.default,
  save: function save(_ref3) {
    var attributes = _ref3.attributes;
    var width = attributes.width,
        content = attributes.content,
        columns = attributes.columns;
    return (0, _element.createElement)("div", {
      className: "align".concat(width, " columns-").concat(columns)
    }, (0, _lodash.times)(columns, function (index) {
      return (0, _element.createElement)("div", {
        className: "wp-block-column",
        key: "column-".concat(index)
      }, (0, _element.createElement)(_blockEditor.RichText.Content, {
        tagName: "p",
        value: (0, _lodash.get)(content, [index, 'children'])
      }));
    }));
  }
};
exports.settings = settings;
//# sourceMappingURL=index.js.map