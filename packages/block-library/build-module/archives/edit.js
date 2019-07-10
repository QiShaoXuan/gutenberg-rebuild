import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl, Disabled } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { ServerSideRender } from '@wordpress/editor';
export default function ArchivesEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
  var showPostCounts = attributes.showPostCounts,
      displayAsDropdown = attributes.displayAsDropdown;
  return createElement(Fragment, null, createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Archives Settings')
  }, createElement(ToggleControl, {
    label: __('Display as Dropdown'),
    checked: displayAsDropdown,
    onChange: function onChange() {
      return setAttributes({
        displayAsDropdown: !displayAsDropdown
      });
    }
  }), createElement(ToggleControl, {
    label: __('Show Post Counts'),
    checked: showPostCounts,
    onChange: function onChange() {
      return setAttributes({
        showPostCounts: !showPostCounts
      });
    }
  }))), createElement(Disabled, null, createElement(ServerSideRender, {
    block: "core/archives",
    attributes: attributes
  })));
}
//# sourceMappingURL=edit.js.map