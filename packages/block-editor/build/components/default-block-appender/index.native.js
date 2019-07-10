"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultBlockAppender = DefaultBlockAppender;
exports.default = void 0;

var _element = require("@wordpress/element");

var _reactNative = require("react-native");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _compose = require("@wordpress/compose");

var _htmlEntities = require("@wordpress/html-entities");

var _data = require("@wordpress/data");

var _style = _interopRequireDefault(require("./style.scss"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function DefaultBlockAppender(_ref) {
  var isLocked = _ref.isLocked,
      isVisible = _ref.isVisible,
      onAppend = _ref.onAppend,
      placeholder = _ref.placeholder,
      containerStyle = _ref.containerStyle;

  if (isLocked || !isVisible) {
    return null;
  }

  var value = (0, _htmlEntities.decodeEntities)(placeholder) || (0, _i18n.__)('Start writing…');
  return (0, _element.createElement)(_reactNative.TouchableWithoutFeedback, {
    onPress: onAppend
  }, (0, _element.createElement)(_reactNative.View, {
    style: [_style.default.blockHolder, containerStyle],
    pointerEvents: "box-only"
  }, (0, _element.createElement)(_blockEditor.RichText, {
    placeholder: value,
    onChange: function onChange() {}
  })));
}

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, ownProps) {
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
}), (0, _data.withDispatch)(function (dispatch, ownProps) {
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

exports.default = _default;
//# sourceMappingURL=index.native.js.map