import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { map } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { addAction, removeAction } from '@wordpress/hooks';
/**
 * Internal dependencies
 */

import { PluginContextProvider } from '../plugin-context';
import { getPlugins } from '../../api';
/**
 * A component that renders all plugin fills in a hidden div.
 *
 * @example <caption>ES5</caption>
 * ```js
 * // Using ES5 syntax
 * var el = wp.element.createElement;
 * var PluginArea = wp.plugins.PluginArea;
 *
 * function Layout() {
 * 	return el(
 * 		'div',
 * 		{},
 * 		'Content of the page',
 * 		PluginArea
 * 	);
 * }
 * ```
 *
 * @example <caption>ESNext</caption>
 * ```js
 * // Using ESNext syntax
 * const { PluginArea } = wp.plugins;
 *
 * const Layout = () => (
 * 	<div>
 * 		Content of the page
 * 		<PluginArea />
 * 	</div>
 * );
 * ```
 *
 * @return {WPElement} Plugin area.
 */

var PluginArea =
/*#__PURE__*/
function (_Component) {
  _inherits(PluginArea, _Component);

  function PluginArea() {
    var _this;

    _classCallCheck(this, PluginArea);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PluginArea).apply(this, arguments));
    _this.setPlugins = _this.setPlugins.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = _this.getCurrentPluginsState();
    return _this;
  }

  _createClass(PluginArea, [{
    key: "getCurrentPluginsState",
    value: function getCurrentPluginsState() {
      return {
        plugins: map(getPlugins(), function (_ref) {
          var icon = _ref.icon,
              name = _ref.name,
              render = _ref.render;
          return {
            Plugin: render,
            context: {
              name: name,
              icon: icon
            }
          };
        })
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      addAction('plugins.pluginRegistered', 'core/plugins/plugin-area/plugins-registered', this.setPlugins);
      addAction('plugins.pluginUnregistered', 'core/plugins/plugin-area/plugins-unregistered', this.setPlugins);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      removeAction('plugins.pluginRegistered', 'core/plugins/plugin-area/plugins-registered');
      removeAction('plugins.pluginUnregistered', 'core/plugins/plugin-area/plugins-unregistered');
    }
  }, {
    key: "setPlugins",
    value: function setPlugins() {
      this.setState(this.getCurrentPluginsState);
    }
  }, {
    key: "render",
    value: function render() {
      return createElement("div", {
        style: {
          display: 'none'
        }
      }, map(this.state.plugins, function (_ref2) {
        var context = _ref2.context,
            Plugin = _ref2.Plugin;
        return createElement(PluginContextProvider, {
          key: context.name,
          value: context
        }, createElement(Plugin, null));
      }));
    }
  }]);

  return PluginArea;
}(Component);

export default PluginArea;
//# sourceMappingURL=index.js.map