"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostVisibility = PostVisibility;
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

/**
 * WordPress dependencies
 */
function PostVisibility() {
  return (0, _element.createElement)(_editor.PostVisibilityCheck, {
    render: function render(_ref) {
      var canEdit = _ref.canEdit;
      return (0, _element.createElement)(_components.PanelRow, {
        className: "edit-post-post-visibility"
      }, (0, _element.createElement)("span", null, (0, _i18n.__)('Visibility')), !canEdit && (0, _element.createElement)("span", null, (0, _element.createElement)(_editor.PostVisibilityLabel, null)), canEdit && (0, _element.createElement)(_components.Dropdown, {
        position: "bottom left",
        contentClassName: "edit-post-post-visibility__dialog",
        renderToggle: function renderToggle(_ref2) {
          var isOpen = _ref2.isOpen,
              onToggle = _ref2.onToggle;
          return (0, _element.createElement)(_components.Button, {
            type: "button",
            "aria-expanded": isOpen,
            className: "edit-post-post-visibility__toggle",
            onClick: onToggle,
            isLink: true
          }, (0, _element.createElement)(_editor.PostVisibilityLabel, null));
        },
        renderContent: function renderContent() {
          return (0, _element.createElement)(_editor.PostVisibility, null);
        }
      }));
    }
  });
}

var _default = PostVisibility;
exports.default = _default;
//# sourceMappingURL=index.js.map