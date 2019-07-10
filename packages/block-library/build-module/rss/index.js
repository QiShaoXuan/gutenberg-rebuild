/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import edit from './edit';
export var name = 'core/rss';
export var settings = {
  title: __('RSS'),
  description: __('Display entries from any RSS or Atom feed.'),
  icon: 'rss',
  category: 'widgets',
  keywords: [__('atom'), __('feed')],
  supports: {
    align: true,
    html: false
  },
  edit: edit
};
//# sourceMappingURL=index.js.map