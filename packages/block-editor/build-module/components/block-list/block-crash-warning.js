import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import Warning from '../warning';
var warning = createElement(Warning, null, __('This block has encountered an error and cannot be previewed.'));
export default (function () {
  return warning;
});
//# sourceMappingURL=block-crash-warning.js.map