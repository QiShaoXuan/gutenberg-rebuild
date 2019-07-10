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
export var name = 'core/separator';
export var settings = {
  title: __('Separator'),
  description: __('Create a break between ideas or sections with a horizontal separator.'),
  icon: icon,
  category: 'layout',
  keywords: [__('horizontal-line'), 'hr', __('divider')],
  styles: [{
    name: 'default',
    label: __('Default'),
    isDefault: true
  }, {
    name: 'wide',
    label: __('Wide Line')
  }, {
    name: 'dots',
    label: __('Dots')
  }],
  transforms: {
    from: [{
      type: 'enter',
      regExp: /^-{3,}$/,
      transform: function transform() {
        return createBlock('core/separator');
      }
    }, {
      type: 'raw',
      selector: 'hr',
      schema: {
        hr: {}
      }
    }]
  },
  edit: edit,
  save: function save() {
    return createElement("hr", null);
  }
};
//# sourceMappingURL=index.js.map