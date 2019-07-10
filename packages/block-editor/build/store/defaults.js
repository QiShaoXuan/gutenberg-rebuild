"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SETTINGS_DEFAULTS = exports.PREFERENCES_DEFAULTS = void 0;

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
var PREFERENCES_DEFAULTS = {
  insertUsage: {}
};
/**
 * The default editor settings
 *
 *  alignWide                     boolean       Enable/Disable Wide/Full Alignments
 *  availableLegacyWidgets        Array         Array of objects representing the legacy widgets available.
 *  colors                        Array         Palette colors
 *  disableCustomColors           boolean       Whether or not the custom colors are disabled
 *  fontSizes                     Array         Available font sizes
 *  disableCustomFontSizes        boolean       Whether or not the custom font sizes are disabled
 *  imageSizes                    Array         Available image sizes
 *  maxWidth                      number        Max width to constraint resizing
 *  allowedBlockTypes             boolean|Array Allowed block types
 *  hasFixedToolbar               boolean       Whether or not the editor toolbar is fixed
 *  hasPermissionsToManageWidgets boolean       Whether or not the user is able to manage widgets.
 *  focusMode                     boolean       Whether the focus mode is enabled or not
 *  styles                        Array         Editor Styles
 *  isRTL                         boolean       Whether the editor is in RTL mode
 *  bodyPlaceholder               string        Empty post placeholder
 *  titlePlaceholder              string        Empty title placeholder
 */

exports.PREFERENCES_DEFAULTS = PREFERENCES_DEFAULTS;
var SETTINGS_DEFAULTS = {
  alignWide: false,
  colors: [{
    name: (0, _i18n.__)('Pale pink'),
    slug: 'pale-pink',
    color: '#f78da7'
  }, {
    name: (0, _i18n.__)('Vivid red'),
    slug: 'vivid-red',
    color: '#cf2e2e'
  }, {
    name: (0, _i18n.__)('Luminous vivid orange'),
    slug: 'luminous-vivid-orange',
    color: '#ff6900'
  }, {
    name: (0, _i18n.__)('Luminous vivid amber'),
    slug: 'luminous-vivid-amber',
    color: '#fcb900'
  }, {
    name: (0, _i18n.__)('Light green cyan'),
    slug: 'light-green-cyan',
    color: '#7bdcb5'
  }, {
    name: (0, _i18n.__)('Vivid green cyan'),
    slug: 'vivid-green-cyan',
    color: '#00d084'
  }, {
    name: (0, _i18n.__)('Pale cyan blue'),
    slug: 'pale-cyan-blue',
    color: '#8ed1fc'
  }, {
    name: (0, _i18n.__)('Vivid cyan blue'),
    slug: 'vivid-cyan-blue',
    color: '#0693e3'
  }, {
    name: (0, _i18n.__)('Very light gray'),
    slug: 'very-light-gray',
    color: '#eeeeee'
  }, {
    name: (0, _i18n.__)('Cyan bluish gray'),
    slug: 'cyan-bluish-gray',
    color: '#abb8c3'
  }, {
    name: (0, _i18n.__)('Very dark gray'),
    slug: 'very-dark-gray',
    color: '#313131'
  }],
  fontSizes: [{
    name: (0, _i18n._x)('Small', 'font size name'),
    size: 13,
    slug: 'small'
  }, {
    name: (0, _i18n._x)('Normal', 'font size name'),
    size: 16,
    slug: 'normal'
  }, {
    name: (0, _i18n._x)('Medium', 'font size name'),
    size: 20,
    slug: 'medium'
  }, {
    name: (0, _i18n._x)('Large', 'font size name'),
    size: 36,
    slug: 'large'
  }, {
    name: (0, _i18n._x)('Huge', 'font size name'),
    size: 48,
    slug: 'huge'
  }],
  imageSizes: [{
    slug: 'thumbnail',
    label: (0, _i18n.__)('Thumbnail')
  }, {
    slug: 'medium',
    label: (0, _i18n.__)('Medium')
  }, {
    slug: 'large',
    label: (0, _i18n.__)('Large')
  }, {
    slug: 'full',
    label: (0, _i18n.__)('Full Size')
  }],
  // This is current max width of the block inner area
  // It's used to constraint image resizing and this value could be overridden later by themes
  maxWidth: 580,
  // Allowed block types for the editor, defaulting to true (all supported).
  allowedBlockTypes: true,
  // Maximum upload size in bytes allowed for the site.
  maxUploadFileSize: 0,
  // List of allowed mime types and file extensions.
  allowedMimeTypes: null,
  availableLegacyWidgets: {},
  hasPermissionsToManageWidgets: false
};
exports.SETTINGS_DEFAULTS = SETTINGS_DEFAULTS;
//# sourceMappingURL=defaults.js.map