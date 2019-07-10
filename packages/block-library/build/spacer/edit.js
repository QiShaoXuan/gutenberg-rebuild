"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var SpacerEdit = function SpacerEdit(_ref) {
  var attributes = _ref.attributes,
      isSelected = _ref.isSelected,
      setAttributes = _ref.setAttributes,
      toggleSelection = _ref.toggleSelection,
      instanceId = _ref.instanceId;
  var height = attributes.height;
  var id = "block-spacer-height-input-".concat(instanceId);
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.ResizableBox, {
    className: (0, _classnames.default)('block-library-spacer__resize-container', {
      'is-selected': isSelected
    }),
    size: {
      height: height
    },
    minHeight: "20",
    enable: {
      top: false,
      right: false,
      bottom: true,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false
    },
    onResizeStop: function onResizeStop(event, direction, elt, delta) {
      setAttributes({
        height: parseInt(height + delta.height, 10)
      });
      toggleSelection(true);
    },
    onResizeStart: function onResizeStart() {
      toggleSelection(false);
    }
  }), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Spacer Settings')
  }, (0, _element.createElement)(_components.BaseControl, {
    label: (0, _i18n.__)('Height in pixels'),
    id: id
  }, (0, _element.createElement)("input", {
    type: "number",
    id: id,
    onChange: function onChange(event) {
      setAttributes({
        height: parseInt(event.target.value, 10)
      });
    },
    value: height,
    min: "20",
    step: "10"
  })))));
};

var _default = (0, _compose.withInstanceId)(SpacerEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map