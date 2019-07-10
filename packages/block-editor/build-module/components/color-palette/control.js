import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { BaseControl, ColorIndicator } from '@wordpress/components';
import { ifCondition, compose } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import ColorPalette from './';
import withColorContext from './with-color-context';
import { getColorObjectByColorValue } from '../colors'; // translators: first %s: The type of color (e.g. background color), second %s: the color name or value (e.g. red or #ff0000)

var colorIndicatorAriaLabel = __('(current %s: %s)');

export function ColorPaletteControl(_ref) {
  var colors = _ref.colors,
      disableCustomColors = _ref.disableCustomColors,
      label = _ref.label,
      onChange = _ref.onChange,
      value = _ref.value;
  var colorObject = getColorObjectByColorValue(colors, value);
  var colorName = colorObject && colorObject.name;
  var ariaLabel = sprintf(colorIndicatorAriaLabel, label.toLowerCase(), colorName || value);
  var labelElement = createElement(Fragment, null, label, value && createElement(ColorIndicator, {
    colorValue: value,
    "aria-label": ariaLabel
  }));
  return createElement(BaseControl, {
    className: "editor-color-palette-control block-editor-color-palette-control",
    label: labelElement
  }, createElement(ColorPalette, _extends({
    className: "editor-color-palette-control__color-palette block-editor-color-palette-control__color-palette",
    value: value,
    onChange: onChange
  }, {
    colors: colors,
    disableCustomColors: disableCustomColors
  })));
}
export default compose([withColorContext, ifCondition(function (_ref2) {
  var hasColorsToChoose = _ref2.hasColorsToChoose;
  return hasColorsToChoose;
})])(ColorPaletteControl);
//# sourceMappingURL=control.js.map