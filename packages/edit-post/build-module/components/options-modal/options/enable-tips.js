/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import DeferredOption from './deferred';
export default compose(withSelect(function (select) {
  return {
    isChecked: select('core/nux').areTipsEnabled()
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/nux'),
      enableTips = _dispatch.enableTips,
      disableTips = _dispatch.disableTips;

  return {
    onChange: function onChange(isEnabled) {
      return isEnabled ? enableTips() : disableTips();
    }
  };
}))( // Using DeferredOption here means enableTips() is called when the Options
// modal is dismissed. This stops the NUX guide from appearing above the
// Options modal, which looks totally weird.
DeferredOption);
//# sourceMappingURL=enable-tips.js.map