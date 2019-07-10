import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelRow, Dropdown, Button } from '@wordpress/components';
import { PostVisibility as PostVisibilityForm, PostVisibilityLabel, PostVisibilityCheck } from '@wordpress/editor';
export function PostVisibility() {
  return createElement(PostVisibilityCheck, {
    render: function render(_ref) {
      var canEdit = _ref.canEdit;
      return createElement(PanelRow, {
        className: "edit-post-post-visibility"
      }, createElement("span", null, __('Visibility')), !canEdit && createElement("span", null, createElement(PostVisibilityLabel, null)), canEdit && createElement(Dropdown, {
        position: "bottom left",
        contentClassName: "edit-post-post-visibility__dialog",
        renderToggle: function renderToggle(_ref2) {
          var isOpen = _ref2.isOpen,
              onToggle = _ref2.onToggle;
          return createElement(Button, {
            type: "button",
            "aria-expanded": isOpen,
            className: "edit-post-post-visibility__toggle",
            onClick: onToggle,
            isLink: true
          }, createElement(PostVisibilityLabel, null));
        },
        renderContent: function renderContent() {
          return createElement(PostVisibilityForm, null);
        }
      }));
    }
  });
}
export default PostVisibility;
//# sourceMappingURL=index.js.map