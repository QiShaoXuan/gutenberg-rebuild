"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerPlugin = registerPlugin;
exports.unregisterPlugin = unregisterPlugin;
exports.getPlugin = getPlugin;
exports.getPlugins = getPlugins;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _hooks = require("@wordpress/hooks");

var _lodash = require("lodash");

/* eslint no-console: [ 'error', { allow: [ 'error' ] } ] */

/**
 * WordPress dependencies
 */

/**
 * External dependencies
 */

/**
 * Plugin definitions keyed by plugin name.
 *
 * @type {Object.<string,WPPlugin>}
 */
var plugins = {};
/**
 * Registers a plugin to the editor.
 *
 * @param {string}                    name            A string identifying the plugin. Must be unique across all registered plugins.
 * @param {Object}                    settings        The settings for this plugin.
 * @param {string|WPElement|Function} settings.icon   An icon to be shown in the UI. It can be a slug of the Dashicon,
 * or an element (or function returning an element) if you choose to render your own SVG.
 * @param {Function}                  settings.render A component containing the UI elements to be rendered.
 *
 * @example <caption>ES5</caption>
 * ```js
 * // Using ES5 syntax
 * var el = wp.element.createElement;
 * var Fragment = wp.element.Fragment;
 * var PluginSidebar = wp.editPost.PluginSidebar;
 * var PluginSidebarMoreMenuItem = wp.editPost.PluginSidebarMoreMenuItem;
 * var registerPlugin = wp.plugins.registerPlugin;
 *
 * function Component() {
 * 	return el(
 * 		Fragment,
 * 		{},
 * 		el(
 * 			PluginSidebarMoreMenuItem,
 * 			{
 * 				target: 'sidebar-name',
 * 			},
 * 			'My Sidebar'
 * 		),
 * 		el(
 * 			PluginSidebar,
 * 			{
 * 				name: 'sidebar-name',
 * 				title: 'My Sidebar',
 * 			},
 * 			'Content of the sidebar'
 * 		)
 * 	);
 * }
 * registerPlugin( 'plugin-name', {
 * 	icon: 'smiley',
 * 	render: Component,
 * } );
 * ```
 *
 * @example <caption>ESNext</caption>
 * ```js
 * // Using ESNext syntax
 * const { Fragment } = wp.element;
 * const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
 * const { registerPlugin } = wp.plugins;
 *
 * const Component = () => (
 * 	<Fragment>
 * 		<PluginSidebarMoreMenuItem
 * 			target="sidebar-name"
 * 		>
 * 			My Sidebar
 * 		</PluginSidebarMoreMenuItem>
 * 		<PluginSidebar
 * 			name="sidebar-name"
 * 			title="My Sidebar"
 * 		>
 * 			Content of the sidebar
 * 		</PluginSidebar>
 * 	</Fragment>
 * );
 *
 * registerPlugin( 'plugin-name', {
 * 	icon: 'smiley',
 * 	render: Component,
 * } );
 * ```
 *
 * @return {Object} The final plugin settings object.
 */

function registerPlugin(name, settings) {
  if ((0, _typeof2.default)(settings) !== 'object') {
    console.error('No settings object provided!');
    return null;
  }

  if (typeof name !== 'string') {
    console.error('Plugin names must be strings.');
    return null;
  }

  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    console.error('Plugin names must include only lowercase alphanumeric characters or dashes, and start with a letter. Example: "my-plugin".');
    return null;
  }

  if (plugins[name]) {
    console.error("Plugin \"".concat(name, "\" is already registered."));
  }

  settings = (0, _hooks.applyFilters)('plugins.registerPlugin', settings, name);

  if (!(0, _lodash.isFunction)(settings.render)) {
    console.error('The "render" property must be specified and must be a valid function.');
    return null;
  }

  plugins[name] = (0, _objectSpread2.default)({
    name: name,
    icon: 'admin-plugins'
  }, settings);
  (0, _hooks.doAction)('plugins.pluginRegistered', settings, name);
  return settings;
}
/**
 * Unregisters a plugin by name.
 *
 * @param {string} name Plugin name.
 *
 * @example <caption>ES5</caption>
 * ```js
 * // Using ES5 syntax
 * var unregisterPlugin = wp.plugins.unregisterPlugin;
 *
 * unregisterPlugin( 'plugin-name' );
 * ```
 *
 * @example <caption>ESNext</caption>
 * ```js
 * // Using ESNext syntax
 * const { unregisterPlugin } = wp.plugins;
 *
 * unregisterPlugin( 'plugin-name' );
 * ```
 *
 * @return {?WPPlugin} The previous plugin settings object, if it has been
 *                     successfully unregistered; otherwise `undefined`.
 */


function unregisterPlugin(name) {
  if (!plugins[name]) {
    console.error('Plugin "' + name + '" is not registered.');
    return;
  }

  var oldPlugin = plugins[name];
  delete plugins[name];
  (0, _hooks.doAction)('plugins.pluginUnregistered', oldPlugin, name);
  return oldPlugin;
}
/**
 * Returns a registered plugin settings.
 *
 * @param {string} name Plugin name.
 *
 * @return {?Object} Plugin setting.
 */


function getPlugin(name) {
  return plugins[name];
}
/**
 * Returns all registered plugins.
 *
 * @return {Array} Plugin settings.
 */


function getPlugins() {
  return Object.values(plugins);
}
//# sourceMappingURL=index.js.map