"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = require("@wordpress/components");

var _context = require("../block-edit/context");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var _createSlotFill = (0, _components.createSlotFill)('InspectorControls'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;

var InspectorControls = (0, _context.ifBlockEditSelected)(Fill);
InspectorControls.Slot = Slot;
var _default = InspectorControls;
exports.default = _default;
//# sourceMappingURL=index.js.map