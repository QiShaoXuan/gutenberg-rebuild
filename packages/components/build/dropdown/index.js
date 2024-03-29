"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _popover = _interopRequireDefault(require("../popover"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var Dropdown =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Dropdown, _Component);

  function Dropdown() {
    var _this;

    (0, _classCallCheck2.default)(this, Dropdown);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Dropdown).apply(this, arguments));
    _this.toggle = _this.toggle.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.close = _this.close.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.closeIfClickOutside = _this.closeIfClickOutside.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.containerRef = (0, _element.createRef)();
    _this.state = {
      isOpen: false
    };
    return _this;
  }

  (0, _createClass2.default)(Dropdown, [{
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
      return (0, _element.createElement)("div", {
        className: className,
        ref: this.containerRef
      }, renderToggle(args), isOpen && (0, _element.createElement)(_popover.default, {
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
}(_element.Component);

var _default = Dropdown;
exports.default = _default;
//# sourceMappingURL=index.js.map