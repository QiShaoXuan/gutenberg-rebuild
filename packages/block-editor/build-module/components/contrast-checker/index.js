import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import tinycolor from 'tinycolor2';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Notice } from '@wordpress/components';

function ContrastChecker(_ref) {
  var backgroundColor = _ref.backgroundColor,
      fallbackBackgroundColor = _ref.fallbackBackgroundColor,
      fallbackTextColor = _ref.fallbackTextColor,
      fontSize = _ref.fontSize,
      isLargeText = _ref.isLargeText,
      textColor = _ref.textColor;

  if (!(backgroundColor || fallbackBackgroundColor) || !(textColor || fallbackTextColor)) {
    return null;
  }

  var tinyBackgroundColor = tinycolor(backgroundColor || fallbackBackgroundColor);
  var tinyTextColor = tinycolor(textColor || fallbackTextColor);
  var hasTransparency = tinyBackgroundColor.getAlpha() !== 1 || tinyTextColor.getAlpha() !== 1;

  if (hasTransparency || tinycolor.isReadable(tinyBackgroundColor, tinyTextColor, {
    level: 'AA',
    size: isLargeText || isLargeText !== false && fontSize >= 24 ? 'large' : 'small'
  })) {
    return null;
  }

  var msg = tinyBackgroundColor.getBrightness() < tinyTextColor.getBrightness() ? __('This color combination may be hard for people to read. Try using a darker background color and/or a brighter text color.') : __('This color combination may be hard for people to read. Try using a brighter background color and/or a darker text color.');
  return createElement("div", {
    className: "editor-contrast-checker block-editor-contrast-checker"
  }, createElement(Notice, {
    status: "warning",
    isDismissible: false
  }, msg));
}

export default ContrastChecker;
//# sourceMappingURL=index.js.map