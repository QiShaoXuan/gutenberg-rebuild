"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var _createSlotFill = (0, _components.createSlotFill)('PluginBlockSettingsMenuGroup'),
    PluginBlockSettingsMenuGroup = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

var PluginBlockSettingsMenuGroupSlot = function PluginBlockSettingsMenuGroupSlot(_ref) {
  var fillProps = _ref.fillProps,
      selectedBlocks = _ref.selectedBlocks;
  selectedBlocks = (0, _lodash.map)(selectedBlocks, function (block) {
    return block.name;
  });
  return (0, _element.createElement)(Slot, {
    fillProps: (0, _objectSpread2.default)({}, fillProps, {
      selectedBlocks: selectedBlocks
    })
  }, function (fills) {
    return !(0, _lodash.isEmpty)(fills) && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("div", {
      className: "editor-block-settings-menu__separator block-editor-block-settings-menu__separator"
    }), fills);
  });
};

PluginBlockSettingsMenuGroup.Slot = (0, _data.withSelect)(function (select, _ref2) {
  var clientIds = _ref2.fillProps.clientIds;
  return {
    selectedBlocks: select('core/block-editor').getBlocksByClientId(clientIds)
  };
})(PluginBlockSettingsMenuGroupSlot);
var _default = PluginBlockSettingsMenuGroup;
exports.default = _default;
//# sourceMappingURL=plugin-block-settings-menu-group.js.map