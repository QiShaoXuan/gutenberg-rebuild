"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EnableCustomFieldsOption = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _data = require("@wordpress/data");

var _base = _interopRequireDefault(require("./base"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var EnableCustomFieldsOption =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(EnableCustomFieldsOption, _Component);

  function EnableCustomFieldsOption(_ref) {
    var _this;

    var isChecked = _ref.isChecked;
    (0, _classCallCheck2.default)(this, EnableCustomFieldsOption);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EnableCustomFieldsOption).apply(this, arguments));
    _this.toggleCustomFields = _this.toggleCustomFields.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.state = {
      isChecked: isChecked
    };
    return _this;
  }

  (0, _createClass2.default)(EnableCustomFieldsOption, [{
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
      return (0, _element.createElement)(_base.default, {
        label: label,
        isChecked: isChecked,
        onChange: this.toggleCustomFields
      });
    }
  }]);
  return EnableCustomFieldsOption;
}(_element.Component);

exports.EnableCustomFieldsOption = EnableCustomFieldsOption;

var _default = (0, _data.withSelect)(function (select) {
  return {
    isChecked: !!select('core/editor').getEditorSettings().enableCustomFields
  };
})(EnableCustomFieldsOption);

exports.default = _default;
//# sourceMappingURL=enable-custom-fields.js.map