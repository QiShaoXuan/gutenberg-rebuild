import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { isFinite } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { compose, withInstanceId, withState } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { BaseControl, Button, Dashicon } from '../';

function RangeControl(_ref) {
  var className = _ref.className,
      currentInput = _ref.currentInput,
      label = _ref.label,
      value = _ref.value,
      instanceId = _ref.instanceId,
      onChange = _ref.onChange,
      beforeIcon = _ref.beforeIcon,
      afterIcon = _ref.afterIcon,
      help = _ref.help,
      allowReset = _ref.allowReset,
      initialPosition = _ref.initialPosition,
      min = _ref.min,
      max = _ref.max,
      setState = _ref.setState,
      props = _objectWithoutProperties(_ref, ["className", "currentInput", "label", "value", "instanceId", "onChange", "beforeIcon", "afterIcon", "help", "allowReset", "initialPosition", "min", "max", "setState"]);

  var id = "inspector-range-control-".concat(instanceId);
  var currentInputValue = currentInput === null ? value : currentInput;

  var resetValue = function resetValue() {
    resetCurrentInput();
    onChange();
  };

  var resetCurrentInput = function resetCurrentInput() {
    if (currentInput !== null) {
      setState({
        currentInput: null
      });
    }
  };

  var onChangeValue = function onChangeValue(event) {
    var newValue = event.target.value; // If the input value is invalid temporarily save it to the state,
    // without calling on change.

    if (!event.target.checkValidity()) {
      setState({
        currentInput: newValue
      });
      return;
    } // The input is valid, reset the local state property used to temporaly save the value,
    // and call onChange with the new value as a number.


    resetCurrentInput();
    onChange(newValue === '' ? undefined : parseFloat(newValue));
  };

  var initialSliderValue = isFinite(currentInputValue) ? currentInputValue : initialPosition || '';
  return createElement(BaseControl, {
    label: label,
    id: id,
    help: help,
    className: classnames('components-range-control', className)
  }, beforeIcon && createElement(Dashicon, {
    icon: beforeIcon
  }), createElement("input", _extends({
    className: "components-range-control__slider",
    id: id,
    type: "range",
    value: initialSliderValue,
    onChange: onChangeValue,
    "aria-describedby": !!help ? id + '__help' : undefined,
    min: min,
    max: max
  }, props)), afterIcon && createElement(Dashicon, {
    icon: afterIcon
  }), createElement("input", _extends({
    className: "components-range-control__number",
    type: "number",
    onChange: onChangeValue,
    "aria-label": label,
    value: currentInputValue,
    min: min,
    max: max,
    onBlur: resetCurrentInput
  }, props)), allowReset && createElement(Button, {
    onClick: resetValue,
    disabled: value === undefined
  }, __('Reset')));
}

export default compose([withInstanceId, withState({
  currentInput: null
})])(RangeControl);
//# sourceMappingURL=index.js.map