"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var FormatToolbar = function FormatToolbar(_ref) {
  var controls = _ref.controls;
  return (0, _element.createElement)("div", {
    className: "editor-format-toolbar block-editor-format-toolbar"
  }, (0, _element.createElement)(_components.Toolbar, null, controls.map(function (format) {
    return (0, _element.createElement)(_components.Slot, {
      name: "RichText.ToolbarControls.".concat(format),
      key: format
    });
  }), (0, _element.createElement)(_components.Slot, {
    name: "RichText.ToolbarControls"
  }, function (fills) {
    return fills.length !== 0 && (0, _element.createElement)(_components.DropdownMenu, {
      icon: false,
      position: "bottom left",
      label: (0, _i18n.__)('More Rich Text Controls'),
      controls: (0, _lodash.orderBy)(fills.map(function (_ref2) {
        var _ref3 = (0, _slicedToArray2.default)(_ref2, 1),
            props = _ref3[0].props;

        return props;
      }), 'title')
    });
  })));
};

var _default = FormatToolbar;
exports.default = _default;
//# sourceMappingURL=index.js.map