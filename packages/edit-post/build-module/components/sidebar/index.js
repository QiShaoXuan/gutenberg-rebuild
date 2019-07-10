import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { createSlotFill, withFocusReturn, Animate } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { ifCondition, compose } from '@wordpress/compose';

var _createSlotFill = createSlotFill('Sidebar'),
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
  return createElement("div", {
    className: classnames('edit-post-sidebar', className),
    role: "region",
    "aria-label": label,
    tabIndex: "-1"
  }, children);
}

Sidebar = withFocusReturn({
  onFocusReturn: function onFocusReturn() {
    var button = document.querySelector('.edit-post-header__settings [aria-label="Settings"]');

    if (button) {
      button.focus();
      return false;
    }
  }
})(Sidebar);

function AnimatedSidebarFill(props) {
  return createElement(Fill, null, createElement(Animate, {
    type: "slide-in",
    options: {
      origin: 'left'
    }
  }, function () {
    return createElement(Sidebar, props);
  }));
}

var WrappedSidebar = compose(withSelect(function (select, _ref2) {
  var name = _ref2.name;
  return {
    isActive: select('core/edit-post').getActiveGeneralSidebarName() === name
  };
}), ifCondition(function (_ref3) {
  var isActive = _ref3.isActive;
  return isActive;
}))(AnimatedSidebarFill);
WrappedSidebar.Slot = Slot;
export default WrappedSidebar;
//# sourceMappingURL=index.js.map