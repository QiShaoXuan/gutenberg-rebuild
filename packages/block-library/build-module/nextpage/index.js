import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
export var name = 'core/nextpage';
export var settings = {
  title: __('Page Break'),
  description: __('Separate your content into a multi-page experience.'),
  icon: icon,
  category: 'layout',
  keywords: [__('next page'), __('pagination')],
  supports: {
    customClassName: false,
    className: false,
    html: false
  },
  attributes: {},
  transforms: {
    from: [{
      type: 'raw',
      schema: {
        'wp-block': {
          attributes: ['data-block']
        }
      },
      isMatch: function isMatch(node) {
        return node.dataset && node.dataset.block === 'core/nextpage';
      },
      transform: function transform() {
        return createBlock('core/nextpage', {});
      }
    }]
  },
  edit: edit,
  save: function save() {
    return createElement(RawHTML, null, '<!--nextpage-->');
  }
};
//# sourceMappingURL=index.js.map