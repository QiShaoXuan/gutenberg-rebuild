import _extends from "@babel/runtime/helpers/esm/extends";
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
import { Component } from '@wordpress/element';
/**
 * Internal dependencies
 */

import createHigherOrderComponent from '../create-higher-order-component';
/**
 * A Higher Order Component used to provide and manage internal component state
 * via props.
 *
 * @param {?Object} initialState Optional initial state of the component.
 *
 * @return {Component} Wrapped component.
 */

export default function withState() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return createHigherOrderComponent(function (OriginalComponent) {
    return (
      /*#__PURE__*/
      function (_Component) {
        _inherits(WrappedComponent, _Component);

        function WrappedComponent() {
          var _this;

          _classCallCheck(this, WrappedComponent);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(WrappedComponent).apply(this, arguments));
          _this.setState = _this.setState.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.state = initialState;
          return _this;
        }

        _createClass(WrappedComponent, [{
          key: "render",
          value: function render() {
            return createElement(OriginalComponent, _extends({}, this.props, this.state, {
              setState: this.setState
            }));
          }
        }]);

        return WrappedComponent;
      }(Component)
    );
  }, 'withState');
}
//# sourceMappingURL=index.js.map