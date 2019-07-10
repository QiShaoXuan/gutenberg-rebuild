"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _export = _interopRequireDefault(require("./utils/export"));

var _importDropdown = _interopRequireDefault(require("./components/import-dropdown"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
// Setup Export Links
document.body.addEventListener('click', function (event) {
  if (!event.target.classList.contains('wp-list-reusable-blocks__export')) {
    return;
  }

  event.preventDefault();
  (0, _export.default)(event.target.dataset.id);
}); // Setup Import Form

document.addEventListener('DOMContentLoaded', function () {
  var button = document.querySelector('.page-title-action');

  if (!button) {
    return;
  }

  var showNotice = function showNotice() {
    var notice = document.createElement('div');
    notice.className = 'notice notice-success is-dismissible';
    notice.innerHTML = "<p>".concat((0, _i18n.__)('Reusable block imported successfully!'), "</p>");
    var headerEnd = document.querySelector('.wp-header-end');

    if (!headerEnd) {
      return;
    }

    headerEnd.parentNode.insertBefore(notice, headerEnd);
  };

  var container = document.createElement('div');
  container.className = 'list-reusable-blocks__container';
  button.parentNode.insertBefore(container, button);
  (0, _element.render)((0, _element.createElement)(_importDropdown.default, {
    onUpload: showNotice
  }), container);
});
//# sourceMappingURL=index.js.map