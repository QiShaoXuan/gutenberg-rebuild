"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWPAdminURL = getWPAdminURL;
exports.cleanForSlug = cleanForSlug;

var _lodash = require("lodash");

var _url = require("@wordpress/url");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Returns the URL of a WPAdmin Page.
 *
 * TODO: This should be moved to a module less specific to the editor.
 *
 * @param {string} page  Page to navigate to.
 * @param {Object} query Query Args.
 *
 * @return {string} WPAdmin URL.
 */
function getWPAdminURL(page, query) {
  return (0, _url.addQueryArgs)(page, query);
}
/**
 * Performs some basic cleanup of a string for use as a post slug
 *
 * This replicates some of what santize_title() does in WordPress core, but
 * is only designed to approximate what the slug will be.
 *
 * Converts whitespace, periods, forward slashes and underscores to hyphens.
 * Converts Latin-1 Supplement and Latin Extended-A letters to basic Latin
 * letters. Removes combining diacritical marks. Converts remaining string
 * to lowercase. It does not touch octets, HTML entities, or other encoded
 * characters.
 *
 * @param {string} string Title or slug to be processed
 *
 * @return {string} Processed string
 */


function cleanForSlug(string) {
  return (0, _lodash.toLower)((0, _lodash.deburr)((0, _lodash.trim)(string.replace(/[\s\./_]+/g, '-'), '-')));
}
//# sourceMappingURL=url.js.map