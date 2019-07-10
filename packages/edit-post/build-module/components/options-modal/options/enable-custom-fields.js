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
import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import BaseOption from './base';
export var EnableCustomFieldsOption =
/*#__PURE__*/
function (_Component) {
  _inherits(EnableCustomFieldsOption, _Component);

  function EnableCustomFieldsOption(_ref) {
    var _this;

    var isChecked = _ref.isChecked;

    _classCallCheck(this, EnableCustomFieldsOption);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EnableCustomFieldsOption).apply(this, arguments));
    _this.toggleCustomFields = _this.toggleCustomFields.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      isChecked: isChecked
    };
    return _this;
  }

  _createClass(EnableCustomFieldsOption, [{
    key: "toggleCustomFields",
    value: function toggleCustomFields() {
      // Submit a hidden form which triggers the toggle_custom_fields admin action.
      // This action will toggle the setting and reload the editor with the meta box
      // assets included on the page.
      document.getElementById('toggle-custom-fields-form').submit(); // Make it look like something happened while the page reloads.

      this.setState({
        isChecked: !this.props.isChecked
      });
    }
  }, {
    key: "render",
    value: function render() {
      var label = this.props.label;
      var isChecked = this.state.isChecked;
      return createElement(BaseOption, {
        label: label,
        isChecked: isChecked,
        onChange: this.toggleCustomFields
      });
    }
  }]);

  return EnableCustomFieldsOption;
}(Component);
export default withSelect(function (select) {
  return {
    isChecked: !!select('core/editor').getEditorSettings().enableCustomFields
  };
})(EnableCustomFieldsOption);
//# sourceMappingURL=enable-custom-fields.js.map