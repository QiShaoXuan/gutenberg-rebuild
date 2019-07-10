import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelRow, Dropdown, Button } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { PostSchedule as PostScheduleForm, PostScheduleLabel, PostScheduleCheck } from '@wordpress/editor';
import { Fragment } from '@wordpress/element';
export function PostSchedule(_ref) {
  var instanceId = _ref.instanceId;
  return createElement(PostScheduleCheck, null, createElement(PanelRow, {
    className: "edit-post-post-schedule"
  }, createElement("label", {
    htmlFor: "edit-post-post-schedule__toggle-".concat(instanceId),
    id: "edit-post-post-schedule__heading-".concat(instanceId)
  }, __('Publish')), createElement(Dropdown, {
    position: "bottom left",
    contentClassName: "edit-post-post-schedule__dialog",
    renderToggle: function renderToggle(_ref2) {
      var onToggle = _ref2.onToggle,
          isOpen = _ref2.isOpen;
      return createElement(Fragment, null, createElement("label", {
        className: "edit-post-post-schedule__label",
        htmlFor: "edit-post-post-schedule__toggle-".concat(instanceId)
      }, createElement(PostScheduleLabel, null), " ", __('Click to change')), createElement(Button, {
        id: "edit-post-post-schedule__toggle-".concat(instanceId),
        type: "button",
        className: "edit-post-post-schedule__toggle",
        onClick: onToggle,
        "aria-expanded": isOpen,
        "aria-live": "polite",
        isLink: true
      }, createElement(PostScheduleLabel, null)));
    },
    renderContent: function renderContent() {
      return createElement(PostScheduleForm, null);
    }
  })));
}
export default withInstanceId(PostSchedule);
//# sourceMappingURL=index.js.map