import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { assign, difference, omit } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Fragment } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { hasBlockSupport, parseWithAttributeSchema, getSaveContent } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { InspectorAdvancedControls } from '../components';
/**
 * Filters registered block settings, extending attributes with anchor using ID
 * of the first node.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */

export function addAttribute(settings) {
  if (hasBlockSupport(settings, 'customClassName', true)) {
    // Use Lodash's assign to gracefully handle if attributes are undefined
    settings.attributes = assign(settings.attributes, {
      className: {
        type: 'string'
      }
    });
  }

  return settings;
}
/**
 * Override the default edit UI to include a new block inspector control for
 * assigning the custom class name, if block supports custom class name.
 *
 * @param {function|Component} BlockEdit Original component.
 *
 * @return {string} Wrapped component.
 */

export var withInspectorControl = createHigherOrderComponent(function (BlockEdit) {
  return function (props) {
    var hasCustomClassName = hasBlockSupport(props.name, 'customClassName', true);

    if (hasCustomClassName && props.isSelected) {
      return createElement(Fragment, null, createElement(BlockEdit, props), createElement(InspectorAdvancedControls, null, createElement(TextControl, {
        label: __('Additional CSS Class'),
        value: props.attributes.className || '',
        onChange: function onChange(nextValue) {
          props.setAttributes({
            className: nextValue !== '' ? nextValue : undefined
          });
        }
      })));
    }

    return createElement(BlockEdit, props);
  };
}, 'withInspectorControl');
/**
 * Override props assigned to save component to inject anchor ID, if block
 * supports anchor. This is only applied if the block's save result is an
 * element and not a markup string.
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */

export function addSaveProps(extraProps, blockType, attributes) {
  if (hasBlockSupport(blockType, 'customClassName', true) && attributes.className) {
    extraProps.className = classnames(extraProps.className, attributes.className);
  }

  return extraProps;
}
/**
 * Given an HTML string, returns an array of class names assigned to the root
 * element in the markup.
 *
 * @param {string} innerHTML Markup string from which to extract classes.
 *
 * @return {string[]} Array of class names assigned to the root element.
 */

export function getHTMLRootElementClasses(innerHTML) {
  innerHTML = "<div data-custom-class-name>".concat(innerHTML, "</div>");
  var parsed = parseWithAttributeSchema(innerHTML, {
    type: 'string',
    source: 'attribute',
    selector: '[data-custom-class-name] > *',
    attribute: 'class'
  });
  return parsed ? parsed.trim().split(/\s+/) : [];
}
/**
 * Given a parsed set of block attributes, if the block supports custom class
 * names and an unknown class (per the block's serialization behavior) is
 * found, the unknown classes are treated as custom classes. This prevents the
 * block from being considered as invalid.
 *
 * @param {Object} blockAttributes Original block attributes.
 * @param {Object} blockType       Block type settings.
 * @param {string} innerHTML       Original block markup.
 *
 * @return {Object} Filtered block attributes.
 */

export function addParsedDifference(blockAttributes, blockType, innerHTML) {
  if (hasBlockSupport(blockType, 'customClassName', true)) {
    // To determine difference, serialize block given the known set of
    // attributes, with the exception of `className`. This will determine
    // the default set of classes. From there, any difference in innerHTML
    // can be considered as custom classes.
    var attributesSansClassName = omit(blockAttributes, ['className']);
    var serialized = getSaveContent(blockType, attributesSansClassName);
    var defaultClasses = getHTMLRootElementClasses(serialized);
    var actualClasses = getHTMLRootElementClasses(innerHTML);
    var customClasses = difference(actualClasses, defaultClasses);

    if (customClasses.length) {
      blockAttributes.className = customClasses.join(' ');
    } else if (serialized) {
      delete blockAttributes.className;
    }
  }

  return blockAttributes;
}
addFilter('blocks.registerBlockType', 'core/custom-class-name/attribute', addAttribute);
addFilter('editor.BlockEdit', 'core/editor/custom-class-name/with-inspector-control', withInspectorControl);
addFilter('blocks.getSaveContent.extraProps', 'core/custom-class-name/save-props', addSaveProps);
addFilter('blocks.getBlockAttributes', 'core/custom-class-name/addParsedDifference', addParsedDifference);
//# sourceMappingURL=custom-class-name.js.map