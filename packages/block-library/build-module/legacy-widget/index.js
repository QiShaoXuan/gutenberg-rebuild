/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import edit from './edit';
import icon from './icon';
export var name = 'core/legacy-widget';
export var settings = {
  title: __('Legacy Widget (Experimental)'),
  description: __('Display a legacy widget.'),
  icon: icon,
  category: 'widgets',
  supports: {
    html: false
  },
  edit: edit
};
//# sourceMappingURL=index.js.map