"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _compose = require("@wordpress/compose");

/**
 * WordPress dependencies
 */
var ShortcodeEdit = function ShortcodeEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      instanceId = _ref.instanceId;
  var inputId = "blocks-shortcode-input-".concat(instanceId);
  return (0, _element.createElement)("div", {
    className: "wp-block-shortcode"
  }, (0, _element.createElement)("label", {
    htmlFor: inputId
  }, (0, _element.createElement)(_components.Dashicon, {
    icon: "shortcode"
  }), (0, _i18n.__)('Shortcode')), (0, _element.createElement)(_blockEditor.PlainText, {
    className: "input-control",
    id: inputId,
    value: attributes.text,
    placeholder: (0, _i18n.__)('Write shortcode here…'),
    onChange: function onChange(text) {
      return setAttributes({
        text: text
      });
    }
  }));
};

var _default = (0, _compose.withInstanceId)(ShortcodeEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map