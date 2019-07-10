"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _blockSwitcher = _interopRequireDefault(require("../block-switcher"));

var _multiBlocksSwitcher = _interopRequireDefault(require("../block-switcher/multi-blocks-switcher"));

var _blockControls = _interopRequireDefault(require("../block-controls"));

var _blockFormatControls = _interopRequireDefault(require("../block-format-controls"));

var _blockSettingsMenu = _interopRequireDefault(require("../block-settings-menu"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function BlockToolbar(_ref) {
  var blockClientIds = _ref.blockClientIds,
      isValid = _ref.isValid,
      mode = _ref.mode;

  if (blockClientIds.length === 0) {
    return null;
  }

  if (blockClientIds.length > 1) {
    return (0, _element.createElement)("div", {
      className: "editor-block-toolbar block-editor-block-toolbar"
    }, (0, _element.createElement)(_multiBlocksSwitcher.default, null), (0, _element.createElement)(_blockSettingsMenu.default, {
      clientIds: blockClientIds
    }));
  }

  return (0, _element.createElement)("div", {
    className: "editor-block-toolbar block-editor-block-toolbar"
  }, mode === 'visual' && isValid && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockSwitcher.default, {
    clientIds: blockClientIds
  }), (0, _element.createElement)(_blockControls.default.Slot, null), (0, _element.createElement)(_blockFormatControls.default.Slot, null)), (0, _element.createElement)(_blockSettingsMenu.default, {
    clientIds: blockClientIds
  }));
}

var _default = (0, _data.withSelect)(function (select) {
  var _select = select('core/block-editor'),
      getBlockMode = _select.getBlockMode,
      getSelectedBlockClientIds = _select.getSelectedBlockClientIds,
      isBlockValid = _select.isBlockValid;

  var blockClientIds = getSelectedBlockClientIds();
  return {
    blockClientIds: blockClientIds,
    isValid: blockClientIds.length === 1 ? isBlockValid(blockClientIds[0]) : null,
    mode: blockClientIds.length === 1 ? getBlockMode(blockClientIds[0]) : null
  };
})(BlockToolbar);

exports.default = _default;
//# sourceMappingURL=index.js.map