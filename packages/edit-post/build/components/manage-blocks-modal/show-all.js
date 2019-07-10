"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function BlockManagerShowAll(_ref) {
  var instanceId = _ref.instanceId,
      checked = _ref.checked,
      _onChange = _ref.onChange;
  var id = 'edit-post-manage-blocks-modal__show-all-' + instanceId;
  return (0, _element.createElement)("div", {
    className: "edit-post-manage-blocks-modal__show-all"
  }, (0, _element.createElement)("label", {
    htmlFor: id,
    className: "edit-post-manage-blocks-modal__show-all-label"
  },
  /* translators: Checkbox toggle label */
  (0, _i18n.__)('Show section')), (0, _element.createElement)(_components.FormToggle, {
    id: id,
    checked: checked,
    onChange: function onChange(event) {
      return _onChange(event.target.checked);
    }
  }));
}

var _default = (0, _compose.withInstanceId)(BlockManagerShowAll);

exports.default = _default;
//# sourceMappingURL=show-all.js.map