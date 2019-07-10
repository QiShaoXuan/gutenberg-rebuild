"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlignmentToolbar = AlignmentToolbar;
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _viewport = require("@wordpress/viewport");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _context = require("../block-edit/context");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var DEFAULT_ALIGNMENT_CONTROLS = [{
  icon: 'editor-alignleft',
  title: (0, _i18n.__)('Align text left'),
  align: 'left'
}, {
  icon: 'editor-aligncenter',
  title: (0, _i18n.__)('Align text center'),
  align: 'center'
}, {
  icon: 'editor-alignright',
  title: (0, _i18n.__)('Align text right'),
  align: 'right'
}];

function AlignmentToolbar(_ref) {
  var isCollapsed = _ref.isCollapsed,
      value = _ref.value,
      onChange = _ref.onChange,
      _ref$alignmentControl = _ref.alignmentControls,
      alignmentControls = _ref$alignmentControl === void 0 ? DEFAULT_ALIGNMENT_CONTROLS : _ref$alignmentControl;

  function applyOrUnset(align) {
    return function () {
      return onChange(value === align ? undefined : align);
    };
  }

  var activeAlignment = (0, _lodash.find)(alignmentControls, function (control) {
    return control.align === value;
  });
  return (0, _element.createElement)(_components.Toolbar, {
    isCollapsed: isCollapsed,
    icon: activeAlignment ? activeAlignment.icon : 'editor-alignleft',
    label: (0, _i18n.__)('Change Text Alignment'),
    controls: alignmentControls.map(function (control) {
      var align = control.align;
      var isActive = value === align;
      return (0, _objectSpread2.default)({}, control, {
        isActive: isActive,
        onClick: applyOrUnset(align)
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

  var _select = select('core/block-editor'),
      getBlockRootClientId = _select.getBlockRootClientId,
      getSettings = _select.getSettings;

  return {
    isCollapsed: isCollapsed || !isLargeViewport || !getSettings().hasFixedToolbar && getBlockRootClientId(clientId)
  };
}))(AlignmentToolbar);

exports.default = _default;
//# sourceMappingURL=index.js.map