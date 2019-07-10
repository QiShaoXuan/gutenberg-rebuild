"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DotTip = DotTip;
exports.default = void 0;

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
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

function DotTip(_ref) {
  var children = _ref.children,
      isVisible = _ref.isVisible,
      hasNextTip = _ref.hasNextTip,
      onDismiss = _ref.onDismiss,
      onDisable = _ref.onDisable;

  if (!isVisible) {
    return null;
  }

  return (0, _element.createElement)(_components.Popover, {
    className: "nux-dot-tip",
    position: "middle right",
    noArrow: true,
    focusOnMount: "container",
    getAnchorRect: getAnchorRect,
    role: "dialog",
    "aria-label": (0, _i18n.__)('Editor tips'),
    onClick: onClick
  }, (0, _element.createElement)("p", null, children), (0, _element.createElement)("p", null, (0, _element.createElement)(_components.Button, {
    isLink: true,
    onClick: onDismiss
  }, hasNextTip ? (0, _i18n.__)('See next tip') : (0, _i18n.__)('Got it'))), (0, _element.createElement)(_components.IconButton, {
    className: "nux-dot-tip__disable",
    icon: "no-alt",
    label: (0, _i18n.__)('Disable tips'),
    onClick: onDisable
  }));
}

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref2) {
  var tipId = _ref2.tipId;

  var _select = select('core/nux'),
      isTipVisible = _select.isTipVisible,
      getAssociatedGuide = _select.getAssociatedGuide;

  var associatedGuide = getAssociatedGuide(tipId);
  return {
    isVisible: isTipVisible(tipId),
    hasNextTip: !!(associatedGuide && associatedGuide.nextTipId)
  };
}), (0, _data.withDispatch)(function (dispatch, _ref3) {
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

exports.default = _default;
//# sourceMappingURL=index.js.map