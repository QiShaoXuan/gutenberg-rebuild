import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Component, createRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Popover from '../popover';

var Dropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown() {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).apply(this, arguments));
    _this.toggle = _this.toggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.close = _this.close.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.closeIfClickOutside = _this.closeIfClickOutside.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.containerRef = createRef();
    _this.state = {
      isOpen: false
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var isOpen = this.state.isOpen;
      var onToggle = this.props.onToggle;

      if (isOpen && onToggle) {
        onToggle(false);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var isOpen = this.state.isOpen;
      var onToggle = this.props.onToggle;

      if (prevState.isOpen !== isOpen && onToggle) {
        onToggle(isOpen);
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.setState(function (state) {
        return {
          isOpen: !state.isOpen
        };
      });
    }
    /**
     * Closes the dropdown if a click occurs outside the dropdown wrapper. This
     * is intentionally distinct from `onClose` in that a click outside the
     * popover may occur in the toggling of the dropdown via its toggle button.
     * The correct behavior is to keep the dropdown closed.
     *
     * @param {MouseEvent} event Click event triggering `onClickOutside`.
     */

  }, {
    key: "closeIfClickOutside",
    value: function closeIfClickOutside(event) {
      if (!this.containerRef.current.contains(event.target)) {
        this.close();
      }
    }
  }, {
    key: "close",
    value: function close() {
      this.setState({
        isOpen: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var isOpen = this.state.isOpen;
      var _this$props = this.props,
          renderContent = _this$props.renderContent,
          renderToggle = _this$props.renderToggle,
          _this$props$position = _this$props.position,
          position = _this$props$position === void 0 ? 'bottom' : _this$props$position,
          className = _this$props.className,
          contentClassName = _this$props.contentClassName,
          expandOnMobile = _this$props.expandOnMobile,
          headerTitle = _this$props.headerTitle,
          focusOnMount = _this$props.focusOnMount;
      var args = {
        isOpen: isOpen,
        onToggle: this.toggle,
        onClose: this.close
      };
      return createElement("div", {
        className: className,
        ref: this.containerRef
      }, renderToggle(args), isOpen && createElement(Popover, {
        className: contentClassName,
        position: position,
        onClose: this.close,
        onClickOutside: this.closeIfClickOutside,
        expandOnMobile: expandOnMobile,
        headerTitle: headerTitle,
        focusOnMount: focusOnMount
      }, renderContent(args)));
    }
  }]);

  return Dropdown;
}(Component);

export default Dropdown;
//# sourceMappingURL=index.js.map