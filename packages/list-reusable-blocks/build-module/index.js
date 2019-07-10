import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import exportReusableBlock from './utils/export';
import ImportDropdown from './components/import-dropdown'; // Setup Export Links

document.body.addEventListener('click', function (event) {
  if (!event.target.classList.contains('wp-list-reusable-blocks__export')) {
    return;
  }

  event.preventDefault();
  exportReusableBlock(event.target.dataset.id);
}); // Setup Import Form

document.addEventListener('DOMContentLoaded', function () {
  var button = document.querySelector('.page-title-action');

  if (!button) {
    return;
  }

  var showNotice = function showNotice() {
    var notice = document.createElement('div');
    notice.className = 'notice notice-success is-dismissible';
    notice.innerHTML = "<p>".concat(__('Reusable block imported successfully!'), "</p>");
    var headerEnd = document.querySelector('.wp-header-end');

    if (!headerEnd) {
      return;
    }

    headerEnd.parentNode.insertBefore(notice, headerEnd);
  };

  var container = document.createElement('div');
  container.className = 'list-reusable-blocks__container';
  button.parentNode.insertBefore(container, button);
  render(createElement(ImportDropdown, {
    onUpload: showNotice
  }), container);
});
//# sourceMappingURL=index.js.map