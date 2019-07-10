import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isArray, isString } from 'lodash';
/**
 * WordPress dependencies
 */

import { forwardRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Tooltip from '../tooltip';
import Button from '../button';
import Dashicon from '../dashicon';

function IconButton(props, ref) {
  var icon = props.icon,
      children = props.children,
      label = props.label,
      className = props.className,
      tooltip = props.tooltip,
      shortcut = props.shortcut,
      labelPosition = props.labelPosition,
      additionalProps = _objectWithoutProperties(props, ["icon", "children", "label", "className", "tooltip", "shortcut", "labelPosition"]);

  var ariaPressed = additionalProps['aria-pressed'];
  var classes = classnames('components-icon-button', className, {
    'has-text': children
  });
  var tooltipText = tooltip || label; // Should show the tooltip if...

  var showTooltip = !additionalProps.disabled && ( // an explicit tooltip is passed or...
  tooltip || // there's a shortcut or...
  shortcut || // there's a label and...
  !!label && ( // the children are empty and...
  !children || isArray(children) && !children.length) && // the tooltip is not explicitly disabled.
  false !== tooltip);
  var element = createElement(Button, _extends({
    "aria-label": label
  }, additionalProps, {
    className: classes,
    ref: ref
  }), isString(icon) ? createElement(Dashicon, {
    icon: icon,
    ariaPressed: ariaPressed
  }) : icon, children);

  if (showTooltip) {
    element = createElement(Tooltip, {
      text: tooltipText,
      shortcut: shortcut,
      position: labelPosition
    }, element);
  }

  return element;
}

export default forwardRef(IconButton);
//# sourceMappingURL=index.js.map