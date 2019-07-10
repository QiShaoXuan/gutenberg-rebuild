"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EDITOR_SETTINGS_DEFAULTS = exports.INITIAL_EDITS_DEFAULTS = exports.PREFERENCES_DEFAULTS = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
var PREFERENCES_DEFAULTS = {
  insertUsage: {},
  // Should be kept for backward compatibility, see: https://github.com/WordPress/gutenberg/issues/14580.
  isPublishSidebarEnabled: true
};
/**
 * Default initial edits state.
 *
 * @type {Object}
 */

exports.PREFERENCES_DEFAULTS = PREFERENCES_DEFAULTS;
var INITIAL_EDITS_DEFAULTS = {};
/**
 * The default post editor settings
 *
 *  allowedBlockTypes  boolean|Array Allowed block types
 *  richEditingEnabled boolean       Whether rich editing is enabled or not
 *  enableCustomFields boolean       Whether the WordPress custom fields are enabled or not
 *  autosaveInterval   number        Autosave Interval
 *  availableTemplates array?        The available post templates
 *  disablePostFormats boolean       Whether or not the post formats are disabled
 *  allowedMimeTypes   array?        List of allowed mime types and file extensions
 *  maxUploadFileSize  number        Maximum upload file size
 */

exports.INITIAL_EDITS_DEFAULTS = INITIAL_EDITS_DEFAULTS;
var EDITOR_SETTINGS_DEFAULTS = (0, _objectSpread2.default)({}, _blockEditor.SETTINGS_DEFAULTS, {
  richEditingEnabled: true,
  enableCustomFields: false
});
exports.EDITOR_SETTINGS_DEFAULTS = EDITOR_SETTINGS_DEFAULTS;
//# sourceMappingURL=defaults.js.map