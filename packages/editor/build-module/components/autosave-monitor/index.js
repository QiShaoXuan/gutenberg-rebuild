import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
export var AutosaveMonitor =
/*#__PURE__*/
function (_Component) {
  _inherits(AutosaveMonitor, _Component);

  function AutosaveMonitor() {
    _classCallCheck(this, AutosaveMonitor);

    return _possibleConstructorReturn(this, _getPrototypeOf(AutosaveMonitor).apply(this, arguments));
  }

  _createClass(AutosaveMonitor, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          isDirty = _this$props.isDirty,
          editsReference = _this$props.editsReference,
          isAutosaveable = _this$props.isAutosaveable,
          isAutosaving = _this$props.isAutosaving; // The edits reference is held for comparison to avoid scheduling an
      // autosave if an edit has not been made since the last autosave
      // completion. This is assigned when the autosave completes, and reset
      // when an edit occurs.
      //
      // See: https://github.com/WordPress/gutenberg/issues/12318

      if (editsReference !== prevProps.editsReference) {
        this.didAutosaveForEditsReference = false;
      }

      if (!isAutosaving && prevProps.isAutosaving) {
        this.didAutosaveForEditsReference = true;
      }

      if (prevProps.isDirty !== isDirty || prevProps.isAutosaveable !== isAutosaveable || prevProps.editsReference !== editsReference) {
        this.toggleTimer(isDirty && isAutosaveable && !this.didAutosaveForEditsReference);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.toggleTimer(false);
    }
  }, {
    key: "toggleTimer",
    value: function toggleTimer(isPendingSave) {
      var _this = this;

      clearTimeout(this.pendingSave);
      var autosaveInterval = this.props.autosaveInterval;

      if (isPendingSave) {
        this.pendingSave = setTimeout(function () {
          return _this.props.autosave();
        }, autosaveInterval * 1000);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return AutosaveMonitor;
}(Component);
export default compose([withSelect(function (select) {
  var _select = select('core/editor'),
      isEditedPostDirty = _select.isEditedPostDirty,
      isEditedPostAutosaveable = _select.isEditedPostAutosaveable,
      getReferenceByDistinctEdits = _select.getReferenceByDistinctEdits,
      isAutosavingPost = _select.isAutosavingPost;

  var _select$getEditorSett = select('core/editor').getEditorSettings(),
      autosaveInterval = _select$getEditorSett.autosaveInterval;

  return {
    isDirty: isEditedPostDirty(),
    isAutosaveable: isEditedPostAutosaveable(),
    editsReference: getReferenceByDistinctEdits(),
    isAutosaving: isAutosavingPost(),
    autosaveInterval: autosaveInterval
  };
}), withDispatch(function (dispatch) {
  return {
    autosave: dispatch('core/editor').autosave
  };
})])(AutosaveMonitor);
//# sourceMappingURL=index.js.map