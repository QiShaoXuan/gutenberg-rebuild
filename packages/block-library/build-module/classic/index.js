import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { RawHTML } from '@wordpress/element';
import { __, _x } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
export var name = 'core/freeform';
export var settings = {
  title: _x('Classic', 'block title'),
  description: __('Use the classic WordPress editor.'),
  icon: icon,
  category: 'formatting',
  attributes: {
    content: {
      type: 'string',
      source: 'html'
    }
  },
  supports: {
    className: false,
    customClassName: false,
    // Hide 'Add to Reusable Blocks' on Classic blocks. Showing it causes a
    // confusing UX, because of its similarity to the 'Convert to Blocks' button.
    reusable: false
  },
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var content = attributes.content;
    return createElement(RawHTML, null, content);
  }
};
//# sourceMappingURL=index.js.map