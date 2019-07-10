import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { filter } from 'lodash';
/**
 * WordPress dependencies
 */

import { NoticeList } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import TemplateValidationNotice from '../template-validation-notice';
export function EditorNotices(_ref) {
  var dismissible = _ref.dismissible,
      notices = _ref.notices,
      props = _objectWithoutProperties(_ref, ["dismissible", "notices"]);

  if (dismissible !== undefined) {
    notices = filter(notices, {
      isDismissible: dismissible
    });
  }

  return createElement(NoticeList, _extends({
    notices: notices
  }, props), dismissible !== false && createElement(TemplateValidationNotice, null));
}
export default compose([withSelect(function (select) {
  return {
    notices: select('core/notices').getNotices()
  };
}), withDispatch(function (dispatch) {
  return {
    onRemove: dispatch('core/notices').removeNotice
  };
})])(EditorNotices);
//# sourceMappingURL=index.js.map