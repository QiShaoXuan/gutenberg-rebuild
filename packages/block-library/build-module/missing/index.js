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
export var name = 'core/missing';
export var settings = {
  name: name,
  category: 'common',
  title: __('Unrecognized Block'),
  description: __('Your site doesn’t include support for this block.'),
  supports: {
    className: false,
    customClassName: false,
    inserter: false,
    html: false,
    reusable: false
  },
  attributes: {
    originalName: {
      type: 'string'
    },
    originalUndelimitedContent: {
      type: 'string'
    },
    originalContent: {
      type: 'string',
      source: 'html'
    }
  },
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    // Preserve the missing block's content.
    return createElement(RawHTML, null, attributes.originalContent);
  }
};
//# sourceMappingURL=index.js.map