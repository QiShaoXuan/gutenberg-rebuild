import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { mapValues } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { RegistryConsumer } from '../registry-provider';
/**
 * Higher-order component used to add dispatch props using registered action creators.
 *
 * @param {Object} mapDispatchToProps Object of prop names where value is a
 *                                    dispatch-bound action creator, or a
 *                                    function to be called with with the
 *                                    component's props and returning an
 *                                    action creator.
 *
 * @example
 * ```jsx
 * function Button( { onClick, children } ) {
 * 	return <button type="button" onClick={ onClick }>{ children }</button>;
 * }
 *
 * const { withDispatch } = wp.data;
 *
 * const SaleButton = withDispatch( ( dispatch, ownProps ) => {
 * 	const { startSale } = dispatch( 'my-shop' );
 * 	const { discountPercent } = ownProps;
 *
 * 	return {
 * 		onClick() {
 * 			startSale( discountPercent );
 * 		},
 * 	};
 * } )( Button );
 *
 * // Rendered in the application:
 * //
 * //  <SaleButton discountPercent="20">Start Sale!</SaleButton>
 * ```
 *
 * @example
 * In the majority of cases, it will be sufficient to use only two first params passed to `mapDispatchToProps` as illustrated in the previous example. However, there might be some very advanced use cases where using the `registry` object might be used as a tool to optimize the performance of your component. Using `select` function from the registry might be useful when you need to fetch some dynamic data from the store at the time when the event is fired, but at the same time, you never use it to render your component. In such scenario, you can avoid using the `withSelect` higher order component to compute such prop, which might lead to unnecessary re-renders of you component caused by its frequent value change. Keep in mind, that `mapDispatchToProps` must return an object with functions only.
 *
 * ```jsx
 * function Button( { onClick, children } ) {
 * 	return <button type="button" onClick={ onClick }>{ children }</button>;
 * }
 *
 * const { withDispatch } = wp.data;
 *
 * const SaleButton = withDispatch( ( dispatch, ownProps, { select } ) => {
 * 	// Stock number changes frequently.
 * 	const { getStockNumber } = select( 'my-shop' );
 * 	const { startSale } = dispatch( 'my-shop' );
 *
 * 	return {
 * 		onClick() {
 * 			const dicountPercent = getStockNumber() > 50 ? 10 : 20;
 * 			startSale( discountPercent );
 * 		},
 * 	};
 * } )( Button );
 *
 * // Rendered in the application:
 * //
 * //  <SaleButton>Start Sale!</SaleButton>
 * ```
 * _Note:_ It is important that the `mapDispatchToProps` function always returns an object with the same keys. For example, it should not contain conditions under which a different value would be returned.
 *
 * @return {Component} Enhanced component with merged dispatcher props.
 */

var withDispatch = function withDispatch(mapDispatchToProps) {
  return createHigherOrderComponent(function (WrappedComponent) {
    var ComponentWithDispatch =
    /*#__PURE__*/
    function (_Component) {
      _inherits(ComponentWithDispatch, _Component);

      function ComponentWithDispatch(props) {
        var _this;

        _classCallCheck(this, ComponentWithDispatch);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(ComponentWithDispatch).apply(this, arguments));
        _this.proxyProps = {};

        _this.setProxyProps(props);

        return _this;
      }

      _createClass(ComponentWithDispatch, [{
        key: "proxyDispatch",
        value: function proxyDispatch(propName) {
          var _mapDispatchToProps;

          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          // Original dispatcher is a pre-bound (dispatching) action creator.
          (_mapDispatchToProps = mapDispatchToProps(this.props.registry.dispatch, this.props.ownProps, this.props.registry))[propName].apply(_mapDispatchToProps, args);
        }
      }, {
        key: "setProxyProps",
        value: function setProxyProps(props) {
          var _this2 = this;

          // Assign as instance property so that in subsequent render
          // reconciliation, the prop values are referentially equal.
          // Importantly, note that while `mapDispatchToProps` is
          // called, it is done only to determine the keys for which
          // proxy functions should be created. The actual registry
          // dispatch does not occur until the function is called.
          var propsToDispatchers = mapDispatchToProps(this.props.registry.dispatch, props.ownProps, this.props.registry);
          this.proxyProps = mapValues(propsToDispatchers, function (dispatcher, propName) {
            if (typeof dispatcher !== 'function') {
              // eslint-disable-next-line no-console
              console.warn("Property ".concat(propName, " returned from mapDispatchToProps in withDispatch must be a function."));
            } // Prebind with prop name so we have reference to the original
            // dispatcher to invoke. Track between re-renders to avoid
            // creating new function references every render.


            if (_this2.proxyProps.hasOwnProperty(propName)) {
              return _this2.proxyProps[propName];
            }

            return _this2.proxyDispatch.bind(_this2, propName);
          });
        }
      }, {
        key: "render",
        value: function render() {
          return createElement(WrappedComponent, _extends({}, this.props.ownProps, this.proxyProps));
        }
      }]);

      return ComponentWithDispatch;
    }(Component);

    return function (ownProps) {
      return createElement(RegistryConsumer, null, function (registry) {
        return createElement(ComponentWithDispatch, {
          ownProps: ownProps,
          registry: registry
        });
      });
    };
  }, 'withDispatch');
};

export default withDispatch;
//# sourceMappingURL=index.js.map