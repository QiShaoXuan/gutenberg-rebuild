import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import memize from 'memize';
import { size, map, without } from 'lodash';
/**
 * WordPress dependencies
 */

import { withSelect } from '@wordpress/data';
import { EditorProvider, ErrorBoundary, PostLockedModal } from '@wordpress/editor';
import { StrictMode, Component } from '@wordpress/element';
import { KeyboardShortcuts } from '@wordpress/components';
/**
 * Internal dependencies
 */

import preventEventDiscovery from './prevent-event-discovery';
import Layout from './components/layout';

var Editor =
/*#__PURE__*/
function (_Component) {
  _inherits(Editor, _Component);

  function Editor() {
    var _this;

    _classCallCheck(this, Editor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Editor).apply(this, arguments));
    _this.getEditorSettings = memize(_this.getEditorSettings, {
      maxSize: 1
    });
    return _this;
  }

  _createClass(Editor, [{
    key: "getEditorSettings",
    value: function getEditorSettings(settings, hasFixedToolbar, focusMode, hiddenBlockTypes, blockTypes) {
      settings = _objectSpread({}, settings, {
        hasFixedToolbar: hasFixedToolbar,
        focusMode: focusMode
      }); // Omit hidden block types if exists and non-empty.

      if (size(hiddenBlockTypes) > 0) {
        // Defer to passed setting for `allowedBlockTypes` if provided as
        // anything other than `true` (where `true` is equivalent to allow
        // all block types).
        var defaultAllowedBlockTypes = true === settings.allowedBlockTypes ? map(blockTypes, 'name') : settings.allowedBlockTypes || [];
        settings.allowedBlockTypes = without.apply(void 0, [defaultAllowedBlockTypes].concat(_toConsumableArray(hiddenBlockTypes)));
      }

      return settings;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          settings = _this$props.settings,
          hasFixedToolbar = _this$props.hasFixedToolbar,
          focusMode = _this$props.focusMode,
          post = _this$props.post,
          initialEdits = _this$props.initialEdits,
          onError = _this$props.onError,
          hiddenBlockTypes = _this$props.hiddenBlockTypes,
          blockTypes = _this$props.blockTypes,
          props = _objectWithoutProperties(_this$props, ["settings", "hasFixedToolbar", "focusMode", "post", "initialEdits", "onError", "hiddenBlockTypes", "blockTypes"]);

      if (!post) {
        return null;
      }

      var editorSettings = this.getEditorSettings(settings, hasFixedToolbar, focusMode, hiddenBlockTypes, blockTypes);
      return createElement(StrictMode, null, createElement(EditorProvider, _extends({
        settings: editorSettings,
        post: post,
        initialEdits: initialEdits
      }, props), createElement(ErrorBoundary, {
        onError: onError
      }, createElement(Layout, null), createElement(KeyboardShortcuts, {
        shortcuts: preventEventDiscovery
      })), createElement(PostLockedModal, null)));
    }
  }]);

  return Editor;
}(Component);

export default withSelect(function (select, _ref) {
  var postId = _ref.postId,
      postType = _ref.postType;

  var _select = select('core/edit-post'),
      isFeatureActive = _select.isFeatureActive,
      getPreference = _select.getPreference;

  var _select2 = select('core'),
      getEntityRecord = _select2.getEntityRecord;

  var _select3 = select('core/blocks'),
      getBlockTypes = _select3.getBlockTypes;

  return {
    hasFixedToolbar: isFeatureActive('fixedToolbar'),
    focusMode: isFeatureActive('focusMode'),
    post: getEntityRecord('postType', postType, postId),
    hiddenBlockTypes: getPreference('hiddenBlockTypes'),
    blockTypes: getBlockTypes()
  };
})(Editor);
//# sourceMappingURL=editor.js.map