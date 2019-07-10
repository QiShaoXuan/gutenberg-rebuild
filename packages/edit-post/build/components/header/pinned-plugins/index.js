"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _components = require("@wordpress/components");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var _createSlotFill = (0, _components.createSlotFill)('PinnedPlugins'),
    PinnedPlugins = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

PinnedPlugins.Slot = function (props) {
  return (0, _element.createElement)(Slot, props, function (fills) {
    return !(0, _lodash.isEmpty)(fills) && (0, _element.createElement)("div", {
      className: "edit-post-pinned-plugins"
    }, fills);
  });
};

var _default = PinnedPlugins;
exports.default = _default;
//# sourceMappingURL=index.js.map