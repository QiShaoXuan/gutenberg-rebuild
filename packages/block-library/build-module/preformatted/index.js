import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock, getPhrasingContentSchema } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
export var name = 'core/preformatted';
export var settings = {
  title: __('Preformatted'),
  description: __('Add text that respects your spacing and tabs, and also allows styling.'),
  icon: icon,
  category: 'formatting',
  attributes: {
    content: {
      type: 'string',
      source: 'html',
      selector: 'pre',
      default: ''
    }
  },
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/code', 'core/paragraph'],
      transform: function transform(_ref) {
        var content = _ref.content;
        return createBlock('core/preformatted', {
          content: content
        });
      }
    }, {
      type: 'raw',
      isMatch: function isMatch(node) {
        return node.nodeName === 'PRE' && !(node.children.length === 1 && node.firstChild.nodeName === 'CODE');
      },
      schema: {
        pre: {
          children: getPhrasingContentSchema()
        }
      }
    }],
    to: [{
      type: 'block',
      blocks: ['core/paragraph'],
      transform: function transform(attributes) {
        return createBlock('core/paragraph', attributes);
      }
    }]
  },
  edit: edit,
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    var content = attributes.content;
    return createElement(RichText.Content, {
      tagName: "pre",
      value: content
    });
  },
  merge: function merge(attributes, attributesToMerge) {
    return {
      content: attributes.content + attributesToMerge.content
    };
  }
};
//# sourceMappingURL=index.js.map