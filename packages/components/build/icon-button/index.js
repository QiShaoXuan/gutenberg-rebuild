"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _button = _interopRequireDefault(require("../button"));

var _dashicon = _interopRequireDefault(require("../dashicon"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function IconButton(props, ref) {
  var icon = props.icon,
      children = props.children,
      label = props.label,
      className = props.className,
      tooltip = props.tooltip,
      shortcut = props.shortcut,
      labelPosition = props.labelPosition,
      additionalProps = (0, _objectWithoutProperties2.default)(props, ["icon", "children", "label", "className", "tooltip", "shortcut", "labelPosition"]);
  var ariaPressed = additionalProps['aria-pressed'];
  var classes = (0, _classnames.default)('components-icon-button', className, {
    'has-text': children
  });
  var tooltipText = tooltip || label; // Should show the tooltip if...

  var showTooltip = !additionalProps.disabled && ( // an explicit tooltip is passed or...
  tooltip || // there's a shortcut or...
  shortcut || // there's a label and...
  !!label && ( // the children are empty and...
  !children || (0, _lodash.isArray)(children) && !children.length) && // the tooltip is not explicitly disabled.
  false !== tooltip);
  var element = (0, _element.createElement)(_button.default, (0, _extends2.default)({
    "aria-label": label
  }, additionalProps, {
    className: classes,
    ref: ref
  }), (0, _lodash.isString)(icon) ? (0, _element.createElement)(_dashicon.default, {
    icon: icon,
    ariaPressed: ariaPressed
  }) : icon, children);

  if (showTooltip) {
    element = (0, _element.createElement)(_tooltip.default, {
      text: tooltipText,
      shortcut: shortcut,
      position: labelPosition
    }, element);
  }

  return element;
}

var _default = (0, _element.forwardRef)(IconButton);

exports.default = _default;
//# sourceMappingURL=index.js.map