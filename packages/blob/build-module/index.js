/**
 * Browser dependencies
 */
var _window$URL = window.URL,
    createObjectURL = _window$URL.createObjectURL,
    revokeObjectURL = _window$URL.revokeObjectURL;
var cache = {};
/**
 * Create a blob URL from a file.
 *
 * @param {File} file The file to create a blob URL for.
 *
 * @return {string} The blob URL.
 */

export function createBlobURL(file) {
  var url = createObjectURL(file);
  cache[url] = file;
  return url;
}
/**
 * Retrieve a file based on a blob URL. The file must have been created by
 * `createBlobURL` and not removed by `revokeBlobURL`, otherwise it will return
 * `undefined`.
 *
 * @param {string} url The blob URL.
 *
 * @return {?File} The file for the blob URL.
 */

export function getBlobByURL(url) {
  return cache[url];
}
/**
 * Remove the resource and file cache from memory.
 *
 * @param {string} url The blob URL.
 */

export function revokeBlobURL(url) {
  if (cache[url]) {
    revokeObjectURL(url);
  }

  delete cache[url];
}
/**
 * Check whether a url is a blob url.
 *
 * @param {string} url The URL.
 *
 * @return {boolean} Is the url a blob url?
 */

export function isBlobURL(url) {
  if (!url || !url.indexOf) {
    return false;
  }

  return url.indexOf('blob:') === 0;
}
//# sourceMappingURL=index.js.map