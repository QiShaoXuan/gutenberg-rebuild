import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Component, Fragment } from '@wordpress/element';
import { KeyboardShortcuts } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';
import { rawShortcut } from '@wordpress/keycodes';
import deprecated from '@wordpress/deprecated';
import { BlockEditorKeyboardShortcuts } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import SaveShortcut from './save-shortcut';

var VisualEditorGlobalKeyboardShortcuts =
/*#__PURE__*/
function (_Component) {
  _inherits(VisualEditorGlobalKeyboardShortcuts, _Component);

  function VisualEditorGlobalKeyboardShortcuts() {
    var _this;

    _classCallCheck(this, VisualEditorGlobalKeyboardShortcuts);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VisualEditorGlobalKeyboardShortcuts).apply(this, arguments));
    _this.undoOrRedo = _this.undoOrRedo.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(VisualEditorGlobalKeyboardShortcuts, [{
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

      return createElement(Fragment, null, createElement(BlockEditorKeyboardShortcuts, null), createElement(KeyboardShortcuts, {
        shortcuts: (_ref = {}, _defineProperty(_ref, rawShortcut.primary('z'), this.undoOrRedo), _defineProperty(_ref, rawShortcut.primaryShift('z'), this.undoOrRedo), _ref)
      }), createElement(SaveShortcut, null));
    }
  }]);

  return VisualEditorGlobalKeyboardShortcuts;
}(Component);

var EnhancedVisualEditorGlobalKeyboardShortcuts = withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      redo = _dispatch.redo,
      undo = _dispatch.undo;

  return {
    onRedo: redo,
    onUndo: undo
  };
})(VisualEditorGlobalKeyboardShortcuts);
export default EnhancedVisualEditorGlobalKeyboardShortcuts;
export function EditorGlobalKeyboardShortcuts() {
  deprecated('EditorGlobalKeyboardShortcuts', {
    alternative: 'VisualEditorGlobalKeyboardShortcuts',
    plugin: 'Gutenberg'
  });
  return createElement(EnhancedVisualEditorGlobalKeyboardShortcuts, null);
}
//# sourceMappingURL=visual-editor-shortcuts.js.map