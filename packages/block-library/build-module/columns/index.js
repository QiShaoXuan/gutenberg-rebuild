import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import deprecated from './deprecated';
import edit from './edit';
import icon from './icon';
export var name = 'core/columns';
export var settings = {
  title: __('Columns'),
  icon: icon,
  category: 'layout',
  attributes: {
    columns: {
      type: 'number',
      default: 2
    },
    verticalAlignment: {
      type: 'string'
    }
  },
  description: __('Add a block that displays content in multiple columns, then add whatever content blocks you’d like.'),
  supports: {
    align: ['wide', 'full'],
    html: false
  },
  deprecated: deprecated,
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var columns = attributes.columns,
        verticalAlignment = attributes.verticalAlignment;
    var wrapperClasses = classnames("has-".concat(columns, "-columns"), _defineProperty({}, "are-vertically-aligned-".concat(verticalAlignment), verticalAlignment));
    return createElement("div", {
      className: wrapperClasses
    }, createElement(InnerBlocks.Content, null));
  }
};
//# sourceMappingURL=index.js.map