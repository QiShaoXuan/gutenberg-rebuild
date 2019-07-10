import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { flow } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Dropdown, Button } from '@wordpress/components';
/**
 * Internal dependencies
 */

import ImportForm from '../import-form';

function ImportDropdown(_ref) {
  var onUpload = _ref.onUpload;
  return createElement(Dropdown, {
    position: "bottom right",
    contentClassName: "list-reusable-blocks-import-dropdown__content",
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
          onToggle = _ref2.onToggle;
      return createElement(Button, {
        type: "button",
        "aria-expanded": isOpen,
        onClick: onToggle,
        isPrimary: true
      }, __('Import from JSON'));
    },
    renderContent: function renderContent(_ref3) {
      var onClose = _ref3.onClose;
      return createElement(ImportForm, {
        onUpload: flow(onClose, onUpload)
      });
    }
  });
}

export default ImportDropdown;
//# sourceMappingURL=index.js.map