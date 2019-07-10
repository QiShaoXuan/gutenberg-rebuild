"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _postVisibility = _interopRequireDefault(require("../post-visibility"));

var _postTrash = _interopRequireDefault(require("../post-trash"));

var _postSchedule = _interopRequireDefault(require("../post-schedule"));

var _postSticky = _interopRequireDefault(require("../post-sticky"));

var _postAuthor = _interopRequireDefault(require("../post-author"));

var _postFormat = _interopRequireDefault(require("../post-format"));

var _postPendingStatus = _interopRequireDefault(require("../post-pending-status"));

var _pluginPostStatusInfo = _interopRequireDefault(require("../plugin-post-status-info"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Module Constants
 */
var PANEL_NAME = 'post-status';

function PostStatus(_ref) {
  var isOpened = _ref.isOpened,
      onTogglePanel = _ref.onTogglePanel;
  return (0, _element.createElement)(_components.PanelBody, {
    className: "edit-post-post-status",
    title: (0, _i18n.__)('Status & Visibility'),
    opened: isOpened,
    onToggle: onTogglePanel
  }, (0, _element.createElement)(_pluginPostStatusInfo.default.Slot, null, function (fills) {
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_postVisibility.default, null), (0, _element.createElement)(_postSchedule.default, null), (0, _element.createElement)(_postFormat.default, null), (0, _element.createElement)(_postSticky.default, null), (0, _element.createElement)(_postPendingStatus.default, null), (0, _element.createElement)(_postAuthor.default, null), fills, (0, _element.createElement)(_postTrash.default, null));
  }));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  return {
    isOpened: select('core/edit-post').isEditorPanelOpened(PANEL_NAME)
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    onTogglePanel: function onTogglePanel() {
      return dispatch('core/edit-post').toggleEditorPanelOpened(PANEL_NAME);
    }
  };
})])(PostStatus);

exports.default = _default;
//# sourceMappingURL=index.js.map