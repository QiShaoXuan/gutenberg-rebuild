"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _viewport = require("@wordpress/viewport");

var _base = _interopRequireDefault(require("./base"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var _default = (0, _compose.compose)((0, _data.withSelect)(function (select) {
  return {
    isChecked: select('core/editor').isPublishSidebarEnabled()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      enablePublishSidebar = _dispatch.enablePublishSidebar,
      disablePublishSidebar = _dispatch.disablePublishSidebar;

  return {
    onChange: function onChange(isEnabled) {
      return isEnabled ? enablePublishSidebar() : disablePublishSidebar();
    }
  };
}), // In < medium viewports we override this option and always show the publish sidebar.
// See the edit-post's header component for the specific logic.
(0, _viewport.ifViewportMatches)('medium'))(_base.default);

exports.default = _default;
//# sourceMappingURL=enable-publish-sidebar.js.map