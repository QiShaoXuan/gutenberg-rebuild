import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { Disabled } from '@wordpress/components';
/**
 * Internal dependencies
 */

import BlockEdit from '../block-edit';
/**
 * Block Preview Component: It renders a preview given a block name and attributes.
 *
 * @param {Object} props Component props.
 *
 * @return {WPElement} Rendered element.
 */

function BlockPreview(props) {
  return createElement("div", {
    className: "editor-block-preview block-editor-block-preview"
  }, createElement("div", {
    className: "editor-block-preview__title block-editor-block-preview__title"
  }, __('Preview')), createElement(BlockPreviewContent, props));
}

export function BlockPreviewContent(_ref) {
  var name = _ref.name,
      attributes = _ref.attributes;
  var block = createBlock(name, attributes);
  return createElement(Disabled, {
    className: "editor-block-preview__content block-editor-block-preview__content editor-styles-wrapper",
    "aria-hidden": true
  }, createElement(BlockEdit, {
    name: name,
    focus: false,
    attributes: block.attributes,
    setAttributes: noop
  }));
}
export default BlockPreview;
//# sourceMappingURL=index.js.map