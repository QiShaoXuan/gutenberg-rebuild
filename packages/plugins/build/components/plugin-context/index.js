"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withPluginContext = exports.PluginContextProvider = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _compose = require("@wordpress/compose");

/**
 * WordPress dependencies
 */
var _createContext = (0, _element.createContext)({
  name: null,
  icon: null
}),
    Consumer = _createContext.Consumer,
    Provider = _createContext.Provider;

exports.PluginContextProvider = Provider;

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
var withPluginContext = function withPluginContext(mapContextToProps) {
  return (0, _compose.createHigherOrderComponent)(function (OriginalComponent) {
    return function (props) {
      return (0, _element.createElement)(Consumer, null, function (context) {
        return (0, _element.createElement)(OriginalComponent, (0, _extends2.default)({}, props, mapContextToProps(context, props)));
      });
    };
  }, 'withPluginContext');
};

exports.withPluginContext = withPluginContext;
//# sourceMappingURL=index.js.map