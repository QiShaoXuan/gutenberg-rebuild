import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
export var name = 'core/spacer';
export var settings = {
  title: __('Spacer'),
  description: __('Add white space between blocks and customize its height.'),
  icon: icon,
  category: 'layout',
  attributes: {
    height: {
      type: 'number',
      default: 100
    }
  },
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    return createElement("div", {
      style: {
        height: attributes.height
      },
      "aria-hidden": true
    });
  }
};
//# sourceMappingURL=index.js.map