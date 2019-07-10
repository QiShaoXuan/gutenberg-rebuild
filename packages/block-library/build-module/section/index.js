import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Path, SVG } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InnerBlocks, getColorClassName } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import edit from './edit';
export var name = 'core/section';
export var settings = {
  title: __('Section'),
  icon: createElement(SVG, {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24"
  }, createElement(Path, {
    d: "M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z"
  }), createElement(Path, {
    d: "M0 0h24v24H0z",
    fill: "none"
  })),
  category: 'layout',
  description: __('A wrapping section acting as a container for other blocks.'),
  keywords: [__('container'), __('wrapper'), __('row')],
  supports: {
    align: ['wide', 'full'],
    anchor: true,
    html: false
  },
  attributes: {
    backgroundColor: {
      type: 'string'
    },
    customBackgroundColor: {
      type: 'string'
    }
  },
  edit: edit,
  save: function save(_ref) {
    var attributes = _ref.attributes;
    var backgroundColor = attributes.backgroundColor,
        customBackgroundColor = attributes.customBackgroundColor;
    var backgroundClass = getColorClassName('background-color', backgroundColor);
    var className = classnames(backgroundClass, {
      'has-background': backgroundColor || customBackgroundColor
    });
    var styles = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor
    };
    return createElement("div", {
      className: className,
      style: styles
    }, createElement(InnerBlocks.Content, null));
  }
};
//# sourceMappingURL=index.js.map