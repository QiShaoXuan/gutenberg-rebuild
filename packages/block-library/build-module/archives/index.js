/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
export var name = 'core/archives';
export var settings = {
  title: __('Archives'),
  description: __('Display a monthly archive of your posts.'),
  icon: icon,
  category: 'widgets',
  supports: {
    align: true,
    html: false
  },
  edit: edit
};
//# sourceMappingURL=index.js.map