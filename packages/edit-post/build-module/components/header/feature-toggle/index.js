import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { flow } from 'lodash';
/**
 * WordPress dependencies
 */

import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { MenuItem, withSpokenMessages } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function FeatureToggle(_ref) {
  var onToggle = _ref.onToggle,
      isActive = _ref.isActive,
      label = _ref.label,
      info = _ref.info,
      messageActivated = _ref.messageActivated,
      messageDeactivated = _ref.messageDeactivated,
      speak = _ref.speak;

  var speakMessage = function speakMessage() {
    if (isActive) {
      speak(messageDeactivated || __('Feature deactivated'));
    } else {
      speak(messageActivated || __('Feature activated'));
    }
  };

  return createElement(MenuItem, {
    icon: isActive && 'yes',
    isSelected: isActive,
    onClick: flow(onToggle, speakMessage),
    role: "menuitemcheckbox",
    info: info
  }, label);
}

export default compose([withSelect(function (select, _ref2) {
  var feature = _ref2.feature;
  return {
    isActive: select('core/edit-post').isFeatureActive(feature)
  };
}), withDispatch(function (dispatch, ownProps) {
  return {
    onToggle: function onToggle() {
      dispatch('core/edit-post').toggleFeature(ownProps.feature);
    }
  };
}), withSpokenMessages])(FeatureToggle);
//# sourceMappingURL=index.js.map