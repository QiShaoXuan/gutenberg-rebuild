"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _hooks = require("@wordpress/hooks");

var _mediaUpload = _interopRequireDefault(require("./media-upload"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var replaceMediaUpload = function replaceMediaUpload() {
  return _mediaUpload.default;
};

(0, _hooks.addFilter)('editor.MediaUpload', 'core/edit-post/components/media-upload/replace-media-upload', replaceMediaUpload);
//# sourceMappingURL=index.js.map