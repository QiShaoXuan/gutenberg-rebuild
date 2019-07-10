"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

/**
 * WordPress dependencies
 */
function CopyContentMenuItem(_ref) {
  var editedPostContent = _ref.editedPostContent,
      hasCopied = _ref.hasCopied,
      setState = _ref.setState;
  return (0, _element.createElement)(_components.ClipboardButton, {
    text: editedPostContent,
    className: "components-menu-item__button",
    onCopy: function onCopy() {
      return setState({
        hasCopied: true
      });
    },
    onFinishCopy: function onFinishCopy() {
      return setState({
        hasCopied: false
      });
    }
  }, hasCopied ? (0, _i18n.__)('Copied!') : (0, _i18n.__)('Copy All Content'));
}

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
  return {
    editedPostContent: select('core/editor').getEditedPostAttribute('content')
  };
}), (0, _compose.withState)({
  hasCopied: false
}))(CopyContentMenuItem);

exports.default = _default;
//# sourceMappingURL=index.js.map