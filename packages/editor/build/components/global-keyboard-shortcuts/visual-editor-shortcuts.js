"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorGlobalKeyboardShortcuts = EditorGlobalKeyboardShortcuts;
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _keycodes = require("@wordpress/keycodes");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _blockEditor = require("@wordpress/block-editor");

var _saveShortcut = _interopRequireDefault(require("./save-shortcut"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var VisualEditorGlobalKeyboardShortcuts =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(VisualEditorGlobalKeyboardShortcuts, _Component);

  function VisualEditorGlobalKeyboardShortcuts() {
    var _this;

    (0, _classCallCheck2.default)(this, VisualEditorGlobalKeyboardShortcuts);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(VisualEditorGlobalKeyboardShortcuts).apply(this, arguments));
    _this.undoOrRedo = _this.undoOrRedo.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(VisualEditorGlobalKeyboardShortcuts, [{
    key: "undoOrRedo",
    value: function undoOrRedo(event) {
      var _this$props = this.props,
          onRedo = _this$props.onRedo,
          onUndo = _this$props.onUndo;

      if (event.shiftKey) {
        onRedo();
      } else {
        onUndo();
      }

      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      var _ref;

      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockEditorKeyboardShortcuts, null), (0, _element.createElement)(_components.KeyboardShortcuts, {
        shortcuts: (_ref = {}, (0, _defineProperty2.default)(_ref, _keycodes.rawShortcut.primary('z'), this.undoOrRedo), (0, _defineProperty2.default)(_ref, _keycodes.rawShortcut.primaryShift('z'), this.undoOrRedo), _ref)
      }), (0, _element.createElement)(_saveShortcut.default, null));
    }
  }]);
  return VisualEditorGlobalKeyboardShortcuts;
}(_element.Component);

var EnhancedVisualEditorGlobalKeyboardShortcuts = (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      redo = _dispatch.redo,
      undo = _dispatch.undo;

  return {
    onRedo: redo,
    onUndo: undo
  };
})(VisualEditorGlobalKeyboardShortcuts);
var _default = EnhancedVisualEditorGlobalKeyboardShortcuts;
exports.default = _default;

function EditorGlobalKeyboardShortcuts() {
  (0, _deprecated.default)('EditorGlobalKeyboardShortcuts', {
    alternative: 'VisualEditorGlobalKeyboardShortcuts',
    plugin: 'Gutenberg'
  });
  return (0, _element.createElement)(EnhancedVisualEditorGlobalKeyboardShortcuts, null);
}
//# sourceMappingURL=visual-editor-shortcuts.js.map