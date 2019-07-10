"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _ = require("../");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
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
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "currentInput", "label", "value", "instanceId", "onChange", "beforeIcon", "afterIcon", "help", "allowReset", "initialPosition", "min", "max", "setState"]);
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

  var initialSliderValue = (0, _lodash.isFinite)(currentInputValue) ? currentInputValue : initialPosition || '';
  return (0, _element.createElement)(_.BaseControl, {
    label: label,
    id: id,
    help: help,
    className: (0, _classnames.default)('components-range-control', className)
  }, beforeIcon && (0, _element.createElement)(_.Dashicon, {
    icon: beforeIcon
  }), (0, _element.createElement)("input", (0, _extends2.default)({
    className: "components-range-control__slider",
    id: id,
    type: "range",
    value: initialSliderValue,
    onChange: onChangeValue,
    "aria-describedby": !!help ? id + '__help' : undefined,
    min: min,
    max: max
  }, props)), afterIcon && (0, _element.createElement)(_.Dashicon, {
    icon: afterIcon
  }), (0, _element.createElement)("input", (0, _extends2.default)({
    className: "components-range-control__number",
    type: "number",
    onChange: onChangeValue,
    "aria-label": label,
    value: currentInputValue,
    min: min,
    max: max,
    onBlur: resetCurrentInput
  }, props)), allowReset && (0, _element.createElement)(_.Button, {
    onClick: resetValue,
    disabled: value === undefined
  }, (0, _i18n.__)('Reset')));
}

var _default = (0, _compose.compose)([_compose.withInstanceId, (0, _compose.withState)({
  currentInput: null
})])(RangeControl);

exports.default = _default;
//# sourceMappingURL=index.js.map