/**
 * External dependencies
 */
import { some, castArray } from 'lodash';
/**
 * WordPress dependencies
 */

import { withSelect } from '@wordpress/data';
/**
 * A component which renders its own children only if the current editor post
 * type supports one of the given `supportKeys` prop.
 *
 * @param {?Object}           props.postType    Current post type.
 * @param {WPElement}         props.children    Children to be rendered if post
 *                                              type supports.
 * @param {(string|string[])} props.supportKeys String or string array of keys
 *                                              to test.
 *
 * @return {WPElement} Rendered element.
 */

export function PostTypeSupportCheck(_ref) {
  var postType = _ref.postType,
      children = _ref.children,
      supportKeys = _ref.supportKeys;
  var isSupported = true;

  if (postType) {
    isSupported = some(castArray(supportKeys), function (key) {
      return !!postType.supports[key];
    });
  }

  if (!isSupported) {
    return null;
  }

  return children;
}
export default withSelect(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute;

  var _select2 = select('core'),
      getPostType = _select2.getPostType;

  return {
    postType: getPostType(getEditedPostAttribute('type'))
  };
})(PostTypeSupportCheck);
//# sourceMappingURL=index.js.map