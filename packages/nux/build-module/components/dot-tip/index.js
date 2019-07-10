import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { Popover, Button, IconButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withSelect, withDispatch } from '@wordpress/data';

function getAnchorRect(anchor) {
  // The default getAnchorRect() excludes an element's top and bottom padding
  // from its calculation. We want tips to point to the outer margin of an
  // element, so we override getAnchorRect() to include all padding.
  return anchor.parentNode.getBoundingClientRect();
}

function onClick(event) {
  // Tips are often nested within buttons. We stop propagation so that clicking
  // on a tip doesn't result in the button being clicked.
  event.stopPropagation();
}

export function DotTip(_ref) {
  var children = _ref.children,
      isVisible = _ref.isVisible,
      hasNextTip = _ref.hasNextTip,
      onDismiss = _ref.onDismiss,
      onDisable = _ref.onDisable;

  if (!isVisible) {
    return null;
  }

  return createElement(Popover, {
    className: "nux-dot-tip",
    position: "middle right",
    noArrow: true,
    focusOnMount: "container",
    getAnchorRect: getAnchorRect,
    role: "dialog",
    "aria-label": __('Editor tips'),
    onClick: onClick
  }, createElement("p", null, children), createElement("p", null, createElement(Button, {
    isLink: true,
    onClick: onDismiss
  }, hasNextTip ? __('See next tip') : __('Got it'))), createElement(IconButton, {
    className: "nux-dot-tip__disable",
    icon: "no-alt",
    label: __('Disable tips'),
    onClick: onDisable
  }));
}
export default compose(withSelect(function (select, _ref2) {
  var tipId = _ref2.tipId;

  var _select = select('core/nux'),
      isTipVisible = _select.isTipVisible,
      getAssociatedGuide = _select.getAssociatedGuide;

  var associatedGuide = getAssociatedGuide(tipId);
  return {
    isVisible: isTipVisible(tipId),
    hasNextTip: !!(associatedGuide && associatedGuide.nextTipId)
  };
}), withDispatch(function (dispatch, _ref3) {
  var tipId = _ref3.tipId;

  var _dispatch = dispatch('core/nux'),
      dismissTip = _dispatch.dismissTip,
      disableTips = _dispatch.disableTips;

  return {
    onDismiss: function onDismiss() {
      dismissTip(tipId);
    },
    onDisable: function onDisable() {
      disableTips();
    }
  };
}))(DotTip);
//# sourceMappingURL=index.js.map