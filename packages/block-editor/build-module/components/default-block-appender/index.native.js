import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { TouchableWithoutFeedback, View } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { decodeEntities } from '@wordpress/html-entities';
import { withSelect, withDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import styles from './style.scss';
export function DefaultBlockAppender(_ref) {
  var isLocked = _ref.isLocked,
      isVisible = _ref.isVisible,
      onAppend = _ref.onAppend,
      placeholder = _ref.placeholder,
      containerStyle = _ref.containerStyle;

  if (isLocked || !isVisible) {
    return null;
  }

  var value = decodeEntities(placeholder) || __('Start writing…');

  return createElement(TouchableWithoutFeedback, {
    onPress: onAppend
  }, createElement(View, {
    style: [styles.blockHolder, containerStyle],
    pointerEvents: "box-only"
  }, createElement(RichText, {
    placeholder: value,
    onChange: function onChange() {}
  })));
}
export default compose(withSelect(function (select, ownProps) {
  var _select = select('core/block-editor'),
      getBlockCount = _select.getBlockCount,
      getSettings = _select.getSettings,
      getTemplateLock = _select.getTemplateLock;

  var isEmpty = !getBlockCount(ownProps.rootClientId);

  var _getSettings = getSettings(),
      bodyPlaceholder = _getSettings.bodyPlaceholder;

  return {
    isVisible: isEmpty,
    isLocked: !!getTemplateLock(ownProps.rootClientId),
    placeholder: bodyPlaceholder
  };
}), withDispatch(function (dispatch, ownProps) {
  var _dispatch = dispatch('core/block-editor'),
      insertDefaultBlock = _dispatch.insertDefaultBlock,
      startTyping = _dispatch.startTyping;

  return {
    onAppend: function onAppend() {
      var rootClientId = ownProps.rootClientId;
      insertDefaultBlock(undefined, rootClientId);
      startTyping();
    }
  };
}))(DefaultBlockAppender);
//# sourceMappingURL=index.native.js.map