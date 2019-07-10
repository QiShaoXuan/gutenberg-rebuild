import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { createContext } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

var _createContext = createContext({
  name: null,
  icon: null
}),
    Consumer = _createContext.Consumer,
    Provider = _createContext.Provider;

export { Provider as PluginContextProvider };
/**
 * A Higher Order Component used to inject Plugin context to the
 * wrapped component.
 *
 * @param {Function} mapContextToProps Function called on every context change,
 *                                     expected to return object of props to
 *                                     merge with the component's own props.
 *
 * @return {Component} Enhanced component with injected context as props.
 */

export var withPluginContext = function withPluginContext(mapContextToProps) {
  return createHigherOrderComponent(function (OriginalComponent) {
    return function (props) {
      return createElement(Consumer, null, function (context) {
        return createElement(OriginalComponent, _extends({}, props, mapContextToProps(context, props)));
      });
    };
  }, 'withPluginContext');
};
//# sourceMappingURL=index.js.map