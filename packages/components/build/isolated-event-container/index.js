"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

/**
 * WordPress dependencies
 */
var IsolatedEventContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(IsolatedEventContainer, _Component);

  function IsolatedEventContainer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, IsolatedEventContainer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(IsolatedEventContainer).call(this, props));
    _this.stopEventPropagationOutsideContainer = _this.stopEventPropagationOutsideContainer.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(IsolatedEventContainer, [{
    key: "stopEventPropagationOutsideContainer",
    value: function stopEventPropagationOutsideContainer(event) {
      event.stopPropagation();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["children"]); // Disable reason: this stops certain events from propagating outside of the component.
      //   - onMouseDown is disabled as this can cause interactions with other DOM elements

      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return (0, _element.createElement)("div", (0, _extends2.default)({}, props, {
        onMouseDown: this.stopEventPropagationOutsideContainer
      }), children);
    }
  }]);
  return IsolatedEventContainer;
}(_element.Component);

var _default = IsolatedEventContainer;
exports.default = _default;
//# sourceMappingURL=index.js.map