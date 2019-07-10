import _regeneratorRuntime from "@babel/runtime/regenerator";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { compact, flatMap, forEach, get, has, includes, map, noop, omit, some, startsWith } from 'lodash';
/**
 * WordPress dependencies
 */

import apiFetch from '@wordpress/api-fetch';
import { createBlobURL, revokeBlobURL } from '@wordpress/blob';
import { __, sprintf } from '@wordpress/i18n';
/**
 * Browsers may use unexpected mime types, and they differ from browser to browser.
 * This function computes a flexible array of mime types from the mime type structured provided by the server.
 * Converts { jpg|jpeg|jpe: "image/jpeg" } into [ "image/jpeg", "image/jpg", "image/jpeg", "image/jpe" ]
 * The computation of this array instead of directly using the object,
 * solves the problem in chrome where mp3 files have audio/mp3 as mime type instead of audio/mpeg.
 * https://bugs.chromium.org/p/chromium/issues/detail?id=227004
 *
 * @param {?Object} wpMimeTypesObject Mime type object received from the server.
 *                                    Extensions are keys separated by '|' and values are mime types associated with an extension.
 *
 * @return {?Array} An array of mime types or the parameter passed if it was "falsy".
 */

export function getMimeTypesArray(wpMimeTypesObject) {
  if (!wpMimeTypesObject) {
    return wpMimeTypesObject;
  }

  return flatMap(wpMimeTypesObject, function (mime, extensionsString) {
    var _mime$split = mime.split('/'),
        _mime$split2 = _slicedToArray(_mime$split, 1),
        type = _mime$split2[0];

    var extensions = extensionsString.split('|');
    return [mime].concat(_toConsumableArray(map(extensions, function (extension) {
      return "".concat(type, "/").concat(extension);
    })));
  });
}
/**
 *	Media Upload is used by audio, image, gallery, video, and file blocks to
 *	handle uploading a media file when a file upload button is activated.
 *
 *	TODO: future enhancement to add an upload indicator.
 *
 * @param   {Object}   $0                    Parameters object passed to the function.
 * @param   {?Array}   $0.allowedTypes       Array with the types of media that can be uploaded, if unset all types are allowed.
 * @param   {?Object}  $0.additionalData     Additional data to include in the request.
 * @param   {Array}    $0.filesList          List of files.
 * @param   {?number}  $0.maxUploadFileSize  Maximum upload size in bytes allowed for the site.
 * @param   {Function} $0.onError            Function called when an error happens.
 * @param   {Function} $0.onFileChange       Function called each time a file or a temporary representation of the file is available.
 * @param   {?Object}  $0.wpAllowedMimeTypes List of allowed mime types and file extensions.
 */

export function mediaUpload(_x) {
  return _mediaUpload.apply(this, arguments);
}
/**
 * @param {File}    file           Media File to Save.
 * @param {?Object} additionalData Additional data to include in the request.
 *
 * @return {Promise} Media Object Promise.
 */

function _mediaUpload() {
  _mediaUpload = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var allowedTypes, _ref$additionalData, additionalData, filesList, maxUploadFileSize, _ref$onError, onError, onFileChange, _ref$wpAllowedMimeTyp, wpAllowedMimeTypes, files, filesSet, setAndUpdateFiles, isAllowedType, allowedMimeTypesForUser, isAllowedMimeTypeForUser, triggerError, validFiles, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _mediaFile, idx, mediaFile, savedMedia, mediaObject, message;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            allowedTypes = _ref.allowedTypes, _ref$additionalData = _ref.additionalData, additionalData = _ref$additionalData === void 0 ? {} : _ref$additionalData, filesList = _ref.filesList, maxUploadFileSize = _ref.maxUploadFileSize, _ref$onError = _ref.onError, onError = _ref$onError === void 0 ? noop : _ref$onError, onFileChange = _ref.onFileChange, _ref$wpAllowedMimeTyp = _ref.wpAllowedMimeTypes, wpAllowedMimeTypes = _ref$wpAllowedMimeTyp === void 0 ? null : _ref$wpAllowedMimeTyp;
            // Cast filesList to array
            files = _toConsumableArray(filesList);
            filesSet = [];

            setAndUpdateFiles = function setAndUpdateFiles(idx, value) {
              revokeBlobURL(get(filesSet, [idx, 'url']));
              filesSet[idx] = value;
              onFileChange(compact(filesSet));
            }; // Allowed type specified by consumer


            isAllowedType = function isAllowedType(fileType) {
              if (!allowedTypes) {
                return true;
              }

              return some(allowedTypes, function (allowedType) {
                // If a complete mimetype is specified verify if it matches exactly the mime type of the file.
                if (includes(allowedType, '/')) {
                  return allowedType === fileType;
                } // Otherwise a general mime type is used and we should verify if the file mimetype starts with it.


                return startsWith(fileType, "".concat(allowedType, "/"));
              });
            }; // Allowed types for the current WP_User


            allowedMimeTypesForUser = getMimeTypesArray(wpAllowedMimeTypes);

            isAllowedMimeTypeForUser = function isAllowedMimeTypeForUser(fileType) {
              return includes(allowedMimeTypesForUser, fileType);
            }; // Build the error message including the filename


            triggerError = function triggerError(error) {
              error.message = [createElement("strong", {
                key: "filename"
              }, error.file.name), ': ', error.message];
              onError(error);
            };

            validFiles = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 12;
            _iterator = files[Symbol.iterator]();

          case 14:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 34;
              break;
            }

            _mediaFile = _step.value;

            if (!(allowedMimeTypesForUser && !isAllowedMimeTypeForUser(_mediaFile.type))) {
              _context.next = 19;
              break;
            }

            triggerError({
              code: 'MIME_TYPE_NOT_ALLOWED_FOR_USER',
              message: __('Sorry, this file type is not permitted for security reasons.'),
              file: _mediaFile
            });
            return _context.abrupt("continue", 31);

          case 19:
            if (isAllowedType(_mediaFile.type)) {
              _context.next = 22;
              break;
            }

            triggerError({
              code: 'MIME_TYPE_NOT_SUPPORTED',
              message: __('Sorry, this file type is not supported here.'),
              file: _mediaFile
            });
            return _context.abrupt("continue", 31);

          case 22:
            if (!(maxUploadFileSize && _mediaFile.size > maxUploadFileSize)) {
              _context.next = 25;
              break;
            }

            triggerError({
              code: 'SIZE_ABOVE_LIMIT',
              message: __('This file exceeds the maximum upload size for this site.'),
              file: _mediaFile
            });
            return _context.abrupt("continue", 31);

          case 25:
            if (!(_mediaFile.size <= 0)) {
              _context.next = 28;
              break;
            }

            triggerError({
              code: 'EMPTY_FILE',
              message: __('This file is empty.'),
              file: _mediaFile
            });
            return _context.abrupt("continue", 31);

          case 28:
            validFiles.push(_mediaFile); // Set temporary URL to create placeholder media file, this is replaced
            // with final file from media gallery when upload is `done` below

            filesSet.push({
              url: createBlobURL(_mediaFile)
            });
            onFileChange(filesSet);

          case 31:
            _iteratorNormalCompletion = true;
            _context.next = 14;
            break;

          case 34:
            _context.next = 40;
            break;

          case 36:
            _context.prev = 36;
            _context.t0 = _context["catch"](12);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 40:
            _context.prev = 40;
            _context.prev = 41;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 43:
            _context.prev = 43;

            if (!_didIteratorError) {
              _context.next = 46;
              break;
            }

            throw _iteratorError;

          case 46:
            return _context.finish(43);

          case 47:
            return _context.finish(40);

          case 48:
            idx = 0;

          case 49:
            if (!(idx < validFiles.length)) {
              _context.next = 68;
              break;
            }

            mediaFile = validFiles[idx];
            _context.prev = 51;
            _context.next = 54;
            return createMediaFromFile(mediaFile, additionalData);

          case 54:
            savedMedia = _context.sent;
            mediaObject = _objectSpread({}, omit(savedMedia, ['alt_text', 'source_url']), {
              alt: savedMedia.alt_text,
              caption: get(savedMedia, ['caption', 'raw'], ''),
              title: savedMedia.title.raw,
              url: savedMedia.source_url
            });
            setAndUpdateFiles(idx, mediaObject);
            _context.next = 65;
            break;

          case 59:
            _context.prev = 59;
            _context.t1 = _context["catch"](51);
            // Reset to empty on failure.
            setAndUpdateFiles(idx, null);
            message = void 0;

            if (has(_context.t1, ['message'])) {
              message = get(_context.t1, ['message']);
            } else {
              message = sprintf( // translators: %s: file name
              __('Error while uploading file %s to the media library.'), mediaFile.name);
            }

            onError({
              code: 'GENERAL',
              message: message,
              file: mediaFile
            });

          case 65:
            ++idx;
            _context.next = 49;
            break;

          case 68:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[12, 36, 40, 48], [41,, 43, 47], [51, 59]]);
  }));
  return _mediaUpload.apply(this, arguments);
}

function createMediaFromFile(file, additionalData) {
  // Create upload payload
  var data = new window.FormData();
  data.append('file', file, file.name || file.type.replace('/', '.'));
  forEach(additionalData, function (value, key) {
    return data.append(key, value);
  });
  return apiFetch({
    path: '/wp/v2/media',
    body: data,
    method: 'POST'
  });
}
//# sourceMappingURL=media-upload.js.map