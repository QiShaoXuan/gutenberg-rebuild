import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View } from 'react-native';
import Hr from 'react-native-hr';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import styles from './editor.scss';
export default function NextPageEdit(_ref) {
  var attributes = _ref.attributes;
  var _attributes$customTex = attributes.customText,
      customText = _attributes$customTex === void 0 ? __('Page break') : _attributes$customTex;
  return createElement(View, {
    style: styles['block-library-nextpage__container']
  }, createElement(Hr, {
    text: customText,
    textStyle: styles['block-library-nextpage__text'],
    lineStyle: styles['block-library-nextpage__line']
  }));
}
//# sourceMappingURL=edit.native.js.map