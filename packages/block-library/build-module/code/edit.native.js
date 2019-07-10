import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import { PlainText } from '@wordpress/block-editor';
/**
 * Block code style
 */

import styles from './theme.scss'; // Note: styling is applied directly to the (nested) PlainText component. Web-side components
// apply it to the container 'div' but we don't have a proper proposal for cascading styling yet.

export default function CodeEdit(props) {
  var attributes = props.attributes,
      setAttributes = props.setAttributes,
      style = props.style,
      onFocus = props.onFocus,
      onBlur = props.onBlur;
  return createElement(View, null, createElement(PlainText, {
    value: attributes.content,
    style: [style, styles.blockCode],
    multiline: true,
    underlineColorAndroid: "transparent",
    onChange: function onChange(content) {
      return setAttributes({
        content: content
      });
    },
    placeholder: __('Write code…'),
    "aria-label": __('Code'),
    isSelected: props.isSelected,
    onFocus: onFocus,
    onBlur: onBlur,
    fontFamily: styles.blockCode.fontFamily
  }));
}
//# sourceMappingURL=edit.native.js.map