import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import icon from './icon';
export var name = 'core/template';
export var settings = {
  title: __('Reusable Template'),
  category: 'reusable',
  description: __('Template block used as a container.'),
  icon: icon,
  supports: {
    customClassName: false,
    html: false,
    inserter: false
  },
  edit: function edit() {
    return createElement(InnerBlocks, null);
  },
  save: function save() {
    return createElement(InnerBlocks.Content, null);
  }
};
//# sourceMappingURL=index.js.map