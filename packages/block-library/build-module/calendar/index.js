/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import edit from './edit';
export var name = 'core/calendar';
export var settings = {
  title: __('Calendar'),
  description: __('A calendar of your site’s posts.'),
  icon: 'calendar',
  category: 'widgets',
  keywords: [__('posts'), __('archive')],
  supports: {
    align: true
  },
  edit: edit
};
//# sourceMappingURL=index.js.map