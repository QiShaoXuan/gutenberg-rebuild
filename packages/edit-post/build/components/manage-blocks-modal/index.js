"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManageBlocksModal = ManageBlocksModal;
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _manager = _interopRequireDefault(require("./manager"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Unique identifier for Manage Blocks modal.
 *
 * @type {string}
 */
var MODAL_NAME = 'edit-post/manage-blocks';

function ManageBlocksModal(_ref) {
  var isActive = _ref.isActive,
      closeModal = _ref.closeModal;

  if (!isActive) {
    return null;
  }

  return (0, _element.createElement)(_components.Modal, {
    className: "edit-post-manage-blocks-modal",
    title: (0, _i18n.__)('Block Manager'),
    closeLabel: (0, _i18n.__)('Close'),
    onRequestClose: closeModal
  }, (0, _element.createElement)(_manager.default, null));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/edit-post'),
      isModalActive = _select.isModalActive;

  return {
    isActive: isModalActive(MODAL_NAME)
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      closeModal = _dispatch.closeModal;

  return {
    closeModal: closeModal
  };
})])(ManageBlocksModal);

exports.default = _default;
//# sourceMappingURL=index.js.map