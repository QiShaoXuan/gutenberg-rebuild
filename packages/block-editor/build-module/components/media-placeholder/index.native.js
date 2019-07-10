import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View, Text, TouchableWithoutFeedback } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Dashicon } from '@wordpress/components';
/**
 * Internal dependencies
 */

import styles from './styles.scss';

function MediaPlaceholder(props) {
  return createElement(TouchableWithoutFeedback, {
    onPress: props.onMediaOptionsPressed
  }, createElement(View, {
    style: styles.emptyStateContainer
  }, createElement(Dashicon, {
    icon: 'format-image'
  }), createElement(Text, {
    style: styles.emptyStateTitle
  }, __('Image')), createElement(Text, {
    style: styles.emptyStateDescription
  }, __('CHOOSE IMAGE'))));
}

export default MediaPlaceholder;
//# sourceMappingURL=index.native.js.map