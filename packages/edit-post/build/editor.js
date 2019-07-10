"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _memize = _interopRequireDefault(require("memize"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _editor = require("@wordpress/editor");

var _components = require("@wordpress/components");

var _preventEventDiscovery = _interopRequireDefault(require("./prevent-event-discovery"));

var _layout = _interopRequireDefault(require("./components/layout"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var Editor =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Editor, _Component);

  function Editor() {
    var _this;

    (0, _classCallCheck2.default)(this, Editor);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Editor).apply(this, arguments));
    _this.getEditorSettings = (0, _memize.default)(_this.getEditorSettings, {
      maxSize: 1
    });
    return _this;
  }

  (0, _createClass2.default)(Editor, [{
    key: "getEditorSettings",
    value: function getEditorSettings(settings, hasFixedToolbar, focusMode, hiddenBlockTypes, blockTypes) {
      settings = (0, _objectSpread2.default)({}, settings, {
        hasFixedToolbar: hasFixedToolbar,
        focusMode: focusMode
      }); // Omit hidden block types if exists and non-empty.

      if ((0, _lodash.size)(hiddenBlockTypes) > 0) {
        // Defer to passed setting for `allowedBlockTypes` if provided as
        // anything other than `true` (where `true` is equivalent to allow
        // all block types).
        var defaultAllowedBlockTypes = true === settings.allowedBlockTypes ? (0, _lodash.map)(blockTypes, 'name') : settings.allowedBlockTypes || [];
        settings.allowedBlockTypes = _lodash.without.apply(void 0, [defaultAllowedBlockTypes].concat((0, _toConsumableArray2.default)(hiddenBlockTypes)));
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
          props = (0, _objectWithoutProperties2.default)(_this$props, ["settings", "hasFixedToolbar", "focusMode", "post", "initialEdits", "onError", "hiddenBlockTypes", "blockTypes"]);

      if (!post) {
        return null;
      }

      var editorSettings = this.getEditorSettings(settings, hasFixedToolbar, focusMode, hiddenBlockTypes, blockTypes);
      return (0, _element.createElement)(_element.StrictMode, null, (0, _element.createElement)(_editor.EditorProvider, (0, _extends2.default)({
        settings: editorSettings,
        post: post,
        initialEdits: initialEdits
      }, props), (0, _element.createElement)(_editor.ErrorBoundary, {
        onError: onError
      }, (0, _element.createElement)(_layout.default, null), (0, _element.createElement)(_components.KeyboardShortcuts, {
        shortcuts: _preventEventDiscovery.default
      })), (0, _element.createElement)(_editor.PostLockedModal, null)));
    }
  }]);
  return Editor;
}(_element.Component);

var _default = (0, _data.withSelect)(function (select, _ref) {
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

exports.default = _default;
//# sourceMappingURL=editor.js.map