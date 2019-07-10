import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
export var name = 'core/subhead';
export var settings = {
  title: __('Subheading (deprecated)'),
  description: __('This block is deprecated. Please use the Paragraph block instead.'),
  icon: icon,
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
        return createBlock('core/paragraph', attributes);
      }
    }]
  },
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var align = attributes.align,
        content = attributes.content;
    return createElement(RichText.Content, {
      tagName: "p",
      style: {
        textAlign: align
      },
      value: content
    });
  }
};
//# sourceMappingURL=index.js.map