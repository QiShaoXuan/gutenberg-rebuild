"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var _createSlotFill = (0, _components.createSlotFill)('PluginsMoreMenuGroup'),
    PluginsMoreMenuGroup = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

PluginsMoreMenuGroup.Slot = function (_ref) {
  var fillProps = _ref.fillProps;
  return (0, _element.createElement)(Slot, {
    fillProps: fillProps
  }, function (fills) {
    return !(0, _lodash.isEmpty)(fills) && (0, _element.createElement)(_components.MenuGroup, {
      label: (0, _i18n.__)('Plugins')
    }, fills);
  });
};

var _default = PluginsMoreMenuGroup;
exports.default = _default;
//# sourceMappingURL=index.js.map