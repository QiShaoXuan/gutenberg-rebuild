"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var _createSlotFill = (0, _components.createSlotFill)('Sidebar'),
    Fill = _createSlotFill.Fill,
    Slot = _createSlotFill.Slot;
/**
 * Renders a sidebar with its content.
 *
 * @return {Object} The rendered sidebar.
 */


function Sidebar(_ref) {
  var children = _ref.children,
      label = _ref.label,
      className = _ref.className;
  return (0, _element.createElement)("div", {
    className: (0, _classnames.default)('edit-post-sidebar', className),
    role: "region",
    "aria-label": label,
    tabIndex: "-1"
  }, children);
}

Sidebar = (0, _components.withFocusReturn)({
  onFocusReturn: function onFocusReturn() {
    var button = document.querySelector('.edit-post-header__settings [aria-label="Settings"]');

    if (button) {
      button.focus();
      return false;
    }
  }
})(Sidebar);

function AnimatedSidebarFill(props) {
  return (0, _element.createElement)(Fill, null, (0, _element.createElement)(_components.Animate, {
    type: "slide-in",
    options: {
      origin: 'left'
    }
  }, function () {
    return (0, _element.createElement)(Sidebar, props);
  }));
}

var WrappedSidebar = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref2) {
  var name = _ref2.name;
  return {
    isActive: select('core/edit-post').getActiveGeneralSidebarName() === name
  };
}), (0, _compose.ifCondition)(function (_ref3) {
  var isActive = _ref3.isActive;
  return isActive;
}))(AnimatedSidebarFill);
WrappedSidebar.Slot = Slot;
var _default = WrappedSidebar;
exports.default = _default;
//# sourceMappingURL=index.js.map