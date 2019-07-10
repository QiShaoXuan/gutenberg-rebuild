/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import edit from './edit';
export var name = 'core/search';
export var settings = {
  title: __('Search'),
  description: __('Help visitors find your content.'),
  icon: 'search',
  category: 'widgets',
  keywords: [__('find')],
  supports: {
    align: true
  },
  edit: edit
};
//# sourceMappingURL=index.js.map