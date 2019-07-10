"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockAlignmentToolbar = BlockAlignmentToolbar;
exports.default = void 0;

var _element = require("@wordpress/element");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _viewport = require("@wordpress/viewport");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _context = require("../block-edit/context");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var BLOCK_ALIGNMENTS_CONTROLS = {
  left: {
    icon: 'align-left',
    title: (0, _i18n.__)('Align left')
  },
  center: {
    icon: 'align-center',
    title: (0, _i18n.__)('Align center')
  },
  right: {
    icon: 'align-right',
    title: (0, _i18n.__)('Align right')
  },
  wide: {
    icon: 'align-wide',
    title: (0, _i18n.__)('Wide width')
  },
  full: {
    icon: 'align-full-width',
    title: (0, _i18n.__)('Full width')
  }
};
var DEFAULT_CONTROLS = ['left', 'center', 'right', 'wide', 'full'];
var WIDE_CONTROLS = ['wide', 'full'];

function BlockAlignmentToolbar(_ref) {
  var isCollapsed = _ref.isCollapsed,
      value = _ref.value,
      onChange = _ref.onChange,
      _ref$controls = _ref.controls,
      controls = _ref$controls === void 0 ? DEFAULT_CONTROLS : _ref$controls,
      _ref$wideControlsEnab = _ref.wideControlsEnabled,
      wideControlsEnabled = _ref$wideControlsEnab === void 0 ? false : _ref$wideControlsEnab;

  function applyOrUnset(align) {
    return function () {
      return onChange(value === align ? undefined : align);
    };
  }

  var enabledControls = wideControlsEnabled ? controls : controls.filter(function (control) {
    return WIDE_CONTROLS.indexOf(control) === -1;
  });
  var activeAlignment = BLOCK_ALIGNMENTS_CONTROLS[value];
  return (0, _element.createElement)(_components.Toolbar, {
    isCollapsed: isCollapsed,
    icon: activeAlignment ? activeAlignment.icon : 'align-left',
    label: (0, _i18n.__)('Change Alignment'),
    controls: enabledControls.map(function (control) {
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

  var _select = select('core/block-editor'),
      getBlockRootClientId = _select.getBlockRootClientId,
      getSettings = _select.getSettings;

  var settings = getSettings();
  return {
    wideControlsEnabled: settings.alignWide,
    isCollapsed: isCollapsed || !isLargeViewport || !settings.hasFixedToolbar && getBlockRootClientId(clientId)
  };
}))(BlockAlignmentToolbar);

exports.default = _default;
//# sourceMappingURL=index.js.map