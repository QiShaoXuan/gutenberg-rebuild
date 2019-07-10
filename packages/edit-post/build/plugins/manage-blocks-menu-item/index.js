"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageBlocksMenuItem = ManageBlocksMenuItem;
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function ManageBlocksMenuItem(_ref) {
  var onSelect = _ref.onSelect,
      openModal = _ref.openModal;
  return (0, _element.createElement)(_components.MenuItem, {
    onClick: (0, _lodash.flow)([onSelect, function () {
      return openModal('edit-post/manage-blocks');
    }])
  }, (0, _i18n.__)('Block Manager'));
}

var _default = (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      openModal = _dispatch.openModal;

  return {
    openModal: openModal
  };
})(ManageBlocksMenuItem);

exports.default = _default;
//# sourceMappingURL=index.js.map