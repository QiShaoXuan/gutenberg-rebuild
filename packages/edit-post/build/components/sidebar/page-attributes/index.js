"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageAttributes = PageAttributes;
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _editor = require("@wordpress/editor");

var _data = require("@wordpress/data");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Module Constants
 */
var PANEL_NAME = 'page-attributes';

function PageAttributes(_ref) {
  var isEnabled = _ref.isEnabled,
      isOpened = _ref.isOpened,
      onTogglePanel = _ref.onTogglePanel,
      postType = _ref.postType;

  if (!isEnabled || !postType) {
    return null;
  }

  return (0, _element.createElement)(_editor.PageAttributesCheck, null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _lodash.get)(postType, ['labels', 'attributes'], (0, _i18n.__)('Page Attributes')),
    opened: isOpened,
    onToggle: onTogglePanel
  }, (0, _element.createElement)(_editor.PageTemplate, null), (0, _element.createElement)(_editor.PageAttributesParent, null), (0, _element.createElement)(_components.PanelRow, null, (0, _element.createElement)(_editor.PageAttributesOrder, null))));
}

var applyWithSelect = (0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute;

  var _select2 = select('core/edit-post'),
      isEditorPanelEnabled = _select2.isEditorPanelEnabled,
      isEditorPanelOpened = _select2.isEditorPanelOpened;

  var _select3 = select('core'),
      getPostType = _select3.getPostType;

  return {
    isEnabled: isEditorPanelEnabled(PANEL_NAME),
    isOpened: isEditorPanelOpened(PANEL_NAME),
    postType: getPostType(getEditedPostAttribute('type'))
  };
});
var applyWithDispatch = (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      toggleEditorPanelOpened = _dispatch.toggleEditorPanelOpened;

  return {
    onTogglePanel: (0, _lodash.partial)(toggleEditorPanelOpened, PANEL_NAME)
  };
});

var _default = (0, _compose.compose)(applyWithSelect, applyWithDispatch)(PageAttributes);

exports.default = _default;
//# sourceMappingURL=index.js.map