"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostSchedule = PostSchedule;
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _editor = require("@wordpress/editor");

/**
 * WordPress dependencies
 */
function PostSchedule(_ref) {
  var instanceId = _ref.instanceId;
  return (0, _element.createElement)(_editor.PostScheduleCheck, null, (0, _element.createElement)(_components.PanelRow, {
    className: "edit-post-post-schedule"
  }, (0, _element.createElement)("label", {
    htmlFor: "edit-post-post-schedule__toggle-".concat(instanceId),
    id: "edit-post-post-schedule__heading-".concat(instanceId)
  }, (0, _i18n.__)('Publish')), (0, _element.createElement)(_components.Dropdown, {
    position: "bottom left",
    contentClassName: "edit-post-post-schedule__dialog",
    renderToggle: function renderToggle(_ref2) {
      var onToggle = _ref2.onToggle,
          isOpen = _ref2.isOpen;
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("label", {
        className: "edit-post-post-schedule__label",
        htmlFor: "edit-post-post-schedule__toggle-".concat(instanceId)
      }, (0, _element.createElement)(_editor.PostScheduleLabel, null), " ", (0, _i18n.__)('Click to change')), (0, _element.createElement)(_components.Button, {
        id: "edit-post-post-schedule__toggle-".concat(instanceId),
        type: "button",
        className: "edit-post-post-schedule__toggle",
        onClick: onToggle,
        "aria-expanded": isOpen,
        "aria-live": "polite",
        isLink: true
      }, (0, _element.createElement)(_editor.PostScheduleLabel, null)));
    },
    renderContent: function renderContent() {
      return (0, _element.createElement)(_editor.PostSchedule, null);
    }
  })));
}

var _default = (0, _compose.withInstanceId)(PostSchedule);

exports.default = _default;
//# sourceMappingURL=index.js.map