"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

/**
 * WordPress dependencies
 */
var FormatToolbar = function FormatToolbar(_ref) {
  var controls = _ref.controls;
  return (0, _element.createElement)(_components.Toolbar, null, controls.map(function (format) {
    return (0, _element.createElement)(_components.Slot, {
      name: "RichText.ToolbarControls.".concat(format),
      key: format
    });
  }), (0, _element.createElement)(_components.Slot, {
    name: "RichText.ToolbarControls"
  }));
};

var _default = FormatToolbar;
exports.default = _default;
//# sourceMappingURL=index.native.js.map