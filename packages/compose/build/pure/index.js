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

var _isShallowEqual = _interopRequireDefault(require("@wordpress/is-shallow-equal"));

var _createHigherOrderComponent = _interopRequireDefault(require("../create-higher-order-component"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Given a component returns the enhanced component augmented with a component
 * only rerendering when its props/state change
 *
 * @param {Function} mapComponentToEnhancedComponent Function mapping component
 *                                                   to enhanced component.
 * @param {string}   modifierName                    Seed name from which to
 *                                                   generated display name.
 *
 * @return {WPComponent} Component class with generated display name assigned.
 */
var pure = (0, _createHigherOrderComponent.default)(function (Wrapped) {
  if (Wrapped.prototype instanceof _element.Component) {
    return (
      /*#__PURE__*/
      function (_Wrapped) {
        (0, _inherits2.default)(_class, _Wrapped);

        function _class() {
          (0, _classCallCheck2.default)(this, _class);
          return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
        }

        (0, _createClass2.default)(_class, [{
          key: "shouldComponentUpdate",
          value: function shouldComponentUpdate(nextProps, nextState) {
            return !(0, _isShallowEqual.default)(nextProps, this.props) || !(0, _isShallowEqual.default)(nextState, this.state);
          }
        }]);
        return _class;
      }(Wrapped)
    );
  }

  return (
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(_class2, _Component);

      function _class2() {
        (0, _classCallCheck2.default)(this, _class2);
        return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class2).apply(this, arguments));
      }

      (0, _createClass2.default)(_class2, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
          return !(0, _isShallowEqual.default)(nextProps, this.props);
        }
      }, {
        key: "render",
        value: function render() {
          return (0, _element.createElement)(Wrapped, this.props);
        }
      }]);
      return _class2;
    }(_element.Component)
  );
}, 'pure');
var _default = pure;
exports.default = _default;
//# sourceMappingURL=index.js.map