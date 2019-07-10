"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PickerCell;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _cell = _interopRequireDefault(require("./cell"));

var _picker = _interopRequireDefault(require("../picker"));

/**
 * Internal dependencies
 */
function PickerCell(props) {
  var options = props.options,
      onChangeValue = props.onChangeValue,
      cellProps = (0, _objectWithoutProperties2.default)(props, ["options", "onChangeValue"]);
  var picker;

  var onCellPress = function onCellPress() {
    picker.presentPicker();
  };

  var onChange = function onChange(newValue) {
    onChangeValue(newValue);
  };

  return (0, _element.createElement)(_cell.default, (0, _extends2.default)({
    onPress: onCellPress,
    editable: false
  }, cellProps), (0, _element.createElement)(_picker.default, {
    ref: function ref(instance) {
      return picker = instance;
    },
    options: options,
    onChange: onChange
  }));
}
//# sourceMappingURL=picker-cell.native.js.map