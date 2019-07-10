import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Dashicon } from '@wordpress/components';
import { PlainText } from '@wordpress/block-editor';
import { withInstanceId } from '@wordpress/compose';

var ShortcodeEdit = function ShortcodeEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      instanceId = _ref.instanceId;
  var inputId = "blocks-shortcode-input-".concat(instanceId);
  return createElement("div", {
    className: "wp-block-shortcode"
  }, createElement("label", {
    htmlFor: inputId
  }, createElement(Dashicon, {
    icon: "shortcode"
  }), __('Shortcode')), createElement(PlainText, {
    className: "input-control",
    id: inputId,
    value: attributes.text,
    placeholder: __('Write shortcode here…'),
    onChange: function onChange(text) {
      return setAttributes({
        text: text
      });
    }
  }));
};

export default withInstanceId(ShortcodeEdit);
//# sourceMappingURL=edit.js.map