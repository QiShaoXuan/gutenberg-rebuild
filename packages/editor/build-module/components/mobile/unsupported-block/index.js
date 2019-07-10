import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
/**
 * Internal dependencies
 */

import edit from './edit';
export var name = 'gmobile/unsupported';
export var settings = {
  title: __('Unsupported Block'),
  description: __('Unsupported block type.'),
  icon: 'editor-code',
  category: 'formatting',
  attributes: {
    content: {
      type: 'string',
      source: 'html'
    }
  },
  supports: {
    className: false,
    customClassName: false
  },
  transforms: {},
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    return createElement(RawHTML, null, attributes.content);
  }
};
//# sourceMappingURL=index.js.map