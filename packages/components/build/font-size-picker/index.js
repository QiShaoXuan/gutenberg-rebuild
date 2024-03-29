"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _dashicon = _interopRequireDefault(require("../dashicon"));

var _baseControl = _interopRequireDefault(require("../base-control"));

var _button = _interopRequireDefault(require("../button"));

var _dropdown = _interopRequireDefault(require("../dropdown"));

var _rangeControl = _interopRequireDefault(require("../range-control"));

var _navigableContainer = require("../navigable-container");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function FontSizePicker(_ref) {
  var fallbackFontSize = _ref.fallbackFontSize,
      _ref$fontSizes = _ref.fontSizes,
      fontSizes = _ref$fontSizes === void 0 ? [] : _ref$fontSizes,
      _ref$disableCustomFon = _ref.disableCustomFontSizes,
      disableCustomFontSizes = _ref$disableCustomFon === void 0 ? false : _ref$disableCustomFon,
      onChange = _ref.onChange,
      value = _ref.value,
      _ref$withSlider = _ref.withSlider,
      withSlider = _ref$withSlider === void 0 ? false : _ref$withSlider;

  if (disableCustomFontSizes && !fontSizes.length) {
    return null;
  }

  var onChangeValue = function onChangeValue(event) {
    var newValue = event.target.value;

    if (newValue === '') {
      onChange(undefined);
      return;
    }

    onChange(Number(newValue));
  };

  var currentFont = fontSizes.find(function (font) {
    return font.size === value;
  });
  var currentFontSizeName = currentFont && currentFont.name || !value && (0, _i18n._x)('Normal', 'font size name') || (0, _i18n._x)('Custom', 'font size name');
  return (0, _element.createElement)(_baseControl.default, {
    label: (0, _i18n.__)('Font Size')
  }, (0, _element.createElement)("div", {
    className: "components-font-size-picker__buttons"
  }, fontSizes.length > 0 && (0, _element.createElement)(_dropdown.default, {
    className: "components-font-size-picker__dropdown",
    contentClassName: "components-font-size-picker__dropdown-content",
    position: "bottom",
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
          onToggle = _ref2.onToggle;
      return (0, _element.createElement)(_button.default, {
        className: "components-font-size-picker__selector",
        isLarge: true,
        onClick: onToggle,
        "aria-expanded": isOpen,
        "aria-label": (0, _i18n.sprintf)(
        /* translators: %s: font size name */
        (0, _i18n.__)('Font size: %s'), currentFontSizeName)
      }, currentFontSizeName);
    },
    renderContent: function renderContent() {
      return (0, _element.createElement)(_navigableContainer.NavigableMenu, null, (0, _lodash.map)(fontSizes, function (_ref3) {
        var name = _ref3.name,
            size = _ref3.size,
            slug = _ref3.slug;
        var isSelected = value === size || !value && slug === 'normal';
        return (0, _element.createElement)(_button.default, {
          key: slug,
          onClick: function onClick() {
            return onChange(slug === 'normal' ? undefined : size);
          },
          className: "is-font-".concat(slug),
          role: "menuitemradio",
          "aria-checked": isSelected
        }, isSelected && (0, _element.createElement)(_dashicon.default, {
          icon: "saved"
        }), (0, _element.createElement)("span", {
          className: "components-font-size-picker__dropdown-text-size",
          style: {
            fontSize: size
          }
        }, name));
      }));
    }
  }), !withSlider && !disableCustomFontSizes && (0, _element.createElement)("input", {
    className: "components-range-control__number",
    type: "number",
    onChange: onChangeValue,
    "aria-label": (0, _i18n.__)('Custom font size'),
    value: value || ''
  }), (0, _element.createElement)(_button.default, {
    className: "components-color-palette__clear",
    type: "button",
    disabled: value === undefined,
    onClick: function onClick() {
      return onChange(undefined);
    },
    isSmall: true,
    isDefault: true
  }, (0, _i18n.__)('Reset'))), withSlider && (0, _element.createElement)(_rangeControl.default, {
    className: "components-font-size-picker__custom-input",
    label: (0, _i18n.__)('Custom Size'),
    value: value || '',
    initialPosition: fallbackFontSize,
    onChange: onChange,
    min: 12,
    max: 100,
    beforeIcon: "editor-textcolor",
    afterIcon: "editor-textcolor"
  }));
}

var _default = FontSizePicker;
exports.default = _default;
//# sourceMappingURL=index.js.map