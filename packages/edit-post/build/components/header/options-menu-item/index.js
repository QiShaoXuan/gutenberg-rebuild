"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsMenuItem = OptionsMenuItem;
exports.default = void 0;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */
function OptionsMenuItem(_ref) {
  var openModal = _ref.openModal,
      onSelect = _ref.onSelect;
  return (0, _element.createElement)(_components.MenuItem, {
    onClick: function onClick() {
      onSelect();
      openModal('edit-post/options');
    }
  }, (0, _i18n.__)('Options'));
}

var _default = (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      openModal = _dispatch.openModal;

  return {
    openModal: openModal
  };
})(OptionsMenuItem);

exports.default = _default;
//# sourceMappingURL=index.js.map