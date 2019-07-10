"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _importForm = _interopRequireDefault(require("../import-form"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function ImportDropdown(_ref) {
  var onUpload = _ref.onUpload;
  return (0, _element.createElement)(_components.Dropdown, {
    position: "bottom right",
    contentClassName: "list-reusable-blocks-import-dropdown__content",
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
          onToggle = _ref2.onToggle;
      return (0, _element.createElement)(_components.Button, {
        type: "button",
        "aria-expanded": isOpen,
        onClick: onToggle,
        isPrimary: true
      }, (0, _i18n.__)('Import from JSON'));
    },
    renderContent: function renderContent(_ref3) {
      var onClose = _ref3.onClose;
      return (0, _element.createElement)(_importForm.default, {
        onUpload: (0, _lodash.flow)(onClose, onUpload)
      });
    }
  });
}

var _default = ImportDropdown;
exports.default = _default;
//# sourceMappingURL=index.js.map