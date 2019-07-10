import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Toolbar } from '@wordpress/components';
import { withViewportMatch } from '@wordpress/viewport';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { withBlockEditContext } from '../block-edit/context';
var BLOCK_ALIGNMENTS_CONTROLS = {
  left: {
    icon: 'align-left',
    title: __('Align left')
  },
  center: {
    icon: 'align-center',
    title: __('Align center')
  },
  right: {
    icon: 'align-right',
    title: __('Align right')
  },
  wide: {
    icon: 'align-wide',
    title: __('Wide width')
  },
  full: {
    icon: 'align-full-width',
    title: __('Full width')
  }
};
var DEFAULT_CONTROLS = ['left', 'center', 'right', 'wide', 'full'];
var WIDE_CONTROLS = ['wide', 'full'];
export function BlockAlignmentToolbar(_ref) {
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
  return createElement(Toolbar, {
    isCollapsed: isCollapsed,
    icon: activeAlignment ? activeAlignment.icon : 'align-left',
    label: __('Change Alignment'),
    controls: enabledControls.map(function (control) {
      return _objectSpread({}, BLOCK_ALIGNMENTS_CONTROLS[control], {
        isActive: value === control,
        onClick: applyOrUnset(control)
      });
    })
  });
}
export default compose(withBlockEditContext(function (_ref2) {
  var clientId = _ref2.clientId;
  return {
    clientId: clientId
  };
}), withViewportMatch({
  isLargeViewport: 'medium'
}), withSelect(function (select, _ref3) {
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
//# sourceMappingURL=index.js.map