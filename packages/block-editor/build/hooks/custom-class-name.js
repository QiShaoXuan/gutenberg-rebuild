"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addAttribute = addAttribute;
exports.addSaveProps = addSaveProps;
exports.getHTMLRootElementClasses = getHTMLRootElementClasses;
exports.addParsedDifference = addParsedDifference;
exports.withInspectorControl = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _hooks = require("@wordpress/hooks");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _blocks = require("@wordpress/blocks");

var _compose = require("@wordpress/compose");

var _components2 = require("../components");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Filters registered block settings, extending attributes with anchor using ID
 * of the first node.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
function addAttribute(settings) {
  if ((0, _blocks.hasBlockSupport)(settings, 'customClassName', true)) {
    // Use Lodash's assign to gracefully handle if attributes are undefined
    settings.attributes = (0, _lodash.assign)(settings.attributes, {
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


var withInspectorControl = (0, _compose.createHigherOrderComponent)(function (BlockEdit) {
  return function (props) {
    var hasCustomClassName = (0, _blocks.hasBlockSupport)(props.name, 'customClassName', true);

    if (hasCustomClassName && props.isSelected) {
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(BlockEdit, props), (0, _element.createElement)(_components2.InspectorAdvancedControls, null, (0, _element.createElement)(_components.TextControl, {
        label: (0, _i18n.__)('Additional CSS Class'),
        value: props.attributes.className || '',
        onChange: function onChange(nextValue) {
          props.setAttributes({
            className: nextValue !== '' ? nextValue : undefined
          });
        }
      })));
    }

    return (0, _element.createElement)(BlockEdit, props);
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

exports.withInspectorControl = withInspectorControl;

function addSaveProps(extraProps, blockType, attributes) {
  if ((0, _blocks.hasBlockSupport)(blockType, 'customClassName', true) && attributes.className) {
    extraProps.className = (0, _classnames.default)(extraProps.className, attributes.className);
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


function getHTMLRootElementClasses(innerHTML) {
  innerHTML = "<div data-custom-class-name>".concat(innerHTML, "</div>");
  var parsed = (0, _blocks.parseWithAttributeSchema)(innerHTML, {
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


function addParsedDifference(blockAttributes, blockType, innerHTML) {
  if ((0, _blocks.hasBlockSupport)(blockType, 'customClassName', true)) {
    // To determine difference, serialize block given the known set of
    // attributes, with the exception of `className`. This will determine
    // the default set of classes. From there, any difference in innerHTML
    // can be considered as custom classes.
    var attributesSansClassName = (0, _lodash.omit)(blockAttributes, ['className']);
    var serialized = (0, _blocks.getSaveContent)(blockType, attributesSansClassName);
    var defaultClasses = getHTMLRootElementClasses(serialized);
    var actualClasses = getHTMLRootElementClasses(innerHTML);
    var customClasses = (0, _lodash.difference)(actualClasses, defaultClasses);

    if (customClasses.length) {
      blockAttributes.className = customClasses.join(' ');
    } else if (serialized) {
      delete blockAttributes.className;
    }
  }

  return blockAttributes;
}

(0, _hooks.addFilter)('blocks.registerBlockType', 'core/custom-class-name/attribute', addAttribute);
(0, _hooks.addFilter)('editor.BlockEdit', 'core/editor/custom-class-name/with-inspector-control', withInspectorControl);
(0, _hooks.addFilter)('blocks.getSaveContent.extraProps', 'core/custom-class-name/save-props', addSaveProps);
(0, _hooks.addFilter)('blocks.getBlockAttributes', 'core/custom-class-name/addParsedDifference', addParsedDifference);
//# sourceMappingURL=custom-class-name.js.map