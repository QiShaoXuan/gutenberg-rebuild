import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { find } from 'lodash';
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
var DEFAULT_ALIGNMENT_CONTROLS = [{
  icon: 'editor-alignleft',
  title: __('Align text left'),
  align: 'left'
}, {
  icon: 'editor-aligncenter',
  title: __('Align text center'),
  align: 'center'
}, {
  icon: 'editor-alignright',
  title: __('Align text right'),
  align: 'right'
}];
export function AlignmentToolbar(_ref) {
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

  var activeAlignment = find(alignmentControls, function (control) {
    return control.align === value;
  });
  return createElement(Toolbar, {
    isCollapsed: isCollapsed,
    icon: activeAlignment ? activeAlignment.icon : 'editor-alignleft',
    label: __('Change Text Alignment'),
    controls: alignmentControls.map(function (control) {
      var align = control.align;
      var isActive = value === align;
      return _objectSpread({}, control, {
        isActive: isActive,
        onClick: applyOrUnset(align)
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

  return {
    isCollapsed: isCollapsed || !isLargeViewport || !getSettings().hasFixedToolbar && getBlockRootClientId(clientId)
  };
}))(AlignmentToolbar);
//# sourceMappingURL=index.js.map