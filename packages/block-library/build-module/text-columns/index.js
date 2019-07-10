import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { get, times } from 'lodash';
/**
 * WordPress dependencies
 */

import { createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import edit from './edit';
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
var name = metadata.name;
export { metadata, name };
export var settings = {
  // Disable insertion as this block is deprecated and ultimately replaced by the Columns block.
  supports: {
    inserter: false
  },
  title: __('Text Columns (deprecated)'),
  description: __('This block is deprecated. Please use the Columns block instead.'),
  transforms: {
    to: [{
      type: 'block',
      blocks: ['core/columns'],
      transform: function transform(_ref) {
        var className = _ref.className,
            columns = _ref.columns,
            content = _ref.content,
            width = _ref.width;
        return createBlock('core/columns', {
          align: 'wide' === width || 'full' === width ? width : undefined,
          className: className,
          columns: columns
        }, content.map(function (_ref2) {
          var children = _ref2.children;
          return createBlock('core/column', {}, [createBlock('core/paragraph', {
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
  edit: edit,
  save: function save(_ref3) {
    var attributes = _ref3.attributes;
    var width = attributes.width,
        content = attributes.content,
        columns = attributes.columns;
    return createElement("div", {
      className: "align".concat(width, " columns-").concat(columns)
    }, times(columns, function (index) {
      return createElement("div", {
        className: "wp-block-column",
        key: "column-".concat(index)
      }, createElement(RichText.Content, {
        tagName: "p",
        value: get(content, [index, 'children'])
      }));
    }));
  }
};
//# sourceMappingURL=index.js.map