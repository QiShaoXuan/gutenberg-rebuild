import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { MenuGroup } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';
import { ifViewportMatches } from '@wordpress/viewport';
/**
 * Internal dependencies
 */

import FeatureToggle from '../feature-toggle';

function WritingMenu() {
  return createElement(MenuGroup, {
    label: _x('View', 'noun')
  }, createElement(FeatureToggle, {
    feature: "fixedToolbar",
    label: __('Top Toolbar'),
    info: __('Access all block and document tools in a single place'),
    messageActivated: __('Top toolbar activated'),
    messageDeactivated: __('Top toolbar deactivated')
  }), createElement(FeatureToggle, {
    feature: "focusMode",
    label: __('Spotlight Mode'),
    info: __('Focus on one block at a time'),
    messageActivated: __('Spotlight mode activated'),
    messageDeactivated: __('Spotlight mode deactivated')
  }), createElement(FeatureToggle, {
    feature: "fullscreenMode",
    label: __('Fullscreen Mode'),
    info: __('Work without distraction'),
    messageActivated: __('Fullscreen mode activated'),
    messageDeactivated: __('Fullscreen mode deactivated')
  }));
}

export default ifViewportMatches('medium')(WritingMenu);
//# sourceMappingURL=index.js.map