import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * Internal dependencies
 */
import Cell from './cell';
import Picker from '../picker';
export default function PickerCell(props) {
  var options = props.options,
      onChangeValue = props.onChangeValue,
      cellProps = _objectWithoutProperties(props, ["options", "onChangeValue"]);

  var picker;

  var onCellPress = function onCellPress() {
    picker.presentPicker();
  };

  var onChange = function onChange(newValue) {
    onChangeValue(newValue);
  };

  return createElement(Cell, _extends({
    onPress: onCellPress,
    editable: false
  }, cellProps), createElement(Picker, {
    ref: function ref(instance) {
      return picker = instance;
    },
    options: options,
    onChange: onChange
  }));
}
//# sourceMappingURL=picker-cell.native.js.map