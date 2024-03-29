"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withState;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _createHigherOrderComponent = _interopRequireDefault(require("../create-higher-order-component"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * A Higher Order Component used to provide and manage internal component state
 * via props.
 *
 * @param {?Object} initialState Optional initial state of the component.
 *
 * @return {Component} Wrapped component.
 */
function withState() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _createHigherOrderComponent.default)(function (OriginalComponent) {
    return (
      /*#__PURE__*/
      function (_Component) {
        (0, _inherits2.default)(WrappedComponent, _Component);

        function WrappedComponent() {
          var _this;

          (0, _classCallCheck2.default)(this, WrappedComponent);
          _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(WrappedComponent).apply(this, arguments));
          _this.setState = _this.setState.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
          _this.state = initialState;
          return _this;
        }

        (0, _createClass2.default)(WrappedComponent, [{
          key: "render",
          value: function render() {
            return (0, _element.createElement)(OriginalComponent, (0, _extends2.default)({}, this.props, this.state, {
              setState: this.setState
            }));
          }
        }]);
        return WrappedComponent;
      }(_element.Component)
    );
  }, 'withState');
}
//# sourceMappingURL=index.js.map