"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _mediaUpload = require("./media-upload");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Upload a media file when the file upload button is activated.
 * Wrapper around mediaUpload() that injects the current post ID.
 *
 * @param   {Object}   $0                   Parameters object passed to the function.
 * @param   {?Object}  $0.additionalData    Additional data to include in the request.
 * @param   {string}   $0.allowedTypes      Array with the types of media that can be uploaded, if unset all types are allowed.
 * @param   {Array}    $0.filesList         List of files.
 * @param   {?number}  $0.maxUploadFileSize Maximum upload size in bytes allowed for the site.
 * @param   {Function} $0.onError           Function called when an error happens.
 * @param   {Function} $0.onFileChange      Function called each time a file or a temporary representation of the file is available.
 */
function _default(_ref) {
  var _ref$additionalData = _ref.additionalData,
      additionalData = _ref$additionalData === void 0 ? {} : _ref$additionalData,
      allowedTypes = _ref.allowedTypes,
      filesList = _ref.filesList,
      maxUploadFileSize = _ref.maxUploadFileSize,
      _ref$onError = _ref.onError,
      _onError = _ref$onError === void 0 ? _lodash.noop : _ref$onError,
      onFileChange = _ref.onFileChange;

  var _select = (0, _data.select)('core/editor'),
      getCurrentPostId = _select.getCurrentPostId,
      getEditorSettings = _select.getEditorSettings;

  var wpAllowedMimeTypes = getEditorSettings().allowedMimeTypes;
  maxUploadFileSize = maxUploadFileSize || getEditorSettings().maxUploadFileSize;
  (0, _mediaUpload.mediaUpload)({
    allowedTypes: allowedTypes,
    filesList: filesList,
    onFileChange: onFileChange,
    additionalData: (0, _objectSpread2.default)({
      post: getCurrentPostId()
    }, additionalData),
    maxUploadFileSize: maxUploadFileSize,
    onError: function onError(_ref2) {
      var message = _ref2.message;
      return _onError(message);
    },
    wpAllowedMimeTypes: wpAllowedMimeTypes
  });
}
//# sourceMappingURL=index.js.map