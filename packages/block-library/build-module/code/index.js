import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
export var name = 'core/code';
export var settings = {
  title: __('Code'),
  description: __('Display code snippets that respect your spacing and tabs.'),
  icon: icon,
  category: 'formatting',
  attributes: {
    content: {
      type: 'string',
      source: 'text',
      selector: 'code'
    }
  },
  supports: {
    html: false
  },
  transforms: {
    from: [{
      type: 'enter',
      regExp: /^```$/,
      transform: function transform() {
        return createBlock('core/code');
      }
    }, {
      type: 'raw',
      isMatch: function isMatch(node) {
        return node.nodeName === 'PRE' && node.children.length === 1 && node.firstChild.nodeName === 'CODE';
      },
      schema: {
        pre: {
          children: {
            code: {
              children: {
                '#text': {}
              }
            }
          }
        }
      }
    }]
  },
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    return createElement("pre", null, createElement("code", null, attributes.content));
  }
};
//# sourceMappingURL=index.js.map