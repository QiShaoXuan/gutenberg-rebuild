import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { Button, Placeholder } from '@wordpress/components';
import { BlockIcon } from '@wordpress/block-editor';

var EmbedPlaceholder = function EmbedPlaceholder(props) {
  var icon = props.icon,
      label = props.label,
      value = props.value,
      onSubmit = props.onSubmit,
      onChange = props.onChange,
      cannotEmbed = props.cannotEmbed,
      fallback = props.fallback,
      tryAgain = props.tryAgain;
  return createElement(Placeholder, {
    icon: createElement(BlockIcon, {
      icon: icon,
      showColors: true
    }),
    label: label,
    className: "wp-block-embed"
  }, createElement("form", {
    onSubmit: onSubmit
  }, createElement("input", {
    type: "url",
    value: value || '',
    className: "components-placeholder__input",
    "aria-label": label,
    placeholder: __('Enter URL to embed here…'),
    onChange: onChange
  }), createElement(Button, {
    isLarge: true,
    type: "submit"
  }, _x('Embed', 'button label')), cannotEmbed && createElement("p", {
    className: "components-placeholder__error"
  }, __('Sorry, this content could not be embedded.'), createElement("br", null), createElement(Button, {
    isLarge: true,
    onClick: tryAgain
  }, _x('Try again', 'button label')), " ", createElement(Button, {
    isLarge: true,
    onClick: fallback
  }, _x('Convert to link', 'button label')))));
};

export default EmbedPlaceholder;
//# sourceMappingURL=embed-placeholder.js.map