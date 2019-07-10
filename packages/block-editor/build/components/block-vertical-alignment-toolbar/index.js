"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockVerticalAlignmentToolbar = BlockVerticalAlignmentToolbar;
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _viewport = require("@wordpress/viewport");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _context = require("../block-edit/context");

var _icons = require("./icons");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BLOCK_ALIGNMENTS_CONTROLS = {
  top: {
    icon: _icons.alignTop,
    title: (0, _i18n._x)('Vertically Align Top', 'Block vertical alignment setting')
  },
  center: {
    icon: _icons.alignCenter,
    title: (0, _i18n._x)('Vertically Align Middle', 'Block vertical alignment setting')
  },
  bottom: {
    icon: _icons.alignBottom,
    title: (0, _i18n._x)('Vertically Align Bottom', 'Block vertical alignment setting')
  }
};
var DEFAULT_CONTROLS = ['top', 'center', 'bottom'];
var DEFAULT_CONTROL = 'top';

function BlockVerticalAlignmentToolbar(_ref) {
  var isCollapsed = _ref.isCollapsed,
      value = _ref.value,
      onChange = _ref.onChange,
      _ref$controls = _ref.controls,
      controls = _ref$controls === void 0 ? DEFAULT_CONTROLS : _ref$controls;

  function applyOrUnset(align) {
    return function () {
      return onChange(value === align ? undefined : align);
    };
  }

  var activeAlignment = BLOCK_ALIGNMENTS_CONTROLS[value];
  var defaultAlignmentControl = BLOCK_ALIGNMENTS_CONTROLS[DEFAULT_CONTROL];
  return (0, _element.createElement)(_components.Toolbar, {
    isCollapsed: isCollapsed,
    icon: activeAlignment ? activeAlignment.icon : defaultAlignmentControl.icon,
    label: (0, _i18n._x)('Change Alignment', 'Block vertical alignment setting label'),
    controls: controls.map(function (control) {
      return (0, _objectSpread2.default)({}, BLOCK_ALIGNMENTS_CONTROLS[control], {
        isActive: value === control,
        onClick: applyOrUnset(control)
      });
    })
  });
}

var _default = (0, _compose.compose)((0, _context.withBlockEditContext)(function (_ref2) {
  var clientId = _ref2.clientId;
  return {
    clientId: clientId
  };
}), (0, _viewport.withViewportMatch)({
  isLargeViewport: 'medium'
}), (0, _data.withSelect)(function (select, _ref3) {
  var clientId = _ref3.clientId,
      isLargeViewport = _ref3.isLargeViewport,
      isCollapsed = _ref3.isCollapsed;

  var _select = select('core/editor'),
      getBlockRootClientId = _select.getBlockRootClientId,
      getEditorSettings = _select.getEditorSettings;

  return {
    isCollapsed: isCollapsed || !isLargeViewport || !getEditorSettings().hasFixedToolbar && getBlockRootClientId(clientId)
  };
}))(BlockVerticalAlignmentToolbar);

exports.default = _default;
//# sourceMappingURL=index.js.map