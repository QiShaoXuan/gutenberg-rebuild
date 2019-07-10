"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function BlockTypesChecklist(_ref) {
  var blockTypes = _ref.blockTypes,
      value = _ref.value,
      onItemChange = _ref.onItemChange;
  return (0, _element.createElement)("ul", {
    className: "edit-post-manage-blocks-modal__checklist"
  }, blockTypes.map(function (blockType) {
    return (0, _element.createElement)("li", {
      key: blockType.name,
      className: "edit-post-manage-blocks-modal__checklist-item"
    }, (0, _element.createElement)(_components.CheckboxControl, {
      label: (0, _element.createElement)(_element.Fragment, null, blockType.title, (0, _element.createElement)(_blockEditor.BlockIcon, {
        icon: blockType.icon
      })),
      checked: value.includes(blockType.name),
      onChange: (0, _lodash.partial)(onItemChange, blockType.name)
    }));
  }));
}

var _default = BlockTypesChecklist;
exports.default = _default;
//# sourceMappingURL=checklist.js.map