import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';

var UnsavedChangesWarning =
/*#__PURE__*/
function (_Component) {
  _inherits(UnsavedChangesWarning, _Component);

  function UnsavedChangesWarning() {
    var _this;

    _classCallCheck(this, UnsavedChangesWarning);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UnsavedChangesWarning).apply(this, arguments));
    _this.warnIfUnsavedChanges = _this.warnIfUnsavedChanges.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(UnsavedChangesWarning, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('beforeunload', this.warnIfUnsavedChanges);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('beforeunload', this.warnIfUnsavedChanges);
    }
    /**
     * Warns the user if there are unsaved changes before leaving the editor.
     *
     * @param {Event} event `beforeunload` event.
     *
     * @return {?string} Warning prompt message, if unsaved changes exist.
     */

  }, {
    key: "warnIfUnsavedChanges",
    value: function warnIfUnsavedChanges(event) {
      var isDirty = this.props.isDirty;

      if (isDirty) {
        event.returnValue = __('You have unsaved changes. If you proceed, they will be lost.');
        return event.returnValue;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return UnsavedChangesWarning;
}(Component);

export default withSelect(function (select) {
  return {
    isDirty: select('core/editor').isEditedPostDirty()
  };
})(UnsavedChangesWarning);
//# sourceMappingURL=index.js.map