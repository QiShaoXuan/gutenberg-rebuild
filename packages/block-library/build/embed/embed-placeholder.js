"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
var EmbedPlaceholder = function EmbedPlaceholder(props) {
  var icon = props.icon,
      label = props.label,
      value = props.value,
      onSubmit = props.onSubmit,
      onChange = props.onChange,
      cannotEmbed = props.cannotEmbed,
      fallback = props.fallback,
      tryAgain = props.tryAgain;
  return (0, _element.createElement)(_components.Placeholder, {
    icon: (0, _element.createElement)(_blockEditor.BlockIcon, {
      icon: icon,
      showColors: true
    }),
    label: label,
    className: "wp-block-embed"
  }, (0, _element.createElement)("form", {
    onSubmit: onSubmit
  }, (0, _element.createElement)("input", {
    type: "url",
    value: value || '',
    className: "components-placeholder__input",
    "aria-label": label,
    placeholder: (0, _i18n.__)('Enter URL to embed here…'),
    onChange: onChange
  }), (0, _element.createElement)(_components.Button, {
    isLarge: true,
    type: "submit"
  }, (0, _i18n._x)('Embed', 'button label')), cannotEmbed && (0, _element.createElement)("p", {
    className: "components-placeholder__error"
  }, (0, _i18n.__)('Sorry, this content could not be embedded.'), (0, _element.createElement)("br", null), (0, _element.createElement)(_components.Button, {
    isLarge: true,
    onClick: tryAgain
  }, (0, _i18n._x)('Try again', 'button label')), " ", (0, _element.createElement)(_components.Button, {
    isLarge: true,
    onClick: fallback
  }, (0, _i18n._x)('Convert to link', 'button label')))));
};

var _default = EmbedPlaceholder;
exports.default = _default;
//# sourceMappingURL=embed-placeholder.js.map