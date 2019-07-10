import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { BaseControl, PanelBody, ResizableBox } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';

var SpacerEdit = function SpacerEdit(_ref) {
  var attributes = _ref.attributes,
      isSelected = _ref.isSelected,
      setAttributes = _ref.setAttributes,
      toggleSelection = _ref.toggleSelection,
      instanceId = _ref.instanceId;
  var height = attributes.height;
  var id = "block-spacer-height-input-".concat(instanceId);
  return createElement(Fragment, null, createElement(ResizableBox, {
    className: classnames('block-library-spacer__resize-container', {
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
  }), createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Spacer Settings')
  }, createElement(BaseControl, {
    label: __('Height in pixels'),
    id: id
  }, createElement("input", {
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

export default withInstanceId(SpacerEdit);
//# sourceMappingURL=edit.js.map